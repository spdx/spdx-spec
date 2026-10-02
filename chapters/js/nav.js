// The readthedocs theme scrolls the current nav item to the top of the
// sidebar on every page load, which hides the logo and search box.
// Only scroll the sidebar when the current item is out of view.
(function () {
  var nav = window.SphinxRtdTheme && window.SphinxRtdTheme.Navigation;
  if (!nav) return;
  var originalReset = nav.reset;
  nav.reset = function () {
    var proto = Element.prototype;
    var originalScrollIntoView = proto.scrollIntoView;
    proto.scrollIntoView = function () {};
    try {
      originalReset.apply(this, arguments);
    } finally {
      proto.scrollIntoView = originalScrollIntoView;
    }
    var current = document.querySelector(".wy-menu-vertical a.current");
    if (current) current.scrollIntoView({ block: "nearest" });
  };
})();
