import { useState, useEffect, useRef } from "react";
import styles from "./main.module.scss";
import Content from "../content/content";
import FrontPage from "../front-page/front-page.jsx";
import WorkPage from "../work-page/work-page.jsx";

import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import Menu from "../menu/menu";
// import Project from '../project/project.jsx'

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  return (
    <div className={styles.main}>
      <div className={styles["main__container"]}>
        <button
          className={styles["main__menu-button"]}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? "menu" : "close"}
        </button>
        {isMenuOpen ? (
          <Menu setPage={setPage} setIsMenuOpen={setIsMenuOpen} />
        ) : page === "home" ? (
          <FrontPage />
        ) : page === "work" ? (
          <WorkPage />
        ) : page === "mishmash" ? (
          <div>MISHMASH</div>
        ) : (
          "none of the above"
        )}
      </div>
    </div>
  );
};

export default Main;
