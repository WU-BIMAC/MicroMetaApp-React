import React from "react";
import Button from "react-bootstrap/Button";

export default class LoadingButton extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({ isLoading: true }, () => {
			this.props.onLoad().then(() => {
				this.setState({ isLoading: false });
			});
		});
	}

	render() {
		const { isLoading } = this.state;

		return (
			<Button
				variant="primary"
				disabled={isLoading}
				onClick={!isLoading ? this.handleClick : null}
			>
				{isLoading ? "Loading…" : "Load schema"}
			</Button>
		);
	}
}
