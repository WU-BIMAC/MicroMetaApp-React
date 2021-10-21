"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _ProgressBar = _interopRequireDefault(require("react-bootstrap/ProgressBar"));

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

var DataLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(DataLoader, _React$PureComponent);

  var _super = _createSuper(DataLoader);

  function DataLoader(props) {
    var _this;

    _classCallCheck(this, DataLoader);

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
      isHandledMicPreset: false,
      progressValueSchema: 0,
      progressValueMicroscopes: 0,
      progressValueSettings: 0,
      progressValueDimensions: 0,
      progressValueTierList: 0,
      progressValueMicPreset: 0
    };
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

  _createClass(DataLoader, [{
    key: "onClickLoadDimensions",
    value: function onClickLoadDimensions() {
      var _this2 = this;

      var interval = setInterval(function () {
        var oldValue = _this2.state.progressValueDimensions;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);

        _this2.setState({
          progressValueDimensions: newValue
        });
      }, 100);
      this.setState({
        isLoadingDimensions: true
      }, function () {
        _this2.props.onClickLoadDimensions().then(function () {
          _this2.setState({
            isLoadingDimensions: false,
            isDimensionsLoaded: true,
            progressValueDimensions: 100
          });

          clearInterval(interval);
          if (_this2.state.isDimensionsLoaded && _this2.state.isMicroscopesLoaded && _this2.state.isSettingsLoaded && _this2.state.isTierListLoaded && _this2.state.isSchemaLoaded) _this2.props.onDataLoaded();
        });
      });
    }
  }, {
    key: "onClickLoadSchema",
    value: function onClickLoadSchema() {
      var _this3 = this;

      var interval = setInterval(function () {
        var oldValue = _this3.state.progressValueSchema;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);

        _this3.setState({
          progressValueSchema: newValue
        });
      }, 100);
      this.setState({
        isLoadingSchema: true
      }, function () {
        _this3.props.onClickLoadSchema().then(function () {
          _this3.setState({
            isLoadingSchema: false,
            isSchemaLoaded: true,
            progressValueSchema: 100
          });

          clearInterval(interval);
          if (_this3.state.isDimensionsLoaded && _this3.state.isMicroscopesLoaded && _this3.state.isSettingsLoaded && _this3.state.isTierListLoaded && _this3.state.isSchemaLoaded) _this3.props.onDataLoaded();
        });
      });
    }
  }, {
    key: "onClickLoadMicroscopes",
    value: function onClickLoadMicroscopes() {
      var _this4 = this;

      var interval = setInterval(function () {
        var oldValue = _this4.state.progressValueMicroscopes;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);

        _this4.setState({
          progressValueMicroscopes: newValue
        });
      }, 100);
      this.setState({
        isLoadingMicroscopes: true
      }, function () {
        _this4.props.onClickLoadMicroscopes().then(function () {
          _this4.setState({
            isLoadingMicroscopes: false,
            isMicroscopesLoaded: true,
            progressValueMicroscopes: 100
          });

          clearInterval(interval);
          if (_this4.state.isDimensionsLoaded && _this4.state.isMicroscopesLoaded && _this4.state.isSettingsLoaded && _this4.state.isTierListLoaded && _this4.state.isSchemaLoaded) _this4.props.onDataLoaded();
        });
      });
    }
  }, {
    key: "onClickLoadSettings",
    value: function onClickLoadSettings() {
      var _this5 = this;

      var interval = setInterval(function () {
        var oldValue = _this5.state.progressValueSettings;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);

        _this5.setState({
          progressValueSettings: newValue
        });
      }, 100);
      this.setState({
        isLoadingSettings: true
      }, function () {
        _this5.props.onClickLoadSettings().then(function () {
          _this5.setState({
            isLoadingSettings: false,
            isSettingsLoaded: true,
            progressValueSettings: 100
          });

          clearInterval(interval);
          if (_this5.state.isDimensionsLoaded && _this5.state.isMicroscopesLoaded && _this5.state.isSettingsLoaded && _this5.state.isTierListLoaded && _this5.state.isSchemaLoaded) _this5.props.onDataLoaded();
        });
      });
    }
  }, {
    key: "onClickLoadTierList",
    value: function onClickLoadTierList() {
      var _this6 = this;

      var interval = setInterval(function () {
        var oldValue = _this6.state.progressValueTierList;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);

        _this6.setState({
          progressValueTierList: newValue
        });
      }, 100);
      this.setState({
        isLoadingTierList: true
      }, function () {
        _this6.props.onClickLoadTierList().then(function () {
          _this6.setState({
            isLoadingTierList: false,
            isTierListLoaded: true,
            progressValueTierList: 100
          });

          clearInterval(interval);
          if (_this6.state.isDimensionsLoaded && _this6.state.isMicroscopesLoaded && _this6.state.isSettingsLoaded && _this6.state.isTierListLoaded && _this6.state.isSchemaLoaded) _this6.props.onDataLoaded();
        });
      });
    }
  }, {
    key: "onClickHandleMicPreset",
    value: function onClickHandleMicPreset() {
      var _this7 = this;

      var interval = setInterval(function () {
        var oldValue = _this7.state.progressValueMicPreset;
        var newValue = oldValue + 10;
        if (newValue === 100) clearInterval(interval);

        _this7.setState({
          progressValueMicPreset: newValue
        });
      }, 100);
      this.setState({
        isHandlingMicPreset: true
      }, function () {
        _this7.props.onClickHandleMicPreset().then(function () {
          _this7.setState({
            isHandlingMicPreset: false,
            isHandledMicPreset: true,
            progressValueMicPreset: 100
          });

          clearInterval(interval);
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
      var buttonStyle = {
        display: "none",
        width: "200px",
        height: "50px",
        padding: "5px",
        margin: "5px"
      };
      var progressStyle = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "50px",
        padding: "5px",
        margin: "5px"
      };
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
        width: "".concat(_constants.number_logo_width, "px"),
        height: "100%",
        alignItems: "center"
      };
      var windowLogoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        height: "".concat(_constants.number_logo_height, "px"),
        alignItems: "center",
        marginTop: "100px"
      };
      var styleImageContainer = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "".concat(_constants.number_logo_height, "px")
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
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
      var logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_micro_bk);
      var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var microscopesLabel = isLoadingMicroscopes ? "Loading microscopes: " + this.state.progressValueMicroscopes + "%" : isMicroscopesLoaded ? "Microscopes loaded" : "Load microscopes";
      var settingsLabel = isLoadingSettings ? "Loading settings: " + this.state.progressValueSettings + "%" : isSettingsLoaded ? "Settings loaded" : "Load settings";
      var dimensionsLabel = isLoadingDimensions ? "Loading dimensions: " + this.state.progressValueDimensions + "%" : isDimensionsLoaded ? "Dimensions loaded" : "Load dimensions";
      var tierListLabel = isLoadingTierList ? "Loading Tier list: " + this.state.progressValueTierList + "%" : isTierListLoaded ? "Tier list loaded" : "Load Tier List";
      var schemaLabel = isLoadingSchema ? "Loading schema: " + this.state.progressValueSchema + "%" : isSchemaLoaded ? "Schema loaded" : "Load schema";
      var presetLabel = isHandlingMicPreset ? "Loading microscope: " + this.state.progressValueMicPreset + "%" : isHandledMicPreset ? "Microscope loaded" : "Load Microscope";

      if (!isSchemaLoaded || !isDimensionsLoaded || !isMicroscopesLoaded || !isSettingsLoaded) {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: windowExternalContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: windowLogoContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: styleImage,
          onLoad: this.onImgLoad
        }))), /*#__PURE__*/_react.default.createElement("div", {
          style: windowButtonsContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          style: {
            textAlign: "center"
          }
        }, "Loading data"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadMicroscopes,
          disabled: isLoadingMicroscopes || isMicroscopesLoaded,
          onClick: !isLoadingMicroscopes && !isMicroscopesLoaded ? this.onClickLoadMicroscopes : null,
          style: buttonStyle,
          size: "lg"
        }, microscopesLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: microscopesLabel,
          now: this.state.progressValueMicroscopes,
          striped: true,
          animated: true
        }), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadSettings,
          disabled: isLoadingSettings || isSettingsLoaded,
          onClick: !isLoadingSettings && !isSettingsLoaded ? this.onClickLoadSettings : null,
          style: buttonStyle,
          size: "lg"
        }, settingsLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: settingsLabel,
          now: this.state.progressValueSettings,
          striped: true,
          animated: true
        }), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadDimensions,
          disabled: isLoadingDimensions || isDimensionsLoaded,
          onClick: !isLoadingDimensions && !isDimensionsLoaded ? this.onClickLoadDimensions : null,
          style: buttonStyle,
          size: "lg"
        }, dimensionsLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: dimensionsLabel,
          now: this.state.progressValueDimensions,
          striped: true,
          animated: true
        }), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadTierList,
          disabled: isLoadingTierList || isTierListLoaded,
          onClick: !isLoadingTierList && !isTierListLoaded ? this.onClickLoadTierList : null,
          style: buttonStyle,
          size: "lg",
          variant: "secondary"
        }, tierListLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: tierListLabel,
          now: this.state.progressValueTierList,
          striped: true,
          animated: true
        }), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickLoadSchema,
          disabled: isLoadingSchema || isSchemaLoaded,
          onClick: !isLoadingSchema && !isSchemaLoaded ? this.onClickLoadSchema : null,
          style: buttonStyle,
          size: "lg"
        }, schemaLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: schemaLabel,
          now: this.state.progressValueSchema,
          striped: true,
          animated: true
        })));
      } else if (this.props.is4DNPortal && !isHandledMicPreset) {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: windowExternalContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: windowLogoContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: styleImage,
          onLoad: this.onImgLoad
        }))), /*#__PURE__*/_react.default.createElement("div", {
          style: windowButtonsContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          style: {
            textAlign: "center"
          }
        }, "Loading preset"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          ref: this.simulateClickHandleMicPreset,
          disabled: isHandlingMicPreset || isHandledMicPreset,
          onClick: !isHandlingMicPreset && !isHandledMicPreset ? this.onClickHandleMicPreset : null,
          style: buttonStyle,
          size: "lg"
        }, presetLabel), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
          style: progressStyle,
          label: presetLabel,
          now: this.state.progressValueMicPreset,
          striped: true,
          animated: true
        })));
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: windowExternalContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: windowLogoContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleImageContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: logoPath,
          alt: this.props.logoImg,
          style: styleImage,
          onLoad: this.onImgLoad
        }))));
      }
    }
  }]);

  return DataLoader;
}(_react.default.PureComponent);

exports.default = DataLoader;