import { useState } from "react";
import { useEffect } from "react";
import productService from "../services/productService";
import Product from "../components/Product";

function ProductPage() {

    const [products, setProducts] = useState([])

    console.log(products);
    useEffect(() => {
        async function loadProducts() {
            const products = await productService.getProducts();
            setProducts(products);
        }
        loadProducts();
    }, []);

     return (
        <div>
            <h2>Products</h2>
            {
                products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    );
}

export default ProductPage;