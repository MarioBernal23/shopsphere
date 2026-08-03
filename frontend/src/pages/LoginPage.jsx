import { useState } from "react";
import authService from "../services/authService";

function LoginPage() {

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

    localStorage.setItem(
    "token",
    response.token
);
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