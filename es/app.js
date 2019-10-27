"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _header = _interopRequireDefault(require("./components/header"));

var _footer = _interopRequireDefault(require("./components/footer"));

var _toolbar = _interopRequireDefault(require("./components/toolbar"));

var _canvas = _interopRequireDefault(require("./components/canvas"));

var _settingsMainView = _interopRequireDefault(require("./components/settingsMainView"));

var _dataLoader = _interopRequireDefault(require("./components/dataLoader"));

var _microscopePreLoader = _interopRequireDefault(require("./components/microscopePreLoader"));

var _microscopeLoader = _interopRequireDefault(require("./components/microscopeLoader"));

var _html2canvas = _interopRequireDefault(require("html2canvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var path = require("path");

var validate = require("jsonschema").validate;

var uuidv4 = require("uuid/v4");

var createFromScratch = "Create from scratch";
var createFromFile = "Load from file";
var loadFromRepository = "Load from repository";

var MicroscopyMetadataTool =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MicroscopyMetadataTool, _React$PureComponent);

  function MicroscopyMetadataTool(props) {
    var _this;

    _classCallCheck(this, MicroscopyMetadataTool);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MicroscopyMetadataTool).call(this, props));
    _this.state = {
      microscope: props.microscope || null,
      setting: props.setting || null,
      schema: props.schema || null,
      microscopes: props.microscopes || null,
      settings: props.settings || null,
      adaptedMicroscopeSchema: null,
      adaptedComponentsSchema: null,
      adaptedImageSchema: null,
      adaptedSettingsSchema: null,
      adaptedChildrenSchema: null,
      adaptedExperimentalSchema: null,
      mounted: false,
      activeTier: 1,
      validationTier: 1,
      isCreatingNewMicroscope: null,
      loadingOption: null,
      micName: null,
      elementData: null,
      settingData: null,
      loadingMode: 0,
      isMicroscopeValidated: false,
      isSettingValidated: false,
      areComponentsValidated: false,
      areSettingComponentsValidated: false
    }; //this.isMicroscopeValidated = false;

    _this.toolbarRef = _react.default.createRef();
    _this.canvasRef = _react.default.createRef();
    _this.settingsMainViewRef = _react.default.createRef();
    /**
     * This ref does not have 'current' until App has been mounted.
     * Because App is a PureComponent which doesn't get updated unless
     * state or props change, we need to have at least one state or prop change
     * occur before `this.overlaysContainerRef.current` is passed down correctly
     * to child Components (and not be null or undefined). This is currently done via
     * schema being null initially and then updated via 'Load Schema' button, but since
     * this prop is optional, we implement the componentDidMount func below.
     */

    _this.overlaysContainerRef = _react.default.createRef();
    _this.handleLoadSchema = _this.handleLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadSchema = _this.handleCompleteLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleLoadMicroscopes = _this.handleLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.handleLoadSettings = _this.handleLoadSettings.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadMicroscopes = _this.handleCompleteLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadSettings = _this.handleCompleteLoadSettings.bind(_assertThisInitialized(_this));
    _this.updateElementData = _this.updateElementData.bind(_assertThisInitialized(_this));
    _this.updateSettingData = _this.updateSettingData.bind(_assertThisInitialized(_this));
    _this.onMicroscopeDataSave = _this.onMicroscopeDataSave.bind(_assertThisInitialized(_this));
    _this.onSettingDataSave = _this.onSettingDataSave.bind(_assertThisInitialized(_this));
    _this.handleActiveTierSelection = _this.handleActiveTierSelection.bind(_assertThisInitialized(_this));
    _this.setCreateNewMicroscope = _this.setCreateNewMicroscope.bind(_assertThisInitialized(_this));
    _this.setLoadMicroscope = _this.setLoadMicroscope.bind(_assertThisInitialized(_this));
    _this.uploadMicroscopeFromDropzone = _this.uploadMicroscopeFromDropzone.bind(_assertThisInitialized(_this));
    _this.handleLoadingOptionSelection = _this.handleLoadingOptionSelection.bind(_assertThisInitialized(_this));
    _this.selectMicroscopeFromRepository = _this.selectMicroscopeFromRepository.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscope = _this.createOrUseMicroscope.bind(_assertThisInitialized(_this));
    _this.createNewMicroscopeFromScratch = _this.createNewMicroscopeFromScratch.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscopeFromDroppedFile = _this.createOrUseMicroscopeFromDroppedFile.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscopeFromSelectedFile = _this.createOrUseMicroscopeFromSelectedFile.bind(_assertThisInitialized(_this));
    _this.setMicroscopeScale = _this.setMicroscopeScale.bind(_assertThisInitialized(_this));
    _this.onClickBack = _this.onClickBack.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchemas = _this.createAdaptedSchemas.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchema = _this.createAdaptedSchema.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscope = _this.handleExportMicroscope.bind(_assertThisInitialized(_this));
    _this.handleExportSetting = _this.handleExportSetting.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscopeImage = _this.handleExportMicroscopeImage.bind(_assertThisInitialized(_this));
    _this.handleSaveMicroscope = _this.handleSaveMicroscope.bind(_assertThisInitialized(_this));
    _this.handleSaveSetting = _this.handleSaveSetting.bind(_assertThisInitialized(_this));
    _this.handleCompleteSaveMicroscope = _this.handleCompleteSaveMicroscope.bind(_assertThisInitialized(_this));
    _this.handleCompleteSaveSetting = _this.handleCompleteSaveSetting.bind(_assertThisInitialized(_this)); //this.toDataUrl = this.toDataUrl.bind(this);

    return _this;
  }

  _createClass(MicroscopyMetadataTool, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        mounted: false
      });
    }
  }, {
    key: "handleLoadMicroscopes",
    value: function handleLoadMicroscopes(e) {
      var _this2 = this;

      return new Promise(function () {
        return setTimeout(_this2.props.onLoadMicroscopes(_this2.handleCompleteLoadMicroscopes), 10000);
      });
    }
  }, {
    key: "handleLoadSettings",
    value: function handleLoadSettings(e) {
      var _this3 = this;

      return new Promise(function () {
        return setTimeout(_this3.props.onLoadSettings(_this3.handleCompleteLoadSettings), 10000);
      });
    }
  }, {
    key: "handleCompleteLoadMicroscopes",
    value: function handleCompleteLoadMicroscopes(newMicroscopes) {
      this.setState({
        microscopes: newMicroscopes
      });
    }
  }, {
    key: "handleCompleteLoadSettings",
    value: function handleCompleteLoadSettings(newSettings) {
      this.setState({
        settings: newSettings
      });
    }
  }, {
    key: "handleLoadSchema",
    value: function handleLoadSchema(e) {
      var _this4 = this;

      return new Promise(function () {
        return setTimeout(_this4.props.onLoadSchema(_this4.handleCompleteLoadSchema), 10000);
      });
    }
  }, {
    key: "handleCompleteLoadSchema",
    value: function handleCompleteLoadSchema(newSchema) {
      this.setState({
        schema: newSchema
      });
    }
  }, {
    key: "handleActiveTierSelection",
    value: function handleActiveTierSelection(item) {
      var tier = Number(item);
      this.setState({
        activeTier: tier,
        validationTier: tier
      });
    }
  }, {
    key: "setCreateNewMicroscope",
    value: function setCreateNewMicroscope() {
      this.setState({
        isCreatingNewMicroscope: true,
        loadingOption: createFromScratch,
        loadingMode: 0
      }); //this.handleLoadingOptionSelection(createFromScratch);
    }
  }, {
    key: "setLoadMicroscope",
    value: function setLoadMicroscope() {
      this.setState({
        isCreatingNewMicroscope: false,
        loadingOption: createFromFile,
        loadingMode: 1
      }); //this.handleLoadingOptionSelection(createFromFile);
    }
  }, {
    key: "handleLoadingOptionSelection",
    value: function handleLoadingOptionSelection(item) {
      var loadingMode = 0;

      if (item === createFromFile) {
        loadingMode = 1;
      } else if (item === loadFromRepository) loadingMode = 2;

      this.setState({
        loadingOption: item,
        loadingMode: loadingMode
      });
    }
  }, {
    key: "selectMicroscopeFromRepository",
    value: function selectMicroscopeFromRepository(item) {
      console.log("selected : " + item);
      this.setState({
        micName: item
      });
    }
  }, {
    key: "uploadMicroscopeFromDropzone",
    value: function uploadMicroscopeFromDropzone(microscope) {
      this.setState({
        microscope: microscope
      });
    }
  }, {
    key: "setMicroscopeScale",
    value: function setMicroscopeScale(scale) {
      this.state.microscope.scale = scale;
    }
  }, {
    key: "createAdaptedSchema",
    value: function createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier) {
      var _this5 = this;

      var singleSchema = Object.assign({}, singleSchemaOriginal);
      singleSchema.properties = Object.assign({}, singleSchemaOriginal.properties);
      if (singleSchema.required !== undefined) if (singleSchemaOriginal.type === "array") {
        singleSchema.items.required = singleSchemaOriginal.items.required.slice(0);
      } else {
        singleSchema.required = singleSchemaOriginal.required.slice(0);
      }
      var fieldsToRemove = [];
      var fieldsToSetNotRequired = [];
      var required = singleSchema.required;
      var properties = singleSchema.properties;

      if (singleSchemaOriginal.type === "array") {
        required = singleSchema.items.required;
        properties = singleSchema.items.properties;
      }

      if (properties === null || properties === undefined) {
        console.log("schema without properties");
        console.log(singleSchema);
        return singleSchema;
      }

      Object.keys(properties).forEach(function (propKey) {
        var property = properties[propKey];

        if (property.type === "object" || property.type === "array" && property.items.properties !== null && property.items.properties !== undefined) {
          properties[propKey] = _this5.createAdaptedSchema(property, activeTier, validationTier);
        }

        if (property.tier > activeTier) {
          fieldsToRemove.push(propKey);
        }

        if (property.tier > validationTier && !fieldsToRemove.includes(propKey)) {
          fieldsToSetNotRequired.push(propKey);
        }
      });

      for (var y = 0; y < fieldsToRemove.length; y++) {
        var key = fieldsToRemove[y];
        var propertyToRemove = properties[key];
        if (propertyToRemove === undefined) continue;
        delete properties[key];
        if (required === undefined) continue;
        var requiredIndex = required.indexOf(key);
        if (requiredIndex !== -1) required.splice(requiredIndex, 1);
      }

      for (var _y = 0; _y < fieldsToSetNotRequired.length; _y++) {
        var _key = fieldsToSetNotRequired[_y];
        var _propertyToRemove = properties[_key];
        if (_propertyToRemove === undefined) continue;
        if (required === undefined) continue;

        var _requiredIndex = required.indexOf(_key);

        if (_requiredIndex !== -1) required.splice(_requiredIndex, 1);
      }

      return singleSchema;
    }
  }, {
    key: "createAdaptedSchemas",
    value: function createAdaptedSchemas(validationTier) {
      var _this6 = this;

      var activeTier = this.state.activeTier;
      var schema = this.state.schema;
      var componentsSchema = [];
      var settingsSchema = [];
      var childrenSchema = [];
      var experimentalSchema = [];
      var microscopeSchema = {};
      var imageSchema = {};
      var microscope = this.state.microscope;
      var setting = this.state.setting;
      var componentsCounter = 0;
      var settingsCounter = 0;
      var experimentalCounter = 0;
      var childrenCounter = 0;
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        var singleSchema = _this6.createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier);

        if (singleSchema.title === "Microscope") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchema);
        } else if (singleSchema.title === "Image") {
          imageSchema = Object.assign(imageSchema, singleSchema);
        } else if (singleSchema.category === "ChildElement") {
          childrenSchema[childrenCounter] = singleSchema;
          childrenCounter++;
        } else if (singleSchema.domain === "ImageAcquisitionSettings" || singleSchema.domain === "Experimental") {
          settingsSchema[settingsCounter] = singleSchema;
          settingsCounter++;
        } else if (singleSchema.domain === "MicrosocpeSpecifications") {
          componentsSchema[componentsCounter] = singleSchema;
          componentsCounter++;
        } else if (singleSchema.domain === "Experimental") {
          experimentalSchema[experimentalCounter] = singleSchema;
          experimentalCounter++;
        }
      });
      var validated = false;

      if (microscope !== null && microscope !== undefined) {
        microscope.ValidationTier = validationTier;
        var validation = validate(microscope, microscopeSchema);
        validated = validation.valid;
      }

      if (setting !== null && setting !== undefined) {
        setting.ValidationTier = validationTier;

        var _validation = validate(setting, imageSchema);

        validated = _validation.valid;
      }

      this.setState({
        adaptedMicroscopeSchema: microscopeSchema,
        adaptedComponentsSchema: componentsSchema,
        adaptedImageSchema: imageSchema,
        adaptedSettingsSchema: settingsSchema,
        adaptedExperimentalSchema: experimentalSchema,
        adaptedChildrenSchema: childrenSchema,
        validationTier: validationTier,
        isMicroscopeValidated: validated
      });
      return [microscopeSchema, componentsSchema, imageSchema, settingsSchema, childrenSchema];
    }
  }, {
    key: "createNewMicroscopeFromScratch",
    value: function createNewMicroscopeFromScratch() {
      var uuid = uuidv4();
      var activeTier = this.state.activeTier;
      var adaptedSchemas = this.createAdaptedSchemas(activeTier);
      var microscopeSchema = adaptedSchemas[0];
      var microscope = {
        //todo this means the microscope schema needs to be at 0 all the time
        //need to find better solution
        Name: "New ".concat(microscopeSchema.title),
        Schema_ID: microscopeSchema.ID,
        ID: uuid,
        Tier: activeTier,
        ValidationTier: activeTier,
        Version: microscopeSchema.version
      };
      this.setState({
        microscope: microscope,
        elementData: {}
      });
    }
  }, {
    key: "createOrUseMicroscopeFromDroppedFile",
    value: function createOrUseMicroscopeFromDroppedFile() {
      var uuid = uuidv4();
      var modifiedMic = this.state.microscope;
      var activeTier = this.state.activeTier;

      if (activeTier !== this.state.microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier);
      var microscopeSchema = adaptedSchemas[0];
      var componentsSchema = adaptedSchemas[1];
      var imageSchema = adaptedSchemas[2];
      var components = this.state.microscope.components;
      var newElementData = {};

      if (components !== undefined) {
        Object.keys(componentsSchema).forEach(function (schemaIndex) {
          var compSchema = componentsSchema[schemaIndex];
          var schema_ID = compSchema.ID;
          Object.keys(components).forEach(function (objIndex) {
            var obj = components[objIndex];
            if (schema_ID !== obj.Schema_ID) return;
            var id = compSchema.title + "_" + obj.ID;
            newElementData[id] = obj;
          });
        });
      }

      var validation = validate(modifiedMic, microscopeSchema);
      var validated = validation.valid;

      if (this.state.isCreatingNewMicroscope) {
        this.setState({
          microscope: modifiedMic,
          setting: null,
          elementData: newElementData,
          settingData: null,
          validationTier: modifiedMic.ValidationTier,
          isMicroscopeValidated: validated
        });
      } else {
        console.log("creating setting");
        var setting = {
          Name: "New ".concat(imageSchema.title),
          Schema_ID: imageSchema.ID,
          ID: uuid,
          Tier: activeTier,
          ValidationTier: activeTier,
          Version: imageSchema.version
        };
        this.setState({
          microscope: modifiedMic,
          setting: setting,
          elementData: newElementData,
          settingData: {},
          validationTier: modifiedMic.ValidationTier,
          isMicroscopeValidated: validated
        });
      }
    }
  }, {
    key: "createOrUseMicroscopeFromSelectedFile",
    value: function createOrUseMicroscopeFromSelectedFile() {
      var uuid = uuidv4();
      var microscope = this.state.microscopes[this.state.micName];
      var modifiedMic = microscope;
      var activeTier = this.state.activeTier;

      if (activeTier !== microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier);
      var microscopeSchema = adaptedSchemas[0];
      var componentsSchema = adaptedSchemas[1];
      var imageSchema = adaptedSchemas[2];
      var components = microscope.components;
      var newElementData = {};

      if (components !== undefined) {
        Object.keys(componentsSchema).forEach(function (schemaIndex) {
          var compSchema = componentsSchema[schemaIndex];
          var schema_ID = compSchema.ID;
          Object.keys(components).forEach(function (objIndex) {
            var obj = components[objIndex];
            if (schema_ID !== obj.Schema_ID) return;
            var id = compSchema.title + "_" + obj.ID;
            newElementData[id] = obj;
          });
        });
      }

      var validation = validate(modifiedMic, microscopeSchema);
      var validated = validation.valid;

      if (this.state.isCreatingNewMicroscope) {
        this.setState({
          microscope: modifiedMic,
          setting: null,
          elementData: newElementData,
          settingData: null,
          validationTier: modifiedMic.ValidationTier,
          isMicroscopeValidated: validated
        });
      } else {
        var setting = {
          //todo this means the microscope schema needs to be at 0 all the time
          //need to find better solution
          Name: "New ".concat(imageSchema.title),
          Schema_ID: imageSchema.ID,
          ID: uuid,
          Tier: activeTier,
          ValidationTier: activeTier,
          Version: imageSchema.version
        };
        this.setState({
          microscope: modifiedMic,
          setting: setting,
          elementData: newElementData,
          settingData: {},
          validationTier: modifiedMic.ValidationTier,
          isMicroscopeValidated: validated
        });
      }
    }
  }, {
    key: "createOrUseMicroscope",
    value: function createOrUseMicroscope() {
      if (this.state.loadingOption === createFromScratch) {
        this.createNewMicroscopeFromScratch();
      } else if (this.state.loadingOption === createFromFile) {
        this.createOrUseMicroscopeFromDroppedFile();
      } else {
        this.createOrUseMicroscopeFromSelectedFile();
      }
    }
  }, {
    key: "onClickBack",
    value: function onClickBack() {
      this.setState({
        activeTier: 1,
        validationTier: 1,
        microscope: null,
        setting: null,
        isCreatingNewMicroscope: null,
        loadingOption: null,
        micName: null,
        elementData: null,
        settingData: null,
        loadingMode: 0
      });
    }
  }, {
    key: "updateElementData",
    value: function updateElementData(elementData, areComponentsValidated) {
      console.log("updateElementData");
      console.log(elementData);
      this.setState({
        elementData: elementData,
        areComponentsValidated: areComponentsValidated
      });
    }
  }, {
    key: "updateSettingData",
    value: function updateSettingData(settingData, areSettingComponentsValidated) {
      this.setState({
        settingData: settingData,
        areSettingComponentsValidated: areSettingComponentsValidated
      });
    }
  }, {
    key: "handleExportMicroscope",
    value: function handleExportMicroscope(microscope) {
      var micName = microscope.Name;
      micName = micName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(micName, ".json");
      var contentType = "application/json;charset=utf-8;";
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(microscope));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, {
    key: "handleExportSetting",
    value: function handleExportSetting(setting) {
      var settingName = setting.Name;
      settingName = settingName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(settingName, ".json");
      var contentType = "application/json;charset=utf-8;";
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + contentType + "," + encodeURIComponent(JSON.stringify(setting));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, {
    key: "handleExportMicroscopeImage",
    value: function handleExportMicroscopeImage(microscope, img
    /*, dataUrl*/
    ) {
      //console.log("im here");
      var filename2 = "".concat(microscope.Name, ".png");
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.download = filename2; // a.href = img
      // 	.toDataURL("image/png")
      // 	.replace("image/png", "image/octet-stream");
      //let dataUrl = toDataUrl()
      //console.log(img);

      a.href = img.toDataURL(); //a.href = dataUrl;

      a.target = "_blank";
      a.click();
      document.body.removeChild(a);
    } // toDataUrl(src, callback, outputFormat, microscope, completeCallback) {
    // 	var img = new Image();
    // 	img.crossOrigin = "Anonymous";
    // 	img.onload = function() {
    // 		var canvas = document.createElement("CANVAS");
    // 		var ctx = canvas.getContext("2d");
    // 		var dataURL;
    // 		canvas.height = this.height;
    // 		canvas.width = this.width;
    // 		ctx.drawImage(this, 0, 0);
    // 		dataURL = canvas.toDataURL(outputFormat);
    // 		callback(microscope, dataURL, completeCallback);
    // 	};
    // 	img.src = src.toDataURL();
    // 	console.log("dataurl1:");
    // 	console.log(img.src);
    // 	if (img.complete || img.complete === undefined) {
    // 		img.src = "data:image/gif;base64,";
    // 		//R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="//
    // 		img.src += src.toDataURL();
    // 	}
    // 	console.log("dataurl2:");
    // 	console.log(img.src);
    // }

  }, {
    key: "handleSaveMicroscope",
    value: function handleSaveMicroscope(item) {
      var _this7 = this;

      var validated = true;

      if (!this.state.isMicroscopeValidated) {
        this.setState({
          isMicroscopeValidated: false
        });
        validated = false;
      }

      if (!this.state.areComponentsValidated) {
        this.setState({
          areComponentsValidated: false
        });
        validated = false;
      }

      if (!validated) {//TODO throw warning instead of stopping validation
        //return;
      }

      var elementData = this.state.elementData;
      var components = [];
      console.log("elementData");
      console.log(elementData);
      Object.keys(elementData).forEach(function (item, index) {
        components[index] = elementData[item];
      });
      var comps = {
        components: components
      };
      var microscope = Object.assign(this.state.microscope, comps);

      var node = _reactDom.default.findDOMNode(this.canvasRef.current);

      (0, _html2canvas.default)(node, {
        allowTaint: true,
        foreignObjectRendering: true,
        logging: true,
        letterRendering: 1,
        useCORS: true
      }).then(function (canvas) {
        //var myImage = canvas.toDataURL("image/png");
        //window.open(myImage);
        //document.body.appendChild(canvas);
        if (item.startsWith("Save microscope")) {
          console.log(microscope);

          _this7.props.onSaveMicroscope(microscope, _this7.handleCompleteSaveMicroscope //canvas
          ); // this.toDataUrl(
          // 	canvas,
          // 	this.props.onSaveMicroscope,
          // 	"image/png",
          // 	microscope,
          // 	this.handleCompleteSaveMicroscope
          // );

        } else if (item.startsWith("Export microscope")) {
          _this7.handleExportMicroscope(microscope);
        } else if (item.startsWith("Export image")) {
          _this7.handleExportMicroscopeImage(microscope, canvas); // this.toDataUrl(
          // 	canvas,
          // 	this.handleExportMicroscopeImage,
          // 	"image/png",
          // 	microscope
          // );

        } //document.body.removeChild(canvas);

      });
    }
  }, {
    key: "handleSaveSetting",
    value: function handleSaveSetting(item) {
      var _this8 = this;

      var validated = true;

      if (!this.state.isSettingValidated) {
        this.setState({
          isSettingValidated: false
        });
        validated = false;
      }

      if (!this.state.areSettingComponentsValidated) {
        this.setState({
          areSettingComponentsValidated: false
        });
        validated = false;
      }

      if (!validated) {//TODO throw warning instead of stopping validation
        //return;
      }

      var settingData = this.state.settingData;
      var components = [];
      Object.keys(settingData).forEach(function (item, index) {
        components[index] = settingData[item];
      });
      var comps = {
        components: components
      };
      var setting = Object.assign(this.state.setting, comps);

      var node = _reactDom.default.findDOMNode(this.canvasRef.current);

      (0, _html2canvas.default)(node, {
        allowTaint: true,
        foreignObjectRendering: true,
        logging: true,
        letterRendering: 1,
        useCORS: true
      }).then(function (canvas) {
        if (item.startsWith("Save setting")) {
          _this8.props.onSaveSetting(setting, _this8.handleCompleteSaveSetting);
        } else if (item.startsWith("Export setting")) {
          _this8.handleExportSetting(setting);
        } else if (item.startsWith("Export image")) {//TODO
        }
      });
    }
  }, {
    key: "handleCompleteSaveMicroscope",
    value: function handleCompleteSaveMicroscope(micName) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(micName + " saved");
    }
  }, {
    key: "handleCompleteSaveSetting",
    value: function handleCompleteSaveSetting(settingName) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(settingName + " saved");
    }
  }, {
    key: "onMicroscopeDataSave",
    value: function onMicroscopeDataSave(id, data) {
      var oldMicroscope = this.state.microscope;
      var newMicroscope = Object.assign(oldMicroscope, data);
      this.setState({
        microscope: newMicroscope,
        isMicroscopeValidated: true
      }); //this.isMicroscopeValidated = true;
    }
  }, {
    key: "onSettingDataSave",
    value: function onSettingDataSave(id, data) {
      var oldSetting = this.state.setting;
      var newSetting = Object.assign(oldSetting, data);
      this.setState({
        setting: newSetting,
        isSettingValidated: true
      }); //this.isMicroscopeValidated = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          imagesPath = _this$props.imagesPath,
          width = _this$props.width,
          height = _this$props.height;
      var schema = this.state.schema;
      var microscope = this.state.microscope;
      var microscopes = this.state.microscopes;
      var elementData = this.state.elementData;
      var setting = this.state.setting;
      var settings = this.state.settings;
      var settingData = this.state.settingData; //let canvasWidth = Math.ceil(width * 0.75);

      var canvasWidth = 800; //let canvasHeight = height - 60 - 60;

      var canvasHeight = 600; //let toolbarWidth = Math.floor(width * 0.25);

      var toolbarWidth = 300; //let toolbarHeight = height - 60 - 60;

      var toolbarHeight = canvasHeight;
      var settingsWidth = canvasWidth + toolbarWidth; //let footerWidth = width;

      var headerFooterWidth = canvasWidth + toolbarWidth;
      var headerFooterHeight = 60; // Alex: Idea for scaling
      //width = Math.max(600, width);
      //height = Math.max(600, height);

      width = canvasWidth + toolbarWidth;
      height = canvasHeight + headerFooterHeight * 2; //TODO with this strategy i can create multiple views
      //1st view: selection tier / new mic / use mic (+ import mic here maybe?)
      //2nd view: canvas with toolbar (+ possibile schema replacement?
      //	or the scheme selection can be done in the previous view)
      //	(+ export mic on file for the moment)
      //3rd view: settings (+ export settings on file for the moment)
      //onClickLoadSettings={this.handleLoadSettings}

      if (schema === null && microscopes === null && microscope === null) {
        return _react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, _react.default.createElement(_dataLoader.default, {
          onClickLoadSchema: this.handleLoadSchema,
          onClickLoadMicroscopes: this.handleLoadMicroscopes
        }));
      }

      if (microscope === null && this.state.isCreatingNewMicroscope === null) {
        return _react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, _react.default.createElement(_microscopePreLoader.default, {
          tiers: this.props.tiers,
          onClickTierSelection: this.handleActiveTierSelection,
          onClickCreateNewMicroscope: this.setCreateNewMicroscope,
          onClickLoadMicroscope: this.setLoadMicroscope
        }));
      }

      if (this.state.isCreatingNewMicroscope && (microscope === null || elementData === null)) {
        var loadingOptions = [createFromScratch, createFromFile];
        var microscopeNames = {};

        if (microscopes) {
          Object.keys(microscopes).forEach(function (key) {
            var mic = microscopes[key];

            if (mic.Manufacturer !== null && mic.Manufacturer !== undefined) {
              var catNames = microscopeNames[mic.Manufacturer];
              if (catNames !== null && catNames !== undefined) catNames.push(key);else catNames = [key];
              microscopeNames[mic.Manufacturer] = catNames;
            } else {
              var _catNames = microscopeNames["Others"];
              if (_catNames !== null && _catNames !== undefined) _catNames.push(key);else _catNames = [key];
              microscopeNames["Others"] = _catNames;
            }
          });
        }

        if (microscopeNames !== null && microscopeNames !== undefined && Object.keys(microscopeNames).length > 0) loadingOptions.push(loadFromRepository);
        return _react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, _react.default.createElement(_microscopeLoader.default, {
          loadingOptions: loadingOptions,
          microscopes: microscopeNames,
          onFileDrop: this.uploadMicroscopeFromDropzone,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickMicroscopeSelection: this.selectMicroscopeFromRepository,
          onClickConfirm: this.createOrUseMicroscope,
          onClickBack: this.onClickBack
        }));
      }

      if (!this.state.isCreatingNewMicroscope && (microscope === null || elementData === null)) {
        var _loadingOptions = [createFromFile];
        var _microscopeNames = {};

        if (microscopes) {
          Object.keys(microscopes).forEach(function (key) {
            var mic = microscopes[key];

            if (mic.Manufacturer !== null && mic.Manufacturer !== undefined) {
              var catNames = _microscopeNames[mic.Manufacturer];
              if (catNames !== null && catNames !== undefined) catNames.push(key);else catNames = [key];
              _microscopeNames[mic.Manufacturer] = catNames;
            } else {
              var _catNames2 = _microscopeNames["Others"];
              if (_catNames2 !== null && _catNames2 !== undefined) _catNames2.push(key);else _catNames2 = [key];
              _microscopeNames["Others"] = _catNames2;
            }
          });
        }

        if (_microscopeNames !== null && _microscopeNames !== undefined && Object.keys(_microscopeNames).length > 0) _loadingOptions.push(loadFromRepository);
        return _react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, _react.default.createElement(_microscopeLoader.default, {
          loadingOptions: _loadingOptions,
          microscopes: _microscopeNames,
          onFileDrop: this.uploadMicroscopeFromDropzone,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickMicroscopeSelection: this.selectMicroscopeFromRepository,
          onClickConfirm: this.createOrUseMicroscope,
          onClickBack: this.onClickBack
        }));
      }

      var style = {
        display: "flex",
        flexFlow: "row",
        height: height - 60 - 60
      }; //TODO should be passing these to canvas and toolbar instead of
      // using percentage size inside the component

      var canvasDims = {
        width: canvasWidth,
        height: canvasHeight
      };
      var settingsMainViewDims = {
        width: settingsWidth,
        height: canvasHeight
      };
      var toolbarDims = {
        width: toolbarWidth,
        height: toolbarHeight
      };
      var headerFooterDims = {
        width: headerFooterWidth,
        height: headerFooterHeight
      };
      var microscopeSchema = this.state.adaptedMicroscopeSchema;
      var componentsSchema = this.state.adaptedComponentsSchema;
      var imageSchema = this.state.adaptedImageSchema;
      var settingsSchema = this.state.adaptedSettingsSchema;
      var experimentalSchema = this.state.adaptedExperimentalSchema;
      var childrenSchema = this.state.adaptedChildrenSchema;

      if (!this.state.isCreatingNewMicroscope) {
        console.log("use microscope");
        console.log(microscope);
        console.log(settingsSchema);
        console.log("setting");
        console.log(setting);
        console.log(elementData);
        return _react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, _react.default.createElement(_header.default, {
          dimensions: headerFooterDims
        }), _react.default.createElement(_settingsMainView.default, {
          microscope: microscope,
          microscopeComponents: elementData,
          activeTier: this.state.activeTier,
          ref: this.settingsMainViewRef,
          componentSchemas: settingsSchema,
          inputData: settingData,
          updateElementData: this.updateSettingData,
          overlaysContainer: this.overlaysContainerRef.current,
          areComponentsValidated: this.state.areComponentsValidated,
          dimensions: settingsMainViewDims
        }), _react.default.createElement(_footer.default, {
          activeTier: this.state.activeTier,
          validationTier: this.state.validationTier,
          schema: imageSchema,
          onFormConfirm: this.onSettingDataSave,
          onClickSave: this.handleSaveSetting,
          onClickBack: this.onClickBack,
          hasSaveOption: this.props.onSaveSetting ? true : false,
          onClickChangeValidation: this.createAdaptedSchemas,
          overlaysContainer: this.overlaysContainerRef.current,
          inputData: setting,
          isSchemaValidated: this.state.isSettingsValidated,
          dimensions: headerFooterDims,
          element: "setting"
        }));
      } else {
        return _react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, _react.default.createElement(_header.default, {
          dimensions: headerFooterDims
        }), _react.default.createElement("div", {
          style: style
        }, _react.default.createElement(_canvas.default, {
          microscope: microscope,
          activeTier: this.state.activeTier,
          ref: this.canvasRef,
          imagesPath: imagesPath,
          componentSchemas: componentsSchema,
          inputData: elementData //backgroundImage={`${imagesPath}${microscopeSchema.image}`}
          ,
          backgroundImage: path.join(imagesPath, microscopeSchema.image),
          updateElementData: this.updateElementData,
          overlaysContainer: this.overlaysContainerRef.current,
          areComponentsValidated: this.state.areComponentsValidated,
          dimensions: canvasDims,
          setScale: this.setMicroscopeScale
        }), _react.default.createElement(_toolbar.default, {
          activeTier: this.state.activeTier,
          ref: this.toolbarRef,
          imagesPath: imagesPath,
          componentSchemas: componentsSchema,
          dimensions: toolbarDims
        })), _react.default.createElement(_footer.default, {
          activeTier: this.state.activeTier,
          validationTier: this.state.validationTier,
          schema: microscopeSchema,
          onFormConfirm: this.onMicroscopeDataSave,
          onClickSave: this.handleSaveMicroscope,
          onClickBack: this.onClickBack,
          hasSaveOption: this.props.onSaveMicroscope ? true : false,
          onClickChangeValidation: this.createAdaptedSchemas,
          overlaysContainer: this.overlaysContainerRef.current,
          inputData: microscope,
          isSchemaValidated: this.state.isMicroscopeValidated,
          dimensions: headerFooterDims,
          element: "microscope"
        }));
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.schema !== state.schema && props.schema !== null) {
        return {
          schema: props.schema
        };
      }

      if (props.microscope !== state.microscope && props.microscope !== null) {
        return {
          microscope: props.microscope
        };
      }

      if (props.setting !== state.setting && props.setting !== null) {
        return {
          setting: props.setting
        };
      }

      if (props.microscopes !== state.microscopes && props.microscopes !== null) {
        return {
          microscopes: props.microscopes
        };
      }

      if (props.settings !== state.settings && props.settings !== null) {
        return {
          settings: props.settings
        };
      }

      return null;
    }
  }]);

  return MicroscopyMetadataTool;
}(_react.default.PureComponent);

