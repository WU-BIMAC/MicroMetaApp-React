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

var PlaneView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PlaneView, _React$PureComponent);

  var _super = _createSuper(PlaneView);

  function PlaneView(props) {
    var _this;

    _classCallCheck(this, PlaneView);

    _this = _super.call(this, props);
    _this.state = {
      planes: _this.props.inputData.planes !== undefined ? _this.props.inputData.planes : [],
      editing: false,
      selectedIndex: -1
    };
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

  _createClass(PlaneView, [{
    key: "onAddElement",
    value: function onAddElement() {
      var uuid = (0, _uuid.v4)();
      var schema = this.props.schema;
      var planes = this.state.planes.slice();
      var newElementData = {
        Name: "".concat(schema.title, " ").concat(planes.length),
        ID: uuid,
        Tier: schema.tier,
        Schema_ID: schema.ID,
        Version: schema.version
      };
      Object.keys(schema.properties).forEach(function (key) {
        if (schema.properties[key].type === _constants.string_array) {
          var currentNumber = _constants.string_currentNumberOf_identifier + key;
          var minNumber = _constants.string_minNumberOf_identifier + key;
          var maxNumber = _constants.string_maxNumberOf_identifier + key;

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
          var _currentNumber = _constants.string_currentNumberOf_identifier + key;

          var _minNumber = _constants.string_minNumberOf_identifier + key;

          var _maxNumber = _constants.string_maxNumberOf_identifier + key;

          if (schema.required.indexOf(key) === -1) {
            newElementData[_currentNumber] = 0;
            newElementData[_minNumber] = 0;
            newElementData[_maxNumber] = 1;
          }
        }
      });
      planes.push(newElementData);
      this.setState({
        planes: planes
      });
      if (_constants.bool_isDebug) console.log("added plane");
    }
  }, {
    key: "onRemoveElement",
    value: function onRemoveElement() {
      var index = this.state.selectedIndex;
      var planes = this.state.planes.slice();

      if (index !== -1) {
        var removed = planes.splice(index, 1);
      } else {
        var _removed = planes.pop();
      }

      this.setState({
        planes: planes
      });
      if (_constants.bool_isDebug) console.log("removed plane");
    }
  }, {
    key: "onEditElement",
    value: function onEditElement() {
      this.setState({
        editing: true
      });
      if (_constants.bool_isDebug) console.log("edit plane");
    }
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      var channels = this.state.channels.slice();
      var found = false;

      for (var i = 0; i < channels.length; i++) {
        var name_id = this.props.schema.title + "_" + channels[i].ID;

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
      var output = {
        channels: this.state.channels
      };
      var outputData = Object.assign(this.props.inputData, output);
      var id = this.props.schema.title + "_" + this.props.inputData.ID;
      console.log(outputData);
      this.setState({
        editing: false
      }); //this.props.onConfirm(id, outputData);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.props.onCancel();
    }
  }, {
    key: "render",
    value: function render() {
      var index = this.state.selectedIndex;
      var planes = this.state.planes;

      if (this.state.editing) {
        var schema = this.props.schema;
        var obj = planes[index];
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

        for (var i = 0; i < planes.length; i++) {
          var channel = planes[i];
          var variant = "dark";

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
        }, "-")), /*#__PURE__*/_react.default.createElement("div", {
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
  }]);

  return PlaneView;
}(_react.default.PureComponent);

exports.default = PlaneView;