'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getWindowSizes = function getWindowSizes() {
  var canUseDOM = typeof window !== 'undefined';

  return {
    width: canUseDOM ? window.innerWidth : null,
    height: canUseDOM ? window.innerHeight : null,
    canUseDOM: canUseDOM
  };
};

exports.default = getWindowSizes;