import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Modal,
  Space,
  Table,
  InputNumber,
  Select,
  Popconfirm,
  Pagination,
  Upload,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";

import Styles from "../CommonPage.module.css";
import MultiButtonGroup from "../../components/Features/MultiButtonGroup/MultiButtonGroup";

numeral.locale("vi");

function ProductPage() {
  //Call API
  const [branches, setBranches] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  // const [colors, setColors] = React.useState([]);
  // const [sizes, setSizes] = React.useState([]);

  //Select customer
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  //Refresh
  const [refresh, setRefresh] = React.useState(0);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  //columns of antd table
  const columns = [
    {
      title: "STT",
      key: "no",
      width: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "middle" }}>
            <span>{index + 1}</span>
          </div>
        );
      },
    },
    // BRANCH
    {
      title: "Branch",
      dataIndex: "branchId",
      key: "branchId",
      with: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>{record.branchId && record.branchId.name}</strong>
          </div>
        );
      },
    },
    // IMAGE
    {
      title: "Picture",
      key: "imageUrl",
      dataIndex: "imageUrl",
      width: "1%",
      render: (text, record, index) => {
        return (
          <img src={"http://localhost:9000" + text} style={{ height: 60 }} />
        );
      },
    },

    // PRODUCT NAME
    {
      title: () => {
        return <div style={{ whiteSpace: "nowrap" }}>Product Name</div>;
      },
      dataIndex: "title",
      key: "title",
      render: (text, record, index) => {
        return (
          <p style={{ whiteSpace: "wrap", width: "120px" }}>
            <strong>{text}</strong>
          </p>
        );
      },
    },
    // SUPPLIER
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
    // PRICE
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return (
          <div>
            <strong>£{numeral(text).format("0")}</strong>
          </div>
        );
      },
    },
    // DISCOUNT
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{numeral(text).format("0,0")}%</strong>
          </div>
        );
      },
    },
    // SIZES/STOCK
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
    // ACTION
    {
      title: "",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Upload
              showUploadList={false}
              name="file"
              action={
                "http://localhost:9000/upload/products/" + record._id + "/image"
              }
              headers={{ authorization: "authorization-text" }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }

                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );

                  setRefresh((f) => f + 1);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />} />
            </Upload>

            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => selectProducts(record)}
            />
            <Popconfirm
              style={{ width: 1000 }}
              title="Do you want to delete this product?"
              description="Do you want to delete this product?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                deleteProducts(record._id);
              }}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>

            <Popconfirm
              style={{ width: 1000 }}
              title="Do you want to edit this product?"
              description="Do you want to edit this product?"
              okText="Accept"
              cancelText="Close"
              onConfirm={() => {
                selectProducts(record);
              }}
            >
              <Button type="dashed" icon={<EditOutlined />} />
            </Popconfirm>
            {/* <Button onClick={() => selectCustomers(record)}>Sửa</Button> */}
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
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/suppliers").then((response) => {
      // console.log(response.data);
      setSuppliers(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:9000/products").then((response) => {
      // console.log(response.data);
      setProducts(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios.post("http://localhost:9000/products", values).then((response) => {
      if (response.status === 201) {
        createForm.resetFields();
        setRefresh((f) => f + 1);
      }
      // console.log(response.data);
    });
  };

  const onEditFinish = (values) => {
    console.log(values);

    //CALL API TO CREATE CUSTOMER
    axios
      .patch("http://localhost:9000/products/" + selectedProduct.id, values)
      .then((response) => {
        if (response.status === 200) {
          updateForm.resetFields();
          setEditModalVisible(false);
          setRefresh((f) => f + 1);
        }
      });
  };

  const selectProducts = (data) => {
    setEditModalVisible(true);
    setSelectedProduct(data);
    updateForm.setFieldsValue(data);
    console.log(data);
  };

  const deleteProducts = (id) => {
    axios.delete("http://localhost:9000/products/" + id).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setRefresh((f) => f + 1);
      }
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

  // CREATE FORM
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
        name="create-product"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        {/* PRODUCT NAME */}
        <Form.Item
          label="Product Name"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input product!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* PRICE */}
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        {/* DISCOUNT */}
        <Form.Item
          label="Discount (%)"
          name="discount"
          rules={[
            {
              required: true,
              message: "Please input discount!",
            },
          ]}
        >
          <InputNumber min={0} max={75} />
        </Form.Item>

        {/* BRANCH */}
        <Form.Item
          label="Branch"
          name="branchId"
          rules={[
            {
              required: true,
              message: "Please choose branch of product!",
            },
          ]}
        >
          <Select
            options={
              branches &&
              branches.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                };
              })
            }
          />
        </Form.Item>

        {/* SUPPLIER */}
        <Form.Item
          label="Supplier"
          name="supplierId"
          rules={[
            {
              required: true,
              message: "Please choose supplier of product!",
            },
          ]}
        >
          <Select
            options={
              suppliers &&
              suppliers.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                };
              })
            }
          />
        </Form.Item>

        {/* SIZE & STOCK */}

        <Form.Item label="Sizes" name="size">
          <Form.List name="size">
            {(sizeFields, { add: addSize, remove: removeSize }) => (
              <>
                {sizeFields.map((sizeField, index) => (
                  <div key={sizeField.key}>
                    {/* SIZE */}
                    <Form.Item
                      label="Size"
                      name={[sizeField.name, "size"]}
                      rules={[{ required: true, message: "Pick one size!" }]}
                    >
                      <Select
                        style={{ width: 120 }}
                        options={[
                          {
                            value: "XS - Chest 33-34",
                            label: "XS - Chest 33-34",
                          },
                          {
                            value: "S - Chest 36-38",
                            label: "S - Chest 36-38",
                          },
                          {
                            value: "M - Chest 39-41",
                            label: "M - Chest 39-41",
                          },
                          {
                            value: "L - Chest 42-44",
                            label: "L - Chest 42-44",
                          },
                          {
                            value: "XL - Chest 45-48",
                            label: "XL - Chest 45-48",
                          },
                          {
                            value: "2XL - Chest 49-53",
                            label: "2XL - Chest 49-53",
                          },
                        ]}
                      />
                    </Form.Item>

                    {/* STOCK */}
                    <Form.Item
                      label="Stock"
                      name={[sizeField.name, "stock"]}
                      rules={[
                        { required: true, message: "Please input the stock!" },
                      ]}
                      fieldKey={[sizeField.fieldKey, "stock"]}
                    >
                      <Input type="number" min={0} style={{ width: 100 }} />
                    </Form.Item>

                    {/* BTN DELETE SIZE */}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        onClick={() => removeSize(sizeField.name)}
                        icon={<DeleteOutlined />}
                      >
                        Delete size
                      </Button>
                    </Form.Item>
                  </div>
                ))}
                {/* BTN ADD SIZE */}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    onClick={() => addSize()}
                    icon={<PlusCircleOutlined />}
                  >
                    Add size
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        {/* UPLOAD */}
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
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

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={products.length}
        onChange={handlePageChange}
      />
      <br />
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

      {/* MODAL */}
      <Modal
        open={editModalVisible}
        centered
        title="Update Information"
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
          className={Styles.form}
          form={updateForm}
          name="updateProducts"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onEditFinish}
        >
          {/* PRODUCT NAME */}
          <Form.Item
            label="Product Name"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input product!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PRICE */}
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {/* DISCOUNT */}
          <Form.Item
            label="Discount (%)"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input discount!",
              },
            ]}
          >
            <InputNumber min={0} max={75} />
          </Form.Item>

          {/* BRANCH */}
          <Form.Item
            label="Branch"
            name="branchId"
            rules={[
              {
                required: true,
                message: "Please choose branch of product!",
              },
            ]}
          >
            <Select
              options={
                branches &&
                branches.map((c) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          {/* SUPPLIER */}
          <Form.Item
            label="Supplier"
            name="supplierId"
            rules={[
              {
                required: true,
                message: "Please choose supplier of product!",
              },
            ]}
          >
            <Select
              options={
                suppliers &&
                suppliers.map((c) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>

          {/* SIZE & STOCK */}

          <Form.Item label="Sizes" name="sizes">
            <Form.List name="sizes">
              {(sizeFields, { add: addSize, remove: removeSize }) => (
                <>
                  {sizeFields.map((sizeField, index) => (
                    <div key={sizeField.key}>
                      {/* SIZE */}
                      <Form.Item
                        label="Size"
                        name={[sizeField.name, "size"]}
                        rules={[{ required: true, message: "Pick one size!" }]}
                      >
                        <Select
                          style={{ width: 120 }}
                          options={[
                            {
                              value: "XS - Chest 33-34",
                              label: "XS - Chest 33-34",
                            },
                            {
                              value: "S - Chest 36-38",
                              label: "S - Chest 36-38",
                            },
                            {
                              value: "M - Chest 39-41",
                              label: "M - Chest 39-41",
                            },
                            {
                              value: "L - Chest 42-44",
                              label: "L - Chest 42-44",
                            },
                            {
                              value: "XL - Chest 45-48",
                              label: "XL - Chest 45-48",
                            },
                            {
                              value: "2XL - Chest 49-53",
                              label: "2XL - Chest 49-53",
                            },
                          ]}
                        />
                      </Form.Item>
                      {/* STOCK */}
                      <Form.Item
                        label="Stock"
                        name={[sizeField.name, "stock"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input the stock!",
                          },
                        ]}
                        fieldKey={[sizeField.fieldKey, "stock"]}
                      >
                        <Input type="number" min={0} style={{ width: 100 }} />
                      </Form.Item>
                      {/* BTN DELETE SIZE */}
                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                          onClick={() => removeSize(sizeField.name)}
                          icon={<DeleteOutlined />}
                        >
                          Delete size
                        </Button>
                      </Form.Item>
                    </div>
                  ))}
                  {/* BTN ADD SIZE */}
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      onClick={() => addSize()}
                      icon={<PlusCircleOutlined />}
                    >
                      Add size
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;
