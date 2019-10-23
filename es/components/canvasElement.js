"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasElementDeleteButton = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResizable = require("react-resizable");

var _reactSimpleAnimate = require("react-simple-animate");

var _imageElement = _interopRequireDefault(require("./imageElement"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CanvasElement =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CanvasElement, _React$PureComponent);

  function CanvasElement(props) {
    var _this;

    _classCallCheck(this, CanvasElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CanvasElement).call(this, props));
    _this.state = {
      editing: false
    };
    _this.startWidth = null;
    _this.startHeight = null;
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    _this.onResizeStart = _this.onResizeStart.bind(_assertThisInitialized(_this));
    _this.onResize = _this.onResize.bind(_assertThisInitialized(_this));
    _this.onResizeStop = _this.onResizeStop.bind(_assertThisInitialized(_this));
    _this.counter = 0;
    return _this;
  }

  _createClass(CanvasElement, [{
    key: "onClick",
    value: function onClick() {
      this.setState({
        editing: true
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm(id, data) {
      this.setState({
        editing: false
      });
      this.props.onConfirm(id, data);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.setState({
        editing: false
      });
    }
  }, {
    key: "onResizeStart",
    value: function onResizeStart(e, data) {}
  }, {
    key: "onResize",
    value: function onResize(e, data) {
      var width = data.size.width;
      var height = data.size.height;
      var imgWidth = width;
      var imgHeight = height;
      var id = this.props.id;
      this.props.updateDimensions(id, imgWidth, imgHeight, true);
    }
  }, {
    key: "onResizeStop",
    value: function onResizeStop(e, data) {}
  }, {
    key: "render",
    value: function render() {
      if (this.state.editing) {
        return _react.default.createElement(_multiTabFormWithHeader.default, {
          schema: this.props.schema,
          inputData: this.props.inputData,
          id: this.props.id,
          onConfirm: this.onConfirm,
          onCancel: this.onCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: this.props.currentChildrenComponentIdentifier,
          minChildrenComponentIdentifier: this.props.minChildrenComponentIdentifier,
          maxChildrenComponentIdentifier: this.props.maxChildrenComponentIdentifier,
          elementByType: this.props.elementByType
        });
      }

      var style = {
        textAlign: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        // NEW, Spec - Opera 12.1, Firefox 20+
        justifyContent: "center",
        backgroundColor: "transparent",
        padding: "0px",
        margin: "0px",
        font: "14px",
        color: "inherit",
        cursor: "pointer"
      };
      var play = false;

      if (!this.props.validated) {
        style = Object.assign(style, {
          border: "5px ridge red"
        });

        if (!this.props.dragged) {
          play = true;
        }
      } else {
        style = Object.assign(style, {
          border: "none"
        });
      }

      var width = this.props.width;
      var height = this.props.height;
      var styleImage = {
        width: width,
        height: height
      };

      if (this.counter < 6) {
        this.startWidth = width;
        this.startHeight = height;
        this.counter++;
      }

      if (!this.props.validated) {
        width += 10;
        height += 10;
      }

      var minWidth = this.startWidth / 2;
      var minHeight = this.startHeight / 2;
      var maxWidth = this.startWidth * 2;
      var maxHeight = this.startHeight * 2;
      return _react.default.createElement(_reactResizable.ResizableBox, {
        width: width,
        height: height,
        minConstraints: [minWidth, minHeight],
        maxConstraints: [maxWidth, maxHeight],
        lockAspectRatio: true,
        onResizeStart: this.onResizeStart,
        onResize: this.onResize,
        onResizeStop: this.onResizeStop
      }, _react.default.createElement(_reactSimpleAnimate.AnimateKeyframes, {
        key: "Animation-0",
        play: play,
        durationSeconds: 1,
        keyframes: ["opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1"]
      }, _react.default.createElement("button", {
        style: style,
        onClick: this.onClick
      }, _react.default.createElement(_imageElement.default, {
        updateDimensions: this.props.updateDimensions,
        id: this.props.id,
        image: this.props.image,
        name: this.props.schema.title,
        style: styleImage
      }))));
    }
  }]);

  return CanvasElement;
}(_react.default.PureComponent); //TODO verify if this is necessary


exports.default = CanvasElement;
CanvasElement.defaultProps = {
  maxWidth: 200,
  maxHeight: 200,
  text: "Something",
  onClick: function onClick(e) {
    // eslint-disable-next-line no-console
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
    _this2.onClick = _this2.onClick.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(CanvasElementDeleteButton, [{
    key: "onClick",
    value: function onClick() {
      this.props.onDelete(this.props.index);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("button", {
        type: "button",
        onClick: this.onClick,
        style: this.props.myStyle
      }, "x");
    }
  }]);

  return CanvasElementDeleteButton;
}(_react.default.PureComponent);

exports.CanvasElementDeleteButton = CanvasElementDeleteButton;