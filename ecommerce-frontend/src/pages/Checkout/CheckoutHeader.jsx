import React from 'react'
import './checkout-header.css'
import { Link } from 'react-router-dom';

function CheckoutHeader({ totalItems }) {
  return (
    <div>
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                <Link to="/">
                    <img className="logo" src="public/assets/images/logo.png" />
                    <img className="mobile-logo" src="images/mobile-logo.png" />
                </Link>
                </div>

                <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link"
                    href="index.html">{totalItems} items</a>)
                </div>

                <div class="checkout-header-right-section">
                <img src="public/assets/images/icons/checkout-lock-icon.png" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutHeader