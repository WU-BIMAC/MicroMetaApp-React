"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  onFileReaderLoad(e) {
    let binaryStr = e.target.result;
    let microscope = JSON.parse(binaryStr);
    this.props.onFileDrop(microscope);
    this.setState({
      fileLoaded: true
    });
  }

  dropzoneDrop() {
    this.setState({
      fileLoading: true,
      fileLoaded: false
    });
  }

  dropzoneDropRejected() {
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
    let loadingMode = this.props.loadingMode;
    let fileLoading = this.state.fileLoading;
    let fileLoaded = this.state.fileLoaded;
    let selectedManu = this.state.selectedManu;
    let isDropzoneActive = false;
    if (loadingMode === 1) isDropzoneActive = true;
    let list = [];
    list.push( /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
      key: "dropdown-loadingOption",
      title: "",
      handleMenuItemClick: this.props.onClickLoadingOptionSelection,
      defaultValue: this.props.loadingOptions.indexOf(this.props.loadingOption),
      inputData: this.props.loadingOptions,
      width: width,
      margin: margin,
      tooltip: _constants.create_mode_selector_tooltip
    }));

    if (loadingMode === 1) {
      list.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
        }, ({
          getRootProps,
          getInputProps
        }) => /*#__PURE__*/_react.default.createElement("section", {
          style: dropzoneStyle
        }, /*#__PURE__*/_react.default.createElement("div", getRootProps(), /*#__PURE__*/_react.default.createElement("input", getInputProps({
          onClick: this.dropzoneDialogOpen
        })), /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Microscope file you want to work on."))))
      }));
    }

    if (loadingMode === 2) {
      let manufacturers = Object.keys(inputData);
      let defaultManu = selectedManu !== null && selectedManu !== undefined ? manufacturers.indexOf(selectedManu) : 0;
      list.push( /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
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
        console.log(this.state.micNames);
        list.push( /*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
          key: "dropdown-names",
          title: "",
          handleMenuItemClick: this.props.onClickMicroscopeSelection,
          inputData: this.state.micNames,
          defaultValue: defaultMic,
          width: width,
          margin: margin,
          tooltip: _constants.create_from_repo_names_tooltip
        }));
      }
    }

    list.push( /*#__PURE__*/_react.default.createElement("div", {
      key: "buttons"
    }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: _constants.create_mode_continue_tooltip.position,
      title: _constants.create_mode_continue_tooltip.title,
      content: _constants.create_mode_continue_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
        style: buttonStyle,
        size: "lg",
        disabled: isDropzoneActive && (!fileLoaded || fileLoading)
      }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Continue")
    }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      position: _constants.back_tooltip.position,
      title: _constants.back_tooltip.title,
      content: _constants.back_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: this.props.onClickBack,
        style: buttonStyle,
        size: "lg"
      }, "Back")
    })));
    return /*#__PURE__*/_react.default.createElement("div", {
      style: windowExternalContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: windowInternalContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: styleImageContainer
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: this.props.logoImg,
      alt: this.props.logoImg,
      style: styleImage,
      onLoad: this.onImgLoad
    })), list));
  }

}

exports["default"] = MicroscopeLoader;