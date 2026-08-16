import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderService from "../services/orderService";
import Product from "../components/Product";
import "../styles/order-detail.css"

function OrderDetailPage() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        async function loadOrder() {
            const order = await orderService.getOrderById(id);
            setOrder(order);
        }

        loadOrder();
    }, [id]);

    if (!order) {
        return <p>Loading...</p>;
    }

    return (
        <div className="order-detail">
            <h2>Order #{order.id}</h2>

            <div className="order-detail-info">
                <p>Status: {order.status}</p>
                <p>Date: {order.createdAt}</p>
            </div>

            <h3>Products</h3>

            <div className="order-product-list">
                {order.items.map(item => (
                    <div className="order-product" key={item.productId}>
                        <div>
                            <h4>{item.productName}</h4>
                            <p>Price: {item.price} €</p>
                        </div>

                        <p>Quantity: {item.quantity}</p>

                        <p>Subtotal: {item.subtotal} €</p>
                    </div>
                ))}
            </div>

            <h3 className="order-total">
                Total: {order.total} €
            </h3>
        </div>
    );
}

export default OrderDetailPage;
