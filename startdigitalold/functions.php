<?php

/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 *Make sure no BOM or blank line exists here
**/

use Timber\Timber;
use Timber\Post;
use Revo\Core\Session;
use Revo\PerfectGym\EmailHandler;
use Revo\PerfectGym\FormDataParser;

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
    require_once $composer_autoload;
    Timber::init();
}

require 'php/hiitfit.php';
include 'php/tiny-mce-extend.php';
include 'php/rest-api-routes.php';
if (file_exists(__DIR__ . '/ajax/ajax.php')) {
    include 'ajax/ajax.php';
}

/**
 * Include helpers
 */
$helpers = glob(__DIR__ . '/helpers/*/*.php');
foreach ($helpers as $helper) {
    if (file_exists($helper)) {
        include_once $helper;
    }
}

/**
 * Setup our custom options page
 */
if (function_exists('acf_add_options_page')) {
    $options = acf_add_options_page(array(
        'page_title'     => 'Site Settings',
        'menu_title'    => 'Site Settings',
        'menu_slug'     => 'site-settings',
        'capability'    => 'edit_posts',
        'redirect'        => false
    ));

    acf_add_options_sub_page(array(
        'page_title'  => __('Membership Settings'),
        'menu_title'  => __('Membership'),
        'parent_slug' => $options['menu_slug'],
    ));

    acf_add_options_sub_page(array(
        'page_title'  => __('Discount Codes'),
        'menu_title'  => __('Discount Codes'),
        'parent_slug' => $options['menu_slug'],
        'update_button' => __("Update Discounts", 'acf'),
        'updated_message' => __("Discounts Updated", 'acf'),
    ));

    acf_add_options_sub_page(array(
        'page_title'  => __('Blocked Emails'),
        'menu_title'  => __('Blocked Emails'),
        'parent_slug' => $options['menu_slug'],
        'update_button' => __("Update Emails", 'acf'),
        'updated_message' => __("Emails Updated", 'acf'),
    ));

    acf_add_options_sub_page(array(
        'page_title'  => __('Sync with Perfect Gym'),
        'menu_title'  => __('PG Sync'),
        'parent_slug' => $options['menu_slug'],
        'capability' => 'manage_options'
    ));
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if (!class_exists('Timber')) {

    add_action(
        'admin_notices',
        function () {
            echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
        }
    );

    add_filter(
        'template_include',
        function ($template) {
            return get_stylesheet_directory() . '/static/no-timber.html';
        }
    );
    return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array('templates', 'views');

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StartDigital extends \Timber\Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', array($this, 'theme_supports'));
        add_filter('timber/context', array($this, 'add_to_context'));
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_taxonomies'));
        add_action('init', fn() => new Revo\Revo());
        add_action('wp_enqueue_scripts', array($this, 'register_assets'));
        parent::__construct();
    }
    /** This is where you can register custom post types. */
    public function register_post_types()
    {
        register_post_type('workouts', array(
            'label'  => 'Workouts',
            'public' => true,
            'has_archive' => false,
            'supports' => array('title', 'thumbnail', 'page-builder'),
            'menu_icon' => 'dashicons-superhero',
        ));
        register_post_type('gyms-coming-soon', array(
            'label'  => 'Gyms (Coming Soon)',
            'public' => true,
            'publicly_queryable' => false,
            'has_archive' => false,
            'supports' => array('title', 'thumbnail', 'page-builder'),
            'menu_icon' => 'dashicons-admin-home',
        ));
         register_post_type('email_notifications', array(
            'labels' => array(
                'name' => 'Email Notifications',
                'singular_name' => 'Email Notification',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Notification',
                'edit_item' => 'Edit Notification',
                'new_item' => 'New Notification',
                'view_item' => 'View Notification',
                'search_items' => 'Search Notifications',
                'not_found' => 'No Email Notifications found',
                'not_found_in_trash' => 'No Email Notifications found in Trash',
            ),
            'public' => true,
            'has_archive' => false,
            'supports' => array('title', 'editor'),
            'menu_icon' => 'dashicons-email-alt',
        ));
    }
    /** This is where you can register custom taxonomies. */
    public function register_taxonomies() {

        // Register the Gym taxonomy
        register_taxonomy('gym', 'email_notifications', array(
            'labels' => array(
                'name' => 'Gyms',
                'singular_name' => 'Gym',
                'search_items' => 'Search Gyms',
                'all_items' => 'All Gyms',
                'edit_item' => 'Edit Gym',
                'update_item' => 'Update Gym',
                'add_new_item' => 'Add New Gym',
                'new_item_name' => 'New Gym Name',
            ),
            'hierarchical' => true, // Set to true for a category-like structure
            'show_admin_column' => true, // Show in the admin post list
            'show_ui' => true, // Show in the WordPress admin
            'show_in_rest' => true, // Enable for the block editor
        ));
    
    }

    /** This is where you can register custom CSS & JS files. */
    public function register_assets()
    {
        $style_version = filemtime(get_stylesheet_directory() . '/static/style.css');
        wp_enqueue_style('startdigital', get_stylesheet_directory_uri() . '/static/style.css', array(), $style_version);

        $script_version = filemtime(get_stylesheet_directory() . '/static/site.js');
        wp_enqueue_script('startdigital', get_stylesheet_directory_uri() . '/static/site.js', array('jquery'), $script_version);
        
        // Add this block to localize the script with AJAX URL and nonce
        wp_localize_script('startdigital', 'ajax', array(
            'url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ajax-nonce')
        ));
    }
   

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context($context)
    {
        if (function_exists('get_fields')) {
            $context['options'] = get_fields('options');
        }

        $context['user'] = wp_get_current_user();
        $context['session'] = new Session;

        // MENUS
        $context['menu']  = Timber::get_menu('menu');
        $context['topbar']  = Timber::get_menu('topbar');
        $context['footer1']  = Timber::get_menu('footer1');
        $context['footer2']  = Timber::get_menu('footer2');
        $context['footerBottom']  = Timber::get_menu('footerBottom');
        $context['mobileMenu']  = Timber::get_menu('mobileMenu');

        // LOOPS
        $context['all_news'] = Timber::get_posts(array(
            'post_type' => 'post',
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ));

        $context['latest_news'] = Timber::get_posts(array(
            'post_type' => 'post',
            'posts_per_page' => 5,
            'post_status' => 'publish',
        ));

        $context['news_sidebar'] = Timber::get_posts(array(
            'post_type' => 'post',
            'posts_per_page' => 3,
            'post_status' => 'publish',
        ));

        $context['workouts'] = Timber::get_posts(array(
            'post_type' => 'workouts',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        ));
        $context['gyms_coming_soon'] = Timber::get_posts(array(
            'post_type' => 'gyms-coming-soon',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        ));

        // Revo base class. Access Zendesk, Perfect Gym and JobAdder from here.
        $context['revo'] = new \Revo\Revo();

        $context['site']  = $this;

        return $context;
    }


    public function theme_supports()
    {
        /*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
        add_theme_support('title-tag');

        /*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
        add_theme_support('post-thumbnails');

        add_theme_support('menus');
        /**
         * Register our first menu
         */
        register_nav_menus(
            array(
                'menu' => __('Primary Menu', 'startdigital'),
                'topbar' => __('Topbar Menu', 'startdigital'),
                'footer1' => __('Footer Menu 1', 'startdigital'),
                'footer2' => __('Footer Menu 2', 'startdigital'),
                'footerBottom' => __('Footer Bottom', 'startdigital'),
                'mobileMenu' => __('Mobile Menu', 'startdigital'),
            )
        );

        add_theme_support('align-wide');
        add_theme_support('wp-block-styles');
        add_theme_support('editor-styles');
        add_editor_style('static/editor.css');
    }
}

