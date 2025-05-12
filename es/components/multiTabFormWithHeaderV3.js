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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var url = require("url");

var MultiTabFormWithHeaderV3 = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MultiTabFormWithHeaderV3, _React$PureComponent);

  var _super = _createSuper(MultiTabFormWithHeaderV3);

  function MultiTabFormWithHeaderV3(props) {
    var _this;

    _classCallCheck(this, MultiTabFormWithHeaderV3);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function () {
      _this.setState({
        isValidated: false
      });
    });

    _this.state = {
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

          if (_this.state.activeID === null) _this.state.activeID = id;
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
        }

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
    }

    _this.buttonsRefs = {};
    _this.containerFormNames = {};
    _this.formNames = {};
    _this.forms = {};
    _this.formRefs = {};
    _this.data = {};
    _this.errors = {};
    _this.action = null;
    _this.handleAction = _this.handleAction.bind(_assertThisInitialized(_this));
    _this.onSave = _this.onSave.bind(_assertThisInitialized(_this));
    _this.onSaveSpecific = _this.onSaveSpecific.bind(_assertThisInitialized(_this));
    _this.onLoad = _this.onLoad.bind(_assertThisInitialized(_this));
    _this.onValidate = _this.onValidate.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
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

    if (props.schema !== null && props.schema !== undefined && props.selectedLoadComponent !== null && props.selectedLoadComponent !== undefined && Object.keys(_this.state.partialInputData).length === 0) {
      _this.initializeFormsFromLoadedComponent();
    } else if (props.schema !== null && props.schema !== undefined && Object.keys(_this.state.partialInputData).length === 0) {
      _this.initializeForms();
    }

    return _this;
  }

  _createClass(MultiTabFormWithHeaderV3, [{
    key: "initializeFormsFromLoadedComponent",
    value: function initializeFormsFromLoadedComponent() {
      var linkedFields = this.state.linkedFields;
      var currentChildrenComponents = this.state.currentChildrenComponents;
      var newActiveID = this.state.activeID;
      var partialInputData = {};
      var inputDataIDs = [];

      var mergedData = _objectSpread(_objectSpread({}, this.props.inputData), this.props.selectedLoadComponent);

      if (mergedData !== undefined && mergedData !== null) {
        // console.log("[initializeFormsFromLoadedComponent] inside of first if statement");
        // console.log("[initializeFormsFromLoadedComponent] ** mergedData", mergedData);
        // console.log("[initializeFormsFromLoadedComponent] ** this.props.inputData", this.props.inputData);
        // console.log("[initializeFormsFromLoadedComponent] ** this.props.selectedLoadComponent", this.props.selectedLoadComponent);
        if (Array.isArray(mergedData)) {
          console.log("[initializeFormsFromLoadedComponent] inside of second if statement");

          for (var i = 0; i < this.props.schema.length; i++) {
            var schema = this.props.schema[i];

            for (var y = 0; y < mergedData.length; y++) {
              var inputData = mergedData[y];
              console.log("inputData.ID", inputData.ID); // let id = uuidv4();
              // inputData.ID = id;
              // === NEW LOGIC HERE ===

              var id = inputData.ID !== undefined && inputData.ID !== null && inputData.ID !== "" ? inputData.ID : (0, _uuid.v4)();
              inputData.ID = id; // Ensure the ID is set

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
          console.log("[initializeFormsFromLoadedComponent] inside of first else statement"); // 	console.log("[initializeFormsFromLoadedComponent] ** mergedData", mergedData);
          // console.log("[initializeFormsFromLoadedComponent] ** this.props.inputData", this.props.inputData);
          // console.log("[initializeFormsFromLoadedComponent] ** this.props.selectedLoadComponent", this.props.selectedLoadComponent);
          //create case if 1 input but multiple schemas ?

          var _schema = this.props.schema;
          var _inputData = mergedData;
          console.log("inputData.ID", _inputData.ID);
          var _id = _inputData.ID; // // === NEW LOGIC HERE ===
          // let id = (inputData.ID !== undefined && inputData.ID !== null && inputData.ID !== "")
          // ? inputData.ID
          // : uuidv4();
          // inputData.ID = id; // Ensure the ID is set

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

      for (var _id2 in partialInputData) {
        var _localPartialInputData2 = partialInputData[_id2].data;
        var _partialSchema2 = partialInputData[_id2].schema;
        var subCategoriesOrder = partialInputData[_id2].subCategoriesOrder;
        var partialForms = this.createForms(_id2, subCategoriesOrder, _partialSchema2, _localPartialInputData2);
        this.forms[_id2] = partialForms;
      }

      if (Object.keys(this.state.partialInputData).length === 0) {
        this.state.partialInputData = partialInputData;
        this.state.activeID = newActiveID; //this.forceUpdate();
      } else {
        this.forceUpdate();
      }
    } // initializeFormsFromLoadedComponent() {
    // 	let linkedFields = this.state.linkedFields;
    // 	let currentChildrenComponents = this.state.currentChildrenComponents;
    // 	let newActiveID = this.state.activeID;
    // 	let partialInputData = {};
    // 	let inputDataIDs = [];
    // 	const mergedData = {
    // 		...this.props.inputData, 
    // 		...this.props.selectedLoadComponent 
    // 	};
    // 	if (mergedData !== undefined && mergedData !== null) {
    // 		if (Array.isArray(mergedData)) {
    // 			console.log("[initializeFormsFromLoadedComponent] inside array handling");
    // 			for (let i = 0; i < this.props.schema.length; i++) {
    // 				let schema = this.props.schema[i];
    // 				for (let y = 0; y < mergedData.length; y++) {
    // 					let inputData = mergedData[y];
    // 					let newID = (inputData.ID?.trim()) ? inputData.ID : uuidv4();
    // 					// Remove existing data if ID is changing
    // 					if (this.state.partialInputData[newID]) {
    // 						delete this.state.partialInputData[newID];
    // 						delete this.containerFormNames[newID];
    // 						delete this.forms[newID];
    // 					}
    // 					inputData.ID = newID;
    // 					inputDataIDs.push(newID);
    // 					if (newActiveID === null) newActiveID = newID;
    // 					if (inputData.Schema_ID === schema.ID) {
    // 						let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
    // 							currentChildrenComponents[newID],
    // 							schema,
    // 							this.props.elementByType,
    // 							linkedFields,
    // 							inputDataIDs
    // 						);
    // 						let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(
    // 							inputData,
    // 							partialSchema
    // 						);
    // 						partialInputData[newID] = {
    // 							schemaTitle: schema.title,
    // 							data: localPartialInputData,
    // 							schema: partialSchema,
    // 							subCategoriesOrder: schema.subCategoriesOrder,
    // 						};
    // 						this.containerFormNames[newID] = schema.title;
    // 					}
    // 				}
    // 			}
    // 		} else {
    // 			console.log("[initializeFormsFromLoadedComponent] handling single component");
    // 			let schema = this.props.schema;
    // 			let inputData = mergedData;
    // 			let newID = (inputData.ID?.trim()) ? inputData.ID : uuidv4();
    // 			let oldID = this.state.activeID;
    // 			// Remove old data if ID is changing
    // 			if (oldID && oldID !== newID && this.state.partialInputData[oldID]) {
    // 				delete this.state.partialInputData[oldID];
    // 				delete this.containerFormNames[oldID];
    // 				delete this.forms[oldID];
    // 			}
    // 			inputData.ID = newID;
    // 			inputDataIDs.push(newID);
    // 			newActiveID = newID;  // Always update active ID to new ID
    // 			let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
    // 				currentChildrenComponents[newID],
    // 				schema,
    // 				this.props.elementByType,
    // 				linkedFields,
    // 				inputDataIDs
    // 			);
    // 			let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(
    // 				inputData,
    // 				partialSchema
    // 			);
    // 			partialInputData[newID] = {
    // 				schemaTitle: schema.title,
    // 				data: localPartialInputData,
    // 				schema: partialSchema,
    // 				subCategoriesOrder: schema.subCategoriesOrder,
    // 			};
    // 			this.containerFormNames[newID] = schema.title;
    // 		}
    // 	}
    // 	// Merge new data with existing state
    // 	const updatedPartialInputData = {
    // 		...this.state.partialInputData,
    // 		...partialInputData
    // 	};
    // 	// Update forms
    // 	for (let id in partialInputData) {
    // 		let localPartialInputData = partialInputData[id].data;
    // 		let partialSchema = partialInputData[id].schema;
    // 		let subCategoriesOrder = partialInputData[id].subCategoriesOrder;
    // 		let partialForms = this.createForms(
    // 			id,
    // 			subCategoriesOrder,
    // 			partialSchema,
    // 			localPartialInputData
    // 		);
    // 		this.forms[id] = partialForms;
    // 	}
    // 	// Update state
    // 	this.state.partialInputData = updatedPartialInputData;
    // 	this.state.activeID = newActiveID;
    // 	this.forceUpdate();
    // }
    // initializeFormsFromLoadedComponent() {
    // 	let linkedFields = this.state.linkedFields;
    // 	let currentChildrenComponents = this.state.currentChildrenComponents;
    // 	let newActiveID = this.state.activeID;
    // 	let partialInputData = {};
    // 	let inputDataIDs = [];
    // 	const mergedData = {
    // 		...this.props.inputData, 
    // 		...this.props.selectedLoadComponent 
    // 	};
    // 	if (mergedData !== undefined && mergedData !== null) {
    // 		// console.log("[initializeFormsFromLoadedComponent] inside of first if statement");
    // 		// console.log("[initializeFormsFromLoadedComponent] ** mergedData", mergedData);
    // 		// console.log("[initializeFormsFromLoadedComponent] ** this.props.inputData", this.props.inputData);
    // 		// console.log("[initializeFormsFromLoadedComponent] ** this.props.selectedLoadComponent", this.props.selectedLoadComponent);
    // 		if (Array.isArray(mergedData)) {
    // 			console.log("[initializeFormsFromLoadedComponent] inside of second if statement");
    // 			for (let i = 0; i < this.props.schema.length; i++) {
    // 				let schema = this.props.schema[i];
    // 				for (let y = 0; y < mergedData.length; y++) {
    // 					let inputData = mergedData[y];
    // 					console.log("inputData.ID", inputData.ID);
    // 					// let id = uuidv4();
    // 					// inputData.ID = id;
    // 					// === NEW LOGIC HERE ===
    // 					let id = (inputData.ID !== undefined && inputData.ID !== null && inputData.ID !== "") 
    //                     ? inputData.ID 
    //                     : uuidv4();
    //                 	inputData.ID = id; // Ensure the ID is set
    // 					inputDataIDs.push(id);
    // 					if (newActiveID === null) newActiveID = id;
    // 					if (inputData.Schema_ID === schema.ID) {
    // 						let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
    // 							currentChildrenComponents[id],
    // 							schema,
    // 							this.props.elementByType,
    // 							linkedFields,
    // 							inputDataIDs
    // 						);
    // 						let localPartialInputData =
    // 							MultiTabFormWithHeaderV3.transformInputData(
    // 								inputData,
    // 								partialSchema
    // 							);
    // 						partialInputData[id] = {
    // 							schemaTitle: schema.title,
    // 							data: localPartialInputData,
    // 							schema: partialSchema,
    // 							subCategoriesOrder: schema.subCategoriesOrder,
    // 						};
    // 						this.containerFormNames[id] = schema.title;
    // 					}
    // 				}
    // 			}
    // 		} else {
    // 		console.log("[initializeFormsFromLoadedComponent] inside of first else statement");
    // 		// 	console.log("[initializeFormsFromLoadedComponent] ** mergedData", mergedData);
    // 		// console.log("[initializeFormsFromLoadedComponent] ** this.props.inputData", this.props.inputData);
    // 		// console.log("[initializeFormsFromLoadedComponent] ** this.props.selectedLoadComponent", this.props.selectedLoadComponent);
    // 			//create case if 1 input but multiple schemas ?
    // 			let schema = this.props.schema;
    // 			let inputData = mergedData;
    // 			console.log("inputData.ID", inputData.ID);
    // 			//let id = inputData.ID;
    // 			// === NEW LOGIC HERE ===
    // 			let id = (inputData.ID !== undefined && inputData.ID !== null && inputData.ID !== "")
    //             ? inputData.ID
    //             : uuidv4();
    //         	inputData.ID = id; // Ensure the ID is set
    // 			inputDataIDs.push(id);
    // 			let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
    // 				currentChildrenComponents[id],
    // 				schema,
    // 				this.props.elementByType,
    // 				linkedFields,
    // 				inputDataIDs
    // 			);
    // 			let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(
    // 				inputData,
    // 				partialSchema
    // 			);
    // 			partialInputData[id] = {
    // 				schemaTitle: schema.title,
    // 				data: localPartialInputData,
    // 				schema: partialSchema,
    // 				subCategoriesOrder: schema.subCategoriesOrder,
    // 			};
    // 			this.containerFormNames[id] = schema.title;
    // 		}
    // 	}
    // 	for (let id in partialInputData) {
    // 		let localPartialInputData = partialInputData[id].data;
    // 		let partialSchema = partialInputData[id].schema;
    // 		let subCategoriesOrder = partialInputData[id].subCategoriesOrder;
    // 		let partialForms = this.createForms(
    // 			id,
    // 			subCategoriesOrder,
    // 			partialSchema,
    // 			localPartialInputData
    // 		);
    // 		this.forms[id] = partialForms;
    // 	}
    // 	if (Object.keys(this.state.partialInputData).length === 0) {
    // 		this.state.partialInputData = partialInputData;
    // 		this.state.activeID = newActiveID;
    // 		//this.forceUpdate();
    // 	} else {
    // 		this.forceUpdate();
    // 	}
    // }

  }, {
    key: "initializeForms",
    value: function initializeForms() {
      var linkedFields = this.state.linkedFields;
      var currentChildrenComponents = this.state.currentChildrenComponents;
      var newActiveID = this.state.activeID;
      var partialInputData = {};
      var inputDataIDs = [];

      if (this.props.inputData !== undefined && this.props.inputData !== null) {
        // console.log("[initializeForms] inside of first if statement");
        // console.log("[initializeForms] ** this.props.inputData", this.props.inputData);
        if (Array.isArray(this.props.inputData)) {
          console.log("[initializeForms] inside of second if statement");

          for (var i = 0; i < this.props.schema.length; i++) {
            var schema = this.props.schema[i];

            for (var y = 0; y < this.props.inputData.length; y++) {
              var inputData = this.props.inputData[y];
              var id = inputData.ID;
              console.log("inputData.ID", inputData.ID);
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
          console.log("[initializeForms] inside of first else statement"); // console.log("[initializeForms] ** this.props.inputData", this.props.inputData);
          //create case if 1 input but multiple schemas ?

          var _schema2 = this.props.schema;
          var _inputData2 = this.props.inputData;
          var _id3 = _inputData2.ID;
          console.log("inputData.ID", _inputData2.ID);
          inputDataIDs.push(_id3);

          var _partialSchema3 = MultiTabFormWithHeaderV3.transformSchema(currentChildrenComponents[_id3], _schema2, this.props.elementByType, linkedFields, inputDataIDs);

          var _localPartialInputData3 = MultiTabFormWithHeaderV3.transformInputData(_inputData2, _partialSchema3);

          partialInputData[_id3] = {
            schemaTitle: _schema2.title,
            data: _localPartialInputData3,
            schema: _partialSchema3,
            subCategoriesOrder: _schema2.subCategoriesOrder
          };
          this.containerFormNames[_id3] = _schema2.title;
        }
      }

      for (var _id4 in partialInputData) {
        var _localPartialInputData4 = partialInputData[_id4].data;
        var _partialSchema4 = partialInputData[_id4].schema;
        var subCategoriesOrder = partialInputData[_id4].subCategoriesOrder;
        var partialForms = this.createForms(_id4, subCategoriesOrder, _partialSchema4, _localPartialInputData4);
        this.forms[_id4] = partialForms;
      }

      if (Object.keys(this.state.partialInputData).length === 0) {
        this.state.partialInputData = partialInputData;
        this.state.activeID = newActiveID; //this.forceUpdate();
      } else {
        this.forceUpdate();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (prevProps.inputData === null || prevProps.inputData === undefined || this.props.inputData !== prevProps.inputData) {
        var activeID = null;

        if (Array.isArray(this.props.inputData)) {
          var inputData = this.props.inputData[0];
          activeID = inputData.ID;
        } else {
          var _inputData3 = this.props.inputData;
          activeID = _inputData3.ID;
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
          // console.log("[componentDidUpdate] in if condition");
          if (this.props.currentChildrenComponentIdentifier !== null && this.props.minChildrenComponentIdentifier !== null && this.props.maxChildrenComponentIdentifier !== null) {
            var _loop2 = function _loop2(y) {
              var inputData = _this2.props.inputData[y];
              var id = inputData.ID;

              if (_this2.state.minChildrenComponents[id] === undefined || _this2.state.minChildrenComponents[id] === null) {
                _this2.state.minChildrenComponents[id] = {};
              }

              if (_this2.state.maxChildrenComponents[id] === undefined || _this2.state.maxChildrenComponents[id] === null) {
                _this2.state.maxChildrenComponents[id] = {};
              }

              if (_this2.state.currentChildrenComponents[id] === undefined || _this2.state.currentChildrenComponents[id] === null) {
                _this2.state.currentChildrenComponents[id] = {};
              }

              Object.keys(inputData).forEach(function (key) {
                if (key.includes(_this2.props.minChildrenComponentIdentifier)) {
                  var name = key.replace(_this2.props.minChildrenComponentIdentifier, "");
                  _this2.state.minChildrenComponents[id][name] = inputData[key];
                } else if (key.includes(_this2.props.maxChildrenComponentIdentifier)) {
                  var _name5 = key.replace(_this2.props.maxChildrenComponentIdentifier, "");

                  _this2.state.maxChildrenComponents[id][_name5] = inputData[key];
                } else if (key.includes(_this2.props.currentChildrenComponentIdentifier)) {
                  var _name6 = key.replace(_this2.props.currentChildrenComponentIdentifier, "");

                  _this2.state.currentChildrenComponents[id][_name6] = inputData[key];
                }
              });
            };

            for (var y = 0; y < this.props.inputData.length; y++) {
              _loop2(y);
            }
          }
        } else {
          // console.log("[componentDidUpdate] in else condition");
          if (this.props.currentChildrenComponentIdentifier !== null && this.props.minChildrenComponentIdentifier !== null && this.props.maxChildrenComponentIdentifier !== null) {
            var _inputData4 = this.props.inputData;
            var id = _inputData4.ID;

            if (this.state.minChildrenComponents[id] === undefined || this.state.minChildrenComponents[id] === null) {
              this.state.minChildrenComponents[id] = {};
            }

            if (this.state.maxChildrenComponents[id] === undefined || this.state.maxChildrenComponents[id] === null) {
              this.state.maxChildrenComponents[id] = {};
            }

            if (this.state.currentChildrenComponents[id] === undefined || this.state.currentChildrenComponents[id] === null) {
              this.state.currentChildrenComponents[id] = {};
            }

            Object.keys(_inputData4).forEach(function (key) {
              if (key.includes(_this2.props.minChildrenComponentIdentifier)) {
                var name = key.replace(_this2.props.minChildrenComponentIdentifier, "");
                _this2.state.minChildrenComponents[id][name] = _inputData4[key];
              } else if (key.includes(_this2.props.maxChildrenComponentIdentifier)) {
                var _name7 = key.replace(_this2.props.maxChildrenComponentIdentifier, "");

                _this2.state.maxChildrenComponents[id][_name7] = _inputData4[key];
              } else if (key.includes(_this2.props.currentChildrenComponentIdentifier)) {
                var _name8 = key.replace(_this2.props.currentChildrenComponentIdentifier, "");

                _this2.state.currentChildrenComponents[id][_name8] = _inputData4[key];
              }
            });
          }
        }

        this.initializeForms();
      }
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(data) {
      if (!this.action) {
        console.error("No action set before onSubmit call.");
        return;
      }

      var action = this.action;
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

          linkedFields[key].value = linkedFieldsValues;
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
      this.processData(action);
    }
  }, {
    key: "onError",
    value: function onError(errors) {
      var localForms = this.formRefs; //localForms is a reference to all the forms we are currently using

      var index = -1;
      var id = -1;
      if (this.props.isDebug) console.log("multi tab form onError - find form");

      for (var currentID in localForms) {
        var forms = localForms[currentID];

        for (var i = 0; i < forms.length; i++) {
          var ref = forms[i];

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
      var currentData = [];
      var currentErrors = [];
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
  }, {
    key: "processData",
    value: function processData(action) {
      var _this3 = this;

      console.log("~~~~ in processData and this is props.schema", this.props.schema);
      console.log("~~~~ in processData and this is this.props.inputData", this.props.inputData);
      console.log("~~~~ in processData and this is this.props.selectedLoadComponent", this.props.selectedLoadComponent);
      var partialInputData = this.state.partialInputData;
      var localData = this.data;
      var localForms = this.formRefs;
      var partialConsolidatedData = {};

      var _loop3 = function _loop3(currentID) {
        var forms = localForms[currentID];
        var currentData = localData[currentID];
        var numberOfForms = forms.length;

        if (!(0, _genericUtilities.isDefined)(currentData) || currentData.length < numberOfForms || currentData.includes(null)) {
          return {
            v: void 0
          };
        }

        var localConsolidatedData = _this3.transformOutputData(currentData);

        var currentChildrenComponents = _this3.state.currentChildrenComponents[currentID];

        if (currentChildrenComponents !== null && currentChildrenComponents !== undefined) {
          var attrName = _this3.props.currentChildrenComponentIdentifier;
          Object.keys(currentChildrenComponents).forEach(function (key) {
            var attr = attrName + key;
            localConsolidatedData[attr] = currentChildrenComponents[key];
          });
        }

        partialConsolidatedData[currentID] = localConsolidatedData;
      };

      for (var currentID in localForms) {
        var _ret = _loop3(currentID);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      if (this.props.notModal) {
        this.props.onConfirm(this.props.id);
        return;
      }

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
      }

      var linkedFields = Object.assign({}, this.state.linkedFields);
      console.log("in processData function and this is this.props.id", this.props.id);

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
        }, function () {
          if (_this3.state.isValidated) {
            window.alert(_constants.save_success_window_message);
          }
        });
      }
    }
  }, {
    key: "processErrors",
    value: function processErrors() {
      var localForms = this.formRefs;
      if (this.props.notModal) return;
      if (this.props.isDebug) console.log("multi tab form processErrors - error process");

      for (var currentID in localForms) {
        var forms = localForms[currentID];
        var currentErrors = this.errors[currentID];
        var numberOfForms = forms.length;

        if (!(0, _genericUtilities.isDefined)(currentErrors) //  ||currentErrors.length < numberOfForms
        ) {
          if (this.props.isDebug) console.log("multi tab form processErrors - data not found");
          return;
        } //this for loop activates the tab where the first error is found


        for (var i = 0; i < currentErrors.length; i++) {
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
    key: "handleAction",
    value: function handleAction(action) {
      var _this4 = this;

      if ((action === "save" || action === "saveSpecific") && !this.state.isValidated) {
        window.alert(_constants.save_non_validation_warning_message);
        return;
      }

      this.data = {};
      this.errors = {};
      this.action = action;
      Object.entries(this.formRefs).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            forms = _ref2[1];

        var buttons = _this4.buttonsRefs[id];
        forms.forEach(function (refForm, i) {
          refForm.formElement.dispatchEvent(new CustomEvent("submit", {
            bubbles: true,
            cancelable: true
          }));
        });
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      this.handleAction("confirm");
    }
  }, {
    key: "onValidate",
    value: function onValidate() {
      this.handleAction("validate");
    }
  }, {
    key: "onSave",
    value: function onSave() {
      this.handleAction("save");
    }
  }, {
    key: "onSaveSpecific",
    value: function onSaveSpecific() {
      this.handleAction("saveSpecific");
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      this.props.onLoad();
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
      var _this5 = this;

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

          if (!_this5.props.editable) {
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
        onChange: this.handleChange,
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
        type: "submit",
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
      var _this6 = this;

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

        var form = _this6.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], index, currentFormRefs, currentButtonsRefs);

        currentForms.push(form);
      });
      var schemaKeys = Object.keys(partialSchema);

      var _loop4 = function _loop4(i) {
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

        var form = _this6.createForm(partialSchema[key], partialUISchema[key], partialInputData[key], -1, currentFormRefs, currentButtonsRefs);

        currentForms.push(form);
      };

      for (var i = 0; i < schemaKeys.length; i++) {
        var _ret2 = _loop4(i);

        if (_ret2 === "continue") continue;
      }

      this.buttonsRefs[id] = currentButtonsRefs;
      this.formNames[id] = currentFormNames;
      this.formRefs[id] = currentFormRefs;
      return currentForms;
    } //onContainerTabChange(key) {

  }, {
    key: "onContainerTabChange",
    value: function onContainerTabChange(key, prevKey, evt) {
      var id = Object.keys(this.forms)[key];
      this.setState({
        activeID: id,
        activeKey: 0 //"0",

      });
    } //onTabChange(key) {

  }, {
    key: "onTabChange",
    value: function onTabChange(key, prevKey, evt) {
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
    } // resolve(from, to) {
    // 	const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
    // 	if (resolvedUrl.protocol === 'resolve:') {
    // 	  // `from` is a relative URL.
    // 	  const { pathname, search, hash } = resolvedUrl;
    // 	  return pathname + search + hash;
    // 	}
    // 	return resolvedUrl.toString();
    // }

  }, {
    key: "createChildrenComponentsButton",
    value: function createChildrenComponentsButton(id) {
      var _this7 = this;

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
            return _this7.onClickRemoveChildComponent(id, key);
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
            return _this7.onClickAddChildComponent(id, key);
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
      var _ComponentLibraryButt, _CreateNewButton;

      var button = {
        width: "250px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var ComponentLibraryButton = (_ComponentLibraryButt = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "150px",
        marginRight: "5px"
      }, _defineProperty(_ComponentLibraryButt, "width", "100%"), _defineProperty(_ComponentLibraryButt, "height", "36px"), _defineProperty(_ComponentLibraryButt, "fontSize", "16px"), _defineProperty(_ComponentLibraryButt, "fontWeight", 500), _defineProperty(_ComponentLibraryButt, "backgroundColor", "#F6F6F6"), _defineProperty(_ComponentLibraryButt, "color", "#212121"), _defineProperty(_ComponentLibraryButt, "borderColor", "#bab8b8"), _ComponentLibraryButt);
      var CreateNewButton = (_CreateNewButton = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "150px",
        marginRight: "5px"
      }, _defineProperty(_CreateNewButton, "width", "100%"), _defineProperty(_CreateNewButton, "height", "36px"), _defineProperty(_CreateNewButton, "fontSize", "16px"), _defineProperty(_CreateNewButton, "fontWeight", 500), _defineProperty(_CreateNewButton, "backgroundColor", "#4099AB"), _defineProperty(_CreateNewButton, "color", "#FFFFFF"), _defineProperty(_CreateNewButton, "borderColor", "#5d8f99"), _CreateNewButton);
      var ValidateButton = {
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
        paddingLeft: "20px",
        borderRadius: "8px",
        gap: "8px"
      };
      var SaveChangesButton = {
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
      var CancelButton = {
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
      var button2 = {
        width: "510px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var containerStyle = {
        display: "flex",
        flexDirection: "column"
      };
      var headerContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        height: "40px",
        width: "100%"
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
      var buttonContainerRowModal = {
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "space-between",
        marginBottom: "5px",
        width: "100%"
      };
      var topButtonContainer = {
        display: "flex",
        flexDirection: "row",
        //flexWrap: "wrap",
        justifyContent: "flex-end",
        marginBottom: "5px"
      };
      var styleValidation = {
        display: "inline-block",
        position: "relative",
        marginLeft: "10px",
        fontWeight: "bold",
        textAlign: "center"
      };
      var styleImageIcon = {
        width: "17px",
        height: "17px",
        marginRight: "10px"
      };
      var validated = null;

      if (this.state.isValidated) {
        var styleValidated = Object.assign({}, styleValidation, {
          color: "green"
        });
        validated = /*#__PURE__*/_react.default.createElement("div", {
          style: styleValidated
        }, "\u25CF");
      } else {
        var _styleValidated = Object.assign({}, styleValidation, {
          color: "red"
        });

        validated = /*#__PURE__*/_react.default.createElement("div", {
          style: _styleValidated
        }, "\u25CF");
      }

      var currentChildrenComponents = this.state.currentChildrenComponents;
      var minChildrenComponents = this.state.minChildrenComponents;
      var maxChildrenComponents = this.state.maxChildrenComponents;
      var showForm = this.state.showForm;
      var hasEditableChildren = [];
      var containerNames = this.containerFormNames;
      var names = this.formNames;
      var forms = this.forms;
      var saveImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_save_img);
      var saveImgPath = saveImgPath_tmp + (saveImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var globeImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_globe_solid_img);
      var globeImgPath = globeImgPath_tmp + (globeImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var plusImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_plus_solid_img);
      var plusImgPath = plusImgPath_tmp + (globeImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

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

      var tabNames = {};
      var tabs = {};

      for (var _id5 in forms) {
        var currentForms = forms[_id5];
        var currentNames = names[_id5];
        tabNames[_id5] = [];
        tabs[_id5] = [];

        for (var index in currentForms) {
          var item = currentForms[index];

          tabNames[_id5].push( /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
            key: "ContainerTabName-" + currentNames[index]
          }, currentNames[index]));

          tabs[_id5].push( /*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, {
            key: "ContainerTab-" + currentNames[index],
            forceRender: true
          }, item));
        }
      } // let title = "Selected Hardware";
      // if (this.props.schema !== null) {
      // 	title = this.props.schema.title;
      // }


      var buttons = [];
      var topButtons = [];
      var validateTooltip = _constants.component_validate;
      var saveTemplateTooltip = _constants.component_template_save;
      var saveSpecificTooltip = _constants.component_specific_save;

      if (!this.props.notModal) {
        buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
        var text = "Save Changes";
        if (this.props.notModal && this.props.onConfirm !== null) text = "Add";
        buttons.push( /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
          }
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-cancel",
          style: CancelButton,
          size: "lg",
          onClick: this.onCancel
        }, "Cancel"), /*#__PURE__*/_react.default.createElement(_Button.default, {
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
        }), text))));
      }

      if (!this.props.notModal) {
        topButtons.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-load",
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
        }, "Component Library"))));
        topButtons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          position: saveTemplateTooltip.position,
          title: saveTemplateTooltip.title,
          content: saveTemplateTooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "button-save",
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
          }, "Create template")))
        }));
        topButtons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          position: saveSpecificTooltip.position,
          title: saveSpecificTooltip.title,
          content: saveSpecificTooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "button-save",
            style: CreateNewButton,
            size: "lg",
            onClick: this.onSaveSpecific
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
          }, "Save component")))
        }));
      } // if (!this.props.notModal) {
      // 	topButtons.push(
      // 		<PopoverTooltip
      // 			position={saveTemplateTooltip.position}
      // 			title={saveTemplateTooltip.title}
      // 			content={saveTemplateTooltip.content}
      // 			element={
      // 				<Button
      // 					key="button-save"
      // 					style={CreateNewButton}
      // 					size="lg"
      // 					onClick={this.onSave}
      // 					>
      // 					<div
      // 						style={{
      // 						display: "flex",
      // 						justifyContent: "center",
      // 						alignItems: "center",
      // 						paddingLeft: "2px",
      // 						paddingRight: "2px",
      // 						}}
      // 					>
      // 						<img src={plusImgPath} alt="Plus Icon" style={styleImageIcon} />
      // 						<span style={{ display: "flex", alignItems: "center" }}>
      // 						Create template
      // 						</span>
      // 					</div>
      // 				</Button>
      // 			}
      // 		/>
      // 	);
      // }


      var containerFormNames = [];
      var containerForms = [];

      for (var _id6 in forms) {
        var editChildrenCompButton = null;
        if (hasEditableChildren[_id6] && !this.props.notModal) editChildrenCompButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "button-addremove",
          style: button2,
          size: "lg",
          variant: !hasEditableChildren[_id6] ? "secondary" : "primary",
          onClick: !hasEditableChildren[_id6] ? null : this.onEditComponents,
          disabled: !hasEditableChildren[_id6]
        }, "Add/Remove wavelength range or sub-component");
        var localTabs = tabs[_id6];
        var localTabNames = tabNames[_id6]; //let index = Object.keys(forms).indexOf(id);
        //<h3>{containerNames[id]}</h3>
        //<TabPane tab={containerNames[id]} key={index} forceRender={true}>
        //</TabPane>

        containerFormNames.push( /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
          key: "ContainerTabName-" + containerNames[_id6]
        }, containerNames[_id6]));
        containerForms.push( /*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, {
          forceRender: true,
          key: "ContainerTab-" + containerNames[_id6]
        }, /*#__PURE__*/_react.default.createElement("p", null, hasEditableChildren[_id6] ? _constants.string_bandpass_warning : ""), /*#__PURE__*/_react.default.createElement(_reactTabs.Tabs // tabPosition={"top"}
        // tabBarStyle={{
        // 	border: "none",
        // }}
        //tabBarGutter={10}
        //onChange={this.onTabChange}
        , {
          onSelect: this.onTabChange //animated={true}
          //style={{ border: "none" }}
          // renderTabBar={() => <ScrollableTabBar />}
          // renderTabContent={() => <TabContent animated />}
          //activeKey={this.state.activeKey}
          ,
          selectedIndex: this.state.activeKey
        }, /*#__PURE__*/_react.default.createElement(_reactTabs.TabList, null, localTabNames), localTabs), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerRow
        }, editChildrenCompButton)));
      } //let containerIndex = this.state.activeID;


      var containerIndex = Object.keys(forms).indexOf(this.state.activeID); //let activeContainerKey = `${containerIndex}`;

      var form = /*#__PURE__*/_react.default.createElement("div", {
        style: containerStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: headerContainerStyle
      }, /*#__PURE__*/_react.default.createElement("h3", null, this.props.title), /*#__PURE__*/_react.default.createElement("div", {
        style: topButtonContainer
      }, topButtons)), /*#__PURE__*/_react.default.createElement(_reactTabs.Tabs // tabPosition={"top"}
      // tabBarStyle={{
      // 	border: "none",
      // }}
      // tabBarGutter={10}
      //onChange={this.onContainerTabChange}
      , {
        onSelect: this.onContainerTabChange //animated={true}
        //style={{ border: "none" }}
        // renderTabBar={() => <ScrollableTabBar />}
        // renderTabContent={() => <TabContent animated />}
        //activeKey={activeContainerKey}
        ,
        selectedIndex: containerIndex
      }, /*#__PURE__*/_react.default.createElement(_reactTabs.TabList, null, containerFormNames), containerForms), /*#__PURE__*/_react.default.createElement("div", {
        style: buttonContainerRowModal
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

        var newProperty = Object.assign({}, property);

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
          }

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