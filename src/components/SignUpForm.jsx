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
  const [error, setError] = useState({});
  console.log(error);

  function handleChange(e) {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
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

    if (!userInfo.username || userInfo.username.length < 3) {
      validationMsg.username = "Username must be at least 3 characters long";
    }

    if (!userInfo.password || userInfo.username.length < 3) {
      validationMsg.password = "Password must be at least 3 characters long";
    }

    if (
      !userInfo.firstname ||
      userInfo.firstname.length < 2 ||
      /\d/.test(userInfo.firstname)
    ) {
      validationMsg.firstname =
        "Firstname must be at least 2 characters long and cannot contain numbers";
    }

    if (
      !userInfo.lastname ||
      userInfo.lastname.length < 2 ||
      /\d/.test(userInfo.lastname)
    ) {
      validationMsg.lastname =
        "Lastname must be at least 2 characters long and cannot contain numbers";
    }

    if (!userInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      validationMsg.email = "Please enter a valid email address";
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
    if (userInfo.username && userInfo.password) {
      try {
        const response = await postSignUp(
          userInfo.username,
          userInfo.password,
          userInfo.email,
          userInfo.firstname,
          userInfo.lastname
        );
        console.log(response);
        setIsLoading(true);
        const login = await postLogin(userInfo.username, userInfo.password);
        window.localStorage.setItem("token", login.token);
        setAuth({ token: login.token });
        navigate("/");
      } catch (e) {
        console.error("Sign up error", e);
        if (e.username || e.email) {
          setError(e);
        } else {
          setResultMsg("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
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
        {error.username && <p className="error-msg">{error.username}</p>}

        <InputField
          id="password"
          value={userInfo.password}
          type="password"
          onChange={handleChange}
          label="Password"
        />
        {error.password && <p className="error-msg">{error.password}</p>}

        <InputField
          id="firstname"
          value={userInfo.firstname}
          type="text"
          onChange={handleChange}
          label="First Name"
        />
        {error.firstname && <p className="error-msg">{error.firstname}</p>}

        <InputField
          id="lastname"
          value={userInfo.lastname}
          type="text"
          onChange={handleChange}
          label="Last Name"
        />
        {error.lastname && <p className="error-msg">{error.lastname}</p>}

        <InputField
          id="email"
          value={userInfo.email}
          type="email"
          onChange={handleChange}
          label="Email"
        />
        {error.email && <p className="error-msg">{error.email}</p>}

        <Button
          type="submit"
          name={isLoading ? "Signing up..." : "Sign Up"}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}

export default SignupForm;
