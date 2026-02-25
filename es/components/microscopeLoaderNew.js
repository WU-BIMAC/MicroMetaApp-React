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
      loadOrCreateOption: null,
      fileLoaded: false,
      fileLoading: false,
      selectedManu: null,
      selectedMic: null,
      micNames: null,
      modeSelection: props.modeSelection || null,
      filename: null,
      loadedMicroscope: null,
      step: 1,
      errorMsg: null
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
    this.handleCreateOrLoadRadioChange = this.handleCreateOrLoadRadioChange.bind(this);
    this.handleStepRadioChange = this.handleStepRadioChange.bind(this);
    this.onClickConfirm = this.onClickConfirm.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return null;
  }
  onFileReaderAbort(e) {
    this.setState({
      fileLoaded: false
    });
  }
  onFileReaderError(e) {
    this.setState({
      fileLoaded: false
    });
  }
  onFileReaderLoad(e) {
    let binaryStr = e.target.result;
    let microscope = null;
    let errorMsg = null;
    try {
      microscope = JSON.parse(binaryStr);
      let isMicroscopeValid = (0, _genericUtilities.validateMicroscope)(microscope, this.props.schema, true, true, true);
      //console.log(isMicroscopeValid);
      if (isMicroscopeValid.isValid) {
        this.setState({
          fileLoaded: true,
          loadedMicroscope: microscope
        });
      } else {
        errorMsg = isMicroscopeValid.errorMsg;
      }
      // if (validateMicroscopeFile(microscope, this.props.schema, true)) {
      // 	this.setState({ fileLoaded: true, loadedMicroscope: microscope });
      // } else {
      // 	errorMsg =
      // 		"The file you are trying to load does not contain a proper MicroMetaApp Microscope";
      // }
    } catch (exception) {
      if (this.props.isDebug) console.log(exception);
      errorMsg = "The file you are trying to load is not a proper json file";
    }
    if (errorMsg !== null) {
      this.setState({
        fileLoaded: false,
        errorMsg: errorMsg
      });
    }
  }

  // onFileReaderLoad(e) {
  // 	let binaryStr = e.target.result;
  // 	let microscope = null;
  // 	let errorMsg = null;
  // 	try {
  // 		microscope = JSON.parse(binaryStr);

  // 		if (
  // 			microscope.ModelVersion &&
  // 			parseInt(microscope.ModelVersion.split(".")[0], 10) < 2
  // 		) {
  // 			errorMsg =
  // 				"This microscope file is incompatible. Only files with ModelVersion 2.00 or higher can be loaded.";
  // 		}

  // 		else if (validateMicroscopeFile(microscope, this.props.schema, true)) {
  // 			this.setState({ fileLoaded: true, loadedMicroscope: microscope });
  // 		} else {
  // 			errorMsg =
  // 				"The file you are trying to load does not contain a proper MicroMetaApp Microscope";
  // 		}
  // 	} catch (exception) {
  // 		if (this.props.isDebug) console.log(exception);
  // 		errorMsg = "The file you are trying to load is not a proper json file";
  // 	}

  // 	if (errorMsg !== null) {
  // 		this.setState({ fileLoaded: false, errorMsg: errorMsg });
  // 		window.alert(errorMsg);
  // 	}
  // }

  dropzoneDrop() {
    this.setState({
      fileLoading: true,
      fileLoaded: false
    });
  }
  dropzoneDropRejected(rejectedFiles) {
    // let fileRejectedNames = "";
    rejectedFiles.forEach(rejected => {
      this.setState({
        filename: rejected.file.name
      });
    });
    let errorMsg = "The file you tried to load is not a json file";
    this.setState({
      fileLoading: false,
      fileLoaded: false,
      errorMsg: errorMsg
    });
  }
  dropzoneDropAccepted(acceptedFiles) {
    const reader = new FileReader();
    reader.onabort = this.onFileReaderAbort;
    reader.onerror = this.onFileReaderError;
    reader.onload = this.onFileReaderLoad;
    acceptedFiles.forEach(file => {
      this.setState({
        filename: file.name
      });
      reader.readAsText(file);
    });
    this.setState({
      fileLoading: false
    });
  }
  dropzoneDialogOpen() {
    this.setState({
      fileLoading: true,
      fileLoaded: false,
      errorMsg: null,
      filename: null,
      loadedMicroscope: null
    });
  }
  dropzoneDialogCancel() {
    this.setState({
      fileLoading: false,
      fileLoaded: false
    });
  }
  onClickManufacturerSelection(item) {
    // console.log("onClickManufacturerSelection - " + item);
    // console.log("onClickManufacturerSelection - " + this.props.microscopes);
    let micNames = this.props.microscopes[item];
    this.setState({
      selectedManu: item,
      micNames: micNames
    });
    //this.props.onClickMicroscopeSelection(this.props.microscopes[item][0]);
  }
  onClickMicroscopeSelection(item) {
    //console.log("onClickMicroscopeSelection - " + item);
    this.setState({
      filename: item
    });
  }
  handleCreateOrLoadRadioChange(item) {
    //console.log("handleCreateOrLoadRadioChange - " + item);

    if (this.state.modeSelection === _constants.string_createFromFile && item !== this.state.modeSelection || (this.state.modeSelection === _constants.string_loadFromRepository || this.state.modeSelection === _constants.string_loadFromHomeFolder) && item !== this.state.modeSelection) {
      this.setState({
        fileLoading: false,
        fileLoaded: false,
        filename: null,
        loadedMicroscope: null
      });
    }
    this.setState({
      modeSelection: item
    });
  }
  handleStepRadioChange(item) {
    //console.log("handleStepRadioChange " + item);
    this.setState({
      step: item
    });
  }
  onClickConfirm() {
    let modeSelection = this.state.modeSelection;
    let filename = null;
    let microscope = null;
    if (modeSelection === _constants.string_loadFromRepository || modeSelection === _constants.string_loadFromHomeFolder) {
      filename = this.state.filename;
    } else if (modeSelection === _constants.string_createFromFile) {
      microscope = this.state.loadedMicroscope;
    }
    this.props.onClickConfirm(modeSelection, filename, microscope);
  }
  render() {
    let buttonContainerHeight = "550px";
    let dropzoneContainerSize = "420px";
    if (this.props.isImporter) {
      buttonContainerHeight = "300px";
      dropzoneContainerSize = "220px";
    }
    const buttonStyleWideNoMarginSelected = {
      width: "600px",
      height: "125px",
      borderRadius: "50px",
      paddingLeft: "50px",
      paddingRight: "50px"
    };
    const buttonStyleWideNoMargin = {
      width: "350px",
      height: "125px",
      borderRadius: "50px",
      paddingLeft: "50px",
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
      minHeight: "100%"
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
      width: "100%",
      height: "100px",
      alignItems: "center",
      alignContent: "stretch",
      margin: "10px"
    };
    const buttonsContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "row",
      width: "100%",
      height: buttonContainerHeight,
      alignItems: "center",
      margin: "10px",
      overflow: "auto"
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
      alignItems: "flex-start",
      width: "420px",
      height: dropzoneContainerSize,
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
      if (modeSelection === _constants.string_loadFromRepository || modeSelection === _constants.string_loadFromHomeFolder) {
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
    // else {
    // 	step2Text = (
    // 		<div style={buttonsInnerTextContainer}>
    // 			<h4 style={styleText_1}>2 - Select Microscope</h4>
    // 			<p style={styleText_2}>{filename !== null ? filename : ""}</p>
    // 		</div>
    // 	);
    // }

    let stepRadios = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
      id: "radio-step-options",
      key: "radio-step-options",
      type: "radio",
      name: "radio-step-options"
      //value={this.state.step}
      //onChange={this.handleStepRadioChange}
    }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "popover-step-1",
      position: _constants.hardware_hardware_step_tooltip.position,
      title: _constants.hardware_hardware_step_tooltip.title,
      content: _constants.hardware_hardware_step_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-1",
        key: "rso-radio-1",
        type: "radio",
        value: 1,
        disabled: step1Disabled,
        variant: variant_1,
        checked: this.state.step === 1,
        style: step === 1 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step1Text)
    }));
    let list = [];
    let createRadios = [];
    for (let i = 0; i < creatingOptions.length; i++) {
      let creatingOption = creatingOptions[i];
      let tooltip = _constants.microscope_loader_scratch_inverted;
      if (creatingOption.includes("Upright")) {
        tooltip = _constants.microscope_loader_scratch_upright;
      }
      createRadios.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "popover-" + creatingOption,
        position: tooltip.position,
        title: tooltip.title,
        content: tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
          type: "radio",
          key: creatingOption,
          id: creatingOption,
          value: creatingOption,
          onChange: () => this.handleCreateOrLoadRadioChange(creatingOption),
          checked: creatingOption === modeSelection,
          style: buttonStyleWide,
          size: "lg",
          variant: "outline-primary"
        }, creatingOption)
      }));
    }
    if (step === 1) {
      let loadRadios = [];
      for (let i = 0; i < loadingOptions.length; i++) {
        let loadingOption = loadingOptions[i];
        let tooltip = _constants.microscope_loader_load_from_file;
        if (loadingOption === _constants.string_loadFromHomeFolder) {
          tooltip = _constants.microscope_loader_load_from_homeFolder;
        } else if (loadingOption === _constants.string_loadFromRepository) {
          tooltip = _constants.microscope_loader_load_from_repo;
        }
        loadRadios.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "popover-" + loadingOption,
          position: tooltip.position,
          title: tooltip.title,
          content: tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
            type: "radio",
            key: loadingOption,
            id: loadingOption,
            value: loadingOption,
            onChange: () => this.handleCreateOrLoadRadioChange(loadingOption),
            checked: loadingOption === modeSelection,
            style: buttonStyleWide,
            size: "lg",
            variant: "outline-primary"
          }, loadingOption)
        }));
      }
      let toggles = [];
      if (createRadios.length > 0) {
        toggles.push(/*#__PURE__*/_react.default.createElement("h4", {
          key: "create-options"
        }, "Create options"));
        toggles.push(createRadios);
      }
      if (loadRadios.length > 0) {
        toggles.push(/*#__PURE__*/_react.default.createElement("h4", {
          key: "load-options"
        }, "Load options"));
        toggles.push(loadRadios);
      }
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

      //TODO upload zone
      if (modeSelection === _constants.string_createFromFile) {
        let text = /*#__PURE__*/_react.default.createElement("p", {
          style: styleCenterText
        }, _constants.string_dropbox_hardware_new);
        if (fileLoaded) {
          styleDropzone.borderColor = "green";
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, filename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_hardware_replace));
        } else if (errorMsg !== null) {
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, filename), /*#__PURE__*/_react.default.createElement("p", {
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
      } else if (modeSelection === _constants.string_loadFromRepository || modeSelection === _constants.string_loadFromHomeFolder) {
        //windowButtonsContainer.flexFlow = "row";

        // const radioButtonsContainer = {
        // 	display: "flex",
        // 	justifyContent: "center",
        // 	flexFlow: "column",
        // 	width: "430px",
        // 	height: buttonContainerHeight,
        // 	alignItems: "flex-start",
        // 	maxHeight: buttonContainerHeight,
        // 	overflow: "auto",
        // };

        const radioButtonsContainer = {
          display: "flex",
          flexDirection: "column",
          width: "430px",
          maxHeight: "300px",
          // or whatever value you want
          overflowY: "auto",
          alignItems: "flex-start"
        };
        let manufacturers = Object.keys(inputData);
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
        let manufacturerRadio = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          id: "popover-radio-manufactorer-options",
          key: "popover-radio-manufactorer-options",
          position: _constants.create_from_repo_manufacturer_tooltip.position,
          title: _constants.create_from_repo_manufacturer_tooltip.title,
          content: _constants.create_from_repo_manufacturer_tooltip.content,
          element: /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
            id: "radio-manufactorer-options",
            key: "radio-manufactorer-options",
            type: "radio",
            name: "radio-manufactorer-options",
            value: selectedManu,
            onChange: e => {
              this.onClickManufacturerSelection(e);
            },
            vertical: true
          }, manufacturerRadios)
        });
        list.push(
        /*#__PURE__*/
        // <div
        // 	key="radio-manufactorer-container"
        // 	id="radio-manufactorer-container"
        // 	style={radioButtonsContainer}
        // >
        // 	<h4 key={"select-manufacturer"}>Select Manufacturer</h4>
        // 	{manufacturerRadio}
        // </div>
        _react.default.createElement("div", {
          key: "radio-manufactorer-container",
          id: "radio-manufactorer-container",
          style: {
            display: "flex",
            flexDirection: "column",
            width: "430px",
            alignItems: "flex-start"
          }
        }, /*#__PURE__*/_react.default.createElement("h4", {
          key: "select-manufacturer"
        }, "Select Manufacturer"), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            maxHeight: "300px",
            overflowY: "auto",
            width: "100%"
          }
        }, manufacturerRadio)));
        if ((0, _genericUtilities.isDefined)(selectedManu)) {
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
          let microscopeRadio = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            id: "popover-radio-microscope-options",
            key: "popover-radio-microscope-options",
            position: _constants.create_from_repo_names_tooltip.position,
            title: _constants.create_from_repo_names_tooltip.title,
            content: _constants.create_from_repo_names_tooltip.content,
            element: /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
              id: "radio-microscope-options",
              key: "radio-microscope-options",
              type: "radio",
              name: "radio-microscope-options",
              value: filename,
              onChange: e => {
                this.onClickMicroscopeSelection(e);
              },
              vertical: true
            }, microscopeRadios)
          });
          list.push(
          /*#__PURE__*/
          // <div
          // 	key="radio-microscope-options"
          // 	id="radio-microscope-options"
          // 	style={radioButtonsContainer}
          // >
          // 	<h4 key={"select-microscope"}>Select Microscope file</h4>
          // 	{microscopeRadio}
          // </div>
          _react.default.createElement("div", {
            key: "radio-microscope-options",
            id: "radio-microscope-options",
            style: {
              display: "flex",
              flexDirection: "column",
              width: "430px",
              alignItems: "flex-start"
            }
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "select-microscope"
          }, "Select Microscope file"), /*#__PURE__*/_react.default.createElement("div", {
            style: {
              maxHeight: "300px",
              overflowY: "auto",
              width: "100%"
            }
          }, microscopeRadio)));
        }
      }
    }
    let continue_tooltip = _constants.create_mode_continue_tooltip;
    let buttons = [];
    let disabled = false;
    if (!(0, _genericUtilities.isDefined)(modeSelection)) disabled = true;else if (modeSelection === _constants.string_createFromFile && (!fileLoaded || loadedMicroscope === null)) disabled = true;else if ((modeSelection === _constants.string_loadFromRepository || modeSelection === _constants.string_loadFromHomeFolder) && filename === null) disabled = true;
    let forwardImg = url.resolve(this.props.imagesPathSVG, _constants.string_next_img);
    let forwardImgPath = forwardImg + (forwardImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    buttons.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "button-continue",
      position: continue_tooltip.position,
      title: continue_tooltip.title,
      content: continue_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: !disabled ? this.onClickConfirm : null,
        style: buttonStyle,
        size: "lg",
        disabled: disabled
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          //gap: "10px",
        }
      }, "Continue", /*#__PURE__*/_react.default.createElement("img", {
        src: forwardImgPath,
        alt: forwardImg,
        style: styleImageIcon
      })))
    }));
    let logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
    let logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let homeImg = url.resolve(this.props.imagesPathSVG, _constants.string_home_img);
    let homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let funcSelImg = url.resolve(this.props.imagesPathSVG, _constants.string_func_selector_img);
    let funcSelPath = funcSelImg + (funcSelImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    let buttText = "Home";
    let homeButtons = [];
    let index = 0;
    homeButtons[index] = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipButtonLeft-0",
      position: "top",
      title: _constants.home_tooltip.title,
      content: _constants.home_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "ButtonLeft-0",
        onClick: () => this.props.onClickHome(buttText),
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