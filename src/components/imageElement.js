import React from "react";

export default class ImageElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			height: null,
			width: null,
		};

		//this.onImgLoad = this.onImgLoad.bind(this);
	}

	// onImgLoad({ target: img }) {
	// 	let oldHeight = this.state.height;
	// 	let oldWidth = this.state.width;
	// 	if (oldWidth !== null && oldHeight !== null) return;
	// 	let newHeight = img.naturalHeight;
	// 	let newWidth = img.naturalWidth;
	// 	this.setState(
	// 		{
	// 			height: newHeight,
	// 			width: newWidth,
	// 		},
	// 		() =>
	// 			this.props.updateMinMaxDimensions(this.props.id, newWidth, newHeight)
	// 	);
	// }

	render() {
		const { name, image, style: propStyle } = this.props;
		const imageStyle = {
			height: "100%",
			width: "100%",
			margin: "auto",
		};
		const style = Object.assign(
			{
				display: "flex",
				justifyContent: "center",
				backgroundColor: "transparent",
			},
			propStyle
		);
		let rotate = this.props.rotate;
		let rotateImageStyle = null;
		if (rotate !== null && rotate !== undefined) {
			// console.log("rotate");
			// console.log(rotate);
			rotateImageStyle = Object.assign(
				{ transform: `rotate(${rotate}deg)` },
				imageStyle
			);
		} else {
			rotateImageStyle = imageStyle;
		}
		let img = (
			<img
				//onLoad={this.onImgLoad}
				src={
					image +
					(image.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "")
				}
				alt={name}
				style={rotateImageStyle}
			/>
		);
		return <div style={style}>{img}</div>;
	}
}
