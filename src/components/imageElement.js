import React from "react";

export default class ImageElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			height: props.height,
			width: props.width
		};

		this.onImgLoad = this.onImgLoad.bind(this);
	}

	onImgLoad({ target: img }) {
		//let newHeight = img.height / 5;
		//let newWidth = img.width / 5;
		let newHeight = 100;
		let newWidth = 100;
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
		const style = {
			height: `${this.state.height}px`,
			width: `${this.state.width}px`,
			backgroundColor: "transparent"
		};
		return <div style={style}>{img}</div>;
	}
}
