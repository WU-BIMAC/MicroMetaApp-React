import React from "react";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

const url = require("url");

import {
	number_logo_width,
	number_logo_height,
	string_logo_img_micro_bk,
} from "../constants";

export default class DataLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isLoadingSchema: false,
			isLoadingMicroscopes: false,
			isLoadingDimensions: false,
			isLoadingSettings: false,
			isLoadingTierList: false,
			isSchemaLoaded: false,
			isMicroscopesLoaded: false,
			isDimensionsLoaded: false,
			isSettingsLoaded: false,
			isTierListLoaded: false,

			isHandlingMicPreset: false,
			isHandledMicPreset: false,

			progressValueSchema: 0,
			progressValueMicroscopes: 0,
			progressValueSettings: 0,
			progressValueDimensions: 0,
			progressValueTierList: 0,
			progressValueMicPreset: 0,
		};

		this.simulateClickLoadSchema = this.simulateClickLoadSchema.bind(this);
		this.onClickLoadSchema = this.onClickLoadSchema.bind(this);

		this.simulateClickLoadMicroscopes =
			this.simulateClickLoadMicroscopes.bind(this);
		this.onClickLoadMicroscopes = this.onClickLoadMicroscopes.bind(this);

		this.simulateClickLoadSettings = this.simulateClickLoadSettings.bind(this);
		this.onClickLoadSettings = this.onClickLoadSettings.bind(this);

		this.simulateClickLoadDimensions =
			this.simulateClickLoadDimensions.bind(this);
		this.onClickLoadDimensions = this.onClickLoadDimensions.bind(this);

		this.simulateClickHandleMicPreset =
			this.simulateClickHandleMicPreset.bind(this);
		this.onClickHandleMicPreset = this.onClickHandleMicPreset.bind(this);

		this.simulateClickLoadTierList = this.simulateClickLoadTierList.bind(this);
		this.onClickLoadTierList = this.onClickLoadTierList.bind(this);
	}

	onClickLoadDimensions() {
		const interval = setInterval(() => {
			let oldValue = this.state.progressValueDimensions;
			let newValue = oldValue + 10;
			if (newValue === 100) clearInterval(interval);
			this.setState({
				progressValueDimensions: newValue,
			});
		}, 100);
		this.setState({ isLoadingDimensions: true }, () => {
			this.props.onClickLoadDimensions().then(() => {
				this.setState({
					isLoadingDimensions: false,
					isDimensionsLoaded: true,
					progressValueDimensions: 100,
				});
				clearInterval(interval);
				if (
					this.state.isDimensionsLoaded &&
					this.state.isMicroscopesLoaded &&
					this.state.isSettingsLoaded &&
					this.state.isTierListLoaded &&
					this.state.isSchemaLoaded
				)
					if (!this.props.is4DNPortal && !this.props.isMMEOpen)
						this.props.onDataLoaded();
			});
		});
	}

	onClickLoadSchema() {
		const interval = setInterval(() => {
			let oldValue = this.state.progressValueSchema;
			let newValue = oldValue + 10;
			if (newValue === 100) clearInterval(interval);
			this.setState({
				progressValueSchema: newValue,
			});
		}, 100);
		this.setState({ isLoadingSchema: true }, () => {
			this.props.onClickLoadSchema().then(() => {
				this.setState({
					isLoadingSchema: false,
					isSchemaLoaded: true,
					progressValueSchema: 100,
				});
				clearInterval(interval);
				if (
					this.state.isDimensionsLoaded &&
					this.state.isMicroscopesLoaded &&
					this.state.isSettingsLoaded &&
					this.state.isTierListLoaded &&
					this.state.isSchemaLoaded
				)
					if (!this.props.is4DNPortal && !this.props.isMMEOpen)
						this.props.onDataLoaded();
			});
		});
	}

	onClickLoadMicroscopes() {
		const interval = setInterval(() => {
			let oldValue = this.state.progressValueMicroscopes;
			let newValue = oldValue + 10;
			if (newValue === 100) clearInterval(interval);
			this.setState({
				progressValueMicroscopes: newValue,
			});
		}, 100);
		this.setState({ isLoadingMicroscopes: true }, () => {
			this.props.onClickLoadMicroscopes().then(() => {
				this.setState({
					isLoadingMicroscopes: false,
					isMicroscopesLoaded: true,
					progressValueMicroscopes: 100,
				});
				clearInterval(interval);
				if (
					this.state.isDimensionsLoaded &&
					this.state.isMicroscopesLoaded &&
					this.state.isSettingsLoaded &&
					this.state.isTierListLoaded &&
					this.state.isSchemaLoaded
				)
					if (!this.props.is4DNPortal && !this.props.isMMEOpen)
						this.props.onDataLoaded();
			});
		});
	}

	onClickLoadSettings() {
		const interval = setInterval(() => {
			let oldValue = this.state.progressValueSettings;
			let newValue = oldValue + 10;
			if (newValue === 100) clearInterval(interval);
			this.setState({
				progressValueSettings: newValue,
			});
		}, 100);
		this.setState({ isLoadingSettings: true }, () => {
			this.props.onClickLoadSettings().then(() => {
				this.setState({
					isLoadingSettings: false,
					isSettingsLoaded: true,
					progressValueSettings: 100,
				});
				clearInterval(interval);
				if (
					this.state.isDimensionsLoaded &&
					this.state.isMicroscopesLoaded &&
					this.state.isSettingsLoaded &&
					this.state.isTierListLoaded &&
					this.state.isSchemaLoaded
				)
					if (!this.props.is4DNPortal && !this.props.isMMEOpen)
						this.props.onDataLoaded();
			});
		});
	}

	onClickLoadTierList() {
		const interval = setInterval(() => {
			let oldValue = this.state.progressValueTierList;
			let newValue = oldValue + 10;
			if (newValue === 100) clearInterval(interval);
			this.setState({
				progressValueTierList: newValue,
			});
		}, 100);
		this.setState({ isLoadingTierList: true }, () => {
			this.props.onClickLoadTierList().then(() => {
				this.setState({
					isLoadingTierList: false,
					isTierListLoaded: true,
					progressValueTierList: 100,
				});
				clearInterval(interval);
				if (
					this.state.isDimensionsLoaded &&
					this.state.isMicroscopesLoaded &&
					this.state.isSettingsLoaded &&
					this.state.isTierListLoaded &&
					this.state.isSchemaLoaded
				)
					if (!this.props.is4DNPortal && !this.props.isMMEOpen)
						this.props.onDataLoaded();
			});
		});
	}

	onClickHandleMicPreset() {
		const interval = setInterval(() => {
			let oldValue = this.state.progressValueMicPreset;
			let newValue = oldValue + 10;
			if (newValue === 100) clearInterval(interval);
			this.setState({
				progressValueMicPreset: newValue,
			});
		}, 100);
		this.setState({ isHandlingMicPreset: true }, () => {
			this.props.onClickHandleMicPreset().then(() => {
				this.setState({
					isHandlingMicPreset: false,
					isHandledMicPreset: true,
					progressValueMicPreset: 100,
				});
				clearInterval(interval);
				this.props.onDataLoaded();
			});
		});
	}

	simulateClickLoadDimensions(loadDimensionsButtonRef) {
		if (loadDimensionsButtonRef === null) return;
		loadDimensionsButtonRef.click();
	}

	simulateClickLoadSchema(loadSchemaButtonRef) {
		if (loadSchemaButtonRef === null) return;
		loadSchemaButtonRef.click();
	}

	simulateClickLoadMicroscopes(loadMicroscopesButtonRef) {
		if (loadMicroscopesButtonRef === null) return;
		loadMicroscopesButtonRef.click();
	}

	simulateClickLoadSettings(loadSettingsButtonRef) {
		if (loadSettingsButtonRef === null) return;
		loadSettingsButtonRef.click();
	}

	simulateClickLoadTierList(loadTierListButtonRef) {
		if (loadTierListButtonRef === null) return;
		loadTierListButtonRef.click();
	}

	simulateClickHandleMicPreset(handleMicPresetButtonRef) {
		if (handleMicPresetButtonRef === null) return;
		handleMicPresetButtonRef.click();
	}

	render() {
		const buttonStyle = {
			display: "none",
			width: "200px",
			height: "20px",
			padding: "5px",
			margin: "5px",
		};

		const progressStyle = {
			width: `${number_logo_width}px`,
			height: "50px",
			padding: "5px",
			margin: "5px",
		};
		const wrapperContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
			minHeight: "600px",
		};
		const mainContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const buttonsContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "row",
			flexWrap: "wrap",
			width: `${number_logo_width}px`,
			height: "60%",
			alignItems: "flex-start",
			alignContent: "flex-start",
			//marginTop: "10px",
		};
		const logoContainer = {
			display: "flex",
			justifyContent: "flex-end",
			flexFlow: "column",
			width: "100%",
			//height: `${number_logo_height}px`,
			height: "40%",
			alignItems: "center",
		};
		let styleImageContainer = {
			width: `${number_logo_width}px`,
			height: `${number_logo_height}px`,
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let isLoadingSchema = this.state.isLoadingSchema;
		let isLoadingMicroscopes = this.state.isLoadingMicroscopes;
		let isLoadingSettings = this.state.isLoadingSettings;
		let isLoadingDimensions = this.state.isLoadingDimensions;
		let isLoadingTierList = this.state.isLoadingTierList;
		let isSchemaLoaded = this.state.isSchemaLoaded;
		let isMicroscopesLoaded = this.state.isMicroscopesLoaded;
		let isSettingsLoaded = this.state.isSettingsLoaded;
		let isDimensionsLoaded = this.state.isDimensionsLoaded;
		let isTierListLoaded = this.state.isTierListLoaded;

		let isHandlingMicPreset = this.state.isHandlingMicPreset;
		let isHandledMicPreset = this.state.isHandledMicPreset;

		let logoImg = url.resolve(
			this.props.imagesPathPNG,
			string_logo_img_micro_bk
		);
		let logoPath =
			logoImg +
			(logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

		let microscopesLabel = isLoadingMicroscopes
			? "Loading microscopes: " + this.state.progressValueMicroscopes + "%"
			: isMicroscopesLoaded
			? "Microscopes loaded"
			: "Load microscopes";
		let settingsLabel = isLoadingSettings
			? "Loading settings: " + this.state.progressValueSettings + "%"
			: isSettingsLoaded
			? "Settings loaded"
			: "Load settings";
		let dimensionsLabel = isLoadingDimensions
			? "Loading dimensions: " + this.state.progressValueDimensions + "%"
			: isDimensionsLoaded
			? "Dimensions loaded"
			: "Load dimensions";
		let tierListLabel = isLoadingTierList
			? "Loading Tier list: " + this.state.progressValueTierList + "%"
			: isTierListLoaded
			? "Tier list loaded"
			: "Load Tier List";
		let schemaLabel = isLoadingSchema
			? "Loading schema: " + this.state.progressValueSchema + "%"
			: isSchemaLoaded
			? "Schema loaded"
			: "Load schema";
		let presetLabel = isHandlingMicPreset
			? "Loading microscope: " + this.state.progressValueMicPreset + "%"
			: isHandledMicPreset
			? "Microscope loaded"
			: "Load Microscope";
		if (
			!isSchemaLoaded ||
			!isDimensionsLoaded ||
			!isMicroscopesLoaded ||
			!isSettingsLoaded
		) {
			return (
				<div style={wrapperContainer}>
					<div style={mainContainer}>
						<div style={logoContainer}>
							<div style={styleImageContainer}>
								<img
									src={logoPath}
									alt={this.props.logoImg}
									style={styleImage}
									onLoad={this.onImgLoad}
								/>
							</div>
						</div>
						<div style={buttonsContainer}>
							<h5 style={{ marginTop: "20px", textAlign: "center" }}>
								Loading data
							</h5>
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
							>
								{microscopesLabel}
							</Button>
							<ProgressBar
								style={progressStyle}
								label={microscopesLabel}
								now={this.state.progressValueMicroscopes}
								striped
								animated
							/>
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
							>
								{settingsLabel}
							</Button>
							<ProgressBar
								style={progressStyle}
								label={settingsLabel}
								now={this.state.progressValueSettings}
								striped
								animated
							/>
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
							>
								{dimensionsLabel}
							</Button>
							<ProgressBar
								style={progressStyle}
								label={dimensionsLabel}
								now={this.state.progressValueDimensions}
								striped
								animated
							/>
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
								{tierListLabel}
							</Button>
							<ProgressBar
								style={progressStyle}
								label={tierListLabel}
								now={this.state.progressValueTierList}
								striped
								animated
							/>
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
							>
								{schemaLabel}
							</Button>
							<ProgressBar
								style={progressStyle}
								label={schemaLabel}
								now={this.state.progressValueSchema}
								striped
								animated
							/>
						</div>
						<p>
							(c) Copyright 2018-2023 University of Massachusetts Chan Medical
							School. All Rights Reserved.
							<br />
							The software is distributed under the terms of the{" "}
							<a href="https://www.gnu.org/licenses/gpl-3.0.html">
								GNU General Public License v3.0.
							</a>
						</p>
					</div>
				</div>
			);
		} else if (
			(this.props.is4DNPortal || this.props.isMMEOpen) &&
			!isHandledMicPreset
		) {
			return (
				<div style={wrapperContainer}>
					<div style={mainContainer}>
						<div style={logoContainer}>
							<div style={styleImageContainer}>
								<img
									src={logoPath}
									alt={this.props.logoImg}
									style={styleImage}
									onLoad={this.onImgLoad}
								/>
							</div>
						</div>
						<div style={buttonsContainer}>
							<h4 style={{ textAlign: "center" }}>Loading preset</h4>
							<Button
								ref={this.simulateClickHandleMicPreset}
								disabled={isHandlingMicPreset || isHandledMicPreset}
								onClick={
									!isHandlingMicPreset && !isHandledMicPreset
										? this.onClickHandleMicPreset
										: null
								}
								style={buttonStyle}
								size="lg"
							>
								{presetLabel}
							</Button>
							<ProgressBar
								style={progressStyle}
								label={presetLabel}
								now={this.state.progressValueMicPreset}
								striped
								animated
							/>
						</div>
						<p>
							(c) Copyright 2018-2023 University of Massachusetts Chan Medical
							School. All Rights Reserved.
							<br />
							The software is distributed under the terms of the{" "}
							<a href="https://www.gnu.org/licenses/gpl-3.0.html">
								GNU General Public License v3.0.
							</a>
						</p>
					</div>
				</div>
			);
		} else {
			return (
				<div style={wrapperContainer}>
					<div style={mainContainer}>
						<div style={logoContainer}>
							<div style={styleImageContainer}>
								<img
									src={logoPath}
									alt={this.props.logoImg}
									style={styleImage}
									onLoad={this.onImgLoad}
								/>
							</div>
						</div>
						<p>
							(c) Copyright 2018-2023 University of Massachusetts Chan Medical
							School. All Rights Reserved.
							<br />
							The software is distributed under the terms of the{" "}
							<a href="https://www.gnu.org/licenses/gpl-3.0.html">
								GNU General Public License v3.0.
							</a>
						</p>
					</div>
				</div>
			);
		}
	}
}
