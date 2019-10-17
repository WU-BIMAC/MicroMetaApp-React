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

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _planeView = _interopRequireDefault(require("./planeView"));

var _jsxFileName = "/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/src/components/settingsMainView.js";

var validate = require("jsonschema").validate;

var uuidv4 = require("uuid/v4");

var currentNumberOf_identifier = "Number_Of_";
var minNumberOf_identifier = "Min_Number_Of_";
var maxNumberOf_identifier = "Max_Number_Of_";
var schemasOrder = ["Experiment.json", "Plane.json", "Channel.json", "TIRFSettings.json", "ImagingEnvironment.json", "MicroscopeSettings.json", "ObjectiveSettings.json"];

var SettingMainView = function (_React$PureComponent) {
  (0, _inherits2.default)(SettingMainView, _React$PureComponent);

  function SettingMainView(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SettingMainView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SettingMainView).call(this, props));
    _this.state = {
      elementList: [],
      elementData: Object.assign({}, _this.props.inputData),
      componentsSchema: {},
      editingElement: -1
    };
    Object.keys(props.componentSchemas).forEach(function (schemaIndex) {
      var schema = props.componentSchemas[schemaIndex];
      var schema_id = schema.ID;
      var index = schemasOrder.indexOf(schema_id);
      Object.keys(props.inputData).forEach(function (objIndex) {
        var object = props.inputData[objIndex];
        if (props.activeTier < object.tier) return;
        if (schema_id !== object.Schema_ID) return;
        var validation = validate(object, schema);
        var validated = validation.valid;
        var newElement = {
          ID: schema.title + "_" + object.ID,
          schema_ID: schema_id,
          name: object.Name,
          validated: validated,
          obj: object
        };
        _this.state.elementList[index] = newElement;
      });

      if (_this.state.elementList[index] === null || _this.state.elementList[index] == undefined) {
        var uuid = uuidv4();
        var newElementData;
        newElementData = {
          Name: "New ".concat(schema.title),
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
        var newElement = {
          ID: schema.title + "_" + uuid,
          schema_ID: schema.ID,
          name: newElementData.Name,
          validated: false,
          obj: newElementData
        };
        _this.state.elementList[index] = newElement;
      }

      _this.state.componentsSchema[schema_id] = schema;
    });
    _this.onElementDataSave = _this.onElementDataSave.bind((0, _assertThisInitialized2.default)(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.getElementData = _this.getElementData.bind((0, _assertThisInitialized2.default)(_this));
    _this.areAllElementsValidated = _this.areAllElementsValidated.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickEditExperiment = _this.onClickEditExperiment.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickEditPlanes = _this.onClickEditPlanes.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickEditChannels = _this.onClickEditChannels.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickEditTIRFSettings = _this.onClickEditTIRFSettings.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickEditImagingEnvironment = _this.onClickEditImagingEnvironment.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickEditMicroscopeSettings = _this.onClickEditMicroscopeSettings.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickEditObjectiveSettings = _this.onClickEditObjectiveSettings.bind((0, _assertThisInitialized2.default)(_this));

    _this.props.updateElementData(_this.state.elementData, true);

    return _this;
  }

  (0, _createClass2.default)(SettingMainView, [{
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
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
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
        editingElement: -1
      });
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(currentElementData, validated);
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      this.setState({
        editingElement: -1
      });
    }
  }, {
    key: "getElementData",
    value: function getElementData() {
      return Object.assign({}, this.state.elementData);
    }
  }, {
    key: "onClickEditExperiment",
    value: function onClickEditExperiment() {
      var editingElement = schemasOrder.indexOf("Experiment.json");
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "onClickEditPlanes",
    value: function onClickEditPlanes() {
      var editingElement = schemasOrder.indexOf("Plane.json");
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "onClickEditChannels",
    value: function onClickEditChannels() {
      var editingElement = schemasOrder.indexOf("Channel.json");
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "onClickEditTIRFSettings",
    value: function onClickEditTIRFSettings() {
      var editingElement = schemasOrder.indexOf("TIRFSettings.json");
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "onClickEditImagingEnvironment",
    value: function onClickEditImagingEnvironment() {
      var editingElement = schemasOrder.indexOf("ImagingEnvironment.json");
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "onClickEditMicroscopeSettings",
    value: function onClickEditMicroscopeSettings() {
      var editingElement = schemasOrder.indexOf("MicroscopeSettings.json");
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "onClickEditObjectiveSettings",
    value: function onClickEditObjectiveSettings() {
      var editingElement = schemasOrder.indexOf("ObjectiveSettings.json");
      this.setState({
        editingElement: editingElement
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;

      if (this.state.editingElement != -1) {
        console.log("list");
        console.log(this.state.elementList);
        console.log("editing element " + this.state.editingElement);
        console.log("element " + element);
        var element = this.state.elementList[this.state.editingElement];
        var schema_id = element.schema_ID;
        var obj = element.obj;
        var schema = this.state.componentsSchema[schema_id];
        var elementByType = {};
        Object.keys(this.state.elementData).forEach(function (key) {
          var element = this.state.elementData[key];
          var schemaID = element.Schema_ID.replace(".json", "");

          if (elementByType[schemaID] === undefined) {
            elementByType[schemaID] = {};
          }

          elementByType[schemaID][element.Name] = element.ID;
        });
        Object.keys(this.props.microscopeComponents).forEach(function (key) {
          var element = _this2.props.microscopeComponents[key];
          var schemaID = element.Schema_ID.replace(".json", "");

          if (elementByType[schemaID] === undefined) {
            elementByType[schemaID] = {};
          }

          elementByType[schemaID][element.Name] = element.ID;
        });

        if (this.state.editingElement == 1) {
          return _react.default.createElement(_planeView.default, {
            schema: schema,
            inputData: obj,
            id: element.ID,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 260
            },
            __self: this
          });
        } else if (this.state.editingElement == 2) {
          return null;
        } else {
          return _react.default.createElement(_multiTabFormWithHeader.default, {
            schema: schema,
            inputData: obj,
            id: element.ID,
            onConfirm: this.onElementDataSave,
            onCancel: this.onElementDataCancel,
            overlaysContainer: this.props.overlaysContainer,
            currentChildrenComponentIdentifier: currentNumberOf_identifier,
            minChildrenComponentIdentifier: minNumberOf_identifier,
            maxChildrenComponentIdentifier: maxNumberOf_identifier,
            elementByType: elementByType,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 273
            },
            __self: this
          });
        }
      } else {
        var styleMainContainer = {
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
        var styleButton = {
          width: "250px",
          minWidth: "250px",
          height: "50px",
          minHeight: "50px",
          marginLeft: "5px",
          marginRight: "5px"
        };
        var styleEditButton = Object.assign(styleButton, {
          border: "5px ridge red"
        });
        var buttons1 = [];
        buttons1[0] = _react.default.createElement(_Button.default, {
          key: "Button-0",
          onClick: this.onClickEditExperiment,
          style: styleEditButton,
          size: "lg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 329
          },
          __self: this
        }, "Edit Experiment");
        buttons1[1] = _react.default.createElement(_Button.default, {
          key: "Button-1",
          onClick: this.onClickEditPlanes,
          style: styleEditButton,
          size: "lg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 339
          },
          __self: this
        }, "Edit Planes");
        buttons1[2] = _react.default.createElement(_Button.default, {
          key: "Button-2",
          onClick: this.onClickEditChannels,
          style: styleEditButton,
          size: "lg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 349
          },
          __self: this
        }, "Edit Channels");
        buttons1[3] = _react.default.createElement(_Button.default, {
          key: "Button-3",
          onClick: this.onClickEditTIRFSettings,
          style: styleEditButton,
          size: "lg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 359
          },
          __self: this
        }, "Edit TIRF Settings");
        buttons1[4] = _react.default.createElement(_Button.default, {
          key: "Button-4",
          onClick: this.onClickEditImagingEnvironment,
          style: styleEditButton,
          size: "lg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 369
          },
          __self: this
        }, "Edit Imaging Environment");
        buttons1[5] = _react.default.createElement(_Button.default, {
          key: "Button-5",
          onClick: this.onClickEditMicroscopeSettings,
          style: styleEditButton,
          size: "lg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 379
          },
          __self: this
        }, "Edit Microscope Settings");
        buttons1[6] = _react.default.createElement(_Button.default, {
          key: "Button-6",
          onClick: this.onClickEditObjectiveSettings,
          style: styleEditButton,
          size: "lg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 389
          },
          __self: this
        }, "Edit Objective Settings");
        return _react.default.createElement("div", {
          style: styleMainContainer,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 414
          },
          __self: this
        }, buttons1);
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.componentsSchema !== null) {
        var componentsSchema = {};
        Object.keys(props.componentSchemas).forEach(function (schemaIndex) {
          var schema = props.componentSchemas[schemaIndex];
          var schema_id = schema.ID;
          componentsSchema[schema_id] = schema;
        });
        var elementList = state.elementList;

        for (var i = 0; i < elementList.length; i++) {
          var element = elementList[i];
          var schema_id = element.schema_ID;
          var schema = componentsSchema[schema_id];
          var object = element.obj;
          var validation = validate(object, schema);
          var validated = validation.valid;
          element.validated = validated;
        }

        return {
          componentsSchema: componentsSchema
        };
      }
    }
  }]);
  return SettingMainView;
}(_react.default.PureComponent);

exports.default = SettingMainView;