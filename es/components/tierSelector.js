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
class TierSelector extends _react.default.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const wrapperContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center",
      //minWidth: "800px",
      minHeight: "600px"
    };
    const mainContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
      //maxHeight: "600px",
    };
    const buttonsContainer = {
      display: "flex",
      justifyContent: "flex-end",
      flexFlow: "column",
      width: "100%",
      height: "60%",
      alignItems: "center"
      //margin: "50px",
    };
    const buttonModeSelectorStyle = {
      width: "800px",
      height: "150px",
      margin: "5px"
    };
    const buttonsInnerContainer = {
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "row",
      width: "100%",
      height: "100%",
      alignItems: "center"
    };
    const buttonsInnerImgContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "20%",
      height: "100%",
      alignItems: "center"
    };
    const buttonsInnerTextContainer = {
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "column",
      width: "80%",
      height: "100%",
      alignItems: "flex-start"
    };
    const logoContainer = {
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "column",
      width: "100%",
      height: "40%",
      alignItems: "center",
      marginTop: "10px"
    };
    let styleImageContainer = {
      width: "".concat(_constants.number_small_logo_width, "px"),
      height: "".concat(_constants.number_small_logo_height, "px")
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let styleIconImage = {
      width: "100%",
      height: "100%",
      margin: "5px"
    };
    let styleText_1 = {
      textAlign: "left",
      //fontSize: "1em",
      marginLeft: "15px",
      marginRight: "15px",
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
    // let styleText_3 = {
    // 	textAlign: "left",
    // 	fontSize: "0.6em",
    // 	marginLeft: "15px",
    // 	marginRight: "15px",
    // 	wordBreak: "break-word",
    // 	whiteSpace: "normal",
    // };
    const styleButtonContainer = {
      marginRight: "20px",
      marginLeft: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
      //justifyContent: "flex-end",
    };
    let styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    let styleImageIconHome = {
      width: "30px",
      height: "30px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let tierList = this.props.tierList;
    let iconImg_tier1 = null;
    let iconImg_tier2 = null;
    let iconImg_tier3 = null;
    if (this.props.isHardware) {
      iconImg_tier1 = url.resolve(this.props.imagesPathSVG, _constants.string_hardware_tier_1_img);
      iconImg_tier2 = url.resolve(this.props.imagesPathSVG, _constants.string_hardware_tier_2_img);
      iconImg_tier3 = url.resolve(this.props.imagesPathSVG, _constants.string_hardware_tier_3_img);
    } else {
      iconImg_tier1 = url.resolve(this.props.imagesPathSVG, _constants.string_settings_tier_1_img);
      iconImg_tier2 = url.resolve(this.props.imagesPathSVG, _constants.string_settings_tier_2_img);
      iconImg_tier3 = url.resolve(this.props.imagesPathSVG, _constants.string_settings_tier_3_img);
    }
    let logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
    let logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let tiers = [];
    tierList.forEach(tier => {
      let index = tier.Index - 1;
      let iconImg = null;
      if (tier.Index === 1) {
        iconImg = iconImg_tier1;
      } else if (tier.Index === 2) {
        iconImg = iconImg_tier2;
      } else {
        iconImg = iconImg_tier3;
      }
      let iconPath = iconImg + (iconImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      //let regex = /(\[|\])/gi;
      // let minComp = tier.MinimumComponentsList.replace(regex, "").replace(
      // 	"||",
      // 	"or"
      // );
      let button = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.tier_selector_tooltip.position,
        title: _constants.tier_selector_tooltip.title,
        content: _constants.tier_selector_tooltip.content,
        key: "popover-tier-button-" + index,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: () => {
            this.props.onClickTierSelection(index, tier.Name);
          },
          style: buttonModeSelectorStyle,
          size: "lg",
          variant: "light",
          key: "tier-button-" + index
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerImgContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: iconPath,
          alt: iconImg,
          style: styleIconImage
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTextContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          style: styleText_1
        }, tier.Name), /*#__PURE__*/_react.default.createElement("p", {
          style: styleText_2
        }, tier.Description))))
      });
      tiers[index] = button;
    });
    let homeImg = url.resolve(this.props.imagesPathSVG, _constants.string_home_img);
    let homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let backText = "Home";
    let funcSelImg = url.resolve(this.props.imagesPathSVG, _constants.string_func_selector_img);
    let funcSelPath = funcSelImg + (funcSelImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let buttons = [];
    let index = 0;
    buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButtonLeft-0",
      position: "top",
      title: _constants.home_tooltip.title,
      content: _constants.home_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "ButtonLeft-0",
        onClick: () => this.props.onClickHome(backText),
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
        src: homeImgPath,
        alt: homeImg,
        style: styleImageIconHome
      }), backText))
    });
    index++;
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
    //handleMenuItemClick={this.props.onClickTierSelection}
    return /*#__PURE__*/_react.default.createElement("div", {
      style: wrapperContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: mainContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: buttonsContainer
    }, tiers), /*#__PURE__*/_react.default.createElement("div", {
      style: logoContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttons), /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: logoPath,
      alt: this.props.logoImg,
      style: styleImage
    }))), /*#__PURE__*/_react.default.createElement("p", null, "(c) Copyright 2018-2023 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
      href: "https://www.gnu.org/licenses/gpl-3.0.html"
    }, "GNU General Public License v3.0."))));
  }
}
exports.default = TierSelector;