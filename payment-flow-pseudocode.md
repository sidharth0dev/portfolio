# Payment Processing Flow - Pseudocode

## Input Request
```
{
  "merchant_id": "M123",
  "amount": "1000",
  "currency": "INR",
  "callback_url": "https://merchant.com/callback"
}
```

---

## MAIN PAYMENT PROCESSING FLOW

```
FUNCTION processPayment(request):
    // Step 1: Validate Request
    IF validateRequest(request) IS FALSE THEN
        RETURN error_response("Invalid request parameters")
    END IF
    
    // Step 2: Initialize Transaction
    transaction_id = generateUniqueTransactionId()
    status = "PENDING"
    
    // Step 3: Store Transaction in Database
    SAVE transaction {
        id: transaction_id,
        merchant_id: request.merchant_id,
        amount: request.amount,
        currency: request.currency,
        status: status,
        callback_url: request.callback_url,
        created_at: current_timestamp
    }
    
    // Step 4: Process Payment with Gateway
    payment_result = processWithPaymentGateway(transaction_id, request)
    
    // Step 5: Handle Result
    IF payment_result.status EQUALS "SUCCESS" THEN
        handleSuccess(transaction_id, payment_result)
    ELSE IF payment_result.status EQUALS "FAILED" THEN
        handleFailure(transaction_id, payment_result)
    ELSE
        handlePending(transaction_id, payment_result)
    END IF
    
    // Step 6: Return Response to Merchant
    RETURN {
        transaction_id: transaction_id,
        status: status,
        redirect_url: getPaymentPageUrl(transaction_id)
    }
END FUNCTION
```

---

## SUCCESS FLOW

```
FUNCTION handleSuccess(transaction_id, payment_result):
    // Step 1: Update Transaction Status
    UPDATE transaction SET
        status = "SUCCESS",
        payment_reference = payment_result.reference_id,
        completed_at = current_timestamp,
        gateway_response = payment_result.response
    WHERE id = transaction_id
    
    // Step 2: Update Merchant Account Balance (if applicable)
    UPDATE merchant_account SET
        balance = balance + transaction.amount
    WHERE merchant_id = transaction.merchant_id
    
    // Step 3: Create Success Record
    CREATE success_record {
        transaction_id: transaction_id,
        status: "COMPLETED",
        amount_credited: transaction.amount,
        timestamp: current_timestamp
    }
    
    // Step 4: Prepare Callback Data
    callback_data = {
        transaction_id: transaction_id,
        status: "SUCCESS",
        merchant_id: transaction.merchant_id,
        amount: transaction.amount,
        currency: transaction.currency,
        payment_reference: payment_result.reference_id,
        timestamp: current_timestamp,
        signature: generateSignature(callback_data)  // For security
    }
    
    // Step 5: Send Callback to Merchant
    sendCallbackToMerchant(transaction.callback_url, callback_data)
    
    // Step 6: Log Success Event
    LOG event {
        type: "PAYMENT_SUCCESS",
        transaction_id: transaction_id,
        merchant_id: transaction.merchant_id,
        amount: transaction.amount,
        timestamp: current_timestamp
    }
    
    // Step 7: Send Notification (if applicable)
    SEND notification {
        type: "PAYMENT_SUCCESS",
        recipient: merchant.email,
        subject: "Payment Successful",
        message: "Your payment of " + transaction.amount + " " + transaction.currency + " has been processed successfully"
    }
END FUNCTION
```

---

## FAILURE FLOW

