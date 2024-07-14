const tinycolor = require("tinycolor2");

const color = "rgb(0, 0, 0)";

const typography = {
  100: tinycolor(color).toRgbString(),
  50: tinycolor(color).setAlpha(0.5).toRgbString(),
  25: tinycolor(color).setAlpha(0.25).toRgbString(),
};

module.exports = typography;
