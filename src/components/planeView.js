import React from "react";
import ReactDOM from "react-dom";
//import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
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

const multiplePlanesSchema = {
	$schema: "http://json-schema.org/draft-07/schema",
	ID: "MultiplePlanesSchema.json",
	type: "object",
	title: "Add Multiple Planes",
	description: "Insert the required values to add multiple planes at once.",
	tier: 1,
	subCategoriesOrder: {
		General: "General information about the element",
	},
	properties: {
		NumberOfPlanes: {
			type: "integer",
			description: "Insert the number of planes desired.",
			tier: 1,
			category: "General",
		},
		"Z-Increment": {
			type: "boolean",
			description: "Select this if you want the increment to be on Z.",
			tier: 1,
			category: "General",
		},
		"T-Increment": {
			type: "boolean",
			description: "Select this if you want the increment to be on T.",
			tier: 1,
			category: "General",
		},
		"C-Increment": {
			type: "boolean",
			description: "Select this if you want the increment to be on C.",
			tier: 1,
			category: "General",
		},
		"TimeStamp-Increment": {
			type: "integer",
			description: "How much does time increment for each plane.",
			tier: 1,
			category: "General",
		},
	},
	required: [
		"NumberOfPlanes",
		"Z-Increment",
		"T-Increment",
		"C-Increment",
		"TimeStamp-Increment",
	],
};

