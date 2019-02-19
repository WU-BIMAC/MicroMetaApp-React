import React from "react";

export class CanvasElement extends React.PureComponent {
	render() {
		// eslint-disable-next-line no-console
		console.log("testCanvasElement");
		const style = {
			backgroundColor: "white",
			textAlign: "center",
			height: "50",
			width: "50"
		};
		return (
			<button style={style} onClick={this.props.onClick}>
				{this.props.text}
			</button>
		);
	}
}

CanvasElement.defaultProps = {
	text: "Something",
	onClick: function(e) {
		// eslint-disable-next-line no-console
		console.log("Clicked!", e.clientX, e.clientY);
	}
};
