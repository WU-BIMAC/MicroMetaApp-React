import React from "react";
import ReactDOM from "react-dom";
//import "rc-tabs/assets/index.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import ModalWindow from "./modalWindow";
import PopoverTooltip from "./popoverTooltip";

import { v4 as uuidv4 } from "uuid";

const validate = require("jsonschema").validate;

import {
	string_object,
	string_array,
	string_currentNumberOf_identifier,
	string_minNumberOf_identifier,
	string_maxNumberOf_identifier,
	add_multi_planes,
	edit_plane,
	add_plane,
	remove_plane,
} from "../constants";

const multiplePlanesSchema = {
	$schema: "http://json-schema.org/draft-07/schema",
	ID: "MultiplePlanesSchema.json",
	type: "object",
	title: "Add Multiple Planes",
	description: "Insert the required values to add multiple planes at once.",
	tier: 1,
	subCategoriesOrder: {
		General:
			"This interface allows you to add multiple image Planes to this Image. For example, in case the Image has 10 Z-sections, 3 channels, and 1 time-points, the interface should be used to add three batches (one per Channel) of 10 Planes each.",
	},
	properties: {
		NumberOfPlanes: {
			type: "integer",
			description:
				"Insert the number of Planes to be inserted as part of this batch.",
			tier: 1,
			category: "General",
		},
		"Z-Increment": {
			type: "boolean",
			description:
				"Select this if you want the different Planes in this batch to have increasing Z-dimension numbers.",
			tier: 1,
			category: "General",
		},
		"T-Increment": {
			type: "boolean",
			description:
				"Select this if you want the different Planes in this batch to have increasing timepoint-dimension numbers.",
			tier: 1,
			category: "General",
		},
		"C-Increment": {
			type: "boolean",
			description:
				"Select this if you want the different Planes in this batch to have increasing channel-dimension numbers.",
			tier: 1,
			category: "General",
		},
		"TimeStamp-Increment": {
			type: "number",
			description:
				"Insert the TimeStamp increment to be set between image Planes in this batch.",
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
		if (
			this.props.imageMetadata !== null &&
			this.props.imageMetadata !== undefined &&
			this.props.imageMetadata.Planes !== null &&
			this.props.imageMetadata.Planes !== undefined
		) {
			let newPlanes = [];
			let planes = this.props.imageMetadata.Planes.slice();
			if (
				this.state.planes.length === planes.length ||
				this.state.planes.length === 0
			) {
				for (let i = 0; i < planes.length; i++) {
					let schema = this.props.schema;
					let oldPlane = planes[i];
					let newPlane = {
						//Name: `${schema.title} ${planes.length}`,
						ID: uuidv4(),
						Tier: schema.tier,
						Schema_ID: schema.ID,
						ModelVersion: schema.modelVersion,
						Extension: schema.extension,
						Domain: schema.domain,
						Category: schema.category,
					};
					newPlane = PlaneView.addIdentifiersToNewObject(newPlane, schema);
					let mergedPlane = Object.assign({}, newPlane, oldPlane);
					if (
						this.state.planes[i] !== null &&
						this.state.planes[i] !== undefined
					) {
						newPlanes[i] = Object.assign({}, mergedPlane, this.state.planes[i]);
					} else {
						newPlanes[i] = mergedPlane;
					}
				}
				this.state.planes = newPlanes;
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

		this.onAddMultiplePlanes = this.onAddMultiplePlanes.bind(this);
	}

	static addIdentifiersToNewObject(object, schema) {
		let newObject = Object.assign({}, object);
		Object.keys(schema.properties).forEach((key) => {
			if (schema.properties[key].type === string_array) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (schema.required.indexOf(key) != -1) {
					newObject[currentNumber] = 1;
					newObject[minNumber] = 1;
					newObject[maxNumber] = -1;
				} else {
					newObject[currentNumber] = 0;
					newObject[minNumber] = 0;
					newObject[maxNumber] = -1;
				}
			} else if (schema.properties[key].type === string_object) {
				let currentNumber = string_currentNumberOf_identifier + key;
				let minNumber = string_minNumberOf_identifier + key;
				let maxNumber = string_maxNumberOf_identifier + key;
				if (schema.required.indexOf(key) === -1) {
					newObject[currentNumber] = 0;
					newObject[minNumber] = 0;
					newObject[maxNumber] = 1;
				}
			}
		});
		return newObject;
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
			ModelVersion: schema.modelVersion,
			Extension: schema.extension,
			Domain: schema.domain,
			Category: schema.category,
		};
		newElementData = PlaneView.addIdentifiersToNewObject(
			newElementData,
			schema
		);
		planes.push(newElementData);
		this.setState({ planes: planes });
		if (this.props.isDebug) console.log("added plane");
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
		if (this.props.isDebug) console.log("removed plane");
	}

	onEditElement() {
		this.setState({ editing: true });
		if (this.props.isDebug) console.log("edit plane");
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
				newElementData.Schema_ID = schema.ID;
				newElementData.Tier = schema.tier;
				newElementData.ModelVersion = schema.modelVersion;
				newElementData.Extension = schema.extension;
				newElementData.Domain = schema.domain;
				newElementData.Category = schema.category;
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
		this.setState({
			addingMultiplePlanes: false,
			addingMultiplePlanes2: false,
			editing: false,
			addingMultiplePlanesSetup: null,
		});
		console.log('Cancel called from: planeView');
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
		let planes = this.state.planes;
		if (this.props.isDebug) console.log("inside of planeView.js1");
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
					isDebug={this.props.isDebug}
				/>
			);
		} else if (this.state.addingMultiplePlanes2) {
			let schema = this.props.schema;
			//let obj = planes[index];
			if (this.props.isDebug) console.log("inside of planeView.js2");
			return (
				<MultiTabFormWithHeaderV3
					schema={schema}
					inputData={{
						ID: "Not assigned",
						Tier: schema.tier,
						Schema_ID: schema.ID,
						ModelVersion: schema.modelVersion,
						Extension: schema.extension,
						Domain: schema.domain,
						Category: schema.category,
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
					isDebug={this.props.isDebug}
				/>
			);
		} else if (this.state.editing) {
			let schema = this.props.schema;
			let obj = planes[index];
			if (this.props.isDebug) console.log("inside of planeView.js3");
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
					isDebug={this.props.isDebug}
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
			for (let i = 0; i < planes.length; i++) {
				let plane = planes[i];
				let variant = "dark";
				if (i % 2 === 0) {
					variant = "light";
				}

				let validation = validate(plane, this.props.schema);
				let validated = validation.valid;
				let valid = null;
				if (validated) {
					valid = isValid;
				} else {
					valid = isInvalid;
				}

				let planeName = "Plane " + i;
				list.push(
					<ListGroup.Item
						action
						variant={variant}
						onClick={this.onSelectElement}
						key={"Plane-" + i}
						data-id={i}
					>
						<div style={nameStyle}>
							<div style={{ width: "24px" }}>{valid}</div>
							<div>{planeName}</div>
						</div>
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
						<PopoverTooltip
							key={"TooltipButton-Add"}
							position={add_plane.position}
							title={add_plane.title}
							content={add_plane.content}
							element={
								<Button style={button1} size="lg" onClick={this.onAddElement}>
									+
								</Button>
							}
						/>

						<PopoverTooltip
							key={"TooltipButton-AddMulti"}
							position={add_multi_planes.position}
							title={add_multi_planes.title}
							content={add_multi_planes.content}
							element={
								<Button
									style={button2}
									size="lg"
									onClick={this.onAddMultiplePlanes}
									//disabled={index === -1}
								>
									Add multiple planes
								</Button>
							}
						/>
						<PopoverTooltip
							key={"TooltipButton-Edit"}
							position={edit_plane.position}
							title={edit_plane.title}
							content={edit_plane.content}
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
							position={remove_plane.position}
							title={remove_plane.title}
							content={remove_plane.content}
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
				</ModalWindow>
			);
		}
	}
}