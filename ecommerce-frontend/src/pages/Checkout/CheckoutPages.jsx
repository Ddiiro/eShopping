import React from 'react'
import '../Checkout/checkout.css'
import CheckoutHeader from './CheckoutHeader';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/currency';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { ordersContext } from '../../App';

function CheckoutPages() {
    const [paymentSummary, setPaymentSummary] = useState({})
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const { cart } = useContext(ordersContext);
    const [isUpdatingCartItem, setIsUpdatingCartItem] = useState(false);
    const [quantityInput, setQuantityInput] = useState(0);
    console.log("Cart in CheckoutPages:", cart);
    useEffect(() => {
        const fetchPaymentSummary = async () => {
            try {
                const response = await axios.get('/api/payment-summary')
                setPaymentSummary(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchDeliveryOptions = async () => {
            try {
                const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
                setDeliveryOptions(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPaymentSummary();
        fetchDeliveryOptions();
    }, [])

    let totalItems = 0
    if (paymentSummary.totalItems) {
        totalItems = paymentSummary.totalItems
    }

    const handleDeleteCartItem = async (cartItemId) => {
        try {
            await axios.delete(`/api/cart-items/${cartItemId}`)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log('xxxx', cartProductId)

    const handleQuantityInputChange = (quantity) => {
        setIsUpdatingCartItem(true);
        // if ( isUpdatingCartItem) {
        // }
        setQuantityInput(quantity);
    }

    const handleInputChange = (e) => {
        setQuantityInput(e.target.value);
        // setIsUpdatingCartItem(true);
    }

    const updateCartDetails = async (productId , quantityInput) => {
        console.log("Updating cart item with productId:", productId, "to quantity:", quantityInput);
        // isUpdatingCartItem = true;
        // let quantityInput = cartItem.quantity;
        if (quantityInput > 0) {
        try {
            await axios.put(`/api/cart-items/${productId}`, {
                quantity: quantityInput
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdatingCartItem(false);
        }
    }}


    return (
        <div>
            <CheckoutHeader totalItems={totalItems} />
            <div class="checkout-page">
                <div class="page-title">Review your order</div>

                <div class="checkout-grid">
                    <div class="order-summary">
                        {
                            cart.map((cartItem) => {
                                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                                    return deliveryOption.id === cartItem.deliveryOptionId;
                                })
                                return (
                                    <div key={cartItem.productId} class="cart-item-container">
                                        <div class="delivery-date">
                                            Delivery date: {selectedDeliveryOption ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd MMMM D') : "Not selected"}
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
                                                    {
                                                        isUpdatingCartItem ? (
                                                            <input type="number" class="quantity-input" defaultValue={quantityInput} onChange={(e) => handleInputChange(e)} />
                                                        ) : (
                                                            <span>
                                                                Quantity: <span class="quantity-label">{cartItem.quantity}</span>
                                                            </span>)
                                                    }

                                                </div>
                                                <div class="update-cart-item">
                                                    {
                                                        isUpdatingCartItem ? (
                                                            <button className=" button-update-cart"
                                                                onClick={() => updateCartDetails(cartItem.productId, quantityInput)}
                                                            >
                                                                Update Cart Item
                                                            </button>
                                                        ) : (
                                                        <>
                                                            <button className=" button-update-cart"
                                                                onClick={() => handleQuantityInputChange(cartItem.quantity)}
                                                            >
                                                                Edit CartnItem
                                                            </button>
                                                            <button className="button-danger"
                                                                onClick={() => handleDeleteCartItem(cartItem.productId)}
                                                            >
                                                                Delete Cart Item
                                                            </button>
                                                        </>)
                                                    }

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
        </div >
    )
}

export default CheckoutPages