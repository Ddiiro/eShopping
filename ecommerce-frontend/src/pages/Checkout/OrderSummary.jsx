import { formatCurrency } from '../../utils/currency';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { ordersContext } from '../../App';
import { useState, useEffect } from 'react';
import axios from 'axios';



function OrderSummary( {fetchPaymentSummary} ) {
    const { cart, loadCart } = useContext(ordersContext);
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [isUpdatingCartItem, setIsUpdatingCartItem] = useState(false);
    const [quantityInput, setQuantityInput] = useState(0);

    useEffect(() => {
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

    const handleDeleteCartItem = async (cartItemId) => {
        try {
            await axios.delete(`/api/cart-items/${cartItemId}`)
        } catch (error) {
            console.log(error)
        }

        await loadCart();
    }

    const handleQuantityInputChange = (quantity) => {
        setIsUpdatingCartItem(true);
        setQuantityInput(quantity);
    }

    const handleInputChange = (e) => {
        setQuantityInput(e.target.value);
    }

    const updateCartDetails = async (productId, quantityInput) => {
        if (quantityInput > 0) {
            console.log(quantityInput)
            try {
                await axios.put(`/api/cart-items/${productId}`, {
                    quantity: Number(quantityInput)
                });
            } catch (error) {
                console.log(error);
            } finally {
                setIsUpdatingCartItem(false);
            }

            await loadCart();
            await fetchPaymentSummary();
        }
    }

    return (
        <div>
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
        </div>
    )
}

export default OrderSummary