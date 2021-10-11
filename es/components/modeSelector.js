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

var ModeSelector = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ModeSelector, _React$PureComponent);

  var _super = _createSuper(ModeSelector);

  function ModeSelector(props) {
    var _this;

    _classCallCheck(this, ModeSelector);

    _this = _super.call(this, props);
    _this.state = {// isLoadingSchema: false,
      // isLoadingMicroscopes: false,
      // isLoadingDimensions: false,
      // isLoadingSettings: false,
      // isLoadingTierList: false,
      // isSchemaLoaded: false,
      // isMicroscopesLoaded: false,
      // isDimensionsLoaded: false,
      // isSettingsLoaded: false,
      // isTierListLoaded: false,
      // isHandlingMicPreset: false,
      // isHandledMicPreset: false,
    }; // this.simulateClickLoadSchema = this.simulateClickLoadSchema.bind(this);
    // this.onClickLoadSchema = this.onClickLoadSchema.bind(this);
    // this.simulateClickLoadMicroscopes =
    // 	this.simulateClickLoadMicroscopes.bind(this);
    // this.onClickLoadMicroscopes = this.onClickLoadMicroscopes.bind(this);
    // this.simulateClickLoadSettings = this.simulateClickLoadSettings.bind(this);
    // this.onClickLoadSettings = this.onClickLoadSettings.bind(this);
    // this.simulateClickLoadDimensions =
    // 	this.simulateClickLoadDimensions.bind(this);
    // this.onClickLoadDimensions = this.onClickLoadDimensions.bind(this);
    // this.simulateClickHandleMicPreset =
    // 	this.simulateClickHandleMicPreset.bind(this);
    // this.onClickHandleMicPreset = this.onClickHandleMicPreset.bind(this);
    // this.simulateClickLoadTierList = this.simulateClickLoadTierList.bind(this);
    // this.onClickLoadTierList = this.onClickLoadTierList.bind(this);

    return _this;
  } // onClickLoadDimensions() {
  // 	this.setState({ isLoadingDimensions: true }, () => {
  // 		this.props.onClickLoadDimensions().then(() => {
  // 				this.setState({
  // 					isLoadingDimensions: false,
  // 					isDimensionsLoaded: true,
  // 				});
  // 		});
  // 	});
  // }
  // onClickLoadSchema() {
  // 	this.setState({ isLoadingSchema: true }, () => {
  // 		this.props.onClickLoadSchema().then(() => {
  // 				this.setState({ isLoadingSchema: false, isSchemaLoaded: true });
  // 		});
  // 	});
  // }
  // onClickLoadMicroscopes() {
  // 	this.setState({ isLoadingMicroscopes: true }, () => {
  // 		this.props.onClickLoadMicroscopes().then(() => {
  // 				this.setState({
  // 					isLoadingMicroscopes: false,
  // 					isMicroscopesLoaded: true,
  // 				});
  // 		});
  // 	});
  // }
  // onClickLoadSettings() {
  // 	this.setState({ isLoadingSettings: true }, () => {
  // 		this.props.onClickLoadSettings().then(() => {
  // 				this.setState({
  // 					isLoadingSettings: false,
  // 					isSettingsLoaded: true,
  // 				});
  // 		});
  // 	});
  // }
  // onClickLoadTierList() {
  // 	this.setState({ isLoadingTierList: true }, () => {
  // 		this.props.onClickLoadTierList().then(() => {
  // 				this.setState({
  // 					isLoadingTierList: false,
  // 					isTierListLoaded: true,
  // 				});
  // 		});
  // 	});
  // }
  // onClickHandleMicPreset() {
  // 	this.setState({ isHandlingMicPreset: true }, () => {
  // 		this.props.onClickHandleMicPreset().then(() => {
  // 				this.setState({
  // 					isHandlingMicPreset: false,
  // 					isHandledMicPreset: true,
  // 				});
  // 		});
  // 	});
  // }
  // simulateClickLoadDimensions(loadDimensionsButtonRef) {
  // 	if (loadDimensionsButtonRef === null) return;
  // 	loadDimensionsButtonRef.click();
  // }
  // simulateClickLoadSchema(loadSchemaButtonRef) {
  // 	if (loadSchemaButtonRef === null) return;
  // 	loadSchemaButtonRef.click();
  // }
  // simulateClickLoadMicroscopes(loadMicroscopesButtonRef) {
  // 	if (loadMicroscopesButtonRef === null) return;
  // 	loadMicroscopesButtonRef.click();
  // }
  // simulateClickLoadSettings(loadSettingsButtonRef) {
  // 	if (loadSettingsButtonRef === null) return;
  // 	loadSettingsButtonRef.click();
  // }
  // simulateClickLoadTierList(loadTierListButtonRef) {
  // 	if (loadTierListButtonRef === null) return;
  // 	loadTierListButtonRef.click();
  // }
  // simulateClickHandleMicPreset(handleMicPresetButtonRef) {
  // 	if (handleMicPresetButtonRef === null) return;
  // 	handleMicPresetButtonRef.click();
  // }


  _createClass(ModeSelector, [{
    key: "render",
    value: function render() {
      var windowExternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      }; // const windowButtonsContainer = {
      // 	display: "flex",
      // 	justifyContent: "center",
      // 	flexFlow: "row",
      // 	flexWrap: "wrap",
      // 	width: "50%",
      // 	height: "15%",
      // 	alignItems: "center",
      // };

      var windowLogoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        height: "".concat(_constants.number_logo_height, "px"),
        alignItems: "center"
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      }; // const buttonStyle = {
      // 	width: "250px",
      // 	height: "50px",
      // 	marginTop: "10px",
      // 	marginBottom: "10px",
      // 	marginLeft: "25px",
      // 	marginRight: "25px",
      // };

      var styleImageContainer = {
        width: "".concat(_constants.number_logo_width, "px"),
        height: "".concat(_constants.number_logo_height, "px")
      }; // let isLoadingSchema = this.state.isLoadingSchema;
      // let isLoadingMicroscopes = this.state.isLoadingMicroscopes;
      // let isLoadingSettings = this.state.isLoadingSettings;
      // let isLoadingDimensions = this.state.isLoadingDimensions;
      // let isLoadingTierList = this.state.isLoadingTierList;
      // let isSchemaLoaded = this.state.isSchemaLoaded;
      // let isMicroscopesLoaded = this.state.isMicroscopesLoaded;
      // let isSettingsLoaded = this.state.isSettingsLoaded;
      // let isDimensionsLoaded = this.state.isDimensionsLoaded;
      // let isTierListLoaded = this.state.isTierListLoaded;
      // let isHandlingMicPreset = this.state.isHandlingMicPreset;
      // let isHandledMicPreset = this.state.isHandledMicPreset;

      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""); // if (this.props.is4DNPortal) {
      // 	if (
      // 		!isSchemaLoaded ||
      // 		!isDimensionsLoaded ||
      // 		!isMicroscopesLoaded ||
      // 		!isSettingsLoaded
      // 	) {
      // 		return (
      // 			<div style={windowExternalContainer}>
      // 				<div style={{ textAlign: "center", fontWeight: "bold" }}>
      // 					Loading...
      // 				</div>
      // 				<div style={windowButtonsContainer}>
      // 					<Button
      // 						ref={this.simulateClickLoadMicroscopes}
      // 						disabled={isLoadingMicroscopes || isMicroscopesLoaded}
      // 						onClick={
      // 							!isLoadingMicroscopes && !isMicroscopesLoaded
      // 								? this.onClickLoadMicroscopes
      // 								: null
      // 						}
      // 						style={buttonStyle}
      // 						size="lg"
      // 						variant="secondary"
      // 					>
      // 						{isLoadingMicroscopes
      // 							? "Loading microscopes"
      // 							: isMicroscopesLoaded
      // 							? "Microscopes loaded"
      // 							: "Load microscopes"}
      // 					</Button>
      // 					<Button
      // 						ref={this.simulateClickLoadSettings}
      // 						disabled={isLoadingSettings || isSettingsLoaded}
      // 						onClick={
      // 							!isLoadingSettings && !isSettingsLoaded
      // 								? this.onClickLoadSettings
      // 								: null
      // 						}
      // 						style={buttonStyle}
      // 						size="lg"
      // 						variant="secondary"
      // 					>
      // 						{isLoadingSettings
      // 							? "Loading settings"
      // 							: isSettingsLoaded
      // 							? "Settings loaded"
      // 							: "Load settings"}
      // 					</Button>
      // 					<Button
      // 						ref={this.simulateClickLoadDimensions}
      // 						disabled={isLoadingDimensions || isDimensionsLoaded}
      // 						onClick={
      // 							!isLoadingDimensions && !isDimensionsLoaded
      // 								? this.onClickLoadDimensions
      // 								: null
      // 						}
      // 						style={buttonStyle}
      // 						size="lg"
      // 						variant="secondary"
      // 					>
      // 						{isLoadingDimensions
      // 							? "Loading dimensions"
      // 							: isDimensionsLoaded
      // 							? "Dimensions loaded"
      // 							: "Load dimensions"}
      // 					</Button>
      // 					<Button
      // 						ref={this.simulateClickLoadSchema}
      // 						disabled={isLoadingSchema || isSchemaLoaded}
      // 						onClick={
      // 							!isLoadingSchema && !isSchemaLoaded
      // 								? this.onClickLoadSchema
      // 								: null
      // 						}
      // 						style={buttonStyle}
      // 						size="lg"
      // 						variant="secondary"
      // 					>
      // 						{isLoadingSchema
      // 							? "Loading schema"
      // 							: isSchemaLoaded
      // 							? "Schema loaded"
      // 							: "Load schema"}
      // 					</Button>
      // 					<Button
      // 						ref={this.simulateClickLoadTierList}
      // 						disabled={isLoadingTierList || isTierListLoaded}
      // 						onClick={
      // 							!isLoadingTierList && !isTierListLoaded
      // 								? this.onClickLoadTierList
      // 								: null
      // 						}
      // 						style={buttonStyle}
      // 						size="lg"
      // 						variant="secondary"
      // 					>
      // 						{isLoadingTierList
      // 							? "Loading Tier list"
      // 							: isTierListLoaded
      // 							? "Tier list loaded"
      // 							: "Load Tier List"}
      // 					</Button>
      // 				</div>
      // 				<div style={windowLogoContainer}>
      // 					<div style={styleImageContainer}>
      // 						<img
      // 							src={logoPath}
      // 							alt={this.props.logoImg}
      // 							style={styleImage}
      // 						/>
      // 					</div>
      // 				</div>
      // 			</div>
      // 		);
      // 	} else if (!isHandledMicPreset) {
      // 		return (
      // 			<div style={windowExternalContainer}>
      // 				<div style={{ textAlign: "center", fontWeight: "bold" }}>
      // 					Loading...
      // 				</div>
      // 				<div style={windowButtonsContainer}>
      // 					<Button
      // 						ref={this.simulateClickHandleMicPreset}
      // 						disabled={isHandlingMicPreset || isHandledMicPreset}
      // 						onClick={
      // 							!isHandlingMicPreset && !isHandledMicPreset
      // 								? this.onClickHandleMicPreset
      // 								: null
      // 						}
      // 						style={buttonStyle}
      // 						size="lg"
      // 						variant="secondary"
      // 					>
      // 						{isHandlingMicPreset
      // 							? "Loading microscope"
      // 							: isHandledMicPreset
      // 							? "Microscope loaded"
      // 							: "Load Microscope"}
      // 					</Button>
      // 				</div>
      // 				<div style={windowLogoContainer}>
      // 					<div style={styleImageContainer}>
      // 						<img
      // 							src={logoPath}
      // 							alt={this.props.logoImg}
      // 							style={styleImage}
      // 						/>
      // 					</div>
      // 				</div>
      // 			</div>
      // 		);
      // 	}
      // } else {

      var windowModeSelectorContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "100%",
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
      var styleText_1 = {
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
      };
      var selectionEnabled = true; // if (
      // 	!isSchemaLoaded ||
      // 	!isDimensionsLoaded ||
      // 	!isMicroscopesLoaded ||
      // 	!isSettingsLoaded
      // ) {
      // 	selectionEnabled = false;
      // }

      var hardwareImgPath = this.props.hardwareImg + (this.props.hardwareImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var settingsImgPath = this.props.settingsImg + (this.props.settingsImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      return /*#__PURE__*/_react.default.createElement("div", {
        style: windowExternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: windowLogoContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      }))), /*#__PURE__*/_react.default.createElement("div", {
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
          variant: "light"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: hardwareImgPath,
          alt: this.props.hardwareImg,
          style: styleIconImage
        }), /*#__PURE__*/_react.default.createElement("h2", {
          style: styleText_1
        }, "Manage Instrument"), /*#__PURE__*/_react.default.createElement("p", {
          style: styleText_2
        }, "Collect information about the hardware components of your microscope.")))
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.manage_settings_tooltip.position,
        title: _constants.manage_settings_tooltip.title,
        content: _constants.manage_settings_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          disabled: !selectionEnabled || !this.props.hasSettings,
          onClick: this.props.onClickLoadMicroscope,
          style: buttonModeSelectorStyle,
          size: "lg",
          variant: "light"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerContainer
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: settingsImgPath,
          alt: this.props.settingsImg,
          style: styleIconImage
        }), /*#__PURE__*/_react.default.createElement("h2", {
          style: styleText_1
        }, "Manage Settings"), /*#__PURE__*/_react.default.createElement("p", {
          style: styleText_2
        }, "Collect information about the acquisition settings that were used to produce your image.")))
      }))); //}
    }
  }]);

  return ModeSelector;
}(_react.default.PureComponent);

exports.default = ModeSelector;