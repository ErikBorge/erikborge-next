import { useState, useEffect, useRef } from "react";
import styles from "./front-page.module.scss";
import Typist from "react-typist";
import motion from "framer-motion";

const FrontPage = () => {
  return (
    // <Typist>
    <div className={styles["frontpage"]}>
      <div className={styles["frontpage__title"]}>Erik Borge</div>
      <div className={styles["frontpage__subtitle"]}>Frontendutvikler</div>
    </div>
    // </Typist>
  );
};

export default FrontPage;
