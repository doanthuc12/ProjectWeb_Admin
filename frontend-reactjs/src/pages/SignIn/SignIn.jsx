import React from "react";
import { Form, Input, Button, Checkbox, Divider, Select, message } from "antd";
import { useAuthStore } from "../../hooks/useAuthStore";
import logo from "../../images/logo.png";
import Styles from "./SignIn.module.css";

const LoginPage = () => {
  const { login } = useAuthStore((state) => state);

  const onFinish = async (values) => {
    const { email, password, roles } = values;
    try {
      await login({ email, password, roles });
      // message.success("Login success!");
    } catch (error) {
      console.log("Failed:", error);
      message.error("Login failed!");
      return;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Login failed!");
  };

  return (
    <React.Fragment>
      <h3>Login</h3>
      <Divider />
      <Form
        className={Styles.form}
        name="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ username: "", password: "", remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className={Styles.logo}>
          <img className={Styles.logo} src={logo} alt="logo asos" />
        </div>
        <div className={Styles.title}>Login to your Admin Page!</div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is empty!" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input placeholder="Please input email!" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is empty!" },
            {
              min: 6,
              max: 10,
              message: "Password length must be between 6 ~ 10 characters",
            },
          ]}
        >
          <Input.Password placeholder="Please input password!" />
        </Form.Item>

        {/* ROLES */}
        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            {
              required: true,
              message: "Please choose roles!",
            },
          ]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              {
                value: "administrator",
                label: "administrator",
              },
              {
                value: "manager",
                label: "manager",
              },
              {
                value: "shipper",
                label: "shipper",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ minWidth: 120 }}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default LoginPage;
