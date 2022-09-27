export const colorDistance = (v1, v2) => {
  return Math.sqrt(
    Math.pow(v2.r - v1.r, 2) +
      Math.pow(v2.g - v1.g, 2) +
      Math.pow(v2.b - v1.b, 2)
  );
};
