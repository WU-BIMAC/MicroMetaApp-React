import React from "react";
import ReactDOM from "react-dom";
//import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import ChannelCanvas_V2 from "./channelCanvas_V2";
import ModalWindow from "./modalWindow";

import { v4 as uuidv4 } from "uuid";

const validate = require("jsonschema").validate;

import {
	bool_isDebug,
	string_object,
	string_array,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
} from "../constants";

export default class ChannelView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			channels: this.props.inputData || [],
			editing: false,
			selectedIndex: -1,
			fluorophoreSchema: null,
			lightPathSchema: null,

			objective: null,
		};

		for (let index in props.settingSchemas) {
			let schema = props.settingSchemas[index];
			if (schema.ID === "LightPath.json") {
				this.state.lightPathSchema = schema;
				//console.log("schema found");
			}
		}

		for (let index in props.experimentalSchemas) {
			let schema = props.experimentalSchemas[index];
			if (schema.ID === "Fluorophore.json") {
				this.state.fluorophoreSchema = schema;
				//console.log("schema found");
			}
		}

		this.onAddElement = this.onAddElement.bind(this);
		this.onEditElement = this.onEditElement.bind(this);
		this.onRemoveElement = this.onRemoveElement.bind(this);
		this.onSelectElement = this.onSelectElement.bind(this);

		//this.onMoveElement = this.onMoveElement.bind(this);

		this.onElementDataCancel = this.onElementDataCancel.bind(this);
		this.onElementDataSave = this.onElementDataSave.bind(this);

		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onAddElement() {
		let uuid = uuidv4();
		let uuid2 = uuidv4();
		let uuid3 = uuidv4();
		let channelSchema = this.props.schema;
		let fluorophoreSchema = this.state.fluorophoreSchema;
		let lightPathSchema = this.state.lightPathSchema;
		let channels = this.state.channels.slice();
		let newChannelElementData = {
			Name: `${channelSchema.title} ${channels.length}`,
			ID: uuid,
			Tier: channelSchema.tier,
			Schema_ID: channelSchema.ID,
			Version: channelSchema.version,
		};
		Object.keys(channelSchema.properties).forEach((key) => {
			if (channelSchema.properties[key].type === string_array) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (channelSchema.required.indexOf(key) != -1) {
					newChannelElementData[currentNumber] = 1;
					newChannelElementData[minNumber] = 1;
					newChannelElementData[maxNumber] = -1;
				} else {
					newChannelElementData[currentNumber] = 0;
					newChannelElementData[minNumber] = 0;
					newChannelElementData[maxNumber] = -1;
				}
			} else if (channelSchema.properties[key].type === string_object) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (channelSchema.required.indexOf(key) === -1) {
					newChannelElementData[currentNumber] = 0;
					newChannelElementData[minNumber] = 0;
					newChannelElementData[maxNumber] = 1;
				}
			}
		});
		let newFluorophoreElementData = {
			Name: `${fluorophoreSchema.title} ${channels.length}`,
			ID: uuid2,
			Tier: fluorophoreSchema.tier,
			Schema_ID: fluorophoreSchema.ID,
			Version: fluorophoreSchema.version,
		};
		Object.keys(fluorophoreSchema.properties).forEach((key) => {
			if (fluorophoreSchema.properties[key].type === string_array) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (fluorophoreSchema.required.indexOf(key) != -1) {
					newFluorophoreElementData[currentNumber] = 1;
					newFluorophoreElementData[minNumber] = 1;
					newFluorophoreElementData[maxNumber] = -1;
				} else {
					newFluorophoreElementData[currentNumber] = 0;
					newFluorophoreElementData[minNumber] = 0;
					newFluorophoreElementData[maxNumber] = -1;
				}
			} else if (fluorophoreSchema.properties[key].type === string_object) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (fluorophoreSchema.required.indexOf(key) === -1) {
					newFluorophoreElementData[currentNumber] = 0;
					newFluorophoreElementData[minNumber] = 0;
					newFluorophoreElementData[maxNumber] = 1;
				}
			}
		});

		let newLightPathElementData = {
			Name: `${lightPathSchema.title} ${channels.length}`,
			ID: uuid3,
			Tier: lightPathSchema.tier,
			Schema_ID: lightPathSchema.ID,
			Version: lightPathSchema.version,
		};
		Object.keys(lightPathSchema.properties).forEach((key) => {
			if (lightPathSchema.properties[key].type === string_array) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (lightPathSchema.required.indexOf(key) != -1) {
					newLightPathElementData[currentNumber] = 1;
					newLightPathElementData[minNumber] = 1;
					newLightPathElementData[maxNumber] = -1;
				} else {
					newLightPathElementData[currentNumber] = 0;
					newLightPathElementData[minNumber] = 0;
					newLightPathElementData[maxNumber] = -1;
				}
			} else if (lightPathSchema.properties[key].type === string_object) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (lightPathSchema.required.indexOf(key) === -1) {
					newLightPathElementData[currentNumber] = 0;
					newLightPathElementData[minNumber] = 0;
					newLightPathElementData[maxNumber] = 1;
				}
			}
		});

		newChannelElementData.LightPath = newLightPathElementData;
		newChannelElementData.Fluorophore = newFluorophoreElementData;

		let objective = this.state.objective;
		if (objective !== null) {
			newChannelElementData.LightPath.ComponentSettings = {};
			newChannelElementData.LightPath.ComponentSettings.Objective = objective;
		}

		channels.push(newChannelElementData);
		this.setState({ channels: channels });
		if (bool_isDebug) console.log("added channel");
	}

	onRemoveElement() {
		let index = this.state.selectedIndex;
		let channels = this.state.channels.slice();
		if (index !== -1) {
			let removed = channels.splice(index, 1);
		} else {
			let removed = channels.pop();
		}
		this.setState({ channels: channels });
		if (bool_isDebug) console.log("removed channel");
	}

	onEditElement() {
		this.setState({ editing: true });
		if (bool_isDebug) console.log("edit channel");
	}

	onMoveElement() {}

	onElementDataSave(id, data) {
		// let channels = this.state.channels.slice();
		// let found = false;
		// for (let i = 0; i < channels.length; i++) {
		// 	let name_id = this.props.schema.title + "_" + channels[i].ID;
		// 	if (id === name_id) {
		// 		channels[i] = data;
		// 		found = true;
		// 		found = true;
		// 		break;
		// 	}
		// }
		// if (!found) {
		// 	//todo should never happen
		// 	console.log("issue with " + id);
		// }
		//this.setState({ channels: channels, editing: false });

		let index = this.state.selectedIndex;
		let channels = this.state.channels.slice();
		channels[index] = data;

		console.log(channels);
		console.log("saved channel");

		//let objective = data.LightPath.ComponentSettings.Objective;
		let objective = null;

		this.setState({ editing: false, channels: channels, objective: objective });
	}

	onElementDataCancel() {
		this.setState({ editing: false });
	}

	onSelectElement(e) {
		let index = e.currentTarget.dataset.id;
		this.setState({ selectedIndex: index });
	}

	onConfirm() {
		let channels = this.state.channels;
		let id = this.props.id;
		// console.log("channels");
		// console.log(channels);
		this.setState({ editing: false });
		this.props.onConfirm(id, channels);
	}

	onCancel() {
		this.props.onCancel();
	}

	render() {
		let index = this.state.selectedIndex;
		let channels = this.state.channels;
		// console.log("planes length " + planes.length);
		// console.log("planes");
		// console.log(planes);
		// console.log("index " + index);
		if (this.state.editing) {
			let schemas = [];
			schemas[0] = this.props.schema;
			schemas[1] = this.state.lightPathSchema;
			schemas[2] = this.state.fluorophoreSchema;
			let objects = [];
			let channel = channels[index];
			let lightPath = channels[index].LightPath;
			let fluorophore = channels[index].Fluorophore;
			objects[0] = channel;
			objects[1] = lightPath;
			objects[2] = fluorophore;

			return (
				<ChannelCanvas_V2
					activeTier={this.state.activeTier}
					imagesPath={this.props.imagesPath}
					id={channel.ID}
					schema={schemas}
					settingSchemas={this.props.settingSchemas}
					componentSchemas={this.props.componentSchemas}
					experimentalSchemas={this.props.experimentalSchemas}
					channelData={objects}
					settingData={this.props.settingData}
					componentData={this.props.componentData}
					linkedFields={this.props.linkedFields}
					updateElementData={this.props.updateElementData}
					updateLinkedFields={this.props.updateLinkedFields}
					overlaysContainer={this.props.overlaysContainer}
					containerOffsetTop={this.props.containerOffsetTop}
					containerOffsetLeft={this.props.containerOffsetLeft}
					headerOffset={this.props.headerOffset}
					onConfirm={this.onElementDataSave}
					onCancel={this.onElementDataCancel}
					elementByType={this.props.elementByType}
				/>
			);
		} else {
			const buttonContainerRow = {
				display: "flex",
				flexDirection: "row",
				flexWap: "wrap",
				justifyContent: "center",
				padding: "5px",
			};
			const button1 = {
				width: "50px",
				height: "50px",
				marginLeft: "5px",
				marginRight: "5px",
			};
			const button2 = {
				width: "250px",
				height: "50px",
				marginLeft: "5px",
				marginRight: "5px",
			};
			let list = [];
			for (let i = 0; i < channels.length; i++) {
				let channel = channels[i];
				let variant = "dark";
				if (i % 2 === 0) {
					variant = "light";
				}
				list.push(
					<ListGroup.Item
						action
						variant={variant}
						onClick={this.onSelectElement}
						key={"Channel-" + i}
						data-id={i}
					>
						{channel.Name}
					</ListGroup.Item>
				);
			}
			return (
				<ModalWindow overlaysContainer={this.props.overlaysContainer}>
					<div>
						<h3>{this.props.schema.title + "s"}</h3>
					</div>
					<div>
						<div>
							<ListGroup>{list}</ListGroup>
						</div>
						<div style={buttonContainerRow}>
							<Button style={button1} size="lg" onClick={this.onAddElement}>
								+
							</Button>
							<Button
								style={button2}
								size="lg"
								onClick={this.onEditElement}
								disabled={index === -1}
							>
								Edit selected
							</Button>
							<Button style={button1} size="lg" onClick={this.onRemoveElement}>
								-
							</Button>
						</div>
						<div style={buttonContainerRow}>
							<Button style={button2} size="lg" onClick={this.onConfirm}>
								Confirm
							</Button>
							<Button style={button2} size="lg" onClick={this.onCancel}>
								Cancel
							</Button>
						</div>
					</div>
				</ModalWindow>
			);
		}
	}
}
