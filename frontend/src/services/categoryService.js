import axios from "axios";

async function createCategory(categoryData) {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/categories",
        categoryData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

async function getCategories() {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/categories",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

async function updateCategory(id, categoryData) {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/categories/${id}`,
        categoryData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

async function deleteCategory(id) {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/categories/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export default {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};