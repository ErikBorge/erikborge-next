import { memo, useEffect, useRef } from "react";
import Dragger from "../Dragger/Dragger";

import VariableFontTitle from "../VariableFontTitle/VariableFontTitle";

const FrontPage = ({
  solitaire,
  setSolitaire,
  setDropPosition,
  isInTransit,
}) => {
  return (
    <div className="frontpage">
      {/* <button
        onClick={() => {
          setSolitaire(true);
        }}
      >
        Solitaire
      </button> */}
      {!solitaire && (
        <>
          <VariableFontTitle title={"ERIK BORGE"} isInTransit={isInTransit} />

          <div className="frontpage__subtitle">Frontendutvikler</div>
          <Dragger
            setSolitaire={setSolitaire}
            setDropPosition={setDropPosition}
          />
          {/* <DndProvider options={HTML5toTouch}>
            <Container
              setSolitaire={setSolitaire}
              setDropPosition={setDropPosition}
              solitaire={solitaire}
            />
          </DndProvider> */}
        </>
      )}
    </div>
  );
};

export default FrontPage;

// const Container = memo(function Container({
//   setSolitaire,
//   setDropPosition,
//   solitaire,
// }) {
//   return (
//     <div className="frontpage__card-container">
//       <div style={{ overflow: "hidden", clear: "both" }}>
//         <Card name="card" solitaire={solitaire} />
//       </div>
//       <div style={{ overflow: "hidden", clear: "both" }}>
//         <CardTarget
//           setSolitaire={setSolitaire}
//           setDropPosition={setDropPosition}
//         />
//       </div>
//     </div>
//   );
// });

// const Card = ({ name }) => {
//   const style = {
//     width: "150px",
//     height: "230px",
//     border: "1px dashed gray",
//     backgroundColor: "lightgrey",
//     padding: "0.5rem 1rem",
//     marginRight: "1.5rem",
//     marginBottom: "1.5rem",
//     cursor: "move",
//     float: "left",
//   };
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "card",
//     item: { name },
//     // end: (item, monitor) => {
//     //   const dropResult = monitor.getDropResult();
//     // },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//       // handlerId: monitor.getHandlerId(),
//     }),
//   }));
//   const opacity = isDragging ? 0.4 : 1;
//   return (
//     <div style={{ ...style, opacity }} ref={drag} data-testid={`card`}>
//       A
//     </div>
//   );
// };

// const CardTarget = ({ setSolitaire, setDropPosition }) => {
//   const targetRef = useRef();
//   const style = {
//     width: "150px",
//     height: "230px",
//     marginRight: "1.5rem",
//     marginBottom: "1.5rem",
//     color: "white",
//     border: "1px solid black",
//     padding: "1rem",
//     textAlign: "center",
//     fontSize: "1rem",
//     lineHeight: "normal",
//   };
//   const [{ canDrop, isOver }, drop] = useDrop(() => ({
//     accept: "card",
//     drop: () => ({ name: "CardTarget" }),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//     }),
//   }));
//   const isActive = canDrop && isOver;

//   useEffect(() => {
//     if (isActive) {
//       let pos = targetRef.current?.getBoundingClientRect();
//       setDropPosition({ x: pos.x, y: pos.y });
//       setSolitaire(true);
//       // targetRef.dispatchEvent(
//       //   new KeyboardEvent("keypress", {
//       //     key: "Esc",
//       //   })
//       // );
//       new KeyboardEvent("keypress", {
//         key: "esc",
//       });
//     }
//   }, [isActive]);
//   let backgroundColor = "transparent";
//   return (
//     <div ref={targetRef}>
//       <div
//         ref={drop}
//         style={{ ...style, backgroundColor }}
//         data-testid="dustbin"
//       ></div>
//     </div>
//   );
// };
