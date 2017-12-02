'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _withSizes = require('./withSizes');

var _withSizes2 = _interopRequireDefault(_withSizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Conductor = function Conductor(_ref) {
  var children = _ref.children,
      render = _ref.render,
      props = _objectWithoutProperties(_ref, ['children', 'render']);

  var fn = children || render;
  return fn ? fn(props) : null;
};

var createSizedComponent = function createSizedComponent() {
  for (var _len = arguments.length, mapSizesToProps = Array(_len), _key = 0; _key < _len; _key++) {
    mapSizesToProps[_key] = arguments[_key];
  }

  return (0, _withSizes2.default)(mapSizesToProps)(Conductor);
};

exports.default = createSizedComponent;