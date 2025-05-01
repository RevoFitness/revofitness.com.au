<?php

use Timber\Timber;
use Revo\Core\Session;
use Revo\Core\Validator;
use Revo\Http\Forms\SignUpForm;
use Revo\Core\ValidationException;

header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

define('DONOTCACHEPAGE', true);

$context = Timber::context();
$context['post'] = Timber::get_post();
$context['fields'] = get_fields();
$context['promoCode'] = $_GET['code'] ?? false;
$context['isSpecialCircumstances'] = true;

$post_password = $context['fields']['page_password'];

if (!isset($_COOKIE['password-success']) || $_COOKIE['password-success'] !== hash('sha256', $post_password)) {
    if (isset($_POST['password'])) {
        if ($_POST['password'] !== $post_password) {
            $context['error'] = 'Invalid password';
        } else {
            // Set the cookie with a hashed value of the correct password
            setcookie('password-success', hash('sha256', $post_password), time() + 3600, '/'); // 1 hour expiry
            session_regenerate_id(true);
            header('Location: ' . $_SERVER['REQUEST_URI']);
            exit;
        }
    }

    // Render the password form if the password is incorrect or not yet submitted
    Timber::render('single-password.twig', $context);
    exit;
}

/**
 * Handle the form submission
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_POST['password'])) {
    try {
        $_POST['paymentFrequency'] = 'special_circumstances';

        SignUpForm::validate($_POST);

        if (!Validator::specialCircumstancesPromoCode($_POST['discountCode'])) {
            ValidationException::throw(['discountCode' => 'Invalid discount code.'], $_POST);
        }

        SignUpForm::submit($_POST);
    } catch (ValidationException $exception) {
        Session::flash('errors', $exception->errors);
        Session::flash('old', $exception->old);
    }
} else {
    Session::unflash();
}

Timber::render('page-join-now-special-circumstances.twig', $context);
