function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import Form from "@rjsf/bootstrap-4";
import Tabs, { TabPane } from "rc-tabs"; // import TabContent from "rc-tabs/lib/TabContent";
// import ScrollableTabBar from "rc-tabs/lib/TabBar";
//import "rc-tabs/assets/index.css";

import Button from "react-bootstrap/Button";
import TreeMenu from "react-simple-tree-menu";
import { ListGroupItem, ListGroup } from "reactstrap";
import ModalWindow from "./modalWindow";
import { string_na, string_not_assigned, string_default, string_enum, string_enumNames, string_object, string_array, string_bandpass_warning } from "../constants";
var DEFAULT_PADDING = 16;
var ICON_SIZE = 8;
var LEVEL_SPACE = 16;

var ToggleIcon = function (_ref) {
  var on = _ref.on;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 8
    }
  }, on ? "-" : "+");
};

var ListItem = function (_ref2) {
  var _ref2$level = _ref2.level,
      level = _ref2$level === void 0 ? 0 : _ref2$level,
      hasNodes = _ref2.hasNodes,
      isOpen = _ref2.isOpen,
      label = _ref2.label,
      searchTerm = _ref2.searchTerm,
      openNodes = _ref2.openNodes,
      toggleNode = _ref2.toggleNode,
      matchSearch = _ref2.matchSearch,
      focused = _ref2.focused,
      props = _objectWithoutProperties(_ref2, ["level", "hasNodes", "isOpen", "label", "searchTerm", "openNodes", "toggleNode", "matchSearch", "focused"]);

  return /*#__PURE__*/React.createElement(ListGroupItem, _extends({}, props, {
    style: {
      paddingLeft: DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE,
      cursor: "pointer",
      boxShadow: focused ? "0px 0px 5px 0px #222" : "none",
      zIndex: focused ? 999 : "unset",
      position: "relative"
    }
  }), hasNodes && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block"
    },
    onClick: function onClick(e) {
      hasNodes && toggleNode && toggleNode();
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement(ToggleIcon, {
    on: isOpen
  })), label);
};

