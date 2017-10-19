
const { RuleSet, Options } = require('./challenge')

describe('RuleSet', () => {
  let ruleSet, options

  beforeEach(() => {
    ruleSet = new RuleSet()
    options = new Options(ruleSet)
  })

  it('a,a is coherent', () => {
    ruleSet.addDep('a', 'a')
    expect(ruleSet.isCoherent()).toBe(true)
  })

  it('a,b b,a is coherent', () => {
    ruleSet.addDep('a', 'b')
    ruleSet.addDep('b', 'a')
    expect(ruleSet.isCoherent()).toBe(true)
  })

  it('a,b b,c a-c is not coherent', () => {
    ruleSet.addDep('a', 'b')
    ruleSet.addDep('b', 'c')
    ruleSet.addConflict('a', 'c')
    expect(ruleSet.isCoherent()).toBe(false)
  })

  it('a,b b,c c,d d,e a,f e-f is not coherent', () => {
    ruleSet.addDep('a', 'b')
    ruleSet.addDep('b', 'c')
    ruleSet.addDep('c', 'd')
    ruleSet.addDep('d', 'e')
    ruleSet.addDep('a', 'f')
    ruleSet.addConflict('e', 'f')
    expect(ruleSet.isCoherent()).toBe(false)
  })

  it('test crazy toggle', () => {
    ruleSet.addDep('a', 'b')
    ruleSet.addDep('b', 'c')
    ruleSet.addDep('c', 'a')
    ruleSet.addDep('d', 'e')
    ruleSet.addConflict('c', 'e')
    expect(ruleSet.isCoherent()).toBe(true)

    options.toggle('a')
    expect(options.getSelection().sort()).toEqual(['a', 'b', 'c'])


    ruleSet.addDep('f', 'f')
    options.toggle('f')
    expect(options.getSelection().sort()).toEqual(['a', 'b', 'c', 'f'])

    options.toggle('e')
    expect(options.getSelection().sort()).toEqual(['e', 'f'])

    options.toggle('b')
    expect(options.getSelection().sort()).toEqual(['a', 'b', 'c', 'f'])

    ruleSet.addDep('b', 'g')
    options.toggle('g')
    options.toggle('b')
    expect(options.getSelection().sort()).toEqual(['f', 'g'])
  })

  it('a,b b,c toggle', () => {
    ruleSet.addDep('a', 'b')
    ruleSet.addDep('b', 'c')

    options.toggle('c')
    expect(options.getSelection().sort()).toEqual(['c'])
  })

  it('a,b b,c toggle', () => {
    ruleSet.addDep('a', 'b')
    ruleSet.addDep('a', 'c')
    ruleSet.addConflict('b', 'd')
    ruleSet.addConflict('b', 'e')

    expect(ruleSet.isCoherent()).toBe(true)

    options.toggle('d')
    options.toggle('e')
    options.toggle('a')
    expect(options.getSelection().sort()).toEqual(['a', 'b', 'c'])
  })
})
