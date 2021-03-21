import React from "react";
import ReactDOM from "react-dom";
//import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import ChannelCanvas_V2 from "./channelCanvas_V2";
import ModalWindow from "./modalWindow";
import PopoverTooltip from "./popoverTooltip";

import { v4 as uuidv4 } from "uuid";

const validate = require("jsonschema").validate;

import {
	bool_isDebug,
	string_object,
	string_array,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
	edit_channel,
	add_channel,
	remove_channel,
	remove_plane,
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
			}
		}

		for (let index in props.experimentalSchemas) {
			let schema = props.experimentalSchemas[index];
			if (schema.ID === "Fluorophore.json") {
				this.state.fluorophoreSchema = schema;
			}
		}
		if (
			this.props.imageMetadata !== null &&
			this.props.imageMetadata !== undefined &&
			this.props.imageMetadata.Channels !== null &&
			this.props.imageMetadata.Channels !== undefined
		) {
			let channels = this.props.imageMetadata.Channels;
			for (let i = 0; i < channels.length; i++) {
				let channelSchema = this.props.schema;
				let fluorophoreSchema = this.state.fluorophoreSchema;
				let lightPathSchema = this.state.lightPathSchema;
				let oldChannel = channels[i];
				let newChannelElementData = {
					Name: `${channelSchema.title} ${channels.length}`,
					ID: uuidv4(),
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
					ID: uuidv4(),
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
					ID: uuidv4(),
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
				this.state.channels[i] = Object.assign(
					{},
					newChannelElementData,
					oldChannel
				);
				this.state.channels[i].LightPath = Object.assign(
					{},
					newLightPathElementData,
					oldChannel.LightPath
				);
				this.state.channels[i].Fluorophore = Object.assign(
					{},
					newFluorophoreElementData,
					oldChannel.Fluorophore
				);
			}
		}

		this.onAddElement = this.onAddElement.bind(this);
		this.onEditElement = this.onEditElement.bind(this);
		this.onRemoveElement = this.onRemoveElement.bind(this);
		this.onSelectElement = this.onSelectElement.bind(this);

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
	}

	onEditElement() {
		this.setState({ editing: true });
	}

	onMoveElement() {}

	onElementDataSave(id, data) {
		let index = this.state.selectedIndex;
		let channels = this.state.channels.slice();
		channels[index] = data;

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
		this.setState({ editing: false });
		this.props.onConfirm(id, channels);
	}

	onCancel() {
		this.props.onCancel();
	}

	render() {
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

		let index = this.state.selectedIndex;
		let channels = this.state.channels;
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
					objective={this.props.objective}
					objectiveSettings={this.props.objectiveSettings}
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
			const nameStyle = {
				display: "flex",
				flexDirection: "row",
			};
			let list = [];
			for (let i = 0; i < channels.length; i++) {
				let channel = channels[i];
				let variant = "dark";
				if (i % 2 === 0) {
					variant = "light";
				}

				let validation1 = validate(channel, this.props.schema);
				let validated1 = validation1.valid;
				let validated2 = false;
				if (channel.Fluorophore !== undefined || channel.Fluorophore !== null) {
					let validation2 = validate(
						channel.Fluorophore,
						this.state.fluorophoreSchema
					);
					validated2 = validation2.valid;
				}
				let validated3 = false;
				if (channel.LightPath !== undefined || channel.LightPath !== null) {
					let validation3 = validate(
						channel.LightPath,
						this.state.lightPathSchema
					);
					validated3 = validation3.valid;
				}
				let valid = null;
				if (validated1 && validated2 && validated3) {
					valid = isValid;
				} else {
					valid = isInvalid;
				}
				let channelName = channel.Name;

				list.push(
					<ListGroup.Item
						action
						variant={variant}
						onClick={this.onSelectElement}
						key={"Channel-" + i}
						data-id={i}
					>
						<div style={nameStyle}>
							<div style={{ width: "24px" }}>{valid}</div>
							<div>{channelName}</div>
						</div>
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
							<PopoverTooltip
								key={"TooltipButton-Add"}
								position={add_channel.position}
								title={add_channel.title}
								content={add_channel.content}
								element={
									<Button style={button1} size="lg" onClick={this.onAddElement}>
										+
									</Button>
								}
							/>

							<PopoverTooltip
								key={"TooltipButton-Edit"}
								position={edit_channel.position}
								title={edit_channel.title}
								content={edit_channel.content}
								element={
									<Button
										style={button2}
										size="lg"
										onClick={this.onEditElement}
										disabled={index === -1}
									>
										Edit selected
									</Button>
								}
							/>

							<PopoverTooltip
								key={"TooltipButton-Remove"}
								position={remove_channel.position}
								title={remove_channel.title}
								content={remove_channel.content}
								element={
									<Button
										style={button1}
										size="lg"
										onClick={this.onRemoveElement}
									>
										-
									</Button>
								}
							/>
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
