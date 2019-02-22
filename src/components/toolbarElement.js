import React from "react";

export class ToolbarElement extends React.PureComponent {
	render() {
		const style = {
			backgroundColor: "white",
			textAlign: "center",
			height: "50",
			width: "50",
			display: "flex", // NEW, Spec - Opera 12.1, Firefox 20+
			justifyContent: "center"
		};
		const imageStyle = {
			maxHeight: "90%",
			maxWidth: "90%",
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "auto",
			marginBottom: "auto"
		};
		return (
			<div style={style}>
				<img src={this.props.image} alt={this.props.name} style={imageStyle} />
			</div>
		);
	}
}
