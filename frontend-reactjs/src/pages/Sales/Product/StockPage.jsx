import { Button, Form, InputNumber, Table, Pagination } from "antd";
import axios from "axios";
import numeral from "numeral";
import React, { useState } from "react";

import Styles from "../../CommonPage.module.css";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";

export default function StockPage() {
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
        return <div style={{ whiteSpace: "nowrap" }}>Branch</div>;
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
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{record.supplier && record.supplier.name}</strong>
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
      title: "Sizes/Stock",
      dataIndex: "sizes",
      key: "sizes",
      render: (sizes, record) => {
        const sizeStockArr = sizes.map(
          (item) => `${item.size}/${numeral(item.stock).format("0,0")}`
        );
        return (
          <div>
            {sizeStockArr.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        );
      },
    },
  ];

  const [searchForm] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    let { stock } = values;

    // CALL API TO CREATE CUSTOMER
    axios
      .get("http://localhost:9000/products/question/2/1?stock=" + stock, values)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  };

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
      {/* FORM */}
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
        <Form.Item
          label="Input maximum stock!"
          name="stock"
          rules={[
            {
              required: true,
              message: "Please input stock!",
            },
          ]}
        >
          <InputNumber min={0} />
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
        total={products.length}
        onChange={handlePageChange}
      />
      <br />
      {/* TABLE */}
      <Table
        className={Styles.table}
        rowKey="_id"
        dataSource={products.slice(
          (pagination.current - 1) * pagination.pageSize,
          pagination.current * pagination.pageSize
        )}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}
