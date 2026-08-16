import { Link } from "react-router-dom";
import "../styles/order.css"

function Order({ order }) {
    return (
        <div className="order">
            <div className="order-info">
                <h3>Order #{order.id}</h3>
                <p>Total: {order.total} €</p>
            </div>

            <p className="order-status">
                Status: {order.status}
            </p>

            <p className="order-date">
                Date: {order.createdAt}
            </p>

            <Link className="order-details" to={`/orders/${order.id}`}>
                View details
            </Link>
        </div>
    );
}

export default Order