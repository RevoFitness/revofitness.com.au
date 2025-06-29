<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

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

//session_start();
add_action('init', function () {
    if (!session_id()) {
        ini_set('session.save_path', sys_get_temp_dir()); // or set a custom path
        session_start();
    }
});

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
    }
    /** This is where you can register custom taxonomies. */
    public function register_taxonomies() {}

    /** This is where you can register custom CSS & JS files. */
    public function register_assets()
    {
        $style_version = filemtime(get_stylesheet_directory() . '/static/style.css');
        wp_enqueue_style('startdigital', get_stylesheet_directory_uri() . '/static/style.css', array(), $style_version);

        $script_version = filemtime(get_stylesheet_directory() . '/static/site.js');
        wp_enqueue_script('startdigital', get_stylesheet_directory_uri() . '/static/site.js', array(), $script_version);
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
function regenerateVendingDiscount($postId)
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    $template = basename(get_page_template($postId));
    if ($template === 'template-vending-discount.php') {
        delete_transient('vending_discount_qr_code');
        $code = get_field('code', $postId);
        $request = wp_remote_get("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=$code");
        $body = wp_remote_retrieve_body($request);
        $qrCode = base64_encode($body);

        set_transient('vending_discount_qr_code', $qrCode);
    }
}
add_action('acf/save_post', 'regenerateVendingDiscount', 20);

/**
 *  
 * CANCELLATION OF MEMBERSHIPS ---------------------------------------------------------------->
 */
function sendCancellationEmail(array $data): void
{
    $email       = $data['email'] ?? 'N/A';
    $contractIds = is_array($data['contractIds']) ? implode(', ', $data['contractIds']) : $data['contractIds'];
    $cancelDate  = $data['cancelDate'] ?? gmdate('c');
    $firstName   = $data['firstName'] ?? 'Unknown';
    $lastName    = $data['lastName'] ?? 'Unknown';
    $clubName    = $data['clubName'] ?? 'Unknown';
    $currentYear = date('Y');

    // Build club-based email
    if ($clubName !== 'Unknown') {
        $to = strtolower(str_replace(' ', '', $clubName)) . '@revofitness.com.au';
    } else {
        $to = 'itsupport@revofitness.com.au';
    }


    $subject = "{$clubName} Member Cancellation";

    $htmlBody = '<table width="100%" align="center" cellspacing="0" cellpadding="0" border="0" bgcolor="#F8F8F8" style="background-color: #F8F8F8;min-height:100vh;">
      <tbody>
        <tr>
          <td align="center" style="padding: 16px;">
            <table width="500" align="center" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" style="background-color: #FFFFFF;">
              <tbody>
                <tr>
                  <td style="border: 1px solid #eeeeee; font-family: Helvetica, Arial, sans-serif; color: #000000; padding: 16px 32px;">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" style="background-color:#FFFFFF; border-collapse:collapse;">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" style="padding: 0 0 16px 0;">
                            <a href="https://revofitness.com.au">
                              <img src="https://revofitness.com.au/wp-content/uploads/2025/05/revofitness-logo.png" border="0" width="220" height="17.6" alt="Revo Fitness" title="Revo Fitness">
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td valign="top" style="padding: 32px 0; color: #333333; font-size: 15px; line-height: 24px; border-top: 1px solid #eeeeee;">
                            <p>Hi ' . htmlspecialchars($firstName) . '</p>
                            <p>We’ve received your cancellation request for your Revo Fitness membership.></p>
                            <p>Here’s a quick summary:</p>
                            <p><strong>Member ID:</strong> ' . htmlspecialchars($data['memberId'] ?? 'Unknown') . '</p>
                            <p><strong>Member Name:</strong> ' . htmlspecialchars($firstName) . ' ' . htmlspecialchars($lastName) . '</p>
                            <p><strong>Member Email:</strong> ' . htmlspecialchars($email) . '</p>
                            <p><strong>Member Home Club:</strong> ' . htmlspecialchars($clubName) . '</p>
                            <p><strong>Requested on:</strong> ' . htmlspecialchars($cancelDate) . '</p>
                            <p><strong>What happens next?</strong></p>
                            <p>Our team will be in touch soon to chat through your cancellation, confirm your final debit, and let you know your last day of access to the gym.</p>
                            <p>Need anything else or changed your mind? Just reach out! We’re here to help.</p>
                            <br/><br/>
                            <p>Team Revo</p>
                            </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top" style="padding: 16px 0; font-size: 10px; line-height: 16px;">
                            <a href="https://revofitness.com.au" target="_blank" style="color: #1a82b0; text-decoration: none;">Website</a>
                            <span> | </span>
                            <a href="https://revofitness.com.au/terms/" target="_blank" style="color: #1a82b0; text-decoration: none;">Legal</a>
                            <span> | </span>
                            <a href="https://revofitness.com.au/privacy" target="_blank" style="color: #1a82b0; text-decoration: none;">Privacy</a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" valign="top" style="padding: 16px 0; border-top: 1px solid #eeeeee; font-size: 9px; line-height: 16px; color: #666666;">
                            Contact us at <a style="text-decoration: none; color: #dc2d33;" href="tel:1300738638">1300 738 638</a>.<br>
                            ' . $currentYear . ', Revo Fitness. All rights reserved.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>';

    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'From: Revo Fitness <no-reply@revofitness.com.au>'
    ];

    // Add CC if valid email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Cc: ' . $email;
    }

    $sent = wp_mail($to, $subject, $htmlBody, $headers);

    if ($sent) {
        write_log("✅ wp_mail: Email sent to $to");
    } else {
        write_log("❌ wp_mail: Failed to send email to $to");
    }
}






