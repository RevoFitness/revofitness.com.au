<?php

namespace Revo\PerfectGym;

use Revo\Core\ValidationException;
use Revo\PerfectGym\PerfectGymClient;
use GuzzleHttp\Exception\RequestException;

class EzyPayClient extends PerfectGymClient
{
    protected $errors = [];

    public static function customer($data, $userId)
    {
        $ezypay = new EzyPayClient;
        $customer = $ezypay->registerCustomer($data, $userId);

        return $ezypay->failed() ? $ezypay->throw() : $customer;
    }

    public static function assignPayment($data, $customerId)
    {
        $ezypay = new EzyPayClient;
        $ezypay->setPrimaryPaymentMethod($data, $customerId);

        return $ezypay->failed() ? $ezypay->throw() : $ezypay;
    }

    public function throw()
    {
        ValidationException::throw($this->errors());
    }

    public function errors()
    {
        return $this->errors;
    }

    public function failed()
    {
        return count($this->errors);
    }

    public static function createBankToken($formData)
    {
        $self = new self();
        $apiUrl = $_ENV['ENV'] == 'production' ? 'https://vault.ezypay.com/v2/vault/paymentmethodtokens/bank' : 'https://vault-sandbox.ezypay.com/v2/vault/paymentmethodtokens/bank';
        $formData['BSB'] = str_replace([' ', '-'], '', $formData['BSB']);
        $branchNumber = substr($formData['BSB'], 0, 4);
        $suffixNumber = substr($formData['BSB'], -2);

        $headers = array(
            'Authorization' => 'Bearer ' . $self->authToken($formData['gymSelect']),
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
            'merchant' => $self->getMerchantId($formData['gymSelect']),
        );
        $data = array(
            'accountHolderName' => $formData['bankAccountHolder'],
            'accountNumber' => str_replace([' ', '-'], '', $formData['bankAccountNumber']),
            'bankNumber' => strlen((string) $formData['BSB']) == 5 ? (string) ("0" . $formData['BSB']) : (string) $formData['BSB'],
            'branchNumber' => $branchNumber,
            'suffixNumber' => $suffixNumber,
            'termAndConditionAgreed' => true,
            'countryCode' => 'AU',
        );

        // Log all data except account number
        write_log(['accountHolderName' => $formData['bankAccountHolder'], 'bankNumber' => $formData['BSB'], 'branchNumber' => $branchNumber, 'suffixNumber' => $suffixNumber]);
	write_log("Creating bank token with countryCode: " . $data['countryCode']);
	write_log("API Request Data for Bank Token: " . print_r($data, true));
        try {
            $response = json_decode($self->postApiRequest($apiUrl, $data, $headers, 16));
	    write_log("No response bank:", $response);
            if (!$response) {
                write_log('No response from EzyPay creating bank token.');
                $self->errors['paymentMethod'] = "We've encountered an error with your payment method, please try again. paymentMethod - createBankToken";
                $self->throw();
            }

            return $response->paymentMethodToken;
        } catch (RequestException $e) {
            write_log("Failed to create bank token: {$e->getMessage()}");
        }
    }

