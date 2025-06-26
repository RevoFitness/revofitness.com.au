<?php

namespace Revo;

class MapHandler
{
    // List of Australian capital cities per state
    protected $australianStatesCapitals = array(
        'New South Wales' => 'Sydney',
        'Victoria' => 'Melbourne',
        // 'Queensland' => 'Brisbane',
        'South Australia' => 'Adelaide',
        'Western Australia' => 'Perth',
        // 'Tasmania' => 'Hobart',
        // 'Northern Territory' => 'Darwin',
    );

    /**
     * Get the Users location based on their IP
     */
    protected function getLocationByIp($ip)
    {
        try {
            $url = "http://ip-api.com/json/{$ip}";
            $json = file_get_contents($url, 0, stream_context_create(["http" => ["timeout" => 3]]));
            $data = json_decode($json, true);
        } catch (\Exception $e) {
            $data = array('status' => 'fail');
        }

        return $data;
    }



    /**
     * Get the Lat/Long for the provided city
     *
     * @param string $city The City to get the Lat/Long for
     * @return array The Lat/Long of the city
     */
    protected function getLatLongByCity($city): array
    {
        $citiesLatLong = array(
            'All' => ['-25.274400', '133.775100'],
            'Perth' => ['-31.953512', '115.857048'],
            'Sydney' => ['-33.868820', '151.209290'],
            'Melbourne' => ['-37.813610', '144.963100'],
            // 'Brisbane' => ['-27.469770', '153.025131'],
            'Adelaide' => ['-34.928490', '138.600740'],
            // 'Hobart' => ['-42.882140', '147.327200'],
            // 'Canberra' => ['-35.280937', '149.130009'],
            // 'Darwin' => ['-12.463440', '130.845642']
        );

        return $citiesLatLong[$city] ?: $citiesLatLong['All'];
    }

    /**
     * Get the capital city by state
     *
     * @param string $state The state the user is in
     * @return string The capital city of the state
     */
    protected function getCapitalCityByState(string $state): string
    {
        return $this->australianStatesCapitals[$state] ?? 'All';
    }

    /**
     * Get the state based on the users IP
     */
    public function getUserLocation()
    {
        // Start the session if not already started
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        // Check if the IP and location are already stored in the session
        if (!isset($_SESSION['user_state']) || !isset($_SESSION['user_city']) || !isset($_SESSION['user_ip'])) {
            $_SESSION['user_ip'] = $_SERVER['REMOTE_ADDR'];
            $location = $this->getLocationByIp($_SESSION['user_ip']);
            $statesWithGyms = array('Western Australia', 'New South Wales', 'South Australia', 'Victoria');

            if (!isset($location) || $location['status'] == 'fail' || empty($location)) {
                // If not in Australia or IP lookup failed, set defaults
                $_SESSION['user_state'] = 'All';
                $_SESSION['user_city'] = 'All';
            } else {
                $_SESSION['user_state'] = in_array($location['regionName'], $statesWithGyms) ? $location['regionName'] : 'All';
                $_SESSION['user_city'] = $this->getCapitalCityByState($_SESSION['user_state']) ?: 'All';
            }
        }

        $latLng = $this->getLatLongByCity($_SESSION['user_city']);

        return array(
            'state' => $_SESSION['user_state'],
            'latitude' => $latLng[0],
            'longitude' => $latLng[1],
        );
    }

    /**
     * Map the state shortname / long name
     */
    public function convertStateName($name)
    {
        $states = array(
            'All' => 'All',
            'NSW' => 'New South Wales',
            'VIC' => 'Victoria',
            // 'QLD' => 'Queensland',
            'SA' => 'South Australia',
            'WA' => 'Western Australia',
            // 'TAS' => 'Tasmania',
            // 'NT' => 'Northern Territory',
        );

        if (array_key_exists($name, $states)) {
            return $states[$name]; // Convert short name to long name
        } else {
            $reversedStates = array_flip($states);
            return $reversedStates[$name]; // Convert long name to short name
        }

        // Key doesn't exist
        return false;
    }
}
