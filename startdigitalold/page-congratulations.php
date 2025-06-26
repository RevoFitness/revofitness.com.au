<?php

use Timber\Timber;

session_start();

$context = Timber::context();
$context['post'] = Timber::get_post();
$context['fields'] = get_fields();
$context['state'] = $_GET['location'] ?? '';

if (isset($_SESSION['data'])) {
    $data = $_SESSION['data'];
    $membershipType = $data['membershipType'] == 'level-1' ? 'Level One' : 'Level Two';
    $cost = $membershipType == 'Level One' ? '$9.69' : '$12.69';
    $signupType = $data['isPresale'] ? 'Presale' : 'Standard Signup';

    $context['data'] = $data;

    $context['datalayer'] = <<<EOT
        <script type="text/javascript">
        window.dataLayer.push({
            'event': 'purchase',
            'gym_name': '{$data["gymName"]}',
            'location': '{$data["gymName"]}',
            'state': '{$data["state"]}',
            'membership_tier': '$membershipType',
            'membership_cost': '{$cost}',
            'promo_code': '{$data["discountCode"]}',
            'signup_type': '$signupType'
            });
        </script>
     EOT;

    add_action('wp_head', function () use ($context) {
        echo $context['datalayer'];
    });
}

Timber::render('page-congratulations.twig', $context);
