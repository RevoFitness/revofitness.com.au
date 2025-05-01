<?php

namespace Revo;

class Utils
{
    public function __construct()
    {
        add_action('wp_ajax_get_possible_start_dates', array($this, 'ajaxGetPossibleStartDates'));
        add_action('wp_ajax_nopriv_get_possible_start_dates', array($this, 'ajaxGetPossibleStartDates'));
    }

    /**
     * Return a list of possible start dates for the user
     * Essentially just the next 7 days.
     */
    public function getPossibleStartDates()
    {
        date_default_timezone_set('Australia/Perth');

        $startDates = array(date('d/m/Y'));
        $NUMBER_OF_DAYS_TO_CHOOSE_FROM = 7;

        for ($i = 1; $i <= $NUMBER_OF_DAYS_TO_CHOOSE_FROM; $i++) {
            $startDates[] = date('d/m/Y', strtotime("+ $i days"));
        }

        return $startDates;
    }

    /**
     * Return a list of possible start dates for the user of a presale gym
     * If the gym isn't open, this is fixed to the open date
     * Otherwise, it's just the next 7 days
     */
    public function getPossiblePresaleStartDates($id)
    {
        date_default_timezone_set('Australia/Perth');
        $presaleEndDate = get_post_meta($id, 'presale_end_date', true);
        $today = date('Ymd');

        if (get_post_meta($id, 'custom_open_date', true)) {
            $customOpenDate = get_post_meta($id, 'gym_open_date', true);
        }

        // Custom open date but it's not open yet
        if (isset($customOpenDate) && $today < $customOpenDate) {
            $startDate = \DateTime::createFromFormat('Ymd', $customOpenDate)->format('d/m/Y');
            return array($startDate);
        }

        // Presale is still on going and it's not open yet
        if ($today < $presaleEndDate && !isset($customOpenDate)) {
            $startDate = \DateTime::createFromFormat('Ymd', $presaleEndDate)->format('d/m/Y');
            return array($startDate);
        }

        return $this->getPossibleStartDates();
    }

    public function ajaxGetPossibleStartDates()
    {
        $startDates = $this->getPossiblePresaleStartDates($_GET['id']);

        wp_send_json($startDates);
        wp_die();
    }

    /**
     * Calculate the distance between two locations
     */
    function calculateDistanceBetween($latitude1, $longitude1, $latitude2, $longitude2)
    {
        $earthRadiusInKilometers = 6371;

        $degreeToRadius = function ($deg) {
            return $deg * (pi() / 180);
        };

        $differenceInLatitude = $degreeToRadius($latitude2 - $latitude1);
        $differenceInLongitude = $degreeToRadius($longitude2 - $longitude1);

        $haversineFormulaPartialResult =
            sin($differenceInLatitude / 2) * sin($differenceInLatitude / 2) +
            cos($degreeToRadius($latitude1)) *
            cos($degreeToRadius($latitude2)) *
            sin($differenceInLongitude / 2) *
            sin($differenceInLongitude / 2);

        $sphericalLawOfCosinesResult =
            2 *
            atan2(
                sqrt($haversineFormulaPartialResult),
                sqrt(1 - $haversineFormulaPartialResult)
            );

        $distanceInKilometers =
            $earthRadiusInKilometers * $sphericalLawOfCosinesResult;

        return $distanceInKilometers;
    }
}
