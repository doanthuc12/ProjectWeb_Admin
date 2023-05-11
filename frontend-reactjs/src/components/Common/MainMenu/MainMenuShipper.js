import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { FiShoppingBag } from "react-icons/fi";
import Styles from "./MainMenu.module.css";
import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";

const items = [
  { label: "Home Page", key: "home", icon: <HomeOutlined /> }, // remember to pass the key prop

  // ORDERS
  {
    label: "Orders",
    key: "sales/orders",
    icon: <FiShoppingBag />,
    children: [
      {
        label: "List of orders",
        key: "sales/orders/list",
      },
      {
        label: "Sort by status",
        key: "sales/orders/status",
      },
      // {
      //   label: "Sort by customer's name",
      //   key: "/sales/orders/customerName",
      // },
    ],
  },

  { label: "Setting", key: "settings", icon: <SettingOutlined /> }, // which is required
];

export default function MainMenuShipper() {
  const navigate = useNavigate();

  return (
    <div className={Styles.header}>
      <div className={Styles.logo_bg}>
        <img src={logo} alt="logo" />
      </div>

      <Menu
        className={Styles.menu}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        onClick={({ key }) => {
          navigate("/" + key);
          console.log(key);
        }}
      />
    </div>
  );
}
