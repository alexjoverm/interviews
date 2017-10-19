# Run with: `python -m unittest discover`

import unittest

from ruleset import RuleSet, Options


class Test(unittest.TestCase):
    def test_depends_aa(self):
        rs = RuleSet()

        rs.addDep("a", "a")

        self.assertTrue(rs.isCoherent(), "rs.isCoherent failed")

    def test_depends_ab_ba(self):
        rs = RuleSet()

        rs.addDep("a", "b")
        rs.addDep("b", "a")

        self.assertTrue(rs.isCoherent(), "rs.isCoherent failed")

    def test_exclusive_ab(self):
        rs = RuleSet()

        rs.addDep("a", "b")
        rs.addConflict("a", "b")

        self.assertFalse(rs.isCoherent(), "rs.isCoherent failed")

    def test_exclusive_ab_bc(self):
        rs = RuleSet()

        rs.addDep("a", "b")
        rs.addDep("b", "c")
        rs.addConflict("a", "c")

        self.assertFalse(rs.isCoherent(), "rs.isCoherent failed")

    def test_deep_deps(self):
        rs = RuleSet()

        rs.addDep("a", "b")
        rs.addDep("b", "c")
        rs.addDep("c", "d")
        rs.addDep("d", "e")
        rs.addDep("a", "f")
        rs.addConflict("e", "f")

        self.assertFalse(rs.isCoherent(), "rs.isCoherent failed")

    def test_exclusive_ab_bc_ca_de(self):
        rs = RuleSet()
        rs.addDep("a", "b")
        rs.addDep("b", "c")
        rs.addDep("c", "a")
        rs.addDep("d", "e")
        rs.addConflict("c", "e")

        self.assertTrue(rs.isCoherent(), "rs.isCoherent failed")

        opts = Options(rs)

        opts.toggle("a")
        self.assertSetEqual(
            opts.selection(),
            set(["a", "c", "b"]),
            "toggle expected (a, c, b) got %s" % opts.selection(),
        )

        rs.addDep("f", "f")
        opts.toggle("f")
        self.assertSetEqual(
            opts.selection(),
            set(["a", "c", "b", "f"]),
            "toggle expected (a, c, b, f) got %s" % opts.selection(),
        )

        opts.toggle("e")
        self.assertSetEqual(
            opts.selection(),
            set(["e", "f"]),
            "toggle expected (e, f) got %s" % opts.selection(),
        )

        opts.toggle("b")
        self.assertSetEqual(
            opts.selection(),
            set(["a", "c", "b", "f"]),
            "toggle expected (a, c, b, f) got %s" % opts.selection(),
        )

        rs.addDep("b", "g")
        opts.toggle("g")
        opts.toggle("b")
        self.assertSetEqual(
            opts.selection(),
            set(["g", "f"]),
            "toggle expected (g, f) got %s" % opts.selection(),
        )

    def test_ab_bc_toggle(self):
        rs = RuleSet()

        rs.addDep("a", "b")
        rs.addDep("b", "c")
        opts = Options(rs)
        opts.toggle("c")

        self.assertSetEqual(
            opts.selection(),
            set(["c"]),
            "toggle expected (c) got %s" % opts.selection(),
        )

    # Multiple dependencies and exclusions.
    def test_ab_ac(self):
        rs = RuleSet()

        rs.addDep("a", "b")
        rs.addDep("a", "c")
        rs.addConflict("b", "d")
        rs.addConflict("b", "e")

        self.assertTrue(rs.isCoherent(), "rs.isCoherent failed")

        opts = Options(rs)
        opts.toggle("d")
        opts.toggle("e")
        opts.toggle("a")
        self.assertSetEqual(
            opts.selection(),
            set(["a", "c", "b"]),
            "toggle expected (a, c, b) got %s" % opts.selection(),
        )