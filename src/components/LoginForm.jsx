import { useState } from "react";
import postLogin from "../api/post-login";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
// components
import InputField from "./InputField";
import Button from "./Button";

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
        <InputField
          id="username"
          value={credentials.username}
          type="text"
          onChange={handleChange}
          label="username"
        />

        <InputField
          id="password"
          value={credentials.password}
          type="password"
          onChange={handleChange}
          label="password"
        />
      </div>
      <Button type="submit" onClick={handleSubmit} name="Login"></Button>
    </form>
  );
}

export default LoginForm;
