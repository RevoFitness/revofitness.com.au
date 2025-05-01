<?php

namespace Revo;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Timber\Timber;
use Revo\Core\Cache;

class Zendesk
{
    private array $headers;
    private string $baseURL;

    public function __construct()
    {
        $this->baseURL = "https://revofitness.zendesk.com/api/v2/help_center";
        $this->headers = [
            'Authorization' => 'mathew@okmg.com/token:2MO31ykSxtZYU6gOfrlixhv8DIosINGp4oAs7EKP',
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
        ];

        add_action('wp_footer', [$this, 'addWidgetToFooter']);
    }

    /**
     * Get the articles data from Zendesk
     *
     * @return array $articlesData An array of data about the articles and pagination
     */
    public function getArticles(): array
    {
        $articlesData = Cache::get('zendesk_articles_data');

        if (!$articlesData) {
            $url = $this->baseURL . '/articles/?page[size]=100';
            $client = new Client(['timeout' => 30]);

            try {
                $response = $client->request('GET', $url, ['headers' => $this->headers]);
                $articlesData = json_decode($response->getBody(), true);

                foreach ($articlesData['articles'] as $article) {
                    $context['articles'][] = $article;
                }

                $articlesData['html'] = Timber::compile('partial/zendesk-articles.twig', $context);

                Cache::set('zendesk_articles_data', $articlesData, DAY_IN_SECONDS);

                return $articlesData;
            } catch (RequestException $e) {
                write_log("Zendesk GET articles error: " . $e->getRequest()->getMethod());
            }
        }

        return $articlesData;
    }

    /**
     * Get the articles 'sections' (categories) from Zendesk
     *
     * @return array $articlesData An array containing the sections (categories)
     */
    public function getCategories()
    {
        $url = $this->baseURL . '/sections/';
        $client = new Client(['timeout' => 30]);
        try {
            $response = $client->request('GET', $url, ['headers' => $this->headers]);
            $categories = json_decode($response->getBody(), true)['sections'];

            return $categories;
        } catch (RequestException $e) {
            write_log("Zendesk GET categories error: " . $e->getRequest()->getMethod());
        }
    }

    /**
     * Adds the revofitness Zendesk Widget to the footer of the page.
     * The script is provided by Zendesk and is identified by a unique key.
     *
     * @return void
     */
    public function addWidgetToFooter(): void
    {
?>

        <!-- Start of revofitness Zendesk Widget script -->
        <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=5e44532d-545b-4e10-82fc-65d100e3329e"> </script>
        <!-- End of revofitness Zendesk Widget script -->
        <!-- Start of revofitness Zendesk Widget script -->
        <script type="text/javascript">
            window.zESettings = {
                webWidget: {
                    helpCenter: {
                        originalArticleButton: false
                    }
                }
            };
        </script>

<?php
    }
}
