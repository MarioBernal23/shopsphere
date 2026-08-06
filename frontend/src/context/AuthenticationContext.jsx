import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthenticationContext = createContext();

function AuthenticationProvider({children}) {


    const [authenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
            const token = localStorage.getItem("token");

        if (token) {

            authenticate(token);
        }
    }, []);

    function authenticate(token) {
        const user = jwtDecode(token);

        setEmail(user.sub)
        setRole(user.role)

        setAuthenticated(true);
    }
    function login(token) {
        localStorage.setItem("token", token);

        authenticate(token)
    }

    function logout() {
        localStorage.removeItem("token");
        setAuthenticated(false);
        setEmail(null)
        setRole(null)
    }

    return (
        <AuthenticationContext.Provider value={{ authenticated, login, logout, email, role }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export { AuthenticationContext };
export default AuthenticationProvider;