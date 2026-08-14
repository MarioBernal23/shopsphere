import axios from "axios";

async function createUser(userData) {
    const token = localStorage.getItem("token")

    const response = await axios.post("http://localhost:8080/users",
        userData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data
}

async function getUsers() {
    const token = localStorage.getItem("token")

    const response = await axios.get("http://localhost:8080/users",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data
}

async function updateUser(id, userData) {
    const token = localStorage.getItem("token")

    const response = await axios.put(`http://localhost:8080/users/${id}`,
        userData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data
}

async function deleteUser(id) {
    const token = localStorage.getItem("token")

    const response = await axios.delete(`http://localhost:8080/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data
}

export default {
    createUser,
    getUsers, 
    updateUser,
    deleteUser
}