<?php

namespace Revo\PerfectGym;

use Error;

class ContractHandler extends PerfectGymClient
{
    /**
     * Retrieves the contract ID for a given user ID.
     *
     * @param int $userId The ID of the user.
     * @return int|WP_Error Returns the contract ID if successful, or WP_Error object if there was an error.
     */
    public function getContractId($userId)
    {
        $apiUrl = "$this->baseURL/Contracts/Contracts?userId=$userId";
        $response = $this->getApiRequest($apiUrl, null, 16);

        if (!$response) {
            return new \WP_Error('get_contract_error', "No response for getting contract");
        }

        $contract = json_decode($response);

        if (!$contract) {
            return new \WP_Error('get_contract_error', "Could not get contract");
        }

        return $contract->elements[0]->id;
    }

    public function addContracts($formData, $paymentIdTwo, $userId, $contractId)
    {
        if (isset($formData['discountId'])) {
            $this->addSecondaryContractWithDiscount($formData, $paymentIdTwo, $userId, $contractId);
            return;
        }

        $this->addSecondaryContract($formData, $paymentIdTwo, $userId, $contractId);
    }

    /**
     * Adds a secondary contract for a user.
     *
     * @param mixed $data The contract data.
     * @param mixed $paymentId The payment ID.
     * @param int $userId The ID of the user.
     * @return int|Error Returns the contract ID if successful, or throws an Error if there was an error.
     */
    public function addSecondaryContract($data, $paymentId, $userId, $contractId)
    {
        $apiUrl = "$this->baseURL/v2.1/Contracts/AddContract";

        $data = array(
            "memberId" => $userId,
            "clubId" =>  $data['gymId'],
            "contractData" => array(
                "paymentPlanId" =>  $paymentId,
                "signUpDate" =>  $data['signUpDate'],
                "startDate" =>  $data['startDate'],
                "synchronizeWithContractId" => $contractId
            )
        );

        $response = $this->postApiRequest($apiUrl, $data, null, 16);

        if (!$response) {
            write_log(['Unable to add contract', $data]);
            return;
        }

        $contract = json_decode($response);

        if (!$contract || !$contract->contractId) {
            write_log('Contract ID not found');
            return;
        }

        return $contract->contractId;
    }

    /**
     * Adds a secondary contract with a discount for a user.
     *
     * @param mixed $data The contract data.
     * @param mixed $paymentId The payment ID.
     * @param int $userId The ID of the user.
     * @throws Error Throws an Error if there was an error while adding the contract.
     */
    public function addSecondaryContractWithDiscount($data, $paymentId, $userId, $contractId)
    {
        $apiUrl = "$this->baseURL/v2.1/Contracts/AddContract";

        $data = array(
            "memberId" => $userId,
            "clubId" => $data['gymId'],
            "contractData" => array(
                "paymentPlanId" => $paymentId,
                "signUpDate" => $data['signUpDate'],
                "startDate" => $data['startDate'],
                "synchronizeWithContractId" => $contractId,
                "contractDiscountsData" => array(
                    array(
                        "contractDiscountDefinitionId" => $data['discountId']
                    )
                )
            )
        );

        $response = $this->postApiRequest($apiUrl, $data, null, 16);

        // Check response.
        if (!$response) {
            write_log(['Unable to add contract', $data]);
        }
    }

    /**
     * Retrieves the contract ID for a given user ID.
     *
     * @param int $userId The ID of the user.
     * @return int|Error Returns the contract ID if successful, or throws an Error if there was an error.
     */
    public function getByUserId($userId)
    {
        $apiUrl = "$this->baseURL/Contracts/Contracts?userId=$userId";
        $response = $this->getApiRequest($apiUrl, null, 16);

        if (!$response) {
            throw new Error("No response for getting contract");
        }

        $json = json_decode($response);

        if (!$json) {
            throw new Error("Could not get contract");
        }

        return $json->elements[0]->id;
    }

    /**
     * Adds a signature to a contract.
     *
     * @param string $signature Base64 encoded string of the signature
     * @param int $contractId The ID of the contract.
     *
     * @return string|Error Returns the file download URL if successful, or throws an Error if there was an error.
     */
    public function addSignature($signature, $contractId)
    {
        $apiUrl = "$this->baseURL/v2.1/Contracts/SignContractDocument";

        $data = array(
            "contractId" => $contractId,
            "signature" => $this->convertToBase64($signature)
        );

        // No signature - 'Digitally Signed'
        if (!$signature) {
            $data['signature'] = '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';
        }

        $response = $this->postApiRequest($apiUrl, $data);

        if (!$response) {
            write_log("No response for adding signature");
        }

        $contract = json_decode($response);

        if (!$contract) {
            throw new Error("Could not decode signature response");
        }

        if (!$contract->fileDownloadUrl) {
            write_log('Signature error');
            throw new Error('Signature error');
        }

        return $contract->fileDownloadUrl;
    }

    protected function convertToBase64($dataURI)
    {
        $commaPosition = strpos($dataURI, ',');
        if ($commaPosition === false) {
            return null;
        }

        $base64String = substr($dataURI, $commaPosition + 1);

        if (!base64_decode($base64String, true)) {
            return null;
        }

        return $base64String;
    }

    /**
     * Adds user agreements for a given user ID.
     *
     * @param int $userId The ID of the user.
     * @return mixed|Error Returns the response from the API if successful, or throws an Error if there was an error.
     */
    public function addUserAgreements($data, $userId)
    {
        $apiUrl = "$this->baseURL/v2/MemberAgreements/set";
        $data = array(
            "memberId" => $userId,
            "agreementIds" => [1, 2, 4, 6, 7, 8, 9]
        );

        $this->postApiRequest($apiUrl, $data);
    }
}
