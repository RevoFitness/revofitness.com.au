<?php

namespace Revo;

use Timber\Timber;
use Revo\API;
use Revo\Core\Cache;
use Revo\GymManager;
use Revo\MapHandler;
use Revo\PerfectGym\PerfectGymClient;
use Revo\PerfectGym\EzyPayClient;

class AJAX
{
    public GymManager $gymManager;
    public MapHandler $mapHandler;
    public API $api;
    public PerfectGymClient $perfectGymClient;
    public EzyPayClient $ezypayClient;

    public function __construct()
    {
        $this->gymManager = new GymManager();
        $this->mapHandler = new MapHandler();
        $this->api = new API();
        $this->perfectGymClient = new PerfectGymClient();
        $this->ezypayClient = new EzyPayClient();

        add_action('wp_ajax_nopriv_get_gyms_by_state', [$this, 'ajaxGetGymsByState']);
        add_action('wp_ajax_get_gyms_by_state', [$this, 'ajaxGetGymsByState']);

        add_action('wp_ajax_nopriv_get_gyms_where_state', [$this, 'ajaxGetGymsWhereState']);
        add_action('wp_ajax_get_gyms_where_state', [$this, 'ajaxGetGymsWhereState']);

        add_action('wp_ajax_nopriv_get_gyms_where_state_html', [$this, 'ajaxGetGymsWhereStateHTML']);
        add_action('wp_ajax_get_gyms_where_state_html', [$this, 'ajaxGetGymsWhereStateHTML']);

        add_action('wp_ajax_nopriv_get_gyms', [$this, 'ajaxGetGymsPostType']);
        add_action('wp_ajax_get_gyms', [$this, 'ajaxGetGymsPostType']);

        add_action('wp_ajax_nopriv_get_gyms_html', [$this, 'ajaxGetGymsPostTypeHTML']);
        add_action('wp_ajax_get_gyms_html', [$this, 'ajaxGetGymsPostTypeHTML']);

        add_action('wp_ajax_nopriv_get_user_location', [$this, 'ajaxGetUserLocation']);
        add_action('wp_ajax_get_user_location', [$this, 'ajaxGetUserLocation']);

        add_action('wp_ajax_nopriv_get_gyms_by_closest', [$this, 'ajaxGetGymsByClosest']);
        add_action('wp_ajax_get_gyms_by_closest', [$this, 'ajaxGetGymsByClosest']);

        add_action('wp_ajax_nopriv_get_member_visits', [$this, 'ajaxGetMemberVisits']);
        add_action('wp_ajax_get_member_visits', [$this, 'ajaxGetMemberVisits']);

        add_action('wp_ajax_nopriv_validate_discount', [$this, 'ajaxValidateDiscount']);
        add_action('wp_ajax_validate_discount', [$this, 'ajaxValidateDiscount']);

        add_action('wp_ajax_nopriv_get_auth_token', [$this, 'ajaxAuthToken']);
        add_action('wp_ajax_get_auth_token', [$this, 'ajaxAuthToken']);
    }

    /**
     * Ajax handler for the getGymsPostType method
     */
    public function ajaxGetGymsPostType()
    {
        $gyms = $this->gymManager->getGymsPostType();

        wp_send_json_success($gyms);
        wp_die();
    }

    /**
     * Ajax handler for the getGymsPostType method
     */
    public function ajaxGetGymsPostTypeHTML()
    {
        $titles = array($_POST['titles']) ?? array();
        $gym = $this->gymManager->getGymsPostType($titles)[0];

        $context = Timber::context();
        $context['gym'] = $gym;
        $data = Timber::compile('partial/live-counter-card.twig', $context);

        wp_send_json_success($data);
        wp_die();
    }

    /**
     * Organise the Gyms by an array of states
     */
    public function ajaxGetGymsByState()
    {
        $gymsByState = $this->gymManager->getGymsByState();

        wp_send_json_success($gymsByState);
        wp_die();
    }

    /**
     * Get Gyms that have a specific state
     */
    public function ajaxGetGymsWhereState()
    {
        $state = $_POST['state'] ?? 'All';
        $gyms = $this->gymManager->getGymsPostType();
        $gymsWithState = array();

        foreach ($gyms as $gym) {
            if (!has_term($state, 'state', $gym) && $state !== 'All') {
                continue;
            }

            $gymsWithState[] = $gym;
        }

        wp_send_json_success($gymsWithState);
        wp_die();
    }

