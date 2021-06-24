import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";

import { number_logo_width, number_logo_height } from "../constants";

export default class DataLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isLoadingSchema: false,
			isLoadingMicroscopes: false,
			isLoadingDimensions: false,
			isLoadingSettings: false,
			isSchemaLoaded: false,
			isMicroscopesLoaded: false,
			isDimensionsLoaded: false,
			isSettingsLoaded: false,

			isHandlingMicPreset: false,
			isHandledMicPreset: false,
		};
		this._isMounted = false;

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
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	onClickLoadDimensions() {
		this.setState({ isLoadingDimensions: true }, () => {
			this.props.onClickLoadDimensions().then(() => {
				if (this._isMounted)
					this.setState({
						isLoadingDimensions: false,
						isDimensionsLoaded: true,
					});
			});
		});
	}

	onClickLoadSchema() {
		this.setState({ isLoadingSchema: true }, () => {
			this.props.onClickLoadSchema().then(() => {
				if (this._isMounted)
					this.setState({ isLoadingSchema: false, isSchemaLoaded: true });
			});
		});
	}

	onClickLoadMicroscopes() {
		this.setState({ isLoadingMicroscopes: true }, () => {
			this.props.onClickLoadMicroscopes().then(() => {
				if (this._isMounted)
					this.setState({
						isLoadingMicroscopes: false,
						isMicroscopesLoaded: true,
					});
			});
		});
	}

	onClickLoadSettings() {
		this.setState({ isLoadingSettings: true }, () => {
			this.props.onClickLoadSettings().then(() => {
				if (this._isMounted)
					this.setState({
						isLoadingSettings: false,
						isSettingsLoaded: true,
					});
			});
		});
	}

	onClickHandleMicPreset() {
		this.setState({ isHandlingMicPreset: true }, () => {
			this.props.onClickHandleMicPreset().then(() => {
				if (this._isMounted)
					this.setState({
						isHandlingMicPreset: false,
						isHandledMicPreset: true,
					});
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

	simulateClickHandleMicPreset(handleMicPresetButtonRef) {
		if (handleMicPresetButtonRef === null) return;
		handleMicPresetButtonRef.click();
	}

	render() {
		const buttonStyle = {
			width: "200px",
			height: "50px",
			padding: "5px",
			margin: "5px",
		};
		const windowExternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const windowInternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
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
		let isSchemaLoaded = this.state.isSchemaLoaded;
		let isMicroscopesLoaded = this.state.isMicroscopesLoaded;
		let isSettingsLoaded = this.state.isSettingsLoaded;
		let isLoadingDimensions = this.state.isLoadingDimensions;
		let isDimensionsLoaded = this.state.isDimensionsLoaded;

		let isHandlingMicPreset = this.state.isHandlingMicPreset;
		let isHandledMicPreset = this.state.isHandledMicPreset;

		let logoPath =
			this.props.logoImg +
			(this.props.logoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		if (
			!isSchemaLoaded ||
			!isDimensionsLoaded ||
			!isMicroscopesLoaded ||
			!isSettingsLoaded
		) {
			return (
				<div style={windowExternalContainer}>
					<div style={windowInternalContainer}>
						<div style={styleImageContainer}>
							<img
								src={logoPath}
								alt={this.props.logoImg}
								style={styleImage}
								onLoad={this.onImgLoad}
							/>
						</div>
						<div style={{ textAlign: "center", fontWeight: "bold" }}>
							Loading...
						</div>
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
						>
							{isLoadingSchema
								? "Loading schema"
								: isSchemaLoaded
								? "Schema loaded"
								: "Load schema"}
						</Button>
					</div>
				</div>
			);
		} else if (this.props.is4DNPortal && !isHandledMicPreset) {
			return (
				<div style={windowExternalContainer}>
					<div style={windowInternalContainer}>
						<div style={styleImageContainer}>
							<img
								src={logoPath}
								alt={this.props.logoImg}
								style={styleImage}
								onLoad={this.onImgLoad}
							/>
						</div>
						<div style={{ textAlign: "center", fontWeight: "bold" }}>
							Loading...
						</div>
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
							{isHandlingMicPreset
								? "Loading microscope"
								: isHandledMicPreset
								? "Microscope loaded"
								: "Load Microscope"}
						</Button>
					</div>
				</div>
			);
		} else {
			return (
				<div style={windowExternalContainer}>
					<div style={windowInternalContainer}>
						<div style={styleImageContainer}>
							<img
								src={logoPath}
								alt={this.props.logoImg}
								style={styleImage}
								onLoad={this.onImgLoad}
							/>
						</div>
					</div>
				</div>
			);
		}
	}
}