add_filter('oembed_response_data', 'disable_embeds_filter_oembed_response_data_');
function disable_embeds_filter_oembed_response_data_($data)
{
    unset($data['author_url']);
    unset($data['author_name']);
    return $data;
}

function acf_wysiwyg_height()
{
?>
    <style>
        .acf-editor-wrap iframe {
            min-height: 0;
        }
    </style>
    <script>
        (function() {
            acf.addFilter('wysiwyg_tinymce_settings', function(mceInit, id, field) {
                // enable autoresizing of the WYSIWYG editor
                mceInit.wp_autoresize_on = true;
                return mceInit;
            });
            // (action called when a WYSIWYG tinymce element has been initialized)
            acf.addAction('wysiwyg_tinymce_init', function(ed, id, mceInit, field) {
                // reduce tinymce's min-height settings
                ed.settings.autoresize_min_height = 200;
                // reduce iframe's 'height' style to match tinymce settings
                var editorWrap = document.querySelector('.acf-editor-wrap');
                if (editorWrap) {
                    var iframe = editorWrap.querySelector('iframe');
                    if (iframe) {
                        iframe.style.height = '200px';
                    }
                }
            });
        })();
    </script>
<?php
}
add_action('acf/input/admin_footer', 'acf_wysiwyg_height');

new StartDigital();

add_action('admin_menu', function () {
    add_menu_page(
        'Email Preview',
        'Email Preview',
        'manage_options',
        'email-preview',
        'render_email_preview_page',
        'dashicons-email-alt',
        28
    );
});


