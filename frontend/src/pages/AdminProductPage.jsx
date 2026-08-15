import { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductAdmin from "../components/ProductAdmin";
import categoryService from "../services/categoryService";

function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [creating, setCreating] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [stock, setStock] = useState(0);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    
    useEffect(() => {
            async function loadProducts() {
                const products = await productService.getProducts();
                const categories = await categoryService.getCategories();

                setProducts(products);
                setCategories(categories);
            }
    
            loadProducts();
        }, []);

    async function handleCreate(event) {
            event.preventDefault();
    
            await productService.createProduct({
                name,
                description,
                price,
                image,
                stock,
                category: {
                    id: Number(categoryId)
                }
            });
    
            const products = await productService.getProducts();
            setProducts(products);
    
            setName("");
            setDescription("");
            setPrice(0);
            setImage("");
            setStock(0)
            setCategoryId("")
            setCreating(false);
        }

        async function handleDelete(productId) {
            await productService.deleteProduct(productId);
        
            const products = await productService.getProducts();
            setProducts(products);
        }

        async function handleUpdate(productId, productData) {
            await productService.updateProduct(productData, productId)
        
            const products = await productService.getProducts();
            setProducts(products);
        }
        return (
            <div>
                <h2>Gestionar productos</h2>

                <button onClick={() => setCreating(true)}>
                    Crear producto
                </button>
                {
                creating && (
                    <form onSubmit={handleCreate}>

                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Descripcion"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />

                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Imagen"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="stock"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)}
                        />

                        <select
                            value={categoryId}
                            onChange={(event) => setCategoryId(event.target.value)}
                        >
                            <option value="">Selecciona una categoría</option>

                            {
                                categories.map(category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>

                        <button type="submit">
                            Crear
                        </button>

                        <button
                            type="button"
                            onClick={() => setCreating(false)}
                        >
                            Cancelar
                        </button>

                    </form>
                )
            }
                {
                    products.map(product => (
                        <ProductAdmin
                            key={product.id}
                            product={product}
                            categories={categories}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))
                }
            </div>
    );
}

export default AdminProductPage