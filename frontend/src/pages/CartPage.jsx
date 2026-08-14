import { useState } from "react";
import { useEffect } from "react";
import cartService from "../services/cartService";
import CartItem from "../components/CartItem";

function CartPage() {

    const [cart, setCart] = useState(null)

    useEffect(() => {
        async function loadCart() {
            const cart = await cartService.getCart();
            setCart(cart);
        }

        loadCart();
    }, []);

    async function handleUpdate(productId, quantity) {
        const cart = await cartService.updateItem(productId, quantity);
        setCart(cart);
    }

    async function handleDelete(productId) {
        const cart = await cartService.deleteItem(productId);
        setCart(cart);
    }

    async function handleClear() {
        const cart = await cartService.clearCart();
        console.log("Carrito después de limpiar:", cart);
        setCart(cart);
    }

    if (!cart) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2>Mi carrito</h2>

            <p>ID del Carrito: {cart.id}</p> 
            <h3>Productos</h3>

            {
                cart.items.map(item => (
                    <CartItem 
                        key={item.productId}
                        item={item}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))
            }

        <h3>Total: {cart.total} €</h3>
        
        <button onClick={handleClear}>
            Limpiar Carrito
        </button>
        </div>
    );
}

export default CartPage;