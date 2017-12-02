'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSizes = exports.presets = exports.createSizedComponent = undefined;

var _withSizes = require('./withSizes');

var _withSizes2 = _interopRequireDefault(_withSizes);

var _createSizedComponent = require('./createSizedComponent');

var _createSizedComponent2 = _interopRequireDefault(_createSizedComponent);

var _presets = require('./presets');

var presets = _interopRequireWildcard(_presets);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createSizedComponent = _createSizedComponent2.default;
exports.presets = presets;
exports.withSizes = _withSizes2.default;
exports.default = _withSizes2.default;