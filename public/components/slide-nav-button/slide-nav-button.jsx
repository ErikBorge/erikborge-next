import styles from "./slide-nav-button.module.scss";
import { useSwiper } from "swiper/react";

const SlideNavButton = ({ isPrev }) => {
  const swiper = useSwiper();
  console.log("swiper", swiper);

  if (isPrev) {
    return (
      <button
        onClick={() => swiper.slidePrev()}
        className={styles["navbutton__nav-prev"]}
      >
        <div className={styles["navbutton__nav-arrow"]} />
        <div className={styles["navbutton__nav-inner"]} />
      </button>
    );
  } else {
    return (
      <button
        onClick={() => swiper.slideNext()}
        className={styles["navbutton__nav-next"]}
      >
        <div className={styles["navbutton__nav-inner"]} />
        <div className={styles["navbutton__nav-arrow"]} />
      </button>
    );
  }
};

export default SlideNavButton;
