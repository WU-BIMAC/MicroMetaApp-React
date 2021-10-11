"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Footer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Footer, _React$PureComponent);

  var _super = _createSuper(Footer);

  function Footer() {
    _classCallCheck(this, Footer);

    return _super.apply(this, arguments);
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      var _this = this;

      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var styleButtonContainer = {
        marginRight: "20px",
        marginLeft: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center" //justifyContent: "flex-end",

      };
      var style = {
        backgroundColor: "LightGray",
        width: width,
        height: height,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      };
      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleImageBk = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var saveTooltip = _constants.save_microscope_tooltip;

      if (this.props.element === "image settings") {
        saveTooltip = _constants.save_setting_tooltip;
      }

      var exportTooltip = _constants.export_microscope_tooltip;

      if (this.props.element === "image settings") {
        exportTooltip = _constants.export_setting_tooltip;
      }

      var buttonsLeft = [];
      var buttonsRight = [];
      var saveOptions = [];

      if (this.props.hasSaveOption) {
        saveOptions.push("Save " + this.props.element);
        saveOptions.push("Save as new " + this.props.element);
      } //saveOptions.push("Export " + this.props.element + " image");


      var exportOptions = [];
      exportOptions.push("Export " + this.props.element);
      exportOptions.push("Export as new " + this.props.element);
      var importImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_import_img);
      var importImgPath = importImgPath_tmp + (importImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var saveImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_save_img);
      var saveImgPath = saveImgPath_tmp + (saveImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var exportImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_export_img);
      var exportImgPath = exportImgPath_tmp + (exportImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""); //Rethink this, maybe drop down split button with multi actions?

      var index = 0;

      if (this.props.is4DNPortal && this.props.hasImport) {
        buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButtonRight-0",
          position: _constants.import_tooltip.position,
          title: _constants.import_tooltip.title,
          content: _constants.import_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "ButtonRight-0",
            onClick: function onClick() {
              return _this.props.onClickHome("Import");
            },
            style: styleButton,
            size: "lg",
            variant: "dark"
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center" //gap: "10px",

            }
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: importImgPath,
            alt: importImgPath_tmp,
            style: styleImageBk
          }), "Import"))
        });
        index++;
      }

      buttonsRight[index] = /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
        key: "ButtonRight-1",
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
      buttonsRight[index + 1] = /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
        key: "ButtonRight-2",
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
      var backImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_back_img);
      var backImgPath = backImgPath_tmp + (backImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var backText = "Home";

      if (this.props.is4DNPortal) {
        backText = "Back to list";
      }

      buttonsLeft[0] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-0",
        position: "top",
        title: _constants.back_tooltip.title,
        content: _constants.back_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-0",
          onClick: function onClick() {
            return _this.props.onClickHome(backText);
          },
          style: styleButton,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: backImgPath,
          alt: backImgPath_tmp,
          style: styleImageBk
        }), backText))
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttonsLeft), /*#__PURE__*/_react.default.createElement("div", {
        style: styleButtonContainer
      }, buttonsRight));
    }
  }]);

  return Footer;
}(_react.default.PureComponent);

exports.default = Footer;