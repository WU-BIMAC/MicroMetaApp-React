"use strict";

var _interopRequireDefault = require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/modalWindow.js";

var ModalWindow = function (_React$PureComponent) {
  (0, _inherits2.default)(ModalWindow, _React$PureComponent);

  function ModalWindow() {
    (0, _classCallCheck2.default)(this, ModalWindow);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ModalWindow).apply(this, arguments));
  }

  (0, _createClass2.default)(ModalWindow, [{
    key: "render",
    value: function render() {
      return _reactDom.default.createPortal(_react.default.createElement("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.33)",
          display: "flex",
          alignItems: "center"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        },
        __self: this
      }, _react.default.createElement("div", {
        style: {
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#fff",
          height: "80%",
          padding: 10,
          borderRadius: 5,
          boxShadow: "0 1px 6px -2px #000",
          overflow: "auto"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        __self: this
      }, this.props.children)), this.props.overlaysContainer);
    }
  }]);
  return ModalWindow;
}(_react.default.PureComponent);

exports.default = ModalWindow;