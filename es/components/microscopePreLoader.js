"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MicroscopePreLoader =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MicroscopePreLoader, _React$PureComponent);

  function MicroscopePreLoader(props) {
    _classCallCheck(this, MicroscopePreLoader);

    return _possibleConstructorReturn(this, _getPrototypeOf(MicroscopePreLoader).call(this, props));
  }

  _createClass(MicroscopePreLoader, [{
    key: "render",
    value: function render() {
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
      var styleImageContainer = {
        width: "400px",
        height: "140px"
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var tierInputData = this.props.tiers;
      return _react.default.createElement("div", {
        style: windowExternalContainer
      }, _react.default.createElement("div", {
        style: windowInternalContainer
      }, _react.default.createElement("div", {
        style: styleImageContainer
      }, _react.default.createElement("img", {
        src: this.props.logoImg,
        alt: this.props.logoImg,
        style: styleImage,
        onLoad: this.onImgLoad
      })), _react.default.createElement(_DropdownMenu.default, {
        title: "Tier",
        handleMenuItemClick: this.props.onClickTierSelection,
        inputData: tierInputData,
        width: 410,
        margin: 5
      }), _react["default"].createElement("div", null, _react["default"].createElement(_Button["default"], {
        onClick: this.props.onClickCreateNewMicroscope,
        style: buttonStyle,
        size: "lg"
      }, "Create microscope"), _react["default"].createElement(_Button["default"], {
        onClick: this.props.onClickLoadMicroscope,
        style: buttonStyle,
        size: "lg",
        disabled: !_constants.bool_isSettings
      }, "Use microscope"))));
    }
  }]);

  return MicroscopePreLoader;
}(_react["default"].PureComponent);

exports["default"] = MicroscopePreLoader;