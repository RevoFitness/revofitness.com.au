<?php

namespace Revo\PerfectGym;

class User extends PerfectGymClient
{
    /**
     * Creates a user in the PerfectGym system.
     *
     * @param array $data The user data.
     * @param string $paymentId The payment ID.
     * @return mixed The created user object.
     */

public static function create($data, $paymentIdLevel1, $paymentIdLevel2 = null)
{
    $self = new self();
    write_log("📌 Entered create() method");

    // Capture and log membershipType for debugging
    $membershipType = $data['membershipType'] ?? '';
    write_log("🔖 membershipType: {$membershipType}");

    // ─── PROCESS OLD MEMBER EMAILS ────────────────────────────────────────────
    // Expecting a comma-separated list of id:email pairs in POST
    if (!empty($_POST['oldMemberEmails'])) {
        $pairs = explode(',', $_POST['oldMemberEmails']);
        foreach ($pairs as $index => $pair) {
            list($oldId, $oldEmail) = array_pad(explode(':', $pair, 2), 2, null);
            if ($oldId && $oldEmail) {
                $prefix = 'old' . ($index + 1) . '-';
                $newEmail = $prefix . time() . '-' . $oldEmail;

                $url = "{$self->baseURL}/v2.2/Members/UpdateMemberDetails/{$oldId}";
                $patch = [[
                    'op'    => 'replace',
                    'path'  => '/PersonalData/Email',
                    'value' => $newEmail
                ]];
                $res = $self->patchApiRequest(
                    $url,
                    $patch,
                    ['Content-Type' => 'application/json-patch+json']
                );
                write_log("↪️ PATCH updated email for member {$oldId}: {$newEmail}, response: {$res}");
            }
        }
    }

    // ─── DETERMINE MEMBER ID ──────────────────────────────────────────────────
    $memberId = isset($data['memberId'])
        ? (int) $data['memberId']
        : (int) ($_POST['memberId'] ?? 0);
    write_log("Checking for existing member ID: {$memberId}");

    // Map gender to PG enum strings
    $sexString = match (strtolower($data['gender'] ?? '')) {
        'm', 'male'   => 'Male',
        'f', 'female' => 'Female',
        'o', 'other'  => 'Other',
        default       => null,
    };

    $paymentSourceId = null;

    // ─── EXISTING MEMBER FLOW ─────────────────────────────────────────────────
    if ($memberId) {
        write_log("👤 Running existing-member flow for {$memberId}");

        // Attach billing method if present
        if (!empty($data['cardNumber'])) {
            $ccArgs = [
                'memberId'   => $memberId,
                'creditCard' => [
                    'cardNumber'  => $data['cardNumber'],
                    'expiryMonth' => $data['expiryMonth'],
                    'expiryYear'  => $data['expiryYear'],
                    'cvc'         => $data['cvc'],
                ],
            ];
            $r = $self->postApiRequest("{$self->baseURL}/v2.2/PaymentSources/AddCreditCardPaymentSource", $ccArgs, null, 16);
            write_log("💳 AddCreditCardPaymentSource result: {$r}");
            $paymentSourceId = json_decode($r)->paymentSourceId ?? null;

        } elseif (!empty($data['bsb'])) {
            $ddArgs = [
                'memberId'    => $memberId,
                'directDebit' => [
                    'bsb'               => $data['bsb'],
                    'accountNumber'     => $data['accountNumber'],
                    'accountHolderName' => $data['accountHolderName'],
                    'accountType'       => $data['accountType'] ?? 1,
                ],
            ];
            $r = $self->postApiRequest("{$self->baseURL}/v2.2/PaymentSources/AddDirectDebitPaymentSource", $ddArgs, null, 16);
            write_log("🏦 AddDirectDebitPaymentSource result: {$r}");
            $paymentSourceId = json_decode($r)->paymentSourceId ?? null;
        }

        // Update personal & address details
        $updateArgs = [
            'memberId'    => $memberId,
            'personalData'=> [
                'firstName'               => $data['firstName']   ?? '',
                'lastName'                => $data['lastName']    ?? '',
                'birthDate'               => $data['dateOfBirth'] ?? '',
                'sex'                     => $sexString,
                'phoneNumber'             => $data['phoneNumber'] ?? '',
                'email'                   => $data['email']       ?? '',
                'citizenshipCountrySymbol'=> 'AU',
            ],
            'addressData' => [
                'street'        => $data['address']  ?? '',
                'cityName'      => 'Perth',
                'postalCode'    => $data['postCode'] ?? '',
                'countrySymbol' => 'AU',
            ],
        ];
        $upRes = $self->postApiRequest("{$self->baseURL}/v2.2/Members/updateMemberDetails", $updateArgs, null, 16);
        write_log("✏️ updateMemberDetails response: {$upRes}");

        // Add primary contract (v2.2)
        $contractArgs = [
            'memberId'        => $memberId,
            'clubId'          => $data['gymId'],
            'paymentSourceId' => $paymentSourceId,
            'contractData'    => [
                'paymentPlanId' => $paymentIdLevel1,
                'signUpDate'    => $data['signUpDate'],
                'startDate'     => $data['startDate'],
            ],
            'homeClubId'      => $data['gymId'],
        ];
        if (!empty($data['discountId'])) {
            $contractArgs['contractData']['contractDiscountsData'] = [[
                'contractDiscountDefinitionId' => $data['discountId']
            ]];
        }
        write_log("🔧 AddContract (v2.2) payload: " . json_encode($contractArgs));
        $cRes = $self->postApiRequest("{$self->baseURL}/v2.2/Contracts/AddContract", $contractArgs, null, 16);
        write_log("📄 AddContract response: {$cRes}");

        // Decode response
        $cResObj = json_decode($cRes);
        $lvl1    = (is_object($cResObj) && isset($cResObj->contractId)) ? $cResObj->contractId : null;

        // Set agreements
        foreach ([1,2,4,6,7,8,9] as $agrId) {
            $agr = ['memberId'=>$memberId, 'agreementId'=>$agrId, 'agreementAnswer'=>true];
            $r   = $self->postApiRequest("{$self->baseURL}/v2.2/Members/SetAgreementAnswer", $agr, null, 16);
            write_log("📝 Agreement {$agrId} response: {$r}");
        }

        // Optional secondary contract
        if ($membershipType === 'level-2' && $paymentIdLevel2 && $lvl1) {
            $lh = new ContractHandler();
            if (!empty($data['discountId'])) {
                $lh->addSecondaryContractWithDiscount($data, $paymentIdLevel2, $memberId, $lvl1);
            } else {
                $lh->addSecondaryContract($data, $paymentIdLevel2, $memberId, $lvl1);
            }
        }

        // Transfer home club
        $transferUrl  = "{$self->baseURL}/v2.2/Members/HomeClubTransfer";
        $transferArgs = ['memberId'=>$memberId,'targetClubId'=>$data['gymId'],'clubTransferType'=>'Force'];
        write_log("▶️ HomeClubTransfer payload: " . json_encode($transferArgs));
        $res = $self->postApiRequest($transferUrl, $transferArgs, ['Content-Type'=>'application/json'], 16);
        write_log("↪️ HomeClubTransfer response: " . var_export($res, true));

        return $cResObj;
    }

    // ─── CREATE NEW MEMBER ─────────────────────────────────────────────────────
    write_log("🆕 No memberId provided; creating new member");
    $contractData = [
        'paymentPlanId' => $paymentIdLevel1,
        'signUpDate'    => $data['signUpDate'],
        'startDate'     => $data['startDate'],
    ];
    if (!empty($data['discountId'])) {
        $contractData['contractDiscountsData'] = [[
            'contractDiscountDefinitionId' => $data['discountId']
        ]];
    }
    $createArgs = [
        'contractData'    => $contractData,
        'homeClubId'      => $data['gymId'],
        'paymentSourceId' => $data['paymentSourceId'] ?? null,
        'personalData'    => [
            'firstName'               => $data['firstName'],
            'lastName'                => $data['lastName'],
            'birthDate'               => $data['dateOfBirth'],
            'sex'                     => $sexString,
            'phoneNumber'             => $data['phoneNumber'],
            'email'                   => $data['email'],
            'citizenshipCountrySymbol'=> 'AU',
        ],
        'addressData'     => [
            'street'     => $data['address'],
            'cityName'   => $data['suburb'],
            'postalCode' => $data['postCode'],
            'countrySymbol'=> 'AU',
        ],
        'agreements'      => array_map(fn($i)=>['agreementId'=>$i,'agreementAnswer'=>true],[1,2,4,6,7,8,9]),
    ];
    write_log("🔧 AddContractMember (v2.1) payload: " . json_encode($createArgs));
    $createRes = $self->postApiRequest("{$self->baseURL}/v2.1/Members/AddContractMember", $createArgs, null, 16);
    write_log("📥 AddContractMember response: {$createRes}");

    $createObj = json_decode($createRes);
    return $createObj ?: false;
}












