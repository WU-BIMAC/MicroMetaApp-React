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

var _jsxFileName = "/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/src/components/planeView.js";

var validate = require("jsonschema").validate;

var uuidv4 = require("uuid/v4");

var currentNumberOf_identifier = "Number_Of_";
var minNumberOf_identifier = "Min_Number_Of_";
var maxNumberOf_identifier = "Max_Number_Of_";

var PlaneView = function (_React$PureComponent) {
  (0, _inherits2.default)(PlaneView, _React$PureComponent);

  function PlaneView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PlaneView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PlaneView).call(this, props));
    _this.state = {
      planes: _this.props.inputData.planes !== undefined ? _this.props.inputData.planes : [],
      editing: false,
      selectedIndex: -1
    };
    _this.onAddElement = _this.onAddElement.bind((0, _assertThisInitialized2.default)(_this));
    _this.onEditElement = _this.onEditElement.bind((0, _assertThisInitialized2.default)(_this));
    _this.onRemoveElement = _this.onRemoveElement.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelectElement = _this.onSelectElement.bind((0, _assertThisInitialized2.default)(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind((0, _assertThisInitialized2.default)(_this));
    _this.onConfirm = _this.onConfirm.bind((0, _assertThisInitialized2.default)(_this));
    _this.onCancel = _this.onCancel.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(PlaneView, [{
    key: "onAddElement",
    value: function onAddElement() {
      var uuid = uuidv4();
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
        if (schema.properties[key].type === "array") {
          var currentNumber = currentNumberOf_identifier + key;
          var minNumber = minNumberOf_identifier + key;
          var maxNumber = maxNumberOf_identifier + key;

          if (schema.required.indexOf(key) != -1) {
            newElementData[currentNumber] = 1;
            newElementData[minNumber] = 1;
            newElementData[maxNumber] = -1;
          } else {
            newElementData[currentNumber] = 0;
            newElementData[minNumber] = 0;
            newElementData[maxNumber] = -1;
          }
        } else if (schema.properties[key].type === "object") {
          var _currentNumber = currentNumberOf_identifier + key;

          var _minNumber = minNumberOf_identifier + key;

          var _maxNumber = maxNumberOf_identifier + key;

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
      console.log("added plane");
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
      console.log("removed plane");
    }
  }, {
    key: "onEditElement",
    value: function onEditElement() {
      this.setState({
        editing: true
      });
      console.log("edit plane");
    }
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      var planes = this.state.planes.slice();
      var found = false;

      for (var i = 0; i < planes.length; i++) {
        var name_id = this.props.schema.title + "_" + planes[i].ID;

        if (id === name_id) {
          planes[i] = data;
          found = true;
          break;
        }
      }

      if (!found) {
        console.log("issue with " + id);
      }

      this.setState({
        planes: planes,
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
        planes: this.state.planes
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
      var planes = this.state.planes;

      if (this.state.editing) {
        var schema = this.props.schema;
        var obj = planes[index];
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
            lineNumber: 152
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

        for (var i = 0; i < planes.length; i++) {
          var channel = planes[i];
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
              lineNumber: 192
            },
            __self: this
          }, channel.Name));
        }

        return _react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 204
          },
          __self: this
        }, _react.default.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 205
          },
          __self: this
        }, _react.default.createElement("h3", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 206
          },
          __self: this
        }, this.props.schema.title + "s")), _react.default.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 208
          },
          __self: this
        }, _react.default.createElement(_ListGroup.default, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 209
          },
          __self: this
        }, list)), _react.default.createElement("div", {
          style: buttonContainerRow,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 211
          },
          __self: this
        }, _react.default.createElement(_Button.default, {
          style: button1,
          size: "lg",
          onClick: this.onAddElement,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 212
          },
          __self: this
        }, "+"), _react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onEditElement,
          disabled: index === -1,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 215
          },
          __self: this
        }, "Edit selected"), _react.default.createElement(_Button.default, {
          style: button1,
          size: "lg",
          onClick: this.onRemoveElement,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 223
          },
          __self: this
        }, "-"), _react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onConfirm,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 226
          },
          __self: this
        }, "Confirm"), _react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onCancel,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 229
          },
          __self: this
        }, "Cancel")));
      }
    }
  }]);
  return PlaneView;
}(_react.default.PureComponent);

exports.default = PlaneView;