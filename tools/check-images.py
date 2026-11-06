#!/usr/bin/env python3
"""
Checks that every picture named in assets/js/data.js exists in your folders,
with exactly the same capital letters (Windows ignores capitals, GitHub does not).

Usage (from the website folder):
    python tools/check-images.py
"""
import json, os, re, sys
from pathlib import Path

site = Path(__file__).resolve().parent.parent
data = (site / "assets/js/data.js").read_text(encoding="utf-8")
cfg = (site / "assets/js/config.js").read_text(encoding="utf-8")


def setting_list(name):
    m = re.search(r"var %s\s*=\s*\[(.*?)\];" % name, cfg, re.S)
    if not m:
        sys.exit("%s is missing in assets/js/config.js" % name)
    return json.loads("[" + m.group(1).replace("'", '"') + "]")


exts = setting_list("IMAGE_EXTENSIONS")
project_roots, cert_roots = setting_list("PROJECT_ROOTS"), setting_list("CERT_ROOTS")


def grab(name):
    m = re.search(r"var %s = (\[.*?\n\]);" % name, data, re.S)
    if not m:
        sys.exit("Could not read %s from data.js" % name)
    try:
        return json.loads(m.group(1))
    except ValueError as e:
        sys.exit("data.js has a typo in %s (%s). Fix it and run again." % (name, e))


def check(rel):
    """None if the file exists with exactly this spelling, otherwise a reason."""
    cur = site
    for part in Path(rel).parts:
        if part == "..":
            cur = cur.parent
            continue
        names = os.listdir(cur) if cur.is_dir() else []
        if part in names:
            cur = cur / part
            continue
        for n in names:
            if n.lower() == part.lower():
                return 'capital letters differ: the folder has "%s", data.js says "%s"' % (n, part)
        return "missing"
    return None


def pick(roots, first):
    for r in roots:
        if check(r + first + ext) is None:
            return r
    return roots[0]


def files_of(g):
    for f in g.get("files", []):
        yield g["dir"], f
    for c in g.get("children", []):
        yield from files_of(c)


projects, certs = grab("PROJECTS"), grab("CERTIFICATES")
p0 = projects[0]
proot, ext = next(((r, x) for r in project_roots for pr in (p0["root"], p0["root"] + "/" + p0["root"].split("/")[-1]) for x in exts if check(r + pr + "/" + p0["cover"] + x) is None), (project_roots[0], exts[0]))
croot, cext = next(((r, x) for r in cert_roots for x in exts if check(r + certs[0]["file"] + x) is None), (cert_roots[0], exts[0]))
print("Project pictures are read from:", proot, "(" + ext + " files)")
print("Certificates are read from:    ", croot, "(" + cext + " files)\n")
problems = total = 0
for p in projects:
    choices = [p["root"], p["root"] + "/" + p["root"].split("/")[-1]]
    root = next((r for r in choices if check(proot + r + "/" + p["cover"] + ext) is None), p["root"])
    base = proot + root + "/"
    items = [base + p["cover"] + ext] + [base + d + "/" + f + ext for g in p["groups"] for d, f in files_of(g)]
    bad = [(i, check(i)) for i in items]
    bad = [(i, why) for i, why in bad if why]
    total += len(items)
    problems += len(bad)
    print("%-14s %3d pictures, %3d problems" % (p["title"], len(items), len(bad)))
    for i, why in bad[:8]:
        print("    ", i, "->", why)
    if len(bad) > 8:
        print("     ...and", len(bad) - 8, "more")
for c in certs:
    i = croot + c["file"] + cext
    total += 1
    why = check(i)
    if why:
        problems += 1
        print("Certificate", c["title"], "->", i, "->", why)
print("\nChecked %d pictures. %s" % (total, "All found." if not problems else "%d problems to fix." % problems))