    /**
     * Get Gyms that have a specific state
     */
    public function ajaxGetGymsWhereStateHTML()
    {
        $state = $_POST['state'] ?? 'All';
        $cache_key = 'gyms_state_' . $state;

        $data = Cache::get($cache_key);

        if ($data === false) {
            $context = Timber::context();
            $template = $_POST['template'] ?? 'partial/map/gym-cards.twig';
            $gyms = $this->gymManager->getGymsPostType();
            $gymsWithState = array();

            foreach ($gyms as $gym) {
                if (!has_term($state, 'state', $gym) && $state !== 'All') {
                    continue;
                }

                $gymsWithState[] = $gym;
            }

            // Reset the data array
            $context['gyms'] = [];

            foreach ($gymsWithState as $gym) {
                $context['gyms'][] = Timber::get_post($gym);
            }

            $data = Timber::compile($template, $context);

            Cache::set($cache_key, $data);
        }

        wp_send_json_success($data);
        wp_die();
    }


    /**
     * Get the state based on the users IP
     */
    public function ajaxGetUserLocation()
    {
        $location = $this->mapHandler->getUserLocation();

        wp_send_json_success($location);
        wp_die();
    }

    /**
     * Get gyms by closest to the user
     */
    public function ajaxGetGymsByClosest()
    {
        $state = $_POST['state'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $template = $_POST['template'] ?? 'partial/map/gym-cards.twig';
        $gyms = $this->gymManager->getGymsByClosest('All', $latitude, $longitude);

        // Reset the data array
        $context['gyms'] = [];
        $context['activeState'] = $state;

        foreach ($gyms as $gym) {
            $context['gyms'][] = $gym;
        }


        $html = Timber::compile($template, $context);

        wp_send_json_success(['html' => $html, 'closest' => $gyms[0]]);
        wp_die();
    }

    /**
     * Get member visits for the last hour
     */
    public function ajaxGetMemberVisits()
    {
        $visits = $this->api->getMemberVisits();

        wp_send_json_success($visits);
        wp_die();
    }

    /**
     * Validate a user-entered voucher
     */
    public function ajaxValidateDiscount()
    {
        $codes = get_field('discount', 'options');
        $code = $_GET['code'] ?? null;

        $discount = array_values(array_filter($codes, function ($discount) use ($code) {
            return $discount['code'] === $code;
        }))[0];

        if ($code === $_ENV['DISCOUNT_CODE']) {
            $discount['free_level_two'] = true;
        }

        if (empty($discount)) {
            wp_send_json_error('Invalid discount code.', 400);
        }

        // Validate against PerfectGym
        $clubId = $this->api->getClubWhereName($_GET['gym'])->id ?? null;
        $voucher = $this->api->validateDiscount($code, $clubId);

        if (!empty($voucher->errors) || !isset($voucher) || !$voucher->isActive) {
            wp_send_json_error('Invalid discount code', 400);
        }

        wp_send_json_success(['voucher' => $discount]);
    }

    /**
     * Get the auth token for EzyPay for a set gym
     *
     * @return $authToken string
     */
   /**
 * AJAX handler for fetching gym credentials
 */
/**
 * AJAX handler for fetching gym credentials from .env
 */
/**
 * AJAX handler for fetching gym credentials from .env with enhanced debugging
 */
/**
 * AJAX handler for fetching gym credentials - simplified version
 */
public function ajaxAuthToken() {
    // Verify security nonce
    check_ajax_referer('ajax-nonce', 'security');
    
    // Get the gym parameter
    $gym = isset($_GET['gym']) ? sanitize_text_field($_GET['gym']) : '';
    
    // Skip processing for invalid gym
    if ($gym === 'select-a-gym' || empty($gym)) {
        wp_send_json_error(['message' => 'Please select a valid gym']);
        wp_die();
    }
    
    // Format gym name to match variable naming convention
    $gym_key = strtoupper(str_replace([' ', '-'], '_', $gym));
    
    // Get credentials from environment variables
    $merchant_id = getenv('EZYPAY_MERCHANT_ID_' . $gym_key);
    $username = getenv('EZYPAY_USERNAME_' . $gym_key);
    $password = getenv('EZYPAY_PASSWORD_' . $gym_key);
    
    // Check if we found all required credentials
    if ($merchant_id && $username && $password) {
        wp_send_json_success([
            'merchant_id' => $merchant_id,
            'username' => $username,
            'password' => $password,
            'gym' => $gym
        ]);
    } else {
        // If we get here, credentials were not found
        wp_send_json_error([
            'message' => 'Credentials not found for this gym: ' . $gym,
            'gym_key' => $gym_key
        ]);
    }
    
    wp_die();
}
}

