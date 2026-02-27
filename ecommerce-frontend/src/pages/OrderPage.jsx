import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import '../pages/styles/orders.css'
import Header from '../components/Header'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatCurrency } from '../utils/currency';
import dayjs from 'dayjs';

function OrderPage({ carts }) {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response) => {
                setOrders(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <Header cartItems={carts} />
            <div class="orders-page">
                <div class="page-title">Your Orders</div>

                <div class="orders-grid">
                    {
                        orders.map((order) => {
                            return (
                                <div key={order.id} class="order-container">

                                    <div class="order-header">
                                        <div class="order-header-left-section">
                                            <div class="order-date">
                                                <div class="order-header-label">Order Placed:</div>
                                                <div>{dayjs(order.orderTimeMs).format('dddd MMM DD')}</div>
                                            </div>
                                            <div class="order-total">
                                                <div class="order-header-label">Total:</div>
                                                <div>{formatCurrency(order.totalCostCents)}</div>
                                            </div>
                                        </div>

                                        <div class="order-header-right-section">
                                            <div class="order-header-label">Order ID:</div>
                                            <div>{order.id}</div>
                                        </div>
                                    </div>

                                    <div class="order-details-grid">
                                        {
                                            order.products.map((product) => {
                                                return (
                                                    <Fragment key={product.id}>
                                                        <div class="product-image-container">
                                                            <img src={product.product.image} />
                                                        </div>

                                                        <div class="product-details">
                                                            <div class="product-name">
                                                                {product.product.name}
                                                            </div>
                                                            <div class="product-delivery-date">
                                                                Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format('dddd MMM DD')}
                                                            </div>
                                                            <div class="product-quantity">
                                                                Quantity: {product.quantity}
                                                            </div>
                                                            <button class="buy-again-button button-primary">
                                                                <img class="buy-again-icon" src="public/assets/images/icons/buy-again.png" />
                                                                <span class="buy-again-message">Add to Cart</span>
                                                            </button>
                                                        </div>

                                                        <div class="product-actions">
                                                            <Link to="/tracking">
                                                                <button class="track-package-button button-secondary">
                                                                    Track package
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                                    </div>
                                </div>
                                    )
                        })
                    }
                                    {/* <div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>August 12</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$35.06</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    <div class="product-image-container">
                    <img src="public/assets/images/products/athletic-cotton-socks-6-pairs.jpg" />
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        Black and Gray Athletic Cotton Socks - 6 Pairs
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: August 15
                    </div>
                    <div class="product-quantity">
                        Quantity: 1
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="public/assets/images/icons/buy-again.png" />
                        <span class="buy-again-message">Add to Cart</span>
                    </button>
                    </div>

                    <div class="product-actions">
                        <Link to="/tracking">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </Link>
                    </div>

                    <div class="product-image-container">
                    <img src="public/assets/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" />
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        Adults Plain Cotton T-Shirt - 2 Pack
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: August 19
                    </div>
                    <div class="product-quantity">
                        Quantity: 2
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="public/assets/images/icons/buy-again.png" />
                        <span class="buy-again-message">Add to Cart</span>
                    </button>
                    </div>

                    <div class="product-actions">
                        <Link to="/tracking">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </Link>
                    </div>
                </div>
                </div>

                <div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>June 10</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$41.90</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    <div class="product-image-container">
                    <img src="public/assets/images/products/intermediate-composite-basketball.jpg" />
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        Intermediate Size Basketball
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: June 17
                    </div>
                    <div class="product-quantity">
                        Quantity: 2
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="public/assets/images/icons/buy-again.png" />
                        <span class="buy-again-message">Add to Cart</span>
                    </button>
                    </div>

                    <div class="product-actions">
                        <Link to="/tracking">
                            <button class="track-package-button button-secondary">
                                Track package
                            </button>
                        </Link>
                    </div>
                </div>
                </div> */}
                                </div>
            </div>
            </div>
            )
}

            export default OrderPage