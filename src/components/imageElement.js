import React from "react";

export default class ImageElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			height: null,
			width: null
		};

		this.onImgLoad = this.onImgLoad.bind(this);
	}

	onImgLoad({ target: img }) {
		let oldHeight = this.state.height;
		let oldWidth = this.state.width;
		if (oldWidth !== null && oldHeight !== null) return;
		let newHeight = img.height / 5;
		let newWidth = img.width / 5;
		this.setState({
			height: newHeight,
			width: newWidth
		});
		console.log("load image");
		this.props.updateDimensions(this.props.id, newWidth, newHeight);
	}

	render() {
		const imageStyle = {
			maxHeight: "100%",
			maxWidth: "100%",
			margin: "auto",
			padding: "5px"
		};
		const style = Object.assign(
			{
				backgroundColor: "transparent"
			},
			this.props.style
		);
		let img = (
			<img
				onLoad={this.onImgLoad}
				src={this.props.image}
				alt={this.props.name}
				style={imageStyle}
			/>
		);
		return <div style={style}>{img}</div>;
	}
}
