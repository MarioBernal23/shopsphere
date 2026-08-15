import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";
import Category from "../components/Category";

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
            alert("No se puede eliminar una categoría que tiene productos asociados");
        }
    }

    async function handleUpdate(categoryId, categoryData) {
        await categoryService.updateCategory(categoryId, categoryData);

        const categories = await categoryService.getCategories();
        setCategories(categories);
    }

    return (
        <div>
            <h2>Gestionar categorías</h2>

            <button onClick={() => setCreating(true)}>
                Crear categoría
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