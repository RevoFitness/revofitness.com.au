<?php

namespace Revo\PerfectGym;

use Revo\Core\Cache;
use GuzzleHttp\Client;
use Revo\Core\ValidationException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;

class PerfectGymClient
{
    public string $baseURL;
    protected object $key;

    public function __construct()
    {
        $this->baseURL = $_ENV['ENV'] === 'production' ? 'https://revofitness.perfectgym.com.au/Api' : 'https://revofitnessuat.perfectgym.com.au/Api';
        $this->key = $this->getApiKey();

        add_action('wp_ajax_nopriv_handle_form_submission', [$this, 'handleFormSubmission']);
        add_action('wp_ajax_handle_form_submission', [$this, 'handleFormSubmission']);
    }

    /**
     * Sends a POST API request to the specified URL.
     *
     * @param string $apiUrl The URL to send the API request to.
     * @param array|string $data The data to include in the API request body.
     * @param array|null $headers The headers to include in the API request. (Optional)
     * @return string|false The response body as a string if the request was successful, or false if an error occurred.
     * @throws RequestException If an error occurs during the request.
     */
    public function postApiRequest(string $apiUrl, array|string $data, ?array $newHeaders = null, int $maxRetries = 0): string|false
    {
        $client = new Client(['timeout' => 60]);

        $defaultHeaders = [
            'X-Client-Id' => $this->key->id,
            'X-Client-Secret' =>  $this->key->secret,
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
        ];

        // Optionally override headers
        $headers = $defaultHeaders;
        if ($newHeaders !== null) {
            foreach ($newHeaders as $key => $value) {
                $headers[$key] = $value;
            }
        }

        $attempt = 0;
        while ($attempt <= $maxRetries) {
            try {
                $response = $client->request('POST', $apiUrl, [
                    'headers' => $headers,
                    'body' => gettype($data) === 'string' ? $data : json_encode($data)
                ]);

                if ($response->getStatusCode() == 200) {
                    write_log("POST REQUEST to $apiUrl successful");
                    return (string) $response->getBody();
                }

                $attempt++;
                sleep(1);
            } catch (RequestException $e) {
                write_log(["$apiUrl RequestException", $e->getMessage()]);
                if ($e->getResponse() !== null) {
                    $errors = json_decode($e->getResponse()->getBody());
                    write_log(['POST REQUEST', $errors]);
                    // ValidationException::throw(array($errors[0]->message));
                }
                $attempt++;
            } catch (ConnectException $e) {
                $message = 'Unable to connect to the server. Please try again';
                write_log($message);
                ValidationException::throw(array($message));
                $attempt++;
            }
        }

        return false;
    }

    /**
     * Sends a GET API request to the specified URL.
     *
     * @param string $apiUrl The URL to send the API request to.
     * @param array $headers The headers to include in the API request.
     * @return string|false The response body as a string if the request was successful, or false if an error occurred.
     * @throws RequestException If an error occurs during the request.
     */
    public function getApiRequest(string $apiUrl, ?array $newHeaders = null, int $maxRetries = 0): string|false
    {
        $client = new Client(['timeout' => 60]);
        $defaultHeaders = [
            'X-Client-Id' => $this->key->id,
            'X-Client-Secret' =>  $this->key->secret,
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
        ];

        // Optionally override headers
        $headers = $defaultHeaders;
        if ($newHeaders !== null) {
            foreach ($newHeaders as $key => $value) {
                $headers[$key] = $value;
            }
        }

        $attempt = 0;
        while ($attempt <= $maxRetries) {
            try {
                $response = $client->request('GET', $apiUrl, [
                    'headers' => $headers,
                ]);

                if ($response->getStatusCode() == 200) {
                    return $response->getBody();
                }

                $attempt++;
                sleep(1);
            } catch (RequestException $e) {
                if ($e->getResponse() !== null) {
                    write_log(['GET request', json_decode($e->getResponse()->getBody())->errors]);
                }
                if ($attempt >= $maxRetries - 1) {
                    return $e;
                }
                $attempt++;
            }
        }

        return false;
    }

    /**
     * Wrapper for getting items from cache if they exist,
     * otherwise fetch it from the API and save it to cache
     *
     * @param string $url The URL of the API endpoint
     * @param string $key The cache key to fetch from/save to
     */
    public function fetch(string $url, string $key = null): mixed
    {
        if (is_null($key)) {
            $response = $this->getApiRequest($url, null, 3);
            return json_decode($response);
        }

        $items = Cache::get($key);

        if (!$items) {
            $response = $this->getApiRequest($url, null, 3);
            $items = json_decode($response);

            Cache::set($key, $items);
        }

        return $items;
    }

    /**
     * Get the API key from the .env file based on form submission URL
     *
     * @return object The API key object
     */
    protected function getApiKey(): object
    {
        $url = explode('/', $_SERVER['REQUEST_URI'])[1];

        if ($_ENV['ENV'] !== 'production') {
            return (object) [
                'id' => $_ENV['PG_SANDBOX_CLIENT_ID'],
                'secret' => $_ENV['PG_SANDBOX_CLIENT_SECRET'],
            ];
        }

        $mapping = array(
            'app-registration' => (object) [
                'id' => $_ENV['PG_APP_CLIENT_ID'],
                'secret' => $_ENV['PG_APP_CLIENT_SECRET'],
            ],
            'in-club-registration' => (object) [
                'id' => $_ENV['PG_INCLUB_CLIENT_ID'],
                'secret' => $_ENV['PG_INCLUB_CLIENT_SECRET'],
            ],
            'in-club-registration-minor' => (object) [
                'id' => $_ENV['PG_INCLUB_CLIENT_ID'],
                'secret' => $_ENV['PG_INCLUB_CLIENT_SECRET'],
            ],
            'default' => (object) [
                'id' => $_ENV['PG_DEFAULT_CLIENT_ID'],
                'secret' => $_ENV['PG_DEFAULT_CLIENT_SECRET'],
            ]
        );

        return array_key_exists($url, $mapping) ? $mapping[$url] : $mapping['default'];
    }
}
