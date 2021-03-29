import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

import PopoverTooltip from "./popoverTooltip";

export default class DropdownMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			inputData: props.inputData,
			title: props.title,
			currentTitle: `${props.title} ${
				props.inputData[this.props.defaultValue || 0]
			}`,
			showTooltip: true,
		};

		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		let oldInputData = state.inputData;
		let newInputData = props.inputData;
		if (newInputData !== null && newInputData !== undefined) {
			if (
				oldInputData === null ||
				oldInputData === undefined ||
				oldInputData !== newInputData
			) {
				let newCurrent = `${props.title} ${
					newInputData[props.defaultValue || 0]
				}`;
				return { inputData: newInputData, currentTitle: newCurrent };
			}
		}
		return null;
	}

	handleToggleClick(e) {
		this.setState({ showTooltip: !e });
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
		let direction = this.props.direction || "down";

		let dropdownItems = inputData.map((item) => (
			<Dropdown.Item key={item} onClick={this.handleMenuItemClick} id={item}>
				{item}
			</Dropdown.Item>
		));
		const dropdownStyle = {
			width: `${width}px`,
			height: "50px",
			margin: `${margin}px`,
		};
		const dropdownMenuStyle = {
			overflow: "auto",
			maxHeight: "120px",
			maxWidth: `${width}px`,
			width: `${width}px`,
		};
		const dropdownToggle = (
			<Dropdown.Toggle
				id="dropdown-basic-button"
				style={dropdownStyle}
				size="lg"
			>
				{this.state.currentTitle}
			</Dropdown.Toggle>
		);
		let dropdownToggleWrapped = null;
		if (
			this.props.tooltip !== undefined &&
			this.props.tooltip !== null &&
			this.props.tooltip.position !== undefined &&
			this.props.position !== null &&
			this.props.tooltip.title !== undefined &&
			this.props.title !== null &&
			this.props.tooltip.content !== undefined &&
			this.props.content !== null &&
			this.state.showTooltip
		) {
			dropdownToggleWrapped = (
				<PopoverTooltip
					position={this.props.tooltip.position}
					title={this.props.tooltip.title}
					content={this.props.tooltip.content}
					element={dropdownToggle}
				/>
			);
		} else {
			dropdownToggleWrapped = dropdownToggle;
		}
		return (
			<Dropdown drop={direction} onToggle={this.handleToggleClick}>
				{dropdownToggleWrapped}
				<Dropdown.Menu style={dropdownMenuStyle}>{dropdownItems}</Dropdown.Menu>
			</Dropdown>
		);
	}
}

DropdownMenu.defaultProps = {
	inputData: ["1"],
	title: "Dropdown Menu",
};
