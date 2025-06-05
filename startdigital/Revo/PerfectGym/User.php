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
    public static function create($data, $paymentIdOne)
    {
        $self = new self();
        write_log("POST DATA:", json_encode($data));
        // If memberId is provided, add contract to existing member
        if (!empty($data['memberId'])) {
            $apiUrl = "$self->baseURL/v2.1/Contracts/AddContract";
            $args = [
                "memberId"     => $data['memberId'],
                "paymentPlanId" => $paymentIdOne,
                "signUpDate"   => $data['signUpDate'],
                "startDate"    => $data['startDate'],
                "clubId"       => $data['gymId'],
            ];
            write_log('mb args:', $args);
        } else {
            // Fallback: Add new member and contract
            $apiUrl = "$self->baseURL/v2.1/Members/AddContractMember";
            $args = [
                "contractData" => [
                    'paymentPlanId' => $paymentIdOne,
                    'signUpDate'    => $data['signUpDate'],
                    'startDate'     => $data['startDate'],
                ],
                "homeClubId" => $data['gymId'],
                "personalData" => [
                    'firstName'   => $data['firstName'],
                    'lastName'    => $data['lastName'],
                    'birthDate'   => $data['dateOfBirth'],
                    'sex'         => $data['gender'],
                    'phoneNumber' => $data['phoneNumber'],
                    'email'       => $data['email'],
                ],
                "addressData" => [
                    'street'     => $data['address'],
                    'cityName'   => $data['suburb'],
                    'postalCode' => $data['postCode'],
                    'country'    => 'AU'
                ],
                "agreements" => [
                    ['agreementId' => 1, 'agreementAnswer' => true],
                    ['agreementId' => 2, 'agreementAnswer' => true],
                    ['agreementId' => 4, 'agreementAnswer' => true],
                    ['agreementId' => 6, 'agreementAnswer' => true],
                    ['agreementId' => 7, 'agreementAnswer' => true],
                    ['agreementId' => 8, 'agreementAnswer' => true],
                    ['agreementId' => 9, 'agreementAnswer' => true],
                ]
            ];
        }
        write_log("➡️ Using memberId: {$data['memberId']} for AddContract");
        write_log("📤 AddContract payload: " . json_encode($args));
        $response = $self->postApiRequest($apiUrl, $args, null, 16);
        write_log("📥 PG response: $response");

        if (!$response) {
            write_log("No response for adding contract: " . json_encode($data));
            return false;
        }

        return json_decode($response);
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
            'memberId' => $userId,
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
            'memberId' => $userId,
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
