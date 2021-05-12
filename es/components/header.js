function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";
import { string_validationTier, edit_microscope_tooltip, edit_setting_tooltip, validation_microscope_tooltip, validation_setting_tooltip } from "../constants";

var Header = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Header, _React$PureComponent);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, props);
    _this.state = {
      editing: false
    };
    _this.onClickEdit = _this.onClickEdit.bind(_assertThisInitialized(_this));
    _this.onFormConfirm = _this.onFormConfirm.bind(_assertThisInitialized(_this));
    _this.onFormCancel = _this.onFormCancel.bind(_assertThisInitialized(_this));
    _this.onClickChangeValidation = _this.onClickChangeValidation.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Header, [{
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
      var styleValidation = {
        position: "absolute",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center"
      };
      var validated = null;

      if (this.props.isSchemaValidated) {
        var styleValidated = Object.assign({}, styleValidation, {
          color: "green"
        });
        validated = /*#__PURE__*/React.createElement("div", {
          style: styleValidated
        }, "\u25CF");
      } else {
        var _styleValidated = Object.assign({}, styleValidation, {
          color: "red"
        });

        validated = /*#__PURE__*/React.createElement("div", {
          style: _styleValidated
        }, "\u25CF");
      }

      var editTooltip = edit_microscope_tooltip;
      var validationTooltip = validation_microscope_tooltip;

      if (this.props.element === "image settings") {
        editTooltip = edit_setting_tooltip;
        validationTooltip = validation_setting_tooltip;
      }

      var buttons = [];
      buttons[0] = /*#__PURE__*/React.createElement(PopoverTooltip, {
        key: "TooltipButton-0",
        position: editTooltip.position,
        title: editTooltip.title,
        content: editTooltip.content,
        element: /*#__PURE__*/React.createElement(Button, {
          key: "Button-0",
          onClick: this.onClickEdit,
          style: {
            width: "250px",
            minWidth: "250px",
            height: "50px",
            margin: "5px"
          },
          size: "lg"
        }, validated, "Edit ".concat(this.props.element))
      });
      var inputData = [];

      for (var i = 1; i <= this.props.activeTier; i++) {
        inputData.push(i);
      }

      var defaultValidationTier = this.props.validationTier - 1;
      buttons[1] = /*#__PURE__*/React.createElement(DropdownMenu, {
        key: "Button-1",
        title: string_validationTier,
        handleMenuItemClick: this.onClickChangeValidation,
        inputData: inputData,
        width: 250,
        margin: 5,
        defaultValue: defaultValidationTier,
        direction: "down",
        tooltip: validationTooltip
      }); //<div style={styleTitle}>Microscopy Metadata For The Real World</div>

      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

      if (this.state.editing) {
        return /*#__PURE__*/React.createElement(MultiTabFormWithHeaderV3, {
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
        });
      }

      return /*#__PURE__*/React.createElement("div", {
        style: {
          backgroundColor: "LightGray",
          width: width,
          height: height,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: "430px",
          height: "60px",
          marginLeft: "20px"
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: {
          width: "100%",
          height: "100%",
          margin: "auto"
        },
        onLoad: this.onImgLoad
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          marginRight: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center" //justifyContent: "flex-end",

        }
      }, buttons));
    }
  }]);

  return Header;
}(React.PureComponent);

export { Header as default };