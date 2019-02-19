import React from "react";

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

	onChange() {}

	onSubmit() {}

	onError() {}

	render() {
		<Form
			schema={this.state.schema}
			onChange={this.onChange}
			onSubmit={this.onSubmit}
			onError={this.onError}
		/>;
	}
}
