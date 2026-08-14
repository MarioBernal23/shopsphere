import axios from "axios";

async function createOrder() {
    const token = localStorage.getItem("token")

    const response = await axios.post("http://localhost:8080/orders",
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data
}

async function getOrders() {
    const token = localStorage.getItem("token")

    const response = await axios.get("http://localhost:8080/orders",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data
}
async function getOrderById(id) {
    const token = localStorage.getItem("token")

    const response = await axios.get(`http://localhost:8080/orders/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data
}

export default {
    createOrder,
    getOrders, 
    getOrderById
}