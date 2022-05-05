import styles from "./front-page.module.scss";
import { useState, useEffect, useRef } from "react";
import DorkySlider from "../DorkySlider/DorkySlider";

const FrontPage = ({ solitaire, setSolitaire, isInTransit, win, setWin }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const dorkyProps = {
    max: 100,
    winLimit: 99,
    sliderValue: sliderValue,
    setSliderValue: setSliderValue,
    win: win,
    setWin: setWin,
    solitaire: solitaire,
  };

  useEffect(() => {
    if (win) {
      setSolitaire(true);
    }
  }, [win]);

  return (
    <div className={styles["frontpage"]}>
      <button onClick={() => setSolitaire(true)}>Solitaire</button>
      <div className={styles["frontpage__title"]}>Erik Borge</div>
      <div className={styles["frontpage__subtitle"]}>Frontendutvikler</div>
      <DorkySlider {...dorkyProps} isInTransit={isInTransit} />
    </div>
  );
};

export default FrontPage;
