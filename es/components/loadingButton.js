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

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _jsxFileName = "/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/src/components/loadingButton.js";

var LoadingButton = function (_React$Component) {
  (0, _inherits2.default)(LoadingButton, _React$Component);

  function LoadingButton(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, LoadingButton);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LoadingButton).call(this, props, context));
    _this.state = {
      isLoading: false
    };
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(LoadingButton, [{
    key: "handleClick",
    value: function handleClick() {
      var _this2 = this;

      this.setState({
        isLoading: true
      }, function () {
        _this2.props.onLoad().then(function () {
          _this2.setState({
            isLoading: false
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      return _react.default.createElement(_Button.default, {
        variant: "primary",
        disabled: isLoading,
        onClick: !isLoading ? this.handleClick : null,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, isLoading ? "Loading…" : "Load schema");
    }
  }]);
  return LoadingButton;
}(_react.default.Component);

exports.default = LoadingButton;