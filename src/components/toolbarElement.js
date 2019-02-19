import React from "react";

export class ToolbarElement extends React.PureComponent {
	render() {
		const style = {
			backgroundColor: "white",
			textAlign: "center",
			height: "50",
			width: "50"
		};
		return <div style={style}>{this.props.text}</div>;
	}
}
