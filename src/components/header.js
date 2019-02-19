import React from "react";

export class Header extends React.PureComponent {
	render() {
		const style = {
			backgroundColor: "grey",
			textAlign: "center",
			height: "4.8vh"
		};
		return <div style={style}> HEADER </div>;
	}
}
