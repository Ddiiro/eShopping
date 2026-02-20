import React from 'react'
import './checkout-header.css'
import { Link } from 'react-router-dom';

function CheckoutHeader() {
  return (
    <div>
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                <Link to="/">
                    <img className="logo" src="images/logo.png" />
                    <img className="mobile-logo" src="images/mobile-logo.png" />
                </Link>
                </div>

                <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link"
                    href="index.html">3 items</a>)
                </div>

                <div class="checkout-header-right-section">
                <img src="images/icons/checkout-lock-icon.png" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutHeader