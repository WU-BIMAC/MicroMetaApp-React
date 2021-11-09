"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var url = require("url");

var ModeSelector = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ModeSelector, _React$PureComponent);

  var _super = _createSuper(ModeSelector);

  function ModeSelector(props) {
    var _this;

    _classCallCheck(this, ModeSelector);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  _createClass(ModeSelector, [{
    key: "render",
    value: function render() {
      var wrapperContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        minHeight: "600px"
      };
      var mainContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var logoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        //height: `${number_logo_height}px`,
        height: "40%",
        alignItems: "center"
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var styleImageContainer = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "".concat(_constants.number_logo_height, "px")
      };
      var modeSelectorContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "60%",
        alignItems: "flex-start"
      };
      var buttonModeSelectorStyle = {
        width: "388px",
        height: "300px",
        marginTop: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var buttonsInnerContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var buttonsInnerTopContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "50%",
        alignItems: "center"
      };
      var buttonsInnerBottomContainer = {
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "column",
        width: "100%",
        height: "50%",
        alignItems: "center"
      };
      var styleIconImage = {
        width: "100%",
        height: "100%",
        margin: "5px"
      };
      var styleText_1 = {
        wordBreak: "break-word",
        whiteSpace: "normal"
      };
      var styleText_2 = {
        textAlign: "left",
        fontSize: "0.8em",
        marginLeft: "15px",
        marginRight: "15px",
        wordBreak: "break-word",
        whiteSpace: "normal"
      };
      var selectionEnabled = true;
      var logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
      var hardwareImg = url.resolve(this.props.imagesPathSVG, _constants.string_manage_hardware_circle_img);
      var settingsImg = url.resolve(this.props.imagesPathSVG, _constants.string_manage_settings_circle_img);
      var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var hardwareImgPath = hardwareImg + (hardwareImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var settingsImgPath = settingsImg + (settingsImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      return /*#__PURE__*/_react.default.createElement("div", {
        style: wrapperContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: mainContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: logoContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: logoImg,
        style: styleImage
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: modeSelectorContainer
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.manage_instrument_tooltip.position,
        title: _constants.manage_instrument_tooltip.title,
        content: _constants.manage_instrument_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          disabled: !selectionEnabled,
          onClick: this.props.onClickCreateNewMicroscope,
          style: buttonModeSelectorStyle,
          size: "lg",
          variant: "light"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTopContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: hardwareImgPath,
          alt: this.props.hardwareImg,
          style: styleIconImage
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerBottomContainer
        }, /*#__PURE__*/_react.default.createElement("h2", {
          style: styleText_1
        }, "Manage Instrument"), /*#__PURE__*/_react.default.createElement("p", {
          style: styleText_2
        }, "Collect information about the hardware components of your microscope."))))
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.manage_settings_tooltip.position,
        title: _constants.manage_settings_tooltip.title,
        content: _constants.manage_settings_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          disabled: !selectionEnabled || !this.props.hasSettings,
          onClick: this.props.onClickLoadMicroscope,
          style: buttonModeSelectorStyle,
          size: "lg",
          variant: "light"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTopContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: settingsImgPath,
          alt: settingsImg,
          style: styleIconImage
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerBottomContainer
        }, /*#__PURE__*/_react.default.createElement("h2", {
          style: styleText_1
        }, "Manage Settings"), /*#__PURE__*/_react.default.createElement("p", {
          style: styleText_2
        }, "Collect information about the acquisition settings that were used to produce your image."))))
      })))); //}
    }
  }]);

  return ModeSelector;
}(_react.default.PureComponent);

exports.default = ModeSelector;