"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var ImageElement =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ImageElement, _React$PureComponent);

  function ImageElement(props) {
    var _this;

    _classCallCheck(this, ImageElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageElement).call(this, props));
    _this.state = {
      height: null,
      width: null
    };
    _this.onImgLoad = _this.onImgLoad.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ImageElement, [{
    key: "onImgLoad",
    value: function onImgLoad(_ref) {
      var _this2 = this;

      var img = _ref.target;
      var oldHeight = this.state.height;
      var oldWidth = this.state.width;
      if (oldWidth !== null && oldHeight !== null) return;
      var newHeight = img.naturalHeight; // / 5;

      var newWidth = img.naturalWidth; // / 5;

      this.setState({
        height: newHeight,
        width: newWidth
      }, function () {
        return _this2.props.updateMinMaxDimensions(_this2.props.id, newWidth, newHeight);
      });
    }
  }, {
    key: "render",
    value: function render() {
      //padding: "5px"
      var style = Object.assign({
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent"
      }, this.props.style);

      var img = _react["default"].createElement("img", {
        onLoad: this.onImgLoad,
        src: this.props.image + (this.props.image.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: this.props.name,
        style: {
          height: "100%",
          width: "100%",
          margin: "auto"
        }
      });

      return _react["default"].createElement("div", {
        style: style
      }, img); //return img;
    }
  }]);

  return ImageElement;
}(_react["default"].PureComponent);

exports["default"] = ImageElement;