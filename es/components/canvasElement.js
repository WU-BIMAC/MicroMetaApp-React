"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasElementDeleteButton = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResizable = require("react-resizable");

var _reactSimpleAnimate = require("react-simple-animate");

var _imageElement = _interopRequireDefault(require("./imageElement"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CanvasElement =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CanvasElement, _React$PureComponent);

  function CanvasElement(props) {
    var _this;

    _classCallCheck(this, CanvasElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CanvasElement).call(this, props));
    _this.state = {
      editing: false,
      originalWidth: null,
      originalHeight: null,
      minWidth: null,
      minHeight: null,
      maxWidth: null,
      maxHeight: null,
      scalingFactor: props.scalingFactor || 1
    };
    _this.startWidth = null;
    _this.startHeight = null;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleConfirm = _this.handleConfirm.bind(_assertThisInitialized(_this));
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_this));
    _this.handleResizeStart = _this.handleResizeStart.bind(_assertThisInitialized(_this));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    _this.handleResizeStop = _this.handleResizeStop.bind(_assertThisInitialized(_this));
    _this.updateMinMaxDimensions = _this.updateMinMaxDimensions.bind(_assertThisInitialized(_this));
    _this.counter = 0;
    return _this;
  }

  _createClass(CanvasElement, [{
    key: "handleClick",
    value: function handleClick() {
      if (!this.props.isViewOnly) {
        this.props.setEditingOnCanvas(true);
        this.setState({
          editing: true
        });
      }
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm(id, data, linkedFields) {
      this.setState({
        editing: false
      });
      this.props.setEditingOnCanvas(false);
      this.props.handleConfirm(id, data, linkedFields);
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.props.setEditingOnCanvas(false);
      this.setState({
        editing: false
      });
    }
  }, {
    key: "handleResizeStart",
    value: function handleResizeStart() {}
  }, {
    key: "handleResize",
    value: function handleResize(e, data) {
      var width = data.size.width;
      var height = data.size.height;
      var id = this.props.id;
      this.props.updateDimensions(id, width, height, true);
    }
  }, {
    key: "updateMinMaxDimensions",
    value: function updateMinMaxDimensions(id, originalImgWidth, originalImgHeight) {
      if (this.state.originalWidth == originalImgWidth && this.state.originalHeight == originalImgHeight) return;
      var scalingFactor = this.state.scalingFactor;
      var scaledOriginalImgWidth = originalImgWidth * scalingFactor;
      var scaledOriginalImgHeight = originalImgHeight * scalingFactor;
      this.setState({
        originalWidth: scaledOriginalImgWidth,
        originalHeight: scaledOriginalImgHeight,
        minWidth: scaledOriginalImgWidth / 2,
        minHeight: scaledOriginalImgHeight / 2,
        maxWidth: scaledOriginalImgWidth * 2,
        maxHeight: scaledOriginalImgHeight * 2
      });
      this.props.updateDimensions(id, scaledOriginalImgWidth, scaledOriginalImgHeight, false);
    }
  }, {
    key: "handleResizeStop",
    value: function handleResizeStop() {}
  }, {
    key: "render",
    value: function render() {
      if (this.state.editing) {
        return _react["default"].createElement(_multiTabFormWithHeader["default"], {
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

      var resizableStyle = {};
      var play = false;

      if (!this.props.validated) {
        resizableStyle = Object.assign(resizableStyle, {
          border: "5px ridge red"
        });

        if (!this.props.dragged) {
          play = true;
        }
      } else {
        resizableStyle = Object.assign(resizableStyle, {
          border: "none"
        });
      }

      var width = this.props.width;
      var height = this.props.height;
      var minWidth = this.state.minWidth;
      var minHeight = this.state.minHeight;
      var maxWidth = this.state.maxWidth;
      var maxHeight = this.state.maxHeight;
      return _react["default"].createElement(_reactResizable.ResizableBox, {
        width: width,
        height: height,
        minConstraints: [minWidth, minHeight],
        maxConstraints: [maxWidth, maxHeight],
        lockAspectRatio: true,
        onResizeStart: this.handleResizeStart,
        onResize: this.handleResize,
        onResizeStop: this.handleResizeStop,
        style: resizableStyle
      }, _react["default"].createElement(_reactSimpleAnimate.AnimateKeyframes, {
        key: "Animation-0",
        play: play,
        durationSeconds: 1,
        keyframes: ["opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1"]
      }, _react["default"].createElement("button", {
        style: {
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
        },
        onClick: this.handleClick
      }, _react["default"].createElement(_imageElement["default"], {
        updateMinMaxDimensions: this.updateMinMaxDimensions,
        id: this.props.id,
        image: this.props.image,
        name: this.props.schema.title,
        style: {
          width: width,
          height: height
        }
      }))));
    }
  }]);

  return CanvasElement;
}(_react["default"].PureComponent);

exports["default"] = CanvasElement;
CanvasElement.defaultProps = {
  maxWidth: 200,
  maxHeight: 200,
  text: "Something",
  handleClick: function handleClick(e) {
    console.log("Clicked!", e.clientX, e.clientY);
  }
};

var CanvasElementDeleteButton =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(CanvasElementDeleteButton, _React$PureComponent2);

  function CanvasElementDeleteButton(props) {
    var _this2;

    _classCallCheck(this, CanvasElementDeleteButton);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(CanvasElementDeleteButton).call(this, props));
    _this2.handleClick = _this2.handleClick.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(CanvasElementDeleteButton, [{
    key: "handleClick",
    value: function handleClick() {
      if (!this.props.isViewOnly) this.props.handleDelete(this.props.index);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("button", {
        type: "button",
        onClick: this.handleClick,
        style: this.props.myStyle
      }, "x");
    }
  }]);

  return CanvasElementDeleteButton;
}(_react["default"].PureComponent);

exports.CanvasElementDeleteButton = CanvasElementDeleteButton;