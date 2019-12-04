"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));

var _reactSimpleAnimate = require("react-simple-animate");

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var validationTier = "Validate @ tier: ";

var Footer =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Footer, _React$PureComponent);

  function Footer(props) {
    var _this;

    _classCallCheck(this, Footer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Footer).call(this, props));
    _this.state = {
      editing: false
    };
    _this.onClickEdit = _this.onClickEdit.bind(_assertThisInitialized(_this));
    _this.onFormConfirm = _this.onFormConfirm.bind(_assertThisInitialized(_this));
    _this.onFormCancel = _this.onFormCancel.bind(_assertThisInitialized(_this));
    _this.onClickChangeValidation = _this.onClickChangeValidation.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Footer, [{
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

      if (this.state.editing) {
        return _react.default.createElement(_multiTabFormWithHeader.default, {
          schema: this.props.schema,
          inputData: this.props.inputData,
          id: this.props.id,
          onConfirm: this.onFormConfirm,
          onCancel: this.onFormCancel,
          overlaysContainer: this.props.overlaysContainer
        });
      }

      var style = {
        backgroundColor: "LightGray",
        width: width,
        height: height,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px"
      };
      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleEditButton = Object.assign({}, styleButton);
      var play = false;

      if (!this.props.isSchemaValidated) {
        styleEditButton = Object.assign(styleEditButton, {
          border: "5px ridge red"
        });
        play = true;
      }

      var buttons = [];
      buttons[0] = _react.default.createElement(_reactSimpleAnimate.AnimateKeyframes, {
        key: "Animation-0",
        play: play,
        durationSeconds: 1,
        keyframes: ["opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1"]
      }, _react.default.createElement(_Button.default, {
        key: "Button-0",
        onClick: this.onClickEdit,
        style: styleEditButton,
        size: "lg"
      }, "Edit ".concat(this.props.element)));
      var inputData = [];

      for (var i = 1; i <= this.props.activeTier; i++) {
        inputData.push(i);
      }

      var defaultValidationTier = this.props.validationTier - 1;
<<<<<<< HEAD
      buttons[1] = _react.default.createElement(_dropdownMenu.default, {
=======
      buttons[1] = _react["default"].createElement(_dropdownMenu["default"], {
>>>>>>> 4a4904f93e8068df42226f872907114af8249259
        key: "Button-1",
        title: validationTier,
        handleMenuItemClick: this.onClickChangeValidation,
        inputData: inputData,
        width: 250,
        margin: 5,
        defaultValue: defaultValidationTier,
        direction: "up"
      });
      var saveOptions = [];

      if (this.props.hasSaveOption) {
        saveOptions.push("Save " + this.props.element);
      } //saveOptions.push("Export " + this.props.element + " image");


      saveOptions.push("Export " + this.props.element); //Rethink this, maybe drop down split button with multi actions?

<<<<<<< HEAD
      buttons[2] = _react.default.createElement(_dropdownMenu.default, {
=======
      buttons[2] = _react["default"].createElement(_dropdownMenu["default"], {
>>>>>>> 4a4904f93e8068df42226f872907114af8249259
        key: "Button-2",
        title: "",
        handleMenuItemClick: this.props.onClickSave,
        inputData: saveOptions,
        width: 250,
        margin: 5,
        direction: "up"
      });
      buttons[3] = _react.default.createElement(_Button.default, {
        key: "Button-3",
        onClick: this.props.onClickBack,
        style: styleButton,
        size: "lg"
      }, "Back");
      return _react.default.createElement("div", {
        style: style
      }, buttons);
    }
  }]);

  return Footer;
}(_react.default.PureComponent);

exports.default = Footer;