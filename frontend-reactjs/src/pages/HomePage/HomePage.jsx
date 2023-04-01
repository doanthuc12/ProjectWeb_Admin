import React from "react";
import Styles from "./HomePage.module.css";

import TopCards from "../../components/Features/TopCards/TopCards";
import SalesChart from "../../components/Features/SalesChart/SalesChart";
import OrderShortCut from "../../components/Features/OrderShortCut/OrderShortCut";
import OutOfStockProducts from "../../components/Features/OutOfStockProducts/OutOfStockProducts";

import Feeds from "../../components/Features/Feeds/Feeds";

export default function HomePage() {
  return (
    <div className={Styles.container}>
      <div className={Styles.topCard}>
        <TopCards />
      </div>

      <SalesChart />

      <div className={Styles.bottom}>
        <div className={Styles.bot_left}>
          <span className={Styles.title}>Waiting Orders</span>
          <OrderShortCut />
        </div>
        <div className={Styles.bot_right}>
          <span className={Styles.title}>Need fullfilled Products</span>
          <OutOfStockProducts />
        </div>
      </div>
    </div>
  );
}
