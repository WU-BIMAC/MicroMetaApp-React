import React from "react";

export class Header extends React.PureComponent {
	render() {
		const style = {
			backgroundColor: "grey",
			textAlign: "center",
			// Consistent height should make it
			// simpler to layout controls or other
			// things I think
			height: "60px",
			boxSizing: "border-box"
		};
		return <div style={style}> HEADER </div>;
	}
}
