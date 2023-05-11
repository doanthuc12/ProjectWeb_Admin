import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { BsPersonCheck, BsBoxSeam, BsPerson } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import Styles from "./MainMenu.module.css";
import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";

const items = [
  { label: "Home Page", key: "home", icon: <HomeOutlined /> }, // remember to pass the key prop
  // CUSTOMERS
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
    ],
  },
  // PRODUCT
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
        label: "Branches",
        key: "sales/products/branches",
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
        label: "Product Name",
        key: "sales/products/name",
      },
      {
        label: "Stock",
        key: "sales/products/stock",
      },
    ],
  },
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
  // EMPLOYEES
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
  // SHIPPERS
  {
    label: "Shippers",
    key: "management/shippers",
    icon: <FaShippingFast />,
    children: [
      {
        label: "List of shippers",
        key: "management/shippers/list",
      },
    ],
  },
  { label: "Setting", key: "settings", icon: <SettingOutlined /> }, // which is required
];

export default function MainMenu() {
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
