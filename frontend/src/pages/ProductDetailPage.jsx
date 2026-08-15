import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";
import cartService from "../services/cartService";
import "../styles/product-detail.css"

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    async function handleAddToCart() {
        await cartService.addItem(product.id);
    }
    useEffect(() => {
        async function loadProduct() {
            const product = await productService.getProductById(id);
            setProduct(product);
        }
        loadProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="product-detail">
            <div className="product-detail-card">

                <div className="product-detail-image">
                    <div className="product-detail-image-container">
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>

                <div className="product-detail-info">
                    <h2>{product.name}</h2>

                    <p className="product-detail-description">
                        {product.description}
                    </p>

                    <p className="product-detail-category">
                        {product.categoryName}
                    </p>

                    <p className="product-detail-price">
                        {product.price} €
                    </p>

                    <p className="product-detail-stock">
                        Stock: {product.stock}
                    </p>

                    <button onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;