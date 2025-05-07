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
            'countryCode' => $formData['countryCode'] ?? 'AU',
        );

        // Log all data except account number
        write_log(['accountHolderName' => $formData['bankAccountHolder'], 'bankNumber' => $formData['BSB'], 'branchNumber' => $branchNumber, 'suffixNumber' => $suffixNumber]);
        write_log("API Request Data for Bank Token: " . print_r($data, true));
        try {
            $response = json_decode($self->postApiRequest($apiUrl, $data, $headers, 16));

            if (!$response) {
                write_log('No response from EzyPay creating bank token.');
                $self->errors['paymentMethod'] = "We've encountered an error with your payment method, please try again.";
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
                'countryCode' => $formData['countryCode'] ?? 'AU',
                'city' => null
            ),
            'referenceCode' => "-$userId"
        );

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
                    write_log('REGISTER CUSTOMER ERROR:', $errors);
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
                write_log('GET CUSTOMER:', $errors);
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
        write_log("Setting primary payment method for customer with countryCode: AU");
        write_log("Payment method token: " . $formData['cardToken']);
        $apiUrl =  $_ENV['ENV'] == 'production' ? "https://api-global.ezypay.com/v2/billing/customers/$customerId/paymentmethods" : "https://api-sandbox.ezypay.com/v2/billing/customers/$customerId/paymentmethods";
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
            $this->errors['paymentMethod'] = "We've encountered an error with your payment method, please try again.";
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
        if (empty($gym)) {
            return new WP_Error('missing_gym', 'Gym parameter is required.');
        }
    
        $apiUrl = $this->baseURL . '/auth';
        $data = ['gym' => $gym];
    
        error_log('API Request URL: ' . $apiUrl);
        error_log('API Request Data: ' . print_r($data, true));
    
        try {
            $response = $this->postApiRequest($apiUrl, $data);
    
            if ($response === false) {
                error_log('API Request Failed.');
                return new WP_Error('api_request_failed', 'Failed to fetch auth token.');
            }
    
            $responseData = json_decode($response, true);
            error_log('API Response: ' . print_r($responseData, true));
    
            if (empty($responseData['authToken'])) {
                return new WP_Error('invalid_response', 'Auth token not found in API response.');
            }
    
            return $responseData['authToken'];
        } catch (Exception $e) {
            error_log('Exception in authToken: ' . $e->getMessage());
            return new WP_Error('exception', 'An unexpected error occurred.');
        }
    }
}
