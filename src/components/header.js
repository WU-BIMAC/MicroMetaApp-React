import React from "react";

export default class Header extends React.PureComponent {
	render() {
		const style = {
			backgroundColor: "LightGray",
			height: "60px",
			boxSizing: "border-box",
			textAlign: "center",
			verticalAlign: "middle"
		};
		return <div style={style}> HEADER </div>;
	}
}
