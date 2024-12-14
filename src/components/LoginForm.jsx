import { useState } from "react";
import postLogin from "../api/post-login";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
// components
import InputField from "./InputField";
import Button from "./Button";

import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});

  function handleChange(e) {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    // clear error msg when input is not empty
    if (error[id]) {
      setError((prev) => {
        const updatedError = { ...prev };
        delete updatedError[id];
        return updatedError;
      });
    }
  }

  function validateForm() {
    const validationMsg = {};
    if (!credentials.username) {
      validationMsg.username = "Username can not be empty";
    }
    if (!credentials.password) {
      validationMsg.password = "Password can not be empty.";
    }
    setError(validationMsg);
    // checking errmsg object is empty or not
    // sending true or false
    return Object.keys(validationMsg).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }
    if (credentials.username && credentials.password)
      try {
        const response = await postLogin(
          credentials.username,
          credentials.password
        );

        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("user_id", response.user_id);
        setAuth({ token: response.token, user_id: response.user_id });
        navigate("/");
      } catch (e) {
        console.error("Login error", e);
      }
  }
  return (
    <form>
      <div className="login-container">
        <InputField
          id="username"
          value={credentials.username}
          type="text"
          onChange={handleChange}
          label="Username"
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "50%",
            height: "30px",
          }}
        />
        {error.username && <p>{error.username}</p>}

        <InputField
          id="password"
          value={credentials.password}
          type="password"
          onChange={handleChange}
          label="Password"
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "50%",
            height: "30px",
          }}
        />
        {error.password && <p>{error.password}</p>}
        <Button type="submit" onClick={handleSubmit} name="Login"></Button>
      </div>
    </form>
  );
}

export default LoginForm;
