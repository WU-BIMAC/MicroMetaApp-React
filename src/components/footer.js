import React from "react";
import Button from "react-bootstrap/Button";

import MultiTabFormWithHeader from "./multiTabFormWithHeader";

export default class Footer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};

		this.onClickEdit = this.onClickEdit.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onClickEdit() {
		this.setState({ editing: true });
	}

	onConfirm(id, data) {
		this.setState({ editing: false });
		this.props.onConfirm(id, data);
	}

	onCancel() {
		this.setState({ editing: false });
	}

	render() {
		if (this.state.editing) {
			return (
				<MultiTabFormWithHeader
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
			height: "50px",
			boxSizing: "border-box",
			textAlign: "center",
			verticalAlign: "middle"
		};
		const styleButton = { width: "200px" };
		let buttons = [];
		buttons[0] = (
			<Button
				key={"Button-0"}
				onClick={this.onClickEdit}
				style={styleButton}
				size="lg"
			>
				Edit microscope
			</Button>
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
		return <div style={style}> {buttons} </div>;
	}
}
