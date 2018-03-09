export const randomCircleColors = () => {
  // generates a random bright color for a circle's body, and a corresponding darker color for its border
  const rgb = `rgba(${~~(255 * Math.random())}, ${~~(255 * Math.random())}, ${~~(255 * Math.random())}, <ALPHA>)`;

  return {
    input: rgb.replace('<ALPHA>', 0.4),
    body: rgb.replace('<ALPHA>', 0.6),
    border: rgb.replace('<ALPHA>', 0.8),
  };
};
