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
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";
import { bool_isSettings, number_logo_width, number_logo_height, tier_selector_tooltip, manage_instrument_tooltip, manage_settings_tooltip } from "../constants";
import { escapeSelector } from "jquery";

var MicroscopePreLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroscopePreLoader, _React$PureComponent);

  var _super = _createSuper(MicroscopePreLoader);

  function MicroscopePreLoader(props) {
    _classCallCheck(this, MicroscopePreLoader);

    return _super.call(this, props);
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
      var styleImageContainer = {
        width: "".concat(number_logo_width, "px"),
        height: "".concat(number_logo_height, "px")
      };
      var tierInputData = this.props.tiers;
      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/React.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: {
          width: "100%",
          height: "100%",
          margin: "auto"
        },
        onLoad: this.onImgLoad
      })), /*#__PURE__*/React.createElement(DropdownMenu, {
        title: "Tier",
        handleMenuItemClick: this.props.onClickTierSelection,
        inputData: tierInputData,
        width: 410,
        margin: 5,
        tooltip: tier_selector_tooltip
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PopoverTooltip, {
        position: manage_instrument_tooltip.position,
        title: manage_instrument_tooltip.title,
        content: manage_instrument_tooltip.content,
        element: /*#__PURE__*/React.createElement(Button, {
          onClick: this.props.onClickCreateNewMicroscope,
          style: buttonStyle,
          size: "lg"
        }, "Manage Instrument")
      }), /*#__PURE__*/React.createElement(PopoverTooltip, {
        position: manage_settings_tooltip.position,
        title: manage_settings_tooltip.title,
        content: manage_settings_tooltip.content,
        element: /*#__PURE__*/React.createElement(Button, {
          onClick: this.props.onClickLoadMicroscope,
          style: buttonStyle,
          size: "lg",
          disabled: !bool_isSettings
        }, "Manage Settings")
      }))));
    }
  }]);

  return MicroscopePreLoader;
}(React.PureComponent);

export { MicroscopePreLoader as default };