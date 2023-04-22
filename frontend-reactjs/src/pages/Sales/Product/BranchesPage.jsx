import React from "react";
import axios from "axios";
import { Form, Input, Button, Modal, Space, Table, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import Styles from "../../CommonPage.module.css";

import MultiButtonGroup from "../../../components/Features/MultiButtonGroup/MultiButtonGroup";

function BranchesPage() {
  //Call API
  const [branches, setBranches] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedBranches, setSelectedBranches] = React.useState(null);

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
      title: "Branch",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Popconfirm
              style={{ width: 1000 }}
              title="Do you want to delete this branch?"
              description="Do you want to delete this branch?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                deleteBranches(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectBranches(record)}
            />
          </Space>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios.get("http://localhost:9000/branches").then((response) => {
      // console.log(response.data);
      setBranches(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/branches", values).then((response) => {
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
      .patch("http://localhost:9000/branches/" + selectedBranches._id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectBranches = (data) => {
    setEditModalVisible(true);
    setSelectedBranches(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const deleteBranches = (id) => {
    axios.delete("http://localhost:9000/branches/" + id).then((response) => {
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
        form={createForm}
        className={Styles.form}
        name="create-branches"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {/* NAME OF BRANCH*/}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name of branch!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* DESCRIPTION */}
        {/* <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <Input />
        </Form.Item> */}

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
        dataSource={branches}
        columns={columns}
        pagination={false}
        rowKey="id"
      />

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Update branches"
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
          name="updateBranches"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name of branch!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}

export default BranchesPage;
