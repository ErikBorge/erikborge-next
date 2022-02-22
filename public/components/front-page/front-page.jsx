import { useState, useEffect, useRef } from "react";
import styles from "./front-page.module.scss";
import Typist from "react-typist";

const FrontPage = () => {
  return (
    // <Typist>
    <div className={styles["frontpage"]}>
      <div className={styles["frontpage__title"]}>Erik Borge</div>
      <div className={styles["frontpage__subtitle"]}>Frontend developer</div>
    </div>
    // </Typist>
  );
};

export default FrontPage;
