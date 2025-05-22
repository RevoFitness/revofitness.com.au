<?php
/**
 * Template Name: Join Now Test
 */

use Timber\Timber;
use Revo\Core\Session;
use Revo\Http\Forms\SignUpForm;
use Revo\Core\ValidationException;
use Revo\MapHandler;

defined('ABSPATH') || exit;
define('DONOTCACHEPAGE', true);

// Handle POST
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

// Setup Timber context
$context = Timber::context();
$context['post'] = Timber::get_post();
$context['fields'] = get_fields(get_the_ID());
$context['selectedGym'] = $_GET['gym'] ?? false;

$location = new MapHandler();
$stateLong = $location->getUserLocation()['state'];
$state = $location->convertStateName($stateLong);

// Presale gym query
$presaleArgs = [
    'post_type' => 'gyms',
    'posts_per_page' => -1,
    'meta_query' => [
        'relation' => 'AND',
        [
            'key' => 'is_presale',
            'compare' => 'EXISTS',
        ],
        [
            'key' => 'presale_end_date',
            'compare' => '>',
            'value' => date('Y-m-d'),
            'type' => 'DATE',
        ]
    ]
];

if ($state !== 'All') {
    $presaleArgs['tax_query'] = [
        [
            'taxonomy' => 'state',
            'field' => 'slug',
            'terms' => $state,
        ]
    ];
}

$context['presaleGyms'] = Timber::get_posts($presaleArgs);
$context['showPresaleLinks'] = true;
$context['promoCode'] = $_GET['code'] ?? false;

Timber::render('page-join-now-test.twig', $context);
