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
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const url = require("url");
class ImageLoader extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileLoaded: false,
      fileLoading: false,
      //selectedManu: null,
      selectedSettings: null,
      //settingsNames: null,
      imageMap: null
    };
    this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
    this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
    this.dropzoneDrop = this.dropzoneDrop.bind(this);
    this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
    this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);
    this.handleLoadMetadataComplete = this.handleLoadMetadataComplete.bind(this);
    this.handleImageSelection = this.handleImageSelection.bind(this);

    // this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
    // this.onFileReaderError = this.onFileReaderError.bind(this);
    // this.onFileReaderLoad = this.onFileReaderLoad.bind(this);

    //this.onClickSettingsSelection = this.onClickSettingsSelection.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return null;
  }
  handleImageSelection(item) {
    let imageMap = this.state.imageMap;
    let image = imageMap[item];
    this.props.handleLoadMetadataComplete(image);
  }
  handleLoadMetadataComplete(imageMetadata) {
    if (imageMetadata.Error != null && imageMetadata.Error !== undefined) {
      window.alert("Error " + imageMetadata.Error);
    } else if (imageMetadata.Images !== null && imageMetadata.Images !== undefined) {
      let images = imageMetadata.Images;
      let firstImage = null;
      let imageMap = {};
      for (let index in images) {
        let image = images[index];
        if (firstImage === null) firstImage = image;
        let name = image.Name;
        imageMap[name] = image;
      }
      this.props.handleLoadMetadataComplete(firstImage);
      this.setState({
        imageMap: imageMap,
        fileLoaded: true
      });
    } else {
      let image = imageMetadata.Image;
      this.props.handleLoadMetadataComplete(image);
      this.setState({
        fileLoaded: true
      });
    }
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
  processFile() {
    //let binaryStr = e.target.result;
    //let microscope = JSON.parse(binaryStr);
    //
  }
  dropzoneDropAccepted(acceptedFiles) {
    // const reader = new FileReader();
    // reader.onabort = this.onFileReaderAbort;
    // reader.onerror = this.onFileReaderError;
    // reader.onload = this.onFileReaderLoad;

    acceptedFiles.forEach(file => {
      console.log(file);
      this.props.onLoadMetadata(file.path, this.handleLoadMetadataComplete);
    });
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

    //let inputData = this.props.settings;

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
    let imageMap = this.state.imageMap;
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
      tooltip: _constants.loadImage_mode_selector_tooltip
    }));
    if (loadingMode === 1) {
      list.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "dropzone-tooltip",
        position: _constants.loadImage_from_file_tooltip.position,
        title: _constants.loadImage_from_file_tooltip.title,
        content: _constants.loadImage_from_file_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
          key: "dropzone",
          onFileDialogCancel: this.dropzoneDialogCancel,
          onDrop: this.dropzoneDrop,
          onDropAccepted: this.dropzoneDropAccepted,
          onDropRejected: this.dropzoneDropRejected,
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
          })), /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Image file you want to work on.")));
        })
      }));
    }
    if (imageMap !== null) {
      list.push(/*#__PURE__*/_react.default.createElement(_dropdownMenu.default, {
        key: "dropdown-names",
        title: "",
        handleMenuItemClick: this.handleImageSelection,
        inputData: Object.keys(imageMap)
        //defaultValue={defaultMic}
        ,
        width: width,
        margin: margin,
        tooltip: _constants.loadImage_from_names_tooltip
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
      position: _constants.loadImage_mode_continue_tooltip.position,
      title: _constants.loadImage_mode_continue_tooltip.title,
      content: _constants.loadImage_mode_continue_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
        style: buttonStyle,
        size: "lg",
        disabled: isDropzoneActive && (!fileLoaded || fileLoading)
      }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Continue")
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
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        textAlign: "center",
        fontWeight: "bold"
      }
    }, "Manage Settings Step 2/3: Load Image File"), list));
  }
}
exports.default = ImageLoader;