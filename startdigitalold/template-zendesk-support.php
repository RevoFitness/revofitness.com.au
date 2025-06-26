<?php

use Timber\Timber;

/**
 * The template for the Zendesk Support page
 * Template Name: Zendesk Support
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();

$timber_post     = Timber::get_post();
$context['post'] = $timber_post;

if (function_exists('get_fields')) {
    $context['fields'] = get_fields();
}

$context['page_builder'] = $context['fields']['page_builder'] ?? null;

Timber::render('template-zendesk-support.twig', $context);
