import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import Category from "../components/Category";
import "../styles/admin-categories-page.css"

function AdminCategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [creating, setCreating] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        async function loadCategories() {
            const categories = await categoryService.getCategories();
            setCategories(categories);
        }

        loadCategories();
    }, []);

    async function handleCreate(event) {
        event.preventDefault();

        await categoryService.createCategory({
            name
        });

        const categories = await categoryService.getCategories();
        setCategories(categories);

        setName("");
        setCreating(false);
    }

    async function handleDelete(categoryId) {
        try {
            await categoryService.deleteCategory(categoryId);

            const categories = await categoryService.getCategories();
            setCategories(categories);

        } catch (error) {
            alert("This category cannot be deleted because it has associated products.");
        }
    }

    async function handleUpdate(categoryId, categoryData) {
        await categoryService.updateCategory(categoryId, categoryData);

        const categories = await categoryService.getCategories();
        setCategories(categories);
    }

    return (
        <div className="admin-categories-page">
            <h2>Manage categories</h2>

            <button onClick={() => setCreating(true)}>
                Create category
            </button>

            {
                creating && (
                    <form onSubmit={handleCreate}>

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <button type="submit">
                            Create
                        </button>

                        <button
                            type="button"
                            onClick={() => setCreating(false)}
                        >
                            Cancel
                        </button>

                    </form>
                )
            }

            {
                categories.map(category => (
                    <Category
                        key={category.id}
                        category={category}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            }
        </div>
    );
}

export default AdminCategoriesPage;