<?php

/**
 * Special page for a campaign that requires unique submission functionality and a obscure URL
 * Template Name: Special Circumstances No Password
 */

use Timber\Timber;
use Revo\Core\Session;
use Revo\Http\Forms\SignUpForm;
use Revo\Core\ValidationException;

define('DONOTCACHEPAGE', true);

$context = Timber::context();
$context['post'] = Timber::get_post();
$context['fields'] = get_fields();
$context['promoCode'] = $_GET['code'] ?? false;
$context['isSpecialCircumstances'] = true;
$accessCode = get_field('access_code');

/**
 * Handle the form submission
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $startDate = DateTime::createFromFormat('d/m/Y', $_POST['startDate']);
        $endDate = clone $startDate;
        $endDate->modify('+31 days');

        $_POST['endDate'] = $endDate->format('Y-m-d\TH:i:s\Z');
        $_POST['paymentFrequency'] = 'special_circumstances';

        SignUpForm::validate($_POST);

        if (empty($_POST['discountCode']) || strtolower($_POST['discountCode']) !== strtolower($accessCode)) {
            ValidationException::throw(['discountCode' => 'You cannot proceed without the access code.'], $_POST);
        }

        SignUpForm::submit($_POST);
    } catch (ValidationException $exception) {
        Session::flash('errors', $exception->errors);
        Session::flash('old', $exception->old);
    }
} else {
    Session::unflash();
}

Timber::render('template-special-circumstances-no-password.twig', $context);
