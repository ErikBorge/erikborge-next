import { useState, useEffect, useRef } from "react";
import styles from "./menu.module.scss";

const Menu = ({ setPage, setIsMenuOpen }) => {
  return (
    <div className={styles.menu}>
      <div className={styles["menu__open"]}>
        <div className={styles["menu__content"]}>
          <div className={styles["menu__items"]}>
            <button
              className={styles["menu__item"]}
              onClick={() => {
                setPage("work");
                setIsMenuOpen(false);
              }}
            >
              work
            </button>
            <button
              className={styles["menu__item"]}
              onClick={() => {
                setPage("mishmash");
                setIsMenuOpen(false);
              }}
            >
              mishmash
            </button>
          </div>
          <div className={styles["menu__contact"]}>
            <div className={styles["menu__contact-item"]}>O</div>
            <div className={styles["menu__contact-item"]}>O</div>
            <div className={styles["menu__contact-item"]}>O</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
