"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

class Header extends _react.default.PureComponent {
  render() {
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    const style = {
      backgroundColor: "LightGray",
      width: width,
      height: height,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row"
    };
    const styleTitle = {
      backgroundColor: "LightGray",
      textAlign: "left",
      verticalAlign: "middle",
      paddingLeft: "10px",
      marginTop: "auto",
      marginBottom: "auto"
    };
    let styleImageContainer = {
      width: "430px",
      height: "60px"
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    }; //<div style={styleTitle}>Microscopy Metadata For The Real World</div>

    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: this.props.logoImg,
      alt: this.props.logoImg,
      style: styleImage,
      onLoad: this.onImgLoad
    })));
  }

}

exports["default"] = Header;