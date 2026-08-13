import axios from "axios";

async function getCart() {

    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:8080/cart",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    
    return response.data;
}

async function addItem(id) {

    const token = localStorage.getItem("token");

    const response = await axios.post(`http://localhost:8080/cart/products/${id}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    
    return response.data;
}

export default {
    getCart,
    addItem
};