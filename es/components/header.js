"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));
var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));
var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _modalWindow = _interopRequireDefault(require("./modalWindow"));
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const url = require("url");
class Header extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewAbout: false,
      editing: false,
      editForm: null
    };
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onFormConfirm = this.onFormConfirm.bind(this);
    this.onFormCancel = this.onFormCancel.bind(this);
    this.onFormSave = this.onFormSave.bind(this);
    this.onFormLoad = this.onFormLoad.bind(this);
    this.onClickChangeValidation = this.onClickChangeValidation.bind(this);
    this.onClickHelp = this.onClickHelp.bind(this);
    this.onClickAbout = this.onClickAbout.bind(this);
    this.onCloseAbout = this.onCloseAbout.bind(this);
  }
  onClickHelp() {
    window.open("https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions", "_blank");
  }
  onClickAbout() {
    this.setState({
      viewAbout: true
    });
  }
  onCloseAbout() {
    this.setState({
      viewAbout: false
    });
  }
  onClickEdit() {
    let editForm = /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
      title: "Edit " + this.props.formTitle
      //schemas={this.props.componentSchemas}
      ,
      schema: this.props.schema,
      inputData: this.props.inputData
      //id={this.props.id}
      ,
      onConfirm: this.onFormConfirm,
      onCancel: this.onFormCancel
      // onSave={this.onFormSave}
      // onLoad={this.onFormLoad}
      ,
      overlaysContainer: this.props.overlaysContainer,
      editable: true,
      elementByType: this.props.elementByType,
      isDebug: this.props.isDebug,
      imagesPath: this.props.imagesPathSVG,
      hideComponentsLibrary: true
    });
    this.setState({
      editing: true,
      editForm: editForm
    });
  }
  onFormConfirm(id, data) {
    this.setState({
      editing: false,
      editForm: null
    });
    this.props.onFormConfirm(id, data);
  }
  onFormCancel() {
    this.setState({
      editing: false,
      editForm: null
    });
  }
  onFormSave() {
    this.setState({
      editing: false,
      editForm: null
    });
  }
  onFormLoad() {
    this.setState({
      editing: false,
      editForm: null
    });
  }
  onClickChangeValidation(item) {
    let tier = Number(item);
    this.props.onClickChangeValidation(tier);
  }
  render() {
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    const style = {
      backgroundColor: "LightGray",
      width: width,
      height: height,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    };
    const styleButtonContainer = {
      marginRight: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
      //justifyContent: "flex-end",
    };
    let styleImageContainer = {
      width: "430px",
      height: "60px",
      marginLeft: "20px"
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      margin: "5px"
    };
    let styleButtonHelp = {
      width: "50px",
      minWidth: "50px",
      height: "50px",
      margin: "5px"
    };
    const styleValidation = {
      position: "absolute",
      verticalAlign: "middle",
      fontWeight: "bold",
      textAlign: "center"
    };
    let bigLogoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
    let bigLogoPath = bigLogoImg + (bigLogoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
    let helpImg = url.resolve(this.props.imagesPathSVG, _constants.string_help_img);
    let aboutImg = url.resolve(this.props.imagesPathSVG, _constants.string_about_img);
    let logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let helpPath = helpImg + (helpImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let aboutPath = aboutImg + (aboutImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let pasteImg = url.resolve(this.props.imagesPathSVG, _constants.string_paste_img);
    let pastePath = pasteImg + (pasteImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let validated = null;
    if (this.props.isSchemaValidated) {
      const styleValidated = Object.assign({}, styleValidation, {
        color: "green"
      });
      validated = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated
      }, "\u25CF");
    } else {
      const styleValidated = Object.assign({}, styleValidation, {
        color: "red"
      });
      validated = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated
      }, "\u25CF");
    }
    let editTooltip = _constants.edit_microscope_tooltip;
    let validationTooltip = _constants.validation_microscope_tooltip;
    if (this.props.element === "image settings") {
      editTooltip = _constants.edit_setting_tooltip;
      validationTooltip = _constants.validation_setting_tooltip;
    }
    let buttons = [];
    let index = 0;
    if (!this.props.isViewOnly) {
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: editTooltip.position,
        title: editTooltip.title,
        content: editTooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: this.onClickEdit,
          style: styleButton,
          size: "lg"
        }, validated, "Edit ".concat(this.props.element))
      });
      index++;
      let inputData = [];
      for (let i = 1; i <= this.props.activeTier; i++) {
        inputData.push(i);
      }
      let defaultValidationTier = this.props.validationTier - 1;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
        key: "Button-" + index,
        title: _constants.string_validationTier,
        handleMenuItemClick: this.onClickChangeValidation,
        inputData: inputData,
        width: 250,
        margin: 5,
        defaultValue: defaultValidationTier,
        direction: "down",
        tooltip: validationTooltip
      });
      index++;
      let isPasteEnabled = this.props.isPasteEnabled;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.paste_tooltip.position,
        title: _constants.paste_tooltip.title,
        content: _constants.paste_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: isPasteEnabled ? this.props.onPaste : null,
          style: styleButtonHelp,
          size: "lg",
          disabled: !isPasteEnabled
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: pastePath,
          alt: pasteImg,
          style: styleImage
        }))
      });
      index++;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.help_tooltip.position,
        title: _constants.help_tooltip.title,
        content: _constants.help_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: this.onClickHelp,
          style: styleButtonHelp,
          size: "lg"
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: helpPath,
          alt: helpImg,
          style: styleImage
        }))
      });
      index++;
      buttons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-" + index,
        position: _constants.about_tooltip.position,
        title: _constants.about_tooltip.title,
        content: _constants.about_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-" + index,
          onClick: this.onClickAbout,
          style: styleButtonHelp,
          size: "lg"
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: aboutPath,
          alt: aboutImg,
          style: styleImage
        }))
      });
      index++;
    } else {
      buttons[index] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-" + index,
        onClick: this.onClickHelp,
        style: styleButtonHelp,
        size: "lg"
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: helpPath,
        alt: helpImg,
        style: styleImage
      }));
      index++;
    }
    if (this.state.viewAbout) {
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
        width: "80%",
        height: "80%",
        alignItems: "center"
      };
      const buttonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        flexWrap: "wrap",
        width: "".concat(_constants.number_logo_width, "px"),
        height: "60%",
        alignItems: "flex-start",
        alignContent: "flex-start"
        //marginTop: "10px",
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
      let styleImageContainer = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "".concat(_constants.number_logo_height, "px")
      };
      let styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      const container1 = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "".concat(_constants.number_logo_width, "px"),
        height: "100%",
        alignItems: "center"
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttons), /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: wrapperContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: mainContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: logoContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: bigLogoPath,
        alt: this.props.bigLogoImg,
        style: styleImage
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: container1
      }, /*#__PURE__*/_react.default.createElement("p", null, "Micro-Meta App is an open-source, community-defined, and easy-to-use software platform that provides an intuitive visual guide for collecting and visualizing the hardware specifications and image acquisition settings associated with given microscopes and image datasets in compliance with the", " ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://quarep.org/working-groups/wg-7-metadata/limi-model/"
      }, "Light-Microscopy Model (LiMi-Model)"), ". The LiMi-Model was initially developed as the", " ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://doi.org/10.1038/s41592-021-01327-9"
      }, "4DN-BINA-QUAREP extension"), " ", "of the", " ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://docs.openmicroscopy.org/ome-model/6.1.1/developers/model-overview.html"
      }, "OME data model"), ".", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "App version: ", this.props.appVersion, /*#__PURE__*/_react.default.createElement("br", null), "Model version: ", this.props.modelVersion, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "(c) Copyright 2018-2026 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
        href: "https://www.gnu.org/licenses/gpl-3.0.html"
      }, "GNU General Public License v3.0."))), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsContainer
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: styleButton,
        size: "lg",
        onClick: this.onCloseAbout
      }, "Close"))))));
    } else if (this.state.editing) {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttons), this.state.editForm);
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: logoPath,
      alt: this.props.logoImg,
      style: styleImage
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, buttons));
  }
}
exports.default = Header;