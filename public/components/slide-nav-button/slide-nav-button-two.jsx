import styles from "./slide-nav-button-two.module.scss";
import { useSwiper } from "swiper/react";

const SlideNavButtonTwo = ({ isPrev }) => {
  const swiper = useSwiper();

  if (isPrev) {
    return (
      <button
        className={styles["slideNavButtonTwo__prev"]}
        onClick={() => swiper.slidePrev()}
      >
        &lt;-
      </button>
    );
  } else {
    return (
      <button
        className={styles["slideNavButtonTwo__next"]}
        onClick={() => swiper.slideNext()}
      >
        -&gt;
      </button>
    );
  }
};

export default SlideNavButtonTwo;
