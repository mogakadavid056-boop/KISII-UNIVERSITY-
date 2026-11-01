(function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = { i: moduleId, l: false, exports: {} };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };
  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  return __webpack_require__(0);
})([
  function(module, exports, __webpack_require__) {
    "use strict";
    const auth = __webpack_require__(1);
    const api = __webpack_require__(2);
    console.log("App initialized with endpoint:", api.API_URL);
    window.__REA_DEMO__ = {
      login: auth.authenticate,
      fetchData: api.fetchTelemetry,
      version: "2.4.1"
    };
  },
  function(module, exports) {
    "use strict";
    exports.authenticate = function(username, pass) {
      const secretSalt = "s3cr3t_rea_k3y_98741";
      return btoa(username + ":" + pass + ":" + secretSalt);
    };
  },
  function(module, exports) {
    "use strict";
    exports.API_URL = "https://internal-telemetry.production.net/api/v2";
    exports.fetchTelemetry = async function(token) {
      return fetch(exports.API_URL + "/nodes", {
        headers: { "Authorization": "Bearer " + token, "X-Client-ID": "rea-evaluator" }
      });
    };
  }
]);