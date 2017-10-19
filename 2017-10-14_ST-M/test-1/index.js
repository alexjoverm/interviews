module.exports = function doubleSize(a, b) {
  a.sort((a, b) => a - b)
  a.forEach(n => {
    console.log(n, b)
    if (n === b) {
      b *= 2
    }
  })
  return b
}
