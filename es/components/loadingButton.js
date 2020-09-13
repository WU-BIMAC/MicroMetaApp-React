"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

class LoadingButton extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isLoading: true
    }, () => {
      this.props.onLoad().then(() => {
        this.setState({
          isLoading: false
        });
      });
    });
  }

  render() {
    const isLoading = this.state.isLoading;
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      variant: "primary",
      disabled: isLoading,
      onClick: !isLoading ? this.handleClick : null
    }, isLoading ? "Loading…" : "Load schema");
  }

}

exports["default"] = LoadingButton;