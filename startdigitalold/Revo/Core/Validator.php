<?php

namespace Revo\Core;

class Validator
{
    /**
     * Validates a name using a regular expression pattern.
     *
     * The regular expression pattern matches a name that starts with a letter (uppercase or lowercase) or a special character from the Latin-1 Supplement Unicode block (such as À, È, Ì, Ò, Ù, à, è, ì, ò, ù), followed by one or more letters, apostrophes, hyphens, or spaces. The name can also contain multiple words separated by spaces.
     *
     * @param string $value The name to be validated.
     * @return bool Returns true if the name is valid, false otherwise.
     */
    public static function name($value)
    {
        $value = stripslashes($value);
        $pattern = '/^[A-Za-z\x{00C0}-\x{00FF}][A-Za-z\x{00C0}-\x{00FF}\'\- ]+$/u';
        $containsNumber = preg_match('/[0-9]/', $value);

        return preg_match($pattern, $value) === 1 && !$containsNumber;
    }

    /**
     * Validates a string based on the specified minimum and maximum length.
     *
     * @param string $value The string value to be validated.
     * @param int $min The minimum length of the string (default: 1).
     * @param int $max The maximum length of the string (default: INF).
     * @return bool Returns true if the string is within the specified length range and contains only alpha characters, spaces, hyphens, commas, apostrophes, full stops, and forward slashes, false otherwise.
     */
    public static function address($value, $min = 1, $max = INF)
    {
        $value = stripslashes($value);
        $value = trim($value);
        $pattern = '/^[A-Za-z0-9\s\',\-.\/]+$/';

        return strlen($value) >= $min && strlen($value) <= $max && preg_match($pattern, $value) === 1;
    }

    /**
     * Validates a string based on the specified minimum and maximum length.
     *
     * @param string $value The string value to be validated.
     * @param int $min The minimum length of the string (default: 1).
     * @param int $max The maximum length of the string (default: INF).
     * @return bool Returns true if the string is within the specified length range and contains only spaces, hyphens, and various types of apostrophes, false otherwise.
     */
    public static function suburb($value, $min = 1, $max = INF)
    {
        $value = stripslashes($value);
        $length = strlen($value);
        if ($length < $min || $length > $max) {
            return false;
        }

        $pattern = "/^[A-Za-z\s\-\’\']*$/";

        return preg_match($pattern, $value);
    }


    public static function email($value)
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL);
    }

    /**
     * Checks if the given email is allowed based on the blocked emails list.
     *
     * @param string $value The email address to check.
     * @return bool Returns true if the email is allowed, false otherwise.
     */
    public static function allowedEmail($value)
    {
        $blockedEmailsString = strip_tags(get_field('blocked_emails', 'options'), '<br />');
        $blockedEmailsString = str_replace("\t\r\n", "\n", $blockedEmailsString);
        $blockedEmails = explode("\n", $blockedEmailsString);

        return !in_array(trim($value), $blockedEmails);
    }

    /**
     * Validates a postal code.
     *
     * This method uses a regular expression to validate a postal code.
     * The regular expression matches a string that consists of exactly four digits.
     *
     * @param string $value The value to be validated.
     * @return bool Returns true if the value is a valid postal code, false otherwise.
     */
    public static function postCode($value)
    {
        return preg_match("/^\d{4}$/", $value);
    }

    /**
     * Validates if a given value is a valid phone number.
     *
     * This method uses a regular expression to match the value against the pattern "/^[+0-9 ()]*$/".
     * The pattern allows for the following characters: digits (0-9), plus sign (+), space ( ), and brackets ().
     *
     * @param string $value The value to be validated.
     * @return bool Returns true if the value is a valid phone number, false otherwise.
     */
    public static function phone($value)
    {
        return preg_match("/^[+0-9 ()]*$/", $value);
    }

    /**
     * Validates a promo code exists on the special circumstances promo code list.
     *
     * @param string $value The promo code to be validated.
     * @return bool Returns true if the promo code exists on the special circumstances promo code list, false otherwise.
     */
    public static function specialCircumstancesPromoCode($value)
    {
        $promoCodes = get_field('special_circumstances_promo_codes', 'options') ?? [];

        $result = array_filter($promoCodes, function ($subArray) use ($value) {
            return in_array($value, $subArray);
        });

        return empty($result) ? false : true;
    }
}
