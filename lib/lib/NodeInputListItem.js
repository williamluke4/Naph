'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var NodeInputListItem = function NodeInputListItem(_ref) {
    var index = _ref.index;
    var onMouseUp = _ref.onMouseUp;
    var item = _ref.item;

    var _useState = (0, _react.useState)(false);

    var _useState2 = _slicedToArray(_useState, 2);

    var isHover = _useState2[0];
    var setHover = _useState2[1];

    var handleMouseUp = (0, _react.useCallback)(function (e) {
        e.stopPropagation();
        e.preventDefault();

        onMouseUp(index);
    }, [index, onMouseUp]);

    var handleMouseOver = (0, _react.useCallback)(function () {
        setHover(true);
    }, []);

    var handleMouseOut = (0, _react.useCallback)(function () {
        setHover(false);
    }, []);

    var noop = (0, _react.useCallback)(function (e) {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    return _react2['default'].createElement(
        'li',
        null,
        _react2['default'].createElement(
            'a',
            { onClick: noop, onMouseUp: handleMouseUp, href: '#' },
            _react2['default'].createElement('i', {
                className: isHover ? 'fa fa-circle-o hover' : 'fa fa-circle-o',
                onMouseOver: handleMouseOver,
                onMouseOut: handleMouseOut
            }),
            item.name
        )
    );
};

exports['default'] = _react2['default'].memo(NodeInputListItem);
module.exports = exports['default'];