<?php

use Timber\Timber;
use Revo\Core\Session;
use Revo\Http\Forms\SignUpForm;
use Revo\Core\ValidationException;

define('DONOTCACHEPAGE', true);

/**
 * Handle the form submission
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $_POST['paymentFrequency'] = 'fiveWeek';

        SignUpForm::validate($_POST);

        SignUpForm::submit($_POST);
    } catch (ValidationException $exception) {
        Session::flash('errors', $exception->errors);
        Session::flash('old', $exception->old);
    }
} else {
    Session::unflash();
}

$context = Timber::context();
$context['post'] = Timber::get_post();
$context['fields'] = get_fields(get_the_ID());
$context['isFiveWeekMembership'] = true;

Timber::render('page-join-now.twig', $context);
