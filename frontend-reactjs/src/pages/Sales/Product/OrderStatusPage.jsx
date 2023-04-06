import { Button, Form, Table, Select } from "antd";
import axios from "axios";
// import numeral from "numeral";
import moment from "moment";
import React from "react";

import Styles from "../../../pages/CommonPage.module.css";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";

export default function OrderStatusPage() {
  const [products, setProducts] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);

  //Select customer
  // const [editModalVisible, setEditModalVisible] = React.useState(false);
  // const [selectedOrders, setSelectedOrders] = React.useState(null);

  //Refresh
  // const [refresh, setRefresh] = React.useState(0);

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
    // {
    //   title: "Customer",
    //   dataIndex: "customer",
    //   key: "customer",

    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ whiteSpace: "nowrap" }}>
    //         <strong>
    //           {record.customer.firstName + " " + record.customer.lastName}
    //         </strong>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Employee",
    //   dataIndex: "employee",
    //   key: "employee",

    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ whiteSpace: "nowrap" }}>
    //         <strong>
    //           {record.employee.firstName + " " + record.employee.lastName}
    //         </strong>
    //       </div>
    //     );
    //   },
    // },
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
    // {
    //   title: "Order Detail",
    //   dataIndex: "orderDetails",
    //   key: "orderDetails",

    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ whiteSpace: "nowrap" }}>
    //         <strong>{record.orderDetails.productId}</strong>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "",
    //   key: "action",
    //   width: "1%",
    //   render: (text, record, index) => {
    //     return (
    //       <Space>
    //         <Popconfirm
    //           style={{ width: 1000 }}
    //           title="Bạn muốn xoá đơn hàng này?"
    //           description="Bạn muốn xoá đơn hàng này?"
    //           okText="Accept"
    //           cancelText="Close"
    //           onConfirm={() => {
    //             deleteOrders(record._id);
    //           }}
    //         >
    //           <Button danger type="dashed" icon={<DeleteOutlined />} />
    //         </Popconfirm>

    //         <Popconfirm
    //           style={{ width: 1000 }}
    //           title="Bạn muốn sửa đơn hàng này?"
    //           description="Bạn muốn sửa đơn hàng này?"
    //           okText="Accept"
    //           cancelText="Close"
    //           onConfirm={() => {
    //             selectedOrders(record);
    //           }}
    //         >
    //           <Button type="dashed" icon={<EditOutlined />} />
    //         </Popconfirm>
    //       </Space>
    //     );
    //   },
    // },
  ];

  // React.useEffect(() => {
  //   axios.get("http://localhost:9000/orders").then((response) => {
  //     // console.log(response.data);
  //     setOrders(response.data);
  //   });
  // }, [refresh]);

  React.useEffect(() => {
    axios.get("http://localhost:9000/customers").then((response) => {
      setCustomers(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/employees").then((response) => {
      // console.log(response.data);
      setEmployees(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then((response) => {
      // console.log(response.data);
      setProducts(response.data);
    });
  }, []);

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
