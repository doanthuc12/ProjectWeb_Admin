import {
  DatabaseOutlined,
  HomeOutlined,
  SettingOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { label: "Trang chủ", key: "home", icon: <HomeOutlined /> }, // remember to pass the key prop
  { label: "Cấu hình", key: "settings", icon: <SettingOutlined /> }, // which is required
  {
    label: "Quản trị dữ liệu",
    key: "management",
    icon: <DatabaseOutlined />,
    children: [
      {
        label: "Khách hàng",
        key: "management/customers",
        children: [
          {
            label: "Danh sách khách hàng",
            key: "management/customers/list",
          },
          {
            label: "Lọc thông tin theo địa chỉ",
            key: "management/customers/address",
          },
          {
            label: "Lọc thông tin theo năm sinh",
            key: "management/customers/birthday",
          },
        ],
      },
      { label: "Sản phẩm", key: "management/products" },
    ],
  },
  {
    label: "Quản lý bán hàng",
    key: "sales",
    icon: <OrderedListOutlined />,
    children: [
      {
        label: "Sản phẩm",
        key: "sales/products",
        children: [
          {
            label: "Danh sách sản phẩm",
            key: "sales/products/list",
          },
          {
            label: "Kiểm tra hàng giảm giá",
            key: "sales/products/discount",
          },
          {
            label: "Kiểm tra hàng theo giá tổng",
            key: "sales/products/totalprice",
          },
          {
            label: "Kiểm tra hàng tồn kho",
            key: "sales/products/stock",
          },
        ],
      },
      {
        label: "Đơn hàng",
        key: "sales/orders",
        children: [
          {
            label: "Danh sách đơn hàng",
            key: "sales/orders/list",
          },
          {
            label: "Thông kê theo trạng thái",
            key: "sales/orders/status",
          },
          {
            label: "Thông kê theo thanh toán",
            key: "sales/orders/payment-status ",
          },
        ],
      },
    ],
  },
];

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        theme="dark"
        items={items}
        onClick={({ key }) => {
          navigate("/" + key);
          console.log(key);
        }}
      />
    </div>
  );
}
