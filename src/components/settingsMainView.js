import React from "react";
import Button from "react-bootstrap/Button";

import MultiTabFormWithHeaderV2 from "./multiTabFormWithHeaderV2";
import PlaneView from "./planeView";
import ChannelView from "./channelView";

import { v4 as uuidv4 } from "uuid";

const validate = require("jsonschema").validate;

import {
	bool_isDebug,
	string_object,
	string_array,
	string_json_ext,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
} from "../constants";
const schemasOrder = [
	"Experiment.json",
	"Plane.json",
	"Channel.json",
	"TIRFSettings.json",
	"ImagingEnvironment.json",
	"MicroscopeSettings.json",
	"ObjectiveSettings.json",
];

export default class SettingMainView extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			elementList: [],
			elementData: Object.assign({}, this.props.settingData),
			componentsSchema: {},
			editingElement: -1,
		};

		console.log("settingSchemas");
		console.log(props.settingSchemas);
		console.log("componentSchemas");
		console.log(props.componentSchemas);

		Object.keys(props.settingSchemas).forEach((schemaIndex) => {
			let schema = props.settingSchemas[schemaIndex];
			let schema_id = schema.ID;
			//console.log("schema_id: " + schema_id);
			let index = schemasOrder.indexOf(schema_id);
			Object.keys(props.settingData).forEach((objIndex) => {
				let object = props.settingData[objIndex];
				if (props.activeTier < object.tier) return;
				if (schema_id !== object.Schema_ID) return;
				let validation = validate(object, schema);
				let validated = validation.valid;
				let newElement = {
					ID: schema.title + "_" + object.ID,
					schema_ID: schema_id,
					name: object.Name,
					validated: validated,
					obj: object,
				};
				this.state.elementList[index] = newElement;
			});
			if (
				this.state.elementList[index] === null ||
				this.state.elementList[index] == undefined
			) {
				let uuid = uuidv4();
				let newElementData;
				newElementData = {
					Name: `New ${schema.title}`,
					ID: uuid,
					Tier: schema.tier,
					Schema_ID: schema.ID,
					Version: schema.version,
				};
				Object.keys(schema.properties).forEach((key) => {
					if (schema.properties[key].type === string_array) {
						let currentNumber = string_currentNumberOf_identifier + key;
						let minNumber = string_minNumberOf_identifier + key;
						let maxNumber = string_maxNumberOf_identifier + key;
						if (schema.required.indexOf(key) != -1) {
							newElementData[currentNumber] = 1;
							newElementData[minNumber] = 1;
							newElementData[maxNumber] = -1;
						} else {
							newElementData[currentNumber] = 0;
							newElementData[minNumber] = 0;
							newElementData[maxNumber] = -1;
						}
					} else if (schema.properties[key].type === string_object) {
						let currentNumber = string_currentNumberOf_identifier + key;
						let minNumber = string_minNumberOf_identifier + key;
						let maxNumber = string_maxNumberOf_identifier + key;
						if (schema.required.indexOf(key) === -1) {
							newElementData[currentNumber] = 0;
							newElementData[minNumber] = 0;
							newElementData[maxNumber] = 1;
						}
					}
				});
				let newElement = {
					ID: schema.title + "_" + uuid,
					schema_ID: schema.ID,
					name: newElementData.Name,
					validated: false,
					obj: newElementData,
				};
				this.state.elementList[index] = newElement;
			}
			this.state.componentsSchema[schema_id] = schema;
		});

		this.onElementDataSave = this.onElementDataSave.bind(this);
		this.onElementDataCancel = this.onElementDataCancel.bind(this);
		this.getElementData = this.getElementData.bind(this);

		this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

		this.onClickEditExperiment = this.onClickEditExperiment.bind(this);
		this.onClickEditPlanes = this.onClickEditPlanes.bind(this);
		this.onClickEditChannels = this.onClickEditChannels.bind(this);
		this.onClickEditTIRFSettings = this.onClickEditTIRFSettings.bind(this);
		this.onClickEditImagingEnvironment = this.onClickEditImagingEnvironment.bind(
			this
		);
		this.onClickEditMicroscopeSettings = this.onClickEditMicroscopeSettings.bind(
			this
		);
		this.onClickEditObjectiveSettings = this.onClickEditObjectiveSettings.bind(
			this
		);

		this.props.updateElementData(this.state.elementData, true);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.componentsSchema !== null) {
			let componentsSchema = {};
			Object.keys(props.settingSchemas).forEach((schemaIndex) => {
				let schema = props.settingSchemas[schemaIndex];
				let schema_id = schema.ID;
				componentsSchema[schema_id] = schema;
			});
			let elementList = state.elementList;
			for (let i = 0; i < elementList.length; i++) {
				let element = elementList[i];
				let schema_id = element.schema_ID;
				let schema = componentsSchema[schema_id];
				let object = element.obj;
				let validation = validate(object, schema);
				let validated = validation.valid;
				element.validated = validated;
			}
			return {
				componentsSchema: componentsSchema,
			};
		}
	}

	areAllElementsValidated() {
		let elementList = this.state.elementList;
		for (let i = 0; i < elementList.length; i++) {
			if (!elementList[i].validated) {
				return false;
			}
		}
		return true;
	}

	onElementDataSave(id, data) {
		let elementList = this.state.elementList;
		for (let i = 0; i < elementList.length; i++) {
			if (elementList[i].ID === id) {
				elementList[i].validated = true;
				elementList[i].name = data.Name;
				break;
			}
		}
		let currentElementData = Object.assign({}, this.state.elementData);
		currentElementData[id] = Object.assign(currentElementData[id], data);
		this.setState({ elementData: currentElementData, editingElement: -1 });

		let validated = this.areAllElementsValidated();
		this.props.updateElementData(currentElementData, validated);
	}

	onElementDataCancel() {
		this.setState({ editingElement: -1 });
	}

	getElementData() {
		return Object.assign({}, this.state.elementData);
	}

	onClickEditExperiment() {
		let editingElement = schemasOrder.indexOf("Experiment.json");
		this.setState({
			editingElement: editingElement,
		});
	}
	onClickEditPlanes() {
		let editingElement = schemasOrder.indexOf("Plane.json");
		this.setState({
			editingElement: editingElement,
		});
	}
	onClickEditChannels() {
		let editingElement = schemasOrder.indexOf("Channel.json");
		this.setState({
			editingElement: editingElement,
		});
	}
	onClickEditTIRFSettings() {
		let editingElement = schemasOrder.indexOf("TIRFSettings.json");
		this.setState({
			editingElement: editingElement,
		});
	}
	onClickEditImagingEnvironment() {
		let editingElement = schemasOrder.indexOf("ImagingEnvironment.json");
		this.setState({
			editingElement: editingElement,
		});
	}
	onClickEditMicroscopeSettings() {
		let editingElement = schemasOrder.indexOf("MicroscopeSettings.json");
		this.setState({
			editingElement: editingElement,
		});
	}
	onClickEditObjectiveSettings() {
		let editingElement = schemasOrder.indexOf("ObjectiveSettings.json");
		this.setState({
			editingElement: editingElement,
		});
	}

	render() {
		// console.log("elementData");
		// console.log(elementData);
		let elementByType = {};
		Object.keys(this.state.elementData).forEach(function (key) {
			let element = this.state.elementData[key];
			let schemaID = element.Schema_ID.replace(string_json_ext, "");
			if (elementByType[schemaID] === undefined) {
				elementByType[schemaID] = {};
			}
			elementByType[schemaID][element.Name] = element.ID;
		});
		Object.keys(this.props.microscopeComponents).forEach((key) => {
			let element = this.props.microscopeComponents[key];
			let schemaID = element.Schema_ID.replace(string_json_ext, "");
			if (elementByType[schemaID] === undefined) {
				elementByType[schemaID] = {};
			}
			elementByType[schemaID][element.Name] = element.ID;
		});
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		const styleMainContainer = {
			width: width,
			height: height,
			boxSizing: "border-box",
			display: "flex",
			flexDirection: "column",
			flexWap: "wrap",
			justifyContent: "center",
			alignItems: "center",
			padding: "5px",
		};
		if (this.state.editingElement != -1) {
			let element = this.state.elementList[this.state.editingElement];
			if (bool_isDebug) {
				console.log("list");
				console.log(this.state.elementList);
				console.log("editing element " + this.state.editingElement);
				console.log("element " + element);
			}
			console.log(element);
			let schema_id = element.schema_ID;
			let obj = element.obj;
			let schema = this.state.componentsSchema[schema_id];
			if (this.state.editingElement == 1) {
				return (
					<div style={styleMainContainer}>
						<PlaneView
							schema={schema}
							inputData={obj}
							id={element.ID}
							onConfirm={this.onElementDataSave}
							onCancel={this.onElementDataCancel}
							overlaysContainer={this.props.overlaysContainer}
						/>
					</div>
				);
			} else if (this.state.editingElement == 2) {
				return (
					<ChannelView
						settingSchemas={this.props.settingSchemas}
						componentSchemas={this.props.componentSchemas}
						schema={schema}
						inputData={obj}
						id={element.ID}
						imagesPath={this.props.imagesPath}
						settingData={this.props.settingData}
						componentData={this.props.componentData}
						linkedFields={this.props.linkedFields}
						onConfirm={this.onElementDataSave}
						onCancel={this.onElementDataCancel}
						overlaysContainer={this.props.overlaysContainer}
						elementByType={elementByType}
						containerOffsetTop={this.props.containerOffsetTop}
						containerOffsetLeft={this.props.containerOffsetLeft}
						headerOffset={this.props.headerOffset}
					/>
				);
			} else {
				return (
					<div style={styleMainContainer}>
						<MultiTabFormWithHeaderV2
							settings={this.props.settingSchemas}
							schema={schema}
							inputData={obj}
							id={element.ID}
							onConfirm={this.onElementDataSave}
							onCancel={this.onElementDataCancel}
							overlaysContainer={this.props.overlaysContainer}
							currentChildrenComponentIdentifier={
								string_currentNumberOf_identifier
							}
							minChildrenComponentIdentifier={string_minNumberOf_identifier}
							maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
							elementByType={elementByType}
							modalContainer={true}
						/>
					</div>
				);
			}
		} else {
			let styleButton = {
				width: "250px",
				minWidth: "250px",
				height: "50px",
				minHeight: "50px",
				marginLeft: "5px",
				marginRight: "5px",
			};
			let styleEditButton = Object.assign(styleButton, {
				border: "5px ridge red",
			});
			let buttons1 = [];
			buttons1[0] = (
				<Button
					key={"Button-0"}
					onClick={this.onClickEditExperiment}
					style={styleEditButton}
					size="lg"
				>
					{"Edit Experiment"}
				</Button>
			);
			buttons1[1] = (
				<Button
					key={"Button-1"}
					onClick={this.onClickEditPlanes}
					style={styleEditButton}
					size="lg"
				>
					{"Edit Planes"}
				</Button>
			);
			buttons1[2] = (
				<Button
					key={"Button-2"}
					onClick={this.onClickEditChannels}
					style={styleEditButton}
					size="lg"
				>
					{"Edit Channels"}
				</Button>
			);
			buttons1[3] = (
				<Button
					key={"Button-3"}
					onClick={this.onClickEditTIRFSettings}
					style={styleEditButton}
					size="lg"
				>
					{"Edit TIRF Settings"}
				</Button>
			);
			buttons1[4] = (
				<Button
					key={"Button-4"}
					onClick={this.onClickEditImagingEnvironment}
					style={styleEditButton}
					size="lg"
				>
					{"Edit Imaging Environment"}
				</Button>
			);
			buttons1[5] = (
				<Button
					key={"Button-5"}
					onClick={this.onClickEditMicroscopeSettings}
					style={styleEditButton}
					size="lg"
				>
					{"Edit Microscope Settings"}
				</Button>
			);
			buttons1[6] = (
				<Button
					key={"Button-6"}
					onClick={this.onClickEditObjectiveSettings}
					style={styleEditButton}
					size="lg"
				>
					{"Edit Objective Settings"}
				</Button>
			);
			return <div style={styleMainContainer}>{buttons1}</div>;
		}
	}
}
