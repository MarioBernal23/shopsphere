import { useState } from "react";
import { useEffect } from "react";
import productService from "../services/productService";
import Product from "../components/Product";
import "../styles/product-page.css"

function ProductPage() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function loadProducts() {
            const products = await productService.getProducts();
            setProducts(products);
        }
        loadProducts();
    }, []);

     return (
        <div className="product-page">
            <h2>Products</h2>
            <div className="products-grid">
                {
                    products.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ProductPage;