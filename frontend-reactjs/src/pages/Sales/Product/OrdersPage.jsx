import React from "react";
import axios from "axios";
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
  TreeSelect,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Styles from "../../CommonPage.module.css";

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
      title: "Ngày tạo đơn",
      key: "createdDate",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{record.createdDate}</strong>
          </div>
        );
      },
    },
    {
      title: "Ngày giao",
      key: "shippedDate",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{record.shippedDate}</strong>
          </div>
        );
      },
    },
    {
      title: "Hình thức thanh toán",
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
      title: "Tình trạng đơn",
      key: "status",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.status}</span>
          </div>
        );
      },
    },
    {
      title: "Mô tả",
      key: "description",
      render: (text, record, index) => {
        return (
          <div>
            <span>{record.description}</span>
          </div>
        );
      },
    },
    {
      title: "Khách hàng",
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
      title: "Nhân viên bán hàng",
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
      title: "Thông tin giao hàng",
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
      title: "Nội dung đơn hàng",
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
              okText="Đồng ý"
              cancelText="Đóng"
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
              okText="Đồng ý"
              cancelText="Đóng"
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
          label="Ngày tạo đơn"
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
          label="Ngày giao"
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
          label="Tình trạng đơn"
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
          label="Mô tả"
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
          label="Hình thức thanh toán"
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
          label="Địa chỉ giao"
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
          label="Khách hàng"
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
          label="Nhân viên bán hàng"
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
          label="Sản phẩm"
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
          label="Sản phẩm"
          name="product"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn sản phẩm",
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
            Lưu thông tin
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
        cancelText="Đóng"
        okText="Lưu thông tin"
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
            label="Ngày tạo đơn"
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
            label="Ngày giao"
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
            label="Tình trạng đơn"
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
            label="Mô tả"
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
            label="Hình thức thanh toán"
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
            label="Địa chỉ giao"
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
            label="Khách hàng"
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
            label="Nhân viên bán hàng"
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
          label="Nội dung đơn hàng"
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
            label="Sản phẩm"
            name="product"
            rules={[
              {
                required: true,
                message: "Vui lònng chọn sản phẩm",
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
