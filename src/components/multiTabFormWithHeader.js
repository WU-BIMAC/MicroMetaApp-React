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
			activeKey: "0"
		};

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

		//this.revalidateForm = this.revalidateForm.bind(this);

		// console.log("constructor");
		// console.log(this.props.schema);
		this.partialSchema = MultiTabFormWithHeader.transformSchema(
			this.props.schema
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

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.schema !== null) {
	// 		console.log("getDerivedStateFromProps");
	// 		console.log(props.schema);
	// 		let partialSchema = MultiTabFormWithHeader.transformSchema(props.schema);
	// 		let partialInputData = [];
	// 		if (props.inputData !== undefined) {
	// 			partialInputData = MultiTabFormWithHeader.transformInputData(
	// 				props.inputData,
	// 				partialSchema
	// 			);
	// 		}
	// 		//let forms = this.createForms(partialSchema, partialInputData);
	// 		return {
	// 			partialSchema: partialSchema,
	// 			partialInputData: partialInputData
	// 		};
	// 	}
	// 	return null;
	// }

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
		this.props.onConfirm(this.props.id, consolidatedData);
	}

	processErrors() {
		let currentErrors = this.errors;
		let numberOfForms = this.formRefs.length;
		//console.log(currentErrors);
		if (currentErrors.length < numberOfForms) return;
		for (let i = 0; i < currentErrors.length; i++) {
			if (currentErrors[i] !== null) {
				this.setState({ activeKey: `${i}` });
				return;
			}
		}
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
		data.map(item => {
			Object.keys(item.formData).forEach(key => {
				consolidatedData[key] = item.formData[key];
			});
		});
		return consolidatedData;
	}

	static transformInputData(inputData, partialSchema) {
		let partialInputData = [];
		Object.keys(partialSchema).forEach(key => {
			if (partialInputData[key] === undefined) partialInputData[key] = {};
			Object.keys(partialSchema[key].properties).forEach(propKey => {
				partialInputData[key][propKey] = inputData[propKey];
			});
		});
		return partialInputData;
	}

	static transformSchema(schema) {
		let partialSchema = [];
		Object.keys(schema.properties).forEach(key => {
			let category = schema.properties[key].category;
			let keysForCategory = partialSchema[category];
			if (keysForCategory === undefined || keysForCategory === null) {
				keysForCategory = { properties: {} };
			}
			keysForCategory.properties[key] = schema.properties[key];
			partialSchema[category] = keysForCategory;
		});
		Object.keys(partialSchema).forEach(key => {
			partialSchema[key].title = key;
			partialSchema[key].type = "object";
			let required = [];
			if (schema.required !== undefined) {
				Object.keys(partialSchema[key].properties).forEach(propKey => {
					if (schema.required.indexOf(propKey) != -1) required.push(propKey);
				});
			}
			if (required.length !== 0) partialSchema[key].required = required;
		});
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

	render() {
		const confirmButton = {
			width: "250px",
			marginLeft: "5px",
			marginRight: "5px"
		};
		const cancelButton = {
			width: "250px",
			marginLeft: "5px",
			marginRight: "5px"
		};
		let partialSchema = this.partialSchema;
		let forms = this.forms;
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
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWap: "wrap",
							justifyContent: "center"
						}}
					>
						<Button style={confirmButton} size="lg" onClick={this.onConfirm}>
							Confirm
						</Button>
						<Button style={cancelButton} size="lg" onClick={this.onCancel}>
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
