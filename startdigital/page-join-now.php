<?php

use Timber\Timber;
use Revo\Core\Session;
use Revo\Http\Forms\SignUpForm;
use Revo\Core\ValidationException;
use Revo\MapHandler;

define('DONOTCACHEPAGE', true);

/**
 * Handle the form submission
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
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
$context['selectedGym'] = $_GET['gym'] ?? false;
$location = new MapHandler();
$stateLong = $location->getUserLocation()['state'];
$state = $location->convertStateName($stateLong);
$presaleArgs = array(
    'post_type' => 'gyms',
    'posts_per_page' => -1,
    'meta_query' => array(
        'relation' => 'AND',
        array(
            'key' => 'is_presale',
            'compare' => 'EXISTS',
        ),
        array(
            'key' => 'presale_end_date',
            'compare' => '>',
            'value' => date('Y-m-d'),
            'type' => 'DATE',
        )
    )
);
if ($state !== 'All') {
    $presaleArgs['tax_query'] = array(
        array(
            'taxonomy' => 'state',
            'field' => 'slug',
            'terms' => $state,
        )
    );
}
$context['presaleGyms'] = Timber::get_posts($presaleArgs);
$context['showPresaleLinks'] = true;
$context['promoCode'] = $_GET['code'] ?? false;

Timber::render('page-join-now.twig', $context);
