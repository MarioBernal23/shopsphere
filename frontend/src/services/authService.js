import axios from "axios"
async function login(email, password) {
    const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
            email,
            password
        }
    );
    return response.data;
}

export default {
    login
}