var MultiTabFormWithHeaderV2 = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MultiTabFormWithHeaderV2, _React$PureComponent);

  var _super = _createSuper(MultiTabFormWithHeaderV2);

  function MultiTabFormWithHeaderV2(props) {
    var _this;

    _classCallCheck(this, MultiTabFormWithHeaderV2);

    _this = _super.call(this, props);
    _this.state = {
      showForm: true,
      linkedFields: {},
      currentChildrenComponents: {},
      minChildrenComponents: {},
      maxChildrenComponents: {},
      tmpData: {},
      activeKey: "0",
      activeFormKey: ""
    };

    if (props.inputData !== null && props.childrenComponentIdentifier !== null && props.minChildrenComponentIdentifier !== null && props.maxChildrenComponentIdentifier !== null) {
      //FIXME I may have to change this to iterate inside the various data
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

    _this.paths = [];
    _this.partialSchema = {};
    _this.formDescs = {};
    _this.buttonsRefs = {};
    _this.formNames = {};
    _this.forms = {};
    _this.formRefs = {};
    _this.data = [];
    _this.errors = [];
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.onError = _this.onError.bind(_assertThisInitialized(_this));
    _this.onTabChange = _this.onTabChange.bind(_assertThisInitialized(_this));
    _this.onItemChange = _this.onItemChange.bind(_assertThisInitialized(_this));
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
    _this.createDataTree = _this.createDataTree.bind(_assertThisInitialized(_this));
    _this.createDataTreeNodes = _this.createDataTreeNodes.bind(_assertThisInitialized(_this));
    _this.initializeForms = _this.initializeForms.bind(_assertThisInitialized(_this));
    _this.initializeNodeForms = _this.initializeNodeForms.bind(_assertThisInitialized(_this));
    _this.dataTree = _this.createDataTree(props.schemas, props.schema);

    _this.initializeForms();

    return _this;
  }

  _createClass(MultiTabFormWithHeaderV2, [{
    key: "createDataTreeNodes",
    value: function createDataTreeNodes(path, schemas, schema, counter, subType) {
      var _this2 = this;

      console.log("IM HERE - createDataTreeNodes - " + path);
      var nodes = {};
      var visualCounter = 0;
      Object.keys(schema.properties).forEach(function (key) {
        var property = schema.properties[key];

        if (property.contains !== undefined) {
          var contained = property.contains;
          var foundSchema = null;
          Object.keys(schemas).forEach(function (schemaIndex) {
            var localSchema = schemas[schemaIndex];

            if (localSchema.title === contained) {
              foundSchema = localSchema;
            }
          }); //let categorizedSchemaElements = null;
          // if (categorizedElements[schema.title] !== undefined) {
          // 	categorizedSchemaElements = categorizedElements[schema.title];
          // } else {
          // 	categorizedSchemaElements = {};
          // }

          if (foundSchema !== null) {
            //categorizedSchemaElements[foundSchema.title] = foundSchema;
            var newPath = path + "/" + foundSchema.title;

            var subNodes = _this2.createDataTreeNodes(newPath, schemas, foundSchema, counter, subType);

            nodes[foundSchema.title] = {
              label: foundSchema.title,
              index: visualCounter,
              path: newPath,
              schema: foundSchema,
              nodes: subNodes
            }; //categorizedElements[schema.title] = categorizedSchemaElements;

            _this2.paths.push(newPath);

            visualCounter++;
          }
        }
      });
      return nodes;
    }
  }, {
    key: "createDataTree",
    value: function createDataTree(schemas, schema) {
      console.log("IM HERE - createDataTree");
      if (schema === null) return;
      var key = schema.title;
      var nodes = this.createDataTreeNodes(key, schemas, schema, -1, string_default);
      var dataTree = {};
      dataTree[key] = {
        label: key,
        index: 0,
        path: key,
        schema: schema,
        nodes: nodes
      };

      if (this.state.activeFormKey === "") {
        this.state.activeFormKey = key;
      }

      this.paths.push(key);
      console.log(dataTree);
      return dataTree;
    }
  }, {
    key: "initializeNodeForms",
    value: function initializeNodeForms(nodes) {
      var _this3 = this;

      var linkedFields = this.state.linkedFields;
      var currentChildrenComponents = this.state.currentChildrenComponents;
      console.log("IM HERE - initializeNodeForms");
      console.log(nodes);
      Object.keys(nodes).forEach(function (key) {
        var node = nodes[key];
        var path = node.path;
        _this3.partialSchema[path] = MultiTabFormWithHeaderV2.transformSchema(currentChildrenComponents, node.schema, _this3.props.elementByType, linkedFields);
        var partialInputData = [];

        if (_this3.props.inputData !== undefined) {
          partialInputData = MultiTabFormWithHeaderV2.transformInputData(_this3.props.inputData, _this3.partialSchema[path]);
        }

        var subCategoriesOrder = _this3.props.schema.subCategoriesOrder;

        var subElementForms = _this3.createForms(path, subCategoriesOrder, _this3.partialSchema[path], partialInputData);

        _this3.forms[path] = subElementForms;

        _this3.initializeNodeForms(node.nodes);
      });
    }
  }, {
    key: "initializeForms",
    value: function initializeForms() {
      console.log("IM HERE - initializeForms");
      var linkedFields = this.state.linkedFields;
      var currentChildrenComponents = this.state.currentChildrenComponents;
      var dataTree = this.dataTree;
      if (dataTree === null || dataTree === undefined) return;
      var key = Object.keys(dataTree)[0]; // let rootNode = dataTree[key];
      // let path = rootNode.path;

      this.partialSchema[key] = MultiTabFormWithHeaderV2.transformSchema(currentChildrenComponents, this.props.schema, this.props.elementByType, linkedFields);
      var partialInputData = [];

      if (this.props.inputData !== undefined) {
        partialInputData = MultiTabFormWithHeaderV2.transformInputData(this.props.inputData, this.partialSchema[key]);
      }

      var subCategoriesOrder = this.props.schema.subCategoriesOrder;
      var subElementForms = this.createForms(key, subCategoriesOrder, this.partialSchema[key], partialInputData);
      this.forms[key] = subElementForms;
      this.initializeNodeForms(dataTree[key].nodes);
    }
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
        consolidatedData[attrName + key] = currentChildrenComponents[key];
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
      return /*#__PURE__*/React.createElement(Form, {
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
      }, /*#__PURE__*/React.createElement("button", {
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
    value: function createForms(formsKey, subCategoriesOrder, partialSchema, partialInputData) {
      var _this4 = this;

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

        var form = _this4.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], index, currentFormRefs, currentButtonsRefs);

        currentForms.push(form); //}
      });
      var schemaKeys = Object.keys(partialSchema);

      var _loop = function (i) {
        var key = schemaKeys[i];
        if (Object.keys(subCategoriesOrder).includes(key)) return "continue";
        var description = null;
        Object.keys(subCategoriesOrder).forEach(function (subKey) {
          if (key.startsWith(subKey)) {
            description = subCategoriesOrder[subKey];
          }
        });
        if (description === null) description = "";
        partialSchema[key] = Object.assign(partialSchema[key], {
          description: description
        });
        currentFormNames.push(key);

        var form = _this4.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], -1, currentFormRefs, currentButtonsRefs);

        currentForms.push(form);
      };

      for (var i = 0; i < schemaKeys.length; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }

      this.buttonsRefs[formsKey] = currentButtonsRefs;
      this.formNames[formsKey] = currentFormNames;
      this.formRefs[formsKey] = currentFormRefs;
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
    key: "onItemChange",
    value: function onItemChange(key) {
      this.setState({
        activeFormKey: key,
        activeKey: "0"
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
      var _this5 = this;

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
        buttons.push( /*#__PURE__*/React.createElement("div", {
          key: key
        }, /*#__PURE__*/React.createElement(Button, {
          style: sideButtonLeftMargin,
          variant: isMinDisabled ? "secondary" : "danger",
          onClick: isMinDisabled ? null : function () {
            return _this5.onClickRemoveChildComponent(key);
          },
          disabled: isMinDisabled,
          value: key
        }, "-"), /*#__PURE__*/React.createElement(Button, {
          style: buttonNoMargin,
          size: "lg",
          variant: "secondary",
          disabled: true
        }, key, " : ", currentChildren), /*#__PURE__*/React.createElement(Button, {
          style: sideButtonRightMargin,
          variant: isMaxDisabled ? "secondary" : "success",
          onClick: isMaxDisabled ? null : function () {
            return _this5.onClickAddChildComponent(key);
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
      var _this6 = this;

      var button = {
        width: "250px",
        marginLeft: "5px",
        marginRight: "5px"
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
        var _multiTabForm = /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            flexWap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            flexWap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }
        }, childrenButtons), /*#__PURE__*/React.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/React.createElement(Button, {
          style: button,
          size: "lg",
          onClick: this.onEditComponentsConfirm
        }, "Confirm"), /*#__PURE__*/React.createElement(Button, {
          style: button,
          size: "lg",
          onClick: this.onEditComponentsCancel
        }, "Cancel")));

        if (this.props.modalContainer) {
          return /*#__PURE__*/React.createElement(ModalWindow, {
            overlaysContainer: this.props.overlaysContainer
          }, _multiTabForm);
        } else {
          return _multiTabForm;
        }
      } //FIXME Add the tree here and tree logic


      var activeFormKey = this.state.activeFormKey;
      var paths = this.paths;
      console.log("IM HERE - RENDER  - " + activeFormKey);
      var names = this.formNames[activeFormKey];
      var forms = this.forms[activeFormKey];
      console.log(forms);
      var tabs = null;
      var hasEditableChildren = false;

      if (forms !== null && forms !== undefined) {
        tabs = forms.map(function (item, index) {
          return /*#__PURE__*/React.createElement(TabPane, {
            tab: names[index],
            key: index,
            forceRender: true
          }, item);
        });

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
      }

      var buttons = null;
      if (this.props.modalContainer) buttons = /*#__PURE__*/React.createElement("div", {
        style: buttonContainerRow
      }, /*#__PURE__*/React.createElement(Button, {
        style: button,
        size: "lg",
        variant: !hasEditableChildren ? "secondary" : "primary",
        onClick: !hasEditableChildren ? null : this.onEditComponents,
        disabled: !hasEditableChildren
      }, "Add/Remove band-pass"), /*#__PURE__*/React.createElement(Button, {
        style: button,
        size: "lg",
        onClick: this.onConfirm
      }, "Confirm"), /*#__PURE__*/React.createElement(Button, {
        style: button,
        size: "lg",
        onClick: this.onCancel
      }, "Cancel")); //<div>{this.props.schema.description}</div>

      var title = null;
      if (this.props.schema !== null) title = this.props.schema.title;
      var multiTabForm = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, hasEditableChildren ? string_bandpass_warning : ""), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexFlow: "row"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          marginRight: "10px"
        }
      }, /*#__PURE__*/React.createElement(TreeMenu, {
        data: this.dataTree,
        onClickItem: function onClickItem(_ref3) {
          var key = _ref3.key,
              label = _ref3.label,
              props = _objectWithoutProperties(_ref3, ["key", "label"]);

          console.log(props);

          _this6.onItemChange(key); //this.navigate(props.url); // user defined prop

        },
        openNodes: paths,
        initialActiveKey: activeFormKey,
        debounceTime: 125,
        disableKeyboard: false,
        hasSearch: false,
        resetOpenNodesOnDataUpdate: false
      }, function (_ref4) {
        var search = _ref4.search,
            items = _ref4.items;
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListGroup, null, items.map(function (props) {
          return /*#__PURE__*/React.createElement(ListItem, props);
        })));
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          overflow: "auto"
        }
      }, /*#__PURE__*/React.createElement(Tabs, {
        onChange: this.onTabChange // renderTabBar={() => <ScrollableTabBar />}
        // renderTabContent={() => <TabContent animatedWithMargin />}
        ,
        activeKey: this.state.activeKey
      }, tabs))), buttons);

      if (this.props.modalContainer) {
        return /*#__PURE__*/React.createElement(ModalWindow, {
          overlaysContainer: this.props.overlaysContainer
        }, multiTabForm, ";");
      } else {
        return multiTabForm;
      }
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
    value: function findInputPropKeyValue(groupKey, index, propKey, inputData) {
      var value = null;

      for (var key in inputData) {
        if (inputData[key] instanceof Array) {
          if (key !== groupKey) continue;

          if (inputData[key][propKey] !== undefined) {
            return inputData[key][propKey];
          } else {
            value = MultiTabFormWithHeaderV2.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
            if (value !== undefined) return value;
          }
        } else if (inputData[key] instanceof Object) {
          if (index === -1) {
            if (inputData[key][propKey] !== undefined) {
              value = inputData[key][propKey];
            } else {
              value = MultiTabFormWithHeaderV2.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
            }
          } else if (key !== index) {
            continue;
          } else if (inputData[key][propKey] !== undefined) {
            return inputData[key][propKey];
          } else {
            value = MultiTabFormWithHeaderV2.findInputPropKeyValue(groupKey, index, propKey, inputData[key]);
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
      Object.keys(partialSchema).forEach(function (key) {
        if (partialInputData[key] === undefined) partialInputData[key] = {};
        Object.keys(partialSchema[key].properties).forEach(function (propKey) {
          if (inputData[propKey] !== undefined) partialInputData[key][propKey] = inputData[propKey];else {
            var stringIndex = key.lastIndexOf("_");
            var index = -1;
            if (stringIndex != -1) index = key.substr(stringIndex + 1, 1);
            var stringKey = key.replace("_", "");
            stringKey = stringKey.replace(index, "");
            var val = MultiTabFormWithHeaderV2.findInputPropKeyValue(stringKey, index, propKey, inputData);

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
      Object.keys(schema.properties).forEach(function (key) {
        var property = schema.properties[key];

        if (property.type === string_object) {
          var count = 0;

          for (var inputKey in currentChildrenComponents) {
            if (key.includes(inputKey)) {
              count = currentChildrenComponents[inputKey];
              break;
            }
          }

          for (var i = 0; i < count; i++) {
            var localPartialSchema = MultiTabFormWithHeaderV2.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, string_object, linkedFields);
            partialSchema = Object.assign(partialSchema, localPartialSchema);
          }

          return;
        } else if (property.type === string_array) {
          var _count = 0;

          for (var _inputKey in currentChildrenComponents) {
            if (key.includes(_inputKey)) {
              _count = currentChildrenComponents[_inputKey];
              break;
            }
          }

          for (var _i = 0; _i < _count; _i++) {
            var _localPartialSchema = MultiTabFormWithHeaderV2.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, _i, string_array, linkedFields);

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
            type: string_object,
            subType: subType,
            container: category,
            counter: counter,
            properties: {}
          };
        }

        var newProperty = Object.assign({}, property);

        if (property.linkTo !== undefined) {
          newProperty[string_default] = string_na;
          newProperty[string_enum] = [string_na];
          newProperty[string_enumNames] = [string_not_assigned];

          if (elementByType[property.linkTo] !== undefined) {
            var propElementByType = elementByType[property.linkTo];

            if (linkedFields[key] === undefined) {
              linkedFields[key] = {
                schemaType: property.linkTo,
                value: string_not_assigned
              };
            }

            Object.keys(propElementByType).forEach(function (propElementByTypeName) {
              var propElementByTypeID = propElementByType[propElementByTypeName];
              newProperty[string_enum].push(property.linkTo + "/" + propElementByTypeID);
              newProperty[string_enumNames].push(propElementByTypeName);
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
      var partialSchema = MultiTabFormWithHeaderV2.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, string_default, linkedFields);
      return partialSchema;
    }
  }]);

  return MultiTabFormWithHeaderV2;
}(React.PureComponent);
/**
 * @todo Own file.
 */


export { MultiTabFormWithHeaderV2 as default };