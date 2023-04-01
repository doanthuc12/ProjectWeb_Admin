import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Layout, Row } from "antd";
import axios from "axios";
import "./App.css";
import "antd/dist/reset.css";

// import numeral from "numeral";
// import "numeral/locales/vi";

// numeral.locale("vi");
import MainMenu from "./components/Common/MainMenu/MainMenu";

// PAGES
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";

import CustomerPage from "./pages/Management/CustomerPage";
import ProductPage from "./pages/Management/ProductPage";
import CategoriesPage from "./pages/Sales/Product/CategoriesPage";
import SuppliersPage from "./pages/Sales/Product/SuppliersPage";
import EmployeesPage from "./pages/Sales/Product/EmployeesPage";
import OrdersPage from "./pages/Sales/Product/OrdersPage";

import NotFoundPage from "./pages/NotFoundPage";
import DiscountPage from "./pages/Sales/Product/DiscountPage";
import StockPage from "./pages/Sales/Product/StockPage";
import TotalPricePage from "./pages/Sales/Product/TotaPicePage";
import CustomerAddressPage from "./pages/Management/CustomerAddressPage";
import CustomerBirthPage from "./pages/Management/CustomerBirthPage";
import HeaderAdmin from "./components/Common/Header/HeaderAdmin";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Sider
            style={{
              backgroundColor: "white",
              minHeight: "100vh",
              boxShadow:
                "0 4px 4px 0 rgba(121, 121, 121, 0.404), 0 6px 10px 0 rgba(197, 197, 197, 0.726)",
            }}
          >
            <MainMenu />
          </Sider>

          <Layout>
            <Header
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: "12px",
              }}
            >
              <HeaderAdmin />
            </Header>

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
                <Route path="/login" element={<SignIn />} />

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

                {/* MAN_PRODUCTS */}
                <Route path="/management/products" element={<ProductPage />} />

                {/* SALES */}
                {/* SALES_PRODUCTS */}
                <Route path="/sales/products/list" element={<ProductPage />} />
                <Route
                  path="sales/products/categories"
                  element={<CategoriesPage />}
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
                <Route path="/sales/products/stock" element={<StockPage />} />
                <Route
                  path="/sales/products/totalprice"
                  element={<TotalPricePage />}
                />

                {/* SALES_ORDERS */}

                <Route path="/sales/orders/list" element={<OrdersPage />} />

                {/* NO MATCH ROUTE */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
