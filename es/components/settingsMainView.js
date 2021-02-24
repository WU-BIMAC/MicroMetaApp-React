"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));

var _planeView = _interopRequireDefault(require("./planeView"));

var _channelView = _interopRequireDefault(require("./channelView"));

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

var schemas = ["Experiment.json", "Plane.json", "Channel.json", "TIRFSettings.json", "ImagingEnvironment.json", "MicroscopeSettings.json", "ObjectiveSettings.json", "SamplePositioningSettings.json", "MicroscopeTableSettings.json"];
var elements = ["exp", "planes", "channels", "tirfSettings", "imgEnv", "micSettings", "objSettings", "samplePosSettings", "micTableSettings"];

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
      micSettings: props.settingData.MicroscopeSettings,
      objSettings: props.settingData.ObjectiveSettings,
      samplePosSettings: props.settingData.SamplePositioningSettings,
      micTableSettings: props.settingData.MicroscopeTableSettings,
      settingSchemas: {},
      experimentalSchemas: {},
      componentSchemas: {},
      objective: null
    };
    var settingData = {};

    if (props.settingSchemas !== undefined && props.settingSchemas !== null) {
      Object.keys(props.settingSchemas).forEach(function (schemaIndex) {
        var uuid = (0, _uuid.v4)();
        var schema = props.settingSchemas[schemaIndex];
        var schema_id = schema.ID;
        _this.state.settingSchemas[schema_id] = schema;

        if (schema_id === "TIRFSettings.json" && _constants.bool_hasAdvanced) {
          if (_this.state.TIRFSettings === null || _this.state.TIRFSettings === undefined) {
            var newElement = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
            };
            _this.state.TIRFSettings = newElement;
            settingData.TIRFSettings = newElement;
          }
        } else if (schema_id === "ImagingEnvironment.json") {
          if (_this.state.imagingEnv === null || _this.state.imagingEnv === undefined) {
            var _newElement = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
            };
            _this.state.imagingEnv = _newElement;
            settingData.ImagingEnvironment = _newElement;
          }
        } else if (schema_id === "MicroscopeSettings.json") {
          if (_this.state.micSettings === null || _this.state.micSettings === undefined) {
            var _newElement2 = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
            };
            _this.state.micSettings = _newElement2;
            settingData.MicroscopeSettings = _newElement2;
          }
        } else if (schema_id === "ObjectiveSettings.json") {
          if (_this.state.objSettings === null || _this.state.objSettings === undefined) {
            var _newElement3 = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
            };
            _this.state.objSettings = _newElement3;
            settingData.ObjectiveSettings = _newElement3;
          }
        } else if (schema_id === "SamplePositioningSettings.json") {
          if (_this.state.samplePosSettings === null || _this.state.samplePosSettings === undefined) {
            var _newElement4 = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
            };
            _this.state.samplePosSettings = _newElement4;
            settingData.SamplePositioningSettings = _newElement4;
          }
        } else if (schema_id === "MicroscopeTableSettings.json") {
          if (_this.state.micTableSettings === null || _this.state.micTableSettings === undefined) {
            var _newElement5 = {
              Name: "".concat(schema.title),
              ID: uuid,
              Tier: schema.tier,
              Schema_ID: schema.ID,
              Version: schema.version
            };
            _this.state.micTableSettings = _newElement5;
            settingData.MicroscopeTableSettings = _newElement5;
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

        if (schema_id === "Experiment.json" && _constants.bool_hasExperimental) {
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
        var objective = null; // let objective = this.state.objective;
        // if (objective === null) {
        // 	objective = data[0].LightPath.ComponentSettings.Objective;
        // }

        settingData.Channels = data;
        this.setState({
          editingElement: -1,
          channels: data,
          objective: objective
        });
      } else if (id === elements.indexOf("tirfSettings")) {
        var TIRFSettings = this.state.TIRFSettings;
        var newTIRFSettings = Object.assign(TIRFSettings, data);
        settingData.TIRFSettings = newTIRFSettings;
        this.setState({
          editingElement: -1,
          TIRFSettings: newTIRFSettings
        });
      } else if (id === elements.indexOf("imgEnv")) {
        var imagingEnv = this.state.imagingEnv;
        var newImagingEnv = Object.assign(imagingEnv, data);
        settingData.ImagingEnvironment = newImagingEnv;
        this.setState({
          editingElement: -1,
          imagingEnv: newImagingEnv
        });
      } else if (id === elements.indexOf("micSettings")) {
        var micSettings = this.state.micSettings;
        var newMicSettings = Object.assign(micSettings, data);
        settingData.MicroscopeSettings = newMicSettings;
        this.setState({
          editingElement: -1,
          micSettings: newMicSettings
        });
      } else if (id === elements.indexOf("objSettings")) {
        var objSettings = this.state.objSettings;
        var newObjSettings = Object.assign(objSettings, data);
        settingData.ObjectiveSettings = newObjSettings;
        this.setState({
          editingElement: -1,
          micSettings: newObjSettings
        });
      } else if (id === elements.indexOf("samplePosSettings")) {
        var samplePosSettings = this.state.samplePosSettings;
        var newSamplePosSettings = Object.assign(samplePosSettings, data);
        settingData.SamplePositioningSettings = newSamplePosSettings;
        this.setState({
          editingElement: -1,
          samplePosSettings: newSamplePosSettings
        });
      } else if (id === elements.indexOf("micTableSettings")) {
        var micTableSettings = this.state.micTableSettings;
        var newMicTableSettings = Object.assign(micTableSettings, data);
        settingData.MicroscopeTableSettings = newMicTableSettings;
        this.setState({
          editingElement: -1,
          micTableSettings: newMicTableSettings
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
    // onClickEditMicroscopeSettings() {
    // 	let editingElement = schemasOrder.indexOf("MicroscopeSettings.json");
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
      var elementByType = {}; // Object.keys(this.state.elementData).forEach(function (key) {
      // 	let element = this.state.elementData[key];
      // 	let schemaID = element.Schema_ID.replace(string_json_ext, "");
      // 	if (elementByType[schemaID] === undefined) {
      // 		elementByType[schemaID] = {};
      // 	}
      // 	elementByType[schemaID][element.Name] = element.ID;
      // });

      var componentSchemas = this.state.componentSchemas;
      Object.keys(this.props.microscopeComponents).forEach(function (key) {
        var element = _this2.props.microscopeComponents[key]; // let schemaID = element.Schema_ID.replace(string_json_ext, "");
        // if (elementByType[schemaID] === undefined) {
        // 	elementByType[schemaID] = {};
        // }
        // elementByType[schemaID][element.Name] = element.ID;

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
        }

        console.log("setting schema");
        console.log(schema);
        console.log("setting obj");
        console.log(obj);

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
        } else if (this.state.editingElement == elements.indexOf("channels")) {
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
        var styleEditButton = Object.assign({}, styleButton, {
          border: "5px ridge red"
        });
        var buttons = [];
        var index = elements.indexOf("exp");
        var _schema_id = schemas[index];
        var object = this.state.experiment;
        var _schema = this.state.experimentalSchemas[_schema_id];
        var validation = null;
        var validated = null;
        var styleButt = null;

        if (_constants.bool_hasExperimental) {
          validation = validate(object, _schema);
          validated = validation.valid;
          styleButt = styleButton;
          if (!validated) styleButt = styleEditButton;
          buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-Experiment",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("exp"));
            },
            style: styleButt,
            size: "lg"
          }, "Edit Experiment"));
        }

        index = elements.indexOf("planes");
        styleButt = styleButton;
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-Planes",
          onClick: function onClick() {
            return _this2.onClickEditSettings(elements.indexOf("planes"));
          },
          style: styleButt,
          size: "lg"
        }, "Edit Planes"));
        index = elements.indexOf("channels");
        styleButt = styleButton;
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-Channels",
          onClick: function onClick() {
            return _this2.onClickEditSettings(elements.indexOf("channels"));
          },
          style: styleButt,
          size: "lg"
        }, "Edit Channels"));
        index = elements.indexOf("tirfSettings");
        _schema_id = schemas[index];
        object = this.state.TIRFSettings;
        _schema = this.state.settingSchemas[_schema_id];

        if (_constants.bool_hasAdvanced) {
          validation = validate(object, _schema);
          validated = validation.valid;
          styleButt = styleButton;
          if (!validated) styleButt = styleEditButton;
          buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Button-TIRF",
            onClick: function onClick() {
              return _this2.onClickEditSettings(elements.indexOf("tirfSettings"));
            },
            style: styleButt,
            size: "lg"
          }, "Edit TIRF Settings"));
        }

        index = elements.indexOf("imgEnv");
        _schema_id = schemas[index];
        object = this.state.imagingEnv;
        _schema = this.state.settingSchemas[_schema_id];
        validation = validate(object, _schema);
        validated = validation.valid;
        styleButt = styleButton;
        if (!validated) styleButt = styleEditButton;
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-ImgEnv",
          onClick: function onClick() {
            return _this2.onClickEditSettings(elements.indexOf("imgEnv"));
          },
          style: styleButt,
          size: "lg"
        }, "Edit Imaging Environment"));
        index = elements.indexOf("micSettings");
        _schema_id = schemas[index];
        object = this.state.micSettings;
        _schema = this.state.settingSchemas[_schema_id];
        validation = validate(object, _schema);
        validated = validation.valid;
        styleButt = styleButton;
        if (!validated) styleButt = styleEditButton;
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-MicSettings",
          onClick: function onClick() {
            return _this2.onClickEditSettings(elements.indexOf("micSettings"));
          },
          style: styleButt,
          size: "lg"
        }, "Edit Microscope Settings"));
        index = elements.indexOf("objSettings");
        _schema_id = schemas[index];
        object = this.state.objSettings;
        _schema = this.state.settingSchemas[_schema_id];
        validation = validate(object, _schema);
        validated = validation.valid;
        styleButt = styleButton;
        if (!validated) styleButt = styleEditButton;
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-ObjSettings",
          onClick: function onClick() {
            return _this2.onClickEditSettings(elements.indexOf("objSettings"));
          },
          style: styleButt,
          size: "lg"
        }, "Edit Objective Settings"));
        index = elements.indexOf("samplePosSettings");
        _schema_id = schemas[index];
        object = this.state.samplePosSettings;
        _schema = this.state.settingSchemas[_schema_id];
        validation = validate(object, _schema);
        validated = validation.valid;
        styleButt = styleButton;
        if (!validated) styleButt = styleEditButton;
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-SamplePosSettings",
          onClick: function onClick() {
            return _this2.onClickEditSettings(elements.indexOf("samplePosSettings"));
          },
          style: styleButt,
          size: "lg"
        }, "Edit Sample Positioning Settings"));
        index = elements.indexOf("micTableSettings");
        _schema_id = schemas[index];
        object = this.state.micTableSettings;
        _schema = this.state.settingSchemas[_schema_id];
        validation = validate(object, _schema);
        validated = validation.valid;
        styleButt = styleButton;
        if (!validated) styleButt = styleEditButton;
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "Button-MicTableSettings",
          onClick: function onClick() {
            return _this2.onClickEditSettings(elements.indexOf("micTableSettings"));
          },
          style: styleButt,
          size: "lg"
        }, "Edit Microscope Table Settings"));
        return /*#__PURE__*/_react.default.createElement("div", {
          style: styleMainContainer
        }, buttons);
      }
    }
  }]);

  return SettingMainView;
}(_react.default.PureComponent);

exports.default = SettingMainView;