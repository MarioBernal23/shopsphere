import { useState } from "react";
import "../styles/admin-product.css"

function ProductAdmin({ product, categories, onDelete, onUpdate }) {

    const [editing, setEditing] = useState(false);

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.image);
    const [stock, setStock] = useState(product.stock);
    const [categoryId, setCategoryId] = useState(product.categoryId);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdate(product.id, {
            name,
            description,
            price,
            image,
            stock,
            category: {
                id: Number(categoryId)
            }
        });

        setEditing(false);
    }

    return (
        <div className="admin-product">
            <div className="admin-product-info">
                <h3>{product.name}</h3>
                <p>Description: {product.description}</p>
            </div>

            <p className="admin-product-price">Price: {product.price} €</p>

            <p className="admin-product-stock">Stock: {product.stock}</p>

            <p className="admin-product-category">
                Category: {product.categoryName}
            </p>

            <div className="admin-product-actions">
                <button
                    className="admin-product-edit"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>

                <button
                    className="admin-product-delete"
                    onClick={() => onDelete(product.id)}
                >
                    Delete
                </button>
            </div>

            {
                editing && (
                    <form onSubmit={handleSubmit}>

                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <input
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
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />

                        <input
                            type="number"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)}
                        />

                        <select
                            value={categoryId}
                            onChange={(event) => setCategoryId(event.target.value)}
                        >
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
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>

                    </form>
                )
            }
        </div>
    );
}

export default ProductAdmin;