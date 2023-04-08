import { Button, Form, Input, Space, Table } from "antd";
import axios from "axios";
// import numeral from "numeral";
import moment from "moment";
import React from "react";

import Styles from "../CommonPage.module.css";

import MultiButtonGroup from "../../components/Features/MultiButtonGroup/MultiButtonGroup";

export default function CustomerAddressPage() {
  const [customers, setCustomers] = React.useState([]);
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
        return <Space></Space>;
      },
    },
  ];

  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let { address } = values;
    // let { discount } = values;

    // CALL API TO CREATE CUSTOMER
    axios
      .get(
        "http://localhost:9000/customers/question/4/1?address=" + address,
        values
      )
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
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
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input address!",
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
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>

      {/* TABLE */}
      <Table
        className={Styles.table}
        rowKey="_id"
        dataSource={customers}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
