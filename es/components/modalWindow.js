"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

class ModalWindow extends _react.default.PureComponent {
  render() {
    return /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.33)",
        display: "flex",
        alignItems: "center"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#fff",
        height: "80%",
        padding: 10,
        borderRadius: 5,
        boxShadow: "0 1px 6px -2px #000",
        overflow: "auto"
      }
    }, this.props.children)), this.props.overlaysContainer);
  }

}

exports["default"] = ModalWindow;