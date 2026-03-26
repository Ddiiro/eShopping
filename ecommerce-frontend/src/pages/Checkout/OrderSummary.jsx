import { formatCurrency } from '../../utils/currency';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { ordersContext } from '../../App';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CartItemDetails from './CartItemDetails';



function OrderSummary({ fetchPaymentSummary, paymentSummary }) {
    const { cart, loadCart } = useContext(ordersContext);
    const [deliveryOptions, setDeliveryOptions] = useState([])

    const fetchDeliveryOptions = async () => {
        try {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateDeliveryDate = async (productId, deliveryOptionId) => {
        await axios.put(`/api/cart-items/${productId}`, {
            deliveryOptionId
        });

        await loadCart();
        await fetchPaymentSummary();
    };

    useEffect(() => {
        fetchPaymentSummary();
        fetchDeliveryOptions();
    }, [])


    return (
        <div>
            <div class="order-summary">
                {
                    cart.map((cartItem) => {
                        const selectedDeliveryOption = deliveryOptions.find(
                            option => option.id === cartItem.deliveryOptionId
                        );
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

                                                // const updateDeliveryDate = async () => {
                                                //     await axios.put(`api/cart-items/${cartItem.productId}`, {
                                                //         deliveryOptionId: deliveryOption.id
                                                //     })

                                                //     // fetchDeliveryOptions();
                                                //     await fetchPaymentSummary();
                                                // }
                                                return (
                                                    <div
                                                        class="delivery-option"
                                                        key={deliveryOption.id}
                                                        onClick={() => updateDeliveryDate(cartItem.productId, deliveryOption.id)}
                                                    >
                                                        <input type="radio"
                                                            class="delivery-option-input"
                                                            name={`delivery-option-${cartItem.productId}`}
                                                            checked={deliveryOption.id === cartItem.deliveryOptionId}
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