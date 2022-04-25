import cn from "classnames";

const ExpandButton = ({ className, onClick, isExpanded }) => {
  return (
    <button
      className={cn("expand-button", { className: className })}
      onClick={onClick}
    >
      <div className="expand-button__inner">
        <div
          className={cn("expand-button__inner--line1", {
            "expand-button__inner--line1-active": isExpanded,
          })}
        />
        <div
          className={cn("expand-button__inner--line2", {
            "expand-button__inner--line2-active": isExpanded,
          })}
        />
      </div>
    </button>
  );
};

export default ExpandButton;
