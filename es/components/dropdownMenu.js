"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DropdownMenu extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputData: props.inputData,
      title: props.title,
      currentTitle: "".concat(props.title, " ").concat(props.inputData[this.props.defaultValue || 0])
    };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let oldInputData = state.inputData;
    let newInputData = props.inputData;

    if (newInputData !== null && newInputData !== undefined) {
      if (oldInputData === null || oldInputData === undefined || oldInputData !== newInputData) {
        let newCurrent = "".concat(props.title, " ").concat(newInputData[props.defaultValue || 0]);
        return {
          inputData: newInputData,
          currentTitle: newCurrent
        };
      }
    }

    return null;
  }

  handleMenuItemClick(e) {
    let item = e.target.id;
    let currentTitle = "".concat(this.state.title, " ").concat(item);
    this.props.handleMenuItemClick(item);
    this.setState({
      currentTitle: currentTitle
    });
  }

  render() {
    let inputData = this.state.inputData;
    let width = this.props.width || 250;
    let margin = this.props.margin || 0;
    let direction = this.props.direction || "down";
    let dropdownItems = inputData.map(item => /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
      key: item,
      onClick: this.handleMenuItemClick,
      id: item
    }, item));
    const dropdownStyle = {
      width: "".concat(width, "px"),
      height: "50px",
      margin: "".concat(margin, "px")
    };
    const dropdownMenuStyle = {
      overflow: "auto",
      maxHeight: "100px",
      maxWidth: "".concat(width, "px"),
      width: "".concat(width, "px")
    };

    const dropdownToggle = /*#__PURE__*/_react.default.createElement(_Dropdown.default.Toggle, {
      id: "dropdown-basic-button",
      style: dropdownStyle,
      size: "lg"
    }, this.state.currentTitle);

    let dropdownToggleWrapped = null;

    if (this.props.tooltip !== undefined && this.props.tooltip !== null && this.props.tooltip.position !== undefined && this.props.position !== null && this.props.tooltip.title !== undefined && this.props.title !== null && this.props.tooltip.content !== undefined && this.props.content !== null) {
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
      drop: direction
    }, dropdownToggleWrapped, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Menu, {
      style: dropdownMenuStyle
    }, dropdownItems));
  }

}

exports.default = DropdownMenu;
DropdownMenu.defaultProps = {
  inputData: ["1"],
  title: "Dropdown Menu"
};