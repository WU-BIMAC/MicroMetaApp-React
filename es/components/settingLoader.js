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
class SettingLoader extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileLoaded: false,
      fileLoading: false,
      //selectedManu: null,
      selectedSettings: null
      //settingsNames: null,
    };
    this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
    this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
    this.dropzoneDrop = this.dropzoneDrop.bind(this);
    this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
    this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);
    this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
    this.onFileReaderError = this.onFileReaderError.bind(this);
    this.onFileReaderLoad = this.onFileReaderLoad.bind(this);
    this.onClickSettingsSelection = this.onClickSettingsSelection.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.loadingMode === 2) {
      if (props.settings !== null && props.settings !== undefined) {
        if (state.selectedSettings === null || state.selectedSettings === undefined) {
          let selectedSettings = props.settings[0];
          props.onClickSettingsSelection(selectedSettings);
        }
        return null;
      }
    }
    return null;
  }
  onClickSettingsSelection(item) {
    if (item !== null && item !== undefined) {
      this.setState({
        selectedSettings: item
      });
      this.props.onClickSettingsSelection(item);
    }
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
    let errorMsg = null;
    try {
      let settings = JSON.parse(binaryStr);
      if ((0, _genericUtilities.validateAcquisitionSettingsFile)(settings, this.props.schema)) {
        this.props.onFileDrop(settings);
        this.setState({
          fileLoaded: true
        });
      } else {
        errorMsg = "The file you are trying to load does not contain a proper MicroMetaApp ImageAcquisitionSettings";
      }
    } catch (exception) {
      if (this.props.isDebug) console.log(exception);
      errorMsg = "The file you are trying to load is not a proper json file";
    }
    if (errorMsg !== null) {
      window.alert(errorMsg);
      this.setState({
        fileLoaded: false
      });
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
    let inputData = this.props.settings;
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
    let isDropzoneActive = false;
    if (loadingMode === 1) isDropzoneActive = true;
    let list = [];
    list.push(/*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      key: "dropdown-loadingOption",
      title: "",
      handleMenuItemClick: this.props.onClickLoadingOptionSelection,
      defaultValue: this.props.loadingOptions.indexOf(this.props.loadingOption),
      inputData: this.props.loadingOptions,
      width: width,
      margin: margin,
      tooltip: _constants.createSettings_mode_selector_tooltip
    }));
    if (loadingMode === 1) {
      list.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "dropzone-tooltip",
        position: _constants.createSettings_from_file_tooltip.position,
        title: _constants.createSettings_from_file_tooltip.title,
        content: _constants.createSettings_from_file_tooltip.content,
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
          })), /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Settings file you want to work on.")));
        })
      }));
    }
    if (loadingMode === 2) {
      let selectedSettings = this.state.selectedSettings;
      let defaultMic = selectedSettings !== null && selectedSettings !== undefined ? inputData.indexOf(selectedSettings) : 0;
      //console.log(inputData);
      list.push(/*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
        key: "dropdown-names",
        title: "",
        handleMenuItemClick: this.onClickSettingsSelection,
        inputData: inputData,
        defaultValue: defaultMic,
        width: width,
        margin: margin,
        tooltip: _constants.createSettings_from_repo_names_tooltip,
        isCentered: false
      }));
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
      position: _constants.createSettings_mode_continue_tooltip.position,
      title: _constants.createSettings_mode_continue_tooltip.title,
      content: _constants.createSettings_mode_continue_tooltip.content,
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
    }, "Manage Settings Step 3/3: Open Settings file"), list));
  }
}
exports.default = SettingLoader;