import "../styles/cart-item.css"

function CartItem({ item, onUpdate, onDelete }) {
    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <h3>{item.productName}</h3>
                <p>Price: {item.price} €</p>
            </div>

            <div className="cart-item-quantity">
                <button onClick={() => onUpdate(item.productId, item.quantity - 1)}>
                    -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => onUpdate(item.productId, item.quantity + 1)}>
                    +
                </button>
            </div>

            <p className="cart-item-subtotal">
                {item.subtotal} €
            </p>

            <button
                className="cart-item-delete"
                onClick={() => onDelete(item.productId)}
            >
                Delete
            </button>
        </div>
    );
}

export default CartItem;