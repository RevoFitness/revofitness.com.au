<?php

namespace Revo\PerfectGym;

class RedirectionHandler
{
    /**
     * Redirects to the congratulations page with the specified state.
     *
     * @param string $state The state for the congratulations page.
     */
    public function toCongratulationsPage($data)
    {
        if ($data['gymName'] === 'HIITFIT ON DEMAND') {
            $this->hiitfitLogin($data);
        }

        session_start();

        $_SESSION['data'] = $data;

        http_response_code(200);
        header("Location: /congratulations?location=" . htmlspecialchars($data['state']));
        exit;
    }

    /**
     * Redirects to the thanks page
     *
     */
    public function toThanksPage()
    {
        http_response_code(200);
        header("Location: /thanks");
        exit;
    }

    /**
     * Redirects to the bring a friend thank you page
     *
     */
    public function toBringAFriendPage()
    {
        http_response_code(200);
        header("Location: /bring-a-friend-thanks");
        exit;
    }

    /**
     * Create a user and go to the login page
     */
    public function hiitfitLogin($data)
    {
        hiitfit_create_user($data);

        http_response_code(200);
        header("Location: /hiitfit-on-demand");
        exit;
    }

    /**
     * Redirects to the robot landing page.
     */
    public function toRobotLandingPage()
    {
        http_response_code(400);
        header("Location: /robot-landing-page");
        exit;
    }
}
