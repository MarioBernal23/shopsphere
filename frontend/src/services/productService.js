import axios from "axios";

async function createProduct(productData) {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/products",
        productData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

async function updateProduct(productData, id) {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/products/${id}`,
        productData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

async function deleteProduct(id) {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/products/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

async function getProducts() {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/products",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

async function getProductById(id) {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `http://localhost:8080/products/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
};