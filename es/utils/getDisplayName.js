'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getDisplayName = function getDisplayName(Component) {
  return Component.displayName || Component.name || (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown');
};

exports.default = getDisplayName;