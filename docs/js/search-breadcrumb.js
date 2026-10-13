// SPDX-License-Identifier: MIT
// Show the heading hierarchy of a search result on one line, e.g.
//   Model > Core > Classes > Element
// The search index gets a "breadcrumb" string from hooks/search_breadcrumb.py.
// MkDocs loads this file before search/main.js, so wrap displayResults() on
// DOMContentLoaded (main.js has run by then, and the worker replies later).

window.addEventListener('DOMContentLoaded', function () {
  var original = window.displayResults;
  if (typeof original !== 'function') {
    return;
  }
  window.displayResults = function (results) {
    original(results);
    var articles = document.querySelectorAll('#mkdocs-search-results article');
    results.forEach(function (result, i) {
      if (!result.breadcrumb || !articles[i]) {
        return;
      }
      // <bdi> keeps the text left-to-right inside the right-to-left line
      // used by the CSS to truncate from the left.
      var text = document.createElement('bdi');
      text.textContent = result.breadcrumb;
      var line = document.createElement('p');
      line.className = 'search-breadcrumb';
      line.appendChild(text);
      articles[i].insertBefore(line, articles[i].firstChild);
    });
  };
});
