import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";
import axios from "axios";
import "./App.css";
import "antd/dist/reset.css";
import MainMenu from "./components/MainMenu";
import SignInPage from "./pages/SignIn/SignIn";
import HomePage from "./pages/HomePage";
import CustomerPage from "./pages/Management/CustomerPage";
import ProductPage from "./pages/Management/ProductPage";
import CategoriesPage from "./pages/Sales/Product/CategoriesPage";
import SuppliersPage from "./pages/Sales/Product/SuppliersPage";
import EmployeesPage from "./pages/Sales/Product/EmployeesPage";
import OrdersPage from "./pages/Sales/Product/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage";
import DiscountPage from "./pages/Sales/Product/DiscountPage";
import StockPage from "./pages/Sales/Product/StockPage";
import CustomerAddressPage from "./pages/Management/CustomerAddressPage";
import CustomerBirthPage from "./pages/Management/CustomerBirthPage";

const { Header, Sider, Content } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // navigate("/home");
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {!isLoggedIn && (
            <Route
              path="/"
              element={<SignInPage onLoginSuccess={handleLoginSuccess} />}
            />
          )}
          {isLoggedIn && (
            <>
              {/* ADMIN PAGE */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Sider theme="dark" style={{ minHeight: "100vh" }}>
                      <MainMenu />
                    </Sider>
                    <Layout>
                      <Header style={{ backgroundColor: "blue" }}>
                        <h1 style={{ color: "white" }}> ADMIN PAGE</h1>
                      </Header>
                      <Content style={{ padding: 24 }}>
                        {/* Register routes */}
                        <Routes>
                          <Route path="/home" element={<HomePage />} />
                          {/* MANAGEMENT */}
                          <Route
                            path="/management/products"
                            element={<ProductPage />}
                          />
                          <Route
                            path="/management/customers/list"
                            element={<CustomerPage />}
                          />
                          <Route
                            path="/management/customers/address"
                            element={<CustomerAddressPage />}
                          />
                          <Route
                            path="/management/customers/birthday"
                            element={<CustomerBirthPage />}
                          />
                          {/* SALES */}
                          <Route
                            path="/sales/products/categories"
                            element={<CategoriesPage />}
                          />
                          <Route
                            path="/sales/products/suppliers"
                            element={<SuppliersPage />}
                          />
                          <Route
                            path="/sales/products/employees"
                            element={<EmployeesPage />}
                          />
                          <Route
                            path="/sales/products/orders"
                            element={<OrdersPage />}
                          />
                          <Route
                            path="/sales/products/discount"
                            element={<DiscountPage />}
                          />
                          <Route
                            path="/sales/products/stock"
                            element={<StockPage />}
                          />
                        </Routes>
                      </Content>
                    </Layout>
                  </Layout>
                }
              />
              {/* Other routes for authenticated users */}
              {/* ... */}
            </>
          )}
          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
