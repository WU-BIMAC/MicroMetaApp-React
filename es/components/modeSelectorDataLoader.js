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

var ModeSelectorDataLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ModeSelectorDataLoader, _React$PureComponent);

  var _super = _createSuper(ModeSelectorDataLoader);

  function ModeSelectorDataLoader(props) {
    var _this;

    _classCallCheck(this, ModeSelectorDataLoader);

    _this = _super.call(this, props);
    _this.state = {
      isLoadingSchema: false,
      isLoadingMicroscopes: false,
      isLoadingDimensions: false,
      isLoadingSettings: false,
      isLoadingTierList: false,
      isSchemaLoaded: false,
      isMicroscopesLoaded: false,
      isDimensionsLoaded: false,
      isSettingsLoaded: false,
      isTierListLoaded: false,
      isHandlingMicPreset: false,
      isHandledMicPreset: false
    };
    _this._isMounted = false;
    _this.simulateClickLoadSchema = _this.simulateClickLoadSchema.bind(_assertThisInitialized(_this));
    _this.onClickLoadSchema = _this.onClickLoadSchema.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadMicroscopes = _this.simulateClickLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.onClickLoadMicroscopes = _this.onClickLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadSettings = _this.simulateClickLoadSettings.bind(_assertThisInitialized(_this));
    _this.onClickLoadSettings = _this.onClickLoadSettings.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadDimensions = _this.simulateClickLoadDimensions.bind(_assertThisInitialized(_this));
    _this.onClickLoadDimensions = _this.onClickLoadDimensions.bind(_assertThisInitialized(_this));
    _this.simulateClickHandleMicPreset = _this.simulateClickHandleMicPreset.bind(_assertThisInitialized(_this));
    _this.onClickHandleMicPreset = _this.onClickHandleMicPreset.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadTierList = _this.simulateClickLoadTierList.bind(_assertThisInitialized(_this));
    _this.onClickLoadTierList = _this.onClickLoadTierList.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ModeSelectorDataLoader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "onClickLoadDimensions",
    value: function onClickLoadDimensions() {
      var _this2 = this;

      this.setState({
        isLoadingDimensions: true
      }, function () {
        _this2.props.onClickLoadDimensions().then(function () {
          if (_this2._isMounted) _this2.setState({
            isLoadingDimensions: false,
            isDimensionsLoaded: true
          });
        });
      });
    }
  }, {
    key: "onClickLoadSchema",
    value: function onClickLoadSchema() {
      var _this3 = this;

      this.setState({
        isLoadingSchema: true
      }, function () {
        _this3.props.onClickLoadSchema().then(function () {
          if (_this3._isMounted) _this3.setState({
            isLoadingSchema: false,
            isSchemaLoaded: true
          });
        });
      });
    }
  }, {
    key: "onClickLoadMicroscopes",
    value: function onClickLoadMicroscopes() {
      var _this4 = this;

      this.setState({
        isLoadingMicroscopes: true
      }, function () {
        _this4.props.onClickLoadMicroscopes().then(function () {
          if (_this4._isMounted) _this4.setState({
            isLoadingMicroscopes: false,
            isMicroscopesLoaded: true
          });
        });
      });
    }
  }, {
    key: "onClickLoadSettings",
    value: function onClickLoadSettings() {
      var _this5 = this;

      this.setState({
        isLoadingSettings: true
      }, function () {
        _this5.props.onClickLoadSettings().then(function () {
          if (_this5._isMounted) _this5.setState({
            isLoadingSettings: false,
            isSettingsLoaded: true
          });
        });
      });
    }
  }, {
    key: "onClickLoadTierList",
    value: function onClickLoadTierList() {
      var _this6 = this;

      this.setState({
        isLoadingTierList: true
      }, function () {
        _this6.props.onClickLoadTierList().then(function () {
          if (_this6._isMounted) _this6.setState({
            isLoadingTierList: false,
            isTierListLoaded: true
          });
        });
      });
    }
  }, {
    key: "onClickHandleMicPreset",
    value: function onClickHandleMicPreset() {
      var _this7 = this;

      this.setState({
        isHandlingMicPreset: true
      }, function () {
        _this7.props.onClickHandleMicPreset().then(function () {
          if (_this7._isMounted) _this7.setState({
            isHandlingMicPreset: false,
            isHandledMicPreset: true
          });
        });
      });
    }
  }, {
    key: "simulateClickLoadDimensions",
    value: function simulateClickLoadDimensions(loadDimensionsButtonRef) {
      if (loadDimensionsButtonRef === null) return;
      loadDimensionsButtonRef.click();
    }
  }, {
    key: "simulateClickLoadSchema",
    value: function simulateClickLoadSchema(loadSchemaButtonRef) {
      if (loadSchemaButtonRef === null) return;
      loadSchemaButtonRef.click();
    }
  }, {
    key: "simulateClickLoadMicroscopes",
    value: function simulateClickLoadMicroscopes(loadMicroscopesButtonRef) {
      if (loadMicroscopesButtonRef === null) return;
      loadMicroscopesButtonRef.click();
    }
  }, {
    key: "simulateClickLoadSettings",
    value: function simulateClickLoadSettings(loadSettingsButtonRef) {
      if (loadSettingsButtonRef === null) return;
      loadSettingsButtonRef.click();
    }
  }, {
    key: "simulateClickLoadTierList",
    value: function simulateClickLoadTierList(loadTierListButtonRef) {
      if (loadTierListButtonRef === null) return;
      loadTierListButtonRef.click();
    }
  }, {
    key: "simulateClickHandleMicPreset",
    value: function simulateClickHandleMicPreset(handleMicPresetButtonRef) {
      if (handleMicPresetButtonRef === null) return;
      handleMicPresetButtonRef.click();
    }
  }, {
    key: "render",
    value: function render() {
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
        flexFlow: "row",
        flexWrap: "wrap",
        width: "50%",
        height: "15%",
        alignItems: "center"
      };
      var windowLogoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        height: "20%",
        alignItems: "center"
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var buttonStyle = {
        width: "250px",
        height: "50px",
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "25px",
        marginRight: "25px"
      };
      var styleImageContainer = {
        width: "".concat(_constants.number_small_logo_width, "px"),
        height: "".concat(_constants.number_small_logo_height, "px")
      };
      var isLoadingSchema = this.state.isLoadingSchema;
      var isLoadingMicroscopes = this.state.isLoadingMicroscopes;
      var isLoadingSettings = this.state.isLoadingSettings;
      var isLoadingDimensions = this.state.isLoadingDimensions;
      var isLoadingTierList = this.state.isLoadingTierList;
      var isSchemaLoaded = this.state.isSchemaLoaded;
      var isMicroscopesLoaded = this.state.isMicroscopesLoaded;
      var isSettingsLoaded = this.state.isSettingsLoaded;
      var isDimensionsLoaded = this.state.isDimensionsLoaded;
      var isTierListLoaded = this.state.isTierListLoaded;
      var isHandlingMicPreset = this.state.isHandlingMicPreset;
      var isHandledMicPreset = this.state.isHandledMicPreset;
      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

      if (this.props.is4DNPortal) {
        if (!isSchemaLoaded || !isDimensionsLoaded || !isMicroscopesLoaded || !isSettingsLoaded) {
          return /*#__PURE__*/_react.default.createElement("div", {
            style: windowExternalContainer
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              textAlign: "center",
              fontWeight: "bold"
            }
          }, "Loading..."), /*#__PURE__*/_react.default.createElement("div", {
            style: windowButtonsContainer
          }, /*#__PURE__*/_react.default.createElement(_Button.default, {
            ref: this.simulateClickLoadMicroscopes,
            disabled: isLoadingMicroscopes || isMicroscopesLoaded,
            onClick: !isLoadingMicroscopes && !isMicroscopesLoaded ? this.onClickLoadMicroscopes : null,
            style: buttonStyle,
            size: "lg",
            variant: "secondary"
          }, isLoadingMicroscopes ? "Loading microscopes" : isMicroscopesLoaded ? "Microscopes loaded" : "Load microscopes"), /*#__PURE__*/_react.default.createElement(_Button.default, {
            ref: this.simulateClickLoadSettings,
            disabled: isLoadingSettings || isSettingsLoaded,
            onClick: !isLoadingSettings && !isSettingsLoaded ? this.onClickLoadSettings : null,
            style: buttonStyle,
            size: "lg",
            variant: "secondary"
          }, isLoadingSettings ? "Loading settings" : isSettingsLoaded ? "Settings loaded" : "Load settings"), /*#__PURE__*/_react.default.createElement(_Button.default, {
            ref: this.simulateClickLoadDimensions,
            disabled: isLoadingDimensions || isDimensionsLoaded,
            onClick: !isLoadingDimensions && !isDimensionsLoaded ? this.onClickLoadDimensions : null,
            style: buttonStyle,
            size: "lg",
            variant: "secondary"
          }, isLoadingDimensions ? "Loading dimensions" : isDimensionsLoaded ? "Dimensions loaded" : "Load dimensions"), /*#__PURE__*/_react.default.createElement(_Button.default, {
            ref: this.simulateClickLoadSchema,
            disabled: isLoadingSchema || isSchemaLoaded,
            onClick: !isLoadingSchema && !isSchemaLoaded ? this.onClickLoadSchema : null,
            style: buttonStyle,
            size: "lg",
            variant: "secondary"
          }, isLoadingSchema ? "Loading schema" : isSchemaLoaded ? "Schema loaded" : "Load schema"), /*#__PURE__*/_react.default.createElement(_Button.default, {
            ref: this.simulateClickLoadTierList,
            disabled: isLoadingTierList || isTierListLoaded,
            onClick: !isLoadingTierList && !isTierListLoaded ? this.onClickLoadTierList : null,
            style: buttonStyle,
            size: "lg",
            variant: "secondary"
          }, isLoadingTierList ? "Loading Tier list" : isTierListLoaded ? "Tier list loaded" : "Load Tier List")), /*#__PURE__*/_react.default.createElement("div", {
            style: windowLogoContainer
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleImageContainer
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: logoPath,
            alt: this.props.logoImg,
            style: styleImage
          }))));
        } else if (!isHandledMicPreset) {
          return /*#__PURE__*/_react.default.createElement("div", {
            style: windowExternalContainer
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              textAlign: "center",
              fontWeight: "bold"
            }
          }, "Loading..."), /*#__PURE__*/_react.default.createElement("div", {
            style: windowButtonsContainer
          }, /*#__PURE__*/_react.default.createElement(_Button.default, {
            ref: this.simulateClickHandleMicPreset,
            disabled: isHandlingMicPreset || isHandledMicPreset,
            onClick: !isHandlingMicPreset && !isHandledMicPreset ? this.onClickHandleMicPreset : null,
            style: buttonStyle,
            size: "lg",
            variant: "secondary"
          }, isHandlingMicPreset ? "Loading microscope" : isHandledMicPreset ? "Microscope loaded" : "Load Microscope")), /*#__PURE__*/_react.default.createElement("div", {
            style: windowLogoContainer
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleImageContainer
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: logoPath,
            alt: this.props.logoImg,
            style: styleImage
          }))));
        }
      } else {
        var windowModeSelectorContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "row",
          width: "100%",
          height: "50%",
          alignItems: "center"
        };
        var buttonModeSelectorStyle = {
          width: "400px",
          height: "500px",
          margin: "50px"
        };
        var buttonsInnerContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center"
        };
        var styleIconImage = {
          width: "100%",
          height: "50%",
          margin: "30px"
        };
        var styleText = {
          textAlign: "left",
          fontSize: "0.8em",
          marginLeft: "15px",
          marginRight: "15px"
        };
        var selectionEnabled = true;

        if (!isSchemaLoaded || !isDimensionsLoaded || !isMicroscopesLoaded || !isSettingsLoaded) {
          selectionEnabled = false;
        }

        var hardwareImgPath = this.props.hardwareImg + (this.props.hardwareImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
        var settingsImgPath = this.props.settingsImg + (this.props.settingsImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
        return /*#__PURE__*/_react.default.createElement("div", {
          style: windowExternalContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: windowModeSelectorContainer
        }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          position: _constants.manage_instrument_tooltip.position,
          title: _constants.manage_instrument_tooltip.title,
          content: _constants.manage_instrument_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            disabled: !selectionEnabled,
            onClick: this.props.onClickCreateNewMicroscope,
            style: buttonModeSelectorStyle,
            size: "lg",
            variant: "secondary"
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: buttonsInnerContainer
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: hardwareImgPath,
            alt: this.props.hardwareImg,
            style: styleIconImage
          }), /*#__PURE__*/_react.default.createElement("h2", null, "Manage Instrument"), /*#__PURE__*/_react.default.createElement("p", {
            style: styleText
          }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")))
        }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          position: _constants.manage_settings_tooltip.position,
          title: _constants.manage_settings_tooltip.title,
          content: _constants.manage_settings_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            disabled: !selectionEnabled || !this.props.hasSettings,
            onClick: this.props.onClickLoadMicroscope,
            style: buttonModeSelectorStyle,
            size: "lg",
            variant: "secondary"
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: buttonsInnerContainer
          }, /*#__PURE__*/_react.default.createElement("img", {
            src: settingsImgPath,
            alt: this.props.settingsImg,
            style: styleIconImage
          }), /*#__PURE__*/_react.default.createElement("h2", null, "Manage Settings"), /*#__PURE__*/_react.default.createElement("p", {
            style: styleText
          }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")))
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: windowButtonsContainer
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadMicroscopes,
          disabled: isLoadingMicroscopes || isMicroscopesLoaded,
          onClick: !isLoadingMicroscopes && !isMicroscopesLoaded ? this.onClickLoadMicroscopes : null,
          style: buttonStyle,
          size: "lg",
          variant: "secondary"
        }, isLoadingMicroscopes ? "Loading microscopes" : isMicroscopesLoaded ? "Microscopes loaded" : "Load microscopes"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadSettings,
          disabled: isLoadingSettings || isSettingsLoaded,
          onClick: !isLoadingSettings && !isSettingsLoaded ? this.onClickLoadSettings : null,
          style: buttonStyle,
          size: "lg",
          variant: "secondary"
        }, isLoadingSettings ? "Loading settings" : isSettingsLoaded ? "Settings loaded" : "Load settings"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadDimensions,
          disabled: isLoadingDimensions || isDimensionsLoaded,
          onClick: !isLoadingDimensions && !isDimensionsLoaded ? this.onClickLoadDimensions : null,
          style: buttonStyle,
          size: "lg",
          variant: "secondary"
        }, isLoadingDimensions ? "Loading dimensions" : isDimensionsLoaded ? "Dimensions loaded" : "Load dimensions"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadSchema,
          disabled: isLoadingSchema || isSchemaLoaded,
          onClick: !isLoadingSchema && !isSchemaLoaded ? this.onClickLoadSchema : null,
          style: buttonStyle,
          size: "lg",
          variant: "secondary"
        }, isLoadingSchema ? "Loading schema" : isSchemaLoaded ? "Schema loaded" : "Load schema"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadTierList,
          disabled: isLoadingTierList || isTierListLoaded,
          onClick: !isLoadingTierList && !isTierListLoaded ? this.onClickLoadTierList : null,
          style: buttonStyle,
          size: "lg",
          variant: "secondary"
        }, isLoadingTierList ? "Loading Tier list" : isTierListLoaded ? "Tier list loaded" : "Load Tier List")), /*#__PURE__*/_react.default.createElement("div", {
          style: windowLogoContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: styleImage
        }))));
      }
    }
  }]);

  return ModeSelectorDataLoader;
}(_react.default.PureComponent);

exports.default = ModeSelectorDataLoader;