import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import cn from "classnames";

const Dragger = ({ setSolitaire, setDropPosition }) => {
  const cardRef = useRef();
  const binRef = useRef();
  const [isInBin, setIsInBin] = useState(false);

  const isCardInBin = (card, bin) => {
    // console.log(card.x > bin.x);
    if (
      card.left > bin.left &&
      card.right < bin.right &&
      card.top > bin.top &&
      card.bottom < bin.bottom
    ) {
      setIsInBin(true);
      setDropPosition({
        x: (bin.left + bin.right) / 2,
        y: (bin.top + bin.bottom) / 2,
      });
      setSolitaire(true);
    } else {
      setIsInBin(false);
    }
  };
  //   useEffect(() => {
  //     if (isInBin) {

  //     }
  //   }, [isInBin]);

  const handleDrag = (e) => {
    isCardInBin(
      cardRef.current.getBoundingClientRect(),
      binRef.current.getBoundingClientRect()
    );
    // let x = e.clientX;
    // let y = e.clientY;
  };
  return (
    <div className="dragger">
      <Draggable
        axis="both"
        handle=".dragger__card"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        //   grid={[25, 25]}
        //   scale={1}
        onStart={() => {}}
        onDrag={(e) => handleDrag(e)}
        onStop={() => {}}
      >
        <div className="dragger__card" ref={cardRef}>
          DRAG
        </div>
      </Draggable>
      <div
        className={cn("dragger__bin", { "dragger__bin--active": isInBin })}
        ref={binRef}
      ></div>
    </div>
  );
};

export default Dragger;
