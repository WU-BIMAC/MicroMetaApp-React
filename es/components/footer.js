"use strict";

var _interopRequireDefault = require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));

var _reactSimpleAnimate = require("react-simple-animate");

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/footer.js";
var validationTier = "Validate @ tier: ";

var Footer = function (_React$PureComponent) {
  (0, _inherits2.default)(Footer, _React$PureComponent);

  function Footer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Footer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Footer).call(this, props));
    _this.state = {
      editing: false
    };
    _this.onClickEdit = _this.onClickEdit.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFormConfirm = _this.onFormConfirm.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFormCancel = _this.onFormCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickChangeValidation = _this.onClickChangeValidation.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Footer, [{
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
          overlaysContainer: this.props.overlaysContainer,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 55
          },
          __self: this
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
        keyframes: ["opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        },
        __self: this
      }, _react.default.createElement(_Button.default, {
        key: "Button-0",
        onClick: this.onClickEdit,
        style: styleEditButton,
        size: "lg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, "Edit ".concat(this.props.element)));
      var inputData = [];

      for (var i = 1; i <= this.props.activeTier; i++) {
        inputData.push(i);
      }

      var defaultValidationTier = this.props.validationTier - 1;
      buttons[1] = _react.default.createElement(_DropdownMenu.default, {
        key: "Button-1",
        title: validationTier,
        handleMenuItemClick: this.onClickChangeValidation,
        inputData: inputData,
        width: 250,
        margin: 5,
        defaultValue: defaultValidationTier,
        direction: "up",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      });
      var saveOptions = [];

      if (this.props.hasSaveOption) {
        saveOptions.push("Save " + this.props.element);
      }

      saveOptions.push("Export " + this.props.element + " image");
      saveOptions.push("Export " + this.props.element);
      buttons[2] = _react.default.createElement(_DropdownMenu.default, {
        key: "Button-2",
        title: "",
        handleMenuItemClick: this.props.onClickSave,
        inputData: saveOptions,
        width: 250,
        margin: 5,
        direction: "up",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        },
        __self: this
      });
      buttons[3] = _react.default.createElement(_Button.default, {
        key: "Button-3",
        onClick: this.props.onClickBack,
        style: styleButton,
        size: "lg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        },
        __self: this
      }, "Back");
      return _react.default.createElement("div", {
        style: style,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 195
        },
        __self: this
      }, buttons);
    }
  }]);
  return Footer;
}(_react.default.PureComponent);

exports.default = Footer;