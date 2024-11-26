import { useState } from "react";
import postLogin from "../api/post-login";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(credentials);
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password).then((res) => {
        window.localStorage.setItem("token", res.token);
        navigate("/");
      });
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
