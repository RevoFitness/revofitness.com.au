<?php

namespace Revo\PerfectGym;

class EmailHandler
{
    /**
     * Sends an email confirmation email.
     *
     * @param mixed $data The data for the email.
     */
    public function sendEmailConfirmation($data)
    {
        $data['promotion'] = !empty($data['discountCode']) ? $data['discountCode'] : "No Promotion Available";
        $gymId = get_posts(
            array(
                'post_type'              => 'gyms',
                'title'                  => $data['gymName'],
                'numberposts'            => 1,
                'update_post_term_cache' => false,
                'update_post_meta_cache' => false,
                'orderby'                => 'post_date ID',
                'order'                  => 'ASC',
                'fields'                 => 'ids'
            )
        )[0];
        $data['promotionDescription'] = get_field('presale_months_free', $gymId) ?: "";

        if ($data['membershipType'] === 'level-3') {
            $data['membershipType'] = 'Level Three';
        } elseif ($data['membershipType'] === 'level-2') {
            $data['membershipType'] = 'Level Two';
        } else {
            $data['membershipType'] = 'Level One';
        }

        // This can be removed from 1st April, 2025 onwards. Set to auto-stop on 31st March, 2025.
        $today = (new \DateTime())->format('Y-m-d');
        if ($today <= '2025-03-31') {
            $gym = get_posts(
                array(
                    'post_type'              => 'gyms',
                    'title'                  => $data['gymName'],
                    'numberposts'            => 1,
                    'update_post_term_cache' => false,
                    'update_post_meta_cache' => false,
                    'orderby'                => 'post_date ID',
                    'order'                  => 'ASC',
                    'fields'                 => 'title'
                )
            )[0];
            $presaleAllowList = ['Seaford Meadows', 'Butler', 'Wanneroo', 'Blakeview', 'Rivervale', 'Frankston', 'Knoxfield'];
            $allowedPresale = isInPresale($gym) && in_array($gym->post_title, $presaleAllowList);
        }

        $data = $this->setMembershipLevelAndMessages($data);

        ob_start();
        include dirname(__FILE__) . '/templates/email.php';
        $message = ob_get_contents();
        ob_end_clean();

        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: Revo Fitness <info@revofitness.com.au>'
        );

