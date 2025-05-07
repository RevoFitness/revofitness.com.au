<?php

namespace Revo\PerfectGym;

class PaymentId
{
    /**
     * Generates a payment ID.
     * @param array $data The form data
     */
    public static function generate($data)
    {
        $perfectGym = new PerfectGymClient();
        $gym = $data['gymName'];
        $state = $data['state'];
        $frequency = $data['paymentFrequency'];

        if ($frequency === 'special_circumstances') {
            $frequency = 'monthly';

            // Must be part of the 25 in 2025 promotion
            if (!is_null($data['endDate'])) {
                $state = 'WA';
            }
        }

        if ($data['membershipType'] === 'specialCircumstances') {
            $membershipType = 'specialCircumstances';
        } elseif ($data['membershipType'] === 'level-3') {
            $membershipType = 'levelThree';
        } elseif ($data['membershipType'] === 'level-2') {
            $membershipType = 'levelTwo';
        } else {
            $membershipType = 'levelOne';
        }

        // For a specific discount code
        if ($data['discountCode'] === $_ENV['DISCOUNT_CODE']) {
            $membershipType = 'levelTwo';
        }

        $response = $perfectGym->getApiRequest(get_stylesheet_directory_uri() . '/json/payment-ids.json', null, 16);
        $paymentTypes = json_decode($response);

        if ($gym === 'HIITFIT ON DEMAND') {
            return $paymentTypes->HIITFIT;
        }

        if ($gym === 'Glenelg') {
            if ($frequency === 'fiveWeek') {
                return $paymentTypes->$membershipType->fiveWeek->glenelg;
            }

            if ($membershipType !== 'levelThree') {
                return $paymentTypes->$membershipType->glenelg;
            }
        }

        return self::generatePaymentIds($paymentTypes, $membershipType, $frequency, $state);
    }

    /**
     * Generates a payment ID for membership type one.
     *
     * @param object $data Payment ID's
     * @param string $membershipType The level of membership.
     * @param string $frequency The payment frequency. Monthly or fortnightly
     * @param string $state The selected state.
     * @return int|object The generated payment ID(s).
     */
    private static function generatePaymentIds($data, $membershipType, $frequency, $state)
    {
        $state = strtolower($state);
        return $data->$membershipType->$frequency->$state;
    }
}