add_action('wp_ajax_check_member', 'check_member_callback');
add_action('wp_ajax_nopriv_check_member', 'check_member_callback');

add_action('wp_ajax_confirm_cancel_member', 'confirm_cancel_member_callback');
add_action('wp_ajax_nopriv_confirm_cancel_member', 'confirm_cancel_member_callback');

function check_member_callback()
{
    $email = sanitize_email($_POST['email'] ?? '');

    if (empty($email)) {
        wp_send_json_error(['message' => 'Email is required.']);
    }

    $clientId = $_ENV['PG_APP_CLIENT_ID'];
    $clientSecret = $_ENV['PG_APP_CLIENT_SECRET'];

    $odataUrl = "https://revofitness.perfectgym.com.au/API/v2.2/odata/Members?\$filter=Email eq '" . urlencode($email) . "'&\$expand=homeClub";

    $response = wp_remote_get($odataUrl, [
        'headers' => [
            'X-Client-Id'     => $clientId,
            'X-Client-Secret' => $clientSecret,
            'Accept'          => 'application/json',
        ],
    ]);

    if (is_wp_error($response)) {
        wp_send_json_error(['message' => 'API request failed.']);
    }

    $data = json_decode(wp_remote_retrieve_body($response), true);
    $member = $data['value'][0] ?? null;

    if (!$member || empty($member['isActive'])) {
        wp_send_json_error(['message' => 'No active member found.']);
    }

    // Get contract ID
    $contractUrl = "https://revofitness.perfectgym.com.au/API/v2.2/odata/Contracts?\$filter=MemberId eq {$member['id']}";
    $contractRes = wp_remote_get($contractUrl, [
        'headers' => [
            'X-Client-Id'     => $clientId,
            'X-Client-Secret' => $clientSecret,
            'Accept'          => 'application/json',
        ],
    ]);

    if (is_wp_error($contractRes)) {
        wp_send_json_error(['message' => 'Failed to fetch contract.']);
    }

    $contractData = json_decode(wp_remote_retrieve_body($contractRes), true);
    write_log('Full member object: ' . print_r($member, true));

    $contractId = $contractData['value'][0]['id'] ?? null;

    if (!$contractId) {
        wp_send_json_error(['message' => 'No contract found.']);
    }

    wp_send_json_success([
        'id'         => $member['id'],
        'firstName'  => $member['firstName'],
        'lastName'   => $member['lastName'],
        'contractId' => $contractId,
        'clubName'   => $member['homeClub']['name'] ?? 'Unknown',
    ]);
}


add_action('wp_ajax_confirm_cancel_member', 'confirm_cancel_member_callback');
add_action('wp_ajax_nopriv_confirm_cancel_member', 'confirm_cancel_member_callback');

