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

var MultiTabFormWithHeaderV3 = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MultiTabFormWithHeaderV3, _React$PureComponent);

  var _super = _createSuper(MultiTabFormWithHeaderV3);

  function MultiTabFormWithHeaderV3(props) {
    var _this;

    _classCallCheck(this, MultiTabFormWithHeaderV3);

    _this = _super.call(this, props);
    _this.state = {
      showForm: true,
      linkedFields: {},
      currentChildrenComponents: {},
      minChildrenComponents: {},
      maxChildrenComponents: {},
      activeID: null,
      activeKey: "0",
      partialInputData: {}
    };

    if (props.inputData !== null && props.currentChildrenComponentIdentifier !== null && props.minChildrenComponentIdentifier !== null && props.maxChildrenComponentIdentifier !== null) {
      if (Array.isArray(props.inputData)) {
        var _loop = function _loop(y) {
          var inputData = props.inputData[y];
          var id = inputData.ID;

          if (_this.state.minChildrenComponents[id] === undefined || _this.state.minChildrenComponents[id] === null) {
            _this.state.minChildrenComponents[id] = {};
          }

          if (_this.state.maxChildrenComponents[id] === undefined || _this.state.maxChildrenComponents[id] === null) {
            _this.state.maxChildrenComponents[id] = {};
          }

          if (_this.state.currentChildrenComponents[id] === undefined || _this.state.currentChildrenComponents[id] === null) {
            _this.state.currentChildrenComponents[id] = {};
          }

          if (_this.state.activeID === null) _this.state.activeID = id; //console.log("inputData");
          //console.log(inputData);

          Object.keys(inputData).forEach(function (key) {
            if (key.includes(props.minChildrenComponentIdentifier)) {
              var name = key.replace(props.minChildrenComponentIdentifier, "");
              _this.state.minChildrenComponents[id][name] = inputData[key];
            } else if (key.includes(props.maxChildrenComponentIdentifier)) {
              var _name = key.replace(props.maxChildrenComponentIdentifier, "");

              _this.state.maxChildrenComponents[id][_name] = inputData[key];
            } else if (key.includes(props.currentChildrenComponentIdentifier)) {
              var _name2 = key.replace(props.currentChildrenComponentIdentifier, "");

              _this.state.currentChildrenComponents[id][_name2] = inputData[key];
            }
          });
        };

        for (var y = 0; y < props.inputData.length; y++) {
          _loop(y);
        }
      } else {
        var inputData = props.inputData;
        var id = inputData.ID;
        if (_this.state.activeID === null) _this.state.activeID = id;

        if (_this.state.minChildrenComponents[id] === undefined || _this.state.minChildrenComponents[id] === null) {
          _this.state.minChildrenComponents[id] = {};
        }

        if (_this.state.maxChildrenComponents[id] === undefined || _this.state.maxChildrenComponents[id] === null) {
          _this.state.maxChildrenComponents[id] = {};
        }

        if (_this.state.currentChildrenComponents[id] === undefined || _this.state.currentChildrenComponents[id] === null) {
          _this.state.currentChildrenComponents[id] = {};
        } //console.log("inputData");
        //console.log(inputData);


        Object.keys(inputData).forEach(function (key) {
          if (key.includes(props.minChildrenComponentIdentifier)) {
            var name = key.replace(props.minChildrenComponentIdentifier, "");
            _this.state.minChildrenComponents[id][name] = inputData[key];
          } else if (key.includes(props.maxChildrenComponentIdentifier)) {
            var _name3 = key.replace(props.maxChildrenComponentIdentifier, "");

            _this.state.maxChildrenComponents[id][_name3] = inputData[key];
          } else if (key.includes(props.currentChildrenComponentIdentifier)) {
            var _name4 = key.replace(props.currentChildrenComponentIdentifier, "");

            _this.state.currentChildrenComponents[id][_name4] = inputData[key];
          }
        });
      }
    } //this.formDescs = [];


    _this.buttonsRefs = {};
    _this.containerFormNames = {};
    _this.formNames = {};
    _this.forms = {};
    _this.formRefs = {};
    _this.data = {};
    _this.errors = {};
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
    _this.onError = _this.onError.bind(_assertThisInitialized(_this));
    _this.onContainerTabChange = _this.onContainerTabChange.bind(_assertThisInitialized(_this));
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
    if (props.schema !== null && props.schema !== undefined && Object.keys(_this.state.partialInputData).length === 0) _this.initializeForms();
    return _this;
  }

  _createClass(MultiTabFormWithHeaderV3, [{
    key: "initializeForms",
    value: function initializeForms() {
      //console.log("INITIALIZE FORMS");
      var counter = 0;
      var linkedFields = this.state.linkedFields;
      var currentChildrenComponents = this.state.currentChildrenComponents;
      var newActiveID = this.state.activeID;
      var partialInputData = {};
      var inputDataIDs = []; // console.log("currentChildrenComponents");
      // console.log(currentChildrenComponents);
      // console.log("elementByType - Init");
      // console.log(this.props.elementByType);

      if (this.props.inputData !== undefined) {
        if (Array.isArray(this.props.inputData)) {
          for (var i = 0; i < this.props.schema.length; i++) {
            var schema = this.props.schema[i];

            for (var y = 0; y < this.props.inputData.length; y++) {
              var inputData = this.props.inputData[y];
              var id = inputData.ID;
              inputDataIDs.push(id);
              if (newActiveID === null) newActiveID = id;

              if (inputData.Schema_ID === schema.ID) {
                var partialSchema = MultiTabFormWithHeaderV3.transformSchema(currentChildrenComponents[id], schema, this.props.elementByType, linkedFields, inputDataIDs);
                var localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(inputData, partialSchema);
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
          var _schema = this.props.schema;
          var _inputData = this.props.inputData;
          var _id = _inputData.ID;
          inputDataIDs.push(_id);

          var _partialSchema = MultiTabFormWithHeaderV3.transformSchema(currentChildrenComponents[_id], _schema, this.props.elementByType, linkedFields, inputDataIDs);

          var _localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(_inputData, _partialSchema);

          partialInputData[_id] = {
            schemaTitle: _schema.title,
            data: _localPartialInputData,
            schema: _partialSchema,
            subCategoriesOrder: _schema.subCategoriesOrder
          };
          this.containerFormNames[_id] = _schema.title;
        }
      }

      console.log("partialInputData");
      console.log(partialInputData);

      for (var _id2 in partialInputData) {
        // console.log("partialInputData");
        // console.log(partialInputData[id].data);
        // console.log("partialSchema");
        // console.log(partialInputData[id].schema);
        var _localPartialInputData2 = partialInputData[_id2].data;
        var _partialSchema2 = partialInputData[_id2].schema;
        var subCategoriesOrder = partialInputData[_id2].subCategoriesOrder;
        var partialForms = this.createForms(_id2, subCategoriesOrder, _partialSchema2, _localPartialInputData2);
        this.forms[_id2] = partialForms;
      } // console.log("forms");
      // console.log(this.forms);


      if (Object.keys(this.state.partialInputData).length === 0) {
        this.state.partialInputData = partialInputData;
        this.state.activeID = newActiveID;
      } else {
        this.forceUpdate();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.inputData === null || prevProps.inputData === undefined || this.props.inputData !== prevProps.inputData) {
        //console.log("FORM UPDATE with OBJ");
        //console.log(this.props.inputData);
        var activeID = null;

        if (Array.isArray(this.props.inputData)) {
          var inputData = this.props.inputData[0];
          activeID = inputData.ID;
        } else {
          var _inputData2 = this.props.inputData;
          activeID = _inputData2.ID;
        }

        this.buttonsRefs = {};
        this.containerFormNames = {};
        this.formNames = {};
        this.forms = {};
        this.formRefs = {};
        this.data = {};
        this.errors = {};
        this.initializeForms();
        this.setState({
          activeID: activeID,
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
      var id = -1;

      for (var currentID in localForms) {
        var forms = localForms[currentID];

        for (var i = 0; i < forms.length; i++) {
          var ref = forms[i];

          if (ref.state.formData === data.formData) {
            index = i;
            id = currentID;
            break;
          }
        }
      }

      var linkedFields = this.state.linkedFields;

      for (var key in data.formData) {
        if (linkedFields[key] !== undefined) {
          // console.log("linkedFields");
          // console.log(linkedFields[key]);
          var values = data.formData[key];
          var linkedFieldsValues = [];

          if (Array.isArray(values)) {
            for (var _i = 0; _i < values.length; _i++) {
              var value = values[_i];

              var _index = value.indexOf("/");

              var newValue = value.substring(_index + 1);
              linkedFieldsValues[_i] = newValue;
            }
          } else {
            var _value = values;

            var _index2 = _value.indexOf("/");

            var _newValue = _value.substring(_index2 + 1);

            linkedFieldsValues = _newValue;
          }

          linkedFields[key].value = linkedFieldsValues; // console.log("linkedFields");
          // console.log(linkedFields[key]);
          // if (Array.isArray(values)) {
          // 	let i = 0;
          // 	console.log("values");
          // 	console.log(values);
          // 	for (let key in values) {
          // 		let value = values[key];
          // 		console.log("value");
          // 		console.log(value);
          // 		let index = value.indexOf("/");
          // 		let newValue = value.substring(index + 1);
          // 		if (
          // 			linkedFields[key].value === null ||
          // 			linkedFields[key].value === undefined
          // 		)
          // 			linkedFields[key].value = [];
          // 		linkedFields[key][i] = newValue;
          // 		i++;
          // 	}
          // } else {
          // 	let value = values;
          // 	console.log("value");
          // 	console.log(value);
          // 	let index = value.indexOf("/");
          // 	let newValue = value.substring(index + 1);
          // 	linkedFields[key][value] = newValue;
          // }
        }
      }

      this.setState({
        linkedFields: linkedFields
      });
      var currentData = [];
      var currentErrors = [];
      if (this.data[id] !== null && this.data[id] !== undefined) currentData = this.data[id].slice();
      if (this.errors[id] !== null && this.errors[id] !== undefined) currentErrors = this.errors[id].slice();
      currentData.splice(index, 0, data);
      currentErrors.splice(index, 0, null);
      this.data[id] = currentData;
      this.errors[id] = currentErrors;
      this.processData();
    }
  }, {
    key: "onError",
    value: function onError(errors) {
      var localForms = this.formRefs;
      var index = -1;
      var id = -1;

      for (var currentID in localForms) {
        var forms = localForms[currentID];

        for (var i = 0; i < forms.length; i++) {
          var ref = forms[i];

          if (ref.state.errors === errors) {
            index = i;
            id = currentID;
            break;
          }
        }
      }

      var currentData = [];
      var currentErrors = [];
      if (this.data[id] !== null && this.data[id] !== undefined) currentData = this.data[id].slice();
      if (this.errors[id] !== null && this.errors[id] !== undefined) currentErrors = this.errors[id].slice();
      currentData.splice(index, 0, null);
      currentErrors.splice(index, 0, errors);
      this.data[id] = currentData;
      this.errors[id] = currentErrors;
      this.processErrors();
    }
  }, {
    key: "processData",
    value: function processData() {
      var _this2 = this;

      var partialInputData = this.state.partialInputData;
      var localData = this.data;
      var localForms = this.formRefs;
      var partialConsolidatedData = {}; // if (this.props.notModal) {
      // 	console.log("CONFIRM CLICK");
      // 	this.props.onConfirm(this.props.id);
      // 	return;
      // }

      var _loop2 = function _loop2(currentID) {
        var forms = localForms[currentID];
        var currentData = localData[currentID];
        var numberOfForms = forms.length;

        if (currentData === null || currentData === undefined || currentData.length < numberOfForms || currentData.includes(null)) {
          return {
            v: void 0
          };
        }

        var localConsolidatedData = _this2.transformOutputData(currentData);

        var currentChildrenComponents = _this2.state.currentChildrenComponents[currentID];

        if (currentChildrenComponents !== null && currentChildrenComponents !== undefined) {
          var attrName = _this2.props.currentChildrenComponentIdentifier;
          Object.keys(currentChildrenComponents).forEach(function (key) {
            var attr = attrName + key;
            localConsolidatedData[attr] = currentChildrenComponents[key];
          });
        }

        partialConsolidatedData[currentID] = localConsolidatedData;
      };

      for (var currentID in localForms) {
        var _ret = _loop2(currentID);

        if (typeof _ret === "object") return _ret.v;
      }

      if (this.props.notModal) {
        //console.log("CONFIRM CLICK");
        this.props.onConfirm(this.props.id);
        return;
      } // let currentData = this.data;
      // let numberOfForms = this.formRefs.length;
      // if (currentData.length < numberOfForms) return;


      var mainID = null;

      if (Array.isArray(this.props.inputData)) {
        mainID = this.props.inputData[0].ID;
      } else {
        mainID = this.props.inputData.ID;
      }

      var consolidatedData = partialConsolidatedData[mainID];
      var subComponents = {};

      for (var id in partialConsolidatedData) {
        if (id === mainID) continue;
        var localConsolidatedData = partialConsolidatedData[id];
        var localPartialInputData = partialInputData[id];
        var schemaTitle = localPartialInputData.schemaTitle;
        var schema = localPartialInputData.schema;
        var localSubComponents = [];

        if (subComponents[schemaTitle] !== null && subComponents[schemaTitle] !== undefined) {
          localSubComponents = subComponents[schemaTitle];
        }

        localSubComponents.push(localConsolidatedData);
        subComponents[schemaTitle] = localSubComponents;
      }

      for (var _schemaTitle in subComponents) {
        var _localSubComponents = subComponents[_schemaTitle];

        if (_localSubComponents.length > 1) {
          consolidatedData[_schemaTitle] = _localSubComponents;
        } else {
          consolidatedData[_schemaTitle] = _localSubComponents[0];
        }
      } // console.log("consolidatedData");
      // console.log(consolidatedData);


      var linkedFields = Object.assign({}, this.state.linkedFields);
      this.props.onConfirm(this.props.id, consolidatedData, linkedFields);
    }
  }, {
    key: "processErrors",
    value: function processErrors() {
      var localForms = this.formRefs;
      if (this.props.notModal) return;

      for (var currentID in localForms) {
        var forms = localForms[currentID];
        var currentErrors = this.errors[currentID];
        var numberOfForms = forms.length;
        if (currentErrors === null || currentErrors === undefined //  ||currentErrors.length < numberOfForms
        ) return;

        for (var i = 0; i < currentErrors.length; i++) {
          if (currentErrors[i] !== null) {
            this.setState({
              activeID: currentID,
              activeKey: "".concat(i)
            });
            return;
          }
        }
      } // let currentErrors = this.errors;
      // let numberOfForms = this.formRefs.length;
      // if (currentErrors.length < numberOfForms) return;
      // for (let i = 0; i < currentErrors.length; i++) {
      // 	if (currentErrors[i] !== null) {
      // 		this.setState({ activeKey: `${i}` });
      // 		return;
      // 	}
      // }

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
      this.initializeForms();
      this.setState({
        showForm: true
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      var localForms = this.formRefs;
      this.data = {};
      this.errors = {};

      for (var id in localForms) {
        var forms = localForms[id];

        for (var i = 0; i < forms.length; i++) {
          var ref = forms[i];
          ref.submit();
        }
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
        if (item === null || item === undefined) return;
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
      var _this3 = this;

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

          if (!_this3.props.editable) {
            partialUISchema[key][propKey] = Object.assign(uiProperties, {
              "ui:disabled": true
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
        idPrefix: "rjsfPrefix",
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
    value: function createForms(id, subCategoriesOrder, partialSchema, partialInputData) {
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
          description
        });
        currentFormNames.splice(index, 0, key);

        var form = _this4.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], index, currentFormRefs, currentButtonsRefs);

        currentForms.push(form);
      });
      var schemaKeys = Object.keys(partialSchema);

      var _loop3 = function _loop3(i) {
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

        var form = _this4.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], -1, currentFormRefs, currentButtonsRefs);

        currentForms.push(form);
      };

      for (var i = 0; i < schemaKeys.length; i++) {
        var _ret2 = _loop3(i);

        if (_ret2 === "continue") continue;
      }

      this.buttonsRefs[id] = currentButtonsRefs;
      this.formNames[id] = currentFormNames;
      this.formRefs[id] = currentFormRefs;
      return currentForms;
    }
  }, {
    key: "onContainerTabChange",
    value: function onContainerTabChange(key) {
      var id = Object.keys(this.forms)[key];
      this.setState({
        activeID: id,
        activeKey: "0"
      });
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
    value: function onClickAddChildComponent(id, key) {
      var currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
      currentChildrenComponents[id][key] = currentChildrenComponents[id][key] + 1;
      this.setState({
        currentChildrenComponents: currentChildrenComponents
      });
    }
  }, {
    key: "onClickRemoveChildComponent",
    value: function onClickRemoveChildComponent(id, key) {
      var currentChildrenComponents = Object.assign({}, this.state.currentChildrenComponents);
      currentChildrenComponents[id][key] = currentChildrenComponents[id][key] - 1;
      this.setState({
        currentChildrenComponents: currentChildrenComponents
      });
    }
  }, {
    key: "createChildrenComponentsButton",
    value: function createChildrenComponentsButton(id) {
      var _this5 = this;

      var currentChildrenComponents = this.state.currentChildrenComponents[id];
      var minChildrenComponents = this.state.minChildrenComponents[id];
      var maxChildrenComponents = this.state.maxChildrenComponents[id];
      if (currentChildrenComponents === undefined || currentChildrenComponents === null) return null;
      var buttonNoMargin = {
        width: "510px",
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
          key: "buttons-" + key
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: sideButtonLeftMargin,
          variant: isMinDisabled ? "secondary" : "danger",
          onClick: isMinDisabled ? null : function () {
            return _this5.onClickRemoveChildComponent(id, key);
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
            return _this5.onClickAddChildComponent(id, key);
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
      var button2 = {
        width: "510px",
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
        justifyContent: "center",
        marginBottom: "5px"
      };
      var currentChildrenComponents = this.state.currentChildrenComponents;
      var minChildrenComponents = this.state.minChildrenComponents;
      var maxChildrenComponents = this.state.maxChildrenComponents;
      var showForm = this.state.showForm;
      var hasEditableChildren = [];
      var containerNames = this.containerFormNames;
      var names = this.formNames;
      var forms = this.forms;

      for (var id in forms) {
        var localCurrentChildrenComponents = currentChildrenComponents[id];
        var localMinChildrenComponents = minChildrenComponents[id];
        var localMaxChildrenComponents = maxChildrenComponents[id];

        if (localCurrentChildrenComponents === null || localCurrentChildrenComponents === undefined) {
          hasEditableChildren[id] = false;
          break;
        }

        var localHasEditableChildren = false;

        if (Object.keys(localCurrentChildrenComponents).length > 0) {
          for (var key in localCurrentChildrenComponents) {
            var current = localCurrentChildrenComponents[key];
            var min = localMinChildrenComponents[key];
            var max = localMaxChildrenComponents[key];

            if (current !== min || current !== max) {
              localHasEditableChildren = true;
              break;
            }
          }

          hasEditableChildren[id] = localHasEditableChildren;
        }
      }

      var activeID = this.state.activeID;
      var childrenButtons = null;
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
          style: button,
          size: "lg",
          onClick: this.onEditComponentsConfirm
        }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button,
          size: "lg",
          onClick: this.onEditComponentsCancel
        }, "Cancel"))));
      }

      var tabs = {};

      var _loop4 = function _loop4(_id3) {
        var currentForms = forms[_id3];
        var currentTabs = currentForms.map(function (item, index) {
          if (names[_id3][index] === "undefined") return null;
          return /*#__PURE__*/_react.default.createElement(_rcTabs.TabPane, {
            tab: names[_id3][index],
            key: index,
            forceRender: true
          }, item);
        });
        tabs[_id3] = currentTabs;
      };

      for (var _id3 in forms) {
        _loop4(_id3);
      } // let title = "Selected Hardware";
      // if (this.props.schema !== null) {
      // 	title = this.props.schema.title;
      // }


      var buttons = [];

      if (!this.props.notModal || this.props.notModal && this.props.onConfirm !== null) {
        var text = "Confirm";
        if (this.props.notModal && this.props.onConfirm !== null) text = "Add";
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-confirm",
          style: button,
          size: "lg",
          onClick: this.onConfirm
        }, text));
      }

      if (!this.props.notModal) {
        buttons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-cancel",
          style: button,
          size: "lg",
          onClick: this.onCancel
        }, "Cancel"));
      }

      var containerForms = [];

      for (var _id4 in forms) {
        var editChildrenCompButton = null;
        if (hasEditableChildren[_id4] && !this.props.notModal) editChildrenCompButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-addremove",
          style: button2,
          size: "lg",
          variant: !hasEditableChildren[_id4] ? "secondary" : "primary",
          onClick: !hasEditableChildren[_id4] ? null : this.onEditComponents,
          disabled: !hasEditableChildren[_id4]
        }, "Add/Remove wavelength range or sub-component");
        var localTabs = tabs[_id4];
        var index = Object.keys(forms).indexOf(_id4); //<h3>{containerNames[id]}</h3>

        containerForms.push( /*#__PURE__*/_react.default.createElement(_rcTabs.TabPane, {
          tab: containerNames[_id4],
          key: index,
          forceRender: true
        }, /*#__PURE__*/_react.default.createElement("p", null, hasEditableChildren[_id4] ? _constants.string_bandpass_warning : ""), /*#__PURE__*/_react.default.createElement(_rcTabs.default, {
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
        }, localTabs), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerRow
        }, editChildrenCompButton)));
      }

      var containerIndex = Object.keys(forms).indexOf(this.state.activeID);
      var activeContainerKey = "".concat(containerIndex);

      var form = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.title), /*#__PURE__*/_react.default.createElement(_rcTabs.default, {
        tabPosition: "top",
        tabBarStyle: {
          display: "row",
          border: "none"
        },
        onChange: this.onContainerTabChange,
        animated: true,
        style: {
          border: "none"
        } // renderTabBar={() => <ScrollableTabBar />}
        // renderTabContent={() => <TabContent animated />}
        ,
        activeKey: activeContainerKey
      }, containerForms), /*#__PURE__*/_react.default.createElement("div", {
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
  }, {
    key: "transformInputData",
    value: function transformInputData(inputData, partialSchema) {
      var partialInputData = [];
      if (inputData === null || inputData === undefined) return partialInputData;
      Object.keys(partialSchema).forEach(function (key) {
        if (partialInputData[key] === undefined) partialInputData[key] = {};
        Object.keys(partialSchema[key].properties).forEach(function (propKey) {
          if (inputData[propKey] !== undefined) {
            partialInputData[key][propKey] = inputData[propKey]; //console.log("partialSchema[key].properties[propKey]");
            //console.log(partialSchema[key].properties[propKey]);
            // if (partialSchema[key].properties[propKey].type === "array") {
            // 	//console.log("delete default array");
            // 	delete partialSchema[key].properties[propKey].items[string_default];
            // } else {
            // 	//console.log("delete default");
            // 	delete partialSchema[key].properties[propKey][string_default];
            // }
          } else {
            var stringIndex = key.lastIndexOf("_");
            var index = -1;
            if (stringIndex != -1) index = key.substr(stringIndex + 1, 1);
            var stringKey = key.replace("_", "");
            stringKey = stringKey.replace(index, "");
            var val = MultiTabFormWithHeaderV3.findInputPropKeyValue(stringKey, index, propKey, inputData); // console.log("2- key : " + key + " - propKey : " + propKey);
            // console.log(val);

            if (val !== null) {
              partialInputData[key][propKey] = val; //console.log("partialSchema[key].properties[propKey]");
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
  }, {
    key: "transformSchemaCategorizeField",
    value: function transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, counter, subType, linkedFields, inputDataIDs) {
      var partialSchema = {};
      if (schema === null) return partialSchema;
      Object.keys(schema.properties).forEach(function (key) {
        var property = schema.properties[key];

        if (currentChildrenComponents !== undefined && currentChildrenComponents !== null && Object.keys(currentChildrenComponents).includes(key)) {
          if (property.type === _constants.string_object) {
            var count = 0;

            for (var inputKey in currentChildrenComponents) {
              if (key.includes(inputKey)) {
                count = currentChildrenComponents[inputKey];
                break;
              }
            }

            for (var i = 0; i < count; i++) {
              var localPartialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(currentChildrenComponents, property, elementByType, -1, _constants.string_object, linkedFields);
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

            for (var _i2 = 0; _i2 < _count; _i2++) {
              var _localPartialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(currentChildrenComponents, property.items, elementByType, _i2, _constants.string_array, linkedFields);

              partialSchema = Object.assign(partialSchema, _localPartialSchema);
            }

            return;
          }
        }

        var category = property.category;
        if (category === null || category === undefined) category = property.items.category;
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

          if (linkedFields[key] === undefined) {
            linkedFields[key] = {
              schemaType: schema.title,
              value: _constants.string_not_assigned
            };
          }

          if (elementByType[property.linkTo] !== undefined) {
            var propElementByType = elementByType[property.linkTo];
            Object.keys(propElementByType).forEach(function (propElementByTypeID) {
              var propElementByTypeName = propElementByType[propElementByTypeID];
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
          } // console.log("elementByType");
          // console.log(elementByType);


          if (elementByType[property.items.linkTo] !== undefined) {
            var _propElementByType = elementByType[property.items.linkTo];
            Object.keys(_propElementByType).forEach(function (propElementByTypeID) {
              var propElementByTypeName = _propElementByType[propElementByTypeID];
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
    value: function transformSchema(currentChildrenComponents, schema, elementByType, linkedFields, inputDataIDs) {
      var partialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(currentChildrenComponents, schema, elementByType, -1, _constants.string_default, linkedFields, inputDataIDs); //partialSchema = Object.assign(partialSchema, { type: "object" });

      return partialSchema;
    }
  }]);

  return MultiTabFormWithHeaderV3;
}(_react.default.PureComponent);

exports.default = MultiTabFormWithHeaderV3;