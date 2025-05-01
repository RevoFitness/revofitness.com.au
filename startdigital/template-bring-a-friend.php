<?php

/*
 Template Name: Bring a Friend
 */

use Timber\Timber;
use Revo\Core\Session;
use Revo\Http\Forms\SignUpForm;
use Revo\Core\ValidationException;

define('DONOTCACHEPAGE', true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        SignUpForm::validate($_POST);

        $isGuest = true;
        SignUpForm::submit($_POST, $isGuest);
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
$context['isGuest'] = true;
$context['bringAFriend'] = true;

Timber::render('template-guest-sign-up.twig', $context);
