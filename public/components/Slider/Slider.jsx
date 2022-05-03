import MUISlider from "@mui/material/Slider";

const Slider = ({ value, min, max, step, onChange }) => {
  return (
    <div className="slider">
      <MUISlider
        defaultValue={null} //{(min + max) / 2}
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
      />
    </div>
  );
};

export default Slider;
