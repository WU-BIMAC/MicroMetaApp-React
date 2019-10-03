"use strict";

var _interopRequireDefault = require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasElementDeleteButton = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactResizable = require("react-resizable");

var _reactSimpleAnimate = require("react-simple-animate");

var _imageElement = _interopRequireDefault(require("./imageElement"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/canvasElement.js";

var CanvasElement = function (_React$PureComponent) {
  (0, _inherits2.default)(CanvasElement, _React$PureComponent);

  function CanvasElement(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CanvasElement);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CanvasElement).call(this, props));
    _this.state = {
      editing: false
    };
    _this.startWidth = null;
    _this.startHeight = null;
    _this.onClick = _this.onClick.bind((0, _assertThisInitialized2.default)(_this));
    _this.onConfirm = _this.onConfirm.bind((0, _assertThisInitialized2.default)(_this));
    _this.onCancel = _this.onCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.onResizeStart = _this.onResizeStart.bind((0, _assertThisInitialized2.default)(_this));
    _this.onResize = _this.onResize.bind((0, _assertThisInitialized2.default)(_this));
    _this.onResizeStop = _this.onResizeStop.bind((0, _assertThisInitialized2.default)(_this));
    _this.counter = 0;
    return _this;
  }

  (0, _createClass2.default)(CanvasElement, [{
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
          elementByType: this.props.elementByType,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61
          },
          __self: this
        });
      }

      var style = {
        textAlign: "center",
        height: "100%",
        width: "100%",
        display: "flex",
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
        onResizeStop: this.onResizeStop,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, _react.default.createElement(_reactSimpleAnimate.AnimateKeyframes, {
        key: "Animation-0",
        play: play,
        durationSeconds: 1,
        keyframes: ["opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1", "opacity: 0.8", "opacity: 0.6", "opacity: 0.4", "opacity: 0.2", "opacity: 0.4", "opacity: 0.6", "opacity: 0.8", "opacity: 1"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, _react.default.createElement("button", {
        style: style,
        onClick: this.onClick,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      }, _react.default.createElement(_imageElement.default, {
        updateDimensions: this.props.updateDimensions,
        id: this.props.id,
        image: this.props.image,
        name: this.props.schema.title,
        style: styleImage,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }))));
    }
  }]);
  return CanvasElement;
}(_react.default.PureComponent);

exports.default = CanvasElement;
CanvasElement.defaultProps = {
  maxWidth: 200,
  maxHeight: 200,
  text: "Something",
  onClick: function onClick(e) {
    console.log("Clicked!", e.clientX, e.clientY);
  }
};

var CanvasElementDeleteButton = function (_React$PureComponent2) {
  (0, _inherits2.default)(CanvasElementDeleteButton, _React$PureComponent2);

  function CanvasElementDeleteButton(props) {
    var _this2;

    (0, _classCallCheck2.default)(this, CanvasElementDeleteButton);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CanvasElementDeleteButton).call(this, props));
    _this2.onClick = _this2.onClick.bind((0, _assertThisInitialized2.default)(_this2));
    return _this2;
  }

  (0, _createClass2.default)(CanvasElementDeleteButton, [{
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
        style: this.props.myStyle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        },
        __self: this
      }, "x");
    }
  }]);
  return CanvasElementDeleteButton;
}(_react.default.PureComponent);

exports.CanvasElementDeleteButton = CanvasElementDeleteButton;