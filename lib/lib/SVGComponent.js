'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var SVGComponent = function SVGComponent(_ref) {
    var children = _ref.children;
    var childRef = _ref.childRef;

    var rest = _objectWithoutProperties(_ref, ['children', 'childRef']);

    return _react2['default'].createElement(
        'svg',
        _extends({ style: { position: 'absolute', zIndex: 9000 } }, rest, { ref: function (svgRef) {
                return childRef.current = svgRef;
            } }),
        children
    );
};

exports['default'] = _react2['default'].memo(SVGComponent);
module.exports = exports['default'];