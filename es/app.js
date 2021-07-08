function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import React from "react";
import Button from "react-bootstrap/Button";
import Header from "./components/header";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";
import SettingsMainView from "./components/settingsMainView";
import DataLoader from "./components/dataLoader";
import MicroscopePreLoader from "./components/microscopePreLoader";
import MicroscopeLoader from "./components/microscopeLoader";
import SettingLoader from "./components/settingLoader";
import ImageLoader from "./components/imageLoader";
import ModalWindow from "./components/modalWindow";
import { version as appVersion } from "../package.json";
import { v4 as uuidv4 } from "uuid";
import { isDefined, verifyAppVersion, validateMicroscope as _validateMicroscope } from "./genericUtilities";

var url = require("url");

var validate = require("jsonschema").validate;

import { number_logo_width, number_logo_height, current_stands, string_object, string_array, string_json_ext, string_logo_img_no_bk, string_logo_img_cell_bk, string_logo_img_micro_bk, string_createFromScratch, string_createFromFile, string_loadFromRepository, string_noImageLoad, number_canvas_element_icons_height, number_canvas_element_offset_default } from "./constants";
import { isUndefined } from "util";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

var MicroMetaAppReact = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroMetaAppReact, _React$PureComponent);

  var _super = _createSuper(MicroMetaAppReact);

  function MicroMetaAppReact(props) {
    var _this;

    _classCallCheck(this, MicroMetaAppReact);

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
      isCreatingNewMicroscope: props.isCreatingNewMicroscope || null,
      isLoadingMicroscope: props.isLoadingMicroscope || null,
      isLoadingSettings: props.isLoadingSettings || null,
      isLoadingImage: props.isLoadingImage || null,
      loadingOption: null,
      micName: null,
      settingName: null,
      elementData: null,
      settingData: null,
      linkedFields: null,
      loadingMode: 0,
      isMicroscopeValidated: false,
      isSettingValidated: false,
      areComponentsValidated: false,
      areSettingComponentsValidated: false,
      isViewOnly: props.isViewOnly || false,
      standTypes: {},
      standType: null,
      imageMetadata: null,
      isToolbarHidden: props.isToolbarHidden || false,
      is4DNPortal: props.is4DNPortal || false,
      hasImport: props.hasImport || false,
      microscopePresetHandled: false
    };

    for (var i = 0; i < current_stands.length; i++) {
      var stand = current_stands[i];
      var name = stand.name;
      var modifiedCreateString = string_createFromScratch.replace("#", name);
      _this.state.standTypes[modifiedCreateString] = name;
    } //this.isMicroscopeValidated = false;


    _this.toolbarRef = /*#__PURE__*/React.createRef();
    _this.canvasRef = /*#__PURE__*/React.createRef();
    _this.settingsMainViewRef = /*#__PURE__*/React.createRef();
    /**
     * This ref does not have 'current' until App has been mounted.
     * Because App is a PureComponent which doesn't get updated unless
     * state or props change, we need to have at least one state or prop change
     * occur before `this.overlaysContainerRef.current` is passed down correctly
     * to child Components (and not be null or undefined). This is currently done via
     * schema being null initially and then updated via 'Load Schema' button, but since
     * this prop is optional, we implement the componentDidMount func below.
     */

    _this.overlaysContainerRef = /*#__PURE__*/React.createRef();
    _this.handleMicPreset = _this.handleMicPreset.bind(_assertThisInitialized(_this));
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
    _this.uploadSettingFromDropzone = _this.uploadSettingFromDropzone.bind(_assertThisInitialized(_this));
    _this.handleLoadMetadataComplete = _this.handleLoadMetadataComplete.bind(_assertThisInitialized(_this));
    _this.handleLoadingOptionSelection = _this.handleLoadingOptionSelection.bind(_assertThisInitialized(_this));
    _this.selectMicroscopeFromRepository = _this.selectMicroscopeFromRepository.bind(_assertThisInitialized(_this));
    _this.selectSettingFromRepository = _this.selectSettingFromRepository.bind(_assertThisInitialized(_this));
    _this.applyPreviousVersionModificationToMicroscope = _this.applyPreviousVersionModificationToMicroscope.bind(_assertThisInitialized(_this));
    _this.applyPreviousModelVersionModificationToMicroscope = _this.applyPreviousModelVersionModificationToMicroscope.bind(_assertThisInitialized(_this));
    _this.applyPreviousAppVersionModificationToMicroscope = _this.applyPreviousAppVersionModificationToMicroscope.bind(_assertThisInitialized(_this));
    _this.applyPreviousVersionModificationToSetting = _this.applyPreviousVersionModificationToSetting.bind(_assertThisInitialized(_this));
    _this.applyPreviousModelVersionModificationToSetting = _this.applyPreviousModelVersionModificationToSetting.bind(_assertThisInitialized(_this));
    _this.applyPreviousAppVersionModificationToSetting = _this.applyPreviousAppVersionModificationToSetting.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscope = _this.createOrUseMicroscope.bind(_assertThisInitialized(_this));
    _this.createNewMicroscopeFromScratch = _this.createNewMicroscopeFromScratch.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscopeFromDroppedFile = _this.createOrUseMicroscopeFromDroppedFile.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscopeFromSelectedFile = _this.createOrUseMicroscopeFromSelectedFile.bind(_assertThisInitialized(_this)); //this.setMicroscopeScale = this.setMicroscopeScale.bind(this);

    _this.createOrUseSetting = _this.createOrUseSetting.bind(_assertThisInitialized(_this));
    _this.createNewSettingFromScratch = _this.createNewSettingFromScratch.bind(_assertThisInitialized(_this));
    _this.createOrUseSettingFromDroppedFile = _this.createOrUseSettingFromDroppedFile.bind(_assertThisInitialized(_this));
    _this.createOrUseSettingFromSelectedFile = _this.createOrUseSettingFromSelectedFile.bind(_assertThisInitialized(_this));
    _this.createOrUseMetadata = _this.createOrUseMetadata.bind(_assertThisInitialized(_this));
    _this.onClickBack = _this.onClickBack.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchemas = _this.createAdaptedSchemas.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchema = _this.createAdaptedSchema.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscope = _this.handleExportMicroscope.bind(_assertThisInitialized(_this));
    _this.handleExportSetting = _this.handleExportSetting.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscopeImage = _this.handleExportMicroscopeImage.bind(_assertThisInitialized(_this));
    _this.handleSaveMicroscope = _this.handleSaveMicroscope.bind(_assertThisInitialized(_this));
    _this.handleSaveSetting = _this.handleSaveSetting.bind(_assertThisInitialized(_this));
    _this.handleCompleteSave = _this.handleCompleteSave.bind(_assertThisInitialized(_this));
    _this.handleCompleteExport = _this.handleCompleteExport.bind(_assertThisInitialized(_this));
    _this.handleMicroscopePreset = _this.handleMicroscopePreset.bind(_assertThisInitialized(_this));
    _this.onHideToolbar = _this.onHideToolbar.bind(_assertThisInitialized(_this)); //this.toDataUrl = this.toDataUrl.bind(this);

    _this.onSpecialImporterBack = _this.onSpecialImporterBack.bind(_assertThisInitialized(_this));
    _this.onSpecialImporterConfirm = _this.onSpecialImporterConfirm.bind(_assertThisInitialized(_this));
    _this.simulateClickLoadMicroscopeFromPortal = _this.simulateClickLoadMicroscopeFromPortal.bind(_assertThisInitialized(_this));
    _this.loadMicroscopeFromPortal = _this.loadMicroscopeFromPortal.bind(_assertThisInitialized(_this)); // Set up API

    var _createApi = createApi(_assertThisInitialized(_this)),
        api = _createApi["public"];

    _this.api = api;
    return _this;
  }

  _createClass(MicroMetaAppReact, [{
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
    value: function handleLoadDimensions() {
      var _this2 = this;

      return new Promise(function (resolve) {
        return setTimeout(function () {
          _this2.props.onLoadDimensions(_this2.handleCompleteLoadDimensions, resolve);
        }, 500);
      });
    }
  }, {
    key: "handleLoadMicroscopes",
    value: function handleLoadMicroscopes() {
      var _this3 = this;

      return new Promise(function (resolve) {
        return setTimeout(function () {
          _this3.props.onLoadMicroscopes(_this3.handleCompleteLoadMicroscopes, resolve);
        }, 500);
      });
    }
  }, {
    key: "handleLoadSettings",
    value: function handleLoadSettings() {
      var _this4 = this;

      return new Promise(function (resolve) {
        return setTimeout(function () {
          _this4.props.onLoadSettings(_this4.handleCompleteLoadSettings, resolve);
        }, 500);
      });
    }
  }, {
    key: "handleCompleteLoadDimensions",
    value: function handleCompleteLoadDimensions(newDimensions, resolve) {
      this.setState({
        dimensions: newDimensions
      }, resolve());
    }
  }, {
    key: "handleCompleteLoadMicroscopes",
    value: function handleCompleteLoadMicroscopes(newMicroscopes, resolve) {
      this.setState({
        microscopes: newMicroscopes
      }, resolve());
    }
  }, {
    key: "handleCompleteLoadSettings",
    value: function handleCompleteLoadSettings(newSettings, resolve) {
      this.setState({
        settings: newSettings
      }, resolve());
    }
  }, {
    key: "handleLoadSchema",
    value: function handleLoadSchema() {
      var _this5 = this;

      return new Promise(function (resolve) {
        return setTimeout(function () {
          _this5.props.onLoadSchema(_this5.handleCompleteLoadSchema, resolve);
        }, 500);
      });
    }
  }, {
    key: "handleCompleteLoadSchema",
    value: function handleCompleteLoadSchema(newSchema, resolve) {
      console.log("handleCompleteLoadSchema");
      this.setState({
        schema: newSchema
      }, resolve());
    }
  }, {
    key: "simulateClickLoadMicroscopeFromPortal",
    value: function simulateClickLoadMicroscopeFromPortal(loadMicroscopeFromPortalButtonRef) {
      if (loadMicroscopeFromPortalButtonRef === null) return;
      loadMicroscopeFromPortalButtonRef.click();
    }
  }, {
    key: "loadMicroscopeFromPortal",
    value: function loadMicroscopeFromPortal() {
      if (this.state.is4DNPortal && this.state.isCreatingNewMicroscope) {
        this.handleMicroscopePreset();
      }
    }
  }, {
    key: "onHideToolbar",
    value: function onHideToolbar() {
      var isToolbarHidden = this.state.isToolbarHidden;
      this.setState({
        isToolbarHidden: !isToolbarHidden
      });
    }
  }, {
    key: "handleMicPreset",
    value: function handleMicPreset() {
      var _this6 = this;

      return new Promise(function (resolve) {
        return setTimeout(function () {
          _this6.handleMicroscopePreset(resolve);
        }, 100);
      });
    } //HAVE TO DO THE SAME FOR SETTINGS?

  }, {
    key: "handleMicroscopePreset",
    value: function handleMicroscopePreset(resolve) {
      var _this7 = this;

      console.log("handleMicroscopePreset");
      var microscope = this.state.microscope;
      var tier = microscope.Tier;
      var vTier = microscope.ValidationTier;
      this.setState({
        activeTier: tier,
        validationTier: vTier,
        loadingOption: string_createFromFile,
        loadingMode: 1
      }, function () {
        _this7.createOrUseMicroscopeFromDroppedFile();

        _this7.setState({
          microscopePresetHandled: true
        }, function () {
          if (isDefined(resolve)) {
            resolve();
          }
        });
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
        isLoadingMicroscope: false,
        isLoadingSettings: false,
        isLoadingImage: false,
        loadingOption: Object.keys(this.state.standTypes)[0],
        loadingMode: 0
      }); //this.handleLoadingOptionSelection(createFromScratch);
    }
  }, {
    key: "setLoadMicroscope",
    value: function setLoadMicroscope() {
      this.setState({
        isCreatingNewMicroscope: false,
        isLoadingMicroscope: true,
        isLoadingSettings: true,
        isLoadingImage: true,
        loadingOption: string_createFromFile,
        loadingMode: 1
      }); //this.handleLoadingOptionSelection(createFromFile);
    }
  }, {
    key: "handleLoadingOptionSelection",
    value: function handleLoadingOptionSelection(item) {
      var loadingMode = 0;

      if (item === string_createFromFile) {
        loadingMode = 1;
      } else if (item === string_loadFromRepository) {
        loadingMode = 2;
      }

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
    key: "selectSettingFromRepository",
    value: function selectSettingFromRepository(item) {
      this.setState({
        settingName: item
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
    key: "uploadSettingFromDropzone",
    value: function uploadSettingFromDropzone(setting) {
      this.setState({
        setting: setting
      });
    }
  }, {
    key: "handleLoadMetadataComplete",
    value: function handleLoadMetadataComplete(imageMetadata) {
      this.setState({
        imageMetadata: imageMetadata
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
      if (singleSchema.required !== undefined) if (singleSchemaOriginal.type === string_array) {
        singleSchema.items.required = singleSchemaOriginal.items.required.slice(0);
      } else {
        singleSchema.required = singleSchemaOriginal.required.slice(0);
      }
      var fieldsToRemove = [];
      var fieldsToSetNotRequired = [];
      var required = singleSchema.required;
      var properties = singleSchema.properties;

      if (singleSchemaOriginal.type === string_array) {
        required = singleSchema.items.required;
        properties = singleSchema.items.properties;
      }

      if (properties === null || properties === undefined) {
        //console.log(singleSchema);
        return singleSchema;
      }

      Object.keys(properties).forEach(function (propKey) {
        var property = properties[propKey];

        if (property.type === string_object || property.type === string_array && property.items.properties !== null && property.items.properties !== undefined) {
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
      if (currentStandType === null || currentStandType === undefined) currentStandType = this.state.standType;
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        var singleSchema = _this9.createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier);

        if (singleSchema.title === "Instrument") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchema);
        } else if (singleSchema.title === currentStandType) {
          microscopeStandSchema = Object.assign(microscopeStandSchema, singleSchema);
        } else if (singleSchema.title === "Image") {
          imageSchema = Object.assign(imageSchema, singleSchema);
        } else if (singleSchema.category === "ChildElement") {
          childrenSchema[childrenCounter] = singleSchema;
          childrenCounter++;
        } else if (singleSchema.domain === "ImageAcquisitionSettings") {
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
    key: "applyPreviousVersionModificationToSetting",
    value: function applyPreviousVersionModificationToSetting(originalSetting) {
      var modifiedSetting = Object.assign({}, originalSetting);
      modifiedSetting = this.applyPreviousAppVersionModificationToSetting(modifiedSetting);
      modifiedSetting = this.applyPreviousModelVersionModificationToSetting(modifiedSetting);
      return modifiedSetting;
    }
  }, {
    key: "applyPreviousAppVersionModificationToSetting",
    value: function applyPreviousAppVersionModificationToSetting(originalSetting) {
      var schema = this.state.schema;
      var oldMainVersion = 0;
      var oldSubVersion = 0.44;
      var oldAppVersion = originalSetting.AppVersion;
      if (oldAppVersion === appVersion) return originalSetting;

      if (oldAppVersion !== undefined && oldAppVersion !== null) {
        var oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

        oldMainVersion = Number(oldAppVersionSplit[0]);
        oldSubVersion = Number(oldAppVersionSplit[1]);
        Number(oldAppVersionSplit[2]);
        Number(oldAppVersionSplit[3].replace("b", ""));
      }

      var imageSchema = {};
      var pixelsSchema = {};
      var settingsSchema = {};
      var experimentalSchema = {};
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Image") {
          imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === "Pixels") {
          pixelsSchema = Object.assign(pixelsSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
          var schemaID = singleSchemaOriginal.ID;
          settingsSchema[schemaID] = singleSchemaOriginal;
        } else if (singleSchemaOriginal.domain === "Experimental") {
          var _schemaID = singleSchemaOriginal.ID;
          experimentalSchema[_schemaID] = singleSchemaOriginal;
        }
      });

      if (originalSetting.AppVersion === null || originalSetting.AppVersion === undefined || originalSetting.AppVersion !== appVersion) {
        originalSetting.AppVersion = appVersion;
      }

      var hasModification = false;
      var isUpdateModelVersion = false;
      var isAddModelVersion = false;
      var isAddExtDomCat = false;
      var fieldsToDelete = [];
      var fieldsToNameChange = [];

      if (oldMainVersion === 0 && oldSubVersion < 45) {
        isAddModelVersion = true;
        isAddExtDomCat = true;
        hasModification = true;
      }

      if (oldMainVersion === 0 && oldSubVersion < 46) {
        // isAddModelVersion = false;
        // isAddExtDomCat = false;
        fieldsToDelete = [{
          key: "Channel",
          field: "ImagingMethod"
        }, {
          key: "GenericDetectorSettings",
          field: "Zoom"
        }, {
          key: "PointDetectorSettings",
          field: "Zoom"
        }, {
          key: "CameraSettings",
          field: "Zoom"
        }, {
          key: "LightSourceSettings",
          field: "Wavelenght"
        }];
        fieldsToNameChange = [{
          key: "Channel",
          field: "ImagingMethodTermAccession",
          newField: "IlluminationTypeTermAccession"
        }, {
          key: "GenericDetectorSettings",
          field: "DigitizerBitDepth",
          newField: "EffectiveBitDepth"
        }, {
          key: "PointDetectorSettings",
          field: "DigitizerBitDepth",
          newField: "EffectiveBitDepth"
        }, {
          key: "CameraSettings",
          field: "DigitizerBitDepth",
          newField: "EffectiveBitDepth"
        }];
        hasModification = true;
      }

      if (!hasModification) {
        return originalSetting;
      }

      var newSetting = Object.assign({}, originalSetting);

      if (isAddModelVersion) {
        if (newSetting.Version !== null && newSetting.Version !== undefined) {
          newSetting.ModelVersion = newSetting.Version;
          delete newSetting.Version;
        } else {
          newSetting.ModelVersion = imageSchema.modelVersion;
        }
      }

      var originalPixels = originalSetting.Pixels;

      if (originalPixels !== null && originalPixels !== undefined) {
        if (isAddModelVersion) {
          var newPixels = Object.assign({}, originalPixels);

          if (newPixels.Version !== null && newPixels.Version !== undefined) {
            newPixels.ModelVersion = newPixels.Version;
            delete newPixels.Version;
          } else {
            newPixels.ModelVersion = pixelsSchema.modelVersion;
          }

          newSetting.Pixels = newPixels;
        }
      }

      if (originalSetting.Planes !== null && originalSetting.Planes !== undefined) {
        var newPlanes = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.Planes, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.Planes = newPlanes;
      }

      if (originalSetting.Channels !== null && originalSetting.Channels !== undefined) {
        var newChannels = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.Channels, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.Channels = newChannels;
      }

      if (originalSetting.TIRFSettings !== null && originalSetting.TIRFSettings !== undefined) {
        var newTIRFSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.TIRFSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.TIRFSettings = newTIRFSettings;
      }

      if (originalSetting.ImagingEnvironment !== null && originalSetting.ImagingEnvironment !== undefined) {
        var newImagingEnvironment = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.ImagingEnvironment, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.ImagingEnvironment = newImagingEnvironment;
      }

      if (originalSetting.SamplePositioningSettings !== null && originalSetting.SamplePositioningSettings !== undefined) {
        var newSamplePositioningSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.SamplePositioningSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.SamplePositioningSettings = newSamplePositioningSettings;
      }

      if (originalSetting.MicroscopeTableSettings !== null && originalSetting.MicroscopeTableSettings !== undefined) {
        var newMicroscopeTableSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.MicroscopeTableSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.MicroscopeTableSettings = newMicroscopeTableSettings;
      }

      if (originalSetting.ObjectiveSettings !== null && originalSetting.ObjectiveSettings !== undefined) {
        var originalObjSett = originalSetting.ObjectiveSettings;
        settingsSchema[originalObjSett.Schema_ID];
        var newObjectiveSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(originalObjSett, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.ObjectiveSettings = newObjectiveSettings;
      }

      if (originalSetting.MicroscopeStandSettings !== null && originalSetting.MicroscopeStandSettings !== undefined) {
        var newMicroscopeStandSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(originalSetting.MicroscopeStandSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.MicroscopeStandSettings = newMicroscopeStandSettings;
      }

      return newSetting;
    }
  }, {
    key: "applyPreviousModelVersionModificationToSetting",
    value: function applyPreviousModelVersionModificationToSetting(originalSetting) {
      var schema = this.state.schema;
      var imageSchema = {};
      var pixelsSchema = {};
      var settingsSchema = {};
      var experimentalSchema = {};
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Image") {
          imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === "Pixels") {
          pixelsSchema = Object.assign(pixelsSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
          var schemaID = singleSchemaOriginal.ID;
          settingsSchema[schemaID] = singleSchemaOriginal;
        } else if (singleSchemaOriginal.domain === "Experimental") {
          var _schemaID2 = singleSchemaOriginal.ID;
          experimentalSchema[_schemaID2] = singleSchemaOriginal;
        }
      });
      var isUpdateModelVersion = true;
      var isAddModelVersion = false;
      var isAddExtDomCat = false;
      var fieldsToDelete = [];
      var fieldsToNameChange = [];
      var newSetting = Object.assign({}, originalSetting);
      newSetting.ModelVersion = imageSchema.modelVersion;
      var originalPixels = originalSetting.Pixels;

      if (originalPixels !== null && originalPixels !== undefined) {
        {
          var newPixels = Object.assign({}, originalPixels);
          newPixels.ModelVersion = pixelsSchema.modelVersion;
          newSetting.Pixels = newPixels;
        }
      }

      if (originalSetting.Planes !== null && originalSetting.Planes !== undefined) {
        var newPlanes = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.Planes, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.Planes = newPlanes;
      }

      if (originalSetting.Channels !== null && originalSetting.Channels !== undefined) {
        var newChannels = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.Channels, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.Channels = newChannels;
      }

      if (originalSetting.TIRFSettings !== null && originalSetting.TIRFSettings !== undefined) {
        var newTIRFSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.TIRFSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.TIRFSettings = newTIRFSettings;
      }

      if (originalSetting.ImagingEnvironment !== null && originalSetting.ImagingEnvironment !== undefined) {
        var newImagingEnvironment = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.ImagingEnvironment, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.ImagingEnvironment = newImagingEnvironment;
      }

      if (originalSetting.SamplePositioningSettings !== null && originalSetting.SamplePositioningSettings !== undefined) {
        var newSamplePositioningSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.SamplePositioningSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.SamplePositioningSettings = newSamplePositioningSettings;
      }

      if (originalSetting.MicroscopeTableSettings !== null && originalSetting.MicroscopeTableSettings !== undefined) {
        var newMicroscopeTableSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.MicroscopeTableSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.MicroscopeTableSettings = newMicroscopeTableSettings;
      }

      if (originalSetting.ObjectiveSettings !== null && originalSetting.ObjectiveSettings !== undefined) {
        var originalObjSett = originalSetting.ObjectiveSettings;
        settingsSchema[originalObjSett.Schema_ID];
        var newObjectiveSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(originalObjSett, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.ObjectiveSettings = newObjectiveSettings;
      }

      if (originalSetting.MicroscopeStandSettings !== null && originalSetting.MicroscopeStandSettings !== undefined) {
        var newMicroscopeStandSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(originalSetting.MicroscopeStandSettings, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, settingsSchema, experimentalSchema);
        newSetting.MicroscopeStandSettings = newMicroscopeStandSettings;
      }

      return newSetting;
    }
  }, {
    key: "applyPreviousVersionModificationToMicroscope",
    value: function applyPreviousVersionModificationToMicroscope(originalMicroscope) {
      if (this.state.isLoadingMicroscope) return originalMicroscope;
      var modifiedMic = Object.assign({}, originalMicroscope);
      modifiedMic.ModelVersion;
      modifiedMic = this.applyPreviousAppVersionModificationToMicroscope(modifiedMic);
      modifiedMic = this.applyPreviousModelVersionModificationToMicroscope(modifiedMic);
      return modifiedMic;
    }
  }, {
    key: "applyPreviousAppVersionModificationToMicroscope",
    value: function applyPreviousAppVersionModificationToMicroscope(originalMicroscope) {
      var schema = this.state.schema;
      var oldMainVersion = 0;
      var oldSubVersion = 0.44;
      var oldAppVersion = originalMicroscope.AppVersion;
      if (oldAppVersion === appVersion) return originalMicroscope;

      if (oldAppVersion !== undefined && oldAppVersion !== null) {
        var oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

        oldMainVersion = Number(oldAppVersionSplit[0]);
        oldSubVersion = Number(oldAppVersionSplit[1]);
        Number(oldAppVersionSplit[2]);
        Number(oldAppVersionSplit[3].replace("b", ""));
      }

      var microscopeSchema = {};
      var microscopeStandSchema = {};
      var componentsSchema = {};
      var experimentalSchema = {};
      var standType = "InvertedMicroscopeStand";
      var originalMicroscopeStand = originalMicroscope.MicroscopeStand;

      if (originalMicroscopeStand !== null && originalMicroscopeStand !== undefined) {
        standType = originalMicroscopeStand.Schema_ID.replace(".json", "");
      }

      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Instrument") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === standType) {
          microscopeStandSchema = Object.assign(microscopeStandSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.domain === "MicroscopeHardwareSpecifications" || singleSchemaOriginal.domain === "MicroscopeSpecifications") {
          var schemaID = singleSchemaOriginal.ID;
          componentsSchema[schemaID] = singleSchemaOriginal;
        } else if (singleSchemaOriginal.domain === "Experimental") {
          var _schemaID3 = singleSchemaOriginal.ID;
          experimentalSchema[_schemaID3] = singleSchemaOriginal;
        }
      });

      if (originalMicroscope.AppVersion === undefined || originalMicroscope.AppVersion === null || originalMicroscope.AppVersion !== appVersion) {
        originalMicroscope.AppVersion = appVersion;
      }

      var hasModification = false;
      var isAddModelVersion = false;
      var isAddExtDomCat = false;
      var fieldsToDelete = [];
      var fieldsToNameChange = [];

      if (oldMainVersion === 0 && oldSubVersion < 45) {
        isAddModelVersion = true;
        isAddExtDomCat = true;
        hasModification = true;
      }

      if (oldMainVersion === 0 && oldSubVersion < 46) {
        // isAddModelVersion = false;
        // isAddExtDomCat = false;
        fieldsToDelete = [{
          key: "Lens",
          field: "ObjectDistance"
        }, {
          key: "Objective",
          field: "ObjectDistance"
        }, {
          key: "StandardDichroic",
          field: "FilterHolderPosition"
        }, {
          key: "GenericDichroic",
          field: "FilterHolderPosition"
        }, {
          key: "SamplePositioning.Stage",
          field: "RepetabilityUnit"
        }, {
          key: "SamplePositioning.Stage",
          field: "Repetability"
        }, {
          key: "SamplePositioning.Stage",
          field: "SettingTime"
        }, {
          key: "SamplePositioning.Focusing",
          field: "RepetabilityUnit"
        }, {
          key: "SamplePositioning.Focusing",
          field: "Repetability"
        }, {
          key: "SamplePositioning.Focusing",
          field: "SettingTime"
        }];
        fieldsToNameChange = [{
          key: "Fluorescence_LightSource",
          field: "PowerMode",
          newField: "IlluminationPowerReportingStatistic"
        }, {
          key: "Transmitted_LightSource",
          field: "PowerMode",
          newField: "IlluminationPowerReportingStatistic"
        }, {
          key: "Lens",
          field: "Type",
          newField: "Shape"
        }, {
          key: "SamplePositioning.Stage",
          field: "ZRepetability",
          newField: "ZRepeatability"
        }, {
          key: "SamplePositioning.Stage",
          field: "ZRepetabilityUnit",
          newField: "ZRepeatabilityUnit"
        }, {
          key: "SamplePositioning.Stage",
          field: "XYRepetability",
          newField: "XYRepeatability"
        }, {
          key: "SamplePositioning.Stage",
          field: "XYRepetabilityUnit",
          newField: "XYRepeatabilityUnit"
        }, {
          key: "SamplePositioning.Focusing",
          field: "ZRepetability",
          newField: "ZRepeatability"
        }, {
          key: "SamplePositioning.Focusing",
          field: "ZRepetabilityUnit",
          newField: "ZRepeatabilityUnit"
        }];
        hasModification = true;
      }

      if (!hasModification) {
        return originalMicroscope;
      }

      var newMicroscope = Object.assign({}, originalMicroscope);

      if (isAddModelVersion) {
        if (newMicroscope.Version !== null && newMicroscope.Version !== undefined) {
          newMicroscope.ModelVersion = newMicroscope.Version;
          delete newMicroscope.Version;
        } else {
          newMicroscope.ModelVersion = microscopeSchema.modelVersion;
        }
      }

      if (originalMicroscopeStand !== null && originalMicroscopeStand !== undefined) {
        var newMicroscopeStand = Object.assign({}, originalMicroscopeStand);

        if (isAddModelVersion) {
          if (newMicroscopeStand.Version !== null && newMicroscopeStand.Version !== undefined) {
            newMicroscopeStand.ModelVersion = newMicroscopeStand.Version;
            delete newMicroscopeStand.Version;
          } else {
            newMicroscopeStand.ModelVersion = microscopeStandSchema.modelVersion;
          }
        }

        newMicroscope.MicroscopeStand = newMicroscopeStand;
      }

      if (originalMicroscope.components !== null && originalMicroscope.components !== undefined) {
        var newComponents = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalMicroscope.components, false, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, componentsSchema, experimentalSchema);
        newMicroscope.components = newComponents;
      }

      return newMicroscope;
    }
  }, {
    key: "applyPreviousModelVersionModificationToMicroscope",
    value: function applyPreviousModelVersionModificationToMicroscope(originalMicroscope) {
      var schema = this.state.schema;
      var microscopeSchema = {};
      var microscopeStandSchema = {}; //In theory these should never be needed because settings shouldn't be re-edited
      //let imageSchema = {};
      //let settingsSchema = {};

      var componentsSchema = {};
      var experimentalSchema = {};
      var standType = "InvertedMicroscopeStand";
      var originalMicroscopeStand = originalMicroscope.MicroscopeStand;

      if (originalMicroscopeStand !== null && originalMicroscopeStand !== undefined) {
        standType = originalMicroscopeStand.Schema_ID.replace(".json", "");
      }

      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Instrument") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === standType) {
          microscopeStandSchema = Object.assign(microscopeStandSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.domain === "MicroscopeHardwareSpecifications" || singleSchemaOriginal.domain === "MicroscopeSpecifications") {
          var schemaID = singleSchemaOriginal.ID;
          componentsSchema[schemaID] = singleSchemaOriginal;
        } else if (singleSchemaOriginal.domain === "Experimental") {
          var _schemaID4 = singleSchemaOriginal.ID;
          experimentalSchema[_schemaID4] = singleSchemaOriginal;
        }
      });
      var oldMicModelVersion = originalMicroscope.ModelVersion;
      var oldMicModelVersionString = oldMicModelVersion.split(".").join(""); //oldVersion.replaceAll(".", "");

      var oldMicModelVersionNumber = Number(oldMicModelVersionString);
      var newMicroscope = Object.assign({}, originalMicroscope);

      if (originalMicroscope.ModelVersion !== microscopeSchema.modelVersion) {
        newMicroscope.ModelVersion = microscopeSchema.modelVersion;
      }

      if (originalMicroscopeStand !== undefined && originalMicroscopeStand !== null && originalMicroscopeStand.ModelVersion !== microscopeStandSchema.modelVersion) {
        newMicroscope.MicroscopeStand.ModelVersion = microscopeStandSchema.modelVersion;
      } // console.log("oldMicModelVersionNumber");
      // console.log(oldMicModelVersionNumber);


      if (oldMicModelVersionNumber < 2000) {
        console.log("PRE 2.00 MICROSCOPE");
        console.log(originalMicroscope); //FIXME me update experimental here?
        //Need to add stand and move fields from microscope to stand
        //Manufacturer, Model, SerialNumber -> CatalogNumber, LotNumber, EyePieceFieldNumber

        this.state.activeTier;
        var uuid2 = uuidv4();
        delete newMicroscope.Manufacturer;
        delete newMicroscope.Model;
        delete newMicroscope.SerialNumber;
        delete newMicroscope.LotNumber;
        delete newMicroscope.SpecsFile;
        delete newMicroscope.EyePieceFieldNumber;
        delete newMicroscope.Type;
        newMicroscope.MicroscopeStand = {
          Name: "New ".concat(microscopeStandSchema.title),
          Schema_ID: microscopeStandSchema.ID,
          ID: uuid2,
          Tier: microscopeStandSchema.tier,
          ModelVersion: microscopeStandSchema.modelVersion,
          Manufacturer: originalMicroscope.Manufacturer,
          Model: originalMicroscope.Model,
          CatalogNumber: originalMicroscope.SerialNumber,
          LotNumber: originalMicroscope.LotNumber,
          EyePieceFieldNumber: originalMicroscope.EyePieceFieldNumber,
          SpecsFile: originalMicroscope.SpecsFile
        };
        newMicroscope.Schema_ID = "Instrument.json";
        console.log("UPDATED MICROSCOPE");
        console.log(newMicroscope);
      }

      var isUpdateModelVersion = true;
      var isAddModelVersion = false;
      var isAddExtDomCat = false;
      var fieldsToDelete = [];
      var fieldsToNameChange = [];

      if (originalMicroscope.components !== null && originalMicroscope.components !== undefined) {
        var newComponents = [];

        for (var i = 0; i < originalMicroscope.components.length; i++) {
          var comp = Object.assign({}, originalMicroscope.components[i]);
          var compSchemaID = comp.Schema_ID;
          var compSchema = componentsSchema[compSchemaID];

          if (compSchema !== undefined && compSchema !== null && comp.ModelVersion !== compSchema.modelVersion) {
            comp = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(comp, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, componentsSchema, experimentalSchema);
          } else if (compSchema === undefined || compSchema === null) {
            //Adjustment case for renamed Schemas
            console.log(compSchemaID + " not found - OLD NAME");
            var newCompSchemaID = null;
            if (compSchemaID === "AutoFocus.json") newCompSchemaID = "FocusStabilizationDevice.json";else if (compSchemaID === "Direct.json") newCompSchemaID = "FreeBeam.json";else if (compSchemaID === "FilterSet.json") newCompSchemaID = "FilterCube.json";else if (compSchemaID === "Optovar.json") newCompSchemaID = "MagnificationChanger.json";else if (compSchemaID === "SampleHolder.json") newCompSchemaID = "StageInsert.json";else if (compSchemaID === "ObjectiveTurretFocus.json") newCompSchemaID = "TurretObjectiveFocusing.json";else if (compSchemaID === "PiezoElectricObjectiveFocus.json") newCompSchemaID = "IndividualObjectiveFocusing.json";
            var _compSchema = componentsSchema[newCompSchemaID];

            if (_compSchema === undefined || _compSchema === null) {
              console.log(newCompSchemaID + " not found - NEW NAME");
            } else {
              comp.Schema_ID = newCompSchemaID;
              comp = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(comp, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, componentsSchema, experimentalSchema);
            }
          }

          newComponents[i] = comp;
        }

        newMicroscope.components = newComponents;
      }

      return newMicroscope;
    }
  }, {
    key: "createNewMicroscopeFromScratch",
    value: function createNewMicroscopeFromScratch(standType) {
      var typeDimensions = this.state.dimensions[standType];
      var uuid = uuidv4();
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
        ModelVersion: microscopeSchema.modelVersion,
        AppVersion: appVersion,
        Extension: microscopeSchema.extension,
        Domain: microscopeSchema.domain,
        Category: microscopeSchema.category,
        ScalingFactor: this.props.scalingFactor
      };
      var uuid2 = uuidv4();
      microscope.MicroscopeStand = {
        Name: "New ".concat(microscopeStandSchema.title),
        Schema_ID: microscopeStandSchema.ID,
        ID: uuid2,
        Tier: microscopeStandSchema.tier,
        ModelVersion: microscopeStandSchema.modelVersion,
        Extension: microscopeStandSchema.extension,
        Domain: microscopeStandSchema.domain,
        Category: microscopeStandSchema.category
      };
      this.setState({
        microscope: microscope,
        elementData: {},
        validationTier: microscope.ValidationTier,
        typeDimensions: typeDimensions,
        standType: standType,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseMicroscopeFromDroppedFile",
    value: function createOrUseMicroscopeFromDroppedFile() {
      //console.log("createOrUseMicroscopeFromDroppedFile - 1");
      var modifiedMic = this.state.microscope;
      var activeTier = this.state.activeTier;

      if (activeTier !== modifiedMic.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      modifiedMic = this.applyPreviousVersionModificationToMicroscope(modifiedMic);
      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      adaptedSchemas[4];
      var components = modifiedMic.components;
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
      var validationMicroscope = validate(modifiedMic, microscopeSchema);
      var validatedMicroscope = validationMicroscope.valid;
      var validationStand = validate(modifiedMic.MicroscopeStand, microscopeStandSchema);
      var validatedStand = validationStand.valid;
      MicroMetaAppReact.checkScalingFactorAndRescaleIfNeeded(modifiedMic, newElementData, this.props.scalingFactor); //console.log("createOrUseMicroscopeFromDroppedFile - 2");
      //console.log(modifiedMic);

      this.setState({
        microscope: modifiedMic,
        setting: null,
        elementData: newElementData,
        settingData: null,
        linkedFields: linkedFields,
        validationTier: modifiedMic.ValidationTier,
        isMicroscopeValidated: validatedMicroscope && validatedStand,
        typeDimensions: typeDimensions,
        standType: standType,
        loadingOption: string_createFromFile,
        loadingMode: 1,
        isSpecialImporterActive: false
      });
    }
  }, {
    key: "createOrUseMicroscopeFromSelectedFile",
    value: function createOrUseMicroscopeFromSelectedFile() {
      var modifiedMic = this.state.microscopes[this.state.micName];
      var activeTier = this.state.activeTier;

      if (activeTier !== modifiedMic.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      modifiedMic = this.applyPreviousVersionModificationToMicroscope(modifiedMic);
      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      adaptedSchemas[4];
      var components = modifiedMic.components;
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
      var validationMicroscope = validate(modifiedMic, microscopeSchema);
      var validatedMicroscope = validationMicroscope.valid;
      var validationStand = validate(modifiedMic.MicroscopeStand, microscopeStandSchema);
      var validatedStand = validationStand.valid;
      MicroMetaAppReact.checkScalingFactorAndRescaleIfNeeded(modifiedMic, newElementData, this.props.scalingFactor);
      this.setState({
        microscope: modifiedMic,
        setting: null,
        elementData: newElementData,
        settingData: null,
        linkedFields: linkedFields,
        validationTier: modifiedMic.ValidationTier,
        isMicroscopeValidated: validatedMicroscope && validatedStand,
        typeDimensions: typeDimensions,
        standType: standType,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseMicroscope",
    value: function createOrUseMicroscope() {
      var loadingOption = this.state.loadingOption;
      var isCreateNewScratch = false;
      var standType = null;

      for (var typeString in this.state.standTypes) {
        if (this.state.loadingOption === typeString) {
          isCreateNewScratch = true;
          var type = this.state.standTypes[typeString];

          for (var i = 0; i < current_stands.length; i++) {
            var stand = current_stands[i];

            if (stand.name === type) {
              standType = stand.json;
              break;
            }
          }

          if (standType !== null) break;
        }
      }

      var isLoadingMicroscope = this.state.isLoadingMicroscope;
      var microscope = this.state.microscope;

      if (!isCreateNewScratch && loadingOption !== string_createFromFile) {
        microscope = this.state.microscopes[this.state.micName];
      }

      if (microscope !== null && microscope !== undefined && isLoadingMicroscope) {
        if (!verifyAppVersion(microscope)) {
          window.alert("The Microscope file you are trying to use was saved with a previous version of Micro-Meta App. To avoid errors, before proceeding please go back to the Manage Instrument section of the App and save this file again.");
          return;
        }
      }

      if (isCreateNewScratch) {
        this.createNewMicroscopeFromScratch(standType);
      } else if (loadingOption === string_createFromFile) {
        this.createOrUseMicroscopeFromDroppedFile();
      } else {
        this.createOrUseMicroscopeFromSelectedFile();
      }
    }
  }, {
    key: "createNewSettingFromScratch",
    value: function createNewSettingFromScratch() {
      var imageMetadata = this.state.imageMetadata;
      var microscope = this.state.microscope;
      var standType = microscope.MicroscopeStand.Schema_ID.replace(".json", "");
      var typeDimensions = this.state.dimensions[standType];
      var uuid = uuidv4();
      var uuid2 = uuidv4();
      uuidv4();
      var activeTier = this.state.activeTier;
      var adaptedSchemas = this.createAdaptedSchemas(activeTier, standType);
      var imageSchema = adaptedSchemas[3];
      var settingsSchema = adaptedSchemas[4]; //console.log(settingsSchema);

      var pixelsSchema = null;

      for (var i in settingsSchema) {
        var localSchema = settingsSchema[i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var setting = {
        //todo this means the microscope schema needs to be at 0 all the time
        //need to find better solution
        Name: "New ".concat(imageSchema.title),
        Schema_ID: imageSchema.ID,
        ID: uuid,
        Tier: activeTier,
        ValidationTier: activeTier,
        ModelVersion: imageSchema.modelVersion,
        AppVersion: appVersion,
        InstrumentName: microscope.Name,
        InstrumentID: microscope.ID,
        Extension: imageSchema.extension,
        Domain: imageSchema.domain,
        Category: imageSchema.category
      };
      var pixels = {
        Name: "New ".concat(pixelsSchema.title),
        Schema_ID: pixelsSchema.ID,
        ID: uuid2,
        Tier: activeTier,
        ModelVersion: pixelsSchema.modelVersion,
        Extension: pixelsSchema.extension,
        Domain: pixelsSchema.domain,
        Category: pixelsSchema.category
      };
      var mergedSettings = null;

      if (imageMetadata !== null && imageMetadata !== undefined) {
        var newImageMetadata = Object.assign({}, imageMetadata);
        delete newImageMetadata.ImagingEnvironment;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeTableSettings;
        delete newImageMetadata.ObjectiveSettings;
        delete newImageMetadata.SamplePositioningSettings;
        delete newImageMetadata.Channels;
        delete newImageMetadata.Planes;
        delete newImageMetadata.Experiment;
        delete newImageMetadata.TIRFSettings;
        mergedSettings = Object.assign({}, setting, newImageMetadata);
        var mergedPixels = Object.assign({}, pixels, newImageMetadata.Pixels);
        mergedSettings.Pixels = mergedPixels;
      } else {
        mergedSettings = setting;
        mergedSettings.Pixels = pixels;
      }

      // let imgEnv = mergedSettings.ImagingEnvironment;
      // if (imgEnv !== null && imgEnv !== undefined)
      // 	newSettingData.ImagingEnvironment = imgEnv;
      // let micStandSet = mergedSettings.MicroscopeStandSettings;
      // if (micStandSet !== null && micStandSet !== undefined)
      // 	newSettingData.MicroscopeStandSettings = micStandSet;
      // let micTableSet = mergedSettings.MicroscopeTableSettings;
      // if (micTableSet !== null && micTableSet !== undefined)
      // 	newSettingData.MicroscopeTableSettings = micTableSet;
      // let objSet = mergedSettings.ObjectiveSettings;
      // if (objSet !== null && objSet !== undefined)
      // 	newSettingData.ObjectiveSettings = objSet;
      // let samPosSet = mergedSettings.SamplePositioningSettings;
      // if (samPosSet !== null && samPosSet !== undefined)
      // 	newSettingData.SamplePositioningSettings = samPosSet;
      // let channels = mergedSettings.Channels;
      // if (channels !== null && channels !== undefined)
      // 	newSettingData.Channels = channels;
      // let planes = mergedSettings.Planes;
      // if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
      // let exp = mergedSettings.Experiment;
      // if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
      // let tirf = mergedSettings.TIRFSettings;
      // if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf;
      var validationSetting = validate(mergedSettings, imageSchema);
      var validatedSetting = validationSetting.valid;
      var validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
      var validatedPixels = validationPixels.valid;
      this.setState({
        setting: mergedSettings,
        settingData: {},
        validationTier: setting.ValidationTier,
        typeDimensions: typeDimensions,
        standType: standType,
        isSettingValidated: validatedSetting && validatedPixels,
        isLoadingSettings: false,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseSettingFromDroppedFile",
    value: function createOrUseSettingFromDroppedFile() {
      var imageMetadata = this.state.imageMetadata;
      var microscope = this.state.microscope;
      var modifiedSetting = this.state.setting;
      var activeTier = this.state.activeTier;

      if (activeTier !== this.state.microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedSetting.Tier = activeTier;
      }

      if (modifiedSetting.ValidationTier > activeTier) {
        modifiedSetting.ValidationTier = activeTier;
      }

      modifiedSetting.InstrumentID = microscope.ID;
      modifiedSetting.InstrumentName = microscope.Name;
      modifiedSetting = this.applyPreviousVersionModificationToSetting(modifiedSetting);
      var adaptedSchemas = this.createAdaptedSchemas(modifiedSetting.ValidationTier, this.state.standType);
      var imageSchema = adaptedSchemas[3];
      var settingsSchema = adaptedSchemas[4];
      var pixelsSchema = null;

      for (var i in settingsSchema) {
        var localSchema = settingsSchema[i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var mergedSettings = null;

      if (imageMetadata !== null && imageMetadata !== undefined) {
        var newImageMetadata = Object.assign({}, imageMetadata);
        delete newImageMetadata.ImagingEnvironment;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeTableSettings;
        delete newImageMetadata.ObjectiveSettings;
        delete newImageMetadata.SamplePositioningSettings;
        delete newImageMetadata.Channels;
        delete newImageMetadata.Planes;
        delete newImageMetadata.Experiment;
        delete newImageMetadata.TIRFSettings;
        mergedSettings = Object.assign({}, newImageMetadata, modifiedSetting);
      } else {
        mergedSettings = modifiedSetting;
      }

      var newSettingData = {};
      var imgEnv = mergedSettings.ImagingEnvironment;
      if (imgEnv !== null && imgEnv !== undefined) newSettingData.ImagingEnvironment = imgEnv;
      var micStandSet = mergedSettings.MicroscopeStandSettings;
      if (micStandSet !== null && micStandSet !== undefined) newSettingData.MicroscopeStandSettings = micStandSet;
      var micTableSet = mergedSettings.MicroscopeTableSettings;
      if (micTableSet !== null && micTableSet !== undefined) newSettingData.MicroscopeTableSettings = micTableSet;
      var objSet = mergedSettings.ObjectiveSettings;
      if (objSet !== null && objSet !== undefined) newSettingData.ObjectiveSettings = objSet;
      var samPosSet = mergedSettings.SamplePositioningSettings;
      if (samPosSet !== null && samPosSet !== undefined) newSettingData.SamplePositioningSettings = samPosSet;
      var channels = mergedSettings.Channels;
      if (channels !== null && channels !== undefined) newSettingData.Channels = channels;
      var planes = mergedSettings.Planes;
      if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
      var exp = mergedSettings.Experiment;
      if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
      var tirf = mergedSettings.TIRFSettings;
      if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf; // console.log("settingData");
      // console.log(newSettingData);
      //let linkedFields = Object.assign({}, modifiedSetting.linkedFields);

      var validationSetting = validate(mergedSettings, imageSchema);
      var validatedSetting = validationSetting.valid;
      var validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
      var validatedPixels = validationPixels.valid;
      this.setState({
        setting: mergedSettings,
        settingData: newSettingData,
        validationTier: mergedSettings.ValidationTier,
        isSettingValidated: validatedSetting && validatedPixels,
        isLoadingSettings: false,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseSettingFromSelectedFile",
    value: function createOrUseSettingFromSelectedFile() {
      var imageMetadata = this.state.imageMetadata;
      var microscope = this.state.microscope;

      if (this.props.isDebug) {
        console.log("settings");
        console.log(this.state.settings);
        console.log("settingName");
        console.log(this.state.settingName);
      }

      var setting = this.state.settings[this.state.settingName];
      var modifiedSetting = setting;
      var activeTier = this.state.activeTier;

      if (activeTier !== microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedSetting.Tier = activeTier;
      }

      if (modifiedSetting.ValidationTier > activeTier) {
        modifiedSetting.ValidationTier = activeTier;
      }

      modifiedSetting.InstrumentID = microscope.ID;
      modifiedSetting.InstrumentName = microscope.Name;
      modifiedSetting = this.applyPreviousVersionModificationToSetting(modifiedSetting);
      var adaptedSchemas = this.createAdaptedSchemas(modifiedSetting.ValidationTier, this.state.standType);
      var imageSchema = adaptedSchemas[3];
      var settingsSchema = adaptedSchemas[4]; //console.log(settingsSchema);

      var pixelsSchema = null;

      for (var i in settingsSchema) {
        var localSchema = settingsSchema[i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var mergedSettings = null;

      if (imageMetadata !== null && imageMetadata !== undefined) {
        var newImageMetadata = Object.assign({}, imageMetadata);
        delete newImageMetadata.ImagingEnvironment;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeTableSettings;
        delete newImageMetadata.ObjectiveSettings;
        delete newImageMetadata.SamplePositioningSettings;
        delete newImageMetadata.Channels;
        delete newImageMetadata.Planes;
        delete newImageMetadata.Experiment;
        delete newImageMetadata.TIRFSettings;
        mergedSettings = Object.assign({}, newImageMetadata, modifiedSetting);
      } else {
        mergedSettings = modifiedSetting;
      }

      var newSettingData = {};
      var imgEnv = mergedSettings.ImagingEnvironment;
      if (imgEnv !== null && imgEnv !== undefined) newSettingData.ImagingEnvironment = imgEnv;
      var micStandSet = mergedSettings.MicroscopeStandSettings;
      if (micStandSet !== null && micStandSet !== undefined) newSettingData.MicroscopeStandSettings = micStandSet;
      var micTableSet = mergedSettings.MicroscopeTableSettings;
      if (micTableSet !== null && micTableSet !== undefined) newSettingData.MicroscopeTableSettings = micTableSet;
      var objSet = mergedSettings.ObjectiveSettings;
      if (objSet !== null && objSet !== undefined) newSettingData.ObjectiveSettings = objSet;
      var samPosSet = mergedSettings.SamplePositioningSettings;
      if (samPosSet !== null && samPosSet !== undefined) newSettingData.SamplePositioningSettings = samPosSet;
      var channels = mergedSettings.Channels;
      if (channels !== null && channels !== undefined) newSettingData.Channels = channels;
      var planes = mergedSettings.Planes;
      if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
      var exp = mergedSettings.Experiment;
      if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
      var tirf = mergedSettings.TIRFSettings;
      if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf; //let linkedFields = Object.assign({}, modifiedMic.linkedFields);

      var validationSetting = validate(mergedSettings, imageSchema);
      var validatedSetting = validationSetting.valid;
      var validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
      var validatedPixels = validationPixels.valid;
      this.setState({
        setting: mergedSettings,
        settingData: newSettingData,
        validationTier: mergedSettings.ValidationTier,
        isSettingValidated: validatedSetting && validatedPixels,
        isLoadingSettings: false,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseSetting",
    value: function createOrUseSetting() {
      var loadingOption = this.state.loadingOption;
      var microscope = this.state.microscope;
      var setting = this.state.setting;
      var modifiedCreateString = string_createFromScratch.replace("# ", "");

      if (loadingOption !== modifiedCreateString && loadingOption !== string_createFromFile) {
        setting = this.state.settings[this.state.settingName];
      }

      if (setting !== null && setting !== undefined) {
        var micID = microscope.ID;
        var micName = microscope.Name;
        var instrumentID = setting.InstrumentID;
        var instrumentName = setting.InstrumentName;

        if (micID !== instrumentID || micName !== instrumentName) {
          if (!window.confirm("The unique ID & Name of the Microscope file you have selected do not match those that has been saved in the Settings file you are trying to load. If you continue the Microscope ID and Name stored in the Settings file will be overwritten. Are you sure?")) {
            return;
          }
        }
      }

      if (loadingOption === modifiedCreateString) {
        this.createNewSettingFromScratch();
      } else if (loadingOption === string_createFromFile) {
        this.createOrUseSettingFromDroppedFile();
      } else {
        this.createOrUseSettingFromSelectedFile();
      }
    }
  }, {
    key: "createOrUseMetadata",
    value: function createOrUseMetadata() {
      if (this.state.loadingOption === string_createFromFile) {
        this.setState({
          isLoadingImage: false,
          loadingOption: string_createFromFile,
          loadingMode: 1
        });
      } else {
        this.setState({
          isLoadingImage: false,
          imageMetadata: null,
          loadingOption: string_createFromFile,
          loadingMode: 1
        });
      }
    }
  }, {
    key: "onSpecialImporterConfirm",
    value: function onSpecialImporterConfirm() {
      this.setState({
        isSpecialImporterActive: false
      });
    }
  }, {
    key: "onSpecialImporterBack",
    value: function onSpecialImporterBack() {
      this.setState({
        isSpecialImporterActive: false,
        microscope: this.state.oldMicroscope,
        setting: this.state.oldElementData,
        elementData: this.state.oldElementData,
        settingData: this.state.oldSettingData,
        imageMetadata: this.state.oldImageMetadata
      });
    }
  }, {
    key: "onClickBack",
    value: function onClickBack(item) {
      var isCreatingNewMicroscope = null;
      var isLoadingMicroscope = null;
      var isLoadingImage = null;
      var isLoadingSettings = null;
      var schema = null;

      if (this.state.is4DNPortal) {
        isCreatingNewMicroscope = this.state.isCreatingNewMicroscope;
        isLoadingMicroscope = this.state.isLoadingMicroscope;
        isLoadingImage = this.state.isLoadingImage;
        isLoadingSettings = this.state.isLoadingSettings;
        schema = this.state.schema;
      }

      var oldMicroscope = this.state.microscope;
      var oldElementData = this.state.elementData;
      var oldSetting = this.state.setting;
      var oldSettingData = this.state.settingData;
      var oldImageMetadata = this.state.imageMetadata; //activeTier: 1,
      //validationTier: 1,

      this.setState({
        microscope: null,
        microscopes: null,
        setting: null,
        settings: null,
        isCreatingNewMicroscope: isCreatingNewMicroscope,
        isLoadingMicroscope: isLoadingMicroscope,
        isLoadingImage: isLoadingImage,
        isLoadingSettings: isLoadingSettings,
        loadingOption: null,
        micName: null,
        schema: schema,
        elementData: null,
        settingData: null,
        loadingMode: 0,
        imageMetadata: null
      });

      if (this.state.is4DNPortal) {
        if (item === "Back to list" && isDefined(this.props.onReturnToMicroscopeList)) {
          this.props.onReturnToMicroscopeList();
        } else if (item === "Import"
        /*&& isDefined(this.props.onImportFromFile*/
        ) {
            //this.props.onImportFromFile(this.uploadMicroscopeFromDropzone);
            this.setState({
              isSpecialImporterActive: true,
              loadingOption: string_createFromFile,
              loadingMode: 1,
              oldMicroscope: oldMicroscope,
              oldElementData: oldElementData,
              oldSetting: oldSetting,
              oldSettingData: oldSettingData,
              oldImageMetadata: oldImageMetadata
            });
          }
      }
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
      var oldSettingData = this.state.settingData;
      var newSettingData = Object.assign(oldSettingData, settingData);
      this.setState({
        settingData: newSettingData,
        areSettingComponentsValidated: areSettingComponentsValidated
      });
    }
  }, {
    key: "handleExportMicroscope",
    value: function handleExportMicroscope(microscope) {
      var micName = microscope.Name;
      micName = micName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(micName, ".json");
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + "application/json;charset=utf-8;" + "," + encodeURIComponent(JSON.stringify(microscope));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // complete(micName);
    }
  }, {
    key: "handleExportSetting",
    value: function handleExportSetting(setting) {
      var settingName = setting.Name;
      settingName = settingName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(settingName, ".json");
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + "application/json;charset=utf-8;" + "," + encodeURIComponent(JSON.stringify(setting));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // 	complete(settingName);
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
    }
  }, {
    key: "handleSaveMicroscope",
    value: function handleSaveMicroscope(item) {
      var validated = true;

      if (!this.state.isMicroscopeValidated) {
        validated = false;
      }

      if (!this.state.areComponentsValidated) {
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
      var microscope = Object.assign({}, this.state.microscope, {
        components: components
      });
      microscope.linkedFields = this.state.linkedFields;
      var lowerCaseItem = item.toLowerCase();

      if (lowerCaseItem.includes("as new")) {
        microscope.ID = uuidv4(); // if (
        // 	microscope.MicroscopeStand !== null &&
        // 	microscope.MicroscopeStand !== undefined
        // ) {
        // 	microscope.MicroscopeStand.ID = uuidv4();
        // }
      }

      this.setState({
        microscope: microscope
      });
      console.log(microscope);

      if (lowerCaseItem.includes("save")) {
        this.props.onSaveMicroscope(microscope, this.handleCompleteSave);
      } else if (lowerCaseItem.includes("export")) {
        this.handleExportMicroscope(microscope, this.handleCompleteExport);
      }
    }
  }, {
    key: "handleSaveSetting",
    value: function handleSaveSetting(item) {
      var validated = true;

      if (!this.state.isSettingValidated) {
        validated = false;
      }

      if (!this.state.areSettingComponentsValidated) {
        validated = false;
      }

      if (!validated) {//TODO throw warning instead of stopping validation
        //return;
      }

      var settingData = this.state.settingData; // let components = [];
      // Object.keys(settingData).forEach((item, index) => {
      // 	components[index] = settingData[item];
      // });
      //let comps = { components };

      var setting = Object.assign({}, this.state.setting, settingData);
      var lowerCaseItem = item.toLowerCase();

      if (lowerCaseItem.includes("as new")) {
        setting.ID = uuidv4();

        if (setting.Pixels !== null && setting.Pixels !== undefined) {
          setting.Pixels.ID = uuidv4();
        }
      }

      this.setState({
        setting: setting
      }); // console.log("setting");
      // console.log(setting);

      if (lowerCaseItem.includes("save")) {
        this.props.onSaveSetting(setting, this.handleCompleteSave);
      } else if (lowerCaseItem.includes("export")) {
        this.handleExportSetting(setting, this.handleCompleteExport);
      }
    }
  }, {
    key: "handleCompleteSave",
    value: function handleCompleteSave(name) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(name + " saved");
    }
  }, {
    key: "handleCompleteExport",
    value: function handleCompleteExport(name) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(name + " exported");
    }
  }, {
    key: "onMicroscopeDataSave",
    value: function onMicroscopeDataSave(id, data) {
      var oldMicroscope = this.state.microscope;
      var oldStand = oldMicroscope.MicroscopeStand;
      var newStand = Object.assign(oldStand, data[this.state.standType]);
      delete data[this.state.standType];
      var newMicroscope = Object.assign(oldMicroscope, data);
      newMicroscope.MicroscopeStand = newStand;
      this.setState({
        microscope: newMicroscope,
        isMicroscopeValidated: true
      }); //this.isMicroscopeValidated = true;
    }
  }, {
    key: "onSettingDataSave",
    value: function onSettingDataSave(id, data) {
      var oldSetting = this.state.setting;
      var oldPixels = oldSetting.Pixels;
      var newPixels = Object.assign(oldPixels, data.Pixels);
      var newSetting = Object.assign(oldSetting, data);
      newSetting.Pixels = newPixels;
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
      var imageMetadata = this.state.imageMetadata;
      this.state.experimental;
      var experimentalData = this.state.experimentalData;
      var linkedFields = this.state.linkedFields;
      var scalingFactor = this.props.scalingFactor;
      var headerFooterHeight = 80;
      width = Math.max(1100, width);
      height = Math.max(600, height - (headerFooterHeight + 10) * 2);
      var toolbarWidth = 300;

      if (this.state.isToolbarHidden) {
        toolbarWidth = 50;
      }

      var toolbarHeight = height;
      var canvasWidth = width - toolbarWidth;
      var canvasHeight = height;
      var settingsWidth = width;
      var headerFooterWidth = width; //Should i add microscopes and settings too ?

      if (!isDefined(schema) || !isDefined(this.state.dimensions) || this.state.is4DNPortal && !this.state.microscopePresetHandled) {
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(DataLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
          onClickLoadSchema: this.handleLoadSchema,
          onClickLoadDimensions: this.handleLoadDimensions,
          onClickLoadMicroscopes: this.handleLoadMicroscopes,
          onClickLoadSettings: this.handleLoadSettings,
          onClickHandleMicPreset: this.handleMicPreset,
          is4DNPortal: this.state.is4DNPortal,
          isDebug: this.props.isDebug
        }));
      }

      if (microscope === null && this.state.isCreatingNewMicroscope === null) {
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(MicroscopePreLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
          tiers: this.props.tiers,
          onClickTierSelection: this.handleActiveTierSelection,
          onClickCreateNewMicroscope: this.setCreateNewMicroscope,
          onClickLoadMicroscope: this.setLoadMicroscope,
          hasSettings: this.props.hasSettings,
          isDebug: this.props.isDebug
        }));
      } //let overlayImporter = null;


      if (this.state.is4DNPortal && (microscope === null || elementData === null)) {
        if (microscope === null || this.state.isSpecialImporterActive) {
          console.log("IM GOING THROUGH SPECIAL IMPORTER VIEW");
          var loadingOptions = [];
          loadingOptions.push(string_createFromFile);
          return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/React.createElement(MicroscopeLoader, {
            logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
            loadingOptions: loadingOptions //microscopes={microscopeNames}
            ,
            onFileDrop: this.uploadMicroscopeFromDropzone,
            loadingOption: this.state.loadingOption,
            loadingMode: this.state.loadingMode,
            onClickLoadingOptionSelection: this.handleLoadingOptionSelection //onClickMicroscopeSelection={this.selectMicroscopeFromRepository}
            ,
            onClickConfirm: this.onSpecialImporterConfirm,
            onClickBack: this.onSpecialImporterBack,
            isSettings: this.state.isLoadingMicroscope,
            schema: schema,
            isDebug: this.props.isDebug,
            imagesPath: imagesPathSVG,
            isImporter: true
          }));
        } else if (microscope !== null && elementData === null) {
          console.log("IM GOING THROUGH LOADING MICROSCOPE");
          console.log(microscope);
          var logoImg = url.resolve(imagesPathPNG, string_logo_img_micro_bk);
          var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
          var styleImageContainer = {
            width: "".concat(number_logo_width, "px"),
            height: "".concat(number_logo_height, "px")
          };
          return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              flexFlow: "column",
              width: "100%",
              height: "100%",
              alignItems: "center"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              flexFlow: "column",
              width: "100%",
              height: "100%",
              alignItems: "center"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: styleImageContainer
          }, /*#__PURE__*/React.createElement("img", {
            src: logoPath,
            alt: this.props.logoImg,
            style: {
              width: "100%",
              height: "100%",
              margin: "auto"
            },
            onLoad: this.onImgLoad
          })), /*#__PURE__*/React.createElement(Button, {
            ref: this.simulateClickLoadMicroscopeFromPortal,
            style: {
              width: "400px",
              height: "50px",
              padding: "5px",
              margin: "5px"
            },
            size: "lg",
            onClick: this.loadMicroscopeFromPortal
          }, "Loading " + microscope.Name))));
        }
      }

      if ((this.state.isCreatingNewMicroscope || this.state.isLoadingMicroscope) && (microscope === null || elementData === null)) {
        var _loadingOptions = []; //CREATE MULTIPLE ENTRIES FOR DIFFERENT MICROSCOPE

        if (!this.state.isLoadingMicroscope) {
          for (var i = 0; i < current_stands.length; i++) {
            var stand = current_stands[i];
            var name = stand.name;
            var modifiedCreateString = string_createFromScratch.replace("#", name);

            _loadingOptions.push(modifiedCreateString);
          }
        } //let loadingOptions = [string_createFromScratch, string_createFromFile];


        _loadingOptions.push(string_createFromFile);

        var microscopeNames = {};

        if (microscopes) {
          Object.keys(microscopes).forEach(function (key) {
            var mic = microscopes[key];

            if (mic.MicroscopeStand !== null && mic.MicroscopeStand !== undefined && mic.MicroscopeStand.Manufacturer !== null && mic.MicroscopeStand.Manufacturer !== undefined) {
              var catNames = microscopeNames[mic.MicroscopeStand.Manufacturer];
              if (catNames !== null && catNames !== undefined) catNames.push(key);else catNames = [key];
              microscopeNames[mic.MicroscopeStand.Manufacturer] = catNames;
            } else {
              var _catNames = microscopeNames["Others"];
              if (_catNames !== null && _catNames !== undefined) _catNames.push(key);else _catNames = [key];
              microscopeNames["Others"] = _catNames;
            }
          });
        }

        if (microscopeNames !== null && microscopeNames !== undefined && Object.keys(microscopeNames).length > 0) _loadingOptions.push(string_loadFromRepository);
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(MicroscopeLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
          loadingOptions: _loadingOptions,
          microscopes: microscopeNames,
          onFileDrop: this.uploadMicroscopeFromDropzone,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickMicroscopeSelection: this.selectMicroscopeFromRepository,
          onClickConfirm: this.createOrUseMicroscope,
          onClickBack: this.onClickBack,
          isSettings: this.state.isLoadingMicroscope,
          schema: this.state.schema,
          isDebug: this.props.isDebug,
          imagesPath: imagesPathSVG
        }));
      }

      if (!this.state.isCreatingNewMicroscope && this.state.isLoadingImage && this.props.onLoadMetadata !== null && this.props.onLoadMetadata !== undefined) {
        //console.log("IMAGE LOADER");
        //let modifiedCreateString = string_createFromScratch.replace("# ", "");
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(ImageLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
          loadingOptions: [string_noImageLoad, string_createFromFile],
          onLoadMetadata: this.props.onLoadMetadata,
          handleLoadMetadataComplete: this.handleLoadMetadataComplete,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickConfirm: this.createOrUseMetadata,
          onClickBack: this.onClickBack,
          isDebug: this.props.isDebug,
          imagesPath: imagesPathSVG
        }));
      } //should be settingData instead of elementData


      if (!this.state.isCreatingNewMicroscope && this.state.isLoadingSettings) {
        //console.log("SETTINGS LOADER");
        var _modifiedCreateString = string_createFromScratch.replace("# ", "");

        var _loadingOptions3 = [_modifiedCreateString, string_createFromFile];
        var settingsNames = [];

        if (settings) {
          var mic_ID = microscope.ID;
          Object.keys(settings).forEach(function (key) {
            var sett = settings[key];
            var sett_ID = sett.InstrumentID;

            if (sett_ID === mic_ID) {
              settingsNames.push(key);
            }
          });
        }

        if (settingsNames !== null && settingsNames !== undefined && Object.keys(settingsNames).length > 0) _loadingOptions3.push(string_loadFromRepository);
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(SettingLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
          loadingOptions: _loadingOptions3,
          settings: settingsNames,
          onFileDrop: this.uploadSettingFromDropzone,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickSettingsSelection: this.selectSettingFromRepository,
          onClickConfirm: this.createOrUseSetting,
          onClickBack: this.onClickBack,
          schema: this.state.schema,
          isDebug: this.props.isDebug,
          imagesPath: imagesPathSVG
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
      var pixelsSchema = null;

      for (var _i in settingsSchema) {
        var localSchema = settingsSchema[_i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var footerMicroscopeInput = [microscope, microscope.MicroscopeStand];
      var comps = {};

      for (var _i2 in componentsSchema) {
        var _localSchema = componentsSchema[_i2];
        comps[_localSchema.ID] = _localSchema;
      } // console.log("elementData");
      // console.log(elementData);
      // console.log("componentsSchema");
      // console.log(componentsSchema);


      var elementByType = {};
      Object.keys(elementData).forEach(function (key) {
        var element = elementData[key]; // console.log("element");
        // console.log(element);

        var schemaID = element.Schema_ID.replace(string_json_ext, "");
        var itemSchema = comps[element.Schema_ID]; // if (itemSchema === null || itemSchema === undefined)
        // 	console.log(element);

        var schemaCategory = itemSchema.category;

        if (elementByType[schemaID] === undefined || elementByType[schemaID] === null) {
          elementByType[schemaID] = {};
        }

        if (elementByType[schemaCategory] === undefined || elementByType[schemaCategory] === null) {
          elementByType[schemaCategory] = {};
        }

        elementByType[schemaID][element.ID] = element.Name;
        elementByType[schemaCategory][element.ID] = element.Name;
      });

      if (!this.state.isCreatingNewMicroscope) {
        var _React$createElement;

        var footerSettingsSchemas = [imageSchema, pixelsSchema];
        var footerSettingsInput = [setting, setting.Pixels]; //{overlayImporter}

        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(Header, (_React$createElement = {
          dimensions: headerFooterDims,
          logoImg: url.resolve(imagesPathPNG, string_logo_img_no_bk),
          isDebug: this.props.isDebug,
          isSchemaValidated: this.state.isSettingValidated,
          onFormConfirm: this.onSettingDataSave,
          onClickChangeValidation: this.createAdaptedSchemas,
          inputData: footerSettingsInput,
          element: "image settings",
          formTitle: setting.Name,
          activeTier: this.state.activeTier,
          validationTier: this.state.validationTier,
          componentSchemas: componentsSchema,
          schema: footerSettingsSchemas
        }, _defineProperty(_React$createElement, "inputData", footerSettingsInput), _defineProperty(_React$createElement, "elementByType", elementByType), _defineProperty(_React$createElement, "is4DNPortal", this.state.is4DNPortal), _defineProperty(_React$createElement, "overlaysContainer", this.overlaysContainerRef.current), _React$createElement)), /*#__PURE__*/React.createElement(SettingsMainView, {
          microscope: microscope,
          microscopeComponents: elementData,
          activeTier: this.state.activeTier,
          ref: this.settingsMainViewRef,
          imagesPath: imagesPathSVG,
          settingSchemas: settingsSchema,
          experimentalSchemas: experimentalSchema,
          componentSchemas: componentsSchema,
          setting: setting,
          settingData: settingData,
          imageMetadata: imageMetadata,
          experimentalData: experimentalData,
          componentData: elementData,
          linkedFields: linkedFields,
          updateSettingData: this.updateSettingData,
          updateLinkedFields: this.updateLinkedFields,
          overlaysContainer: this.overlaysContainerRef.current,
          areComponentsValidated: this.state.areComponentsValidated,
          dimensions: {
            width: settingsWidth,
            height: canvasHeight
          },
          containerOffsetTop: this.props.containerOffsetTop,
          containerOffsetLeft: this.props.containerOffsetLeft,
          headerOffset: headerOffset,
          isDebug: this.props.isDebug,
          hasAdvanced: this.props.hasAdvanced,
          hasExperimental: this.props.hasExperimental
        }), /*#__PURE__*/React.createElement(Footer, {
          onClickSave: this.handleSaveSetting,
          onClickBack: this.onClickBack,
          hasSaveOption: this.props.onSaveSetting ? true : false,
          overlaysContainer: this.overlaysContainerRef.current,
          dimensions: headerFooterDims,
          element: "image settings",
          imagesPath: imagesPathSVG,
          is4DNPortal: this.state.is4DNPortal,
          hasImport: this.state.hasImport,
          isDebug: this.props.isDebug
        }));
      } else {
        if (this.state.isViewOnly) {
          canvasDims = {
            width: width,
            height: canvasHeight + headerFooterHeight
          };
          return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/React.createElement(Header, {
            dimensions: headerFooterDims,
            logoImg: url.resolve(imagesPathPNG, string_logo_img_no_bk),
            isDebug: this.props.isDebug
          }), /*#__PURE__*/React.createElement("div", {
            style: style
          }, /*#__PURE__*/React.createElement(Canvas, {
            microscope: microscope,
            stand: microscope.MicroscopeStand,
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
            isViewOnly: this.state.isViewOnly,
            isDebug: this.props.isDebug
          })));
        } else {
          var _React$createElement2;

          //{overlayImporter}
          return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/React.createElement(Header, (_React$createElement2 = {
            dimensions: headerFooterDims,
            logoImg: url.resolve(imagesPathPNG, string_logo_img_no_bk),
            isDebug: this.props.isDebug,
            isSchemaValidated: this.state.isMicroscopeValidated,
            onFormConfirm: this.onMicroscopeDataSave,
            onClickChangeValidation: this.createAdaptedSchemas,
            inputData: footerMicroscopeInput,
            element: "microscope",
            formTitle: microscope.Name,
            activeTier: this.state.activeTier,
            validationTier: this.state.validationTier,
            componentSchemas: componentsSchema,
            schema: [microscopeSchema, microscopeStandSchema]
          }, _defineProperty(_React$createElement2, "inputData", footerMicroscopeInput), _defineProperty(_React$createElement2, "elementByType", elementByType), _defineProperty(_React$createElement2, "is4DNPortal", this.state.is4DNPortal), _defineProperty(_React$createElement2, "overlaysContainer", this.overlaysContainerRef.current), _React$createElement2)), /*#__PURE__*/React.createElement("div", {
            style: style
          }, /*#__PURE__*/React.createElement(Canvas, {
            microscope: microscope,
            stand: microscope.MicroscopeStand,
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
            isDebug: this.props.isDebug
          }), /*#__PURE__*/React.createElement(Toolbar, {
            activeTier: this.state.activeTier,
            ref: this.toolbarRef,
            imagesPath: imagesPathSVG,
            componentSchemas: componentsSchema,
            dimensions: toolbarDims,
            scalingFactor: scalingFactor,
            onHideToolbar: this.onHideToolbar,
            isToolbarHidden: this.state.isToolbarHidden,
            isDebug: this.props.isDebug
          })), /*#__PURE__*/React.createElement(Footer, {
            onClickSave: this.handleSaveMicroscope,
            onClickBack: this.onClickBack,
            hasSaveOption: this.props.onSaveMicroscope ? true : false,
            overlaysContainer: this.overlaysContainerRef.current,
            dimensions: headerFooterDims,
            imagesPath: imagesPathSVG,
            is4DNPortal: this.state.is4DNPortal,
            hasImport: this.state.hasImport,
            isDebug: this.props.isDebug,
            element: "microscope"
          }));
        }
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps() {
      // if (props.schema !== state.schema && isDefined(props.schema)) {
      // 	return { schema: props.schema };
      // }
      // if (
      // 	props.microscope !== state.microscope &&
      // 	props.microscope !== state.oldMicroscope &&
      // 	isDefined(props.microscope)
      // ) {
      // 	return { microscope: props.microscope };
      // }
      // if (
      // 	props.setting !== state.setting &&
      // 	props.setting !== state.oldSetting &&
      // 	isDefined(props.setting)
      // ) {
      // 	return { setting: props.setting };
      // }
      // if (
      // 	props.imageMetadata !== state.imageMetadata &&
      // 	props.imageMetadata !== state.oldImageMetadata &&
      // 	isDefined(props.imageMetadata)
      // ) {
      // 	return { imageMetadata: props.imageMetadata };
      // }
      // if (
      // 	props.microscopes !== state.microscopes &&
      // 	isDefined(props.microscopes)
      // ) {
      // 	return { microscopes: props.microscopes };
      // }
      // if (props.settings !== state.settings && isDefined(props.settings)) {
      // 	return { settings: props.settings };
      // }
      return null;
    }
  }, {
    key: "checkScalingFactorAndRescaleIfNeeded",
    value: function checkScalingFactorAndRescaleIfNeeded(modifiedMic, elementData, scalingFactor) {
      //console.log("checkScalingFactorAndRescaleIfNeeded");
      var micScalingFactor = 1;

      if (isDefined(modifiedMic.ScalingFactor)) {
        micScalingFactor = modifiedMic.ScalingFactor;
      } else {
        modifiedMic.ScalingFactor = micScalingFactor;
      }

      if (micScalingFactor === scalingFactor) {
        return;
      }

      var reverseScale = 1 / micScalingFactor;
      var newScalingFactor = reverseScale * scalingFactor;
      console.log("rescale from " + micScalingFactor + " to " + scalingFactor + " newScalingFactor: " + newScalingFactor);
      modifiedMic.ScalingFactor = scalingFactor; //console.log("SC: " + newScalingFactor);

      for (var key in elementData) {
        var offY = 0;
        var offX = 0;
        var element = elementData[key];

        if (isDefined(element.OccupiedSpot)) {
          offY -= number_canvas_element_icons_height * (1 - newScalingFactor);
        } else {
          offY -= 5 * scalingFactor;
          offX -= 5 * scalingFactor;
        }

        offY -= number_canvas_element_offset_default * (1 - newScalingFactor);
        element.Width *= newScalingFactor;
        element.Height *= newScalingFactor;
        element.PositionX = element.PositionX * newScalingFactor + offX;
        element.PositionY = element.PositionY * newScalingFactor + offY;
      }
    }
  }, {
    key: "applyPreviousAppVersionModificationToObj",
    value: function applyPreviousAppVersionModificationToObj(originalObj, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2) {
      var objSchemaID = originalObj.Schema_ID;

      if (objSchemaID === null || objSchemaID === undefined) {
        //NO SCHEMA CASE IN SETTINGS
        return originalObj;
      }

      var obj = Object.assign({}, originalObj);
      var objSchema = objSchemas[objSchemaID];

      if (objSchema === undefined || objSchema === null) {
        objSchema = objSchemas2[objSchemaID];
      }

      if (objSchema !== undefined && objSchema !== null) {
        if (isAddModelVersion || isUpdateModelVersion) {
          if (isAddModelVersion && obj.Version !== null && obj.Version !== undefined) {
            obj.ModelVersion = obj.Version;
            delete obj.Version;
          } else {
            obj.ModelVersion = objSchema.modelVersion;
          }
        }

        if (isAddExtDomCat) {
          obj.Extension = objSchema.extension;
          obj.Domain = objSchema.domain;
          obj.Category = objSchema.category;
        }

        for (var i = 0; i < fieldsToDelete.length; i++) {
          var toDelete = fieldsToDelete[i];
          var key = toDelete.key;
          var field = toDelete.field;
          if (objSchema.title !== key && objSchema.category !== key) continue;
          delete obj[field];
        }

        for (var _i3 = 0; _i3 < fieldsToNameChange.length; _i3++) {
          var toNameChange = fieldsToNameChange[_i3];
          var _key2 = toNameChange.key;
          var _field = toNameChange.field;
          var newField = toNameChange.newField;
          if (objSchema.title !== _key2 && objSchema.category !== _key2) continue;
          var fieldValue = obj[_field];

          if (fieldValue !== null && fieldValue !== undefined) {
            obj[newField] = fieldValue;
            delete obj[_field];
          }
        }

        if (obj.LightPath !== null && obj.LightPath !== undefined) {
          var newLightPath = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj.LightPath, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);
          obj.LightPath = newLightPath;
        }

        if (obj.ComponentSettings !== null && obj.ComponentSettings !== undefined) {
          var compSettings = obj.ComponentSettings;

          if (compSettings.LightSource !== null && compSettings.LightSource !== undefined) {
            var sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.LightSource, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);
            compSettings.LightSource = sett;
          }

          if (compSettings.CouplingLens !== null && compSettings.CouplingLens !== undefined) {
            var _sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.CouplingLens, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.CouplingLens = _sett;
          }

          if (compSettings.LightSourceCoupling !== null && compSettings.LightSourceCoupling !== undefined) {
            var _sett2 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.LightSourceCoupling, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.LightSourceCoupling = _sett2;
          }

          if (compSettings.ExcitationFilter !== null && compSettings.ExcitationFilter !== undefined) {
            var _sett3 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.ExcitationFilter, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.ExcitationFilter = _sett3;
          }

          if (compSettings.Dichroic !== null && compSettings.Dichroic !== undefined) {
            var _sett4 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.Dichroic, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.Dichroic = _sett4;
          }

          if (compSettings.EmissionFilter !== null && compSettings.EmissionFilter !== undefined) {
            var _sett5 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.EmissionFilter, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.EmissionFilter = _sett5;
          }

          if (compSettings.RelayLens !== null && compSettings.RelayLens !== undefined) {
            var _sett6 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.RelayLens, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.RelayLens = _sett6;
          }

          if (compSettings.Detector !== null && compSettings.Detector !== undefined) {
            var _sett7 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.Detector, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.Detector = _sett7;
          }

          if (compSettings.AdditionalSlot_1 !== null && compSettings.AdditionalSlot_1 !== undefined) {
            var setts = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_1, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);
            compSettings.AdditionalSlot_1 = setts;
          }

          if (compSettings.AdditionalSlot_2 !== null && compSettings.AdditionalSlot_2 !== undefined) {
            var _setts = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_2, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_2 = _setts;
          }

          if (compSettings.AdditionalSlot_3 !== null && compSettings.AdditionalSlot_3 !== undefined) {
            var _setts2 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_3, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_3 = _setts2;
          }

          if (compSettings.AdditionalSlot_4 !== null && compSettings.AdditionalSlot_4 !== undefined) {
            var _setts3 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_4, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_4 = _setts3;
          }

          if (compSettings.AdditionalSlot_5 !== null && compSettings.AdditionalSlot_5 !== undefined) {
            var _setts4 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_5, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_5 = _setts4;
          }

          if (compSettings.AdditionalSlot_6 !== null && compSettings.AdditionalSlot_6 !== undefined) {
            var _setts5 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_6, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_6 = _setts5;
          }

          if (compSettings.AdditionalSlot_7 !== null && compSettings.AdditionalSlot_7 !== undefined) {
            var _setts6 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_7, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_7 = _setts6;
          }

          if (compSettings.AdditionalSlot_8 !== null && compSettings.AdditionalSlot_8 !== undefined) {
            var _setts7 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_8, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_8 = _setts7;
          }
        }

        if (obj.Fluorophore !== null && obj.Fluorophore !== undefined) {
          var newFluorophore = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj.Fluorophore, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);
          obj.Fluorophore = newFluorophore;
        }

        if (obj.ImmersionLiquid !== null && obj.ImmersionLiquid !== undefined) {
          var newImmersionLiquid = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj.ImmersionLiquid, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);
          obj.ImmersionLiquid = newImmersionLiquid;
        }
      } else {
        console.log("Error: applyPreviousAppVersionModificationToObj : schema not found for " + objSchemaID);
      }

      return obj;
    }
  }, {
    key: "applyPreviousAppVersionModificationToArray",
    value: function applyPreviousAppVersionModificationToArray(originalArray, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2) {
      var newArray = [];

      for (var i = 0; i < originalArray.length; i++) {
        var obj = originalArray[i];
        var newObj = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj, isUpdateModelVersion, isAddModelVersion, isAddExtDomCat, fieldsToDelete, fieldsToNameChange, objSchemas, objSchemas2);
        newArray[i] = newObj;
      }

      return newArray;
    }
  }]);

  return MicroMetaAppReact;
}(React.PureComponent);

export { MicroMetaAppReact as default };

var MicroMetaAppReactContainer = /*#__PURE__*/function (_React$PureComponent2) {
  _inherits(MicroMetaAppReactContainer, _React$PureComponent2);

  var _super2 = _createSuper(MicroMetaAppReactContainer);

  function MicroMetaAppReactContainer() {
    _classCallCheck(this, MicroMetaAppReactContainer);

    return _super2.apply(this, arguments);
  }

  _createClass(MicroMetaAppReactContainer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          height = _this$props2.height,
          width = _this$props2.width,
          forwardedRef = _this$props2.forwardedRef;
      // border-box allows element to account for padding and border
      // when calculating/using `height` and `width` style properties.
      return /*#__PURE__*/React.createElement("div", {
        id: "microscopy-app-container",
        style: {
          height: height,
          width: width,
          boxSizing: "border-box"
        }
      }, this.props.children, /*#__PURE__*/React.createElement("div", {
        id: "microscopy-app-overlays-container",
        ref: forwardedRef
      }));
    }
  }]);

  return MicroMetaAppReactContainer;
}(React.PureComponent);

MicroMetaAppReact.propTypes = {
  //TODO need to be added here and in all subclasses
  height: PropTypes.number,
  width: PropTypes.number,
  schema: PropTypes.arrayOf(PropTypes.object),
  microscopes: PropTypes.object,
  microscope: PropTypes.object
};
MicroMetaAppReact.defaultProps = {
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
  tiers: ["1", "2", "3"],
  containerOffsetTop: 0,
  containerOffsetLeft: 0,
  scalingFactor: 1,
  isDebug: false,
  hasSettings: false,
  hasAdvancedModel: false,
  hasExperimentalModel: false,
  onLoadDimensions: function onLoadDimensions(complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    });
  },
  onLoadSchema: function onLoadSchema(complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    });
  },
  onLoadMicroscopes: function onLoadMicroscopes(complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    });
  },
  onLoadSettings: function onLoadSettings(complete, resolve) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null, resolve);
    });
  },
  onSaveMicroscope: function onSaveMicroscope(microscope, complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(microscope.Name);
    });
  },
  onSaveSetting: function onSaveSetting(setting, complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(setting.Name);
    });
  }
};

var createApi = function (context) {
  var self = context;
  return {
    "public": {
      // saveMicroscope(){
      // 	self.handleSaveMicroscope("Save microscope");
      // },
      exportMicroscopeConfString: function exportMicroscopeConfString() {
        var elementData = self.state.elementData;
        var components = [];
        Object.keys(elementData).forEach(function (item, index) {
          components[index] = elementData[item];
        });
        var microscope = Object.assign(self.state.microscope, {
          components: components
        });
        microscope.linkedFields = self.state.linkedFields;
        return JSON.stringify(microscope, null, 2);
      },
      updateMicroscopeDescription: function updateMicroscopeDescription(description) {
        var newMicroscope = Object.assign(self.state.microscope, {
          "Description": description || ""
        });
        this.setState({
          microscope: newMicroscope
        });
      },
      validateMicroscope: function validateMicroscope(microscope, schemas, checkForMicroscopeStand) {
        return _validateMicroscope(microscope, schemas, checkForMicroscopeStand);
      }
    }
  };
};

export var AppVersion = appVersion;