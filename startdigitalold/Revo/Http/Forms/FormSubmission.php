<?php

namespace Revo\Http\Forms;

use Revo\Core\Session;
use Revo\PerfectGym\User;
use Revo\PerfectGym\Captcha;
use Revo\PerfectGym\PaymentId;
use Revo\PerfectGym\PerfectGym;
use Revo\PerfectGym\EzyPayClient;
use Revo\Core\ValidationException;
use Revo\PerfectGym\FormDataParser;

class FormSubmission
{
    protected $errors = [];

    public function __construct(private array $data)
    {
        try {
            // User didn't submit any payment details
           if (($data['paymentFrequency'] !== 'fiveWeek' && $data['paymentFrequency'] !== 'special_circumstances') && empty($data['BSB']) empty($data['cardType'])) {

                write_log("{$data['email']} submitted with no payment details. Aborting");
                write_log("Payment Frequency: {$data['paymentFrequency']}");
                write_log("BSB: {$data['BSB']}");
                write_log("Card Type: {$data['cardType']}");
                
                $this->errors['user'] = 'Cannot create user. Please try again later.';
                $this->throw();
            } else {
                write_log("Payment details are valid for {$data['email']}");
            }

            // Is a bank, get the token
            if (empty($data['paymentMethodToken']) && !empty($data['BSB']) && ($data['paymentFrequency'] !== 'fiveWeek' && $data['paymentFrequency'] !== 'special_circumstances')) {
                $data['paymentMethodToken'] = EzyPayClient::createBankToken($data);
                write_log('Bank token', $data['paymentMethodToken']);
            }

            $data = FormDataParser::parse($data);

            Captcha::verify(htmlspecialchars($data['captchaToken']));

            $paymentIds = PaymentId::generate($data);
            $paymentIdOne = is_object($paymentIds) ? $paymentIds->signUp : $paymentIds;
            $paymentIdTwo = is_object($paymentIds) ? $paymentIds->addOn : '';

            // Not paid and not paying over the counter
            if (empty($data['cardToken']) && !empty($data['cardType']) && ($data['paymentFrequency'] !== 'fiveWeek' && $data['paymentFrequency'] !== 'special_circumstances')) {
                write_log('Payment token is empty for Credit Card payment.');
                $this->errors['card'] = 'Something went wrong. Please try again.';
                $this->throw();
            }

            // Not paid and not paying over the counter
            if (empty($data['cardToken']) && !empty($data['bsb']) && ($data['paymentFrequency'] !== 'fiveWeek' && $data['paymentFrequency'] !== 'special_circumstances')) {
                write_log('Payment token is empty for Direct Debit payment. Ending process');
                $this->errors['bank'] = 'Invalid bank details. Please try again.';
                $this->throw();
            }

            if (User::exists($data['email'])) {
                write_log("{$data['email']} has signed up in the last 24 hours");
                // Need to throw these errors
                $this->errors['email'] = 'This email address has already signed up in the past 24 hours. Please try again later.';
                $this->throw();
            }

            // Create the user
            $user = User::create($data, $paymentIdOne);
            if (!$user) {
                write_log('Can\'t create user. Aborting');
                $this->errors['user'] = 'Cannot create user. Please try again later.';
                $this->throw();
                return;
            }

            $userData = array(
                'memberId' => $user->memberId,
                'contractId' => $user->contractId
            );
            write_log("User created with $user->memberId");

            // Not a Five Week membership, accept payment online
            if (($data['paymentFrequency'] !== 'fiveWeek' && $data['paymentFrequency'] !== 'special_circumstances')) {
                // Only required for card payments
                if (!empty($data['cardToken'])) {
                    $ezyPayCustomer = EzyPayClient::customer($data, $userData['memberId']);

                    if (!$ezyPayCustomer) {
                        write_log('EzyPay customer could not be created.');
                    } else {
                        EzyPayClient::assignPayment($data, $ezyPayCustomer->id);
                    }
                }
            }

            PerfectGym::member($data, $userData, $paymentIdTwo, $ezyPayCustomer);
        } catch (ValidationException $exception) {
            Session::flash('errors', $exception->errors);
            Session::flash('old', $data);
        }
    }

    public function throw()
    {
        ValidationException::throw($this->errors());
    }

    public function errors()
    {
        return $this->errors;
    }

    public function failed()
    {
        return count($this->errors);
    }
}
