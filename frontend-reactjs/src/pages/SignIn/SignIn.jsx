import React, { useState } from "react";

// import garena from "../images/garena.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Styles from "./SignIn.module.css";
import logo from "../../images/logo.png";
import { Button, Checkbox, Form, Input } from "antd";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/auth/login-jwt", {
        email: email,
        password: password,
      })
      .then(
        (response) => {
          navigate("/home");
          console.log(response);
          alert("Success Password!!!");
        },
        (error) => {
          console.log(error);
          alert("Wrong Password!!!");
        }
      );
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <div className={Styles.surrounding}>
      <div className={Styles.container}>
        <div className={Styles.logo}>
          <img src={logo} alt="logo asos" />
        </div>

        <div className={Styles.main}>
          <div className={Styles.option}>
            <div className={Styles.titleJ}>Log in to your Admin Page!</div>
          </div>
          <div className={Styles.form}>
            <form className={Styles.input} onSubmit={handleSubmit}>
              <p className={Styles.label_input}>Email</p>

              <input
                className={Styles.input_item}
                type="text"
                name="email"
                value={email ? email : ""}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <p className={Styles.label_input}>Password</p>

              <input
                className={Styles.input_item}
                type="password"
                onChange={handleChange}
                value={password ? password : ""}
                name="password"
                placeholder="Enter your Password"
              />
              <br />
              <button
                style={{ marginBottom: "15px", backgroundColor: "#5ece76" }}
                className={Styles.button}
              >
                Login
              </button>

              <button
                style={{ marginBottom: "15px", backgroundColor: "#65b4d3" }}
                className={Styles.button}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={Styles.footer}>
        <div className={Styles.label}>
          <a href="#">Privacy Policy</a>
          <a style={{ padding: "5px" }}>|</a>
          <a href="#">Term and Conditions</a>
        </div>
      </div>
    </div>
  );
}
