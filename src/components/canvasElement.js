import React from "react";
import { Resizable, ResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export class CanvasElement extends React.PureComponent {
	render() {
		// eslint-disable-next-line no-console
		console.log("testCanvasElement");
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
				<button style={style} onClick={this.props.onClick}>
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
