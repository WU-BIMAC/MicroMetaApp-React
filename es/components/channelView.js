"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var validate = require("jsonschema").validate;

var uuidv4 = require("uuid/v4");

var ChannelView =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ChannelView, _React$PureComponent);

  function ChannelView(props) {
    var _this;

    _classCallCheck(this, ChannelView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelView).call(this, props));
    _this.state = {
      orderedList: [],
      editing: false,
      selectedIndex: -1
    };
    _this.onAddElement = _this.onAddElement.bind(_assertThisInitialized(_this));
    _this.onRemoveElement = _this.onRemoveElement.bind(_assertThisInitialized(_this));
    _this.onMoveElement = _this.onMoveElement.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChannelView, [{
    key: "onAddElement",
    value: function onAddElement() {}
  }, {
    key: "onRemoveElement",
    value: function onRemoveElement() {}
  }, {
    key: "onMoveElement",
    value: function onMoveElement() {}
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
      console.log("saved plane");
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
      this.props.schema.title + "_" + this.props.inputData.ID;
      console.log(outputData); //this.props.onConfirm(id, outputData);
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
      var channels = this.state.channels; // console.log("planes length " + planes.length);
      // console.log("planes");
      // console.log(planes);
      // console.log("index " + index);

      if (this.state.editing) {
        var schema = this.props.schema;
        var obj = channels[index];
        return _react["default"].createElement(_multiTabFormWithHeader["default"], {
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
          var channel = channels[i];
          var variant = "dark";

          if (i % 2 === 0) {
            variant = "light";
          }

          list.push(_react["default"].createElement(_ListGroup["default"].Item, {
            action: true,
            variant: variant,
            onClick: this.onSelectElement,
            key: "Channel-" + i,
            "data-id": i
          }, channel.Name));
        }

        return _react["default"].createElement(_modalWindow["default"], {
          overlaysContainer: this.props.overlaysContainer
        }, _react["default"].createElement("div", null, _react["default"].createElement("h3", null, this.props.schema.title + "s")), _react["default"].createElement("div", null, _react["default"].createElement(_ListGroup["default"], null, list)), _react["default"].createElement("div", {
          style: {
            display: "flex",
            flexDirection: "row",
            flexWap: "wrap",
            justifyContent: "center"
          }
        }, _react["default"].createElement(_Button["default"], {
          style: button1,
          size: "lg",
          onClick: this.onAddElement
        }, "+"), _react["default"].createElement(_Button["default"], {
          style: button2,
          size: "lg",
          onClick: this.onEditElement,
          disabled: index === -1
        }, "Edit selected"), _react["default"].createElement(_Button["default"], {
          style: button1,
          size: "lg",
          onClick: this.onRemoveElement
        }, "-"), _react["default"].createElement(_Button["default"], {
          style: button2,
          size: "lg",
          onClick: this.onConfirm
        }, "Confirm"), _react["default"].createElement(_Button["default"], {
          style: button2,
          size: "lg",
          onClick: this.onCancel
        }, "Cancel")));
      }
    }
  }]);

  return ChannelView;
}(_react["default"].PureComponent);

exports["default"] = ChannelView;