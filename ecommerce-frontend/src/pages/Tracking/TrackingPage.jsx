import React from 'react'
import { Link } from 'react-router-dom';
import '../pages/styles/tracking.css'
import Header from '../../components/Header'

function TrackingPage({carts}) {
    console.log(carts)
  return (
    <div>
        <Header cartItems={carts} />
        <div class="tracking-page">
            <div class="order-tracking">
                <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
                </a>

                <div class="delivery-date">
                Arriving on Monday, June 13
                </div>

                <div class="product-info">
                Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>

                <div class="product-info">
                Quantity: {carts.quantity}
                </div>

                <img class="product-image" src="public/assets/images/products/athletic-cotton-socks-6-pairs.jpg" />

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
    </div>
  )
}

export default TrackingPage