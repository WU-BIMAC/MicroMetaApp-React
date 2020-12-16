"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _bootstrap = _interopRequireDefault(require("@rjsf/bootstrap-4"));

var _rcTabs = _interopRequireWildcard(require("rc-tabs"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _constants = require("../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var MultiTabFormWithHeader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MultiTabFormWithHeader, _React$PureComponent);

  var _super = _createSuper(MultiTabFormWithHeader);

  function MultiTabFormWithHeader(props) {
    var _this;

    _classCallCheck(this, MultiTabFormWithHeader);

    _this = _super.call(this, props);
    _this.state = {
      showForm: true,
      linkedFields: {},
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
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.onError = _this.onError.bind(_assertThisInitialized(_this));
    _this.onTabChange = _this.onTabChange.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    _this.createForm = _this.createForm.bind(_assertThisInitialized(_this));
    _this.createForms = _this.createForms.bind(_assertThisInitialized(_this));
    _this.onEditComponents = _this.onEditComponents.bind(_assertThisInitialized(_this));
    _this.onEditComponentsConfirm = _this.onEditComponentsConfirm.bind(_assertThisInitialized(_this));
    _this.onEditComponentsCancel = _this.onEditComponentsCancel.bind(_assertThisInitialized(_this));
    _this.createChildrenComponentsButton = _this.createChildrenComponentsButton.bind(_assertThisInitialized(_this));
    _this.onClickAddChildComponent = _this.onClickAddChildComponent.bind(_assertThisInitialized(_this));
    _this.onClickRemoveChildComponent = _this.onClickRemoveChildComponent.bind(_assertThisInitialized(_this));
    _this.initializeForms = _this.initializeForms.bind(_assertThisInitialized(_this));
    if (props.schema !== null) _this.initializeForms();
    return _this;
  }

  _createClass(MultiTabFormWithHeader, [{
    key: "initializeForms",
    value: function initializeForms() {
      //console.log("INITIALIZE FORMS");
      var linkedFields = this.state.linkedFields;
      var currentChildrenComponents = this.state.currentChildrenComponents; //TODO I should collect sub components here

      this.partialSchema = MultiTabFormWithHeader.transformSchema(currentChildrenComponents, this.props.schema, this.props.elementByType, linkedFields);
      var partialInputData = [];

      if (this.props.inputData !== undefined) {
        partialInputData = MultiTabFormWithHeader.transformInputData(this.props.inputData, this.partialSchema);
      }

      var subCategoriesOrder = this.props.schema.subCategoriesOrder;
      this.forms = this.createForms(subCategoriesOrder, this.partialSchema, partialInputData);
      this.forceUpdate();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.inputData === null || prevProps.inputData === undefined || this.props.inputData !== prevProps.inputData) {
        //console.log("FORM UPDATE with OBJ");
        //console.log(this.props.inputData);
        this.initializeForms();
        this.setState({
          activeKey: "0"
        });
      }
    } // static getDerivedStateFromProps(props, state) {
    // 	return { state };
    // }

  }, {
    key: "onSubmit",
    value: function onSubmit(data) {
      var localForms = this.formRefs;
      var index = -1;

      for (var i = 0; i < localForms.length; i++) {
        var ref = localForms[i];

        if (ref.state.formData === data.formData) {
          index = i;
          break;
        }
      }

      var linkedFields = this.state.linkedFields;

      for (var key in data.formData) {
        if (linkedFields[key] !== undefined) {
          var value = data.formData[key];

          var _index = value.indexOf("/");

          var newValue = value.substring(_index + 1);
          linkedFields[key].value = newValue;
        }
      }

      this.setState({
        linkedFields: linkedFields
      });
      var currentData = this.data.slice();
      var currentErrors = this.errors.slice();
      currentData.splice(index, 0, data);
      currentErrors.splice(index, 0, null);
      this.data = currentData;
      this.errors = currentErrors;
      this.processData();
    }
  }, {
    key: "onError",
    value: function onError(errors) {
      var localForms = this.formRefs;
      var index = -1;

      for (var i = 0; i < localForms.length; i++) {
        var ref = localForms[i];

        if (ref.state.errors === errors) {
          index = i;
          break;
        }
      }

      var currentData = this.data.slice();
      var currentErrors = this.errors.slice();
      currentData.splice(index, 0, null);
      currentErrors.splice(index, 0, errors);
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
      var linkedFields = Object.assign({}, this.state.linkedFields);
      this.props.onConfirm(this.props.id, consolidatedData, linkedFields);
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
      var _this2 = this;

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

          if (!_this2.props.editable) {
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
      return /*#__PURE__*/_react.default.createElement(_bootstrap.default, {
        schema: schema,
        uiSchema: uiSchema,
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
        }
      }, /*#__PURE__*/_react.default.createElement("button", {
        ref: function ref(btn) {
          if (index != -1) {
            currentButtonsRefs.splice(index, 0, btn);
          } else {
            currentButtonsRefs.push(btn);
          }
        },
        style: {
          display: "none"
        }
      }));
    }
  }, {
    key: "createForms",
    value: function createForms(subCategoriesOrder, partialSchema, partialInputData) {
      var _this3 = this;

      var currentButtonsRefs = [];
      var currentFormNames = [];
      var currentFormRefs = [];
      var partialUISchema = this.createUISchema(partialSchema);
      var currentForms = [];
      Object.keys(subCategoriesOrder).forEach(function (key, index) {
        var description = subCategoriesOrder[key];
        if (partialSchema[key] === undefined) return;
        partialSchema[key] = Object.assign(partialSchema[key], {
          description
        });
        currentFormNames.splice(index, 0, key);

        var form = _this3.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], index, currentFormRefs, currentButtonsRefs);

        currentForms.push(form); //}
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
          description
        });
        currentFormNames.push(key);

        var form = _this3.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], -1, currentFormRefs, currentButtonsRefs);

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
      var _this4 = this;

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
        buttons.push( /*#__PURE__*/_react.default.createElement("div", {
          key: key
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: sideButtonLeftMargin,
          variant: isMinDisabled ? "secondary" : "danger",
          onClick: isMinDisabled ? null : function () {
            return _this4.onClickRemoveChildComponent(key);
          },
          disabled: isMinDisabled,
          value: key
        }, "-"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: buttonNoMargin,
          size: "lg",
          variant: "secondary",
          disabled: true
        }, key, " : ", currentChildren), /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: sideButtonRightMargin,
          variant: isMaxDisabled ? "secondary" : "success",
          onClick: isMaxDisabled ? null : function () {
            return _this4.onClickAddChildComponent(key);
          },
          disabled: isMaxDisabled,
          value: key
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
      var minChildrenComponents = this.state.minChildrenComponents;
      var maxChildrenComponents = this.state.maxChildrenComponents;
      var showForm = this.state.showForm;
      var childrenButtons = this.createChildrenComponentsButton();

      if (!showForm) {
        return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerColumnExternal
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerColumn
        }, childrenButtons), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button,
          size: "lg",
          onClick: this.onEditComponentsConfirm
        }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button,
          size: "lg",
          onClick: this.onEditComponentsCancel
        }, "Cancel"))));
      }

      var names = this.formNames;
      var forms = this.forms;
      var tabs = forms.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_rcTabs.TabPane, {
          tab: names[index],
          key: index,
          forceRender: true
        }, item);
      });
      var hasEditableChildren = false;

      if (Object.keys(currentChildrenComponents).length > 0) {
        for (var key in currentChildrenComponents) {
          var current = currentChildrenComponents[key];
          var min = minChildrenComponents[key];
          var max = maxChildrenComponents[key];

          if (current !== min || current !== max) {
            hasEditableChildren = true;
            break;
          }
        }
      }

      var title = "Selected Hardware";

      if (this.props.schema !== null) {
        title = this.props.schema.title;
      }

      var buttons = [];
      if (!this.props.notModal) buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "button-addremove",
        style: button,
        size: "lg",
        variant: !hasEditableChildren ? "secondary" : "primary",
        onClick: !hasEditableChildren ? null : this.onEditComponents,
        disabled: !hasEditableChildren
      }, "Add/Remove band-pass"));
      buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "button-confirm",
        style: button,
        size: "lg",
        onClick: this.onConfirm
      }, "Confirm"));
      if (!this.props.notModal) buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "button-cancel",
        style: button,
        size: "lg",
        onClick: this.onCancel
      }, "Cancel"));

      var form = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, title), /*#__PURE__*/_react.default.createElement("p", null, hasEditableChildren ? _constants.string_bandpass_warning : ""), /*#__PURE__*/_react.default.createElement(_rcTabs.default, {
        tabPosition: "top",
        tabBarStyle: {
          display: "row",
          border: "none"
        },
        onChange: this.onTabChange,
        animated: true,
        style: {
          border: "none"
        } // renderTabBar={() => <ScrollableTabBar />}
        // renderTabContent={() => <TabContent animated />}
        ,
        activeKey: this.state.activeKey
      }, tabs), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, buttons)); //<div>{this.props.schema.description}</div>


      if (!this.props.notModal) return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
        overlaysContainer: this.props.overlaysContainer
      }, form);else return form;
    }
  }], [{
    key: "findInputPropKeyValue",
    value: function findInputPropKeyValue(groupKey, index, propKey, inputData) {
      var value = null;

      for (var key in inputData) {
        if (inputData[key] instanceof Array) {
          if (key !== groupKey) continue;

          if (inputData[key][propKey] !== undefined) {
            return inputData[key][propKey];
          } else {
            value = MultiTabFormWithHeader.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
            if (value !== undefined) return value;
          }
        } else if (inputData[key] instanceof Object) {
          if (index === -1) {
            if (inputData[key][propKey] !== undefined) {
              value = inputData[key][propKey];
            } else {
              value = MultiTabFormWithHeader.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
            }
          } else if (key !== index) {
            continue;
          } else if (inputData[key][propKey] !== undefined) {
            return inputData[key][propKey];
          } else {
            value = MultiTabFormWithHeader.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
          }

          if (value !== undefined) return value;
        }
      }

      return null;
    }
  }, {
    key: "transformInputData",
    value: function transformInputData(inputData, partialSchema) {
      var partialInputData = [];
      if (inputData === null || inputData === undefined) return partialInputData;
      Object.keys(partialSchema).forEach(function (key) {
        if (partialInputData[key] === undefined) partialInputData[key] = {};
        Object.keys(partialSchema[key].properties).forEach(function (propKey) {
          if (inputData[propKey] !== undefined) partialInputData[key][propKey] = inputData[propKey];else {
            var stringIndex = key.lastIndexOf("_");
            var index = -1;
            if (stringIndex != -1) index = key.substr(stringIndex + 1, 1);
            var stringKey = key.replace("_", "");
            stringKey = stringKey.replace(index, "");
            var val = MultiTabFormWithHeader.findInputPropKeyValue(stringKey, index, propKey, inputData);

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
    value: function transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, counter, subType, linkedFields) {
      var partialSchema = {};
      if (schema === null) return partialSchema;
      Object.keys(schema.properties).forEach(function (key) {
        var property = schema.properties[key];

        if (property.type === _constants.string_object) {
          var count = 0;

          for (var inputKey in currentChildrenComponents) {
            if (key.includes(inputKey)) {
              count = currentChildrenComponents[inputKey];
              break;
            }
          }

          for (var i = 0; i < count; i++) {
            var localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, _constants.string_object, linkedFields);
            partialSchema = Object.assign(partialSchema, localPartialSchema);
          }

          return;
        } else if (property.type === _constants.string_array) {
          var _count = 0;

          for (var _inputKey in currentChildrenComponents) {
            if (key.includes(_inputKey)) {
              _count = currentChildrenComponents[_inputKey];
              break;
            }
          }

          for (var _i = 0; _i < _count; _i++) {
            var _localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, _i, _constants.string_array, linkedFields);

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
            type: _constants.string_object,
            subType: subType,
            container: category,
            counter: counter,
            properties: {}
          };
        }

        var newProperty = Object.assign({}, property); // console.log("elementByType");
        // console.log(elementByType);

        if (property.linkTo !== undefined) {
          newProperty[_constants.string_default] = _constants.string_na;
          newProperty[_constants.string_enum] = [_constants.string_na];
          newProperty[_constants.string_enumNames] = [_constants.string_not_assigned];

          if (elementByType[property.linkTo] !== undefined) {
            var propElementByType = elementByType[property.linkTo];

            if (linkedFields[key] === undefined) {
              linkedFields[key] = {
                schemaType: property.linkTo,
                value: _constants.string_not_assigned
              };
            }

            Object.keys(propElementByType).forEach(function (propElementByTypeName) {
              var propElementByTypeID = propElementByType[propElementByTypeName];

              newProperty[_constants.string_enum].push(property.linkTo + "/" + propElementByTypeID);

              newProperty[_constants.string_enumNames].push(propElementByTypeName);
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
      return partialSchema;
    }
  }, {
    key: "transformSchema",
    value: function transformSchema(currentChildrenComponents, schema, elementByType, linkedFields) {
      var partialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, _constants.string_default, linkedFields);
      return partialSchema;
    }
  }]);

  return MultiTabFormWithHeader;
}(_react.default.PureComponent);

exports.default = MultiTabFormWithHeader;