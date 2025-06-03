<?php

/**
 * Template Name: Membership Cancellation
 */
get_header();
defined('ABSPATH') || exit;

$memberData = null;
$error = null;
$email = '';

?>

<style>
    .loader {
        width: 24px;
        height: 24px;
        border: 5px solid;
        border-color: #FF3D00 transparent;
        border-radius: 50%;
        margin-right: 15px;
        position: relative;
        top: 5px;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>

<section class="container mt-20 mb-10 relative w-full bt-10 pb-10 max-md:mt-20 py-8 px-6 block-content items-center mx-auto rounded-3xl bg-brandEucalyptus max-w-[1080px]">
    <div class="row pt-10 pb-10">
        <div class="col-md-12">
            <h4 class="mb-5">We’re sad to see you go!</h4>
            <h5 class="mb-10">You know you can freeze your membership at no cost to you? Just ask our team member how!</h5?
            <p>You may only cancel your Membership in accordance with clause 3.10(a) of your Membership Agreement.</p>

            <p>Use this form to:</p><br/>   
            <ul class="list-none">
                <li style="list-style:none"><strong>(a)</strong> cancel your Membership by 30 days’ written notice;</li>
                <li style="list-style:none"><strong>(b)</strong> request an immediate cancellation of your Membership where you have a medical certificate stating that<br />
                    you cannot use your Revo Fitness Membership because of a permanent illness or physical incapacity; or</li>
                <li style="list-style:none"><strong>(c)</strong> cancel your Membership immediately within the Cooling-Off Period (WA Members only).</li>
            </ul>

            <p class="mt-10">If you are cancelling your Membership in the circumstances listed in (a) above, your Membership will remain active and you will be entitled to full use of the Revo Fitness Facilities until your Membership Agreement is cancelled, being:</p><br/>

            <ul class="list-none" style="list-style:none">
                <li style="list-style:none"><strong>(a)</strong> if you are not a SA Member, 30 days after the Cancellation Notice Date; and</li>
                <li style="list-style:none"><strong>(b)</strong> if you are a SA Member:</li><br/>
                <ul>
                    <li style="list-style:none"><strong>(i)</strong> where you do not have a Direct Debit Date fall within 14 days after the Cancellation Notice Date, 11:59pm on the<br />
                        day immediately before your next Direct Debit Date; or</li>
                    <li style="list-style:none"><strong>(ii)</strong> where you do have a Direct Debit Date fall within 14 days after the Notice Date, 11:59pm on the day that is 14 days after the Cancellation Notice Date.</li>
                </ul>
            </ul>
            <p class="mt-10">If you are cancelling your Membership in the circumstances listed in (b) or (c) above (and in the case of (b), Revo Fitness grants your request), your Membership will end immediately, and you will no longer be entitled to use the Revo Fitness Facilities.</p>

            <p>To the extent of any inconsistency between the terms of your Membership Agreement and the contents of this form, the terms of your Membership Agreement prevail.</p>
            <br/>   

            
            <h5 class="mb-2 mt-5">Confirm your email to request cancellation of membership</h5>

            <?php if ($error): ?>
                <p style="color:red;"><?= esc_html($error) ?></p>
            <?php endif; ?>

            <?php if ($memberData): ?>
                <?php
                $photoUrl = $memberData['photoUrl'] ?? '';
                $clubName = $memberData['clubName'] ?? 'Unknown';
                ?>
                <?php if ($photoUrl): ?>
                    <img src="<?= esc_url($photoUrl) ?>" alt="Member Photo" style="max-width: 150px; border-radius: 8px; margin-bottom: 20px;">
                <?php endif; ?>
                <p><strong>Name:</strong> <?= esc_html($memberData['firstName']) ?> <?= esc_html($memberData['lastName']) ?></p>
                <p><strong>Member ID:</strong> <?= esc_html($memberData['id']) ?></p>
                <p><strong>Home Club:</strong> <?= esc_html($clubName) ?></p>

                <form method="post" action="">
                    <input type="hidden" name="confirm_cancel" value="1">
                    <input type="hidden" name="member_id" value="<?= esc_attr($memberData['id']) ?>">
                    <input type="hidden" name="email" value="<?= esc_attr($email) ?>">
                    <button class="button gform_button mt-5" type="submit">
                        <span>Submit request to cancel membership and access to the gym</span>
                    </button>
                </form>
            <?php else: ?>
                <form id="membership-cancel-form">
                    <input name="email" type="email" required class="large" placeholder="example@email.com.au">
                    <button type="submit" class="button gform_button mt-5"><span>Verify Details</span></button>
                </form>
                <div id="member-result" class="mt-5"></div>
            <?php endif; ?>
        </div>
    </div>
</section>


<?php get_footer(); ?>

<!-- 👇 Add ajaxurl BEFORE the script that uses it -->
<script>
    const ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('#membership-cancel-form');
        const result = document.querySelector('#member-result');
  e
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = form.querySelector('input[name="email"]').value;

            result.innerHTML = '<span class="loader"></span> Checking...';

            const res = await fetch(ajaxurl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: new URLSearchParams({
                    action: 'check_member',
                    email: email
                })
            });

            const data = await res.json();

            if (data.success) {
                const m = data.data;

                result.innerHTML = `
                    <div class="bg-white text-black rounded-xl mt-5 p-6 border border-green-500 shadow-md">
                        <h3 class="text-xl font-bold mb-2">Member Details:</h3>
                        <p><strong>Name:</strong> ${m.firstName} ${m.lastName}</p>
                        <p><strong>Member ID:</strong> ${m.id}</p>
                        <p><strong>Home Club:</strong> ${m.clubName || 'Unknown'}</p>
                    </div>
                    <form id="confirm-cancel-form" class="mt-10">
                        <input type="hidden" name="contract_id" value="${m.contractId}">
                        <input type="hidden" name="member_id" value="${m.id}">
                        <input type="hidden" name="email" value="${email}">
                        <input type="hidden" name="club_name" value="${m.clubName}">
                        <button class="button gform_button mt-5" type="submit">
                            <span>Submit request to cancel membership</span>
                        </button>
                    </form>`;
            } else {
                result.innerHTML = `<p style="color:red;">${data.data.message}</p>`;
            }
        });

        document.addEventListener('submit', async function(e) {
            if (e.target && e.target.id === 'confirm-cancel-form') {
                e.preventDefault();

                const form = e.target;
                const contractId = form.querySelector('input[name="contract_id"]').value;
                const email = form.querySelector('input[name="email"]').value;
                const memberId = form.querySelector('input[name="member_id"]').value;
                const clubName = form.querySelector('input[name="club_name"]').value;

                form.innerHTML = `
                    <span class="loader"></span> 
                    <span class="ml-2 mt-10 pd-10">Cancelling Membership... please don't leave the page.</span>
                `;

                const res = await fetch(ajaxurl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: new URLSearchParams({
                        action: 'confirm_cancel_member',
                        contract_id: contractId,
                        email: email,
                        member_id: memberId,
                        club_name: clubName

                    })
                });

                const data = await res.json();

                if (data.success) {
                    form.outerHTML = `
                        <div class="bg-brandPink text-black rounded-xl mt-5 p-6 border border-green-500 shadow-md">
                            <h3 class="text-xl font-bold mb-2">Request Submitted</h3>
                            <p>Our team will be in touch soon to chat about your cancellation request, confirm your final debit and final day of access to the gym..</p>
                        </div>`;
                } else {
                    form.innerHTML = `
                        <p class="text-black bg-brandPink mt-5 text-base rounded-full duration-100 ease-in-out font-extrabold py-4 px-6 flex items-center gap-2">
                            ${data.data.message}
                        </p>`;
                }
            }
        });
    });
</script>