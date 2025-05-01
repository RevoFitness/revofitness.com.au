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

use Timber\Timber;
use Revo\Core\Session;
use Revo\Http\Forms\SignUpForm;
use Revo\Core\ValidationException;

define('DONOTCACHEPAGE', true);

$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;
$context['fields'] = get_fields();
$context['page_builder'] = $context['fields']['page_builder'] ?? null;
$context['levelTwoCampaign'] = levelTwoCampaignIsActive() ? $context['fields']['level_two_campaign'] : false;
$context['discountCode'] = $context['fields']['presale_discount_code'] ?? null;
$context['disabledCardPayments'] = !acceptsCardPayments($timber_post);
$templates = array('single-gyms.twig');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $context['fields']['is_presale']) {
	try {
		SignUpForm::validate($_POST);

		$_POST['gymSelect'] = $timber_post->title;

		SignUpForm::submit($_POST);

		Session::unflash();
	} catch (ValidationException $exception) {
		Session::flash('errors', $exception->errors);
		Session::flash('old', $exception->old);
	}
}

Timber::render($templates, $context);

function levelTwoCampaignIsActive()
{
	$fields = get_fields();
	$active = $fields['level_two_campaign']['is_active'];
	$started = strtotime($fields['level_two_campaign']['start_date']) < time();
	$ended = strtotime($fields['level_two_campaign']['end_date']) < time();

	return $active && $started && !$ended;
}
