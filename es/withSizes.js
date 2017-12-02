'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-console */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _getDisplayName = require('./utils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _shallowDiff = require('./utils/shallowDiff');

var _shallowDiff2 = _interopRequireDefault(_shallowDiff);

var _getWindowSizes = require('./utils/getWindowSizes');

var _getWindowSizes2 = _interopRequireDefault(_getWindowSizes);

var _presets = require('./presets');

var presets = _interopRequireWildcard(_presets);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = process && process.env && process.env.NODE_ENV === 'debug';

var withSizes = function withSizes() {
  for (var _len = arguments.length, mappedSizesToProps = Array(_len), _key = 0; _key < _len; _key++) {
    mappedSizesToProps[_key] = arguments[_key];
  }

  return function (WrappedComponent) {
    var _class, _temp2;

    var parseMappedSizesToProps = function parseMappedSizesToProps(dimensions, props) {
      return mappedSizesToProps.map(function (check) {
        return check(dimensions, props);
      }).reduce(function (acc, props) {
        return _extends({}, acc, props);
      }, {});
    };

    return _temp2 = _class = function (_Component) {
      _inherits(ComponentWithSizes, _Component);

      function ComponentWithSizes() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ComponentWithSizes);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ComponentWithSizes.__proto__ || Object.getPrototypeOf(ComponentWithSizes)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          initialSizes: (0, _getWindowSizes2.default)(),
          propsToPass: parseMappedSizesToProps((0, _getWindowSizes2.default)(), _this.props)

          /* Dispatching & Throttling */

        }, _this.dispatchSizes = function () {
          var propsToPass = parseMappedSizesToProps((0, _getWindowSizes2.default)(), _this.props);

          if ((0, _shallowDiff2.default)(propsToPass, _this.state.propsToPass)) {
            _this.setState({ propsToPass: propsToPass });
          }
        }, _this.throttledDispatchSizes = (0, _lodash2.default)(_this.dispatchSizes, 200), _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(ComponentWithSizes, [{
        key: 'componentDidMount',


        /* Lifecycles */

        value: function componentDidMount() {
          window.addEventListener('resize', this.throttledDispatchSizes);

          /* dispatch if aren't computed on first render */
          if (!this.state.initialSizes.canUseDOM) {
            this.dispatchSizes();
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          window.removeEventListener('resize', this.throttledDispatchSizes);
        }
      }, {
        key: 'render',
        value: function render() {
          if (debug) console.log('render', this.state.propsToPass);
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state.propsToPass));
        }
      }]);

      return ComponentWithSizes;
    }(_react.Component), _class.displayName = 'withSizes(' + (0, _getDisplayName2.default)(WrappedComponent) + ')', _temp2;
  };
};

exports.default = Object.assign(withSizes, _extends({}, presets));