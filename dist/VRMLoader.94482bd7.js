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
})({"js/loaders/VRMLoader.js":[function(require,module,exports) {
/**
 * @author Takahiro / https://github.com/takahirox
 */
// VRM Specification: https://dwango.github.io/vrm/vrm_spec/
//
// VRM is based on glTF 2.0 and VRM extension is defined
// in top-level json.extensions.VRM
THREE.VRMLoader = function () {
  function VRMLoader(manager) {
    if (THREE.GLTFLoader === undefined) {
      throw new Error('THREE.VRMLoader: Import THREE.GLTFLoader.');
    }

    this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;
    this.gltfLoader = new THREE.GLTFLoader(this.manager);
  }

  VRMLoader.prototype = {
    constructor: VRMLoader,
    crossOrigin: 'anonymous',
    load: function (url, onLoad, onProgress, onError) {
      var scope = this;
      this.gltfLoader.load(url, function (gltf) {
        scope.parse(gltf, onLoad);
      }, onProgress, onError);
    },
    setCrossOrigin: function (value) {
      this.glTFLoader.setCrossOrigin(value);
      return this;
    },
    setPath: function (value) {
      this.glTFLoader.setPath(value);
      return this;
    },
    setDRACOLoader: function (dracoLoader) {
      this.glTFLoader.setDRACOLoader(dracoLoader);
      return this;
    },
    parse: function (gltf, onLoad) {
      var gltfParser = gltf.parser;
      var gltfExtensions = gltf.userData.gltfExtensions || {};
      var vrmExtension = gltfExtensions.VRM || {}; // handle VRM Extension here

      onLoad(gltf);
    }
  };
  return VRMLoader;
}();
},{}]},{},["js/loaders/VRMLoader.js"], null)
//# sourceMappingURL=/VRMLoader.94482bd7.js.map