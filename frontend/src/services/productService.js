import axios from "axios";

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

export default {
    getProducts
};