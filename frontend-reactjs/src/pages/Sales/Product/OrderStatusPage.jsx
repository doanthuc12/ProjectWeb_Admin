import {
  Form,
  Button,
  Modal,
  Space,
  Table,
  Popconfirm,
  Select,
  Pagination,
} from "antd";
import React, { useState } from "react";
import axios from "axios";
// import numeral from "numeral";
import moment from "moment";

import Styles from "../../../pages/CommonPage.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";

export default function OrderStatusPage() {
  //Call API
  const [orders, setOrders] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedOrders, setSelectedOrders] = React.useState(null);

  //Refresh
  const [refresh, setRefresh] = React.useState(0);

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
        let totalPrice = 0;
        const orderDetailArr = orderDetails.map((item) => {
          const productPrice =
            item.productId.price *
            (1 - item.productId.discount / 100) *
            item.quantity;
          totalPrice += productPrice;

          return `Product: ${
            item.productId && item.productId.title.substr(0, 10)
          }${item.productId && item.productId.title.length > 10 ? "..." : ""}
          Product Price: ${item.productId.price}
            Quantity: ${item.quantity}
            Discount: ${item.productId && item.productId.discount}%
            Total Price: £${productPrice.toLocaleString("en-US")}
            `;
        });
        return (
          <div
            style={{
              whiteSpace: "nowrap",
              width: "170px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {orderDetailArr.map((item, index) => (
              <div
                style={{
                  borderBottom: "solid gray 0.3px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
                key={index}
              >
                {item.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            ))}
            <div style={{ color: "red" }}>
              Sum: £{totalPrice.toLocaleString("en-US")}
            </div>
          </div>
        );
      },
    },

    // ACTION
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            {/* BTN DELETE */}
            <Popconfirm
              style={{ width: 1000 }}
              title="Do you want to delete order?"
              description="Do you want to delete order?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                deleteOrders(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>

            {/* BTN EDIT */}
            <Popconfirm
              style={{ width: 1000 }}
              title="Do you want to edit order?"
              description="Do you want to edit order?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                selectOrders(record);
              }}
            >
              <Button type="dashed" icon={<EditOutlined />} />
            </Popconfirm>
          </Space>
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

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/orders", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
      // console.log(response.data);
    });
  };

  const onEditFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios
      .patch("http://localhost:9000/orders/" + selectedOrders._id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectOrders = (data) => {
    setEditModalVisible(true);
    setSelectedOrders(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const deleteOrders = (_id) => {
    axios.delete("http://localhost:9000/orders/" + _id).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
    });
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  // PAGINATION
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // change this value to the number of products you want to show per page
  });

  const handlePageChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
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
        {/* STATUS */}
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

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={orders.length}
        onChange={handlePageChange}
      />
      <br />

      {/* TABLE */}
      <Table
        className={Styles.table}
        dataSource={orders.slice(
          (pagination.current - 1) * pagination.pageSize,
          pagination.current * pagination.pageSize
        )}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Update Orders"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Close"
        okText="Save"
        onOk={() => {
          alert("Edit successful");
          updateForm.submit();
        }}
      >
        <Form
          form={updateForm}
          name="updateOrder"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          {/* STATUS */}
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please choose the payment type!",
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
        </Form>
      </Modal>
    </div>
  );
}
