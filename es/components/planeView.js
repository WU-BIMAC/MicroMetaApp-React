"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _uuid = require("uuid");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "rc-tabs/assets/index.css";
const validate = require("jsonschema").validate;

class PlaneView extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      planes: this.props.inputData.planes !== undefined ? this.props.inputData.planes : [],
      editing: false,
      selectedIndex: -1
    };
    this.onAddElement = this.onAddElement.bind(this);
    this.onEditElement = this.onEditElement.bind(this);
    this.onRemoveElement = this.onRemoveElement.bind(this);
    this.onSelectElement = this.onSelectElement.bind(this);
    this.onElementDataCancel = this.onElementDataCancel.bind(this);
    this.onElementDataSave = this.onElementDataSave.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onAddElement() {
    let uuid = (0, _uuid.v4)();
    let schema = this.props.schema;
    let planes = this.state.planes.slice();
    let newElementData = {
      Name: "".concat(schema.title, " ").concat(planes.length),
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
    planes.push(newElementData);
    this.setState({
      planes: planes
    });
    if (_constants.bool_isDebug) console.log("added plane");
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
    if (_constants.bool_isDebug) console.log("removed plane");
  }

  onEditElement() {
    this.setState({
      editing: true
    });
    if (_constants.bool_isDebug) console.log("edit plane");
  }

  onElementDataSave(id, data) {
    let channels = this.state.channels.slice();
    let found = false;

    for (let i = 0; i < channels.length; i++) {
      let name_id = this.props.schema.title + "_" + channels[i].ID;

      if (id === name_id) {
        channels[i] = data;
        found = true;
        found = true;
        break;
      }
    }

    if (!found) {
      //todo should never happen
      console.log("issue with " + id);
    }

    this.setState({
      channels: channels,
      editing: false
    });
    console.log("channel plane");
  }

  onElementDataCancel() {
    this.setState({
      editing: false
    });
  }

  onSelectElement(e) {
    let index = e.currentTarget.dataset.id;
    this.setState({
      selectedIndex: index
    });
  }

  onConfirm() {
    let output = {
      channels: this.state.channels
    };
    let outputData = Object.assign(this.props.inputData, output);
    let id = this.props.schema.title + "_" + this.props.inputData.ID;
    console.log(outputData);
    this.setState({
      editing: false
    }); //this.props.onConfirm(id, outputData);
  }

  onCancel() {
    this.props.onCancel();
  }

  render() {
    let index = this.state.selectedIndex;
    let planes = this.state.planes;

    if (this.state.editing) {
      let schema = this.props.schema;
      let obj = planes[index];
      return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeader.default, {
        schema: schema,
        inputData: obj,
        id: schema.title + "_" + obj.ID,
        onConfirm: this.onElementDataSave,
        onCancel: this.onElementDataCancel,
        overlaysContainer: this.props.overlaysContainer,
        currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
        minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
        maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
        elementByType: this.props.elementByType
      });
    } else {
      const buttonContainerRow = {
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "center"
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
      let list = [];

      for (let i = 0; i < planes.length; i++) {
        let channel = planes[i];
        let variant = "dark";

        if (i % 2 === 0) {
          variant = "light";
        }

        list.push( /*#__PURE__*/_react.default.createElement(_ListGroup.default.Item, {
          action: true,
          variant: variant,
          onClick: this.onSelectElement,
          key: "Channel-" + i,
          "data-id": i
        }, channel.Name));
      }

      return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema.title + "s")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ListGroup.default, null, list)), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button1,
        size: "lg",
        onClick: this.onAddElement
      }, "+"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button2,
        size: "lg",
        onClick: this.onEditElement,
        disabled: index === -1
      }, "Edit selected"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: button1,
        size: "lg",
        onClick: this.onRemoveElement
      }, "-"), /*#__PURE__*/_react.default.createElement(_Button.default, {
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