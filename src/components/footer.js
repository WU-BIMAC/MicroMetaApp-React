import React from "react";
import Button from "react-bootstrap/Button";
import { AnimateKeyframes } from "react-simple-animate";

import MultiTabFormWithHeader from "./multiTabFormWithHeader";

export default class Footer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
			//	isMicroscopeValidated: false
		};

		//this.isMicroscopeValidated = false;

		this.onClickEdit = this.onClickEdit.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onClickEdit() {
		this.setState({ editing: true });
	}

	onConfirm(id, data) {
		this.setState({ editing: false });
		//, isMicroscopeValidated: true
		//this.isMicroscopeValidated = true;
		this.props.onConfirm(id, data);
	}

	onCancel() {
		this.setState({ editing: false });
	}

	render() {
		if (this.state.editing) {
			console.log(this.props.microscopeSchema);
			return (
				<MultiTabFormWithHeader
					activeTier={this.props.activeTier}
					schema={this.props.microscopeSchema}
					inputData={this.props.inputData}
					id={this.props.id}
					onConfirm={this.onConfirm}
					onCancel={this.onCancel}
					overlaysContainer={this.props.overlaysContainer}
				/>
			);
		}

		const style = {
			backgroundColor: "LightGray",
			height: "60px",
			boxSizing: "border-box",
			display: "flex",
			flexDirection: "row",
			flexWap: "wrap",
			justifyContent: "center",
			alignItems: "center",
			padding: "5px"
		};
		const styleButton = {
			width: "250px",
			marginLeft: "5px",
			marginRight: "5px"
		};
		let saveButton = {
			width: "250px",
			marginLeft: "5px",
			marginRight: "5px"
		};
		let play = false;
		if (!this.props.isMicroscopeValidated) {
			saveButton = Object.assign(saveButton, { border: "5px ridge red" });
			play = true;
		}

		let buttons = [];
		buttons[0] = (
			<AnimateKeyframes
				key={"Animation-0"}
				play={play}
				durationSeconds={2}
				keyframes={[
					"transform: rotateZ(0deg) scale(2, 2);",
					"transform: rotateZ(90deg) scale(1.75, 1.75)",
					"transform: rotateZ(180deg) scale(1.5, 1.5)",
					"transform: rotateZ(270deg) scale(1.25, 1.25)",
					"transform: rotateZ(360deg)"
				]}
				// keyframes is an array of styles, and each style
				// will be distributed over 100% of the duration
			>
				<Button
					key={"Button-0"}
					onClick={this.onClickEdit}
					style={saveButton}
					size="lg"
				>
					Edit microscope
				</Button>
			</AnimateKeyframes>
		);
		buttons[1] = (
			<Button
				key={"Button-1"}
				onClick={this.props.onClickExport}
				style={styleButton}
				size="lg"
			>
				Export microscope
			</Button>
		);
		return <div style={style}>{buttons}</div>;
	}
}
