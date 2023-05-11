import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/reset.css";

// PAGES
import MainMenu from "./components/Common/MainMenu/MainMenu";

import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import CustomerPage from "./pages/Management/CustomerPage";
import ProductPage from "./pages/Management/ProductPage";
import BranchesPage from "./pages/Sales/Product/BranchesPage";
import SuppliersPage from "./pages/Sales/Product/SuppliersPage";
import EmployeesPage from "./pages/Management/EmployeesPage";
import ShipperPage from "./pages/Management/ShipperPage";
import OrdersPage from "./pages/Sales/Product/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage";
import DiscountPage from "./pages/Sales/Product/DiscountPage";
import StockPage from "./pages/Sales/Product/StockPage";
import TitlePage from "./pages/Sales/Product/TitlePage";
import CustomerAddressPage from "./pages/Management/CustomerAddressPage";
import CustomerBirthPage from "./pages/Management/CustomerBirthPage";
import OrderStatusPage from "./pages/Sales/Product/OrderStatusPage";
import OrderCustomerPage from "./pages/Sales/Product/OrderCustomerPage";

import { useAuthStore } from "./hooks/useAuthStore";
import MainMenuManager from "./components/Common/MainMenu/MainMenuManager";
import MainMenuShipper from "./components/Common/MainMenu/MainMenuShipper";

const { Header, Sider, Content } = Layout;

function App() {
  const { auth, logout } = useAuthStore((state) => state);
  console.log(auth?.loggedInUser?.email);
  console.log(auth?.loggedInUser?.roles);

  return (
    <div>
      <BrowserRouter>
        {!auth && (
          <Content style={{ padding: 24 }}>
            <Routes>
              <Route path="/" element={<SignIn />} />
              {/* NO MATCH ROUTE */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Content>
        )}
        {auth && (
          <Layout>
            <Sider theme="light" style={{ minHeight: "100vh" }}>
              {/* <MainMenu /> */}
              {auth && auth.loggedInUser.roles === "administrator" ? (
                <MainMenu />
              ) : null}
              {auth && auth.loggedInUser.roles === "manager" ? (
                <MainMenuManager />
              ) : null}
              {auth && auth.loggedInUser.roles === "shipper" ? (
                <MainMenuShipper />
              ) : null}
            </Sider>

            <Layout>
              <Header style={{ backgroundColor: "white" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1 style={{ color: "black" }}> ONLINE SHOP - ADMIN</h1>
                  <div style={{ display: "flex", color: "black" }}>
                    <strong>{auth?.loggedInUser?.email}</strong>
                    <span style={{ marginInline: 8 }}>|</span>
                    <strong
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        logout();
                      }}
                    >
                      Log out
                    </strong>
                  </div>
                </div>
              </Header>

              {/* ADMINISTRATOR */}
              {auth && auth.loggedInUser.roles === "administrator" ? (
                <Content
                  style={{
                    padding: "50px",
                    paddingTop: "30px",
                    backgroundColor: "#e5effa",
                  }}
                >
                  {/* Register routes */}
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />

                    {/* MANAGEMENT */}

                    {/* MAN_CUSTOMERS */}
                    <Route
                      path="management/customers/list"
                      element={<CustomerPage />}
                    />
                    <Route
                      path="management/customers/address"
                      element={<CustomerAddressPage />}
                    />
                    <Route
                      path="management/customers/birthday"
                      element={<CustomerBirthPage />}
                    />
                    {/* MAN_EMPLOYEES */}
                    <Route
                      path="management/employees/list"
                      element={<EmployeesPage />}
                    />

                    {/* MAN_SHIPPERS */}
                    <Route
                      path="management/shippers/list"
                      element={<ShipperPage />}
                    />

                    {/* MAN_PRODUCTS */}
                    <Route
                      path="/management/products"
                      element={<ProductPage />}
                    />

                    {/* SALES */}
                    {/* SALES_PRODUCTS */}
                    <Route
                      path="/sales/products/list"
                      element={<ProductPage />}
                    />
                    <Route
                      path="sales/products/branches"
                      element={<BranchesPage />}
                    />
                    <Route
                      path="sales/products/suppliers"
                      element={<SuppliersPage />}
                    />

                    {/* ON_SALE */}
                    <Route
                      path="/sales/products/discount"
                      element={<DiscountPage />}
                    />
                    <Route
                      path="/sales/products/stock"
                      element={<StockPage />}
                    />
                    <Route
                      path="/sales/products/name"
                      element={<TitlePage />}
                    />

                    {/* SALES_ORDERS */}

                    <Route path="/sales/orders/list" element={<OrdersPage />} />
                    <Route
                      path="/sales/orders/status"
                      element={<OrderStatusPage />}
                    />
                    {/* <Route
                      path="/sales/orders/customerName"
                      element={<OrderCustomerPage />}
                    /> */}

                    {/* NO MATCH ROUTE */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Content>
              ) : null}

              {/* MANAGER */}
              {auth && auth.loggedInUser.roles === "manager" ? (
                <Content
                  style={{
                    padding: "50px",
                    paddingTop: "30px",
                    backgroundColor: "#e5effa",
                  }}
                >
                  {/* Register routes */}
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />

                    {/* MANAGEMENT */}

                    {/* MAN_CUSTOMERS */}
                    <Route
                      path="management/customers/list"
                      element={<CustomerPage />}
                    />
                    <Route
                      path="management/customers/address"
                      element={<CustomerAddressPage />}
                    />
                    <Route
                      path="management/customers/birthday"
                      element={<CustomerBirthPage />}
                    />

                    {/* MAN_SHIPPERS */}
                    <Route
                      path="management/shippers/list"
                      element={<ShipperPage />}
                    />

                    {/* MAN_PRODUCTS */}
                    <Route
                      path="/management/products"
                      element={<ProductPage />}
                    />

                    {/* SALES */}
                    {/* SALES_PRODUCTS */}
                    <Route
                      path="/sales/products/list"
                      element={<ProductPage />}
                    />
                    <Route
                      path="sales/products/branches"
                      element={<BranchesPage />}
                    />
                    <Route
                      path="sales/products/suppliers"
                      element={<SuppliersPage />}
                    />

                    {/* ON_SALE */}
                    <Route
                      path="/sales/products/discount"
                      element={<DiscountPage />}
                    />
                    <Route
                      path="/sales/products/stock"
                      element={<StockPage />}
                    />
                    <Route
                      path="/sales/products/name"
                      element={<TitlePage />}
                    />

                    {/* SALES_ORDERS */}

                    <Route path="/sales/orders/list" element={<OrdersPage />} />
                    <Route
                      path="/sales/orders/status"
                      element={<OrderStatusPage />}
                    />
                    <Route
                      path="/sales/orders/customerName"
                      element={<OrderCustomerPage />}
                    />

                    {/* NO MATCH ROUTE */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Content>
              ) : null}

              {/* SHIPPER */}
              {auth && auth.loggedInUser.roles === "shipper" ? (
                <Content
                  style={{
                    padding: "50px",
                    paddingTop: "30px",
                    backgroundColor: "#e5effa",
                  }}
                >
                  {/* Register routes */}
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />

                    {/* SALES_ORDERS */}

                    <Route path="/sales/orders/list" element={<OrdersPage />} />
                    <Route
                      path="/sales/orders/status"
                      element={<OrderStatusPage />}
                    />
                    {/* <Route
                      path="/sales/orders/customerName"
                      element={<OrderCustomerPage />}
                    /> */}

                    {/* NO MATCH ROUTE */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Content>
              ) : null}
            </Layout>
          </Layout>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
