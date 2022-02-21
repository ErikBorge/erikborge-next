import { useState, useEffect, useRef } from "react";
import styles from "./content.module.scss";

import Projects from "../project/projects";

const Content = () => {
  return (
    <div className={styles.content}>
      <div className={styles["content__container"]}>
        <Projects />
      </div>
    </div>
  );
};

export default Content;
