import React from 'react'
import { Link } from 'react-router-dom';
import './tracking.css'

function TrackingPage() {
  return (
    <div>
        <div className="header">
      <div className="left-section">
        <Link to="/">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div class="right-section">
        <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
        </Link>
      </div>
        </div>

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
            Quantity: 1
            </div>

            <img class="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

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