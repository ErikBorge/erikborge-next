import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./menu.module.scss";

const Menu = ({ setPage, setIsMenuOpen, setIsInTransit }) => {
  const changePage = () => {
    setIsInTransit(true);
    setIsMenuOpen(false);
  };
  return (
    <div className={styles.menu}>
      <div className={styles["menu__open"]}>
        {/* <div className={styles["menu__home"]}>
          <Link href="/">
            <a onClick={changePage}>Erik Borge</a>
          </Link>
        </div> */}
        <div className={styles["menu__content"]}>
          <div className={styles["menu__items"]}>
            <Link href="/arbeid">
              <a onClick={changePage} className={styles["menu__item"]}>
                arbeid
              </a>
            </Link>
            <Link href="/tjafs">
              <a onClick={changePage} className={styles["menu__item"]}>
                tjafs
              </a>
            </Link>
          </div>
          <div className={styles["menu__contact"]}>
            <a
              href="https://www.linkedin.com/in/erikborge/"
              target="_blank"
              rel="noreferrer"
              className={styles["menu__contact-item"]}
            >
              L
            </a>
            /
            <a
              href="https://github.com/ErikBorge"
              target="_blank"
              rel="noreferrer"
              className={styles["menu__contact-item"]}
            >
              G
            </a>
            /
            <a
              href="mailto:hei@erikborge.no"
              target="_blank"
              rel="noreferrer"
              className={styles["menu__contact-item"]}
            >
              M
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
