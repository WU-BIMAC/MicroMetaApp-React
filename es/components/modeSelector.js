"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const url = require("url");
class ModeSelector extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const wrapperContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center",
      minHeight: "600px"
    };
    const mainContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
    };
    const logoContainer = {
      display: "flex",
      justifyContent: "flex-end",
      flexFlow: "column",
      width: "100%",
      //height: `${number_logo_height}px`,
      height: "40%",
      alignItems: "center"
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let styleImageContainer = {
      width: "".concat(_constants.number_logo_width, "px"),
      height: "".concat(_constants.number_logo_height, "px")
    };
    const modeSelectorContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "row",
      width: "100%",
      height: "60%",
      alignItems: "flex-start"
    };
    const buttonModeSelectorStyle = {
      width: "388px",
      height: "300px",
      marginTop: "20px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    const buttonsInnerContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
    };
    const buttonsInnerTopContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "50%",
      alignItems: "center"
    };
    const buttonsInnerBottomContainer = {
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "column",
      width: "100%",
      height: "50%",
      alignItems: "center"
    };
    const styleButtonContainer = {
      marginRight: "20px",
      marginLeft: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
      //justifyContent: "flex-end",
    };
    const styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    const styleImageIconHome = {
      width: "30px",
      height: "30px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let styleIconImage = {
      width: "100%",
      height: "100%",
      margin: "5px"
    };
    let styleText_1 = {
      wordBreak: "break-word",
      whiteSpace: "normal"
    };
    let styleText_2 = {
      textAlign: "left",
      fontSize: "0.8em",
      marginLeft: "15px",
      marginRight: "15px",
      wordBreak: "break-word",
      whiteSpace: "normal"
    };
    let selectionEnabled = true;
    let logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
    let hardwareImg = url.resolve(this.props.imagesPathSVG, _constants.string_manage_hardware_circle_img);
    let settingsImg = url.resolve(this.props.imagesPathSVG, _constants.string_manage_settings_circle_img);
    let funcSelImg = url.resolve(this.props.imagesPathSVG, _constants.string_func_selector_img);
    let logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let hardwareImgPath = hardwareImg + (hardwareImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let settingsImgPath = settingsImg + (settingsImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let funcSelPath = funcSelImg + (funcSelImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let buttons = [];
    let index = 0;
    if ((0, _genericUtilities.isDefined)(this.props.onClickParentHome)) {
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-" + index,
        position: _constants.func_selector_tooltip.position,
        title: _constants.func_selector_tooltip.title,
        content: _constants.func_selector_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-" + index,
          onClick: () => this.props.onClickParentHome(),
          style: styleButton,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: funcSelPath,
          alt: funcSelImg,
          style: styleImageIconHome
        }), _constants.func_selector_tooltip.title))
      });
      index++;
    }
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
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttons), /*#__PURE__*/_react.default.createElement("p", null, "(c) Copyright 2018-2023 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
      href: "https://www.gnu.org/licenses/gpl-3.0.html"
    }, "GNU General Public License v3.0."))));
    //}
  }
}
exports.default = ModeSelector;