import {
  HomeOutlined,
  SettingOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { BsPersonCheck, BsBoxSeam, BsPerson } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";

import Styles from "./MainMenu.module.css";
import React from "react";
import { Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { label: "Home Page", key: "home", icon: <HomeOutlined /> }, // remember to pass the key prop
  {
    label: "Customers",
    key: "management/customers",
    icon: <BsPersonCheck />,
    children: [
      {
        label: "List of customers",
        key: "management/customers/list",
      },
      {
        label: "Sort by address",
        key: "management/customers/address",
      },
      {
        label: "Sort by birthday",
        key: "management/customers/birthday",
      },
      // { label: "Products", key: "management/products" },
    ],
  },
  {
    label: "Products",
    key: "sales/products",
    icon: <BsBoxSeam />,
    children: [
      {
        label: "List of products",
        key: "sales/products/list",
      },
      {
        label: "Categories",
        key: "sales/products/categories",
      },
      {
        label: "Suppliers",
        key: "sales/products/suppliers",
      },
      {
        label: "On sale",
        key: "sales/products/discount",
      },
      {
        label: "Sort by total price",
        key: "sales/products/totalprice",
      },
      {
        label: "Stock",
        key: "sales/products/stock",
      },
    ],
  },
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
      {
        label: "Sort by total price",
        key: "sales/orders/payment-status ",
      },
    ],
  },
  {
    label: "Employees",
    key: "management/employees",
    icon: <BsPerson />,
    children: [
      {
        label: "List of employees",
        key: "management/employees/list",
      },
    ],
  },
  { label: "Setting", key: "settings", icon: <SettingOutlined /> }, // which is required
];

export default function MainMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  return (
    <div className={Styles.header}>
      <div className={Styles.logo_bg}>
        <span className={Styles.logo}>ASOS ADMIN</span>
      </div>

      <Menu
        className={Styles.menu}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        // theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={({ key }) => {
          navigate("/" + key);
          console.log(key);
        }}
      />
    </div>
  );
}
