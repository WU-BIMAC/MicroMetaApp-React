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
	}

	onClick() {
		this.setState({ editing: true });
	}

	render() {
		if (this.state.editing) {
			return <SchemaForm schema={this.props.schema} id={this.props.id} onSubmit={this.props.onSubmit}/>;
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

CanvasElement.defaultProps = {
	maxWidth: 200,
	maxHeight: 200,
	text: "Something",
	onClick: function(e) {
		// eslint-disable-next-line no-console
		console.log("Clicked!", e.clientX, e.clientY);
	}
};
