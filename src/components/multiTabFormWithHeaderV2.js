import React from "react";
import Form from "@rjsf/bootstrap-4";
import Tabs, { TabPane } from "rc-tabs";
// import TabContent from "rc-tabs/lib/TabContent";
// import ScrollableTabBar from "rc-tabs/lib/TabBar";
//import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";
import TreeMenu from "react-simple-tree-menu";
import { ListGroupItem, ListGroup } from "reactstrap";

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

const DEFAULT_PADDING = 16;
const ICON_SIZE = 8;
const LEVEL_SPACE = 16;

const ToggleIcon = ({ on }) => (
	<span style={{ marginRight: 8 }}>{on ? "-" : "+"}</span>
);
const ListItem = ({
	level = 0,
	hasNodes,
	isOpen,
	label,
	searchTerm,
	openNodes,
	toggleNode,
	matchSearch,
	focused,
	...props
}) => (
	<ListGroupItem
		{...props}
		style={{
			paddingLeft: DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE,
			cursor: "pointer",
			boxShadow: focused ? "0px 0px 5px 0px #222" : "none",
			zIndex: focused ? 999 : "unset",
			position: "relative",
		}}
	>
		{hasNodes && (
			<div
				style={{ display: "inline-block" }}
				onClick={(e) => {
					hasNodes && toggleNode && toggleNode();
					e.stopPropagation();
				}}
			>
				<ToggleIcon on={isOpen} />
			</div>
		)}
		{label}
	</ListGroupItem>
);

