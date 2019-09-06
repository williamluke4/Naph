'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _util = require('./util');

var _TrashIcon = require('./TrashIcon');

var _TrashIcon2 = _interopRequireDefault(_TrashIcon);

var bezierCurve = function bezierCurve(a, b, cp1x, cp1y, cp2x, cp2y, x, y) {
    return 'M' + a + ',' + b + ' C' + cp1x + ',' + cp1y + ' ' + cp2x + ',' + cp2y + '  ' + x + ',' + y;
};

var distance = function distance(a, b) {
    return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
};

var Spline = function Spline(_ref) {
    var mousePos = _ref.mousePos;
    var onClick = _ref.onClick;
    var onClickOutsideFromProps = _ref.onClickOutside;
    var onRemove = _ref.onRemove;
    var start = _ref.start;
    var end = _ref.end;

    var _useState = (0, _react.useState)(false);

    var _useState2 = _slicedToArray(_useState, 2);

    var selected = _useState2[0];
    var setSelected = _useState2[1];

    var _useObjectState = (0, _util.useObjectState)({ x: 0, y: 0 });

    var _useObjectState2 = _slicedToArray(_useObjectState, 2);

    var position = _useObjectState2[0];
    var setPosition = _useObjectState2[1];

    var handleClick = (0, _react.useCallback)(function (e) {
        setSelected(!selected);
        setPosition(mousePos);
        if (onClick) {
            onClick(e);
        }
    }, [selected, mousePos, onClick]);

    Spline.handleClickOutside = (0, _react.useCallback)(function (e) {
        setSelected(false);

        if (onClickOutsideFromProps) {
            onClickOutsideFromProps(e);
        }
    }, [onClickOutsideFromProps]);

    var handleRemove = (0, _react.useCallback)(function (e) {
        setSelected(false);

        if (onRemove) {
            onRemove(e);
        }
    }, [onRemove]);

    var dist = (0, _react.useMemo)(function () {
        return distance([start.x, start.y], [end.x, end.y]);
    }, [start, end]);

    var pathString = (0, _react.useMemo)(function () {
        return bezierCurve(start.x, // start x
        start.y, // start y
        start.x + dist * 0.25, // cp1 x
        start.y, // cp1 y
        end.x - dist * 0.75, // cp2 x
        end.y, // cp2 y
        end.x, // end x
        end.y) // end y
        ;
    }, [start, end]);

    var className = (0, _react.useMemo)(function () {
        return 'connector' + (selected ? ' selected' : '');
    }, [selected]);

    return _react2['default'].createElement(
        'g',
        null,
        _react2['default'].createElement('circle', { cx: start.x, cy: start.y, r: '3', fill: '#337ab7' }),
        _react2['default'].createElement('circle', { cx: end.x, cy: end.y, r: '3', fill: '#9191A8' }),
        _react2['default'].createElement('path', { className: 'connector-click-area', d: pathString, onClick: handleClick }),
        _react2['default'].createElement('path', { className: className, d: pathString, onClick: handleClick }),
        selected && _react2['default'].createElement(_TrashIcon2['default'], {
            position: position,
            onClick: handleRemove
        })
    );
};

var clickOutsideConfig = {
    handleClickOutside: function handleClickOutside() {
        return Spline.handleClickOutside;
    }
};

exports['default'] = (0, _reactOnclickoutside2['default'])(Spline, clickOutsideConfig);
module.exports = exports['default'];