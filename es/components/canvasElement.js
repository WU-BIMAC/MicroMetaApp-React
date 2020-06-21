"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasElementDeleteButton = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResizable = require("react-resizable");

var _imageElement = _interopRequireDefault(require("./imageElement"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CanvasElement extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.updateMinMaxDimensions = this.updateMinMaxDimensions.bind(this);
    this.counter = 0;
  }

  handleClick() {
    if (!this.props.isViewOnly) {
      this.props.setEditingOnCanvas(true);
      this.setState({
        editing: true
      });
    }
  }

  handleConfirm(id, data, linkedFields) {
    this.setState({
      editing: false
    });
    this.props.setEditingOnCanvas(false);
    this.props.handleConfirm(id, data, linkedFields);
  }

  handleCancel() {
    this.props.setEditingOnCanvas(false);
    this.setState({
      editing: false
    });
  }

  handleResize(e, data) {
    let width = data.size.width;
    let height = data.size.height;
    let id = this.props.id;
    this.props.updateDimensions(id, width, height, true);
  }

  updateMinMaxDimensions(id, originalImgWidth, originalImgHeight) {// if (
    // 	this.state.originalWidth == originalImgWidth &&
    // 	this.state.originalHeight == originalImgHeight
    // )
    // 	return;
    // let scalingFactor = this.state.scalingFactor;
    // let scaledOriginalImgWidth = originalImgWidth * scalingFactor;
    // let scaledOriginalImgHeight = originalImgHeight * scalingFactor;
    // let minWidth = scaledOriginalImgWidth / 2;
    // let minHeight = scaledOriginalImgHeight / 2;
    // let maxWidth = scaledOriginalImgWidth * 2;
    // let maxHeight = scaledOriginalImgHeight * 2;
    // this.setState({
    // 	originalWidth: scaledOriginalImgWidth,
    // 	originalHeight: scaledOriginalImgHeight,
    // 	minWidth: minWidth,
    // 	minHeight: minHeight,
    // 	maxWidth: maxWidth,
    // 	maxHeight: maxHeight,
    // });
    // this.props.updateDimensions(
    // 	id,
    // 	scaledOriginalImgWidth,
    // 	scaledOriginalImgHeight,
    // 	false
    // );
  }

  render() {
    if (this.state.editing) {
      return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeader.default, {
        schema: this.props.schema,
        inputData: this.props.inputData,
        id: this.props.id,
        onConfirm: this.handleConfirm,
        onCancel: this.handleCancel,
        overlaysContainer: this.props.overlaysContainer,
        currentChildrenComponentIdentifier: this.props.currentChildrenComponentIdentifier,
        minChildrenComponentIdentifier: this.props.minChildrenComponentIdentifier,
        maxChildrenComponentIdentifier: this.props.maxChildrenComponentIdentifier,
        elementByType: this.props.elementByType
      });
    }

    let style = {
      textAlign: "center",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      padding: "0px",
      margin: "0px",
      border: "0px",
      font: "14px",
      color: "inherit",
      cursor: "pointer"
    };
    let resizableStyle = {
      border: "none"
    };
    let play = false; // if (!this.props.validated) {
    // 	resizableStyle = Object.assign(resizableStyle, {
    // 		border: "5px ridge red"
    // 	});
    // 	if (!this.props.dragged) {
    // 		play = true;
    // 	}
    // } else {
    // 	resizableStyle = Object.assign(resizableStyle, { border: "none" });
    // }

    let width = this.props.width;
    let height = this.props.height;
    let styleImage = {
      width: width,
      height: height
    };
    let minWidth = this.props.minWidth;
    let minHeight = this.props.minHeight;
    let maxWidth = this.props.maxWidth;
    let maxHeight = this.props.maxHeight;
    return /*#__PURE__*/_react.default.createElement(_reactResizable.ResizableBox, {
      width: width,
      height: height,
      minConstraints: [minWidth, minHeight],
      maxConstraints: [maxWidth, maxHeight],
      lockAspectRatio: true,
      onResizeStart: this.handleResizeStart,
      onResize: this.handleResize,
      onResizeStop: this.handleResizeStop,
      style: resizableStyle
    }, /*#__PURE__*/_react.default.createElement("button", {
      style: style,
      onClick: this.handleClick
    }, /*#__PURE__*/_react.default.createElement(_imageElement.default, {
      updateMinMaxDimensions: this.updateMinMaxDimensions,
      id: this.props.id,
      image: this.props.image,
      name: this.props.schema.title,
      style: styleImage
    })));
  }

}

exports.default = CanvasElement;
CanvasElement.defaultProps = {
  maxWidth: 200,
  maxHeight: 200,
  text: "Something",
  handleClick: function handleClick(e) {
    console.log("Clicked!", e.clientX, e.clientY);
  }
};

class CanvasElementDeleteButton extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.isViewOnly) this.props.handleDelete(this.props.index);
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: this.handleClick,
      style: this.props.myStyle
    }, "x");
  }

}

exports.CanvasElementDeleteButton = CanvasElementDeleteButton;