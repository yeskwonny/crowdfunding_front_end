import { useState } from "react";
import postLogin from "../api/post-login";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (credentials.username && credentials.password)
      try {
        const response = await postLogin(
          credentials.username,
          credentials.password
        );
        console.log(response);
        window.localStorage.setItem("token", response.token);
        setAuth({ token: response.token });
        navigate("/");
      } catch (e) {
        console.error("Login error", e);
      }
  }
  return (
    <form>
      <div>
        <label htmlFor="username">Username :</label>
        <input type="text" id="username" onChange={handleChange}></input>

        <label htmlFor="password">Password :</label>
        <input type="password" id="password" onChange={handleChange}></input>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