/**
 * Adds functionality to Twig.
 *
 * @param \Twig\Environment $twig The Twig environment.
 * @return \Twig\Environment
 */
function add_to_twig($twig)
{
    // Adding functions as filters.
    $twig->addFilter(new Twig\TwigFilter('remove_empty_tags', 'remove_empty_tags'));

    return $twig;
}
add_filter('timber/twig', 'add_to_twig');

// Fancy way to remove any tags that *only* contain '&nbsp;'. Thanks ChatGPT :)
function remove_empty_tags($html)
{
    $dom = new \DOMDocument;
    libxml_use_internal_errors(true);
    $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    libxml_use_internal_errors(false);
    $xpath = new \DOMXPath($dom);

    foreach ($xpath->query('//*') as $node) {
        if (trim(str_replace(chr(0xC2) . chr(0xA0), ' ', $node->nodeValue)) === '') {
            $node->parentNode->removeChild($node);
        }
    }

    return $dom->saveHTML();
}

add_filter('gform_submit_button', 'form_submit_button', 10, 2);
function form_submit_button($button, $form)
{
    return "<button class='button gform_button' id='gform_submit_button_{$form['id']}'><span>Submit</span></button>";
}

function custom_login_logo()
{
    echo '<style type="text/css">
        body.login div#login h1 a {
            background-image: url(' . get_site_icon_url() . ');
			pointer-events: none;
        }
    </style>';
}
add_action('login_enqueue_scripts', 'custom_login_logo');

function getHiitfitID()
{
    return Timber::get_post(array(
        'post_type' => 'gyms',
        'name' => 'hiitfit-on-demand'
    ))->ID;
}

function getAllGyms()
{
    return Timber::get_posts(array(
        'post_type' => 'gyms',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC'
    ));
}

function getAllStates()
{
    return Timber::get_terms(array(
        'taxonomy' => 'state',
        'hide_empty' => true,
        'orderby' => 'title',
        'order' => 'DESC'
    ));
}

function getGymByName($name)
{
    return Timber::get_post(array(
        'post_type' => 'gyms',
        'name' => $name
    ));
}

function getCurrentPage()
{
    global $wp;
    return home_url($wp->request);
}

/**
 * Converts a date string to a Unix timestamp.
 *
 * This function takes a date string in the format "YYYY/MM/DD" and converts it to a Unix timestamp.
 *
 * @param string $string The date string to convert.
 * @return int|false The Unix timestamp representing the given date string, or false on failure.
 */
function strtotime_formatted($string)
{
    $dateString = implode("/", array_reverse(explode("/", $string)));
    return strtotime($dateString);
}

function write_log($data)
{
    if (true === WP_DEBUG) {
        if (is_array($data) || is_object($data)) {
            error_log(print_r($data, true));
        } else {
            error_log($data);
        }
    }
}

function isGymOpen($id)
{
    $presaleEndDate = get_post_meta($id, 'presale_end_date', true);
    $today = date('Ymd');

    if (get_post_meta($id, 'custom_open_date', true)) {
        $customOpenDate = get_post_meta($id, 'gym_open_date', true);
    }

    // Custom open date but it's not open yet
    if (isset($customOpenDate) && $today < $customOpenDate) {
        return false;
    }

    // Presale is still on going and it's not open yet
    if ($today < $presaleEndDate && !isset($customOpenDate)) {
        return false;
    }

    return true;
}

function gym_html_entity_decode($gym)
{
    return html_entity_decode($gym, ENT_QUOTES, 'UTF-8');
}

/**
 * Check if the current post is in presale.
 *
 * @param WP_Post|Timber\Post $post
 * @return boolean True if the post is in presale, false otherwise.
 */
function isInPresale($post)
{
    $isPresale = get_field('is_presale', $post->ID);
    $today = strtotime_formatted(date("d/m/Y"));
    $startDate = strtotime_formatted(get_field('presale_start_date', $post->ID));
    $endDate = strtotime_formatted(get_field('presale_end_date', $post->ID));

    if (!$endDate) {
        return false;
    }

    return $isPresale && $today >= $startDate && $today < $endDate;
}

/**
 * Check if the current post is an active Level Two Campaign.
 *
 * @param WP_Post|Timber\Post $post
 * @return boolean True if the post is an active Level Two Campaign, false otherwise.
 */
