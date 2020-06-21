"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJsonschemaForm = _interopRequireDefault(require("react-jsonschema-form"));

var _rcTabs = _interopRequireWildcard(require("rc-tabs"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _constants = require("../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import TabContent from "rc-tabs/lib/TabContent";
// import ScrollableTabBar from "rc-tabs/lib/";
//import "rc-tabs/assets/index.css"
class MultiTabFormWithHeader extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      linkedFields: {},
      currentChildrenComponents: {},
      minChildrenComponents: {},
      maxChildrenComponents: {},
      tmpData: {},
      activeKey: "0"
    };

    if (props.inputData !== null && props.childrenComponentIdentifier !== null && props.minChildrenComponentIdentifier !== null && props.maxChildrenComponentIdentifier !== null) {
      Object.keys(props.inputData).forEach(key => {
        if (key.includes(props.minChildrenComponentIdentifier)) {
          let name = key.replace(props.minChildrenComponentIdentifier, "");
          this.state.minChildrenComponents[name] = props.inputData[key];
        } else if (key.includes(props.maxChildrenComponentIdentifier)) {
          let name = key.replace(props.maxChildrenComponentIdentifier, "");
          this.state.maxChildrenComponents[name] = props.inputData[key];
        } else if (key.includes(props.currentChildrenComponentIdentifier)) {
          let name = key.replace(props.currentChildrenComponentIdentifier, "");
          this.state.currentChildrenComponents[name] = props.inputData[key];
        }
      });
    }

    this.formDescs = [];
    this.buttonsRefs = [];
    this.formNames = [];
    this.forms = [];
    this.formRefs = [];
    this.data = [];
    this.errors = [];
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.createForm = this.createForm.bind(this);
    this.createForms = this.createForms.bind(this);
    this.onEditComponents = this.onEditComponents.bind(this);
    this.onEditComponentsConfirm = this.onEditComponentsConfirm.bind(this);
    this.onEditComponentsCancel = this.onEditComponentsCancel.bind(this);
    this.createChildrenComponentsButton = this.createChildrenComponentsButton.bind(this);
    this.onClickAddChildComponent = this.onClickAddChildComponent.bind(this);
    this.onClickRemoveChildComponent = this.onClickRemoveChildComponent.bind(this);
    this.initializeForms = this.initializeForms.bind(this);
    this.initializeForms();
  }

  initializeForms() {
    let linkedFields = this.state.linkedFields;
    let currentChildrenComponents = this.state.currentChildrenComponents; //TODO I should collect sub components here

    this.partialSchema = MultiTabFormWithHeader.transformSchema(currentChildrenComponents, this.props.schema, this.props.elementByType, linkedFields);
    let partialInputData = [];

    if (this.props.inputData !== undefined) {
      partialInputData = MultiTabFormWithHeader.transformInputData(this.props.inputData, this.partialSchema);
    }

    let subCategoriesOrder = this.props.schema.subCategoriesOrder;
    this.forms = this.createForms(subCategoriesOrder, this.partialSchema, partialInputData);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      state
    };
  }

  onSubmit(data) {
    let localForms = this.formRefs;
    let index = -1;

    for (let i = 0; i < localForms.length; i++) {
      let ref = localForms[i];

      if (ref.state.formData === data.formData) {
        index = i;
        break;
      }
    }

    let linkedFields = this.state.linkedFields;

    for (let key in data.formData) {
      if (linkedFields[key] !== undefined) {
        let value = data.formData[key];
        let index = value.indexOf("/");
        let newValue = value.substring(index + 1);
        linkedFields[key].value = newValue;
      }
    }

    this.setState({
      linkedFields: linkedFields
    });
    let currentData = this.data.slice();
    let currentErrors = this.errors.slice();
    currentData.splice(index, 0, data);
    currentErrors.splice(index, 0, null);
    this.data = currentData;
    this.errors = currentErrors;
    this.processData();
  }

  onError(errors) {
    let localForms = this.formRefs;
    let index = -1;

    for (let i = 0; i < localForms.length; i++) {
      let ref = localForms[i];

      if (ref.state.errors === errors) {
        index = i;
        break;
      }
    }

    let currentData = this.data.slice();
    let currentErrors = this.errors.slice();
    currentData.splice(index, 0, null);
    currentErrors.splice(index, 0, errors);
    this.data = currentData;
    this.errors = currentErrors;
    this.processErrors();
  }

  processData() {
    let currentData = this.data;
    let numberOfForms = this.formRefs.length;
    if (currentData.length < numberOfForms) return;
    let consolidatedData = this.transformOutputData(currentData);
    let currentChildrenComponents = this.state.currentChildrenComponents;
    let attrName = this.props.currentChildrenComponentIdentifier;
    Object.keys(currentChildrenComponents).forEach(function (key) {
      let attr = attrName + key;
      consolidatedData[attr] = currentChildrenComponents[key];
    });
    let linkedFields = Object.assign({}, this.state.linkedFields);
    this.props.onConfirm(this.props.id, consolidatedData, linkedFields);
  }

  processErrors() {
    let currentErrors = this.errors;
    let numberOfForms = this.formRefs.length;
    if (currentErrors.length < numberOfForms) return;

    for (let i = 0; i < currentErrors.length; i++) {
      if (currentErrors[i] !== null) {
        this.setState({
          activeKey: "".concat(i)
        });
        return;
      }
    }
  }

  onEditComponents() {
    this.setState({
      showForm: false
    });
  }

  onEditComponentsConfirm() {
    this.initializeForms();
    this.setState({
      showForm: true
    });
  }

  onEditComponentsCancel() {
    this.setState({
      showForm: true
    });
  }

  onConfirm() {
    let localForms = this.formRefs;
    this.data = [];
    this.errors = [];

    for (let i = 0; i < localForms.length; i++) {
      let ref = localForms[i];
      ref.submit();
    }
  }

  onCancel() {
    this.props.onCancel();
  }

  transformOutputData(data) {
    let consolidatedData = {};
    data.map(function (item) {
      let container = item.schema.container;
      let subType = item.schema.subType;
      let counter = item.schema.counter;
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

  static findInputPropKeyValue(groupKey, index, propKey, inputData) {
    let value = null;

    for (let key in inputData) {
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

  static transformInputData(inputData, partialSchema) {
    let partialInputData = [];
    Object.keys(partialSchema).forEach(function (key) {
      if (partialInputData[key] === undefined) partialInputData[key] = {};
      Object.keys(partialSchema[key].properties).forEach(function (propKey) {
        if (inputData[propKey] !== undefined) partialInputData[key][propKey] = inputData[propKey];else {
          let stringIndex = key.lastIndexOf("_");
          let index = -1;
          if (stringIndex != -1) index = key.substr(stringIndex + 1, 1);
          let stringKey = key.replace("_", "");
          stringKey = stringKey.replace(index, "");
          let val = MultiTabFormWithHeader.findInputPropKeyValue(stringKey, index, propKey, inputData);

          if (val !== null) {
            partialInputData[key][propKey] = val;
          }
        }
      });
    });
    return partialInputData;
  }

  static transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, counter, subType, linkedFields) {
    let partialSchema = {};
    Object.keys(schema.properties).forEach(function (key) {
      let property = schema.properties[key];

      if (property.type === _constants.string_object) {
        let count = 0;

        for (let inputKey in currentChildrenComponents) {
          if (key.includes(inputKey)) {
            count = currentChildrenComponents[inputKey];
            break;
          }
        }

        for (let i = 0; i < count; i++) {
          let localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, _constants.string_object, linkedFields);
          partialSchema = Object.assign(partialSchema, localPartialSchema);
        }

        return;
      } else if (property.type === _constants.string_array) {
        let count = 0;

        for (let inputKey in currentChildrenComponents) {
          if (key.includes(inputKey)) {
            count = currentChildrenComponents[inputKey];
            break;
          }
        }

        for (let i = 0; i < count; i++) {
          let localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, i, _constants.string_array, linkedFields);
          partialSchema = Object.assign(partialSchema, localPartialSchema);
        }

        return;
      }

      let category = property.category;
      let newCategory = category;
      if (counter !== -1) newCategory += "_" + counter;
      let keysForCategory = partialSchema[newCategory];

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

      let newProperty = Object.assign({}, property);

      if (property.linkTo !== undefined) {
        newProperty[_constants.string_default] = _constants.string_na;
        newProperty[_constants.string_enum] = [_constants.string_na];
        newProperty[_constants.string_enumNames] = [_constants.string_not_assigned];

        if (elementByType[property.linkTo] !== undefined) {
          let propElementByType = elementByType[property.linkTo];

          if (linkedFields[key] === undefined) {
            linkedFields[key] = {
              schemaType: property.linkTo,
              value: _constants.string_not_assigned
            };
          }

          Object.keys(propElementByType).forEach(function (propElementByTypeName) {
            let propElementByTypeID = propElementByType[propElementByTypeName];

            newProperty[_constants.string_enum].push(property.linkTo + "/" + propElementByTypeID);

            newProperty[_constants.string_enumNames].push(propElementByTypeName);
          });
        }
      }

      keysForCategory.properties[key] = newProperty;
      partialSchema[newCategory] = keysForCategory;
    });
    Object.keys(partialSchema).forEach(function (key) {
      let required = [];

      if (schema.required !== undefined) {
        Object.keys(partialSchema[key].properties).forEach(function (propKey) {
          if (schema.required.indexOf(propKey) != -1) required.push(propKey);
        });
      }

      if (required.length !== 0) partialSchema[key].required = required;
    });
    return partialSchema;
  }

  static transformSchema(currentChildrenComponents, schema, elementByType, linkedFields) {
    let partialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, _constants.string_default, linkedFields);
    return partialSchema;
  }

  createUISchema(partialSchema) {
    let partialUISchema = [];
    Object.keys(partialSchema).forEach((key, index1) => {
      if (partialUISchema[key] === undefined) partialUISchema[key] = {};
      Object.keys(partialSchema[key].properties).forEach((propKey, index2) => {
        let uiProperties = {};

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

  createForm(schema, uiSchema, input, index, currentFormRefs, currentButtonsRefs) {
    return /*#__PURE__*/_react.default.createElement(_reactJsonschemaForm.default, {
      schema: schema,
      uiSchema: uiSchema,
      onSubmit: this.onSubmit,
      onError: this.onError,
      formData: input,
      showErrorList: false,
      ref: form => {
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
      ref: btn => {
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

  createForms(subCategoriesOrder, partialSchema, partialInputData) {
    let currentButtonsRefs = [];
    let currentFormNames = [];
    let currentFormRefs = [];
    let partialUISchema = this.createUISchema(partialSchema);
    let currentForms = [];
    Object.keys(subCategoriesOrder).forEach((key, index) => {
      let description = subCategoriesOrder[key];
      if (partialSchema[key] === undefined) return;
      partialSchema[key] = Object.assign(partialSchema[key], {
        description
      });
      currentFormNames.splice(index, 0, key);
      let form = this.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], index, currentFormRefs, currentButtonsRefs);
      currentForms.push(form); //}
    });
    let schemaKeys = Object.keys(partialSchema);

    for (let i = 0; i < schemaKeys.length; i++) {
      let key = schemaKeys[i];
      if (Object.keys(subCategoriesOrder).includes(key)) continue;
      let description = null;
      Object.keys(subCategoriesOrder).forEach((subKey, index) => {
        if (key.startsWith(subKey)) {
          description = subCategoriesOrder[subKey];
        }
      });
      if (description === null) description = "";
      partialSchema[key] = Object.assign(partialSchema[key], {
        description
      });
      currentFormNames.push(key);
      let form = this.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], -1, currentFormRefs, currentButtonsRefs);
      currentForms.push(form);
    }

    this.buttonsRefs = currentButtonsRefs;
    this.formNames = currentFormNames;
    this.formRefs = currentFormRefs;
    return currentForms;
  }

  onTabChange(key) {
    this.setState({
      activeKey: key
    });
  }

  onClickAddChildComponent(key) {
    let currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
    currentChildrenComponents[key] = currentChildrenComponents[key] + 1;
    this.setState({
      currentChildrenComponents: currentChildrenComponents
    });
  }

  onClickRemoveChildComponent(key) {
    let currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
    currentChildrenComponents[key] = currentChildrenComponents[key] - 1;
    this.setState({
      currentChildrenComponents: currentChildrenComponents
    });
  }

  createChildrenComponentsButton() {
    let currentChildrenComponents = this.state.currentChildrenComponents;
    let minChildrenComponents = this.state.minChildrenComponents;
    let maxChildrenComponents = this.state.maxChildrenComponents;
    const buttonNoMargin = {
      width: "250px",
      marginBottom: "5px"
    };
    const sideButtonLeftMargin = {
      width: "50px",
      marginLeft: "5px",
      marginBottom: "5px"
    };
    const sideButtonRightMargin = {
      width: "50px",
      marginRight: "5px",
      marginBottom: "5px"
    };
    let buttons = [];
    Object.keys(currentChildrenComponents).forEach(key => {
      let currentChildren = currentChildrenComponents[key];
      let minChildren = minChildrenComponents[key];
      let maxChildren = maxChildrenComponents[key];
      let isMinDisabled = minChildren === currentChildren;
      let isMaxDisabled = maxChildren === currentChildren;
      buttons.push( /*#__PURE__*/_react.default.createElement("div", {
        key: key
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: sideButtonLeftMargin,
        variant: isMinDisabled ? "secondary" : "danger",
        onClick: isMinDisabled ? null : () => this.onClickRemoveChildComponent(key),
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
        onClick: isMaxDisabled ? null : () => this.onClickAddChildComponent(key),
        disabled: isMaxDisabled,
        value: key
      }, "+")));
    });
    return buttons;
  }

  render() {
    const button = {
      width: "250px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    const buttonContainerColumnExternal = {
      display: "flex",
      flexDirection: "column",
      flexWap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%"
    };
    const buttonContainerColumn = {
      display: "flex",
      flexDirection: "column",
      flexWap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    };
    const buttonContainerRow = {
      display: "flex",
      flexDirection: "row",
      flexWap: "wrap",
      justifyContent: "center"
    };
    let currentChildrenComponents = this.state.currentChildrenComponents;
    let minChildrenComponents = this.state.minChildrenComponents;
    let maxChildrenComponents = this.state.maxChildrenComponents;
    let showForm = this.state.showForm;
    let childrenButtons = this.createChildrenComponentsButton();

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

    let names = this.formNames;
    let forms = this.forms;
    let tabs = forms.map(function (item, index) {
      return /*#__PURE__*/_react.default.createElement(_rcTabs.TabPane, {
        tab: names[index],
        key: index,
        forceRender: true
      }, item);
    });
    let hasEditableChildren = false;

    if (Object.keys(currentChildrenComponents).length > 0) {
      for (let key in currentChildrenComponents) {
        let current = currentChildrenComponents[key];
        let min = minChildrenComponents[key];
        let max = maxChildrenComponents[key];

        if (current !== min || current !== max) {
          hasEditableChildren = true;
          break;
        }
      }
    } //<div>{this.props.schema.description}</div>


    return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
      overlaysContainer: this.props.overlaysContainer
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema.title), /*#__PURE__*/_react.default.createElement("p", null, hasEditableChildren ? _constants.string_bandpass_warning : ""), /*#__PURE__*/_react.default.createElement(_rcTabs.default, {
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
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      style: button,
      size: "lg",
      variant: !hasEditableChildren ? "secondary" : "primary",
      onClick: !hasEditableChildren ? null : this.onEditComponents,
      disabled: !hasEditableChildren
    }, "Add/Remove band-pass"), /*#__PURE__*/_react.default.createElement(_Button.default, {
      style: button,
      size: "lg",
      onClick: this.onConfirm
    }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
      style: button,
      size: "lg",
      onClick: this.onCancel
    }, "Cancel"))));
  }

}

exports.default = MultiTabFormWithHeader;