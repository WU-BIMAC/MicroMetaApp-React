"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _bootstrap = _interopRequireDefault(require("@rjsf/bootstrap-4"));
var _reactTabs = require("react-tabs");
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _modalWindow = _interopRequireDefault(require("./modalWindow"));
var _genericUtilities = require("../genericUtilities");
var _uuid = require("uuid");
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } //import Tabs, { TabPane } from "rc-tabs";
// import TabContent from "rc-tabs/lib/TabContent";
// import ScrollableTabBar from "rc-tabs/lib/";
//import "rc-tabs/assets/index.css"
const url = require("url");
class MultiTabFormWithHeaderV3 extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      linkedFields: {},
      currentChildrenComponents: {},
      minChildrenComponents: {},
      maxChildrenComponents: {},
      activeID: null,
      activeKey: 0,
      //"0",
      partialInputData: {},
      isValidated: false
    };
    if (props.inputData !== null && props.currentChildrenComponentIdentifier !== null && props.minChildrenComponentIdentifier !== null && props.maxChildrenComponentIdentifier !== null) {
      if (Array.isArray(props.inputData)) {
        for (let y = 0; y < props.inputData.length; y++) {
          let inputData = props.inputData[y];
          let id = inputData.ID;
          if (this.state.minChildrenComponents[id] === undefined || this.state.minChildrenComponents[id] === null) {
            this.state.minChildrenComponents[id] = {};
          }
          if (this.state.maxChildrenComponents[id] === undefined || this.state.maxChildrenComponents[id] === null) {
            this.state.maxChildrenComponents[id] = {};
          }
          if (this.state.currentChildrenComponents[id] === undefined || this.state.currentChildrenComponents[id] === null) {
            this.state.currentChildrenComponents[id] = {};
          }
          if (this.state.activeID === null) this.state.activeID = id;
          Object.keys(inputData).forEach(key => {
            if (key.includes(props.minChildrenComponentIdentifier)) {
              let name = key.replace(props.minChildrenComponentIdentifier, "");
              this.state.minChildrenComponents[id][name] = inputData[key];
            } else if (key.includes(props.maxChildrenComponentIdentifier)) {
              let name = key.replace(props.maxChildrenComponentIdentifier, "");
              this.state.maxChildrenComponents[id][name] = inputData[key];
            } else if (key.includes(props.currentChildrenComponentIdentifier)) {
              let name = key.replace(props.currentChildrenComponentIdentifier, "");
              this.state.currentChildrenComponents[id][name] = inputData[key];
            }
          });
        }
      } else {
        let inputData = props.inputData;
        let id = inputData.ID;
        if (this.state.activeID === null) this.state.activeID = id;
        if (this.state.minChildrenComponents[id] === undefined || this.state.minChildrenComponents[id] === null) {
          this.state.minChildrenComponents[id] = {};
        }
        if (this.state.maxChildrenComponents[id] === undefined || this.state.maxChildrenComponents[id] === null) {
          this.state.maxChildrenComponents[id] = {};
        }
        if (this.state.currentChildrenComponents[id] === undefined || this.state.currentChildrenComponents[id] === null) {
          this.state.currentChildrenComponents[id] = {};
        }
        Object.keys(inputData).forEach(key => {
          if (key.includes(props.minChildrenComponentIdentifier)) {
            let name = key.replace(props.minChildrenComponentIdentifier, "");
            this.state.minChildrenComponents[id][name] = inputData[key];
          } else if (key.includes(props.maxChildrenComponentIdentifier)) {
            let name = key.replace(props.maxChildrenComponentIdentifier, "");
            this.state.maxChildrenComponents[id][name] = inputData[key];
          } else if (key.includes(props.currentChildrenComponentIdentifier)) {
            let name = key.replace(props.currentChildrenComponentIdentifier, "");
            this.state.currentChildrenComponents[id][name] = inputData[key];
          }
        });
      }
    }
    this.buttonsRefs = {};
    this.containerFormNames = {};
    this.formNames = {};
    this.forms = {};
    this.formRefs = {};
    this.data = {};
    this.errors = {};
    this.action = null;
    this.handleAction = this.handleAction.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSaveSpecific = this.onSaveSpecific.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onValidate = this.onValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onContainerTabChange = this.onContainerTabChange.bind(this);
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
    if (props.schema !== null && props.schema !== undefined && props.selectedLoadComponent !== null && props.selectedLoadComponent !== undefined && Object.keys(this.state.partialInputData).length === 0) {
      this.initializeFormsFromLoadedComponent();
    } else if (props.schema !== null && props.schema !== undefined && Object.keys(this.state.partialInputData).length === 0) {
      this.initializeForms();
    }
  }
  initializeFormsFromLoadedComponent() {
    let linkedFields = this.state.linkedFields;
    let currentChildrenComponents = this.state.currentChildrenComponents;
    let newActiveID = this.state.activeID;
    let partialInputData = {};
    let inputDataIDs = [];
    const mergedData = _objectSpread(_objectSpread({}, this.props.inputData), this.props.selectedLoadComponent);
    if (mergedData !== undefined && mergedData !== null) {
      if (Array.isArray(mergedData)) {
        for (let i = 0; i < this.props.schema.length; i++) {
          let schema = this.props.schema[i];
          for (let y = 0; y < mergedData.length; y++) {
            let inputData = mergedData[y];
            inputData.ID = id;
            inputData.ID = id;
            inputDataIDs.push(id);
            if (newActiveID === null) newActiveID = id;
            if (inputData.Schema_ID === schema.ID) {
              let partialSchema = MultiTabFormWithHeaderV3.transformSchema(currentChildrenComponents[id], schema, this.props.elementByType, linkedFields, inputDataIDs);
              let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(inputData, partialSchema);
              partialInputData[id] = {
                schemaTitle: schema.title,
                data: localPartialInputData,
                schema: partialSchema,
                subCategoriesOrder: schema.subCategoriesOrder
              };
              this.containerFormNames[id] = schema.title;
            }
          }
        }
      } else {
        //create case if 1 input but multiple schemas ?
        let schema = this.props.schema;
        let inputData = mergedData;
        let id = inputData.ID;
        inputDataIDs.push(id);
        let partialSchema = MultiTabFormWithHeaderV3.transformSchema(currentChildrenComponents[id], schema, this.props.elementByType, linkedFields, inputDataIDs);
        let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(inputData, partialSchema);
        partialInputData[id] = {
          schemaTitle: schema.title,
          data: localPartialInputData,
          schema: partialSchema,
          subCategoriesOrder: schema.subCategoriesOrder
        };
        this.containerFormNames[id] = schema.title;
      }
    }
    for (let id in partialInputData) {
      let localPartialInputData = partialInputData[id].data;
      let partialSchema = partialInputData[id].schema;
      let subCategoriesOrder = partialInputData[id].subCategoriesOrder;
      let partialForms = this.createForms(id, subCategoriesOrder, partialSchema, localPartialInputData);
      this.forms[id] = partialForms;
    }
    if (Object.keys(this.state.partialInputData).length === 0) {
      this.state.partialInputData = partialInputData;
      this.state.activeID = newActiveID;
      //this.forceUpdate();
    } else {
      this.forceUpdate();
    }
  }
  initializeForms() {
    let linkedFields = this.state.linkedFields;
    let currentChildrenComponents = this.state.currentChildrenComponents;
    let newActiveID = this.state.activeID;
    let partialInputData = {};
    let inputDataIDs = [];
    if (this.props.inputData !== undefined && this.props.inputData !== null) {
      if (Array.isArray(this.props.inputData)) {
        for (let i = 0; i < this.props.schema.length; i++) {
          let schema = this.props.schema[i];
          for (let y = 0; y < this.props.inputData.length; y++) {
            let inputData = this.props.inputData[y];
            let id = inputData.ID;
            inputDataIDs.push(id);
            if (newActiveID === null) newActiveID = id;
            if (inputData.Schema_ID === schema.ID) {
              let partialSchema = MultiTabFormWithHeaderV3.transformSchema(currentChildrenComponents[id], schema, this.props.elementByType, linkedFields, inputDataIDs);
              let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(inputData, partialSchema);
              partialInputData[id] = {
                schemaTitle: schema.title,
                data: localPartialInputData,
                schema: partialSchema,
                subCategoriesOrder: schema.subCategoriesOrder
              };
              this.containerFormNames[id] = schema.title;
            }
          }
        }
      } else {
        //create case if 1 input but multiple schemas ?
        let schema = this.props.schema;
        let inputData = this.props.inputData;
        let id = inputData.ID;
        inputDataIDs.push(id);
        let partialSchema = MultiTabFormWithHeaderV3.transformSchema(currentChildrenComponents[id], schema, this.props.elementByType, linkedFields, inputDataIDs);
        let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(inputData, partialSchema);
        partialInputData[id] = {
          schemaTitle: schema.title,
          data: localPartialInputData,
          schema: partialSchema,
          subCategoriesOrder: schema.subCategoriesOrder
        };
        this.containerFormNames[id] = schema.title;
      }
    }
    for (let id in partialInputData) {
      let localPartialInputData = partialInputData[id].data;
      let partialSchema = partialInputData[id].schema;
      let subCategoriesOrder = partialInputData[id].subCategoriesOrder;
      let partialForms = this.createForms(id, subCategoriesOrder, partialSchema, localPartialInputData);
      this.forms[id] = partialForms;
    }
    if (Object.keys(this.state.partialInputData).length === 0) {
      this.state.partialInputData = partialInputData;
      this.state.activeID = newActiveID;
      //this.forceUpdate();
    } else {
      this.forceUpdate();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.inputData === null || prevProps.inputData === undefined || this.props.inputData !== prevProps.inputData) {
      let activeID = null;
      if (Array.isArray(this.props.inputData)) {
        let inputData = this.props.inputData[0];
        activeID = inputData.ID;
      } else {
        let inputData = this.props.inputData;
        activeID = inputData.ID;
      }
      this.state.activeID = activeID;
      this.state.activeKey = 0; //"0";
      this.buttonsRefs = {};
      this.containerFormNames = {};
      this.formNames = {};
      this.forms = {};
      this.formRefs = {};
      this.data = {};
      this.errors = {};
      this.action = {};
      this.state.currentChildrenComponents = {};
      this.state.minChildrenComponents = {};
      this.state.maxChildrenComponents = {};
      if (Array.isArray(this.props.inputData)) {
        if (this.props.currentChildrenComponentIdentifier !== null && this.props.minChildrenComponentIdentifier !== null && this.props.maxChildrenComponentIdentifier !== null) {
          for (let y = 0; y < this.props.inputData.length; y++) {
            let inputData = this.props.inputData[y];
            let id = inputData.ID;
            if (this.state.minChildrenComponents[id] === undefined || this.state.minChildrenComponents[id] === null) {
              this.state.minChildrenComponents[id] = {};
            }
            if (this.state.maxChildrenComponents[id] === undefined || this.state.maxChildrenComponents[id] === null) {
              this.state.maxChildrenComponents[id] = {};
            }
            if (this.state.currentChildrenComponents[id] === undefined || this.state.currentChildrenComponents[id] === null) {
              this.state.currentChildrenComponents[id] = {};
            }
            Object.keys(inputData).forEach(key => {
              if (key.includes(this.props.minChildrenComponentIdentifier)) {
                let name = key.replace(this.props.minChildrenComponentIdentifier, "");
                this.state.minChildrenComponents[id][name] = inputData[key];
              } else if (key.includes(this.props.maxChildrenComponentIdentifier)) {
                let name = key.replace(this.props.maxChildrenComponentIdentifier, "");
                this.state.maxChildrenComponents[id][name] = inputData[key];
              } else if (key.includes(this.props.currentChildrenComponentIdentifier)) {
                let name = key.replace(this.props.currentChildrenComponentIdentifier, "");
                this.state.currentChildrenComponents[id][name] = inputData[key];
              }
            });
          }
        }
      } else {
        if (this.props.currentChildrenComponentIdentifier !== null && this.props.minChildrenComponentIdentifier !== null && this.props.maxChildrenComponentIdentifier !== null) {
          let inputData = this.props.inputData;
          let id = inputData.ID;
          if (this.state.minChildrenComponents[id] === undefined || this.state.minChildrenComponents[id] === null) {
            this.state.minChildrenComponents[id] = {};
          }
          if (this.state.maxChildrenComponents[id] === undefined || this.state.maxChildrenComponents[id] === null) {
            this.state.maxChildrenComponents[id] = {};
          }
          if (this.state.currentChildrenComponents[id] === undefined || this.state.currentChildrenComponents[id] === null) {
            this.state.currentChildrenComponents[id] = {};
          }
          Object.keys(inputData).forEach(key => {
            if (key.includes(this.props.minChildrenComponentIdentifier)) {
              let name = key.replace(this.props.minChildrenComponentIdentifier, "");
              this.state.minChildrenComponents[id][name] = inputData[key];
            } else if (key.includes(this.props.maxChildrenComponentIdentifier)) {
              let name = key.replace(this.props.maxChildrenComponentIdentifier, "");
              this.state.maxChildrenComponents[id][name] = inputData[key];
            } else if (key.includes(this.props.currentChildrenComponentIdentifier)) {
              let name = key.replace(this.props.currentChildrenComponentIdentifier, "");
              this.state.currentChildrenComponents[id][name] = inputData[key];
            }
          });
        }
      }
      this.initializeForms();
    }
  }
  handleChange() {
    this.setState({
      isValidated: false
    });
  }
  onSubmit(data) {
    if (!this.action) {
      console.error("No action set before onSubmit call.");
      return;
    }
    let action = this.action;
    let localForms = this.formRefs;
    let index = -1;
    let id = -1;
    for (let currentID in localForms) {
      let forms = localForms[currentID];
      for (let i = 0; i < forms.length; i++) {
        let ref = forms[i];
        if (ref.state.formData === data.formData) {
          index = i;
          id = currentID;
          break;
        }
      }
    }
    let linkedFields = this.state.linkedFields;
    for (let key in data.formData) {
      if (linkedFields[key] !== undefined) {
        let values = data.formData[key];
        let linkedFieldsValues = [];
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            let value = values[i];
            let index = value.indexOf("/");
            let newValue = value.substring(index + 1);
            linkedFieldsValues[i] = newValue;
          }
        } else {
          let value = values;
          let index = value.indexOf("/");
          let newValue = value.substring(index + 1);
          linkedFieldsValues = newValue;
        }
        linkedFields[key].value = linkedFieldsValues;
      }
    }
    this.setState({
      linkedFields: linkedFields
    });
    let currentData = [];
    let currentErrors = [];
    if (this.data[id] !== null && this.data[id] !== undefined) currentData = this.data[id].slice();
    if (this.errors[id] !== null && this.errors[id] !== undefined) currentErrors = this.errors[id].slice();
    currentData.splice(index, 0, data);
    currentErrors.splice(index, 0, null);
    this.data[id] = currentData;
    this.errors[id] = currentErrors;
    this.processData(action);
  }
  onError(errors) {
    let localForms = this.formRefs; //localForms is a reference to all the forms we are currently using
    let index = -1;
    let id = -1;
    if (this.props.isDebug) console.log("multi tab form onError - find form");
    for (let currentID in localForms) {
      let forms = localForms[currentID];
      for (let i = 0; i < forms.length; i++) {
        let ref = forms[i];
        if (ref.state.errors === errors) {
          if (this.action === "confirm") {
            this.action = this.action + "OnError";
            this.onSubmit(ref.state);
          } else if (this.action === "confirmOnError") {
            this.onSubmit(ref.state);
          } else {
            index = i;
            id = currentID;
            break;
          }
        }
      }
    }
    if (this.props.isDebug) console.log("multi tab form onError - process error");
    let currentData = [];
    let currentErrors = [];
    if (this.data[id] !== null && this.data[id] !== undefined) currentData = this.data[id].slice();
    if (this.errors[id] !== null && this.errors[id] !== undefined) {
      currentErrors = this.errors[id].slice();
    }
    currentData.splice(index, 0, null);
    currentErrors.splice(index, 0, errors);
    this.data[id] = currentData;
    this.errors[id] = currentErrors;
    if (this.action === "confirm") {
      this.processData(this.action);
    } else if (this.action === "confirmOnError") {
      this.processData(this.action);
    } else {
      this.processErrors();
    }
  }
  processData(action) {
    let partialInputData = this.state.partialInputData;
    let localData = this.data;
    let localForms = this.formRefs;
    let partialConsolidatedData = {};
    for (let currentID in localForms) {
      let forms = localForms[currentID];
      let currentData = localData[currentID];
      let numberOfForms = forms.length;
      if (!(0, _genericUtilities.isDefined)(currentData) || currentData.length < numberOfForms || currentData.includes(null)) {
        return;
      }
      let localConsolidatedData = this.transformOutputData(currentData);
      let currentChildrenComponents = this.state.currentChildrenComponents[currentID];
      if (currentChildrenComponents !== null && currentChildrenComponents !== undefined) {
        let attrName = this.props.currentChildrenComponentIdentifier;
        Object.keys(currentChildrenComponents).forEach(function (key) {
          let attr = attrName + key;
          localConsolidatedData[attr] = currentChildrenComponents[key];
        });
      }
      partialConsolidatedData[currentID] = localConsolidatedData;
    }
    if (this.props.notModal) {
      this.props.onConfirm(this.props.id);
      return;
    }
    let mainID = null;
    if (Array.isArray(this.props.inputData)) {
      mainID = this.props.inputData[0].ID;
    } else {
      mainID = this.props.inputData.ID;
    }
    let consolidatedData = partialConsolidatedData[mainID];
    let subComponents = {};
    for (let id in partialConsolidatedData) {
      if (id === mainID) continue;
      let localConsolidatedData = partialConsolidatedData[id];
      let localPartialInputData = partialInputData[id];
      let schemaTitle = localPartialInputData.schemaTitle;
      let schema = localPartialInputData.schema;
      let localSubComponents = [];
      if (subComponents[schemaTitle] !== null && subComponents[schemaTitle] !== undefined) {
        localSubComponents = subComponents[schemaTitle];
      }
      localSubComponents.push(localConsolidatedData);
      subComponents[schemaTitle] = localSubComponents;
    }
    for (let schemaTitle in subComponents) {
      let localSubComponents = subComponents[schemaTitle];
      if (localSubComponents.length > 1) {
        consolidatedData[schemaTitle] = localSubComponents;
      } else {
        consolidatedData[schemaTitle] = localSubComponents[0];
      }
    }
    let linkedFields = Object.assign({}, this.state.linkedFields);
    if (action === "confirm") {
      this.props.onConfirm(this.props.id, consolidatedData, linkedFields, false);
    } else if (action === "confirmOnError") {
      this.props.onConfirm(this.props.id, consolidatedData, linkedFields, true);
    } else if (action === "save") {
      this.props.onSave(this.props.id, consolidatedData, linkedFields, true);
      this.props.onConfirm(this.props.id, consolidatedData, linkedFields, false);
    } else if (action === "saveSpecific") {
      this.props.onSave(this.props.id, consolidatedData, linkedFields, false);
      this.props.onConfirm(this.props.id, consolidatedData, linkedFields, false);
    } else {
      this.setState({
        isValidated: true
      }, () => {
        if (this.state.isValidated) {
          window.alert(_constants.save_success_window_message);
        }
      });
    }
  }
  processErrors() {
    let localForms = this.formRefs;
    if (this.props.notModal) return;
    if (this.props.isDebug) console.log("multi tab form processErrors - error process");
    for (let currentID in localForms) {
      let forms = localForms[currentID];
      let currentErrors = this.errors[currentID];
      let numberOfForms = forms.length;
      if (!(0, _genericUtilities.isDefined)(currentErrors)
      //  ||currentErrors.length < numberOfForms
      ) {
        if (this.props.isDebug) console.log("multi tab form processErrors - data not found");
        return;
      }
      //this for loop activates the tab where the first error is found
      for (let i = 0; i < currentErrors.length; i++) {
        if (currentErrors[i] !== null) {
          this.setState({
            activeID: currentID,
            activeKey: i
          }); //`${i}` });
          if (this.props.isDebug) console.log("multi tab form processErrors - set error view");
          return;
        }
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
    this.initializeForms();
    this.setState({
      showForm: true
    });
  }
  handleAction(action) {
    if ((action === "save" || action === "saveSpecific") && !this.state.isValidated) {
      window.alert(_constants.save_non_validation_warning_message);
      return;
    }
    this.data = {};
    this.errors = {};
    this.action = action;
    Object.entries(this.formRefs).forEach(_ref => {
      let [id, forms] = _ref;
      const buttons = this.buttonsRefs[id];
      forms.forEach((refForm, i) => {
        refForm.formElement.dispatchEvent(new CustomEvent("submit", {
          bubbles: true,
          cancelable: true
        }));
      });
    });
  }
  onConfirm() {
    this.handleAction("confirm");
  }
  onValidate() {
    this.handleAction("validate");
  }
  onSave() {
    this.handleAction("save");
  }
  onSaveSpecific() {
    this.handleAction("saveSpecific");
  }
  onLoad() {
    this.props.onLoad();
  }
  onCancel() {
    this.props.onCancel();
  }
  transformOutputData(data) {
    let consolidatedData = {};
    data.map(function (item) {
      if (item === null || item === undefined) return;
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
          value = MultiTabFormWithHeaderV3.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
          if (value !== undefined) return value;
        }
      } else if (inputData[key] instanceof Object) {
        if (index === -1) {
          if (inputData[key][propKey] !== undefined) {
            value = inputData[key][propKey];
          } else {
            value = MultiTabFormWithHeaderV3.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
          }
        } else if (key !== index) {
          continue;
        } else if (inputData[key][propKey] !== undefined) {
          return inputData[key][propKey];
        } else {
          value = MultiTabFormWithHeaderV3.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
        }
        if (value !== undefined) return value;
      }
    }
    return null;
  }
  static transformInputData(inputData, partialSchema) {
    let partialInputData = [];
    if (inputData === null || inputData === undefined) return partialInputData;
    Object.keys(partialSchema).forEach(function (key) {
      if (partialInputData[key] === undefined) partialInputData[key] = {};
      Object.keys(partialSchema[key].properties).forEach(function (propKey) {
        if (inputData[propKey] !== undefined) {
          partialInputData[key][propKey] = inputData[propKey];
          //console.log("partialSchema[key].properties[propKey]");
          //console.log(partialSchema[key].properties[propKey]);
          // if (partialSchema[key].properties[propKey].type === "array") {
          // 	//console.log("delete default array");
          // 	delete partialSchema[key].properties[propKey].items[string_default];
          // } else {
          // 	//console.log("delete default");
          // 	delete partialSchema[key].properties[propKey][string_default];
          // }
        } else {
          let stringIndex = key.lastIndexOf("_");
          let index = -1;
          if (stringIndex != -1) index = key.substr(stringIndex + 1, 1);
          let stringKey = key.replace("_", "");
          stringKey = stringKey.replace(index, "");
          let val = MultiTabFormWithHeaderV3.findInputPropKeyValue(stringKey, index, propKey, inputData);
          // console.log("2- key : " + key + " - propKey : " + propKey);
          // console.log(val);
          if (val !== null) {
            partialInputData[key][propKey] = val;
            //console.log("partialSchema[key].properties[propKey]");
            //console.log(partialSchema[key].properties[propKey]);
            // if (partialSchema[key].properties[propKey].type === "array") {
            // 	delete partialSchema[key].properties[propKey].items[
            // 		string_default
            // 	];
            // } else {
            // 	delete partialSchema[key].properties[propKey][string_default];
            // }
          }
        }
      });
    });
    return partialInputData;
  }
  static transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, counter, subType, linkedFields, inputDataIDs) {
    let partialSchema = {};
    if (schema === null) return partialSchema;
    Object.keys(schema.properties).forEach(function (key) {
      let property = schema.properties[key];
      if (currentChildrenComponents !== undefined && currentChildrenComponents !== null && Object.keys(currentChildrenComponents).includes(key)) {
        if (property.type === _constants.string_object) {
          let count = 0;
          for (let inputKey in currentChildrenComponents) {
            if (key.includes(inputKey)) {
              count = currentChildrenComponents[inputKey];
              break;
            }
          }
          for (let i = 0; i < count; i++) {
            let localPartialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, _constants.string_object, linkedFields);
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
            let localPartialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, i, _constants.string_array, linkedFields);
            partialSchema = Object.assign(partialSchema, localPartialSchema);
          }
          return;
        }
      }
      let category = property.category;
      if (category === null || category === undefined) category = property.items.category;
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
        if (linkedFields[key] === undefined) {
          linkedFields[key] = {
            schemaType: schema.title,
            value: _constants.string_not_assigned
          };
        }
        if (elementByType[property.linkTo] !== undefined) {
          let propElementByType = elementByType[property.linkTo];
          Object.keys(propElementByType).forEach(function (propElementByTypeID) {
            let propElementByTypeName = propElementByType[propElementByTypeID];
            if (inputDataIDs.includes(propElementByTypeID)) return;
            newProperty[_constants.string_enum].push(property.linkTo + "/" + propElementByTypeID);
            newProperty[_constants.string_enumNames].push(propElementByTypeName);
          });
        }
      } else if (property.items !== undefined && property.items.linkTo !== undefined) {
        newProperty.items[_constants.string_default] = _constants.string_na;
        newProperty.items[_constants.string_enum] = [_constants.string_na];
        newProperty.items[_constants.string_enumNames] = [_constants.string_not_assigned];
        if (linkedFields[key] === undefined) {
          linkedFields[key] = {
            schemaType: schema.title,
            value: _constants.string_not_assigned
          };
        }
        if (elementByType[property.items.linkTo] !== undefined) {
          let propElementByType = elementByType[property.items.linkTo];
          Object.keys(propElementByType).forEach(function (propElementByTypeID) {
            let propElementByTypeName = propElementByType[propElementByTypeID];
            if (inputDataIDs.includes(propElementByTypeID)) return;
            newProperty.items[_constants.string_enum].push(property.items.linkTo + "/" + propElementByTypeID);
            newProperty.items[_constants.string_enumNames].push(propElementByTypeName);
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
  static transformSchema(currentChildrenComponents, schema, elementByType, linkedFields, inputDataIDs) {
    let partialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, _constants.string_default, linkedFields, inputDataIDs);
    //partialSchema = Object.assign(partialSchema, { type: "object" });
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
        if (partialSchema[key].properties[propKey].description === "NA") {
          partialUISchema[key][propKey] = Object.assign(uiProperties, {
            "ui:description": " "
          });
        }
        if (partialSchema[key].properties[propKey].type === "boolean") {
          partialUISchema[key][propKey] = Object.assign(uiProperties, {
            "ui:widget": "checkbox"
          });
        }
        if (partialSchema[key].properties[propKey].description === "NA") {
          partialUISchema[key][propKey] = Object.assign(uiProperties, {
            "ui:description": " "
          });
        }
        if (!this.props.editable) {
          partialUISchema[key][propKey] = Object.assign(uiProperties, {
            "ui:disabled": true
          });
        }
      });
    });
    return partialUISchema;
  }
  createForm(schema, uiSchema, input, index, currentFormRefs, currentButtonsRefs) {
    return /*#__PURE__*/_react.default.createElement(_bootstrap.default, {
      schema: schema,
      uiSchema: uiSchema,
      onSubmit: this.onSubmit,
      onError: this.onError,
      onChange: this.handleChange,
      formData: input,
      showErrorList: false,
      idPrefix: "rjsfPrefix",
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
      type: "submit",
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
  createForms(id, subCategoriesOrder, partialSchema, partialInputData) {
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
      currentForms.push(form);
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
    this.buttonsRefs[id] = currentButtonsRefs;
    this.formNames[id] = currentFormNames;
    this.formRefs[id] = currentFormRefs;
    return currentForms;
  }

  //onContainerTabChange(key) {
  onContainerTabChange(key, prevKey, evt) {
    let id = Object.keys(this.forms)[key];
    this.setState({
      activeID: id,
      activeKey: 0 //"0",
    });
  }

  //onTabChange(key) {
  onTabChange(key, prevKey, evt) {
    this.setState({
      activeKey: key
    });
  }
  onClickAddChildComponent(id, key) {
    let currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
    currentChildrenComponents[id][key] = currentChildrenComponents[id][key] + 1;
    this.setState({
      currentChildrenComponents: currentChildrenComponents
    });
  }
  onClickRemoveChildComponent(id, key) {
    let currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
    currentChildrenComponents[id][key] = currentChildrenComponents[id][key] - 1;
    this.setState({
      currentChildrenComponents: currentChildrenComponents
    });
  }

  // resolve(from, to) {
  // 	const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  // 	if (resolvedUrl.protocol === 'resolve:') {
  // 	  // `from` is a relative URL.
  // 	  const { pathname, search, hash } = resolvedUrl;
  // 	  return pathname + search + hash;
  // 	}
  // 	return resolvedUrl.toString();
  // }

  createChildrenComponentsButton(id) {
    let currentChildrenComponents = this.state.currentChildrenComponents[id];
    let minChildrenComponents = this.state.minChildrenComponents[id];
    let maxChildrenComponents = this.state.maxChildrenComponents[id];
    if (currentChildrenComponents === undefined || currentChildrenComponents === null) return null;
    const buttonNoMargin = {
      width: "510px",
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
      buttons.push(/*#__PURE__*/_react.default.createElement("div", {
        key: "buttons-" + key
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: sideButtonLeftMargin,
        variant: isMinDisabled ? "secondary" : "danger",
        onClick: isMinDisabled ? null : () => this.onClickRemoveChildComponent(id, key),
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
        onClick: isMaxDisabled ? null : () => this.onClickAddChildComponent(id, key),
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
    const ComponentLibraryButton = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      //width: "150px",
      marginRight: "5px",
      width: "100%",
      height: "36px",
      fontSize: "16px",
      fontWeight: 500,
      backgroundColor: "#F6F6F6",
      color: "#212121",
      borderColor: "#bab8b8"
    };
    const CreateNewButton = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      //width: "150px",
      marginRight: "5px",
      width: "100%",
      height: "36px",
      fontSize: "16px",
      fontWeight: 500,
      backgroundColor: "#4099AB",
      color: "#FFFFFF",
      borderColor: "#5d8f99"
    };
    const ValidateButton = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "44px",
      fontSize: "18px",
      fontWeight: 500,
      backgroundColor: "#F6F6F6",
      color: "#212121",
      borderColor: "#bab8b8",
      paddingRight: "25px",
      paddingLeft: "25px",
      borderRadius: "8px",
      gap: "8px"
    };
    const SaveChangesButton = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "44px",
      fontSize: "18px",
      fontWeight: 500,
      backgroundColor: "#4099AB",
      color: "#FFFFFF",
      borderColor: "#5d8f99",
      paddingRight: "25px",
      paddingLeft: "25px",
      borderRadius: "8px"
    };
    const CancelButton = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "44px",
      fontSize: "18px",
      fontWeight: 500,
      backgroundColor: "#FFFFFF",
      color: "#030303",
      borderColor: "#FFFFFF",
      paddingRight: "20px",
      paddingLeft: "20px"
    };
    const button2 = {
      width: "510px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    const containerStyle = {
      display: "flex",
      flexDirection: "column"
    };
    const headerContainerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      height: "40px",
      width: "100%"
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
      justifyContent: "center",
      marginBottom: "5px"
    };
    const buttonContainerRowModal = {
      display: "flex",
      flexDirection: "row",
      flexWap: "wrap",
      justifyContent: "space-between",
      marginBottom: "5px",
      width: "100%"
    };
    const topButtonContainer = {
      display: "flex",
      flexDirection: "row",
      //flexWrap: "wrap",
      justifyContent: "flex-end",
      marginBottom: "5px"
    };
    const styleValidation = {
      display: "inline-block",
      position: "relative",
      marginLeft: "10px",
      fontWeight: "bold",
      textAlign: "center"
    };
    let styleImageIcon = {
      width: "17px",
      height: "17px",
      marginRight: "10px"
    };
    let validated = null;
    if (this.state.isValidated) {
      const styleValidated = Object.assign({}, styleValidation, {
        color: "green"
      });
      validated = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated
      }, "\u25CF");
    } else {
      const styleValidated = Object.assign({}, styleValidation, {
        color: "red"
      });
      validated = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated
      }, "\u25CF");
    }
    let currentChildrenComponents = this.state.currentChildrenComponents;
    let minChildrenComponents = this.state.minChildrenComponents;
    let maxChildrenComponents = this.state.maxChildrenComponents;
    let showForm = this.state.showForm;
    let hasEditableChildren = [];
    let containerNames = this.containerFormNames;
    let names = this.formNames;
    let forms = this.forms;
    let saveImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_save_img);
    let saveImgPath = saveImgPath_tmp + (saveImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let globeImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_globe_solid_img);
    let globeImgPath = globeImgPath_tmp + (globeImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let plusImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_plus_solid_img);
    let plusImgPath = plusImgPath_tmp + (globeImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    for (let id in forms) {
      let localCurrentChildrenComponents = currentChildrenComponents[id];
      let localMinChildrenComponents = minChildrenComponents[id];
      let localMaxChildrenComponents = maxChildrenComponents[id];
      if (localCurrentChildrenComponents === null || localCurrentChildrenComponents === undefined) {
        hasEditableChildren[id] = false;
        break;
      }
      let localHasEditableChildren = false;
      if (Object.keys(localCurrentChildrenComponents).length > 0) {
        for (let key in localCurrentChildrenComponents) {
          let current = localCurrentChildrenComponents[key];
          let min = localMinChildrenComponents[key];
          let max = localMaxChildrenComponents[key];
          if (current !== min || current !== max) {
            localHasEditableChildren = true;
            break;
          }
        }
        hasEditableChildren[id] = localHasEditableChildren;
      }
    }
    let activeID = this.state.activeID;
    let childrenButtons = null;
    if (hasEditableChildren[activeID]) childrenButtons = this.createChildrenComponentsButton(activeID);
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
        key: "button-confirm",
        style: button,
        size: "lg",
        onClick: this.onEditComponentsConfirm
      }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "button-cancel",
        style: button,
        size: "lg",
        onClick: this.onEditComponentsCancel
      }, "Cancel"))));
    }
    let tabNames = {};
    let tabs = {};
    for (let id in forms) {
      let currentForms = forms[id];
      let currentNames = names[id];
      tabNames[id] = [];
      tabs[id] = [];
      for (let index in currentForms) {
        let item = currentForms[index];
        tabNames[id].push(/*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
          key: "ContainerTabName-" + currentNames[index]
        }, currentNames[index]));
        tabs[id].push(/*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, {
          key: "ContainerTab-" + currentNames[index],
          forceRender: true
        }, item));
      }
    }

    // let title = "Selected Hardware";
    // if (this.props.schema !== null) {
    // 	title = this.props.schema.title;
    // }

    let buttons = [];
    let topButtons = [];
    let validateTooltip = _constants.component_validate;
    if (!this.props.notModal) {
      buttons.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "popovertooltip-validate",
        position: validateTooltip.position,
        title: validateTooltip.title,
        content: validateTooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-validate",
          style: ValidateButton,
          size: "lg",
          onClick: this.onValidate
        }, "Validate")
      }));
    }
    if (!this.props.notModal || this.props.notModal && this.props.onConfirm !== null) {
      let text = "Save Changes";
      if (this.props.notModal && this.props.onConfirm !== null) text = "Add";
      buttons.push(/*#__PURE__*/_react.default.createElement("div", {
        key: "buttons-div",
        style: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "popovertooltip-cancel",
        position: _constants.component_cancel.position,
        title: _constants.component_cancel.title,
        content: _constants.component_cancel.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-cancel",
          style: CancelButton,
          size: "lg",
          onClick: this.onCancel
        }, "Cancel")
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "popovertooltip-confirm",
        position: _constants.component_save.position,
        title: _constants.component_save.title,
        content: _constants.component_save.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-confirm",
          style: SaveChangesButton,
          size: "lg",
          onClick: this.onConfirm
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: saveImgPath,
          alt: "Save Icon",
          style: styleImageIcon
        }), text))
      })));
    }
    if (!this.props.notModal && !this.props.hideComponentsLibrary) {
      let openTemplateTxt = "Component Library";
      topButtons.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "popovertooltip-template-open",
        position: _constants.component_template_open.position,
        title: _constants.component_template_open.title,
        content: _constants.component_template_open.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-template-open",
          style: ComponentLibraryButton,
          size: "lg",
          onClick: this.onLoad
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "2px",
            paddingRight: "2px"
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: globeImgPath,
          alt: "Globe Icon",
          style: styleImageIcon
        }), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            whiteSpace: "nowrap"
          }
        }, openTemplateTxt)))
      }));
      let saveTemplateTxt = "Create Template";
      topButtons.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "popovertooltip-template-save",
        position: _constants.component_template_save.position,
        title: _constants.component_template_save.title,
        content: _constants.component_template_save.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-template-save",
          style: CreateNewButton,
          size: "lg",
          onClick: this.onSave
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "2px",
            paddingRight: "2px"
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: plusImgPath,
          alt: "Plus Icon",
          style: styleImageIcon
        }), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            display: "flex",
            alignItems: "center"
          }
        }, saveTemplateTxt)))
      }));

      // topButtons.push(

      // 	<PopoverTooltip
      //		key = "popovertooltip-save";
      // 		position={saveSpecificTooltip.position}
      // 		title={saveSpecificTooltip.title}
      // 		content={saveSpecificTooltip.content}
      // 		element={
      // 			<Button
      // 				key="button-save"
      // 				style={CreateNewButton}
      // 				size="lg"
      // 				onClick={this.onSaveSpecific}
      // 				>
      // 				<div
      // 					style={{
      // 					display: "flex",
      // 					justifyContent: "center",
      // 					alignItems: "center",
      // 					paddingLeft: "2px",
      // 					paddingRight: "2px",
      // 					}}
      // 				>
      // 					<img src={plusImgPath} alt="Plus Icon" style={styleImageIcon} />
      // 					<span style={{ display: "flex", alignItems: "center" }}>
      // 					Save component
      // 					</span>
      // 				</div>
      // 			</Button>
      // 		}
      // 	/>
      // );
    }
    let containerFormNames = [];
    let containerForms = [];
    for (let id in forms) {
      let editChildrenCompButton = null;
      if (hasEditableChildren[id] && !this.props.notModal) editChildrenCompButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "button-addremove",
        style: button2,
        size: "lg",
        variant: !hasEditableChildren[id] ? "secondary" : "primary",
        onClick: !hasEditableChildren[id] ? null : this.onEditComponents,
        disabled: !hasEditableChildren[id]
      }, "Add/Remove wavelength range or sub-component");
      let localTabs = tabs[id];
      let localTabNames = tabNames[id];
      //let index = Object.keys(forms).indexOf(id);
      //<h3>{containerNames[id]}</h3>
      //<TabPane tab={containerNames[id]} key={index} forceRender={true}>
      //</TabPane>
      containerFormNames.push(/*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
        key: "ContainerTabName-" + containerNames[id]
      }, containerNames[id]));
      containerForms.push(/*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, {
        forceRender: true,
        key: "ContainerTab-" + containerNames[id]
      }, /*#__PURE__*/_react.default.createElement("p", null, hasEditableChildren[id] ? _constants.string_bandpass_warning : ""), /*#__PURE__*/_react.default.createElement(_reactTabs.Tabs
      // tabPosition={"top"}
      // tabBarStyle={{
      // 	border: "none",
      // }}
      //tabBarGutter={10}
      //onChange={this.onTabChange}
      , {
        onSelect: this.onTabChange
        //animated={true}
        //style={{ border: "none" }}
        // renderTabBar={() => <ScrollableTabBar />}
        // renderTabContent={() => <TabContent animated />}
        //activeKey={this.state.activeKey}
        ,
        selectedIndex: this.state.activeKey
      }, /*#__PURE__*/_react.default.createElement(_reactTabs.TabList, null, localTabNames), localTabs), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRow
      }, editChildrenCompButton)));
    }

    //let containerIndex = this.state.activeID;
    let containerIndex = Object.keys(forms).indexOf(this.state.activeID);
    //let activeContainerKey = `${containerIndex}`;

    let form = /*#__PURE__*/_react.default.createElement("div", {
      style: containerStyle
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: headerContainerStyle
    }, /*#__PURE__*/_react.default.createElement("h3", null, this.props.title), /*#__PURE__*/_react.default.createElement("div", {
      style: topButtonContainer
    }, topButtons)), /*#__PURE__*/_react.default.createElement(_reactTabs.Tabs
    // tabPosition={"top"}
    // tabBarStyle={{
    // 	border: "none",
    // }}
    // tabBarGutter={10}
    //onChange={this.onContainerTabChange}
    , {
      onSelect: this.onContainerTabChange
      //animated={true}
      //style={{ border: "none" }}
      // renderTabBar={() => <ScrollableTabBar />}
      // renderTabContent={() => <TabContent animated />}
      //activeKey={activeContainerKey}
      ,
      selectedIndex: containerIndex
    }, /*#__PURE__*/_react.default.createElement(_reactTabs.TabList, null, containerFormNames), containerForms), /*#__PURE__*/_react.default.createElement("div", {
      style: buttonContainerRowModal
    }, buttons));
    //<div>{this.props.schema.description}</div>
    if (!this.props.notModal) return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
      overlaysContainer: this.props.overlaysContainer
    }, form);else return form;
  }
}
exports.default = MultiTabFormWithHeaderV3;