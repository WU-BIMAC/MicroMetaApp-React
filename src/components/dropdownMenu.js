import React from "react";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default class DropdownMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			inputData: props.inputData,
			title: props.title,
			currentTitle: `${props.title} ${props.inputData[0]}`
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
		let dropdownItems = inputData.map(item => (
			<Dropdown.Item key={item} onClick={this.handleMenuItemClick} id={item}>
				{item}
			</Dropdown.Item>
		));
		const dropdownStyle = {
			width: "410px",
			height: "50px",
			margin: "5px"
		};
		return (
			<Dropdown>
				<Dropdown.Toggle
					id="dropdown-basic-button"
					style={dropdownStyle}
					size="lg"
				>
					{this.state.currentTitle}
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ overflow: "auto", width: "100%" }}>
					{dropdownItems}
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

DropdownMenu.defaultProps = {
	inputData: ["1"],
	title: "Dropdown Menu"
};
