import React from "react";

export default class Header extends React.PureComponent {
	render() {
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		const style = {
			backgroundColor: "LightGray",
			width: width,
			height: height,
			boxSizing: "border-box",
			textAlign: "center",
			verticalAlign: "middle"
		};
		return <div style={style}> HEADER </div>;
	}
}
