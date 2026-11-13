# SPDX-License-Identifier: MIT
"""MkDocs hook: add a heading breadcrumb to every search index entry.

The built-in search plugin stores only the heading text of each entry
(e.g. "Description"), so results are ambiguous.
This hook records, for every entry, the chain of its ancestors
(nav sections > page title > parent headings) in a "breadcrumb" field of
search_index.json.
It is displayed by docs/js/search-breadcrumb.js.
"""

import json
import os

SEPARATOR = " › "  # single right-pointing angle quotation mark

# Search entry location -> list of ancestor titles.
_breadcrumbs = {}


def _walk_toc(items, trail, prefix):
    for item in items:
        _breadcrumbs[prefix + "#" + item.id] = trail
        _walk_toc(item.children, trail + [item.title], prefix)


def on_pre_build(config):
    # Drop entries from previous builds (mkdocs serve keeps this module loaded).
    _breadcrumbs.clear()


def on_page_context(context, page, config, nav):
    # Runs after the page is rendered, so page.toc is populated.
    trail = [a.title for a in reversed(page.ancestors)] + [page.title]
    prefix = page.url
    _breadcrumbs[prefix] = trail[:-1]
    items = page.toc.items
    if len(items) == 1 and items[0].level == 1:
        # A lone <h1> is the page title, already in the trail
        _breadcrumbs[prefix + "#" + items[0].id] = trail[:-1]
        items = items[0].children
    _walk_toc(items, trail, prefix)


def on_post_build(config):
    path = os.path.join(config["site_dir"], "search", "search_index.json")
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    for doc in data["docs"]:
        doc["breadcrumb"] = SEPARATOR.join(_breadcrumbs.get(doc["location"], []))
    with open(path, "w", encoding="utf-8") as f:
        # Same serialization as MkDocs' search plugin
        json.dump(data, f, sort_keys=True, separators=(",", ":"))
