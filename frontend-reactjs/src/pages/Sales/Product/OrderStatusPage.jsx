import { Button, Form, Table, Select } from "antd";
import axios from "axios";
// import numeral from "numeral";
import moment from "moment";
import React from "react";

import Styles from "../../../pages/CommonPage.module.css";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";

export default function OrderStatusPage() {
  const [orders, setOrders] = React.useState([]);

  // Columns of Antd Table
  const columns = [
    {
      title: "STT",
      key: "no",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <span>{index + 1}</span>
          </div>
        );
      },
    },
    // Status
    {
      title: "Status",
      key: "status",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.status}</span>
          </div>
        );
      },
    },
    // Created Date
    {
      title: "Created Date",
      key: "createdDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.createdDate).format("MMMM Do YYYY")}</span>
            {/* <strong>{record.createdDate}</strong> */}
          </div>
        );
      },
    },
    // Shipped Date
    {
      title: "Shipped Date",
      key: "shippedDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.shippedDate).format("MMMM Do YYYY")}</span>
          </div>
        );
      },
    },
    // Payment Type
    {
      title: "Payment Type",
      key: "paymentType",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.paymentType}</span>
          </div>
        );
      },
    },

    // CUSTOMER
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>
              {record.customer &&
                record.customer.firstName + " " + record.customer.lastName}
            </strong>
          </div>
        );
      },
    },

    // SHIPPING ADDRESS
    {
      title: "Shipping Information",
      dataIndex: "shippingAddress",
      key: "shippingAddress",

      render: (text, record, index) => {
        return (
          <div>
            <span>{record.shippingAddress}</span>
          </div>
        );
      },
    },

    // ORDER DETAIL
    {
      title: "Order Detail",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails, record) => {
        const orderDetailArr = orderDetails.map(
          (item) =>
            `Product: ${item.productId && item.productId.title.substr(0, 10)}${
              item.productId && item.productId.title.length > 10 ? "..." : ""
            }
            Quantity: ${item.quantity}
            Discount: ${item.productId && item.productId.discount}%`
        );
        return (
          <div
            style={{
              whiteSpace: "nowrap",
              width: "140px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {orderDetailArr.map((item, index) => (
              <div key={index}>
                {item.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let { status } = values;

    // CALL API TO CREATE ORDERS
    axios
      .get("http://localhost:9000/orders/question/7/1?status=" + status, values)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      });
  };

  return (
    <div>
      <div>
        <MultiButtonGroup />
      </div>
      <Form
        className={Styles.form}
        form={searchForm}
        name="search"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {/* FIRST NAME */}
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please input status!",
            },
          ]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              {
                value: "WAITING",
                label: "WAITING",
              },
              {
                value: "COMPLETED",
                label: "COMPLETED",
              },
              {
                value: "CANCELED",
                label: "CANCELED",
              },
            ]}
          />
        </Form.Item>

        {/* SUBMIT */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <Table
        className={Styles.table}
        rowKey="_id"
        dataSource={orders}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
