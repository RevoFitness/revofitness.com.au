<?php

namespace Revo;

use Revo\PerfectGym\EzyPayClient;
use Revo\PerfectGym\PerfectGymClient;

class Revo
{
    public Zendesk $zendesk;
    public Utils $utils;
    public PerfectGymClient $perfectGymClient;
    public JobAdder $jobAdder;
    public GymManager $gymManager;
    public TrainerManager $trainerManager;
    public API $api;
    public MapHandler $mapHandler;
    public AJAX $ajax;
    public EzyPayClient $ezypay;

    public function __construct()
    {
        $this->zendesk = new Zendesk();
        $this->utils = new Utils();
        $this->perfectGymClient = new PerfectGymClient();
        $this->jobAdder = new JobAdder();
        $this->gymManager = new GymManager();
        $this->trainerManager = new TrainerManager();
        $this->api = new API();
        $this->mapHandler = new MapHandler();
        $this->ajax = new AJAX();
        $this->ezypay = new EzyPayClient();

        $this->registerTaxonomies();

        add_action('wp_enqueue_scripts', array($this, 'registerAssets'));
    }

    /**
     * Register our files
     */
    public function registerAssets()
    {
        $script_version = filemtime(get_stylesheet_directory() . '/Revo/dist/index.js');
        wp_enqueue_script('revo', get_stylesheet_directory_uri() . '/Revo/dist/index.js', array('jquery'), $script_version);
        wp_localize_script('revo', 'ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('my_ajax_nonce')
        ));
    }

    /**
     * Register a private 'State' taxonomy for post type 'gyms'.
     *
     * @see register_taxonomy() for registering taxonomies.
     */
    protected function registerTaxonomies()
    {
        $args = array(
            'label'        => 'State',
            'rewrite'      => false,
            'hierarchical' => true,
            'capabilities' => array(
                'manage_terms' => '',
                'edit_terms' => '',
                'delete_terms' => '',
                'assign_terms' => ''
            ),
        );

        register_taxonomy('state', array('gyms'), $args);

        $states = array(
            array('name' => 'WA', 'slug' => 'wa'),
            array('name' => 'VIC', 'slug' => 'vic'),
            array('name' => 'SA', 'slug' => 'sa'),
            array('name' => 'NSW', 'slug' => 'nsw'),
            array('name' => 'QLD', 'slug' => 'qld'),
            array('name' => 'TAS', 'slug' => 'tas'),
            array('name' => 'NT', 'slug' => 'nt')
        );

        foreach ($states as $state) {
            wp_insert_term($state['name'], 'state', array(
                'slug' => $state['slug']
            ));
        }
    }
}
