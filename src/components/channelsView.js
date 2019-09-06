import React from "react";
import ReactDOM from "react-dom";
import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import MultiTabFormWithHeader from "./multiTabFormWithHeader";
import ModalWindow from "./modalWindow";

const validate = require("jsonschema").validate;
const uuidv4 = require("uuid/v4");

const currentNumberOf_identifier = "Number_Of_";
const minNumberOf_identifier = "Min_Number_Of_";
const maxNumberOf_identifier = "Max_Number_Of_";

export default class ChannelView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			channels:
				this.props.inputData.channels !== undefined
					? this.props.inputData.channels
					: [],
			editing: false,
			selectedIndex: -1
		};

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
		let schema = this.props.schema;
		let channels = this.state.channels.slice();
		let newElementData = {
			Name: `${schema.title} ${channels.length}`,
			ID: uuid,
			Tier: schema.tier,
			Schema_ID: schema.ID,
			Version: schema.version
		};
		Object.keys(schema.properties).forEach(key => {
			if (schema.properties[key].type === "array") {
				let currentNumber = currentNumberOf_identifier + key;
				let minNumber = minNumberOf_identifier + key;
				let maxNumber = maxNumberOf_identifier + key;
				if (schema.required.indexOf(key) != -1) {
					newElementData[currentNumber] = 1;
					newElementData[minNumber] = 1;
					newElementData[maxNumber] = -1;
				} else {
					newElementData[currentNumber] = 0;
					newElementData[minNumber] = 0;
					newElementData[maxNumber] = -1;
				}
			} else if (schema.properties[key].type === "object") {
				let currentNumber = currentNumberOf_identifier + key;
				let minNumber = minNumberOf_identifier + key;
				let maxNumber = maxNumberOf_identifier + key;
				if (schema.required.indexOf(key) === -1) {
					newElementData[currentNumber] = 0;
					newElementData[minNumber] = 0;
					newElementData[maxNumber] = 1;
				}
			}
		});

		channels.push(newElementData);
		this.setState({ channels: channels });
		console.log("added plane");
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
		console.log("removed plane");
	}

	onEditElement() {
		this.setState({ editing: true });
		console.log("edit plane");
	}

	onElementDataSave(id, data) {
		let channels = this.state.channels.slice();
		let found = false;
		for (let i = 0; i < channels.length; i++) {
			let name_id = this.props.schema.title + "_" + channels[i].ID;
			if (id === name_id) {
				channels[i] = data;
				found = true;
				break;
			}
		}
		if (!found) {
			//todo should never happen
			console.log("issue with " + id);
		}
		this.setState({ channels: channels, editing: false });

		console.log("saved plane");
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
				<MultiTabFormWithHeader
					schema={schema}
					inputData={obj}
					id={schema.title + "_" + obj.ID}
					onConfirm={this.onElementDataSave}
					onCancel={this.onElementDataCancel}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={currentNumberOf_identifier}
					minChildrenComponentIdentifier={minNumberOf_identifier}
					maxChildrenComponentIdentifier={maxNumberOf_identifier}
					elementByType={this.props.elementByType}
				/>
			);
		} else {
			const buttonContainerRow = {
				display: "flex",
				flexDirection: "row",
				flexWap: "wrap",
				justifyContent: "center"
			};
			const button1 = {
				width: "50px",
				height: "50px",
				marginLeft: "5px",
				marginRight: "5px"
			};
			const button2 = {
				width: "250px",
				height: "50px",
				marginLeft: "5px",
				marginRight: "5px"
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
				</ModalWindow>
			);
		}
	}
}