```
FUNCTION handleFailure(transaction_id, payment_result):
    // Step 1: Update Transaction Status
    UPDATE transaction SET
        status = "FAILED",
        failure_reason = payment_result.error_message,
        failure_code = payment_result.error_code,
        failed_at = current_timestamp,
        gateway_response = payment_result.response
    WHERE id = transaction_id
    
    // Step 2: Rollback Any Pending Operations
    IF account_balance_was_updated THEN
        ROLLBACK balance_update
    END IF
    
    // Step 3: Create Failure Record
    CREATE failure_record {
        transaction_id: transaction_id,
        status: "FAILED",
        error_code: payment_result.error_code,
        error_message: payment_result.error_message,
        timestamp: current_timestamp
    }
    
    // Step 4: Determine Failure Type
    failure_category = categorizeFailure(payment_result.error_code)
    
    // Step 5: Prepare Callback Data
    callback_data = {
        transaction_id: transaction_id,
        status: "FAILED",
        merchant_id: transaction.merchant_id,
        amount: transaction.amount,
        currency: transaction.currency,
        error_code: payment_result.error_code,
        error_message: payment_result.error_message,
        failure_category: failure_category,
        timestamp: current_timestamp,
        signature: generateSignature(callback_data)  // For security
    }
    
    // Step 6: Send Callback to Merchant
    sendCallbackToMerchant(transaction.callback_url, callback_data)
    
    // Step 7: Log Failure Event
    LOG event {
        type: "PAYMENT_FAILURE",
        transaction_id: transaction_id,
        merchant_id: transaction.merchant_id,
        amount: transaction.amount,
        error_code: payment_result.error_code,
        error_message: payment_result.error_message,
        timestamp: current_timestamp
    }
    
    // Step 8: Alert Team (for critical failures)
    IF failure_category EQUALS "CRITICAL" THEN
        ALERT team {
            severity: "HIGH",
            transaction_id: transaction_id,
            error_code: payment_result.error_code,
            message: "Critical payment failure detected"
        }
    END IF
    
    // Step 9: Send Notification to Merchant
    SEND notification {
        type: "PAYMENT_FAILED",
        recipient: merchant.email,
        subject: "Payment Failed",
        message: "Your payment of " + transaction.amount + " " + transaction.currency + " has failed. Reason: " + payment_result.error_message
    }
END FUNCTION
```

---

## CALLBACK HANDLING (Merchant Side)

```
// Merchant receives callback at: https://merchant.com/callback

FUNCTION handleCallback(callback_data):
    // Step 1: Verify Signature
    IF verifySignature(callback_data) IS FALSE THEN
        RETURN error_response("Invalid signature")
        LOG security_alert("Invalid callback signature")
        EXIT FUNCTION
    END IF
    
    // Step 2: Extract Transaction Information
    transaction_id = callback_data.transaction_id
    status = callback_data.status
    
    // Step 3: Handle Based on Status
    IF status EQUALS "SUCCESS" THEN
        handleSuccessCallback(callback_data)
    ELSE IF status EQUALS "FAILED" THEN
        handleFailureCallback(callback_data)
    ELSE
        LOG warning("Unknown callback status: " + status)
    END IF
END FUNCTION

FUNCTION handleSuccessCallback(callback_data):
    // Update order/service status
    UPDATE order SET
        payment_status = "COMPLETED",
        payment_reference = callback_data.payment_reference,
        paid_at = callback_data.timestamp
    WHERE transaction_id = callback_data.transaction_id
    
    // Trigger fulfillment process
    TRIGGER order_fulfillment(order_id)
    
    // Send confirmation to customer
    SEND email {
        to: customer.email,
        subject: "Payment Confirmed",
        body: "Your payment has been successfully processed. Order ID: " + order_id
    }
    
    // Log success
    LOG info("Payment successful for transaction: " + callback_data.transaction_id)
    
    RETURN success_response("Callback processed successfully")
END FUNCTION

FUNCTION handleFailureCallback(callback_data):
    // Update order/service status
    UPDATE order SET
        payment_status = "FAILED",
        failure_reason = callback_data.error_message,
        failed_at = callback_data.timestamp
    WHERE transaction_id = callback_data.transaction_id
    
    // Notify customer
    SEND email {
        to: customer.email,
        subject: "Payment Failed",
        body: "Your payment could not be processed. Please try again or contact support."
    }
    
    // Provide retry option
    CREATE retry_link {
        transaction_id: callback_data.transaction_id,
        expires_at: current_timestamp + 24_hours
    }
    
    // Log failure
    LOG warning("Payment failed for transaction: " + callback_data.transaction_id + 
                " - Reason: " + callback_data.error_message)
    
    RETURN success_response("Failure callback processed successfully")
END FUNCTION
```

