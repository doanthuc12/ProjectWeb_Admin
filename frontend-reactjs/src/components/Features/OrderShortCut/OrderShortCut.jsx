import React from "react";
import axios from "axios";
import Styles from "./OrderShortCut.module.css";
import { Table } from "antd";
import moment from "moment";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function OrdersPage() {
  //Call API
  const [orders, setOrders] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
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
      title: "Ngày tạo đơn",
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
      title: "Ngày giao",
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
    // {
    //   title: "Nhân viên bán hàng",
    //   dataIndex: "employee",
    //   key: "employee",

    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ whiteSpace: "nowrap" }}>
    //         <strong>
    //           {record.employee.firstName + " " + record.employee.lastName}
    //         </strong>
    //       </div>
    //     );
    //   },
    // },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/orders/question/7").then((response) => {
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

  //   const [createForm] = Form.useForm();

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
    </div>
  );
}

export default OrdersPage;
