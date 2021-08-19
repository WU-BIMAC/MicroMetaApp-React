"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var url = require("url");

var MicroscopeLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroscopeLoader, _React$PureComponent);

  var _super = _createSuper(MicroscopeLoader);

  function MicroscopeLoader(props) {
    var _this;

    _classCallCheck(this, MicroscopeLoader);

    _this = _super.call(this, props);
    _this.state = {
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
      errorMsg: null
    };
    _this.dropzoneDropAccepted = _this.dropzoneDropAccepted.bind(_assertThisInitialized(_this));
    _this.dropzoneDropRejected = _this.dropzoneDropRejected.bind(_assertThisInitialized(_this));
    _this.dropzoneDrop = _this.dropzoneDrop.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogOpen = _this.dropzoneDialogOpen.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogCancel = _this.dropzoneDialogCancel.bind(_assertThisInitialized(_this));
    _this.onFileReaderAbort = _this.onFileReaderAbort.bind(_assertThisInitialized(_this));
    _this.onFileReaderError = _this.onFileReaderError.bind(_assertThisInitialized(_this));
    _this.onFileReaderLoad = _this.onFileReaderLoad.bind(_assertThisInitialized(_this));
    _this.onClickManufacturerSelection = _this.onClickManufacturerSelection.bind(_assertThisInitialized(_this));
    _this.onClickMicroscopeSelection = _this.onClickMicroscopeSelection.bind(_assertThisInitialized(_this));
    _this.onClickImageSelection = _this.onClickImageSelection.bind(_assertThisInitialized(_this));
    _this.onClickSettingSelection = _this.onClickSettingSelection.bind(_assertThisInitialized(_this));
    _this.handleCreateOrLoadRadioChange = _this.handleCreateOrLoadRadioChange.bind(_assertThisInitialized(_this));
    _this.handleStepRadioChange = _this.handleStepRadioChange.bind(_assertThisInitialized(_this));
    _this.handleLoadMetadataComplete = _this.handleLoadMetadataComplete.bind(_assertThisInitialized(_this));
    _this.onClickConfirm = _this.onClickConfirm.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MicroscopeLoader, [{
    key: "onFileReaderAbort",
    value: function onFileReaderAbort(e) {
      var step = this.state.step;
      if (step === 2) this.setState({
        micFileLoaded: false
      });else if (step === 6) this.setState({
        settFileLoaded: false
      });
    }
  }, {
    key: "onFileReaderError",
    value: function onFileReaderError(e) {
      var step = this.state.step;
      if (step === 2) this.setState({
        micFileLoaded: false
      });else if (step === 6) this.setState({
        settFileLoaded: false
      });
    }
  }, {
    key: "onFileReaderLoad",
    value: function onFileReaderLoad(e) {
      var step = this.state.step;
      var binaryStr = e.target.result;
      var microscope = null;
      var errorMsg = null;

      try {
        if (step === 2) {
          microscope = JSON.parse(binaryStr);

          if ((0, _genericUtilities.validateMicroscope)(microscope, this.props.schema, true)) {
            this.setState({
              micFileLoaded: true,
              loadedMicroscope: microscope
            });
          } else {
            errorMsg = "The file you are trying to load does not contain a proper MicroMetaApp Microscope";
          }
        } else if (step === 6) {
          var settings = JSON.parse(binaryStr);

          if ((0, _genericUtilities.validateAcquisitionSettings)(settings, this.props.schema)) {
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
        if (step === 2) this.setState({
          micFileLoaded: false
        });else if (step === 6) this.setState({
          settFileLoaded: false
        });
        this.setState({
          errorMsg: errorMsg
        });
      }
    }
  }, {
    key: "dropzoneDrop",
    value: function dropzoneDrop() {
      var step = this.state.step;
      if (step === 2) this.setState({
        micFileLoading: true,
        micFileLoaded: false
      });else if (step === 4) this.setState({
        imgFileLoading: true,
        imgFileLoaded: false
      });else if (step === 6) this.setState({
        setFileLoading: true,
        settFileLoaded: false
      });
    }
  }, {
    key: "dropzoneDropRejected",
    value: function dropzoneDropRejected(rejectedFiles) {
      var step = this.state.step; // let fileRejectedNames = "";

      var filename = null;
      rejectedFiles.forEach(function (rejected) {
        filename = rejected.file.name;
      });
      var errorMsg = "The file you tried to load is not a json file";
      if (step === 2) this.setState({
        micFileLoading: false,
        micFileLoaded: false,
        micFilename: filename,
        errorMsg: errorMsg
      });else if (step === 4) this.setState({
        imgFileLoading: false,
        imgFileLoaded: false,
        imgFilename: filename,
        errorMsg: errorMsg
      });else if (step === 6) this.setState({
        settFileLoading: false,
        settFileLoaded: false,
        settFilename: filename,
        errorMsg: errorMsg
      });
    }
  }, {
    key: "dropzoneDropAccepted",
    value: function dropzoneDropAccepted(acceptedFiles) {
      var _this2 = this;

      var step = this.state.step;
      var reader = new FileReader();
      reader.onabort = this.onFileReaderAbort;
      reader.onerror = this.onFileReaderError;
      reader.onload = this.onFileReaderLoad;
      acceptedFiles.forEach(function (file) {
        if (step === 2 || step === 6) {
          if (step === 2) _this2.setState({
            micFilename: file.name
          });
          if (step === 6) _this2.setState({
            settFilename: file.name
          });
          reader.readAsText(file);
        } else if (step === 4) {
          _this2.setState({
            imgFilename: file.name
          }); //this.props.onLoadMetadata(file.path, this.handleLoadMetadataComplete);

        }
      });
      if (step === 2) this.setState({
        micFileLoading: false
      });else if (step === 4) this.setState({
        imgFileLoading: false
      });else if (step === 6) this.setState({
        settFileLoading: false
      });
    }
  }, {
    key: "dropzoneDialogOpen",
    value: function dropzoneDialogOpen() {
      var step = this.state.step;
      if (step === 2) this.setState({
        micFileLoading: true,
        micFileLoaded: false,
        errorMsg: null,
        micFilename: null,
        loadedMicroscope: null
      });else if (step === 4) this.setState({
        imgFileLoading: true,
        imgFileLoaded: false,
        errorMsg: null,
        imgFilename: null,
        loadedMetadata: null
      });else if (step === 6) this.setState({
        settFileLoading: true,
        settFileLoaded: false,
        errorMsg: null,
        settFilename: null,
        loadedSetting: null
      });
    }
  }, {
    key: "dropzoneDialogCancel",
    value: function dropzoneDialogCancel() {
      var step = this.state.step;
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
  }, {
    key: "onClickManufacturerSelection",
    value: function onClickManufacturerSelection(item) {
      //console.log("onClickManufacturerSelection - " + item);
      var micNames = this.props.microscopes[item];
      this.setState({
        selectedManu: item,
        micNames: micNames
      }); //this.props.onClickMicroscopeSelection(this.props.microscopes[item][0]);
    }
  }, {
    key: "onClickMicroscopeSelection",
    value: function onClickMicroscopeSelection(item) {
      //console.log("onClickMicroscopeSelection - " + item);
      this.setState({
        micFilename: item
      });
    }
  }, {
    key: "onClickSettingSelection",
    value: function onClickSettingSelection(item) {
      //console.log("onClickMicroscopeSelection - " + item);
      this.setState({
        settFilename: item
      });
    }
  }, {
    key: "handleCreateOrLoadRadioChange",
    value: function handleCreateOrLoadRadioChange(item) {
      //console.log("handleCreateOrLoadRadioChange - " + item);
      var step = this.state.step;

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
      } else if (step === 3) {
        if (this.state.imgModeSelection === _constants.string_createFromFile && item !== this.state.imgModeSelection) {
          this.setState({
            imgFileLoading: false,
            imgFileLoaded: false,
            imgFilename: null,
            loadedMetadata: null
          });
        }

        this.setState({
          imgModeSelection: item
        });
      } else if (step == 5) {
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
  }, {
    key: "handleStepRadioChange",
    value: function handleStepRadioChange(item) {
      //console.log("handleStepRadioChange " + item);
      this.setState({
        step: item
      });
    }
  }, {
    key: "onClickImageSelection",
    value: function onClickImageSelection(item) {
      var imageMap = this.props.imageMap;
      var image = imageMap[item];
      console.log("image");
      console.log(image); //this.props.handleLoadMetadataComplete(image);

      this.setState({
        loadedMetadata: image
      });
    }
  }, {
    key: "handleLoadMetadataComplete",
    value: function handleLoadMetadataComplete(imageMetadata) {
      if (imageMetadata.Error != null && imageMetadata.Error !== undefined) {
        this.setState({
          errorMsg: "Error: " + imageMetadata.Error
        });
      } else if (imageMetadata.Images !== null && imageMetadata.Images !== undefined) {
        var images = imageMetadata.Images;
        var firstImage = null;
        var imageMap = {};

        for (var index in images) {
          var image = images[index];
          if (firstImage === null) firstImage = image;
          var name = image.Name;
          imageMap[name] = image;
        }

        console.log("image");
        console.log(firstImage); //this.props.handleLoadMetadataComplete(firstImage);

        this.setState({
          imageMap: imageMap,
          imgFileLoaded: true
        });
      } else {
        var _image = imageMetadata.Image;
        console.log("image");
        console.log(_image); //this.props.handleLoadMetadataComplete(image);

        this.setState({
          imgFileLoaded: true,
          loadedMetadata: _image
        });
      }
    }
  }, {
    key: "onClickConfirm",
    value: function onClickConfirm() {
      var micModeSelection = this.state.micModeSelection;
      var imgModeSelection = this.state.imgModeSelection;
      var settModeSelection = this.state.settModeSelection; //console.log("modeSelection: " + this.state.modeSelection);
      //this.props.onClickLoadingOptionSelection(this.state.modeSelection);

      var microscope = null;
      var microscopeFilename = null;
      var metadata = null;
      var setting = null;
      var settingFilename = null;

      if (micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) {
        microscopeFilename = this.state.micFilename;
      } else if (micModeSelection === _constants.string_createFromFile) {
        microscope = this.state.loadedMicroscope;
      }

      if (imgModeSelection === _constants.string_createFromFile) {
        metadata = this.state.loadedMetadata;
      }

      if (settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) {
        settingFilename = this.state.settFilename;
      } else if (settModeSelection === _constants.string_createFromFile) {
        setting = this.state.loadedSetting;
      }

      this.props.onClickConfirm(micModeSelection, imgModeSelection, settModeSelection, microscopeFilename, microscope, settingFilename, setting, metadata);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var buttonStyleWideNoMarginSelected = {
        width: "420px",
        height: "100px"
      };
      var buttonStyleWideNoMargin = {
        width: "210px",
        height: "100px"
      };
      var buttonStyleWide = {
        width: "420px",
        height: "50px",
        margin: "5px"
      };
      var buttonStyle = {
        width: "200px",
        height: "50px",
        margin: "5px"
      };
      var titleContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "10%",
        alignItems: "center"
      };
      var windowExternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var windowStepContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        flexWrap: "wrap",
        width: "60%",
        height: "10%",
        alignItems: "center",
        alignContent: "stretch"
      };
      var windowButtonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "35%",
        alignItems: "center",
        maxHeight: "35%"
      };
      var windowLogoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        height: "20%",
        alignItems: "center"
      };
      var windowBottomButtonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "10%",
        alignItems: "center"
      };
      var buttonsInnerTextContainer = {
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "flex-start"
      };
      var dropzoneContainer = {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "80%",
        cursor: "pointer"
      };
      var styleDropzone = {
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
      var styleDropzoneInput = {
        cursor: "pointer"
      };
      var styleCenterText = {
        textAlign: "center"
      };
      var styleImageContainer = {
        width: "".concat(_constants.number_small_logo_width, "px"),
        height: "".concat(_constants.number_small_logo_height, "px")
      };
      var styleImage = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var styleImageBk = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var step = this.state.step;
      var microscopes = this.props.microscopes;
      var imageMap = this.state.imageMap;
      var settings = this.props.settings;
      var errorMsg = this.state.errorMsg;
      var micFileLoading = this.state.micFileLoading;
      var micFileLoaded = this.state.micFileLoaded;
      var micFilename = this.state.micFilename;
      var imgFileLoading = this.state.imgFileLoading;
      var imgFileLoaded = this.state.imgFileLoaded;
      var imgFilename = this.state.imgFilename;
      var settFileLoading = this.state.settFileLoading;
      var settFileLoaded = this.state.settFileLoaded;
      var settFilename = this.state.settFilename;
      var loadedMicroscope = this.state.loadedMicroscope;
      var loadedMetadata = this.state.loadedMetadata;
      var loadedSetting = this.state.loadedSetting;
      var selectedManu = this.state.selectedManu;
      var selectedMic = this.state.selectedMic;
      var selectedImg = this.state.selectedImg;
      var selectedSett = this.state.selectedSett;
      var micLoadingOptions = this.props.microscopeLoadingOptions;
      var imgLoadingOptions = this.props.imageLoadingOptions;
      var settLoadingOptions = this.props.settingLoadingOptions;
      var settCreatingOptions = this.props.settingCreatingOptions;
      var micModeSelection = this.state.micModeSelection;
      var imgModeSelection = this.state.imgModeSelection;
      var settModeSelection = this.state.settModeSelection;
      var step2Disabled = false;
      var variant_1 = "outline-primary";
      var variant_2 = "outline-danger";

      if ((0, _genericUtilities.isDefined)(micModeSelection)) {
        if (micModeSelection.toLowerCase().includes("create")) {
          step2Disabled = true;
          variant_2 = "outline-success";
        }

        variant_1 = "outline-success";
      } else {
        step2Disabled = true;
        variant_1 = "outline-danger";
        variant_2 = "outline-primary";
      }

      if (loadedMicroscope !== null && micFilename !== null) {
        variant_2 = "outline-success";
      }

      var step3Disabled = false;
      var step4Disabled = false;
      var variant_3 = "outline-primary";
      var variant_4 = "outline-danger";

      if (!this.props.hasImageLoader) {
        step3Disabled = true;
        step4Disabled = true;
        variant_3 = "outline-primary";
        variant_4 = "outline-primary";
      } else {
        if ((0, _genericUtilities.isDefined)(imgModeSelection)) {
          if (imgModeSelection.toLowerCase().includes("skip")) {
            step4Disabled = true;
            variant_4 = "outline-success";
          }

          variant_3 = "outline-success";
        } else {
          step4Disabled = true;
          variant_3 = "outline-danger";
          variant_4 = "outline-primary";
        }

        if (loadedMetadata !== null && imgFilename !== null) {
          variant_4 = "outline-success";
        }
      }

      var step6Disabled = false;
      var variant_5 = "outline-primary";
      var variant_6 = "outline-danger";

      if ((0, _genericUtilities.isDefined)(settModeSelection)) {
        if (settModeSelection.toLowerCase().includes("create")) {
          step6Disabled = true;
          variant_6 = "outline-success";
        }

        variant_5 = "outline-success";
      } else {
        step6Disabled = true;
        variant_5 = "outline-danger";
        variant_6 = "outline-primary";
      }

      if (loadedSetting !== null && settFilename !== null) {
        variant_6 = "outline-success";
      }

      var step1Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", null, "1 - Microscope information"), /*#__PURE__*/_react.default.createElement("p", {
        style: {
          fontSize: "0.7em"
        }
      }, micModeSelection !== null ? micModeSelection : ""));

      var step2Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", null, "2 - Select Microscope"), /*#__PURE__*/_react.default.createElement("p", {
        style: {
          fontSize: "0.7em"
        }
      }, micFilename !== null ? micFilename : ""));

      var step3Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", null, "3 - Image information"), /*#__PURE__*/_react.default.createElement("p", {
        style: {
          fontSize: "0.7em"
        }
      }, imgModeSelection !== null ? imgModeSelection : ""));

      var step4Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", null, "4 - Select Image"), /*#__PURE__*/_react.default.createElement("p", {
        style: {
          fontSize: "0.7em"
        }
      }, imgFilename !== null ? imgFilename : ""));

      var step5Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", null, "5 - Setting information"), /*#__PURE__*/_react.default.createElement("p", {
        style: {
          fontSize: "0.7em"
        }
      }, settModeSelection !== null ? settModeSelection : ""));

      var step6Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", null, "6 - Select Setting"), /*#__PURE__*/_react.default.createElement("p", {
        style: {
          fontSize: "0.7em"
        }
      }, settFilename !== null ? settFilename : ""));

      if (step === 1) {
        step1Text = /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTextContainer
        }, /*#__PURE__*/_react.default.createElement("h3", null, "1 - Microscope information"), /*#__PURE__*/_react.default.createElement("p", {
          style: {
            fontSize: "0.8em"
          }
        }, micModeSelection !== null ? micModeSelection : ""));
      } else if (step === 2) {
        step2Text = /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTextContainer
        }, /*#__PURE__*/_react.default.createElement("h3", null, "2 - Select Microscope"), /*#__PURE__*/_react.default.createElement("p", {
          style: {
            fontSize: "0.8em"
          }
        }, micFilename !== null ? micFilename : ""));
      } else if (step === 3) {
        step3Text = /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTextContainer
        }, /*#__PURE__*/_react.default.createElement("h3", null, "3 - Image information"), /*#__PURE__*/_react.default.createElement("p", {
          style: {
            fontSize: "0.8em"
          }
        }, imgModeSelection !== null ? imgModeSelection : ""));
      } else if (step === 4) {
        step4Text = /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTextContainer
        }, /*#__PURE__*/_react.default.createElement("h3", null, "4 - Select Image"), /*#__PURE__*/_react.default.createElement("p", {
          style: {
            fontSize: "0.8em"
          }
        }, imgFilename !== null ? imgFilename : ""));
      } else if (step === 5) {
        step5Text = /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTextContainer
        }, /*#__PURE__*/_react.default.createElement("h3", null, "5 - Setting information"), /*#__PURE__*/_react.default.createElement("p", {
          style: {
            fontSize: "0.8em"
          }
        }, settModeSelection !== null ? settModeSelection : ""));
      } else if (step === 6) {
        step6Text = /*#__PURE__*/_react.default.createElement("div", {
          style: buttonsInnerTextContainer
        }, /*#__PURE__*/_react.default.createElement("h3", null, "6 - Select Setting"), /*#__PURE__*/_react.default.createElement("p", {
          style: {
            fontSize: "0.8em"
          }
        }, settFilename !== null ? settFilename : ""));
      }

      var stepRadios = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
        id: "radio-step-options",
        key: "radio-step-options",
        type: "radio",
        name: "radio-step-options",
        value: this.state.step,
        onChange: this.handleStepRadioChange
      }, /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-1",
        key: "rso-radio-1",
        value: 1,
        variant: variant_1,
        style: step === 1 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step1Text), /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-2",
        key: "rso-radio-2",
        value: 2,
        disabled: step2Disabled,
        variant: variant_2,
        style: step === 2 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step2Text), /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-3",
        key: "rso-radio-3",
        value: 3,
        disabled: step3Disabled,
        variant: variant_3,
        style: step === 3 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step3Text), /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-4",
        key: "rso-radio-4",
        value: 4,
        disabled: step4Disabled,
        variant: variant_4,
        style: step === 4 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step4Text), /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-5",
        key: "rso-radio-5",
        value: 5,
        variant: variant_5,
        style: step === 5 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step5Text), /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
        id: "rso-radio-6",
        key: "rso-radio-6",
        value: 6,
        disabled: step6Disabled,
        variant: variant_6,
        style: step === 6 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step6Text));

      var list = [];

      if (step === 1) {
        var loadRadios = [];

        var _loop = function _loop(i) {
          var loadingOption = micLoadingOptions[i];
          var tooltip = _constants.microscope_loader_load_from_file;

          if (loadingOption === _constants.string_loadFromHomeFolder) {
            tooltip = _constants.microscope_loader_load_from_homeFolder;
          } else if (loadingOption === _constants.string_loadFromRepository) {
            tooltip = _constants.microscope_loader_load_from_repo;
          }

          loadRadios.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            key: "popover" + loadingOption,
            position: tooltip.position,
            title: tooltip.title,
            content: tooltip.content,
            element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              type: "radio",
              key: loadingOption,
              id: loadingOption,
              value: loadingOption,
              onChange: function onChange() {
                return _this3.handleCreateOrLoadRadioChange(loadingOption);
              },
              checked: loadingOption === micModeSelection,
              style: buttonStyleWide,
              size: "lg",
              variant: "outline-primary"
            }, loadingOption)
          }));
        };

        for (var i = 0; i < micLoadingOptions.length; i++) {
          _loop(i);
        }

        list.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "load-options"
        }, "Load options"));
        list.push(loadRadios);
      } else if (step === 2) {
        var text = /*#__PURE__*/_react.default.createElement("p", {
          style: styleCenterText
        }, "Click or drag a file here to load an existing Microscope file you want to work on.");

        if (micFileLoaded) {
          styleDropzone.borderColor = "green";
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, micFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Click or drag a file here to replace the currently loaded file"));
        } else if (errorMsg !== null) {
          text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, micFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Click or drag a file here to replace the currently loaded file"));
        } //TODO upload zone


        if (micModeSelection === _constants.string_createFromFile) {
          var dropbox = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
            }, function (_ref) {
              var getRootProps = _ref.getRootProps,
                  getInputProps = _ref.getInputProps;
              return /*#__PURE__*/_react.default.createElement("div", _extends({
                style: styleDropzone
              }, getRootProps({
                onClick: _this3.dropzoneDialogOpen
              })), /*#__PURE__*/_react.default.createElement("input", _extends({
                style: styleDropzoneInput
              }, getInputProps({}))), text);
            })
          });

          list.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "container-dropzone",
            id: "container-dropzone",
            style: dropzoneContainer
          }, dropbox));
        } else {
          windowButtonsContainer.flexFlow = "row";
          var windowRadioButtonsContainer = {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "25%",
            height: "80%",
            alignItems: "center",
            maxHeight: "80%",
            overflow: "auto"
          };
          var manufacturers = Object.keys(microscopes); // let defaultManu = isDefined(selectedManu)
          // 	? manufacturers.indexOf(selectedManu)
          // 	: 0;

          var manufacturerRadios = [];

          for (var _i = 0; _i < manufacturers.length; _i++) {
            manufacturerRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              id: "rmo-radio-" + _i,
              key: "rmo-radio-" + _i,
              value: manufacturers[_i],
              variant: "outline-primary",
              style: buttonStyleWide
            }, manufacturers[_i]));
          }

          var manufacturerRadio = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
              onChange: function onChange(e) {
                _this3.onClickManufacturerSelection(e);
              },
              vertical: true
            }, manufacturerRadios)
          });

          list.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "radio-manufactorer-container",
            id: "radio-manufactorer-container",
            style: windowRadioButtonsContainer
          }, manufacturerRadio));

          if ((0, _genericUtilities.isDefined)(selectedManu)) {
            var microscopesManu = microscopes[selectedManu];
            var microscopeRadios = [];

            for (var _i2 = 0; _i2 < microscopesManu.length; _i2++) {
              microscopeRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
                id: "rmico-radio-" + _i2,
                key: "rmico-radio-" + _i2,
                value: microscopesManu[_i2],
                variant: "outline-primary",
                style: buttonStyleWide
              }, /*#__PURE__*/_react.default.createElement("div", {
                style: {
                  fontSize: "0.8em"
                }
              }, microscopesManu[_i2])));
            }

            var microscopeRadio = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
                value: selectedMic,
                onChange: function onChange(e) {
                  _this3.onClickMicroscopeSelection(e);
                },
                vertical: true
              }, microscopeRadios)
            });

            list.push( /*#__PURE__*/_react.default.createElement("div", {
              key: "radio-microscope-options",
              id: "radio-microscope-options",
              style: windowRadioButtonsContainer
            }, microscopeRadio));
          }
        }
      } else if (step === 3) {
        var _loadRadios = [];

        var _loop2 = function _loop2(_i3) {
          var loadingOption = imgLoadingOptions[_i3];
          var tooltip = _constants.loadImage_load_tooltip;

          if (loadingOption === _constants.string_noImageLoad) {
            tooltip = _constants.loadImage_skip_tooltip;
          }

          _loadRadios.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            key: "popover" + loadingOption,
            position: tooltip.position,
            title: tooltip.title,
            content: tooltip.content,
            element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              type: "radio",
              key: loadingOption,
              id: loadingOption,
              value: loadingOption,
              onChange: function onChange() {
                return _this3.handleCreateOrLoadRadioChange(loadingOption);
              },
              checked: loadingOption === imgModeSelection,
              style: buttonStyleWide,
              size: "lg",
              variant: "outline-primary"
            }, loadingOption)
          }));
        };

        for (var _i3 = 0; _i3 < imgLoadingOptions.length; _i3++) {
          _loop2(_i3);
        }

        list.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "load-options"
        }, "Load options"));
        list.push(_loadRadios);
      } else if (step === 4) {
        var _text = /*#__PURE__*/_react.default.createElement("p", {
          style: styleCenterText
        }, "Click or drag a file here to load an Image file you want to work with.");

        if (imgFileLoaded) {
          styleDropzone.borderColor = "green";
          _text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, imgFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Click or drag a file here to replace the currently loaded file"));
        } else if (errorMsg !== null) {
          _text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, imgFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Click or drag a file here to replace the currently loaded file"));
        } //TODO upload zone


        if (imgModeSelection === _constants.string_createFromFile) {
          var imageRadio = null;
          var _windowRadioButtonsContainer = null;

          if (imageMap !== null) {
            windowButtonsContainer.flexFlow = "row";
            _windowRadioButtonsContainer = {
              display: "flex",
              justifyContent: "center",
              flexFlow: "column",
              width: "25%",
              height: "80%",
              alignItems: "center",
              maxHeight: "80%",
              overflow: "auto"
            };
            dropzoneContainer.width = "25%";
            var imageKeys = Object.keys(imageMap); // let defaultManu = isDefined(selectedManu)
            // 	? manufacturers.indexOf(selectedManu)
            // 	: 0;

            var imageRadios = [];

            for (var _i4 = 0; _i4 < imageKeys.length; _i4++) {
              imageRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
                id: "rio-radio-" + _i4,
                key: "rio-radio-" + _i4,
                value: imageKeys[_i4],
                variant: "outline-primary",
                style: buttonStyleWide
              }, imageKeys[_i4]));
            }

            imageRadio = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
              id: "popover-radio-images-options",
              key: "popover-radio-images-options",
              position: _constants.loadImage_from_names_tooltip.position,
              title: _constants.loadImage_from_names_tooltip.title,
              content: _constants.loadImage_from_names_tooltip.content,
              element: /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
                id: "radio-image-options",
                key: "radio-image-options",
                type: "radio",
                name: "radio-image-options",
                value: selectedImg,
                onChange: function onChange(e) {
                  _this3.onClickImageSelection(e);
                },
                vertical: true
              }, imageRadios)
            });
          }

          var _dropbox = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
              onDropRejected: this.dropzoneDropRejected //accept={string_json_ext}
              ,
              multiple: false,
              style: dropzoneContainer
            }, function (_ref2) {
              var getRootProps = _ref2.getRootProps,
                  getInputProps = _ref2.getInputProps;
              return /*#__PURE__*/_react.default.createElement("div", _extends({
                style: styleDropzone
              }, getRootProps({
                onClick: _this3.dropzoneDialogOpen
              })), /*#__PURE__*/_react.default.createElement("input", _extends({
                style: styleDropzoneInput
              }, getInputProps({}))), _text);
            })
          });

          list.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "container-dropzone",
            id: "container-dropzone",
            style: dropzoneContainer
          }, _dropbox));

          if (imageMap !== null) {
            list.push( /*#__PURE__*/_react.default.createElement("div", {
              key: "radio-image-container",
              id: "radio-image-container",
              style: _windowRadioButtonsContainer
            }, imageRadio));
          }
        }
      } else if (step === 5) {
        var createRadios = [];

        var _loop3 = function _loop3(_i5) {
          var creatingOption = settCreatingOptions[_i5];
          var tooltip = _constants.setting_loader_scratch;
          createRadios.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            key: "popover" + creatingOption,
            position: tooltip.position,
            title: tooltip.title,
            content: tooltip.content,
            element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              type: "radio",
              key: creatingOption,
              id: creatingOption,
              value: creatingOption,
              onChange: function onChange() {
                return _this3.handleCreateOrLoadRadioChange(creatingOption);
              },
              checked: creatingOption === settModeSelection,
              style: buttonStyleWide,
              size: "lg",
              variant: "outline-primary"
            }, creatingOption)
          }));
        };

        for (var _i5 = 0; _i5 < settCreatingOptions.length; _i5++) {
          _loop3(_i5);
        }

        var _loadRadios2 = [];

        var _loop4 = function _loop4(_i6) {
          var loadingOption = settLoadingOptions[_i6];
          var tooltip = _constants.setting_loader_load_from_file;

          if (loadingOption === _constants.string_loadFromHomeFolder) {
            tooltip = _constants.setting_loader_load_from_homeFolder;
          } else if (loadingOption === _constants.string_loadFromRepository) {
            tooltip = _constants.setting_loader_load_from_repo;
          }

          _loadRadios2.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            key: "popover" + loadingOption,
            position: tooltip.position,
            title: tooltip.title,
            content: tooltip.content,
            element: /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              type: "radio",
              key: loadingOption,
              id: loadingOption,
              value: loadingOption,
              onChange: function onChange() {
                return _this3.handleCreateOrLoadRadioChange(loadingOption);
              },
              checked: loadingOption === settModeSelection,
              style: buttonStyleWide,
              size: "lg",
              variant: "outline-primary"
            }, loadingOption)
          }));
        };

        for (var _i6 = 0; _i6 < settLoadingOptions.length; _i6++) {
          _loop4(_i6);
        }

        list.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "create-options"
        }, "Create options"));
        list.push(createRadios);
        list.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "load-options"
        }, "Load options"));
        list.push(_loadRadios2);
      } else {
        var _text2 = /*#__PURE__*/_react.default.createElement("p", {
          style: styleCenterText
        }, "Click or drag a file here to load an existing Image Acquisition Setting file you want to work on.");

        if (settFileLoaded) {
          styleDropzone.borderColor = "green";
          _text2 = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, micFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Click or drag a file here to replace the currently loaded file"));
        } else if (errorMsg !== null) {
          _text2 = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, micFilename), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Click or drag a file here to replace the currently loaded file"));
        } //TODO upload zone


        if (settModeSelection === _constants.string_createFromFile) {
          var _dropbox2 = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
            }, function (_ref3) {
              var getRootProps = _ref3.getRootProps,
                  getInputProps = _ref3.getInputProps;
              return /*#__PURE__*/_react.default.createElement("div", _extends({
                style: styleDropzone
              }, getRootProps({
                onClick: _this3.dropzoneDialogOpen
              })), /*#__PURE__*/_react.default.createElement("input", _extends({
                style: styleDropzoneInput
              }, getInputProps({}))), _text2);
            })
          });

          list.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "container-dropzone",
            id: "container-dropzone",
            style: dropzoneContainer
          }, _dropbox2));
        } else {
          var _windowRadioButtonsContainer2 = {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "25%",
            height: "80%",
            alignItems: "center",
            maxHeight: "80%",
            overflow: "auto"
          };
          var settingKeys = Object.keys(settings); // let defaultManu = isDefined(selectedManu)
          // 	? manufacturers.indexOf(selectedManu)
          // 	: 0;

          var settingRadios = [];

          for (var _i7 = 0; _i7 < settingKeys.length; _i7++) {
            settingRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              id: "rmo-radio-" + _i7,
              key: "rmo-radio-" + _i7,
              value: settingKeys[_i7],
              variant: "outline-primary",
              style: buttonStyleWide
            }, settingKeys[_i7]));
          }

          var settingRadio = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
            id: "popover-radio-setting-options",
            key: "popover-radio-setting-options",
            position: _constants.createSettings_from_repo_names_tooltip.position,
            title: _constants.createSettings_from_repo_names_tooltip.title,
            content: _constants.createSettings_from_repo_names_tooltip.content,
            element: /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
              id: "radio-setting-options",
              key: "radio-setting-options",
              type: "radio",
              name: "radio-setting-options",
              value: selectedSett,
              onChange: function onChange(e) {
                _this3.onClickSettingSelection(e);
              },
              vertical: true
            }, settingRadios)
          });

          list.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "radio-setting-container",
            id: "radio-setting-container",
            style: _windowRadioButtonsContainer2
          }, settingRadio));
        }
      }

      var continue_tooltip = _constants.create_mode_continue_settings_tooltip;
      var backImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_back_img);
      var backImgPath = backImgPath_tmp + (backImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var buttons = [];
      buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "button-back",
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
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: backImgPath,
          alt: backImgPath_tmp,
          style: styleImageBk,
          onLoad: this.onImgLoad
        }), "Back"))
      }));
      var continueDisabled = false;

      if (!(0, _genericUtilities.isDefined)(micModeSelection)) {
        continueDisabled = true;
      } else if (micModeSelection === _constants.string_createFromFile && (!micFileLoaded || loadedMicroscope === null)) {
        continueDisabled = true;
      } else if ((micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) && micFilename === null) {
        continueDisabled = true;
      }

      if (this.props.hasMetadataLoader) {
        if (!(0, _genericUtilities.isDefined)(imgModeSelection)) {
          continueDisabled = true;
        } else if (imgModeSelection === _constants.string_createFromFile && (!imgFileLoaded || loadedMetadata === null)) {
          continueDisabled = true;
        }
      }

      if (!(0, _genericUtilities.isDefined)(settModeSelection)) {
        continueDisabled = true;
      } else if (settModeSelection === _constants.string_createFromFile && (!settFileLoaded || loadedSetting === null)) {
        continueDisabled = true;
      } else if ((settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) && settFilename === null) {
        continueDisabled = true;
      }

      buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "button-continue",
        position: continue_tooltip.position,
        title: continue_tooltip.title,
        content: continue_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: !continueDisabled ? this.onClickConfirm : null,
          style: buttonStyle,
          size: "lg",
          disabled: continueDisabled
        }, "Continue")
      }));
      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""); // return (
      // 	<div style={windowExternalContainer}>
      // 		<div style={windowInternalContainer}>
      // 			<div style={styleImageContainer}>
      // 				<img
      // 					src={logoPath}
      // 					alt={this.props.logoImg}
      // 					style={styleImage}
      // 					onLoad={this.onImgLoad}
      // 				/>
      // 			</div>
      // 			<div style={{ textAlign: "center", fontWeight: "bold" }}>
      // 				{titleText}
      // 			</div>
      // 			{list}
      // 		</div>
      // 	</div>
      // );

      return /*#__PURE__*/_react.default.createElement("div", {
        style: windowExternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: titleContainer
      }, /*#__PURE__*/_react.default.createElement("h1", null, this.props.title)), /*#__PURE__*/_react.default.createElement("div", {
        style: windowStepContainer
      }, stepRadios), /*#__PURE__*/_react.default.createElement("div", {
        style: windowButtonsContainer
      }, list), /*#__PURE__*/_react.default.createElement("div", {
        style: windowBottomButtonsContainer
      }, buttons), /*#__PURE__*/_react.default.createElement("div", {
        style: windowLogoContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      }))));
    }
  }]);

  return MicroscopeLoader;
}(_react.default.PureComponent);

exports.default = MicroscopeLoader;