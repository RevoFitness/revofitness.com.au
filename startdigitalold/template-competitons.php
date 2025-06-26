<?php

/*
 Template Name: Competitions
 */

use Timber\Timber;

$context = Timber::context();

$timber_post     = Timber::get_post();
$context['post'] = $timber_post;

Timber::render('template-competitions.twig', $context);
