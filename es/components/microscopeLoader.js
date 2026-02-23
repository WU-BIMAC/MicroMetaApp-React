"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));
var _genericUtilities = require("../genericUtilities");
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const url = require("url");
class MicroscopeLoader extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileLoaded: false,
      fileLoading: false,
      selectedManu: null,
      selectedMic: null,
      micNames: null
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
  }
  static getDerivedStateFromProps(props, state) {
    if (props.loadingMode === 2) {
      if (props.microscopes !== null && props.microscopes !== undefined) {
        if (state.selectedManu === null) {
          let selectedManu = Object.keys(props.microscopes)[0];
          let micNames = props.microscopes[selectedManu];
          props.onClickMicroscopeSelection(micNames[0]);
          return {
            selectedManu: selectedManu,
            micNames: micNames
          };
        }
      }
    }
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

  // onFileReaderLoad(e) {
  // 	let binaryStr = e.target.result;
  // 	let microscope = null;
  // 	let errorMsg = null;
  // 	try {
  // 		microscope = JSON.parse(binaryStr);
  // 		if (validateMicroscope(microscope, this.props.schema, true)) {
  // 			this.props.onFileDrop(microscope);
  // 			this.setState({ fileLoaded: true });
  // 		} else {
  // 			errorMsg =
  // 				"The file you are trying to load does not contain a proper MicroMetaApp Microscope";
  // 		}
  // 	} catch (exception) {
  // 		if (this.props.isDebug) console.log(exception);
  // 		errorMsg = "The file you are trying to load is not a proper json file";
  // 	}

  // 	if (errorMsg !== null) {
  // 		window.alert(errorMsg);
  // 		this.setState({ fileLoaded: false });
  // 	}
  // }
  onFileReaderLoad(e) {
    let binaryStr = e.target.result;
    let microscope = null;
    let errorMsg = null;
    try {
      microscope = JSON.parse(binaryStr);
      if (microscope.ModelVersion && parseInt(microscope.ModelVersion.split(".")[0], 10) < 2) {
        errorMsg = "This microscope file is incompatible. Only files with ModelVersion 2.00 or higher can be loaded.";
      } else if (validateMicroscopeFile(microscope, this.props.schema, true)) {
        this.setState({
          fileLoaded: true,
          loadedMicroscope: microscope
        });
      } else {
        errorMsg = "The file you are trying to load does not contain a proper MicroMetaApp Microscope";
      }
    } catch (exception) {
      if (this.props.isDebug) console.log(exception);
      errorMsg = "The file you are trying to load is not a proper json file";
    }
    if (errorMsg !== null) {
      this.setState({
        fileLoaded: false,
        errorMsg: errorMsg
      });
      window.alert(errorMsg);
    }
  }
  dropzoneDrop() {
    this.setState({
      fileLoading: true,
      fileLoaded: false
    });
  }
  dropzoneDropRejected(rejectedFiles) {
    let fileRejectedNames = "";
    rejectedFiles.forEach(rejected => {
      fileRejectedNames += rejected.file.name + "\n";
    });
    window.alert("The following file you tried to load is not a json file:\n" + fileRejectedNames);
    this.setState({
      fileLoading: false,
      fileLoaded: false
    });
  }
  dropzoneDropAccepted(acceptedFiles) {
    const reader = new FileReader();
    reader.onabort = this.onFileReaderAbort;
    reader.onerror = this.onFileReaderError;
    reader.onload = this.onFileReaderLoad;
    acceptedFiles.forEach(file => reader.readAsText(file));
    this.setState({
      fileLoading: false
    });
  }
  dropzoneDialogOpen() {
    this.setState({
      fileLoading: true,
      fileLoaded: false
    });
  }
  dropzoneDialogCancel() {
    this.setState({
      fileLoading: false,
      fileLoaded: false
    });
  }
  onClickManufacturerSelection(item) {
    let micNames = this.props.microscopes[item];
    this.setState({
      selectedManu: item,
      micNames: micNames
    });
    this.props.onClickMicroscopeSelection(this.props.microscopes[item][0]);
  }
  render() {
    const buttonStyle = {
      width: "200px",
      height: "50px",
      padding: "5px",
      margin: "5px"
    };
    const windowExternalContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
    };
    const windowInternalContainer = {
      display: "flex",
      justifyContent: "center",
      flexFlow: "column",
      width: "100%",
      height: "100%",
      alignItems: "center"
    };
    let width = 410;
    let margin = 5;
    let inputData = this.props.microscopes;
    let dropzoneStyle = {
      borderStyle: "dashed",
      borderWidth: "thin",
      width: "".concat(width, "px")
    };
    let styleImageContainer = {
      width: "".concat(_constants.number_logo_width, "px"),
      height: "".concat(_constants.number_logo_height, "px")
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let styleImageBk = {
      width: "20px",
      height: "20px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let loadingMode = this.props.loadingMode;
    let fileLoading = this.state.fileLoading;
    let fileLoaded = this.state.fileLoaded;
    let selectedManu = this.state.selectedManu;
    let isDropzoneActive = false;
    if (loadingMode === 1) isDropzoneActive = true;
    let create_mode_tooltip = null;
    let titleText = null;
    if (this.props.isSettings) {
      create_mode_tooltip = _constants.create_mode_selector_settings_tooltip;
      titleText = "Manage Settings Step 1/3: Open Microscope File";
    } else {
      create_mode_tooltip = _constants.create_mode_selector_tooltip;
      if (this.props.isImporter) {
        titleText = "Microscope Importer Step 1/1: Open Microscope File";
      } else {
        titleText = "Manage Instrument Step 1/1: Open Microscope File";
      }
    }
    let list = [];
    list.push(/*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      key: "dropdown-loadingOption",
      title: "",
      handleMenuItemClick: this.props.onClickLoadingOptionSelection,
      defaultValue: this.props.loadingOptions.indexOf(this.props.loadingOption),
      inputData: this.props.loadingOptions,
      width: width,
      margin: margin,
      tooltip: create_mode_tooltip
    }));
    if (loadingMode === 1) {
      list.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "dropzone-tooltip",
        position: _constants.create_from_file_tooltip.position,
        title: _constants.create_from_file_tooltip.title,
        content: _constants.create_from_file_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
          key: "dropzone",
          onFileDialogCancel: this.dropzoneDialogCancel,
          onDrop: this.dropzoneDrop,
          onDropAccepted: this.dropzoneDropAccepted,
          onDropRejected: this.dropzoneDropRejected,
          accept: _constants.string_json_ext,
          multiple: false
        }, _ref => {
          let {
            getRootProps,
            getInputProps
          } = _ref;
          return /*#__PURE__*/_react.default.createElement("section", {
            style: dropzoneStyle
          }, /*#__PURE__*/_react.default.createElement("div", getRootProps(), /*#__PURE__*/_react.default.createElement("input", getInputProps({
            onClick: this.dropzoneDialogOpen
          })), /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Microscope file you want to work on.")));
        })
      }));
    }
    if (loadingMode === 2) {
      let manufacturers = Object.keys(inputData);
      let defaultManu = selectedManu !== null && selectedManu !== undefined ? manufacturers.indexOf(selectedManu) : 0;
      list.push(/*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
        key: "dropdown-manufacturers",
        title: "",
        handleMenuItemClick: this.onClickManufacturerSelection,
        inputData: manufacturers,
        defaultValue: defaultManu,
        width: width,
        margin: margin,
        tooltip: _constants.create_from_repo_manufacturer_tooltip
      }));
      if (selectedManu !== null && selectedManu !== undefined) {
        let selectedMic = this.state.selectedMic;
        let defaultMic = selectedMic !== null && selectedMic !== undefined ? inputData[selectedManu].indexOf(selectedMic) : 0;
        //console.log(this.state.micNames);
        list.push(/*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
          key: "dropdown-names",
          title: "",
          handleMenuItemClick: this.props.onClickMicroscopeSelection,
          inputData: this.state.micNames,
          defaultValue: defaultMic,
          width: width,
          margin: margin,
          tooltip: _constants.create_from_repo_names_tooltip,
          isCentered: false
        }));
      }
    }
    let continue_tooltip = null;
    if (this.props.isSettings) {
      continue_tooltip = _constants.create_mode_continue_settings_tooltip;
    } else {
      continue_tooltip = _constants.create_mode_continue_tooltip;
    }
    let backImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_back_img);
    let backImgPath = backImgPath_tmp + (backImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    list.push(/*#__PURE__*/_react.default.createElement("div", {
      key: "buttons"
    }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: _constants.back_tooltip.position,
      title: _constants.back_tooltip.title,
      content: _constants.back_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: this.props.onClickBack,
        style: buttonStyle,
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
        src: backImgPath,
        alt: backImgPath_tmp,
        style: styleImageBk,
        onLoad: this.onImgLoad
      }), "Back"))
    }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: continue_tooltip.position,
      title: continue_tooltip.title,
      content: continue_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
        style: buttonStyle,
        size: "lg",
        disabled: isDropzoneActive && (!fileLoaded || fileLoading)
      }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Continue")
    })));
    let logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    return /*#__PURE__*/_react.default.createElement("div", {
      style: windowExternalContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: windowInternalContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: logoPath,
      alt: this.props.logoImg,
      style: styleImage,
      onLoad: this.onImgLoad
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        textAlign: "center",
        fontWeight: "bold"
      }
    }, titleText), list));
  }
}
exports.default = MicroscopeLoader;