---

## HELPER FUNCTIONS

```
FUNCTION validateRequest(request):
    IF request.merchant_id IS EMPTY OR NULL THEN
        RETURN FALSE
    END IF
    
    IF request.amount IS EMPTY OR request.amount <= 0 THEN
        RETURN FALSE
    END IF
    
    IF request.currency IS EMPTY OR NOT in_supported_currencies THEN
        RETURN FALSE
    END IF
    
    IF request.callback_url IS EMPTY OR NOT valid_url THEN
        RETURN FALSE
    END IF
    
    RETURN TRUE
END FUNCTION

FUNCTION sendCallbackToMerchant(callback_url, callback_data):
    MAX_RETRIES = 3
    RETRY_DELAY = [5_seconds, 30_seconds, 5_minutes]
    
    FOR attempt = 1 TO MAX_RETRIES:
        TRY:
            response = HTTP_POST(callback_url, callback_data, timeout=10_seconds)
            
            IF response.status_code EQUALS 200 THEN
                UPDATE transaction SET
                    callback_sent = TRUE,
                    callback_sent_at = current_timestamp
                WHERE id = callback_data.transaction_id
                
                LOG info("Callback sent successfully")
                RETURN SUCCESS
            ELSE
                LOG warning("Callback returned status: " + response.status_code)
            END IF
        CATCH error:
            LOG error("Callback failed: " + error.message)
        END TRY
        
        IF attempt < MAX_RETRIES THEN
            WAIT RETRY_DELAY[attempt]
        END IF
    END FOR
    
    // If all retries failed
    LOG error("Failed to send callback after " + MAX_RETRIES + " attempts")
    CREATE pending_callback {
        callback_url: callback_url,
        callback_data: callback_data,
        retry_count: MAX_RETRIES,
        next_retry_at: current_timestamp + 1_hour
    }
    
    RETURN FAILURE
END FUNCTION

FUNCTION categorizeFailure(error_code):
    IF error_code IN ["INSUFFICIENT_FUNDS", "CARD_DECLINED"] THEN
        RETURN "CUSTOMER_ERROR"
    ELSE IF error_code IN ["NETWORK_ERROR", "GATEWAY_TIMEOUT"] THEN
        RETURN "TECHNICAL_ERROR"
    ELSE IF error_code IN ["FRAUD_DETECTED", "SECURITY_VIOLATION"] THEN
        RETURN "CRITICAL"
    ELSE IF error_code IN ["INVALID_MERCHANT", "AUTHORIZATION_FAILED"] THEN
        RETURN "MERCHANT_ERROR"
    ELSE
        RETURN "UNKNOWN_ERROR"
    END IF
END FUNCTION
```

---

## ERROR CODES REFERENCE

```
SUCCESS:
- 200: Payment successful
- 201: Payment successful and account credited

FAILURE (Customer Errors):
- 4001: Insufficient funds
- 4002: Card declined
- 4003: Invalid card details
- 4004: Expired card

FAILURE (Technical Errors):
- 5001: Network timeout
- 5002: Gateway unavailable
- 5003: Database error
- 5004: Service temporarily unavailable

FAILURE (Merchant Errors):
- 6001: Invalid merchant
- 6002: Merchant account suspended
- 6003: Authorization failed

FAILURE (Critical Errors):
- 7001: Fraud detected
- 7002: Security violation
- 7003: Duplicate transaction
```




