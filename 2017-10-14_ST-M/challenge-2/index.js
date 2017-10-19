module.exports = function maxDifference(a) {
  let maxVal = -1

  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[i] < a[j]) {
        let diff = a[j] - a[i]
        maxVal = maxVal < diff ? diff : maxVal
      }
    }
  }
  return maxVal
}
