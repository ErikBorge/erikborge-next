export const mapNumberToRangeFromRange = (
  input,
  input_min,
  input_max,
  output_min,
  output_max
) => {
  return (
    output_min +
    ((output_max - output_min) / (input_max - input_min)) * (input - input_min)
  );
};
