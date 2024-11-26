"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _genericUtilities = require("../genericUtilities");

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
    if (_this.props.isDebug) console.log('Input Data:', props.inputData);
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
      if (this.props.isDebug) console.log("INSIDE DROPDOWNMENU.JS IN HANDLEMENUITEMCLICK FUNCTION");
      var item = e.target.id;
      console.log("Clicked item:", item);
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

      var styleImageIcon = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var inputData = this.state.inputData;
      var width = this.props.width || 250;
      var margin = this.props.margin || 0;
      var direction = this.props.direction || "down";
      var dropdownItems = inputData.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
          key: item,
          onClick: _this2.handleMenuItemClick,
          id: item
        }, item);
      });
      var justifyContent = "center";

      if ((0, _genericUtilities.isDefined)(this.props.isCentered) && !this.props.isCentered) {
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

      if ((0, _genericUtilities.isDefined)(this.props.imgPath) && (0, _genericUtilities.isDefined)(this.props.imgPath_tmp)) {
        imgTitle = /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: this.props.imgPath,
          alt: this.props.imgPath_tmp,
          style: styleImageIcon
        }), title);
      }

      var dropdownToggle = /*#__PURE__*/_react.default.createElement(_Dropdown.default.Toggle, {
        id: "dropdown-basic-button",
        style: dropdownStyle,
        size: "lg",
        variant: (0, _genericUtilities.isDefined)(this.props.variant) ? this.props.variant : "primary"
      }, imgTitle);

      var dropdownToggleWrapped = null;

      if ((0, _genericUtilities.isDefined)(this.props.tooltip) && (0, _genericUtilities.isDefined)(this.props.tooltip.position) && (0, _genericUtilities.isDefined)(this.props.tooltip.title) && (0, _genericUtilities.isDefined)(this.props.tooltip.content) && this.state.showTooltip) {
        dropdownToggleWrapped = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          position: this.props.tooltip.position,
          title: this.props.tooltip.title,
          content: this.props.tooltip.content,
          element: dropdownToggle
        });
      } else {
        dropdownToggleWrapped = dropdownToggle;
      }

      return /*#__PURE__*/_react.default.createElement(_Dropdown.default, {
        drop: direction,
        onToggle: this.handleToggleClick
      }, dropdownToggleWrapped, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Menu, {
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
}(_react.default.PureComponent);

exports.default = DropdownMenu;
DropdownMenu.defaultProps = {
  inputData: ["1"],
  title: "Dropdown Menu"
};