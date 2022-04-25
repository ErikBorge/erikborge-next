import styles from "./Layout.module.scss";
import { useState, useRef, useEffect } from "react";
import Menu from "../menu/menu";
import Link from "next/link";

const Layout = ({ children, isInTransit, setIsInTransit, setIsMounted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // if (frame) {
    //   frame.current.addEventListener("animationend", () => {
    //     // console.log("Animation ended");
    //     setShowContent(true);
    //   });
    // }
    setTimeout(() => {
      setShowContent(true);
      setIsInTransit(false);
      setIsMounted(true);
    }, 2800);
  }, []);

  return (
    <main className={styles.layout}>
      <div className={styles["layout__frame-container"]}>
        <div className={styles["layout__frame"]}>
          <Link href="/">
            <a
              className={styles["layout__header"]}
              onClick={() => setIsInTransit(true)}
            >
              Erik Borge
            </a>
          </Link>
          {/* <div className={styles["layout__header"]}>Erik Borge</div> */}
          {isInTransit && <div className={styles["layout__grain"]} />}
          <div
            className={`${styles["layout__content"]} ${
              showContent ? styles["layout__content-visible"] : ""
            }`}
            id="Frame"
          >
            <button
              className={styles["layout__menu-button"]}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {!isMenuOpen ? "meny" : "lukk"}
            </button>
            {isMenuOpen ? (
              <Menu
                setIsMenuOpen={setIsMenuOpen}
                setIsInTransit={setIsInTransit}
              />
            ) : (
              <>{children} </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
