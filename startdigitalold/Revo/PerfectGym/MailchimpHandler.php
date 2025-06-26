<?php

namespace Revo\PerfectGym;

use Revo\PerfectGym\PerfectGymClient;
use MailchimpMarketing\ApiClient;

class MailchimpHandler extends PerfectGymClient
{
    /**
     * Adds a member to the Mailchimp list.
     *
     * @param array $formData The form data containing member information.
     */
    public function addMemberToList($formData)
    {
        // Mailchimp list id - audiences > contacts > settings
        $listId = '8630b9ba02';
        $mailchimp = new ApiClient();
        $mailchimp->setConfig(array(
            'apiKey' => $_ENV['MAILCHIMP_API_KEY'],
            'server' => 'us8'
        ));

        try {
            $mailchimp->lists->addListMember($listId, array(
                "email_address" => $formData['email'],
                "status" => "subscribed",
                "merge_fields" => array(
                    "FNAME" => $formData['firstName'],
                    "LNAME" => $formData['lastName']
                )
            ));
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            write_log('Mailchimp error: ' . $e->getMessage());
        }
    }
}
