import React from "react";
import Button from "react-bootstrap/Button";

import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import PlaneView from "./planeView";
import ChannelView from "./channelView";

import { v4 as uuidv4 } from "uuid";

const validate = require("jsonschema").validate;

import {
	bool_isDebug,
	bool_hasAdvanced,
	bool_hasExperimental,
	string_object,
	string_array,
	string_json_ext,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
} from "../constants";
const schemas = [
	"Experiment.json",
	"Plane.json",
	"Channel.json",
	"TIRFSettings.json",
	"ImagingEnvironment.json",
	"MicroscopeSettings.json",
	"ObjectiveSettings.json",
	"SamplePositioningSettings.json",
	"MicroscopeTableSettings.json",
];

const elements = [
	"exp",
	"planes",
	"channels",
	"tirfSettings",
	"imgEnv",
	"micSettings",
	"objSettings",
	"samplePosSettings",
	"micTableSettings",
];

export default class SettingMainView extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			// elementList: [],
			// elementData: Object.assign({}, this.props.settingData),
			// componentsSchema: {},
			// experimentalSchema: {},
			editingElement: -1,

			experiment: props.settingData.Experiment,
			planes: props.settingData.Planes || [],
			channels: props.settingData.Channels || [],
			TIRFSettings: props.settingData.TIRFSettings,
			imagingEnv: props.settingData.ImagingEnvironment,
			micSettings: props.settingData.MicroscopeSettings,
			objSettings: props.settingData.ObjectiveSettings,
			samplePosSettings: props.settingData.SamplePositioningSettings,
			micTableSettings: props.settingData.MicroscopeTableSettings,

			settingSchemas: {},
			experimentalSchemas: {},
			componentSchemas: {},

			objective: null,
		};

		let settingData = {};
		if (props.settingSchemas !== undefined && props.settingSchemas !== null) {
			Object.keys(props.settingSchemas).forEach((schemaIndex) => {
				let uuid = uuidv4();
				let schema = props.settingSchemas[schemaIndex];
				let schema_id = schema.ID;
				this.state.settingSchemas[schema_id] = schema;
				if (schema_id === "TIRFSettings.json" && bool_hasAdvanced) {
					if (
						this.state.TIRFSettings === null ||
						this.state.TIRFSettings === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							Version: schema.version,
						};
						this.state.TIRFSettings = newElement;
						settingData.TIRFSettings = newElement;
					}
				} else if (schema_id === "ImagingEnvironment.json") {
					if (
						this.state.imagingEnv === null ||
						this.state.imagingEnv === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							Version: schema.version,
						};
						this.state.imagingEnv = newElement;
						settingData.ImagingEnvironment = newElement;
					}
				} else if (schema_id === "MicroscopeSettings.json") {
					if (
						this.state.micSettings === null ||
						this.state.micSettings === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							Version: schema.version,
						};
						this.state.micSettings = newElement;
						settingData.MicroscopeSettings = newElement;
					}
				} else if (schema_id === "ObjectiveSettings.json") {
					if (
						this.state.objSettings === null ||
						this.state.objSettings === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							Version: schema.version,
						};
						this.state.objSettings = newElement;
						settingData.ObjectiveSettings = newElement;
					}
				} else if (schema_id === "SamplePositioningSettings.json") {
					if (
						this.state.samplePosSettings === null ||
						this.state.samplePosSettings === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							Version: schema.version,
						};
						this.state.samplePosSettings = newElement;
						settingData.SamplePositioningSettings = newElement;
					}
				} else if (schema_id === "MicroscopeTableSettings.json") {
					if (
						this.state.micTableSettings === null ||
						this.state.micTableSettings === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							Version: schema.version,
						};
						this.state.micTableSettings = newElement;
						settingData.MicroscopeTableSettings = newElement;
					}
				}
			});
		}

		if (
			props.experimentalSchemas !== undefined &&
			props.experimentalSchemas !== null
		) {
			Object.keys(props.experimentalSchemas).forEach((schemaIndex) => {
				let uuid = uuidv4();
				let schema = props.experimentalSchemas[schemaIndex];
				let schema_id = schema.ID;
				this.state.experimentalSchemas[schema_id] = schema;
				if (schema_id === "Experiment.json" && bool_hasExperimental) {
					if (
						this.state.experiment === null ||
						this.state.experiment === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							Version: schema.version,
						};
						this.state.experiment = newElement;
						settingData.Experiment = newElement;
					}
				}
			});
		}

		if (
			props.componentSchemas !== undefined &&
			props.componentSchemas !== null
		) {
			Object.keys(props.componentSchemas).forEach((schemaIndex) => {
				let schema = props.componentSchemas[schemaIndex];
				let schema_id = schema.ID;
				this.state.componentSchemas[schema_id] = schema;
			});
		}

		// console.log("settingSchemas");
		// console.log(this.state.settingSchemas);
		// console.log("expSchemas");
		// console.log(this.state.experimentalSchemas);

		this.onElementDataSave = this.onElementDataSave.bind(this);
		this.onElementDataCancel = this.onElementDataCancel.bind(this);
		//this.getElementData = this.getElementData.bind(this);

		//this.areAllElementsValidated = this.areAllElementsValidated.bind(this);

		this.onClickEditSettings = this.onClickEditSettings.bind(this);

		this.props.updateSettingData(settingData, true);
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.settingSchemas !== null || props.experimentalSchemas !== null) {
	// 		let settingsSchema = {};
	// 		if (props.settingSchemas !== null)
	// 			Object.keys(props.settingSchemas).forEach((schemaIndex) => {
	// 				let schema = props.settingSchemas[schemaIndex];
	// 				let schema_id = schema.ID;
	// 				settingsSchema[schema_id] = schema;
	// 			});
	// 		if (props.experimentalSchemas !== null)
	// 			Object.keys(props.experimentalSchemas).forEach((schemaIndex) => {
	// 				let schema = props.experimentalSchemas[schemaIndex];
	// 				let schema_id = schema.ID;
	// 				settingsSchema[schema_id] = schema;
	// 			});
	// 		let elementList = state.elementList;
	// 		for (let i = 0; i < elementList.length; i++) {
	// 			let element = elementList[i];
	// 			//console.log(element);
	// 			let schema_id = element.schema_ID;
	// 			let schema = settingsSchema[schema_id];
	// 			let object = element.obj;
	// 			let validation = validate(object, schema);
	// 			let validated = validation.valid;
	// 			element.validated = validated;
	// 		}
	// 		return {
	// 			componentsSchema: settingsSchema,
	// 		};
	// 	}
	// }

	// areAllElementsValidated() {
	// 	let elementList = this.state.elementList;
	// 	for (let i = 0; i < elementList.length; i++) {
	// 		if (!elementList[i].validated) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }

	onElementDataSave(id, data) {
		let settingData = {};
		console.log("save " + elements[id]);
		console.log(data);
		if (id === elements.indexOf("exp")) {
			let experiment = this.state.experiment;
			let newExperiment = Object.assign(experiment, data);
			settingData.Experiment = newExperiment;
			this.setState({ editingElement: -1, experiment: newExperiment });
		} else if (id === elements.indexOf("planes")) {
			settingData.Planes = data;
			this.setState({ editingElement: -1, planes: data });
		} else if (id === elements.indexOf("channels")) {
			let objective = null;
			// let objective = this.state.objective;
			// if (objective === null) {
			// 	objective = data[0].LightPath.ComponentSettings.Objective;
			// }
			settingData.Channels = data;
			this.setState({
				editingElement: -1,
				channels: data,
				objective: objective,
			});
		} else if (id === elements.indexOf("tirfSettings")) {
			let TIRFSettings = this.state.TIRFSettings;
			let newTIRFSettings = Object.assign(TIRFSettings, data);
			settingData.TIRFSettings = newTIRFSettings;
			this.setState({ editingElement: -1, TIRFSettings: newTIRFSettings });
		} else if (id === elements.indexOf("imgEnv")) {
			let imagingEnv = this.state.imagingEnv;
			let newImagingEnv = Object.assign(imagingEnv, data);
			settingData.ImagingEnvironment = newImagingEnv;
			this.setState({ editingElement: -1, imagingEnv: newImagingEnv });
		} else if (id === elements.indexOf("micSettings")) {
			let micSettings = this.state.micSettings;
			let newMicSettings = Object.assign(micSettings, data);
			settingData.MicroscopeSettings = newMicSettings;
			this.setState({ editingElement: -1, micSettings: newMicSettings });
		} else if (id === elements.indexOf("objSettings")) {
			let objSettings = this.state.objSettings;
			let newObjSettings = Object.assign(objSettings, data);
			settingData.ObjectiveSettings = newObjSettings;
			this.setState({ editingElement: -1, micSettings: newObjSettings });
		} else if (id === elements.indexOf("samplePosSettings")) {
			let samplePosSettings = this.state.samplePosSettings;
			let newSamplePosSettings = Object.assign(samplePosSettings, data);
			settingData.SamplePositioningSettings = newSamplePosSettings;
			this.setState({
				editingElement: -1,
				samplePosSettings: newSamplePosSettings,
			});
		} else if (id === elements.indexOf("micTableSettings")) {
			let micTableSettings = this.state.micTableSettings;
			let newMicTableSettings = Object.assign(micTableSettings, data);
			settingData.MicroscopeTableSettings = newMicTableSettings;
			this.setState({
				editingElement: -1,
				micTableSettings: newMicTableSettings,
			});
		}

		//let validated = this.areAllElementsValidated();
		this.props.updateSettingData(settingData, true);
	}

	onElementDataCancel() {
		this.setState({ editingElement: -1 });
	}

	// getElementData() {
	// 	return Object.assign({}, this.state.elementData);
	// }

	onClickEditSettings(editingElement) {
		this.setState({
			editingElement: editingElement,
		});
	}
	// onClickEditPlanes() {
	// 	let editingElement = schemasOrder.indexOf("Plane.json");
	// 	this.setState({
	// 		editingElement: "Planes",
	// 	});
	// }
	// onClickEditChannels() {
	// 	let editingElement = schemasOrder.indexOf("Channel.json");
	// 	this.setState({
	// 		editingElement: "Channels",
	// 	});
	// }
	// onClickEditTIRFSettings() {
	// 	let editingElement = schemasOrder.indexOf("TIRFSettings.json");
	// 	this.setState({
	// 		editingElement: "TIRFSettings",
	// 	});
	// }
	// onClickEditImagingEnvironment() {
	// 	let editingElement = schemasOrder.indexOf("ImagingEnvironment.json");
	// 	this.setState({
	// 		editingElement: "ImgEnv",
	// 	});
	// }
	// onClickEditMicroscopeSettings() {
	// 	let editingElement = schemasOrder.indexOf("MicroscopeSettings.json");
	// 	this.setState({
	// 		editingElement: "MicSettings",
	// 	});
	// }
	// onClickEditObjectiveSettings() {
	// 	let editingElement = schemasOrder.indexOf("ObjectiveSettings.json");
	// 	//ImmersionLiquid should go here
	// 	this.setState({
	// 		editingElement: "ObjSettings",
	// 	});
	// }

	// onClickEditSamplePositioningSettings() {
	// 	let editingElement = schemasOrder.indexOf("SamplePositioningSettings.json");
	// 	this.setState({
	// 		editingElement: "SamplePosSettings",
	// 	});
	// }

	// onClickEditMicroscopeTableSettings() {
	// 	let editingElement = schemasOrder.indexOf("MicroscopeTableSettings.json");
	// 	this.setState({
	// 		editingElement: "MicTableSettings",
	// 	});
	// }

	render() {
		// console.log("elementData");
		// console.log(elementData);
		let elementByType = {};
		// Object.keys(this.state.elementData).forEach(function (key) {
		// 	let element = this.state.elementData[key];
		// 	let schemaID = element.Schema_ID.replace(string_json_ext, "");
		// 	if (elementByType[schemaID] === undefined) {
		// 		elementByType[schemaID] = {};
		// 	}
		// 	elementByType[schemaID][element.Name] = element.ID;
		// });
		let componentSchemas = this.state.componentSchemas;
		Object.keys(this.props.microscopeComponents).forEach((key) => {
			let element = this.props.microscopeComponents[key];
			// let schemaID = element.Schema_ID.replace(string_json_ext, "");
			// if (elementByType[schemaID] === undefined) {
			// 	elementByType[schemaID] = {};
			// }
			// elementByType[schemaID][element.Name] = element.ID;

			let schemaID = element.Schema_ID.replace(string_json_ext, "");
			let itemSchema = componentSchemas[element.Schema_ID];
			let schemaCategory = itemSchema.category;
			if (
				elementByType[schemaID] === undefined ||
				elementByType[schemaID] === null
			) {
				elementByType[schemaID] = {};
			}
			if (
				elementByType[schemaCategory] === undefined ||
				elementByType[schemaCategory] === null
			) {
				elementByType[schemaCategory] = {};
			}
			elementByType[schemaID][element.ID] = element.Name;
			elementByType[schemaCategory][element.ID] = element.Name;
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
		let editingElement = this.state.editingElement;
		if (editingElement !== -1) {
			//let element = this.state.elementList[editingElement];
			if (bool_isDebug) {
				//TODO debug stuff
			}
			let obj = null;
			let schema_id = schemas[editingElement];
			let schema = null;
			if (editingElement === elements.indexOf("exp")) {
				obj = this.state.experiment;
				schema = this.state.experimentalSchemas[schema_id];
			} else {
				if (editingElement === elements.indexOf("planes")) {
					obj = this.state.planes;
				} else if (editingElement === elements.indexOf("channels")) {
					obj = this.state.channels;
				} else if (editingElement === elements.indexOf("tirfSettings")) {
					obj = this.state.TIRFSettings;
				} else if (editingElement === elements.indexOf("imgEnv")) {
					obj = this.state.imagingEnv;
				} else if (editingElement === elements.indexOf("micSettings")) {
					obj = this.state.micSettings;
				} else if (editingElement === elements.indexOf("objSettings")) {
					obj = this.state.objSettings;
				} else if (editingElement === elements.indexOf("samplePosSettings")) {
					obj = this.state.samplePosSettings;
				} else if (editingElement === elements.indexOf("micTableSettings")) {
					obj = this.state.micTableSettings;
				}
				schema = this.state.settingSchemas[schema_id];
			}
			console.log("setting schema");
			console.log(schema);
			console.log("setting obj");
			console.log(obj);
			if (editingElement == elements.indexOf("planes")) {
				return (
					<div style={styleMainContainer}>
						<PlaneView
							schema={schema}
							inputData={obj}
							id={editingElement}
							onConfirm={this.onElementDataSave}
							onCancel={this.onElementDataCancel}
							overlaysContainer={this.props.overlaysContainer}
						/>
					</div>
				);
			} else if (this.state.editingElement == elements.indexOf("channels")) {
				return (
					<ChannelView
						settingSchemas={this.props.settingSchemas}
						componentSchemas={this.props.componentSchemas}
						experimentalSchemas={this.props.experimentalSchemas}
						schema={schema}
						inputData={obj}
						id={editingElement}
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
						<MultiTabFormWithHeaderV3
							settings={this.props.settingSchemas}
							schema={schema}
							inputData={obj}
							id={editingElement}
							onConfirm={this.onElementDataSave}
							onCancel={this.onElementDataCancel}
							overlaysContainer={this.props.overlaysContainer}
							currentChildrenComponentIdentifier={
								string_currentNumberOf_identifier
							}
							minChildrenComponentIdentifier={string_minNumberOf_identifier}
							maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
							elementByType={elementByType}
							editable={true}
						/>
					</div>
				);
			}
		} else {
			let styleButton = {
				width: "500px",
				minWidth: "500px",
				height: "50px",
				minHeight: "50px",
				margin: "5px",
				// marginLeft: "5px",
				// marginRight: "5px",
			};
			let styleEditButton = Object.assign({}, styleButton, {
				border: "5px ridge red",
			});
			let buttons = [];

			let index = elements.indexOf("exp");
			let schema_id = schemas[index];
			let object = this.state.experiment;
			let schema = this.state.experimentalSchemas[schema_id];
			let validation = null;
			let validated = null;
			let styleButt = null;
			if (bool_hasExperimental) {
				validation = validate(object, schema);
				validated = validation.valid;
				styleButt = styleButton;
				if (!validated) styleButt = styleEditButton;
				buttons.push(
					<Button
						key={"Button-Experiment"}
						onClick={() => this.onClickEditSettings(elements.indexOf("exp"))}
						style={styleButt}
						size="lg"
					>
						{"Edit Experiment"}
					</Button>
				);
			}

			index = elements.indexOf("tirfSettings");
			schema_id = schemas[index];
			object = this.state.TIRFSettings;
			schema = this.state.settingSchemas[schema_id];
			if (bool_hasAdvanced) {
				validation = validate(object, schema);
				validated = validation.valid;
				styleButt = styleButton;
				if (!validated) styleButt = styleEditButton;
				buttons.push(
					<Button
						key={"Button-TIRF"}
						onClick={() =>
							this.onClickEditSettings(elements.indexOf("tirfSettings"))
						}
						style={styleButt}
						size="lg"
					>
						{"Edit TIRF Settings"}
					</Button>
				);
			}

			index = elements.indexOf("imgEnv");
			schema_id = schemas[index];
			object = this.state.imagingEnv;
			schema = this.state.settingSchemas[schema_id];
			validation = validate(object, schema);
			validated = validation.valid;
			styleButt = styleButton;
			if (!validated) styleButt = styleEditButton;
			buttons.push(
				<Button
					key={"Button-ImgEnv"}
					onClick={() => this.onClickEditSettings(elements.indexOf("imgEnv"))}
					style={styleButt}
					size="lg"
				>
					{"Edit Imaging Environment"}
				</Button>
			);

			index = elements.indexOf("micTableSettings");
			schema_id = schemas[index];
			object = this.state.micTableSettings;
			schema = this.state.settingSchemas[schema_id];
			validation = validate(object, schema);
			validated = validation.valid;
			styleButt = styleButton;
			if (!validated) styleButt = styleEditButton;
			buttons.push(
				<Button
					key={"Button-MicTableSettings"}
					onClick={() =>
						this.onClickEditSettings(elements.indexOf("micTableSettings"))
					}
					style={styleButt}
					size="lg"
				>
					{"Edit Microscope Table Settings"}
				</Button>
			);

			index = elements.indexOf("micSettings");
			schema_id = schemas[index];
			object = this.state.micSettings;
			schema = this.state.settingSchemas[schema_id];
			validation = validate(object, schema);
			validated = validation.valid;
			styleButt = styleButton;
			if (!validated) styleButt = styleEditButton;
			buttons.push(
				<Button
					key={"Button-MicSettings"}
					onClick={() =>
						this.onClickEditSettings(elements.indexOf("micSettings"))
					}
					style={styleButt}
					size="lg"
				>
					{"Edit Microscope Settings"}
				</Button>
			);

			index = elements.indexOf("objSettings");
			schema_id = schemas[index];
			object = this.state.objSettings;
			schema = this.state.settingSchemas[schema_id];
			validation = validate(object, schema);
			validated = validation.valid;
			styleButt = styleButton;
			if (!validated) styleButt = styleEditButton;
			buttons.push(
				<Button
					key={"Button-ObjSettings"}
					onClick={() =>
						this.onClickEditSettings(elements.indexOf("objSettings"))
					}
					style={styleButt}
					size="lg"
				>
					{"Edit Objective Settings"}
				</Button>
			);

			index = elements.indexOf("samplePosSettings");
			schema_id = schemas[index];
			object = this.state.samplePosSettings;
			schema = this.state.settingSchemas[schema_id];
			validation = validate(object, schema);
			validated = validation.valid;
			styleButt = styleButton;
			if (!validated) styleButt = styleEditButton;
			buttons.push(
				<Button
					key={"Button-SamplePosSettings"}
					onClick={() =>
						this.onClickEditSettings(elements.indexOf("samplePosSettings"))
					}
					style={styleButt}
					size="lg"
				>
					{"Edit Sample Positioning Settings"}
				</Button>
			);

			index = elements.indexOf("planes");
			styleButt = styleButton;
			buttons.push(
				<Button
					key={"Button-Planes"}
					onClick={() => this.onClickEditSettings(elements.indexOf("planes"))}
					style={styleButt}
					size="lg"
				>
					{"Edit Planes"}
				</Button>
			);

			index = elements.indexOf("channels");
			styleButt = styleButton;
			buttons.push(
				<Button
					key={"Button-Channels"}
					onClick={() => this.onClickEditSettings(elements.indexOf("channels"))}
					style={styleButt}
					size="lg"
				>
					{"Edit Channels"}
				</Button>
			);

			return <div style={styleMainContainer}>{buttons}</div>;
		}
	}
}
