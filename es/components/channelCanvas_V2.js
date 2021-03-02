"use strict";

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

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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

    if (props.channelData !== null && props.channelData !== undefined) {
      var lightPath = props.channelData[0].LightPath;

      if (lightPath !== null && lightPath !== undefined) {
        var componentSettings = lightPath.ComponentSettings;
        _this.state.settingData = componentSettings;

        if (componentSettings !== null && componentSettings !== undefined) {
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
  } //static getDerivedStateFromProps(props, state) {
  // if (props.componentsSchema !== null) {
  // 	let componentsSchema = {};
  // 	Object.keys(props.componentSchemas).forEach((schemaIndex) => {
  // 		let schema = props.componentSchemas[schemaIndex];
  // 		let schema_id = schema.ID;
  // 		componentsSchema[schema_id] = schema;
  // 	});
  // 	let elementList = state.elementList;
  // 	for (let i = 0; i < elementList.length; i++) {
  // 		let element = elementList[i];
  // 		let schema_id = element.schema_ID;
  // 		let schema = componentsSchema[schema_id];
  // 		let object = element.obj;
  // 		let validation = validate(object, schema);
  // 		let validated = validation.valid;
  // 		element.validated = validated;
  // 	}
  // 	return {
  // 		componentsSchema: componentsSchema,
  // 	};
  // }
  // return null;
  //}
  // updatedDimensions(id, width, height, isResize) {
  // 	let element = null;
  // 	this.state.elementList.forEach((item) => {
  // 		if (item.ID === id) element = item;
  // 	});
  // 	let newElementDataList = Object.assign({}, this.state.elementData);
  // 	let obj = newElementDataList[id];
  // 	if (element === null || obj === undefined) return;
  // 	if (element.width !== -1 && element.height !== -1 && !isResize) {
  // 		return;
  // 	}
  // 	element.width = width;
  // 	element.height = height;
  // 	obj.Width = width;
  // 	obj.Height = height;
  // 	let validated = this.areAllElementsValidated();
  // 	this.props.updateElementData(newElementDataList, validated);
  // }
  // onImgLoad({ target: img }) {
  // 	let oldHeight = this.state.imgHeight;
  // 	let oldWidth = this.state.imgWidth;
  // 	if (oldWidth !== null && oldHeight !== null) return;
  // 	let newHeight = img.height;
  // 	let newWidth = img.width;
  // 	this.setState({
  // 		imgHeight: newHeight,
  // 		imgWidth: newWidth,
  // 	});
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
  // onCanvasElementDataSave(id, data, dataLinkedFields) {
  // 	let linkedFields = this.state.linkedFields;
  // 	if (
  // 		dataLinkedFields !== undefined &&
  // 		Object.keys(dataLinkedFields).length > 0
  // 	) {
  // 		linkedFields[id] = dataLinkedFields;
  // 	}
  // 	// let elementList = this.state.elementList;
  // 	// for (let i = 0; i < elementList.length; i++) {
  // 	// 	if (elementList[i].ID === id) {
  // 	// 		elementList[i].validated = true;
  // 	// 		elementList[i].name = data.Name;
  // 	// 		break;
  // 	// 	}
  // 	// }
  // 	let currentElementData = Object.assign({}, this.state.elementData);
  // 	currentElementData[id] = Object.assign(currentElementData[id], data);
  // 	this.setState({
  // 		elementData: currentElementData,
  // 		linkedFields: linkedFields,
  // 	});
  // 	let validated = this.areAllElementsValidated();
  // 	this.props.updateElementData(currentElementData, validated);
  // 	this.props.updateLinkedFields(linkedFields);
  // }
  // getElementData() {
  // 	return Object.assign({}, this.state.elementData);
  // }
  // addComponentsIndexesIfMissing(schema, newElementData) {
  // 	Object.keys(schema.properties).forEach((key) => {
  // 		let currentNumber = string_currentNumberOf_identifier + key;
  // 		let minNumber = string_minNumberOf_identifier + key;
  // 		let maxNumber = string_maxNumberOf_identifier + key;
  // 		if (newElementData[currentNumber] !== undefined) {
  // 			return;
  // 		}
  // 		if (schema.properties[key].type === string_array) {
  // 			if (schema.required.indexOf(key) != -1) {
  // 				newElementData[currentNumber] = 1;
  // 				newElementData[minNumber] = 1;
  // 				newElementData[maxNumber] = -1;
  // 			} else {
  // 				newElementData[currentNumber] = 0;
  // 				newElementData[minNumber] = 0;
  // 				newElementData[maxNumber] = -1;
  // 			}
  // 		} else if (schema.properties[key].type === string_object) {
  // 			if (schema.required.indexOf(key) === -1) {
  // 				newElementData[currentNumber] = 0;
  // 				newElementData[minNumber] = 0;
  // 				newElementData[maxNumber] = 1;
  // 			} else {
  // 				newElementData[currentNumber] = 1;
  // 				newElementData[minNumber] = 1;
  // 				newElementData[maxNumber] = 1;
  // 			}
  // 		}
  // 	});
  // }


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
      });
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
      //console.log("onInnerElementDataCancel");
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
      //console.log("onInnerElementDataSave");
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
        //console.log("onAddAdditionalConfirm data category " + category);
        slots = Object.assign({}, slots);

        if (selectedSlot.includes("AdditionalSlot_")) {
          var tmpSlots = this.state.tmpSlots;
          slots[selectedSlot] = tmpSlots;
        } else {
          if (selectedComp === null || selectedComp === undefined) {
            this.setState({
              editing: false,
              editingSettings: false,
              category: null,
              selectedSlot: null,
              selectedComp: null,
              selectedSchema: null
            });
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
              Version: currentSchema.version
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
                Version: immersionLiquidSchema.version
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
      var selectedComp = this.state.selectedComp;
      var selectedSlot = this.state.selectedSlot;
      var category = this.state.category; //let slots = this.state.slots;

      var settingData = Object.assign({}, this.state.settingData);

      if (this.state.editingSettings) {
        // console.log("saving setting data");
        // console.log(id);
        // console.log(data);
        if (selectedSlot.includes("AdditionalSlot_")) {
          var currentSlots = this.state.tmpSlots;
          var index = currentSlots.indexOf(selectedComp);
          var obj = settingData[selectedSlot][index];
          settingData[selectedSlot][index] = Object.assign(obj, data);
        } else {
          var _obj = settingData[selectedSlot];
          settingData[selectedSlot] = Object.assign(_obj, data);
        }

        console.log("settingData");
        console.log(settingData);
        this.setState({
          //editing: false,
          editingSettings: false,
          settingData: settingData
        });
      } else {
        console.log("saving channel data");
        console.log(id);
        console.log(data);
        var currentChannelData = data;
        var currentLightPath = data.LightPath;
        var currentFluorophore = data.Fluorophore;
        var objects = this.state.channelData.slice();
        objects[0] = Object.assign(objects[0], currentChannelData);
        objects[1] = Object.assign(objects[1], currentLightPath);
        objects[2] = Object.assign(objects[2], currentFluorophore);
        this.setState({
          editing: false,
          editingSettings: false,
          channelData: objects
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
      var i = index - 1;

      if (selectedSlot.includes("AdditionalSlot_")) {
        var tmpSlots = this.state.tmpSlots;

        if (i !== 0) {
          tmpSlots.splice(i, 1);
        } else {
          tmpSlots = [];
        }

        this.setState({
          tmpSlots: tmpSlots
        });
      } else {
        var slots = Object.assign({}, this.state.slots);
        delete slots[selectedSlot];
        this.setState({
          slots: slots
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
      // if (this.state.editingSettings) {
      // 	this.setState({ editingSettings: false });
      // } else {
      // 	this.setState({ editing: false, editingSettings: false });
      // }
      this.setState({
        editing: false,
        editingSettings: false
      });
    }
  }, {
    key: "onEditElement",
    value: function onEditElement() {
      this.setState({
        editing: true
      });
      if (_constants.bool_isDebug) console.log("edit channel data");
    }
  }, {
    key: "onAddAdditionalConfirm",
    value: function onAddAdditionalConfirm() {
      //console.log("onAddAdditionalConfirm - click");
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

      console.log("category");
      console.log(category);
      console.log("selectedSlot");
      console.log(selectedSlot);

      if (category !== null) {
        //console.log("onAddAdditionalConfirm category null");
        if (selectedSlot.includes("AdditionalSlot_")) {
          if (selectedComp === null || selectedComp === undefined) {
            this.setState({
              selectedSlot: null,
              selectedComp: null
            });
            return;
          } //console.log("onAddAdditionalConfirm category " + category);


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
              Version: currentSchema.version
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
      var category = ["Fluorescence_LightSource", "Transmitted_LightSource"];
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
      var category = ["Detector"];
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
      var category = ["CouplingLens"];
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
      var category = ["RelayLens"];
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
      var category = ["LightSourceCoupling"];
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
      var category = ["Objective"];
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
    value: function createAddButton(buttonStyle, image, index, category) {
      var _this2 = this;

      //
      return /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: function onClick() {
          return _this2.handleClick_additionalItemButton(category, index);
        }
      }, image, "Add additional element");
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        overflow: "auto",
        height: "20%",
        maxHeight: "20%",
        alignItems: "center"
      };
      var modalTopList = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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
        margin: "5px",
        border: "5px solid blue",
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
        verticalAlign: "middle",
        position: "relative",
        left: "5px",
        top: "5px"
      };
      var channelData = this.state.channelData;
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

      if (selectedComp !== null && (selectedSchema === null || selectedSchema === undefined)) {
        selectedID = selectedComp.Schema_ID;
        selectedSchema = compSchemas[selectedID];
      }

      if (this.state.editing) {
        if (this.state.editingSettings) {
          var settingData = this.state.settingData;
          var settingsName = selectedSchema.modelSettings + _constants.string_json_ext;
          var settings = null;
          var comp = null;
          var id = null;

          if (selectedComp.Schema_ID === "Objective.json") {
            var settingCompData = settingData[selectedSlot];
            id = settingCompData.ID;
            var immersionLiquidSchema = expSchemas["ImmersionLiquid.json"];
            var immersionLiquid = settingCompData.ImmersionLiquid;
            comp = [];
            comp[0] = settingCompData;
            comp[1] = immersionLiquid;
            settings = [];
            settings[0] = settingsSchemas[settingsName];
            settings[1] = immersionLiquidSchema;
          } else {
            var _settingCompData = null;

            if (selectedSlot.includes("AdditionalSlot_")) {
              var currentSlots = this.state.tmpSlots; // console.log("slots");
              // console.log(slots);
              // console.log("selectedSlot");
              // console.log(selectedSlot);
              // console.log("currentSlots");
              // console.log(currentSlots);

              var index = currentSlots.indexOf(selectedComp);
              _settingCompData = settingData[selectedSlot][index];
            } else {
              _settingCompData = settingData[selectedSlot];
            }

            id = _settingCompData.ID;
            settings = settingsSchemas[settingsName];
            comp = _settingCompData;
          } // console.log("settingData");
          // console.log(settingData);
          // console.log("settingsName");
          // console.log(settingsName);
          // console.log("settings");
          // console.log(settings);
          // console.log("comp");
          // console.log(comp);


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
            editable: true
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
            editable: true
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
              // if (selectedComp === null || selectedComp === undefined) {
              // 	selectedComp = comp;
              // }
              // if (selectedSchema === null || selectedSchema === undefined)
              // 	selectedSchema = compSchema;
              var compImage = url.resolve(_this3.props.imagesPath, compSchema.image);

              var compItemImage = /*#__PURE__*/_react.default.createElement("img", {
                src: compImage + (compImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
                alt: comp.Name,
                style: regularImageStyle
              });

              var buttonStyleModified = null;

              if (comp === selectedComp) {
                buttonStyleModified = Object.assign({}, buttonStyle, {
                  border: "5px solid cyan"
                });
              } else {
                buttonStyleModified = buttonStyle;
              }

              var compButton = /*#__PURE__*/_react.default.createElement("button", {
                key: "button-" + comp.Name,
                style: buttonStyleModified,
                onClick: function onClick() {
                  return _this3.handleSelectComp(comp);
                }
              }, compItemImage, comp.Name);

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
                  border: "5px solid cyan",
                  margin: "5px"
                });
              } else {
                buttonStyleModified = Object.assign({}, buttonStyle, {
                  margin: "5px"
                });
              }

              slotList.push( /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
                type: "button",
                onClick: function onClick() {
                  return _this3.handleDeleteComp(selectedSlot, slotList.length);
                },
                style: styleCloser
              }, "x"), /*#__PURE__*/_react.default.createElement("button", {
                key: "button-" + comp.Name,
                style: buttonStyleModified,
                onClick: function onClick() {
                  return _this3.handleEditSettings(comp, compSchema, selectedSlot);
                }
              }, compItemImage, comp.Name)));
            });
            var arrowedSlotList = [];

            for (var _i4 = 0; _i4 < slotList.length; _i4++) {
              var button1 = slotList[_i4];
              var nextIndex = _i4 + 1;
              var hasConnection = false;

              if (slotList[nextIndex] !== null && slotList[nextIndex] !== undefined) {
                hasConnection = true; //console.log("Index " + i + " hasConnection");
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
                  margin: "10px"
                }
              }, /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
                key: "arrowItem" + id1,
                id: id1,
                relations: relations
              }, button1));

              arrowedSlotList.push(arrowItem);
            } //console.log(arrowedSlotList);


            topItems = /*#__PURE__*/_react.default.createElement("div", {
              style: modalTopListContainer
            }, /*#__PURE__*/_react.default.createElement("h5", null, "Current components in this slot"), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherContainer, {
              strokeColor: "red"
            }, /*#__PURE__*/_react.default.createElement("div", {
              style: modalTopList
            }, arrowedSlotList))); // if (
            // 	slotList !== null &&
            // 	slotList !== undefined &&
            // 	slotList.length > 0
            // )

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
        height: "800px"
      };
      var gridRow = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        height: "130px",
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
        height: "120px",
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
      var addButtonImage = url.resolve(this.props.imagesPath, "AddButton.svg");

      var additionalItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: addButtonImage + (addButtonImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "Add",
        style: addButtonImageStyle
      });

      var additionalItemButton_1 = this.createAddButton(buttonStyle, additionalItemImage, 1, _constants.channelPath_Additional_1_8);
      var additionalItemButton_2 = this.createAddButton(buttonStyle, additionalItemImage, 2, _constants.channelPath_Additional_2);
      var additionalItemButton_3 = this.createAddButton(buttonStyle, additionalItemImage, 3, _constants.channelPath_Additional_3_4_5_6);
      var additionalItemButton_4 = this.createAddButton(buttonStyle, additionalItemImage, 4, _constants.channelPath_Additional_3_4_5_6);
      var additionalItemButton_5 = this.createAddButton(buttonStyle, additionalItemImage, 5, _constants.channelPath_Additional_3_4_5_6);
      var additionalItemButton_6 = this.createAddButton(buttonStyle, additionalItemImage, 6, _constants.channelPath_Additional_3_4_5_6);
      var additionalItemButton_7 = this.createAddButton(buttonStyle, additionalItemImage, 7, _constants.channelPath_Additional_7);
      var additionalItemButton_8 = this.createAddButton(buttonStyle, additionalItemImage, 8, _constants.channelPath_Additional_1_8);
      var specimenButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_10_Specimen.svg", "Specimen", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, null, null, null, "Specimen");
      var lightSourceButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_1_LightSource_outline.svg", "LightSource", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_lightSource, this.handleDeleteComp, this.handleEditSettings, "Select Light Source");
      var detectorButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_9_Detector_outline.svg", "Detector", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_detector, this.handleDeleteComp, this.handleEditSettings, "Select Detector");
      var relayLensButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_8_RelayLens_outline.svg", "RelayLens", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_relayLens, this.handleDeleteComp, this.handleEditSettings, "Select Relay Lens");
      var couplingLensButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_3_CouplingLens_outline.svg", "CouplingLens", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_couplingLens, this.handleDeleteComp, this.handleEditSettings, "Select Coupling Lens");
      var lightSourceCouplingButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_2_LightSourceCoupling_outline.svg", "LightSourceCoupling", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_lightSourceCoupling, this.handleDeleteComp, this.handleEditSettings, "Select Light Source Coupling");
      var excitationButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_4_ExcitationFilter_outline.svg", "ExcitationFilter", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_excitation, this.handleDeleteComp, this.handleEditSettings, "Select Excitation Wavelength");
      var dichroicButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_5_Dichroic_outline.svg", "Dichroic", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_dichroic, this.handleDeleteComp, this.handleEditSettings, "Select Dichroic");
      var emissionButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_6_EmissionFilter_outline.svg", "EmissionFilter", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_emission, this.handleDeleteComp, this.handleEditSettings, "Select Emission Wavelength");
      var objectiveButton = ChannelCanvas_V2.createSlotButton(this.props.imagesPath, "LightPath_7_Objective_outline.svg", "Objective", slots, compSchemas, regularOpaqueImageStyle, buttonStyle, styleCloser, this.handleClick_objective, this.handleDeleteComp, this.handleEditSettings, "Select Objective");

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
      }, lightSourceButton)), /*#__PURE__*/_react.default.createElement("div", {
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
      }, detectorButton)));

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
      }, additionalItemButton_1)), /*#__PURE__*/_react.default.createElement("div", {
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
      }, additionalItemButton_8)));

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
      }, couplingLensButton)), /*#__PURE__*/_react.default.createElement("div", {
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
      }, relayLensButton)));

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
      }, lightSourceCouplingButton)), /*#__PURE__*/_react.default.createElement("div", {
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
      }, additionalItemButton_2)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_4",
        relations: [{
          targetId: "objective",
          targetAnchor: "left",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, additionalItemButton_4)), /*#__PURE__*/_react.default.createElement("div", {
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
      }, additionalItemButton_5)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_7",
        relations: [{
          targetId: "relayLens",
          targetAnchor: "bottom",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceAdd
      }, additionalItemButton_7)));

      var gridRowFilterSet = Object.assign({
        border: "5px solid black"
      }, gridRow);

      var row6 = /*#__PURE__*/_react.default.createElement("div", {
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
      }, excitationButton)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_3",
        relations: [{
          targetId: "dichroicFilter",
          targetAnchor: "left",
          sourceAnchor: "right"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, additionalItemButton_3)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
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
      }, dichroicButton)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "addButton_6",
        relations: [{
          targetId: "emissionFilter",
          targetAnchor: "left",
          sourceAnchor: "right"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, additionalItemButton_6)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "emissionFilter",
        relations: [{
          targetId: "addButton_7",
          targetAnchor: "bottom",
          sourceAnchor: "top"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }, emissionButton)));

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
      }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onEditElement
      }, "Edit Channel"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onCancel
      }, "Cancel")));
    }
  }], [{
    key: "createSlotButton",
    value: function createSlotButton(imagesPath, imageName, imageSlot, slots, compSchemas, style, buttonStyle, styleCloser, callback, deleteCallback, editCallback, text) {
      var image = null;
      var name = text;
      var needDelete = false;
      var element = null;

      if (slots[imageSlot] !== null && slots[imageSlot] !== undefined) {
        element = slots[imageSlot];
        image = url.resolve(imagesPath, compSchemas[element.Schema_ID].image);
        name = element.Name;
        needDelete = true;
      } else {
        image = url.resolve(imagesPath, imageName);
      }

      var itemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: image + (image.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: imageSlot,
        style: style
      });

      var button = null;
      if (needDelete) button = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return deleteCallback(imageSlot);
        },
        style: styleCloser
      }, "x"), /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: function onClick() {
          return editCallback(element, compSchemas[element.Schema_ID], imageSlot);
        }
      }, itemImage, name));else button = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: callback
      }, itemImage, name);
      return button;
    }
  }]);

  return ChannelCanvas_V2;
}(_react.default.PureComponent);

exports.default = ChannelCanvas_V2;