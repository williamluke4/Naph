'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NodeOutputListItem = require('./NodeOutputListItem');

var _NodeOutputListItem2 = _interopRequireDefault(_NodeOutputListItem);

var NodeOutputList = function NodeOutputList(_ref) {
    var onStartConnector = _ref.onStartConnector;
    var items = _ref.items;

    var onMouseDown = (0, _react.useCallback)(function (i) {
        onStartConnector(i);
    }, [onStartConnector]);

    return _react2['default'].createElement(
        'div',
        { className: 'nodeOutputWrapper' },
        _react2['default'].createElement(
            'ul',
            { className: 'nodeOutputList' },
            items.map(function (item, index) {
                return _react2['default'].createElement(_NodeOutputListItem2['default'], {
                    key: index,
                    onMouseDown: onMouseDown,
                    index: index + 1,
                    item: item
                });
            })
        )
    );
};

exports['default'] = _react2['default'].memo(NodeOutputList);
module.exports = exports['default'];