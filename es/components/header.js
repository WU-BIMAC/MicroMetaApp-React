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

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/header.js";

var Header = function (_React$PureComponent) {
  (0, _inherits2.default)(Header, _React$PureComponent);

  function Header() {
    (0, _classCallCheck2.default)(this, Header);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Header).apply(this, arguments));
  }

  (0, _createClass2.default)(Header, [{
    key: "render",
    value: function render() {
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var style = {
        backgroundColor: "LightGray",
        width: width,
        height: height,
        boxSizing: "border-box",
        textAlign: "center",
        verticalAlign: "middle"
      };
      return _react.default.createElement("div", {
        style: style,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      }, " HEADER ");
    }
  }]);
  return Header;
}(_react.default.PureComponent);

exports.default = Header;