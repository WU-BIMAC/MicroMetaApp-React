import React from "react";

import Button from "react-bootstrap/Button";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import {
	number_small_logo_width,
	number_small_logo_height,
	tier_selector_tooltip,
	string_back_img,
	back_tooltip,
} from "../constants";

export default class TierSelector extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const windowExternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};

		const windowButtonsContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "750px",
			alignItems: "center",
			margin: "50px",
		};
		const buttonModeSelectorStyle = {
			width: "800px",
			height: "200px",
			margin: "25px",
		};
		const buttonsInnerContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "row",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const buttonsInnerTextContainer = {
			display: "flex",
			justifyContent: "flex-start",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "flex-start",
		};
		const windowLogoContainer = {
			display: "flex",
			justifyContent: "flex-end",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		let styleImageContainer = {
			width: `${number_small_logo_width}px`,
			height: `${number_small_logo_height}px`,
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let styleIconImage = {
			width: "25%",
			height: "75%",
			margin: "20px",
		};
		let styleText_1 = {
			textAlign: "left",
			//fontSize: "1em",
			marginLeft: "15px",
			marginRight: "15px",
			wordBreak: "break-word",
			whiteSpace: "normal",
		};
		let styleText_2 = {
			textAlign: "left",
			fontSize: "0.8em",
			marginLeft: "15px",
			marginRight: "15px",
			wordBreak: "break-word",
			whiteSpace: "normal",
		};
		// let styleText_3 = {
		// 	textAlign: "left",
		// 	fontSize: "0.6em",
		// 	marginLeft: "15px",
		// 	marginRight: "15px",
		// 	wordBreak: "break-word",
		// 	whiteSpace: "normal",
		// };
		let styleButton = {
			width: "250px",
			minWidth: "250px",
			height: "50px",
			marginLeft: "5px",
			marginRight: "5px",
		};
		let styleImageBk = {
			width: "20px",
			height: "20px",
			marginLeft: "10px",
			marginRight: "10px",
		};
		let tierList = this.props.tierList;

		let logoPath =
			this.props.logoImg +
			(this.props.logoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		let iconPath =
			this.props.iconImg +
			(this.props.iconImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		let tiers = [];
		tierList.forEach((tier) => {
			let index = tier.Index - 1;
			//let regex = /(\[|\])/gi;
			// let minComp = tier.MinimumComponentsList.replace(regex, "").replace(
			// 	"||",
			// 	"or"
			// );
			let button = (
				<PopoverTooltip
					position={tier_selector_tooltip.position}
					title={tier_selector_tooltip.title}
					content={tier_selector_tooltip.content}
					key={"popover-tier-button-" + index}
					element={
						<Button
							onClick={() => {
								this.props.onClickTierSelection(index, tier.Name);
							}}
							style={buttonModeSelectorStyle}
							size="lg"
							variant="light"
							key={"tier-button-" + index}
						>
							{
								<div style={buttonsInnerContainer}>
									<img
										src={iconPath}
										alt={this.props.iconImg}
										style={styleIconImage}
									/>
									<div style={buttonsInnerTextContainer}>
										<h2 style={styleText_1}>{tier.Name}</h2>
										<p style={styleText_2}>{tier.Description}</p>
										{/* <p style={styleText_3}>
											{"Minimum components: " + minComp}
										</p> */}
									</div>
								</div>
							}
						</Button>
					}
				/>
			);
			tiers[index] = button;
		});

		let backImgPath_tmp = url.resolve(this.props.imagesPath, string_back_img);
		let backImgPath =
			backImgPath_tmp +
			(backImgPath_tmp.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		let backText = "Home";
		let homeButton = (
			<PopoverTooltip
				key={"TooltipButtonLeft-0"}
				position={"top"}
				title={back_tooltip.title}
				content={back_tooltip.content}
				element={
					<Button
						key={"ButtonLeft-0"}
						onClick={() => this.props.onClickHome(backText)}
						style={styleButton}
						size="lg"
						variant="outline-dark"
					>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								//gap: "10px",
							}}
						>
							<img
								src={backImgPath}
								alt={backImgPath_tmp}
								style={styleImageBk}
							/>
							{backText}
						</div>
					</Button>
				}
			/>
		);
		//handleMenuItemClick={this.props.onClickTierSelection}
		return (
			<div style={windowExternalContainer}>
				<div style={windowButtonsContainer}>{tiers}</div>
				<div style={windowLogoContainer}>
					{homeButton}
					<div style={styleImageContainer}>
						<img src={logoPath} alt={this.props.logoImg} style={styleImage} />
					</div>
				</div>
			</div>
		);
	}
}
