import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

export default class DropdownMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			inputData: props.inputData,
			title: props.title,
			currentTitle: `${props.title} ${
				props.inputData[this.props.defaultValue || 0]
			}`
		};

		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
	}

	handleMenuItemClick(e) {
		let item = e.target.id;
		let currentTitle = `${this.state.title} ${item}`;
		this.props.handleMenuItemClick(item);
		this.setState({ currentTitle: currentTitle });
	}

	render() {
		let inputData = this.state.inputData;
		let width = this.props.width || 250;
		let margin = this.props.margin || 0;
		let direction = "down" || this.props.direction;
		let dropdownItems = inputData.map(item => (
			<Dropdown.Item key={item} onClick={this.handleMenuItemClick} id={item}>
				{item}
			</Dropdown.Item>
		));
		const dropdownStyle = {
			width: `${width}px`,
			height: "50px",
			margin: `${margin}px`
		};
		const dropdownMenuStyle = {
			overflow: "auto",
			maxHeight: "100px",
			maxWidth: `${width}px`,
			width: `${width}px`
		};
		return (
			<Dropdown>
				<Dropdown.Toggle
					id="dropdown-basic-button"
					style={dropdownStyle}
					size="lg"
					drop={direction}
				>
					{this.state.currentTitle}
				</Dropdown.Toggle>
				<Dropdown.Menu style={dropdownMenuStyle}>{dropdownItems}</Dropdown.Menu>
			</Dropdown>
		);
	}
}

DropdownMenu.defaultProps = {
	inputData: ["1"],
	title: "Dropdown Menu"
};
