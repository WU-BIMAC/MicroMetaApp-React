"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var url = require("url");

var Header = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Header, _React$PureComponent);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, props);
    _this.state = {
      viewAbout: false,
      editing: false
    };
    _this.onClickEdit = _this.onClickEdit.bind(_assertThisInitialized(_this));
    _this.onFormConfirm = _this.onFormConfirm.bind(_assertThisInitialized(_this));
    _this.onFormCancel = _this.onFormCancel.bind(_assertThisInitialized(_this));
    _this.onClickChangeValidation = _this.onClickChangeValidation.bind(_assertThisInitialized(_this));
    _this.onClickHelp = _this.onClickHelp.bind(_assertThisInitialized(_this));
    _this.onClickAbout = _this.onClickAbout.bind(_assertThisInitialized(_this));
    _this.onCloseAbout = _this.onCloseAbout.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Header, [{
    key: "onClickHelp",
    value: function onClickHelp() {
      window.open("https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions", "_blank");
    }
  }, {
    key: "onClickAbout",
    value: function onClickAbout() {
      this.setState({
        viewAbout: true
      });
    }
  }, {
    key: "onCloseAbout",
    value: function onCloseAbout() {
      this.setState({
        viewAbout: false
      });
    }
  }, {
    key: "onClickEdit",
    value: function onClickEdit() {
      this.setState({
        editing: true
      });
    }
  }, {
    key: "onFormConfirm",
    value: function onFormConfirm(id, data) {
      this.setState({
        editing: false
      });
      this.props.onFormConfirm(id, data);
    }
  }, {
    key: "onFormCancel",
    value: function onFormCancel() {
      this.setState({
        editing: false
      });
    }
  }, {
    key: "onClickChangeValidation",
    value: function onClickChangeValidation(item) {
      var tier = Number(item);
      this.props.onClickChangeValidation(tier);
    }
  }, {
    key: "render",
    value: function render() {
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var style = {
        backgroundColor: "LightGray",
        width: width,
        height: height,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      };
      var styleButtonContainer = {
        marginRight: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center" //justifyContent: "flex-end",

      };
      var styleImageContainer = {
        width: "430px",
        height: "60px",
        marginLeft: "20px"
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        margin: "5px"
      };
      var styleButtonHelp = {
        width: "50px",
        minWidth: "50px",
        height: "50px",
        margin: "5px"
      };
      var styleValidation = {
        position: "absolute",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center"
      };
      var bigLogoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
      var bigLogoPath = bigLogoImg + (bigLogoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
      var helpImg = url.resolve(this.props.imagesPathSVG, _constants.string_help_img);
      var aboutImg = url.resolve(this.props.imagesPathSVG, _constants.string_about_img);
      var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var helpPath = helpImg + (helpImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var aboutPath = aboutImg + (aboutImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var pasteImg = url.resolve(this.props.imagesPathSVG, _constants.string_paste_img);
      var pastePath = pasteImg + (pasteImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var validated = null;

      if (this.props.isSchemaValidated) {
        var styleValidated = Object.assign({}, styleValidation, {
          color: "green"
        });
        validated = /*#__PURE__*/_react.default.createElement("div", {
          style: styleValidated
        }, "\u25CF");
      } else {
        var _styleValidated = Object.assign({}, styleValidation, {
          color: "red"
        });

        validated = /*#__PURE__*/_react.default.createElement("div", {
          style: _styleValidated
        }, "\u25CF");
      }

      var editTooltip = _constants.edit_microscope_tooltip;
      var validationTooltip = _constants.validation_microscope_tooltip;

      if (this.props.element === "image settings") {
        editTooltip = _constants.edit_setting_tooltip;
        validationTooltip = _constants.validation_setting_tooltip;
      }

      var buttons = [];
      var index = 0;

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
        var inputData = [];

        for (var i = 1; i <= this.props.activeTier; i++) {
          inputData.push(i);
        }

        var defaultValidationTier = this.props.validationTier - 1;
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
        var isPasteEnabled = this.props.isPasteEnabled;
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
          width: "80%",
          height: "80%",
          alignItems: "center"
        };
        var buttonsContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "row",
          flexWrap: "wrap",
          width: "".concat(_constants.number_logo_width, "px"),
          height: "60%",
          alignItems: "flex-start",
          alignContent: "flex-start" //marginTop: "10px",

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
        var _styleImageContainer = {
          width: "".concat(_constants.number_logo_width, "px"),
          height: "".concat(_constants.number_logo_height, "px")
        };
        var _styleImage = {
          width: "100%",
          height: "100%",
          margin: "auto"
        };
        var container1 = {
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
          style: _styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: _styleImage,
          onLoad: this.onImgLoad
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
          style: _styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: bigLogoPath,
          alt: this.props.bigLogoImg,
          style: _styleImage,
          onLoad: this.onImgLoad
        }))), /*#__PURE__*/_react.default.createElement("div", {
          style: container1
        }, /*#__PURE__*/_react.default.createElement("p", null, "Micro Meta App is an open, easy-to-use, and powerful software platform that provides an intuitive visual guide to capturing and managing Microscopy Metadata on the basis of the", " ", /*#__PURE__*/_react.default.createElement("a", {
          href: "https://github.com/WU-BIMAC/NBOMicroscopyMetadataSpecs/tree/master/Model/stable%20version/v02-01"
        }, "4DN-BINA extension"), " ", "of the", " ", /*#__PURE__*/_react.default.createElement("a", {
          href: "https://docs.openmicroscopy.org/ome-model/6.1.1/developers/model-overview.html"
        }, "OME data model"), " ", ".", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "App version: ", this.props.appVersion, /*#__PURE__*/_react.default.createElement("br", null), "Model version: ", this.props.modelVersion, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), "(c) Copyright 2018-2023 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
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
          style: styleImage,
          onLoad: this.onImgLoad
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: styleButtonContainer
        }, buttons), /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          title: "Edit " + this.props.formTitle //schemas={this.props.componentSchemas}
          ,
          schema: this.props.schema,
          inputData: this.props.inputData //id={this.props.id}
          ,
          onConfirm: this.onFormConfirm,
          onCancel: this.onFormCancel,
          overlaysContainer: this.props.overlaysContainer,
          editable: true,
          elementByType: this.props.elementByType,
          isDebug: this.props.isDebug
        }));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage,
        onLoad: this.onImgLoad
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttons));
    }
  }]);

  return Header;
}(_react.default.PureComponent);

exports.default = Header;