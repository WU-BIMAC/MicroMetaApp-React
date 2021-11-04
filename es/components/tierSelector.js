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

      var wrapperContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        minWidth: "950px",
        minHeight: "1050px"
      };
      var mainContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        maxHeight: "1050px"
      };
      var buttonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "80%",
        alignItems: "center" //margin: "50px",

      };
      var buttonModeSelectorStyle = {
        width: "900px",
        height: "200px",
        margin: "25px"
      };
      var buttonsInnerContainer = {
        display: "flex",
        justifyContent: "flex-end",
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
      var logoContainer = {
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "column",
        width: "100%",
        height: "20%",
        alignItems: "center",
        marginTop: "10px"
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
      var styleImageIconHome = {
        width: "30px",
        height: "30px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var tierList = this.props.tierList;
      var iconImg_tier1 = null;
      var iconImg_tier2 = null;
      var iconImg_tier3 = null;

      if (this.props.isHardware) {
        iconImg_tier1 = url.resolve(this.props.imagesPathSVG, _constants.string_hardware_tier_1_img);
        iconImg_tier2 = url.resolve(this.props.imagesPathSVG, _constants.string_hardware_tier_2_img);
        iconImg_tier3 = url.resolve(this.props.imagesPathSVG, _constants.string_hardware_tier_3_img);
      } else {
        iconImg_tier1 = url.resolve(this.props.imagesPathSVG, _constants.string_settings_tier_1_img);
        iconImg_tier2 = url.resolve(this.props.imagesPathSVG, _constants.string_settings_tier_2_img);
        iconImg_tier3 = url.resolve(this.props.imagesPathSVG, _constants.string_settings_tier_3_img);
      }

      var logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
      var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var tiers = [];
      tierList.forEach(function (tier) {
        var index = tier.Index - 1;
        var iconImg = null;

        if (tier.Index === 1) {
          iconImg = iconImg_tier1;
        } else if (tier.Index === 2) {
          iconImg = iconImg_tier2;
        } else {
          iconImg = iconImg_tier3;
        }

        var iconPath = iconImg + (iconImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""); //let regex = /(\[|\])/gi;
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
            alt: iconImg,
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
      var homeImg = url.resolve(this.props.imagesPathSVG, _constants.string_home_img);
      var homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var backText = "Home";

      var homeButton = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-0",
        position: "top",
        title: _constants.home_tooltip.title,
        content: _constants.home_tooltip.content,
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
          src: homeImgPath,
          alt: homeImg,
          style: styleImageIconHome
        }), backText))
      }); //handleMenuItemClick={this.props.onClickTierSelection}


      return /*#__PURE__*/_react.default.createElement("div", {
        style: wrapperContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: mainContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsContainer
      }, tiers), /*#__PURE__*/_react.default.createElement("div", {
        style: logoContainer
      }, homeButton, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      })))));
    }
  }]);

  return TierSelector;
}(_react.default.PureComponent);

exports.default = TierSelector;