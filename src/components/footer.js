import React from "react";

export class Footer extends React.PureComponent {
	render() {
		const style = {
			backgroundColor: "grey",
			textAlign: "center",
			height: "40px",
			boxSizing: "border-box"
		};
		return <div style={style}> FOOTER </div>;
	}
}
