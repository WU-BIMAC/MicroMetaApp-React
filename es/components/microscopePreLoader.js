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

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/microscopePreLoader.js";
var isSettingsActive = false;

var MicroscopePreLoader = function (_React$PureComponent) {
  (0, _inherits2.default)(MicroscopePreLoader, _React$PureComponent);

  function MicroscopePreLoader(props) {
    (0, _classCallCheck2.default)(this, MicroscopePreLoader);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MicroscopePreLoader).call(this, props));
  }

  (0, _createClass2.default)(MicroscopePreLoader, [{
    key: "render",
    value: function render() {
      var width = 410;
      var margin = 5;
      var buttonStyle = {
        width: "200px",
        height: "50px",
        padding: "5px",
        margin: "5px"
      };
      var windowExternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var windowInternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var tierInputData = this.props.tiers;
      return _react.default.createElement("div", {
        style: windowExternalContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, _react.default.createElement("div", {
        style: windowInternalContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, _react.default.createElement(_DropdownMenu.default, {
        title: "Tier",
        handleMenuItemClick: this.props.onClickTierSelection,
        inputData: tierInputData,
        width: width,
        margin: margin,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }), _react.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        },
        __self: this
      }, _react.default.createElement(_Button.default, {
        onClick: this.props.onClickCreateNewMicroscope,
        style: buttonStyle,
        size: "lg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, "Create microscope"), _react.default.createElement(_Button.default, {
        onClick: this.props.onClickLoadMicroscope,
        style: buttonStyle,
        size: "lg",
        disabled: !this.isSettingsActive,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, "Use microscope"))));
    }
  }]);
  return MicroscopePreLoader;
}(_react.default.PureComponent);

exports.default = MicroscopePreLoader;