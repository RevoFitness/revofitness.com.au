<?php

namespace Revo\PerfectGym;

use Revo\PerfectGym\User;
use Revo\PerfectGym\EmailHandler;
use Revo\Core\ValidationException;
use Revo\PerfectGym\ContractHandler;
use Revo\PerfectGym\MailchimpHandler;
use Revo\PerfectGym\RedirectionHandler;

class PerfectGym
{
    protected $errors = [];
    private $contract;
    private $email;
    private $mailchimp;
    private $redirect;

    public function __construct()
    {
        $this->contract = new ContractHandler();
        $this->email = new EmailHandler();
        $this->mailchimp = new MailchimpHandler();
        $this->redirect = new RedirectionHandler();
    }

    public static function member($data, $userData = null, $paymentIdTwo = null, $ezypayCustomer = null, $isGuest = false)
    {
        $perfectGym = new PerfectGym;
        $isGuest ? $perfectGym->registerGuest($data) : $perfectGym->register($data, $userData, $paymentIdTwo, $ezypayCustomer);

        return $perfectGym->failed() ? $perfectGym->throw() : $perfectGym;
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

    /**
     * Registers a credit card for a user.
     *
     * @param array $formData The form data containing user information.
     * @param int $paymentId The payment ID.
     * @return WP_Error|null Returns WP_Error if there is an error, null otherwise.
     */
    public function register($formData, $user, $paymentIdTwo, $ezypayCustomer)
    {
        $userId = $user['memberId'];
        $contractId = $user['contractId'];

        if (!isset($user) || !array_key_exists('memberId', $user)) {
            $this->errors['email'] = 'This email address has been blocked. Please contact us or try again later.';
            $this->throw();
        }

        if ($formData['paymentFrequency'] !== 'fiveWeek') {
            if (!empty($formData['cardType']) && isset($ezypayCustomer->id)) {
                User::linkCreditCard($formData, $userId, $ezypayCustomer->id);
            } else {
                User::linkDirectDebit($formData, $userId);
            }
        }

        if (!empty($paymentIdTwo) && ($formData['membershipType'] == "level-2" || $formData['membershipType'] == "level-3")) {
            write_log("Adding contract for {$formData['membershipType']}");
            $this->contract->addContracts($formData, $paymentIdTwo, $userId, $contractId);
        }

        $this->contract->addSignature($formData['signature'], $contractId);
        $this->contract->addUserAgreements($formData, $userId);

        if ($formData['isUnder18']) {
            User::addEmergencyContact($user, $formData);
        }

        // We need to cancel the contract, probably because it's part of a campaign.
        if (!is_null($formData['endDate'])) {
            User::cancelContract($userId, $formData['endDate']);
            User::addStaffNote($user, "25 in 2025 membership winner - do not rollback cancellation.");
        }

        $this->email->sendEmailConfirmation($formData);

        write_log("Successfully registered user - {$formData['email']} with EzyPay ID: {$ezypayCustomer->id}");

        $this->redirect->toCongratulationsPage($formData);
    }

    /**
     * Registers a credit card for a user.
     *
     * @param array $formData The form data containing user information.
     * @param int $paymentId The payment ID.
     * @return WP_Error|null Returns WP_Error if there is an error, null otherwise.
     */
    public function registerGuest($formData)
    {
        $user = User::createAsGuest($formData);

        if (!isset($user) || !property_exists($user, 'memberId')) {
            $this->errors['email'] = 'This email address has been blocked. Please contact us or try again later.';
            $this->throw();
        }

        User::addNote($user, $formData);
        if ($formData['isUnder18']) {
            User::addEmergencyContact($user, $formData);
        }

        // Must be a 'bring a friend' entry
        if ($formData['friendsName']) {
            User::addTags([$user->memberId], ['BAF']);
            $this->redirect->toBringAFriendPage();
        } else {
            $this->redirect->toThanksPage();
        }
    }
}
