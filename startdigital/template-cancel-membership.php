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
    margin-right:15px;
    position:relative;
    top:5px;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

<section class="container mt-20 mb-10 relative w-full bt-10 pb-10 max-md:mt-20 py-8 px-6 block-content items-center mx-auto rounded-3xl bg-brandEucalyptus max-w-[1080px]">
    <div class="row pt-10 pb-10">
        <div class="col-md-12">
            <h5 class="mb-2">Confirm your email to cancel your membership.</h5>

            <?php if ($error): ?>
                <p style="color:red;"><?= esc_html($error) ?></p>
            <?php endif; ?>

            <?php if ($memberData): ?>
                <p><strong>Name:</strong> <?= esc_html($memberData['firstName']) ?> <?= esc_html($memberData['lastName']) ?></p>
                <p><strong>Member ID:</strong> <?= esc_html($memberData['id']) ?></p>
                <form method="post" action="">
                    <input type="hidden" name="confirm_cancel" value="1">
                    <input type="hidden" name="member_id" value="<?= esc_attr($memberData['id']) ?>">
                    <input type="hidden" name="email" value="<?= esc_attr($email) ?>">
                    <button class="button gform_button mt-5" type="submit">
                        <span>Confirm Cancellation of Membership</span>
                    </button>
                </form>
            <?php else: ?>
                <form id="membership-cancel-form">
                    <input name="email" type="email" required class="large" placeholder="example@email.com.au">
                    <button type="submit" class="button gform_button mt-5"><span>Cancel Membership</span></button>
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
</script>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#membership-cancel-form');
    const result = document.querySelector('#member-result');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
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
                <p><strong>Name:</strong> ${m.firstName} ${m.lastName}</p>
                <p><strong>Member ID:</strong> ${m.id}</p>
                <form id="confirm-cancel-form">
                    <input type="hidden" name="contract_id" value="${m.contractId}">
                    <input type="hidden" name="member_id" value="${m.id}">
                    <input type="hidden" name="email" value="${email}">
                    <button class="button gform_button mt-5" type="submit">
                        <span>Confirm Cancellation of Membership</span>
                    </button>
                </form>`;
        } else {
            result.innerHTML = `<p style="color:red;">${data.data.message}</p>`;
        }
    });

    // AJAX submission for membership cancellation
    document.addEventListener('submit', async function (e) {
        if (e.target && e.target.id === 'confirm-cancel-form') {
            e.preventDefault();

            const form = e.target;
            const contractId = form.querySelector('input[name="contract_id"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const memberId = form.querySelector('input[name="member_id"]').value;

            form.innerHTML = `
                <span class="loader"></span> 
                <span class="ml-2 mt-10">Cancelling Membership... please don't leave the page..</span>
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
                    member_id: memberId
                })
            });

            const data = await res.json();

            if (data.success) {
                form.innerHTML = `
                    <p class="text-black bg-brandPink mt-5 text-base rounded-full duration-100 ease-in-out font-extrabold py-4 px-6 flex items-center gap-2">
                        <strong>Membership successfully cancelled.</strong>
                    </p>`;
                form.setAttribute('disabled', 'true'); // optional, prevents JS form events
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
