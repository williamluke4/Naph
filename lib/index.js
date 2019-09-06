'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashClonedeep = require('lodash.clonedeep');

var _lodashClonedeep2 = _interopRequireDefault(_lodashClonedeep);

var _libNode = require('./lib/Node');

var _libNode2 = _interopRequireDefault(_libNode);

var _libSpline = require('./lib/Spline');

var _libSpline2 = _interopRequireDefault(_libSpline);

var _libSVGComponent = require('./lib/SVGComponent');

var _libSVGComponent2 = _interopRequireDefault(_libSVGComponent);

var _libUtil = require('./lib/util');

var getNodebyId = function getNodebyId(nodes, nid) {
    var reval = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var node = _step.value;

            if (node.nid === nid) {
                return nodes[reval];
            } else {
                reval++;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

var index = function index(_ref) {
    var data = _ref.data;
    var onNodeStartMove = _ref.onNodeStartMove;
    var onNodeMove = _ref.onNodeMove;
    var onNodeSelect = _ref.onNodeSelect;
    var onNodeDeselect = _ref.onNodeDeselect;
    var onNewConnector = _ref.onNewConnector;
    var onRemoveConnector = _ref.onRemoveConnector;

    var _useObjectState = (0, _libUtil.useObjectState)({
        data: data,
        source: [],
        dragging: false
    });

    var _useObjectState2 = _slicedToArray(_useObjectState, 2);

    var state = _useObjectState2[0];
    var setState = _useObjectState2[1];

    var svgRef = (0, _react.useRef)(null);

    (0, _react.useEffect)(function () {
        setState({
            data: data
        });
    }, [data]);

    (0, _react.useEffect)(function () {
        function handleMouseUp() {
            setState({ dragging: false });
        }

        function handleMouseMove(e) {
            e.stopPropagation();
            e.preventDefault();

            //Get svg element position to substract offset top and left
            var svgRect = svgRef.current.getBoundingClientRect();

            setState({
                mousePos: {
                    x: e.pageX - svgRect.left,
                    y: e.pageY - svgRect.top
                }
            });
        }

        document.addEventListener('mousemove', handleMouseUp);
        document.addEventListener('mouseup', handleMouseMove);

        return function () {
            document.removeEventListener('mousemove', handleMouseUp);
            document.removeEventListener('mouseup', handleMouseMove);
        };
    }, []);

    var handleNodeStart = (0, _react.useCallback)(function (nid) {
        onNodeStartMove(nid);
    }, [onNodeStartMove]);

    var handleNodeStop = (0, _react.useCallback)(function (nid, pos) {
        onNodeMove(nid, pos);
    }, [onNodeMove]);

    var handleNodeMove = (0, _react.useCallback)(function (nodeIndex, pos) {
        var d = (0, _lodashClonedeep2['default'])(state.data);

        d.nodes[nodeIndex].x = pos.left;
        d.nodes[nodeIndex].y = pos.top;

        setState({ data: d });
    }, [state.data]);

    var handleStartConnector = (0, _react.useCallback)(function (nid, outputIndex) {
        setState({ dragging: true, source: [nid, outputIndex] });
    }, []);

    var handleCompleteConnector = (0, _react.useCallback)(function (nid, inputIndex) {
        if (state.dragging) {

            var nodes = state.data.nodes;
            var fromNode = getNodebyId(nodes, state.source[0]);
            var fromPinName = fromNode.fields.out[state.source[1]].name;
            var toNode = getNodebyId(nodes, nid);
            var toPinName = toNode.fields['in'][inputIndex].name;

            onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
        }
        setState({ dragging: false });
    }, [state, onNewConnector]);

    var handleRemoveConnector = (0, _react.useCallback)(function (connector) {
        if (onRemoveConnector) {
            onRemoveConnector(connector);
        }
    }, [onRemoveConnector]);

    var handleNodeSelect = (0, _react.useCallback)(function (nid) {
        if (onNodeSelect) {
            onNodeSelect(nid);
        }
    }, [onNodeSelect]);

    var handleNodeDeselect = (0, _react.useCallback)(function (nid) {
        if (onNodeDeselect) {
            onNodeDeselect(nid);
        }
    }, [onNodeDeselect]);

    var computePinIndexfromLabel = (0, _react.useCallback)(function (pins, pinLabel) {
        var reval = 0;

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = pins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var pin = _step2.value;

                if (pin.name === pinLabel) {
                    return reval;
                } else {
                    reval++;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                    _iterator2['return']();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }, []);

    var renderComponents = function renderComponents() {

        var nodes = state.data.nodes;
        var connectors = state.data.connections;
        var mousePos = state.mousePos;
        var dragging = state.dragging;

        var newConnector = null;

        if (dragging) {

            var sourceNode = getNodebyId(nodes, state.source[0]);
            var connectorStart = (0, _libUtil.computeOutOffsetByIndex)(sourceNode.x, sourceNode.y, state.source[1]);
            var connectorEnd = { x: state.mousePos.x, y: state.mousePos.y };

            newConnector = _react2['default'].createElement(_libSpline2['default'], {
                start: connectorStart,
                end: connectorEnd
            });
        }

        return _react2['default'].createElement(
            'div',
            { className: dragging ? 'dragging' : '' },
            nodes.map(function (node, i) {
                return _react2['default'].createElement(_libNode2['default'], {
                    index: i,
                    nid: node.nid,
                    title: node.type,
                    inputs: node.fields['in'],
                    outputs: node.fields.out,
                    pos: { x: node.x, y: node.y },
                    key: node.nid,

                    onNodeStart: handleNodeStart,
                    onNodeStop: handleNodeStop,
                    onNodeMove: handleNodeMove,

                    onStartConnector: handleStartConnector,
                    onCompleteConnector: handleCompleteConnector,

                    onNodeSelect: handleNodeSelect,
                    onNodeDeselect: handleNodeDeselect
                });
            }),
            _react2['default'].createElement(
                _libSVGComponent2['default'],
                { height: '100%', width: '100%', childRef: svgRef },
                connectors.map(function (connector, spineIndex) {
                    var fromNode = getNodebyId(nodes, connector.from_node);
                    var toNode = getNodebyId(nodes, connector.to_node);

                    var splinestart = (0, _libUtil.computeOutOffsetByIndex)(fromNode.x, fromNode.y, computePinIndexfromLabel(fromNode.fields.out, connector.from));
                    var splineend = (0, _libUtil.computeInOffsetByIndex)(toNode.x, toNode.y, computePinIndexfromLabel(toNode.fields['in'], connector.to));

                    return _react2['default'].createElement(_libSpline2['default'], {
                        start: splinestart,
                        end: splineend,
                        key: spineIndex,
                        mousePos: mousePos,
                        onRemove: function () {
                            return handleRemoveConnector(connector);
                        }
                    });
                }),
                newConnector
            )
        );
    };
    return renderComponents();
};

exports['default'] = _react2['default'].memo(index);
module.exports = exports['default'];
/* render our connectors */ /* this is our new connector that only appears on dragging */