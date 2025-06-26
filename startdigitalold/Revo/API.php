<?php

namespace Revo;

use DateTime;
use DateTimeZone;
use GuzzleHttp\Client;
use Revo\PerfectGym\PerfectGymClient;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;

class API extends PerfectGymClient
{
    /**
     * Generic GET query for one-off request
     */
    public function get($url)
    {
        $query = json_decode($this->getApiRequest($this->baseURL . '/v2.1/odata/' . $url));
        return $query;
    }

    /**
     * Get a payment plan
     */
    public function getPaymentPlan($id)
    {
        $plan = $this->fetch("$this->baseURL/v2.1/odata/PaymentPlans/$id", "payment_plan_$id");
        return $plan;
    }

    /**
     * Get all clubs
     */
    public function getClubs()
    {
        $clubs = $this->fetch("$this->baseURL/v2.1/odata/Clubs?\$expand=availablePaymentPlans");
        return $clubs->value;
    }

    /**
     * Get the club by its name
     */
    public function getClubWhereName($name)
    {
        $name = strtoupper(preg_replace('/[\'’`´]+/', '', $name));

        if ($name == 'OCONNOR') {
            $query = "$this->baseURL/v2.1/odata/Clubs/9";
            $club = $this->fetch($query, "club_$name");
            return $club;
        }

        $query = "$this->baseURL/v2.1/odata/Clubs?\$filter=name eq '" . $name . "'";
        $club = $this->fetch($query, "club_$name");

        return $club->value[0]; // First one only
    }

    /**
     * Get discount by name and validate club eligibility
     *
     * @param string $code The discount code
     * @param int $clubId The club ID to check eligibility for
     * @return object|null Returns the discount object if valid, null otherwise
     */
    public function getDiscountByCode($code, $clubId)
    {
        $discount = $this->fetch("$this->baseURL/v2.1/odata/ContractDiscountDefinitions?\$filter=name eq '$code'&\$expand=clubs,validityPeriods");

        if (empty($discount->value) || !$discount->value[0]->isActive) {
            return null;
        }

        $discountData = $discount->value[0];

        // Check if the discount is valid for the current date
        $now = new DateTime('now', new DateTimeZone('Australia/Perth'));
        $isValid = false;

        foreach ($discountData->validityPeriods as $period) {
            $availableFrom = new DateTime($period->availableFrom);
            $availableUntil = new DateTime($period->availableUntil);

            if ($now >= $availableFrom && $now <= $availableUntil) {
                $isValid = true;
                break;
            }
        }

        if (!$isValid) {
            return null;
        }

        if ($discountData->isAvailableInAllClubs) {
            return $discountData;
        }

        // If not available in all clubs, check if club is in allowed clubs list
        $clubAllowed = false;
        foreach ($discountData->clubs as $club) {
            if ($club->id === $clubId) {
                $clubAllowed = true;
                break;
            }
        }

        if (!$clubAllowed) {
            return null;
        }

        return $discountData;
    }

    /**
     * Get a single region by its ID
     */
    public function getRegionById($id)
    {
        $region = $this->fetch("$this->baseURL/v2.1/odata/ClubRegions/$id", "region_$id");
        return $region;
    }

    /**
     * Validate a discount
     */
    public function validateDiscount($code)
    {
        $voucher = $this->fetch("$this->baseURL/v2.1/odata/ContractDiscountDefinitions?\$filter=name eq '$code'");

        if (!isset($voucher->value)) {
            return null;
        }

        return $voucher->value[0];
    }

    /**
     * How many members have entered each club in the last hour without leaving
     */
    public function getMemberVisits()
    {
        $secondsInOneHour = 3600;
        $minimumStartDate = gmdate("Y-m-d\TH:i:s\Z", time() - $secondsInOneHour);
        $apiUrl = "$this->baseURL/v2.1/odata/MemberClubVisits?\$apply=" . urlencode('filter(leaveDate eq null and enterDate gt ' . $minimumStartDate . ")/groupby((club/name), aggregate(\$count as count))");

        $client = new Client(['timeout' => 10]);
        $headers = [
            'X-Client-Id' => $this->key->id,
            'X-Client-Secret' =>  $this->key->secret,
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
        ];

        $attempt = 0;
        $visits = null;
        while ($attempt <= 5) {
            try {
                $response = $client->request('GET', $apiUrl, [
                    'headers' => $headers,
                ]);

                if ($response->getStatusCode() == 200) {
                    $visits = $response->getBody();
                    break;
                }

                $attempt++;
                sleep(1);
            } catch (RequestException $e) {
                if ($e->getResponse() !== null) {
                    write_log(['GET request', json_decode($e->getResponse()->getBody())->errors]);
                }
                if ($attempt >= 5 - 1) {
                    return $e;
                }
                $attempt++;
            } catch (ConnectException $e) {
                write_log("Unable to connect to the endpoint: $apiUrl");
                return false;
            }
        }

        if (!$visits) {
            return false;
        }

        $visits = json_decode($visits);

        $formattedVisits = array();
        foreach ($visits->value as $visit) {
            $formattedVisits[] = array(
                'gym' => $visit->club->name,
                'count' => $visit->count
            );
        }

        return $formattedVisits;
    }
}
