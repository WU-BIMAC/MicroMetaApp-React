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

var ChannelView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ChannelView, _React$PureComponent);

  var _super = _createSuper(ChannelView);

  function ChannelView(props) {
    var _this;

    _classCallCheck(this, ChannelView);

    _this = _super.call(this, props);
    _this.state = {
      channels: _this.props.inputData || [],
      editing: false,
      selectedIndex: -1,
      fluorophoreSchema: null,
      lightPathSchema: null,
      objective: null
    };

    for (var index in props.settingSchemas) {
      var schema = props.settingSchemas[index];

      if (schema.ID === "LightPath.json") {
        _this.state.lightPathSchema = schema;
      }
    }

    for (var _index in props.experimentalSchemas) {
      var _schema = props.experimentalSchemas[_index];

      if (_schema.ID === "Fluorophore.json") {
        _this.state.fluorophoreSchema = _schema;
      }
    }

    _this.onAddElement = _this.onAddElement.bind(_assertThisInitialized(_this));
    _this.onEditElement = _this.onEditElement.bind(_assertThisInitialized(_this));
    _this.onRemoveElement = _this.onRemoveElement.bind(_assertThisInitialized(_this));
    _this.onSelectElement = _this.onSelectElement.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChannelView, [{
    key: "onAddElement",
    value: function onAddElement() {
      var uuid = (0, _uuid.v4)();
      var uuid2 = (0, _uuid.v4)();
      var uuid3 = (0, _uuid.v4)();
      var channelSchema = this.props.schema;
      var fluorophoreSchema = this.state.fluorophoreSchema;
      var lightPathSchema = this.state.lightPathSchema;
      var channels = this.state.channels.slice();
      var newChannelElementData = {
        Name: "".concat(channelSchema.title, " ").concat(channels.length),
        ID: uuid,
        Tier: channelSchema.tier,
        Schema_ID: channelSchema.ID,
        Version: channelSchema.version
      };
      Object.keys(channelSchema.properties).forEach(function (key) {
        if (channelSchema.properties[key].type === _constants.string_array) {
          var currentNumber = _constants.string_currentNumberOf_identifier + key;
          var minNumber = _constants.string_minNumberOf_identifier + key;
          var maxNumber = _constants.string_maxNumberOf_identifier + key;

          if (channelSchema.required.indexOf(key) != -1) {
            newChannelElementData[currentNumber] = 1;
            newChannelElementData[minNumber] = 1;
            newChannelElementData[maxNumber] = -1;
          } else {
            newChannelElementData[currentNumber] = 0;
            newChannelElementData[minNumber] = 0;
            newChannelElementData[maxNumber] = -1;
          }
        } else if (channelSchema.properties[key].type === _constants.string_object) {
          var _currentNumber = _constants.string_currentNumberOf_identifier + key;

          var _minNumber = _constants.string_minNumberOf_identifier + key;

          var _maxNumber = _constants.string_maxNumberOf_identifier + key;

          if (channelSchema.required.indexOf(key) === -1) {
            newChannelElementData[_currentNumber] = 0;
            newChannelElementData[_minNumber] = 0;
            newChannelElementData[_maxNumber] = 1;
          }
        }
      });
      var newFluorophoreElementData = {
        Name: "".concat(fluorophoreSchema.title, " ").concat(channels.length),
        ID: uuid2,
        Tier: fluorophoreSchema.tier,
        Schema_ID: fluorophoreSchema.ID,
        Version: fluorophoreSchema.version
      };
      Object.keys(fluorophoreSchema.properties).forEach(function (key) {
        if (fluorophoreSchema.properties[key].type === _constants.string_array) {
          var currentNumber = _constants.string_currentNumberOf_identifier + key;
          var minNumber = _constants.string_minNumberOf_identifier + key;
          var maxNumber = _constants.string_maxNumberOf_identifier + key;

          if (fluorophoreSchema.required.indexOf(key) != -1) {
            newFluorophoreElementData[currentNumber] = 1;
            newFluorophoreElementData[minNumber] = 1;
            newFluorophoreElementData[maxNumber] = -1;
          } else {
            newFluorophoreElementData[currentNumber] = 0;
            newFluorophoreElementData[minNumber] = 0;
            newFluorophoreElementData[maxNumber] = -1;
          }
        } else if (fluorophoreSchema.properties[key].type === _constants.string_object) {
          var _currentNumber2 = _constants.string_currentNumberOf_identifier + key;

          var _minNumber2 = _constants.string_minNumberOf_identifier + key;

          var _maxNumber2 = _constants.string_maxNumberOf_identifier + key;

          if (fluorophoreSchema.required.indexOf(key) === -1) {
            newFluorophoreElementData[_currentNumber2] = 0;
            newFluorophoreElementData[_minNumber2] = 0;
            newFluorophoreElementData[_maxNumber2] = 1;
          }
        }
      });
      var newLightPathElementData = {
        Name: "".concat(lightPathSchema.title, " ").concat(channels.length),
        ID: uuid3,
        Tier: lightPathSchema.tier,
        Schema_ID: lightPathSchema.ID,
        Version: lightPathSchema.version
      };
      Object.keys(lightPathSchema.properties).forEach(function (key) {
        if (lightPathSchema.properties[key].type === _constants.string_array) {
          var currentNumber = _constants.string_currentNumberOf_identifier + key;
          var minNumber = _constants.string_minNumberOf_identifier + key;
          var maxNumber = _constants.string_maxNumberOf_identifier + key;

          if (lightPathSchema.required.indexOf(key) != -1) {
            newLightPathElementData[currentNumber] = 1;
            newLightPathElementData[minNumber] = 1;
            newLightPathElementData[maxNumber] = -1;
          } else {
            newLightPathElementData[currentNumber] = 0;
            newLightPathElementData[minNumber] = 0;
            newLightPathElementData[maxNumber] = -1;
          }
        } else if (lightPathSchema.properties[key].type === _constants.string_object) {
          var _currentNumber3 = _constants.string_currentNumberOf_identifier + key;

          var _minNumber3 = _constants.string_minNumberOf_identifier + key;

          var _maxNumber3 = _constants.string_maxNumberOf_identifier + key;

          if (lightPathSchema.required.indexOf(key) === -1) {
            newLightPathElementData[_currentNumber3] = 0;
            newLightPathElementData[_minNumber3] = 0;
            newLightPathElementData[_maxNumber3] = 1;
          }
        }
      });
      newChannelElementData.LightPath = newLightPathElementData;
      newChannelElementData.Fluorophore = newFluorophoreElementData;
      var objective = this.state.objective;

      if (objective !== null) {
        newChannelElementData.LightPath.ComponentSettings = {};
        newChannelElementData.LightPath.ComponentSettings.Objective = objective;
      }

      channels.push(newChannelElementData);
      this.setState({
        channels: channels
      });
    }
  }, {
    key: "onRemoveElement",
    value: function onRemoveElement() {
      var index = this.state.selectedIndex;
      var channels = this.state.channels.slice();

      if (index !== -1) {
        var removed = channels.splice(index, 1);
      } else {
        var _removed = channels.pop();
      }

      this.setState({
        channels: channels
      });
    }
  }, {
    key: "onEditElement",
    value: function onEditElement() {
      this.setState({
        editing: true
      });
    }
  }, {
    key: "onMoveElement",
    value: function onMoveElement() {}
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      var index = this.state.selectedIndex;
      var channels = this.state.channels.slice();
      channels[index] = data;
      var objective = null;
      this.setState({
        editing: false,
        channels: channels,
        objective: objective
      });
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      this.setState({
        editing: false
      });
    }
  }, {
    key: "onSelectElement",
    value: function onSelectElement(e) {
      var index = e.currentTarget.dataset.id;
      this.setState({
        selectedIndex: index
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      var channels = this.state.channels;
      var id = this.props.id;
      this.setState({
        editing: false
      });
      this.props.onConfirm(id, channels);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.props.onCancel();
    }
  }, {
    key: "render",
    value: function render() {
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

      var index = this.state.selectedIndex;
      var channels = this.state.channels;

      if (this.state.editing) {
        var schemas = [];
        schemas[0] = this.props.schema;
        schemas[1] = this.state.lightPathSchema;
        schemas[2] = this.state.fluorophoreSchema;
        var objects = [];
        var channel = channels[index];
        var lightPath = channels[index].LightPath;
        var fluorophore = channels[index].Fluorophore;
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
          objectiveSettings: this.props.objectiveSettings
        });
      } else {
        var buttonContainerRow = {
          display: "flex",
          flexDirection: "row",
          flexWap: "wrap",
          justifyContent: "center",
          padding: "5px"
        };
        var button1 = {
          width: "50px",
          height: "50px",
          marginLeft: "5px",
          marginRight: "5px"
        };
        var button2 = {
          width: "250px",
          height: "50px",
          marginLeft: "5px",
          marginRight: "5px"
        };
        var list = [];

        for (var i = 0; i < channels.length; i++) {
          var _channel = channels[i];
          var variant = "dark";

          if (i % 2 === 0) {
            variant = "light";
          }

          var validation1 = validate(_channel, this.props.schema);
          var validated1 = validation1.valid;
          var validation2 = false;
          if (_channel.Fluorophore !== undefined || _channel.Fluorophore !== null) validated2 = validate(_channel.Fluorophore, this.state.fluorophoreSchema);
          var validated2 = validation2.valid;
          var valid = null;

          if (validated1 && validated2) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }

          var channelName = "- " + _channel.Name;
          list.push( /*#__PURE__*/_react.default.createElement(_ListGroup.default.Item, {
            action: true,
            variant: variant,
            onClick: this.onSelectElement,
            key: "Channel-" + i,
            "data-id": i
          }, valid, channelName));
        }

        return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer
        }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema.title + "s")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ListGroup.default, null, list)), /*#__PURE__*/_react.default.createElement("div", {
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
        }, "Cancel"))));
      }
    }
  }]);

  return ChannelView;
}(_react.default.PureComponent);

exports.default = ChannelView;