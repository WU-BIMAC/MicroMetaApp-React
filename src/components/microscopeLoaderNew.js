import React from "react";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

import { isDefined, validateMicroscope } from "../genericUtilities";

const url = require("url");

import {
	string_json_ext,
	number_small_logo_width,
	number_small_logo_height,
	string_createFromFile,
	string_loadFromRepository,
	string_loadFromHomeFolder,
	microscope_loader_scratch_inverted,
	microscope_loader_scratch_upright,
	microscope_loader_load_from_file,
	microscope_loader_load_from_homeFolder,
	microscope_loader_load_from_repo,
	hardware_hardware_step_tooltip,
	create_from_file_tooltip,
	create_from_repo_manufacturer_tooltip,
	create_from_repo_names_tooltip,
	create_mode_continue_tooltip,
	home_tooltip,
	string_logo_img_no_bk,
	string_home_circle_img,
	string_dropbox_hardware_new,
	string_dropbox_hardware_replace,
} from "../constants";

export default class MicroscopeLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loadOrCreateOption: null,
			fileLoaded: false,
			fileLoading: false,
			selectedManu: null,
			selectedMic: null,
			micNames: null,
			modeSelection: props.modeSelection || null,
			filename: null,
			loadedMicroscope: null,
			step: !props.isImporter ? 1 : 2,
			errorMsg: null,
		};

		this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
		this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
		this.dropzoneDrop = this.dropzoneDrop.bind(this);
		this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
		this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);

		this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
		this.onFileReaderError = this.onFileReaderError.bind(this);
		this.onFileReaderLoad = this.onFileReaderLoad.bind(this);

		this.onClickManufacturerSelection =
			this.onClickManufacturerSelection.bind(this);
		this.onClickMicroscopeSelection =
			this.onClickMicroscopeSelection.bind(this);

		this.handleCreateOrLoadRadioChange =
			this.handleCreateOrLoadRadioChange.bind(this);
		this.handleStepRadioChange = this.handleStepRadioChange.bind(this);

		this.onClickConfirm = this.onClickConfirm.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		return null;
	}

	onFileReaderAbort(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderError(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderLoad(e) {
		let binaryStr = e.target.result;
		let microscope = null;
		let errorMsg = null;
		try {
			microscope = JSON.parse(binaryStr);
			if (validateMicroscope(microscope, this.props.schema, true)) {
				this.setState({ fileLoaded: true, loadedMicroscope: microscope });
			} else {
				errorMsg =
					"The file you are trying to load does not contain a proper MicroMetaApp Microscope";
			}
		} catch (exception) {
			if (this.props.isDebug) console.log(exception);
			errorMsg = "The file you are trying to load is not a proper json file";
		}

		if (errorMsg !== null) {
			this.setState({ fileLoaded: false, errorMsg: errorMsg });
		}
	}

	dropzoneDrop() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDropRejected(rejectedFiles) {
		// let fileRejectedNames = "";
		rejectedFiles.forEach((rejected) => {
			this.setState({ filename: rejected.file.name });
		});
		let errorMsg = "The file you tried to load is not a json file";

		this.setState({
			fileLoading: false,
			fileLoaded: false,
			errorMsg: errorMsg,
		});
	}

	dropzoneDropAccepted(acceptedFiles) {
		const reader = new FileReader();
		reader.onabort = this.onFileReaderAbort;
		reader.onerror = this.onFileReaderError;
		reader.onload = this.onFileReaderLoad;

		acceptedFiles.forEach((file) => {
			this.setState({ filename: file.name });
			reader.readAsText(file);
		});

		this.setState({ fileLoading: false });
	}

	dropzoneDialogOpen() {
		this.setState({
			fileLoading: true,
			fileLoaded: false,
			errorMsg: null,
			filename: null,
			loadedMicroscope: null,
		});
	}

	dropzoneDialogCancel() {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	onClickManufacturerSelection(item) {
		//console.log("onClickManufacturerSelection - " + item);
		let micNames = this.props.microscopes[item];
		this.setState({ selectedManu: item, micNames: micNames });
		//this.props.onClickMicroscopeSelection(this.props.microscopes[item][0]);
	}

	onClickMicroscopeSelection(item) {
		//console.log("onClickMicroscopeSelection - " + item);
		this.setState({ filename: item });
	}

	handleCreateOrLoadRadioChange(item) {
		//console.log("handleCreateOrLoadRadioChange - " + item);

		if (
			(this.state.modeSelection === string_createFromFile &&
				item !== this.state.modeSelection) ||
			((this.state.modeSelection === string_loadFromRepository ||
				this.state.modeSelection === string_loadFromHomeFolder) &&
				item !== this.state.modeSelection)
		) {
			this.setState({
				fileLoading: false,
				fileLoaded: false,
				filename: null,
				loadedMicroscope: null,
			});
		}
		this.setState({ modeSelection: item });
	}

	handleStepRadioChange(item) {
		//console.log("handleStepRadioChange " + item);
		this.setState({ step: item });
	}

	onClickConfirm() {
		let modeSelection = this.state.modeSelection;
		let filename = null;
		let microscope = null;
		if (
			modeSelection === string_loadFromRepository ||
			modeSelection === string_loadFromHomeFolder
		) {
			filename = this.state.filename;
		} else if (modeSelection === string_createFromFile) {
			microscope = this.state.loadedMicroscope;
		}
		this.props.onClickConfirm(modeSelection, filename, microscope);
	}

	render() {
		const buttonStyleWideNoMarginSelected = {
			width: "500px",
			height: "100px",
			borderRadius: "50px",
			paddingLeft: "50px",
			paddingRight: "50px",
		};
		const buttonStyleWideNoMargin = {
			width: "250px",
			height: "100px",
			borderRadius: "50px",
			paddingLeft: "50px",
			paddingRight: "50px",
		};
		const buttonStyleWide = {
			width: "420px",
			height: "50px",
			margin: "5px",
		};
		const buttonStyle = {
			width: "200px",
			height: "50px",
			margin: "5px",
		};
		const titleContainer = {
			display: "flex",
			justifyContent: "flex-end",
			flexFlow: "column",
			width: "100%",
			height: "150px",
			alignItems: "center",
		};
		const windowExternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const windowMainContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "750px",
			alignItems: "center",
		};
		const windowStepContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "row",
			width: "100%",
			height: "100px",
			alignItems: "center",
			alignContent: "stretch",
		};
		const windowButtonsContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "row",
			width: "100%",
			height: "550px",
			alignItems: "center",
		};
		const windowLogoContainer = {
			display: "flex",
			justifyContent: "flex-end",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const windowBottomButtonsContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "row",
			width: "100%",
			height: "50px",
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

		let dropzoneContainer = {
			display: "flex",
			flexFlow: "column",
			justifyContent: "center",
			alignItems: "flex-start",
			width: "420px",
			height: "420px",
			cursor: "pointer",
		};
		let styleDropzone = {
			display: "flex",
			flexFlow: "column",
			justifyContent: "center",
			alignItems: "center",
			borderStyle: "dashed",
			borderWidth: "bold",
			borderColor: "red",
			width: "100%",
			height: "100%",
		};
		let styleDropzoneInput = { cursor: "pointer" };
		let styleCenterText = { textAlign: "center" };
		let styleImageContainer = {
			width: `${number_small_logo_width}px`,
			height: `${number_small_logo_height}px`,
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let styleButton = {
			width: "250px",
			minWidth: "250px",
			height: "50px",
			marginLeft: "5px",
			marginRight: "5px",
		};
		let styleImageIcon = {
			width: "20px",
			height: "20px",
			marginLeft: "10px",
			marginRight: "10px",
		};

		let step = this.state.step;
		let inputData = this.props.microscopes;

		let errorMsg = this.state.errorMsg;

		let fileLoading = this.state.fileLoading;
		let fileLoaded = this.state.fileLoaded;
		let filename = this.state.filename;

		let loadedMicroscope = this.state.loadedMicroscope;

		let selectedManu = this.state.selectedManu;
		let selectedMic = this.state.selectedMic;

		let loadingOptions = this.props.loadingOptions;
		let creatingOptions = this.props.creatingOptions;
		let modeSelection = this.state.modeSelection;

		// let isDropzoneActive = false;
		// if (loadingMode === 1) isDropzoneActive = true;

		//let create_mode_tooltip = null;
		// let titleText = null;
		// if (this.props.isSettings) {
		// 	create_mode_tooltip = create_mode_selector_settings_tooltip;
		// 	titleText = "Manage Settings Step 1/3: Open Microscope File";
		// } else {
		// 	create_mode_tooltip = create_mode_selector_tooltip;
		// 	if (this.props.isImporter) {
		// 		titleText = "Microscope Importer Step 1/1: Open Microscope File";
		// 	} else {
		// 		titleText = "Manage Instrument Step 1/1: Open Microscope File";
		// 	}
		// }

		// if (this.props.isImporter) {
		// }

		let styleText_1 = {
			wordBreak: "break-word",
			whiteSpace: "break-spaces",
			textAlign: "left",
		};
		let styleText_2 = {
			fontSize: "0.8em",
			wordBreak: "break-word",
			whiteSpace: "break-spaces",
			textAlign: "left",
		};
		let styleText_3 = {
			fontSize: "0.5em",
			wordBreak: "break-word",
			whiteSpace: "break-spaces",
			textAlign: "left",
		};

		let step1Disabled = false;
		//let step2Disabled = false;
		let variant_1 = "outline-primary";
		//let variant_2 = "outline-primary";
		// let variant_2 = "outline-danger";
		// if (isDefined(modeSelection)) {
		// 	if (modeSelection.toLowerCase().includes("create")) {
		// 		step2Disabled = true;
		// 		variant_2 = "outline-success";
		// 	}
		// 	variant_1 = "outline-success";
		// } else {
		// 	variant_1 = "outline-danger";
		// }

		// if (this.props.isImporter) {
		// 	step1Disabled = true;
		// }

		// if (loadedMicroscope !== null && filename !== null) {
		// 	variant_2 = "outline-success";
		// }

		let step1SubText = "";
		if (modeSelection !== null) {
			step1SubText = modeSelection;
		}
		if (filename !== null) {
			if (
				modeSelection === string_loadFromRepository ||
				modeSelection === string_loadFromHomeFolder
			) {
				let fullMicName = filename;
				let lastIndexBeforeID = fullMicName.lastIndexOf("_") + 1;
				let micName = fullMicName.substring(0, lastIndexBeforeID);
				let micID = fullMicName.substring(lastIndexBeforeID);
				let micLabel = micName + "\n" + micID;
				step1SubText += "\n" + micLabel;
			} else {
				step1SubText += "\n" + filename;
			}
		}
		let step1Text = (
			<div style={buttonsInnerTextContainer}>
				<h5 style={styleText_1}>1 - Select Microscope file</h5>
				<p style={styleText_3}>{step1SubText}</p>
			</div>
		);
		// let step2Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>2 - Select Microscope</h5>
		// 		<p style={styleText_3}>{filename !== null ? filename : ""}</p>
		// 	</div>
		// );
		if (step === 1) {
			step1Text = (
				<div style={buttonsInnerTextContainer}>
					<h4 style={styleText_1}>1 - Select Microscope file</h4>
					<p style={styleText_2}>{step1SubText}</p>
				</div>
			);
		}
		// else {
		// 	step2Text = (
		// 		<div style={buttonsInnerTextContainer}>
		// 			<h4 style={styleText_1}>2 - Select Microscope</h4>
		// 			<p style={styleText_2}>{filename !== null ? filename : ""}</p>
		// 		</div>
		// 	);
		// }

		let stepRadios = (
			<ToggleButtonGroup
				id="radio-step-options"
				key="radio-step-options"
				type="radio"
				name="radio-step-options"
				value={this.state.step}
				onChange={this.handleStepRadioChange}
			>
				<PopoverTooltip
					key={"popover-step-1"}
					position={hardware_hardware_step_tooltip.position}
					title={hardware_hardware_step_tooltip.title}
					content={hardware_hardware_step_tooltip.content}
					element={
						<ToggleButton
							id="rso-radio-1"
							key="rso-radio-1"
							value={1}
							disabled={step1Disabled}
							variant={variant_1}
							style={
								step === 1
									? buttonStyleWideNoMarginSelected
									: buttonStyleWideNoMargin
							}
						>
							{step1Text}
						</ToggleButton>
					}
				/>
				{/* <ToggleButton
					id="rso-radio-2"
					key="rso-radio-2"
					value={2}
					disabled={step2Disabled}
					variant={variant_2}
					style={
						step === 2
							? buttonStyleWideNoMarginSelected
							: buttonStyleWideNoMargin
					}
				>
					{step2Text}
				</ToggleButton> */}
			</ToggleButtonGroup>
		);

		let list = [];
		let createRadios = [];
		for (let i = 0; i < creatingOptions.length; i++) {
			let creatingOption = creatingOptions[i];
			let tooltip = microscope_loader_scratch_inverted;
			if (creatingOption.includes("Upright")) {
				tooltip = microscope_loader_scratch_upright;
			}
			createRadios.push(
				<PopoverTooltip
					key={"popover-" + creatingOption}
					position={tooltip.position}
					title={tooltip.title}
					content={tooltip.content}
					element={
						<ToggleButton
							type="radio"
							key={creatingOption}
							id={creatingOption}
							value={creatingOption}
							onChange={() =>
								this.handleCreateOrLoadRadioChange(creatingOption)
							}
							checked={creatingOption === modeSelection}
							style={buttonStyleWide}
							size="lg"
							variant="outline-primary"
						>
							{creatingOption}
						</ToggleButton>
					}
				/>
			);
		}

		if (step === 1) {
			let loadRadios = [];
			for (let i = 0; i < loadingOptions.length; i++) {
				let loadingOption = loadingOptions[i];
				let tooltip = microscope_loader_load_from_file;
				if (loadingOption === string_loadFromHomeFolder) {
					tooltip = microscope_loader_load_from_homeFolder;
				} else if (loadingOption === string_loadFromRepository) {
					tooltip = microscope_loader_load_from_repo;
				}
				loadRadios.push(
					<PopoverTooltip
						key={"popover-" + loadingOption}
						position={tooltip.position}
						title={tooltip.title}
						content={tooltip.content}
						element={
							<ToggleButton
								type="radio"
								key={loadingOption}
								id={loadingOption}
								value={loadingOption}
								onChange={() =>
									this.handleCreateOrLoadRadioChange(loadingOption)
								}
								checked={loadingOption === modeSelection}
								style={buttonStyleWide}
								size="lg"
								variant="outline-primary"
							>
								{loadingOption}
							</ToggleButton>
						}
					/>
				);
			}
			let toggles = [];
			toggles.push(<h4 key={"create-options"}>Create options</h4>);
			toggles.push(createRadios);
			toggles.push(<h4 key={"load-options"}>Load options</h4>);
			toggles.push(loadRadios);
			list.push(
				<ToggleButtonGroup
					id="radio-createLoad-options"
					key="radio-createLoad-options"
					type="radio"
					name="radio-createLoad-options"
					//value={modeSelection}
					//onChange={this.handleCreateOrLoadRadioChange}
					vertical
				>
					{toggles}
				</ToggleButtonGroup>
			);

			//TODO upload zone
			if (modeSelection === string_createFromFile) {
				let text = <p style={styleCenterText}>{string_dropbox_hardware_new}</p>;
				if (fileLoaded) {
					styleDropzone.borderColor = "green";
					text = (
						<div>
							<p style={styleCenterText}>{filename}</p>
							<p style={styleCenterText}>{string_dropbox_hardware_replace}</p>
						</div>
					);
				} else if (errorMsg !== null) {
					text = (
						<div>
							<p style={styleCenterText}>{filename}</p>
							<p style={styleCenterText}>{errorMsg}</p>
							<p style={styleCenterText}>{string_dropbox_hardware_replace}</p>
						</div>
					);
				}
				let dropbox = (
					<PopoverTooltip
						key={"popover-dropzone"}
						id={"popover-dropzone"}
						position={create_from_file_tooltip.position}
						title={create_from_file_tooltip.title}
						content={create_from_file_tooltip.content}
						element={
							<Dropzone
								key={"dropzone"}
								id={"dropzone"}
								onFileDialogCancel={this.dropzoneDialogCancel}
								onDrop={this.dropzoneDrop}
								onDropAccepted={this.dropzoneDropAccepted}
								onDropRejected={this.dropzoneDropRejected}
								accept={string_json_ext}
								multiple={false}
								style={dropzoneContainer}
							>
								{({ getRootProps, getInputProps }) => (
									<div
										style={styleDropzone}
										{...getRootProps({
											onClick: this.dropzoneDialogOpen,
										})}
									>
										<input style={styleDropzoneInput} {...getInputProps({})} />
										{text}
									</div>
								)}
							</Dropzone>
						}
					/>
				);
				list.push(
					<div
						key={"container-dropzone"}
						id={"container-dropzone"}
						style={dropzoneContainer}
					>
						<h4 key={"dropzone"}>Load Microscope file</h4>
						{dropbox}
					</div>
				);
			} else if (
				modeSelection === string_loadFromRepository ||
				modeSelection === string_loadFromHomeFolder
			) {
				//windowButtonsContainer.flexFlow = "row";
				const windowRadioButtonsContainer = {
					display: "flex",
					justifyContent: "center",
					flexFlow: "column",
					width: "430px",
					height: "550px",
					alignItems: "flex-start",
					maxHeight: "550px",
					overflow: "auto",
				};

				let manufacturers = Object.keys(inputData);
				// let defaultManu = isDefined(selectedManu)
				// 	? manufacturers.indexOf(selectedManu)
				// 	: 0;
				let manufacturerRadios = [];
				for (let i = 0; i < manufacturers.length; i++) {
					manufacturerRadios.push(
						<ToggleButton
							id={"rmo-radio-" + i}
							key={"rmo-radio-" + i}
							value={manufacturers[i]}
							variant={"outline-primary"}
							style={buttonStyleWide}
						>
							{manufacturers[i]}
						</ToggleButton>
					);
				}
				let manufacturerRadio = (
					<PopoverTooltip
						id={"popover-radio-manufactorer-options"}
						key={"popover-radio-manufactorer-options"}
						position={create_from_repo_manufacturer_tooltip.position}
						title={create_from_repo_manufacturer_tooltip.title}
						content={create_from_repo_manufacturer_tooltip.content}
						element={
							<ToggleButtonGroup
								id="radio-manufactorer-options"
								key="radio-manufactorer-options"
								type="radio"
								name="radio-manufactorer-options"
								value={selectedManu}
								onChange={(e) => {
									this.onClickManufacturerSelection(e);
								}}
								vertical={true}
							>
								{manufacturerRadios}
							</ToggleButtonGroup>
						}
					/>
				);
				list.push(
					<div
						key="radio-manufactorer-container"
						id="radio-manufactorer-container"
						style={windowRadioButtonsContainer}
					>
						<h4 key={"select-manufacturer"}>Select Manufacturer</h4>
						{manufacturerRadio}
					</div>
				);

				if (isDefined(selectedManu)) {
					// let defaultMic = isDefined(selectedMic)
					// 	? inputData[selectedManu].indexOf(selectedMic)
					// 	: 0;
					let microscopes = inputData[selectedManu];
					let microscopeRadios = [];
					for (let i = 0; i < microscopes.length; i++) {
						let fullMicName = microscopes[i];
						let lastIndexBeforeID = fullMicName.lastIndexOf("_") + 1;
						let micName = fullMicName.substring(0, lastIndexBeforeID);
						let micID = fullMicName.substring(lastIndexBeforeID);
						let micLabel = micName + "\n" + micID;
						microscopeRadios.push(
							<ToggleButton
								id={"rmico-radio-" + i}
								key={"rmico-radio-" + i}
								value={fullMicName}
								variant={"outline-primary"}
								style={buttonStyleWide}
							>
								<div
									style={{
										fontSize: "0.8em",
										wordBreak: "break-word",
										whiteSpace: "break-spaces",
									}}
								>
									{micLabel}
								</div>
							</ToggleButton>
						);
					}
					let microscopeRadio = (
						<PopoverTooltip
							id={"popover-radio-microscope-options"}
							key={"popover-radio-microscope-options"}
							position={create_from_repo_names_tooltip.position}
							title={create_from_repo_names_tooltip.title}
							content={create_from_repo_names_tooltip.content}
							element={
								<ToggleButtonGroup
									id="radio-microscope-options"
									key="radio-microscope-options"
									type="radio"
									name="radio-microscope-options"
									value={filename}
									onChange={(e) => {
										this.onClickMicroscopeSelection(e);
									}}
									vertical
								>
									{microscopeRadios}
								</ToggleButtonGroup>
							}
						/>
					);
					list.push(
						<div
							key="radio-microscope-options"
							id="radio-microscope-options"
							style={windowRadioButtonsContainer}
						>
							<h4 key={"select-microscope"}>Select Microscope file</h4>
							{microscopeRadio}
						</div>
					);
				}
			}
		}
		let continue_tooltip = create_mode_continue_tooltip;
		let buttons = [];
		// buttons.push(
		// 	<PopoverTooltip
		// 		key={"button-back"}
		// 		position={back_tooltip.position}
		// 		title={back_tooltip.title}
		// 		content={back_tooltip.content}
		// 		element={
		// 			<Button onClick={console.log("back")} style={buttonStyle} size="lg">
		// 				Back
		// 			</Button>
		// 		}
		// 	/>
		// );
		let disabled = false;
		if (
			modeSelection === string_createFromFile &&
			(!fileLoaded || loadedMicroscope === null)
		)
			disabled = true;
		else if (
			modeSelection === string_loadFromRepository ||
			(modeSelection === string_loadFromHomeFolder && filename === null)
		)
			disabled = true;
		buttons.push(
			<PopoverTooltip
				key={"button-continue"}
				position={continue_tooltip.position}
				title={continue_tooltip.title}
				content={continue_tooltip.content}
				element={
					<Button
						onClick={!disabled ? this.onClickConfirm : null}
						style={buttonStyle}
						size="lg"
						disabled={disabled}
					>
						Continue
					</Button>
				}
			/>
		);

		let logoImg = url.resolve(this.props.imagesPathPNG, string_logo_img_no_bk);
		let logoPath =
			logoImg +
			(logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");

		let homeImg = url.resolve(this.props.imagesPathSVG, string_home_circle_img);
		let homeImgPath =
			homeImg +
			(homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		let buttText = "Home";
		let homeButton = (
			<PopoverTooltip
				key={"TooltipButtonLeft-0"}
				position={"top"}
				title={home_tooltip.title}
				content={home_tooltip.content}
				element={
					<Button
						key={"ButtonLeft-0"}
						onClick={() => this.props.onClickHome(buttText)}
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
							<img src={homeImgPath} alt={homeImg} style={styleImageIcon} />
							{buttText}
						</div>
					</Button>
				}
			/>
		);

		return (
			<div style={windowExternalContainer}>
				<div style={windowMainContainer}>
					<div style={titleContainer}>
						<h1>{this.props.title}</h1>
					</div>
					<div style={windowStepContainer}>{stepRadios}</div>
					<div style={windowButtonsContainer}>{list}</div>
					<div style={windowBottomButtonsContainer}>{buttons}</div>
				</div>
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
