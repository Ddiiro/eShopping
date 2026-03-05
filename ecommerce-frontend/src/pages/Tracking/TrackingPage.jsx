import React, { Fragment } from 'react'
import '../Tracking/tracking.css'
import Header from '../../components/Header'
import { useContext } from 'react';
import { ordersContext } from '../../App';
import { useParams } from 'react-router-dom';
import dayjs  from 'dayjs';

function TrackingPage() {
    const { cart, orders } = useContext(ordersContext);
    const { orderId, productId } = useParams();

    const orderItem = orders.find((order) => order.id === orderId);
    const product = orderItem?.products.find((product) => product.productId === productId);

    return (
        <div>
            <Header cartItems={cart} />
            {product &&
                < Fragment key={product.id}>
                    <div class="tracking-page">
                        <div class="order-tracking">
                            <a class="back-to-orders-link link-primary" href="orders.html">
                                View all orders
                            </a>

                            <div class="delivery-date">
                                Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('dddd MMM DD')}
                            </div>

                            <div class="product-info">
                                {product.product.name}
                            </div>

                            <div class="product-info">
                                Quantity: {product.quantity}
                            </div>

                            <img class="product-image" src={product.product.image} />

                            <div class="progress-labels-container">
                                <div class="progress-label">
                                    Preparing
                                </div>
                                <div class="progress-label current-status">
                                    Shipped
                                </div>
                                <div class="progress-label">
                                    Delivered
                                </div>
                            </div>

                            <div class="progress-bar-container">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </div >
    )
}

export default TrackingPage