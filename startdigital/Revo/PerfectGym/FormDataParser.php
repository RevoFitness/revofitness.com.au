<?php

namespace Revo\PerfectGym;

use DateTime;
use Revo\API;

class FormDataParser
{
    /**
     * Sanitizes the form data by applying htmlspecialchars to each value.
     *
     * @param array $formData The form data to be sanitized.
     * @return array The sanitized form data.
     */
    public static function sanitizeData($formData)
    {
        $self = new self();

        foreach ($formData as $key => $value) {
            // Allow apostrophes
            if ($key == 'firstName' || $key == 'lastName' || $key == 'address' || $key == 'suburb') {
                $name = str_replace('\\', '', $value);
                $formData[$key] = $name;
                continue;
            }

            if ($key == 'phoneNumber') {
                $phone = str_replace(' ', '', $value);
                $formData[$key] = $self::toNumericFormat($phone, '61');
                continue;
            }

            if ($key == 'bankAccountNumber' || $key == 'BSB' || $key == 'firstSix' || $key == 'lastFour' || $key == 'postCode') {
                continue;
            }

            $formData[$key] = is_numeric($value) ? intval(htmlspecialchars($value)) : htmlspecialchars($value);
        }

        return $formData;
    }

    /**
     * Parses and formats the form data.
     *
     * @param array $formData The form data to be parsed.
     * @return array The parsed and formatted data.
     */
    public static function parse($formData)
    {
        date_default_timezone_set('Australia/Perth');

        $formData = self::sanitizeData($formData);

        $api = new API();

        $dateOfBirth = $formData['dateOfBirth'];
        $gymId = $api->getClubWhereName($formData['gymSelect'])->id;

        if (!empty($formData['discountCode'])) {
            $discount = $api->getDiscountByCode($formData['discountCode'], $gymId);
            $discountId = $discount->id ?? null;
        }

        $currentGymID = get_the_ID(getGymByName($formData['gymSelect']));

        $expiryDate = $formData['cardExpiry'];
        $cardExpiry = date("$expiryDate-28\TH:i:s.v\Z");

        // Ensure start date is never before sign up date
        if ($formData['startDate']) {
            $reformattedDate = DateTime::createFromFormat('d/m/Y', $formData['startDate'])->format('Y-m-d');
        }

        $startTimestamp = strtotime($reformattedDate . ' UTC'); // Convert to UTC
        $currentUtcTimestamp = strtotime(gmdate("Y-m-d"));
        if ($startTimestamp < $currentUtcTimestamp) {
            $startTimestamp = $currentUtcTimestamp;
        }

        $data = [
            "gymId" => $gymId,
            "gymName" => $formData['gymSelect'],
            "state" => $formData['state'],
            "firstName" => $formData['firstName'],
            "lastName" => $formData['lastName'],
            "email" => $formData['email'],
            "memberId" => $formData['memberId'] ?? '',
            "oldMemberId" => $formData['oldMemberId'] ?? '',
            "oldMemberEmail" => $formData['oldMemberEmail'] ?? '',
            "oldMemberEmails" => $formData['oldMemberEmails'] ?? '',
            "phoneNumber" => str_replace(' ', '', $formData['phoneNumber']),
            "dateOfBirth" => date('Y-m-d', strtotime(str_replace('/', '-', $dateOfBirth))),
            "gender" => $formData['gender'] ?: 'Other',
            "address" => $formData['address'],
            "suburb" => $formData['suburb'],
            "postCode" => $formData['postCode'],
            "termsConditions" => $formData['termsConditions'],
            "startDate" =>  gmdate("Y-m-d\TH:i:s\Z", $startTimestamp),
            "signUpDate" => gmdate("Y-m-d\TH:i:s\Z", strtotime("today UTC")),
            "signUpDatePlus" => gmdate("Y-m-d\TH:i:s\Z", strtotime("+1 day")),
            "signUpDatePast" => gmdate("Y-m-d\TH:i:s\Z", strtotime("-1 day")),
            "cardToken" => $formData['paymentMethodToken'] ?: '',
            "accountHolderName" => $formData['accountHolderName'] ?? '',
            "lastFour" => $formData['lastFour'] ?? '',
            "firstSix" => $formData['firstSix'] ?? '',
            "cardType" => $formData['cardType'] ?? '',
            "maskedCard" => $formData['firstSix'] . "****" . $formData['lastFour'] ?? '',
            "expiryDate" => $cardExpiry ?? '',
            "bsb" => str_replace([' ', '-'], '', $formData['BSB']) ?? '',
            "bankAccountNumber" => str_replace([' ', '-'], '', $formData['bankAccountNumber']) ?? '',
            "bankAccountHolder" => $formData['bankAccountHolder'] ?? '',
            "paymentFrequency" => $formData['paymentFrequency'],
            "discountCode" => $formData['discountCode'] ?? '',
            "discountId" => $discountId,
            "captchaToken" => $formData['captchaToken'],
            "membershipType" => $formData['membershipType'],
            "isGuest" => $formData['isGuest'] ?: null,
            "friendsName" => $formData['friendsName'] ?: null,
            "isPresale" => $formData['isPresale'] ?: null,
            "openDate" => get_field('gym_open_date', $currentGymID) ?: $formData['openDate'] ?? null, // if the gym open date is different to the presale date
            "signature" => $formData['signed'] . $formData['signedPart2'] ?? false,
            "endDate" => $formData['endDate'] ?: null,
        ];

        if (isset($formData['emergencyFirstName']) && isset($formData['emergencyEmail']) && isset($formData['emergencyAddress']) && isset($formData['emergencyRelationship'])) {
            $data['emergencyContactName'] = $formData['emergencyFirstName'] . ' ' . $formData['emergencyLastName'];
            $data['emergencyContactEmail'] = $formData['emergencyEmail'];
            $data['emergencyContactAddress'] = $formData['emergencyAddress'];
            $data['emergencyContactRelationship'] = $formData['emergencyRelationship'];
        }

        // Logging all besides bank account number
        write_log([
            "gymId" => $gymId,
            "gymName" => $formData['gymSelect'],
            "state" => $formData['state'],
            "firstName" => $formData['firstName'],
            "lastName" => $formData['lastName'],
            "email" => $formData['email'],
            "memberId" => $formData['memberId'] ?? '',
            "phoneNumber" => str_replace(' ', '', $formData['phoneNumber']),
            "dateOfBirth" => date('Y-m-d', strtotime(str_replace('/', '-', $dateOfBirth))),
            "gender" => $formData['gender'] ?: 'Other',
            "address" => $formData['address'],
            "suburb" => $formData['suburb'],
            "postCode" => $formData['postCode'],
            "termsConditions" => $formData['termsConditions'],
            "startDate" =>  gmdate("Y-m-d\TH:i:s\Z", $startTimestamp),
            "signUpDate" => gmdate("Y-m-d\TH:i:s\Z", strtotime("today UTC")),
            "signUpDatePlus" => gmdate("Y-m-d\TH:i:s\Z", strtotime("+1 day")),
            "signUpDatePast" => gmdate("Y-m-d\TH:i:s\Z", strtotime("-1 day")),
            "cardToken" => $formData['paymentMethodToken'] ?: '',
            "accountHolderName" => $formData['accountHolderName'] ?? '',
            "lastFour" => $formData['lastFour'] ?? '',
            "firstSix" => $formData['firstSix'] ?? '',
            "cardType" => $formData['cardType'] ?? '',
            "maskedCard" => $formData['firstSix'] . "****" . $formData['lastFour'] ?? '',
            "expiryDate" => $cardExpiry ?? '',
            "bsb" => str_replace([' ', '-'], '', $formData['BSB']) ?? '',
            "bankAccountHolder" => $formData['bankAccountHolder'] ?? '',
            "paymentFrequency" => $formData['paymentFrequency'],
            "discountCode" => $formData['discountCode'] ?? '',
            "discountId" => isset($discountId) ? $discountId : null,
            "captchaToken" => $formData['captchaToken'],
            "membershipType" => $formData['membershipType'],
            "isGuest" => $formData['isGuest'] ?: null,
            "isPresale" => $formData['isPresale'] ?: null,
            "openDate" => get_field('gym_open_date', $currentGymID) ?: $formData['openDate'] ?? null,
            "signature" => $formData['signed'] . $formData['signedPart2'] ?? false,
            "isUnder18" => self::isUnder18($dateOfBirth)
        ]);

        return $data;
    }

    public static function toNumericFormat($phoneNumber, $defaultCountryCode = null)
    {
        // Remove all characters except digits
        $phoneNumber = preg_replace('/\D/', '', $phoneNumber);

        // Check if the phone number already contains the country code
        if (substr($phoneNumber, 0, strlen($defaultCountryCode)) === $defaultCountryCode) {
            // Replace the country code with '0'
            $phoneNumber = '0' . substr($phoneNumber, strlen($defaultCountryCode));
        } elseif ($phoneNumber[0] !== '0' && $defaultCountryCode) {
            // Prepend '0' since the country code is not part of the input
            $phoneNumber = '0' . $phoneNumber;
        }

        // If the phone number is longer than 10 digits, truncate it to the first 10 digits
        if (strlen($phoneNumber) > 10) {
            $phoneNumber = substr($phoneNumber, 0, 10);
        }

        return $phoneNumber;
    }

    public static function isUnder18($dateOfBirth)
    {
        $dob = DateTime::createFromFormat('d/m/Y', $dateOfBirth);

        if (!$dob) {
            return false;
        }

        $today = new DateTime();
        $age = $today->diff($dob)->y;


        return ($age < 18);
    }
}
