package opts

import (
	"reflect"
	"sort"
	"testing"
)

func TestDependsAA(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "a")
	if !s.IsCoherent() {
		t.Error("s.IsCoherent failed")
	}
}

func TestDependsAB_BA(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "b")
	s.AddDep("b", "a")
	if !s.IsCoherent() {
		t.Error("s.IsCoherent failed")
	}
}

func TestExclusiveAB(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "b")
	s.AddConflict("a", "b")
	if s.IsCoherent() {
		t.Error("s.IsCoherent failed")
	}
}

func TestExclusiveAB_BC(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "b")
	s.AddDep("b", "c")
	s.AddConflict("a", "c")
	if s.IsCoherent() {
		t.Error("s.IsCoherent failed")
	}
}

func TestDeepDeps(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "b")
	s.AddDep("b", "c")
	s.AddDep("c", "d")
	s.AddDep("d", "e")
	s.AddDep("a", "f")
	s.AddConflict("e", "f")

	if s.IsCoherent() {
		t.Error("IsCoherent failed")
	}
}

func TestExclusiveAB_BC_CA_DE(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "b")
	s.AddDep("b", "c")
	s.AddDep("c", "a")
	s.AddDep("d", "e")
	s.AddConflict("c", "e")
	if !s.IsCoherent() {
		t.Error("s.IsCoherent failed")
	}

	selected := New(s)

	selected.Toggle("a")
	if !Eq(selected.StringSlice(), []string{"a", "c", "b"}) {
		t.Errorf("Toggle expected {a, c, b} got %s", selected.StringSlice())
	}

	s.AddDep("f", "f")
	selected.Toggle("f")
	if !Eq(selected.StringSlice(), []string{"a", "c", "b", "f"}) {
		t.Errorf("Toggle expected {a, c, b, f} got %s", selected.StringSlice())
	}

	selected.Toggle("e")
	if !Eq(selected.StringSlice(), []string{"e", "f"}) {
		t.Errorf("Toggle expected {e, f} got %s", selected.StringSlice())
	}

	selected.Toggle("b")
	if !Eq(selected.StringSlice(), []string{"a", "c", "b", "f"}) {
		t.Errorf("Toggle expected {a, c, b, f} got %s", selected.StringSlice())
	}

	s.AddDep("b", "g")
	selected.Toggle("g")
	selected.Toggle("b")
	if !Eq(selected.StringSlice(), []string{"g", "f"}) {
		t.Errorf("Toggle expected {g, f} got %s", selected.StringSlice())
	}
}

func TestAB_BC_Toggle(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "b")
	s.AddDep("b", "c")
	selected := New(s)
	selected.Toggle("c")
	if !Eq(selected.StringSlice(), []string{"c"}) {
		t.Errorf("Toggle expected {c} got %s", selected.StringSlice())
	}
}

// Multiple dependencies and exclusions.
func TestAB_AC(t *testing.T) {
	s := NewRuleSet()
	s.AddDep("a", "b")
	s.AddDep("a", "c")
	s.AddConflict("b", "d")
	s.AddConflict("b", "e")
	if !s.IsCoherent() {
		t.Error("s.IsCoherent failed")
	}

	selected := New(s)
	selected.Toggle("d")
	selected.Toggle("e")
	selected.Toggle("a")
	if !Eq(selected.StringSlice(), []string{"a", "c", "b"}) {
		t.Errorf("Toggle expected {a, c, b} got %s", selected.StringSlice())
	}
}

func Eq(a, b []string) bool {
	sort.Strings(a)
	sort.Strings(b)
	return reflect.DeepEqual(a, b)
}