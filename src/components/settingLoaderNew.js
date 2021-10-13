import React from "react";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

import {
	isDefined,
	validateMicroscope,
	validateAcquisitionSettings,
} from "../genericUtilities";

const url = require("url");

import {
	string_json_ext,
	number_small_logo_width,
	number_small_logo_height,
	string_createFromFile,
	string_loadFromRepository,
	string_loadFromHomeFolder,
	microscope_loader_load_from_file,
	microscope_loader_load_from_homeFolder,
	microscope_loader_load_from_repo,
	create_from_file_tooltip,
	create_from_repo_manufacturer_tooltip,
	create_from_repo_names_tooltip,
	//create_mode_continue_settings_tooltip,
	loadImage_load_tooltip,
	loadImage_from_file_tooltip,
	loadImage_from_names_tooltip,
	loadImage_skip_tooltip,
	setting_loader_scratch,
	setting_loader_load_from_file,
	setting_loader_load_from_homeFolder,
	setting_loader_load_from_repo,
	createSettings_from_file_tooltip,
	createSettings_from_repo_names_tooltip,
	createSettings_mode_continue_tooltip,
	next_tooltip,
	back_tooltip,
	home_tooltip,
	string_back_img,
	string_noImageLoad,
} from "../constants";

export default class MicroscopeLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			micFileLoaded: false,
			micFileLoading: false,
			imgFileLoaded: false,
			imgFileLoading: false,
			settFileLoaded: false,
			settFileLoading: false,
			selectedManu: null,
			selectedMic: null,
			selectedImg: null,
			selectedSett: null,
			micNames: null,
			micModeSelection: props.micModeSelection || null,
			imgModeSelection: props.imgModeSelection || null,
			settModeSelection: props.settModeSelection || null,
			micFilename: null,
			imgFilename: null,
			settFilename: null,
			imageMap: null,
			loadedMicroscope: null,
			loadedMetadata: null,
			loadedSetting: null,
			step: 1,
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
		this.onClickImageSelection = this.onClickImageSelection.bind(this);
		this.onClickSettingSelection = this.onClickSettingSelection.bind(this);

		this.handleCreateOrLoadRadioChange =
			this.handleCreateOrLoadRadioChange.bind(this);
		this.handleStepRadioChange = this.handleStepRadioChange.bind(this);

		this.handleLoadMetadataComplete =
			this.handleLoadMetadataComplete.bind(this);

		this.onClickConfirm = this.onClickConfirm.bind(this);
		this.onClickBack = this.onClickBack.bind(this);
	}

	onFileReaderAbort(e) {
		let step = this.state.step;
		if (step === 1) this.setState({ micFileLoaded: false });
		else if (step === 3) this.setState({ settFileLoaded: false });
	}

	onFileReaderError(e) {
		let step = this.state.step;
		if (step === 1) this.setState({ micFileLoaded: false });
		else if (step === 3) this.setState({ settFileLoaded: false });
	}

	onFileReaderLoad(e) {
		let step = this.state.step;
		let binaryStr = e.target.result;
		let microscope = null;
		let errorMsg = null;
		try {
			if (step === 1) {
				microscope = JSON.parse(binaryStr);
				if (validateMicroscope(microscope, this.props.schema, true)) {
					this.setState({ micFileLoaded: true, loadedMicroscope: microscope });
				} else {
					errorMsg =
						"The file you are trying to load does not contain a proper MicroMetaApp Microscope";
				}
			} else if (step === 3) {
				let settings = JSON.parse(binaryStr);
				if (validateAcquisitionSettings(settings, this.props.schema)) {
					//this.props.onFileDrop(settings);
					this.setState({ settFileLoaded: true, loadedSetting: settings });
				} else {
					errorMsg =
						"The file you are trying to load does not contain a proper MicroMetaApp ImageAcquisitionSettings";
				}
			}
		} catch (exception) {
			if (this.props.isDebug) console.log(exception);
			errorMsg = "The file you are trying to load is not a proper json file";
		}

		if (errorMsg !== null) {
			if (step === 1) this.setState({ micFileLoaded: false });
			else if (step === 3) this.setState({ settFileLoaded: false });
			this.setState({ errorMsg: errorMsg });
		}
	}

	dropzoneDrop() {
		let step = this.state.step;
		if (step === 1)
			this.setState({ micFileLoading: true, micFileLoaded: false });
		else if (step === 2)
			this.setState({ imgFileLoading: true, imgFileLoaded: false });
		else if (step === 3)
			this.setState({ setFileLoading: true, settFileLoaded: false });
	}

	dropzoneDropRejected(rejectedFiles) {
		let step = this.state.step;
		// let fileRejectedNames = "";
		let filename = null;
		rejectedFiles.forEach((rejected) => {
			filename = rejected.file.name;
		});
		let errorMsg = "The file you tried to load is not a json file";
		if (step === 1)
			this.setState({
				micFileLoading: false,
				micFileLoaded: false,
				micFilename: filename,
				errorMsg: errorMsg,
			});
		else if (step === 2)
			this.setState({
				imgFileLoading: false,
				imgFileLoaded: false,
				imgFilename: filename,
				errorMsg: errorMsg,
			});
		else if (step === 3)
			this.setState({
				settFileLoading: false,
				settFileLoaded: false,
				settFilename: filename,
				errorMsg: errorMsg,
			});
	}

	dropzoneDropAccepted(acceptedFiles) {
		let step = this.state.step;
		const reader = new FileReader();
		reader.onabort = this.onFileReaderAbort;
		reader.onerror = this.onFileReaderError;
		reader.onload = this.onFileReaderLoad;

		acceptedFiles.forEach((file) => {
			if (step === 1 || step === 3) {
				if (step === 1) this.setState({ micFilename: file.name });
				if (step === 3) this.setState({ settFilename: file.name });
				reader.readAsText(file);
			} else if (step === 2) {
				this.setState({ imgFilename: file.name });
				this.props.onLoadMetadata(file.path, this.handleLoadMetadataComplete);
			}
		});
		if (step === 1) this.setState({ micFileLoading: false });
		else if (step === 2) this.setState({ imgFileLoading: false });
		else if (step === 3) this.setState({ settFileLoading: false });
	}

	dropzoneDialogOpen() {
		let step = this.state.step;
		if (step === 1)
			this.setState({
				micFileLoading: true,
				micFileLoaded: false,
				errorMsg: null,
				micFilename: null,
				loadedMicroscope: null,
			});
		else if (step === 2)
			this.setState({
				imgFileLoading: true,
				imgFileLoaded: false,
				errorMsg: null,
				imgFilename: null,
				loadedMetadata: null,
			});
		else if (step === 3)
			this.setState({
				settFileLoading: true,
				settFileLoaded: false,
				errorMsg: null,
				settFilename: null,
				loadedSetting: null,
			});
	}

	dropzoneDialogCancel() {
		let step = this.state.step;
		if (step === 2)
			this.setState({ micFileLoading: false, micFileLoaded: false });
		else if (step === 4)
			this.setState({ imgFileLoading: false, imgFileLoaded: false });
		else if (step === 6)
			this.setState({ settFileLoading: false, settFileLoaded: false });
	}

	onClickManufacturerSelection(item) {
		//console.log("onClickManufacturerSelection - " + item);
		let micNames = this.props.microscopeNames[item];
		this.setState({ selectedManu: item, micNames: micNames });
		//this.props.onClickMicroscopeSelection(this.props.microscopeNames[item][0]);
	}

	onClickMicroscopeSelection(item) {
		//console.log("onClickMicroscopeSelection - " + item);
		let loadedMicroscope = null;
		if (isDefined(this.props.microscopes)) {
			loadedMicroscope = this.props.microscopes[item];
		}
		this.setState({ micFilename: item, loadedMicroscope: loadedMicroscope });
	}

	onClickSettingSelection(item) {
		//console.log("onClickMicroscopeSelection - " + item);
		this.setState({ settFilename: item });
	}

	handleCreateOrLoadRadioChange(item) {
		//console.log("handleCreateOrLoadRadioChange - " + item);
		let step = this.state.step;
		if (step === 1) {
			if (
				(this.state.micModeSelection === string_createFromFile &&
					item !== this.state.micModeSelection) ||
				((this.state.micModeSelection === string_loadFromRepository ||
					this.state.micModeSelection === string_loadFromHomeFolder) &&
					item !== this.state.micModeSelection)
			) {
				this.setState({
					micFileLoading: false,
					micFileLoaded: false,
					micFilename: null,
					loadedMicroscope: null,
				});
			}
			this.setState({ micModeSelection: item });
		} else if (step === 2) {
			if (
				this.state.imgModeSelection === string_createFromFile &&
				item !== this.state.imgModeSelection
			) {
				this.setState({
					imgFileLoading: false,
					imgFileLoaded: false,
					imgFilename: null,
					loadedMetadata: null,
				});
			}
			this.setState({ imgModeSelection: item });
		} else if (step == 3) {
			if (
				(this.state.settModeSelection === string_createFromFile &&
					item !== this.state.settModeSelection) ||
				((this.state.settModeSelection === string_loadFromRepository ||
					this.state.settModeSelection === string_loadFromHomeFolder) &&
					item !== this.state.settModeSelection)
			) {
				this.setState({
					settFileLoading: false,
					settFileLoaded: false,
					settFilename: null,
					loadedSetting: null,
				});
			}
			this.setState({ settModeSelection: item });
		}
	}

	handleStepRadioChange(item) {
		//console.log("handleStepRadioChange " + item);
		this.setState({ step: item });
	}

	onClickImageSelection(item) {
		let imageMap = this.props.imageMap;
		let image = imageMap[item];
		//this.props.handleLoadMetadataComplete(image);
		if(this.props.isDebug)
				console.log("Loaded metadata: " + loadedMetadata);
		this.setState({ loadedMetadata: image });
	}

	handleLoadMetadataComplete(imageMetadata) {
		//console.log("IM HERE");
		if (imageMetadata.Error != null && imageMetadata.Error !== undefined) {
			this.setState({ errorMsg: "Error: " + imageMetadata.Error });
		} else if (
			imageMetadata.Images !== null &&
			imageMetadata.Images !== undefined
		) {
			let images = imageMetadata.Images;
			let firstImage = null;
			let imageMap = {};
			for (let index in images) {
				let image = images[index];
				if (firstImage === null) firstImage = image;
				let name = image.Name;
				imageMap[name] = image;
			}
			if(this.props.isDebug)
				console.log("Image map: " + imageMap);
			// console.log("image");
			// console.log(firstImage);
			//this.props.handleLoadMetadataComplete(firstImage);
			this.setState({ imageMap: imageMap, imgFileLoaded: true });
		} else {
			let image = imageMetadata.Image;
			// console.log("image");
			// console.log(image);
			//this.props.handleLoadMetadataComplete(image);
			if(this.props.isDebug)
				console.log("Loaded metadata: " + loadedMetadata);
			this.setState({ imgFileLoaded: true, loadedMetadata: image });
		}
	}

	onClickBack() {
		let step = this.state.step;
		if (
			step === 3 &&
			!isDefined(this.props.onLoadMetadata) /*!this.props.hasMetadataLoader*/
		) {
			step -= 2;
		} else {
			step--;
		}
		this.setState({ step: step });
	}

	onClickConfirm() {
		let step = this.state.step;
		if (step !== 3) {
			if (
				step === 1 &&
				!isDefined(this.props.onLoadMetadata) /*!this.props.hasMetadataLoader*/
			) {
				step += 2;
			} else {
				step++;
			}
			this.setState({ step: step });
			return;
		}
		let micModeSelection = this.state.micModeSelection;
		let imgModeSelection = this.state.imgModeSelection;
		let settModeSelection = this.state.settModeSelection;
		//console.log("modeSelection: " + this.state.modeSelection);
		//this.props.onClickLoadingOptionSelection(this.state.modeSelection);
		let microscope = null;
		let microscopeFilename = null;
		let metadata = null;
		let setting = null;
		let settingFilename = null;
		if (
			micModeSelection === string_loadFromRepository ||
			micModeSelection === string_loadFromHomeFolder
		) {
			microscopeFilename = this.state.micFilename;
		} else if (micModeSelection === string_createFromFile) {
			microscope = this.state.loadedMicroscope;
		}
		if (imgModeSelection === string_createFromFile) {
			metadata = this.state.loadedMetadata;
		}
		if (
			settModeSelection === string_loadFromRepository ||
			settModeSelection === string_loadFromHomeFolder
		) {
			settingFilename = this.state.settFilename;
		} else if (settModeSelection === string_createFromFile) {
			setting = this.state.loadedSetting;
		}

		this.props.onClickConfirm(
			micModeSelection,
			imgModeSelection,
			settModeSelection,
			microscopeFilename,
			microscope,
			settingFilename,
			setting,
			metadata
		);
	}

	render() {
		const buttonStyleWideNoMarginSelected1 = {
			width: "500px",
			height: "100px",
			borderRadius: "50px 0px 0px 50px",
			paddingLeft: "50px",
		};
		const buttonStyleWideNoMargin1 = {
			width: "300px",
			height: "100px",
			borderRadius: "50px 0px 0px 50px",
			paddingLeft: "50px",
		};
		const buttonStyleWideNoMarginSelected2 = {
			width: "500px",
			height: "100px",
		};
		const buttonStyleWideNoMargin2 = {
			width: "300px",
			height: "100px",
		};
		const buttonStyleWideNoMarginSelected3 = {
			width: "500px",
			height: "100px",
			borderRadius: "0px 50px 50px 0px",
			paddingRight: "50px",
		};
		const buttonStyleWideNoMargin3 = {
			width: "300px",
			height: "100px",
			borderRadius: "0px 50px 50px 0px",
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
			flexWrap: "wrap",
			width: "100%",
			height: "100px",
			alignItems: "center",
			alignContent: "stretch",
		};
		let windowButtonsContainer = {
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
			alignItems: "center",
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
		let styleImageBk = {
			width: "20px",
			height: "20px",
			marginLeft: "10px",
			marginRight: "10px",
		};

		let step = this.state.step;

		let microscopeNames = this.props.microscopeNames;
		let imageMap = this.state.imageMap;
		let settings = this.props.settings;

		let errorMsg = this.state.errorMsg;

		let micFileLoading = this.state.micFileLoading;
		let micFileLoaded = this.state.micFileLoaded;
		let micFilename = this.state.micFilename;

		let imgFileLoading = this.state.imgFileLoading;
		let imgFileLoaded = this.state.imgFileLoaded;
		let imgFilename = this.state.imgFilename;

		let settFileLoading = this.state.settFileLoading;
		let settFileLoaded = this.state.settFileLoaded;
		let settFilename = this.state.settFilename;

		let loadedMicroscope = this.state.loadedMicroscope;
		let loadedMetadata = this.state.loadedMetadata;
		let loadedSetting = this.state.loadedSetting;

		let selectedManu = this.state.selectedManu;
		let selectedMic = this.state.selectedMic;
		let selectedImg = this.state.selectedImg;
		let selectedSett = this.state.selectedSett;

		let micLoadingOptions = this.props.microscopeLoadingOptions;
		let imgLoadingOptions = this.props.imageLoadingOptions;
		let settLoadingOptions = this.props.settingLoadingOptions;
		let settCreatingOptions = this.props.settingCreatingOptions;
		let micModeSelection = this.state.micModeSelection;
		let imgModeSelection = this.state.imgModeSelection;
		let settModeSelection = this.state.settModeSelection;

		let step1Disabled = false;
		let step2Disabled = false;
		let step3Disabled = false;
		let variant_1 = "outline-primary";
		let variant_2 = "outline-primary";
		let variant_3 = "outline-primary";
		// if (isDefined(micModeSelection)) {
		// 	if (micModeSelection.toLowerCase().includes("create")) {
		// 		step2Disabled = true;
		// 		variant_2 = "outline-success";
		// 	}
		// 	variant_1 = "outline-success";
		// } else {
		// 	step2Disabled = true;
		// 	variant_1 = "outline-danger";
		// 	variant_2 = "outline-primary";
		// }
		// if (loadedMicroscope !== null && micFilename !== null) {
		// 	variant_2 = "outline-success";
		// }
		// let step3Disabled = false;
		// let step4Disabled = false;
		// let variant_3 = "outline-primary";
		// let variant_4 = "outline-danger";
		// if (!isDefined(this.props.onLoadMetadata)/*!this.props.hasMetadataLoader*/) {
		// 	step3Disabled = true;
		// 	step4Disabled = true;
		// 	variant_3 = "outline-primary";
		// 	variant_4 = "outline-primary";
		// } else {
		// 	if (isDefined(imgModeSelection)) {
		// 		if (imgModeSelection.toLowerCase().includes("skip")) {
		// 			step4Disabled = true;
		// 			variant_4 = "outline-success";
		// 		}
		// 		variant_3 = "outline-success";
		// 	} else {
		// 		step4Disabled = true;
		// 		variant_3 = "outline-danger";
		// 		variant_4 = "outline-primary";
		// 	}
		// 	if (loadedMetadata !== null && imgFilename !== null) {
		// 		variant_4 = "outline-success";
		// 	}
		// }
		// let step6Disabled = false;
		// let variant_5 = "outline-primary";

		// let variant_6 = "outline-danger";
		// if (isDefined(settModeSelection)) {
		// 	if (settModeSelection.toLowerCase().includes("create")) {
		// 		step6Disabled = true;
		// 		variant_6 = "outline-success";
		// 	}
		// 	variant_5 = "outline-success";
		// } else {
		// 	step6Disabled = true;
		// 	variant_5 = "outline-danger";
		// 	variant_6 = "outline-primary";
		// }
		// if (loadedSetting !== null && settFilename !== null) {
		// 	variant_6 = "outline-success";
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

		let step1SubText = "";
		if (micModeSelection !== null) {
			step1SubText = micModeSelection;
		}
		if (micFilename !== null) {
			if (
				micModeSelection === string_loadFromRepository ||
				micModeSelection === string_loadFromHomeFolder
			) {
				let fullMicName = micFilename;
				let lastIndexBeforeID = fullMicName.lastIndexOf("_") + 1;
				let micName = fullMicName.substring(0, lastIndexBeforeID);
				let micID = fullMicName.substring(lastIndexBeforeID);
				let micLabel = micName + "\n" + micID;
				step1SubText += "\n" + micLabel;
			} else {
				step1SubText += "\n" + micFilename;
			}
		}
		let step1Text = (
			<div style={buttonsInnerTextContainer}>
				<h5 style={styleText_1}>1 - Load Microscope file</h5>
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
					<h4 style={styleText_1}>1 - Load Microscope file</h4>
					<p style={styleText_2}>{step1SubText}</p>
				</div>
			);
		}

		let step2SubText = "";
		if (imgModeSelection !== null) {
			step2SubText = imgModeSelection;
		}
		if (imgFilename !== null) {
			step2SubText += "\n" + imgFilename;
		}
		let step2Text = (
			<div style={buttonsInnerTextContainer}>
				<h5 style={styleText_1}>2 - Load Image file</h5>
				<p style={styleText_3}>{step2SubText}</p>
			</div>
		);
		// let step2Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>2 - Select Microscope</h5>
		// 		<p style={styleText_3}>{filename !== null ? filename : ""}</p>
		// 	</div>
		// );
		if (step === 2) {
			step2Text = (
				<div style={buttonsInnerTextContainer}>
					<h4 style={styleText_1}>2 - Load Image file</h4>
					<p style={styleText_2}>{step2SubText}</p>
				</div>
			);
		}

		let step3SubText = "";
		if (settModeSelection !== null) {
			step3SubText = settModeSelection;
		}
		if (settFilename !== null) {
			if (
				settModeSelection === string_loadFromRepository ||
				settModeSelection === string_loadFromHomeFolder
			) {
				let fullSettName = settFilename;
				let lastIndexBeforeID = fullSettName.lastIndexOf("_") + 1;
				let settName = fullSettName.substring(0, lastIndexBeforeID);
				let settID = fullSettName.substring(lastIndexBeforeID);
				let settLabel = settName + "\n" + settID;
				step3SubText += "\n" + settLabel;
			} else {
				step3SubText += "\n" + settFilename;
			}
		}
		let step3Text = (
			<div style={buttonsInnerTextContainer}>
				<h5 style={styleText_1}>3 - Load Setting file</h5>
				<p style={styleText_3}>{step3SubText}</p>
			</div>
		);
		// let step2Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>2 - Select Microscope</h5>
		// 		<p style={styleText_3}>{filename !== null ? filename : ""}</p>
		// 	</div>
		// );
		if (step === 3) {
			step3Text = (
				<div style={buttonsInnerTextContainer}>
					<h4 style={styleText_1}>3 - Load Setting file</h4>
					<p style={styleText_2}>{step3SubText}</p>
				</div>
			);
		}

		// let step1Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5>1 - Microscope information</h5>
		// 		<p style={styleText_3}>
		// 			{micModeSelection !== null ? micModeSelection : ""}
		// 		</p>
		// 	</div>
		// );
		// let step2Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>2 - Select Microscope</h5>
		// 		<p style={styleText_3}>{micFilename !== null ? micFilename : ""}</p>
		// 	</div>
		// );
		// let step3Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>3 - Image information</h5>
		// 		<p style={styleText_3}>
		// 			{imgModeSelection !== null ? imgModeSelection : ""}
		// 		</p>
		// 	</div>
		// );
		// let step4Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>4 - Select Image</h5>
		// 		<p style={styleText_3}>{imgFilename !== null ? imgFilename : ""}</p>
		// 	</div>
		// );
		// let step5Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>5 - Setting information</h5>
		// 		<p style={styleText_3}>
		// 			{settModeSelection !== null ? settModeSelection : ""}
		// 		</p>
		// 	</div>
		// );
		// let step6Text = (
		// 	<div style={buttonsInnerTextContainer}>
		// 		<h5 style={styleText_1}>6 - Select Setting</h5>
		// 		<p style={styleText_3}>{settFilename !== null ? settFilename : ""}</p>
		// 	</div>
		// );
		// if (step === 1) {
		// 	step1Text = (
		// 		<div style={buttonsInnerTextContainer}>
		// 			<h3 style={styleText_1}>1 - Microscope information</h3>
		// 			<p style={styleText_2}>
		// 				{micModeSelection !== null ? micModeSelection : ""}
		// 			</p>
		// 		</div>
		// 	);
		// } else if (step === 2) {
		// 	step2Text = (
		// 		<div style={buttonsInnerTextContainer}>
		// 			<h3 style={styleText_1}>2 - Select Microscope</h3>
		// 			<p style={styleText_2}>{micFilename !== null ? micFilename : ""}</p>
		// 		</div>
		// 	);
		// } else if (step === 3) {
		// 	step3Text = (
		// 		<div style={buttonsInnerTextContainer}>
		// 			<h3 style={styleText_1}>3 - Image information</h3>
		// 			<p style={styleText_2}>
		// 				{imgModeSelection !== null ? imgModeSelection : ""}
		// 			</p>
		// 		</div>
		// 	);
		// } else if (step === 4) {
		// 	step4Text = (
		// 		<div style={buttonsInnerTextContainer}>
		// 			<h3 style={styleText_1}>4 - Select Image</h3>
		// 			<p style={styleText_2}>{imgFilename !== null ? imgFilename : ""}</p>
		// 		</div>
		// 	);
		// } else if (step === 5) {
		// 	step5Text = (
		// 		<div style={buttonsInnerTextContainer}>
		// 			<h3 style={styleText_1}>5 - Setting information</h3>
		// 			<p style={styleText_2}>
		// 				{settModeSelection !== null ? settModeSelection : ""}
		// 			</p>
		// 		</div>
		// 	);
		// } else if (step === 6) {
		// 	step6Text = (
		// 		<div style={buttonsInnerTextContainer}>
		// 			<h3 style={styleText_1}>6 - Select Setting</h3>
		// 			<p style={styleText_2}>{settFilename !== null ? settFilename : ""}</p>
		// 		</div>
		// 	);
		// }

		let continueNextTooltip = next_tooltip;
		let continueDisabled = false;
		let continueLabel = "Next";

		let step1Completed = true;
		let step2Completed = true;
		let step3Completed = true;

		if (!isDefined(micModeSelection)) {
			step1Completed = false;
		} else if (
			micModeSelection === string_createFromFile &&
			(!micFileLoaded || loadedMicroscope === null)
		) {
			step1Completed = false;
		} else if (
			(micModeSelection === string_loadFromRepository ||
				micModeSelection === string_loadFromHomeFolder) &&
			micFilename === null
		) {
			step1Completed = false;
		}

		let step2Inactive = false;
		if (isDefined(this.props.onLoadMetadata) /*this.props.hasMetadataLoader*/) {
			if (!isDefined(imgModeSelection)) {
				step2Completed = false;
			} else if (
				imgModeSelection === string_createFromFile &&
				(!imgFileLoaded || loadedMetadata === null)
			) {
				step2Completed = false;
			}
		} else {
			step2Inactive = true;
		}

		if (!isDefined(settModeSelection)) {
			step3Completed = false;
		} else if (
			settModeSelection === string_createFromFile &&
			(!settFileLoaded || loadedSetting === null)
		) {
			step3Completed = false;
		} else if (
			(settModeSelection === string_loadFromRepository ||
				settModeSelection === string_loadFromHomeFolder) &&
			settFilename === null
		) {
			step3Completed = false;
		}

		if (step === 1) {
			if (!step1Completed) {
				// || step2Inactive
				continueDisabled = true;
				// step2Disabled = true;
				// variant_2 = "secondary";
			}
			step2Disabled = true;
			variant_2 = "secondary";
			step3Disabled = true;
			variant_3 = "secondary";
		} else if (step === 2) {
			if (!step2Completed) {
				continueDisabled = true;
				// step3Disabled = true;
				// variant_3 = "secondary";
			}
			step1Disabled = true;
			variant_1 = "secondary";
			step3Disabled = true;
			variant_3 = "secondary";
		} else if (step === 3) {
			step1Disabled = true;
			variant_1 = "secondary";
			step2Disabled = true;
			variant_2 = "secondary";
			if (!step3Completed) {
				continueDisabled = true;
			}
			continueLabel = "Continue";
			continueNextTooltip = createSettings_mode_continue_tooltip;
		}

		let stepRadios = (
			<ToggleButtonGroup
				id="radio-step-options"
				key="radio-step-options"
				type="radio"
				name="radio-step-options"
				value={this.state.step}
				//onChange={this.handleStepRadioChange}
			>
				<ToggleButton
					id="rso-radio-1"
					key="rso-radio-1"
					value={1}
					disabled={step1Disabled}
					variant={variant_1}
					style={
						step === 1
							? buttonStyleWideNoMarginSelected1
							: buttonStyleWideNoMargin1
					}
				>
					{step1Text}
				</ToggleButton>
				<ToggleButton
					id="rso-radio-2"
					key="rso-radio-2"
					value={2}
					disabled={step2Disabled}
					variant={variant_2}
					style={
						step === 2
							? buttonStyleWideNoMarginSelected2
							: buttonStyleWideNoMargin2
					}
				>
					{step2Text}
				</ToggleButton>
				<ToggleButton
					id="rso-radio-3"
					key="rso-radio-3"
					value={3}
					disabled={step3Disabled}
					variant={variant_3}
					style={
						step === 3
							? buttonStyleWideNoMarginSelected3
							: buttonStyleWideNoMargin3
					}
				>
					{step3Text}
				</ToggleButton>
				{/* <ToggleButton
					id="rso-radio-4"
					key="rso-radio-4"
					value={4}
					disabled={step4Disabled}
					variant={variant_4}
					style={
						step === 4
							? buttonStyleWideNoMarginSelected
							: buttonStyleWideNoMargin
					}
				>
					{step4Text}
				</ToggleButton>
				<ToggleButton
					id="rso-radio-5"
					key="rso-radio-5"
					value={5}
					variant={variant_5}
					style={
						step === 5
							? buttonStyleWideNoMarginSelected
							: buttonStyleWideNoMargin
					}
				>
					{step5Text}
				</ToggleButton>
				<ToggleButton
					id="rso-radio-6"
					key="rso-radio-6"
					value={6}
					disabled={step6Disabled}
					variant={variant_6}
					style={
						step === 6
							? buttonStyleWideNoMarginSelected
							: buttonStyleWideNoMargin
					}
				>
					{step6Text}
				</ToggleButton> */}
			</ToggleButtonGroup>
		);

		let list = [];
		if (step === 1) {
			let loadRadios = [];
			for (let i = 0; i < micLoadingOptions.length; i++) {
				let loadingOption = micLoadingOptions[i];
				let tooltip = microscope_loader_load_from_file;
				if (loadingOption === string_loadFromHomeFolder) {
					tooltip = microscope_loader_load_from_homeFolder;
				} else if (loadingOption === string_loadFromRepository) {
					tooltip = microscope_loader_load_from_repo;
				}
				loadRadios.push(
					<PopoverTooltip
						key={"popover" + loadingOption}
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
								checked={loadingOption === micModeSelection}
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
			if (micModeSelection === string_createFromFile) {
				let text = (
					<p style={styleCenterText}>
						Click or drag a file here to load an existing Microscope file you
						want to work on.
					</p>
				);
				if (micFileLoaded) {
					styleDropzone.borderColor = "green";
					text = (
						<div>
							<p style={styleCenterText}>{micFilename}</p>
							<p style={styleCenterText}>
								Click or drag a file here to replace the currently loaded file
							</p>
						</div>
					);
				} else if (errorMsg !== null) {
					text = (
						<div>
							<p style={styleCenterText}>{micFilename}</p>
							<p style={styleCenterText}>{errorMsg}</p>
							<p style={styleCenterText}>
								Click or drag a file here to replace the currently loaded file
							</p>
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
				micModeSelection === string_loadFromRepository ||
				micModeSelection === string_loadFromHomeFolder
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

				let manufacturers = Object.keys(microscopeNames);
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
					let microscopesManu = microscopeNames[selectedManu];
					let microscopeRadios = [];
					for (let i = 0; i < microscopesManu.length; i++) {
						let fullMicName = microscopesManu[i];
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
									value={micFilename}
									onChange={(e) => {
										this.onClickMicroscopeSelection(e);
									}}
									vertical={true}
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
		} else if (step === 2) {
			let loadRadios = [];
			for (let i = 0; i < imgLoadingOptions.length; i++) {
				let loadingOption = imgLoadingOptions[i];
				let tooltip = loadImage_load_tooltip;
				if (loadingOption === string_noImageLoad) {
					tooltip = loadImage_skip_tooltip;
				}
				loadRadios.push(
					<PopoverTooltip
						key={"popover" + loadingOption}
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
								checked={loadingOption === imgModeSelection}
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
			if (imgModeSelection === string_createFromFile) {
				let text = (
					<p style={styleCenterText}>
						Click or drag a file here to load an Image file you want to work
						with.
					</p>
				);
				if (imgFileLoaded) {
					styleDropzone.borderColor = "green";
					text = (
						<div>
							<p style={styleCenterText}>{imgFilename}</p>
							<p style={styleCenterText}>
								Click or drag a file here to replace the currently loaded file
							</p>
						</div>
					);
				} else if (errorMsg !== null) {
					text = (
						<div>
							<p style={styleCenterText}>{imgFilename}</p>
							<p style={styleCenterText}>{errorMsg}</p>
							<p style={styleCenterText}>
								Click or drag a file here to replace the currently loaded file
							</p>
						</div>
					);
				}
				let imageRadio = null;
				let windowRadioButtonsContainer = null;
				if (imageMap !== null) {
					//windowButtonsContainer.flexFlow = "row";
					windowRadioButtonsContainer = {
						display: "flex",
						justifyContent: "center",
						flexFlow: "column",
						width: "25%",
						height: "80%",
						alignItems: "center",
						maxHeight: "80%",
						overflow: "auto",
					};
					dropzoneContainer.width = "25%";

					let imageKeys = Object.keys(imageMap);
					// let defaultManu = isDefined(selectedManu)
					// 	? manufacturers.indexOf(selectedManu)
					// 	: 0;
					let imageRadios = [];
					for (let i = 0; i < imageKeys.length; i++) {
						imageRadios.push(
							<ToggleButton
								id={"rio-radio-" + i}
								key={"rio-radio-" + i}
								value={imageKeys[i]}
								variant={"outline-primary"}
								style={buttonStyleWide}
							>
								{imageKeys[i]}
							</ToggleButton>
						);
					}
					imageRadio = (
						<PopoverTooltip
							id={"popover-radio-images-options"}
							key={"popover-radio-images-options"}
							position={loadImage_from_names_tooltip.position}
							title={loadImage_from_names_tooltip.title}
							content={loadImage_from_names_tooltip.content}
							element={
								<ToggleButtonGroup
									id="radio-image-options"
									key="radio-image-options"
									type="radio"
									name="radio-image-options"
									value={selectedImg}
									onChange={(e) => {
										this.onClickImageSelection(e);
									}}
									vertical={true}
								>
									{imageRadios}
								</ToggleButtonGroup>
							}
						/>
					);
				}
				let dropbox = (
					<PopoverTooltip
						key={"popover-dropzone"}
						id={"popover-dropzone"}
						position={loadImage_from_file_tooltip.position}
						title={loadImage_from_file_tooltip.title}
						content={loadImage_from_file_tooltip.content}
						element={
							<Dropzone
								key={"dropzone"}
								id={"dropzone"}
								onFileDialogCancel={this.dropzoneDialogCancel}
								onDrop={this.dropzoneDrop}
								onDropAccepted={this.dropzoneDropAccepted}
								onDropRejected={this.dropzoneDropRejected}
								//accept={string_json_ext}
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
						<h4 key={"dropzone"}>Load Image file</h4>
						{dropbox}
					</div>
				);
				if (imageRadio !== null) {
					list.push(
						<div
							key="radio-image-container"
							id="radio-image-container"
							style={windowRadioButtonsContainer}
						>
							<h4 key={"select-manufacturer"}>Select Image file</h4>
							{imageRadio}
						</div>
					);
				}
			}
		} else if (step === 3) {
			let createRadios = [];
			for (let i = 0; i < settCreatingOptions.length; i++) {
				let creatingOption = settCreatingOptions[i];
				let tooltip = setting_loader_scratch;
				createRadios.push(
					<PopoverTooltip
						key={"popover" + creatingOption}
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
								checked={creatingOption === settModeSelection}
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
			let loadRadios = [];
			for (let i = 0; i < settLoadingOptions.length; i++) {
				let loadingOption = settLoadingOptions[i];
				let tooltip = setting_loader_load_from_file;
				if (loadingOption === string_loadFromHomeFolder) {
					tooltip = setting_loader_load_from_homeFolder;
				} else if (loadingOption === string_loadFromRepository) {
					tooltip = setting_loader_load_from_repo;
				}
				loadRadios.push(
					<PopoverTooltip
						key={"popover" + loadingOption}
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
								checked={loadingOption === settModeSelection}
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
			if (settModeSelection === string_createFromFile) {
				let text = (
					<p style={styleCenterText}>
						Click or drag a file here to load an existing Image Acquisition
						Setting file you want to work on.
					</p>
				);
				if (settFileLoaded) {
					styleDropzone.borderColor = "green";
					text = (
						<div>
							<p style={styleCenterText}>{settFilename}</p>
							<p style={styleCenterText}>
								Click or drag a file here to replace the currently loaded file
							</p>
						</div>
					);
				} else if (errorMsg !== null) {
					text = (
						<div>
							<p style={styleCenterText}>{settFilename}</p>
							<p style={styleCenterText}>{errorMsg}</p>
							<p style={styleCenterText}>
								Click or drag a file here to replace the currently loaded file
							</p>
						</div>
					);
				}
				let dropbox = (
					<PopoverTooltip
						key={"popover-dropzone"}
						id={"popover-dropzone"}
						position={createSettings_from_file_tooltip.position}
						title={createSettings_from_file_tooltip.title}
						content={createSettings_from_file_tooltip.content}
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
						<h4 key={"dropzone"}>Load Setting file</h4>
						{dropbox}
					</div>
				);
			} else if (
				settModeSelection === string_loadFromRepository ||
				settModeSelection === string_loadFromHomeFolder
			) {
				const windowRadioButtonsContainer = {
					display: "flex",
					justifyContent: "center",
					flexFlow: "column",
					width: "25%",
					height: "80%",
					alignItems: "center",
					maxHeight: "80%",
					overflow: "auto",
				};

				let settingsNames = [];
				let mic_ID = loadedMicroscope.ID;
				Object.keys(settings).forEach((key) => {
					let sett = settings[key];
					let sett_ID = sett.InstrumentID;
					if (sett_ID === mic_ID) {
						settingsNames.push(key);
					}
				});

				//let settingKeys = Object.keys(settingsNames);
				// let defaultManu = isDefined(selectedManu)
				// 	? manufacturers.indexOf(selectedManu)
				// 	: 0;
				let settingRadios = [];
				for (let i = 0; i < settingsNames.length; i++) {
					let fullSettName = settingsNames[i];
					// let lastIndexBeforeID = fullSettName.lastIndexOf("_") + 1;
					// let settName = fullSettName.substring(0, lastIndexBeforeID);
					// let settID = fullSettName.substring(lastIndexBeforeID);
					// let settLabel = settName + "\n" + settID;
					settingRadios.push(
						<ToggleButton
							id={"rmo-radio-" + i}
							key={"rmo-radio-" + i}
							value={fullSettName}
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
								{fullSettName}
							</div>
						</ToggleButton>
					);
				}
				if (settingRadios.length === 0) {
					settingRadios.push(
						<p
							style={{ wordBreak: "break-word", whiteSpace: "break-spaces" }}
							key={"no-setting"}
						>
							No Setting matching selected\nMicroscope ID have been found
						</p>
					);
				}

				let settingRadio = (
					<PopoverTooltip
						id={"popover-radio-setting-options"}
						key={"popover-radio-setting-options"}
						position={createSettings_from_repo_names_tooltip.position}
						title={createSettings_from_repo_names_tooltip.title}
						content={createSettings_from_repo_names_tooltip.content}
						element={
							<ToggleButtonGroup
								id="radio-setting-options"
								key="radio-setting-options"
								type="radio"
								name="radio-setting-options"
								value={settFilename}
								onChange={(e) => {
									this.onClickSettingSelection(e);
								}}
								vertical={true}
							>
								{settingRadios}
							</ToggleButtonGroup>
						}
					/>
				);
				list.push(
					<div
						key="radio-setting-container"
						id="radio-setting-container"
						style={windowRadioButtonsContainer}
					>
						<h4 key={"select-setting"}>Select Settings file</h4>
						{settingRadio}
					</div>
				);
			}
		}

		let continue_tooltip = createSettings_mode_continue_tooltip;
		let buttons = [];
		let backDisabled = false;
		if (step === 1) {
			backDisabled = true;
		}
		buttons.push(
			<PopoverTooltip
				key={"button-back"}
				position={back_tooltip.position}
				title={back_tooltip.title}
				content={back_tooltip.content}
				element={
					<Button
						onClick={!backDisabled ? this.onClickBack : null}
						style={buttonStyle}
						size="lg"
						disabled={backDisabled}
					>
						Back
					</Button>
				}
			/>
		);

		buttons.push(
			<PopoverTooltip
				key={"button-continue"}
				position={continueNextTooltip.position}
				title={continueNextTooltip.title}
				content={continueNextTooltip.content}
				element={
					<Button
						onClick={!continueDisabled ? this.onClickConfirm : null}
						style={buttonStyle}
						size="lg"
						disabled={continueDisabled}
					>
						{continueLabel}
					</Button>
				}
			/>
		);

		let logoPath =
			this.props.logoImg +
			(this.props.logoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

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
				title={home_tooltip.title}
				content={home_tooltip.content}
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
