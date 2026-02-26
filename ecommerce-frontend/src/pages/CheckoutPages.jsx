import React from 'react'
import '../pages/styles/checkout.css'
import CheckoutHeader from '../components/CheckoutHeader';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/currency';
import dayjs from 'dayjs';

function CheckoutPages({ carts }) {
    const [paymentSummary, setPaymentSummary] = useState({})
    const [deliveryOptions, setDeliveryOptions] = useState([])
    useEffect(() => {
        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOptions(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    let totalItems = 0
    if (paymentSummary.totalItems) {
        totalItems = paymentSummary.totalItems
    }

    return (
        <div>
            <CheckoutHeader totalItems={totalItems} />
            <div class="checkout-page">
                <div class="page-title">Review your order</div>

                <div class="checkout-grid">
                    <div class="order-summary">
                        {
                            carts.map((cartItem) => {
                                return (
                                    <div key={cartItem.id} class="cart-item-container">
                                        <div class="delivery-date">
                                            Delivery date: Tuesday, June 21
                                        </div>

                                        <div class="cart-item-details-grid">
                                            <img class="product-image"
                                                src={cartItem.product.image} />

                                            <div class="cart-item-details">
                                                <div class="product-name">
                                                    {cartItem.product.name}
                                                </div>
                                                <div class="product-price">
                                                    {formatCurrency(cartItem.product.priceCents)}
                                                </div>
                                                <div class="product-quantity">
                                                    <span>
                                                        Quantity: <span class="quantity-label">{cartItem.quantity}</span>
                                                    </span>
                                                    <span class="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span class="delete-quantity-link link-primary">
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="delivery-options">
                                                <div class="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>
                                                {
                                                        deliveryOptions.map((deliveryOption) => {
                                                            return (
                                                                <div class="delivery-option" key={deliveryOption.id}>
                                                                    <input type="radio"
                                                                        class="delivery-option-input"
                                                                        name={`delivery-option-${cartItem.productId}`} 
                                                                        checked={cartItem.deliveryOptionId === deliveryOption.id}
                                                                    />
                                                                    <div>
                                                                        <div class="delivery-option-date">
                                                                            {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd MMMM D')}
                                                                        </div>
                                                                        <div class="delivery-option-price">
                                                                            {deliveryOption.priceCents === 0 ? 'FREE Shipping' : `${formatCurrency(deliveryOption.priceCents)} - Shipping`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div class="payment-summary">
                        <div class="payment-summary-title">
                            Payment Summary
                        </div>
                        <div class="payment-summary-row">
                            <div>Items ({totalItems}):</div>
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
        </div>
    )
}

export default CheckoutPages