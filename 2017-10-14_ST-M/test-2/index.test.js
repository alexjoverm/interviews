const maxDifference = require('./index')

describe('Test', () => {
  it('Works 1', () => {
    const a = [7, 2, 3, 10, 2, 4, 8, 1]
    expect(maxDifference(a)).toBe(8)
  })
  it('Works 2', () => {
    const a = [7, 9, 5, 6, 3, 2]
    expect(maxDifference(a)).toBe(2)
  })
  it('Works 3', () => {
    const a = [7, 5, 5, 4, 3, 2]
    expect(maxDifference(a)).toBe(-1)
  })
})
