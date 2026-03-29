import React, { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Header.css'
import axios from 'axios';
import { ordersContext } from '../App';

function Header({ cartItems }) {

    const { setProducts } = useContext(ordersContext);
    const [search, setSearch] = useState("");

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchFilter = async () => {
        const response = await axios.get(`/api/products?search=${search}`);
        setProducts(response.data)
    }

    let totalQuantity = 0
    cartItems.forEach((item) => {
        totalQuantity += item.quantity
    })

    const isActiveLink = ({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
    })
    return (
        <div>
            <div className="header">
                <div className="left-section">
                    <Link to="/">
                        <img className="logo"
                            src="public/assets/images/logo-white.png" />
                        <img className="mobile-logo"
                            src="public/assets/images/mobile-logo-white.png" />
                    </Link>
                </div>

                <div className="middle-section">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => {
                            handleSearchInput(e);
                        }}
                    />

                    <button className="search-button" onClick={handleSearchFilter}>
                        <img className="search-icon" src="public/assets/images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" style={isActiveLink} to="/orders">
                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="public/assets/images/icons/cart-icon.png" />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header