import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Table,
  InputNumber,
  Popconfirm,
  DatePicker,
  Select,
  Pagination,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import Styles from "../../CommonPage.module.css";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";
function OrdersPage() {
  //Call API
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [shippers, setShippers] = React.useState([]);
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
    // CREATED DATE
    {
      title: "Created Date",
      key: "createdDate",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.createdDate).format("MMMM Do YYYY")}</span>
          </div>
        );
      },
    },
    // SHIPPED DATE
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
    // PAYMENT TYPE
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
    // STATUS
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
    // SHIPPER
    {
      title: "Shipper",
      dataIndex: "shipper",
      key: "shipper",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>
              {record.shipper &&
                record.shipper.firstName + " " + record.shipper.lastName}
            </strong>
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

  React.useEffect(() => {
    axios.get("http://localhost:9000/shippers").then((response) => {
      // console.log(response.data);
      setShippers(response.data);
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);
    message.success("Submit success!");

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
    pageSize: 10, // change this value to the number of products you want to show per page
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

        {/* ORDER DETAIL */}
        <Form.Item label="Order Detail" name="orderDetails">
          <Form.List name="orderDetails">
            {(productFields, { add: addDetail, remove: removeDetail }) => (
              <>
                {productFields.map((productField, index) => (
                  <div key={productField.key}>
                    {/* PRODUCT */}
                    <Form.Item
                      label="Product"
                      name={[productField.name, "productId"]}
                      rules={[{ required: true, message: "Pick one product!" }]}
                    >
                      <Select
                        options={
                          products &&
                          products.map((c) => {
                            return {
                              value: c._id,
                              label: c.title,
                              // discount: c.discount,
                            };
                          })
                        }
                      />
                    </Form.Item>

                    {/* QUANTITY */}
                    <Form.Item
                      label="Quantity"
                      name={[productField.name, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the quantity!",
                        },
                      ]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>

                    {/* BTN DELETE */}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        onClick={() => removeDetail(productFields.name)}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    </Form.Item>
                  </div>
                ))}
                {/* BTN ADD*/}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    onClick={() => addDetail()}
                    icon={<PlusCircleOutlined />}
                  >
                    Add order detail
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        {/* SHIPPER */}
        <Form.Item
          label="Shipper"
          name="shipperId"
          rules={[
            {
              required: true,
              message: "Please choose shipper!",
            },
          ]}
        >
          <Select
            options={
              shippers &&
              shippers.map((c) => {
                return {
                  value: c._id,
                  label: c.fullName,
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

          {/* ORDER DETAIL */}
          <Form.Item label="Order Detail" name="orderDetails">
            <Form.List name="orderDetails">
              {(productFields, { add: addDetail, remove: removeDetail }) => (
                <>
                  {productFields.map((productField, index) => (
                    <div key={productField.key}>
                      {/* PRODUCT */}
                      <Form.Item
                        label="Product"
                        name={[productField.name, "productId"]}
                        rules={[
                          { required: true, message: "Pick one product!" },
                        ]}
                      >
                        <Select
                          options={
                            products &&
                            products.map((c) => {
                              return {
                                value: c._id,
                                label: c.title,
                              };
                            })
                          }
                        />
                      </Form.Item>

                      {/* QUANTITY */}
                      <Form.Item
                        label="Quantity"
                        name={[productField.name, "quantity"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input the quantity!",
                          },
                        ]}
                      >
                        <InputNumber min={0} />
                      </Form.Item>

                      {/* BTN DELETE */}
                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                          onClick={() => removeDetail(productFields.name)}
                          icon={<DeleteOutlined />}
                        >
                          Delete
                        </Button>
                      </Form.Item>
                    </div>
                  ))}
                  {/* BTN ADD*/}
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      onClick={() => addDetail()}
                      icon={<PlusCircleOutlined />}
                    >
                      Add order detail
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          {/* SHIPPER */}
          <Form.Item
            label="Shipper"
            name="shipperId"
            rules={[
              {
                required: true,
                message: "Please choose shipper!",
              },
            ]}
          >
            <Select
              options={
                shippers &&
                shippers.map((c) => {
                  return {
                    value: c._id,
                    label: c.fullName,
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
