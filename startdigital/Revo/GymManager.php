<?php

namespace Revo;

use Timber\Timber;
use Revo\API;
use WP_Query;
use Revo\Utils;
use Revo\Core\Cache;
use Revo\PerfectGym\PerfectGymClient;

class GymManager
{
    protected API $api;
    protected utils $utils;

    public function __construct()
    {
        $this->api = new API();
        $this->utils = new Utils();
        $this->registerPostTypes();

        add_action('admin_head', array($this, 'setupReadOnlyFilter'));
        add_action('save_post', array($this, 'updateLevelOnePayment'), 20);
        add_action('save_post', array($this, 'updateLevelTwoPayment'), 20);
        add_action('transition_post_status', array($this, 'clearCacheOnPublishNewGym'), 10, 3);
    }

    /**
     * Register the Gyms post type
     */
    public function registerPostTypes()
    {
        register_post_type('gyms', array(
            'label'  => 'Gyms',
            'public' => true,
            'show_in_rest' => true,
            'has_archive' => false,
            'menu_icon' => 'dashicons-admin-multisite',
            'supports' => array('title', 'thumbnail', 'custom-fields')
        ));
    }

    /**
     * Load the read only filter on Gym admin pages only
     */
    public function setupReadOnlyFilter()
    {
        global $current_screen;

        if ('gyms' !== $current_screen->post_type) {
            return;
        }

        add_filter('acf/load_field', array($this, 'applyReadOnlyToFields'));
    }

    /**
     * Change ACF field to be read-only.
     *
     * @param array $field Field attributes.
     *
     * @return array
     */
    function applyReadOnlyToFields($field)
    {
        $readOnlyFields = array('id', 'address', 'phone', 'email', 'latitude', 'longitude', 'level_one_payment', 'level_two_payment', 'level_three_payment');

        if (in_array($field['name'], $readOnlyFields)) {
            $field['disabled'] = true;
        }

        return $field;
    }

    /**
     * Get all gyms from the 'gyms' post type
     */
    public function getGymsPostType($postTitles = array())
    {
        // Check if the results are already cached
        $cacheKey = 'gyms_post_type_' . md5(serialize($postTitles));
        $cachedResult = Cache::get($cacheKey);

        if ($cachedResult !== false) {
            return $cachedResult;
        }

        $args = array(
            'post_type'      => 'gyms',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'order'          => 'ASC',
        );

        // Add an optional query to filter gyms by post titles
        if (!empty($postTitles)) {
            $args['post_name__in'] = $postTitles;
        }

        $gyms = new WP_Query($args);

        foreach ($gyms->posts as $gym) {
            $fields = get_post_custom($gym->ID);

            $gym->fields = $fields ?? [];

            // Also get the state
            $state = get_the_terms($gym->ID, 'state');
            if ($state) {
                $gym->state = $state;
            }
        }

        Cache::set($cacheKey, $gyms->posts);
        return $gyms->posts;
    }

    /**
     * Create a new Gym if it doesn't exist yet
     */
    protected function createGym($gym)
    {
        $args = array(
            'post_type' => 'gyms',
            'post_status' => array('publish', 'draft', 'private'),
            'title' => $gym->name
        );

        // Check if post exists
        $gyms = get_posts($args);
        $gymExists = count($gyms) > 0;

        // If post doesn't exist, create new one
        if (!$gymExists) {
            $postId = wp_insert_post(array(
                'post_title'    => $gym->shortName,
                'post_type'     => 'gyms',
                'post_status'   => 'draft',
            ));
        } else {
            // Otherwise just grab the ID
            $postId = $gyms[0]->ID;
        }

        $state = $this->api->getRegionById($gym->regionId);

        if (isset($state->name)) {
            $stateId = term_exists($state->name, 'state');
        }

        if (isset($stateId) && !empty($stateId)) {
            wp_set_post_terms($postId, array($stateId['term_id']), 'state');
        }

        $frequency = get_post_meta($postId, 'payment_frequency', true);
        if (empty($frequency)) {
            update_post_meta($postId, 'payment_frequency', 'monthly');
        }
        update_post_meta($postId, 'id', $gym->id ?: '');
        update_post_meta($postId, 'email', $gym->email ?: '');
        update_post_meta($postId, 'phone', $gym->phoneNumber ?: '');
        update_post_meta($postId, 'address', $gym->address ?: '');
        update_post_meta($postId, 'latitude', $gym->latitude, '');
        update_post_meta($postId, 'longitude', $gym->longitude, '');

        $this->updateLevelOnePayment($postId);
        $this->updateLevelTwoPayment($postId);

        if (get_post_meta($postId, 'has_level_three', true)) {
            $this->updateLevelThreePayment($postId);
        }
    }

    public function updateLevelOnePayment($id)
    {
        if (!\get_field('payment_frequency', $id)) {
            return;
        }

        $paymentTypes = $this->getPaymentTypes();
        $state = get_the_terms($id, 'state')[0]->slug ?: 'default';
        $frequency = \get_field('payment_frequency', $id);
        $paymentId = $paymentTypes->levelOne->$frequency->$state;

        if (get_the_title($id) == 'HIITFIT ON DEMAND') {
            $paymentId = $paymentTypes->HIITFIT;
        }

        if (!isset($paymentId)) {
            return;
        }

        $price = (new API())->getPaymentPlan($paymentId)->membershipFee->gross ?: 0;

        update_post_meta($id, 'level_one_payment', $price);
    }

