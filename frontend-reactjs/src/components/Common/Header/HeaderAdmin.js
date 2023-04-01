import React from "react";
import Styles from "./HeaderAdmin.module.css";

import { UserOutlined } from "@ant-design/icons";
import { BiEditAlt } from "react-icons/bi";
import { GrContact } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { Dropdown, Space, message } from "antd";

const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};
const items = [
  {
    label: "My account",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Edit Profile",
    key: "2",
    icon: <BiEditAlt />,
  },
  {
    label: "Inbox",
    key: "3",
    icon: <GrContact />,
  },
  {
    label: "Logout",
    key: "4",
    icon: <FiLogOut />,
    danger: true,
    disabled: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const HeaderAdmin = () => {
  return (
    <Space wrap>
      <Dropdown.Button
        menu={menuProps}
        placement="bottom"
        icon={<UserOutlined />}
      >
        Info
      </Dropdown.Button>
    </Space>
  );
};

export default HeaderAdmin;
