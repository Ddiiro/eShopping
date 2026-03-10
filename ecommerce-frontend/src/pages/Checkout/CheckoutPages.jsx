import React, { use } from 'react'
import '../Checkout/checkout.css'
import CheckoutHeader from './CheckoutHeader';
import axios from 'axios';
import { useState, useEffect } from 'react';
import OrderSummary from './OrderSummary';

function CheckoutPages() {
    const [paymentSummary, setPaymentSummary] = useState({})
    

    const fetchPaymentSummary = async () => {
        try {
            const response = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPaymentSummary();
    }, [])


    return (
        <div>
            <CheckoutHeader totalItems={paymentSummary.totalItems} />
            <div class="checkout-page">
                <div class="page-title">Review your order</div>

                <div class="checkout-grid">
                    <OrderSummary fetchPaymentSummary={fetchPaymentSummary} />

                    <div class="payment-summary">
                        <div class="payment-summary-title">
                            Payment Summary
                        </div>
                        <div class="payment-summary-row">
                            <div>Items ({paymentSummary.totalItems}):</div>
                            <div class="payment-summary-money">${paymentSummary.productCostCents / 100}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">${paymentSummary.shippingCostCents / 100}</div>
                        </div>

                        <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">${paymentSummary.totalCostBeforeTaxCents / 100}</div>
                        </div>

                        <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">${paymentSummary.taxCents / 100}</div>
                        </div>

                        <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">${paymentSummary.totalCostCents / 100}</div>
                        </div>
                        <button class="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CheckoutPages