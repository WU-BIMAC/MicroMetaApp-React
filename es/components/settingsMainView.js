"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV2"));

var _planeView = _interopRequireDefault(require("./planeView"));

var _channelView = _interopRequireDefault(require("./channelView"));

var _uuid = require("uuid");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validate = require("jsonschema").validate;

const schemasOrder = ["Experiment.json", "Plane.json", "Channel.json", "TIRFSettings.json", "ImagingEnvironment.json", "MicroscopeSettings.json", "ObjectiveSettings.json"];

class SettingMainView extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      elementList: [],
      elementData: Object.assign({}, this.props.inputData),
      componentsSchema: {},
      editingElement: -1
    };
    console.log(props.componentSchemas);
    Object.keys(props.componentSchemas).forEach(schemaIndex => {
      let schema = props.componentSchemas[schemaIndex];
      let schema_id = schema.ID; //console.log("schema_id: " + schema_id);

      let index = schemasOrder.indexOf(schema_id);
      Object.keys(props.inputData).forEach(objIndex => {
        let object = props.inputData[objIndex];
        if (props.activeTier < object.tier) return;
        if (schema_id !== object.Schema_ID) return;
        let validation = validate(object, schema);
        let validated = validation.valid;
        let newElement = {
          ID: schema.title + "_" + object.ID,
          schema_ID: schema_id,
          name: object.Name,
          validated: validated,
          obj: object
        };
        this.state.elementList[index] = newElement;
      });

      if (this.state.elementList[index] === null || this.state.elementList[index] == undefined) {
        let uuid = (0, _uuid.v4)();
        let newElementData;
        newElementData = {
          Name: "New ".concat(schema.title),
          ID: uuid,
          Tier: schema.tier,
          Schema_ID: schema.ID,
          Version: schema.version
        };
        Object.keys(schema.properties).forEach(key => {
          if (schema.properties[key].type === _constants.string_array) {
            let currentNumber = _constants.string_currentNumberOf_identifier + key;
            let minNumber = _constants.string_minNumberOf_identifier + key;
            let maxNumber = _constants.string_maxNumberOf_identifier + key;

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
            let currentNumber = _constants.string_currentNumberOf_identifier + key;
            let minNumber = _constants.string_minNumberOf_identifier + key;
            let maxNumber = _constants.string_maxNumberOf_identifier + key;

            if (schema.required.indexOf(key) === -1) {
              newElementData[currentNumber] = 0;
              newElementData[minNumber] = 0;
              newElementData[maxNumber] = 1;
            }
          }
        });
        let newElement = {
          ID: schema.title + "_" + uuid,
          schema_ID: schema.ID,
          name: newElementData.Name,
          validated: false,
          obj: newElementData
        };
        this.state.elementList[index] = newElement;
      }

      this.state.componentsSchema[schema_id] = schema;
    });
    this.onElementDataSave = this.onElementDataSave.bind(this);
    this.onElementDataCancel = this.onElementDataCancel.bind(this);
    this.getElementData = this.getElementData.bind(this);
    this.areAllElementsValidated = this.areAllElementsValidated.bind(this);
    this.onClickEditExperiment = this.onClickEditExperiment.bind(this);
    this.onClickEditPlanes = this.onClickEditPlanes.bind(this);
    this.onClickEditChannels = this.onClickEditChannels.bind(this);
    this.onClickEditTIRFSettings = this.onClickEditTIRFSettings.bind(this);
    this.onClickEditImagingEnvironment = this.onClickEditImagingEnvironment.bind(this);
    this.onClickEditMicroscopeSettings = this.onClickEditMicroscopeSettings.bind(this);
    this.onClickEditObjectiveSettings = this.onClickEditObjectiveSettings.bind(this);
    this.props.updateElementData(this.state.elementData, true);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.componentsSchema !== null) {
      let componentsSchema = {};
      Object.keys(props.componentSchemas).forEach(schemaIndex => {
        let schema = props.componentSchemas[schemaIndex];
        let schema_id = schema.ID;
        componentsSchema[schema_id] = schema;
      });
      let elementList = state.elementList;

      for (let i = 0; i < elementList.length; i++) {
        let element = elementList[i];
        let schema_id = element.schema_ID;
        let schema = componentsSchema[schema_id];
        let object = element.obj;
        let validation = validate(object, schema);
        let validated = validation.valid;
        element.validated = validated;
      }

      return {
        componentsSchema: componentsSchema
      };
    }
  }

  areAllElementsValidated() {
    let elementList = this.state.elementList;

    for (let i = 0; i < elementList.length; i++) {
      if (!elementList[i].validated) {
        return false;
      }
    }

    return true;
  }

  onElementDataSave(id, data) {
    let elementList = this.state.elementList;

    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].ID === id) {
        elementList[i].validated = true;
        elementList[i].name = data.Name;
        break;
      }
    }

    let currentElementData = Object.assign({}, this.state.elementData);
    currentElementData[id] = Object.assign(currentElementData[id], data);
    this.setState({
      elementData: currentElementData,
      editingElement: -1
    });
    let validated = this.areAllElementsValidated();
    this.props.updateElementData(currentElementData, validated);
  }

  onElementDataCancel() {
    this.setState({
      editingElement: -1
    });
  }

  getElementData() {
    return Object.assign({}, this.state.elementData);
  }

  onClickEditExperiment() {
    let editingElement = schemasOrder.indexOf("Experiment.json");
    this.setState({
      editingElement: editingElement
    });
  }

  onClickEditPlanes() {
    let editingElement = schemasOrder.indexOf("Plane.json");
    this.setState({
      editingElement: editingElement
    });
  }

  onClickEditChannels() {
    let editingElement = schemasOrder.indexOf("Channel.json");
    this.setState({
      editingElement: editingElement
    });
  }

  onClickEditTIRFSettings() {
    let editingElement = schemasOrder.indexOf("TIRFSettings.json");
    this.setState({
      editingElement: editingElement
    });
  }

  onClickEditImagingEnvironment() {
    let editingElement = schemasOrder.indexOf("ImagingEnvironment.json");
    this.setState({
      editingElement: editingElement
    });
  }

  onClickEditMicroscopeSettings() {
    let editingElement = schemasOrder.indexOf("MicroscopeSettings.json");
    this.setState({
      editingElement: editingElement
    });
  }

  onClickEditObjectiveSettings() {
    let editingElement = schemasOrder.indexOf("ObjectiveSettings.json");
    this.setState({
      editingElement: editingElement
    });
  }

  render() {
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    const styleMainContainer = {
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

    if (this.state.editingElement != -1) {
      if (_constants.bool_isDebug) {
        console.log("list");
        console.log(this.state.elementList);
        console.log("editing element " + this.state.editingElement);
        console.log("element " + element);
      }

      let element = this.state.elementList[this.state.editingElement];
      console.log(element);
      let schema_id = element.schema_ID;
      let obj = element.obj;
      let schema = this.state.componentsSchema[schema_id];
      let elementByType = {};
      Object.keys(this.state.elementData).forEach(function (key) {
        let element = this.state.elementData[key];
        let schemaID = element.Schema_ID.replace(_constants.string_json_ext, "");

        if (elementByType[schemaID] === undefined) {
          elementByType[schemaID] = {};
        }

        elementByType[schemaID][element.Name] = element.ID;
      });
      Object.keys(this.props.microscopeComponents).forEach(key => {
        let element = this.props.microscopeComponents[key];
        let schemaID = element.Schema_ID.replace(_constants.string_json_ext, "");

        if (elementByType[schemaID] === undefined) {
          elementByType[schemaID] = {};
        }

        elementByType[schemaID][element.Name] = element.ID;
      });

      if (this.state.editingElement == 1) {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: styleMainContainer
        }, /*#__PURE__*/_react.default.createElement(_planeView.default, {
          schema: schema,
          inputData: obj,
          id: element.ID,
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer
        }));
      } else if (this.state.editingElement == 2) {
        return /*#__PURE__*/_react.default.createElement(_channelView.default, {
          schemas: this.props.componentSchemas,
          schema: schema,
          inputData: obj,
          id: element.ID,
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          elementByType: elementByType
        });
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: styleMainContainer
        }, /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schemas: this.props.componentSchemas,
          schema: schema,
          inputData: obj,
          id: element.ID,
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: elementByType
        }));
      }
    } else {
      let styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        minHeight: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      let styleEditButton = Object.assign(styleButton, {
        border: "5px ridge red"
      });
      let buttons1 = [];
      buttons1[0] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-0",
        onClick: this.onClickEditExperiment,
        style: styleEditButton,
        size: "lg"
      }, "Edit Experiment");
      buttons1[1] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-1",
        onClick: this.onClickEditPlanes,
        style: styleEditButton,
        size: "lg"
      }, "Edit Planes");
      buttons1[2] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-2",
        onClick: this.onClickEditChannels,
        style: styleEditButton,
        size: "lg"
      }, "Edit Channels");
      buttons1[3] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-3",
        onClick: this.onClickEditTIRFSettings,
        style: styleEditButton,
        size: "lg"
      }, "Edit TIRF Settings");
      buttons1[4] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-4",
        onClick: this.onClickEditImagingEnvironment,
        style: styleEditButton,
        size: "lg"
      }, "Edit Imaging Environment");
      buttons1[5] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-5",
        onClick: this.onClickEditMicroscopeSettings,
        style: styleEditButton,
        size: "lg"
      }, "Edit Microscope Settings");
      buttons1[6] = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "Button-6",
        onClick: this.onClickEditObjectiveSettings,
        style: styleEditButton,
        size: "lg"
      }, "Edit Objective Settings");
      return /*#__PURE__*/_react.default.createElement("div", {
        style: styleMainContainer
      }, buttons1);
    }
  }

}

exports.default = SettingMainView;