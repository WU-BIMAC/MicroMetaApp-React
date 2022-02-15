"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _settingComponentSelector = _interopRequireDefault(require("./settingComponentSelector"));

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));

var _planeView = _interopRequireDefault(require("./planeView"));

var _channelView = _interopRequireDefault(require("./channelView"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _uuid = require("uuid");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var validate = require("jsonschema").validate;

var schemas = ["Experiment.json", "Plane.json", "Channel.json", "TIRFSettings.json", //TIRFHardwareModule
"ImagingEnvironment.json", //EnvironmentalControlDevice
"MicroscopeStandSettings.json", //InvertedMicroscopeStand, UprightMicroscopeStand
"ObjectiveSettings.json", //Objective
"SamplePositioningSettings.json", //Z-Drive, TurretObjectiveFocusing, IndividualObjectiveFocusing, MechanicalStage, PiezoElectricStage
"MicroscopeTableSettings.json" //MicroscopeTable
];
var elements = ["exp", "planes", "channels", "tirfSettings", "imgEnv", "micSettings", "objSettings", "samplePosSettings", "micTableSettings"];
var categories = [[], [], [], ["TIRFHardwareModule"], ["EnvironmentalControlDevice"], ["InvertedMicroscopeStand", "UprightMicroscopeStand"], ["Objective"], ["Z-Drive", "TurretObjectiveFocusing", "IndividualObjectiveFocusing", "MechanicalStage", "PiezoElectricStage"], ["MicroscopeTable"]];

var SettingMainView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(SettingMainView, _React$PureComponent);

  var _super = _createSuper(SettingMainView);

  function SettingMainView(props) {
    var _this;

    _classCallCheck(this, SettingMainView);

    _this = _super.call(this, props);
    _this.state = {
      // elementList: [],
      // elementData: Object.assign({}, this.props.settingData),
      // componentsSchema: {},
      // experimentalSchema: {},
      editingElement: -1,
      experiment: props.settingData.Experiment,
      planes: props.settingData.Planes || [],
      channels: props.settingData.Channels || [],
      TIRFSettings: props.settingData.TIRFSettings || [],
      imagingEnv: props.settingData.ImagingEnvironment || [],
      micSettings: props.settingData.MicroscopeStandSettings,
      objSettings: props.settingData.ObjectiveSettings,
      samplePosSettings: props.settingData.SamplePositioningSettings || [],
      micTableSettings: props.settingData.MicroscopeTableSettings || [],
      settingSchemas: {},
      experimentalSchemas: {},
      componentSchemas: {},
      objective: null
    };
    var settingData = {};

    if (props.settingData !== undefined && props.settingData !== null) {
      Object.keys(props.settingData).forEach(function (settIndex) {
        var sett = props.settingData[settIndex];
        var schema_id = sett.Schema_ID;

        if (schema_id === "ObjectiveSettings.json") {
          _this.state.objSettings = sett;
          var compID = sett.Component_ID;
          Object.keys(_this.props.microscopeComponents).forEach(function (key) {
            var element = _this.props.microscopeComponents[key];
            if (element.ID === compID) _this.state.objective = element;
          });
        }
      });
    }

    if (props.settingSchemas !== undefined && props.settingSchemas !== null) {
      Object.keys(props.settingSchemas).forEach(function (schemaIndex) {
        var uuid = (0, _uuid.v4)();
        var schema = props.settingSchemas[schemaIndex];
        var schema_id = schema.ID;
        _this.state.settingSchemas[schema_id] = schema;

        if (schema_id === "MicroscopeStandSettings.json") {
          if (_this.state.micSettings === null || _this.state.micSettings === undefined) {
            var newElement = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              ModelVersion: schema.modelVersion,
              Extension: schema.extension,
              Domain: schema.domain,
              Category: schema.category
            };
            _this.state.micSettings = newElement;
            settingData.MicroscopeStandSettings = newElement;
          }
        }
      });
    }

    if (props.experimentalSchemas !== undefined && props.experimentalSchemas !== null) {
      Object.keys(props.experimentalSchemas).forEach(function (schemaIndex) {
        var uuid = (0, _uuid.v4)();
        var schema = props.experimentalSchemas[schemaIndex];
        var schema_id = schema.ID;
        _this.state.experimentalSchemas[schema_id] = schema;

        if (schema_id === "Experiment.json" && _this.props.hasExperimentalModel) {
          if (_this.state.experiment === null || _this.state.experiment === undefined) {
            var newElement = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              ModelVersion: schema.modelVersion,
              Extension: schema.extension,
              Domain: schema.domain,
              Category: schema.category
            };
            _this.state.experiment = newElement;
            settingData.Experiment = newElement;
          }
        }
      });
    }

    if (props.componentSchemas !== undefined && props.componentSchemas !== null) {
      Object.keys(props.componentSchemas).forEach(function (schemaIndex) {
        var schema = props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;
        _this.state.componentSchemas[schema_id] = schema;
      });
    }

    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onClickEditSettings = _this.onClickEditSettings.bind(_assertThisInitialized(_this));

    _this.props.updateSettingData(settingData, true);

    return _this;
  }

  _createClass(SettingMainView, [{
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      var _this2 = this;

      var settingData = {};

      if (id === elements.indexOf("exp")) {
        var oldExperiment = Object.assign({}, this.state.experiment);
        var newExperiment = Object.assign(oldExperiment, data);
        settingData.Experiment = newExperiment;
        this.setState({
          editingElement: -1,
          experiment: newExperiment
        });
      } else if (id === elements.indexOf("planes")) {
        settingData.Planes = data;
        this.setState({
          editingElement: -1,
          planes: data
        });
      } else if (id === elements.indexOf("channels")) {
        settingData.Channels = data;
        this.setState({
          editingElement: -1,
          channels: data
        });
      } else if (id === elements.indexOf("tirfSettings")) {
        settingData.TIRFSettings = data;
        this.setState({
          editingElement: -1,
          TIRFSettings: data
        });
      } else if (id === elements.indexOf("imgEnv")) {
        settingData.ImagingEnvironment = data;
        this.setState({
          editingElement: -1,
          imagingEnv: data
        });
      } else if (id === elements.indexOf("micSettings")) {
        var newMicSettings = {};

        if (Object.keys(data).length > 0) {
          var oldMicSettings = Object.assign({}, this.state.micSettings);
          newMicSettings = Object.assign(oldMicSettings, data);
          settingData.MicroscopeStandSettings = newMicSettings;
        }

        this.setState({
          editingElement: -1,
          micSettings: newMicSettings
        });
      } else if (id === elements.indexOf("objSettings")) {
        var newObjSettings = {};
        var objective = null;
        console.log("data");
        console.log(data);

        if (Object.keys(data).length > 0) {
          var oldObjSettings = this.state.objSettings;

          if (oldObjSettings !== null && oldObjSettings !== undefined) {
            var _oldObjSettings = Object.assign({}, _oldObjSettings);

            newObjSettings = Object.assign(_oldObjSettings, data);

            if (_oldObjSettings.ImmersionLiquid !== null && _oldObjSettings.ImmersionLiquid !== undefined) {
              var oldImmersionLiquid = Object.assign({}, _oldObjSettings.ImmersionLiquid);
              var newImmersionLiquid = Object.assign(oldImmersionLiquid, data.ImmersionLiquid);
              newObjSettings.ImmersionLiquid = newImmersionLiquid;
            }
          } else {
            newObjSettings = data;
          }

          var compID = data.Component_ID;
          Object.keys(this.props.microscopeComponents).forEach(function (key) {
            var element = _this2.props.microscopeComponents[key];
            if (element.ID === compID) objective = element;
          });
        }

        settingData.ObjectiveSettings = newObjSettings;
        this.setState({
          editingElement: -1,
          objSettings: newObjSettings,
          objective: objective
        });
      } else if (id === elements.indexOf("samplePosSettings")) {
        settingData.SamplePositioningSettings = data;
        this.setState({
          editingElement: -1,
          samplePosSettings: data
        });
      } else if (id === elements.indexOf("micTableSettings")) {
        settingData.MicroscopeTableSettings = data;
        this.setState({
          editingElement: -1,
          micTableSettings: data
        });
      }

      this.props.updateSettingData(settingData, true);
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      this.setState({
        editingElement: -1
      });
    }
  }, {
    key: "onClickEditSettings",
    value: function onClickEditSettings(editingElement) {
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var elementByType = {};
      var componentSchemas = this.state.componentSchemas;
      Object.keys(this.props.microscopeComponents).forEach(function (key) {
        var element = _this3.props.microscopeComponents[key];
        var schemaID = element.Schema_ID.replace(_constants.string_json_ext, "");
        var itemSchema = componentSchemas[element.Schema_ID];
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
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var containerStyle = {
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      };
      var styleMainContainer = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexWap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px"
      };
      var editingElement = this.state.editingElement;

      if (editingElement !== -1) {
        //let element = this.state.elementList[editingElement];
        if (this.props.isDebug) {//TODO debug stuff
        }

        var obj = null;
        var schema_id = schemas[editingElement];
        var schema = null;
        var category = null;

        if (editingElement === elements.indexOf("exp")) {
          obj = this.state.experiment;
          schema = this.state.experimentalSchemas[schema_id];
        } else {
          if (editingElement === elements.indexOf("objSettings")) {
            obj = this.state.objSettings;
            schema = [];
            schema.push(this.state.settingSchemas[schema_id]);
            schema.push(this.state.experimentalSchemas["ImmersionLiquid.json"]);
          } else {
            if (editingElement === elements.indexOf("planes")) {
              obj = this.state.planes;
            } else if (editingElement === elements.indexOf("channels")) {
              obj = this.state.channels;
            } else if (editingElement === elements.indexOf("tirfSettings")) {
              obj = this.state.TIRFSettings;
            } else if (editingElement === elements.indexOf("imgEnv")) {
              obj = this.state.imagingEnv;
            } else if (editingElement === elements.indexOf("micSettings")) {
              obj = this.state.micSettings;
            } else if (editingElement === elements.indexOf("samplePosSettings")) {
              obj = this.state.samplePosSettings;
            } else if (editingElement === elements.indexOf("micTableSettings")) {
              obj = this.state.micTableSettings;
            }

            schema = this.state.settingSchemas[schema_id];
          }

          category = categories[editingElement];
        }

        if (editingElement == elements.indexOf("planes")) {
          return /*#__PURE__*/_react.default.createElement("div", {
            style: containerStyle
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleMainContainer
          }, /*#__PURE__*/_react.default.createElement(_planeView.default, {
            schema: schema,
            inputData: obj,
            imageMetadata: this.props.imageMetadata,
            id: editingElement,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            isDebug: this.props.isDebug
          })));
        } else if (editingElement == elements.indexOf("channels")) {
          return /*#__PURE__*/_react.default.createElement("div", {
            style: containerStyle
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleMainContainer
          }, /*#__PURE__*/_react.default.createElement(_channelView.default, {
            settingSchemas: this.props.settingSchemas,
            componentSchemas: this.props.componentSchemas,
            experimentalSchemas: this.props.experimentalSchemas,
            schema: schema,
            inputData: obj,
            imageMetadata: this.props.imageMetadata,
            id: editingElement,
            imagesPath: this.props.imagesPath,
            settingData: this.props.settingData,
            componentData: this.props.componentData,
            linkedFields: this.props.linkedFields,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            elementByType: elementByType,
            containerOffsetTop: this.props.containerOffsetTop,
            containerOffsetLeft: this.props.containerOffsetLeft,
            headerOffset: this.props.headerOffset,
            objective: this.state.objective,
            objectiveSettings: this.state.objSettings,
            isDebug: this.props.isDebug
          })));
        } else if (editingElement == elements.indexOf("imgEnv") || editingElement == elements.indexOf("tirfSettings") || editingElement == elements.indexOf("objSettings") || editingElement == elements.indexOf("samplePosSettings") || editingElement == elements.indexOf("micTableSettings")) {
          var maxNumberElement = -1;

          if (editingElement == elements.indexOf("objSettings")) {
            maxNumberElement = 1;
          }

          return /*#__PURE__*/_react.default.createElement("div", {
            style: containerStyle
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleMainContainer
          }, /*#__PURE__*/_react.default.createElement(_settingComponentSelector.default, {
            settingSchemas: this.props.settingSchemas,
            componentSchemas: this.props.componentSchemas,
            experimentalSchemas: this.props.experimentalSchemas,
            schema: schema,
            inputData: obj,
            imageMetadata: this.props.imageMetadata,
            id: editingElement,
            category: category,
            imagesPath: this.props.imagesPath,
            settingData: this.props.settingData,
            componentData: this.props.componentData,
            linkedFields: this.props.linkedFields,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            elementByType: elementByType,
            maxNumberElement: maxNumberElement,
            isDebug: this.props.isDebug
          })));
        } else {
          return /*#__PURE__*/_react.default.createElement("div", {
            style: containerStyle
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleMainContainer
          }, /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
            settings: this.props.settingSchemas,
            schema: schema,
            inputData: obj,
            id: editingElement,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
            elementByType: elementByType,
            editable: true,
            isDebug: this.props.isDebug
          })));
        }
      } else {
        var styleButton = {
          width: "500px",
          minWidth: "500px",
          height: "50px",
          minHeight: "50px",
          margin: "5px" // marginLeft: "5px",
          // marginRight: "5px",

        };
        var infoStyle = {
          position: "absolute",
          left: "10px",
          top: "90px"
        };
        var styleValidation = {
          position: "absolute",
          verticalAlign: "middle",
          fontWeight: "bold",
          textAlign: "center"
        };
        var styleValidated = Object.assign({}, styleValidation, {
          color: "green"
        });
        var styleNotValidated = Object.assign({}, styleValidation, {
          color: "red"
        });

        var isValid = /*#__PURE__*/_react.default.createElement("div", {
          style: styleValidated
        }, "\u25CF");

        var isInvalid = /*#__PURE__*/_react.default.createElement("div", {
          style: styleNotValidated
        }, "\u25CF");

        var buttons = [];
        var _category = null;
        var disabled = false;
        var settingsInfo = [];
        var localSettingInfo = this.props.setting; //console.log("localSettingInfo");
        //console.log(localSettingInfo);

        if (localSettingInfo !== null && localSettingInfo !== undefined) {
          if (localSettingInfo.Name !== undefined && localSettingInfo.Name !== null) {
            settingsInfo.push("Image Name: ".concat(localSettingInfo.Name));
            settingsInfo.push( /*#__PURE__*/_react.default.createElement("br", {
              key: "newline-1"
            }));
          }

          if (localSettingInfo.Pixels !== undefined && localSettingInfo.Pixels !== null) {
            var pixels = localSettingInfo.Pixels;

            if (pixels.SizeX !== null && pixels.SizeX !== undefined && pixels.SizeY !== null && pixels.SizeY !== undefined) {
              settingsInfo.push("Dimensions (XY): ".concat(pixels.SizeX, " x ").concat(pixels.SizeY));
              settingsInfo.push( /*#__PURE__*/_react.default.createElement("br", {
                key: "newline-2"
              }));
            }

            if (pixels.SizeC !== null && pixels.SizeC !== undefined && pixels.SizeT !== null && pixels.SizeT !== undefined && pixels.SizeZ !== null && pixels.SizeZ !== undefined) {
              settingsInfo.push("Dimensions (CTZ): ".concat(pixels.SizeC, " x ").concat(pixels.SizeT, " x ").concat(pixels.SizeZ));
              settingsInfo.push( /*#__PURE__*/_react.default.createElement("br", {
                key: "newline-3"
              }));
            }
          }
        } //console.log("settingsInfo");
        //console.log(settingsInfo);


        var index = elements.indexOf("exp");
        var _schema_id = schemas[index];
        var object = this.state.experiment;
        var _schema = this.state.experimentalSchemas[_schema_id];
        var schemaHasProp = false;
        if (_schema !== null && _schema !== undefined) schemaHasProp = Object.keys(_schema.properties).length > 0;
        var validation = null;
        var validated = null;
        var valid = null;

        if (this.props.hasExperimentalModel) {
          validated = false;

          if (object !== null && object !== undefined && schemaHasProp) {
            validation = validate(object, _schema);
            validated = validation.valid;
          }

          if (object !== null && object !== undefined && object.length > 0) {
            if (validated) {
              valid = isValid;
            } else {
              valid = isInvalid;
            }
          }

          disabled = true;
          if (schemaHasProp) disabled = false;
          buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-Experiment",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("exp"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit Experiment"));
        }

        index = elements.indexOf("tirfSettings");
        _schema_id = schemas[index];
        object = this.state.TIRFSettings;
        _schema = this.state.settingSchemas[_schema_id];
        schemaHasProp = false;
        if (_schema !== null && _schema !== undefined) schemaHasProp = Object.keys(_schema.properties).length > 0;

        if (this.props.hasAdvancedModel) {
          validated = false;

          if (object !== null && object !== undefined && schemaHasProp) {
            if (Array.isArray(object)) {
              validated = true;

              for (var _index in object) {
                var _obj = object[_index];
                validation = validate(_obj, _schema);
                validated = validated && validation.valid;
              }
            } else {
              validation = validate(object, _schema);
              validated = validation.valid;
            }
          }

          valid = null;

          if (object !== null && object !== undefined && object.length > 0) {
            if (validated) {
              valid = isValid;
            } else {
              valid = isInvalid;
            }
          }

          _category = categories[index];
          disabled = true;
          if (schemaHasProp) for (var catIndex in _category) {
            var cat = _category[catIndex];
            var ele = elementByType[cat];
            if (ele !== null && ele !== undefined) disabled = false;
          }
          buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-TIRF",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("tirfSettings"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit TIRF Settings"));
        }

        index = elements.indexOf("imgEnv");
        _schema_id = schemas[index];
        object = this.state.imagingEnv;
        _schema = this.state.settingSchemas[_schema_id];
        schemaHasProp = false;
        if (_schema !== null && _schema !== undefined) schemaHasProp = Object.keys(_schema.properties).length > 0;
        validated = false;

        if (object !== null && object !== undefined && schemaHasProp) {
          if (Array.isArray(object)) {
            validated = true;

            for (var _index2 in object) {
              var _obj2 = object[_index2];
              validation = validate(_obj2, _schema);
              validated = validated && validation.valid;
            }
          } else {
            validation = validate(object, _schema);
            validated = validation.valid;
          }
        }

        valid = null;

        if (object !== null && object !== undefined && object.length > 0) {
          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }
        }

        _category = categories[index];
        disabled = true;
        if (schemaHasProp) for (var _catIndex in _category) {
          var _cat = _category[_catIndex];
          var _ele = elementByType[_cat];
          if (_ele !== null && _ele !== undefined) disabled = false;
        }
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-ImgEnv",
          position: _constants.edit_img_env_settings.position,
          title: _constants.edit_img_env_settings.title,
          content: _constants.edit_img_env_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-ImgEnv",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("imgEnv"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit Imaging Environment")
        }));
        index = elements.indexOf("micTableSettings");
        _schema_id = schemas[index];
        object = this.state.micTableSettings;
        _schema = this.state.settingSchemas[_schema_id];
        schemaHasProp = false;
        if (_schema !== null && _schema !== undefined) schemaHasProp = Object.keys(_schema.properties).length > 0;
        validated = false;

        if (object !== null && object !== undefined && schemaHasProp) {
          if (Array.isArray(object)) {
            validated = true;

            for (var _index3 in object) {
              var _obj3 = object[_index3];
              validation = validate(_obj3, _schema);
              validated = validated && validation.valid;
            }
          } else {
            validation = validate(object, _schema);
            validated = validation.valid;
          }
        }

        valid = null;

        if (object !== null && object !== undefined && object.length > 0) {
          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }
        }

        _category = categories[index];
        disabled = true;
        if (schemaHasProp) for (var _catIndex2 in _category) {
          var _cat2 = _category[_catIndex2];
          var _ele2 = elementByType[_cat2];
          if (_ele2 !== null && _ele2 !== undefined) disabled = false;
        }
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-MicTableSettings",
          position: _constants.edit_mic_table_settings.position,
          title: _constants.edit_mic_table_settings.title,
          content: _constants.edit_mic_table_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-MicTableSettings",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("micTableSettings"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit Microscope Table Settings")
        }));
        index = elements.indexOf("micSettings");
        _schema_id = schemas[index];
        object = this.state.micSettings;
        _schema = this.state.settingSchemas[_schema_id];
        schemaHasProp = false;
        if (_schema !== null && _schema !== undefined) schemaHasProp = Object.keys(_schema.properties).length > 0;
        validated = false;

        if (schemaHasProp) {
          validation = validate(object, _schema);
          validated = validation.valid;
        }

        valid = null;

        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }

        disabled = false;
        if (!schemaHasProp) disabled = true;
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-MicSettings",
          position: _constants.edit_mic_settings.position,
          title: _constants.edit_mic_settings.title,
          content: _constants.edit_mic_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-MicSettings",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("micSettings"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit Microscope Stand Settings")
        }));
        index = elements.indexOf("objSettings");
        _schema_id = schemas[index];
        var immersionLiquidSchema = this.state.experimentalSchemas["ImmersionLiquid.json"];
        object = this.state.objSettings;
        _schema = this.state.settingSchemas[_schema_id];
        schemaHasProp = false;

        if (_schema !== null && _schema !== undefined) {
          var schemaHasProp1 = Object.keys(_schema.properties).length > 0;
          var schemaHasProp2 = Object.keys(immersionLiquidSchema.properties).length > 0;
          schemaHasProp = schemaHasProp1 || schemaHasProp2;
        }

        validated = false;

        if (object !== null && object !== undefined && schemaHasProp) {
          validation = validate(object, _schema);
          var validated1 = validation.valid;
          var validated2 = false;

          if (object.ImmersionLiquid !== null && object.ImmersionLiquid !== undefined) {
            var validation2 = validate(object.ImmersionLiquid, immersionLiquidSchema);
            validated2 = validation2.valid;
          }

          validated = validated1 && validated2;
        }

        valid = null;

        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }

        _category = categories[index];
        disabled = true;
        if (schemaHasProp) for (var _catIndex3 in _category) {
          var _cat3 = _category[_catIndex3];
          var _ele3 = elementByType[_cat3];
          if (_ele3 !== null && _ele3 !== undefined) disabled = false;
        }
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-ObjSettings",
          position: _constants.edit_obj_settings.position,
          title: _constants.edit_obj_settings.title,
          content: _constants.edit_obj_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-ObjSettings",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("objSettings"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit Objective Settings")
        }));
        index = elements.indexOf("samplePosSettings");
        _schema_id = schemas[index];
        object = this.state.samplePosSettings;
        _schema = this.state.settingSchemas[_schema_id];
        schemaHasProp = false;
        if (_schema !== null && _schema !== undefined) schemaHasProp = Object.keys(_schema.properties).length > 0;
        validated = false;

        if (object !== null && object !== undefined && schemaHasProp) {
          if (Array.isArray(object)) {
            validated = true;

            for (var _index4 in object) {
              var _obj4 = object[_index4];
              validation = validate(_obj4, _schema);
              validated = validated && validation.valid;
            }
          } else {
            validation = validate(object, _schema);
            validated = validation.valid;
          }
        }

        valid = null;

        if (object !== null && object !== undefined && object.length > 0) {
          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }
        }

        _category = categories[index];
        disabled = true;
        if (schemaHasProp) for (var _catIndex4 in _category) {
          var _cat4 = _category[_catIndex4];
          var _ele4 = elementByType[_cat4];
          if (_ele4 !== null && _ele4 !== undefined) disabled = false;
        }
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-SamplePosSettings",
          position: _constants.edit_sample_pos_settings.position,
          title: _constants.edit_sample_pos_settings.title,
          content: _constants.edit_sample_pos_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-SamplePosSettings",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("samplePosSettings"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit Sample Positioning Settings")
        }));
        index = elements.indexOf("planes");
        _schema_id = schemas[index];
        object = this.state.planes;
        _schema = this.state.settingSchemas[_schema_id];
        validated = false;

        if (object !== null && object !== undefined) {
          if (Array.isArray(object)) {
            validated = true;

            for (var _index5 in object) {
              var _obj5 = object[_index5];
              validation = validate(_obj5, _schema);
              validated = validated && validation.valid;
            }
          } else {
            validation = validate(object, _schema);
            validated = validation.valid;
          }
        }

        valid = null;

        if (object !== null && object !== undefined && object.length > 0) {
          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }
        }

        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-Planes",
          position: _constants.edit_planes.position,
          title: _constants.edit_planes.title,
          content: _constants.edit_planes.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-Planes",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("planes"));
            },
            style: styleButton,
            size: "lg"
          }, valid, "Edit Planes")
        }));
        index = elements.indexOf("channels");
        _schema_id = schemas[index];
        object = this.state.channels;
        _schema = this.state.settingSchemas[_schema_id];
        var lightPathSchema = this.state.settingSchemas["LightPath.json"];
        var fluorophoreSchema = this.state.experimentalSchemas["Fluorophore.json"];
        validated = false;

        if (object !== null && object !== undefined) {
          if (Array.isArray(object)) {
            validated = true;

            for (var _index6 in object) {
              var _obj6 = object[_index6];
              validation = validate(_obj6, _schema);
              validated = validated && validation.valid;

              var _validation = validate(_obj6.LightPath, lightPathSchema);

              validated = validated && _validation.valid;
              var validation3 = validate(_obj6.Fluorophore, fluorophoreSchema);
              validated = validated && validation3.valid;
            }
          } else {
            validation = validate(object, _schema);
            validated = validation.valid;
          }
        }

        valid = null;

        if (object !== null && object !== undefined && object.length > 0) {
          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }
        }

        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-Channels",
          position: _constants.edit_channels.position,
          title: _constants.edit_channels.title,
          content: _constants.edit_channels.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-Channels",
            onClick: function onClick() {
              return _this3.onClickEditSettings(elements.indexOf("channels"));
            },
            style: styleButton,
            size: "lg"
          }, valid, "Edit Channels")
        }));
        return /*#__PURE__*/_react.default.createElement("div", {
          style: containerStyle
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: infoStyle
        }, /*#__PURE__*/_react.default.createElement("p", null, settingsInfo)), /*#__PURE__*/_react.default.createElement("div", {
          style: styleMainContainer
        }, buttons));
      }
    }
  }]);

  return SettingMainView;
}(_react.default.PureComponent);

exports.default = SettingMainView;