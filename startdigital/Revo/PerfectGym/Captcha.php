<?php

namespace Revo\PerfectGym;

use Revo\Core\Session;

class Captcha
{
    /**
     * Verifies the captcha response with the Google reCAPTCHA API.
     *
     * @return array|null Returns the response from the API in an array format, or null if the response cannot be decoded.
     */
    public static function verify($captchaToken)
    {
        try {
            $apiUrl = 'https://www.google.com/recaptcha/api/siteverify';
            $headers = [
                'Content-Type: application/x-www-form-urlencoded'
            ];
            $data = [
                'secret' => $_ENV['RECAPTCHA_SECRET'],
                'response' => $captchaToken
            ];

            $response = (new PerfectGymClient())->postApiRequest($apiUrl, $data, $headers);

            return json_decode($response, true);
        } catch (\Exception $exception) {
            Session::flash('errors', 'Recaptcha failed.');
        }
    }
}
