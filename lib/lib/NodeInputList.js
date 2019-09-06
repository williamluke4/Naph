'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NodeInputListItem = require('./NodeInputListItem');

var _NodeInputListItem2 = _interopRequireDefault(_NodeInputListItem);

var NodeInputList = function NodeInputList(_ref) {
    var onCompleteConnector = _ref.onCompleteConnector;
    var items = _ref.items;

    var handleMouseUp = (0, _react.useCallback)(function (i) {
        onCompleteConnector(i);
    }, [onCompleteConnector]);

    return _react2['default'].createElement(
        'div',
        { className: 'nodeInputWrapper' },
        _react2['default'].createElement(
            'ul',
            { className: 'nodeInputList' },
            items.map(function (item, index) {
                return _react2['default'].createElement(_NodeInputListItem2['default'], {
                    onMouseUp: handleMouseUp,
                    key: index,
                    index: index + 1,
                    item: item
                });
            })
        )
    );
};

exports['default'] = _react2['default'].memo(NodeInputList);
module.exports = exports['default'];