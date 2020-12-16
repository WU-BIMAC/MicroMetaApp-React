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

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV2"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

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

var ChannelsCanvas_V2 = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ChannelsCanvas_V2, _React$PureComponent);

  var _super = _createSuper(ChannelsCanvas_V2);

  function ChannelsCanvas_V2(props) {
    var _this;

    _classCallCheck(this, ChannelsCanvas_V2);

    _this = _super.call(this, props);
    _this.state = {
      elementList: [],
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
      hover: null,
      category: null,
      selectedSlot: null,
      selectedComp: null,
      slots: {}
    }; // Object.keys(props.componentSchemas).forEach((schemaIndex) => {
    // 	let schema = props.componentSchemas[schemaIndex];
    // 	let schema_id = schema.ID;
    // 	//Validate schemas using jsonschema????
    // 	Object.keys(this.props.settingData).forEach((objIndex) => {
    // 		let object = this.props.settingData[objIndex];
    // 		if (props.activeTier < object.tier) return;
    // 		if (schema_id !== object.Schema_ID) return;
    // 		let validation = validate(object, schema);
    // 		//if (schema_id === "CCD.json") console.log(validation);
    // 		let validated = validation.valid;
    // 		let positionZ = object.PositionZ === undefined ? 0 : object.PositionZ;
    // 		let newElement = {
    // 			ID: schema.title + "_" + object.ID,
    // 			schema_ID: schema_id,
    // 			name: object.Name,
    // 			validated: validated,
    // 			dragged: false,
    // 			obj: object,
    // 			x: object.PositionX,
    // 			y: object.PositionY,
    // 			z: positionZ,
    // 			width: object.Width,
    // 			height: object.Height,
    // 		};
    // 		this.state.elementList.push(newElement);
    // 	});
    // 	this.state.componentsSchema[schema_id] = schema;
    // });

    _this.addComponentsIndexesIfMissing = _this.addComponentsIndexesIfMissing.bind(_assertThisInitialized(_this));
    _this.onEditElement = _this.onEditElement.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onInnerElementDataSave = _this.onInnerElementDataSave.bind(_assertThisInitialized(_this));
    _this.onAddAdditionalConfirm = _this.onAddAdditionalConfirm.bind(_assertThisInitialized(_this));
    _this.onAddAdditionalCancel = _this.onAddAdditionalCancel.bind(_assertThisInitialized(_this));
    _this.onCanvasElementDataSave = _this.onCanvasElementDataSave.bind(_assertThisInitialized(_this));
    _this.getElementData = _this.getElementData.bind(_assertThisInitialized(_this));
    _this.updatedDimensions = _this.updatedDimensions.bind(_assertThisInitialized(_this));
    _this.areAllElementsValidated = _this.areAllElementsValidated.bind(_assertThisInitialized(_this));
    _this.handleClick_additionalItemButton_1_7_8 = _this.handleClick_additionalItemButton_1_7_8.bind(_assertThisInitialized(_this));
    _this.handleClick_additionalItemButton_2_3_4_5_6 = _this.handleClick_additionalItemButton_2_3_4_5_6.bind(_assertThisInitialized(_this));
    _this.handleClick_lightSource = _this.handleClick_lightSource.bind(_assertThisInitialized(_this));
    _this.handleClick_detector = _this.handleClick_detector.bind(_assertThisInitialized(_this));
    _this.handleClick_couplingLens = _this.handleClick_couplingLens.bind(_assertThisInitialized(_this));
    _this.handleClick_relayLens = _this.handleClick_relayLens.bind(_assertThisInitialized(_this));
    _this.handleClick_lightSourceCoupling = _this.handleClick_lightSourceCoupling.bind(_assertThisInitialized(_this));
    _this.handleClick_excitation = _this.handleClick_excitation.bind(_assertThisInitialized(_this));
    _this.handleClick_dichroic = _this.handleClick_dichroic.bind(_assertThisInitialized(_this));
    _this.handleClick_emission = _this.handleClick_emission.bind(_assertThisInitialized(_this));
    _this.handleClick_objective = _this.handleClick_objective.bind(_assertThisInitialized(_this));
    _this.handleSelectComp = _this.handleSelectComp.bind(_assertThisInitialized(_this)); // this.handleScroll = this.handleScroll.bind(this);
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
  // handleScroll(e) {
  // 	if (this.state.isEditing) {
  // 		return;
  // 	}
  // 	let element = e.target;
  // 	let offsetY = element.scrollTop;
  // 	let offsetX = element.scrollLeft;
  // 	this.setState({ offsetX: offsetX, offsetY: offsetY });
  // }


  _createClass(ChannelsCanvas_V2, [{
    key: "updatedDimensions",
    value: function updatedDimensions(id, width, height, isResize) {
      var element = null;
      this.state.elementList.forEach(function (item) {
        if (item.ID === id) element = item;
      });
      var newElementDataList = Object.assign({}, this.state.elementData);
      var obj = newElementDataList[id];
      if (element === null || obj === undefined) return;

      if (element.width !== -1 && element.height !== -1 && !isResize) {
        return;
      }

      element.width = width;
      element.height = height;
      obj.Width = width;
      obj.Height = height;
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(newElementDataList, validated);
    } // onImgLoad({ target: img }) {
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

  }, {
    key: "areAllElementsValidated",
    value: function areAllElementsValidated() {
      var elementList = this.state.elementList;

      for (var i = 0; i < elementList.length; i++) {
        if (!elementList[i].validated) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "onCanvasElementDataSave",
    value: function onCanvasElementDataSave(id, data, dataLinkedFields) {
      var linkedFields = this.state.linkedFields;

      if (dataLinkedFields !== undefined && Object.keys(dataLinkedFields).length > 0) {
        linkedFields[id] = dataLinkedFields;
      }

      var elementList = this.state.elementList;

      for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].ID === id) {
          elementList[i].validated = true;
          elementList[i].name = data.Name;
          break;
        }
      }

      var currentElementData = Object.assign({}, this.state.elementData);
      currentElementData[id] = Object.assign(currentElementData[id], data);
      this.setState({
        elementData: currentElementData,
        linkedFields: linkedFields
      });
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(currentElementData, validated);
      this.props.updateLinkedFields(linkedFields);
    }
  }, {
    key: "getElementData",
    value: function getElementData() {
      return Object.assign({}, this.state.elementData);
    }
  }, {
    key: "addComponentsIndexesIfMissing",
    value: function addComponentsIndexesIfMissing(schema, newElementData) {
      Object.keys(schema.properties).forEach(function (key) {
        var currentNumber = _constants.string_currentNumberOf_identifier + key;
        var minNumber = _constants.string_minNumberOf_identifier + key;
        var maxNumber = _constants.string_maxNumberOf_identifier + key;

        if (newElementData[currentNumber] !== undefined) {
          return;
        }

        if (schema.properties[key].type === _constants.string_array) {
          if (schema.required.indexOf(key) != -1) {
            newElementData[currentNumber] = 1;
            newElementData[minNumber] = 1;
            newElementData[maxNumber] = -1;
          } else {
            newElementData[currentNumber] = 0;
            newElementData[minNumber] = 0;
            newElementData[maxNumber] = -1;
          }
        } else if (schema.properties[key].type === _constants.string_object) {
          if (schema.required.indexOf(key) === -1) {
            newElementData[currentNumber] = 0;
            newElementData[minNumber] = 0;
            newElementData[maxNumber] = 1;
          } else {
            newElementData[currentNumber] = 1;
            newElementData[minNumber] = 1;
            newElementData[maxNumber] = 1;
          }
        }
      });
    }
  }, {
    key: "onInnerElementDataSave",
    value: function onInnerElementDataSave(id, data) {
      var category = this.state.category;
      var selectedSlot = this.state.selectedSlot;

      if (category === null) {
        this.setState({
          editing: false
        });
        console.log("saved inner channel data category null");
      } else {
        if (selectedSlot.includes("AddButton")) {
          var selectedComp = this.state.selectedComp;
          var _selectedSlot = this.state.selectedSlot;
          var slots = Object.assign({}, this.state.slots);
          var slotItems = [];

          if (slots[_selectedSlot] !== null && slots[_selectedSlot] !== undefined) {
            slotItems = slots[_selectedSlot];
          }

          slotItems.push(selectedComp);
          slots[_selectedSlot] = slotItems;
          this.setState({
            slots: slots
          }); // console.log("slots");
          // console.log(slots);
        }

        console.log("saved inner channel data category " + category);
      }
    }
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      // let channels = this.state.channels.slice();
      // let found = false;
      // for (let i = 0; i < channels.length; i++) {
      // 	let name_id = this.props.schema.title + "_" + channels[i].ID;
      // 	if (id === name_id) {
      // 		channels[i] = data;
      // 		found = true;
      // 		found = true;
      // 		break;
      // 	}
      // }
      // if (!found) {
      // 	//todo should never happen
      // 	console.log("issue with " + id);
      // }
      //this.setState({ channels: channels, editing: false });
      var category = this.state.category;

      if (category === null) {
        this.setState({
          editing: false
        });
        console.log("saved channel data category null");
      } else {
        console.log("saved channel data category " + category);
      }
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      this.setState({
        editing: false
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
      var selectedComp = this.state.selectedComp;
      var selectedSlot = this.state.selectedSlot;
      this.setState({
        editing: false,
        category: null,
        selectedSlot: null,
        selectedComp: selectedComp
      });
    }
  }, {
    key: "onAddAdditionalCancel",
    value: function onAddAdditionalCancel() {
      this.setState({
        editing: false,
        category: null,
        selectedSlot: null,
        selectedComp: null
      });
    }
  }, {
    key: "handleClick_additionalItemButton_1_7_8",
    value: function handleClick_additionalItemButton_1_7_8(index) {
      var i = Number(index);
      console.log("handleClick_additionalItemButton " + i);
      this.setState({
        editing: true,
        category: _constants.channelPath_Additional_1_7_8,
        selectedSlot: "AddButton_" + i
      });
    }
  }, {
    key: "handleClick_additionalItemButton_2_3_4_5_6",
    value: function handleClick_additionalItemButton_2_3_4_5_6(index) {
      var i = Number(index);
      console.log("handleClick_additionalItemButton " + i);
      this.setState({
        editing: true,
        category: _constants.channelPath_Additional_2_3_4_5_6,
        selectedSlot: "AddButton_" + i
      });
    }
  }, {
    key: "handleClick_lightSource",
    value: function handleClick_lightSource() {
      var category = ["Fluorescence_LightSource", "Transmitted_LightSource"];
      var selectedSlot = "LightSource";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_detector",
    value: function handleClick_detector() {
      var category = ["Detector"];
      var selectedSlot = "Detector";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_couplingLens",
    value: function handleClick_couplingLens() {
      var category = ["CouplingLens"];
      var selectedSlot = "CouplingLens";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_relayLens",
    value: function handleClick_relayLens() {
      var category = ["RelayLens"];
      var selectedSlot = "RelayLens";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_lightSourceCoupling",
    value: function handleClick_lightSourceCoupling() {
      var category = ["LightSourceCoupling"];
      var selectedSlot = "LightSourceCoupling";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_excitation",
    value: function handleClick_excitation() {
      var category = ["ExcitationFilter"];
      var selectedSlot = "ExcitationFilter";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_dichroic",
    value: function handleClick_dichroic() {
      var category = ["StandardDichroic"];
      var selectedSlot = "StandardDichroic";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_emission",
    value: function handleClick_emission() {
      var category = ["EmissionFilter"];
      var selectedSlot = "EmissionFilter";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "handleClick_objective",
    value: function handleClick_objective() {
      var category = ["Objective"];
      var selectedSlot = "Objective";
      this.setState({
        editing: true,
        category: category,
        selectedSlot: selectedSlot
      });
    }
  }, {
    key: "createAddButton_1_7_8",
    value: function createAddButton_1_7_8(buttonStyle, image, index) {
      var _this2 = this;

      //
      return /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: function onClick() {
          return _this2.handleClick_additionalItemButton_1_7_8(index);
        }
      }, image, "Add additional element");
    }
  }, {
    key: "createAddButton_2_3_4_5_6",
    value: function createAddButton_2_3_4_5_6(buttonStyle, image, index) {
      var _this3 = this;

      //
      return /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: function onClick() {
          return _this3.handleClick_additionalItemButton_2_3_4_5_6(index);
        }
      }, image, "Add additional element");
    }
  }, {
    key: "handleSelectComp",
    value: function handleSelectComp(comp) {
      var selectedComp = comp;
      this.setState({
        selectedComp: selectedComp
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      // const {
      // 	backgroundImage,
      // 	dimensions: { width, height } = {},
      // 	microscope = null,
      // 	scalingFactor = 1,
      // } = this.props;
      // const { linkedFields } = this.state;
      // if (bool_isDebug) {
      // 	console.log("LinkedFields");
      // 	console.log(linkedFields);
      // }
      // const styleContainer = {
      // 	borderBottom: "2px solid",
      // 	borderTop: "2px solid",
      // 	borderRight: "2px solid",
      // 	color: "black",
      // 	width: `${width}px`,
      // 	height: `${height}px`,
      // };
      // const innerWidth = width - 2;
      // const innerHeight = height - 4;
      // const dropTargetStyle = {
      // 	width: `${innerWidth}px`,
      // 	height: `${innerHeight}px`,
      // };
      // const canvasContainerStyle = {
      // 	width: "100%",
      // 	height: "100%",
      // 	position: "relative",
      // 	overflow: "auto",
      // };
      // const scaledCanvasWidth = number_canvas_width * scalingFactor;
      // const scaledCanvasHeight = number_canvas_height * scalingFactor;
      // const canvasInnerContainerStyle = {
      // 	width: `${scaledCanvasWidth}px`,
      // 	height: `${scaledCanvasHeight}px`,
      // 	position: "absolute",
      // 	left: 0,
      // 	top: 0,
      // };
      // const imageStyle = {
      // 	width: "100%",
      // 	height: "100%",
      // 	margin: "auto",
      // };
      // const infoStyle = {
      // 	position: "absolute",
      // 	left: 0,
      // 	top: 0,
      // };
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
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        overflow: "auto",
        width: "20%",
        maxHeight: "100%",
        alignItems: "center"
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

      if (this.state.editing) {
        if (this.state.category === null) {
          return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeader.default, {
            schema: this.props.schema,
            inputData: this.props.channelData,
            id: this.props.id,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
            elementByType: this.props.elementByType
          }) // <MultiTabFormWithHeaderV2
          // 	schemas={this.props.settingSchemas}
          // 	schema={this.props.schema}
          // 	inputData={this.props.channelData}
          // 	id={this.props.id}
          // 	onConfirm={this.onElementDataSave}
          // 	onCancel={this.onElementDataCancel}
          // 	overlaysContainer={this.props.overlaysContainer}
          // 	currentChildrenComponentIdentifier={
          // 		string_currentNumberOf_identifier
          // 	}
          // 	minChildrenComponentIdentifier={string_minNumberOf_identifier}
          // 	maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
          // 	elementByType={this.props.elementByType}
          // 	modalContainer={true}
          // />
          ;
        } else {
          var selectedComp = this.state.selectedComp;
          var selectedSlot = this.state.selectedSlot;
          var selectedSchema = null;
          var selectedID = null;

          if (selectedComp !== null) {
            selectedID = selectedComp.ID;
            Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
              var schema = _this4.props.componentSchemas[schemaIndex];

              if (schema.ID === selectedComp.Schema_ID) {
                selectedSchema = schema;
              }
            });
          } // console.log("componentData");
          // console.log(this.props.componentData);


          var itemList = [];
          Object.keys(this.props.componentData).forEach(function (compIndex) {
            var comp = _this4.props.componentData[compIndex];
            var compSchema = null;
            var schema_id = comp.Schema_ID;
            Object.keys(_this4.props.componentSchemas).forEach(function (schemaIndex) {
              var schema = _this4.props.componentSchemas[schemaIndex];

              if (schema.ID === schema_id) {
                compSchema = schema;
              }
            });
            if (compSchema === null) return; // console.log("category");
            // console.log(this.state.category);

            if (_this4.state.category.includes(schema_id.replace(".json", "")) || _this4.state.category.includes(compSchema.category)) {
              var compImage = url.resolve(_this4.props.imagesPath, compSchema.image);

              var compItemImage = /*#__PURE__*/_react.default.createElement("img", {
                src: compImage + (compImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
                alt: comp.Name,
                style: regularImageStyle
              });

              var buttonStyleModified = null;

              if (comp === _this4.state.selectedComp) {
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
                  return _this4.handleSelectComp(comp);
                }
              }, compItemImage, comp.Name);

              itemList.push(compButton);
            }
          }); // console.log("itemList");
          // console.log(itemList);

          var topItems = null;

          if (selectedSlot.includes("AddButton")) {
            var items = [];
            var slots = this.state.slots; // console.log("slots");
            // console.log(slots);

            var _selectedSlot2 = this.state.selectedSlot;
            if (slots[_selectedSlot2] !== undefined && slots[_selectedSlot2] !== null) items = this.state.slots[this.state.selectedSlot]; // console.log("items");
            // console.log(items);

            var slotList = [];
            Object.keys(items).forEach(function (compIndex) {
              var comp = items[compIndex];
              var compSchema = null;
              var schema_id = comp.Schema_ID;
              Object.keys(_this4.props.componentSchemas).forEach(function (schemaIndex) {
                var schema = _this4.props.componentSchemas[schemaIndex];

                if (schema.ID === schema_id) {
                  compSchema = schema;
                }
              });
              if (compSchema === null) return;
              var compImage = url.resolve(_this4.props.imagesPath, compSchema.image);

              var compItemImage = /*#__PURE__*/_react.default.createElement("img", {
                src: compImage + (compImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
                alt: comp.Name,
                style: regularImageStyle
              });

              var buttonStyleModified = null;

              if (comp === _this4.state.selectedComp) {
                buttonStyleModified = Object.assign({}, buttonStyle, {
                  border: "5px solid cyan",
                  margin: "10px"
                });
              } else {
                buttonStyleModified = Object.assign({}, buttonStyle, {
                  margin: "10px"
                });
              }

              slotList.push( /*#__PURE__*/_react.default.createElement("button", {
                key: "button-" + comp.Name,
                style: buttonStyleModified,
                onClick: function onClick() {
                  return _this4.handleSelectComp(comp);
                }
              }, compItemImage, comp.Name));
            }); // console.log("slotList");
            // console.log(slotList);

            var arrowedSlotList = [];

            for (var i = 0; i < slotList.length; i++) {
              var button1 = slotList[i];
              var nextIndex = i + 1;
              var hasConnection = false;

              if (slotList[nextIndex] !== null && slotList[nextIndex] !== undefined) {
                hasConnection = true;
                console.log("Index " + i + " hasConnection");
              }

              var id1 = "button" + i;
              var id2 = "button" + nextIndex;
              var relations = [];

              if (hasConnection) {
                relations = [{
                  targetId: "".concat(id2),
                  targetAnchor: "left",
                  sourceAnchor: "right"
                }];
              }

              var arrowItem = /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
                key: "arrowItem" + id1,
                id: id1,
                relations: relations
              }, button1);

              arrowedSlotList.push(arrowItem);
            }

            console.log(arrowedSlotList);
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
          }

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
          }, /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeader.default, {
            schema: selectedSchema,
            inputData: selectedComp,
            id: selectedID,
            onConfirm: this.onInnerElementDataSave,
            onCancel: null,
            overlaysContainer: this.props.overlaysContainer,
            currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
            elementByType: this.props.elementByType,
            notModal: true,
            editable: false
          }) // <MultiTabFormWithHeaderV2
          // 	schemas={this.props.settingSchemas}
          // 	schema={selectedSchema}
          // 	inputData={selectedComp}
          // 	id={selectedID}
          // 	onConfirm={this.onElementDataSave}
          // 	onCancel={null}
          // 	overlaysContainer={this.props.overlaysContainer}
          // 	currentChildrenComponentIdentifier={
          // 		string_currentNumberOf_identifier
          // 	}
          // 	minChildrenComponentIdentifier={
          // 		string_minNumberOf_identifier
          // 	}
          // 	maxChildrenComponentIdentifier={
          // 		string_maxNumberOf_identifier
          // 	}
          // 	elementByType={this.props.elementByType}
          // 	modalContainer={false}
          // />
          )), /*#__PURE__*/_react.default.createElement("div", {
            style: buttonContainerRow
          }, /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: button2,
            size: "lg",
            onClick: this.onAddAdditionalConfirm
          }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: button2,
            size: "lg",
            onClick: this.onAddAdditionalCancel
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
      };
      var gridSpaceSpecimen = Object.assign({
        fontSize: "20px"
      }, gridSpace);
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

      var additionalItemButton_1 = this.createAddButton_1_7_8(buttonStyle, additionalItemImage, 1);
      var additionalItemButton_2 = this.createAddButton_2_3_4_5_6(buttonStyle, additionalItemImage, 2);
      var additionalItemButton_3 = this.createAddButton_2_3_4_5_6(buttonStyle, additionalItemImage, 3);
      var additionalItemButton_4 = this.createAddButton_2_3_4_5_6(buttonStyle, additionalItemImage, 4);
      var additionalItemButton_5 = this.createAddButton_2_3_4_5_6(buttonStyle, additionalItemImage, 5);
      var additionalItemButton_6 = this.createAddButton_2_3_4_5_6(buttonStyle, additionalItemImage, 6);
      var additionalItemButton_7 = this.createAddButton_1_7_8(buttonStyle, additionalItemImage, 7);
      var additionalItemButton_8 = this.createAddButton_1_7_8(buttonStyle, additionalItemImage, 8);
      var lightSourceImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "Fluorescence_LightSource_GenericExcitationSource.json") {
          lightSourceImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var lightSourceItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: lightSourceImage + (lightSourceImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "LightSource",
        style: regularOpaqueImageStyle
      });

      var lightSourceButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_lightSource
      }, lightSourceItemImage, "Select Light Source");

      var detectorImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "GenericDetector.json") {
          detectorImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var detectorItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: detectorImage + (detectorImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "Detector",
        style: regularOpaqueImageStyle
      });

      var detectorButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_detector
      }, detectorItemImage, "Select Detector");

      var relayLensImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "RelayLens.json") {
          relayLensImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var relayLensItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: relayLensImage + (relayLensImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "RelayLens",
        style: regularOpaqueImageStyle
      });

      var relayLensButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_relayLens
      }, relayLensItemImage, "Select Relay Lens");

      var couplingLensImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "CouplingLens.json") {
          couplingLensImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var couplingLensItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: couplingLensImage + (couplingLensImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "CouplingLens",
        style: regularOpaqueImageStyle
      });

      var couplingLensButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_couplingLens
      }, couplingLensItemImage, "Select Coupling Lens");

      var lightSourceCouplingImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "Direct.json") {
          lightSourceCouplingImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var lightSourceCouplingItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: lightSourceCouplingImage + (lightSourceCouplingImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "LightSourceCoupling",
        style: regularOpaqueImageStyle
      });

      var lightSourceCouplingButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_lightSourceCoupling
      }, lightSourceCouplingItemImage, "Select Light Source Coupling");

      var excitationImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "ExcitationFilter.json") {
          excitationImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var excitationItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: excitationImage + (excitationImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "Excitation",
        style: regularOpaqueImageStyle
      });

      var excitationButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_excitation
      }, excitationItemImage, "Select Excitation Wavelength");

      var dichroicImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "StandardDichroic.json") {
          dichroicImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var dichroicItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: dichroicImage + (dichroicImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "Dichroic",
        style: regularOpaqueImageStyle
      });

      var dichroicButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_dichroic
      }, dichroicItemImage, "Select Dichroic");

      var emissionImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "EmissionFilter.json") {
          emissionImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var emissionItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: emissionImage + (emissionImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "Emission",
        style: regularOpaqueImageStyle
      });

      var emissionButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_emission
      }, emissionItemImage, "Select Emission Wavelength");

      var objectiveImage;
      Object.keys(this.props.componentSchemas).forEach(function (schemaIndex) {
        var schema = _this4.props.componentSchemas[schemaIndex];
        var schema_id = schema.ID;

        if (schema_id === "Objective.json") {
          objectiveImage = url.resolve(_this4.props.imagesPath, schema.image);
        }
      });

      var objectiveItemImage = /*#__PURE__*/_react.default.createElement("img", {
        src: objectiveImage + (objectiveImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: "Objective",
        style: regularOpaqueImageStyle
      });

      var objectiveButton = /*#__PURE__*/_react.default.createElement("button", {
        style: buttonStyle,
        onClick: this.handleClick_objective
      }, objectiveItemImage, "Select Objective");

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
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpace
      }), /*#__PURE__*/_react.default.createElement("div", {
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
      }), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherElement, {
        id: "specimen",
        relations: [{
          targetId: "objective",
          targetAnchor: "top",
          sourceAnchor: "bottom"
        }]
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: gridSpaceSpecimen
      }, "SPECIMEN")), /*#__PURE__*/_react.default.createElement("div", {
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
      }, emissionButton))); // let row7 = (
      // 	<div style={gridRowAdd}>
      // 		<div style={gridSpaceAdd}></div>
      // 		<ArcherElement
      // 			id="addButton_4"
      // 			relations={[
      // 				{
      // 					targetId: "objective",
      // 					targetAnchor: "left",
      // 					sourceAnchor: "bottom",
      // 				},
      // 			]}
      // 		>
      // 			<div style={gridSpaceAdd}>{additionalItemButton_4}</div>
      // 		</ArcherElement>
      // 		<div style={gridSpaceAdd}></div>
      // 		<ArcherElement
      // 			id="addButton_5"
      // 			relations={[
      // 				{
      // 					targetId: "dichroicFilter",
      // 					targetAnchor: "bottom",
      // 					sourceAnchor: "left",
      // 				},
      // 			]}
      // 		>
      // 			<div style={gridSpaceAdd}>{additionalItemButton_5}</div>
      // 		</ArcherElement>
      // 		<div style={gridSpaceAdd}></div>
      // 	</div>
      // );
      // let row8 = (
      // 	<div style={gridRow}>
      // 		<div style={gridSpace}></div>
      // 		<div style={gridSpace}></div>
      // 		<ArcherElement
      // 			id="objective"
      // 			relations={[
      // 				// {
      // 				// 	targetId: "specimen",
      // 				// 	targetAnchor: "top",
      // 				// 	sourceAnchor: "left",
      // 				// },
      // 				{
      // 					targetId: "addButton_5",
      // 					targetAnchor: "bottom",
      // 					sourceAnchor: "right",
      // 				},
      // 			]}
      // 		>
      // 			<div style={gridSpace}>{objectiveButton}</div>
      // 		</ArcherElement>
      // 		<div style={gridSpace}></div>
      // 		<div style={gridSpace}></div>
      // 	</div>
      // );
      // let row9 = (
      // 	<div style={gridRowAdd}>
      // 		<div style={gridSpaceAdd}></div>
      // 		<div style={gridSpaceAdd}></div>
      // 		<ArcherElement
      // 			id="specimen"
      // 			relations={
      // 				[
      // 					// {
      // 					// 	targetId: "objective",
      // 					// 	targetAnchor: "right",
      // 					// 	sourceAnchor: "top",
      // 					// },
      // 				]
      // 			}
      // 		>
      // 			<div style={gridSpaceAdd}>SPECIMEN</div>
      // 		</ArcherElement>
      // 		<div style={gridSpaceAdd}></div>
      // 		<div style={gridSpaceAdd}></div>
      // 	</div>
      // );


      return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema.title)), /*#__PURE__*/_react.default.createElement(_reactArcher.ArcherContainer, {
        strokeColor: "red"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: grid
      }, row1, row2, row3, row4, " ", row5, " ", row6)), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.props.onConfirm
      }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onEditElement
      }, "Edit Channel"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.props.onCancel
      }, "Cancel")));
    }
  }]);

  return ChannelsCanvas_V2;
}(_react.default.PureComponent);

exports.default = ChannelsCanvas_V2;