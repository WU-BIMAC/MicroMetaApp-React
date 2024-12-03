"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CanvasElementDeleteButton = exports.CanvasElementCopyButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResizable = require("react-resizable");

var _imageElement = _interopRequireDefault(require("./imageElement"));

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var url = require("url");

var CanvasElement = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CanvasElement, _React$PureComponent);

  var _super = _createSuper(CanvasElement);

  function CanvasElement(props) {
    var _this;

    _classCallCheck(this, CanvasElement);

    _this = _super.call(this, props);
    _this.state = {
      editing: false,
      editForm: null
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleConfirm = _this.handleConfirm.bind(_assertThisInitialized(_this));
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_this));
    _this.handleSave = _this.handleSave.bind(_assertThisInitialized(_this));
    _this.handleLoad = _this.handleLoad.bind(_assertThisInitialized(_this));
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    _this.updateMinMaxDimensions = _this.updateMinMaxDimensions.bind(_assertThisInitialized(_this));
    _this.counter = 0;
    return _this;
  }

  _createClass(CanvasElement, [{
    key: "handleClick",
    value: function handleClick() {
      if (this.props.isDebug) console.log("inside of canvasElement in the function handleClick");

      if (!this.props.isViewOnly) {
        if (this.props.isDebug) console.log("INSIDE CANVASELEMENT 1");
        this.props.setEditingOnCanvas(true);

        var editForm = /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          title: "Edit " + this.props.formTitle,
          schema: this.props.schema,
          inputData: this.props.inputData,
          id: this.props.id,
          validationTier: this.props.validationTier // getComponent={this.props.getComponent}
          ,
          onConfirm: this.handleConfirm,
          onCancel: this.handleCancel,
          onSave: this.handleSave,
          onLoad: this.handleLoad,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: this.props.currentChildrenComponentIdentifier,
          minChildrenComponentIdentifier: this.props.minChildrenComponentIdentifier,
          maxChildrenComponentIdentifier: this.props.maxChildrenComponentIdentifier,
          elementByType: this.props.elementByType,
          editable: true,
          isDebug: this.props.isDebug
        });

        this.setState({
          editing: true,
          editForm: editForm
        });
      }
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm(id, data, linkedFields) {
      console.log("inside of handleConfirm");
      this.setState({
        editing: false,
        editForm: null
      });
      this.props.setEditingOnCanvas(false);
      this.props.handleConfirm(id, data, linkedFields);
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      if (this.props.isDebug) console.log("inside of function handleCancel in canvasElement.js");
      this.props.setEditingOnCanvas(false);
      this.setState({
        editing: false,
        editForm: null
      });
    }
  }, {
    key: "handleSave",
    value: function handleSave(id, consolidatedData, linkedFields) {
      if (this.props.isDebug) console.log("inside of function handleSave in canvasElement.js");
      this.props.setEditingOnCanvas(false);
      this.props.handleConfirm(id, consolidatedData, linkedFields);
      this.props.onClickSave(id, consolidatedData, linkedFields); // this.setState({ editing: false, editForm: null });  //might have to change this line to be similar to the "handleConfirm" logic
    }
  }, {
    key: "handleLoad",
    value: function handleLoad() {
      if (this.props.isDebug) console.log("inside of function handleLoad in canvasElement.js");
      this.props.setEditingOnCanvas(false);
      this.setState({
        editing: false,
        editForm: null
      }); //might have to change this line 
    }
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
    value: function updateMinMaxDimensions(id, originalImgWidth, originalImgHeight) {// if (
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
  }, {
    key: "render",
    value: function render() {
      var style = {
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
      var resizableStyle = {
        border: "none"
      };
      var play = false; // if (!this.props.validated) {
      // 	resizableStyle = Object.assign(resizableStyle, {
      // 		border: "5px ridge red"
      // 	});
      // 	if (!this.props.dragged) {
      // 		play = true;
      // 	}
      // } else {
      // 	resizableStyle = Object.assign(resizableStyle, { border: "none" });
      // }

      var width = this.props.width;
      var height = this.props.height;
      var styleImage = {
        width: width,
        height: height
      };
      var minWidth = this.props.minWidth;
      var minHeight = this.props.minHeight;
      var maxWidth = this.props.maxWidth;
      var maxHeight = this.props.maxHeight;
      var editForm = null;

      if (this.state.editing) {
        editForm = this.state.editForm;
      }

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactResizable.ResizableBox, {
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
        rotate: this.props.rotate,
        image: this.props.image,
        name: this.props.schema.title,
        style: styleImage
      }))), editForm);
    }
  }]);

  return CanvasElement;
}(_react.default.PureComponent);

exports.default = CanvasElement;
CanvasElement.defaultProps = {
  maxWidth: 200,
  maxHeight: 200,
  text: "Something",
  handleClick: function handleClick(e) {
    console.log("Clicked!", e.clientX, e.clientY);
  }
};

var CanvasElementDeleteButton = /*#__PURE__*/function (_React$PureComponent2) {
  _inherits(CanvasElementDeleteButton, _React$PureComponent2);

  var _super2 = _createSuper(CanvasElementDeleteButton);

  function CanvasElementDeleteButton(props) {
    var _this2;

    _classCallCheck(this, CanvasElementDeleteButton);

    _this2 = _super2.call(this, props);
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
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.handleClick,
        style: this.props.myStyle
      }, "x");
    }
  }]);

  return CanvasElementDeleteButton;
}(_react.default.PureComponent);

exports.CanvasElementDeleteButton = CanvasElementDeleteButton;

var CanvasElementCopyButton = /*#__PURE__*/function (_React$PureComponent3) {
  _inherits(CanvasElementCopyButton, _React$PureComponent3);

  var _super3 = _createSuper(CanvasElementCopyButton);

  function CanvasElementCopyButton(props) {
    var _this3;

    _classCallCheck(this, CanvasElementCopyButton);

    _this3 = _super3.call(this, props);
    _this3.handleClick = _this3.handleClick.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(CanvasElementCopyButton, [{
    key: "handleClick",
    value: function handleClick() {
      if (!this.props.isViewOnly) this.props.handleCopy(this.props.index);
    }
  }, {
    key: "render",
    value: function render() {
      var styleImage = {
        width: "12.5px",
        height: "12.5px"
      };
      var copyImg = url.resolve(this.props.imagesPath, _constants.string_copy_img);
      var copyPath = copyImg + (copyImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.handleClick,
        style: this.props.myStyle
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: copyPath,
        alt: copyImg,
        style: styleImage
      }));
    }
  }]);

  return CanvasElementCopyButton;
}(_react.default.PureComponent);

exports.CanvasElementCopyButton = CanvasElementCopyButton;