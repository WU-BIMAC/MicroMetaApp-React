import React from "react";
import Form from "@rjsf/bootstrap-4";
import Tabs, { TabPane } from "rc-tabs";
// import TabContent from "rc-tabs/lib/TabContent";
// import ScrollableTabBar from "rc-tabs/lib/";
//import "rc-tabs/assets/index.css"
import Button from "react-bootstrap/Button";

import ModalWindow from "./modalWindow";

import {
	string_na,
	string_not_assigned,
	string_default,
	string_enum,
	string_enumNames,
	string_object,
	string_array,
	string_bandpass_warning,
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
			activeKey: "0",
			partialInputData: {},
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
		this.createChildrenComponentsButton = this.createChildrenComponentsButton.bind(
			this
		);
		this.onClickAddChildComponent = this.onClickAddChildComponent.bind(this);
		this.onClickRemoveChildComponent = this.onClickRemoveChildComponent.bind(
			this
		);

		this.initializeForms = this.initializeForms.bind(this);
		if (
			props.schema !== null &&
			props.schema !== undefined &&
			Object.keys(this.state.partialInputData).length === 0
		)
			this.initializeForms();
	}

	initializeForms() {
		//console.log("INITIALIZE FORMS");
		let counter = 0;
		let linkedFields = this.state.linkedFields;
		let currentChildrenComponents = this.state.currentChildrenComponents;
		let newActiveID = this.state.activeID;
		let partialInputData = {};
		let inputDataIDs = [];

		console.log("elementByType");
		console.log(this.props.elementByType);

		if (this.props.inputData !== undefined) {
			if (Array.isArray(this.props.inputData)) {
				for (let i = 0; i < this.props.schema.length; i++) {
					let schema = this.props.schema[i];
					for (let y = 0; y < this.props.inputData.length; y++) {
						let inputData = this.props.inputData[y];
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
				}
			} else {
				//create case if 1 input but multiple schemas ?
				let schema = this.props.schema;
				let inputData = this.props.inputData;
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
			// console.log("partialInputData");
			// console.log(partialInputData[id].data);
			// console.log("partialSchema");
			// console.log(partialInputData[id].schema);
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
			//console.log("FORM UPDATE with OBJ");
			//console.log(this.props.inputData);
			this.initializeForms();
			this.setState({ activeID: null, activeKey: "0" });
		}
	}
	// static getDerivedStateFromProps(props, state) {
	// 	return { state };
	// }

	onSubmit(data) {
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
				// console.log("linkedFields");
				// console.log(linkedFields[key]);
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
				// console.log("linkedFields");
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
		this.setState({ linkedFields: linkedFields });

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
		this.processData();
	}

	onError(errors) {
		let localForms = this.formRefs;
		let index = -1;
		let id = -1;
		for (let currentID in localForms) {
			let forms = localForms[currentID];
			for (let i = 0; i < forms.length; i++) {
				let ref = forms[i];
				if (ref.state.errors === errors) {
					index = i;
					id = currentID;
					break;
				}
			}
		}

		let currentData = [];
		let currentErrors = [];
		if (this.data[id] !== null && this.data[id] !== undefined)
			currentData = this.data[id].slice();
		if (this.errors[id] !== null && this.errors[id] !== undefined)
			currentErrors = this.errors[id].slice();
		currentData.splice(index, 0, null);
		currentErrors.splice(index, 0, errors);
		this.data[id] = currentData;
		this.errors[id] = currentErrors;
		this.processErrors();
	}

	processData() {
		let partialInputData = this.state.partialInputData;
		let localData = this.data;
		let localForms = this.formRefs;
		let partialConsolidatedData = {};
		for (let currentID in localForms) {
			let forms = localForms[currentID];
			let currentData = localData[currentID];
			let numberOfForms = forms.length;
			if (
				currentData === null ||
				currentData === undefined ||
				currentData.length < numberOfForms ||
				currentData.includes(null)
			) {
				return;
			}

			let localConsolidatedData = this.transformOutputData(currentData);
			let currentChildrenComponents = this.state.currentChildrenComponents[
				currentID
			];
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
		// let currentData = this.data;
		// let numberOfForms = this.formRefs.length;
		// if (currentData.length < numberOfForms) return;
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
		for (let schemaTitle in subComponents) {
			let localSubComponents = subComponents[schemaTitle];
			if (localSubComponents.length > 1) {
				consolidatedData[schemaTitle] = localSubComponents;
			} else {
				consolidatedData[schemaTitle] = localSubComponents[0];
			}
		}

		// console.log("consolidatedData");
		// console.log(consolidatedData);

		let linkedFields = Object.assign({}, this.state.linkedFields);
		this.props.onConfirm(this.props.id, consolidatedData, linkedFields);
	}

	processErrors() {
		let localForms = this.formRefs;
		for (let currentID in localForms) {
			let forms = localForms[currentID];
			let currentErrors = this.errors[currentID];
			let numberOfForms = forms.length;
			if (
				currentErrors === null ||
				currentErrors === undefined
				//  ||currentErrors.length < numberOfForms
			)
				return;
			for (let i = 0; i < currentErrors.length; i++) {
				if (currentErrors[i] !== null) {
					this.setState({ activeID: currentID, activeKey: `${i}` });
					return;
				}
			}
		}
		// let currentErrors = this.errors;
		// let numberOfForms = this.formRefs.length;
		// if (currentErrors.length < numberOfForms) return;
		// for (let i = 0; i < currentErrors.length; i++) {
		// 	if (currentErrors[i] !== null) {
		// 		this.setState({ activeKey: `${i}` });
		// 		return;
		// 	}
		// }
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

	onConfirm() {
		let localForms = this.formRefs;
		this.data = {};
		this.errors = {};
		for (let id in localForms) {
			let forms = localForms[id];
			for (let i = 0; i < forms.length; i++) {
				let ref = forms[i];
				ref.submit();
			}
		}
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
			if (Object.keys(currentChildrenComponents).includes(key)) {
				if (property.type === string_object) {
					let count = 0;
					for (let inputKey in currentChildrenComponents) {
						if (key.includes(inputKey)) {
							count = currentChildrenComponents[inputKey];
							break;
						}
					}
					for (let i = 0; i < count; i++) {
						let localPartialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(
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
						let localPartialSchema = MultiTabFormWithHeaderV3.transformSchemaCategorizeField(
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
							schema.title + "/" + propElementByTypeID
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
				console.log("elementByType");
				console.log(elementByType);
				if (elementByType[property.items.linkTo] !== undefined) {
					let propElementByType = elementByType[property.items.linkTo];
					Object.keys(propElementByType).forEach(function (
						propElementByTypeID
					) {
						let propElementByTypeName = propElementByType[propElementByTypeID];
						if (inputDataIDs.includes(propElementByTypeID)) return;
						newProperty.items[string_enum].push(
							schema.title + "/" + propElementByTypeID
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
						"ui:readonly": true,
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
		currentButtonsRefs
	) {
		return (
			<Form
				schema={schema}
				uiSchema={uiSchema}
				onSubmit={this.onSubmit}
				onError={this.onError}
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
			let form = this.createForm(
				partialSchema[key],
				partialUISchema[key],
				partialInputData[key],
				index,
				currentFormRefs,
				currentButtonsRefs
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
				currentButtonsRefs
			);
			currentForms.push(form);
		}
		this.buttonsRefs[id] = currentButtonsRefs;
		this.formNames[id] = currentFormNames;
		this.formRefs[id] = currentFormRefs;
		return currentForms;
	}

	onContainerTabChange(key) {
		let id = Object.keys(this.forms)[key];
		this.setState({
			activeID: id,
			activeKey: "0",
		});
	}

	onTabChange(key) {
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
		const button2 = {
			width: "510px",
			marginLeft: "5px",
			marginRight: "5px",
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
		let currentChildrenComponents = this.state.currentChildrenComponents;
		let minChildrenComponents = this.state.minChildrenComponents;
		let maxChildrenComponents = this.state.maxChildrenComponents;
		let showForm = this.state.showForm;
		let hasEditableChildren = [];
		let containerNames = this.containerFormNames;
		let names = this.formNames;
		let forms = this.forms;

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

		let tabs = {};
		for (let id in forms) {
			let currentForms = forms[id];
			let currentTabs = currentForms.map(function (item, index) {
				return (
					<TabPane tab={names[id][index]} key={index} forceRender={true}>
						{item}
					</TabPane>
				);
			});
			tabs[id] = currentTabs;
		}

		// let title = "Selected Hardware";
		// if (this.props.schema !== null) {
		// 	title = this.props.schema.title;
		// }

		let buttons = [];
		buttons.push(
			<Button
				key="button-confirm"
				style={button}
				size="lg"
				onClick={this.onConfirm}
			>
				Confirm
			</Button>
		);
		if (!this.props.notModal)
			buttons.push(
				<Button
					key="button-cancel"
					style={button}
					size="lg"
					onClick={this.onCancel}
				>
					Cancel
				</Button>
			);

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
			let index = Object.keys(forms).indexOf(id);
			//<h3>{containerNames[id]}</h3>
			containerForms.push(
				<TabPane tab={containerNames[id]} key={index} forceRender={true}>
					<p>{hasEditableChildren[id] ? string_bandpass_warning : ""}</p>
					<Tabs
						tabPosition={"top"}
						tabBarStyle={{ display: "row", border: "none" }}
						onChange={this.onTabChange}
						animated={true}
						style={{ border: "none" }}
						// renderTabBar={() => <ScrollableTabBar />}
						// renderTabContent={() => <TabContent animated />}
						activeKey={this.state.activeKey}
					>
						{localTabs}
					</Tabs>
					<div style={buttonContainerRow}>{editChildrenCompButton}</div>
				</TabPane>
			);
		}

		let containerIndex = Object.keys(forms).indexOf(this.state.activeID);
		let activeContainerKey = `${containerIndex}`;
		let form = (
			<div>
				<h3>{this.props.title}</h3>
				<Tabs
					tabPosition={"top"}
					tabBarStyle={{ display: "row", border: "none" }}
					onChange={this.onContainerTabChange}
					animated={true}
					style={{ border: "none" }}
					// renderTabBar={() => <ScrollableTabBar />}
					// renderTabContent={() => <TabContent animated />}
					activeKey={activeContainerKey}
				>
					{containerForms}
				</Tabs>
				<div style={buttonContainerRow}>{buttons}</div>
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
