<html>

<head>
   <title>REVO Registration</title>
</head>

<body style='background-color:#fff'>
   <table height='800' width='650' style='height:500px;border-collapse:collapse;width:650px;margin:auto;font-family:sans-serif,arial; border-radius: 0px;'>
      <tr style='background:#fff;color:#333;' align='center'>
         <td colspan='2' style='padding-top:25px;font-size:24px;font-weight:bold;'><img src='https://revofitness.com.au/wp-content/uploads/2024/01/revo-email-header.png' width='650' height='159' /></td>
      </tr>
      <tr align='center' style='background-color:#fff;color:#333'>
         <td colspan='2' style='background-color:#fff;color:#333;padding:0px 15px 50px 15px;'><br><br>
            <!-- Section -->
           <?= $content ?>


            <!-- End section -->

            <br /><br />
            <!-- Section -->
            <a style="text-decoration: none;" href="https://apps.apple.com/au/app/revo-fitness/id6444496835">
               <img width='100' src='https://revofitness.com.au/wp-content/uploads/2024/01/app-store.png' alt='Get it on the App Store'>
            </a>
            <a style="text-decoration: none;" href="https://play.google.com/store/apps/details?id=com.netpulse.mobile.revofitness&hl=en_US">
               <img width='100' src='https://revofitness.com.au/wp-content/uploads/2024/01/google-play.png' alt='Get it on the Google Play Store'>
            </a>
            <!-- End section -->

            <!-- WIN A JIMNY Image for certain emails. Remove 31st March -->
            <?php if ($data['displayJimnyImage']): ?>
               <br /><br />
               <img style="width: 100%" src='https://revofitness.com.au/wp-content/uploads/2025/01/win-a-jimny-email.png' alt='WIN A JIMNY!' />
            <?php endif; ?>
            <!-- END WIN A JIMNY Image -->

            <!-- Section -->
            <br /><br />Login using the same email as your Revo Membership. For first time login, you need to reset your password.
            <!-- End section -->
            <!-- Section -->
            <br /><br />To reset your password, click "Login" then "Forgot password?". Enter your email address and click "Reset Password" and check your email and click the link to set your password. Set your password and then login with the password you set.
            <!-- End section -->
            <!-- Section -->
            <?php if ($data['paymentFrequency'] !== 'fiveWeek') : ?>
               <br /><br />Don't forget to pop into the gym during staffed hours to get your <strong>Refer A Friend</strong> card. If your friend joins you'll get two weeks free!
            <?php endif; ?>
            <!-- End section -->
         </td>
      </tr>

      <!-- Section -->
      <tr align='center' style='background:#fff;'>
         <td style='padding:50px 15px 20px 15px;background:#f4f3f4;' colspan='2'>
            <span style='font-weight:bold;color:#333;'>Your Agreement Details</span><br><br>
            <span style='font-weight:bold;color:#333;'>Name: </span><span style='color:#333'><?= $data['firstName'] . ' ' . $data['lastName'] ?></span><br>

            <?php if (!$data['isGuest']) : ?>
               <span style=' font-weight:bold;color:#333;'>Home Club: </span><span style='color:#333'><?= $data['gymName'] ?></span><br>
            <?php endif; ?>

            <span style='font-weight:bold;color:#333;'>Email: </span><span style='color:#333'><?= $data['email'] ?></span><br>
            <span style='font-weight:bold;color:#333;'>DOB: </span><span color:#fdfdfd;><?= (new DateTime($data['dateOfBirth']))->format('d/m/Y') ?><br></span>

            <?php if (!$data['isGuest']) : ?>
               <span style='font-weight:bold;color:#333;'>Membership Type: </span><span style='color:#333'><?= $data['membershipType'] ?></span><br>
               <span style='font-weight:bold;color:#333;'>Membership Length: </span><span style='color:#333'><?= $data['paymentFrequency'] === 'fiveWeek' ? '5 Weeks' : 'Ongoing' ?></span><br>
               <span style='font-weight:bold;color:#333;'>Membership Start Date: </span><span style='color:#333'><?= (new DateTime($data['startDate']))->format('d/m/Y') ?></span><br>
               <span style='font-weight:bold;color:#333;'>Membership Price: </span><span style='color:#333'>$<?= $data['cost'] ?> <?= $data['paymentFrequency'] === 'fiveWeek' ? '' : 'per month' ?></span><br><br> <br><br>
            <?php endif; ?>

            <?php if ($data['isGuest']) : ?>
               <span style='font-weight:bold;color:#333;'>Guest Pass Price: </span><span style='color:#333'>$<?= $data['cost'] ?></span><br><br> <br><br>
            <?php endif; ?>
         </td>
      </tr>
      <!-- End section -->

      <tr align='center' style='background-color:#fff;color:#333'>
         <td colspan='2' style='background-color:#fff;color:#333;padding:0px 15px 0px 15px;'><br><br>
            <!-- Section -->
            <span style='font-weight:bold;color:#333;'>Where can you find us?</span><br><br>
            <span style='color:#333'>We have gym locations nationwide, and are continually expanding to more locations. Your Revo Fitness membership gives you access to EVERY location we have open, and any we open in the future! You can check out all of our club locations <a href="https://revofitness.com.au/gyms">here</a>.</span><br /><br />
            <!-- End Section -->

            <!-- Section -->
            <span style='font-weight:bold;color:#333;'>Want to look and feel the part?</span><br><br>
            <span style='color:#333'>As a new member you can access our full range of merchandise at a 20% discount rate by using the code <span style='color:#CB333B'>HELLOREVO at checkout.</span></span><br /><br />
            <a href="https://shop.revofitness.com.au" style="cursor: pointer; display: inline-flex; align-items: center; justify-content: space-between; gap: 4px; padding: 6px 12px; background-color: #cb333b; border: 2px solid #cb333b; color: white; text-decoration: none; font-weight: 600; font-size: large; border-radius: 9999px;">
               Buy Now
            </a>

            <br />
            <br />
            <br />
            <!-- End section -->

            <!-- Section -->
            <?php if ($data['paymentFrequency'] !== 'fiveWeek') : ?>
               <span style='font-weight:bold;color:#333;'>Your membership explained</span><br />
               <br /><span style='color:#333;'>We charge a <?= $data['paymentFrequency'] ?> debit of $<?= $data['cost'] ?> which will begin on the <?= (new DateTime($data['startDate']))->format('d/m/Y') ?>. We will debit your selected account on the same day each month. If your debit falls on a weekend or public holiday your debit will be processed the next working day.</span><br /><br />
               <span style='color:#333;'>You will receive your terms and conditions in a separate email within the next 30 minutes.</span><br /><br />
               <span style='color:#333;'>Thank you for supporting a local Australian business.</span><br /><br />
            <?php endif; ?>
            <!-- End section -->

            <!-- Section -->
            <?php if ($data['paymentFrequency'] !== 'fiveWeek') : ?>
               <span style='font-weight:bold;color:#333;'>Please note</span><br /><br />
               <span style='color:#333;'><?= $data['directDebit'] ?></span><br /><br />
               <span style='color:#333;'>Please note fees apply for Credit Card Payments.</span><br /><br />
               <span style='color:#333;'>No fees for BSB and Account Debits.</span><br /><br />
            <?php endif; ?>
            <!-- End section -->

            <!-- Section -->
            <span style='font-weight:bold;color:#333;'>Have we missed something?</span><br><br>
            <span style='color:#333;'>If you have any queries, don't hesitate to contact us through our website or email us at <a href="mailto:support@revofitness.com.au">support@revofitness.com.au</a> and we'll be happy to help.</span><br /><br />
            <span style='color:#333;'>Check us out on <a href="https://www.facebook.com/RevoFitnessAU/">Facebook</a> and <a href="https://www.instagram.com/revofitness/">Instagram</a> to get to know us and stay in the loop for all things Revo Fitness.</span>
            <br /><br />
            <!-- End section -->

            <!-- Section -->
            <span style='font-weight:bold;color:#333;'>Download the Revo App</span><br /><br /><span style='color:#333'>Access the gym, upgrade your membership, update your payment details, check the live gym counter all in the Revo app now!</span><br /><br />
            <a style="text-decoration: none;" href="https://apps.apple.com/au/app/revo-fitness/id6444496835">
               <img width='100' src='https://revofitness.com.au/wp-content/uploads/2024/01/app-store.png' alt='Get it on the App Store'>
            </a>
            <a style="text-decoration: none;" href="https://play.google.com/store/apps/details?id=com.netpulse.mobile.revofitness&hl=en_US">
               <img width='100' src='https://revofitness.com.au/wp-content/uploads/2024/01/google-play.png' alt='Get it on the Google Play Store'>
            </a>
            <!-- End section -->
         </td>
      </tr>

      <?php if ($data['promotion'] !== 'No Promotion Available' && $data['paymentFrequency'] !== 'fiveWeek') : ?>
         <tr align='center' height='150' bgcolor='#FFF'>
            <td bgcolor='#fff' colspan='2'>
               <br>
               <span style='font-weight:bold;color:#333;'>Applicable Promotion</span><br><br>
               <span style='font-weight:bold;text-transform:uppercase;background:#33CB67;padding:5px;color:#fff;border-radius:20px;padding:8px 15px;'>
                  <?php if (!empty($data['promotionDescription']) && $data['promotionDescription'] > 1) : ?>
                     <?= $data['promotionDescription'] . ' MONTHS FREE!' ?>
                  <?php elseif (!empty($data['promotionDescription']) && $data['promotionDescription'] <= 1) : ?>
                     <?= $data['promotionDescription'] . ' MONTH FREE!' ?>
                  <?php endif; ?>
               </span><br><br>
            </td>
         </tr>
      <?php endif; ?>
      <tr style='background:#FFF;'>
         <td colspan='2' align='center' height='100%'>
            <a href='https://www.facebook.com/RevoFitnessAU/'><img width='13' height='13' src='https://revofitness.com.au/wp-content/uploads/2024/01/facebook.png' alt='facebook' /></a>&nbsp;
            <a href='https://www.instagram.com/revofitness/'><img width='13' height='13' src='https://revofitness.com.au/wp-content/uploads/2024/01/instagram.png' alt='instagram' /></a>&nbsp;
            <a href='https://twitter.com/Revo_Fitness'><img width='13' height='13' src='https://revofitness.com.au/wp-content/uploads/2024/01/twitter.png' alt='twitter' /></a>&nbsp;
            <a href='https://www.tiktok.com/@revofitness?lang=en'><img width='13' height='13' src='https://revofitness.com.au/wp-content/uploads/2024/01/tiktok.png' alt='tiktok' /></a>&nbsp;
            <a href='https://www.linkedin.com/company/revo-fitness/?originalSubdomain=au'><img width='13' height='13' src='https://revofitness.com.au/wp-content/uploads/2024/01/linkediner.png' alt='linkedin' /></a>&nbsp;
            <a href='https://www.youtube.com/channel/UCFuh3S_dGk1iRic89iKRoZQ'><img width='13' height='13' src='https://revofitness.com.au/wp-content/uploads/2024/01/youtube.png' alt='' /></a>
         </td>
      </tr>
   </table>
</body>

</html>
