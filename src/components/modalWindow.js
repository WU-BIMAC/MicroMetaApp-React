import React from "react";
import ReactDOM from "react-dom";

export default class ModalWindow extends React.PureComponent {
	render() {
		return ReactDOM.createPortal(
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					bottom: 0,
					right: 0,
					backgroundColor: "rgba(0,0,0,0.33)",
					display: "flex",
					alignItems: "center",
				}}
			>
				<div
					style={{
						width: "80%",
						marginLeft: "auto",
						marginRight: "auto",
						backgroundColor: "#fff",
						height: "80%",
						padding: 10,
						borderRadius: 5,
						boxShadow: "0 1px 6px -2px #000",
						overflow: "auto",
					}}
				>
					{this.props.children}
				</div>
			</div>,
			this.props.overlaysContainer
		);
	}
}
