import styles from "./front-page.module.scss";
import { useState, useEffect, useRef } from "react";
import DorkySlider from "../DorkySlider/DorkySlider";
import VariableFontTitle from "../VariableFontTitle/VariableFontTitle";

const FrontPage = ({ solitaire, setSolitaire, isInTransit, win, setWin }) => {
  const [sliderValue, setSliderValue] = useState(0.5);
  const dorkyProps = {
    max: 99.5,
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
      <button
        onClick={() => {
          setSolitaire(true);
          setWin(true);
        }}
      >
        Solitaire
      </button>
      {!solitaire && (
        <VariableFontTitle title={"ERIK BORGE"} isInTransit={isInTransit} />
      )}
      <div className={styles["frontpage__subtitle"]}>Frontendutvikler</div>
      {!solitaire && <DorkySlider {...dorkyProps} isInTransit={isInTransit} />}
    </div>
  );
};

export default FrontPage;
