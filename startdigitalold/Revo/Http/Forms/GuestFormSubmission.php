<?php

namespace Revo\Http\Forms;

use Revo\Core\Session;
use Revo\PerfectGym\Captcha;
use Revo\PerfectGym\PerfectGym;
use Revo\Core\ValidationException;
use Revo\PerfectGym\FormDataParser;

class GuestFormSubmission
{
    public function __construct(private array $data)
    {
        try {
            $data = FormDataParser::parse($data);

            Captcha::verify(htmlspecialchars($data['captchaToken']));

            PerfectGym::member(data: $data, isGuest: true);
        } catch (ValidationException $exception) {
            Session::flash('errors', $exception->errors);
            Session::flash('old', $data);
        }
    }
}
