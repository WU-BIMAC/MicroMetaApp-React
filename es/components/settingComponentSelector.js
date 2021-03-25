"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactArcher = require("react-archer");

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));

var _url = require("url");

var _uuid = require("uuid");

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

var validate = require("jsonschema").validate;

var SettingComponentSelector = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(SettingComponentSelector, _React$PureComponent);

  var _super = _createSuper(SettingComponentSelector);

  function SettingComponentSelector(props) {
    var _this;

    _classCallCheck(this, SettingComponentSelector);

    _this = _super.call(this, props);
    _this.state = {
      editing: false,
      selectedComp: null,
      selectedSchema: null,
      currentComps: [],
      settingData: props.inputData || null
    };

    if (_this.state.settingData === null || _this.state.settingData === undefined) {
      if (_this.props.maxNumberElement === 1) {
        _this.state.settingData = {};
      } else {
        _this.state.settingData = [];
      }
    } // console.log("input setting data");
    // console.log(this.state.settingData);


    if (Array.isArray(_this.state.settingData)) {
      Object.keys(_this.state.settingData).forEach(function (settingIndex) {
        var sett = _this.state.settingData[settingIndex];
        Object.keys(_this.props.componentData).forEach(function (compIndex) {
          var comp = _this.props.componentData[compIndex];

          if (comp.ID === sett.Component_ID) {
            _this.state.currentComps.push(comp);
          }
        });
      });
    } else {
      var compID = _this.state.settingData.Component_ID;

      if (compID !== null && compID !== undefined) {
        Object.keys(_this.props.componentData).forEach(function (compIndex) {
          var comp = _this.props.componentData[compIndex];

          if (comp.ID === compID) {
            _this.state.currentComps.push(comp);
          }
        });
      }
    }

    if (_this.props.imageMetadata !== null && _this.props.imageMetadata !== undefined && _this.props.inputData !== null && _this.props.inputData !== undefined) {
      var imageMetadata = _this.props.imageMetadata;
      var propsSchema = _this.props.schema;

      if (Array.isArray(propsSchema) && propsSchema[0].ID === "ObjectiveSettings.json" && imageMetadata.ObjectiveSettings !== null && imageMetadata.ObjectiveSettings !== undefined) {
        var imageObjSettings = imageMetadata.ObjectiveSettings;
        var newSettingCompData = Object.assign({}, imageObjSettings, _this.state.settingData);
        var newImmersionLiquid = null;

        if (_this.state.settingData.ImmersionLiquid !== null && _this.state.settingData.ImmersionLiquid !== undefined) {
          if (imageObjSettings.ImmersionLiquid !== null && imageObjSettings.ImmersionLiquid !== undefined) {
            newImmersionLiquid = Object.assign({}, imageObjSettings.ImmersionLiquid, _this.state.settingData.ImmersionLiquid);
          } else {
            newImmersionLiquid = _this.state.settingData.ImmersionLiquid;
          }

          newSettingCompData.ImmersionLiquid = newImmersionLiquid;
        } else {//SHOULD I CREATE A NEW ONE HERE?
        }

        _this.state.settingData = newSettingCompData;
      }
    }

    _this.handleSelectComp = _this.handleSelectComp.bind(_assertThisInitialized(_this));
    _this.handleDeleteComp = _this.handleDeleteComp.bind(_assertThisInitialized(_this));
    _this.handleEditSettings = _this.handleEditSettings.bind(_assertThisInitialized(_this));
    _this.onAddConfirm = _this.onAddConfirm.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SettingComponentSelector, [{
    key: "handleSelectComp",
    value: function handleSelectComp(comp) {
      var selectedComp = comp;
      var componentSchema = this.props.componentSchemas;
      var compSchemas = {};

      for (var i in componentSchema) {
        var schema = componentSchema[i];
        compSchemas[schema.ID] = schema;
      }

      var selectedSchema = compSchemas[selectedComp.Schema_ID];
      this.setState({
        selectedComp: selectedComp,
        selectedSchema: selectedSchema
      });
    }
  }, {
    key: "handleDeleteComp",
    value: function handleDeleteComp(index) {
      var i = index;
      var oldSettingData = this.state.settingData;
      var currentComps = this.state.currentComps.slice();
      var compToDelete = currentComps[i];
      currentComps.splice(i, 1);
      var newCurrentComps = currentComps; // console.log("newCurrentComps");
      // console.log(newCurrentComps);

      var newSettingData = null;

      if (Array.isArray(oldSettingData)) {
        var indexToDelete = -1;

        for (var y = 0; y < oldSettingData.length; y++) {
          var sett = oldSettingData[y];

          if (sett.Component_ID === compToDelete.ID) {
            indexToDelete = y;
            break;
          }
        }

        newSettingData = oldSettingData.slice();
        if (indexToDelete !== -1) newSettingData.splice(indexToDelete, 1);
      } else {
        newSettingData = {};
      } // console.log("newCurrentComps");
      // console.log(newCurrentComps);
      // console.log("newSettingData");
      // console.log(newSettingData);


      this.setState({
        settingData: newSettingData,
        selectedComp: null,
        selectedSchema: null,
        currentComps: newCurrentComps
      });
    }
  }, {
    key: "handleEditSettings",
    value: function handleEditSettings(comp, schema) {
      this.setState({
        selectedComp: comp,
        selectedSchema: schema,
        //selectedSlot: slot,
        editing: true
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      //let slots = this.state.slots;
      var newSettingData = null;
      var settingData = null;

      if (this.props.maxNumberElement === 1) {
        newSettingData = {};
        settingData = Object.assign({}, this.state.settingData);
      } else {
        newSettingData = [];
        settingData = this.state.settingData.slice();
      }

      this.setState({
        editing: false,
        selectedSlot: null,
        selectedComp: null,
        currentComps: [],
        settingData: newSettingData
      }); // console.log("settingData");
      // console.log(settingData);

      this.props.onConfirm(this.props.id, settingData);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.setState({
        editing: false,
        selectedSlot: null,
        selectedComp: null,
        currentComps: [],
        settingData: []
      });
      this.props.onCancel();
    }
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      var selectedComp = this.state.selectedComp; // let selectedSlot = this.state.selectedSlot;
      // let category = this.state.category;
      //let slots = this.state.slots;

      var oldSettingsData = this.state.settingData;
      var settingsData = null;
      var settingData = null;
      var index = null;

      if (Array.isArray(oldSettingsData)) {
        settingsData = oldSettingsData.slice();
        Object.keys(settingsData).forEach(function (settingIndex) {
          var sett = settingsData[settingIndex];

          if (sett.Component_ID === selectedComp.ID) {
            settingData = sett;
            index = settingIndex;
          }
        });
      } else {
        settingData = oldSettingsData;
      }

      if (settingData === null) {
        console.log("Settings data not found in SettingComponentSelector-editing");
        return;
      }

      var newSettingData = Object.assign({}, settingData, data);

      if (data.ImmersionLiquid !== null && data.ImmersionLiquid !== undefined) {
        var oldImmersionLiquid = Object.assign({}, settingData.ImmersionLiquid);
        var immersionLiquid = Object.assign(oldImmersionLiquid, data.ImmersionLiquid);
        newSettingData.ImmersionLiquid = immersionLiquid;
      }

      if (settingsData !== null && index !== null) {
        settingsData[index] = newSettingData;
      } else {
        settingsData = newSettingData;
      } // console.log("settingsData");
      // console.log(settingsData);


      this.setState({
        editing: false,
        settingData: settingsData
      });
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      // let selectedSlot = this.state.selectedSlot;
      // if (selectedSlot.includes("AdditionalSlot_")) {
      // 	//if (this.state.editingSettings) {
      // 	this.setState({ editingSettings: false });
      // } else {
      // 	this.setState({ editing: false, editingSettings: false });
      // }
      this.setState({
        editing: false
      });
    }
  }, {
    key: "onAddConfirm",
    value: function onAddConfirm() {
      var selectedComp = this.state.selectedComp;
      var selectedSchema = this.state.selectedSchema; //let selectedSlot = this.props.selectedSlot;
      //let category = this.props.category;

      var currentComps = this.state.currentComps.slice(); // let settingsSchema = this.props.settingSchemas;
      // let experimentalsSchema = this.props.experimentalSchemas;

      var oldSettingData = this.state.settingData;
      var settingData = null;
      var isArray = null;

      if (Array.isArray(oldSettingData)) {
        settingData = this.state.settingData.slice();
        isArray = true;
      } else {
        settingData = this.state.settingData;
        var compID = settingData.Component_ID;
        if (compID !== null && compID !== undefined) return;
        isArray = false;
      } // let settingsSchemas = {};
      // for (let i in settingsSchema) {
      // 	let schema = settingsSchema[i];
      // 	settingsSchemas[schema.ID] = schema;
      // }
      // let expSchemas = {};
      // for (let i in experimentalsSchema) {
      // 	let schema = experimentalsSchema[i];
      // 	expSchemas[schema.ID] = schema;
      // }
      // if (currentComp !== null && currentComp !== undefined) {
      // 	return;
      // }


      if (selectedComp === null || selectedComp === undefined) {
        this.setState({
          selectedComp: null,
          selectedSchema: null
        });
        return;
      } // let settingsName = selectedSchema.modelSettings + string_json_ext;
      // let currentSchema = settingsSchemas[settingsName];


      var currentSchema = this.props.schema;
      var uuid = (0, _uuid.v4)();
      var settingCompData = null;

      if (selectedSchema.modelSettings === "NA") {
        settingCompData = {
          Name: "".concat(selectedSchema.title),
          ID: uuid,
          Component_ID: selectedComp.ID
        };
      } else {
        if (selectedSchema.modelSettings === "ObjectiveSettings") {
          var uuid2 = (0, _uuid.v4)();
          var objSettingsSchema = currentSchema[0];
          var immersionLiquidSchema = currentSchema[1];
          settingCompData = {
            Name: "".concat(objSettingsSchema.title),
            ID: uuid,
            Component_ID: selectedComp.ID,
            Tier: objSettingsSchema.tier,
            Schema_ID: objSettingsSchema.ID,
            Version: objSettingsSchema.version
          };
          var immersionLiquid = {
            Name: "".concat(immersionLiquidSchema.title),
            ID: uuid2,
            Tier: immersionLiquidSchema.tier,
            Schema_ID: immersionLiquidSchema.ID,
            Version: immersionLiquidSchema.version
          };
          settingCompData.ImmersionLiquid = immersionLiquid; // if (
          // 	this.props.imageMetadata !== null &&
          // 	this.props.imageMetadata !== undefined &&
          // 	this.props.imageMetadata.ObjectiveSettings !== null &&
          // 	this.props.ObjectiveSettings !== undefined
          // ) {
          // 	let imageMetadataObjSettings = this.props.imageMetadata
          // 		.ObjectiveSettings;
          // 	let newSettingsCompData = Object.assign(
          // 		{},
          // 		settingCompData,
          // 		imageMetadataObjSettings
          // 	);
          // 	if (
          // 		imageMetadataObjSettings.ImmersionLiquid !== null &&
          // 		imageMetadataObjSettings.ImmersionLiquid !== undefined
          // 	) {
          // 		let imageMetadataImmersionLiquid =
          // 			imageMetadataObjSettings.ImmersionLiquid;
          // 		newSettingsCompData.ImmersionLiquid = imageMetadataImmersionLiquid;
          // 	}
          // 	settingCompData = newSettingsCompData;
          // }
        } else {
          settingCompData = {
            Name: "".concat(currentSchema.title),
            ID: uuid,
            Component_ID: selectedComp.ID,
            Tier: currentSchema.tier,
            Schema_ID: currentSchema.ID,
            Version: currentSchema.version
          }; // if (selectedSchema.modelSettings === "ImagingEnvironment.json") {
          // 	if (
          // 		this.props.imageMetadata !== null &&
          // 		this.props.imageMetadata !== undefined &&
          // 		this.props.imageMetadata.ImagingEnvironment !== null &&
          // 		this.props.ImagingEnvironment !== undefined
          // 	) {
          // 		let imageMetadataImgEnv = this.props.imageMetadata
          // 			.ImagingEnvironment;
          // 		let newSettingsCompData = Object.assign(
          // 			{},
          // 			settingCompData,
          // 			imageMetadataImgEnv
          // 		);
          // 		settingCompData = newSettingsCompData;
          // 	}
          // }
        }
      }

      var newSettingCompData = null;

      if (this.props.imageMetadata !== null && this.props.imageMetadata !== undefined) {
        var imageMetadata = this.props.imageMetadata;

        if (selectedSchema.modelSettings === "ObjectiveSettings" && imageMetadata.ObjectiveSettings !== null && imageMetadata.ObjectiveSettings !== undefined) {
          var imageObjSettings = imageMetadata.ObjectiveSettings;
          newSettingCompData = Object.assign({}, imageObjSettings, settingCompData);
          var newImmersionLiquid = null;

          if (imageObjSettings.ImmersionLiquid !== null && imageObjSettings.ImmersionLiquid !== undefined) {
            newImmersionLiquid = Object.assign({}, imageObjSettings.ImmersionLiquid, settingCompData.ImmersionLiquid);
          } else {
            newImmersionLiquid = settingCompData.ImmersionLiquid;
          }

          newSettingCompData.ImmersionLiquid = newImmersionLiquid;
        }
      }

      if (newSettingCompData === null || newSettingCompData === undefined) {
        newSettingCompData = settingCompData;
      }

      currentComps.push(selectedComp);

      if (isArray) {
        settingData.push(newSettingCompData);
      } else {
        settingData = newSettingCompData;
      } // console.log("currentComps");
      // console.log(currentComps);
      // console.log("settingData");
      // console.log(settingData);


      this.setState({
        //tmpSlots: tmpSlots,
        settingData: settingData,
        currentComps: currentComps
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var buttonContainerRow = {
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "center",
        padding: "5px"
      };
      var button2 = {
        width: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var regularImageStyle = {
        height: "80px",
        width: "80px",
        margin: "auto"
      };
      var modalGridContainer = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var modalGridPanel = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        height: "90%",
        alignItems: "left"
      };
      var modalGrid = {
        display: "flex",
        flexDirection: "column",
        //flexWrap: "wrap",
        justifyContent: "flex-start",
        overflow: "auto",
        width: "20%",
        height: "100%",
        maxHeight: "100%" //alignItems: "center",

      };
      var modalTopListContainer = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        overflow: "auto",
        height: "250px",
        maxHeight: "250px",
        alignItems: "center",
        width: "80%"
      };
      var modalTopList = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
      };
      var multiTab = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "auto",
        maxHeight: "100%",
        minWidth: "70%",
        justifyContent: "flex-start",
        width: "70%",
        alignItems: "left",
        marginLeft: "10px"
      };
      var buttonStyle = {
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "white",
        padding: "0px",
        margin: "10px",
        border: "2px solid grey",
        fontSize: "14px",
        color: "inherit",
        cursor: "pointer"
      };
      var fontSize = _constants.number_canvas_element_icons_height + 2;
      var grabberCloserSize = _constants.number_canvas_element_icons_height;
      var styleCloser = {
        lineHeight: "".concat(grabberCloserSize, "px"),
        padding: "0px",
        border: "none",
        fontSize: "".concat(fontSize, "px"),
        backgroundColor: "transparent",
        cursor: "pointer",
        color: "grey",
        textAlign: "right",
        verticalAlign: "middle" //position: "relative",
        //left: "5px",
        //top: "5px",

      };
      var styleValidation1 = {
        position: "relative",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center",
        left: "22px",
        top: "2px"
      };
      var styleValidation2 = {
        //position: "relative",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center" //left: "15px",
        //top: "5px",

      };
      var styleIcons = {
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "left",
        //padding: "5px",
        position: "relative",
        left: "5px",
        top: "10px",
        width: "90%",
        height: "24px"
      };
      var styleValidated1 = Object.assign({}, styleValidation1, {
        color: "green"
      });
      var styleNotValidated1 = Object.assign({}, styleValidation1, {
        color: "red"
      });

      var isValid1 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated1
      }, "\u25CF");

      var isInvalid1 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleNotValidated1
      }, "\u25CF");

      var styleValidated2 = Object.assign({}, styleValidation2, {
        color: "green"
      });
      var styleNotValidated2 = Object.assign({}, styleValidation2, {
        color: "red"
      });

      var isValid2 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated2
      }, "\u25CF");

      var isInvalid2 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleNotValidated2
      }, "\u25CF");

      var componentSchema = this.props.componentSchemas;
      var compSchemas = {};

      for (var i in componentSchema) {
        var schema = componentSchema[i];
        compSchemas[schema.ID] = schema;
      }

      var settingsSchema = this.props.settingSchemas;
      var settingsSchemas = {};

      for (var _i in settingsSchema) {
        var _schema = settingsSchema[_i];
        settingsSchemas[_schema.ID] = _schema;
      }

      var experimentalsSchema = this.props.experimentalSchemas;
      var expSchemas = {};

      for (var _i2 in experimentalsSchema) {
        var _schema2 = experimentalsSchema[_i2];
        expSchemas[_schema2.ID] = _schema2;
      }

      var selectedComp = this.state.selectedComp;
      var selectedSchema = this.state.selectedSchema;
      var selectedID = null;

      if (selectedComp !== null && selectedComp !== undefined && (selectedSchema === null || selectedSchema === undefined)) {
        selectedID = selectedComp.Schema_ID;
        selectedSchema = compSchemas[selectedID];
      }

      if (this.state.editing) {
        var settingsData = this.state.settingData;
        var settingData = null;

        if (Array.isArray(settingsData)) {
          Object.keys(settingsData).forEach(function (settingIndex) {
            var sett = settingsData[settingIndex];
            if (sett.Component_ID === selectedComp.ID) settingData = sett;
          });
        } else {
          settingData = settingsData;
        }

        if (settingData === null) {
          console.log("Settings data not found in SettingComponentSelector-editing");
          return;
        }

        var settingsObj = null;

        if (settingData.ImmersionLiquid !== null && settingData.ImmersionLiquid !== undefined) {
          settingsObj = [];
          settingsObj.push(settingData);
          settingsObj.push(settingData.ImmersionLiquid);
        } else {
          settingsObj = settingData;
        }

        var id = settingData.ID; //let settingsName = selectedSchema.modelSettings + string_json_ext;
        //let settings = settingsSchemas[settingsName];

        var settings = this.props.schema;
        return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schema: settings,
          inputData: settingsObj,
          id: id,
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          editable: true
        });
      } else {
        var itemList = [];
        var _settingsData = this.state.settingData;
        var currentComps = this.state.currentComps; // console.log("currentComps");
        // console.log(currentComps);
        // console.log("settingsData");
        // console.log(settingsData);

        Object.keys(this.props.componentData).forEach(function (compIndex) {
          var comp = _this2.props.componentData[compIndex];
          var schema_id = comp.Schema_ID;
          var compSchema = compSchemas[schema_id];
          if (compSchema === null) return;
          var compSchemaCategory = compSchema.category;
          var category = _this2.props.category;

          if (category.includes(schema_id.replace(_constants.string_json_ext, "")) || category.includes(compSchemaCategory) || category.includes(compSchemaCategory.substring(0, compSchemaCategory.indexOf(".")))) {
            var found = false;
            Object.keys(currentComps).forEach(function (tmpCompIndex) {
              var tmpComp = currentComps[tmpCompIndex];
              if (comp.ID === tmpComp.ID) found = true;
            });
            if (found) return;
            var compImage = url.resolve(_this2.props.imagesPath, compSchema.image);

            var compItemImage = /*#__PURE__*/_react.default.createElement("img", {
              src: compImage + (compImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
              alt: comp.Name,
              style: regularImageStyle
            });

            var buttonStyleModified = Object.assign({}, buttonStyle, {
              width: "100%"
            });

            if (comp === selectedComp) {
              buttonStyleModified = Object.assign({}, buttonStyleModified, {
                border: "2px solid cyan"
              });
            } else {
              buttonStyleModified = buttonStyleModified;
            }

            var validation = validate(comp, compSchema);
            var validated = validation.valid;
            var valid = null;

            if (validated) {
              valid = isValid1;
            } else {
              valid = isInvalid1;
            }

            var compButton = /*#__PURE__*/_react.default.createElement("div", {
              key: "div-" + comp.Name,
              style: {
                display: "flex",
                width: "100%"
              }
            }, valid, /*#__PURE__*/_react.default.createElement("button", {
              key: "button-" + comp.Name,
              style: buttonStyleModified,
              onClick: function onClick() {
                return _this2.handleSelectComp(comp);
              }
            }, compItemImage, comp.Name));

            itemList.push(compButton);
          }
        });
        var slotList = [];
        Object.keys(currentComps).forEach(function (compIndex) {
          var comp = currentComps[compIndex];
          var fullButt = null; // console.log("comp");
          // console.log(comp);

          if (comp !== null && comp !== undefined) {
            var schema_id = comp.Schema_ID;
            var compSchema = compSchemas[schema_id];
            if (compSchema === null) return;
            var _settingData = null;

            if (Array.isArray(_settingsData)) {
              Object.keys(_settingsData).forEach(function (settingIndex) {
                var sett = _settingsData[settingIndex];
                if (sett.Component_ID === comp.ID) _settingData = sett;
              });
            } else {
              _settingData = _settingsData;
            }

            if (_settingData === null) {
              console.log("Settings data not found in SettingComponentSelector-display");
              return;
            }

            var compImage = url.resolve(_this2.props.imagesPath, compSchema.image);

            var compItemImage = /*#__PURE__*/_react.default.createElement("img", {
              src: compImage + (compImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
              alt: comp.Name,
              style: regularImageStyle
            });

            var buttonStyleModified = null;

            if (comp === selectedComp) {
              buttonStyleModified = Object.assign({}, buttonStyle, {
                border: "2px solid cyan"
              });
            } else if (compSchema.modelSettings === "NA") {
              buttonStyleModified = Object.assign({}, buttonStyle, {
                opacity: "0.4",
                border: "none"
              });
            } else {
              buttonStyleModified = buttonStyle;
            }

            var valid = null;
            var schemaHasProp = false;

            if (_settingData !== null && _settingData !== undefined) {
              var _schema3 = _this2.props.schema;

              if (_schema3 !== null && _schema3 !== undefined) {
                var validated = false;

                if (_settingData.ImmersionLiquid !== null && _settingData.ImmersionLiquid !== undefined) {
                  var schemaHasProp1 = Object.keys(_schema3[0].properties).length > 0;
                  var schemaHasProp2 = Object.keys(_schema3[1].properties).length > 0;
                  schemaHasProp = schemaHasProp1 && schemaHasProp2;
                  var validation1 = validate(_settingData, _schema3[0]);
                  var validated1 = validation1.valid;
                  var validation2 = validate(_settingData.ImmersionLiquid, _schema3[1]);
                  var validated2 = validation2.valid;
                  validated = validated1 && validated2;
                } else {
                  schemaHasProp = Object.keys(_schema3.properties).length > 0;
                  var validation = validate(_settingData, _schema3);
                  validated = validation.valid;
                }

                if (schemaHasProp) if (validated) {
                  valid = isValid2;
                } else {
                  valid = isInvalid2;
                }
              }
            }

            var butt = null;

            if (compSchema.modelSettings !== "NA" && schemaHasProp) {
              butt = /*#__PURE__*/_react.default.createElement("button", {
                key: "editButton-" + comp.Name,
                style: buttonStyleModified,
                onClick: function onClick() {
                  return _this2.handleEditSettings(comp, compSchema);
                }
              }, compItemImage, comp.Name);
            } else {
              butt = /*#__PURE__*/_react.default.createElement("button", {
                key: "editButton-" + comp.Name,
                style: buttonStyleModified
              }, compItemImage, comp.Name);
            }

            fullButt = /*#__PURE__*/_react.default.createElement("div", {
              key: "fullButton-" + comp.Name
            }, /*#__PURE__*/_react.default.createElement("div", {
              style: styleIcons
            }, /*#__PURE__*/_react.default.createElement("button", {
              key: "deleteButton-" + comp.Name,
              type: "button",
              onClick: function onClick() {
                return _this2.handleDeleteComp(compIndex);
              },
              style: styleCloser
            }, "x"), valid), butt);
            slotList.push(fullButt);
          }
        }); // if (item !== null && item !== undefined) {
        //let items = [];
        // let slots = this.state.slots;
        // let selectedSlot = this.state.selectedSlot;
        // if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
        // 	items = slots[selectedSlot];
        //let comp = this.state.currentComp;

        var width = slotList.length * 150;
        var modalTopListModified = Object.assign({}, modalTopList, {
          width: "".concat(width, "px")
        });

        var topItems = /*#__PURE__*/_react.default.createElement("div", {
          style: modalTopListContainer
        }, /*#__PURE__*/_react.default.createElement("h5", null, "Current component in this slot"), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            overflow: "auto",
            width: "100%",
            maxWidth: "100%"
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: modalTopListModified
        }, slotList)));

        Object.assign(modalGridPanel, {
          height: "60%"
        }); //}

        var multiTabPanel = null;
        if (selectedComp !== null && selectedComp !== undefined) multiTabPanel = /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schema: selectedSchema,
          inputData: selectedComp,
          id: selectedComp.ID,
          onConfirm: this.onAddConfirm,
          onCancel: null,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          notModal: true,
          editable: false
        });
        return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: modalGridContainer
        }, topItems, /*#__PURE__*/_react.default.createElement("div", {
          style: modalGridPanel
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: modalGrid
        }, itemList), /*#__PURE__*/_react.default.createElement("div", {
          style: multiTab
        }, multiTabPanel)), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onConfirm //this.onAddAdditionalConfirm

        }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onCancel //this.onAddAdditionalCancel

        }, "Cancel"))));
      }
    }
  }]);

  return SettingComponentSelector;
}(_react.default.PureComponent);

exports.default = SettingComponentSelector;