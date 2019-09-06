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

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _NodeInputList = require('./NodeInputList');

var _NodeInputList2 = _interopRequireDefault(_NodeInputList);

var _NodeOutputList = require('./NodeOutputList');

var _NodeOutputList2 = _interopRequireDefault(_NodeOutputList);

var Node = function Node(_ref) {
    var nid = _ref.nid;
    var pos = _ref.pos;
    var title = _ref.title;
    var inputs = _ref.inputs;
    var outputs = _ref.outputs;
    var onNodeStart = _ref.onNodeStart;
    var onNodeStop = _ref.onNodeStop;
    var onNodeMove = _ref.onNodeMove;
    var onNodeSelect = _ref.onNodeSelect;
    var onNodeDeselect = _ref.onNodeDeselect;
    var onStartConnector = _ref.onStartConnector;
    var onCompleteConnector = _ref.onCompleteConnector;
    var propIndex = _ref.index;

    var _useState = (0, _react.useState)(false);

    var _useState2 = _slicedToArray(_useState, 2);

    var isSelected = _useState2[0];
    var setSelected = _useState2[1];

    var handleDragStart = (0, _react.useCallback)(function (event, ui) {
        onNodeStart(nid, ui);
    }, [nid, onNodeStart]);

    var handleDragStop = (0, _react.useCallback)(function (event, ui) {
        onNodeStop(nid, ui.position);
    }, [nid, onNodeStop]);

    var handleDrag = (0, _react.useCallback)(function (event, ui) {
        onNodeMove(propIndex, ui.position);
    }, [onNodeMove, propIndex]);

    var handleStartConnector = (0, _react.useCallback)(function (index) {
        onStartConnector(nid, index);
    }, [nid, onStartConnector]);

    var handleCompleteConnector = (0, _react.useCallback)(function (index) {
        onCompleteConnector(nid, index);
    }, [nid, onCompleteConnector]);

    var handleClick = (0, _react.useCallback)(function () {
        setSelected(true);
        if (onNodeSelect) {
            onNodeSelect(nid);
        }
    }, [nid, onNodeSelect]);

    Node.handleClickOutside = (0, _react.useCallback)(function () {
        if (onNodeDeselect && isSelected) {
            onNodeDeselect(nid);
        }
        setSelected(false);
    }, [nid, isSelected, onNodeDeselect]);

    var nodeClass = (0, _react.useMemo)(function () {
        return 'node' + (isSelected ? ' selected' : '');
    }, [isSelected]);

    return _react2['default'].createElement(
        'div',
        { onDoubleClick: handleClick },
        _react2['default'].createElement(
            _reactDraggable2['default'],
            {
                start: { x: pos.x, y: pos.y },
                handle: '.node-header',
                onStart: handleDragStart,
                onStop: handleDragStop,
                onDrag: handleDrag },
            _react2['default'].createElement(
                'section',
                { className: nodeClass, style: { zIndex: 10000 } },
                _react2['default'].createElement(
                    'header',
                    { className: 'node-header' },
                    _react2['default'].createElement(
                        'span',
                        { className: 'node-title' },
                        title
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'node-content' },
                    _react2['default'].createElement(_NodeInputList2['default'], {
                        items: inputs,
                        onCompleteConnector: handleCompleteConnector
                    }),
                    _react2['default'].createElement(_NodeOutputList2['default'], {
                        items: outputs,
                        onStartConnector: handleStartConnector
                    })
                )
            )
        )
    );
};

var clickOutsideConfig = {
    handleClickOutside: function handleClickOutside() {
        return Node.handleClickOutside;
    }
};

exports['default'] = (0, _reactOnclickoutside2['default'])(Node, clickOutsideConfig);
module.exports = exports['default'];