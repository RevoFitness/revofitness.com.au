<?php

use Timber\Timber;

/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context          = Timber::context();
$context['posts'] = Timber::get_posts();
$templates        = array('index.twig');
$page_for_posts_title = get_the_title(get_option('page_for_posts'));
if (function_exists('get_fields')) {
    $context['fields'] = get_fields(get_option('page_for_posts'));
}
$context['page_builder'] = $context['fields']['page_builder'] ?? null;
Timber::render($templates, $context);
