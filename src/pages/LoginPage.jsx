import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSvg from "../assets/images/LogoSvg";
import styles from "./LoginPage.module.css";
import { authentication } from "../apis/authenticationApi";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const onLoginUser = async (e) => {
    e.preventDefault();
    if (userName && password) {
      await authentication.loginUser(userName, password);
      navigation("/home");
    } else {
      alert("Please enter your username and password");
    }
  };

  return (
    <div className={styles.main_container}>
      <LogoSvg />
      <form className={styles.form_container} onSubmit={onLoginUser}>
        <p>User Name</p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
