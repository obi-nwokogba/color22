// RGB to HSL function is from
// https://www.30secondsofcode.org/js/s/rgb-to-hsl/
export function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    (60 * h < 0 ? 60 * h + 360 : 60 * h).toFixed(2),
    (
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    ).toFixed(2),
    ((100 * (2 * l - s)) / 2).toFixed(2),
  ];
}

export function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  let hexColor =
    "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return hexColor.toUpperCase();
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
