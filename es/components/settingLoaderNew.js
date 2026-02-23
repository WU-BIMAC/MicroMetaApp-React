"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var _ToggleButton = _interopRequireDefault(require("react-bootstrap/ToggleButton"));
var _ToggleButtonGroup = _interopRequireDefault(require("react-bootstrap/ToggleButtonGroup"));
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _genericUtilities = require("../genericUtilities");
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const url = require("url");
class MicroscopeLoader extends _react.default.PureComponent {
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
      imgSelectionDisabled: false,
      cursor: "default"
    };
    this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
    this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
    this.dropzoneDrop = this.dropzoneDrop.bind(this);
    this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
    this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);
    this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
    this.onFileReaderError = this.onFileReaderError.bind(this);
    this.onFileReaderLoad = this.onFileReaderLoad.bind(this);
    this.onClickManufacturerSelection = this.onClickManufacturerSelection.bind(this);
    this.onClickMicroscopeSelection = this.onClickMicroscopeSelection.bind(this);
    this.onClickImageSelection = this.onClickImageSelection.bind(this);
    this.onClickSettingSelection = this.onClickSettingSelection.bind(this);
    this.handleCreateOrLoadRadioChange = this.handleCreateOrLoadRadioChange.bind(this);
    this.handleStepRadioChange = this.handleStepRadioChange.bind(this);
    this.handleLoadMetadataComplete = this.handleLoadMetadataComplete.bind(this);
    this.onClickConfirm = this.onClickConfirm.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
  }
  onFileReaderAbort(e) {
    let step = this.state.step;
    if (step === 1) this.setState({
      micFileLoaded: false
    });else if (step === 3) this.setState({
      settFileLoaded: false
    });
  }
  onFileReaderError(e) {
    let step = this.state.step;
    if (step === 1) this.setState({
      micFileLoaded: false
    });else if (step === 3) this.setState({
      settFileLoaded: false
    });
  }
  onFileReaderLoad(e) {
    let step = this.state.step;
    let binaryStr = e.target.result;
    let microscope = null;
    let errorMsg = null;
    try {
      if (step === 1) {
        microscope = JSON.parse(binaryStr);
        if ((0, _genericUtilities.validateMicroscopeFile)(microscope, this.props.schema, true)) {
          this.setState({
            micFileLoaded: true,
            loadedMicroscope: microscope
          });
        } else {
          errorMsg = "The file you are trying to load does not contain a proper MicroMetaApp Microscope";
        }
      } else if (step === 3) {
        let settings = JSON.parse(binaryStr);
        if ((0, _genericUtilities.validateAcquisitionSettingsFile)(settings, this.props.schema)) {
          //this.props.onFileDrop(settings);
          this.setState({
            settFileLoaded: true,
            loadedSetting: settings
          });
        } else {
          errorMsg = "The file you are trying to load does not contain a proper MicroMetaApp ImageAcquisitionSettings";
        }
      }
    } catch (exception) {
      if (this.props.isDebug) console.log(exception);
      errorMsg = "The file you are trying to load is not a proper json file";
    }
    if (errorMsg !== null) {
      if (step === 1) this.setState({
        micFileLoaded: false
      });else if (step === 3) this.setState({
        settFileLoaded: false
      });
      this.setState({
        errorMsg: errorMsg
      });
    }
  }
  dropzoneDrop() {
    let step = this.state.step;
    if (step === 1) this.setState({
      micFileLoading: true,
      micFileLoaded: false
    });else if (step === 2) this.setState({
      imgFileLoading: true,
      imgFileLoaded: false
    });else if (step === 3) this.setState({
      setFileLoading: true,
      settFileLoaded: false
    });
  }
  dropzoneDropRejected(rejectedFiles) {
    let step = this.state.step;
    // let fileRejectedNames = "";
    let filename = null;
    rejectedFiles.forEach(rejected => {
      filename = rejected.file.name;
    });
    let errorMsg = "The file you tried to load is not a json file";
    if (step === 1) this.setState({
      micFileLoading: false,
      micFileLoaded: false,
      micFilename: filename,
      errorMsg: errorMsg
    });else if (step === 2) this.setState({
      imgFileLoading: false,
      imgFileLoaded: false,
      imgFilename: filename,
      errorMsg: errorMsg
    });else if (step === 3) this.setState({
      settFileLoading: false,
      settFileLoaded: false,
      settFilename: filename,
      errorMsg: errorMsg
    });
  }
  dropzoneDropAccepted(acceptedFiles) {
    let step = this.state.step;
    const reader = new FileReader();
    reader.onabort = this.onFileReaderAbort;
    reader.onerror = this.onFileReaderError;
    reader.onload = this.onFileReaderLoad;
    acceptedFiles.forEach(file => {
      if (step === 1 || step === 3) {
        if (step === 1) this.setState({
          micFilename: file.name
        });
        if (step === 3) this.setState({
          settFilename: file.name
        });
        reader.readAsText(file);
      } else if (step === 2) {
        this.setState({
          imgFilename: file.name
        });
        this.props.onLoadMetadata(file.path, this.handleLoadMetadataComplete);
      }
    });
    if (step === 1) this.setState({
      micFileLoading: false
    });else if (step === 2) this.setState({
      imgFileLoading: false
    });else if (step === 3) this.setState({
      settFileLoading: false
    });
  }
  dropzoneDialogOpen() {
    let step = this.state.step;
    if (step === 1) this.setState({
      micFileLoading: true,
      micFileLoaded: false,
      errorMsg: null,
      micFilename: null,
      loadedMicroscope: null
    });else if (step === 2) this.setState({
      imgFileLoading: true,
      imgFileLoaded: false,
      errorMsg: null,
      imgFilename: null,
      loadedMetadata: null
    });else if (step === 3) this.setState({
      settFileLoading: true,
      settFileLoaded: false,
      errorMsg: null,
      settFilename: null,
      loadedSetting: null
    });
  }
  dropzoneDialogCancel() {
    let step = this.state.step;
    if (step === 2) this.setState({
      micFileLoading: false,
      micFileLoaded: false
    });else if (step === 4) this.setState({
      imgFileLoading: false,
      imgFileLoaded: false
    });else if (step === 6) this.setState({
      settFileLoading: false,
      settFileLoaded: false
    });
  }
  onClickManufacturerSelection(item) {
    //console.log("onClickManufacturerSelection - " + item);
    let micNames = this.props.microscopeNames[item];
    this.setState({
      selectedManu: item,
      micNames: micNames
    });
    //this.props.onClickMicroscopeSelection(this.props.microscopeNames[item][0]);
  }
  onClickMicroscopeSelection(item) {
    //console.log("onClickMicroscopeSelection - " + item);
    let loadedMicroscope = null;
    let microscopes = this.props.microscopes;
    if ((0, _genericUtilities.isDefined)(microscopes)) {
      loadedMicroscope = microscopes[item].microscope;
    }
    this.setState({
      micFilename: item,
      loadedMicroscope: loadedMicroscope
    });
  }
  onClickSettingSelection(item) {
    //console.log("onClickMicroscopeSelection - " + item);
    this.setState({
      settFilename: item
    });
  }
  handleCreateOrLoadRadioChange(item) {
    //console.log("handleCreateOrLoadRadioChange - " + item);
    let step = this.state.step;
    if (step === 1) {
      if (this.state.micModeSelection === _constants.string_createFromFile && item !== this.state.micModeSelection || (this.state.micModeSelection === _constants.string_loadFromRepository || this.state.micModeSelection === _constants.string_loadFromHomeFolder) && item !== this.state.micModeSelection) {
        this.setState({
          micFileLoading: false,
          micFileLoaded: false,
          micFilename: null,
          loadedMicroscope: null
        });
      }
      this.setState({
        micModeSelection: item
      });
    } else if (step === 2) {
      if (this.state.imgModeSelection === _constants.string_createFromFile && item !== this.state.imgModeSelection) {
        this.setState({
          imgFileLoading: false,
          imgFileLoaded: false,
          imgFilename: null,
          loadedMetadata: null,
          imageMap: null
        });
      }
      this.setState({
        imgModeSelection: item
      });
    } else if (step == 3) {
      if (this.state.settModeSelection === _constants.string_createFromFile && item !== this.state.settModeSelection || (this.state.settModeSelection === _constants.string_loadFromRepository || this.state.settModeSelection === _constants.string_loadFromHomeFolder) && item !== this.state.settModeSelection) {
        this.setState({
          settFileLoading: false,
          settFileLoaded: false,
          settFilename: null,
          loadedSetting: null
        });
      }
      this.setState({
        settModeSelection: item
      });
    }
  }
  handleStepRadioChange(item) {
    //console.log("handleStepRadioChange " + item);
    this.setState({
      step: item
    });
  }
  onClickImageSelection(mode, item) {
    if (mode === 0) {
      let imageMap = this.state.imageMap;
      let image = imageMap[item];
      //this.props.handleLoadMetadataComplete(image);
      if (this.props.isDebug) console.log("Loaded metadata: " + image);
      this.setState({
        loadedMetadata: image,
        selectedImg: item
      });
    } else if (mode === 1) {
      this.setState({
        imgFilename: item,
        selectedImg: item,
        imgSelectionDisabled: true,
        cursor: "wait"
      });
      this.props.onLoadMetadata(this.handleLoadMetadataComplete);
    }
  }
  handleLoadMetadataComplete(imageMetadata) {
    if ((0, _genericUtilities.isDefined)(imageMetadata.Error)) {
      this.setState({
        errorMsg: "Error: " + imageMetadata.Error,
        imgSelectionDisabled: false,
        cursor: "default"
      });
    } else if ((0, _genericUtilities.isDefined)(imageMetadata.Images)) {
      let images = imageMetadata.Images;
      let firstImage = null;
      let imageMap = {};
      for (let index in images) {
        let image = images[index];
        if (firstImage === null) firstImage = image;
        let name = image.Name;
        imageMap[name] = image;
      }
      if (this.props.isDebug) console.log("Image map: " + imageMap);
      // console.log("image");
      // console.log(firstImage);
      //this.props.handleLoadMetadataComplete(firstImage);
      this.setState({
        imageMap: imageMap,
        imgFileLoaded: true
      });
    } else {
      let image = imageMetadata.Image;
      // console.log("image");
      // console.log(image);
      //this.props.handleLoadMetadataComplete(image);
      if (this.props.isDebug) console.log("Loaded metadata: " + image);
      this.setState({
        imgFileLoaded: true,
        loadedMetadata: image,
        imgSelectionDisabled: false,
        cursor: "default"
      });
    }
  }
  onClickBack() {
    let step = this.state.step;
    if (step === 3 && !(0, _genericUtilities.isDefined)(this.props.onLoadMetadata) /*!this.props.hasMetadataLoader*/) {
      step -= 2;
    } else {
      step--;
    }
    this.setState({
      step: step
    });
  }
  onClickConfirm() {
    let step = this.state.step;
    if (step !== 3) {
      if (step === 1 && !(0, _genericUtilities.isDefined)(this.props.onLoadMetadata) /*!this.props.hasMetadataLoader*/) {
        step += 2;
      } else {
        step++;
      }
      this.setState({
        step: step
      });
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
    if (micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) {
      microscopeFilename = this.state.micFilename;
    } else if (micModeSelection === _constants.string_createFromFile) {
      microscope = this.state.loadedMicroscope;
    }
    if (imgModeSelection === _constants.string_createFromFile || imgModeSelection === _constants.string_loadFromRepository || imgModeSelection === _constants.string_loadFromHomeFolder) {
      metadata = this.state.loadedMetadata;
    }
    if (settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) {
      settingFilename = this.state.settFilename;
    } else if (settModeSelection === _constants.string_createFromFile) {
      setting = this.state.loadedSetting;
    }
    this.props.onClickConfirm(micModeSelection, imgModeSelection, settModeSelection, microscopeFilename, microscope, settingFilename, setting, metadata);
  }
  render() {
    const buttonStyleWideNoMarginSelected1 = {
      width: "600px",
      height: "125px",
      borderRadius: "50px 0px 0px 50px",
      paddingLeft: "50px"
    };
    const buttonStyleWideNoMargin1 = {
      width: "350px",
      height: "125px",
      borderRadius: "50px 0px 0px 50px",
      paddingLeft: "50px"
    };
    const buttonStyleWideNoMarginSelected2 = {
      width: "600px",
      height: "125px"
    };
    const buttonStyleWideNoMargin2 = {
      width: "350px",
      height: "125px"
    };
    const buttonStyleWideNoMarginSelected3 = {
      width: "600px",
      height: "125px",
      borderRadius: "0px 50px 50px 0px",
      paddingRight: "50px"
    };
    const buttonStyleWideNoMargin3 = {
      width: "350px",
      height: "125px",
      borderRadius: "0px 50px 50px 0px",
      paddingRight: "50px"
    };
    const buttonStyleWide = {
      width: "410px",
      height: "50px",
      margin: "5px",
      whiteSpace: "break-spaces",
      wordBreak: "break-all"
    };
    const buttonStyle = {
      width: "200px",
      height: "50px",
      margin: "5px"
    };
    const titleContainer = {
      display: "flex",
      justifyContent: "flex-end",
      flexFlow: "column",
      width: "100%",
      height: "100px",
      margin: "25px",
      alignItems: "center"
    };
    const wrapperContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center",
      minWidth: "100%",
      minHeight: "100%",
      cursor: "".concat(this.state.cursor)
    };
    const mainContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center",
      maxHeight: "1050px"
    };
    const workingContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "80%",
      alignItems: "center"
    };
    const stepContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "row",
      flexWrap: "wrap",
      width: "100%",
      height: "100px",
      alignItems: "center",
      alignContent: "stretch",
      margin: "10px"
    };
    let buttonsContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "row",
      width: "100%",
      height: "550px",
      alignItems: "center",
      margin: "10px"
    };
    const logoContainer = {
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "column",
      width: "100%",
      height: "20%",
      alignItems: "center",
      marginTop: "10px"
    };
    const bottomButtonsContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "row",
      width: "100%",
      height: "50px",
      alignItems: "center",
      marginTop: "10px",
      marginBottom: "10px"
    };
    const styleButtonContainer = {
      marginRight: "20px",
      marginLeft: "20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
      //justifyContent: "flex-end",
    };
    const buttonsInnerTextContainer = {
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "flex-start"
    };
    let dropzoneContainer = {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "420px",
      height: "420px",
      cursor: "pointer"
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
      height: "100%"
    };
    let styleDropzoneInput = {
      cursor: "pointer"
    };
    let styleCenterText = {
      textAlign: "center",
      wordBreak: "break-word",
      whiteSpace: "break-spaces"
    };
    let styleImageContainer = {
      width: "".concat(_constants.number_small_logo_width, "px"),
      height: "".concat(_constants.number_small_logo_height, "px")
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let styleButton = {
      width: "250px",
      minWidth: "250px",
      height: "50px",
      marginLeft: "5px",
      marginRight: "5px"
    };
    let styleImageIcon = {
      width: "20px",
      height: "20px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let styleImageIconHome = {
      width: "30px",
      height: "30px",
      marginLeft: "10px",
      marginRight: "10px"
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
    let selectedGroup = this.state.selectedGroup;
    let selectedProject = this.state.selectedProject;
    let selectedDataset = this.state.selectedDataset;
    let selectedImg = this.state.selectedImg;
    let selectedSett = this.state.selectedSett;
    let micLoadingOptions = this.props.microscopeLoadingOptions;
    let imgLoadingOptions = this.props.imageLoadingOptions;
    let settLoadingOptions = this.props.settingLoadingOptions;
    let settCreatingOptions = this.props.settingCreatingOptions;
    let micModeSelection = this.state.micModeSelection;
    let imgModeSelection = this.state.imgModeSelection;
    let settModeSelection = this.state.settModeSelection;
    let imgSelectionDisabled = this.state.imgSelectionDisabled;
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
      textAlign: "left"
    };
    let styleText_2 = {
      //fontSize: "1em",
      wordBreak: "break-word",
      whiteSpace: "break-spaces",
      textAlign: "left"
    };
    let styleText_3 = {
      fontSize: "0.9em",
      wordBreak: "break-word",
      whiteSpace: "break-spaces",
      textAlign: "left"
    };
    let step1SubText = "";
    if (micModeSelection !== null) {
      step1SubText = micModeSelection;
    }
    if (micFilename !== null) {
      if (micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) {
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
    let step1Text = /*#__PURE__*/_react.default.createElement("div", {
      style: buttonsInnerTextContainer
    }, /*#__PURE__*/_react.default.createElement("h5", {
      style: styleText_1
    }, "1 - Select Microscope file"), /*#__PURE__*/_react.default.createElement("p", {
      style: styleText_3
    }, step1SubText));
    // let step2Text = (
    // 	<div style={buttonsInnerTextContainer}>
    // 		<h5 style={styleText_1}>2 - Select Microscope</h5>
    // 		<p style={styleText_3}>{filename !== null ? filename : ""}</p>
    // 	</div>
    // );
    if (step === 1) {
      step1Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h4", {
        style: styleText_1
      }, "1 - Select Microscope file"), /*#__PURE__*/_react.default.createElement("p", {
        style: styleText_2
      }, step1SubText));
    }
    let step2SubText = "";
    if (imgModeSelection !== null) {
      step2SubText = imgModeSelection;
    }
    if (imgFilename !== null) {
      step2SubText += "\n" + imgFilename;
    }
    let step2Text = /*#__PURE__*/_react.default.createElement("div", {
      style: buttonsInnerTextContainer
    }, /*#__PURE__*/_react.default.createElement("h5", {
      style: styleText_1
    }, "2 - Select Image file"), /*#__PURE__*/_react.default.createElement("p", {
      style: styleText_3
    }, step2SubText));
    // let step2Text = (
    // 	<div style={buttonsInnerTextContainer}>
    // 		<h5 style={styleText_1}>2 - Select Microscope</h5>
    // 		<p style={styleText_3}>{filename !== null ? filename : ""}</p>
    // 	</div>
    // );
    if (step === 2) {
      step2Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h4", {
        style: styleText_1
      }, "2 - Select Image file"), /*#__PURE__*/_react.default.createElement("p", {
        style: styleText_2
      }, step2SubText));
    }
    let step3SubText = "";
    if (settModeSelection !== null) {
      step3SubText = settModeSelection;
    }
    if (settFilename !== null) {
      if (settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) {
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
    let step3Text = /*#__PURE__*/_react.default.createElement("div", {
      style: buttonsInnerTextContainer
    }, /*#__PURE__*/_react.default.createElement("h5", {
      style: styleText_1
    }, "3 - Select Setting file"), /*#__PURE__*/_react.default.createElement("p", {
      style: styleText_3
    }, step3SubText));
    // let step2Text = (
    // 	<div style={buttonsInnerTextContainer}>
    // 		<h5 style={styleText_1}>2 - Select Microscope</h5>
    // 		<p style={styleText_3}>{filename !== null ? filename : ""}</p>
    // 	</div>
    // );
    if (step === 3) {
      step3Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h4", {
        style: styleText_1
      }, "3 - Select Setting file"), /*#__PURE__*/_react.default.createElement("p", {
        style: styleText_2
      }, step3SubText));
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

    let continueNextTooltip = _constants.next_tooltip;
    let continueDisabled = false;
    let continueLabel = "Next";
    let step1Completed = true;
    let step2Completed = true;
    let step3Completed = true;
    if (!(0, _genericUtilities.isDefined)(micModeSelection)) {
      step1Completed = false;
    } else if (micModeSelection === _constants.string_createFromFile && (!micFileLoaded || loadedMicroscope === null)) {
      step1Completed = false;
    } else if ((micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) && micFilename === null) {
      step1Completed = false;
    }
    let step2Inactive = false;
    if ((0, _genericUtilities.isDefined)(this.props.onLoadMetadata) /*this.props.hasMetadataLoader*/) {
      if (!(0, _genericUtilities.isDefined)(imgModeSelection)) {
        step2Completed = false;
      } else if (imgModeSelection === _constants.string_createFromFile && (!imgFileLoaded || loadedMetadata === null)) {
        step2Completed = false;
      } else if (imgModeSelection === _constants.string_loadFromRepository && (!imgFileLoaded || loadedMetadata === null)) {
        step2Completed = false;
      }
    } else {
      step2Inactive = true;
    }
    if (!(0, _genericUtilities.isDefined)(settModeSelection)) {
      step3Completed = false;
    } else if (settModeSelection === _constants.string_createFromFile && (!settFileLoaded || loadedSetting === null)) {
      step3Completed = false;
    } else if ((settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) && settFilename === null) {
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
      continueNextTooltip = _constants.createSettings_mode_continue_tooltip;
    }
    let stepRadios = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
      id: "radio-step-options",
      key: "radio-step-options",
      type: "radio",
      name: "radio-step-options"
      //value={this.state.step}
      //onChange={this.handleStepRadioChange}
    }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "popover-step-1",
      position: _constants.settings_hardware_step_tooltip.position,
      title: _constants.settings_hardware_step_tooltip.title,
      content: _constants.settings_hardware_step_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-1",
        key: "rso-radio-1",
        type: "radio",
        value: 1,
        disabled: step1Disabled,
        variant: variant_1,
        checked: this.state.step === 1,
        style: step === 1 ? buttonStyleWideNoMarginSelected1 : buttonStyleWideNoMargin1
      }, step1Text)
    }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "popover-step-2",
      position: _constants.settings_image_step_tooltip.position,
      title: _constants.settings_image_step_tooltip.title,
      content: _constants.settings_image_step_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-2",
        key: "rso-radio-2",
        type: "radio",
        value: 2,
        disabled: step2Disabled,
        variant: variant_2,
        checked: this.state.step === 2,
        style: step === 2 ? buttonStyleWideNoMarginSelected2 : buttonStyleWideNoMargin2
      }, step2Text)
    }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "popover-step-3",
      position: _constants.settings_settings_step_tooltip.position,
      title: _constants.settings_settings_step_tooltip.title,
      content: _constants.settings_settings_step_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-3",
        key: "rso-radio-3",
        type: "radio",
        value: 3,
        disabled: step3Disabled,
        variant: variant_3,
        checked: this.state.step === 3,
        style: step === 3 ? buttonStyleWideNoMarginSelected3 : buttonStyleWideNoMargin3
      }, step3Text)
    }));
    let list = [];
    if (step === 1) {
      let loadRadios = [];
      for (let i = 0; i < micLoadingOptions.length; i++) {
        let loadingOption = micLoadingOptions[i];
        let tooltip = _constants.microscope_loader_load_from_file;
        if (loadingOption === _constants.string_loadFromHomeFolder) {
          tooltip = _constants.microscope_loader_load_from_homeFolder;
        } else if (loadingOption === _constants.string_loadFromRepository) {
          tooltip = _constants.microscope_loader_load_from_repo;
        }
        loadRadios.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover" + loadingOption,
          position: tooltip.position,
          title: tooltip.title,
          content: tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
            type: "radio",
            key: loadingOption,
            id: loadingOption,
            value: loadingOption,
            onChange: () => this.handleCreateOrLoadRadioChange(loadingOption),
            checked: loadingOption === micModeSelection,
            style: buttonStyleWide,
            size: "lg",
            variant: "outline-primary"
          }, loadingOption)
        }));
      }
      let toggles = [];
      toggles.push(/*#__PURE__*/_react.default.createElement("h4", {
        key: "load-options"
      }, "Load options"));
      toggles.push(loadRadios);
      list.push(/*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
        id: "radio-createLoad-options",
        key: "radio-createLoad-options",
        type: "radio",
        name: "radio-createLoad-options"
        //value={modeSelection}
        //onChange={this.handleCreateOrLoadRadioChange}
        ,
        vertical: true
      }, toggles));
      if (micModeSelection === _constants.string_createFromFile) {
        let text = /*#__PURE__*/_react.default.createElement("p", {
          style: styleCenterText
        }, _constants.string_dropbox_hardware_new);
        if (micFileLoaded) {
          styleDropzone.borderColor = "green";
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, micFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_hardware_replace));
        } else if (errorMsg !== null) {
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, micFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_hardware_replace));
        }
        let dropbox = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover-dropzone",
          id: "popover-dropzone",
          position: _constants.create_from_file_tooltip.position,
          title: _constants.create_from_file_tooltip.title,
          content: _constants.create_from_file_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
            key: "dropzone",
            id: "dropzone",
            onFileDialogCancel: this.dropzoneDialogCancel,
            onDrop: this.dropzoneDrop,
            onDropAccepted: this.dropzoneDropAccepted,
            onDropRejected: this.dropzoneDropRejected,
            accept: _constants.string_json_ext,
            multiple: false,
            style: dropzoneContainer
          }, _ref => {
            let {
              getRootProps,
              getInputProps
            } = _ref;
            return /*#__PURE__*/_react.default.createElement("div", _extends({
              style: styleDropzone
            }, getRootProps({
              onClick: this.dropzoneDialogOpen
            })), /*#__PURE__*/_react.default.createElement("input", _extends({
              style: styleDropzoneInput
            }, getInputProps({}))), text);
          })
        });
        list.push(/*#__PURE__*/_react.default.createElement("div", {
          key: "container-dropzone",
          id: "container-dropzone",
          style: dropzoneContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          key: "dropzone"
        }, "Load Microscope file"), dropbox));
      } else if (micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) {
        //windowButtonsContainer.flexFlow = "row";
        const radioButtonsContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "430px",
          height: "550px",
          alignItems: "flex-start",
          maxHeight: "550px"
          //overflow: "auto",
        };
        const toggleStyle = {
          maxHeight: "500px",
          overflow: "auto"
        };
        let manufacturers = Object.keys(microscopeNames);
        // let defaultManu = isDefined(selectedManu)
        // 	? manufacturers.indexOf(selectedManu)
        // 	: 0;
        let manufacturerRadios = [];
        for (let i = 0; i < manufacturers.length; i++) {
          manufacturerRadios.push(/*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
            id: "rmo-radio-" + i,
            key: "rmo-radio-" + i,
            value: manufacturers[i],
            variant: "outline-primary",
            style: buttonStyleWide
          }, manufacturers[i]));
        }
        let manufacturerRadio = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
          id: "radio-manufactorer-options",
          key: "radio-manufactorer-options",
          type: "radio",
          name: "radio-manufactorer-options",
          value: selectedManu,
          onChange: e => {
            this.onClickManufacturerSelection(e);
          },
          vertical: true
        }, manufacturerRadios);
        list.push(/*#__PURE__*/_react.default.createElement("div", {
          key: "radio-manufactorer-container",
          id: "radio-manufactorer-container",
          style: radioButtonsContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          key: "select-manufacturer"
        }, "Select Manufacturer"), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          id: "popover-radio-manufactorer-options",
          key: "popover-radio-manufactorer-options",
          position: _constants.create_from_repo_manufacturer_tooltip.position,
          title: _constants.create_from_repo_manufacturer_tooltip.title,
          content: _constants.create_from_repo_manufacturer_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement("div", {
            style: toggleStyle
          }, manufacturerRadio)
        })));
        if ((0, _genericUtilities.isDefined)(selectedManu)) {
          let microscopesManu = microscopeNames[selectedManu];
          let microscopeRadios = [];
          for (let i = 0; i < microscopesManu.length; i++) {
            let fullMicName = microscopesManu[i];
            let lastIndexBeforeID = fullMicName.lastIndexOf("_") + 1;
            let micName = fullMicName.substring(0, lastIndexBeforeID);
            let micID = fullMicName.substring(lastIndexBeforeID);
            let micLabel = micName + "\n" + micID;
            microscopeRadios.push(/*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              id: "rmico-radio-" + i,
              key: "rmico-radio-" + i,
              value: fullMicName,
              variant: "outline-primary",
              style: buttonStyleWide
            }, /*#__PURE__*/_react.default.createElement("div", {
              style: {
                fontSize: "0.8em",
                wordBreak: "break-word",
                whiteSpace: "break-spaces"
              }
            }, micLabel)));
          }
          let microscopeRadio = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
            id: "radio-microscope-options",
            key: "radio-microscope-options",
            type: "radio",
            name: "radio-microscope-options",
            value: micFilename,
            onChange: e => {
              this.onClickMicroscopeSelection(e);
            },
            vertical: true
          }, microscopeRadios);
          list.push(/*#__PURE__*/_react.default.createElement("div", {
            key: "radio-microscope-options",
            id: "radio-microscope-options",
            style: radioButtonsContainer
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "select-microscope"
          }, "Select Microscope file"), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            id: "popover-radio-microscope-options",
            key: "popover-radio-microscope-options",
            position: _constants.create_from_repo_names_tooltip.position,
            title: _constants.create_from_repo_names_tooltip.title,
            content: _constants.create_from_repo_names_tooltip.content,
            element: /*#__PURE__*/_react.default.createElement("div", {
              style: toggleStyle
            }, microscopeRadio)
          })));
        }
      }
    } else if (step === 2) {
      let buttonDisabled = false;
      if (imgSelectionDisabled) buttonDisabled = true;
      let loadRadios = [];
      for (let i = 0; i < imgLoadingOptions.length; i++) {
        let loadingOption = imgLoadingOptions[i];
        let tooltip = _constants.loadImage_load_tooltip;
        if (loadingOption === _constants.string_noImageLoad) {
          tooltip = _constants.loadImage_skip_tooltip;
        } else if (loadingOption === _constants.string_loadFromRepository) {
          tooltip = _constants.loadImage_loadFromRepo_tooltip;
        }
        loadRadios.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover" + loadingOption,
          position: tooltip.position,
          title: tooltip.title,
          content: tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
            type: "radio",
            key: loadingOption,
            id: loadingOption,
            value: loadingOption,
            onChange: !buttonDisabled ? () => this.handleCreateOrLoadRadioChange(loadingOption) : null,
            checked: loadingOption === imgModeSelection,
            style: buttonStyleWide,
            size: "lg",
            variant: "outline-primary",
            disabled: buttonDisabled
          }, loadingOption)
        }));
      }
      let toggles = [];
      toggles.push(/*#__PURE__*/_react.default.createElement("h4", {
        key: "load-options"
      }, "Load options"));
      toggles.push(loadRadios);
      list.push(/*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
        id: "radio-createLoad-options",
        key: "radio-createLoad-options",
        type: "radio",
        name: "radio-createLoad-options"
        //value={modeSelection}
        //onChange={this.handleCreateOrLoadRadioChange}
        ,
        vertical: true
      }, toggles));
      if (imgModeSelection === _constants.string_createFromFile) {
        let text = /*#__PURE__*/_react.default.createElement("p", {
          style: styleCenterText
        }, _constants.string_dropbox_image_new);
        if (imgFileLoaded) {
          styleDropzone.borderColor = "green";
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, imgFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_image_replace));
        } else if (errorMsg !== null) {
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, imgFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_image_replace));
        }
        let imageRadio = null;
        let radioButtonsContainer = null;
        let toggleStyle = null;
        if (imageMap !== null) {
          //windowButtonsContainer.flexFlow = "row";
          radioButtonsContainer = {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "430px",
            height: "550px",
            alignItems: "center",
            maxHeight: "550px"
            //overflow: "auto",
          };
          toggleStyle = {
            maxHeight: "500px",
            overflow: "auto"
          };
          dropzoneContainer.width = "25%";
          let imageKeys = Object.keys(imageMap);
          // let defaultManu = isDefined(selectedManu)
          // 	? manufacturers.indexOf(selectedManu)
          // 	: 0;
          let imageRadios = [];
          for (let i = 0; i < imageKeys.length; i++) {
            imageRadios.push(/*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              id: "rio-radio-" + i,
              key: "rio-radio-" + i,
              value: imageKeys[i],
              variant: "outline-primary",
              style: buttonStyleWide
            }, imageKeys[i]));
          }
          imageRadio = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
            id: "radio-image-options",
            key: "radio-image-options",
            type: "radio",
            name: "radio-image-options",
            value: selectedImg,
            onChange: e => {
              this.onClickImageSelection(0, e);
            },
            vertical: true
          }, imageRadios);
        }
        let dropbox = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover-dropzone",
          id: "popover-dropzone",
          position: _constants.loadImage_from_file_tooltip.position,
          title: _constants.loadImage_from_file_tooltip.title,
          content: _constants.loadImage_from_file_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
            key: "dropzone",
            id: "dropzone",
            onFileDialogCancel: this.dropzoneDialogCancel,
            onDrop: this.dropzoneDrop,
            onDropAccepted: this.dropzoneDropAccepted,
            onDropRejected: this.dropzoneDropRejected
            //accept={string_json_ext}
            ,
            multiple: false,
            style: dropzoneContainer
          }, _ref2 => {
            let {
              getRootProps,
              getInputProps
            } = _ref2;
            return /*#__PURE__*/_react.default.createElement("div", _extends({
              style: styleDropzone
            }, getRootProps({
              onClick: this.dropzoneDialogOpen
            })), /*#__PURE__*/_react.default.createElement("input", _extends({
              style: styleDropzoneInput
            }, getInputProps({}))), text);
          })
        });
        list.push(/*#__PURE__*/_react.default.createElement("div", {
          key: "container-dropzone",
          id: "container-dropzone",
          style: dropzoneContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          key: "dropzone"
        }, "Load Image file"), dropbox));
        if (imageRadio !== null) {
          list.push(/*#__PURE__*/_react.default.createElement("div", {
            key: "radio-image-container",
            id: "radio-image-container",
            style: radioButtonsContainer
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "select-manufacturer"
          }, "Select Image file"), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            id: "popover-radio-images-options",
            key: "popover-radio-images-options",
            position: _constants.loadImage_from_names_tooltip.position,
            title: _constants.loadImage_from_names_tooltip.title,
            content: _constants.loadImage_from_names_tooltip.content,
            element: /*#__PURE__*/_react.default.createElement("div", {
              style: toggleStyle
            }, imageRadio)
          })));
        }
      } else if (imgModeSelection === _constants.string_loadFromRepository) {
        const radioButtonsContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "430px",
          height: "550px",
          alignItems: "flex-start",
          maxHeight: "550px"
          //overflow: "auto",
        };
        const toggleStyle = {
          maxHeight: "500px",
          overflow: "auto"
        };
        let imageName = this.props.imageName;
        let imageRadios = [];
        imageRadios.push(/*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
          id: "image-radio-" + 0,
          key: "image-radio-" + 0,
          value: imageName,
          variant: "outline-primary",
          style: buttonStyleWide,
          disabled: imgSelectionDisabled
        }, imageName));
        let imageRadio = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
          id: "radio-image-options",
          key: "radio-image-options",
          type: "radio",
          name: "radio-image-options",
          value: selectedImg,
          onChange: imgSelectionDisabled ? null : e => {
            this.onClickImageSelection(1, e);
          },
          vertical: true
        }, imageRadios);
        list.push(/*#__PURE__*/_react.default.createElement("div", {
          key: "radio-image-container",
          id: "radio-image-container",
          style: radioButtonsContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          key: "select-image"
        }, "Select Image"), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          id: "popover-radio-image-options",
          key: "popover-radio-image-options",
          position: _constants.loadImage_from_repo_image_tooltip.position,
          title: _constants.loadImage_from_repo_image_tooltip.title,
          content: _constants.loadImage_from_repo_image_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement("div", {
            style: toggleStyle
          }, imageRadio)
        })));
        if (errorMsg !== null) {
          //<p style={styleCenterText}>{string_dropbox_image_replace}</p>
          list.push(/*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, imgFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Select a different image or skip.")));
        }
      }
    } else if (step === 3) {
      let createRadios = [];
      for (let i = 0; i < settCreatingOptions.length; i++) {
        let creatingOption = settCreatingOptions[i];
        let tooltip = _constants.setting_loader_scratch;
        createRadios.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover" + creatingOption,
          position: tooltip.position,
          title: tooltip.title,
          content: tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
            type: "radio",
            key: creatingOption,
            id: creatingOption,
            value: creatingOption,
            onChange: () => this.handleCreateOrLoadRadioChange(creatingOption),
            checked: creatingOption === settModeSelection,
            style: buttonStyleWide,
            size: "lg",
            variant: "outline-primary"
          }, creatingOption)
        }));
      }
      let loadRadios = [];
      for (let i = 0; i < settLoadingOptions.length; i++) {
        let loadingOption = settLoadingOptions[i];
        let tooltip = _constants.setting_loader_load_from_file;
        if (loadingOption === _constants.string_loadFromHomeFolder) {
          tooltip = _constants.setting_loader_load_from_homeFolder;
        } else if (loadingOption === _constants.string_loadFromRepository) {
          tooltip = _constants.setting_loader_load_from_repo;
        }
        loadRadios.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover" + loadingOption,
          position: tooltip.position,
          title: tooltip.title,
          content: tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
            type: "radio",
            key: loadingOption,
            id: loadingOption,
            value: loadingOption,
            onChange: () => this.handleCreateOrLoadRadioChange(loadingOption),
            checked: loadingOption === settModeSelection,
            style: buttonStyleWide,
            size: "lg",
            variant: "outline-primary"
          }, loadingOption)
        }));
      }
      let toggles = [];
      toggles.push(/*#__PURE__*/_react.default.createElement("h4", {
        key: "create-options"
      }, "Create options"));
      toggles.push(createRadios);
      toggles.push(/*#__PURE__*/_react.default.createElement("h4", {
        key: "load-options"
      }, "Load options"));
      toggles.push(loadRadios);
      list.push(/*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
        id: "radio-createLoad-options",
        key: "radio-createLoad-options",
        type: "radio",
        name: "radio-createLoad-options"
        //value={modeSelection}
        //onChange={this.handleCreateOrLoadRadioChange}
        ,
        vertical: true
      }, toggles));
      if (settModeSelection === _constants.string_createFromFile) {
        let text = /*#__PURE__*/_react.default.createElement("p", {
          style: styleCenterText
        }, _constants.string_dropbox_settings_new);
        if (settFileLoaded) {
          styleDropzone.borderColor = "green";
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, settFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_settings_replace));
        } else if (errorMsg !== null) {
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, settFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_settings_replace));
        }
        let dropbox = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover-dropzone",
          id: "popover-dropzone",
          position: _constants.createSettings_from_file_tooltip.position,
          title: _constants.createSettings_from_file_tooltip.title,
          content: _constants.createSettings_from_file_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
            key: "dropzone",
            id: "dropzone",
            onFileDialogCancel: this.dropzoneDialogCancel,
            onDrop: this.dropzoneDrop,
            onDropAccepted: this.dropzoneDropAccepted,
            onDropRejected: this.dropzoneDropRejected,
            accept: _constants.string_json_ext,
            multiple: false,
            style: dropzoneContainer
          }, _ref3 => {
            let {
              getRootProps,
              getInputProps
            } = _ref3;
            return /*#__PURE__*/_react.default.createElement("div", _extends({
              style: styleDropzone
            }, getRootProps({
              onClick: this.dropzoneDialogOpen
            })), /*#__PURE__*/_react.default.createElement("input", _extends({
              style: styleDropzoneInput
            }, getInputProps({}))), text);
          })
        });
        list.push(/*#__PURE__*/_react.default.createElement("div", {
          key: "container-dropzone",
          id: "container-dropzone",
          style: dropzoneContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          key: "dropzone"
        }, "Load Setting file"), dropbox));
      } else if (settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) {
        const radioButtonsContainer = {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "430px",
          height: "550px",
          alignItems: "center",
          maxHeight: "550px"
          //overflow: "auto",
        };
        const toggleStyle = {
          maxHeight: "500px",
          overflow: "auto"
        };
        let settingsNames = [];
        let mic_ID = loadedMicroscope.ID;
        Object.keys(settings).forEach(key => {
          let sett = settings[key].setting;
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
          settingRadios.push(/*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
            id: "rmo-radio-" + i,
            key: "rmo-radio-" + i,
            value: fullSettName,
            variant: "outline-primary",
            style: buttonStyleWide
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              fontSize: "0.8em",
              wordBreak: "break-word",
              whiteSpace: "break-spaces"
            }
          }, fullSettName)));
        }
        if (settingRadios.length === 0) {
          settingRadios.push(/*#__PURE__*/_react.default.createElement("p", {
            style: {
              wordBreak: "break-word",
              whiteSpace: "break-spaces"
            },
            key: "no-setting"
          }, "No Setting matching selected\\nMicroscope ID have been found"));
        }
        let settingRadio = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
          id: "radio-setting-options",
          key: "radio-setting-options",
          type: "radio",
          name: "radio-setting-options",
          value: settFilename,
          onChange: e => {
            this.onClickSettingSelection(e);
          },
          vertical: true
        }, settingRadios);
        list.push(/*#__PURE__*/_react.default.createElement("div", {
          key: "radio-setting-container",
          id: "radio-setting-container",
          style: radioButtonsContainer
        }, /*#__PURE__*/_react.default.createElement("h4", {
          key: "select-setting"
        }, "Select Settings file"), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          id: "popover-radio-setting-options",
          key: "popover-radio-setting-options",
          position: _constants.createSettings_from_repo_names_tooltip.position,
          title: _constants.createSettings_from_repo_names_tooltip.title,
          content: _constants.createSettings_from_repo_names_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement("div", {
            style: toggleStyle
          }, settingRadio)
        })));
      }
    }
    let buttons = [];
    let backDisabled = false;
    if (step === 1 || imgSelectionDisabled) {
      backDisabled = true;
    }
    let backImg = url.resolve(this.props.imagesPathSVG, _constants.string_back_img);
    let backImgPath = backImg + (backImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    buttons.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "button-back",
      position: _constants.back_tooltip.position,
      title: _constants.back_tooltip.title,
      content: _constants.back_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: !backDisabled ? this.onClickBack : null,
        style: buttonStyle,
        size: "lg",
        disabled: backDisabled
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          //gap: "10px",
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: backImgPath,
        alt: backImg,
        style: styleImageIcon
      }), "Back"))
    }));
    if (imgSelectionDisabled) {
      continueDisabled = true;
    }
    let forwardImg = url.resolve(this.props.imagesPathSVG, _constants.string_next_img);
    let forwardImgPath = forwardImg + (forwardImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    buttons.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "button-continue",
      position: continueNextTooltip.position,
      title: continueNextTooltip.title,
      content: continueNextTooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: !continueDisabled ? this.onClickConfirm : null,
        style: buttonStyle,
        size: "lg",
        disabled: continueDisabled
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          //gap: "10px",
        }
      }, continueLabel, /*#__PURE__*/_react.default.createElement("img", {
        src: forwardImgPath,
        alt: forwardImg,
        style: styleImageIcon
      })))
    }));
    let logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
    let logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let homeImg = url.resolve(this.props.imagesPathSVG, _constants.string_home_img);
    let homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let buttText = "Home";
    let funcSelImg = url.resolve(this.props.imagesPathSVG, _constants.string_func_selector_img);
    let funcSelPath = funcSelImg + (funcSelImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let homeDisabled = false;
    if (imgSelectionDisabled) {
      homeDisabled = true;
    }
    let homeButtons = [];
    let index = 0;
    homeButtons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButtonLeft-0",
      position: "top",
      title: _constants.home_tooltip.title,
      content: _constants.home_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "ButtonLeft-0",
        onClick: !homeDisabled ? () => this.props.onClickHome(buttText) : null,
        style: styleButton,
        size: "lg",
        variant: "outline-dark",
        disabled: homeDisabled
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          //gap: "10px",
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: homeImgPath,
        alt: homeImg,
        style: styleImageIconHome
      }), buttText))
    });
    index++;
    if ((0, _genericUtilities.isDefined)(this.props.onClickParentHome)) {
      homeButtons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-" + index,
        position: _constants.func_selector_tooltip.position,
        title: _constants.func_selector_tooltip.title,
        content: _constants.func_selector_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-" + index,
          onClick: () => this.props.onClickParentHome(),
          style: styleButton,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            //gap: "10px",
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: funcSelPath,
          alt: funcSelImg,
          style: styleImageIconHome
        }), _constants.func_selector_tooltip.title))
      });
      index++;
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      style: wrapperContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: mainContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: workingContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: titleContainer
    }, /*#__PURE__*/_react.default.createElement("h1", null, this.props.title)), /*#__PURE__*/_react.default.createElement("div", {
      style: stepContainer
    }, stepRadios), /*#__PURE__*/_react.default.createElement("div", {
      style: buttonsContainer
    }, list), /*#__PURE__*/_react.default.createElement("div", {
      style: bottomButtonsContainer
    }, buttons)), /*#__PURE__*/_react.default.createElement("div", {
      style: logoContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleButtonContainer
    }, homeButtons), /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: logoPath,
      alt: this.props.logoImg,
      style: styleImage
    }))), /*#__PURE__*/_react.default.createElement("p", null, "(c) Copyright 2018-2023 University of Massachusetts Chan Medical School. All Rights Reserved.", /*#__PURE__*/_react.default.createElement("br", null), "The software is distributed under the terms of the", " ", /*#__PURE__*/_react.default.createElement("a", {
      href: "https://www.gnu.org/licenses/gpl-3.0.html"
    }, "GNU General Public License v3.0."))));
  }
}
exports.default = MicroscopeLoader;