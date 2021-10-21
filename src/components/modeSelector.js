import React from "react";
import Button from "react-bootstrap/Button";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import {
	number_logo_width,
	number_logo_height,
	manage_instrument_tooltip,
	manage_settings_tooltip,
	string_logo_img_micro_bk,
	string_manage_hardware_circle_img,
	string_manage_settings_circle_img,
} from "../constants";

export default class ModeSelector extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			// isLoadingSchema: false,
			// isLoadingMicroscopes: false,
			// isLoadingDimensions: false,
			// isLoadingSettings: false,
			// isLoadingTierList: false,
			// isSchemaLoaded: false,
			// isMicroscopesLoaded: false,
			// isDimensionsLoaded: false,
			// isSettingsLoaded: false,
			// isTierListLoaded: false,
			// isHandlingMicPreset: false,
			// isHandledMicPreset: false,
		};

		// this.simulateClickLoadSchema = this.simulateClickLoadSchema.bind(this);
		// this.onClickLoadSchema = this.onClickLoadSchema.bind(this);

		// this.simulateClickLoadMicroscopes =
		// 	this.simulateClickLoadMicroscopes.bind(this);
		// this.onClickLoadMicroscopes = this.onClickLoadMicroscopes.bind(this);

		// this.simulateClickLoadSettings = this.simulateClickLoadSettings.bind(this);
		// this.onClickLoadSettings = this.onClickLoadSettings.bind(this);

		// this.simulateClickLoadDimensions =
		// 	this.simulateClickLoadDimensions.bind(this);
		// this.onClickLoadDimensions = this.onClickLoadDimensions.bind(this);

		// this.simulateClickHandleMicPreset =
		// 	this.simulateClickHandleMicPreset.bind(this);
		// this.onClickHandleMicPreset = this.onClickHandleMicPreset.bind(this);

		// this.simulateClickLoadTierList = this.simulateClickLoadTierList.bind(this);
		// this.onClickLoadTierList = this.onClickLoadTierList.bind(this);
	}

	// onClickLoadDimensions() {
	// 	this.setState({ isLoadingDimensions: true }, () => {
	// 		this.props.onClickLoadDimensions().then(() => {
	// 				this.setState({
	// 					isLoadingDimensions: false,
	// 					isDimensionsLoaded: true,
	// 				});
	// 		});
	// 	});
	// }

	// onClickLoadSchema() {
	// 	this.setState({ isLoadingSchema: true }, () => {
	// 		this.props.onClickLoadSchema().then(() => {
	// 				this.setState({ isLoadingSchema: false, isSchemaLoaded: true });
	// 		});
	// 	});
	// }

	// onClickLoadMicroscopes() {
	// 	this.setState({ isLoadingMicroscopes: true }, () => {
	// 		this.props.onClickLoadMicroscopes().then(() => {
	// 				this.setState({
	// 					isLoadingMicroscopes: false,
	// 					isMicroscopesLoaded: true,
	// 				});
	// 		});
	// 	});
	// }

	// onClickLoadSettings() {
	// 	this.setState({ isLoadingSettings: true }, () => {
	// 		this.props.onClickLoadSettings().then(() => {
	// 				this.setState({
	// 					isLoadingSettings: false,
	// 					isSettingsLoaded: true,
	// 				});
	// 		});
	// 	});
	// }

	// onClickLoadTierList() {
	// 	this.setState({ isLoadingTierList: true }, () => {
	// 		this.props.onClickLoadTierList().then(() => {
	// 				this.setState({
	// 					isLoadingTierList: false,
	// 					isTierListLoaded: true,
	// 				});
	// 		});
	// 	});
	// }

	// onClickHandleMicPreset() {
	// 	this.setState({ isHandlingMicPreset: true }, () => {
	// 		this.props.onClickHandleMicPreset().then(() => {
	// 				this.setState({
	// 					isHandlingMicPreset: false,
	// 					isHandledMicPreset: true,
	// 				});
	// 		});
	// 	});
	// }

	// simulateClickLoadDimensions(loadDimensionsButtonRef) {
	// 	if (loadDimensionsButtonRef === null) return;
	// 	loadDimensionsButtonRef.click();
	// }

	// simulateClickLoadSchema(loadSchemaButtonRef) {
	// 	if (loadSchemaButtonRef === null) return;
	// 	loadSchemaButtonRef.click();
	// }

	// simulateClickLoadMicroscopes(loadMicroscopesButtonRef) {
	// 	if (loadMicroscopesButtonRef === null) return;
	// 	loadMicroscopesButtonRef.click();
	// }

	// simulateClickLoadSettings(loadSettingsButtonRef) {
	// 	if (loadSettingsButtonRef === null) return;
	// 	loadSettingsButtonRef.click();
	// }

	// simulateClickLoadTierList(loadTierListButtonRef) {
	// 	if (loadTierListButtonRef === null) return;
	// 	loadTierListButtonRef.click();
	// }

	// simulateClickHandleMicPreset(handleMicPresetButtonRef) {
	// 	if (handleMicPresetButtonRef === null) return;
	// 	handleMicPresetButtonRef.click();
	// }

	render() {
		const windowExternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		// const windowButtonsContainer = {
		// 	display: "flex",
		// 	justifyContent: "center",
		// 	flexFlow: "row",
		// 	flexWrap: "wrap",
		// 	width: "50%",
		// 	height: "15%",
		// 	alignItems: "center",
		// };
		const windowLogoContainer = {
			display: "flex",
			justifyContent: "flex-end",
			flexFlow: "column",
			width: "100%",
			height: `${number_logo_height}px`,
			alignItems: "center",
			marginTop: "100px",
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		// const buttonStyle = {
		// 	width: "250px",
		// 	height: "50px",
		// 	marginTop: "10px",
		// 	marginBottom: "10px",
		// 	marginLeft: "25px",
		// 	marginRight: "25px",
		// };
		let styleImageContainer = {
			width: `${number_logo_width}px`,
			height: `${number_logo_height}px`,
		};
		// let isLoadingSchema = this.state.isLoadingSchema;
		// let isLoadingMicroscopes = this.state.isLoadingMicroscopes;
		// let isLoadingSettings = this.state.isLoadingSettings;
		// let isLoadingDimensions = this.state.isLoadingDimensions;
		// let isLoadingTierList = this.state.isLoadingTierList;
		// let isSchemaLoaded = this.state.isSchemaLoaded;
		// let isMicroscopesLoaded = this.state.isMicroscopesLoaded;
		// let isSettingsLoaded = this.state.isSettingsLoaded;
		// let isDimensionsLoaded = this.state.isDimensionsLoaded;
		// let isTierListLoaded = this.state.isTierListLoaded;

		// let isHandlingMicPreset = this.state.isHandlingMicPreset;
		// let isHandledMicPreset = this.state.isHandledMicPreset;

		// if (this.props.is4DNPortal) {
		// 	if (
		// 		!isSchemaLoaded ||
		// 		!isDimensionsLoaded ||
		// 		!isMicroscopesLoaded ||
		// 		!isSettingsLoaded
		// 	) {
		// 		return (
		// 			<div style={windowExternalContainer}>
		// 				<div style={{ textAlign: "center", fontWeight: "bold" }}>
		// 					Loading...
		// 				</div>
		// 				<div style={windowButtonsContainer}>
		// 					<Button
		// 						ref={this.simulateClickLoadMicroscopes}
		// 						disabled={isLoadingMicroscopes || isMicroscopesLoaded}
		// 						onClick={
		// 							!isLoadingMicroscopes && !isMicroscopesLoaded
		// 								? this.onClickLoadMicroscopes
		// 								: null
		// 						}
		// 						style={buttonStyle}
		// 						size="lg"
		// 						variant="secondary"
		// 					>
		// 						{isLoadingMicroscopes
		// 							? "Loading microscopes"
		// 							: isMicroscopesLoaded
		// 							? "Microscopes loaded"
		// 							: "Load microscopes"}
		// 					</Button>
		// 					<Button
		// 						ref={this.simulateClickLoadSettings}
		// 						disabled={isLoadingSettings || isSettingsLoaded}
		// 						onClick={
		// 							!isLoadingSettings && !isSettingsLoaded
		// 								? this.onClickLoadSettings
		// 								: null
		// 						}
		// 						style={buttonStyle}
		// 						size="lg"
		// 						variant="secondary"
		// 					>
		// 						{isLoadingSettings
		// 							? "Loading settings"
		// 							: isSettingsLoaded
		// 							? "Settings loaded"
		// 							: "Load settings"}
		// 					</Button>
		// 					<Button
		// 						ref={this.simulateClickLoadDimensions}
		// 						disabled={isLoadingDimensions || isDimensionsLoaded}
		// 						onClick={
		// 							!isLoadingDimensions && !isDimensionsLoaded
		// 								? this.onClickLoadDimensions
		// 								: null
		// 						}
		// 						style={buttonStyle}
		// 						size="lg"
		// 						variant="secondary"
		// 					>
		// 						{isLoadingDimensions
		// 							? "Loading dimensions"
		// 							: isDimensionsLoaded
		// 							? "Dimensions loaded"
		// 							: "Load dimensions"}
		// 					</Button>
		// 					<Button
		// 						ref={this.simulateClickLoadSchema}
		// 						disabled={isLoadingSchema || isSchemaLoaded}
		// 						onClick={
		// 							!isLoadingSchema && !isSchemaLoaded
		// 								? this.onClickLoadSchema
		// 								: null
		// 						}
		// 						style={buttonStyle}
		// 						size="lg"
		// 						variant="secondary"
		// 					>
		// 						{isLoadingSchema
		// 							? "Loading schema"
		// 							: isSchemaLoaded
		// 							? "Schema loaded"
		// 							: "Load schema"}
		// 					</Button>
		// 					<Button
		// 						ref={this.simulateClickLoadTierList}
		// 						disabled={isLoadingTierList || isTierListLoaded}
		// 						onClick={
		// 							!isLoadingTierList && !isTierListLoaded
		// 								? this.onClickLoadTierList
		// 								: null
		// 						}
		// 						style={buttonStyle}
		// 						size="lg"
		// 						variant="secondary"
		// 					>
		// 						{isLoadingTierList
		// 							? "Loading Tier list"
		// 							: isTierListLoaded
		// 							? "Tier list loaded"
		// 							: "Load Tier List"}
		// 					</Button>
		// 				</div>
		// 				<div style={windowLogoContainer}>
		// 					<div style={styleImageContainer}>
		// 						<img
		// 							src={logoPath}
		// 							alt={this.props.logoImg}
		// 							style={styleImage}
		// 						/>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		);
		// 	} else if (!isHandledMicPreset) {
		// 		return (
		// 			<div style={windowExternalContainer}>
		// 				<div style={{ textAlign: "center", fontWeight: "bold" }}>
		// 					Loading...
		// 				</div>
		// 				<div style={windowButtonsContainer}>
		// 					<Button
		// 						ref={this.simulateClickHandleMicPreset}
		// 						disabled={isHandlingMicPreset || isHandledMicPreset}
		// 						onClick={
		// 							!isHandlingMicPreset && !isHandledMicPreset
		// 								? this.onClickHandleMicPreset
		// 								: null
		// 						}
		// 						style={buttonStyle}
		// 						size="lg"
		// 						variant="secondary"
		// 					>
		// 						{isHandlingMicPreset
		// 							? "Loading microscope"
		// 							: isHandledMicPreset
		// 							? "Microscope loaded"
		// 							: "Load Microscope"}
		// 					</Button>
		// 				</div>
		// 				<div style={windowLogoContainer}>
		// 					<div style={styleImageContainer}>
		// 						<img
		// 							src={logoPath}
		// 							alt={this.props.logoImg}
		// 							style={styleImage}
		// 						/>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		);
		// 	}
		// } else {
		const windowModeSelectorContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "row",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const buttonModeSelectorStyle = {
			width: "500px",
			height: "600px",
			margin: "50px",
		};
		const buttonsInnerContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		let styleIconImage = {
			width: "100%",
			height: "50%",
			margin: "30px",
		};
		let styleText_1 = {
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
		let selectionEnabled = true;
		// if (
		// 	!isSchemaLoaded ||
		// 	!isDimensionsLoaded ||
		// 	!isMicroscopesLoaded ||
		// 	!isSettingsLoaded
		// ) {
		// 	selectionEnabled = false;
		// }

		let logoImg = url.resolve(
			this.props.imagesPathPNG,
			string_logo_img_micro_bk
		);
		let hardwareImg = url.resolve(
			this.props.imagesPathSVG,
			string_manage_hardware_circle_img
		);
		let settingsImg = url.resolve(
			this.props.imagesPathSVG,
			string_manage_settings_circle_img
		);

		let logoPath =
			logoImg +
			(logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let hardwareImgPath =
			hardwareImg +
			(hardwareImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		let settingsImgPath =
			settingsImg +
			(settingsImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		return (
			<div style={windowExternalContainer}>
				<div style={windowLogoContainer}>
					<div style={styleImageContainer}>
						<img src={logoPath} alt={logoImg} style={styleImage} />
					</div>
				</div>
				<div style={windowModeSelectorContainer}>
					<PopoverTooltip
						position={manage_instrument_tooltip.position}
						title={manage_instrument_tooltip.title}
						content={manage_instrument_tooltip.content}
						element={
							<Button
								disabled={!selectionEnabled}
								onClick={this.props.onClickCreateNewMicroscope}
								style={buttonModeSelectorStyle}
								size="lg"
								variant="light"
							>
								{
									<div style={buttonsInnerContainer}>
										<img
											src={hardwareImgPath}
											alt={this.props.hardwareImg}
											style={styleIconImage}
										/>
										<h2 style={styleText_1}>Manage Instrument</h2>
										<p style={styleText_2}>
											Collect information about the hardware components of your
											microscope.
										</p>
									</div>
								}
							</Button>
						}
					/>
					<PopoverTooltip
						position={manage_settings_tooltip.position}
						title={manage_settings_tooltip.title}
						content={manage_settings_tooltip.content}
						element={
							<Button
								disabled={!selectionEnabled || !this.props.hasSettings}
								onClick={this.props.onClickLoadMicroscope}
								style={buttonModeSelectorStyle}
								size="lg"
								variant="light"
							>
								{
									<div style={buttonsInnerContainer}>
										<img
											src={settingsImgPath}
											alt={settingsImg}
											style={styleIconImage}
										/>
										<h2 style={styleText_1}>Manage Settings</h2>
										<p style={styleText_2}>
											Collect information about the acquisition settings that
											were used to produce your image.
										</p>
									</div>
								}
							</Button>
						}
					/>
				</div>
				{/* <div style={windowButtonsContainer}>
						<Button
							ref={this.simulateClickLoadMicroscopes}
							disabled={isLoadingMicroscopes || isMicroscopesLoaded}
							onClick={
								!isLoadingMicroscopes && !isMicroscopesLoaded
									? this.onClickLoadMicroscopes
									: null
							}
							style={buttonStyle}
							size="lg"
							variant="secondary"
						>
							{isLoadingMicroscopes
								? "Loading microscopes"
								: isMicroscopesLoaded
								? "Microscopes loaded"
								: "Load microscopes"}
						</Button>
						<Button
							ref={this.simulateClickLoadSettings}
							disabled={isLoadingSettings || isSettingsLoaded}
							onClick={
								!isLoadingSettings && !isSettingsLoaded
									? this.onClickLoadSettings
									: null
							}
							style={buttonStyle}
							size="lg"
							variant="secondary"
						>
							{isLoadingSettings
								? "Loading settings"
								: isSettingsLoaded
								? "Settings loaded"
								: "Load settings"}
						</Button>
						<Button
							ref={this.simulateClickLoadDimensions}
							disabled={isLoadingDimensions || isDimensionsLoaded}
							onClick={
								!isLoadingDimensions && !isDimensionsLoaded
									? this.onClickLoadDimensions
									: null
							}
							style={buttonStyle}
							size="lg"
							variant="secondary"
						>
							{isLoadingDimensions
								? "Loading dimensions"
								: isDimensionsLoaded
								? "Dimensions loaded"
								: "Load dimensions"}
						</Button>
						<Button
							ref={this.simulateClickLoadSchema}
							disabled={isLoadingSchema || isSchemaLoaded}
							onClick={
								!isLoadingSchema && !isSchemaLoaded
									? this.onClickLoadSchema
									: null
							}
							style={buttonStyle}
							size="lg"
							variant="secondary"
						>
							{isLoadingSchema
								? "Loading schema"
								: isSchemaLoaded
								? "Schema loaded"
								: "Load schema"}
						</Button>
						<Button
							ref={this.simulateClickLoadTierList}
							disabled={isLoadingTierList || isTierListLoaded}
							onClick={
								!isLoadingTierList && !isTierListLoaded
									? this.onClickLoadTierList
									: null
							}
							style={buttonStyle}
							size="lg"
							variant="secondary"
						>
							{isLoadingTierList
								? "Loading Tier list"
								: isTierListLoaded
								? "Tier list loaded"
								: "Load Tier List"}
						</Button>
					</div> */}
			</div>
		);
		//}
	}
}
