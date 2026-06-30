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

function processCell(cell) {
  var walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
  var nodes = [];
  var node;
  while ((node = walker.nextNode())) nodes.push(node);
  nodes.forEach(insertWordBreaks);
}

document.addEventListener('DOMContentLoaded', function () {
  var cells = Array.from(document.querySelectorAll('td'));
  if (!cells.length) return;

  if ('requestIdleCallback' in window) {
    function processChunk(deadline) {
      while (cells.length > 0 && deadline.timeRemaining() > 1) {
        processCell(cells.shift());
      }
      if (cells.length > 0) {
        requestIdleCallback(processChunk);
      }
    }
    requestIdleCallback(processChunk);
  } else {
    // Fallback: chunk via setTimeout to avoid blocking initial render
    function processChunkSync() {
      var deadline = performance.now() + 10;
      while (cells.length > 0 && performance.now() < deadline) {
        processCell(cells.shift());
      }
      if (cells.length > 0) {
        setTimeout(processChunkSync, 0);
      }
    }
    setTimeout(processChunkSync, 0);
  }
});
