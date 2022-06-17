import { useEffect, useRef, useState } from "react";
import ExpandButton from "../ExpandButton/ExpandButton";
import { motion } from "framer-motion";
import cn from "classnames";

const Controls = ({ children, className }) => {
  const [controllerIsOpen, setControllerIsOpen] = useState(false);
  const controllerRef = useRef();

  const variants = {
    closed: { height: "43px" },
    open: { height: "auto" },
  };

  useEffect(() => {
    if (controllerIsOpen && controllerRef.current) {
      document.addEventListener("click", function _listener(event) {
        const withinBoundaries = event
          .composedPath()
          .includes(controllerRef.current);
        if (!withinBoundaries) {
          setControllerIsOpen(false);
          document.removeEventListener("click", _listener);
        }
      });
    }
  }, [controllerIsOpen]);

  return (
    <motion.div
      animate={controllerIsOpen ? "open" : "closed"}
      variants={variants}
      initial={"closed"}
      transition={{ type: "easeOut" }}
      className={cn("controls", { [className]: className })}
      ref={controllerRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="controls__top">
        Kontrollpanel
        <ExpandButton
          onClick={() => setControllerIsOpen((prev) => !prev)}
          isExpanded={controllerIsOpen}
        />
      </div>
      <div className="controls__controls">{children}</div>
    </motion.div>
  );
};

export default Controls;
