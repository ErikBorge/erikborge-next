import { useState } from "react";
import ExpandButton from "../ExpandButton/ExpandButton";
import { motion } from "framer-motion";

const Controls = ({ children }) => {
  const [controllerIsOpen, setControllerIsOpen] = useState(false);

  const variants = {
    closed: { height: "43px" },
    open: { height: "auto" },
  };
  return (
    <motion.div
      animate={controllerIsOpen ? "open" : "closed"}
      variants={variants}
      initial={"closed"}
      transition={{ type: "easeOut" }}
      className="controls"
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
