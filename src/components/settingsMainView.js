import React from "react";
import Button from "react-bootstrap/Button";

import SettingComponentSelector from "./settingComponentSelector";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import PlaneView from "./planeView";
import ChannelView from "./channelView";
import PopoverTooltip from "./popoverTooltip";

import { v4 as uuidv4 } from "uuid";

const validate = require("jsonschema").validate;

import {
	string_object,
	string_array,
	string_json_ext,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
	edit_mic_table_settings,
	edit_sample_pos_settings,
	edit_obj_settings,
	edit_mic_settings,
	edit_img_env_settings,
	edit_channels,
	edit_planes,
	edit_channel,
} from "../constants";
const schemas = [
	"Experiment.json",
	"Plane.json",
	"Channel.json",
	"TIRFSettings.json", //TIRFHardwareModule
	"ImagingEnvironment.json", //EnvironmentalControlDevice
	"MicroscopeStandSettings.json", //InvertedMicroscopeStand, UprightMicroscopeStand
	"ObjectiveSettings.json", //Objective
	"SamplePositioningSettings.json", //Z-Drive, TurretObjectiveFocusing, IndividualObjectiveFocusing, MechanicalStage, PiezoElectricStage
	"MicroscopeTableSettings.json", //MicroscopeTable
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

const categories = [
	[],
	[],
	[],
	["TIRFHardwareModule"],
	["EnvironmentalControlDevice"],
	["InvertedMicroscopeStand", "UprightMicroscopeStand"],
	["Objective"],
	[
		"Z-Drive",
		"TurretObjectiveFocusing",
		"IndividualObjectiveFocusing",
		"MechanicalStage",
		"PiezoElectricStage",
	],
	["MicroscopeTable"],
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
			TIRFSettings: props.settingData.TIRFSettings || [],
			imagingEnv: props.settingData.ImagingEnvironment || [],
			micSettings: props.settingData.MicroscopeStandSettings,
			objSettings: props.settingData.ObjectiveSettings,
			samplePosSettings: props.settingData.SamplePositioningSettings || [],
			micTableSettings: props.settingData.MicroscopeTableSettings || [],

			settingSchemas: {},
			experimentalSchemas: {},
			componentSchemas: {},

			objective: null,
		};

		let settingData = {};
		if (props.settingData !== undefined && props.settingData !== null) {
			Object.keys(props.settingData).forEach((settIndex) => {
				let sett = props.settingData[settIndex];
				let schema_id = sett.Schema_ID;
				if (schema_id === "ObjectiveSettings.json") {
					this.state.objSettings = sett;
					let compID = sett.Component_ID;
					Object.keys(this.props.microscopeComponents).forEach((key) => {
						let element = this.props.microscopeComponents[key];
						if (element.ID === compID) this.state.objective = element;
					});
				}
			});
		}
		if (props.settingSchemas !== undefined && props.settingSchemas !== null) {
			Object.keys(props.settingSchemas).forEach((schemaIndex) => {
				let uuid = uuidv4();
				let schema = props.settingSchemas[schemaIndex];
				let schema_id = schema.ID;
				this.state.settingSchemas[schema_id] = schema;
				if (schema_id === "MicroscopeStandSettings.json") {
					if (
						this.state.micSettings === null ||
						this.state.micSettings === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							ModelVersion: schema.modelVersion,
							Extension: schema.extension,
							Domain: schema.domain,
							Category: schema.category,
						};
						this.state.micSettings = newElement;
						settingData.MicroscopeStandSettings = newElement;
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
				if (
					schema_id === "Experiment.json" &&
					this.props.hasExperimentalModel
				) {
					if (
						this.state.experiment === null ||
						this.state.experiment === undefined
					) {
						let newElement = {
							Name: `${schema.title}`,
							ID: uuid,
							Tier: schema.tier,
							Schema_ID: schema.ID,
							ModelVersion: schema.modelVersion,
							Extension: schema.extension,
							Domain: schema.domain,
							Category: schema.category,
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

		this.onElementDataSave = this.onElementDataSave.bind(this);
		this.onElementDataCancel = this.onElementDataCancel.bind(this);

		this.onClickEditSettings = this.onClickEditSettings.bind(this);

		this.props.updateSettingData(settingData, true);
	}

	onElementDataSave(id, data) {
		let settingData = {};
		if (id === elements.indexOf("exp")) {
			let oldExperiment = Object.assign({}, this.state.experiment);
			let newExperiment = Object.assign(oldExperiment, data);
			settingData.Experiment = newExperiment;
			this.setState({ editingElement: -1, experiment: newExperiment });
		} else if (id === elements.indexOf("planes")) {
			settingData.Planes = data;
			this.setState({ editingElement: -1, planes: data });
		} else if (id === elements.indexOf("channels")) {
			settingData.Channels = data;
			this.setState({
				editingElement: -1,
				channels: data,
			});
		} else if (id === elements.indexOf("tirfSettings")) {
			settingData.TIRFSettings = data;
			this.setState({
				editingElement: -1,
				TIRFSettings: data,
			});
		} else if (id === elements.indexOf("imgEnv")) {
			settingData.ImagingEnvironment = data;
			this.setState({
				editingElement: -1,
				imagingEnv: data,
			});
		} else if (id === elements.indexOf("micSettings")) {
			let newMicSettings = {};
			if (Object.keys(data).length > 0) {
				let oldMicSettings = Object.assign({}, this.state.micSettings);
				newMicSettings = Object.assign(oldMicSettings, data);
				settingData.MicroscopeStandSettings = newMicSettings;
			}
			this.setState({
				editingElement: -1,
				micSettings: newMicSettings,
			});
		} else if (id === elements.indexOf("objSettings")) {
			let newObjSettings = {};
			let objective = null;
			console.log("data");
			console.log(data);
			if (Object.keys(data).length > 0) {
				let oldObjSettings = this.state.objSettings;
				if (oldObjSettings !== null && oldObjSettings !== undefined) {
					let oldObjSettings = Object.assign({}, oldObjSettings);
					newObjSettings = Object.assign(oldObjSettings, data);
					if (
						oldObjSettings.ImmersionLiquid !== null &&
						oldObjSettings.ImmersionLiquid !== undefined
					) {
						let oldImmersionLiquid = Object.assign(
							{},
							oldObjSettings.ImmersionLiquid
						);
						let newImmersionLiquid = Object.assign(
							oldImmersionLiquid,
							data.ImmersionLiquid
						);
						newObjSettings.ImmersionLiquid = newImmersionLiquid;
					}
				} else {
					newObjSettings = data;
				}
				let compID = data.Component_ID;
				Object.keys(this.props.microscopeComponents).forEach((key) => {
					let element = this.props.microscopeComponents[key];
					if (element.ID === compID) objective = element;
				});
			}
			settingData.ObjectiveSettings = newObjSettings;
			this.setState({
				editingElement: -1,
				objSettings: newObjSettings,
				objective: objective,
			});
		} else if (id === elements.indexOf("samplePosSettings")) {
			settingData.SamplePositioningSettings = data;
			this.setState({
				editingElement: -1,
				samplePosSettings: data,
			});
		} else if (id === elements.indexOf("micTableSettings")) {
			settingData.MicroscopeTableSettings = data;
			this.setState({
				editingElement: -1,
				micTableSettings: data,
			});
		}

		this.props.updateSettingData(settingData, true);
	}

	onElementDataCancel() {
		this.setState({ editingElement: -1 });
		console.log('Cancel called from: settingsMainViews');
	}

	onClickEditSettings(editingElement) {
		this.setState({
			editingElement: editingElement,
		});
	}

	render() {
		let elementByType = {};
		let componentSchemas = this.state.componentSchemas;

		Object.keys(this.props.microscopeComponents).forEach((key) => {
			let element = this.props.microscopeComponents[key];

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

		const containerStyle = {
			width: `${width}px`,
			height: `${height}px`,
		};

		const styleMainContainer = {
			width: "100%",
			height: "100%",
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
			if (this.props.isDebug) {
				//TODO debug stuff
			}
			let obj = null;
			let schema_id = schemas[editingElement];
			let schema = null;
			let category = null;
			if (editingElement === elements.indexOf("exp")) {
				obj = this.state.experiment;
				schema = this.state.experimentalSchemas[schema_id];
			} else {
				if (editingElement === elements.indexOf("objSettings")) {
					obj = this.state.objSettings;
					schema = [];
					schema.push(this.state.settingSchemas[schema_id]);
					schema.push(this.state.experimentalSchemas["ImmersionLiquid.json"]);
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
					} else if (editingElement === elements.indexOf("samplePosSettings")) {
						obj = this.state.samplePosSettings;
					} else if (editingElement === elements.indexOf("micTableSettings")) {
						obj = this.state.micTableSettings;
					}
					schema = this.state.settingSchemas[schema_id];
				}
				category = categories[editingElement];
			}
			if (editingElement == elements.indexOf("planes")) {
				return (
					<div style={containerStyle}>
						<div style={styleMainContainer}>
							<PlaneView
								schema={schema}
								inputData={obj}
								imageMetadata={this.props.imageMetadata}
								id={editingElement}
								onConfirm={this.onElementDataSave}
								onCancel={this.onElementDataCancel}
								overlaysContainer={this.props.overlaysContainer}
								isDebug={this.props.isDebug}
							/>
						</div>
					</div>
				);
			} else if (editingElement == elements.indexOf("channels")) {
				return (
					<div style={containerStyle}>
						<div style={styleMainContainer}>
							<ChannelView
								settingSchemas={this.props.settingSchemas}
								componentSchemas={this.props.componentSchemas}
								experimentalSchemas={this.props.experimentalSchemas}
								schema={schema}
								inputData={obj}
								imageMetadata={this.props.imageMetadata}
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
								objective={this.state.objective}
								objectiveSettings={this.state.objSettings}
								isDebug={this.props.isDebug}
							/>
						</div>
					</div>
				);
			} else if (
				editingElement == elements.indexOf("imgEnv") ||
				editingElement == elements.indexOf("tirfSettings") ||
				editingElement == elements.indexOf("objSettings") ||
				editingElement == elements.indexOf("samplePosSettings") ||
				editingElement == elements.indexOf("micTableSettings")
			) {
				let maxNumberElement = -1;
				if (editingElement == elements.indexOf("objSettings")) {
					maxNumberElement = 1;
				}
				return (
					<div style={containerStyle}>
						<div style={styleMainContainer}>
							<SettingComponentSelector
								settingSchemas={this.props.settingSchemas}
								componentSchemas={this.props.componentSchemas}
								experimentalSchemas={this.props.experimentalSchemas}
								schema={schema}
								inputData={obj}
								imageMetadata={this.props.imageMetadata}
								id={editingElement}
								category={category}
								imagesPath={this.props.imagesPath}
								settingData={this.props.settingData}
								componentData={this.props.componentData}
								linkedFields={this.props.linkedFields}
								onConfirm={this.onElementDataSave}
								onCancel={this.onElementDataCancel}
								overlaysContainer={this.props.overlaysContainer}
								elementByType={elementByType}
								maxNumberElement={maxNumberElement}
								isDebug={this.props.isDebug}
							/>
						</div>
					</div>
				);
			} else {
				return (
					<div style={containerStyle}>
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
								isDebug={this.props.isDebug}
							/>
						</div>
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
			const infoStyle = {
				position: "absolute",
				left: "10px",
				top: "90px",
			};
			const styleValidation = {
				position: "absolute",
				verticalAlign: "middle",
				fontWeight: "bold",
				textAlign: "center",
			};
			const styleValidated = Object.assign({}, styleValidation, {
				color: "green",
			});
			const styleNotValidated = Object.assign({}, styleValidation, {
				color: "red",
			});
			let isValid = <div style={styleValidated}>&#9679;</div>;
			let isInvalid = <div style={styleNotValidated}>&#9679;</div>;

			let buttons = [];

			let category = null;
			let disabled = false;

			let settingsInfo = [];
			let localSettingInfo = this.props.setting;
			//console.log("localSettingInfo");
			//console.log(localSettingInfo);
			if (localSettingInfo !== null && localSettingInfo !== undefined) {
				if (
					localSettingInfo.Name !== undefined &&
					localSettingInfo.Name !== null
				) {
					settingsInfo.push(`Image Name: ${localSettingInfo.Name}`);
					settingsInfo.push(<br key={"newline-1"} />);
				}
				if (
					localSettingInfo.Pixels !== undefined &&
					localSettingInfo.Pixels !== null
				) {
					let pixels = localSettingInfo.Pixels;
					if (
						pixels.SizeX !== null &&
						pixels.SizeX !== undefined &&
						pixels.SizeY !== null &&
						pixels.SizeY !== undefined
					) {
						settingsInfo.push(
							`Dimensions (XY): ${pixels.SizeX} x ${pixels.SizeY}`
						);
						settingsInfo.push(<br key={"newline-2"} />);
					}
					if (
						pixels.SizeC !== null &&
						pixels.SizeC !== undefined &&
						pixels.SizeT !== null &&
						pixels.SizeT !== undefined &&
						pixels.SizeZ !== null &&
						pixels.SizeZ !== undefined
					) {
						settingsInfo.push(
							`Dimensions (CTZ): ${pixels.SizeC} x ${pixels.SizeT} x ${pixels.SizeZ}`
						);
						settingsInfo.push(<br key={"newline-3"} />);
					}
				}
			}
			//console.log("settingsInfo");
			//console.log(settingsInfo);

			let index = elements.indexOf("exp");
			let schema_id = schemas[index];
			let object = this.state.experiment;
			let schema = this.state.experimentalSchemas[schema_id];
			let schemaHasProp = false;
			if (schema !== null && schema !== undefined)
				schemaHasProp = Object.keys(schema.properties).length > 0;
			let validation = null;
			let validated = null;
			let valid = null;
			if (this.props.hasExperimentalModel) {
				validated = false;
				if (object !== null && object !== undefined && schemaHasProp) {
					validation = validate(object, schema);
					validated = validation.valid;
				}
				if (object !== null && object !== undefined && object.length > 0) {
					if (validated) {
						valid = isValid;
					} else {
						valid = isInvalid;
					}
				}
				disabled = true;
				if (schemaHasProp) disabled = false;
				buttons.push(
					<Button
						key={"Button-Experiment"}
						onClick={() => this.onClickEditSettings(elements.indexOf("exp"))}
						style={styleButton}
						size="lg"
						disabled={disabled}
					>
						{disabled ? null : valid}
						{"Edit Experiment"}
					</Button>
				);
			}

			index = elements.indexOf("tirfSettings");
			schema_id = schemas[index];
			object = this.state.TIRFSettings;
			schema = this.state.settingSchemas[schema_id];
			schemaHasProp = false;
			if (schema !== null && schema !== undefined)
				schemaHasProp = Object.keys(schema.properties).length > 0;
			if (this.props.hasAdvancedModel) {
				validated = false;
				if (object !== null && object !== undefined && schemaHasProp) {
					if (Array.isArray(object)) {
						validated = true;
						for (let index in object) {
							let obj = object[index];
							validation = validate(obj, schema);
							validated = validated && validation.valid;
						}
					} else {
						validation = validate(object, schema);
						validated = validation.valid;
					}
				}
				valid = null;
				if (object !== null && object !== undefined && object.length > 0) {
					if (validated) {
						valid = isValid;
					} else {
						valid = isInvalid;
					}
				}
				category = categories[index];
				disabled = true;
				if (schemaHasProp)
					for (let catIndex in category) {
						let cat = category[catIndex];
						let ele = elementByType[cat];
						if (ele !== null && ele !== undefined) disabled = false;
					}
				buttons.push(
					<Button
						key={"Button-TIRF"}
						onClick={() =>
							this.onClickEditSettings(elements.indexOf("tirfSettings"))
						}
						style={styleButton}
						size="lg"
						disabled={disabled}
					>
						{disabled ? null : valid}
						{"Edit TIRF Settings"}
					</Button>
				);
			}

			index = elements.indexOf("imgEnv");
			schema_id = schemas[index];
			object = this.state.imagingEnv;
			schema = this.state.settingSchemas[schema_id];
			schemaHasProp = false;
			if (schema !== null && schema !== undefined)
				schemaHasProp = Object.keys(schema.properties).length > 0;
			validated = false;
			if (object !== null && object !== undefined && schemaHasProp) {
				if (Array.isArray(object)) {
					validated = true;
					for (let index in object) {
						let obj = object[index];
						validation = validate(obj, schema);
						validated = validated && validation.valid;
					}
				} else {
					validation = validate(object, schema);
					validated = validation.valid;
				}
			}
			valid = null;
			if (object !== null && object !== undefined && object.length > 0) {
				if (validated) {
					valid = isValid;
				} else {
					valid = isInvalid;
				}
			}
			category = categories[index];
			disabled = true;
			if (schemaHasProp)
				for (let catIndex in category) {
					let cat = category[catIndex];
					let ele = elementByType[cat];
					if (ele !== null && ele !== undefined) disabled = false;
				}
			buttons.push(
				<PopoverTooltip
					key={"TooltipButton-ImgEnv"}
					position={edit_img_env_settings.position}
					title={edit_img_env_settings.title}
					content={edit_img_env_settings.content}
					element={
						<Button
							key={"Button-ImgEnv"}
							onClick={() =>
								this.onClickEditSettings(elements.indexOf("imgEnv"))
							}
							style={styleButton}
							size="lg"
							disabled={disabled}
						>
							{disabled ? null : valid}
							{"Edit Imaging Environment"}
						</Button>
					}
				/>
			);

			index = elements.indexOf("micTableSettings");
			schema_id = schemas[index];
			object = this.state.micTableSettings;
			schema = this.state.settingSchemas[schema_id];
			schemaHasProp = false;
			if (schema !== null && schema !== undefined)
				schemaHasProp = Object.keys(schema.properties).length > 0;
			validated = false;
			if (object !== null && object !== undefined && schemaHasProp) {
				if (Array.isArray(object)) {
					validated = true;
					for (let index in object) {
						let obj = object[index];
						validation = validate(obj, schema);
						validated = validated && validation.valid;
					}
				} else {
					validation = validate(object, schema);
					validated = validation.valid;
				}
			}
			valid = null;
			if (object !== null && object !== undefined && object.length > 0) {
				if (validated) {
					valid = isValid;
				} else {
					valid = isInvalid;
				}
			}
			category = categories[index];
			disabled = true;
			if (schemaHasProp)
				for (let catIndex in category) {
					let cat = category[catIndex];
					let ele = elementByType[cat];
					if (ele !== null && ele !== undefined) disabled = false;
				}
			buttons.push(
				<PopoverTooltip
					key={"TooltipButton-MicTableSettings"}
					position={edit_mic_table_settings.position}
					title={edit_mic_table_settings.title}
					content={edit_mic_table_settings.content}
					element={
						<Button
							key={"Button-MicTableSettings"}
							onClick={() =>
								this.onClickEditSettings(elements.indexOf("micTableSettings"))
							}
							style={styleButton}
							size="lg"
							disabled={disabled}
						>
							{disabled ? null : valid}
							{"Edit Microscope Table Settings"}
						</Button>
					}
				/>
			);

			index = elements.indexOf("micSettings");
			schema_id = schemas[index];
			object = this.state.micSettings;
			schema = this.state.settingSchemas[schema_id];
			schemaHasProp = false;
			if (schema !== null && schema !== undefined)
				schemaHasProp = Object.keys(schema.properties).length > 0;
			validated = false;
			if (schemaHasProp) {
				validation = validate(object, schema);
				validated = validation.valid;
			}
			valid = null;
			if (validated) {
				valid = isValid;
			} else {
				valid = isInvalid;
			}
			disabled = false;
			if (!schemaHasProp) disabled = true;
			buttons.push(
				<PopoverTooltip
					key={"TooltipButton-MicSettings"}
					position={edit_mic_settings.position}
					title={edit_mic_settings.title}
					content={edit_mic_settings.content}
					element={
						<Button
							key={"Button-MicSettings"}
							onClick={() =>
								this.onClickEditSettings(elements.indexOf("micSettings"))
							}
							style={styleButton}
							size="lg"
							disabled={disabled}
						>
							{disabled ? null : valid}
							{"Edit Microscope Stand Settings"}
						</Button>
					}
				/>
			);

			index = elements.indexOf("objSettings");
			schema_id = schemas[index];
			let immersionLiquidSchema =
				this.state.experimentalSchemas["ImmersionLiquid.json"];
			object = this.state.objSettings;
			schema = this.state.settingSchemas[schema_id];
			schemaHasProp = false;
			if (schema !== null && schema !== undefined) {
				let schemaHasProp1 = Object.keys(schema.properties).length > 0;
				let schemaHasProp2 =
					Object.keys(immersionLiquidSchema.properties).length > 0;
				schemaHasProp = schemaHasProp1 || schemaHasProp2;
			}
			validated = false;
			if (object !== null && object !== undefined && schemaHasProp) {
				validation = validate(object, schema);
				let validated1 = validation.valid;
				let validated2 = false;
				if (
					object.ImmersionLiquid !== null &&
					object.ImmersionLiquid !== undefined
				) {
					let validation2 = validate(
						object.ImmersionLiquid,
						immersionLiquidSchema
					);
					validated2 = validation2.valid;
				}
				validated = validated1 && validated2;
			}
			valid = null;
			if (validated) {
				valid = isValid;
			} else {
				valid = isInvalid;
			}
			category = categories[index];
			disabled = true;
			if (schemaHasProp)
				for (let catIndex in category) {
					let cat = category[catIndex];
					let ele = elementByType[cat];
					if (ele !== null && ele !== undefined) disabled = false;
				}
			buttons.push(
				<PopoverTooltip
					key={"TooltipButton-ObjSettings"}
					position={edit_obj_settings.position}
					title={edit_obj_settings.title}
					content={edit_obj_settings.content}
					element={
						<Button
							key={"Button-ObjSettings"}
							onClick={() =>
								this.onClickEditSettings(elements.indexOf("objSettings"))
							}
							style={styleButton}
							size="lg"
							disabled={disabled}
						>
							{disabled ? null : valid}
							{"Edit Objective Settings"}
						</Button>
					}
				/>
			);

			index = elements.indexOf("samplePosSettings");
			schema_id = schemas[index];
			object = this.state.samplePosSettings;
			schema = this.state.settingSchemas[schema_id];
			schemaHasProp = false;
			if (schema !== null && schema !== undefined)
				schemaHasProp = Object.keys(schema.properties).length > 0;
			validated = false;
			if (object !== null && object !== undefined && schemaHasProp) {
				if (Array.isArray(object)) {
					validated = true;
					for (let index in object) {
						let obj = object[index];
						validation = validate(obj, schema);
						validated = validated && validation.valid;
					}
				} else {
					validation = validate(object, schema);
					validated = validation.valid;
				}
			}
			valid = null;
			if (object !== null && object !== undefined && object.length > 0) {
				if (validated) {
					valid = isValid;
				} else {
					valid = isInvalid;
				}
			}
			category = categories[index];
			disabled = true;
			if (schemaHasProp)
				for (let catIndex in category) {
					let cat = category[catIndex];
					let ele = elementByType[cat];
					if (ele !== null && ele !== undefined) disabled = false;
				}
			buttons.push(
				<PopoverTooltip
					key={"TooltipButton-SamplePosSettings"}
					position={edit_sample_pos_settings.position}
					title={edit_sample_pos_settings.title}
					content={edit_sample_pos_settings.content}
					element={
						<Button
							key={"Button-SamplePosSettings"}
							onClick={() =>
								this.onClickEditSettings(elements.indexOf("samplePosSettings"))
							}
							style={styleButton}
							size="lg"
							disabled={disabled}
						>
							{disabled ? null : valid}
							{"Edit Sample Positioning Settings"}
						</Button>
					}
				/>
			);

			index = elements.indexOf("planes");
			schema_id = schemas[index];
			object = this.state.planes;
			schema = this.state.settingSchemas[schema_id];
			validated = false;
			if (object !== null && object !== undefined) {
				if (Array.isArray(object)) {
					validated = true;
					for (let index in object) {
						let obj = object[index];
						validation = validate(obj, schema);
						validated = validated && validation.valid;
					}
				} else {
					validation = validate(object, schema);
					validated = validation.valid;
				}
			}
			valid = null;
			if (object !== null && object !== undefined && object.length > 0) {
				if (validated) {
					valid = isValid;
				} else {
					valid = isInvalid;
				}
			}
			buttons.push(
				<PopoverTooltip
					key={"TooltipButton-Planes"}
					position={edit_planes.position}
					title={edit_planes.title}
					content={edit_planes.content}
					element={
						<Button
							key={"Button-Planes"}
							onClick={() =>
								this.onClickEditSettings(elements.indexOf("planes"))
							}
							style={styleButton}
							size="lg"
						>
							{valid}
							{"Edit Planes"}
						</Button>
					}
				/>
			);

			index = elements.indexOf("channels");
			schema_id = schemas[index];
			object = this.state.channels;
			schema = this.state.settingSchemas[schema_id];
			let lightPathSchema = this.state.settingSchemas["LightPath.json"];
			let fluorophoreSchema =
				this.state.experimentalSchemas["Fluorophore.json"];
			validated = false;
			if (object !== null && object !== undefined) {
				if (Array.isArray(object)) {
					validated = true;
					for (let index in object) {
						let obj = object[index];
						validation = validate(obj, schema);
						validated = validated && validation.valid;
						let validation2 = validate(obj.LightPath, lightPathSchema);
						validated = validated && validation2.valid;
						let validation3 = validate(obj.Fluorophore, fluorophoreSchema);
						validated = validated && validation3.valid;
					}
				} else {
					validation = validate(object, schema);
					validated = validation.valid;
				}
			}
			valid = null;
			if (object !== null && object !== undefined && object.length > 0) {
				if (validated) {
					valid = isValid;
				} else {
					valid = isInvalid;
				}
			}
			buttons.push(
				<PopoverTooltip
					key={"TooltipButton-Channels"}
					position={edit_channels.position}
					title={edit_channels.title}
					content={edit_channels.content}
					element={
						<Button
							key={"Button-Channels"}
							onClick={() =>
								this.onClickEditSettings(elements.indexOf("channels"))
							}
							style={styleButton}
							size="lg"
						>
							{valid}
							{"Edit Channels"}
						</Button>
					}
				/>
			);

			return (
				<div style={containerStyle}>
					<div style={infoStyle}>
						<p>{settingsInfo}</p>
					</div>
					<div style={styleMainContainer}>{buttons}</div>
				</div>
			);
		}
	}
}