export default class MultiTabFormWithHeaderV2 extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showForm: true,
			linkedFields: {},
			currentChildrenComponents: {},
			minChildrenComponents: {},
			maxChildrenComponents: {},
			tmpData: {},
			activeKey: "0",
			activeFormKey: "",
		};

		if (
			props.inputData !== null &&
			props.childrenComponentIdentifier !== null &&
			props.minChildrenComponentIdentifier !== null &&
			props.maxChildrenComponentIdentifier !== null
		) {
			//FIXME I may have to change this to iterate inside the various data
			Object.keys(props.inputData).forEach((key) => {
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
		this.paths = [];
		this.partialSchema = {};
		this.formDescs = {};
		this.buttonsRefs = {};
		this.formNames = {};
		this.forms = {};
		this.formRefs = {};
		this.data = [];
		this.errors = [];

		this.onSubmit = this.onSubmit.bind(this);
		this.onError = this.onError.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
		this.onItemChange = this.onItemChange.bind(this);

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

		this.createDataTree = this.createDataTree.bind(this);
		this.createDataTreeNodes = this.createDataTreeNodes.bind(this);

		this.initializeForms = this.initializeForms.bind(this);
		this.initializeNodeForms = this.initializeNodeForms.bind(this);

		this.dataTree = this.createDataTree(props.schemas, props.schema);
		this.initializeForms();
	}

	createDataTreeNodes(path, schemas, schema, counter, subType) {
		console.log("IM HERE - createDataTreeNodes - " + path);
		let nodes = {};
		let visualCounter = 0;
		Object.keys(schema.properties).forEach((key) => {
			let property = schema.properties[key];
			if (property.contains !== undefined) {
				let contained = property.contains;
				let foundSchema = null;
				Object.keys(schemas).forEach((schemaIndex) => {
					let localSchema = schemas[schemaIndex];
					if (localSchema.title === contained) {
						foundSchema = localSchema;
					}
				});
				//let categorizedSchemaElements = null;
				// if (categorizedElements[schema.title] !== undefined) {
				// 	categorizedSchemaElements = categorizedElements[schema.title];
				// } else {
				// 	categorizedSchemaElements = {};
				// }
				if (foundSchema !== null) {
					//categorizedSchemaElements[foundSchema.title] = foundSchema;
					let newPath = path + "/" + foundSchema.title;
					let subNodes = this.createDataTreeNodes(
						newPath,
						schemas,
						foundSchema,
						counter,
						subType
					);
					nodes[foundSchema.title] = {
						label: foundSchema.title,
						index: visualCounter,
						path: newPath,
						schema: foundSchema,
						nodes: subNodes,
					};
					//categorizedElements[schema.title] = categorizedSchemaElements;
					this.paths.push(newPath);
					visualCounter++;
				}
			}
		});
		return nodes;
	}

	createDataTree(schemas, schema) {
		console.log("IM HERE - createDataTree");
		if (schema === null) return;
		let key = schema.title;
		let nodes = this.createDataTreeNodes(
			key,
			schemas,
			schema,
			-1,
			string_default
		);
		let dataTree = {};
		dataTree[key] = {
			label: key,
			index: 0,
			path: key,
			schema: schema,
			nodes: nodes,
		};
		if (this.state.activeFormKey === "") {
			this.state.activeFormKey = key;
		}
		this.paths.push(key);
		console.log(dataTree);
		return dataTree;
	}

	initializeNodeForms(nodes) {
		let linkedFields = this.state.linkedFields;
		let currentChildrenComponents = this.state.currentChildrenComponents;

		console.log("IM HERE - initializeNodeForms");
		console.log(nodes);

		Object.keys(nodes).forEach((key) => {
			let node = nodes[key];
			let path = node.path;
			this.partialSchema[path] = MultiTabFormWithHeaderV2.transformSchema(
				currentChildrenComponents,
				node.schema,
				this.props.elementByType,
				linkedFields
			);
			let partialInputData = [];
			if (this.props.inputData !== undefined) {
				partialInputData = MultiTabFormWithHeaderV2.transformInputData(
					this.props.inputData,
					this.partialSchema[path]
				);
			}
			let subCategoriesOrder = this.props.schema.subCategoriesOrder;
			let subElementForms = this.createForms(
				path,
				subCategoriesOrder,
				this.partialSchema[path],
				partialInputData
			);
			this.forms[path] = subElementForms;
			this.initializeNodeForms(node.nodes);
		});
	}

	initializeForms() {
		console.log("IM HERE - initializeForms");
		let linkedFields = this.state.linkedFields;
		let currentChildrenComponents = this.state.currentChildrenComponents;

		let dataTree = this.dataTree;
		if (dataTree === null || dataTree === undefined) return;
		let key = Object.keys(dataTree)[0];
		// let rootNode = dataTree[key];
		// let path = rootNode.path;
		this.partialSchema[key] = MultiTabFormWithHeaderV2.transformSchema(
			currentChildrenComponents,
			this.props.schema,
			this.props.elementByType,
			linkedFields
		);
		let partialInputData = [];
		if (this.props.inputData !== undefined) {
			partialInputData = MultiTabFormWithHeaderV2.transformInputData(
				this.props.inputData,
				this.partialSchema[key]
			);
		}
		let subCategoriesOrder = this.props.schema.subCategoriesOrder;
		let subElementForms = this.createForms(
			key,
			subCategoriesOrder,
			this.partialSchema[key],
			partialInputData
		);
		this.forms[key] = subElementForms;
		this.initializeNodeForms(dataTree[key].nodes);
	}

	static getDerivedStateFromProps(props, state) {
		return { state };
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
		this.setState({ linkedFields: linkedFields });

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
				this.setState({ activeKey: `${i}` });
				return;
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
		this.setState({ showForm: true });
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
					value = MultiTabFormWithHeaderV2.findInputPropKeyValue(
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
						value = MultiTabFormWithHeaderV2.findInputPropKeyValue(
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
					value = MultiTabFormWithHeaderV2.findInputPropKeyValue(
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
		Object.keys(partialSchema).forEach(function (key) {
			if (partialInputData[key] === undefined) partialInputData[key] = {};
			Object.keys(partialSchema[key].properties).forEach(function (propKey) {
				if (inputData[propKey] !== undefined)
					partialInputData[key][propKey] = inputData[propKey];
				else {
					let stringIndex = key.lastIndexOf("_");
					let index = -1;
					if (stringIndex != -1) index = key.substr(stringIndex + 1, 1);
					let stringKey = key.replace("_", "");
					stringKey = stringKey.replace(index, "");
					let val = MultiTabFormWithHeaderV2.findInputPropKeyValue(
						stringKey,
						index,
						propKey,
						inputData
					);
					if (val !== null) {
						partialInputData[key][propKey] = val;
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
		linkedFields
	) {
		let partialSchema = {};
		Object.keys(schema.properties).forEach(function (key) {
			let property = schema.properties[key];
			if (property.type === string_object) {
				let count = 0;
				for (let inputKey in currentChildrenComponents) {
					if (key.includes(inputKey)) {
						count = currentChildrenComponents[inputKey];
						break;
					}
				}
				for (let i = 0; i < count; i++) {
					let localPartialSchema = MultiTabFormWithHeaderV2.transformSchemaCategorizeField(
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
					let localPartialSchema = MultiTabFormWithHeaderV2.transformSchemaCategorizeField(
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

			let category = property.category;
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

			if (property.linkTo !== undefined) {
				newProperty[string_default] = string_na;
				newProperty[string_enum] = [string_na];
				newProperty[string_enumNames] = [string_not_assigned];
				if (elementByType[property.linkTo] !== undefined) {
					let propElementByType = elementByType[property.linkTo];

					if (linkedFields[key] === undefined) {
						linkedFields[key] = {
							schemaType: property.linkTo,
							value: string_not_assigned,
						};
					}

					Object.keys(propElementByType).forEach(function (
						propElementByTypeName
					) {
						let propElementByTypeID = propElementByType[propElementByTypeName];
						newProperty[string_enum].push(
							property.linkTo + "/" + propElementByTypeID
						);
						newProperty[string_enumNames].push(propElementByTypeName);
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
		linkedFields
	) {
		let partialSchema = MultiTabFormWithHeaderV2.transformSchemaCategorizeField(
			currentChildrenComponents,
			schema,
			elementByType,
			-1,
			string_default,
			linkedFields
		);

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

	createForms(formsKey, subCategoriesOrder, partialSchema, partialInputData) {
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
			//}
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
		this.buttonsRefs[formsKey] = currentButtonsRefs;
		this.formNames[formsKey] = currentFormNames;
		this.formRefs[formsKey] = currentFormRefs;
		return currentForms;
	}

	onTabChange(key) {
		this.setState({
			activeKey: key,
		});
	}

	onItemChange(key) {
		this.setState({
			activeFormKey: key,
			activeKey: "0",
		});
	}

	onClickAddChildComponent(key) {
		let currentChildrenComponents = Object.assign(
			{},
			this.state.currentChildrenComponents
		);
		currentChildrenComponents[key] = currentChildrenComponents[key] + 1;
		this.setState({ currentChildrenComponents: currentChildrenComponents });
	}

	onClickRemoveChildComponent(key) {
		let currentChildrenComponents = Object.assign(
			{},
			this.state.currentChildrenComponents
		);
		currentChildrenComponents[key] = currentChildrenComponents[key] - 1;
		this.setState({ currentChildrenComponents: currentChildrenComponents });
	}

	createChildrenComponentsButton() {
		let currentChildrenComponents = this.state.currentChildrenComponents;
		let minChildrenComponents = this.state.minChildrenComponents;
		let maxChildrenComponents = this.state.maxChildrenComponents;
		const buttonNoMargin = {
			width: "250px",
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
				<div key={key}>
					<Button
						style={sideButtonLeftMargin}
						variant={isMinDisabled ? "secondary" : "danger"}
						onClick={
							isMinDisabled ? null : () => this.onClickRemoveChildComponent(key)
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
							isMaxDisabled ? null : () => this.onClickAddChildComponent(key)
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
		};
		let currentChildrenComponents = this.state.currentChildrenComponents;
		let minChildrenComponents = this.state.minChildrenComponents;
		let maxChildrenComponents = this.state.maxChildrenComponents;
		let showForm = this.state.showForm;
		let childrenButtons = this.createChildrenComponentsButton();
		if (!showForm) {
			let multiTabForm = (
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
			);
			if (this.props.modalContainer) {
				return (
					<ModalWindow overlaysContainer={this.props.overlaysContainer}>
						{multiTabForm}
					</ModalWindow>
				);
			} else {
				return multiTabForm;
			}
		}
		//FIXME Add the tree here and tree logic
		let activeFormKey = this.state.activeFormKey;
		let paths = this.paths;
		console.log("IM HERE - RENDER  - " + activeFormKey);
		let names = this.formNames[activeFormKey];
		let forms = this.forms[activeFormKey];
		console.log(forms);

		let tabs = null;
		let hasEditableChildren = false;
		if (forms !== null && forms !== undefined) {
			tabs = forms.map(function (item, index) {
				return (
					<TabPane tab={names[index]} key={index} forceRender={true}>
						{item}
					</TabPane>
				);
			});

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
			}
		}

		const style = {
			display: "flex",
			flexFlow: "row",
		};
		const tabsStyle = {
			overflow: "auto",
		};
		const treeStyle = { marginRight: "10px" };
		let buttons = null;
		if (this.props.modalContainer)
			buttons = (
				<div style={buttonContainerRow}>
					<Button
						style={button}
						size="lg"
						variant={!hasEditableChildren ? "secondary" : "primary"}
						onClick={!hasEditableChildren ? null : this.onEditComponents}
						disabled={!hasEditableChildren}
					>
						Add/Remove band-pass
					</Button>
					<Button style={button} size="lg" onClick={this.onConfirm}>
						Confirm
					</Button>
					<Button style={button} size="lg" onClick={this.onCancel}>
						Cancel
					</Button>
				</div>
			);

		//<div>{this.props.schema.description}</div>
		let title = null;
		if (this.props.schema !== null) title = this.props.schema.title;
		let multiTabForm = (
			<div>
				<h3>{title}</h3>
				<p>{hasEditableChildren ? string_bandpass_warning : ""}</p>
				<div style={style}>
					<div style={treeStyle}>
						<TreeMenu
							data={this.dataTree}
							onClickItem={({ key, label, ...props }) => {
								console.log(props);
								this.onItemChange(key);
								//this.navigate(props.url); // user defined prop
							}}
							openNodes={paths}
							initialActiveKey={activeFormKey}
							debounceTime={125}
							disableKeyboard={false}
							hasSearch={false}
							resetOpenNodesOnDataUpdate={false}
						>
							{({ search, items }) => (
								<>
									<ListGroup>
										{items.map((props) => (
											<ListItem {...props} />
										))}
									</ListGroup>
								</>
							)}
						</TreeMenu>
					</div>
					<div style={tabsStyle}>
						<Tabs
							onChange={this.onTabChange}
							// renderTabBar={() => <ScrollableTabBar />}
							// renderTabContent={() => <TabContent animatedWithMargin />}
							activeKey={this.state.activeKey}
						>
							{tabs}
						</Tabs>
					</div>
				</div>
				{buttons}
			</div>
		);
		if (this.props.modalContainer) {
			return (
				<ModalWindow overlaysContainer={this.props.overlaysContainer}>
					{multiTabForm};
				</ModalWindow>
			);
		} else {
			return multiTabForm;
		}
	}
}

/**
 * @todo Own file.
 */
