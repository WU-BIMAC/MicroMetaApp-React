"use strict";

var _interopRequireDefault = require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactJsonschemaForm = _interopRequireDefault(require("react-jsonschema-form"));

var _rcTabs = _interopRequireWildcard(require("rc-tabs"));

var _TabContent = _interopRequireDefault(require("rc-tabs/lib/TabContent"));

var _TabBar = _interopRequireDefault(require("rc-tabs/lib/TabBar"));

require("rc-tabs/assets/index.css");

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/multiTabFormWithHeader.js";
var add_components_warning = "If you modify the number of sub-components, the information not saved are going to be lost!";

var MultiTabFormWithHeader = function (_React$PureComponent) {
  (0, _inherits2.default)(MultiTabFormWithHeader, _React$PureComponent);

  function MultiTabFormWithHeader(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MultiTabFormWithHeader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MultiTabFormWithHeader).call(this, props));
    _this.state = {
      showForm: true,
      currentChildrenComponents: {},
      minChildrenComponents: {},
      maxChildrenComponents: {},
      tmpData: {},
      activeKey: "0"
    };

    if (props.inputData !== null && props.childrenComponentIdentifier !== null && props.minChildrenComponentIdentifier !== null && props.maxChildrenComponentIdentifier !== null) {
      Object.keys(props.inputData).forEach(function (key) {
        if (key.includes(props.minChildrenComponentIdentifier)) {
          var name = key.replace(props.minChildrenComponentIdentifier, "");
          _this.state.minChildrenComponents[name] = props.inputData[key];
        } else if (key.includes(props.maxChildrenComponentIdentifier)) {
          var _name = key.replace(props.maxChildrenComponentIdentifier, "");

          _this.state.maxChildrenComponents[_name] = props.inputData[key];
        } else if (key.includes(props.currentChildrenComponentIdentifier)) {
          var _name2 = key.replace(props.currentChildrenComponentIdentifier, "");

          _this.state.currentChildrenComponents[_name2] = props.inputData[key];
        }
      });
    }

    _this.formDescs = [];
    _this.buttonsRefs = [];
    _this.formNames = [];
    _this.forms = [];
    _this.formRefs = [];
    _this.data = [];
    _this.errors = [];
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSubmit = _this.onSubmit.bind((0, _assertThisInitialized2.default)(_this));
    _this.onError = _this.onError.bind((0, _assertThisInitialized2.default)(_this));
    _this.onTabChange = _this.onTabChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onConfirm = _this.onConfirm.bind((0, _assertThisInitialized2.default)(_this));
    _this.onCancel = _this.onCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.createForm = _this.createForm.bind((0, _assertThisInitialized2.default)(_this));
    _this.createForms = _this.createForms.bind((0, _assertThisInitialized2.default)(_this));
    _this.processData = _this.processData.bind((0, _assertThisInitialized2.default)(_this));
    _this.processErrors = _this.processErrors.bind((0, _assertThisInitialized2.default)(_this));
    _this.onEditComponents = _this.onEditComponents.bind((0, _assertThisInitialized2.default)(_this));
    _this.onEditComponentsConfirm = _this.onEditComponentsConfirm.bind((0, _assertThisInitialized2.default)(_this));
    _this.onEditComponentsCancel = _this.onEditComponentsCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.createChildrenComponentsButton = _this.createChildrenComponentsButton.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickAddChildComponent = _this.onClickAddChildComponent.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickRemoveChildComponent = _this.onClickRemoveChildComponent.bind((0, _assertThisInitialized2.default)(_this));
    _this.initializeForms = _this.initializeForms.bind((0, _assertThisInitialized2.default)(_this));

    _this.initializeForms();

    return _this;
  }

  (0, _createClass2.default)(MultiTabFormWithHeader, [{
    key: "initializeForms",
    value: function initializeForms() {
      var currentChildrenComponents = this.state.currentChildrenComponents;
      this.partialSchema = MultiTabFormWithHeader.transformSchema(currentChildrenComponents, this.props.schema, this.props.elementByType);
      var partialInputData = [];

      if (this.props.inputData !== undefined) {
        partialInputData = MultiTabFormWithHeader.transformInputData(this.props.inputData, this.partialSchema);
      }

      var subCategoriesOrder = this.props.schema.subCategoriesOrder;
      this.forms = this.createForms(subCategoriesOrder, this.partialSchema, partialInputData);
    }
  }, {
    key: "onChange",
    value: function onChange() {}
  }, {
    key: "onSubmit",
    value: function onSubmit(data) {
      var currentData = this.data.slice();
      var currentErrors = this.errors.slice();
      currentData.push(data);
      currentErrors.push(null);
      this.data = currentData;
      this.errors = currentErrors;
      this.processData();
    }
  }, {
    key: "onError",
    value: function onError(errors) {
      var currentData = this.data.slice();
      var currentErrors = this.errors.slice();
      currentData.push(null);
      currentErrors.push(errors);
      this.data = currentData;
      this.errors = currentErrors;
      this.processErrors();
    }
  }, {
    key: "processData",
    value: function processData() {
      var currentData = this.data;
      var numberOfForms = this.formRefs.length;
      if (currentData.length < numberOfForms) return;
      var consolidatedData = this.transformOutputData(currentData);
      var currentChildrenComponents = this.state.currentChildrenComponents;
      var attrName = this.props.currentChildrenComponentIdentifier;
      Object.keys(currentChildrenComponents).forEach(function (key) {
        var attr = attrName + key;
        consolidatedData[attr] = currentChildrenComponents[key];
      });
      this.props.onConfirm(this.props.id, consolidatedData);
    }
  }, {
    key: "processErrors",
    value: function processErrors() {
      var currentErrors = this.errors;
      var numberOfForms = this.formRefs.length;
      if (currentErrors.length < numberOfForms) return;

      for (var i = 0; i < currentErrors.length; i++) {
        if (currentErrors[i] !== null) {
          this.setState({
            activeKey: "".concat(i)
          });
          return;
        }
      }
    }
  }, {
    key: "onEditComponents",
    value: function onEditComponents() {
      this.setState({
        showForm: false
      });
    }
  }, {
    key: "onEditComponentsConfirm",
    value: function onEditComponentsConfirm() {
      this.initializeForms();
      this.setState({
        showForm: true
      });
    }
  }, {
    key: "onEditComponentsCancel",
    value: function onEditComponentsCancel() {
      this.setState({
        showForm: true
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      var localForms = this.formRefs;
      this.data = [];
      this.errors = [];

      for (var i = 0; i < localForms.length; i++) {
        var ref = localForms[i];
        ref.submit();
      }
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.props.onCancel();
    }
  }, {
    key: "transformOutputData",
    value: function transformOutputData(data) {
      var consolidatedData = {};
      data.map(function (item) {
        var container = item.schema.container;
        var subType = item.schema.subType;
        var counter = item.schema.counter;
        Object.keys(item.formData).forEach(function (key) {
          if (subType === "object") {
            if (consolidatedData[container] === undefined) consolidatedData[container] = {};
            consolidatedData[container][key] = item.formData[key];
          } else if (subType === "array") {
            if (consolidatedData[container] === undefined) consolidatedData[container] = [];
            if (consolidatedData[container][counter] === undefined) consolidatedData[container][counter] = {};
            consolidatedData[container][counter][key] = item.formData[key];
          } else {
            consolidatedData[key] = item.formData[key];
          }
        });
      });
      return consolidatedData;
    }
  }, {
    key: "createUISchema",
    value: function createUISchema(partialSchema) {
      var partialUISchema = [];
      Object.keys(partialSchema).forEach(function (key, index1) {
        if (partialUISchema[key] === undefined) partialUISchema[key] = {};
        Object.keys(partialSchema[key].properties).forEach(function (propKey, index2) {
          var uiProperties = {};

          if (partialUISchema[key][propKey] !== undefined) {
            Object.assign(uiProperties, partialUISchema[key][propKey]);
          }

          if (index1 === 0 && index2 === 0) {
            partialUISchema[key][propKey] = Object.assign(uiProperties, {
              "ui:autofocus": true
            });
          }

          if (partialSchema[key].properties[propKey].readonly !== undefined) {
            partialUISchema[key][propKey] = Object.assign(uiProperties, {
              "ui:readonly": true
            });
          }
        });
      });
      return partialUISchema;
    }
  }, {
    key: "createForm",
    value: function createForm(schema, uiSchema, input, index, currentFormRefs, currentButtonsRefs) {
      return _react.default.createElement(_reactJsonschemaForm.default, {
        schema: schema,
        uiSchema: uiSchema,
        onChange: this.onChange,
        onSubmit: this.onSubmit,
        onError: this.onError,
        formData: input,
        showErrorList: false,
        ref: function ref(form) {
          if (index != -1) {
            currentFormRefs.splice(index, 0, form);
          } else {
            currentFormRefs.push(form);
          }
        },
        style: {
          overflow: "hidden"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 431
        },
        __self: this
      }, _react.default.createElement("button", {
        ref: function ref(btn) {
          if (index != -1) {
            currentButtonsRefs.splice(index, 0, btn);
          } else {
            currentButtonsRefs.push(btn);
          }
        },
        style: {
          display: "none"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        __self: this
      }));
    }
  }, {
    key: "createForms",
    value: function createForms(subCategoriesOrder, partialSchema, partialInputData) {
      var _this2 = this;

      var currentButtonsRefs = [];
      var currentFormNames = [];
      var currentFormRefs = [];
      var partialUISchema = this.createUISchema(partialSchema);
      var currentForms = [];
      Object.keys(subCategoriesOrder).forEach(function (key, index) {
        var description = subCategoriesOrder[key];
        if (partialSchema[key] === undefined) return;
        partialSchema[key] = Object.assign(partialSchema[key], {
          description: description
        });
        currentFormNames.splice(index, 0, key);

        var form = _this2.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], index, currentFormRefs, currentButtonsRefs);

        currentForms.push(form);
      });
      var schemaKeys = Object.keys(partialSchema);

      var _loop = function _loop(i) {
        var key = schemaKeys[i];
        if (Object.keys(subCategoriesOrder).includes(key)) return "continue";
        var description = null;
        Object.keys(subCategoriesOrder).forEach(function (subKey, index) {
          if (key.startsWith(subKey)) {
            description = subCategoriesOrder[subKey];
          }
        });
        if (description === null) description = "";
        partialSchema[key] = Object.assign(partialSchema[key], {
          description: description
        });
        currentFormNames.push(key);

        var form = _this2.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], -1, currentFormRefs, currentButtonsRefs);

        currentForms.push(form);
      };

      for (var i = 0; i < schemaKeys.length; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }

      this.buttonsRefs = currentButtonsRefs;
      this.formNames = currentFormNames;
      this.formRefs = currentFormRefs;
      return currentForms;
    }
  }, {
    key: "onTabChange",
    value: function onTabChange(key) {
      this.setState({
        activeKey: key
      });
    }
  }, {
    key: "onClickAddChildComponent",
    value: function onClickAddChildComponent(key) {
      var currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
      currentChildrenComponents[key] = currentChildrenComponents[key] + 1;
      this.setState({
        currentChildrenComponents: currentChildrenComponents
      });
    }
  }, {
    key: "onClickRemoveChildComponent",
    value: function onClickRemoveChildComponent(key) {
      var currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
      currentChildrenComponents[key] = currentChildrenComponents[key] - 1;
      this.setState({
        currentChildrenComponents: currentChildrenComponents
      });
    }
  }, {
    key: "createChildrenComponentsButton",
    value: function createChildrenComponentsButton() {
      var _this3 = this;

      var currentChildrenComponents = this.state.currentChildrenComponents;
      var minChildrenComponents = this.state.minChildrenComponents;
      var maxChildrenComponents = this.state.maxChildrenComponents;
      var buttonNoMargin = {
        width: "250px",
        marginBottom: "5px"
      };
      var sideButtonLeftMargin = {
        width: "50px",
        marginLeft: "5px",
        marginBottom: "5px"
      };
      var sideButtonRightMargin = {
        width: "50px",
        marginRight: "5px",
        marginBottom: "5px"
      };
      var buttons = [];
      Object.keys(currentChildrenComponents).forEach(function (key) {
        var currentChildren = currentChildrenComponents[key];
        var minChildren = minChildrenComponents[key];
        var maxChildren = maxChildrenComponents[key];
        var isMinDisabled = minChildren === currentChildren;
        var isMaxDisabled = maxChildren === currentChildren;
        buttons.push(_react.default.createElement("div", {
          key: key,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 574
          },
          __self: this
        }, _react.default.createElement(_Button.default, {
          style: sideButtonLeftMargin,
          variant: isMinDisabled ? "secondary" : "danger",
          onClick: isMinDisabled ? null : function () {
            return _this3.onClickRemoveChildComponent(key);
          },
          disabled: isMinDisabled,
          value: key,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 575
          },
          __self: this
        }, "-"), _react.default.createElement(_Button.default, {
          style: buttonNoMargin,
          size: "lg",
          variant: "secondary",
          disabled: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 586
          },
          __self: this
        }, key, " : ", currentChildren), _react.default.createElement(_Button.default, {
          style: sideButtonRightMargin,
          variant: isMaxDisabled ? "secondary" : "success",
          onClick: isMaxDisabled ? null : function () {
            return _this3.onClickAddChildComponent(key);
          },
          disabled: isMaxDisabled,
          value: key,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 589
          },
          __self: this
        }, "+")));
      });
      return buttons;
    }
  }, {
    key: "render",
    value: function render() {
      var button = {
        width: "250px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var buttonContainerColumnExternal = {
        display: "flex",
        flexDirection: "column",
        flexWap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      };
      var buttonContainerColumn = {
        display: "flex",
        flexDirection: "column",
        flexWap: "wrap",
        justifyContent: "center",
        alignItems: "center"
      };
      var buttonContainerRow = {
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "center"
      };
      var currentChildrenComponents = this.state.currentChildrenComponents;
      var showForm = this.state.showForm;
      var childrenButtons = this.createChildrenComponentsButton();

      if (!showForm) {
        return _react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 639
          },
          __self: this
        }, _react.default.createElement("div", {
          style: buttonContainerColumnExternal,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 640
          },
          __self: this
        }, _react.default.createElement("div", {
          style: buttonContainerColumn,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 641
          },
          __self: this
        }, childrenButtons), _react.default.createElement("div", {
          style: buttonContainerRow,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 642
          },
          __self: this
        }, _react.default.createElement(_Button.default, {
          style: button,
          size: "lg",
          onClick: this.onEditComponentsConfirm,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 643
          },
          __self: this
        }, "Confirm"), _react.default.createElement(_Button.default, {
          style: button,
          size: "lg",
          onClick: this.onEditComponentsCancel,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 650
          },
          __self: this
        }, "Cancel"))));
      }

      var names = this.formNames;
      var forms = this.forms;
      var tabs = forms.map(function (item, index) {
        return _react.default.createElement(_rcTabs.TabPane, {
          tab: names[index],
          key: index,
          forceRender: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 666
          },
          __self: this
        }, item);
      });
      var hasChildren = Object.keys(currentChildrenComponents).length > 0;
      return _react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 674
        },
        __self: this
      }, _react.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 675
        },
        __self: this
      }, _react.default.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 676
        },
        __self: this
      }, this.props.schema.title), _react.default.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 677
        },
        __self: this
      }, hasChildren ? add_components_warning : ""), _react.default.createElement(_rcTabs.default, {
        onChange: this.onTabChange,
        renderTabBar: function renderTabBar() {
          return _react.default.createElement(_TabBar.default, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 680
            },
            __self: this
          });
        },
        renderTabContent: function renderTabContent() {
          return _react.default.createElement(_TabContent.default, {
            animatedWithMargin: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 681
            },
            __self: this
          });
        },
        activeKey: this.state.activeKey,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 678
        },
        __self: this
      }, tabs), _react.default.createElement("div", {
        style: buttonContainerRow,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 686
        },
        __self: this
      }, _react.default.createElement(_Button.default, {
        style: button,
        size: "lg",
        variant: !hasChildren ? "secondary" : "primary",
        onClick: !hasChildren ? null : this.onEditComponents,
        disabled: !hasChildren,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 687
        },
        __self: this
      }, "Edit components"), _react.default.createElement(_Button.default, {
        style: button,
        size: "lg",
        onClick: this.onConfirm,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 696
        },
        __self: this
      }, "Confirm"), _react.default.createElement(_Button.default, {
        style: button,
        size: "lg",
        onClick: this.onCancel,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 699
        },
        __self: this
      }, "Cancel"))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        state: state
      };
    }
  }, {
    key: "findInputPropKeyValue",
    value: function findInputPropKeyValue(index, propKey, inputData) {
      var value = null;

      for (var key in inputData) {
        if (inputData[key] instanceof Array) {
          if (inputData[key][propKey] !== undefined) {
            return inputData[key][propKey];
          } else {
            value = MultiTabFormWithHeader.findInputPropKeyValue(index, propKey, inputData[key]);
          }
        } else if (inputData[key] instanceof Object) {
          if (index === -1) {
            value = MultiTabFormWithHeader.findInputPropKeyValue(index, propKey, inputData[key]);
          } else if (key !== index) {
            continue;
          } else if (inputData[key][propKey] !== undefined) {
            return inputData[key][propKey];
          } else {
            value = MultiTabFormWithHeader.findInputPropKeyValue(index, propKey, inputData[key]);
          }
        }
      }

      return value;
    }
  }, {
    key: "transformInputData",
    value: function transformInputData(inputData, partialSchema) {
      var partialInputData = [];
      Object.keys(partialSchema).forEach(function (key) {
        if (partialInputData[key] === undefined) partialInputData[key] = {};
        Object.keys(partialSchema[key].properties).forEach(function (propKey) {
          if (inputData[propKey] !== undefined) partialInputData[key][propKey] = inputData[propKey];else {
            var stringIndex = key.lastIndexOf("_");
            var index = -1;
            if (stringIndex != -1) index = key.substr(stringIndex + 1, 1);
            console.log("key " + key + " - index " + index);
            var val = MultiTabFormWithHeader.findInputPropKeyValue(index, propKey, inputData);

            if (val !== null) {
              partialInputData[key][propKey] = val;
            }
          }
        });
      });
      return partialInputData;
    }
  }, {
    key: "transformSchemaCategorizeField",
    value: function transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, counter, subType) {
      var partialSchema = {};
      Object.keys(schema.properties).forEach(function (key) {
        var property = schema.properties[key];

        if (property.type === "object") {
          var count = 0;

          for (var inputKey in currentChildrenComponents) {
            if (key.includes(inputKey)) {
              count = currentChildrenComponents[inputKey];
              break;
            }
          }

          for (var i = 0; i < count; i++) {
            var localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, "object");
            partialSchema = Object.assign(partialSchema, localPartialSchema);
          }

          return;
        } else if (property.type === "array") {
          var _count = 0;

          for (var _inputKey in currentChildrenComponents) {
            if (key.includes(_inputKey)) {
              _count = currentChildrenComponents[_inputKey];
              break;
            }
          }

          for (var _i = 0; _i < _count; _i++) {
            var _localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, _i, "array");

            partialSchema = Object.assign(partialSchema, _localPartialSchema);
          }

          return;
        }

        var category = property.category;
        var newCategory = category;
        if (counter !== -1) newCategory += "_" + counter;
        var keysForCategory = partialSchema[newCategory];

        if (keysForCategory === undefined || keysForCategory === null) {
          keysForCategory = {
            title: newCategory,
            type: "object",
            subType: subType,
            container: category,
            counter: counter,
            properties: {}
          };
        }

        var newProperty = Object.assign({}, property);

        if (property.linkTo !== undefined) {
          newProperty["default"] = "na";
          newProperty["enum"] = ["na"];
          newProperty["enumNames"] = ["Not assigned"];

          if (elementByType[property.linkTo] !== undefined) {
            var propElementByType = elementByType[property.linkTo];
            Object.keys(propElementByType).forEach(function (propElementByTypeName) {
              var propElementByTypeID = propElementByType[propElementByTypeName];
              newProperty["enum"].push(property.linkTo + "/" + propElementByTypeID);
              newProperty["enumNames"].push(propElementByTypeName);
            });
          }
        }

        keysForCategory.properties[key] = newProperty;
        partialSchema[newCategory] = keysForCategory;
      });
      Object.keys(partialSchema).forEach(function (key) {
        var required = [];

        if (schema.required !== undefined) {
          Object.keys(partialSchema[key].properties).forEach(function (propKey) {
            if (schema.required.indexOf(propKey) != -1) required.push(propKey);
          });
        }

        if (required.length !== 0) partialSchema[key].required = required;
      });
      console.log(partialSchema);
      return partialSchema;
    }
  }, {
    key: "transformSchema",
    value: function transformSchema(currentChildrenComponents, schema, elementByType) {
      var partialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, "default");
      return partialSchema;
    }
  }]);
  return MultiTabFormWithHeader;
}(_react.default.PureComponent);

exports.default = MultiTabFormWithHeader;