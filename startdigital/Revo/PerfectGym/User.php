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
    write_log("Checking for existing member ID: " . json_encode($data['memberId'] ?? 'null'));
    write_log("🧪 paymentIdLevel1: " . var_export($paymentIdLevel1, true));

    $sexValue = match (strtolower($data['gender'] ?? '')) {
        'm', 'male' => 1,
        'f', 'female' => 2,
        'o', 'other' => 0,
        default => 0,
    };

    $paymentSourceId = null;
    $oldMemberId = isset($_POST['oldMemberId']) && is_numeric($_POST['oldMemberId']) ? (int) $_POST['oldMemberId'] : null;

    // 🟡 UPDATE OLD MEMBER EMAIL IF NEEDED
    if ( $oldMemberId ) {
        $updateOldEmailUrl = "$self->baseURL/v2.2/Members/updateMemberDetails";
        $newEmail = 'cancelled-' . time() . '-' . $data['email'];
        $updateOldEmailArgs = [
            "memberId" =>  $oldMemberId
            "personalData" => [
                'email' => $newEmail,
            ]
        ];
        $res = $self->postApiRequest($updateOldEmailUrl, $updateOldEmailArgs, null, 16);
        write_log("✏️ Updated cancelled member ID {$data['oldMemberId']} to email: $newEmail");
        write_log("📥 PG response (email update): $res");
    }

    // ✅ EXISTING MEMBER FLOW
    if (!empty($data['memberId'])) {
        // 🔐 Attach billing method
        if (!empty($data['cardNumber']) && !empty($data['expiryMonth']) && !empty($data['expiryYear']) && !empty($data['cvc'])) {
            $ccArgs = [
                "memberId" => $data['memberId'],
                "creditCard" => [
                    "cardNumber" => $data['cardNumber'],
                    "expiryMonth" => $data['expiryMonth'],
                    "expiryYear" => $data['expiryYear'],
                    "cvc" => $data['cvc']
                ]
            ];
            $res = $self->postApiRequest("$self->baseURL/v2.2/PaymentSources/AddCreditCardPaymentSource", $ccArgs, null, 16);
            write_log("💳 Add Credit Card result: $res");
            $paymentSourceId = json_decode($res)->paymentSourceId ?? null;
        } elseif (!empty($data['bsb']) && !empty($data['accountNumber']) && !empty($data['accountHolderName'])) {
            $ddArgs = [
                "memberId" => $data['memberId'],
                "directDebit" => [
                    "bsb" => $data['bsb'],
                    "accountNumber" => $data['accountNumber'],
                    "accountHolderName" => $data['accountHolderName'],
                    "accountType" => $data['accountType'] ?? 1
                ]
            ];
            $res = $self->postApiRequest("$self->baseURL/v2.2/PaymentSources/AddDirectDebitPaymentSource", $ddArgs, null, 16);
            write_log("🏦 Add Direct Debit result: $res");
            $paymentSourceId = json_decode($res)->paymentSourceId ?? null;
        }

        // 📝 Update member details
        $updateUrl = "$self->baseURL/v2.2/Members/updateMemberDetails";
        $updateArgs = [
            "memberId" => $data['memberId'],
            "personalData" => [
                'firstName' => $data['firstName'] ?? '',
                'lastName' => $data['lastName'] ?? '',
                'birthDate' => $data['dateOfBirth'] ?? '',
                'sex' => $sexValue,
                'phoneNumber' => $data['phoneNumber'] ?? '',
                'email' => $data['email'] ?? '',
                'citizenshipCountrySymbol' => 'AU',
            ],
            "addressData" => [
                'street' => $data['address'] ?? '',
                'cityName' => 'Perth',
                'postalCode' => $data['postCode'] ?? '',
                'countrySymbol' => 'AU'
            ]
        ];
        $updateRes = $self->postApiRequest($updateUrl, $updateArgs, null, 16);
        write_log("📥 PG response from updateMemberDetails: " . var_export($updateRes, true));

        $decodedUpdate = json_decode($updateRes, true);
        if ($updateRes !== '' && json_last_error() !== JSON_ERROR_NONE) {
            write_log("❌ JSON decode error: " . json_last_error_msg());
            return false;
        }
        if (isset($decodedUpdate['errors'])) {
            write_log("❌ PG returned errors:");
            foreach ($decodedUpdate['errors'] as $err) {
                write_log("🔴 " . $err['message']);
            }
            return false;
        }

        // ➕ Add contract
        $contractArgs = [
            "memberId" => $data['memberId'],
            "clubId" => $data['gymId'],
            "paymentSourceId" => $paymentSourceId,
            "contractData" => [
                "paymentPlanId" => $paymentIdLevel1,
                "signUpDate" => $data['signUpDate'],
                "startDate" => $data['startDate'],
            ]
        ];
        if (!empty($data['discountId'])) {
            $contractArgs['contractData']['discountId'] = $data['discountId'];
        }

        $contractRes = $self->postApiRequest("$self->baseURL/v2.2/Contracts/AddContract", $contractArgs, null, 16);
        write_log("📄 Add Level 1 Contract Result: $contractRes");

        // ✅ Add agreements
        foreach ([1, 2, 4, 6, 7, 8, 9] as $agreementId) {
            $agreementArgs = [
                "memberId" => $data['memberId'],
                "agreementId" => $agreementId,
                "agreementAnswer" => true
            ];
            $res = $self->postApiRequest("$self->baseURL/v2.2/Members/SetAgreementAnswer", $agreementArgs, null, 16);
            write_log("📝 Agreement ID $agreementId response: $res");
        }

        // 🔁 Optional level 2 contract
        if (($data['membershipType'] ?? '') === 'level-2' && !empty($paymentIdLevel2)) {
            $contractHandler = new \Revo\PerfectGym\ContractHandler();
            $level1ContractId = json_decode($contractRes)->contractId ?? null;
            if ($level1ContractId) {
                $contractHandler->addSecondaryContract($data, $paymentIdLevel2, $data['memberId'], $level1ContractId);
            }
        }

        return json_decode($contractRes);
    }

    // 🆕 CREATE NEW MEMBER
    $contractData = [
        'paymentPlanId' => $paymentIdLevel1,
        'signUpDate' => $data['signUpDate'],
        'startDate' => $data['startDate'],
    ];
    if (!empty($data['discountId'])) {
        $contractData['discountId'] = $data['discountId'];
    }

    $createArgs = [
        "contractData" => $contractData,
        "homeClubId" => $data['gymId'],
        "paymentSourceId" => $data['paymentSourceId'] ?? null,
        "personalData" => [
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'],
            'birthDate' => $data['dateOfBirth'],
            'sex' => $sexValue,
            'phoneNumber' => $data['phoneNumber'],
            'email' => $data['email'],
            'citizenshipCountrySymbol' => 'AU',
        ],
        "addressData" => [
            'street' => $data['address'],
            'cityName' => $data['suburb'],
            'postalCode' => $data['postCode'],
            'countrySymbol' => 'AU'
        ],
        "agreements" => array_map(fn($id) => [
            'agreementId' => $id,
            'agreementAnswer' => true
        ], [1, 2, 4, 6, 7, 8, 9])
    ];

    write_log("➡️ Creating NEW MEMBER with LEVEL 1 contract...");
    $createRes = $self->postApiRequest("$self->baseURL/v2.1/Members/AddContractMember", $createArgs, null, 16);
    write_log("📥 PG response: $createRes");

    if (!$createRes) {
        write_log("❌ Failed to create new member with contract.");
    }

    return $createRes ? json_decode($createRes) : false;
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
        $apiUrl = "$self->baseURL/v2.1/Members/AddGuestMember";
        $data = array(
            'homeClubId' => $data['gymId'],
            "personalData" => array(
                'firstName' => $data['firstName'],
                'lastName' => $data['lastName'],
                'birthDate' => $data['dateOfBirth'],
                'sex' => $data['gender'],
                'phoneNumber' => $data['phoneNumber'],
                'email' => $data['email'],
            ),
            'addressData' => array(
                'line1' => $data['address'],
                'city' => $data['suburb'],
                'postalCode' => $data['postCode'],
                'country' => 'AU'
            ),
            "agreements" => array(
                array('agreementId' => 1, 'agreementAnswer' => true),
                array('agreementId' => 2, 'agreementAnswer' => true),
                array('agreementId' => 4, 'agreementAnswer' => true),
                array('agreementId' => 6, 'agreementAnswer' => true),
                array('agreementId' => 7, 'agreementAnswer' => true),
                array('agreementId' => 8, 'agreementAnswer' => true),
                array('agreementId' => 9, 'agreementAnswer' => true),
            )
        );

        $response = $self->postApiRequest($apiUrl, $data);

        if (!$response) {
            return new \WP_Error("cannot-add-user", "No response for adding user.");
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
