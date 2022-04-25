import { useState, useEffect, useRef } from "react";
import styles from "./transition.module.scss";

const Transition = () => {
  const containerRef = useRef(null);
  const [containerDim, setContainerDim] = useState({});
  const [matrix, setMatrix] = useState(Array.from(Array(10 * 10).keys()));

  console.log("containerDim", containerDim);
  console.log("matrix", matrix);
  useEffect(() => {
    console.log("containerRef", containerRef);
    if (containerRef?.current) {
      setContainerDim({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
      // let newMatrix = containerRef.current.offsetWidth
      // setMatrix()
    }
  }, [containerRef]);
  console.log(containerRef);
  return (
    <div className={styles.transition} ref={containerRef}>
      {containerDim &&
        matrix &&
        matrix.map((i, key) => {
          console.log("making element", key);
          return (
            <div
              key={key}
              style={{
                width: containerDim.width / 10 + "px",
                height: containerDim.width / 10 + "px",
                backgroundColor: "rgb(50,50,50)",
              }}
            />
          );
        })}
    </div>
  );
};

export default Transition;
