"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var url = require("url");

var TierSelector = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TierSelector, _React$PureComponent);

  var _super = _createSuper(TierSelector);

  function TierSelector(props) {
    _classCallCheck(this, TierSelector);

    return _super.call(this, props);
  }

  _createClass(TierSelector, [{
    key: "render",
    value: function render() {
      var _this = this;

      var windowExternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var windowButtonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "750px",
        alignItems: "center",
        margin: "50px"
      };
      var buttonModeSelectorStyle = {
        width: "800px",
        height: "200px",
        margin: "25px"
      };
      var buttonsInnerContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var buttonsInnerTextContainer = {
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "flex-start"
      };
      var windowLogoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var styleImageContainer = {
        width: "".concat(_constants.number_small_logo_width, "px"),
        height: "".concat(_constants.number_small_logo_height, "px")
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var styleIconImage = {
        width: "25%",
        height: "75%",
        margin: "20px"
      };
      var styleText_1 = {
        textAlign: "left",
        //fontSize: "1em",
        marginLeft: "15px",
        marginRight: "15px",
        wordBreak: "break-word",
        whiteSpace: "normal"
      };
      var styleText_2 = {
        textAlign: "left",
        fontSize: "0.8em",
        marginLeft: "15px",
        marginRight: "15px",
        wordBreak: "break-word",
        whiteSpace: "normal"
      }; // let styleText_3 = {
      // 	textAlign: "left",
      // 	fontSize: "0.6em",
      // 	marginLeft: "15px",
      // 	marginRight: "15px",
      // 	wordBreak: "break-word",
      // 	whiteSpace: "normal",
      // };

      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleImageBk = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var tierList = this.props.tierList;
      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var iconPath = this.props.iconImg + (this.props.iconImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var tiers = [];
      tierList.forEach(function (tier) {
        var index = tier.Index - 1; //let regex = /(\[|\])/gi;
        // let minComp = tier.MinimumComponentsList.replace(regex, "").replace(
        // 	"||",
        // 	"or"
        // );

        var button = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          position: _constants.tier_selector_tooltip.position,
          title: _constants.tier_selector_tooltip.title,
          content: _constants.tier_selector_tooltip.content,
          key: "popover-tier-button-" + index,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            onClick: function onClick() {
              _this.props.onClickTierSelection(index, tier.Name);
            },
            style: buttonModeSelectorStyle,
            size: "lg",
            variant: "light",
            key: "tier-button-" + index
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: buttonsInnerContainer
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: iconPath,
            alt: _this.props.iconImg,
            style: styleIconImage
          }), /*#__PURE__*/_react.default.createElement("div", {
            style: buttonsInnerTextContainer
          }, /*#__PURE__*/_react.default.createElement("h2", {
            style: styleText_1
          }, tier.Name), /*#__PURE__*/_react.default.createElement("p", {
            style: styleText_2
          }, tier.Description))))
        });

        tiers[index] = button;
      });
      var backImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_back_img);
      var backImgPath = backImgPath_tmp + (backImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var backText = "Home";

      var homeButton = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-0",
        position: "top",
        title: _constants.back_tooltip.title,
        content: _constants.back_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-0",
          onClick: function onClick() {
            return _this.props.onClickHome(backText);
          },
          style: styleButton,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: backImgPath,
          alt: backImgPath_tmp,
          style: styleImageBk
        }), backText))
      }); //handleMenuItemClick={this.props.onClickTierSelection}


      return /*#__PURE__*/_react.default.createElement("div", {
        style: windowExternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: windowButtonsContainer
      }, tiers), /*#__PURE__*/_react.default.createElement("div", {
        style: windowLogoContainer
      }, homeButton, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      }))));
    }
  }]);

  return TierSelector;
}(_react.default.PureComponent);

exports.default = TierSelector;