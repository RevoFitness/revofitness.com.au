<?php

/**
 * Template Name: Vending Discount
 */

define('DONOTCACHEPAGE', true);

use Timber\Timber;

$context = Timber::context();
$context['post'] = Timber::get_post();
$context['qr_code'] = get_transient('vending_discount_qr_code');

Timber::render('template-vending-discount.twig', $context);
