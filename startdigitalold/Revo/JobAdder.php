<?php

namespace Revo;

use League\OAuth2\Client\Provider\GenericProvider;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use TheStart\Startle\StartlePublic;

class JobAdder
{

    private GenericProvider $provider;
    private string $baseURL;
    private int $boardID;

    public function __construct()
    {
        $this->baseURL = "https://api.jobadder.com/v2";
        $this->boardID = 3259;
        $sslStatus = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        $this->provider = new GenericProvider([
            'clientId'                => $_ENV['JOBADDER_CLIENT_ID'],    // The client ID assigned to you by the provider
            'clientSecret'            => $_ENV['JOBADDER_CLIENT_SECRET'],    // The client password assigned to you by the provider
            'redirectUri'             => $sslStatus . $_SERVER['SERVER_NAME'] . '/jobadder-redirect.php',
            'urlAuthorize'            => 'https://id.jobadder.com/connect/authorize',
            'urlAccessToken'          => 'https://id.jobadder.com/connect/token',
            'urlResourceOwnerDetails' => '',
        ]);

        add_action('init', array($this, 'scheduleCron'));
        add_filter('cron_schedules', array($this, 'addThirtyMinuteSchedule'));
        add_action('refresh_access_token_cron', array($this, 'refreshAccessToken'));
    }

    public function jobs()
    {
        $jobs = $this->fetch("jobboards/$this->boardID/ads", 'jobs');

        if (isset($jobs->items)) {
            return $jobs->items;
        }

        return null;
    }

    /**
     * Wrapper for getting items from cache if they exist,
     * otherwise fetch it from the API and save it to cache
     *
     * @param String $url The URL of the API endpoint
     * @param String $key The cache key to fetch from/save to
     */
    protected function fetch(string $endpoint, string $key): mixed
    {
        $items = wp_cache_get($key, 'jobadder');

        if (!$items) {
            $response = $this->get($endpoint);
            $items = json_decode($response);

            wp_cache_set($key, $items, 'jobadder', WEEK_IN_SECONDS);
        }

        return $items;
    }

    /**
     * Sends a GET API request to the specified URL.
     *
     * @param string $endpoint The endpoint to send the API request to.
     * @return string|false The response body as a string if the request was successful, or false if an error occurred.
     * @throws RequestException If an error occurs during the request.
     */
    protected function get(string $endpoint): string|false
    {
        // Recursively get a new access token and run this method again
        if (get_transient('jobadder_access_token') === false) {
            $this->refreshAccessToken();
            $this->get($endpoint);
        }

        $client = new Client(['timeout' => 30]);
        $headers = [
            'Authorization' => 'Bearer ' . get_transient('jobadder_access_token'),
            'Content-Type' => 'application/json',
        ];

        try {
            $response = $client->request('GET', "$this->baseURL/$endpoint", [
                'headers' => $headers,
            ]);

            return $response->getBody();
        } catch (RequestException $e) {
            write_log(['GET request', json_decode($e->getResponse()->getBody())->errors]);
            return $e;
        }
    }

    /**
     * Schedules a cron job if not already scheduled.
     *
     * The job is intended to refresh the access token, and will run every thirty minutes.
     */
    public function scheduleCron()
    {
        if (!wp_next_scheduled('refresh_access_token_cron')) {
            wp_schedule_event(time(), 'every_thirty_minutes', 'refresh_access_token_cron');
        }
    }

    /**
     * Adds a new custom cron schedule that occurs every 30 minutes.
     *
     * @param array $schedules An array of currently defined cron schedules.
     *
     * @return array The $schedules array with the 'every_thirty_minutes' interval added.
     */
    public function addThirtyMinuteSchedule($schedules)
    {
        $schedules['every_thirty_minutes'] = array(
            'interval' => 30 * 60,
            'display'  => __('Every 30 Minutes'),
        );
        return $schedules;
    }

    /**
     * Refreshes the access token. If the refresh token has expired, it must be manually refreshed.
     *
     * This method handles the retrieval of the refresh token from a transient, and the subsequent
     * fetching of a new access token. The new access and refresh tokens are then stored back into
     * transients for later use.
     */
    public function refreshAccessToken()
    {
        $refreshToken = get_transient('jobadder_refresh_token');

        if (false === $refreshToken) {
            $message = "Refresh token has expired. Please visit /jobadder-login.php to refresh the token.";
            $startle = new StartlePublic();
            $startle->sendEmailNotification([
                "type"     => 1,
                "message"  => $message,
                "file"     => __FILE__,
                "line"     => __LINE__
            ]);

            write_log($message);
            write_log($message);
            write_log($message);
        } else {
            try {
                $newAccessToken = $this->provider->getAccessToken('refresh_token', [
                    'refresh_token' => $refreshToken,
                ]);

                // Store the new tokens in transient
                set_transient('jobadder_access_token', $newAccessToken->getToken(), HOUR_IN_SECONDS - 1800); // 55 minutes
                set_transient('jobadder_refresh_token', $newAccessToken->getRefreshToken(), DAY_IN_SECONDS * 30);
            } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                write_log(['Error refreshing token', $e->getMessage()]);
            }
        }
    }
}
