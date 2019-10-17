"use strict";

var _interopRequireDefault = require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _jsxFileName = "/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/src/components/channelView.js";

var validate = require("jsonschema").validate;

var uuidv4 = require("uuid/v4");

var currentNumberOf_identifier = "Number_Of_";
var minNumberOf_identifier = "Min_Number_Of_";
var maxNumberOf_identifier = "Max_Number_Of_";

var ChannelView = function (_React$PureComponent) {
  (0, _inherits2.default)(ChannelView, _React$PureComponent);

  function ChannelView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ChannelView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ChannelView).call(this, props));
    _this.state = {
      orderedList: [],
      editing: false,
      selectedIndex: -1
    };
    _this.onAddElement = _this.onAddElement.bind((0, _assertThisInitialized2.default)(_this));
    _this.onRemoveElement = _this.onRemoveElement.bind((0, _assertThisInitialized2.default)(_this));
    _this.onMoveElement = _this.onMoveElement.bind((0, _assertThisInitialized2.default)(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind((0, _assertThisInitialized2.default)(_this));
    _this.onConfirm = _this.onConfirm.bind((0, _assertThisInitialized2.default)(_this));
    _this.onCancel = _this.onCancel.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ChannelView, [{
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
      var id = this.props.schema.title + "_" + this.props.inputData.ID;
      console.log(outputData);
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
      var channels = this.state.channels;

      if (this.state.editing) {
        var schema = this.props.schema;
        var obj = channels[index];
        return _react.default.createElement(_multiTabFormWithHeader.default, {
          schema: schema,
          inputData: obj,
          id: schema.title + "_" + obj.ID,
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: currentNumberOf_identifier,
          minChildrenComponentIdentifier: minNumberOf_identifier,
          maxChildrenComponentIdentifier: maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          },
          __self: this
        });
      } else {
        var buttonContainerRow = {
          display: "flex",
          flexDirection: "row",
          flexWap: "wrap",
          justifyContent: "center"
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
          var channel = channels[i];
          var variant = "dark";

          if (i % 2 === 0) {
            variant = "light";
          }

          list.push(_react.default.createElement(_ListGroup.default.Item, {
            action: true,
            variant: variant,
            onClick: this.onSelectElement,
            key: "Channel-" + i,
            "data-id": i,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 137
            },
            __self: this
          }, channel.Name));
        }

        return _react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 149
          },
          __self: this
        }, _react.default.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 150
          },
          __self: this
        }, _react.default.createElement("h3", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 151
          },
          __self: this
        }, this.props.schema.title + "s")), _react.default.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 153
          },
          __self: this
        }, _react.default.createElement(_ListGroup.default, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 154
          },
          __self: this
        }, list)), _react.default.createElement("div", {
          style: buttonContainerRow,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 156
          },
          __self: this
        }, _react.default.createElement(_Button.default, {
          style: button1,
          size: "lg",
          onClick: this.onAddElement,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 157
          },
          __self: this
        }, "+"), _react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onEditElement,
          disabled: index === -1,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 160
          },
          __self: this
        }, "Edit selected"), _react.default.createElement(_Button.default, {
          style: button1,
          size: "lg",
          onClick: this.onRemoveElement,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 168
          },
          __self: this
        }, "-"), _react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onConfirm,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 171
          },
          __self: this
        }, "Confirm"), _react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onCancel,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 174
          },
          __self: this
        }, "Cancel")));
      }
    }
  }]);
  return ChannelView;
}(_react.default.PureComponent);

exports.default = ChannelView;