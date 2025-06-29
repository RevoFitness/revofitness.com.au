<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;
if (function_exists('get_fields')) {
    $context['fields'] = get_fields();
}
$context['page_builder'] = $context['fields']['page_builder'] ?? null;

if(get_field('gyms')):
	$current_gym_id = get_field('gyms')[0]->ID;
	$context['related_trainers'] = get_related_posts($timber_post->ID, 'trainers', -1, array(
		'meta_query' => array(
			array(
				'key' => 'gyms',
				'value' => $current_gym_id,
				'compare' => 'LIKE'
			)
		)
	));
endif;


if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $timber_post->ID . '.twig', 'single-' . $timber_post->post_type . '.twig', 'single-' . $timber_post->slug . '.twig', 'single.twig' ), $context );
}