    public function registerCustomer($formData, $userId)
    {
        $apiUrl = $_ENV['ENV'] == 'production' ? 'https://api-global.ezypay.com/v2/billing/customers' : 'https://api-sandbox.ezypay.com/v2/billing/customers';

        $headers = array(
            'Authorization' => 'Bearer ' . $this->authToken($formData['gymName']),
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
            'merchant' => $this->getMerchantId($formData['gymName']),
        );
        $data = array(
            'firstName' => $formData['firstName'],
            'lastName' => $formData['lastName'],
            'email' => $formData['email'],
            'mobilePhone' => $formData['phoneNumber'],
            'address' => array(
                'address1' => $formData['address'],
                'address2' => null,
                'postalCode' => null,
                'state' => null,
                'countryCode' => 'AU',
                'city' => null
            ),
            'referenceCode' => "-$userId"
        );
	write_log("Registering customer with countryCode: " . $data['address']['countryCode']);
	write_log("API Request Data for Customer: " . print_r($data, true));
        $attempt = 0;
        while ($attempt < 16) {
            try {
                $customer = $this->getCustomer($userId, $formData['lastName'], $formData['gymName']);

                write_log("Customer get/create attempt: $attempt");

                // Check if customer already exists for this merchant ID
                if (isset($customer) && isset($customer->id)) {
                    write_log(["Customer exists:", $customer, $customer->id, $formData['email']]);
                    return $customer;
                }

                // Otherwise create a new customer
                $response = json_decode($this->postApiRequest($apiUrl, $data, $headers));
                if (isset($response) && isset($response->id)) {
                    write_log(["New customer created:", $response]);
                    return $response;
                }

                $attempt++;
            } catch (RequestException $e) {
                if ($e->getResponse() !== null) {
                    $errors = json_decode($e->getResponse()->getBody())->errors;
                    write_log($errors);
                }
                $attempt++;
            }
        }

        return false;
    }

    public function getCustomer($id, $lastName, $gym)
    {
        $apiUrl = $_ENV['ENV'] == 'production' ? "https://api-global.ezypay.com/v2/billing/customers?referenceCode=$id&lastName=$lastName" : "https://api-sandbox.ezypay.com/v2/billing/customers?referenceCode=$id&lastName=$lastName";

        $headers = array(
            'Authorization' => 'Bearer ' . $this->authToken($gym),
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
            'merchant' => $this->getMerchantId($gym),
        );

        try {
            $response = $this->getApiRequest($apiUrl, $headers, 16);

            if ($customers = json_decode($response)->data) {
                return $customers[0];
            }

            return false;
        } catch (RequestException $e) {
            if ($e->getResponse() !== null) {
                $errors = json_decode($e->getResponse()->getBody())->errors;
                write_log($errors);
            }
        }
    }

    /**
     * Get the merchant Id
     */
    private function getMerchantId($gym)
    {
        $gym = $this->clean($gym);

        return $_ENV['ENV'] == 'production' ? $_ENV["EZYPAY_MERCHANT_ID_$gym"] : $_ENV['SANDBOX_EZYPAY_MERCHANT_ID'];
    }

    /**
     * Sets the primary payment method for a user in the EzyPay billing system.
     *
     * @param array $formData The form data containing payment method information.
     * @param string $customerId The EzyPay customer ID.
     * @return mixed Returns the response from the API if successful, or throws an error if there was an error.
     */
    public function setPrimaryPaymentMethod($formData, $customerId)
    {
        if ($this->getPrimaryPaymentMethod($formData, $customerId) !== null) {
            return;
        }
    
        $apiUrl = $_ENV['ENV'] == 'production'
            ? "https://api-global.ezypay.com/v2/billing/customers/$customerId/paymentmethods"
            : "https://api-sandbox.ezypay.com/v2/billing/customers/$customerId/paymentmethods";
    
        write_log([
            'EZYPAY Auth Token' => $this->authToken($formData['gymName']),
            'EZYPAY Merchant ID' => $this->getMerchantId($formData['gymName']),
        ]);
    
        $headers = array(
            'Authorization' => 'Bearer ' . $this->authToken($formData['gymName']),
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'application/json',
            'merchant' => $this->getMerchantId($formData['gymName']),
        );
    
        $data = array(
            "paymentMethodToken" => $formData['cardToken'],
            "primary" => true
        );
    
        $response = $this->postApiRequest($apiUrl, $data, $headers);
    
        if (!$response) {
            write_log([
                "No response from setPrimaryPaymentMethod",
                "API URL" => $apiUrl,
                "Headers" => $headers,
                "Payload" => $data
            ]);
            $this->errors['paymentMethod'] = "We've encountered an error with your payment method, please try again. setPrimaryMethod";
            $this->throw();
        }
    
        write_log(["Primary Payment Method Set", $response]);
        return json_decode($response);
    }