    /**
     * Creates a guest in the PerfectGym system.
     *
     * @param array $data The user data.
     * @return mixed The created user object.
     */
    public static function createAsGuest($data)
    {
        $self = new self();

        // If an existing memberId is provided, rename that member’s email first
        if (!empty($_POST['memberId']) && is_numeric($_POST['memberId'])) {
            $memberId      = (int) $_POST['memberId'];
            $oldMemberEmail = $_POST['oldMemberEmail'] ?? null;

            if ($oldMemberEmail) {
                write_log("📌 Renaming email for existing member ID {$memberId}");

                $updateUrl = "{$self->baseURL}/v2.2/Members/UpdateMemberDetails/{$memberId}";
                $newEmail  = 'old-' . time() . '-' . $oldMemberEmail;

                $patchArgs = [
                    [
                        'op'    => 'replace',
                        'path'  => 'PersonalData/Email',
                        'value' => $newEmail,
                    ],
                ];

                $patchRes = $self->patchApiRequest(
                    $updateUrl,
                    $patchArgs,
                    ['Content-Type' => 'application/json-patch+json']
                );

                write_log("🔄 Patched member {$memberId} email to {$newEmail}");
                write_log("↪️ PG response (email patch): {$patchRes}");
            }
        }

        // Now create a brand-new guest member
        write_log("📌 Creating new guest member");

        $apiUrl = "{$self->baseURL}/v2.1/Members/AddGuestMember";
        $payload = [
            'homeClubId'   => $data['gymId'],
            'personalData' => [
                'firstName'   => $data['firstName'],
                'lastName'    => $data['lastName'],
                'birthDate'   => $data['dateOfBirth'],
                'sex'         => $data['gender'],
                'phoneNumber' => $data['phoneNumber'],
                'email'       => $data['email'],
            ],
            'addressData'  => [
                'line1'      => $data['address'],
                'city'       => $data['suburb'],
                'postalCode' => $data['postCode'],
                'country'    => 'AU',
            ],
            'agreements'   => [
                ['agreementId' => 1, 'agreementAnswer' => true],
                ['agreementId' => 2, 'agreementAnswer' => true],
                ['agreementId' => 4, 'agreementAnswer' => true],
                ['agreementId' => 6, 'agreementAnswer' => true],
                ['agreementId' => 7, 'agreementAnswer' => true],
                ['agreementId' => 8, 'agreementAnswer' => true],
                ['agreementId' => 9, 'agreementAnswer' => true],
            ],
        ];

        $response = $self->postApiRequest($apiUrl, $payload);
        if (!$response) {
            return new \WP_Error("cannot-add-guest", "No response for creating guest member.");
        }

        return json_decode($response);
    }


