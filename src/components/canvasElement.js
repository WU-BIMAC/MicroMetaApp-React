import React from "react";

import { Resizable } from "react-resizable";
import { ResizableBox } from "react-resizable";

import ImageElement from "./imageElement";
import SchemaForm from "./schemaForm";

export default class CanvasElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
		this.onClick = this.onClick.bind(this);

		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onClick() {
		this.setState({ editing: true });
	}

	onConfirm(id, data) {
		this.setState({ editing: false });
		this.props.onConfirm(id, data);
	}

	onCancel() {
		this.setState({ editing: false });
	}

	render() {
		if (this.state.editing) {
			return (
				<SchemaForm
					schema={this.props.schema}
					inputData={this.props.inputData}
					id={this.props.id}
					onConfirm={this.onConfirm}
					onCancel={this.onCancel}
					overlaysContainer={this.props.overlaysContainer}
				/>
			);
		}

		const style = {
			textAlign: "center",
			height: "100%",
			width: "100%",
			display: "flex", // NEW, Spec - Opera 12.1, Firefox 20+
			justifyContent: "center",
			backgroundColor: "transparent",
			padding: "0",
			border: "none",
			font: "14px",
			color: "inherit",
			cursor: "pointer"
		};
		return (
			<ResizableBox
				width={100}
				height={100}
				minConstraints={[100, 100]}
				maxConstraints={[this.props.maxWidth, this.props.maxHeight]}
				lockAspectRatio={true}
			>
				<button style={style} onClick={this.onClick}>
					<ImageElement
						image={this.props.image}
						name={this.props.schema.title}
					/>
				</button>
			</ResizableBox>
		);
	}
}

//TODO verify if this is necessary
CanvasElement.defaultProps = {
	maxWidth: 200,
	maxHeight: 200,
	text: "Something",
	onClick: function(e) {
		// eslint-disable-next-line no-console
		console.log("Clicked!", e.clientX, e.clientY);
	}
};

export class CanvasElementDeleteButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.onDelete(this.props.index);
	}

	render() {
		return (
			<button type="button" onClick={this.onClick} style={this.props.myStyle}>
				x
			</button>
		);
	}
}
