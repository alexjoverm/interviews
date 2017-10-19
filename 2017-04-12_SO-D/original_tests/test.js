// Import your code here 

var s, selected;

s = makeRelationshipSet();
s = dependsOn('a', 'a', s);
console.assert(checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'a', s);
console.assert(checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = areExclusive('a', 'b', s);
console.assert(!checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = areExclusive('a', 'c', s);
console.assert(!checkRelationships(s));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = dependsOn('c', 'a', s);
s = dependsOn('d', 'e', s);
s = areExclusive('c', 'e', s);
console.assert(checkRelationships(s));

// This function takes some arguments and returns a set of selected options.
// If needed, you should replace it with your own data structure.
function set() {
  var l = {};
  for (var i in arguments) {
    l[arguments[i]] = true;
  }
  return l;
}

// This function returns whether two sets of selected options have the same options selected.
// If needed, you should reimplement it for your own data structure.
function setsEqual(a, b) {
  var ka = Object.keys(a).sort();
  var kb = Object.keys(b).sort();
  if (ka.length != kb.length) {
    return false;
  }
  for (var i in ka) {
    if (kb[i] != ka[i]) {
      return false;
    }
  }
  return true;
}

selected = set();  // Or list, array, etc.

selected = toggle(selected, 'a', s);
console.assert(setsEqual(selected, set('a', 'c', 'b')));

s = dependsOn('f', 'f', s);
selected = toggle(selected, 'f', s);
console.assert(setsEqual(selected, set('a', 'c', 'b', 'f')));

selected = toggle(selected, 'e', s);
console.assert(setsEqual(selected, set('e', 'f')));

selected = toggle(selected, 'b', s);
console.assert(setsEqual(selected, set('a', 'c', 'b', 'f')));

s = dependsOn('b', 'g', s);
selected = toggle(selected, 'g', s);
selected = toggle(selected, 'b', s);
console.assert(setsEqual(selected, set('g', 'f')));

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
selected = set();
selected = toggle(selected, 'c', s);
console.assert(setsEqual(selected, set('c')));

// Deep dependencies
s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('b', 'c', s);
s = dependsOn('c', 'd', s);
s = dependsOn('d', 'e', s);
s = dependsOn('a', 'f', s);
s = areExclusive('e', 'f', s);
console.assert(checkRelationships(s));

// Multiple dependencies and exclusions.

s = makeRelationshipSet();
s = dependsOn('a', 'b', s);
s = dependsOn('a', 'c', s);
s = areExclusive('b', 'd', s);
s = areExclusive('b', 'e', s);
console.assert(checkRelationships(s));
selected = set();
selected = toggle(selected, 'd', s);
selected = toggle(selected, 'e', s);
selected = toggle(selected, 'a', s);
console.assert(setsEqual(selected, set('a', 'c', 'b')));