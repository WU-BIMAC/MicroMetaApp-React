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
import Dropdown from "react-bootstrap/Dropdown";
import PopoverTooltip from "./popoverTooltip";
import { isDefined } from "../genericUtilities";

var DropdownMenu = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DropdownMenu, _React$PureComponent);

  var _super = _createSuper(DropdownMenu);

  function DropdownMenu(props) {
    var _this;

    _classCallCheck(this, DropdownMenu);

    _this = _super.call(this, props);
    _this.state = {
      inputData: props.inputData,
      title: props.title,
      currentTitle: "".concat(props.title, " ").concat(props.inputData[props.defaultValue || 0]),
      showTooltip: true
    };
    _this.handleMenuItemClick = _this.handleMenuItemClick.bind(_assertThisInitialized(_this));
    _this.handleToggleClick = _this.handleToggleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "handleToggleClick",
    value: function handleToggleClick(e) {
      this.setState({
        showTooltip: !e
      });
    }
  }, {
    key: "handleMenuItemClick",
    value: function handleMenuItemClick(e) {
      var item = e.target.id;
      var currentTitle = "".concat(this.state.title, " ").concat(item);
      this.props.handleMenuItemClick(item);
      this.setState({
        currentTitle: currentTitle
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputData = this.state.inputData;
      var width = this.props.width || 250;
      var margin = this.props.margin || 0;
      var direction = this.props.direction || "down";
      var dropdownItems = inputData.map(function (item) {
        return /*#__PURE__*/React.createElement(Dropdown.Item, {
          key: item,
          onClick: _this2.handleMenuItemClick,
          id: item
        }, item);
      });
      var justifyContent = "center";

      if (isDefined(this.props.isCentered) && !this.props.isCentered) {
        justifyContent = "flex-start";
      }

      var dropdownStyle = {
        width: "".concat(width, "px"),
        height: "50px",
        margin: "".concat(margin, "px"),
        display: "flex",
        flexDirection: "row",
        justifyContent: "".concat(justifyContent),
        alignItems: "center"
      };
      var dropdownMenuStyle = {
        overflow: "auto",
        maxHeight: "120px",
        maxWidth: "".concat(width, "px"),
        width: "".concat(width, "px")
      };
      var title = this.state.currentTitle;

      if (this.props.hasFixedTitle) {
        title = this.state.title;
      }

      var imgTitle = title;

      if (isDefined(this.props.imgPath) && isDefined(this.props.imgPath_tmp)) {
        imgTitle = /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/React.createElement("img", {
          src: this.props.imgPath,
          alt: this.props.imgPath_tmp,
          style: {
            width: "20px",
            height: "20px",
            marginLeft: "10px",
            marginRight: "10px"
          },
          onLoad: this.onImgLoad
        }), title);
      }

      var dropdownToggle = /*#__PURE__*/React.createElement(Dropdown.Toggle, {
        id: "dropdown-basic-button",
        style: dropdownStyle,
        size: "lg",
        variant: isDefined(this.props.variant) ? this.props.variant : "primary"
      }, imgTitle);
      var dropdownToggleWrapped = null;

      if (this.props.tooltip !== undefined && this.props.tooltip !== null && this.props.tooltip.position !== undefined && this.props.position !== null && this.props.tooltip.title !== undefined && this.props.title !== null && this.props.tooltip.content !== undefined && this.props.content !== null && this.state.showTooltip) {
        dropdownToggleWrapped = /*#__PURE__*/React.createElement(PopoverTooltip, {
          position: this.props.tooltip.position,
          title: this.props.tooltip.title,
          content: this.props.tooltip.content,
          element: dropdownToggle
        });
      } else {
        dropdownToggleWrapped = dropdownToggle;
      }

      return /*#__PURE__*/React.createElement(Dropdown, {
        drop: direction,
        onToggle: this.handleToggleClick
      }, dropdownToggleWrapped, /*#__PURE__*/React.createElement(Dropdown.Menu, {
        style: dropdownMenuStyle
      }, dropdownItems));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var oldInputData = state.inputData;
      var newInputData = props.inputData;

      if (newInputData !== null && newInputData !== undefined) {
        if (oldInputData === null || oldInputData === undefined || oldInputData !== newInputData) {
          var newCurrent = "".concat(props.title, " ").concat(newInputData[props.defaultValue || 0]);
          return {
            inputData: newInputData,
            currentTitle: newCurrent
          };
        }
      }

      return null;
    }
  }]);

  return DropdownMenu;
}(React.PureComponent);

export { DropdownMenu as default };
DropdownMenu.defaultProps = {
  inputData: ["1"],
  title: "Dropdown Menu"
};