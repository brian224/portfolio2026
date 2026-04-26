export default {
  hexToRgb(hex) {
    const isHexAbbr = hex.length === 4
    const result = !isHexAbbr
      ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      : /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)
    const abbrTransform = (x) => (x.length === 1 ? `${x}${x}` : x)
    return result
      ? `${parseInt(abbrTransform(result[1]), 16)}, ${parseInt(abbrTransform(result[2]), 16)}, ${parseInt(
          abbrTransform(result[3]),
          16
        )}`
      : null
  },
}
