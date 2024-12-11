import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import postSignUp from "../api/post-signup";
import postLogin from "../api/post-login";
import InputField from "./InputField";
import Button from "./Button";
import "./SignupForm.css";

function SignupForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (userInfo.username && userInfo.password) {
      try {
        const response = await postSignUp(
          userInfo.username,
          userInfo.password,
          userInfo.email,
          userInfo.firstname,
          userInfo.lastname
        );
        setIsLoading(true);
        const login = await postLogin(userInfo.username, userInfo.password);
        window.localStorage.setItem("token", login.token);
        setAuth({ token: login.token });
        navigate("/");
      } catch (e) {
        console.error("Sign up error", e);
      }
    }
  }

  return (
    <div className="signup-container">
      <p className="signup-intro">
        Step into the world of limitless storytelling. <br />
        Create, share, and bring your cinematic dreams to reality with{" "}
        <span>MakeCine</span>.
      </p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <InputField
          id="username"
          value={userInfo.username}
          type="text"
          onChange={handleChange}
          label="Username"
        />
        <InputField
          id="password"
          value={userInfo.password}
          type="password"
          onChange={handleChange}
          label="Password"
        />
        <InputField
          id="firstname"
          value={userInfo.firstname}
          type="text"
          onChange={handleChange}
          label="First Name"
        />
        <InputField
          id="lastname"
          value={userInfo.lastname}
          type="text"
          onChange={handleChange}
          label="Last Name"
        />
        <InputField
          id="email"
          value={userInfo.email}
          type="email"
          onChange={handleChange}
          label="Email"
        />
        <Button type="submit" name="Sign Up" />
      </form>
    </div>
  );
}

export default SignupForm;
