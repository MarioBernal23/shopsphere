import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
const AuthenticationContext = createContext();

function AuthenticationProvider({children}) {


    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
            const token = localStorage.getItem("token");

        if (token) {
            setAuthenticated(true);
        }
    }, []);



    function login(token) {
        localStorage.setItem("token", token);
        setAuthenticated(true);
    }

    return (
        <AuthenticationContext.Provider value={{ authenticated, login }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export { AuthenticationContext };
export default AuthenticationProvider;