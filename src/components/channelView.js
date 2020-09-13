import React from "react";
import ReactDOM from "react-dom";
//import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import MultiTabFormWithHeaderV2 from "./multiTabFormWithHeaderV2";
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
			channels:
				this.props.inputData.channels !== undefined
					? this.props.inputData.channels
					: [],
			editing: false,
			selectedIndex: -1,
		};

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
		let schema = this.props.schema;
		let channels = this.state.channels.slice();
		let newElementData = {
			Name: `${schema.title} ${channels.length}`,
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

		channels.push(newElementData);
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
		let channels = this.state.channels.slice();
		let found = false;
		for (let i = 0; i < channels.length; i++) {
			let name_id = this.props.schema.title + "_" + channels[i].ID;
			if (id === name_id) {
				channels[i] = data;
				found = true;
				found = true;
				break;
			}
		}
		if (!found) {
			//todo should never happen
			console.log("issue with " + id);
		}
		this.setState({ channels: channels, editing: false });

		console.log("saved channel");
	}

	onElementDataCancel() {
		this.setState({ editing: false });
	}

	onSelectElement(e) {
		let index = e.currentTarget.dataset.id;
		this.setState({ selectedIndex: index });
	}

	onConfirm() {
		let output = { channels: this.state.channels };
		let outputData = Object.assign(this.props.inputData, output);
		let id = this.props.schema.title + "_" + this.props.inputData.ID;
		console.log(outputData);
		this.setState({ editing: false });
		//this.props.onConfirm(id, outputData);
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
			let schema = this.props.schema;
			let obj = channels[index];
			return (
				<MultiTabFormWithHeaderV2
					schemas={this.props.schemas}
					schema={schema}
					inputData={obj}
					id={this.props.id}
					onConfirm={this.onElementDataSave}
					onCancel={this.onElementDataCancel}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={string_currentNumberOf_identifier}
					minChildrenComponentIdentifier={string_minNumberOf_identifier}
					maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
					elementByType={this.props.elementByType}
				/>
			);
		} else {
			const buttonContainerRow = {
				display: "flex",
				flexDirection: "row",
				flexWap: "wrap",
				justifyContent: "center",
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
							<Button style={button2} size="lg" onClick={this.onConfirm}>
								Confirm
							</Button>
							<Button style={button2} size="lg" onClick={this.onCancel}>
								Cancel
							</Button>
						</div>
					</div>
					<div></div>
				</ModalWindow>
			);
		}
	}
}
