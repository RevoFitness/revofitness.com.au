<?php

/**
 * Create login form
 */
function hiitfit_login_form()
{
    $form = wp_login_form(array(
        'echo' => false,
        'redirect' => get_site_url() . '/hiitfit-on-demand/daily-exercise',
        'label_username' => 'Username',
        'remember' => false
    ));

    // Update the submit input to be a button
    $input = '/<input type="submit".*?>/s';
    $button = '<button type="submit" class="button button-primary">Log In</button>';
    $form = preg_replace($input, $button, $form);

    echo $form;
}

/**
 * Show error if failed login
 */
add_filter('login_form_middle', function () {
    // No errors, do nothing
    if (strpos($_SERVER['REQUEST_URI'], '?login=failed') === false) {
        return;
    }

    $error = '<p class="col-span-full text-brandRed text-sm">An account with this username and password does not exist.</p>';

    return $error;
});

/**
 * Add another 'join now' button
 */
add_filter('login_form_bottom', function () {
    $button = '<a href="/hiitfit-on-demand/sign-up" class="button-outline">Join Now</a>';

    return $button;
});

/**
 * Don't allow subscribers to access the dashboard
 */
add_action('init', 'prevent_subscribers_accessing_dashboard');
function prevent_subscribers_accessing_dashboard()
{
    // Not logged in so irrelevant
    if (!is_user_logged_in()) {
        return;
    }

    if (is_admin() && !current_user_can('edit_posts') && !(defined('DOING_AJAX') && DOING_AJAX)) {
        wp_redirect(home_url());
        exit;
    }
}

// Remove admin bar for subscribers
add_filter('show_admin_bar', function () {
    return current_user_can('edit_posts');
});

/**
 * Add a query string if the login failed
 */
add_action('wp_login_failed', 'hiitfit_login_failed');
function hiitfit_login_failed()
{
    $referrer = $_SERVER['HTTP_REFERER'];
    $notLoginScreen = !strstr($referrer, 'wp-login') && !strstr($referrer, 'wp-admin');

    if (!empty($referrer) && $notLoginScreen) {
        wp_redirect($referrer . '?login=failed');
        exit;
    }
}

/**
 * Log the user out
 */
add_action('wp_logout', 'auto_redirect_after_logout');
function auto_redirect_after_logout()
{
    wp_safe_redirect(home_url());
    exit;
}

function hiitfit_create_user($data)
{
    $userData = array(
        'user_pass'                =>  md5(rand()), // Random password, we'll send them an email to update this
        'user_login'             => $data['firstName'] . '_' . $data['lastName'],
        'user_nicename'         => $data['firstName'] . '-' . $data['lastName'],
        'user_email'             => $data['email'],
        'first_name'             => $data['firstName'],
        'last_name'             => $data['lastName'],
        'user_registered'         => date('Y-m-d H:i:s'),
        'show_admin_bar_front'     => false,
        'role'                     => 'subscriber',
    );

    $userId = wp_insert_user($userData);

    wp_new_user_notification($userId, null, 'user');
}
