// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/libs/stats.min.js":[function(require,module,exports) {
// stats.js - http://github.com/mrdoob/stats.js
var Stats = function () {
  function h(a) {
    c.appendChild(a.dom);
    return a;
  }

  function k(a) {
    for (var d = 0; d < c.children.length; d++) c.children[d].style.display = d === a ? "block" : "none";

    l = a;
  }

  var l = 0,
      c = document.createElement("div");
  c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
  c.addEventListener("click", function (a) {
    a.preventDefault();
    k(++l % c.children.length);
  }, !1);
  var g = (performance || Date).now(),
      e = g,
      a = 0,
      r = h(new Stats.Panel("FPS", "#0ff", "#002")),
      f = h(new Stats.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory) var t = h(new Stats.Panel("MB", "#f08", "#201"));
  k(0);
  return {
    REVISION: 16,
    dom: c,
    addPanel: h,
    showPanel: k,
    begin: function () {
      g = (performance || Date).now();
    },
    end: function () {
      a++;
      var c = (performance || Date).now();
      f.update(c - g, 200);

      if (c > e + 1E3 && (r.update(1E3 * a / (c - e), 100), e = c, a = 0, t)) {
        var d = performance.memory;
        t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
      }

      return c;
    },
    update: function () {
      g = this.end();
    },
    domElement: c,
    setMode: k
  };
};

Stats.Panel = function (h, k, l) {
  var c = Infinity,
      g = 0,
      e = Math.round,
      a = e(window.devicePixelRatio || 1),
      r = 80 * a,
      f = 48 * a,
      t = 3 * a,
      u = 2 * a,
      d = 3 * a,
      m = 15 * a,
      n = 74 * a,
      p = 30 * a,
      q = document.createElement("canvas");
  q.width = r;
  q.height = f;
  q.style.cssText = "width:80px;height:48px";
  var b = q.getContext("2d");
  b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
  b.textBaseline = "top";
  b.fillStyle = l;
  b.fillRect(0, 0, r, f);
  b.fillStyle = k;
  b.fillText(h, t, u);
  b.fillRect(d, m, n, p);
  b.fillStyle = l;
  b.globalAlpha = .9;
  b.fillRect(d, m, n, p);
  return {
    dom: q,
    update: function (f, v) {
      c = Math.min(c, f);
      g = Math.max(g, f);
      b.fillStyle = l;
      b.globalAlpha = 1;
      b.fillRect(0, 0, r, m);
      b.fillStyle = k;
      b.fillText(e(f) + " " + h + " (" + e(c) + "-" + e(g) + ")", t, u);
      b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
      b.fillRect(d + n - a, m, a, p);
      b.fillStyle = l;
      b.globalAlpha = .9;
      b.fillRect(d + n - a, m, a, e((1 - f / v) * p));
    }
  };
};

"object" === typeof module && (module.exports = Stats);
},{}]},{},["js/libs/stats.min.js"], null)
//# sourceMappingURL=/stats.min.ee8be61f.js.map