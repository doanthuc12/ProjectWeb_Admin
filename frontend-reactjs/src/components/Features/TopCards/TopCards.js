import React, { useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import { BsWallet, BsPersonLinesFill, BsBoxSeam } from "react-icons/bs";
import { TiInfoOutline } from "react-icons/ti";
import Styles from "./TopCard.module.css";

const TopCards = (props) => {
  // const { bg, icon, earning, subtitle } = props;
  // const listInfo = useMemo(
  //   () => [
  //     {
  //       bg: "blue",
  //       icon: <BsWallet />,
  //       earning: "211M",
  //       subtitle: "Yearly Earnings",
  //     },
  //     {
  //       bg: "blue",
  //       icon: <BsWallet />,
  //       earning: "211M",
  //       subtitle: "Yearly Earnings",
  //     },
  //   ],
  //   []
  // );

  return (
    <>
      <Card style={{ width: "20%" }}>
        <CardBody className={Styles.card_body}>
          {/* <div className={Styles.container}>
          <div className={`circle-box lg-box d-inline-block ${bg}`}>{icon}</div>
          <div className={Styles.left}>
            <BsWallet />
          </div>
          <div className={Styles.right}>
            {listInfo.map((item, index) => (
              <div key={index}>
                <h3 className="mb-0 font-weight-bold">{item.earning}</h3>
                <small className="text-muted">{item.subtitle}</small>
              </div>
            ))}
          </div>
        </div> */}
          <div className={Styles.container}>
            <div className={Styles.left}>
              <BsWallet style={{ width: "30px", height: "30px" }} />
            </div>
            <div className={Styles.right}>
              <h3 className="mb-0 font-weight-bold">211M</h3>
              <small className="text-muted">Yearly Earnings</small>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card style={{ width: "20%" }}>
        <CardBody className={Styles.card_body}>
          <div className={Styles.container}>
            <div className={Styles.left}>
              <BsPersonLinesFill style={{ width: "30px", height: "30px" }} />
            </div>
            <div className={Styles.right}>
              <h3 className="mb-0 font-weight-bold">21B</h3>
              <small className="text-muted">Total Customers</small>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card style={{ width: "20%" }}>
        <CardBody className={Styles.card_body}>
          <div className={Styles.container}>
            <div className={Styles.left}>
              <BsBoxSeam style={{ width: "30px", height: "30px" }} />
            </div>
            <div className={Styles.right}>
              <h3 className="mb-0 font-weight-bold">13.450</h3>
              <small className="text-muted">Total Products</small>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card style={{ width: "20%" }}>
        <CardBody className={Styles.card_body}>
          <div className={Styles.container}>
            <div className={Styles.left}>
              <TiInfoOutline style={{ width: "30px", height: "30px" }} />
            </div>
            <div className={Styles.right}>
              <h3 className="mb-0 font-weight-bold">30</h3>
              <small className="text-muted">Out of stock</small>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TopCards;
