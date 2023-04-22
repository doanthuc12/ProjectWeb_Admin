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
  DatePicker,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Styles from "../CommonPage.module.css";

import MultiButtonGroup from "../../components/Features/MultiButtonGroup/MultiButtonGroup";

function ShipperPage() {
  //Call API
  const [shippers, setShippers] = React.useState([]);

  //Select shipper
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedShippers, setSelectedShippers] = React.useState(null);

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
      title: "Full of name",
      key: "fullName",
      render: (text, record, index) => {
        return (
          <div>
            <span>
              {record.firstName} {record.lastName}
            </span>
          </div>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date of birth",
      key: "birthday",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(record.birthday).format("MMMM Do YYYY")}</span>
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
              title="Do you want to delete this shipper?"
              description="Do you want to delete this shipper?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                deleteShippers(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectShippers(record)}
            ></Button>
          </Space>
        );
      },
    },
  ];

  //Phone Number
  // const { Option } = Select;
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="84">+84</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );

  React.useEffect(() => {
    axios.get("http://localhost:9000/shippers").then((response) => {
      // console.log(response.data);
      setShippers(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/shippers", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
      console.log(response.data);
    });
  };

  const onEditFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE SHIPPER
    axios
      .patch("http://localhost:9000/shippers/" + selectedShippers._id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectShippers = (data) => {
    setEditModalVisible(true);
    setSelectedShippers(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const deleteShippers = (id) => {
    axios.delete("http://localhost:9000/shippers/" + id).then((response) => {
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
        name="create-shipper"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {/* LAST NAME */}
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* FIRST NAME */}
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input your valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* ADDRESS */}
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PHONE NUMBER */}
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              type: "text",
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
          {/* <InputNumber addonBefore={prefixSelector} style={{ width: "100%" }} /> */}
        </Form.Item>

        <Form.Item
          label="Date of birth"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Please choose your birthday!",
            },
          ]}
        >
          <DatePicker />
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
        dataSource={shippers}
        columns={columns}
        pagination={false}
        rowKey="id"
      />

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Update shipper"
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
          name="updateShippers"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          {/* LAST NAME */}
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* FIRST NAME */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* EMAIL */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please input your valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PHONE NUMBER */}
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                type: "text",
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            {/* <InputNumber
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
            /> */}
            <Input />
          </Form.Item>

          {/* ADDRESS */}
          <Form.Item
            label="Address"
            name="address"
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

          {/* BIRTHDAY */}
          <Form.Item
            label="Date of birth"
            name="birthday"
            rules={[
              {
                type: "text",
                required: true,
                message: "Please input your birthday!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ShipperPage;