    public function getPrimaryPaymentMethod($formData, $customerId)
{
    $apiUrl = $_ENV['ENV'] == 'production' 
        ? "https://api-global.ezypay.com/v2/billing/customers/$customerId/paymentmethods" 
        : "https://api-sandbox.ezypay.com/v2/billing/customers/$customerId/paymentmethods";
    
    $headers = array(
        'Authorization' => 'Bearer ' . $this->authToken($formData['gymName']),
        'Cache-Control' => 'no-cache',
        'Content-Type' => 'application/json',
        'merchant' => $this->getMerchantId($formData['gymName']),
    );

    try {
        $response = $this->getApiRequest($apiUrl, $headers, 16);
        $decoded = json_decode($response);
        
        if (!$response || !$decoded || !isset($decoded->data)) {
            write_log('Invalid response from EzyPay getting Primary Payment Method', $response);
            return null;
        }
        
        if (empty($decoded->data)) {
            write_log('No payment methods found for customer', $customerId);
            return null;
        }
        
        $token = $decoded->data[0]->paymentMethodToken ?? null;
        write_log("Primary Payment Method retrieved:", $token);
        
        return $token;
    } catch (RequestException $e) {
        write_log('Error getting primary payment method:', $e->getMessage());
        $this->errors['paymentMethod'] = "Error retrieving payment method";
        return null;
    }
   }

    protected function clean($string)
    {
        // Replace spaces with underscores
        $string = str_replace(' ', '_', $string);

        // Remove apostrophes and other non-alphanumeric characters except underscores
        $string = preg_replace('/[\'’`´]+/', '', $string); // Added pattern to remove apostrophes and variations

        // Remove any remaining non-alphanumeric characters except underscores
        $string = preg_replace('/[^A-Za-z0-9\_]/', '', $string);

        // Convert to uppercase
        return strtoupper($string);
    }

    public function authToken($gym)
    {

        $gym = $gym ?: $_GET['gym'];
        $gym = $this->clean($gym);

        if ($_ENV['ENV'] != 'production') {
            $gym = 'SANDBOX';
        }

        $authToken = get_transient("ezypayAuthToken_$gym");
        $credentials = array(
            'API_URL' => $_ENV['ENV'] == 'production' ? 'https://identity.ezypay.com/token' : 'https://identity-sandbox.ezypay.com/token',
            'CLIENT_ID' => $_ENV['ENV'] == 'production' ? $_ENV["EZYPAY_CLIENT_ID"] : $_ENV['SANDBOX_EZYPAY_CLIENT_ID'],
            'CLIENT_SECRET' => $_ENV['ENV'] == 'production' ? $_ENV["EZYPAY_CLIENT_SECRET"] : $_ENV['SANDBOX_EZYPAY_CLIENT_SECRET'],
            'MERCHANT_ID' => $_ENV['ENV'] == 'production' ? $_ENV["EZYPAY_MERCHANT_ID_$gym"] : $_ENV['SANDBOX_EZYPAY_MERCHANT_ID'],
            'USERNAME' => $_ENV['ENV'] == 'production' ? $_ENV["EZYPAY_USERNAME_$gym"] : $_ENV['SANDBOX_EZYPAY_USERNAME'],
            'PASSWORD' => $_ENV['ENV'] == 'production' ? $_ENV["EZYPAY_PASSWORD_$gym"] : $_ENV['SANDBOX_EZYPAY_PASSWORD'],
        );

        if ($authToken === false) {
            $data = "grant_type=password&client_id={$credentials['CLIENT_ID']}&client_secret={$credentials['CLIENT_SECRET']}&username={$credentials['USERNAME']}&password={$credentials['PASSWORD']}&scope=integrator%20hosted_payment";
            $headers = [
                'Content-Type' => 'application/x-www-form-urlencoded',
                'merchant' => $this->getMerchantId($gym),
            ];

            $perfectGymClient = new PerfectGymClient;
            $response = $perfectGymClient->postApiRequest($credentials['API_URL'], $data, $headers);

            set_transient("ezypayAuthToken_$gym", json_decode($response, true)['access_token'], 1800);

            $authToken = get_transient("ezypayAuthToken_$gym");
        }

        return $authToken;
    }
}
