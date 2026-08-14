
function CartItem({ item, onUpdate, onDelete }) {
    return(
        <div>
            <h3>{item.productName}</h3>
            <p>Precio: {item.price} €</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Subtotal: {item.subtotal} €</p>

            <button onClick={() => onUpdate(item.productId, item.quantity - 1)}>
                -
            </button>

            <button onClick={() => onUpdate(item.productId, item.quantity + 1)}>
                +
            </button>

            <button onClick={() => onDelete(item.productId)}>
                Eliminar
            </button>
            
        </div>
    )
}

export default CartItem;