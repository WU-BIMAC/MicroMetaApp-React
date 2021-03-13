"use strict";

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

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
      TIRFSettings: props.settingData.TIRFSettings,
      imagingEnv: props.settingData.ImagingEnvironment,
      micSettings: props.settingData.MicroscopeStandSettings,
      objSettings: props.settingData.ObjectiveSettings,
      samplePosSettings: props.settingData.SamplePositioningSettings,
      micTableSettings: props.settingData.MicroscopeTableSettings,
      settingSchemas: {},
      experimentalSchemas: {},
      componentSchemas: {} //objective: null,

    };
    var settingData = {};

    if (props.settingData !== undefined && props.settingData !== null) {
      Object.keys(props.settingData).forEach(function (settIndex) {
        var sett = props.settingData[settIndex]; //console.log(sett);

        var schema_id = sett.Schema_ID;

        if (schema_id === "TIRFSettings.json" && _constants.bool_hasAdvanced) {
          _this.state.TIRFSettings = sett; //settingData.TIRFSettings = sett;
        } else if (schema_id === "ImagingEnvironment.json") {
          _this.state.imagingEnv = sett; //settingData.imagingEnv = sett;
        } else if (schema_id === "MicroscopeStandSettings.json") {
          _this.state.micSettings = sett; //settingData.micSettings = sett;
        } else if (schema_id === "ObjectiveSettings.json") {
          _this.state.objSettings = sett; //settingData.objSettings = sett;
        } else if (schema_id === "SamplePositioningSettings.json") {
          _this.state.samplePosSettings = sett; //settingData.samplePosSettings = sett;
        } else if (schema_id === "MicroscopeTableSettings.json") {
          _this.state.micTableSettings = sett; //settingData.micTableSettings = sett;
        }

        if (schema_id === "Experiment.json" && _constants.bool_hasExperimental) {
          _this.state.experiment = sett; //settingData.experiment = sett;
        }
      });
    }

    if (props.settingSchemas !== undefined && props.settingSchemas !== null) {
      Object.keys(props.settingSchemas).forEach(function (schemaIndex) {
        var uuid = (0, _uuid.v4)();
        var schema = props.settingSchemas[schemaIndex];
        var schema_id = schema.ID;
        _this.state.settingSchemas[schema_id] = schema; // 		if (schema_id === "TIRFSettings.json" && bool_hasAdvanced) {
        // 			if (
        // 				this.state.TIRFSettings === null ||
        // 				this.state.TIRFSettings === undefined
        // 			) {
        // 				let newElement = {
        // 					Name: `${schema.title}`,
        // 					ID: uuid,
        // 					Tier: schema.tier,
        // 					Schema_ID: schema.ID,
        // 					Version: schema.version,
        // 				};
        // 				this.state.TIRFSettings = newElement;
        // 				settingData.TIRFSettings = newElement;
        // 			}
        // 		} else if (schema_id === "ImagingEnvironment.json") {
        // 			if (
        // 				this.state.imagingEnv === null ||
        // 				this.state.imagingEnv === undefined
        // 			) {
        // 				let newElement = {
        // 					Name: `${schema.title}`,
        // 					ID: uuid,
        // 					Tier: schema.tier,
        // 					Schema_ID: schema.ID,
        // 					Version: schema.version,
        // 				};
        // 				this.state.imagingEnv = newElement;
        // 				settingData.ImagingEnvironment = newElement;
        // 			}
        //	} else

        if (schema_id === "MicroscopeStandSettings.json") {
          if (_this.state.micSettings === null || _this.state.micSettings === undefined) {
            var newElement = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
            };
            _this.state.micSettings = newElement;
            settingData.MicroscopeStandSettings = newElement;
          }
        } //else if (schema_id === "ObjectiveSettings.json") {
        // 			if (
        // 				this.state.objSettings === null ||
        // 				this.state.objSettings === undefined
        // 			) {
        // 				let newElement = {
        // 					Name: `${schema.title}`,
        // 					ID: uuid,
        // 					Tier: schema.tier,
        // 					Schema_ID: schema.ID,
        // 					Version: schema.version,
        // 				};
        // 				this.state.objSettings = newElement;
        // 				settingData.ObjectiveSettings = newElement;
        // 			}
        // 		} else if (schema_id === "SamplePositioningSettings.json") {
        // 			if (
        // 				this.state.samplePosSettings === null ||
        // 				this.state.samplePosSettings === undefined
        // 			) {
        // 				let newElement = {
        // 					Name: `${schema.title}`,
        // 					ID: uuid,
        // 					Tier: schema.tier,
        // 					Schema_ID: schema.ID,
        // 					Version: schema.version,
        // 				};
        // 				this.state.samplePosSettings = newElement;
        // 				settingData.SamplePositioningSettings = newElement;
        // 			}
        // 		} else if (schema_id === "MicroscopeTableSettings.json") {
        // 			if (
        // 				this.state.micTableSettings === null ||
        // 				this.state.micTableSettings === undefined
        // 			) {
        // 				let newElement = {
        // 					Name: `${schema.title}`,
        // 					ID: uuid,
        // 					Tier: schema.tier,
        // 					Schema_ID: schema.ID,
        // 					Version: schema.version,
        // 				};
        // 				this.state.micTableSettings = newElement;
        // 				settingData.MicroscopeTableSettings = newElement;
        // 			}
        // 		}

      });
    }

    if (props.experimentalSchemas !== undefined && props.experimentalSchemas !== null && _constants.bool_hasExperimental) {
      Object.keys(props.experimentalSchemas).forEach(function (schemaIndex) {
        var uuid = (0, _uuid.v4)();
        var schema = props.experimentalSchemas[schemaIndex];
        var schema_id = schema.ID;
        _this.state.experimentalSchemas[schema_id] = schema;

        if (schema_id === "Experiment.json") {
          if (_this.state.experiment === null || _this.state.experiment === undefined) {
            var newElement = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
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
    } // console.log("settingSchemas");
    // console.log(this.state.settingSchemas);
    // console.log("expSchemas");
    // console.log(this.state.experimentalSchemas);


    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this)); //this.getElementData = this.getElementData.bind(this);
    //this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

    _this.onClickEditSettings = _this.onClickEditSettings.bind(_assertThisInitialized(_this));

    _this.props.updateSettingData(settingData, true);

    return _this;
  } // static getDerivedStateFromProps(props, state) {
  // 	if (props.settingSchemas !== null || props.experimentalSchemas !== null) {
  // 		let settingsSchema = {};
  // 		if (props.settingSchemas !== null)
  // 			Object.keys(props.settingSchemas).forEach((schemaIndex) => {
  // 				let schema = props.settingSchemas[schemaIndex];
  // 				let schema_id = schema.ID;
  // 				settingsSchema[schema_id] = schema;
  // 			});
  // 		if (props.experimentalSchemas !== null)
  // 			Object.keys(props.experimentalSchemas).forEach((schemaIndex) => {
  // 				let schema = props.experimentalSchemas[schemaIndex];
  // 				let schema_id = schema.ID;
  // 				settingsSchema[schema_id] = schema;
  // 			});
  // 		let elementList = state.elementList;
  // 		for (let i = 0; i < elementList.length; i++) {
  // 			let element = elementList[i];
  // 			//console.log(element);
  // 			let schema_id = element.schema_ID;
  // 			let schema = settingsSchema[schema_id];
  // 			let object = element.obj;
  // 			let validation = validate(object, schema);
  // 			let validated = validation.valid;
  // 			element.validated = validated;
  // 		}
  // 		return {
  // 			componentsSchema: settingsSchema,
  // 		};
  // 	}
  // }
  // areAllElementsValidated() {
  // 	let elementList = this.state.elementList;
  // 	for (let i = 0; i < elementList.length; i++) {
  // 		if (!elementList[i].validated) {
  // 			return false;
  // 		}
  // 	}
  // 	return true;
  // }


  _createClass(SettingMainView, [{
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      var settingData = {};
      console.log("save " + elements[id]);
      console.log(data);

      if (id === elements.indexOf("exp")) {
        var experiment = this.state.experiment;
        var newExperiment = Object.assign(experiment, data);
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
          channels: data //objective: objective,

        });
      } else if (id === elements.indexOf("tirfSettings")) {
        // let TIRFSettings = this.state.TIRFSettings;
        // let newTIRFSettings = Object.assign(TIRFSettings, data);
        // settingData.TIRFSettings = newTIRFSettings;
        settingData.TIRFSettings = data;
        this.setState({
          editingElement: -1,
          //TIRFSettings: newTIRFSettings
          TIRFSettings: data
        });
      } else if (id === elements.indexOf("imgEnv")) {
        // let imagingEnv = this.state.imagingEnv;
        // let newImagingEnv = Object.assign(imagingEnv, data);
        // settingData.ImagingEnvironment = newImagingEnv;
        settingData.ImagingEnvironment = data;
        this.setState({
          editingElement: -1,
          //imagingEnv: newImagingEnv
          imagingEnv: data
        });
      } else if (id === elements.indexOf("micSettings")) {
        // let micSettings = this.state.micSettings;
        // let newMicSettings = Object.assign(micSettings, data);
        // settingData.MicroscopeStandSettings = newMicSettings;
        settingData.MicroscopeStandSettings = data;
        this.setState({
          editingElement: -1,
          //micSettings: newMicSettings
          micSettings: data
        });
      } else if (id === elements.indexOf("objSettings")) {
        // let objSettings = this.state.objSettings;
        // let newObjSettings = Object.assign(objSettings, data);
        // settingData.ObjectiveSettings = newObjSettings;
        settingData.ObjectiveSettings = data;
        this.setState({
          editingElement: -1,
          //micSettings: newObjSettings
          objSettings: data
        });
      } else if (id === elements.indexOf("samplePosSettings")) {
        // let samplePosSettings = this.state.samplePosSettings;
        // let newSamplePosSettings = Object.assign(samplePosSettings, data);
        // settingData.SamplePositioningSettings = newSamplePosSettings;
        settingData.SamplePositioningSettings = data;
        this.setState({
          editingElement: -1,
          //samplePosSettings: newSamplePosSettings,
          samplePosSettings: data
        });
      } else if (id === elements.indexOf("micTableSettings")) {
        // let micTableSettings = this.state.micTableSettings;
        // let newMicTableSettings = Object.assign(micTableSettings, data);
        //settingData.MicroscopeTableSettings = newMicTableSettings;
        settingData.MicroscopeTableSettings = data;
        this.setState({
          editingElement: -1,
          //micTableSettings: newMicTableSettings,
          micTableSettings: data
        });
      } //let validated = this.areAllElementsValidated();


      this.props.updateSettingData(settingData, true);
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      this.setState({
        editingElement: -1
      });
    } // getElementData() {
    // 	return Object.assign({}, this.state.elementData);
    // }

  }, {
    key: "onClickEditSettings",
    value: function onClickEditSettings(editingElement) {
      this.setState({
        editingElement: editingElement
      });
    } // onClickEditPlanes() {
    // 	let editingElement = schemasOrder.indexOf("Plane.json");
    // 	this.setState({
    // 		editingElement: "Planes",
    // 	});
    // }
    // onClickEditChannels() {
    // 	let editingElement = schemasOrder.indexOf("Channel.json");
    // 	this.setState({
    // 		editingElement: "Channels",
    // 	});
    // }
    // onClickEditTIRFSettings() {
    // 	let editingElement = schemasOrder.indexOf("TIRFSettings.json");
    // 	this.setState({
    // 		editingElement: "TIRFSettings",
    // 	});
    // }
    // onClickEditImagingEnvironment() {
    // 	let editingElement = schemasOrder.indexOf("ImagingEnvironment.json");
    // 	this.setState({
    // 		editingElement: "ImgEnv",
    // 	});
    // }
    // onClickEditMicroscopeStandSettings() {
    // 	let editingElement = schemasOrder.indexOf("MicroscopeStandSettings.json");
    // 	this.setState({
    // 		editingElement: "MicSettings",
    // 	});
    // }
    // onClickEditObjectiveSettings() {
    // 	let editingElement = schemasOrder.indexOf("ObjectiveSettings.json");
    // 	//ImmersionLiquid should go here
    // 	this.setState({
    // 		editingElement: "ObjSettings",
    // 	});
    // }
    // onClickEditSamplePositioningSettings() {
    // 	let editingElement = schemasOrder.indexOf("SamplePositioningSettings.json");
    // 	this.setState({
    // 		editingElement: "SamplePosSettings",
    // 	});
    // }
    // onClickEditMicroscopeTableSettings() {
    // 	let editingElement = schemasOrder.indexOf("MicroscopeTableSettings.json");
    // 	this.setState({
    // 		editingElement: "MicTableSettings",
    // 	});
    // }

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // console.log("elementData");
      // console.log(elementData);
      var elementByType = {};
      var componentSchemas = this.state.componentSchemas;
      Object.keys(this.props.microscopeComponents).forEach(function (key) {
        var element = _this2.props.microscopeComponents[key];
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
      var styleMainContainer = {
        width: width,
        height: height,
        boxSizing: "border-box",
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
        if (_constants.bool_isDebug) {//TODO debug stuff
        }

        var obj = null;
        var schema_id = schemas[editingElement];
        var schema = null;
        var category = null;

        if (editingElement === elements.indexOf("exp")) {
          obj = this.state.experiment;
          schema = this.state.experimentalSchemas[schema_id];
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
          } else if (editingElement === elements.indexOf("objSettings")) {
            obj = this.state.objSettings;
          } else if (editingElement === elements.indexOf("samplePosSettings")) {
            obj = this.state.samplePosSettings;
          } else if (editingElement === elements.indexOf("micTableSettings")) {
            obj = this.state.micTableSettings;
          }

          schema = this.state.settingSchemas[schema_id];
          category = categories[editingElement];
        }

        console.log("setting schema");
        console.log(schema);
        console.log("setting obj");
        console.log(obj);
        console.log("category");
        console.log(category);

        if (editingElement == elements.indexOf("planes")) {
          return /*#__PURE__*/_react.default.createElement("div", {
            style: styleMainContainer
          }, /*#__PURE__*/_react.default.createElement(_planeView.default, {
            schema: schema,
            inputData: obj,
            id: editingElement,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer
          }));
        } else if (editingElement == elements.indexOf("channels")) {
          return /*#__PURE__*/_react.default.createElement(_channelView.default, {
            settingSchemas: this.props.settingSchemas,
            componentSchemas: this.props.componentSchemas,
            experimentalSchemas: this.props.experimentalSchemas,
            schema: schema,
            inputData: obj,
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
            headerOffset: this.props.headerOffset
          });
        } else if (editingElement == elements.indexOf("imgEnv") || editingElement == elements.indexOf("tirfSettings") || editingElement == elements.indexOf("objSettings") || editingElement == elements.indexOf("samplePosSettings") || editingElement == elements.indexOf("micTableSettings")) {
          return /*#__PURE__*/_react.default.createElement(_settingComponentSelector.default, {
            settingSchemas: this.props.settingSchemas,
            componentSchemas: this.props.componentSchemas,
            experimentalSchemas: this.props.experimentalSchemas,
            schema: schema,
            inputData: obj,
            id: editingElement,
            category: category,
            imagesPath: this.props.imagesPath,
            settingData: this.props.settingData,
            componentData: this.props.componentData,
            linkedFields: this.props.linkedFields,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            elementByType: elementByType
          });
        } else {
          return /*#__PURE__*/_react.default.createElement("div", {
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
            editable: true
          }));
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
        var index = elements.indexOf("exp");
        var _schema_id = schemas[index];
        var object = this.state.experiment;
        var _schema = this.state.experimentalSchemas[_schema_id];
        var validation = null;
        var validated = null;
        var valid = null;

        if (_constants.bool_hasExperimental) {
          validated = false;

          if (object !== null && object !== undefined) {
            validation = validate(object, _schema);
            validated = validation.valid;
          }

          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }

          buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-Experiment",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("exp"));
            },
            style: styleButton,
            size: "lg"
          }, valid, "Edit Experiment"));
        }

        index = elements.indexOf("tirfSettings");
        _schema_id = schemas[index];
        object = this.state.TIRFSettings;
        _schema = this.state.settingSchemas[_schema_id];

        if (_constants.bool_hasAdvanced) {
          validated = false;

          if (object !== null && object !== undefined) {
            validation = validate(object, _schema);
            validated = validation.valid;
          }

          valid = null;

          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }

          _category = categories[index];
          disabled = false;

          for (var catIndex in _category) {
            var cat = _category[catIndex];
            var ele = elementByType[cat];
            if (ele === null || ele === undefined) disabled = true;
          }

          buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-TIRF",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("tirfSettings"));
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
        validated = false;

        if (object !== null && object !== undefined) {
          validation = validate(object, _schema);
          validated = validation.valid;
        }

        valid = null;

        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }

        _category = categories[index];
        disabled = false;

        for (var _catIndex in _category) {
          var _cat = _category[_catIndex];
          var _ele = elementByType[_cat];
          if (_ele === null || _ele === undefined) disabled = true;
        }

        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-ImgEnv",
          position: _constants.edit_img_env_settings.position,
          title: _constants.edit_img_env_settings.title,
          content: _constants.edit_img_env_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-ImgEnv",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("imgEnv"));
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
        validated = false;

        if (object !== null && object !== undefined) {
          console.log("object");
          console.log(object);
          console.log("schema");
          console.log(_schema);
          validation = validate(object, _schema);
          validated = validation.valid;
        }

        valid = null;

        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }

        _category = categories[index];
        disabled = false;

        for (var _catIndex2 in _category) {
          var _cat2 = _category[_catIndex2];
          var _ele2 = elementByType[_cat2];
          if (_ele2 === null || _ele2 === undefined) disabled = true;
        }

        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-MicTableSettings",
          position: _constants.edit_mic_table_settings.position,
          title: _constants.edit_mic_table_settings.title,
          content: _constants.edit_mic_table_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-MicTableSettings",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("micTableSettings"));
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
        validated = false;
        validation = validate(object, _schema);
        validated = validation.valid;
        valid = null;

        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }

        disabled = false;
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-MicSettings",
          position: _constants.edit_mic_settings.position,
          title: _constants.edit_mic_settings.title,
          content: _constants.edit_mic_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-MicSettings",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("micSettings"));
            },
            style: styleButton,
            size: "lg"
          }, valid, "Edit Microscope Stand Settings")
        }));
        index = elements.indexOf("objSettings");
        _schema_id = schemas[index];
        object = this.state.objSettings;
        _schema = this.state.settingSchemas[_schema_id];
        validated = false;

        if (object !== null && object !== undefined) {
          validation = validate(object, _schema);
          validated = validation.valid;
        }

        valid = null;

        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }

        _category = categories[index];
        disabled = false;

        for (var _catIndex3 in _category) {
          var _cat3 = _category[_catIndex3];
          var _ele3 = elementByType[_cat3];
          if (_ele3 === null || _ele3 === undefined) disabled = true;
        }

        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-ObjSettings",
          position: _constants.edit_obj_settings.position,
          title: _constants.edit_obj_settings.title,
          content: _constants.edit_obj_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-ObjSettings",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("objSettings"));
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
        validated = false;

        if (object !== null && object !== undefined) {
          validation = validate(object, _schema);
          validated = validation.valid;
        }

        valid = null;

        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }

        _category = categories[index];
        disabled = false;

        for (var _catIndex4 in _category) {
          var _cat4 = _category[_catIndex4];
          var _ele4 = elementByType[_cat4];
          if (_ele4 === null || _ele4 === undefined) disabled = true;
        }

        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-SamplePosSettings",
          position: _constants.edit_sample_pos_settings.position,
          title: _constants.edit_sample_pos_settings.title,
          content: _constants.edit_sample_pos_settings.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-SamplePosSettings",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("samplePosSettings"));
            },
            style: styleButton,
            size: "lg",
            disabled: disabled
          }, disabled ? null : valid, "Edit Sample Positioning Settings")
        }));
        index = elements.indexOf("planes");
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-Planes",
          position: _constants.edit_planes.position,
          title: _constants.edit_planes.title,
          content: _constants.edit_planes.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-Planes",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("planes"));
            },
            style: styleButton,
            size: "lg"
          }, "Edit Planes")
        }));
        index = elements.indexOf("channels");
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-Channels",
          position: _constants.edit_channels.position,
          title: _constants.edit_channels.title,
          content: _constants.edit_channels.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-Channels",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("channels"));
            },
            style: styleButton,
            size: "lg"
          }, "Edit Channels")
        }));
        return /*#__PURE__*/_react.default.createElement("div", {
          style: styleMainContainer
        }, buttons);
      }
    }
  }]);

  return SettingMainView;
}(_react.default.PureComponent);

exports.default = SettingMainView;