"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));
var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const url = require("url");
class Footer extends _react.default.PureComponent {
  render() {
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    const styleButtonContainer = {
      marginRight: "20px",
      marginLeft: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
      //justifyContent: "flex-end",
    };
    const style = {
      backgroundColor: "LightGray",
      width: width,
      height: height,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
    let styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    let styleImageIcon = {
      width: "20px",
      height: "20px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let styleImageIconHome = {
      width: "30px",
      height: "30px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let saveTooltip = _constants.save_microscope_tooltip;
    if (this.props.element === "image settings") {
      saveTooltip = _constants.save_setting_tooltip;
    }
    let exportTooltip = _constants.export_microscope_tooltip;
    if (this.props.element === "image settings") {
      exportTooltip = _constants.export_setting_tooltip;
    }
    let buttonsLeft = [];
    let buttonsRight = [];
    let saveOptions = [];
    if (this.props.hasSaveOption) {
      saveOptions.push("Save " + this.props.element);
      saveOptions.push("Save as new " + this.props.element);
      saveOptions.push("Save all " + this.props.subElements);
    }
    //saveOptions.push("Export " + this.props.element + " image");
    let exportOptions = [];
    exportOptions.push("Export " + this.props.element);
    exportOptions.push("Export as new " + this.props.element);
    let importImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_import_img);
    let importImgPath = importImgPath_tmp + (importImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let saveImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_save_img);
    let saveImgPath = saveImgPath_tmp + (saveImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let exportImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_export_img);
    let exportImgPath = exportImgPath_tmp + (exportImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

    //Rethink this, maybe drop down split button with multi actions?
    let index = 0;
    if (this.props.is4DNPortal && this.props.hasImport) {
      let importButtText = "Import";
      buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonRight-" + index,
        position: _constants.import_tooltip.position,
        title: _constants.import_tooltip.title,
        content: _constants.import_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonRight-" + index,
          onClick: () => this.props.onClickHome(importButtText),
          style: styleButton,
          size: "lg",
          variant: "dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: importImgPath,
          alt: importImgPath_tmp,
          style: styleImageIcon
        }), importButtText))
      });
      index++;
    }
    buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      key: "ButtonRight-" + index,
      title: "Save",
      handleMenuItemClick: this.props.onClickSave,
      inputData: saveOptions,
      width: 250,
      margin: 5,
      direction: "up",
      tooltip: saveTooltip,
      hasFixedTitle: true,
      variant: "dark",
      imgPath_tmp: saveImgPath_tmp,
      imgPath: saveImgPath
    });
    index++;
    buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      key: "ButtonRight-" + index,
      title: "Export",
      handleMenuItemClick: this.props.onClickSave,
      inputData: exportOptions,
      width: 250,
      margin: 5,
      direction: "up",
      tooltip: exportTooltip,
      hasFixedTitle: true,
      variant: "dark",
      imgPath_tmp: exportImgPath_tmp,
      imgPath: exportImgPath
    });
    index = 0;
    let homeImg = url.resolve(this.props.imagesPath, _constants.string_home_img);
    let homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let funcSelImg = url.resolve(this.props.imagesPath, _constants.string_func_selector_img);
    let funcSelPath = funcSelImg + (funcSelImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    if ((0, _genericUtilities.isDefined)(this.props.onClickParentHome)) {
      buttonsLeft[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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

    //let homeButtText = home_tooltip.title;
    let homeButtText = "Home";
    if (this.props.is4DNPortal) {
      homeButtText = "Back to list";
    }
    buttonsLeft[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButtonLeft-" + index,
      position: _constants.home_tooltip.position,
      title: _constants.home_tooltip.title,
      content: _constants.home_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "ButtonLeft-" + index,
        onClick: () => this.props.onClickHome(homeButtText),
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
      }), homeButtText))
    });
    // let pStyle = {
    // 	marginBottom: "0rem",
    // };
    // /<div style={pStyle}>
    //</div>
    // buttonsLeft[1] = (
    // 	<p style={pStyle}>
    // 		(c) Copyright 2018-2023 University of Massachusetts Chan Medical School.
    // 		All Rights Reserved.
    // 		<br />
    // 		The software is distributed under the terms of the{" "}
    // 		<a href="https://www.gnu.org/licenses/gpl-3.0.html">
    // 			GNU General Public License v3.0.
    // 		</a>
    // 	</p>
    // );
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttonsLeft), /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttonsRight));
  }
}
exports.default = Footer;