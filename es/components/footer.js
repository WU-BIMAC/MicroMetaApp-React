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

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import MultiTabFormWithHeaderV2 from "./multiTabFormWithHeaderV2";
class Footer extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onFormConfirm = this.onFormConfirm.bind(this);
    this.onFormCancel = this.onFormCancel.bind(this);
    this.onClickChangeValidation = this.onClickChangeValidation.bind(this);
  }

  onClickEdit() {
    this.setState({
      editing: true
    });
  }

  onFormConfirm(id, data) {
    this.setState({
      editing: false
    });
    this.props.onFormConfirm(id, data);
  }

  onFormCancel() {
    this.setState({
      editing: false
    });
  }

  onClickChangeValidation(item) {
    let tier = Number(item);
    this.props.onClickChangeValidation(tier);
  }

  render() {
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height; //<MultiTabFormWithHeaderV2

    if (this.state.editing) {
      return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeader.default, {
        schemas: this.props.componentSchemas,
        schema: this.props.schema,
        inputData: this.props.inputData,
        id: this.props.id,
        onConfirm: this.onFormConfirm,
        onCancel: this.onFormCancel,
        overlaysContainer: this.props.overlaysContainer
      });
    }

    const style = {
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
    let styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    let styleEditButton = Object.assign({}, styleButton);
    let play = false;

    if (!this.props.isSchemaValidated) {
      styleEditButton = Object.assign(styleEditButton, {
        border: "5px ridge red"
      });
      play = true;
    }

    let buttons = [];
    buttons[0] = /*#__PURE__*/_react.default.createElement(_reactSimpleAnimate.AnimateKeyframes, {
      key: "Animation-0",
      play: play,
      durationSeconds: 1,
      keyframes: ["opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1"]
    }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: _constants.edit_microscope_tooltip.position,
      title: _constants.edit_microscope_tooltip.title,
      content: _constants.edit_microscope_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-0",
        onClick: this.onClickEdit,
        style: styleEditButton,
        size: "lg"
      }, "Edit ".concat(this.props.element))
    }));
    let inputData = [];

    for (let i = 1; i <= this.props.activeTier; i++) {
      inputData.push(i);
    }

    let defaultValidationTier = this.props.validationTier - 1;
    buttons[1] = /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      key: "Button-1",
      title: _constants.string_validationTier,
      handleMenuItemClick: this.onClickChangeValidation,
      inputData: inputData,
      width: 250,
      margin: 5,
      defaultValue: defaultValidationTier,
      direction: "up",
      tooltip: _constants.validation_tooltip
    });
    let saveOptions = [];

    if (this.props.hasSaveOption) {
      saveOptions.push("Save " + this.props.element);
    } //saveOptions.push("Export " + this.props.element + " image");


    saveOptions.push("Export " + this.props.element); //Rethink this, maybe drop down split button with multi actions?

    buttons[2] = /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      key: "Button-2",
      title: "",
      handleMenuItemClick: this.props.onClickSave,
      inputData: saveOptions,
      width: 250,
      margin: 5,
      direction: "up",
      tooltip: _constants.save_microscope_tooltip
    });
    buttons[3] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: _constants.back_tooltip.position,
      title: _constants.back_tooltip.title,
      content: _constants.back_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-3",
        onClick: this.props.onClickBack,
        style: styleButton,
        size: "lg"
      }, "Back")
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, buttons);
  }

}

exports.default = Footer;