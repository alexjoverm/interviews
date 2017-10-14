const doubleSize = require('./index')

describe('Test', () => {
  it('Works 1', () => {
    const a = [1, 2, 3, 1, 2]
    const b = 1
    expect(doubleSize(a, b)).toBe(4)
  })
  it('Works 2', () => {
    const a = [1, 1, 1]
    const b = 1
    expect(doubleSize(a, b)).toBe(2)
  })
  it('Works 3', () => {
    const a = [2, 5, 4, 3, 8]
    const b = 2
    expect(doubleSize(a, b)).toBe(16)
  })
  fit('Works 4', () => {
    const a = [1, 2, 1, 48, 256, 2, 128, 4, 9, 32, 64, 8, 16, 16]
    const b = 2
    expect(doubleSize(a, b)).toBe(256)
  })
})
