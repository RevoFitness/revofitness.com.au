<?php

/*
 Template Name: Live Member Counter
 */

define('DONOTCACHEPAGE', true);

use Timber\Timber;

$context = Timber::context();

$timber_post     = Timber::get_post();
$context['post'] = $timber_post;
if (function_exists('get_fields')) {
    $context['fields'] = get_fields();
}

// Check for users home club when coming from the app
if (isset($_GET['HomeClub'])) {
    $context['defaultGym'] = $_GET['HomeClub'];
}

Timber::render('template-livemembercounter.twig', $context);