    /**
     * Add the emergency contact details
     *
     * @param array $data
     * @return void
     */
    public static function addEmergencyContact($user, $data)
    {
        $self = new self();
        $apiUrl = "$self->baseURL/v2.1/Members/SetMemberCustomAttributes";
        $data = array(
            'memberId' => $user->memberId,
            "customAttributes" => array(
                ['customAttributeDefinitionId' => 9, 'value' => $data['emergencyContactName']],
                ['customAttributeDefinitionId' => 10, 'value' => $data['emergencyContactPhone']],
            ),

        );

        $response = $self->postApiRequest($apiUrl, $data);

        if (!$response) {
            return new \WP_Error("cannot-add-emergency-contact", "No response for emergency contact.");
        }

        return json_decode($response);
    }

    /**
     * Add a note to the user to show which level they signed up for
     *
     * @param object $user
     * @param string $membershipType
     */
    public static function addNote($user, $formData)
    {
        $gymPostID = get_post_id_by_title($formData['gymName']);
        $gymPost = get_post($gymPostID);

        $self = new self();
        $apiUrl = "$self->baseURL/v2.1/Members/AddMemberNote";
        $membershipType = ucwords(str_replace('-', ' ', $formData['membershipType']));
        $data = [
            'memberId' => $user->memberId,
            'note' => "Signed up for $membershipType Guest"
        ];

        if (isInPresale($gymPost) && isGymOpen($gymPostID)) {
            $data['note'] = 'Free Guest Pass (Pre-sale)';
        }

        // Must be a 'bring a friend' entry
        if ($formData['friendsName']) {
            $data['note'] = "Bring a Friend guest; {$formData['friendsName']}";
        }

        $response = $self->postApiRequest($apiUrl, $data);

        if (!$response) {
            write_log("Cannot add note for guest user: $user->email - $membershipType");
            return new \WP_Error("cannot-add-note", "No response for adding note.");
        }

        return json_decode($response);
    }

    /**
     * Add a note to the user
     *
     * @param object $user
     * @param string $membershipType
     */
    public static function addStaffNote($user, $message)
    {
        $self = new self();
        $apiUrl = "$self->baseURL/v2.1/Members/AddMemberNote";
        $data = [
            'memberId' => $user['memberId'],
            'note' => $message
        ];

        $response = $self->postApiRequest($apiUrl, $data);

        if (!$response) {
            write_log("Cannot add staff note for user: {$user['email']}");
            return new \WP_Error("cannot-add-note", "No response for adding note.");
        }

        return json_decode($response);
    }

