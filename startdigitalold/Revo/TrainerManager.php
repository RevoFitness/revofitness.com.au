<?php

namespace Revo;

use Revo\API;
use Revo\GymManager;
use WP_Query;
use Timber;

class TrainerManager
{
    protected API $api;
    protected GymManager $gymManager;

    public function __construct()
    {
        $this->api = new API();
        $this->gymManager = new GymManager();
        $this->registerPostTypes();

        add_action('template_redirect', [$this, 'redirect404ToArchivePage']);
    }

    /**
     * Redirect missing trainers to the archive page
     */
    public function redirect404ToArchivePage()
    {
        if (is_404() && get_query_var('post_type') === 'trainers') {
            wp_redirect(home_url('/workouts/personal-training'));
            exit;
        }
    }

    /**
     * Register the Gyms post type
     */
    public function registerPostTypes()
    {
        register_post_type('trainers', array(
            'label'  => 'Trainers',
            'public' => true,
            'has_archive' => false,
            'supports' => array('title', 'thumbnail', 'revisions'),
            'menu_icon' => 'dashicons-admin-users',
        ));
    }

    /**
     * Get all trainers from the 'trainers' post type
     */
    public function getTrainers()
    {
        // Check if the results are already cached
        $cacheKey = 'trainers_post_type';
        $cachedResult = wp_cache_get($cacheKey);

        if ($_ENV['ENV'] === 'production' && $cachedResult !== false) {
            return $cachedResult;
        }

        $args = array(
            'post_type'      => 'trainers',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'order'          => 'ASC',
        );

        $trainers = new WP_Query($args);

        foreach ($trainers->posts as $trainer) {
            $fields = get_fields($trainer->ID);

            $trainer->fields = $fields ?? [];
        }

        // Cache the result for future use
        wp_cache_add($cacheKey, $trainers->posts, '', WEEK_IN_SECONDS);
        return $trainers->posts;
    }

    /**
     * Get Trainers that work at a specific gym(s)
     */
    public function getTrainersWhereGym($gym)
    {
        $trainers = $this->getTrainers();
        $trainersWhereGym = array();

        foreach ($trainers as $trainer) {
            // No assigned gyms
            if (empty($trainer->gyms)) {
                continue;
            }

            foreach ($trainer->gyms as $gymId) {
                // Doesn't work at this Gym
                if ($gym->ID !== intval($gymId)) {
                    continue;
                }

                $trainersWhereGym[] = Timber::get_post($trainer);
            }
        }

        return $trainersWhereGym;
    }
}
