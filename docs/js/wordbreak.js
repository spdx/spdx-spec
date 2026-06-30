// Insert <wbr> (word break opportunity) at camelCase boundaries and before
// slashes in table cells. Plain prose is unchanged.

const TEST_RE = /[a-z][A-Z]|\//;
const BREAK_RE = /[a-z](?=[A-Z])|(?=\/)/g;

function insertWordBreaks(child) {
  var text = child.textContent;
  if (!TEST_RE.test(text)) return;

  var frag = document.createDocumentFragment();
  var last = 0;
  BREAK_RE.lastIndex = 0;
  var m;
  while ((m = BREAK_RE.exec(text)) !== null) {
    var pos = m.index + m[0].length;
    frag.appendChild(document.createTextNode(text.slice(last, pos)));
    frag.appendChild(document.createElement('wbr'));
    last = pos;
  }
  frag.appendChild(document.createTextNode(text.slice(last)));
  child.parentNode.replaceChild(frag, child);
}

function run() {
  document.querySelectorAll('td').forEach(function (cell) {
    var walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(insertWordBreaks);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(run);
  } else {
    run();
  }
});
