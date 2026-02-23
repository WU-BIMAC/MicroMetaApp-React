"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _genericUtilities = require("../genericUtilities");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DropdownMenu extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputData: props.inputData,
      title: props.title,
      currentTitle: "".concat(props.title, " ").concat(props.inputData[props.defaultValue || 0]),
      showTooltip: true
    };
    if (this.props.isDebug) console.log('Input Data:', props.inputData);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
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
  handleToggleClick(e) {
    this.setState({
      showTooltip: !e
    });
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
    let styleImageIcon = {
      width: "20px",
      height: "20px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let inputData = this.state.inputData;
    let width = this.props.width || 250;
    let margin = this.props.margin || 0;
    let direction = this.props.direction || "down";
    let dropdownItems = inputData.map(item => /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
      key: item,
      onClick: this.handleMenuItemClick,
      id: item
    }, item));
    let justifyContent = "center";
    if ((0, _genericUtilities.isDefined)(this.props.isCentered) && !this.props.isCentered) {
      justifyContent = "flex-start";
    }
    const dropdownStyle = {
      width: "".concat(width, "px"),
      height: "50px",
      margin: "".concat(margin, "px"),
      display: "flex",
      flexDirection: "row",
      justifyContent: "".concat(justifyContent),
      alignItems: "center"
    };
    const dropdownMenuStyle = {
      overflow: "auto",
      maxHeight: "120px",
      maxWidth: "".concat(width, "px"),
      width: "".concat(width, "px")
    };
    let title = this.state.currentTitle;
    if (this.props.hasFixedTitle) {
      title = this.state.title;
    }
    let imgTitle = title;
    if ((0, _genericUtilities.isDefined)(this.props.imgPath) && (0, _genericUtilities.isDefined)(this.props.imgPath_tmp)) {
      imgTitle = /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          //gap: "10px",
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: this.props.imgPath,
        alt: this.props.imgPath_tmp,
        style: styleImageIcon
      }), title);
    }
    const dropdownToggle = /*#__PURE__*/_react.default.createElement(_Dropdown.default.Toggle, {
      id: "dropdown-basic-button",
      style: dropdownStyle,
      size: "lg",
      variant: (0, _genericUtilities.isDefined)(this.props.variant) ? this.props.variant : "primary"
    }, imgTitle);
    let dropdownToggleWrapped = null;
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
}
exports.default = DropdownMenu;
DropdownMenu.defaultProps = {
  inputData: ["1"],
  title: "Dropdown Menu"
};