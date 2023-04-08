import React from "react";
import axios from "axios";
import Styles from "./OrderShortCut.module.css";
import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Table,
  Popconfirm,
  Select,
} from "antd";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { MdPublishedWithChanges } from "react-icons/md";

function OrdersPage() {
  //Call API
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [shippers, setShippers] = React.useState([]);
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
        const formattedDate = moment(record.createdDate).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        return (
          <div>
            <strong>{formattedDate}</strong>
          </div>
        );
      },
    },
    {
      title: "Shipped Date",
      key: "shippedDate",
      render: (text, record, index) => {
        const formattedDate = moment(record.shippedDate).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        return (
          <div>
            <strong>{formattedDate}</strong>
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
      title: "Shipper",
      dataIndex: "shipperr",
      key: "shipper",

      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>
              {record.shipper.firstName + " " + record.shipper.lastName}
            </strong>
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
            {/* BTN DELETE */}
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
              title="Do you want to change status of order?"
              description="Do you want to change status of order?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                selectOrders(record);
              }}
            >
              <Button type="dashed" icon={<MdPublishedWithChanges />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/orders/question/7").then((response) => {
      // console.log(response.data);
      setOrders(response.data);
    });
  }, [refresh]);

  React.useEffect(() => {
    axios.get("http://localhost:9000/customers").then((response) => {
      // setCustomers(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/shippers").then((response) => {
      // console.log(response.data);
      setShippers(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then((response) => {
      // console.log(response.data);
      // setProducts(response.data);
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
          name="Status"
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
        </Form>
      </Modal>
    </div>
  );
}

export default OrdersPage;