function confirm_cancel_member_callback()
{
    $homeClub  = sanitize_text_field($_POST['club_name'] ?? '');
    $email     = sanitize_email($_POST['email'] ?? '');
    $memberId  = intval($_POST['member_id'] ?? 0);
    $requestedAt = date('c');

    if (!$email || !$memberId) {
        wp_send_json_error(['message' => 'Missing email or member ID.']);
    }

    $clientId     = $_ENV['PG_APP_CLIENT_ID'];
    $clientSecret = $_ENV['PG_APP_CLIENT_SECRET'];

    if (!$clientId || !$clientSecret) {
        wp_send_json_error(['message' => 'API credentials not configured.']);
    }

    // Get member details
    $memberUrl = "https://revofitness.perfectgym.com.au/API/v2.2/odata/Members($memberId)";
    $memberRes = wp_remote_get($memberUrl, [
        'headers' => [
            'X-Client-Id'     => $clientId,
            'X-Client-Secret' => $clientSecret,
            'Accept'          => 'application/json',
        ],
    ]);
    $member = json_decode(wp_remote_retrieve_body($memberRes), true);

    // Get contracts for the member
    $contractsUrl = "https://revofitness.perfectgym.com.au/API/v2.2/odata/Contracts?\$filter=MemberId eq $memberId";
    $res = wp_remote_get($contractsUrl, [
        'headers' => [
            'X-Client-Id'     => $clientId,
            'X-Client-Secret' => $clientSecret,
            'Accept'          => 'application/json',
        ],
    ]);

    if (is_wp_error($res)) {
        wp_send_json_error(['message' => 'Failed to fetch contracts.']);
    }

    $body = json_decode(wp_remote_retrieve_body($res), true);
    if (empty($body['value'])) {
        wp_send_json_error(['message' => 'No contracts found for member.']);
    }

    $contractIds = array_column($body['value'], 'id');
    $fullName = trim(($member['firstName'] ?? '') . ' ' . ($member['lastName'] ?? ''));

    // Send email
    sendCancellationEmail([
        'email'       => $email,
        'memberId'    => $memberId,
        'contractIds' => $contractIds,
        'cancelDate'  => $requestedAt,
        'firstName'   => $member['firstName'] ?? 'Unknown',
        'lastName'    => $member['lastName'] ?? 'Unknown',
        'clubName'    => $homeClub ?: 'Unknown',
    ]);

    // Add member note
    // Add a cancellation note to a member via PG v2.2 RPC
    $noteData = [
        'memberId' => $memberId,
        'note'     => 'Member has requested to cancel membership',
    ];

    $noteRes = wp_remote_post(
        "https://revofitness.perfectgym.com.au/API/v2.2/Members/AddMemberNote",
        [
            'headers' => [
                'X-Client-Id'     => $clientId,
                'X-Client-Secret' => $clientSecret,
                'Content-Type'    => 'application/json',
                'Accept'          => 'application/json',
            ],
            'body'    => wp_json_encode($noteData),
            'timeout' => 15,
        ]
    );

    // PG will return status 200 on success
    $code = wp_remote_retrieve_response_code($noteRes);
    if (is_wp_error($noteRes) || $code !== 200) {
        error_log("PG AddMemberNote failed: " . print_r($noteRes, true));
        wp_send_json_error([
            'message' => 'Failed to add member note.',
            'code'    => $code,
        ]);
    }

    wp_send_json_success(['message' => 'Cancellation request submitted.']);
}






/**
 *  
 * EMAIL CHECK IF EXISTING MEMBERSHIPS ---------------------------------------------------------------->
 */

add_action('wp_ajax_check_pg_membership', 'check_pg_membership');
add_action('wp_ajax_nopriv_check_pg_membership', 'check_pg_membership');

