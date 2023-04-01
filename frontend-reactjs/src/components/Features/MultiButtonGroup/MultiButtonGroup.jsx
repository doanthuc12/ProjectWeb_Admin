import React from "react";
import { Button } from "reactstrap";

import Styles from "./MultiButtonGroup.module.css";

const ButtonData = [
  {
    title: "Upload",
    color: "#f7ff86",
    id: 1,
  },
  {
    title: "Print",
    color: "#ffce74",
    id: 2,
  },
  {
    title: "Copy",
    color: "#86beff",
    id: 3,
  },
  {
    title: "Export Excel",
    color: "#599447",
    id: 4,
  },
  {
    title: "Export PDF",
    color: "#f86a65",
    id: 5,
  },
  {
    title: "Delete All",
    color: "#9b9b9b",
    id: 6,
  },
];

const MultiButtonGroup = () => {
  return (
    <div className={Styles.container}>
      {ButtonData.map((button) => (
        <Button
          className={Styles.button}
          style={{ backgroundColor: `${button.color}` }}
          key={button.id}
          color={button.color}
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
};

export default MultiButtonGroup;
