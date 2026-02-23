"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));
var _channelCanvas_V = _interopRequireDefault(require("./channelCanvas_V2"));
var _modalWindow = _interopRequireDefault(require("./modalWindow"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _uuid = require("uuid");
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//import "rc-tabs/assets/index.css";

const validate = require("jsonschema").validate;
class ChannelView extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      channels: this.props.inputData || [],
      editing: false,
      selectedIndex: -1,
      fluorophoreSchema: null,
      lightPathSchema: null,
      objective: null
    };
    for (let index in props.settingSchemas) {
      let schema = props.settingSchemas[index];
      if (schema.ID === "LightPath.json") {
        this.state.lightPathSchema = schema;
      }
    }
    for (let index in props.experimentalSchemas) {
      let schema = props.experimentalSchemas[index];
      if (schema.ID === "Fluorophore.json") {
        this.state.fluorophoreSchema = schema;
      }
    }
    if (this.props.imageMetadata !== null && this.props.imageMetadata !== undefined && this.props.imageMetadata.Channels !== null && this.props.imageMetadata.Channels !== undefined) {
      let newChannels = [];
      let channels = this.props.imageMetadata.Channels.slice();
      if (this.state.channels.length === channels.length || this.state.channels.length === 0) {
        for (let i = 0; i < channels.length; i++) {
          let channelSchema = this.props.schema;
          let fluorophoreSchema = this.state.fluorophoreSchema;
          let lightPathSchema = this.state.lightPathSchema;
          let oldChannel = channels[i];
          let newChannelElementData = {
            Name: "".concat(channelSchema.title, " ").concat(i),
            ID: (0, _uuid.v4)(),
            Tier: channelSchema.tier,
            Schema_ID: channelSchema.ID,
            ModelVersion: channelSchema.modelVersion,
            Extension: channelSchema.extension,
            Domain: channelSchema.domain,
            Category: channelSchema.category
          };
          newChannelElementData = ChannelView.addIdentifiersToNewObject(newChannelElementData, channelSchema);
          let newFluorophoreElementData = {
            Name: "".concat(fluorophoreSchema.title, " ").concat(i),
            ID: (0, _uuid.v4)(),
            Tier: fluorophoreSchema.tier,
            Schema_ID: fluorophoreSchema.ID,
            ModelVersion: fluorophoreSchema.modelVersion,
            Extension: fluorophoreSchema.extension,
            Domain: fluorophoreSchema.domain,
            Category: fluorophoreSchema.category
          };
          newFluorophoreElementData = ChannelView.addIdentifiersToNewObject(newFluorophoreElementData, fluorophoreSchema);
          let newLightPathElementData = {
            Name: "".concat(lightPathSchema.title, " ").concat(i),
            ID: (0, _uuid.v4)(),
            Tier: lightPathSchema.tier,
            Schema_ID: lightPathSchema.ID,
            ModelVersion: lightPathSchema.modelVersion,
            Extension: lightPathSchema.extension,
            Domain: lightPathSchema.domain,
            Category: lightPathSchema.category
          };
          newLightPathElementData = ChannelView.addIdentifiersToNewObject(newLightPathElementData, lightPathSchema);
          let mergedChannel = Object.assign({}, newChannelElementData, oldChannel);
          let mergedLightPath = null;
          if (oldChannel.LightPath !== null && oldChannel.LightPath !== undefined) {
            delete oldChannel.LightPath.ComponentSettings;
            mergedLightPath = Object.assign({}, newLightPathElementData, oldChannel.LightPath);
          } else {
            mergedLightPath = newLightPathElementData;
          }
          let mergedFluorophore = null;
          if (oldChannel.Fluorophore !== null && oldChannel.Fluorophore !== undefined) {
            mergedFluorophore = Object.assign({}, newFluorophoreElementData, oldChannel.Fluorophore);
          } else {
            mergedFluorophore = newFluorophoreElementData;
          }
          if (this.state.channels[i] !== null && this.state.channels[i] !== undefined) {
            newChannels[i] = Object.assign({}, mergedChannel, this.state.channels[i]);
            if (this.state.channels[i].LightPath !== null && this.state.channels[i].LightPath !== undefined) {
              newChannels[i].LightPath = Object.assign({}, mergedLightPath, this.state.channels[i].LightPath);
            } else {
              newChannels[i].LightPath = mergedLightPath;
            }
            if (this.state.channels[i].Fluorophore !== null && this.state.channels[i].Fluorophore !== undefined) {
              newChannels[i].Fluorophore = Object.assign({}, mergedFluorophore, this.state.channels[i].Fluorophore);
            } else {
              newChannels[i].Fluorophore = mergedFluorophore;
            }
          } else {
            newChannels[i] = mergedChannel;
            newChannels[i].LightPath = mergedLightPath;
            newChannels[i].Fluorophore = mergedFluorophore;
          }
        }
        this.state.channels = newChannels;
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
    let uuid2 = (0, _uuid.v4)();
    let uuid3 = (0, _uuid.v4)();
    let channelSchema = this.props.schema;
    let fluorophoreSchema = this.state.fluorophoreSchema;
    let lightPathSchema = this.state.lightPathSchema;
    let channels = this.state.channels.slice();
    let newChannelElementData = {
      Name: "".concat(channelSchema.title, " ").concat(channels.length),
      ID: uuid,
      Tier: channelSchema.tier,
      Schema_ID: channelSchema.ID,
      ModelVersion: channelSchema.modelVersion,
      Extension: channelSchema.extension,
      Domain: channelSchema.domain,
      Category: channelSchema.category
    };
    newChannelElementData = ChannelView.addIdentifiersToNewObject(newChannelElementData, channelSchema);
    let newFluorophoreElementData = {
      Name: "".concat(fluorophoreSchema.title, " ").concat(channels.length),
      ID: uuid2,
      Tier: fluorophoreSchema.tier,
      Schema_ID: fluorophoreSchema.ID,
      ModelVersion: fluorophoreSchema.modelVersion,
      Extension: fluorophoreSchema.extension,
      Domain: fluorophoreSchema.domain,
      Category: fluorophoreSchema.category
    };
    newFluorophoreElementData = ChannelView.addIdentifiersToNewObject(newFluorophoreElementData, fluorophoreSchema);
    let newLightPathElementData = {
      Name: "".concat(lightPathSchema.title, " ").concat(channels.length),
      ID: uuid3,
      Tier: lightPathSchema.tier,
      Schema_ID: lightPathSchema.ID,
      ModelVersion: lightPathSchema.modelVersion,
      Extension: lightPathSchema.extension,
      Domain: lightPathSchema.domain,
      Category: lightPathSchema.category
    };
    newLightPathElementData = ChannelView.addIdentifiersToNewObject(newLightPathElementData, lightPathSchema);
    newChannelElementData.LightPath = newLightPathElementData;
    newChannelElementData.Fluorophore = newFluorophoreElementData;
    let objective = this.state.objective;
    if (objective !== null) {
      newChannelElementData.LightPath.ComponentSettings = {};
      newChannelElementData.LightPath.ComponentSettings.Objective = objective;
    }
    channels.push(newChannelElementData);
    this.setState({
      channels: channels
    });
  }
  onRemoveElement() {
    let index = this.state.selectedIndex;
    let channels = this.state.channels.slice();
    if (index !== -1) {
      let removed = channels.splice(index, 1);
    } else {
      let removed = channels.pop();
    }
    this.setState({
      channels: channels
    });
  }
  onEditElement() {
    this.setState({
      editing: true
    });
  }
  onMoveElement() {}
  onElementDataSave(id, data) {
    let index = this.state.selectedIndex;
    let channels = this.state.channels.slice();
    channels[index] = data;
    let objective = null;
    this.setState({
      editing: false,
      channels: channels,
      objective: objective
    });
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
    let channels = this.state.channels;
    let id = this.props.id;
    this.setState({
      editing: false
    });
    this.props.onConfirm(id, channels);
  }
  onCancel() {
    this.props.onCancel();
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
    let channels = this.state.channels;
    if (this.state.editing) {
      let schemas = [];
      schemas[0] = this.props.schema;
      schemas[1] = this.state.lightPathSchema;
      schemas[2] = this.state.fluorophoreSchema;
      let objects = [];
      let channel = channels[index];
      let lightPath = channels[index].LightPath;
      let fluorophore = channels[index].Fluorophore;
      objects[0] = channel;
      objects[1] = lightPath;
      objects[2] = fluorophore;
      return /*#__PURE__*/_react.default.createElement(_channelCanvas_V.default, {
        activeTier: this.state.activeTier,
        imagesPath: this.props.imagesPath,
        id: channel.ID,
        schema: schemas,
        settingSchemas: this.props.settingSchemas,
        componentSchemas: this.props.componentSchemas,
        experimentalSchemas: this.props.experimentalSchemas,
        channelData: objects,
        imageMetadata: this.props.imageMetadata,
        settingData: this.props.settingData,
        componentData: this.props.componentData,
        linkedFields: this.props.linkedFields,
        updateElementData: this.props.updateElementData,
        updateLinkedFields: this.props.updateLinkedFields,
        overlaysContainer: this.props.overlaysContainer,
        containerOffsetTop: this.props.containerOffsetTop,
        containerOffsetLeft: this.props.containerOffsetLeft,
        headerOffset: this.props.headerOffset,
        onConfirm: this.onElementDataSave,
        onCancel: this.onElementDataCancel,
        elementByType: this.props.elementByType,
        objective: this.props.objective,
        objectiveSettings: this.props.objectiveSettings,
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
      for (let i = 0; i < channels.length; i++) {
        let channel = channels[i];
        let variant = "dark";
        if (i % 2 === 0) {
          variant = "light";
        }
        let validation1 = validate(channel, this.props.schema);
        let validated1 = validation1.valid;
        let validated2 = false;
        if (channel.Fluorophore !== undefined || channel.Fluorophore !== null) {
          let validation2 = validate(channel.Fluorophore, this.state.fluorophoreSchema);
          validated2 = validation2.valid;
        }
        let validated3 = false;
        if (channel.LightPath !== undefined || channel.LightPath !== null) {
          let validation3 = validate(channel.LightPath, this.state.lightPathSchema);
          validated3 = validation3.valid;
        }
        let valid = null;
        if (validated1 && validated2 && validated3) {
          valid = isValid;
        } else {
          valid = isInvalid;
        }
        let channelName = channel.Name;
        list.push(/*#__PURE__*/_react.default.createElement(_ListGroup.default.Item, {
          action: true,
          variant: variant,
          onClick: this.onSelectElement,
          key: "Channel-" + i,
          "data-id": i
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: nameStyle
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            width: "24px"
          }
        }, valid), /*#__PURE__*/_react.default.createElement("div", null, channelName))));
      }
      let channelListStyle = {
        overflow: "auto",
        maxHeight: "0%",
        height: "0%"
      };
      if (channels.length > 0) {
        channelListStyle.maxHeight = "80%";
        channelListStyle.height = "80%";
      }
      return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema.title + "s")), /*#__PURE__*/_react.default.createElement("div", {
        style: channelListStyle
      }, /*#__PURE__*/_react.default.createElement(_ListGroup.default, null, list)), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Add",
        position: _constants.add_channel.position,
        title: _constants.add_channel.title,
        content: _constants.add_channel.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button1,
          size: "lg",
          onClick: this.onAddElement
        }, "+")
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Edit",
        position: _constants.edit_channel.position,
        title: _constants.edit_channel.title,
        content: _constants.edit_channel.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onEditElement,
          disabled: index === -1
        }, "Edit selected")
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButton-Remove",
        position: _constants.remove_channel.position,
        title: _constants.remove_channel.title,
        content: _constants.remove_channel.content,
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
exports.default = ChannelView;