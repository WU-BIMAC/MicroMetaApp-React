"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

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

var ImageElement = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ImageElement, _React$PureComponent);

  var _super = _createSuper(ImageElement);

  function ImageElement(props) {
    var _this;

    _classCallCheck(this, ImageElement);

    _this = _super.call(this, props);
    _this.state = {
      height: null,
      width: null
    }; //this.onImgLoad = this.onImgLoad.bind(this);

    return _this;
  } // onImgLoad({ target: img }) {
  // 	let oldHeight = this.state.height;
  // 	let oldWidth = this.state.width;
  // 	if (oldWidth !== null && oldHeight !== null) return;
  // 	let newHeight = img.naturalHeight;
  // 	let newWidth = img.naturalWidth;
  // 	this.setState(
  // 		{
  // 			height: newHeight,
  // 			width: newWidth,
  // 		},
  // 		() =>
  // 			this.props.updateMinMaxDimensions(this.props.id, newWidth, newHeight)
  // 	);
  // }


  _createClass(ImageElement, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          image = _this$props.image,
          propStyle = _this$props.style;
      var imageStyle = {
        height: "100%",
        width: "100%",
        margin: "auto"
      };
      var style = Object.assign({
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent"
      }, propStyle);
      var rotate = this.props.rotate;
      var rotateImageStyle = null;

      if (rotate !== null && rotate !== undefined) {
        console.log("rotate");
        console.log(rotate);
        rotateImageStyle = Object.assign({
          transform: "rotate(".concat(rotate, "deg)")
        }, imageStyle);
      } else {
        rotateImageStyle = imageStyle;
      }

      var img = /*#__PURE__*/_react.default.createElement("img", {
        //onLoad={this.onImgLoad}
        src: image + (image.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: name,
        style: rotateImageStyle
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        style: style
      }, img);
    }
  }]);

  return ImageElement;
}(_react.default.PureComponent);

exports.default = ImageElement;