'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.computeInOffsetByIndex = computeInOffsetByIndex;
exports.computeOutOffsetByIndex = computeOutOffsetByIndex;
exports.useObjectState = useObjectState;

var _react = require('react');

/* not bound to style, should be computed */

function computeInOffsetByIndex(x, y, index) {
    var outx = x + 15;
    var outy = y + 47 + index * 20;

    return { x: outx, y: outy };
}

function computeOutOffsetByIndex(x, y, index) {

    var outx = x + 166;
    var outy = y + 49 + index * 22;

    return { x: outx, y: outy };
}

function useObjectState(initialState) {
    var _this = this;

    var _useState = (0, _react.useState)(initialState);

    var _useState2 = _slicedToArray(_useState, 2);

    var state = _useState2[0];
    var setState = _useState2[1];

    var setSafeState = function setSafeState(newState, callback) {
        return regeneratorRuntime.async(function setSafeState$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    if (!(typeof newState === 'function')) {
                        context$2$0.next = 5;
                        break;
                    }

                    context$2$0.next = 3;
                    return regeneratorRuntime.awrap(setState(function (prevState) {
                        return _extends({}, prevState, newState(prevState));
                    }));

                case 3:
                    context$2$0.next = 7;
                    break;

                case 5:
                    context$2$0.next = 7;
                    return regeneratorRuntime.awrap(setState(function (prevState) {
                        return _extends({}, prevState, newState);
                    }));

                case 7:

                    if (callback) {
                        callback();
                    }

                case 8:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, _this);
    };

    return [state, setSafeState];
}