import React from "react";
import Form from "@rjsf/bootstrap-4";
//import Tabs, { TabPane } from "rc-tabs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import TabContent from "rc-tabs/lib/TabContent";
// import ScrollableTabBar from "rc-tabs/lib/";
//import "rc-tabs/assets/index.css"
import Button from "react-bootstrap/Button";
import ModalWindow from "./modalWindow";
import { isDefined } from "../genericUtilities";
import { v4 as uuidv4 } from "uuid";

//const url = require("url");

import {
	load_component_tooltip,
	string_na,
	string_not_assigned,
	string_default,
	string_enum,
	string_enumNames,
	string_object,
	string_array,
	string_bandpass_warning,
	save_component_tooltip,
	string_globe_solid_img,
	string_plus_solid_img,
	string_floppy_disk_solid_img,
} from "../constants";

export default class MultiTabFormWithHeaderV3 extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showForm: true,
			linkedFields: {},
			currentChildrenComponents: {},
			minChildrenComponents: {},
			maxChildrenComponents: {},
			activeID: null,
			activeKey: 0, //"0",
			partialInputData: {},
			isValidated: false,
		};

		if (
			props.inputData !== null &&
			props.currentChildrenComponentIdentifier !== null &&
			props.minChildrenComponentIdentifier !== null &&
			props.maxChildrenComponentIdentifier !== null
		) {
			if (Array.isArray(props.inputData)) {
				for (let y = 0; y < props.inputData.length; y++) {
					let inputData = props.inputData[y];
					let id = inputData.ID;
					if (
						this.state.minChildrenComponents[id] === undefined ||
						this.state.minChildrenComponents[id] === null
					) {
						this.state.minChildrenComponents[id] = {};
					}
					if (
						this.state.maxChildrenComponents[id] === undefined ||
						this.state.maxChildrenComponents[id] === null
					) {
						this.state.maxChildrenComponents[id] = {};
					}
					if (
						this.state.currentChildrenComponents[id] === undefined ||
						this.state.currentChildrenComponents[id] === null
					) {
						this.state.currentChildrenComponents[id] = {};
					}
					if (this.state.activeID === null) this.state.activeID = id;

					Object.keys(inputData).forEach((key) => {
						if (key.includes(props.minChildrenComponentIdentifier)) {
							let name = key.replace(props.minChildrenComponentIdentifier, "");
							this.state.minChildrenComponents[id][name] = inputData[key];
						} else if (key.includes(props.maxChildrenComponentIdentifier)) {
							let name = key.replace(props.maxChildrenComponentIdentifier, "");
							this.state.maxChildrenComponents[id][name] = inputData[key];
						} else if (key.includes(props.currentChildrenComponentIdentifier)) {
							let name = key.replace(
								props.currentChildrenComponentIdentifier,
								""
							);
							this.state.currentChildrenComponents[id][name] = inputData[key];
						}
					});
				}
			} else {
				let inputData = props.inputData;
				let id = inputData.ID;
				if (this.state.activeID === null) this.state.activeID = id;
				if (
					this.state.minChildrenComponents[id] === undefined ||
					this.state.minChildrenComponents[id] === null
				) {
					this.state.minChildrenComponents[id] = {};
				}
				if (
					this.state.maxChildrenComponents[id] === undefined ||
					this.state.maxChildrenComponents[id] === null
				) {
					this.state.maxChildrenComponents[id] = {};
				}
				if (
					this.state.currentChildrenComponents[id] === undefined ||
					this.state.currentChildrenComponents[id] === null
				) {
					this.state.currentChildrenComponents[id] = {};
				}

				Object.keys(inputData).forEach((key) => {
					if (key.includes(props.minChildrenComponentIdentifier)) {
						let name = key.replace(props.minChildrenComponentIdentifier, "");
						this.state.minChildrenComponents[id][name] = inputData[key];
					} else if (key.includes(props.maxChildrenComponentIdentifier)) {
						let name = key.replace(props.maxChildrenComponentIdentifier, "");
						this.state.maxChildrenComponents[id][name] = inputData[key];
					} else if (key.includes(props.currentChildrenComponentIdentifier)) {
						let name = key.replace(
							props.currentChildrenComponentIdentifier,
							""
						);
						this.state.currentChildrenComponents[id][name] = inputData[key];
					}
				});
			}
		}
		
		//this.formDescs = [];
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
		this.onLoad = this.onLoad.bind(this);
		this.onValidate = this.onValidate.bind(this);
		//this.resolve = this.resolve.bind(this);

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
		this.createChildrenComponentsButton =
			this.createChildrenComponentsButton.bind(this);
		this.onClickAddChildComponent = this.onClickAddChildComponent.bind(this);
		this.onClickRemoveChildComponent =
			this.onClickRemoveChildComponent.bind(this);

		this.initializeForms = this.initializeForms.bind(this);

		console.log("props.schema in constructor of multitab", props.schema);
		console.log("props.inputData in constructor of multitab", props.inputData);

		if (props.schema !== null &&
			props.schema !== undefined &&
			props.selectedLoadComponent !== null &&
			Object.keys(this.state.partialInputData).length === 0) {
			console.log("calling initializeFormsFromLoadedComponent from constructor");
			this.initializeFormsFromLoadedComponent();
		}
		else if (
			props.schema !== null &&
			props.schema !== undefined &&
			Object.keys(this.state.partialInputData).length === 0
		) {
			this.initializeForms();
		}

	}

	// componentDidUpdate(prevProps) {
	// 	console.log("in componentDidUpdate function");
	// 	if (this.props.inputData !== prevProps.inputData) {
	// 		this.initializeForms();
	// 	}
	// }

	initializeFormsFromLoadedComponent() {
		if (this.props.isDebug) console.log("inside of initializeFormsFromLoadedComponent");
		//console.log("this.props.selectedLoadComponent", this.props.selectedLoadComponent);

		let counter = 0;
		let linkedFields = this.state.linkedFields;
		let currentChildrenComponents = this.state.currentChildrenComponents;
		let newActiveID = this.state.activeID;
		let partialInputData = {};
		let inputDataIDs = [];
		const mergedData = {
			...this.props.inputData, // Existing input data
			...this.props.selectedLoadComponent // Override with loaded component data
		};
		//console.log("mergedData in initializeFormsFromLoadedComponent()", mergedData);

		if (mergedData !== undefined && mergedData !== null) {
			if (Array.isArray(mergedData)) {
				console.log("this.props.inputData in initializeFormsFromLoadedComponent()", this.props.inputData);
				console.log("this.props.schema in initializeFormsFromLoadedComponent()", this.props.schema);
				for (let i = 0; i < this.props.schema.length; i++) {
					let schema = this.props.schema[i];
					for (let y = 0; y < mergedData.length; y++) {
						let inputData = mergedData[y];
						// let id = inputData.ID;
						let id = uuidv4();
						inputData.ID = id;
						inputDataIDs.push(id);
						if (newActiveID === null) newActiveID = id;
						if (inputData.Schema_ID === schema.ID) {
							let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
								currentChildrenComponents[id],
								schema,
								this.props.elementByType,
								linkedFields,
								inputDataIDs
							);
							let localPartialInputData =
								MultiTabFormWithHeaderV3.transformInputData(
									inputData,
									partialSchema
								);
							partialInputData[id] = {
								schemaTitle: schema.title,
								data: localPartialInputData,
								schema: partialSchema,
								subCategoriesOrder: schema.subCategoriesOrder,
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
				let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
					currentChildrenComponents[id],
					schema,
					this.props.elementByType,
					linkedFields,
					inputDataIDs
				);
				let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(
					inputData,
					partialSchema
				);
				partialInputData[id] = {
					schemaTitle: schema.title,
					data: localPartialInputData,
					schema: partialSchema,
					subCategoriesOrder: schema.subCategoriesOrder,
				};
				this.containerFormNames[id] = schema.title;
			}
		}

		for (let id in partialInputData) {
			let localPartialInputData = partialInputData[id].data;
			let partialSchema = partialInputData[id].schema;
			let subCategoriesOrder = partialInputData[id].subCategoriesOrder;

			let partialForms = this.createForms(
				id,
				subCategoriesOrder,
				partialSchema,
				localPartialInputData
			);
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
		if (this.props.isDebug) console.log("inside of INITIALIZE FORMS");
		let linkedFields = this.state.linkedFields;
		let currentChildrenComponents = this.state.currentChildrenComponents;
		let newActiveID = this.state.activeID;
		let partialInputData = {};
		let inputDataIDs = [];

		if (this.props.inputData !== undefined && this.props.inputData !== null) {
			if (Array.isArray(this.props.inputData)) {
				//console.log("this.props.inputData in initializeForms()", this.props.inputData);
				//console.log("this.props.schema in initializeForms()", this.props.schema);
				for (let i = 0; i < this.props.schema.length; i++) {
					let schema = this.props.schema[i];
					for (let y = 0; y < this.props.inputData.length; y++) {
						let inputData = this.props.inputData[y];
						console.log("inputData.ID", inputData.ID);
						let id = inputData.ID;
						inputDataIDs.push(id);
						if (newActiveID === null) newActiveID = id;
						if (inputData.Schema_ID === schema.ID) {
							let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
								currentChildrenComponents[id],
								schema,
								this.props.elementByType,
								linkedFields,
								inputDataIDs
							);
							let localPartialInputData =
								MultiTabFormWithHeaderV3.transformInputData(
									inputData,
									partialSchema
								);
							partialInputData[id] = {
								schemaTitle: schema.title,
								data: localPartialInputData,
								schema: partialSchema,
								subCategoriesOrder: schema.subCategoriesOrder,
							};
							this.containerFormNames[id] = schema.title;
						}
					}
				}
			} else {
				//create case if 1 input but multiple schemas ?
				let schema = this.props.schema;
				let inputData = this.props.inputData;
				//console.log("!!!!!inputData in else", inputData);
				let id = inputData.ID;
				inputDataIDs.push(id);
				let partialSchema = MultiTabFormWithHeaderV3.transformSchema(
					currentChildrenComponents[id],
					schema,
					this.props.elementByType,
					linkedFields,
					inputDataIDs
				);
				let localPartialInputData = MultiTabFormWithHeaderV3.transformInputData(
					inputData,
					partialSchema
				);
				partialInputData[id] = {
					schemaTitle: schema.title,
					data: localPartialInputData,
					schema: partialSchema,
					subCategoriesOrder: schema.subCategoriesOrder,
				};
				this.containerFormNames[id] = schema.title;
			}
		}

		for (let id in partialInputData) {
			console.log("id", id);
			let localPartialInputData = partialInputData[id].data;
			let partialSchema = partialInputData[id].schema;
			let subCategoriesOrder = partialInputData[id].subCategoriesOrder;

			// console.log(`subCategoriesOrder for component ID ${id}:`, subCategoriesOrder);
			// console.log(`partialSchema for component ID ${id}:`, partialSchema);
			// console.log(`localPartialInputData for component ID ${id}:`, localPartialInputData);
			let partialForms = this.createForms(
				id,
				subCategoriesOrder,
				partialSchema,
				localPartialInputData
			);
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
		if (
			prevProps.inputData === null ||
			prevProps.inputData === undefined ||
			this.props.inputData !== prevProps.inputData
		) {
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
				if (
					this.props.currentChildrenComponentIdentifier !== null &&
					this.props.minChildrenComponentIdentifier !== null &&
					this.props.maxChildrenComponentIdentifier !== null
				) {
					for (let y = 0; y < this.props.inputData.length; y++) {
						let inputData = this.props.inputData[y];
						let id = inputData.ID;
						if (
							this.state.minChildrenComponents[id] === undefined ||
							this.state.minChildrenComponents[id] === null
						) {
							this.state.minChildrenComponents[id] = {};
						}
						if (
							this.state.maxChildrenComponents[id] === undefined ||
							this.state.maxChildrenComponents[id] === null
						) {
							this.state.maxChildrenComponents[id] = {};
						}
						if (
							this.state.currentChildrenComponents[id] === undefined ||
							this.state.currentChildrenComponents[id] === null
						) {
							this.state.currentChildrenComponents[id] = {};
						}

						//console.log("inputData");
						//console.log(inputData);

						Object.keys(inputData).forEach((key) => {
							if (key.includes(this.props.minChildrenComponentIdentifier)) {
								let name = key.replace(
									this.props.minChildrenComponentIdentifier,
									""
								);
								this.state.minChildrenComponents[id][name] = inputData[key];
							} else if (
								key.includes(this.props.maxChildrenComponentIdentifier)
							) {
								let name = key.replace(
									this.props.maxChildrenComponentIdentifier,
									""
								);
								this.state.maxChildrenComponents[id][name] = inputData[key];
							} else if (
								key.includes(this.props.currentChildrenComponentIdentifier)
							) {
								let name = key.replace(
									this.props.currentChildrenComponentIdentifier,
									""
								);
								this.state.currentChildrenComponents[id][name] = inputData[key];
							}
						});
					}
				}
			} else {
				if (
					this.props.currentChildrenComponentIdentifier !== null &&
					this.props.minChildrenComponentIdentifier !== null &&
					this.props.maxChildrenComponentIdentifier !== null
				) {
					let inputData = this.props.inputData;
					let id = inputData.ID;
					if (
						this.state.minChildrenComponents[id] === undefined ||
						this.state.minChildrenComponents[id] === null
					) {
						this.state.minChildrenComponents[id] = {};
					}
					if (
						this.state.maxChildrenComponents[id] === undefined ||
						this.state.maxChildrenComponents[id] === null
					) {
						this.state.maxChildrenComponents[id] = {};
					}
					if (
						this.state.currentChildrenComponents[id] === undefined ||
						this.state.currentChildrenComponents[id] === null
					) {
						this.state.currentChildrenComponents[id] = {};
					}

					Object.keys(inputData).forEach((key) => {
						if (key.includes(this.props.minChildrenComponentIdentifier)) {
							let name = key.replace(
								this.props.minChildrenComponentIdentifier,
								""
							);
							this.state.minChildrenComponents[id][name] = inputData[key];
						} else if (
							key.includes(this.props.maxChildrenComponentIdentifier)
						) {
							let name = key.replace(
								this.props.maxChildrenComponentIdentifier,
								""
							);
							this.state.maxChildrenComponents[id][name] = inputData[key];
						} else if (
							key.includes(this.props.currentChildrenComponentIdentifier)
						) {
							let name = key.replace(
								this.props.currentChildrenComponentIdentifier,
								""
							);
							this.state.currentChildrenComponents[id][name] = inputData[key];
						}
					});
				}
			}
			//if (this.props.isDebug) console.log("calling INITIALIZE FORMS 2");
			this.initializeForms();
		}
	}

	handleChange = () => {
		this.setState({ isValidated: false });
	};

	onSubmit(data) {
		if (!this.action) {
			console.error("No action set before onSubmit call.");
			return;
		}

		let action = this.action;
		let localForms = this.formRefs;
		let index = -1;
		let id = -1;
		if (this.props.isDebug) console.log("multi tab form onSubmit - find form");
		for (let currentID in localForms) {
			let forms = localForms[currentID];
			for (let i = 0; i < forms.length; i++) {
				let ref = forms[i];
				if (ref.state.formData === data.formData) {		//**** the level above is formData is what is being passed to onSubmit, I think we need to pass ref.state to onSubmit function and not ref.state.formData
					index = i;
					id = currentID;
					break;
				}
			}
		}

		if (this.props.isDebug)
			console.log("multi tab form onSubmit - find linked field");

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
		this.setState({ linkedFields: linkedFields });

		if (this.props.isDebug)
			console.log("multi tab form onSubmit - process data");
		let currentData = [];
		let currentErrors = [];
		if (this.data[id] !== null && this.data[id] !== undefined)
			currentData = this.data[id].slice();
		if (this.errors[id] !== null && this.errors[id] !== undefined)
			currentErrors = this.errors[id].slice();
		currentData.splice(index, 0, data);  
		currentErrors.splice(index, 0, null);
		this.data[id] = currentData;
		this.errors[id] = currentErrors;
		console.log("in onSubmit and calling processData");
		this.processData(action);
	}

	onError(errors) {
		console.log("this is the errors passed to onError: ", errors);

		let localForms = this.formRefs;  //localForms is a reference to all the forms we are currently using
		let index = -1;
		let id = -1;
		if (this.props.isDebug) console.log("multi tab form onError - find form");
		for (let currentID in localForms) {
			let forms = localForms[currentID];
			for (let i = 0; i < forms.length; i++) {
				let ref = forms[i];
				if (ref.state.errors === errors) {  
					////////// check if the error in the state is the same as the error we are getting as a parameter in the function. (if error in parameter is the same as error in the form)
					if (this.action === "confirm") {
						this.action = this.action + "OnError";
						if (this.props.isDebug) console.log("Confirm action detected. Calling onSubmit inside of onError function despite errors.");
						this.onSubmit(ref.state);
					} else if (this.action === "confirmOnError") {
						if (this.props.isDebug) console.log("ConfirmOnError action detected. Calling onSubmit inside of onError function despite errors.");
						this.onSubmit(ref.state);
					} else {
						index = i;
						id = currentID;
						break;
					}
				}
			}
		}

		if (this.props.isDebug)
			console.log("multi tab form onError - process error");
		let currentData = [];
		let currentErrors = [];
		if (this.data[id] !== null && this.data[id] !== undefined)
			currentData = this.data[id].slice();
		if (this.errors[id] !== null && this.errors[id] !== undefined) {
			currentErrors = this.errors[id].slice();
		}
		currentData.splice(index, 0, null);
		currentErrors.splice(index, 0, errors);
		this.data[id] = currentData;
		this.errors[id] = currentErrors;

		if (this.action === "confirm") {
			if (this.props.isDebug) console.log("Confirm action detected. Processing data despite errors.");
			this.processData(this.action);
		} else if (this.action === "confirmOnError") {
			if (this.props.isDebug) console.log("CONFIRMONERROR CALLING PROCESSDATA");
			this.processData(this.action);
		} else {
			this.processErrors();
		}
	}

	processData(action) {
		if (this.props.isDebug) console.log("inside of processData function");
		if (this.props.isDebug) console.log("this is the action: " + action);

		let partialInputData = this.state.partialInputData;
		let localData = this.data;
		let localForms = this.formRefs;
		let partialConsolidatedData = {};

		if (this.props.isDebug)
			console.log("multi tab form processData - data process");
		for (let currentID in localForms) {
			let forms = localForms[currentID];
			let currentData = localData[currentID];
			let numberOfForms = forms.length;

			if (!isDefined(currentData) || currentData.length < numberOfForms || currentData.includes(null)) {
				if (this.props.isDebug) console.log("multi tab form processData - data not found");

				return;
			}

			let localConsolidatedData = this.transformOutputData(currentData);
			let currentChildrenComponents =
				this.state.currentChildrenComponents[currentID];
			if (
				currentChildrenComponents !== null &&
				currentChildrenComponents !== undefined
			) {
				let attrName = this.props.currentChildrenComponentIdentifier;
				Object.keys(currentChildrenComponents).forEach(function (key) {
					let attr = attrName + key;
					localConsolidatedData[attr] = currentChildrenComponents[key];
				});
			}
			partialConsolidatedData[currentID] = localConsolidatedData;
		}

		if (this.props.isDebug)
			console.log("multi tab form processData - modal check");
		if (this.props.notModal) {
			if (this.props.isDebug)
				console.log("multi tab form processData - not modal");
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

		if (this.props.isDebug)
			console.log("multi tab form processData - process consolidated data");
		let subComponents = {};
		for (let id in partialConsolidatedData) {
			if (id === mainID) continue;
			let localConsolidatedData = partialConsolidatedData[id];
			let localPartialInputData = partialInputData[id];
			let schemaTitle = localPartialInputData.schemaTitle;
			let schema = localPartialInputData.schema;
			let localSubComponents = [];
			if (
				subComponents[schemaTitle] !== null &&
				subComponents[schemaTitle] !== undefined
			) {
				localSubComponents = subComponents[schemaTitle];
			}
			localSubComponents.push(localConsolidatedData);
			subComponents[schemaTitle] = localSubComponents;
		}
		if (this.props.isDebug)
			console.log("multi tab form processData - organize data");
		for (let schemaTitle in subComponents) {
			let localSubComponents = subComponents[schemaTitle];
			if (localSubComponents.length > 1) {
				consolidatedData[schemaTitle] = localSubComponents;
			} else {
				consolidatedData[schemaTitle] = localSubComponents[0];
			}
		}

		let linkedFields = Object.assign({}, this.state.linkedFields);

		if (action === "confirm") 
		{
			if (this.props.isDebug) console.log("props.onConfirm function will get called");
			this.props.onConfirm(this.props.id, consolidatedData, linkedFields, false);
		} 
		else if (action === "confirmOnError") {
			if (this.props.isDebug) console.log("CONFIRMONERROR: props.onConfirm function will get called");
			this.props.onConfirm(this.props.id, consolidatedData, linkedFields, true);
		}
		else if (action === "save")
		{
			if (this.props.isDebug) console.log("props.onSave function will get called");
			this.props.onSave(this.props.id, consolidatedData, linkedFields);
			this.props.onConfirm(this.props.id, consolidatedData, linkedFields, false);
		}
		else {
			if (this.props.isDebug) console.log("inside of processData and the action is validate");

			this.setState({ isValidated: true }, () => {
				if (this.state.isValidated) {
					window.alert("The component has been successfully validated");
				}
			});
		}
	}

	processErrors() {
		let localForms = this.formRefs;
		if (this.props.notModal) return;
		if (this.props.isDebug)
			console.log("multi tab form processErrors - error process");
		for (let currentID in localForms) {
			let forms = localForms[currentID];
			let currentErrors = this.errors[currentID];
			let numberOfForms = forms.length;
			if (
				!isDefined(currentErrors)
				//  ||currentErrors.length < numberOfForms
			) {
				if (this.props.isDebug)
					console.log("multi tab form processErrors - data not found");
				return;
			}
			//this for loop activates the tab where the first error is found
			for (let i = 0; i < currentErrors.length; i++) {
				if (currentErrors[i] !== null) {
					this.setState({ activeID: currentID, activeKey: i }); //`${i}` });
					if (this.props.isDebug)
						console.log("multi tab form processErrors - set error view");
					return;
				}
			}
		}
	}

	onEditComponents() {
		this.setState({ showForm: false });
	}

	onEditComponentsConfirm() {
		this.initializeForms();
		this.setState({ showForm: true });
	}

	onEditComponentsCancel() {
		this.initializeForms();
		this.setState({ showForm: true });
	}

	handleAction(action) {
		if (this.props.isDebug) console.log(`inside of ${action} function`);

		if (action === "save" && !this.state.isValidated) {
			window.alert("You must validate the form before saving.");
			return;
		}

		this.data = {};
		this.errors = {};
		this.action = action;

		if (this.props.isDebug) console.log(`multi tab form ${action} - submit all forms`);

		Object.entries(this.formRefs).forEach(([id, forms]) => {
			const buttons = this.buttonsRefs[id];
			forms.forEach((refForm, i) => {
				if (this.props.isDebug) console.log(`value stored in refForm at index ${i}:`, refForm);
				if (this.props.isDebug) console.log(`multi tab form ${action} - submit form ${i}`);
				refForm.formElement.dispatchEvent(new CustomEvent("submit", { bubbles: true, cancelable: true }));
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
	
	onLoad() {
		this.props.onLoad();
		// if (this.props.isDebug) console.log("calling onLoad and this is filteredComponents", this.props.filteredComponents);
		// console.log("this.props.selectedLoadComponent", this.props.selectedLoadComponent);

		// console.log("this.props.inputData in onLoad()", this.props.inputData);
		// console.log("this.props.schema in onLoad()", this.props.schema);

		// console.log("in onLoad of multitab");
		// const reader = new FileReader();
		// reader.onload = (event) => {
		// 	try {
		// 		const importedData = JSON.parse(event.target.result);
		// 		//console.log("Parsed JSON data:", importedData);
		// 		// Validate importedData structure
				
		// 		this.setState({ 
		// 			//partialInputData: {}, // Reset existing data
		// 			//activeID: null,       // Reset active ID
		// 		// }, () => {
		// 		// 	// Update props and reinitialize forms
		// 		// 	// this.props.schema = importedData.schema;
		// 		// 	// this.props.inputData = importedData.inputData;
		// 		// 	this.initializeForms();
		// 		});
			
		// 	} catch (error) {
		// 		console.error("Error parsing JSON:", error);
		// 	}
		// };
		// const jsonString = JSON.stringify(this.props.selectedLoadComponent);

		// // Create a Blob from the JSON string
		// const blob = new Blob([jsonString], { type: 'application/json' });

		// // Read the Blob as text
		// reader.readAsText(blob);
	}

	onCancel() {
		this.props.onCancel();
	}


	transformOutputData(data) {
		//if (this.props.isDebug) console.log("component's data before transforming: ", data);
		let consolidatedData = {};
		data.map(function (item) {
			if (item === null || item === undefined) return;
			let container = item.schema.container;
			let subType = item.schema.subType;
			let counter = item.schema.counter;
			Object.keys(item.formData).forEach(function (key) {
				if (subType === "object") {
					if (consolidatedData[container] === undefined)
						consolidatedData[container] = {};
					consolidatedData[container][key] = item.formData[key];
				} else if (subType === "array") {
					if (consolidatedData[container] === undefined)
						consolidatedData[container] = [];
					if (consolidatedData[container][counter] === undefined)
						consolidatedData[container][counter] = {};
					consolidatedData[container][counter][key] = item.formData[key];
				} else {
					consolidatedData[key] = item.formData[key];
				}
			});
		});
		//if (this.props.isDebug) console.log("component's consolidatedData before returning: ", consolidatedData);
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
					value = MultiTabFormWithHeaderV3.findInputPropKeyValue(
						groupKey,
						index,
						propKey,
						inputData[key]
					);
					if (value !== undefined) return value;
				}
			} else if (inputData[key] instanceof Object) {
				if (index === -1) {
					if (inputData[key][propKey] !== undefined) {
						value = inputData[key][propKey];
					} else {
						value = MultiTabFormWithHeaderV3.findInputPropKeyValue(
							groupKey,
							index,
							propKey,
							inputData[key]
						);
					}
				} else if (key !== index) {
					continue;
				} else if (inputData[key][propKey] !== undefined) {
					return inputData[key][propKey];
				} else {
					value = MultiTabFormWithHeaderV3.findInputPropKeyValue(
						groupKey,
						index,
						propKey,
						inputData[key]
					);
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
					let val = MultiTabFormWithHeaderV3.findInputPropKeyValue(
						stringKey,
						index,
						propKey,
						inputData
					);
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

	static transformSchemaCategorizeField(
		currentChildrenComponents,
		schema,
		elementByType,
		counter,
		subType,
		linkedFields,
		inputDataIDs
	) {
		let partialSchema = {};
		if (schema === null) return partialSchema;
		Object.keys(schema.properties).forEach(function (key) {
			let property = schema.properties[key];
			if (
				currentChildrenComponents !== undefined &&
				currentChildrenComponents !== null &&
				Object.keys(currentChildrenComponents).includes(key)
			) {
				if (property.type === string_object) {
					let count = 0;
					for (let inputKey in currentChildrenComponents) {
						if (key.includes(inputKey)) {
							count = currentChildrenComponents[inputKey];
							break;
						}
					}
					for (let i = 0; i < count; i++) {
						let localPartialSchema =
							MultiTabFormWithHeaderV3.transformSchemaCategorizeField(
								currentChildrenComponents,
								property,
								elementByType,
								-1,
								string_object,
								linkedFields
							);
						partialSchema = Object.assign(partialSchema, localPartialSchema);
					}
					return;
				} else if (property.type === string_array) {
					let count = 0;
					for (let inputKey in currentChildrenComponents) {
						if (key.includes(inputKey)) {
							count = currentChildrenComponents[inputKey];
							break;
						}
					}
					for (let i = 0; i < count; i++) {
						let localPartialSchema =
							MultiTabFormWithHeaderV3.transformSchemaCategorizeField(
								currentChildrenComponents,
								property.items,
								elementByType,
								i,
								string_array,
								linkedFields
							);
						partialSchema = Object.assign(partialSchema, localPartialSchema);
					}
					return;
				}
			}

			let category = property.category;
			if (category === null || category === undefined)
				category = property.items.category;
			let newCategory = category;
			if (counter !== -1) newCategory += "_" + counter;

			let keysForCategory = partialSchema[newCategory];
			if (keysForCategory === undefined || keysForCategory === null) {
				keysForCategory = {
					title: newCategory,
					type: string_object,
					subType: subType,
					container: category,
					counter: counter,
					properties: {},
				};
			}
			let newProperty = Object.assign({}, property);

			// console.log("elementByType");
			// console.log(elementByType);
			if (property.linkTo !== undefined) {
				newProperty[string_default] = string_na;
				newProperty[string_enum] = [string_na];
				newProperty[string_enumNames] = [string_not_assigned];
				if (linkedFields[key] === undefined) {
					linkedFields[key] = {
						schemaType: schema.title,
						value: string_not_assigned,
					};
				}
				if (elementByType[property.linkTo] !== undefined) {
					let propElementByType = elementByType[property.linkTo];
					Object.keys(propElementByType).forEach(function (
						propElementByTypeID
					) {
						let propElementByTypeName = propElementByType[propElementByTypeID];
						if (inputDataIDs.includes(propElementByTypeID)) return;
						newProperty[string_enum].push(
							property.linkTo + "/" + propElementByTypeID
						);
						newProperty[string_enumNames].push(propElementByTypeName);
					});
				}
			} else if (
				property.items !== undefined &&
				property.items.linkTo !== undefined
			) {
				newProperty.items[string_default] = string_na;
				newProperty.items[string_enum] = [string_na];
				newProperty.items[string_enumNames] = [string_not_assigned];
				if (linkedFields[key] === undefined) {
					linkedFields[key] = {
						schemaType: schema.title,
						value: string_not_assigned,
					};
				}
				// console.log("elementByType");
				// console.log(elementByType);
				if (elementByType[property.items.linkTo] !== undefined) {
					let propElementByType = elementByType[property.items.linkTo];
					Object.keys(propElementByType).forEach(function (
						propElementByTypeID
					) {
						let propElementByTypeName = propElementByType[propElementByTypeID];
						if (inputDataIDs.includes(propElementByTypeID)) return;
						newProperty.items[string_enum].push(
							property.items.linkTo + "/" + propElementByTypeID
						);
						newProperty.items[string_enumNames].push(propElementByTypeName);
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

	static transformSchema(
		currentChildrenComponents,
		schema,
		elementByType,
		linkedFields,
		inputDataIDs
	) {
		let partialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(
			currentChildrenComponents,
			schema,
			elementByType,
			-1,
			string_default,
			linkedFields,
			inputDataIDs
		);
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
						"ui:autofocus": true,
					});
				}
				if (partialSchema[key].properties[propKey].readonly !== undefined) {
					partialUISchema[key][propKey] = Object.assign(uiProperties, {
						"ui:readonly": true,
					});
				}
				if (partialSchema[key].properties[propKey].description === "NA") {
					partialUISchema[key][propKey] = Object.assign(uiProperties, {
						"ui:description": " ",
					});
				}
				if (partialSchema[key].properties[propKey].type === "boolean") {
					partialUISchema[key][propKey] = Object.assign(uiProperties, {
						"ui:widget": "checkbox",
					});
				}
				if (partialSchema[key].properties[propKey].description === "NA") {
					partialUISchema[key][propKey] = Object.assign(uiProperties, {
						"ui:description": " ",
					});
				}
				if (!this.props.editable) {
					partialUISchema[key][propKey] = Object.assign(uiProperties, {
						"ui:disabled": true,
					});
				}
			});
		});
		return partialUISchema;
	}

	createForm(
		schema,
		uiSchema,
		input,
		index,
		currentFormRefs,
		currentButtonsRefs,
	) {
		return (
			<Form
				schema={schema}
				uiSchema={uiSchema}
				onSubmit={this.onSubmit}
				onError={this.onError}
				onChange={this.handleChange}
				formData={input}
				showErrorList={false}
				idPrefix={"rjsfPrefix"}
				ref={(form) => {
					if (index != -1) {
						currentFormRefs.splice(index, 0, form);
					} else {
						currentFormRefs.push(form);
					}
				}}
				style={{ overflow: "hidden" }}
			>
				<button
					type="submit"
					ref={(btn) => {
						if (index != -1) {
							currentButtonsRefs.splice(index, 0, btn);
						} else {
							currentButtonsRefs.push(btn);
						}
					}}
					style={{ display: "none" }}
				/>
			</Form>
		);
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
				description,
			});
			currentFormNames.splice(index, 0, key);
			let form = this.createForm(         //// check if we can add new parameter to createForm to tell it to display the error or not
				partialSchema[key],
				partialUISchema[key],
				partialInputData[key],
				index,
				currentFormRefs,
				currentButtonsRefs,
			);
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
			partialSchema[key] = Object.assign(partialSchema[key], { description });
			currentFormNames.push(key);
			let form = this.createForm(
				partialSchema[key],
				partialUISchema[key],
				partialInputData[key],
				-1,
				currentFormRefs,
				currentButtonsRefs,
			);
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
			activeKey: 0, //"0",
		});
	}

	//onTabChange(key) {
	onTabChange(key, prevKey, evt) {
		this.setState({
			activeKey: key,
		});
	}

	onClickAddChildComponent(id, key) {
		let currentChildrenComponents = Object.assign(
			{},
			this.state.currentChildrenComponents
		);
		currentChildrenComponents[id][key] = currentChildrenComponents[id][key] + 1;
		this.setState({ currentChildrenComponents: currentChildrenComponents });
	}

	onClickRemoveChildComponent(id, key) {
		let currentChildrenComponents = Object.assign(
			{},
			this.state.currentChildrenComponents
		);
		currentChildrenComponents[id][key] = currentChildrenComponents[id][key] - 1;
		this.setState({ currentChildrenComponents: currentChildrenComponents });
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
		if (
			currentChildrenComponents === undefined ||
			currentChildrenComponents === null
		)
			return null;
		const buttonNoMargin = {
			width: "510px",
			marginBottom: "5px",
		};
		const sideButtonLeftMargin = {
			width: "50px",
			marginLeft: "5px",
			marginBottom: "5px",
		};
		const sideButtonRightMargin = {
			width: "50px",
			marginRight: "5px",
			marginBottom: "5px",
		};
		let buttons = [];
		Object.keys(currentChildrenComponents).forEach((key) => {
			let currentChildren = currentChildrenComponents[key];
			let minChildren = minChildrenComponents[key];
			let maxChildren = maxChildrenComponents[key];
			let isMinDisabled = minChildren === currentChildren;
			let isMaxDisabled = maxChildren === currentChildren;
			buttons.push(
				<div key={"buttons-" + key}>
					<Button
						style={sideButtonLeftMargin}
						variant={isMinDisabled ? "secondary" : "danger"}
						onClick={
							isMinDisabled
								? null
								: () => this.onClickRemoveChildComponent(id, key)
						}
						disabled={isMinDisabled}
						value={key}
					>
						-
					</Button>
					<Button style={buttonNoMargin} size="lg" variant="secondary" disabled>
						{key} : {currentChildren}
					</Button>
					<Button
						style={sideButtonRightMargin}
						variant={isMaxDisabled ? "secondary" : "success"}
						onClick={
							isMaxDisabled
								? null
								: () => this.onClickAddChildComponent(id, key)
						}
						disabled={isMaxDisabled}
						value={key}
					>
						+
					</Button>
				</div>
			);
		});
		return buttons;
	}

	render() {
		const button = {
			width: "250px",
			marginLeft: "5px",
			marginRight: "5px",
		};
		const ComponentLibraryButton = {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			width: "150px", 
			marginRight: "5px",
			width: "100%",
			height: "36px",
			fontSize: "16px",
			fontWeight: 500,
			backgroundColor: "#F6F6F6",
			color: "#212121",
			borderColor: "#bab8b8",
		};
		const CreateNewButton = {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			width: "150px", 
			marginRight: "5px",
			width: "100%",
			height: "36px",
			fontSize: "16px",
			fontWeight: 500,
			backgroundColor: "#4099AB",
			color: "#FFFFFF",
			borderColor: "#5d8f99",
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
			borderRadius: "8px",
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
			paddingLeft: "20px",
		};
		const button2 = {
			width: "510px",
			marginLeft: "5px",
			marginRight: "5px",
		};
		const containerStyle = {
			display: "flex",
			flexDirection: "column",
		};
		const headerContainerStyle = {
			display: "flex",
			justifyContent: "space-between", 
			alignItems: "center", 
			marginBottom: "10px", 
			height: "40px",
			width: "100%",
		};
		const buttonContainerColumnExternal = {
			display: "flex",
			flexDirection: "column",
			flexWap: "wrap",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "100%",
		};
		const buttonContainerColumn = {
			display: "flex",
			flexDirection: "column",
			flexWap: "wrap",
			justifyContent: "center",
			alignItems: "center",
		};
		const buttonContainerRow = {
			display: "flex",
			flexDirection: "row",
			flexWap: "wrap",
			justifyContent: "center",
			marginBottom: "5px",
		};
		const buttonContainerRowModal = {
			display: "flex",
			flexDirection: "row",
			flexWap: "wrap",
			justifyContent: "space-between",
			marginBottom: "5px",
			width: "100%",
		};
		const topButtonContainer = {
			display: "flex",
			flexDirection: "row",
			//flexWrap: "wrap",
			justifyContent: "flex-end", 
			marginBottom: "5px",
		};
		const styleValidation = {
			display: "inline-block", // Ensure it behaves like an inline element
  			position: "relative",
			marginLeft: "10px",  
			fontWeight: "bold",
			textAlign: "center",
		};
		let styleImageIcon = {
			width: "17px",
			height: "17px",
			marginRight: "10px",
		};

		let validated = null;
		if (this.state.isValidated) {
			const styleValidated = Object.assign({}, styleValidation, {
				color: "green",
			});
			validated = <div style={styleValidated}>&#9679;</div>;
		} else {
			const styleValidated = Object.assign({}, styleValidation, {
				color: "red",
			});
			validated = <div style={styleValidated}>&#9679;</div>;
		}

		let currentChildrenComponents = this.state.currentChildrenComponents;
		let minChildrenComponents = this.state.minChildrenComponents;
		let maxChildrenComponents = this.state.maxChildrenComponents;
		let showForm = this.state.showForm;
		let hasEditableChildren = [];
		let containerNames = this.containerFormNames;
		let names = this.formNames;
		let forms = this.forms;

		// let globeImgPath_tmp = this.resolve(this.props.imagesPath, string_globe_solid_img);
    	// let globeImgPath =
		// 	globeImgPath_tmp.substring(1) +
		// 	(globeImgPath_tmp.indexOf("githubusercontent.com") > -1
		// 		? "?sanitize=true"
		// 		: "");

		// //let plusImgPath_tmp = url.resolve(this.props.imagesPath, string_plus_solid_img);
		// let plusImgPath_tmp = this.resolve(this.props.imagesPath, string_plus_solid_img);
    	// let plusImgPath =
		// 	plusImgPath_tmp.substring(1) +
		// 	(globeImgPath_tmp.indexOf("githubusercontent.com") > -1
		// 		? "?sanitize=true"
		// 		: "");

		// let floppyDiskImgPath_tmp = this.resolve(this.props.imagesPath, string_floppy_disk_solid_img);
		// let floppyDiskImgPath =
		// 	floppyDiskImgPath_tmp.substring(1) +
		// 	(globeImgPath_tmp.indexOf("githubusercontent.com") > -1
		// 		? "?sanitize=true"
		// 		: "");

		// console.log('Globe Image Path:', globeImgPath_tmp);
		// console.log('Plus Image Path:', plusImgPath_tmp);
		// console.log('Floppy Disk Image Path:', floppyDiskImgPath_tmp);

		for (let id in forms) {
			let localCurrentChildrenComponents = currentChildrenComponents[id];
			let localMinChildrenComponents = minChildrenComponents[id];
			let localMaxChildrenComponents = maxChildrenComponents[id];
			if (
				localCurrentChildrenComponents === null ||
				localCurrentChildrenComponents === undefined
			) {
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
		if (hasEditableChildren[activeID])
			childrenButtons = this.createChildrenComponentsButton(activeID);

		if (!showForm) {
			return (
				<ModalWindow overlaysContainer={this.props.overlaysContainer}>
					<div style={buttonContainerColumnExternal}>
						<div style={buttonContainerColumn}>{childrenButtons}</div>
						<div style={buttonContainerRow}>
							<Button
								style={button}
								size="lg"
								onClick={this.onEditComponentsConfirm}
							>
								Confirm
							</Button>
							<Button
								style={button}
								size="lg"
								onClick={this.onEditComponentsCancel}
							>
								Cancel
							</Button>
						</div>
					</div>
				</ModalWindow>
			);
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
				tabNames[id].push(
					<Tab key={"ContainerTabName-" + currentNames[index]}>
						{currentNames[index]}
					</Tab>
				);
				tabs[id].push(
					<TabPanel
						key={"ContainerTab-" + currentNames[index]}
						forceRender={true}
					>
						{item}
					</TabPanel>
				);
			}
			//let currentTabs = currentForms.map(function (item, index) {
			//	if (names[id][index] === "undefined") return null;
			//	return (
			//		<TabPane tab={names[id][index]} key={index} forceRender={true}>
			//			{item}
			//		</TabPane>
			//	);
			//});
			//tabs[id] = currentTabs;
		}

		// let title = "Selected Hardware";
		// if (this.props.schema !== null) {
		// 	title = this.props.schema.title;
		// }

		let buttons = [];
		let topButtons = [];

		if (!this.props.notModal) {
			buttons.push(
				<Button
					key="button-validate"
					style={ValidateButton}
					size="lg"
					onClick={this.onValidate}
				>
					Validate Input
				</Button>
			);
		}

		if (
			!this.props.notModal ||
			(this.props.notModal && this.props.onConfirm !== null)
		) {
			let text = "Save Changes";
			if (this.props.notModal && this.props.onConfirm !== null) text = "Add";
			buttons.push(

				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<Button
						key="button-cancel"
						style={CancelButton}
						size="lg"
						onClick={this.onCancel}
					>
						Cancel
					</Button>

					<Button
						key="button-confirm"
						style={SaveChangesButton}
						size="lg"
						onClick={this.onConfirm}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{/* <img
								src={floppyDiskImgPath} alt="FloppyDisk Icon" style={styleImageIcon}
							/> */}
							{text}
						</div>
					</Button>
				</div>
			);
		}

		if (!this.props.notModal) {
			topButtons.push(
			<Button
				key="button-load"
				style={ComponentLibraryButton}
				size="lg"
				onClick={this.onLoad}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						paddingLeft: "2px",
						paddingRight: "2px",
					}}
				>
					{/* <img
						src={globeImgPath} alt="Globe Icon" style={styleImageIcon}
					/> */}
					<span style={{ whiteSpace: "nowrap" }}>Component Library</span>
				</div>

			</Button>

			);
		}

		if (!this.props.notModal) {
			topButtons.push(
				<Button
					key="button-save"
					style={CreateNewButton}
					size="lg"
					onClick={this.onSave}
					>
					<div
						style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						paddingLeft: "2px",
						paddingRight: "2px",
						}}
					>
						{/* <img src={plusImgPath} alt="Plus Icon" style={styleImageIcon} /> */}
						<span style={{ display: "flex", alignItems: "center" }}>
						Create New {validated}
						</span>
					</div>
				</Button>
			);

		}

		let containerFormNames = [];
		let containerForms = [];
		for (let id in forms) {
			let editChildrenCompButton = null;
			if (hasEditableChildren[id] && !this.props.notModal)
				editChildrenCompButton = (
					<Button
						key="button-addremove"
						style={button2}
						size="lg"
						variant={!hasEditableChildren[id] ? "secondary" : "primary"}
						onClick={!hasEditableChildren[id] ? null : this.onEditComponents}
						disabled={!hasEditableChildren[id]}
					>
						Add/Remove wavelength range or sub-component
					</Button>
				);
			let localTabs = tabs[id];
			let localTabNames = tabNames[id];
			//let index = Object.keys(forms).indexOf(id);
			//<h3>{containerNames[id]}</h3>
			//<TabPane tab={containerNames[id]} key={index} forceRender={true}>
			//</TabPane>
			containerFormNames.push(
				<Tab key={"ContainerTabName-" + containerNames[id]}>
					{containerNames[id]}
				</Tab>
			);
			containerForms.push(
				<TabPanel forceRender={true} key={"ContainerTab-" + containerNames[id]}>
					<p>{hasEditableChildren[id] ? string_bandpass_warning : ""}</p>
					<Tabs
						// tabPosition={"top"}
						// tabBarStyle={{
						// 	border: "none",
						// }}
						//tabBarGutter={10}
						//onChange={this.onTabChange}
						onSelect={this.onTabChange}
						//animated={true}
						//style={{ border: "none" }}
						// renderTabBar={() => <ScrollableTabBar />}
						// renderTabContent={() => <TabContent animated />}
						//activeKey={this.state.activeKey}
						selectedIndex={this.state.activeKey}
					>
						<TabList>{localTabNames}</TabList>
						{localTabs}
					</Tabs>
					<div style={buttonContainerRow}>{editChildrenCompButton}</div>
				</TabPanel>
			);
		}

		//let containerIndex = this.state.activeID;
		let containerIndex = Object.keys(forms).indexOf(this.state.activeID);
		//let activeContainerKey = `${containerIndex}`;

		let form = (
			<div style={containerStyle}>
				<div style={headerContainerStyle}>
				<h3>{this.props.title}</h3>
				<div style={topButtonContainer}>{topButtons}</div>
				</div>
				<Tabs
					// tabPosition={"top"}
					// tabBarStyle={{
					// 	border: "none",
					// }}
					// tabBarGutter={10}
					//onChange={this.onContainerTabChange}
					onSelect={this.onContainerTabChange}
					//animated={true}
					//style={{ border: "none" }}
					// renderTabBar={() => <ScrollableTabBar />}
					// renderTabContent={() => <TabContent animated />}
					//activeKey={activeContainerKey}
					selectedIndex={containerIndex}
				>
					<TabList>{containerFormNames}</TabList>
					{containerForms}
				</Tabs>
				<div style={buttonContainerRowModal}>{buttons}</div>
			</div>
		);
		//<div>{this.props.schema.description}</div>
		if (!this.props.notModal)
			return (
				<ModalWindow overlaysContainer={this.props.overlaysContainer}>
					{form}
				</ModalWindow>
			);
		else return form;
	}
}