    public function updateLevelTwoPayment($id)
    {
        if (!\get_field('payment_frequency', $id) || get_the_title($id) === 'HIITFIT ON DEMAND') {
            return;
        }

        $paymentTypes = $this->getPaymentTypes();
        $state = get_the_terms($id, 'state')[0]->slug ?: 'default';
        $frequency = \get_field('payment_frequency', $id);
        $paymentIds = $paymentTypes->levelTwo->$frequency->$state;

        if (!isset($paymentIds)) {
            return;
        }

        $signUp = (new API())->getPaymentPlan($paymentIds->signUp)->membershipFee->gross ?: 0;
        $addOn = (new API())->getPaymentPlan($paymentIds->addOn)->membershipFee->gross ?: 0;

        update_post_meta($id, 'level_two_payment', $signUp + $addOn);
    }

    public function updateLevelThreePayment($id)
    {
        if (!\get_field('payment_frequency', $id) || get_the_title($id) === 'HIITFIT ON DEMAND') {
            return;
        }

        $paymentTypes = $this->getPaymentTypes();
        $state = get_the_terms($id, 'state')[0]->slug ?: 'default';
        $frequency = \get_field('payment_frequency', $id);
        $paymentIds = $paymentTypes->levelThree->$frequency->$state;

        if (!isset($paymentIds)) {
            return;
        }

        $signUp = (new API())->getPaymentPlan($paymentIds->signUp)->membershipFee->gross ?: 0;
        $addOn = (new API())->getPaymentPlan($paymentIds->addOn)->membershipFee->gross ?: 0;

        update_post_meta($id, 'level_three_payment', $signUp + $addOn);
    }

    private function getPaymentTypes()
    {
        $perfectGym = new PerfectGymClient();
        $response = $perfectGym->getApiRequest(get_stylesheet_directory_uri() . '/json/payment-ids.json', null, 16);

        return json_decode($response);
    }

    public function createAndUpdateGyms()
    {
        $clubs = $this->api->getClubs();

        foreach ($clubs as $club) {
            $this->createGym($club);
        }
    }

    /**
     * Same as the above but for returning the data instead of sending a JSON response
     */
    public function getGymsByState()
    {
        $gyms = $this->getGymsPostType();
        $gymsByState = array();

        foreach ($gyms as $gym) {
            $state = get_the_terms($gym->ID, 'state');

            if (!$state) {
                continue;
            }

            $gymsByState[$state[0]->name][] = Timber::get_post($gym);
        }

        return $gymsByState;
    }

    /**
     * Get Gyms that have a specific state
     */
    public function getGymsWhereState($state)
    {
        $gyms = $this->getGymsPostType();
        $gymsWhereState = array();

        foreach ($gyms as $gym) {
            if (!has_term($state, 'state', $gym) && $state !== 'All') {
                continue;
            }

            $gymsWhereState[] = Timber::get_post($gym);
        }

        return $gymsWhereState;
    }

    /**
     * Get gyms that are in presale, optionally by state
     *
     * @param string $state
     * @return array
     */
    public function getPresaleGyms($state = null)
    {
        $gyms = $this->getGymsPostType();
        $presaleGyms = array();

        foreach ($gyms as $gym) {
            if (!isInPresale($gym)) {
                continue;
            }

            if ($state && !has_term($state, 'state', $gym)) {
                continue;
            }

            $presaleGyms[] = Timber::get_post($gym);
        }

        return $presaleGyms;
    }

    /**
     * Get Gyms ordered by distance to the user (closest first)
     */
    public function getGymsByClosest($state, $latitude, $longitude)
    {
        $gyms = $this->getGymsWhereState($state);

        usort($gyms, function ($a, $b) use ($latitude, $longitude) {
            $hasLatLongA = !empty($a->fields['latitude'][0]) && !empty($a->fields['longitude'][0]);
            $hasLatLongB = !empty($b->fields['latitude'][0]) && !empty($b->fields['longitude'][0]);

            if ($hasLatLongA && $hasLatLongB) {
                $distA = $this->utils->calculateDistanceBetween($latitude, $longitude, $a->latitude, $a->longitude);
                $distB = $this->utils->calculateDistanceBetween($latitude, $longitude, $b->latitude, $b->longitude);
                return $distA <=> $distB; // Sort in ascending order (closest first)
            } elseif ($hasLatLongA) {
                return -1; // $a has valid latitude and longitude, but $b doesn't, so $a should come first
            } elseif ($hasLatLongB) {
                return 1; // $b has valid latitude and longitude, but $a doesn't, so $b should come first
            } else {
                return 0; // Both $a and $b don't have valid latitude and longitude, so their order doesn't matter
            }
        });


        return $gyms;
    }

    /**
     * Clear the cached gyms list when a new gym is published
     *
     * @param string  $newStatus New post status.
     * @param string  $oldStatus Old post status.
     * @param WP_Post $post       Post object.
     */
    public function clearCacheOnPublishNewGym($newStatus, $oldStatus, $post)
    {
        if ($post->post_type !== 'gyms') {
            return;
        }

        if ($oldStatus === $newStatus || $newStatus !== 'publish') {
            return;
        }

        if ($post->post_status !== 'publish') {
            return;
        }

        Cache::clearLike('gyms_post_type_');
    }
}
