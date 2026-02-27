import Header from '../components/Header'
import OrdersGrid from '../components/OrdersGrid';

function OrderPage({ carts }) {

    return (
        <div>
            <Header cartItems={carts} />
            <OrdersGrid />

        </div>
    )
}

export default OrderPage