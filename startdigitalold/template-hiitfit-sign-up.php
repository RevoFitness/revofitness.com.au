<?php

/*
 Template Name: Hiitfit Sign Up
 */

use Timber\Timber;
use Revo\Core\Session;
use Revo\Http\Forms\SignUpForm;
use Revo\PerfectGym\EzyPayClient;
use Revo\Core\ValidationException;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        SignUpForm::validate($_POST);

        $_POST['gymSelect'] = 'HIITFIT ON DEMAND';

        SignUpForm::submit($_POST);
    } catch (ValidationException $exception) {
        Session::flash('errors', $exception->errors);
        Session::flash('old', $exception->old);
    }
} else {
    Session::unflash();
}

$context = Timber::context();
$context['hiitfit'] = true;

Timber::render('page-hiitfit-on-demand-sign-up.twig', $context);
