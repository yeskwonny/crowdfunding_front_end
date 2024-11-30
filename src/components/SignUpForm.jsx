import { useState } from "react";
import postSignUp from "../api/post-signup";
import postLogin from "../api/post-login";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
function SignupForm() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

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
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          value={userInfo.username}
        ></input>

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          value={userInfo.password}
          onChange={handleChange}
        ></input>

        <label htmlFor="firstname">First name :</label>
        <input
          type="text"
          id="firstname"
          onChange={handleChange}
          value={userInfo.firstname}
        ></input>

        <label htmlFor="lastname">Last name :</label>
        <input
          type="text"
          id="lastname"
          onChange={handleChange}
          value={userInfo.lastname}
        ></input>

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          onChange={handleChange}
          value={userInfo.email}
        ></input>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign up
      </button>
    </form>
  );
}

export default SignupForm;
