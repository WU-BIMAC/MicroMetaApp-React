"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

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
      isSchemaLoaded: false,
      isMicroscopesLoaded: false,
      isDimensionsLoaded: false,
      isSettingsLoaded: false
    };
    _this.simulateClickLoadSchema = _this.simulateClickLoadSchema.bind(_assertThisInitialized(_this));
    _this.onClickLoadSchema = _this.onClickLoadSchema.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadMicroscopes = _this.simulateClickLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.onClickLoadMicroscopes = _this.onClickLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.onClickLoadSettings = _this.onClickLoadSettings.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadDimensions = _this.simulateClickLoadDimensions.bind(_assertThisInitialized(_this));
    _this.onClickLoadDimensions = _this.onClickLoadDimensions.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DataLoader, [{
    key: "onClickLoadDimensions",
    value: function onClickLoadDimensions() {
      var _this2 = this;

      this.setState({
        isLoadingDimensions: true
      }, function () {
        _this2.props.onClickLoadDimensions().then(function () {
          _this2.setState({
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
          _this3.setState({
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
          _this4.setState({
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
          _this5.setState({
            isLoadingSettings: false,
            isSettingsLoaded: true
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
    key: "render",
    value: function render() {
      var buttonStyle = {
        width: "200px",
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
      var windowInternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
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
      var isSchemaLoaded = this.state.isSchemaLoaded;
      var isMicroscopesLoaded = this.state.isMicroscopesLoaded;
      var isSettingsLoaded = this.state.isSettingsLoaded;
      var isLoadingDimensions = this.state.isLoadingDimensions;
      var isDimensionsLoaded = this.state.isDimensionsLoaded;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: windowExternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: windowInternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: this.props.logoImg,
        alt: this.props.logoImg,
        style: styleImage,
        onLoad: this.onImgLoad
      })), /*#__PURE__*/_react.default.createElement(_Button.default, {
        ref: this.simulateClickLoadSchema,
        disabled: isLoadingSchema || isSchemaLoaded,
        onClick: !isLoadingSchema && !isSchemaLoaded ? this.onClickLoadSchema : null,
        style: buttonStyle,
        size: "lg"
      }, isLoadingSchema ? "Loading schema" : isSchemaLoaded ? "Schema loaded" : "Load schema"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        ref: this.simulateClickLoadDimensions,
        disabled: isLoadingDimensions || isDimensionsLoaded,
        onClick: !isLoadingDimensions && !isDimensionsLoaded ? this.onClickLoadDimensions : null,
        style: buttonStyle,
        size: "lg"
      }, isLoadingDimensions ? "Loading dimensions" : isDimensionsLoaded ? "Dimensions loaded" : "Load dimensions"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        ref: this.simulateClickLoadMicroscopes,
        disabled: isLoadingMicroscopes || isMicroscopesLoaded,
        onClick: !isLoadingMicroscopes && !isMicroscopesLoaded ? this.onClickLoadMicroscopes : null,
        style: buttonStyle,
        size: "lg"
      }, isLoadingMicroscopes ? "Loading microscopes" : isMicroscopesLoaded ? "Microscopes loaded" : "Load microscopes"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        ref: this.simulateClickLoadSettings,
        disabled: isLoadingSettings || isSettingsLoaded,
        onClick: !isLoadingSettings && !isSettingsLoaded ? this.onClickLoadSettings : null,
        style: buttonStyle,
        size: "lg"
      }, isLoadingSettings ? "Loading settings" : isSettingsLoaded ? "Settings loaded" : "Load settings")));
    }
  }]);

  return DataLoader;
}(_react.default.PureComponent);

exports.default = DataLoader;