exports.default = MicroscopyMetadataTool;

var MicroscopyMetadataToolContainer =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(MicroscopyMetadataToolContainer, _React$PureComponent2);

  function MicroscopyMetadataToolContainer() {
    _classCallCheck(this, MicroscopyMetadataToolContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(MicroscopyMetadataToolContainer).apply(this, arguments));
  }

  _createClass(MicroscopyMetadataToolContainer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          height = _this$props2.height,
          width = _this$props2.width,
          forwardedRef = _this$props2.forwardedRef;
      var style = {
        height: height,
        width: width,
        boxSizing: "border-box"
      }; // border-box allows element to account for padding and border
      // when calculating/using `height` and `width` style properties.

      return _react.default.createElement("div", {
        id: "microscopy-app-container",
        style: style
      }, this.props.children, _react.default.createElement("div", {
        id: "microscopy-app-overlays-container",
        ref: forwardedRef
      }));
    }
  }]);

  return MicroscopyMetadataToolContainer;
}(_react.default.PureComponent);

MicroscopyMetadataTool.propTypes = {
  //TODO need to be added here and in all subclasses
  height: _propTypes.default.number,
  width: _propTypes.default.number,
  schema: _propTypes.default.arrayOf(_propTypes.default.object),
  microscope: _propTypes.default.arrayOf(_propTypes.default.object)
};
MicroscopyMetadataTool.defaultProps = {
  height: 600,
  width: 600,
  schema: null,
  microscope: null,
  setting: null,
  microscopes: null,
  settings: null,
  imagesPath: "./assets/",
  tiers: ["1", "2", "3", "4", "5"],
  onLoadSchema: function onLoadSchema(complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null);
    });
  },
  onLoadMicroscopes: function onLoadMicroscopes(complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null);
    });
  },
  onSaveMicroscope: function onSaveMicroscope(microscope, complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      console.log(microscope);
      complete(microscope.Name);
    });
  }
};