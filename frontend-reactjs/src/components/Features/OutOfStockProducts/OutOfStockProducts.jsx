import React, { useState } from "react";
import axios from "axios";
import Styles from "./OutOfStockProducts.module.css";
import { Table, Pagination } from "antd";

import numeral from "numeral";
import "numeral/locales/vi";

numeral.locale("vi");

function OutOfStockProductPage() {
  const [products, setProducts] = React.useState([]);

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
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Product Name</div>;
      },
      // title: "Product Name",
      dataIndex: "title",
      key: "title",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "wrap", width: "130px" }}>
            <strong>{text}</strong>
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

  React.useEffect(() => {
    axios
      .get("http://localhost:9000/products/question/2/1")
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data);
      });
  }, [refresh]);

  // PAGINATION
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // change this value to the number of products you want to show per page
  });

  const handlePageChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  return (
    <div style={{ width: "100%" }}>
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={products.length}
        onChange={handlePageChange}
        style={{ display: "flex", justifyContent: "center" }}
      />
      <br />

      {/* TABLE */}
      <Table
        className={Styles.table}
        dataSource={products.slice(
          (pagination.current - 1) * pagination.pageSize,
          pagination.current * pagination.pageSize
        )}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}

export default OutOfStockProductPage;
