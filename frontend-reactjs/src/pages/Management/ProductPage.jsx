import React from "react";
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
} from "antd";
import {
  DeleteOutlined,
  // ExitOutlined,
  // UploadOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
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
      dataIndex: "branchId",
      key: "branchId",
      with: "1%",
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <strong>
              {record.branchId.name ? record.branchId.name : null}
            </strong>
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
          <div>
            <strong>{text}</strong>
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
            <strong>
              {record.supplier.name ? record.supplier.name : null}
            </strong>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{numeral(text).format("0,0$")}</strong>
          </div>
        );
      },
    },
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
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text, record, index) => {
        return (
          <div>
            <strong>{text ? numeral(text).format("0,0") : null}</strong>
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

  // const fetchColors = async () => {
  //   try {
  //     const response = await axios.get("/colors"); // Thay đổi đường dẫn API tương ứng
  //     setColors(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // React.useEffect(() => {
  //   axios.get("/sizes").then((response) => {
  //     setSizes(response.data);
  //   });
  //   axios.get("/categories").then((response) => {
  //     setCategories(response.data);
  //   });
  //   fetchColors();
  // }, []);

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
        {/* <Form.Item
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
        </Form.Item> */}

        {/* DISCOUNT */}
        {/* <Form.Item
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
        </Form.Item> */}

        {/* STOCK */}
        {/* <Form.Item
          label="Stock"
          name="stock"
          rules={[
            {
              required: true,
              message: "Please input stock of product!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item> */}

        {/* CATEGORY */}
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

        <Form.List name="colors">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key}>
                  <Form.Item
                    label="Màu"
                    name={[field.name, "colorId"]}
                    fieldKey={[field.fieldKey, "colorId"]}
                    rules={[{ required: true, message: "Hãy chọn một màu!" }]}
                  >
                    <Input />
                    {/* <Select
                      options={
                        colors &&
                        colors.map((c) => {
                          return {
                            value: c._id,
                            label: c.name,
                          };
                        })
                      }
                    /> */}
                  </Form.Item>
                  <Form.Item
                    label="Price"
                    name={[field.name, "price"]}
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập giá bán!",
                      },
                    ]}
                    fieldKey={[field.fieldKey, "price"]}
                  >
                    <Input type="number" min={0} style={{ width: 150 }} />
                  </Form.Item>
                  <Form.Item
                    label="Discount"
                    name={[field.name, "discount"]}
                    fieldKey={[field.fieldKey, "discount"]}
                  >
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      style={{ width: 100 }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Kích cỡ và số lượng"
                    name={[field.name, "sizes"]}
                    fieldKey={[field.fieldKey, "sizes"]}
                  >
                    <Form.List name={[field.name, "sizes"]}>
                      {(sizeFields, { add: addSize, remove: removeSize }) => (
                        <>
                          {sizeFields.map((sizeField) => (
                            <div key={sizeField.key}>
                              <Form.Item
                                label="Size"
                                name={[sizeField.name, "sizeId"]}
                                fieldKey={[sizeField.fieldKey, "sizeId"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Hãy chọn một kích cỡ!",
                                  },
                                ]}
                              >
                                <Input />
                                {/* <Select
                                  style={{ width: 150 }}
                                  options={
                                    sizes &&
                                    sizes.map((c) => {
                                      return {
                                        value: c._id,
                                        label: c.size,
                                      };
                                    })
                                  }
                                /> */}
                              </Form.Item>
                              <Form.Item
                                label="Quantity"
                                name={[sizeField.name, "quantity"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Hãy nhập số lượng!",
                                  },
                                ]}
                                fieldKey={[sizeField.fieldKey, "quantity"]}
                              >
                                <Input
                                  type="number"
                                  min={0}
                                  style={{ width: 100 }}
                                />
                              </Form.Item>
                              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                  onClick={() => removeSize(sizeField.name)}
                                  icon={<DeleteOutlined />}
                                >
                                  Xóa kích cỡ
                                </Button>
                              </Form.Item>
                            </div>
                          ))}
                          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                              onClick={() => addSize()}
                              icon={<PlusCircleOutlined />}
                            >
                              Thêm kích cỡ
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      onClick={() => remove(field.name)}
                      icon={<DeleteOutlined />}
                    >
                      Xóa màu
                    </Button>
                  </Form.Item>
                </div>
              ))}
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={() => add()} icon={<PlusCircleOutlined />}>
                  Thêm màu
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
        dataSource={products}
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

          {/* STOCK */}
          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input stock of product!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          {/* CATEGORY */}
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
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;