export default class PlaneView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			planes: this.props.inputData || [],
			editing: false,
			selectedIndex: -1,

			addingMultiplePlanes: false,
			addingMultiplePlanes2: false,
			addingMultiplePlanesSetup: null,
		};

		this.onAddElement = this.onAddElement.bind(this);
		this.onEditElement = this.onEditElement.bind(this);
		this.onRemoveElement = this.onRemoveElement.bind(this);
		this.onSelectElement = this.onSelectElement.bind(this);

		this.onElementDataCancel = this.onElementDataCancel.bind(this);
		this.onElementDataSave = this.onElementDataSave.bind(this);

		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.onAddMultiplePlanes = this.onAddMultiplePlanes.bind(this);
	}

	onAddElement() {
		let uuid = uuidv4();
		let schema = this.props.schema;
		let planes = this.state.planes.slice();
		let newElementData = {
			//Name: `${schema.title} ${planes.length}`,
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

		planes.push(newElementData);
		this.setState({ planes: planes });
		if (bool_isDebug) console.log("added plane");
	}

	onRemoveElement() {
		let index = this.state.selectedIndex;
		let planes = this.state.planes.slice();
		if (index !== -1) {
			let removed = planes.splice(index, 1);
		} else {
			let removed = planes.pop();
		}
		this.setState({ planes: planes });
		if (bool_isDebug) console.log("removed plane");
	}

	onEditElement() {
		this.setState({ editing: true });
		if (bool_isDebug) console.log("edit plane");
	}

	onElementDataSave(id, data) {
		if (this.state.addingMultiplePlanes) {
			this.setState({
				addingMultiplePlanes: false,
				addingMultiplePlanes2: true,
				addingMultiplePlanesSetup: data,
			});
		} else if (this.state.addingMultiplePlanes2) {
			let addingMultiplePlanesSetup = this.state.addingMultiplePlanesSetup;
			let planes = this.state.planes.slice();

			let numberOfPlanes = addingMultiplePlanesSetup.NumberOfPlanes;
			let tIncrement = addingMultiplePlanesSetup["T-Increment"];
			let zIncrement = addingMultiplePlanesSetup["Z-Increment"];
			let cIncrement = addingMultiplePlanesSetup["C-Increment"];
			let timeStampIncrement = addingMultiplePlanesSetup["TimeStamp-Increment"];

			for (let i = 0; i < numberOfPlanes; i++) {
				let schema = this.props.schema;
				let newElementData = Object.assign({}, data);
				let timeStamp = Number(data.Timestamp);
				let theZ = Number(data.TheZ);
				let theC = Number(data.TheC);
				let theT = Number(data.TheT);
				newElementData.ID = uuidv4();
				if (tIncrement) {
					newElementData.TheZ = theZ;
					newElementData.TheT = theT + i;
					newElementData.TheC = theC;
				} else if (zIncrement) {
					newElementData.TheZ = theZ + i;
					newElementData.TheT = theT;
					newElementData.TheC = theC;
				} else if (cIncrement) {
					newElementData.TheZ = theZ;
					newElementData.TheT = theT;
					newElementData.TheC = theC + i;
				}
				newElementData.Timestamp = timeStamp + timeStampIncrement * i;
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
				planes.push(newElementData);
			}

			this.setState({ planes: planes, addingMultiplePlanes2: false });
		} else {
			let planes = this.state.planes.slice();
			let found = false;
			for (let i = 0; i < planes.length; i++) {
				let name_id = this.props.schema.title + "_" + planes[i].ID;
				if (id === name_id) {
					planes[i] = data;
					found = true;
					break;
				}
			}
			if (!found) {
				//todo should never happen
				console.log("issue with " + id);
			}
			this.setState({ planes: planes, editing: false });
		}
	}

	onElementDataCancel() {
		this.setState({ addingMultiplePlanes: false, editing: false });
	}

	onSelectElement(e) {
		let index = e.currentTarget.dataset.id;
		this.setState({ selectedIndex: index });
	}

	onConfirm() {
		let planes = this.state.planes;
		let id = this.props.id;
		// console.log("channels");
		// console.log(channels);
		this.setState({ editing: false });
		this.props.onConfirm(id, planes);
	}

	onCancel() {
		this.props.onCancel();
	}

	onAddMultiplePlanes() {
		this.setState({ addingMultiplePlanes: true });
	}

	render() {
		let index = this.state.selectedIndex;
		let planes = this.state.planes;
		if (this.state.addingMultiplePlanes) {
			return (
				<MultiTabFormWithHeaderV3
					schema={multiplePlanesSchema}
					inputData={{ ID: "multiplePlanesSchema" }}
					id={"multiplePlanesSchema"}
					onConfirm={this.onElementDataSave}
					onCancel={this.onElementDataCancel}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={string_currentNumberOf_identifier}
					minChildrenComponentIdentifier={string_minNumberOf_identifier}
					maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
					elementByType={this.props.elementByType}
					editable={true}
				/>
			);
		} else if (this.state.addingMultiplePlanes2) {
			let schema = this.props.schema;
			//let obj = planes[index];
			return (
				<MultiTabFormWithHeaderV3
					schema={schema}
					inputData={{
						ID: "Not assigned",
						Tier: schema.tier,
						Schema_ID: schema.ID,
						Version: schema.version,
					}}
					id={"Not assigned"}
					onConfirm={this.onElementDataSave}
					onCancel={this.onElementDataCancel}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={string_currentNumberOf_identifier}
					minChildrenComponentIdentifier={string_minNumberOf_identifier}
					maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
					elementByType={this.props.elementByType}
					editable={true}
				/>
			);
		} else if (this.state.editing) {
			let schema = this.props.schema;
			let obj = planes[index];
			return (
				<MultiTabFormWithHeaderV3
					schema={schema}
					inputData={obj}
					id={schema.title + "_" + obj.ID}
					onConfirm={this.onElementDataSave}
					onCancel={this.onElementDataCancel}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={string_currentNumberOf_identifier}
					minChildrenComponentIdentifier={string_minNumberOf_identifier}
					maxChildrenComponentIdentifier={string_maxNumberOf_identifier}
					elementByType={this.props.elementByType}
					editable={true}
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
			for (let i = 0; i < planes.length; i++) {
				let plane = planes[i];
				let variant = "dark";
				if (i % 2 === 0) {
					variant = "light";
				}
				list.push(
					<ListGroup.Item
						action
						variant={variant}
						onClick={this.onSelectElement}
						key={"Plane-" + i}
						data-id={i}
					>
						{"Plane " + i}
					</ListGroup.Item>
				);
			}
			let planeListStyle = {
				overflow: "auto",
				maxHeight: "0%",
				height: "0%",
			};
			if (planes.length > 0) {
				planeListStyle.maxHeight = "80%";
				planeListStyle.height = "80%";
			}
			return (
				<ModalWindow overlaysContainer={this.props.overlaysContainer}>
					<div>
						<h3>{this.props.schema.title + "s"}</h3>
					</div>
					<div style={planeListStyle}>
						<ListGroup>{list}</ListGroup>
					</div>
					<div style={buttonContainerRow}>
						<Button style={button1} size="lg" onClick={this.onAddElement}>
							+
						</Button>
						<Button
							style={button2}
							size="lg"
							onClick={this.onAddMultiplePlanes}
							//disabled={index === -1}
						>
							Add multiple planes
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
				</ModalWindow>
			);
		}
	}
}
