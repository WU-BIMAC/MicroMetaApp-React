"use strict";

var _interopRequireDefault = require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/src/components/imageElement.js";

var ImageElement = function (_React$PureComponent) {
  (0, _inherits2.default)(ImageElement, _React$PureComponent);

  function ImageElement(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ImageElement);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageElement).call(this, props));
    _this.state = {
      height: null,
      width: null
    };
    _this.onImgLoad = _this.onImgLoad.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ImageElement, [{
    key: "onImgLoad",
    value: function onImgLoad(_ref) {
      var img = _ref.target;
      var oldHeight = this.state.height;
      var oldWidth = this.state.width;
      if (oldWidth !== null && oldHeight !== null) return;
      var newHeight = img.height;
      var newWidth = img.width;
      this.setState({
        height: newHeight,
        width: newWidth
      });
      this.props.updateDimensions(this.props.id, newWidth, newHeight);
    }
  }, {
    key: "render",
    value: function render() {
      var imageStyle = {
        maxHeight: "100%",
        maxWidth: "100%",
        margin: "auto",
        padding: "5px"
      };
      var style = Object.assign({
        backgroundColor: "transparent"
      }, this.props.style);

      var img = _react.default.createElement("img", {
        onLoad: this.onImgLoad,
        src: this.props.image,
        alt: this.props.name,
        style: imageStyle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      });

      return _react.default.createElement("div", {
        style: style,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, img);
    }
  }]);
  return ImageElement;
}(_react.default.PureComponent);

exports.default = ImageElement;