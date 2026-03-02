import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import '../pages/styles/orders.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatCurrency } from '../utils/currency';
import dayjs from 'dayjs';

function OrdersGrid() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders?expand=products')
                setOrders(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrders();
    }, [])
    return (
        <>
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
                </div>
            </div>
        </>
    )
}

export default OrdersGrid