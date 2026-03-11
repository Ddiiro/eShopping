import { formatCurrency } from '../../utils/currency';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { ordersContext } from '../../App';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CartItemDetails from './CartItemDetails';



function OrderSummary( {fetchPaymentSummary} ) {
    const { cart } = useContext(ordersContext);
    const [deliveryOptions, setDeliveryOptions] = useState([])
    const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] = useState(null);

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

    const getSelectedDeliveryOption = (deliveryOptionID) => {
        setSelectedDeliveryOptionId(deliveryOptionID);
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

                                    <CartItemDetails cartItem={cartItem} fetchPaymentSummary={fetchPaymentSummary} />

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
                                                            checked={selectedDeliveryOptionId}
                                                            onChange={() => getSelectedDeliveryOption(deliveryOption.id)}
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