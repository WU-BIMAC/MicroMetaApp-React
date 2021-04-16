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

var _propTypes = require("prop-types");

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

var ChannelCanvas_V2 = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ChannelCanvas_V2, _React$PureComponent);

  var _super = _createSuper(ChannelCanvas_V2);

  function ChannelCanvas_V2(props) {
    var _this;

    _classCallCheck(this, ChannelCanvas_V2);

    _this = _super.call(this, props);
    _this.state = {
      //elementList: [],
      elementData: Object.assign({}, _this.props.inputData),
      componentsSchema: {},
      linkedFields: props.linkedFields || {},
      imgHeight: null,
      imgWidth: null,
      backgroundScale: null,
      offsetY: 0,
      offsetX: 0,
      headerOffset: props.headerOffset || 0,
      editing: false,
      editingSettings: false,
      hover: null,
      category: null,
      selectedSlot: null,
      selectedComp: null,
      slots: {},
      tmpSlots: [],
      settingData: {},
      channelData: props.channelData || {}
    };
    var components = {};
    Object.keys(_this.props.componentData).forEach(function (compIndex) {
      var comp = _this.props.componentData[compIndex];
      components[comp.ID] = comp;
    });

    if (props.objective !== null && props.objective !== undefined && props.objectiveSettings !== null && props.objectiveSettings !== undefined) {
      _this.state.slots["Objective"] = props.objective;
    }

    if (props.channelData !== null && props.channelData !== undefined) {
      var lightPath = props.channelData[1];

      if (lightPath !== null && lightPath !== undefined) {
        var componentSettings = lightPath.ComponentSettings;

        if (componentSettings !== null && componentSettings !== undefined) {
          _this.state.settingData = componentSettings;

          for (var slot in componentSettings) {
            var settingDatas = componentSettings[slot];

            if (slot.includes("AdditionalSlot_")) {
              for (var index in settingDatas) {
                var settingData = settingDatas[index];
                var compID = settingData.Component_ID;
                var partialSlots = [];
                if (_this.state.slots[slot] !== null && _this.state.slots[slot] !== undefined) partialSlots = _this.state.slots[slot];
                partialSlots[index] = components[compID];
                _this.state.slots[slot] = partialSlots;
              }
            } else {
              var _settingData = settingDatas;
              var _compID = _settingData.Component_ID;
              _this.state.slots[slot] = components[_compID];
            }
          }
        }
      }
    } //TRANSFER INPUT TO SETTING DATA
    //this.addComponentsIndexesIfMissing = this.addComponentsIndexesIfMissing.bind(this);


    _this.onEditElement = _this.onEditElement.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onInnerElementDataSave = _this.onInnerElementDataSave.bind(_assertThisInitialized(_this));
    _this.onInnerElementDataCancel = _this.onInnerElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onAddAdditionalConfirm = _this.onAddAdditionalConfirm.bind(_assertThisInitialized(_this)); //this.onAddAdditionalCancel = this.onAddAdditionalCancel.bind(this);
    //this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
    //this.getElementData = this.getElementData.bind(this);
    //this.updatedDimensions = this.updatedDimensions.bind(this);
    //this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

    _this.handleClick_additionalItemButton = _this.handleClick_additionalItemButton.bind(_assertThisInitialized(_this));
    _this.handleClick_lightSource = _this.handleClick_lightSource.bind(_assertThisInitialized(_this));
    _this.handleClick_detector = _this.handleClick_detector.bind(_assertThisInitialized(_this));
    _this.handleClick_couplingLens = _this.handleClick_couplingLens.bind(_assertThisInitialized(_this));
    _this.handleClick_relayLens = _this.handleClick_relayLens.bind(_assertThisInitialized(_this));
    _this.handleClick_lightSourceCoupling = _this.handleClick_lightSourceCoupling.bind(_assertThisInitialized(_this));
    _this.handleClick_excitation = _this.handleClick_excitation.bind(_assertThisInitialized(_this));
    _this.handleClick_dichroic = _this.handleClick_dichroic.bind(_assertThisInitialized(_this));
    _this.handleClick_emission = _this.handleClick_emission.bind(_assertThisInitialized(_this));
    _this.handleClick_objective = _this.handleClick_objective.bind(_assertThisInitialized(_this));
    _this.handleSelectComp = _this.handleSelectComp.bind(_assertThisInitialized(_this));
    _this.handleDeleteComp = _this.handleDeleteComp.bind(_assertThisInitialized(_this));
    _this.handleEditSettings = _this.handleEditSettings.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this)); // this.handleScroll = this.handleScroll.bind(this);
    //this.props.updateElementData(this.state.elementData, true);

    return _this;
  }

  _createClass(ChannelCanvas_V2, [{
    key: "onConfirm",
    value: function onConfirm() {
      var channelData = this.state.channelData[0];
      var settingData = this.state.settingData; //let slots = this.state.slots;

      channelData.LightPath.ComponentSettings = settingData;
      this.setState({
        editing: false,
        editingSettings: false,
        category: null,
        selectedSlot: null,
        selectedComp: null,
        slots: {},
        tmpSlots: [],
        settingData: {},
        channelData: {}
      }); // console.log("channelData");
      // console.log(channelData);

      this.props.onConfirm(this.props.id, channelData);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.setState({
        editing: false,
        editingSettings: false,
        category: null,
        selectedSlot: null,
        selectedComp: null,
        slots: {},
        tmpSlots: [],
        settingData: {},
        channelData: {}
      });
      this.props.onCancel();
    }
  }, {
    key: "onInnerElementDataCancel",
    value: function onInnerElementDataCancel() {
      this.setState({
        editing: false,
        editingSettings: false,
        category: null,
        selectedSlot: null,
        selectedComp: null,
        tmpSlots: null
      });
    }
  }, {
    key: "onInnerElementDataSave",
    value: function onInnerElementDataSave(id, data) {
      //console.log("onElementDataSave");
      var selectedComp = this.state.selectedComp;
      var selectedSchema = this.state.selectedSchema;
      var selectedSlot = this.state.selectedSlot;
      var category = this.state.category;
      var slots = this.state.slots;
      var settingsSchema = this.props.settingSchemas;
      var experimentalsSchema = this.props.experimentalSchemas;
      var settingData = Object.assign({}, this.state.settingData);
      var settingsSchemas = {};

      for (var i in settingsSchema) {
        var schema = settingsSchema[i];
        settingsSchemas[schema.ID] = schema;
      }

      var expSchemas = {};

      for (var _i in experimentalsSchema) {
        var _schema = experimentalsSchema[_i];
        expSchemas[_schema.ID] = _schema;
      }

      if (category !== null) {
        slots = Object.assign({}, slots);

        if (selectedSlot.includes("AdditionalSlot_")) {
          var tmpSlots = this.state.tmpSlots;
          slots[selectedSlot] = tmpSlots;
          var newSelectedSettingData = [];

          for (var index1 = 0; index1 < tmpSlots.length; index1++) {
            var tmp = tmpSlots[index1];
            var compID = tmp.ID;

            for (var index2 = 0; index2 < settingData[selectedSlot].length; index2++) {
              var sett = settingData[selectedSlot][index2];
              var settID = sett.Component_ID;

              if (compID === settID) {
                newSelectedSettingData.push(sett);
              }
            }
          }

          settingData[selectedSlot] = newSelectedSettingData;
        } else {
          var earlyReturn = false;

          if (selectedComp === null || selectedComp === undefined) {
            earlyReturn = true;
          } else {
            var validation = validate(selectedComp, selectedSchema);
            var validated = validation.valid;

            if (!validated) {
              earlyReturn = true;
            }
          }

          if (earlyReturn) {
            // this.setState({
            // 	editing: faltruese,
            // 	editingSettings: false,
            // 	category: null,
            // 	selectedSlot: null,
            // 	selectedComp: null,
            // 	selectedSchema: null,
            // });
            return;
          }

          slots[selectedSlot] = selectedComp;
          var settingsName = selectedSchema.modelSettings + _constants.string_json_ext;
          var currentSchema = settingsSchemas[settingsName];
          var settingCompData = null;
          var uuid = (0, _uuid.v4)();

          if (selectedSchema.modelSettings === "NA") {
            settingCompData = {
              Name: "".concat(selectedSchema.title),
              ID: uuid,
              Component_ID: selectedComp.ID
            };
          } else {
            settingCompData = {
              Name: "".concat(currentSchema.title),
              ID: uuid,
              Component_ID: selectedComp.ID,
              Tier: currentSchema.tier,
              Schema_ID: currentSchema.ID,
              ModelVersion: currentSchema.modelVersion,
              Extension: currentSchema.extension,
              Domain: currentSchema.domain,
              Category: currentSchema.category
            };
          }

          if (selectedComp.Schema_ID === "Objective.json") {
            var uuid2 = (0, _uuid.v4)();
            var immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];

            if (settingCompData.ImmersionLiquid !== null || settingCompData.ImmersionLiquid !== undefined) {
              settingCompData.ImmersionLiquid = {
                Name: "".concat(immersionLiquidSchema.title),
                ID: uuid2,
                Tier: immersionLiquidSchema.tier,
                Schema_ID: immersionLiquidSchema.ID,
                ModelVersion: immersionLiquidSchema.modelVersion,
                Extension: immersionLiquidSchema.extension,
                Domain: immersionLiquidSchema.domain,
                Category: immersionLiquidSchema.category
              };
            }
          }

          settingData[selectedSlot] = settingCompData;
        }

        this.setState({
          editing: false,
          editingSettings: false,
          category: null,
          selectedSlot: null,
          selectedComp: null,
          selectedSchema: null,
          slots: slots,
          settingData: settingData
        });
      }
    }
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      //console.log("onElementDataSave");
      var selectedComp = this.state.selectedComp;
      var selectedSlot = this.state.selectedSlot; //let category = this.state.category;

      var settingData = Object.assign({}, this.state.settingData);

      if (this.state.editingSettings) {
        if (selectedSlot.includes("AdditionalSlot_")) {
          var currentSlots = this.state.tmpSlots;
          var index = currentSlots.indexOf(selectedComp);
          var obj = settingData[selectedSlot][index];
          settingData[selectedSlot][index] = Object.assign(obj, data);
          this.setState({
            editingSettings: false,
            settingData: settingData
          });
        } else {
          if (!selectedSlot.includes("Objective")) {
            var _obj = settingData[selectedSlot];
            settingData[selectedSlot] = Object.assign(_obj, data);
          }

          this.setState({
            editing: false,
            editingSettings: false,
            settingData: settingData,
            category: null,
            selectedSlot: null,
            selectedComp: null,
            selectedSchema: null
          });
        }
      } else {
        var currentChannelData = data;
        var currentLightPath = data.LightPath;
        var currentFluorophore = data.Fluorophore;
        var objects = this.state.channelData.slice();
        var oldChannelData = Object.assign({}, objects[0]);
        var oldLightPath = Object.assign({}, objects[1]);
        var oldFluorophore = Object.assign({}, objects[2]);
        var newChannelData = Object.assign(oldChannelData, currentChannelData);
        var newLightPath = Object.assign(oldLightPath, currentLightPath);
        var newFluorophore = Object.assign(oldFluorophore, currentFluorophore);
        newChannelData.LightPath = newLightPath;
        newChannelData.Fluorophore = newFluorophore;
        var newObjects = [];
        newObjects[0] = newChannelData;
        newObjects[1] = newLightPath;
        newObjects[2] = newFluorophore;
        this.setState({
          editing: false,
          editingSettings: false,
          channelData: newObjects,
          category: null,
          selectedSlot: null,
          selectedComp: null,
          selectedSchema: null
        });
      }
    }
  }, {
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
    value: function handleDeleteComp(selectedSlot, index) {
      var i = index;
      var settingsData = Object.assign({}, this.state.settingData);

      if (selectedSlot.includes("AdditionalSlot_")) {
        var settingData = settingsData[selectedSlot];
        var newTmpSlots = this.state.tmpSlots.slice();
        var compToDelete = newTmpSlots[i];
        newTmpSlots.splice(i, 1);
        var indexToDelete = -1;

        if (settingData !== null && settingData !== undefined) {
          for (var y = 0; y < settingData.length; y++) {
            var sett = settingData[y];

            if (sett.Component_ID === compToDelete.ID) {
              indexToDelete = y;
              break;
            }
          }

          var newSettingData = settingData.slice();
          if (indexToDelete !== -1) newSettingData.splice(indexToDelete, 1);
          settingsData[selectedSlot] = newSettingData;
        }

        this.setState({
          tmpSlots: newTmpSlots,
          settingData: settingsData
        });
      } else {
        var slots = Object.assign({}, this.state.slots);
        delete slots[selectedSlot];
        if (settingsData[selectedSlot] !== null && settingsData[selectedSlot] !== undefined) delete settingsData[selectedSlot];
        this.setState({
          slots: slots,
          settingData: settingsData
        });
      }
    }
  }, {
    key: "handleEditSettings",
    value: function handleEditSettings(comp, schema, slot) {
      this.setState({
        selectedComp: comp,
        selectedSchema: schema,
        selectedSlot: slot,
        editing: true,
        editingSettings: true
      });
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      var selectedSlot = this.state.selectedSlot;

      if (selectedSlot !== null && selectedSlot !== undefined && selectedSlot.includes("AdditionalSlot_")) {
        this.setState({
          editingSettings: false
        });
      } else {
        this.setState({
          editing: false,
          editingSettings: false
        });
      }
    }
  }, {
    key: "onEditElement",
    value: function onEditElement() {
      this.setState({
        editing: true
      });
    }
  }, {
    key: "onAddAdditionalConfirm",
    value: function onAddAdditionalConfirm() {
      var selectedComp = this.state.selectedComp;
      var selectedSchema = this.state.selectedSchema;
      var selectedSlot = this.state.selectedSlot;
      var category = this.state.category;
      var settingsSchema = this.props.settingSchemas;
      var settingData = Object.assign({}, this.state.settingData);
      var settingsSchemas = {};

      for (var i in settingsSchema) {
        var schema = settingsSchema[i];
        settingsSchemas[schema.ID] = schema;
      }

      if (category !== null) {
        if (selectedSlot.includes("AdditionalSlot_")) {
          if (selectedComp === null || selectedComp === undefined) {
            this.setState({
              selectedSlot: null,
              selectedComp: null
            });
            return;
          }

          var tmpSlots = this.state.tmpSlots.slice();
          tmpSlots.push(selectedComp);
          var settingsName = selectedSchema.modelSettings + _constants.string_json_ext;
          var currentSchema = settingsSchemas[settingsName];
          var uuid = (0, _uuid.v4)();
          var settingCompData = null;

          if (selectedSchema.modelSettings === "NA") {
            settingCompData = {
              Name: "".concat(selectedSchema.title),
              ID: uuid,
              Component_ID: selectedComp.ID
            };
          } else {
            settingCompData = {
              Name: "".concat(currentSchema.title),
              ID: uuid,
              Component_ID: selectedComp.ID,
              Tier: currentSchema.tier,
              Schema_ID: currentSchema.ID,
              ModelVersion: currentSchema.modelVersion,
              Extension: currentSchema.extension,
              Domain: currentSchema.domain,
              Category: currentSchema.category
            };
          }

          var slotSettings = [];

          if (settingData[selectedSlot] !== null && settingData[selectedSlot] !== undefined) {
            slotSettings = settingData[selectedSlot];
          }

          slotSettings.push(settingCompData);
          settingData[selectedSlot] = slotSettings;
          this.setState({
            tmpSlots: tmpSlots,
            settingData: settingData,
            selectedComp: null,
            selectedSchema: null
          });
        }
      }
    }
  }, {
    key: "handleClick_additionalItemButton",
    value: function handleClick_additionalItemButton(category, index) {
      var i = Number(index);
      var selectedSlot = "AdditionalSlot_" + i;
      var slots = this.state.slots;
      var comp = null;
      var localComps = null;

      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) {
        localComps = slots[selectedSlot];
        comp = localComps[localComps.length - 1];
      } else {
        localComps = [];
      }

      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp,
        tmpSlots: localComps
      });
    }
  }, {
    key: "handleClick_lightSource",
    value: function handleClick_lightSource() {
      var category = _constants.channelPath_LightSource;
      var selectedSlot = "LightSource";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_detector",
    value: function handleClick_detector() {
      var category = _constants.channelPath_Detector;
      var selectedSlot = "Detector";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_couplingLens",
    value: function handleClick_couplingLens() {
      var category = _constants.channelPath_CouplingLens;
      var selectedSlot = "CouplingLens";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_relayLens",
    value: function handleClick_relayLens() {
      var category = _constants.channelPath_RelayLens;
      var selectedSlot = "RelayLens";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_lightSourceCoupling",
    value: function handleClick_lightSourceCoupling() {
      var category = _constants.channelPath_LightSourceCoupling;
      var selectedSlot = "LightSourceCoupling";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_excitation",
    value: function handleClick_excitation() {
      var category = _constants.channelPath_Excitation;
      var selectedSlot = "ExcitationFilter";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_dichroic",
    value: function handleClick_dichroic() {
      var category = _constants.channelPath_Dichroic;
      var selectedSlot = "Dichroic";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_emission",
    value: function handleClick_emission() {
      var category = _constants.channelPath_Emission;
      var selectedSlot = "EmissionFilter";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "handleClick_objective",
    value: function handleClick_objective() {
      var category = _constants.channelPath_Objective;
      var selectedSlot = "Objective";
      var slots = this.state.slots;
      var comp = null;
      if (slots[selectedSlot] !== null && slots[selectedSlot] !== undefined) comp = slots[selectedSlot];
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot,
        selectedComp: comp
      });
    }
  }, {
    key: "createAddButton",
    value: function createAddButton(buttonStyle, addButtonImage, addButtonImageStyle, index, category, isEnabled) {
      var _this2 = this;

      var image = /*#__PURE__*/_react.default.createElement("img", {
        src: addButtonImage + (addButtonImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "Add",
        style: addButtonImageStyle
      });

      if (isEnabled) return /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: function onClick() {
          return _this2.handleClick_additionalItemButton(category, index);
        }
      }, image, "Add additional element(s)");
      var buttStyle = Object.assign({}, buttonStyle, {
        border: "none"
      });
      return /*#__PURE__*/_react.default.createElement("button", {
        style: buttStyle,
        disabled: true
      }, image, "Add additional element(s)");
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

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
        //flexWrap: "wrap",
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
      var styleValidation = {
        position: "absolute",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center"
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
      var styleValidated = Object.assign({}, styleValidation, {
        color: "green"
      });
      var styleNotValidated = Object.assign({}, styleValidation, {
        color: "red"
      });
      var styleValidated1 = Object.assign({}, styleValidation1, {
        color: "green"
      });
      var styleNotValidated1 = Object.assign({}, styleValidation1, {
        color: "red"
      });
      var styleValidated2 = Object.assign({}, styleValidation2, {
        color: "green"
      });
      var styleNotValidated2 = Object.assign({}, styleValidation2, {
        color: "red"
      });

      var isValid = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated
      }, "\u25CF");

      var isInvalid = /*#__PURE__*/_react.default.createElement("div", {
        style: styleNotValidated
      }, "\u25CF");

      var isValid1 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated1
      }, "\u25CF");

      var isInvalid1 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleNotValidated1
      }, "\u25CF");

      var isValid2 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated2
      }, "\u25CF");

      var isInvalid2 = /*#__PURE__*/_react.default.createElement("div", {
        style: styleNotValidated2
      }, "\u25CF");

      var channelData = this.state.channelData;
      var settingData = this.state.settingData;
      var slots = this.state.slots;
      var componentSchema = this.props.componentSchemas;
      var compSchemas = {};

      for (var i in componentSchema) {
        var schema = componentSchema[i];
        compSchemas[schema.ID] = schema;
      }

      var settingsSchema = this.props.settingSchemas;
      var settingsSchemas = {};

      for (var _i2 in settingsSchema) {
        var _schema2 = settingsSchema[_i2];
        settingsSchemas[_schema2.ID] = _schema2;
      }

      var experimentalsSchema = this.props.experimentalSchemas;
      var expSchemas = {};

      for (var _i3 in experimentalsSchema) {
        var _schema3 = experimentalsSchema[_i3];
        expSchemas[_schema3.ID] = _schema3;
      }

      var selectedComp = this.state.selectedComp;
      var selectedSlot = this.state.selectedSlot;
      var selectedSchema = null;
      var selectedID = null;

      if (selectedComp !== null && selectedComp !== undefined && (selectedSchema === null || selectedSchema === undefined)) {
        selectedID = selectedComp.Schema_ID;
        selectedSchema = compSchemas[selectedID];
      }

      if (this.state.editing) {
        if (this.state.editingSettings) {
          var settingsName = selectedSchema.modelSettings + _constants.string_json_ext;
          var settings = null;
          var comp = null;
          var id = null;
          var editable = true;

          if (selectedComp.Schema_ID === "Objective.json") {
            //let settingCompData = settingData[selectedSlot];
            var settingCompData = this.props.objectiveSettings;
            id = settingCompData.ID;
            var immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];
            var immersionLiquid = settingCompData.ImmersionLiquid;
            comp = [];
            comp[0] = settingCompData;
            comp[1] = immersionLiquid;
            settings = [];
            settings[0] = settingsSchemas[settingsName];
            settings[1] = immersionLiquidSchema;
            editable = false;
          } else {
            var _settingCompData = null;

            if (selectedSlot.includes("AdditionalSlot_")) {
              var currentSlots = this.state.tmpSlots;
              var index = currentSlots.indexOf(selectedComp);
              _settingCompData = settingData[selectedSlot][index];
            } else {
              _settingCompData = settingData[selectedSlot];
            }

            id = _settingCompData.ID;
            settings = settingsSchemas[settingsName];
            comp = _settingCompData;
          }

          return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
            schema: settings,
            inputData: comp,
            id: id,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
            elementByType: this.props.elementByType,
            editable: editable,
            isDebug: this.props.isDebug
          });
        } else if (this.state.category === null) {
          return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
            schema: this.props.schema,
            inputData: channelData,
            id: this.props.id,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
            elementByType: this.props.elementByType,
            editable: true,
            isDebug: this.props.isDebug
          });
        } else {
          var itemList = [];
          Object.keys(this.props.componentData).forEach(function (compIndex) {
            var comp = _this3.props.componentData[compIndex];
            var schema_id = comp.Schema_ID;
            var compSchema = compSchemas[schema_id];
            if (compSchema === null) return;
            var compSchemaCategory = compSchema.category;

            if (_this3.state.category.includes(schema_id.replace(_constants.string_json_ext, "")) || _this3.state.category.includes(compSchemaCategory) || _this3.state.category.includes(compSchemaCategory.substring(0, compSchemaCategory.indexOf(".")))) {
              if (selectedSlot.includes("AdditionalSlot_")) {
                var items = _this3.state.tmpSlots;
                var found = false;
                Object.keys(items).forEach(function (tmpCompIndex) {
                  var tmpComp = items[tmpCompIndex];
                  if (comp.ID === tmpComp.ID) found = true;
                });
                if (found) return;
              }

              var compImage = url.resolve(_this3.props.imagesPath, compSchema.image);

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
              var _valid = null;

              if (validated) {
                _valid = isValid1;
              } else {
                _valid = isInvalid1;
              }

              var compButton = /*#__PURE__*/_react.default.createElement("div", {
                key: "div-" + comp.Name,
                style: {
                  display: "flex",
                  width: "100%"
                }
              }, _valid, /*#__PURE__*/_react.default.createElement("button", {
                key: "button-" + comp.Name,
                style: buttonStyleModified,
                onClick: function onClick() {
                  return _this3.handleSelectComp(comp);
                }
              }, compItemImage, comp.Name));

              itemList.push(compButton);
            }
          });
          var topItems = null;
          var confirmCallback = null;

          if (selectedSlot.includes("AdditionalSlot_")) {
            //let items = [];
            // let slots = this.state.slots;
            // let selectedSlot = this.state.selectedSlot;
            // if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
            // 	items = slots[selectedSlot];
            var items = this.state.tmpSlots;
            var settingDataSlot = settingData[selectedSlot];
            var slotList = [];
            Object.keys(items).forEach(function (compIndex) {
              var comp = items[compIndex];
              var schema_id = comp.Schema_ID;
              var compSchema = compSchemas[schema_id];
              if (compSchema === null) return;
              var compImage = url.resolve(_this3.props.imagesPath, compSchema.image);

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

              if (settingDataSlot !== null && settingDataSlot !== undefined) {
                var settingDataObj = settingDataSlot[compIndex];

                if (settingDataObj !== null && settingDataObj !== undefined) {
                  var _schema4 = settingsSchemas[settingDataObj.Schema_ID];

                  if (_schema4 !== null && _schema4 !== undefined) {
                    schemaHasProp = Object.keys(_schema4.properties).length > 0;

                    if (schemaHasProp) {
                      var validation = validate(settingDataObj, _schema4);
                      var validated = validation.valid;

                      if (validated) {
                        valid = isValid2;
                      } else {
                        valid = isInvalid2;
                      }
                    }
                  }
                }
              }

              var butt = null;

              if (compSchema.modelSettings !== "NA" && schemaHasProp) {
                butt = /*#__PURE__*/_react.default.createElement("button", {
                  key: "button-" + comp.Name,
                  style: buttonStyleModified,
                  onClick: function onClick() {
                    return _this3.handleEditSettings(comp, compSchema, selectedSlot);
                  }
                }, compItemImage, comp.Name);
              } else {
                butt = /*#__PURE__*/_react.default.createElement("button", {
                  key: "button-" + comp.Name,
                  style: buttonStyleModified
                }, compItemImage, comp.Name);
              }

              slotList.push( /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
                style: styleIcons
              }, /*#__PURE__*/_react.default.createElement("button", {
                type: "button",
                onClick: function onClick() {
                  return _this3.handleDeleteComp(selectedSlot, compIndex);
                },
                style: styleCloser
              }, "x"), valid), butt));
            });
            var arrowedSlotList = [];

            for (var _i4 = 0; _i4 < slotList.length; _i4++) {
              var button1 = slotList[_i4];
              var nextIndex = _i4 + 1;
              var hasConnection = false;

              if (slotList[nextIndex] !== null && slotList[nextIndex] !== undefined) {
                hasConnection = true;
              }

              var id1 = "button" + _i4;
              var id2 = "button" + nextIndex;
              var relations = [];

              if (hasConnection) {
                relations = [{
                  targetId: "".concat(id2),
                  targetAnchor: "left",
                  sourceAnchor: "right"
                }];
              }

              var arrowItem = /*#__PURE__*/_react.default.createElement("div", {
                key: id1,
                style: {
                  marginLeft: "20px",
                  marginRight: "20px"
                }
              }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
                key: "arrowItem" + id1,
                id: id1,
                relations: relations
              }, button1));

              arrowedSlotList.push(arrowItem);
            }

            var width = 150 * arrowedSlotList.length;
            var modalTopListModified = Object.assign({}, modalTopList, {
              width: "".concat(width, "px")
            });
            topItems = /*#__PURE__*/_react.default.createElement("div", {
              style: modalTopListContainer
            }, /*#__PURE__*/_react.default.createElement("h5", null, "Current components in this slot"), /*#__PURE__*/_react.default.createElement("div", {
              style: {
                overflow: "auto",
                width: "100%",
                maxWidth: "100%"
              }
            }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherContainer, {
              svgContainerStyle: {
                overflow: "auto",
                width: "".concat(width, "px")
              },
              strokeColor: "red"
            }, /*#__PURE__*/_react.default.createElement("div", {
              style: modalTopListModified
            }, arrowedSlotList))));
            Object.assign(modalGridPanel, {
              height: "60%"
            });
            confirmCallback = this.onAddAdditionalConfirm;
          }

          var multiTabPanel = null;
          if (selectedComp !== null && selectedComp !== undefined) multiTabPanel = /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
            schema: selectedSchema,
            inputData: selectedComp,
            id: selectedComp.ID,
            onConfirm: confirmCallback,
            onCancel: null,
            overlaysContainer: this.props.overlaysContainer,
            currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
            elementByType: this.props.elementByType,
            notModal: true,
            editable: false,
            isDebug: this.props.isDebug
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
            onClick: this.onInnerElementDataSave //this.onAddAdditionalConfirm

          }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: button2,
            size: "lg",
            onClick: this.onInnerElementDataCancel //this.onAddAdditionalCancel

          }, "Cancel"))));
        }
      }

      var grid = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
        minHeight: "800px",
        height: "860px",
        overflow: "auto"
      };
      var gridRow = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        height: "150px",
        alignItems: "center"
      };
      var gridRowAdd = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        height: "70px",
        alignItems: "center"
      };
      var gridSpace = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        minWidth: "120px",
        height: "140px",
        width: "18%",
        justifyContent: "center",
        alignItems: "center",
        //margin: "5px",
        alignContent: "center"
      };
      var gridSpaceAdd = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        minWidth: "120px",
        height: "60px",
        width: "18%",
        justifyContent: "center",
        alignItems: "center",
        //margin: "5px",
        alignContent: "center"
      }; //const gridSpaceSpecimen = Object.assign({ fontSize: "20px" }, gridSpace);

      var regularOpaqueImageStyle = Object.assign({
        opacity: "0.4"
      }, regularImageStyle);
      var addButtonImageStyle = {
        height: "25px",
        width: "25px",
        margin: "auto"
      };
      var opaqueAddButtonImageStyle = Object.assign({
        opacity: "0.4"
      }, addButtonImageStyle);
      var addButtonImage = url.resolve(this.props.imagesPath, "AddButton.svg");
      var hasChannelPath_Additional_1 = false;
      var hasChannelPath_Additional_2 = false;
      var hasChannelPath_Additional_3_4_5_6 = false;
      var hasChannelPath_Additional_7 = false;
      var hasChannelPath_Additional_8 = false;
      var hasLightSource = false;
      var hasDetector = false;
      var hasRelayLens = false;
      var hasCouplingLens = false;
      var hasLightSourceCoupling = false;
      var hasExcitation = false;
      var hasDichroic = false;
      var hasEmission = false;
      var hasObjective = false;
      var testCategory = [_constants.channelPath_Additional_1, _constants.channelPath_Additional_2, _constants.channelPath_Additional_3_4_5_6, _constants.channelPath_Additional_7, _constants.channelPath_Additional_8, _constants.channelPath_LightSource, _constants.channelPath_Detector, _constants.channelPath_RelayLens, _constants.channelPath_CouplingLens, _constants.channelPath_LightSourceCoupling, _constants.channelPath_Excitation, _constants.channelPath_Dichroic, _constants.channelPath_Emission, _constants.channelPath_Objective];
      Object.keys(this.props.componentData).forEach(function (compIndex) {
        var comp = _this3.props.componentData[compIndex];
        var schema_id = comp.Schema_ID;
        var compSchema = compSchemas[schema_id];
        if (compSchema === null) return;
        var compSchemaCategory = compSchema.category;

        for (var _index in testCategory) {
          var category = testCategory[_index];

          if (category.includes(schema_id.replace(_constants.string_json_ext, "")) || category.includes(compSchemaCategory) || category.includes(compSchemaCategory.substring(0, compSchemaCategory.indexOf(".")))) {
            if (category === _constants.channelPath_Additional_1) hasChannelPath_Additional_1 = true;
            if (category === _constants.channelPath_Additional_2) hasChannelPath_Additional_2 = true;
            if (category === _constants.channelPath_Additional_3_4_5_6) hasChannelPath_Additional_3_4_5_6 = true;
            if (category === _constants.channelPath_Additional_7) hasChannelPath_Additional_7 = true;
            if (category === _constants.channelPath_Additional_8) hasChannelPath_Additional_8 = true;
            if (category === _constants.channelPath_LightSource) hasLightSource = true;
            if (category === _constants.channelPath_Detector) hasDetector = true;
            if (category === _constants.channelPath_RelayLens) hasRelayLens = true;
            if (category === _constants.channelPath_CouplingLens) hasCouplingLens = true;
            if (category === _constants.channelPath_LightSourceCoupling) hasLightSourceCoupling = true;
            if (category === _constants.channelPath_Excitation) hasExcitation = true;
            if (category === _constants.channelPath_Dichroic) hasDichroic = true;
            if (category === _constants.channelPath_Emission) hasEmission = true;
            if (category === _constants.channelPath_Objective) hasObjective = true;
          }
        }
      });
      var additionalItemButton_1 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_1 ? addButtonImageStyle : opaqueAddButtonImageStyle, 1, _constants.channelPath_Additional_1, hasChannelPath_Additional_1);
      var additionalItemButton_2 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_2 ? addButtonImageStyle : opaqueAddButtonImageStyle, 2, _constants.channelPath_Additional_2, hasChannelPath_Additional_2);
      var additionalItemButton_3 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_3_4_5_6 ? addButtonImageStyle : opaqueAddButtonImageStyle, 3, _constants.channelPath_Additional_3_4_5_6, hasChannelPath_Additional_3_4_5_6);
      var additionalItemButton_4 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_3_4_5_6 ? addButtonImageStyle : opaqueAddButtonImageStyle, 4, _constants.channelPath_Additional_3_4_5_6, hasChannelPath_Additional_3_4_5_6);
      var additionalItemButton_5 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_3_4_5_6 ? addButtonImageStyle : opaqueAddButtonImageStyle, 5, _constants.channelPath_Additional_3_4_5_6, hasChannelPath_Additional_3_4_5_6);
      var additionalItemButton_6 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_3_4_5_6 ? addButtonImageStyle : opaqueAddButtonImageStyle, 6, _constants.channelPath_Additional_3_4_5_6, hasChannelPath_Additional_3_4_5_6);
      var additionalItemButton_7 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_7 ? addButtonImageStyle : opaqueAddButtonImageStyle, 7, _constants.channelPath_Additional_7, hasChannelPath_Additional_7);
      var additionalItemButton_8 = this.createAddButton(buttonStyle, addButtonImage, hasChannelPath_Additional_8 ? addButtonImageStyle : opaqueAddButtonImageStyle, 8, _constants.channelPath_Additional_8, hasChannelPath_Additional_8);
      var specButtStyle = Object.assign({}, buttonStyle, {
        border: "none"
      });
      var specimenButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_10_Specimen.svg", "Specimen", slots, compSchemas, regularImageStyle, specButtStyle, styleCloser, styleIcons, null, null, null, "Specimen", false, null);
      var lightSource = settingData["LightSource"];
      var valid = null;

      if (lightSource !== undefined && lightSource !== null) {
        var _schema5 = settingsSchemas[lightSource.Schema_ID];

        if (_schema5 !== null && _schema5 !== undefined) {
          var schemaHasProp = Object.keys(_schema5.properties).length > 0;

          if (schemaHasProp) {
            var validation = validate(lightSource, _schema5);
            var validated = validation.valid;

            if (validated) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasLightSource = false;
          }
        }
      }

      var lightSourceButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_1_LightSource_outline.svg", "LightSource", slots, compSchemas, hasLightSource ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_lightSource, this.handleDeleteComp, this.handleEditSettings, "Select Light Source", hasLightSource, valid);
      var detector = settingData["Detector"];
      valid = null;

      if (detector !== undefined && detector !== null) {
        var _schema6 = settingsSchemas[detector.Schema_ID];

        if (_schema6 !== null && _schema6 !== undefined) {
          var _schemaHasProp = Object.keys(_schema6.properties).length > 0;

          if (_schemaHasProp) {
            var _validation = validate(detector, _schema6);

            var _validated = _validation.valid;

            if (_validated) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasDetector = false;
          }
        }
      }

      var detectorButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_9_Detector_outline.svg", "Detector", slots, compSchemas, hasDetector ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_detector, this.handleDeleteComp, this.handleEditSettings, "Select Detector", hasDetector, valid);
      var relayLens = settingData["RelayLens"];
      valid = null;

      if (relayLens !== undefined && relayLens !== null) {
        var _schema7 = settingsSchemas[relayLens.Schema_ID];

        if (_schema7 !== null && _schema7 !== undefined) {
          var _schemaHasProp2 = Object.keys(_schema7.properties).length > 0;

          if (_schemaHasProp2) {
            var _validation2 = validate(relayLens, _schema7);

            var _validated2 = _validation2.valid;

            if (_validated2) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasRelayLens = false;
          }
        }
      }

      var relayLensButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_8_RelayLens_outline.svg", "RelayLens", slots, compSchemas, hasRelayLens ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_relayLens, this.handleDeleteComp, this.handleEditSettings, "Select Relay Lens", hasRelayLens);
      var couplingLens = settingData["CouplingLens"];
      valid = null;

      if (couplingLens !== undefined && couplingLens !== null) {
        var _schema8 = settingsSchemas[couplingLens.Schema_ID];

        if (_schema8 !== null && _schema8 !== undefined) {
          var _schemaHasProp3 = Object.keys(_schema8.properties).length > 0;

          if (_schemaHasProp3) {
            var _validation3 = validate(couplingLens, _schema8);

            var _validated3 = _validation3.valid;

            if (_validated3) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasCouplingLens = false;
          }
        }
      }

      var couplingLensButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_3_CouplingLens_outline.svg", "CouplingLens", slots, compSchemas, hasCouplingLens ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_couplingLens, this.handleDeleteComp, this.handleEditSettings, "Select Coupling Lens", hasCouplingLens, valid);
      var lightSourceCoupling = settingData["LightSourceCoupling"];
      valid = null;

      if (lightSourceCoupling !== undefined && lightSourceCoupling !== null) {
        var _schema9 = settingsSchemas[lightSourceCoupling.Schema_ID];

        if (_schema9 !== null && _schema9 !== undefined) {
          var _schemaHasProp4 = Object.keys(_schema9.properties).length > 0;

          if (_schemaHasProp4) {
            var _validation4 = validate(lightSourceCoupling, _schema9);

            var _validated4 = _validation4.valid;

            if (_validated4) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasLightSourceCoupling = false;
          }
        }
      }

      var lightSourceCouplingButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_2_LightSourceCoupling_outline.svg", "LightSourceCoupling", slots, compSchemas, hasLightSourceCoupling ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_lightSourceCoupling, this.handleDeleteComp, this.handleEditSettings, "Select Light Source Coupling", hasLightSourceCoupling, valid);
      var excitationFilter = settingData["ExcitationFilter"];
      valid = null;

      if (excitationFilter !== undefined && excitationFilter !== null) {
        var _schema10 = settingsSchemas[excitationFilter.Schema_ID];

        if (_schema10 !== null && _schema10 !== undefined) {
          var _schemaHasProp5 = Object.keys(_schema10.properties).length > 0;

          if (_schemaHasProp5) {
            var _validation5 = validate(excitationFilter, _schema10);

            var _validated5 = _validation5.valid;

            if (_validated5) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasExcitation = false;
          }
        }
      }

      var excitationButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_4_ExcitationFilter_outline.svg", "ExcitationFilter", slots, compSchemas, hasExcitation ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_excitation, this.handleDeleteComp, this.handleEditSettings, "Select Excitation Wavelength", hasExcitation, valid);
      var dichroic = settingData["Dichroic"];
      valid = null;

      if (dichroic !== undefined && dichroic !== null) {
        var _schema11 = settingsSchemas[dichroic.Schema_ID];

        if (_schema11 !== null && _schema11 !== undefined) {
          var _schemaHasProp6 = Object.keys(_schema11.properties).length > 0;

          if (_schemaHasProp6) {
            var _validation6 = validate(dichroic, _schema11);

            var _validated6 = _validation6.valid;

            if (_validated6) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasDichroic = false;
          }
        }
      }

      var dichroicButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_5_Dichroic_outline.svg", "Dichroic", slots, compSchemas, hasDichroic ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_dichroic, this.handleDeleteComp, this.handleEditSettings, "Select Dichroic", hasDichroic, valid);
      var emissionFilter = settingData["EmissionFilter"];
      valid = null;

      if (emissionFilter !== undefined && emissionFilter !== null) {
        var _schema12 = settingsSchemas[emissionFilter.Schema_ID];

        if (_schema12 !== null && _schema12 !== undefined) {
          var _schemaHasProp7 = Object.keys(_schema12.properties).length > 0;

          if (_schemaHasProp7) {
            var _validation7 = validate(emissionFilter, _schema12);

            var _validated7 = _validation7.valid;

            if (_validated7) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasEmission = false;
          }
        }
      }

      var emissionButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_6_EmissionFilter_outline.svg", "EmissionFilter", slots, compSchemas, hasEmission ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_emission, this.handleDeleteComp, this.handleEditSettings, "Select Emission Wavelength", hasEmission, valid); //let objective = settingData["Objective"];

      var objective = this.props.objectiveSettings;
      valid = null;

      if (objective !== undefined && objective !== null) {
        var _schema13 = settingsSchemas[objective.Schema_ID];
        var _immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];

        if (_schema13 !== null && _schema13 !== undefined) {
          var _schemaHasProp8 = Object.keys(_schema13.properties).length > 0;

          var schemaHasProp2 = Object.keys(_immersionLiquidSchema.properties).length > 0;

          if (_schemaHasProp8 || schemaHasProp2) {
            var _validation8 = validate(objective, _schema13);

            var _validated8 = _validation8.valid;
            var validation2 = validate(objective.ImmersionLiquid, _immersionLiquidSchema);
            var validated2 = validation2.valid;

            if (_validated8 && validated2) {
              valid = isValid2;
            } else {
              valid = isInvalid2;
            }
          } else {
            hasObjective = false;
          }
        }
      }

      var objectiveButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_7_Objective_outline.svg", "Objective", slots, compSchemas, hasObjective ? regularImageStyle : regularOpaqueImageStyle, buttonStyle, styleCloser, styleIcons, this.handleClick_objective, this.handleDeleteComp, this.handleEditSettings, "Objective", hasObjective, valid);

      var row1 = /*#__PURE__*/_react.default.createElement("div", {
        style: gridRow
      }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "lightSource",
        relations: [{
          targetId: "addButton_1",
          targetAnchor: "top",
          sourceAnchor: "bottom"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-LightSource",
        position: _constants.select_lightSource.position,
        title: _constants.select_lightSource.title,
        content: _constants.select_lightSource.content,
        element: lightSourceButton
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "specimen",
        relations: [{
          targetId: "objective",
          targetAnchor: "top",
          sourceAnchor: "bottom"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, specimenButton)), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "detectorButton",
        relations: []
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Detector",
        position: _constants.select_detector.position,
        title: _constants.select_detector.title,
        content: _constants.select_detector.content,
        element: detectorButton
      }))));

      var row2 = /*#__PURE__*/_react.default.createElement("div", {
        style: gridRowAdd
      }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_1",
        relations: [{
          targetId: "couplingLens",
          targetAnchor: "top",
          sourceAnchor: "bottom"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional1",
        position: _constants.select_additional_right.position,
        title: _constants.select_additional_right.title,
        content: _constants.select_additional_right.content,
        element: additionalItemButton_1
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_8",
        relations: [{
          targetId: "detectorButton",
          targetAnchor: "bottom",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional8",
        position: _constants.select_additional_left.position,
        title: _constants.select_additional_left.title,
        content: _constants.select_additional_left.content,
        element: additionalItemButton_8
      }))));

      var row3 = /*#__PURE__*/_react.default.createElement("div", {
        style: gridRow
      }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "couplingLens",
        relations: [{
          targetId: "lightSourceCoupling",
          targetAnchor: "top",
          sourceAnchor: "bottom"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-CouplingLens",
        position: _constants.select_couplingLens.position,
        title: _constants.select_couplingLens.title,
        content: _constants.select_couplingLens.content,
        element: couplingLensButton
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "relayLens",
        relations: [{
          targetId: "addButton_8",
          targetAnchor: "bottom",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-RelayLens",
        position: _constants.select_relayLens.position,
        title: _constants.select_relayLens.title,
        content: _constants.select_relayLens.content,
        element: relayLensButton
      }))));

      var row4 = /*#__PURE__*/_react.default.createElement("div", {
        style: gridRow
      }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "lightSourceCoupling",
        relations: [{
          targetId: "addButton_2",
          targetAnchor: "top",
          sourceAnchor: "bottom"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-LightSourceCoupling",
        position: _constants.select_lightSourceCoupling.position,
        title: _constants.select_lightSourceCoupling.title,
        content: _constants.select_lightSourceCoupling.content,
        element: lightSourceCouplingButton
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "objective",
        relations: [{
          targetId: "addButton_5",
          targetAnchor: "top",
          sourceAnchor: "right"
        }, {
          targetId: "specimen",
          targetAnchor: "bottom",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, objectiveButton)), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }));

      var row5 = /*#__PURE__*/_react.default.createElement("div", {
        style: gridRowAdd
      }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_2",
        relations: [{
          targetId: "excitationFilter",
          targetAnchor: "top",
          sourceAnchor: "bottom"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional2",
        position: _constants.select_additional_right.position,
        title: _constants.select_additional_right.title,
        content: _constants.select_additional_right.content,
        element: additionalItemButton_2
      }))), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_4",
        relations: [{
          targetId: "objective",
          targetAnchor: "left",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional4",
        position: _constants.select_additional_right.position,
        title: _constants.select_additional_right.title,
        content: _constants.select_additional_right.content,
        element: additionalItemButton_4
      }))), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_5",
        relations: [{
          targetId: "dichroicFilter",
          targetAnchor: "top",
          sourceAnchor: "left"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional5",
        position: _constants.select_additional_left.position,
        title: _constants.select_additional_left.title,
        content: _constants.select_additional_left.content,
        element: additionalItemButton_5
      }))), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_7",
        relations: [{
          targetId: "relayLens",
          targetAnchor: "bottom",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional7",
        position: _constants.select_additional_left.position,
        title: _constants.select_additional_left.title,
        content: _constants.select_additional_left.content,
        element: additionalItemButton_7
      }))));

      var gridRowSpecial = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "150px"
      };
      var gridRowFilterSet = Object.assign({}, gridRow, {
        border: "5px solid black",
        height: "100%",
        position: "relative",
        top: "-30px",
        left: "0px"
      });
      var borderTitleStyle = {
        display: "inline",
        position: "relative",
        top: "-10%",
        left: "30%",
        minWidth: "240px",
        width: "240px",
        height: "30px",
        //display: "inline",
        backgroundColor: "white",
        zIndex: 2
      };

      var row6 = /*#__PURE__*/_react.default.createElement("div", {
        style: gridRowSpecial
      }, /*#__PURE__*/_react.default.createElement("button", {
        style: borderTitleStyle,
        disabled: true
      }, "Fluorescence Light Path"), /*#__PURE__*/_react.default.createElement("div", {
        style: gridRowFilterSet
      }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "excitationFilter",
        relations: [{
          targetId: "addButton_3",
          targetAnchor: "left",
          sourceAnchor: "right"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Excitation",
        position: _constants.select_excitation.position,
        title: _constants.select_excitation.title,
        content: _constants.select_excitation.content,
        element: excitationButton
      }))), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_3",
        relations: [{
          targetId: "dichroicFilter",
          targetAnchor: "left",
          sourceAnchor: "right"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional3",
        position: _constants.select_additional_right.position,
        title: _constants.select_additional_right.title,
        content: _constants.select_additional_right.content,
        element: additionalItemButton_3
      }))), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "dichroicFilter",
        relations: [{
          targetId: "addButton_4",
          targetAnchor: "right",
          sourceAnchor: "top"
        }, {
          targetId: "addButton_6",
          targetAnchor: "left",
          sourceAnchor: "right"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Dichroic",
        position: _constants.select_dichroic.position,
        title: _constants.select_dichroic.title,
        content: _constants.select_dichroic.content,
        element: dichroicButton
      }))), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_6",
        relations: [{
          targetId: "emissionFilter",
          targetAnchor: "left",
          sourceAnchor: "right"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Additional6",
        position: _constants.select_additional_left.position,
        title: _constants.select_additional_left.title,
        content: _constants.select_additional_left.content,
        element: additionalItemButton_6
      }))), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "emissionFilter",
        relations: [{
          targetId: "addButton_7",
          targetAnchor: "bottom",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Emission",
        position: _constants.select_emission.position,
        title: _constants.select_emission.title,
        content: _constants.select_emission.content,
        element: emissionButton
      })))));

      valid = null;

      if (this.props.schema !== undefined && this.props.schema !== null && this.state.channelData !== undefined && this.state.channelData !== null) {
        var channelObj = this.state.channelData;
        var validation1 = validate(channelObj[0], this.props.schema[0]);
        var validated1 = validation1.valid;
        var _validated9 = false;

        if (channelObj[2] !== undefined && channelObj[2] !== null) {
          var _validation9 = validate(channelObj[2], this.props.schema[2]);

          _validated9 = _validation9.valid;
        }

        var validated3 = false;

        if (channelObj[1] !== undefined && channelObj[1] !== null) {
          var validation3 = validate(channelObj[1], this.props.schema[1]);
          validated3 = validation3.valid;
        }

        if (validated1 && _validated9 && validated3) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }
      } else {
        valid = isInvalid;
      }

      return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema[0].title)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherContainer, {
        strokeColor: "red"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: grid
      }, row1, row2, row3, row4, " ", row5, " ", row6)), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onConfirm
      }, "Confirm"), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-EditChannelSettings",
        position: _constants.edit_channel_settings.position,
        title: _constants.edit_channel_settings.title,
        content: _constants.edit_channel_settings.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onEditElement
        }, valid, _constants.edit_channel_settings.title)
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onCancel
      }, "Cancel")));
    }
  }], [{
    key: "createSlotButton",
    value: function createSlotButton(imagesPath, imageName, imageSlot, slots, compSchemas, style, buttonStyle, styleCloser, styleIcons, callback, deleteCallback, editCallback, text, isEnabled, valid) {
      var image = null;
      var name = text;
      var needDelete = false;
      var hasSettings = true;
      var element = null;
      var isObjective = false;

      if (slots[imageSlot] !== null && slots[imageSlot] !== undefined) {
        element = slots[imageSlot];
        var elementSchema = compSchemas[element.Schema_ID];
        image = url.resolve(imagesPath, elementSchema.image);
        name = element.Name;
        needDelete = true;

        if (elementSchema.modelSettings === "NA") {
          hasSettings = false;
        }

        if (elementSchema.modelSettings === "ObjectiveSettings") isObjective = true;
      } else {
        image = url.resolve(imagesPath, imageName);
        if (imageSlot === "Objective") isObjective = true;
      }

      var itemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: image + (image.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: imageSlot,
        style: style
      });

      var button = null;

      if (needDelete) {
        var butt = null;

        if (isEnabled && hasSettings) {
          butt = /*#__PURE__*/_react.default.createElement("button", {
            style: buttonStyle,
            onClick: function onClick() {
              return editCallback(element, compSchemas[element.Schema_ID], imageSlot);
            }
          }, itemImage, name);
        } else {
          var buttStyle = Object.assign({}, buttonStyle, {
            border: "none"
          });
          butt = /*#__PURE__*/_react.default.createElement("button", {
            style: buttStyle,
            disabled: true
          }, itemImage, name);
        }

        var deleteButt = null;

        if (!isObjective) {
          deleteButt = /*#__PURE__*/_react.default.createElement("button", {
            type: "button",
            onClick: function onClick() {
              return deleteCallback(imageSlot);
            },
            style: styleCloser
          }, "x");
        }

        button = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
          style: styleIcons
        }, deleteButt, valid), butt);
      } else {
        if (isEnabled && !isObjective) {
          button = /*#__PURE__*/_react.default.createElement("button", {
            style: buttonStyle,
            onClick: callback
          }, itemImage, name);
        } else {
          var _buttStyle = Object.assign({}, buttonStyle, {
            border: "none"
          });

          button = /*#__PURE__*/_react.default.createElement("button", {
            style: _buttStyle,
            disabled: true
          }, itemImage, name);
        }
      }

      return button;
    }
  }]);

  return ChannelCanvas_V2;
}(_react.default.PureComponent);

exports.default = ChannelCanvas_V2;