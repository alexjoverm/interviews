class Definition {
  constructor(id) {
    this.id = id
    this.dependencies = []
    this.conflicts = []
  }

  addDep(dep) {
    if (!this.dependencies.includes(dep)) {
      this.dependencies.push(dep)
    }
  }

  addConflict(conflict) {
    if (!this.conflicts.includes(conflict)) {
      this.conflicts.push(conflict)
    }
  }
}

class RuleSet {
  constructor() {
    this.definitions = {}
  }

  getDefinition(id) {
    if (!this.definitions[id]) {
      this.definitions[id] = new Definition(id)
    }
    return this.definitions[id]
  }

  addDep(a, b) {
    this.getDefinition(a).addDep(b)
    this.getDefinition(b).addDep(a)
  }

  addConflict(a, b) {
    this.getDefinition(a).addConflict(b)
    this.getDefinition(b).addConflict(a)
  }

  recursive(node, result) {
    if (!node.visited) {
      node.visited = true
      result.dependencies = [...result.dependencies, ...node.dependencies]
      result.conflicts = [...result.conflicts, ...node.conflicts]

      for (let dep of node.dependencies) {
        this.recursive(this.definitions[dep], result)
      }
    }
  }

  markAllUnvisited() {
    Object.keys(this.definitions).forEach(def => this.definitions[def].visited = false)
  }

  traverse(definition) {
    let result = {
      dependencies: [],
      conflicts: []
    }
    this.markAllUnvisited()

    for (let dep of definition.dependencies) {
      let def = this.definitions[dep]
      this.recursive(def, result)
    }

    // Deduplicate elements
    return {
      allDependencies: [...new Set(result.dependencies)],
      allConflicts: [...new Set(result.conflicts)]
    }
  }

  traverseFromKey(key) {
    // console.log(this.definitions[key])
    return this.traverse(this.definitions[key])
  }

  checkForConflicts(dependencies, conflicts) {
    for (let dependency of dependencies) {
      if (conflicts.includes(dependency)) {
        return true
      }
    }
    return false
  }

  isCoherent() {
    let definitions = Object.keys(this.definitions).map(key => this.definitions[key])

    for (let definition of definitions) {
      let { allDependencies, allConflicts } = this.traverse(definition)

      // console.log(definition.id, allDependencies, allConflicts)
      if (this.checkForConflicts(allDependencies, allConflicts)) {
        return false
      }
    }

    return true
  }

  hasConflicts(key, targetKey) {
    let definition = this.definitions[key]
    let { allConflicts } = this.traverse(definition)
    return allConflicts.includes(targetKey)
  }
}

class Options {

  constructor(ruleSet) {
    this.ruleSet = ruleSet
    this.state = {}
  }

  toggle(key) {
    if (typeof this.state[key] === 'undefined') {
      this.state[key] = true
    } else {
      this.state[key] = !this.state[key]
    }

    const stateKeys = Object.keys(this.state)
    // get
    for (let stateKey of stateKeys) {
      if (stateKey !== key && this.ruleSet.hasConflicts(stateKey, key)) {
        this.state[stateKey] = !this.state[stateKey]
      }
    }
  }

  getSelection() {
    let selection = []

    const stateKeys = Object.keys(this.state).filter(key => this.state[key] === true)

    for (let key of stateKeys) {
      const { allDependencies, allConflicts } = this.ruleSet.traverseFromKey(key)
      selection = [...selection, ...allDependencies]
    }
    return [...new Set(selection)]
  }
}

module.exports = {
  RuleSet,
  Options
}