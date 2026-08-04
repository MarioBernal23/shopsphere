import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";
import authService from "../services/authService";

function LoginPage() {

  const navigate = useNavigate();
  const { login } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleLogin(event) {
    event.preventDefault();
    const response = await authService.login(email, password);

    login(response.token)
    navigate("/");
  }
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmailChange}/>

        <label>Password</label>
        <input type="password" value={password} onChange={handlePasswordChange}/>

        <button>Login</button>
      </form>
    </div>
  );
}



export default LoginPage