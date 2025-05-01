<?php

use Timber\Timber;

$context = Timber::context();

$today = new DateTime();
$today->setTime(0, 0);
$dayNumber = floor($today->getTimestamp() / (24 * 60 * 60));
$videoIds = getVideoIds();
$todaysVideoIndex = ($dayNumber + 12) % count($videoIds);

$context['warmupID'] = "YygLp5SMKUE";
$context['cooldownID'] = "rWP2PtDP-ow";
$context['dailyID'] = $videoIds[$todaysVideoIndex]['daily'];
$context['glossary'] = $videoIds[$todaysVideoIndex]['glossary'];
$context['videoNumber'] = $todaysVideoIndex;

Timber::render('page-daily-exercise.twig', $context);

function getVideoIds()
{
    $client = new GuzzleHttp\Client();
    try {
        $response = $client->request('GET', get_stylesheet_directory_uri() . '/json/hiitfit-ids.json', array(
            'headers' => array(
                'Cache-Control' => 'public, max-age=604800',
                'Content-Type' => 'application/json',
            ),
        ));

        return json_decode($response->getBody(), true);
    } catch (GuzzleHttp\Exception\RequestException $e) {
        write_log(['GET HIITIFT video ID\'s error', $e->getResponse()->getBody()]);
        return null;
    }
}
