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
		let newHeight = img.naturalHeight;
		let newWidth = img.naturalWidth;
		this.setState(
			{
				height: newHeight,
				width: newWidth
			},
			() =>
				this.props.updateMinMaxDimensions(this.props.id, newWidth, newHeight)
		);
	}

	render() {
		const imageStyle = {
			height: "100%",
			width: "100%",
			margin: "auto"
		};
		const style = Object.assign(
			{
				display: "flex",
				justifyContent: "center",
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