function isActiveLevelTwoCampaign($post)
{
    $levelTwoCampaignObj = get_field('level_two_campaign', $post->ID);
    $isActive = $levelTwoCampaignObj['is_active'];
    $today = strtotime_formatted(date("d/m/Y"));
    $startDate = strtotime_formatted($levelTwoCampaignObj['start_date']);
    $endDate = strtotime_formatted($levelTwoCampaignObj['end_date']);

    if (!$endDate) {
        return false;
    }

    return $isActive && $today >= $startDate && $today < $endDate;
}

isActiveLevelTwoCampaign(get_post(24617));

/**
 * Add shortcode to render the studio locations
 */
function theStudioShortcode()
{
    $context = Timber::context();
    return Timber::compile('partial/studio-locations.twig', $context);
}
add_shortcode('the_studio', 'theStudioShortcode');

function get_post_id_by_title($title)
{
    global $wpdb;

    // Sanitize the title
    $title = sanitize_title($title);

    // Query the database for the post with matching title
    $post = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT ID FROM $wpdb->posts
            WHERE post_title= %s
            AND post_status = 'publish'
            AND post_type = 'gyms'",
            $title
        )
    );

    // Return false if no post was found, otherwise return the ID
    return $post ? (int) $post : false;
}

/**
 * Check if the gym accepts card payments.
 * Returns true if the gym is not in presale and not in the exceptions list
 */
function acceptsCardPayments($gym)
{
    $exceptions = ['Blakeview', 'Butler', 'Seaford Meadows'];

    return !isInPresale($gym) || in_array($gym->title, $exceptions);
}

/**
 * Mock sending an email for testing purposes.
 *
 * @param array $data The form data to send.
 * @param string $to The email address to send the email to.
 *
 * @return void;
 */
function sendMockEmail($data = [], $to = null): void
{
    if (!$to) {
        $to = 'joe@startdigital.com.au';
    }

    // Data with some sensible defaults
    $data = [
        "gymSelect" => $data['gymSelect'] ?: 'Balcatta',
        "state" => $data['state'] ?? 'WA',
        "firstName" => $data['firstName'] ?? 'Test',
        "lastName" => $data['lastName'] ?? 'Test',
        "email" => $data['email'] ?? 'test@email.com.au',
        "phoneNumber" => str_replace(' ', '', $data['phoneNumber']) ?? '0400000000',
        "gender" => $data['gender'] ?? 'Other',
        "address" => $data['address'] ?? '123 Test St',
        "suburb" => $data['suburb'] ?? 'Perth',
        "postCode" => $data['postCode'] ?? '6000',
        "termsConditions" => $data['termsConditions'] ?? 1,
        "signUpDate" => gmdate("Y-m-d\TH:i:s\Z", strtotime("today UTC")),
        "signUpDatePlus" => gmdate("Y-m-d\TH:i:s\Z", strtotime("+1 day")),
        "signUpDatePast" => gmdate("Y-m-d\TH:i:s\Z", strtotime("-1 day")),
        "cardToken" => $data['paymentMethodToken'] ?? '',
        "accountHolderName" => $data['accountHolderName'] ?? '',
        "lastFour" => $data['lastFour'] ?? '',
        "firstSix" => $data['firstSix'] ?? '',
        "cardType" => $data['cardType'] ?? '',
        "maskedCard" => $data['firstSix'] . "****" . $data['lastFour'] ?? '',
        "expiryDate" => $cardExpiry ?? '',
        "bsb" => str_replace([' ', '-'], '', $data['BSB']) ?? '',
        "bankAccountNumber" => str_replace([' ', '-'], '', $data['bankAccountNumber']) ?? '',
        "bankAccountHolder" => $data['bankAccountHolder'] ?? '',
        "paymentFrequency" => $data['paymentFrequency'],
        "discountCode" => $data['discountCode'] ?? '',
        "membershipType" => $data['membershipType'] ?? 'level-2',
        "isGuest" => $data['isGuest'] ?? null,
        "friendsName" => $data['friendsName'] ?? null,
        "isPresale" => $data['isPresale'] ?? null,
        "signature" => $data['signed'] ? $data['signed'] . $data['signedPart2'] : false,
        "endDate" => $data['endDate'] ?? null,
    ];

    $data = FormDataParser::parse($data);

    $client = new EmailHandler();
    $client->sendTestEmailConfirmation($data, $to);

    dd("Test email sent to $to");
}

/**
 * Returns the gym's open date, which could be the presale end date or a custom open date.
 *
 * @param WP_Post|Post $gym
 * @return string The gym's open date as DD/MM/YYYY
 */
function getPresaleGymOpenDate(WP_Post|Post $gym): string
{
    $customOpenDate = get_post_meta($gym->ID, 'gym_open_date', true);
    $presaleEndDate = get_post_meta($gym->ID, 'presale_end_date', true);

    if ($customOpenDate) {
        return date('d/m/Y', strtotime($customOpenDate));
    }

    return date('d/m/Y', strtotime($presaleEndDate));
}

