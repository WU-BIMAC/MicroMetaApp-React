import React from "react";
import ReactDOM from "react-dom";
import Form from "react-jsonschema-form";
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableTabBar from "rc-tabs/lib/TabBar";
import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";

export default class MultiTabFormWithHeader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showForm: true,
			currentChildrenComponents: {},
			minChildrenComponents: {},
			maxChildrenComponents: {},
			tmpData: {},
			activeKey: "0"
		};

		if (
			props.inputData !== null &&
			props.childrenComponentIdentifier !== null &&
			props.minChildrenComponentIdentifier !== null &&
			props.maxChildrenComponentIdentifier !== null
		) {
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

		this.buttons = [];
		this.formRefs = [];
		this.data = [];
		this.errors = [];

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onError = this.onError.bind(this);
		this.onTabChange = this.onTabChange.bind(this);

		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.createForms = this.createForms.bind(this);

		this.processData = this.processData.bind(this);
		this.processErrors = this.processErrors.bind(this);

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
		this.initializeForms();
	}

	initializeForms() {
		let currentChildrenComponents = this.state.currentChildrenComponents;
		this.partialSchema = MultiTabFormWithHeader.transformSchema(
			currentChildrenComponents,
			this.props.schema,
			this.props.elementByType
		);
		let partialInputData = [];
		if (this.props.inputData !== undefined) {
			partialInputData = MultiTabFormWithHeader.transformInputData(
				this.props.inputData,
				this.partialSchema
			);
		}

		this.forms = this.createForms(this.partialSchema, partialInputData);
	}

	static getDerivedStateFromProps(props, state) {
		return { state };
	}

	onChange() {}

	onSubmit(data) {
		let currentData = this.data.slice();
		let currentErrors = this.errors.slice();
		currentData.push(data);
		currentErrors.push(null);
		this.data = currentData;
		this.errors = currentErrors;
		this.processData();
	}

	onError(errors) {
		let currentData = this.data.slice();
		let currentErrors = this.errors.slice();
		currentData.push(null);
		currentErrors.push(errors);
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
		Object.keys(currentChildrenComponents).forEach(function(key) {
			let attr = attrName + key;
			consolidatedData[attr] = currentChildrenComponents[key];
		});
		this.props.onConfirm(this.props.id, consolidatedData);
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
		data.map(function(item) {
			let container = item.schema.container;
			let subType = item.schema.subType;
			let counter = item.schema.counter;
			Object.keys(item.formData).forEach(function(key) {
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

	static findInputPropKeyValue(propKey, inputData) {
		let value = null;
		for (let key in inputData) {
			//Object.keys(inputData).forEach(function (key) {
			if (inputData[key] instanceof Array || inputData[key] instanceof Object) {
				if (inputData[key][propKey] !== undefined)
					return inputData[key][propKey];
				else
					value = MultiTabFormWithHeader.findInputPropKeyValue(
						propKey,
						inputData[key]
					);
			}
		}
		return value;
	}

	static transformInputData(inputData, partialSchema) {
		let partialInputData = [];
		//TODO find data inside objects and arrays
		Object.keys(partialSchema).forEach(function(key) {
			if (partialInputData[key] === undefined) partialInputData[key] = {};
			Object.keys(partialSchema[key].properties).forEach(function(propKey) {
				if (inputData[propKey] !== undefined)
					partialInputData[key][propKey] = inputData[propKey];
				else
					partialInputData[key][
						propKey
					] = MultiTabFormWithHeader.findInputPropKeyValue(propKey, inputData);
			});
		});
		return partialInputData;
	}

	static transformSchemaCategorizeField(
		currentChildrenComponents,
		schema,
		elementByType,
		counter,
		subType
	) {
		let partialSchema = {};
		Object.keys(schema.properties).forEach(function(key) {
			let property = schema.properties[key];
			if (property.type === "object") {
				let localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(
					currentChildrenComponents,
					property,
					elementByType,
					-1,
					"object"
				);
				partialSchema = Object.assign(partialSchema, localPartialSchema);
				return;
			} else if (property.type === "array") {
				let count = 0;
				for (let inputKey in currentChildrenComponents) {
					if (key.includes(inputKey)) {
						count = currentChildrenComponents[inputKey];
						break;
					}
				}
				for (let i = 0; i < count; i++) {
					let localPartialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(
						currentChildrenComponents,
						property.items,
						elementByType,
						i,
						"array"
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
					type: "object",
					subType: subType,
					container: category,
					counter: counter,
					properties: {}
				};
			}

			//keysForCategory.properties[key] = property;
			let newProperty = Object.assign({}, property);

			if (property.linkTo !== undefined) {
				newProperty["enum"] = ["na"];
				newProperty["enumNames"] = ["Not assigned"];
				if (elementByType[property.linkTo] !== undefined) {
					let propElementByType = elementByType[property.linkTo];
					Object.keys(propElementByType).forEach(function(
						propElementByTypeName
					) {
						let propElementByTypeID = propElementByType[propElementByTypeName];
						newProperty["enum"].push(
							property.linkTo + "/" + propElementByTypeID
						);
						newProperty["enumNames"].push(propElementByTypeName);
					});
				}
				console.log("old prop");
				console.log(property);
				console.log("new prop");
				console.log(newProperty);
			}
			keysForCategory.properties[key] = newProperty;
			partialSchema[newCategory] = keysForCategory;
		});
		Object.keys(partialSchema).forEach(function(key) {
			let required = [];
			if (schema.required !== undefined) {
				Object.keys(partialSchema[key].properties).forEach(function(propKey) {
					if (schema.required.indexOf(propKey) != -1) required.push(propKey);
				});
			}
			if (required.length !== 0) partialSchema[key].required = required;
		});
		return partialSchema;
	}

	static transformSchema(currentChildrenComponents, schema, elementByType) {
		let partialSchema = MultiTabFormWithHeader.transformSchemaCategorizeField(
			currentChildrenComponents,
			schema,
			elementByType,
			-1,
			"default"
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

	createForms(partialSchema, partialInputData) {
		// Maybe ModalWindow could wrap entire <SchemaForm> (in CanvasElement render method)
		// instead of being rendered by <SchemaForm> if SchemaForm could be later used in other places.
		let currentButtons = [];
		let currentFormRefs = [];
		let partialUISchema = this.createUISchema(partialSchema);
		let currentForms = Object.keys(partialSchema).map((item, index) => (
			<Form
				schema={partialSchema[item]}
				uiSchema={partialUISchema[item]}
				onChange={this.onChange}
				onSubmit={this.onSubmit}
				onError={this.onError}
				formData={partialInputData[item]}
				showErrorList={false}
				ref={form => {
					currentFormRefs[index] = form;
				}}
				style={{ overflow: "hidden" }}
			>
				<button
					ref={btn => {
						currentButtons[index] = btn;
					}}
					style={{ display: "none" }}
				/>
			</Form>
		));
		this.buttons = currentButtons;
		this.formRefs = currentFormRefs;
		return currentForms;
	}

	onTabChange(key) {
		this.setState({
			activeKey: key
		});
	}
	//Around tabs
	//<div style={{ overflow: "scroll", height: "90%" }} />
	//<div />

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
		let showForm = this.state.showForm;
		let childrenButtons = this.createChildrenComponentsButton();
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
		let partialSchema = this.partialSchema;
		let forms = this.forms;
		let hasChildren = Object.keys(currentChildrenComponents).length > 0;
		return (
			<ModalWindow overlaysContainer={this.props.overlaysContainer}>
				<div>
					<div>{this.props.schema.title}</div>
					<div>{this.props.schema.description}</div>
					<Tabs
						onChange={this.onTabChange}
						renderTabBar={() => <ScrollableTabBar />}
						renderTabContent={() => <TabContent animatedWithMargin />}
						activeKey={this.state.activeKey}
					>
						{Object.keys(partialSchema).map((item, index) => (
							<TabPane tab={item} key={index} forceRender={true}>
								{forms[index]}
							</TabPane>
						))}
					</Tabs>
					<div style={buttonContainerRow}>
						<Button
							style={button}
							size="lg"
							variant={!hasChildren ? "secondary" : "primary"}
							onClick={!hasChildren ? null : this.onEditComponents}
							disabled={!hasChildren}
						>
							Edit components
						</Button>
						<Button style={button} size="lg" onClick={this.onConfirm}>
							Confirm
						</Button>
						<Button style={button} size="lg" onClick={this.onCancel}>
							Cancel
						</Button>
					</div>
				</div>
			</ModalWindow>
		);
	}
}

/**
 * @todo Own file.
 */
export class ModalWindow extends React.PureComponent {
	render() {
		return ReactDOM.createPortal(
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					bottom: 0,
					right: 0,
					backgroundColor: "rgba(0,0,0,0.33)",
					display: "flex",
					alignItems: "center"
				}}
			>
				<div
					style={{
						width: "80%",
						marginLeft: "auto",
						marginRight: "auto",
						backgroundColor: "#fff",
						height: "80%",
						padding: 10,
						borderRadius: 5,
						boxShadow: "0 1px 6px -2px #000",
						overflow: "auto"
					}}
				>
					{this.props.children}
				</div>
			</div>,
			this.props.overlaysContainer
		);
	}
}