    /**
     * Checks if an active person with the given email exists in the PerfectGym system.
     *
     * @param string $email The email address to check.
     * @return bool Returns true if an active person with the email exists, false otherwise.
     */
    public static function exists($email)
    {
        $self = new self();
        $email = urlencode($email);
        $apiUrl = $self->baseURL . "/v2/odata/Members?\$expand=contracts&\$filter=email eq '$email'";
        $response = $self->getApiRequest($apiUrl, null, 16);
        $user = json_decode($response, true);
        $HIITFIT_ID = 8;
        // remove return false to enable this function again
        return false;

        write_log("Checking if $email exists...");

        if (!isset($user)) {
            return false;
        }

        write_log([$email, $user["value"]]);

        // Check if the person exists, is active, ignoring HIITFIT and hasn't signed up in last 24 hours
        $TIME_TO_CHECK = 86400; // 24 hours

        foreach ($user["value"] as $user) {
            if (
                $user["homeClubId"] !== $HIITFIT_ID
                && $user["isActive"]
                && !$user["isDeleted"]
                && $user["contracts"]
            ) {
                foreach ($user["contracts"] as $contract) {
                    if ($contract["signUpDate"]) {
                        $time = strtotime($contract["signUpDate"]);
                        if ($time && $time > time() - $TIME_TO_CHECK) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    /**
     * Link the EzyPay payment method to PerfectGym
     */
    public static function linkCreditCard($formData, $userId, $ezypayId)
    {
        if (!isset($ezypayId)) {
            write_log('No EzyPay ID');
        }

        if (!isset($formData['cardToken'])) {
            write_log('No payment method token');
        }

        write_log('Card Expiry: ' . $formData['expiryDate']);

        $self = new self();
        $apiUrl = "$self->baseURL/v2.1/CreditCards/SaveCreditCardWithToken";
        $args = array(
            'memberId' => $userId ? $userId : $_POST['memberId'],
            'holderName' => $formData['accountHolderName'],
            'maskedPan' => $formData['maskedCard'],
            'last4' => $formData['lastFour'],
            'cardBin' => $formData['firstSix'],
            'validThru' => $formData['expiryDate'],
            'cardIssuer' => $formData['cardType'],
            'cardToken' => $formData['cardToken'],
            'assignToContractsMode' => 'AssignToAllActiveContracts',
            'providerUserId' => $ezypayId
        );
        write_log(['ARGS', $args]);

        $response = $self->postApiRequest($apiUrl, $args, null, 16);

        if (!$response) {
            write_log('Couldn\'t link card payment to EzyPay.');
        }

        return json_decode($response);
    }

    /**
     * Link the EzyPay payment method to PerfectGym
     */
    public static function linkDirectDebit($formData, $userId)
    {
        if (!isset($formData['bankAccountNumber']) || !isset($formData['bsb']) || !isset($formData['bankAccountHolder'])) {
            write_log(['Missing Direct Debit information', [$formData['bankAccountNumber'], $formData['bsb'], $formData['bankAccountHolder']]]);
        }

        $self = new self();
        $apiUrl = "$self->baseURL/v2.1/MemberPaymentSource/AddDirectDebitPaymentMethod";
        $args = array(
            'memberId' => $userId ? $userId : $_POST['memberId'],
            'accountNumber' => $formData['bankAccountNumber'],
            'bankCode' => strlen((string) $formData['bsb']) == 5 ? (string) (0 . $formData['bsb']) : (string) $formData['bsb'],
            'ownerName' => $formData['bankAccountHolder'],
            'assignToContractsMode' => 'AssignToAllActiveContracts'
        );

        $response = $self->postApiRequest($apiUrl, $args, null, 16);

        return json_decode($response);
    }

    /**
     * Cancel a users contract
     */
    public static function cancelContract($userId, $endDate)
    {
        $self = new self();
        $apiUrl = "$self->baseURL/v2.1/Contracts/CancelMemberContracts";
        $args = [
            'memberId' => $userId,
            'cancelDate' => $endDate,
            'endDate' => $endDate,
            'overridenEarlyTerminationFee' => 0
        ];

        $response = $self->postApiRequest($apiUrl, $args, null, 16);

        return json_decode($response);
    }

    /**
     * Add tags to a group of users
     *
     * @param int[] $userIds
     * @param string[] $tags
     */
    public static function addTags(array $userIds, array $tags)
    {
        $self = new self();
        $apiUrl = "$self->baseURL/v2.1/Members/AddTags";
        $data = [
            'memberIds' => $userIds,
            'tags' => $tags
        ];

        $response = $self->postApiRequest($apiUrl, $data);

        if (!$response) {
            write_log("Cannot add tag '$tags[0]'");
            return new \WP_Error("cannot-add-tag", "No response for adding tags.");
        }

        return json_decode($response);
    }
}
