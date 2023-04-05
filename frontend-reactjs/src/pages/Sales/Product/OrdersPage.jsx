import React from "react";
import axios from "axios";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Table,
  Popconfirm,
  DatePicker,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Styles from "../../CommonPage.module.css";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";
function OrdersPage() {
  //Call API
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedOrders, setSelectedOrders] = React.useState(null);

  //Refresh
  const [refresh, setRefresh] = React.useState(0);

  //columns of antd table
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
    //   title: "Description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     return (
    //       <div>
    //         <span>{record.description}</span>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>
              {record.customer.firstName + " " + record.customer.lastName}
            </strong>
          </div>
        );
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>
              {record.employee.firstName + " " + record.employee.lastName}
            </strong>
          </div>
        );
      },
    },
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
    {
      title: "Order Detail",
      dataIndex: "orderDetails",
      key: "orderDetails",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>{record.orderDetails.productId}</strong>
          </div>
        );
      },
    },
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Popconfirm
              style={{ width: 1000 }}
              title="Bạn muốn xoá đơn hàng này?"
              description="Bạn muốn xoá đơn hàng này?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                deleteOrders(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>

            <Popconfirm
              style={{ width: 1000 }}
              title="Bạn muốn sửa đơn hàng này?"
              description="Bạn muốn sửa đơn hàng này?"
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

  React.useEffect(() => {
    axios.get("http://localhost:9000/orders").then((response) => {
      // console.log(response.data);
      setOrders(response.data);
    });
  }, [refresh]);

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

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/orders", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
      console.log(response.data);
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

  return (
    <div>
      <div>
        <MultiButtonGroup />
      </div>
      <Form
        className={Styles.form}
        form={createForm}
        name="create-orders"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {/* createdDate */}
        <Form.Item
          label="Created Date"
          name="createdDate"
          rules={[
            {
              required: true,
              message: "Please choose the created date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        {/* shippedDate */}
        <Form.Item
          label="Shipped Date"
          name="shippedDate"
          rules={[
            {
              required: true,
              message: "Please choose the shipped date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

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

        {/* DESCRIPTION */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              type: "text",
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PAYMENT */}
        <Form.Item
          label="Payment Type"
          name="paymentType"
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
                value: "CASH",
                label: "CASH",
              },
              {
                value: "CREDIT CARD",
                label: "CREDIT CARD",
              },
            ]}
          />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item
          label="Shipping Address"
          name="shippingAddress"
          rules={[
            {
              type: "text",
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* CUSTOMER */}
        <Form.Item
          label="Customer"
          name="customerId"
          rules={[
            {
              required: true,
              message: "Please choose customer!",
            },
          ]}
        >
          <Select
            options={
              customers &&
              customers.map((c) => {
                return {
                  value: c._id,
                  label: c.fullName,
                };
              })
            }
          />
        </Form.Item>

        {/* EMPLOYEE */}
        <Form.Item
          label="Employee"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Please choose employee!",
            },
          ]}
        >
          <Select
            options={
              employees &&
              employees.map((c) => {
                return {
                  value: c._id,
                  label: c.fullName,
                };
              })
            }
          />
        </Form.Item>

        {/* ORDER_DETAILS */}
        {/* <Form.Item
          label="Product"
          name="orderDetails"
          rules={[
            {
              required: true,
              message: "Please choose employee!",
            },
          ]}
        >
          <Select
            options={
              employees &&
              employees.map((c) => {
                return {
                  value: c._id,
                  label: c.fullName,
                };
              })
            }
          />
        </Form.Item> */}

        <Form.Item
          label="Product"
          name="product"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Product",
            },
          ]}
        >
          <Select
            options={
              products &&
              products.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                };
              })
            }
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
            Save
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <Table
        className={Styles.table}
        dataSource={orders}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Update orders"
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
          name="updateOrders"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          {/* createdDate */}
          <Form.Item
            label="Created Date"
            name="createdDate"
            rules={[
              {
                type: "date",
                required: true,
                message: "Please choose the created date!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* shippedDate */}
          <Form.Item
            label="Shipped Date"
            name="shippedDate"
            rules={[
              {
                type: "date",
                required: true,
                message: "Please choose the shipped date!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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

          {/* DESCRIPTION */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                type: "text",
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PAYMENT */}
          <Form.Item
            label="Payment Type"
            name="paymentType"
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
                  value: "CASH",
                  label: "CASH",
                },
                {
                  value: "CREDIT CARD",
                  label: "CREDIT CARD",
                },
              ]}
            />
          </Form.Item>

          {/* ADDRESS */}
          <Form.Item
            label="Shipping Address"
            name="shippingAddress"
            rules={[
              {
                type: "text",
                required: false,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* CUSTOMER */}
          <Form.Item
            label="Customer"
            name="customerId"
            rules={[
              {
                required: true,
                message: "Please choose customer!",
              },
            ]}
          >
            <Select
              options={
                customers &&
                customers.map((c) => {
                  return {
                    value: c._id,
                    label: c.fullName,
                  };
                })
              }
            />
          </Form.Item>

          {/* EMPLOYEE */}
          <Form.Item
            label="Employee"
            name="employeeId"
            rules={[
              {
                required: true,
                message: "Please choose employee!",
              },
            ]}
          >
            <Select
              options={
                employees &&
                employees.map((c) => {
                  return {
                    value: c._id,
                    label: c.fullName,
                  };
                })
              }
            />
          </Form.Item>

          {/* ORDER_DETAILS */}
          {/* <Form.Item
          label="Order Detail"
          name="employee"
          rules={[
            {
              required: true,
              message: "Please choose employee!",
            },
          ]}
        >
          <TreeSelect
            treeData={[
              {
                title: "productId",
                value: "productId",
                children: [{ title: "Bamboo", value: "bamboo" }],
              },
            ]}
          />
        </Form.Item> */}
          <Form.Item
            label="Product"
            name="product"
            rules={[
              {
                required: true,
                message: "Vui lònng chọn Product",
              },
            ]}
          >
            <Select
              options={
                products &&
                products.map((c) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OrdersPage;
