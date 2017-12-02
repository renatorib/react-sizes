"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shallowDiff = function shallowDiff(a, b) {
  for (var i in a) {
    if (!(i in b)) return true;
  }

  for (var _i in b) {
    if (a[_i] !== b[_i]) return true;
  }

  return false;
};

exports.default = shallowDiff;