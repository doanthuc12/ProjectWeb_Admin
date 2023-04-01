import React from "react";
import axios from "axios";
import moment from "moment";
import { Form, Input, Button, Modal, Space, Table, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Styles from "../CommonPage.module.css";

function CustomerPage() {
  //Call API
  const [customers, setCustomers] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

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
      title: "Họ và tên",
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
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thư điện tử",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày sinh",
      key: "birthday",
      render: (text, record, index) => {
        return (
          <div>
            <span>{moment(text).format("MMMM Do YYYY")}</span>
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
              title="Bạn muốn xoá khách hàng này?"
              description="Bạn muốn xoá khách hàng này?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={() => {
                deleteCustomers(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectCustomers(record)}
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
    axios.get("http://localhost:9000/customers").then((response) => {
      // console.log(response.data);
      setCustomers(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/customers", values).then((response) => {
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
      .patch("http://localhost:9000/customers/" + selectedCustomer.id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectCustomers = (data) => {
    setEditModalVisible(true);
    setSelectedCustomer(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const deleteCustomers = (id) => {
    axios.delete("http://localhost:9000/customers/" + id).then((response) => {
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
        name="create-customer"
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
          label="Tên"
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
          label="Họ"
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
          label="Thư điện tử"
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
          label="Địa chỉ"
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
          label="Số điện thoại"
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

        {/* BIRTHDAY */}
        <Form.Item
          label="Ngày sinh (mm/dd/yyyy)"
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
        dataSource={customers}
        columns={columns}
        pagination={false}
        rowKey="id"
      />

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
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
          name="updateCustomers"
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
            label="Tên"
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
            label="Họ"
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
            label="Thư điện tử"
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
            label="Số điện thoại"
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
            label="Địa chỉ"
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
            {/* <InputNumber
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
            /> */}
          </Form.Item>

          {/* BIRTHDAY */}
          <Form.Item
            label="Ngày sinh"
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

export default CustomerPage;
