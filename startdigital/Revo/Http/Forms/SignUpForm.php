<?php

namespace Revo\Http\Forms;

use Revo\Core\Validator;
use Revo\Core\ValidationException;
use Revo\Http\Forms\FormSubmission;
use Revo\Http\Forms\GuestFormSubmission;

class SignUpForm
{
    protected $errors = [];

    public function __construct(public array $attributes)
    {
        $payingByBank = $attributes['paymentFrequency'] !== 'fiveWeek' && !empty($attributes['bankAccountHolder'] && !empty($attributes['BSB']) && !empty($attributes['bankAccountNumber']) && empty($attributes['cardType']));

        if (!Validator::name($attributes['firstName'])) {
            $this->errors['firstName'] = 'Please enter a valid first name.';
        }

        if (!Validator::name($attributes['lastName'])) {
            $this->errors['lastName'] = 'Please enter a valid last name.';
        }

        if (!Validator::email($attributes['email'])) {
            $this->errors['email'] = 'Please provide a valid email address.';
        }

        if (!Validator::allowedEmail($attributes['email'])) {
            $this->errors['email'] = 'This email has been blocked. Please contact us for more information.';
        }

        if (!Validator::phone($attributes['phoneNumber'])) {
            $this->errors['phoneNumber'] = 'Please use a valid mobile number (only numbers, spaces, brackets and the + sign).';
        }

        if (!Validator::address($attributes['address'])) {
            $this->errors['address'] = 'Please provide a valid address.';
        }

        if (!Validator::suburb($attributes['suburb'])) {
            $this->errors['suburb'] = 'Please provide a valid suburb.';
        }

        if (!Validator::postCode($attributes['postCode'])) {
            $this->errors['postCode'] = 'Please provide a valid 4-digit post code.';
        }

        if (!Validator::name($attributes['bankAccountHolder']) && $payingByBank) {
            $this->errors['bank'] = 'Bank account name must not contain special characters.';
        }
    }

    public static function validate($attributes)
    {
        $instance = new static($attributes);

        return $instance->failed() ? $instance->throw() : $instance;
    }

    public function throw()
    {
        ValidationException::throw($this->errors(), $this->attributes);
    }

    public function failed()
    {
        return count($this->errors);
    }

    public function errors()
    {
        return $this->errors;
    }

    public function error($field, $message)
    {
        $this->errors[$field] = $message;

        return $this;
    }

    public static function submit($data, $isGuest = false)
    {
        $isGuest ? new GuestFormSubmission($data) : new FormSubmission($data);
    }
}
