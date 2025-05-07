<?php

use Revo\Zendesk;
use Revo\GymManager;

/**
 * Register a route for the Zendesk 'load more' endpoint
 */
add_action('rest_api_init', function () {
    $zendesk = new Zendesk();
    $gymManager = new GymManager();

    // Get all articles
    register_rest_route('revo/v1', '/zendesk/articles', array(
        'methods' => 'GET',
        'callback' => array($zendesk, 'getArticles'),
        'permission_callback' => '__return_true'
    ));

    // Ping this with a cron every day or weekly
    register_rest_route('revo/v1', '/gym-manager/create', array(
        'methods' => 'GET',
        'callback' => array($gymManager, 'createAndUpdateGyms'),
        'permission_callback' => '__return_true'
    ));
});