/**
 * Regenerate the vending discount QR code when the post is updated as we're assuming it's changed now
 *
 * @param $postId
 * @return void
 */
function render_email_preview_page() {
    // Get all email notifications
    $email_notifications = get_posts(array(
        'post_type' => 'email_notifications',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ));

    // Handle form submission
    $selected_post_id = isset($_GET['email_id']) ? intval($_GET['email_id']) : 0;

    ?>
    <div class="wrap">
        <h1>Email Preview</h1>
        <form method="get" action="">
            <input type="hidden" name="page" value="email-preview">
            <label for="email_id">Select Email Notification:</label>
            <select name="email_id" id="email_id">
                <option value="">-- Select --</option>
                <?php foreach ($email_notifications as $email): ?>
                    <option value="<?php echo $email->ID; ?>" <?php selected($selected_post_id, $email->ID); ?>>
                        <?php echo esc_html($email->post_title); ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <button type="submit" class="button button-primary">Preview</button>
        </form>

        <?php if ($selected_post_id): ?>
            <h2>Preview:</h2>
            <div style="border: 1px solid #ccc; padding: 20px; background: #fff;">
                <?php
                $template_path = get_template_directory() . '/Revo/PerfectGym/templates/email.php';
                if (file_exists($template_path)) {
                    $post = get_post($selected_post_id);
                    $membership_type = get_field('membership_type', $selected_post_id);
                    $gym_association = get_field('gym_association', $selected_post_id);

                    if (is_array($gym_association)) {
                        $gym_names = array_map(function ($gym_id) {
                            return get_term($gym_id)->name;
                        }, $gym_association);
                        $gym_association = implode(', ', $gym_names);
                    }

                    $data = array(
                        'title' => $post->post_title,
                        'membership_type' => $membership_type,
                        'gym_association' => $gym_association,
                        'gymName' => $gym_association,
                        'welcomeMessage' => get_field('welcome_message', $selected_post_id),
                        'firstName' => 'John',
                        'lastName' => 'Doe',
                        'email' => 'john.doe@example.com',
                        'dateOfBirth' => '1989-01-01',
                        'paymentFrequency' => get_field('payment_frequency', $selected_post_id),
                        'cost' => get_field('cost', $selected_post_id),
                        'startDate' => '2025-05-01',
                        'isGuest' => false,
                        'directDebit' => get_field('directDebit', $selected_post_id) ? get_field('direct_debit', $selected_post_id) : "directDebit",
                        'promotion' => 1,
                        'promotionDescription' => get_field('promotion_description', $selected_post_id),
                        'displayJimnyImage' => false,
                    );

                    $placeholders = array(
                        '{{firstName}}' => $data['firstName'],
                        '{{lastName}}' => $data['lastName'],
                        '{{membershipType}}' => $data['membership_type'],
                        '{{gymName}}' => $data['gymName'],
                        '{{email}}' => $data['email'],
                        '{{dateOfBirth}}' => (new DateTime($data['dateOfBirth']))->format('d/m/Y'),
                        '{{paymentFrequency}}' => $data['paymentFrequency'],
                        '{{cost}}' => $data['cost'],
                        '{{startDate}}' => (new DateTime($data['startDate']))->format('d/m/Y'),
                        '{{promotionDescription}}' => $data['promotionDescription'],
                    );

                    $data['welcomeMessage'] = str_replace(array_keys($placeholders), array_values($placeholders), $data['welcomeMessage']);

                    // 🛠️ Replace placeholders inside post content too
                    $data['content'] = str_replace(
                        array_keys($placeholders),
                        array_values($placeholders),
                        apply_filters('the_content', $post->post_content)
                    );

                    extract($data);
                    $notificationPostId = $selected_post_id;

                    include $template_path;
                } else {
                    echo '<p style="color: red;">Email template not found at: ' . esc_html($template_path) . '</p>';
                }
                ?>
            </div>
        <?php endif; ?>
    </div>
    <?php
}


add_action('wp_footer', function() {
    // This will run after all other scripts and override any cached ajax object
    ?>
    <script type="text/javascript">
    // Force override ajax object with fresh nonce
    ajax = {
        url: "<?php echo admin_url('admin-ajax.php'); ?>",
        nonce: "<?php echo wp_create_nonce('ajax-nonce'); ?>"
    };
    console.log("Ajax object overridden with fresh nonce:", ajax);
    </script>
    <?php
}, 999); // High priority to ensure it runs last