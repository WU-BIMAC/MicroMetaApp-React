import React from "react";

export class ImageElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			newHeight: undefined,
			newWidth: undefined
		};
		this.onImgLoad = this.onImgLoad.bind(this);
	}

	onImgLoad({ target: img }) {
		// if (this.state.height !== undefined || this.state.width !== undefined)
		// 	return;
		let newHeight = img.height / 5;
		let newWidth = img.width / 5;
		this.setState({
			newHeight: newHeight,
			newWidth: newWidth
		});
	}
	render() {
		const imageStyle = {
			maxHeight: "100%",
			maxWidth: "100%",
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "auto",
			marginBottom: "auto"
		};
		let img = (
			<img
				onLoad={this.onImgLoad}
				src={this.props.image}
				alt={this.props.name}
				style={imageStyle}
			/>
		);
		//`${this.state.height}px`,
		//`${this.state.width}px`,
		const style = {
			textAlign: "center",
			height: "100px",
			width: "100px",
			display: "flex", // NEW, Spec - Opera 12.1, Firefox 20+
			justifyContent: "center",
			backgroundColor: "transparent"
		};
		return <div style={style}>{img}</div>;
	}
}
