import React, { useState } from "react";
import Styles from "./SignIn.module.css";
import logo from "../../images/logo.png";
import { Button, Checkbox, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function SignIn({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("success");
        // Redirect to homepage here
        window.location.href = "/home";
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
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

          <Form
            className={Styles.form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onSubmit={handleSubmit}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please input your valid email!",
                },
              ]}
            >
              <Input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
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
