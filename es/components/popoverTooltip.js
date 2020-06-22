"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _OverlayTrigger = _interopRequireDefault(require("react-bootstrap/OverlayTrigger"));

var _Popover = _interopRequireDefault(require("react-bootstrap/Popover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PopoverTooltip extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let delay = {
      show: this.props.show,
      hide: this.props.hide
    };
    return /*#__PURE__*/_react.default.createElement(_OverlayTrigger.default, {
      placement: this.props.position,
      delay: delay,
      rootClose: true,
      rootCloseEvent: "mousedown" || "click",
      overlay: /*#__PURE__*/_react.default.createElement(_Popover.default, {
        id: "popover-basic"
      }, /*#__PURE__*/_react.default.createElement(_Popover.default.Title, {
        as: "h3"
      }, this.props.title), /*#__PURE__*/_react.default.createElement(_Popover.default.Content, null, this.props.content))
    }, this.props.element);
  }

}

exports.default = PopoverTooltip;
PopoverTooltip.defaultProps = {
  show: 1000,
  hide: 1000,
  title: "A title",
  content: "Tooltip content",
  element: /*#__PURE__*/_react.default.createElement("button", null, "Fake button")
};