        wp_mail($data['email'], 'Welcome to Revo Fitness', $message, $headers);
    }

    /**
     * Sends an email confirmation email.
     *
     * @param mixed $data The data for the email.
     */
    public function sendTestEmailConfirmation($data, $to)
    {
        $data['promotion'] = !empty($data['discountCode']) ? $data['discountCode'] : "No Promotion Available";
        $gymId = get_posts(
            array(
                'post_type'              => 'gyms',
                'title'                  => $data['gymName'],
                'numberposts'            => 1,
                'update_post_term_cache' => false,
                'update_post_meta_cache' => false,
                'orderby'                => 'post_date ID',
                'order'                  => 'ASC',
                'fields'                 => 'ids'
            )
        )[0];
        $data['promotionDescription'] = get_field('presale_months_free', $gymId) ?: "";

        if ($data['membershipType'] === 'level-3') {
            $data['membershipType'] = 'Level Three';
        } elseif ($data['membershipType'] === 'level-2') {
            $data['membershipType'] = 'Level Two';
        } else {
            $data['membershipType'] = 'Level One';
        }

        // This can be removed from 1st April, 2025 onwards. Set to auto-stop on 31st March, 2025.
        $today = (new \DateTime())->format('Y-m-d');
        if ($today <= '2025-03-31') {
            $gym = get_posts(
                array(
                    'post_type'              => 'gyms',
                    'title'                  => $data['gymName'],
                    'numberposts'            => 1,
                    'update_post_term_cache' => false,
                    'update_post_meta_cache' => false,
                    'orderby'                => 'post_date ID',
                    'order'                  => 'ASC',
                    'fields'                 => 'title'
                )
            )[0];
            $presaleAllowList = ['Seaford Meadows', 'Butler', 'Wanneroo', 'Blakeview', 'Rivervale', 'Frankston', 'Knoxfield'];
            $allowedPresale = isInPresale($gym) && in_array($gym->post_title, $presaleAllowList);
        }

        $data = $this->setMembershipLevelAndMessages($data);

        ob_start();
        include dirname(__FILE__) . '/templates/email.php';
        $message = ob_get_contents();
        ob_end_clean();

        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: Revo Fitness <info@revofitness.com.au>'
        );

        wp_mail($to, 'Welcome to Revo Fitness', $message, $headers);
    }

    /**
     * Sets the membership level and related messages based on the state.
     *
     * @param mixed $data The data to be processed.
     * @return mixed The modified data.
     */
    private function setMembershipLevelAndMessages($data)
    {
        // Defaults
        $data['welcomeMessage'] = $this->generateWelcomeMessage($data);
        $data['findUs'] = "We have gym locations nationwide, and are continually expanding to more locations. Your Revo Fitness membership gives you access to EVERY location we have open, and any we open in the future! You can check out all of our club locations <a href='https://revofitness.com.au/gyms/'>here.</a>";

        if ($data['membershipType'] == 'Level One') {
            if (isset($data['isPresale'])) {
                return $this->presaleLevelOne($data);
            }

            if (isset($data['isGuest'])) {
                $this->guestLevelOne($data);
            }

            if ($data['paymentFrequency'] === 'fiveWeek') {
                return $this->fiveWeekLevelOne($data);
            }

            return $this->standardLevelOne($data);
        }

        if ($data['membershipType'] == 'Level Two') {
            if (isset($data['isPresale'])) {
                return $this->presaleLevelTwo($data);
            }

            if (isset($data['isGuest'])) {
                $this->guestLevelTwo($data);
            }

            if ($data['paymentFrequency'] === 'fiveWeek') {
                return $this->fiveWeekLevelTwo($data);
            }

            return $this->standardLevelTwo($data);
        }

        // Must be level three
        if (isset($data['isPresale'])) {
            return $this->presaleLevelThree($data);
        }

        return $this->standardLevelThree($data);
    }

    /**
     * Email data for the presale level one template
     */
    private function presaleLevelOne($data)
    {
        $data['directDebit'] = "$42.00 Directly Debited Monthly ($9.69 Per Week).";
        $data['cost'] = 42;

        return $data;
    }

    /**
     * Email data for the guest level one template
     */
    private function guestLevelOne($data)
    {
        $data['welcomeMessage'] = "Thanks {$data['firstName']} for visiting us on a Level One Guest Pass at Revo Fitness.";
        $data['findUs'] = "We have gym locations across Australia, and are continually opening new locations. A Revo Fitness membership gives you access to EVERY location we have open, and any we open in the future! You can check out all of our club locations <a href='https://revofitness.com.au/gyms/'>here.</a>";

        return $data;
    }

    /**
     * Email data for the five week level one template
     */
    private function fiveWeekLevelOne($data)
    {
        $data['welcomeMessage'] = "Thanks {$data['firstName']} for joining us as a Level One 5-week member at Revo Fitness.<br/><br/>Please download The Revo app for immediate access to the gym!";
        $data['directDebit'] = "$60.00 one-off payment.";
        $data['cost'] = 60;

        return $data;
    }

    /**
     * Email data for the standard level one template
     *
     * @param mixed $data The data to be processed.
     * @return mixed The modified data.
     */
    private function standardLevelOne($data)
    {
        $data['directDebit'] = "$42.00 Directly Debited Monthly ($9.69 Per Week).";
        $data['cost'] = 42;

        return $data;
    }

    /**
     * Email data for the presale level two template
     */
    private function presaleLevelTwo($data)
    {
        $data['directDebit'] = "$55.00 Directly Debited Monthly ($12.69 Per Week).";
        $data['cost'] = 55;

        return $data;
    }

    /**
     * Email data for the guest level two template
     */
    private function guestLevelTwo($data)
    {
        $data['welcomeMessage'] = "Thanks {$data['firstName']} for visiting us on a Level Two Guest Pass at Revo Fitness.";
        $data['findUs'] = "We have gym locations across Australia, and are continually opening new locations. A Revo Fitness membership gives you access to EVERY location we have open, and any we open in the future! You can check out all of our club locations <a href='https://revofitness.com.au/gyms/'>here.</a>";

        return $data;
    }

    /**
     * Email data for the five week level two template
     */
    private function fiveWeekLevelTwo($data)
    {
        $data['welcomeMessage'] = "Thanks {$data['firstName']} for joining us as a Level Two 5-week member at Revo Fitness.<br/><br/>Please download The Revo app for immediate access to the gym! As a Level Two member you get exclusive access to The Studio.";
        $data['directDebit'] = "$85.00 one-off payment.";
        $data['cost'] = 85;

        return $data;
    }

    /**
     * Email data for the standard level two template
     */
    private function standardLevelTwo($data)
    {
        $data['directDebit'] = "$55.00 Directly Debited Monthly ($12.69 Per Week).";
        $data['cost'] = 55;

        return $data;
    }

    /**
     * Email data for the presale level three template
     */
    private function presaleLevelThree($data)
    {
        $data['directDebit'] = "$72.32 Directly Debited Monthly ($16.69 Per Week).";
        $data['cost'] = 72.32;

        return $data;
    }

    /**
     * Email data for the standard level three template
     */
    private function standardLevelThree($data)
    {
        $data['directDebit'] = "$72.32 Directly Debited Monthly ($16.69 Per Week).";
        $data['cost'] = 72.32;

        return $data;
    }

    /**
     * Generates the welcome message based on the provided data.
     *
     * @param string $firstName The first name of the user.
     * @param string $membershipType The membership type.
     *
     * @return string The generated welcome message.
     */
    private function generateWelcomeMessage($data)
    {
        $message = "Thanks {$data['firstName']} for joining us as a {$data['membershipType']} member at Revo Fitness.";

        if ($data['membershipType'] === 'Level Two') {
            $message .= " As a Level Two member you get exclusive access to The Studio.";
        }

        if ($data['membershipType'] === 'Level Three') {
            $message .= " As a Level Three member you get exclusive access to The Studio and The Classroom.";
        }

        if ($data['membershipType'] === 'Level One' && !$data['isPresale']) {
            $message .= "<br /><br />You can upgrade to a Level Two membership for only +$3 per week and get access to Massage Chairs in every club and 1000s of On Demand workouts in the Revo App. Level Two members get access to The Studio in select clubs. In The Studio you can enjoy unlimited Body Scans, Reformer Pilates, Massage Chairs and more. You can upgrade your membership in the Revo App.";
        }

        $date = new \DateTime();
        $midnightToday = $date->setTime(0, 0)->format('d-m-Y H:i:s');
        $openDate = strtotime_formatted($data['openDate']);
        $currentDate = strtotime($midnightToday);

        // If gym is presale and IS OPEN.
        if ($data['isPresale'] && ($openDate <= $currentDate)) {
            $message .= "<br/><br/>{$data['gymName']} is now open - Please download The Revo app for immediate access to the gym!";
            // If gym is presale and NOT OPEN.
        } elseif ($data['isPresale']) {
            $message .= "<br/><br/>Please download The Revo app for instant access to the gym once it is open on the {$data['openDate']}";
            // If gym is not presale
        } else {
            $message .= "<br/><br/>Please download The Revo app for immediate access to the gym!";
        }

        if ($data['membershipType'] === 'Level One' && $data['isPresale']) {
            $message .= "<br /><br />You can upgrade to a Level Two membership for only +$3 per week and get access to Massage Chairs in every club and 1000s of On Demand workouts in the Revo App. Level Two members get access to The Studio in select clubs. In The Studio you can enjoy unlimited Body Scans, Reformer Pilates, Massage Chairs and more. You can upgrade your membership in the Revo App.";
        }

        return $message;
    }
}
