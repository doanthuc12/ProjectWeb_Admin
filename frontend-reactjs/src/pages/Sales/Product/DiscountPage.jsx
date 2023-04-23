import { Button, Form, Input, InputNumber, Table } from "antd";
import axios from "axios";
import numeral from "numeral";
import React from "react";

import Styles from "../../CommonPage.module.css";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";

export default function DiscountPage() {
  const [products, setProducts] = React.useState([]);
  // Columns of Antd Table
  const columns = [
    {
      title: "TT",
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
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Category</div>;
      },
      dataIndex: "branchId",
      key: "branchId",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.branchId?.name}</span>
          </div>
        );
      },
    },

    {
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Supplier</div>;
      },
      dataIndex: "supplier",
      key: "supplier",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <span>{record.supplier?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Product Name",
      key: "title",
      dataIndex: "title",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{text}</strong>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <strong>{numeral(text).format("0,0$")}</strong>
          </div>
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <strong>{numeral(text).format("0,0")}%</strong>
          </div>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "right" }}>
            <strong>{numeral(text).format("0,0")}</strong>
          </div>
        );
      },
    },
  ];

  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let { discount } = values;

    // CALL API TO CREATE CUSTOMER
    axios
      .get(
        "http://localhost:9000/products/question/1?discount=" + discount,
        values
      )
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
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
          label="Giới hạn mức Discount"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input discount!",
            },
          ]}
        >
          <InputNumber min={0} max={100} />
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
        dataSource={products}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