function check_pg_membership()
{
    $email       = sanitize_email($_POST['email'] ?? '');
    $rawPhone = preg_replace('/\s+/', '', $_POST['phoneNumber'] ?? '');
    $phoneNumber = '';

    if (!empty($rawPhone)) {
        // Convert 04XXXXXXXX to +614XXXXXXXX
        if (preg_match('/^04\d{8}$/', $rawPhone)) {
            $phoneNumber = '+61' . substr($rawPhone, 1);
        } elseif (preg_match('/^\+614\d{8}$/', $rawPhone)) {
            $phoneNumber = $rawPhone;
        }
    }


    if (!$email && !$phoneNumber) {
        wp_send_json_error(['message' => 'Email or phone is required']);
    }

    $clientId = $_ENV['PG_APP_CLIENT_ID'];
    $clientSecret = $_ENV['PG_APP_CLIENT_SECRET'];

    // 🔧 Build dynamic OData filter
    $filters = [];
    if ($email) {
       $filters[] = "(Email eq '$email')";
    }
    if ($phoneNumber) {
        $filters[] = "(PhoneNumber eq '$phoneNumber')";
    }

    $filterQuery = implode(' or ', $filters);
    $memberUrl = "https://revofitness.perfectgym.com.au/API/v2.2/odata/Members?\$filter=" . rawurlencode($filterQuery);



    $memberRes = wp_remote_get($memberUrl, [
        'headers' => [
            'X-Client-Id'     => $clientId,
            'X-Client-Secret' => $clientSecret,
            'Accept'          => 'application/json',
        ],
    ]);

    if (is_wp_error($memberRes)) {
        wp_send_json_error(['message' => 'Failed to fetch member.']);
    }

    $memberData = json_decode(wp_remote_retrieve_body($memberRes), true);
    $members = $memberData['value'] ?? [];

    // Filter out deleted members
    $members = array_filter($members, fn($m) => empty($m['isDeleted']));

    // Optional: sort by version descending
    usort($members, fn($a, $b) => ($b['version'] ?? 0) <=> ($a['version'] ?? 0));

    if (empty($members)) {
        wp_send_json_success(['exists' => false]);
    }

    $results = [];

    foreach ($members as $member) {
        $memberId = $member['id'];
        $contractUrl = "https://revofitness.perfectgym.com.au/API/v2.2/odata/Contracts?\$filter=MemberId eq $memberId";

        $contractRes = wp_remote_get($contractUrl, [
            'headers' => [
                'X-Client-Id'     => $clientId,
                'X-Client-Secret' => $clientSecret,
                'Accept'          => 'application/json',
            ],
        ]);

        if (is_wp_error($contractRes)) {
            continue;
        }

        $contractData = json_decode(wp_remote_retrieve_body($contractRes), true);
        $contracts = $contractData['value'] ?? [];

        $hasActiveContract = false;
        $statuses = [];
        $cleanedContracts = [];

        foreach ($contracts as $contract) {
            $status = $contract['status'] ?? 'Unknown';
            $statuses[] = strtolower($status);

            $cleanedContracts[] = [
                'contractId' => $contract['id'],
                'status'     => $status,
                'type'       => $contract['type'] ?? 'Unknown',
                'startDate'  => $contract['startDate'] ?? null,
                'endDate'    => $contract['endDate'] ?? null,
            ];

            if (strtolower($status) === 'current') {
                $hasActiveContract = true;
            }
        }

        $results[] = [
            'memberId'    => $member['id'],
            'firstName'   => $member['firstName'] ?? '',
            'lastName'    => $member['lastName'] ?? '',
            'phoneNumber' => $member['phoneNumber'] ?? '',
            'gender'      => $member['sex'] ?? '',
            'dateOfBirth' => $member['birthdate'] ?? '',
            'homeClub'    => $member['homeClub']['name'] ?? 'Unknown',
            'isActive'    => $member['isActive'] ?? false,
            'contracts'   => $cleanedContracts,
            'statuses'    => array_unique($statuses),
        ];
    }

    wp_send_json_success([
        'exists'  => count($results) > 0,
        'members' => $results,
        'all'     => $members,
    ]);
}

/*
** Enables ACF fields to be available via rest API
*/
/*
add_filter('acf/update_value/name=latitude', function($value, $post_id, $field) {
    update_post_meta($post_id, 'latitude', $value);
    return $value;
}, 10, 3);

add_filter('acf/update_value/name=longitude', function($value, $post_id, $field) {
    update_post_meta($post_id, 'longitude', $value);
    return $value;
}, 10, 3);

add_action('rest_api_init', function () {
    register_rest_route('revo/debug', '/acf/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => function ($request) {
            $id = $request['id'];
            $fields = get_fields($id);

            error_log("💡 get_fields($id): " . print_r($fields, true));
            return $fields;
        },
        'permission_callback' => '__return_true',
    ]);
});

run this after removing disabled attribute from lat and long + update each gym page after running then remove 
add_action('init', function () {
    write_log("🔥 Forced backfill running...");

    $gyms = get_posts([
        'post_type' => 'gyms',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ]);

    $updated = 0;

    foreach ($gyms as $gym) {
        $id = $gym->ID;
        $lat = get_field('latitude', $id);
        $lng = get_field('longitude', $id);

        write_log("→ Post ID $id — lat: $lat | lng: $lng");

        if (!empty($lat)) {
            update_post_meta($id, 'latitude', $lat);
            write_log("✅ Updated latitude to $lat for post $id");
            $updated++;
        }

        if (!empty($lng)) {
            update_post_meta($id, 'longitude', $lng);
            write_log("✅ Updated longitude to $lng for post $id");
            $updated++;
        }
    }

    write_log("🟢 Forced backfill complete: $updated values written.");
});

*/