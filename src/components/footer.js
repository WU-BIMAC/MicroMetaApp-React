import React from "react";
import Button from "react-bootstrap/Button";
export default class Footer extends React.PureComponent {
	render() {
		const style = {
			backgroundColor: "LightGray",
			height: "50px",
			boxSizing: "border-box",
			textAlign: "center",
			verticalAlign: "middle"
		};
		const styleButton = {};
		let exportButton = (
			<Button onClick={this.props.onClickExport} style={styleButton} size="lg">
				Export current microscope
			</Button>
		);
		return <div style={style}> {exportButton} </div>;
	}
}
