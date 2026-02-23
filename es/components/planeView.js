"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));
var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));
var _modalWindow = _interopRequireDefault(require("./modalWindow"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _uuid = require("uuid");
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//import "rc-tabs/assets/index.css";

const validate = require("jsonschema").validate;
const multiplePlanesSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  ID: "MultiplePlanesSchema.json",
  type: "object",
  title: "Add Multiple Planes",
  description: "Insert the required values to add multiple planes at once.",
  tier: 1,
  subCategoriesOrder: {
    General: "This interface allows you to add multiple image Planes to this Image. For example, in case the Image has 10 Z-sections, 3 channels, and 1 time-points, the interface should be used to add three batches (one per Channel) of 10 Planes each."
  },
  properties: {
    NumberOfPlanes: {
      type: "integer",
      description: "Insert the number of Planes to be inserted as part of this batch.",
      tier: 1,
      category: "General"
    },
    "Z-Increment": {
      type: "boolean",
      description: "Select this if you want the different Planes in this batch to have increasing Z-dimension numbers.",
      tier: 1,
      category: "General"
    },
    "T-Increment": {
      type: "boolean",
      description: "Select this if you want the different Planes in this batch to have increasing timepoint-dimension numbers.",
      tier: 1,
      category: "General"
    },
    "C-Increment": {
      type: "boolean",
      description: "Select this if you want the different Planes in this batch to have increasing channel-dimension numbers.",
      tier: 1,
      category: "General"
    },
    "TimeStamp-Increment": {
      type: "number",
      description: "Insert the TimeStamp increment to be set between image Planes in this batch.",
      tier: 1,
      category: "General"
    }
  },
  required: ["NumberOfPlanes", "Z-Increment", "T-Increment", "C-Increment", "TimeStamp-Increment"]
};
class PlaneView extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      planes: this.props.inputData || [],
      editing: false,
      selectedIndex: -1,
      addingMultiplePlanes: false,
      addingMultiplePlanes2: false,
      addingMultiplePlanesSetup: null
    };
    if (this.props.imageMetadata !== null && this.props.imageMetadata !== undefined && this.props.imageMetadata.Planes !== null && this.props.imageMetadata.Planes !== undefined) {
      let newPlanes = [];
      let planes = this.props.imageMetadata.Planes.slice();
      if (this.state.planes.length === planes.length || this.state.planes.length === 0) {
        for (let i = 0; i < planes.length; i++) {
          let schema = this.props.schema;
          let oldPlane = planes[i];
          let newPlane = {
            //Name: `${schema.title} ${planes.length}`,
            ID: (0, _uuid.v4)(),
            Tier: schema.tier,
            Schema_ID: schema.ID,
            ModelVersion: schema.modelVersion,
            Extension: schema.extension,
            Domain: schema.domain,
            Category: schema.category
          };
          newPlane = PlaneView.addIdentifiersToNewObject(newPlane, schema);
          let mergedPlane = Object.assign({}, newPlane, oldPlane);
          if (this.state.planes[i] !== null && this.state.planes[i] !== undefined) {
            newPlanes[i] = Object.assign({}, mergedPlane, this.state.planes[i]);
          } else {
            newPlanes[i] = mergedPlane;
          }
        }
        this.state.planes = newPlanes;
      }
    }
    this.onAddElement = this.onAddElement.bind(this);
    this.onEditElement = this.onEditElement.bind(this);
    this.onRemoveElement = this.onRemoveElement.bind(this);
    this.onSelectElement = this.onSelectElement.bind(this);
    this.onElementDataCancel = this.onElementDataCancel.bind(this);
    this.onElementDataSave = this.onElementDataSave.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onAddMultiplePlanes = this.onAddMultiplePlanes.bind(this);
  }
  static addIdentifiersToNewObject(object, schema) {
    let newObject = Object.assign({}, object);
    Object.keys(schema.properties).forEach(key => {
      if (schema.properties[key].type === _constants.string_array) {
        let currentNumber = _constants.string_currentNumberOf_identifier + key;
        let minNumber = _constants.string_minNumberOf_identifier + key;
        let maxNumber = _constants.string_maxNumberOf_identifier + key;
        if (schema.required.indexOf(key) != -1) {
          newObject[currentNumber] = 1;
          newObject[minNumber] = 1;
          newObject[maxNumber] = -1;
        } else {
          newObject[currentNumber] = 0;
          newObject[minNumber] = 0;
          newObject[maxNumber] = -1;
        }
      } else if (schema.properties[key].type === _constants.string_object) {
        let currentNumber = _constants.string_currentNumberOf_identifier + key;
        let minNumber = _constants.string_minNumberOf_identifier + key;
        let maxNumber = _constants.string_maxNumberOf_identifier + key;
        if (schema.required.indexOf(key) === -1) {
          newObject[currentNumber] = 0;
          newObject[minNumber] = 0;
          newObject[maxNumber] = 1;
        }
      }
    });
    return newObject;
  }
  onAddElement() {
    let uuid = (0, _uuid.v4)();
    let schema = this.props.schema;
    let planes = this.state.planes.slice();
    let newElementData = {
      //Name: `${schema.title} ${planes.length}`,
      ID: uuid,
      Tier: schema.tier,
      Schema_ID: schema.ID,
      ModelVersion: schema.modelVersion,
      Extension: schema.extension,
      Domain: schema.domain,
      Category: schema.category
    };
    newElementData = PlaneView.addIdentifiersToNewObject(newElementData, schema);
    planes.push(newElementData);
    this.setState({
      planes: planes
    });
    if (this.props.isDebug) console.log("added plane");
  }
  onRemoveElement() {
    let index = this.state.selectedIndex;
    let planes = this.state.planes.slice();
    if (index !== -1) {
      let removed = planes.splice(index, 1);
    } else {
      let removed = planes.pop();
    }
    this.setState({
      planes: planes
    });
    if (this.props.isDebug) console.log("removed plane");
  }
  onEditElement() {
    this.setState({
      editing: true
    });
    if (this.props.isDebug) console.log("edit plane");
  }
  onElementDataSave(id, data) {
    if (this.state.addingMultiplePlanes) {
      this.setState({
        addingMultiplePlanes: false,
        addingMultiplePlanes2: true,
        addingMultiplePlanesSetup: data
      });
    } else if (this.state.addingMultiplePlanes2) {
      let addingMultiplePlanesSetup = this.state.addingMultiplePlanesSetup;
      let planes = this.state.planes.slice();
      let numberOfPlanes = addingMultiplePlanesSetup.NumberOfPlanes;
      let tIncrement = addingMultiplePlanesSetup["T-Increment"];
      let zIncrement = addingMultiplePlanesSetup["Z-Increment"];
      let cIncrement = addingMultiplePlanesSetup["C-Increment"];
      let timeStampIncrement = addingMultiplePlanesSetup["TimeStamp-Increment"];
      for (let i = 0; i < numberOfPlanes; i++) {
        let schema = this.props.schema;
        let newElementData = Object.assign({}, data);
        let timeStamp = Number(data.Timestamp);
        let theZ = Number(data.TheZ);
        let theC = Number(data.TheC);
        let theT = Number(data.TheT);
        newElementData.ID = (0, _uuid.v4)();
        newElementData.Schema_ID = schema.ID;
        newElementData.Tier = schema.tier;
        newElementData.ModelVersion = schema.modelVersion;
        newElementData.Extension = schema.extension;
        newElementData.Domain = schema.domain;
        newElementData.Category = schema.category;
        if (tIncrement) {
          newElementData.TheZ = theZ;
          newElementData.TheT = theT + i;
          newElementData.TheC = theC;
        } else if (zIncrement) {
          newElementData.TheZ = theZ + i;
          newElementData.TheT = theT;
          newElementData.TheC = theC;
        } else if (cIncrement) {
          newElementData.TheZ = theZ;
          newElementData.TheT = theT;
          newElementData.TheC = theC + i;
        }
        newElementData.Timestamp = timeStamp + timeStampIncrement * i;
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
        planes.push(newElementData);
      }
      this.setState({
        planes: planes,
        addingMultiplePlanes2: false
      });
    } else {
      let planes = this.state.planes.slice();
      let found = false;
      for (let i = 0; i < planes.length; i++) {
        let name_id = this.props.schema.title + "_" + planes[i].ID;
        if (id === name_id) {
          planes[i] = data;
          found = true;
          break;
        }
      }
      if (!found) {
        //todo should never happen
        console.log("issue with " + id);
      }
      this.setState({
        planes: planes,
        editing: false
      });
    }
  }
  onElementDataCancel() {
    this.setState({
      addingMultiplePlanes: false,
      addingMultiplePlanes2: false,
      editing: false,
      addingMultiplePlanesSetup: null
    });
    console.log('Cancel called from: planeView');
  }
  onSelectElement(e) {
    let index = e.currentTarget.dataset.id;
    this.setState({
      selectedIndex: index
    });
  }
  onConfirm() {
    let planes = this.state.planes;
    let id = this.props.id;
    // console.log("channels");
    // console.log(channels);
    this.setState({
      editing: false
    });
    this.props.onConfirm(id, planes);
  }
  onCancel() {
    this.props.onCancel();
  }
  onAddMultiplePlanes() {
    this.setState({
      addingMultiplePlanes: true
    });
  }
  render() {
    const styleValidation = {
      position: "absolute",
      verticalAlign: "middle",
      fontWeight: "bold",
      textAlign: "center"
    };
    const styleValidated = Object.assign({}, styleValidation, {
      color: "green"
    });
    const styleNotValidated = Object.assign({}, styleValidation, {
      color: "red"
    });
    let isValid = /*#__PURE__*/_react.default.createElement("div", {
      style: styleValidated
    }, "\u25CF");
    let isInvalid = /*#__PURE__*/_react.default.createElement("div", {
      style: styleNotValidated
    }, "\u25CF");
    let index = this.state.selectedIndex;
    let planes = this.state.planes;
    if (this.props.isDebug) console.log("inside of planeView.js1");
    if (this.state.addingMultiplePlanes) {
      return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
        schema: multiplePlanesSchema,
        inputData: {
          ID: "multiplePlanesSchema"
        },
        id: "multiplePlanesSchema",
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
    } else if (this.state.addingMultiplePlanes2) {
      let schema = this.props.schema;
      //let obj = planes[index];
      if (this.props.isDebug) console.log("inside of planeView.js2");
      return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
        schema: schema,
        inputData: {
          ID: "Not assigned",
          Tier: schema.tier,
          Schema_ID: schema.ID,
          ModelVersion: schema.modelVersion,
          Extension: schema.extension,
          Domain: schema.domain,
          Category: schema.category
        },
        id: "Not assigned",
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
    } else if (this.state.editing) {
      let schema = this.props.schema;
      let obj = planes[index];
      if (this.props.isDebug) console.log("inside of planeView.js3");
      return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
        schema: schema,
        inputData: obj,
        id: schema.title + "_" + obj.ID,
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
      const buttonContainerRow = {
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "center",
        padding: "5px"
      };
      const button1 = {
        width: "50px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      const button2 = {
        width: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      const nameStyle = {
        display: "flex",
        flexDirection: "row"
      };
      let list = [];
      for (let i = 0; i < planes.length; i++) {
        let plane = planes[i];
        let variant = "dark";
        if (i % 2 === 0) {
          variant = "light";
        }
        let validation = validate(plane, this.props.schema);
        let validated = validation.valid;
        let valid = null;
        if (validated) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }
        let planeName = "Plane " + i;
        list.push(/*#__PURE__*/_react.default.createElement(_ListGroup.default.Item, {
          action: true,
          variant: variant,
          onClick: this.onSelectElement,
          key: "Plane-" + i,
          "data-id": i
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: nameStyle
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            width: "24px"
          }
        }, valid), /*#__PURE__*/_react.default.createElement("div", null, planeName))));
      }
      let planeListStyle = {
        overflow: "auto",
        maxHeight: "0%",
        height: "0%"
      };
      if (planes.length > 0) {
        planeListStyle.maxHeight = "80%";
        planeListStyle.height = "80%";
      }
      return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema.title + "s")), /*#__PURE__*/_react.default.createElement("div", {
        style: planeListStyle
      }, /*#__PURE__*/_react.default.createElement(_ListGroup.default, null, list)), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Add",
        position: _constants.add_plane.position,
        title: _constants.add_plane.title,
        content: _constants.add_plane.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button1,
          size: "lg",
          onClick: this.onAddElement
        }, "+")
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-AddMulti",
        position: _constants.add_multi_planes.position,
        title: _constants.add_multi_planes.title,
        content: _constants.add_multi_planes.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onAddMultiplePlanes
          //disabled={index === -1}
        }, "Add multiple planes")
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Edit",
        position: _constants.edit_plane.position,
        title: _constants.edit_plane.title,
        content: _constants.edit_plane.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onEditElement,
          disabled: index === -1
        }, "Edit selected")
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Remove",
        position: _constants.remove_plane.position,
        title: _constants.remove_plane.title,
        content: _constants.remove_plane.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button1,
          size: "lg",
          onClick: this.onRemoveElement
        }, "-")
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onConfirm
      }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onCancel
      }, "Cancel")));
    }
  }
}
exports.default = PlaneView;