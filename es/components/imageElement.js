"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImageElement extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
      width: null
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  onImgLoad({
    target: img
  }) {
    let oldHeight = this.state.height;
    let oldWidth = this.state.width;
    if (oldWidth !== null && oldHeight !== null) return;
    let newHeight = img.naturalHeight;
    let newWidth = img.naturalWidth;
    this.setState({
      height: newHeight,
      width: newWidth
    }, () => this.props.updateMinMaxDimensions(this.props.id, newWidth, newHeight));
  }

  render() {
    const _this$props = this.props,
          name = _this$props.name,
          image = _this$props.image,
          propStyle = _this$props.style;
    const imageStyle = {
      height: "100%",
      width: "100%",
      margin: "auto"
    };
    const style = Object.assign({
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent"
    }, propStyle);

    let img = /*#__PURE__*/_react.default.createElement("img", {
      onLoad: this.onImgLoad,
      src: image + (image.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
      alt: name,
      style: imageStyle
    });

    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, img);
  }

}

exports.default = ImageElement;