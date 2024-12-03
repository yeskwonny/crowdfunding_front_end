import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
// hooks
import postSignUp from "../api/post-signup";
import postLogin from "../api/post-login";

//component
import InputField from "./InputField";
import Button from "./Button";

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
    if (userInfo.username && userInfo.password)
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
  return (
    <form>
      <div>
        <InputField
          id="username"
          value={userInfo.username}
          type="text"
          onChange={handleChange}
          label="username"
        />

        <InputField
          id="password"
          value={userInfo.password}
          type="password"
          onChange={handleChange}
          label="password"
        />
        <InputField
          id="firstname"
          value={userInfo.firstname}
          type="text"
          onChange={handleChange}
          label="firstname"
        />
        <InputField
          id="lastname"
          value={userInfo.lastname}
          type="text"
          onChange={handleChange}
          label="lastname"
        />

        <InputField
          id="email"
          value={userInfo.email}
          type="email"
          onChange={handleChange}
          label="email"
        />
      </div>
      <Button type="submit" name="sign up" onClick={handleSubmit}></Button>
    </form>
  );
}

export default SignupForm;
