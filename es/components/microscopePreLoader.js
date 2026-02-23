"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MicroscopePreLoader extends _react.default.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    let width = 410;
    let margin = 5;
    const buttonStyle = {
      width: "200px",
      height: "50px",
      padding: "5px",
      margin: "5px"
    };
    const windowExternalContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
    };
    const windowInternalContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
    };
    let styleImageContainer = {
      width: "".concat(_constants.number_logo_width, "px"),
      height: "".concat(_constants.number_logo_height, "px")
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let tierInputData = this.props.tiers;
    let logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    return /*#__PURE__*/_react.default.createElement("div", {
      style: windowExternalContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: windowInternalContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: logoPath,
      alt: this.props.logoImg,
      style: styleImage,
      onLoad: this.onImgLoad
    })), /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      title: "Tier",
      handleMenuItemClick: this.props.onClickTierSelection,
      inputData: tierInputData,
      width: width,
      margin: margin,
      tooltip: _constants.tier_selector_tooltip
    }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: _constants.manage_instrument_tooltip.position,
      title: _constants.manage_instrument_tooltip.title,
      content: _constants.manage_instrument_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: this.props.onClickCreateNewMicroscope,
        style: buttonStyle,
        size: "lg"
      }, "Manage Instrument")
    }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: _constants.manage_settings_tooltip.position,
      title: _constants.manage_settings_tooltip.title,
      content: _constants.manage_settings_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: this.props.onClickLoadMicroscope,
        style: buttonStyle,
        size: "lg",
        disabled: !this.props.hasSettings
      }, "Manage Settings")
    }))));
  }
}
exports.default = MicroscopePreLoader;