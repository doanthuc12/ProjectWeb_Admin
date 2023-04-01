import React from "react";
import axios from "axios";
import Styles from "./OutOfStockProducts.module.css";
import { Table } from "antd";

import numeral from "numeral";
import "numeral/locales/vi";

numeral.locale("vi");

function ProductPage() {
  //Call API
  const [categories, setCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
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
    // {
    //   title: "Danh mục",
    //   dataIndex: "category",
    //   key: "category",
    //   with: "1%",
    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ whiteSpace: "nowrap" }}>
    //         <strong>{record.category.name}</strong>
    //       </div>
    //     );
    //   },
    // },
    {
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Tên sản phẩm</div>;
      },
      // title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{text}</strong>
          </div>
        );
      },
    },
    // {
    //   title: "Nhà cung cấp",
    //   dataIndex: "supplier",
    //   key: "supplier",
    //   render: (text, record, index) => {
    //     return (
    //       <div>
    //         <strong>{record.supplier.name}</strong>
    //       </div>
    //     );
    //   },
    // },

    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{numeral(text).format("0,0")}</strong>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/categories").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/suppliers").then((response) => {
      // console.log(response.data);
      setSuppliers(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios
      .get("http://localhost:9000/products/question/2/1")
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data);
      });
  }, [refresh]);

  return (
    <div style={{ width: "100%" }}>
      {/* TABLE */}
      <Table
        className={Styles.table}
        dataSource={products}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}

export default ProductPage;
