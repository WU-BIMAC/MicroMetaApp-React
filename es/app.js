"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _header = _interopRequireDefault(require("./components/header"));

var _footer = _interopRequireDefault(require("./components/footer"));

var _toolbar = _interopRequireDefault(require("./components/toolbar"));

var _canvas = _interopRequireDefault(require("./components/canvas"));

var _settingsMainView = _interopRequireDefault(require("./components/settingsMainView"));

var _dataLoader = _interopRequireDefault(require("./components/dataLoader"));

var _microscopePreLoader = _interopRequireDefault(require("./components/microscopePreLoader"));

var _microscopeLoader = _interopRequireDefault(require("./components/microscopeLoader"));

var _uuid = require("uuid");

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _constants = require("./constants");

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var url = require("url");

var validate = require("jsonschema").validate;

var MicroscopyMetadataTool = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroscopyMetadataTool, _React$PureComponent);

  var _super = _createSuper(MicroscopyMetadataTool);

  function MicroscopyMetadataTool(props) {
    var _this;

    _classCallCheck(this, MicroscopyMetadataTool);

    _this = _super.call(this, props);
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
      linkedFields: null,
      loadingMode: 0,
      isMicroscopeValidated: false,
      isSettingValidated: false,
      areComponentsValidated: false,
      areSettingComponentsValidated: false,
      isViewOnly: props.isViewOnly || false,
      isPreset: false,
      standTypes: {},
      standType: null
    };

    for (var i = 0; i < _constants.current_stands.length; i++) {
      var stand = _constants.current_stands[i];
      var name = stand.name;

      var modifiedCreateString = _constants.string_createFromScratch.replace("#", name);

      _this.state.standTypes[modifiedCreateString] = name;
    }

    if (_this.state.microscope !== null && _this.state.microscope !== undefined) _this.state.isPreset = true; //this.isMicroscopeValidated = false;

    _this.toolbarRef = /*#__PURE__*/_react.default.createRef();
    _this.canvasRef = /*#__PURE__*/_react.default.createRef();
    _this.settingsMainViewRef = /*#__PURE__*/_react.default.createRef();
    /**
     * This ref does not have 'current' until App has been mounted.
     * Because App is a PureComponent which doesn't get updated unless
     * state or props change, we need to have at least one state or prop change
     * occur before `this.overlaysContainerRef.current` is passed down correctly
     * to child Components (and not be null or undefined). This is currently done via
     * schema being null initially and then updated via 'Load Schema' button, but since
     * this prop is optional, we implement the componentDidMount func below.
     */

    _this.overlaysContainerRef = /*#__PURE__*/_react.default.createRef();
    _this.handleLoadSchema = _this.handleLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadSchema = _this.handleCompleteLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleLoadMicroscopes = _this.handleLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadMicroscopes = _this.handleCompleteLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.handleLoadSettings = _this.handleLoadSettings.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadSettings = _this.handleCompleteLoadSettings.bind(_assertThisInitialized(_this));
    _this.handleLoadDimensions = _this.handleLoadDimensions.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadDimensions = _this.handleCompleteLoadDimensions.bind(_assertThisInitialized(_this));
    _this.updateElementData = _this.updateElementData.bind(_assertThisInitialized(_this));
    _this.updateLinkedFields = _this.updateLinkedFields.bind(_assertThisInitialized(_this));
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
    _this.createOrUseMicroscopeFromSelectedFile = _this.createOrUseMicroscopeFromSelectedFile.bind(_assertThisInitialized(_this)); //this.setMicroscopeScale = this.setMicroscopeScale.bind(this);

    _this.onClickBack = _this.onClickBack.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchemas = _this.createAdaptedSchemas.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchema = _this.createAdaptedSchema.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscope = _this.handleExportMicroscope.bind(_assertThisInitialized(_this));
    _this.handleExportSetting = _this.handleExportSetting.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscopeImage = _this.handleExportMicroscopeImage.bind(_assertThisInitialized(_this));
    _this.handleSaveMicroscope = _this.handleSaveMicroscope.bind(_assertThisInitialized(_this));
    _this.handleSaveSetting = _this.handleSaveSetting.bind(_assertThisInitialized(_this));
    _this.handleCompleteSaveMicroscope = _this.handleCompleteSaveMicroscope.bind(_assertThisInitialized(_this));
    _this.handleCompleteSaveSetting = _this.handleCompleteSaveSetting.bind(_assertThisInitialized(_this));
    _this.handleMicroscopePreset = _this.handleMicroscopePreset.bind(_assertThisInitialized(_this)); //this.toDataUrl = this.toDataUrl.bind(this);

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
    key: "handleLoadDimensions",
    value: function handleLoadDimensions(e) {
      var _this2 = this;

      return new Promise(function () {
        return setTimeout(_this2.props.onLoadDimensions(_this2.handleCompleteLoadDimensions), 10000);
      });
    }
  }, {
    key: "handleLoadMicroscopes",
    value: function handleLoadMicroscopes(e) {
      var _this3 = this;

      return new Promise(function () {
        return setTimeout(_this3.props.onLoadMicroscopes(_this3.handleCompleteLoadMicroscopes), 10000);
      });
    }
  }, {
    key: "handleLoadSettings",
    value: function handleLoadSettings(e) {
      var _this4 = this;

      return new Promise(function () {
        return setTimeout(_this4.props.onLoadSettings(_this4.handleCompleteLoadSettings), 10000);
      });
    }
  }, {
    key: "handleCompleteLoadDimensions",
    value: function handleCompleteLoadDimensions(newDimensions) {
      console.log(newDimensions);
      this.setState({
        dimensions: newDimensions
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
      var _this5 = this;

      return new Promise(function () {
        return setTimeout(_this5.props.onLoadSchema(_this5.handleCompleteLoadSchema), 10000);
      });
    }
  }, {
    key: "handleCompleteLoadSchema",
    value: function handleCompleteLoadSchema(newSchema) {
      var _this6 = this;

      if (this.state.isPreset) {
        this.setState({
          schema: newSchema
        }, function () {
          _this6.handleMicroscopePreset();
        });
      } else {
        this.setState({
          schema: newSchema
        });
      }
    }
  }, {
    key: "handleMicroscopePreset",
    value: function handleMicroscopePreset() {
      var _this7 = this;

      var microscope = this.state.microscope;
      var tier = microscope.Tier;
      var vTier = microscope.ValidationTier;
      this.setState({
        activeTier: tier,
        validationTier: vTier,
        isCreatingNewMicroscope: true,
        loadingOption: _constants.string_createFromFile,
        loadingMode: 1
      }, function () {
        _this7.createOrUseMicroscopeFromDroppedFile();
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
        loadingOption: Object.keys(this.state.standTypes)[0],
        loadingMode: 0
      }); //this.handleLoadingOptionSelection(createFromScratch);
    }
  }, {
    key: "setLoadMicroscope",
    value: function setLoadMicroscope() {
      this.setState({
        isCreatingNewMicroscope: false,
        loadingOption: _constants.string_createFromFile,
        loadingMode: 1
      }); //this.handleLoadingOptionSelection(createFromFile);
    }
  }, {
    key: "handleLoadingOptionSelection",
    value: function handleLoadingOptionSelection(item) {
      var loadingMode = 0;

      if (item === _constants.string_createFromFile) {
        loadingMode = 1;
      } else if (item === _constants.string_loadFromRepository) loadingMode = 2;

      this.setState({
        loadingOption: item,
        loadingMode: loadingMode
      });
    }
  }, {
    key: "selectMicroscopeFromRepository",
    value: function selectMicroscopeFromRepository(item) {
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
    } // setMicroscopeScale(scale) {
    // 	this.state.microscope.scale = scale;
    // }

  }, {
    key: "createAdaptedSchema",
    value: function createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier) {
      var _this8 = this;

      var singleSchema = Object.assign({}, singleSchemaOriginal);
      singleSchema.properties = Object.assign({}, singleSchemaOriginal.properties);
      if (singleSchema.required !== undefined) if (singleSchemaOriginal.type === _constants.string_array) {
        singleSchema.items.required = singleSchemaOriginal.items.required.slice(0);
      } else {
        singleSchema.required = singleSchemaOriginal.required.slice(0);
      }
      var fieldsToRemove = [];
      var fieldsToSetNotRequired = [];
      var required = singleSchema.required;
      var properties = singleSchema.properties;

      if (singleSchemaOriginal.type === _constants.string_array) {
        required = singleSchema.items.required;
        properties = singleSchema.items.properties;
      }

      if (properties === null || properties === undefined) {
        //console.log(singleSchema);
        return singleSchema;
      }

      Object.keys(properties).forEach(function (propKey) {
        var property = properties[propKey];

        if (property.type === _constants.string_object || property.type === _constants.string_array && property.items.properties !== null && property.items.properties !== undefined) {
          var newProp = _this8.createAdaptedSchema(property, activeTier, validationTier);

          properties[propKey] = newProp;
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
    value: function createAdaptedSchemas(validationTier, standType) {
      var _this9 = this;

      var activeTier = this.state.activeTier;
      var schema = this.state.schema;
      var componentsSchema = [];
      var settingsSchema = [];
      var childrenSchema = [];
      var experimentalSchema = [];
      var microscopeSchema = {};
      var microscopeStandSchema = {};
      var imageSchema = {};
      var microscope = this.state.microscope;
      var setting = this.state.setting;
      var componentsCounter = 0;
      var settingsCounter = 0;
      var experimentalCounter = 0;
      var childrenCounter = 0;
      var currentStandType = standType;
      if (currentStandType === null) currentStandType = this.state.standType;
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        var singleSchema = _this9.createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier);

        if (singleSchema.title === "Microscope") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchema);
        } else if (singleSchema.title === currentStandType) {
          microscopeStandSchema = Object.assign(microscopeStandSchema, singleSchema);
        } else if (singleSchema.title === "Image") {
          imageSchema = Object.assign(imageSchema, singleSchema);
        } else if (singleSchema.category === "ChildElement") {
          childrenSchema[childrenCounter] = singleSchema;
          childrenCounter++;
        } else if (singleSchema.domain === "ImageAcquisitionSettings" || singleSchema.domain === "Experimental") {
          settingsSchema[settingsCounter] = singleSchema;
          settingsCounter++;
        } else if (singleSchema.domain === "MicroscopeHardwareSpecifications" || singleSchema.domain === "MicroscopeSpecifications") {
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
        adaptedMicroscopeStandSchema: microscopeStandSchema,
        adaptedComponentsSchema: componentsSchema,
        adaptedImageSchema: imageSchema,
        adaptedSettingsSchema: settingsSchema,
        adaptedExperimentalSchema: experimentalSchema,
        adaptedChildrenSchema: childrenSchema,
        validationTier: validationTier,
        isMicroscopeValidated: validated
      });
      return [microscopeSchema, microscopeStandSchema, componentsSchema, imageSchema, settingsSchema, childrenSchema];
    }
  }, {
    key: "createNewMicroscopeFromScratch",
    // static readTextFile(file) {
    // 	let rawFile = new XMLHttpRequest();
    // 	let rawData = null;
    // 	rawFile.open("GET", file, false);
    // 	rawFile.onreadystatechange = () => {
    // 		if (rawFile.readyState === 4) {
    // 			if (rawFile.status === 200 || rawFile.status == 0) {
    // 				rawData = rawFile.responseText;
    // 			}
    // 		}
    // 	};
    // 	rawFile.send(null);
    // 	return rawData;
    // }
    value: function createNewMicroscopeFromScratch(standType) {
      var typeDimensions = this.state.dimensions[standType];
      var uuid = (0, _uuid.v4)();
      var activeTier = this.state.activeTier;
      var adaptedSchemas = this.createAdaptedSchemas(activeTier, standType);
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
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
      var uuid2 = (0, _uuid.v4)();
      microscope[microscopeStandSchema.title] = {
        Name: "New ".concat(microscopeStandSchema.title),
        Schema_ID: microscopeStandSchema.ID,
        ID: uuid2,
        Tier: microscopeStandSchema.tier,
        ValidationTier: activeTier,
        Version: microscopeStandSchema.version
      };
      this.setState({
        microscope: microscope,
        elementData: {},
        typeDimensions: typeDimensions,
        standType: standType
      });
    }
  }, {
    key: "createOrUseMicroscopeFromDroppedFile",
    value: function createOrUseMicroscopeFromDroppedFile() {
      var uuid = (0, _uuid.v4)();
      var modifiedMic = this.state.microscope;
      var activeTier = this.state.activeTier;

      if (activeTier !== this.state.microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      var imageSchema = adaptedSchemas[3];
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

      var linkedFields = Object.assign({}, modifiedMic.linkedFields);
      var validation = validate(modifiedMic, microscopeSchema);
      var validated = validation.valid;

      if (this.state.isCreatingNewMicroscope) {
        MicroscopyMetadataTool.checkScalingFactorAndRescaleIfNeeded(modifiedMic, newElementData, this.props.scalingFactor);
        this.setState({
          microscope: modifiedMic,
          setting: null,
          elementData: newElementData,
          settingData: null,
          linkedFields: linkedFields,
          validationTier: modifiedMic.ValidationTier,
          isMicroscopeValidated: validated,
          typeDimensions: typeDimensions,
          standType: standType
        });
      } else {
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
          isMicroscopeValidated: validated,
          typeDimensions: typeDimensions,
          standType: standType
        });
      }
    }
  }, {
    key: "createOrUseMicroscopeFromSelectedFile",
    value: function createOrUseMicroscopeFromSelectedFile() {
      var uuid = (0, _uuid.v4)();
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

      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      var imageSchema = adaptedSchemas[3];
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

      var linkedFields = Object.assign({}, modifiedMic.linkedFields);
      var validation = validate(modifiedMic, microscopeSchema);
      var validated = validation.valid;

      if (this.state.isCreatingNewMicroscope) {
        MicroscopyMetadataTool.checkScalingFactorAndRescaleIfNeeded(modifiedMic, newElementData, this.props.scalingFactor);
        this.setState({
          microscope: modifiedMic,
          setting: null,
          elementData: newElementData,
          settingData: null,
          linkedFields: linkedFields,
          validationTier: modifiedMic.ValidationTier,
          isMicroscopeValidated: validated,
          typeDimensions: typeDimensions,
          standType: standType
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
          isMicroscopeValidated: validated,
          typeDimensions: typeDimensions,
          standType: standType
        });
      }
    }
  }, {
    key: "createOrUseMicroscope",
    value: function createOrUseMicroscope() {
      var isCreateNewScratch = false;
      var standType = null;

      for (var typeString in this.state.standTypes) {
        if (this.state.loadingOption === typeString) {
          isCreateNewScratch = true;
          var type = this.state.standTypes[typeString];

          for (var i = 0; i < _constants.current_stands.length; i++) {
            var stand = _constants.current_stands[i];

            if (stand.name === type) {
              standType = stand.json;
              break;
            }
          }

          if (standType !== null) break;
        }
      }

      if (isCreateNewScratch) {
        this.createNewMicroscopeFromScratch(standType);
      } else if (this.state.loadingOption === _constants.string_createFromFile) {
        this.createOrUseMicroscopeFromDroppedFile();
      } else {
        this.createOrUseMicroscopeFromSelectedFile();
      }
    }
  }, {
    key: "onClickBack",
    value: function onClickBack() {
      var presetMicroscope = null;

      if (this.state.isPreset) {
        presetMicroscope = this.state.microscope;
      }

      this.setState({
        activeTier: 1,
        validationTier: 1,
        microscope: presetMicroscope,
        microscopes: null,
        setting: null,
        isCreatingNewMicroscope: null,
        loadingOption: null,
        micName: null,
        schema: null,
        elementData: null,
        settingData: null,
        loadingMode: 0
      });
    }
  }, {
    key: "updateElementData",
    value: function updateElementData(elementData, areComponentsValidated) {
      //console.log(elementData);
      this.setState({
        elementData: elementData,
        areComponentsValidated: areComponentsValidated
      });
    }
  }, {
    key: "updateLinkedFields",
    value: function updateLinkedFields(linkedFields) {
      this.setState({
        linkedFields: linkedFields
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
      var _this10 = this;

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
      Object.keys(elementData).forEach(function (item, index) {
        components[index] = elementData[item];
      });
      var comps = {
        components
      };
      var microscope = Object.assign(this.state.microscope, comps);
      microscope.linkedFields = this.state.linkedFields;

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

          _this10.props.onSaveMicroscope(microscope, _this10.handleCompleteSaveMicroscope //canvas
          ); // this.toDataUrl(
          // 	canvas,
          // 	this.props.onSaveMicroscope,
          // 	"image/png",
          // 	microscope,
          // 	this.handleCompleteSaveMicroscope
          // );

        } else if (item.startsWith("Export microscope")) {
          _this10.handleExportMicroscope(microscope);
        } else if (item.startsWith("Export image")) {
          _this10.handleExportMicroscopeImage(microscope, canvas); // this.toDataUrl(
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
      var _this11 = this;

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
        components
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
          _this11.props.onSaveSetting(setting, _this11.handleCompleteSaveSetting);
        } else if (item.startsWith("Export setting")) {
          _this11.handleExportSetting(setting);
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
      var oldStand = oldMicroscope[this.state.standType];
      var newStand = Object.assign(oldStand, data[this.state.standType]);
      var newMicroscope = Object.assign(oldMicroscope, data);
      newMicroscope[this.state.standType] = newStand;
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
          imagesPathPNG = _this$props.imagesPathPNG,
          imagesPathSVG = _this$props.imagesPathSVG,
          width = _this$props.width,
          height = _this$props.height;
      var typeDimensions = this.state.typeDimensions;
      var schema = this.state.schema;
      var microscope = this.state.microscope;
      var microscopes = this.state.microscopes;
      var elementData = this.state.elementData;
      var setting = this.state.setting;
      var settings = this.state.settings;
      var settingData = this.state.settingData;
      var linkedFields = this.state.linkedFields;
      var scalingFactor = this.props.scalingFactor;
      width = Math.max(1100, width);
      height = Math.max(600, height - 60 * 2); //let canvasWidth = Math.ceil(width * 0.75);

      var canvasWidth = width - 300; //let canvasHeight = height - 60 - 60;

      var canvasHeight = height; //let toolbarWidth = Math.floor(width * 0.25);

      var toolbarWidth = 300; //let toolbarHeight = height - 60 - 60;

      var toolbarHeight = height;
      var settingsWidth = width; //let footerWidth = width;

      var headerFooterWidth = width;
      var headerFooterHeight = 60;

      if (schema === null && microscopes === null
      /*&& microscope === null*/
      ) {
          return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/_react.default.createElement(_dataLoader.default, {
            logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk),
            onClickLoadSchema: this.handleLoadSchema,
            onClickLoadDimensions: this.handleLoadDimensions,
            onClickLoadMicroscopes: this.handleLoadMicroscopes
          }));
        }

      if (microscope === null && this.state.isCreatingNewMicroscope === null) {
        return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement(_microscopePreLoader.default, {
          logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk),
          tiers: this.props.tiers,
          onClickTierSelection: this.handleActiveTierSelection,
          onClickCreateNewMicroscope: this.setCreateNewMicroscope,
          onClickLoadMicroscope: this.setLoadMicroscope
        }));
      }

      if (this.state.isCreatingNewMicroscope === null && microscope !== null && elementData === null) {
        var buttonStyle = {
          width: "400px",
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
        return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: windowExternalContainer
        }, /*#__PURE__*/_react.default.createElement("div", null, "logoImg=", url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk)), /*#__PURE__*/_react.default.createElement("div", {
          style: windowInternalContainer
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: buttonStyle,
          size: "lg"
        }, "Loading " + microscope.Name))));
      }

      if (this.state.isCreatingNewMicroscope && (microscope === null || elementData === null)) {
        var loadingOptions = []; //CREATE MULTIPLE ENTRIES FOR DIFFERENT MICROSCOPE

        for (var i = 0; i < _constants.current_stands.length; i++) {
          var stand = _constants.current_stands[i];
          var name = stand.name;

          var modifiedCreateString = _constants.string_createFromScratch.replace("#", name);

          loadingOptions.push(modifiedCreateString);
        } //let loadingOptions = [string_createFromScratch, string_createFromFile];


        loadingOptions.push(_constants.string_createFromFile);
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

        if (microscopeNames !== null && microscopeNames !== undefined && Object.keys(microscopeNames).length > 0) loadingOptions.push(_constants.string_loadFromRepository);
        return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement(_microscopeLoader.default, {
          logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk),
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
      } //should be settingData instead of elementData


      if (!this.state.isCreatingNewMicroscope && (setting === null || settingData === null)) {
        console.log("SETTINGS LOADER");
        var _loadingOptions = [_constants.string_createFromFile];
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

        if (_microscopeNames !== null && _microscopeNames !== undefined && Object.keys(_microscopeNames).length > 0) _loadingOptions.push(_constants.string_loadFromRepository);
        return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement(_microscopeLoader.default, {
          logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk),
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
        height: height
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
      var headerOffset = headerFooterHeight;
      var microscopeSchema = this.state.adaptedMicroscopeSchema;
      var microscopeStandSchema = this.state.adaptedMicroscopeStandSchema;
      var componentsSchema = this.state.adaptedComponentsSchema;
      var imageSchema = this.state.adaptedImageSchema;
      var settingsSchema = this.state.adaptedSettingsSchema;
      var experimentalSchema = this.state.adaptedExperimentalSchema;
      var childrenSchema = this.state.adaptedChildrenSchema;
      var footerMicroscopeSchemas = [microscopeSchema, microscopeStandSchema];
      var footerMicroscopeInput = [microscope, microscope[this.state.standType]];

      if (!this.state.isCreatingNewMicroscope) {
        return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement(_header.default, {
          dimensions: headerFooterDims,
          logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_no_bk)
        }), /*#__PURE__*/_react.default.createElement(_settingsMainView.default, {
          microscope: microscope,
          microscopeComponents: elementData,
          activeTier: this.state.activeTier,
          ref: this.settingsMainViewRef,
          imagesPath: imagesPathSVG,
          settingSchemas: settingsSchema,
          componentSchemas: componentsSchema,
          settingData: settingData,
          componentData: elementData,
          linkedFields: linkedFields,
          updateElementData: this.updateSettingData,
          updateLinkedFields: this.updateLinkedFields,
          overlaysContainer: this.overlaysContainerRef.current,
          areComponentsValidated: this.state.areComponentsValidated,
          dimensions: settingsMainViewDims,
          containerOffsetTop: this.props.containerOffsetTop,
          containerOffsetLeft: this.props.containerOffsetLeft,
          headerOffset: headerOffset
        }), /*#__PURE__*/_react.default.createElement(_footer.default, {
          activeTier: this.state.activeTier,
          validationTier: this.state.validationTier,
          componentSchemas: settingsSchema,
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
          element: "setting",
          formTitle: setting.Name,
          imagesPath: imagesPathSVG
        }));
      } else {
        if (this.state.isViewOnly) {
          canvasDims = {
            width: width,
            height: canvasHeight + headerFooterHeight
          };
          return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            dimensions: headerFooterDims,
            logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_no_bk)
          }), /*#__PURE__*/_react.default.createElement("div", {
            style: style
          }, /*#__PURE__*/_react.default.createElement(_canvas.default, {
            microscope: microscope,
            stand: microscope[this.state.standType],
            activeTier: this.state.activeTier,
            ref: this.canvasRef,
            imagesPath: imagesPathSVG,
            componentSchemas: componentsSchema,
            childrenSchemas: childrenSchema,
            inputData: elementData,
            linkedFields: linkedFields //backgroundImage={`${imagesPath}${microscopeSchema.image}`}
            ,
            backgroundImage: url.resolve(imagesPathSVG, microscopeStandSchema.image),
            updateElementData: this.updateElementData,
            updateLinkedFields: this.updateLinkedFields,
            overlaysContainer: this.overlaysContainerRef.current,
            areComponentsValidated: this.state.areComponentsValidated,
            canvasElementsDimensions: typeDimensions,
            dimensions: canvasDims,
            scalingFactor: scalingFactor,
            containerOffsetTop: this.props.containerOffsetTop,
            containerOffsetLeft: this.props.containerOffsetLeft,
            headerOffset: headerOffset //setScale={this.setMicroscopeScale}
            ,
            isViewOnly: this.state.isViewOnly
          })));
        } else {
          return /*#__PURE__*/_react.default.createElement(MicroscopyMetadataToolContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/_react.default.createElement(_header.default, {
            dimensions: headerFooterDims,
            logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_no_bk)
          }), /*#__PURE__*/_react.default.createElement("div", {
            style: style
          }, /*#__PURE__*/_react.default.createElement(_canvas.default, {
            microscope: microscope,
            stand: microscope[this.state.standType],
            activeTier: this.state.activeTier,
            ref: this.canvasRef,
            imagesPath: imagesPathSVG,
            componentSchemas: componentsSchema,
            childrenSchemas: childrenSchema,
            inputData: elementData,
            linkedFields: linkedFields //backgroundImage={`${imagesPath}${microscopeSchema.image}`}
            ,
            backgroundImage: url.resolve(imagesPathSVG, microscopeStandSchema.image),
            updateElementData: this.updateElementData,
            updateLinkedFields: this.updateLinkedFields,
            overlaysContainer: this.overlaysContainerRef.current,
            areComponentsValidated: this.state.areComponentsValidated,
            canvasElementsDimensions: typeDimensions,
            dimensions: canvasDims,
            scalingFactor: scalingFactor,
            containerOffsetTop: this.props.containerOffsetTop,
            containerOffsetLeft: this.props.containerOffsetLeft,
            headerOffset: headerOffset //setScale={this.setMicroscopeScale}

          }), /*#__PURE__*/_react.default.createElement(_toolbar.default, {
            activeTier: this.state.activeTier,
            ref: this.toolbarRef,
            imagesPath: imagesPathSVG,
            componentSchemas: componentsSchema,
            dimensions: toolbarDims,
            scalingFactor: scalingFactor
          })), /*#__PURE__*/_react.default.createElement(_footer.default, {
            activeTier: this.state.activeTier,
            validationTier: this.state.validationTier,
            componentSchemas: componentsSchema,
            schema: footerMicroscopeSchemas,
            onFormConfirm: this.onMicroscopeDataSave,
            onClickSave: this.handleSaveMicroscope,
            onClickBack: this.onClickBack,
            hasSaveOption: this.props.onSaveMicroscope ? true : false,
            onClickChangeValidation: this.createAdaptedSchemas,
            overlaysContainer: this.overlaysContainerRef.current,
            inputData: footerMicroscopeInput,
            isSchemaValidated: this.state.isMicroscopeValidated,
            dimensions: headerFooterDims,
            element: "microscope",
            formTitle: microscope.Name,
            imagesPath: imagesPathSVG
          }));
        }
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
  }, {
    key: "checkScalingFactorAndRescaleIfNeeded",
    value: function checkScalingFactorAndRescaleIfNeeded(modifiedMic, elementData, scalingFactor) {
      var micScalingFactor = 1;
      if (modifiedMic.ScalingFactor !== undefined) micScalingFactor = modifiedMic.ScalingFactor;
      if (micScalingFactor === scalingFactor) return;
      var reverseScale = 1 / micScalingFactor;
      var newScalingFactor = reverseScale * scalingFactor;
      modifiedMic.ScalingFactor = scalingFactor; //console.log("SC: " + newScalingFactor);

      for (var key in elementData) {
        var element = elementData[key]; // console.log("ID: " + key);
        // console.log(
        // 	" W: " +
        // 		element.Width +
        // 		" H: " +
        // 		element.Height +
        // 		" X: " +
        // 		element.PositionX +
        // 		" Y: " +
        // 		element.PositionY
        // );

        element.Width *= newScalingFactor;
        element.Height *= newScalingFactor;
        element.PositionX *= newScalingFactor;
        element.PositionY *= newScalingFactor; // console.log(
        // 	" W: " +
        // 		element.Width +
        // 		" H: " +
        // 		element.Height +
        // 		" X: " +
        // 		element.PositionX +
        // 		" Y: " +
        // 		element.PositionY
        // );
      }
    }
  }]);

  return MicroscopyMetadataTool;
}(_react.default.PureComponent);

