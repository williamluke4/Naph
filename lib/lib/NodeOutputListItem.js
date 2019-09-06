"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var NodeOutputListItem = function NodeOutputListItem(_ref) {
    var onMouseDown = _ref.onMouseDown;
    var index = _ref.index;
    var item = _ref.item;

    var handleMouseDown = (0, _react.useCallback)(function (e) {
        e.stopPropagation();
        e.preventDefault();

        onMouseDown(index);
    }, []);

    var noop = (0, _react.useCallback)(function (e) {
        e.stopPropagation();
        e.preventDefault();
    }, []);

    return _react2["default"].createElement(
        "li",
        { onMouseDown: handleMouseDown },
        _react2["default"].createElement(
            "a",
            { href: "#", onClick: noop },
            item.name,
            _react2["default"].createElement("i", { className: "fa fa-circle-o" })
        )
    );
};

exports["default"] = _react2["default"].memo(NodeOutputListItem);
module.exports = exports["default"];