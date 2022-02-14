import { useState, useEffect, useRef } from "react";
import styles from "./main.module.scss";
import Content from "../content/content";

const Main = () => {
  const frame = useRef();
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (frame) {
      frame.current.addEventListener("animationend", () => {
        // console.log("Animation ended");
        setShowContent(true);
      });
    }
  }, []);

  return (
    <div className={styles["main__frame-container"]}>
      <div className={styles["main__frame"]} ref={frame}>
        <div className={styles["main__header"]}>Erik Borge</div>
        <div
          className={styles["main__content"]}
          style={{ opacity: !showContent ? 0 : 1 }}
        >
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Main;