exports.default = MicroscopyMetadataTool;

var MicroscopyMetadataToolContainer = /*#__PURE__*/function (_React$PureComponent2) {
  _inherits(MicroscopyMetadataToolContainer, _React$PureComponent2);

  var _super2 = _createSuper(MicroscopyMetadataToolContainer);

  function MicroscopyMetadataToolContainer() {
    _classCallCheck(this, MicroscopyMetadataToolContainer);

    return _super2.apply(this, arguments);
  }

  _createClass(MicroscopyMetadataToolContainer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          height = _this$props2.height,
          width = _this$props2.width,
          forwardedRef = _this$props2.forwardedRef;
      var style = {
        height,
        width,
        boxSizing: "border-box"
      }; // border-box allows element to account for padding and border
      // when calculating/using `height` and `width` style properties.

      return /*#__PURE__*/_react.default.createElement("div", {
        id: "microscopy-app-container",
        style: style
      }, this.props.children, /*#__PURE__*/_react.default.createElement("div", {
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
  microscopes: _propTypes.default.object,
  microscope: _propTypes.default.object
};
MicroscopyMetadataTool.defaultProps = {
  height: 600,
  width: 600,
  schema: null,
  microscope: null,
  setting: null,
  microscopes: null,
  settings: null,
  //REMEMBER last / is needed for url.resolve to properly handle paths
  imagesPathPNG: "./assets/png/",
  imagesPathSVG: "./assets/svg/",
  dimensionsPath: "./assets/dimension/",
  tiers: ["1", "2", "3", "4", "5"],
  containerOffsetTop: 0,
  containerOffsetLeft: 0,
  scalingFactor: 1,
  onLoadDimensions: function onLoadDimensions(complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null);
    });
  },
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
      complete(microscope.Name);
    });
  }
};