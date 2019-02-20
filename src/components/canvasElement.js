import React from "react";
import { SchemaForm } from "./schemaForm";
import { Resizable, ResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export class CanvasElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
		this.onClick = this.onClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onClick() {
		this.setState({ editing: true });
	}

	onSubmit(id, data) {
		//TODO transform results to do what i need to do
		this.setState({ editing: false });
		// eslint-disable-next-line no-console
		console.log(data);
		this.props.onSubmit(id, data);
	}

	render() {
		if (this.state.editing) {
			//TODO transform schema to fit SchemaForm (multiple different schema per object)
			let currentSchema = this.props.schema;
			// eslint-disable-next-line no-console
			console.log(currentSchema);
			return (
				<SchemaForm
					schema={this.props.schema}
					id={this.props.id}
					onSubmit={this.onSubmit}
					overlaysContainer={this.props.overlaysContainer}
				/>
			);
		}

		const style = {
			backgroundColor: "grey",
			textAlign: "center",
			height: "100%",
			width: "100%"
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
					{this.props.text}
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
