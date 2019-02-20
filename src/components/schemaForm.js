import React from "react";
import ReactDOM from "react-dom";
import Form from "react-jsonschema-form";

export class SchemaForm extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			schema: props.schema
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onError = this.onError.bind(this);
	}

	componentWillUnmount() {}

	onChange() {}

	onSubmit(data) {
		//this.setState({ formData : data });
		this.props.onSubmit(this.props.id, data);
		// eslint-disable-next-line no-console
		console.log(data);
	}

	onError() {}

	render() {
		//var fullSchema = transform(this.props.schema);

		return (
			<ModalWindow overlaysContainer={this.props.overlaysContainer}>
				<Form
					schema={this.state.schema}
					onChange={this.onChange}
					onSubmit={this.onSubmit}
					onError={this.onError}
				/>
			</ModalWindow>
		);
	}
}

/**
 * @todo Own file.
 */
export class ModalWindow extends React.PureComponent {
	render(){
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
					alignItems: "center"
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
						boxShadow: "0 1px 6px -2px #000"
					}}
				>
					{ this.props.children }
				</div>
			</div>,
			this.props.overlaysContainer
		);
	}
}

