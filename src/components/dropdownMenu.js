import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PopoverTooltip from "./popoverTooltip";

import { isDefined } from "../genericUtilities";

export default class DropdownMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			inputData: props.inputData,
			title: props.title,
			currentTitle: `${props.title} ${
				props.inputData[props.defaultValue || 0]
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
		let styleImageIcon = {
			width: "20px",
			height: "20px",
			marginLeft: "10px",
			marginRight: "10px",
		};
		let inputData = this.state.inputData;
		let width = this.props.width || 250;
		let margin = this.props.margin || 0;
		let direction = this.props.direction || "down";

		let dropdownItems = inputData.map((item) => (
			<Dropdown.Item key={item} onClick={this.handleMenuItemClick} id={item}>
				{item}
			</Dropdown.Item>
		));
		let justifyContent = "center";
		if (isDefined(this.props.isCentered) && !this.props.isCentered) {
			justifyContent = "flex-start";
		}
		const dropdownStyle = {
			width: `${width}px`,
			height: "50px",
			margin: `${margin}px`,
			display: "flex",
			flexDirection: "row",
			justifyContent: `${justifyContent}`,
			alignItems: "center",
		};
		const dropdownMenuStyle = {
			overflow: "auto",
			maxHeight: "120px",
			maxWidth: `${width}px`,
			width: `${width}px`,
		};
		let title = this.state.currentTitle;
		if (this.props.hasFixedTitle) {
			title = this.state.title;
		}
		let imgTitle = title;
		if (isDefined(this.props.imgPath) && isDefined(this.props.imgPath_tmp)) {
			imgTitle = (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						//gap: "10px",
					}}
				>
					<img
						src={this.props.imgPath}
						alt={this.props.imgPath_tmp}
						style={styleImageIcon}
					/>
					{title}
				</div>
			);
		}
		const dropdownToggle = (
			<Dropdown.Toggle
				id="dropdown-basic-button"
				style={dropdownStyle}
				size="lg"
				variant={isDefined(this.props.variant) ? this.props.variant : "primary"}
			>
				{imgTitle}
			</Dropdown.Toggle>
		);
		let dropdownToggleWrapped = null;
		if (
			isDefined(this.props.tooltip) &&
			isDefined(this.props.tooltip.position) &&
			isDefined(this.props.tooltip.title) &&
			isDefined(this.props.tooltip.content) &&
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
