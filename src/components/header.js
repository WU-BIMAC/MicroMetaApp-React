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
			display: "flex",
			flexDirection: "row",
		};
		const styleTitle = {
			backgroundColor: "LightGray",
			textAlign: "left",
			verticalAlign: "middle",
			paddingLeft: "10px",
			marginTop: "auto",
			marginBottom: "auto",
		};
		let styleImageContainer = {
			width: "430px",
			height: "60px",
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		//<div style={styleTitle}>Microscopy Metadata For The Real World</div>
		let logoPath =
			this.props.logoImg +
			(this.props.logoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		return (
			<div style={style}>
				<div style={styleImageContainer}>
					<img
						src={logoPath}
						alt={this.props.logoImg}
						style={styleImage}
						onLoad={this.onImgLoad}
					/>
				</div>
			</div>
		);
	}
}
