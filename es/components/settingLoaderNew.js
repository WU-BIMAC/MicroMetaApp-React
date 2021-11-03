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
    _this.onClickBack = _this.onClickBack.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MicroscopeLoader, [{
    key: "onFileReaderAbort",
    value: function onFileReaderAbort(e) {
      var step = this.state.step;
      if (step === 1) this.setState({
        micFileLoaded: false
      });else if (step === 3) this.setState({
        settFileLoaded: false
      });
    }
  }, {
    key: "onFileReaderError",
    value: function onFileReaderError(e) {
      var step = this.state.step;
      if (step === 1) this.setState({
        micFileLoaded: false
      });else if (step === 3) this.setState({
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
        if (step === 1) {
          microscope = JSON.parse(binaryStr);

          if ((0, _genericUtilities.validateMicroscope)(microscope, this.props.schema, true)) {
            this.setState({
              micFileLoaded: true,
              loadedMicroscope: microscope
            });
          } else {
            errorMsg = "The file you are trying to load does not contain a proper MicroMetaApp Microscope";
          }
        } else if (step === 3) {
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
  }, {
    key: "dropzoneDrop",
    value: function dropzoneDrop() {
      var step = this.state.step;
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
  }, {
    key: "dropzoneDropRejected",
    value: function dropzoneDropRejected(rejectedFiles) {
      var step = this.state.step; // let fileRejectedNames = "";

      var filename = null;
      rejectedFiles.forEach(function (rejected) {
        filename = rejected.file.name;
      });
      var errorMsg = "The file you tried to load is not a json file";
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
        if (step === 1 || step === 3) {
          if (step === 1) _this2.setState({
            micFilename: file.name
          });
          if (step === 3) _this2.setState({
            settFilename: file.name
          });
          reader.readAsText(file);
        } else if (step === 2) {
          _this2.setState({
            imgFilename: file.name
          });

          _this2.props.onLoadMetadata(file.path, _this2.handleLoadMetadataComplete);
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
  }, {
    key: "dropzoneDialogOpen",
    value: function dropzoneDialogOpen() {
      var step = this.state.step;
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
      var micNames = this.props.microscopeNames[item];
      this.setState({
        selectedManu: item,
        micNames: micNames
      }); //this.props.onClickMicroscopeSelection(this.props.microscopeNames[item][0]);
    }
  }, {
    key: "onClickMicroscopeSelection",
    value: function onClickMicroscopeSelection(item) {
      //console.log("onClickMicroscopeSelection - " + item);
      var loadedMicroscope = null;

      if ((0, _genericUtilities.isDefined)(this.props.microscopes)) {
        loadedMicroscope = this.props.microscopes[item];
      }

      this.setState({
        micFilename: item,
        loadedMicroscope: loadedMicroscope
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
      } else if (step === 2) {
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
      var image = imageMap[item]; //this.props.handleLoadMetadataComplete(image);

      if (this.props.isDebug) console.log("Loaded metadata: " + loadedMetadata);
      this.setState({
        loadedMetadata: image
      });
    }
  }, {
    key: "handleLoadMetadataComplete",
    value: function handleLoadMetadataComplete(imageMetadata) {
      //console.log("IM HERE");
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

        if (this.props.isDebug) console.log("Image map: " + imageMap); // console.log("image");
        // console.log(firstImage);
        //this.props.handleLoadMetadataComplete(firstImage);

        this.setState({
          imageMap: imageMap,
          imgFileLoaded: true
        });
      } else {
        var _image = imageMetadata.Image; // console.log("image");
        // console.log(image);
        //this.props.handleLoadMetadataComplete(image);

        if (this.props.isDebug) console.log("Loaded metadata: " + loadedMetadata);
        this.setState({
          imgFileLoaded: true,
          loadedMetadata: _image
        });
      }
    }
  }, {
    key: "onClickBack",
    value: function onClickBack() {
      var step = this.state.step;

      if (step === 3 && !(0, _genericUtilities.isDefined)(this.props.onLoadMetadata)
      /*!this.props.hasMetadataLoader*/
      ) {
          step -= 2;
        } else {
        step--;
      }

      this.setState({
        step: step
      });
    }
  }, {
    key: "onClickConfirm",
    value: function onClickConfirm() {
      var step = this.state.step;

      if (step !== 3) {
        if (step === 1 && !(0, _genericUtilities.isDefined)(this.props.onLoadMetadata)
        /*!this.props.hasMetadataLoader*/
        ) {
            step += 2;
          } else {
          step++;
        }

        this.setState({
          step: step
        });
        return;
      }

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

      var buttonStyleWideNoMarginSelected1 = {
        width: "600px",
        height: "125px",
        borderRadius: "50px 0px 0px 50px",
        paddingLeft: "50px"
      };
      var buttonStyleWideNoMargin1 = {
        width: "350px",
        height: "125px",
        borderRadius: "50px 0px 0px 50px",
        paddingLeft: "50px"
      };
      var buttonStyleWideNoMarginSelected2 = {
        width: "600px",
        height: "125px"
      };
      var buttonStyleWideNoMargin2 = {
        width: "350px",
        height: "125px"
      };
      var buttonStyleWideNoMarginSelected3 = {
        width: "600px",
        height: "125px",
        borderRadius: "0px 50px 50px 0px",
        paddingRight: "50px"
      };
      var buttonStyleWideNoMargin3 = {
        width: "350px",
        height: "125px",
        borderRadius: "0px 50px 50px 0px",
        paddingRight: "50px"
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
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        height: "100px",
        margin: "25px",
        alignItems: "center"
      };
      var wrapperContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var mainContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var stepContainer = {
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
      var buttonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "550px",
        alignItems: "center",
        margin: "10px"
      };
      var logoContainer = {
        display: "flex",
        justifyContent: "flex-start",
        flexFlow: "column",
        width: "100%",
        height: "25%",
        alignItems: "center",
        marginTop: "10px"
      };
      var bottomButtonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "50px",
        alignItems: "center",
        margin: "10px"
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
        width: "420px",
        height: "420px",
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
        textAlign: "center",
        wordBreak: "break-word",
        whiteSpace: "break-spaces"
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
      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleImageIcon = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var styleImageIconHome = {
        width: "30px",
        height: "30px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var step = this.state.step;
      var microscopeNames = this.props.microscopeNames;
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
      var step1Disabled = false;
      var step2Disabled = false;
      var step3Disabled = false;
      var variant_1 = "outline-primary";
      var variant_2 = "outline-primary";
      var variant_3 = "outline-primary"; // if (isDefined(micModeSelection)) {
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

      var styleText_1 = {
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
        textAlign: "left"
      };
      var styleText_2 = {
        //fontSize: "1em",
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
        textAlign: "left"
      };
      var styleText_3 = {
        fontSize: "0.9em",
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
        textAlign: "left"
      };
      var step1SubText = "";

      if (micModeSelection !== null) {
        step1SubText = micModeSelection;
      }

      if (micFilename !== null) {
        if (micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) {
          var fullMicName = micFilename;
          var lastIndexBeforeID = fullMicName.lastIndexOf("_") + 1;
          var micName = fullMicName.substring(0, lastIndexBeforeID);
          var micID = fullMicName.substring(lastIndexBeforeID);
          var micLabel = micName + "\n" + micID;
          step1SubText += "\n" + micLabel;
        } else {
          step1SubText += "\n" + micFilename;
        }
      }

      var step1Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", {
        style: styleText_1
      }, "1 - Select Microscope file"), /*#__PURE__*/_react.default.createElement("p", {
        style: styleText_3
      }, step1SubText)); // let step2Text = (
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

      var step2SubText = "";

      if (imgModeSelection !== null) {
        step2SubText = imgModeSelection;
      }

      if (imgFilename !== null) {
        step2SubText += "\n" + imgFilename;
      }

      var step2Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", {
        style: styleText_1
      }, "2 - Select Image file"), /*#__PURE__*/_react.default.createElement("p", {
        style: styleText_3
      }, step2SubText)); // let step2Text = (
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

      var step3SubText = "";

      if (settModeSelection !== null) {
        step3SubText = settModeSelection;
      }

      if (settFilename !== null) {
        if (settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) {
          var fullSettName = settFilename;

          var _lastIndexBeforeID = fullSettName.lastIndexOf("_") + 1;

          var settName = fullSettName.substring(0, _lastIndexBeforeID);
          var settID = fullSettName.substring(_lastIndexBeforeID);
          var settLabel = settName + "\n" + settID;
          step3SubText += "\n" + settLabel;
        } else {
          step3SubText += "\n" + settFilename;
        }
      }

      var step3Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", {
        style: styleText_1
      }, "3 - Select Setting file"), /*#__PURE__*/_react.default.createElement("p", {
        style: styleText_3
      }, step3SubText)); // let step2Text = (
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
      } // let step1Text = (
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


      var continueNextTooltip = _constants.next_tooltip;
      var continueDisabled = false;
      var continueLabel = "Next";
      var step1Completed = true;
      var step2Completed = true;
      var step3Completed = true;

      if (!(0, _genericUtilities.isDefined)(micModeSelection)) {
        step1Completed = false;
      } else if (micModeSelection === _constants.string_createFromFile && (!micFileLoaded || loadedMicroscope === null)) {
        step1Completed = false;
      } else if ((micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) && micFilename === null) {
        step1Completed = false;
      }

      var step2Inactive = false;

      if ((0, _genericUtilities.isDefined)(this.props.onLoadMetadata)
      /*this.props.hasMetadataLoader*/
      ) {
          if (!(0, _genericUtilities.isDefined)(imgModeSelection)) {
            step2Completed = false;
          } else if (imgModeSelection === _constants.string_createFromFile && (!imgFileLoaded || loadedMetadata === null)) {
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
          continueDisabled = true; // step2Disabled = true;
          // variant_2 = "secondary";
        }

        step2Disabled = true;
        variant_2 = "secondary";
        step3Disabled = true;
        variant_3 = "secondary";
      } else if (step === 2) {
        if (!step2Completed) {
          continueDisabled = true; // step3Disabled = true;
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

      var stepRadios = /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
        id: "radio-step-options",
        key: "radio-step-options",
        type: "radio",
        name: "radio-step-options" //value={this.state.step}
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

        var toggles = [];
        toggles.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "load-options"
        }, "Load options"));
        toggles.push(loadRadios);
        list.push( /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
          id: "radio-createLoad-options",
          key: "radio-createLoad-options",
          type: "radio",
          name: "radio-createLoad-options" //value={modeSelection}
          //onChange={this.handleCreateOrLoadRadioChange}
          ,
          vertical: true
        }, toggles));

        if (micModeSelection === _constants.string_createFromFile) {
          var text = /*#__PURE__*/_react.default.createElement("p", {
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
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "dropzone"
          }, "Load Microscope file"), dropbox));
        } else if (micModeSelection === _constants.string_loadFromRepository || micModeSelection === _constants.string_loadFromHomeFolder) {
          //windowButtonsContainer.flexFlow = "row";
          var radioButtonsContainer = {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "430px",
            height: "550px",
            alignItems: "flex-start",
            maxHeight: "550px",
            overflow: "auto"
          };
          var manufacturers = Object.keys(microscopeNames); // let defaultManu = isDefined(selectedManu)
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
            style: radioButtonsContainer
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "select-manufacturer"
          }, "Select Manufacturer"), manufacturerRadio));

          if ((0, _genericUtilities.isDefined)(selectedManu)) {
            var microscopesManu = microscopeNames[selectedManu];
            var microscopeRadios = [];

            for (var _i2 = 0; _i2 < microscopesManu.length; _i2++) {
              var _fullMicName = microscopesManu[_i2];

              var _lastIndexBeforeID2 = _fullMicName.lastIndexOf("_") + 1;

              var _micName = _fullMicName.substring(0, _lastIndexBeforeID2);

              var _micID = _fullMicName.substring(_lastIndexBeforeID2);

              var _micLabel = _micName + "\n" + _micID;

              microscopeRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
                id: "rmico-radio-" + _i2,
                key: "rmico-radio-" + _i2,
                value: _fullMicName,
                variant: "outline-primary",
                style: buttonStyleWide
              }, /*#__PURE__*/_react.default.createElement("div", {
                style: {
                  fontSize: "0.8em",
                  wordBreak: "break-word",
                  whiteSpace: "break-spaces"
                }
              }, _micLabel)));
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
                value: micFilename,
                onChange: function onChange(e) {
                  _this3.onClickMicroscopeSelection(e);
                },
                vertical: true
              }, microscopeRadios)
            });

            list.push( /*#__PURE__*/_react.default.createElement("div", {
              key: "radio-microscope-options",
              id: "radio-microscope-options",
              style: radioButtonsContainer
            }, /*#__PURE__*/_react.default.createElement("h4", {
              key: "select-microscope"
            }, "Select Microscope file"), microscopeRadio));
          }
        }
      } else if (step === 2) {
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

        var _toggles = [];

        _toggles.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "load-options"
        }, "Load options"));

        _toggles.push(_loadRadios);

        list.push( /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
          id: "radio-createLoad-options",
          key: "radio-createLoad-options",
          type: "radio",
          name: "radio-createLoad-options" //value={modeSelection}
          //onChange={this.handleCreateOrLoadRadioChange}
          ,
          vertical: true
        }, _toggles));

        if (imgModeSelection === _constants.string_createFromFile) {
          var _text = /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_image_new);

          if (imgFileLoaded) {
            styleDropzone.borderColor = "green";
            _text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, imgFilename), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, _constants.string_dropbox_image_replace));
          } else if (errorMsg !== null) {
            _text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, imgFilename), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, _constants.string_dropbox_image_replace));
          }

          var imageRadio = null;
          var _radioButtonsContainer = null;

          if (imageMap !== null) {
            //windowButtonsContainer.flexFlow = "row";
            _radioButtonsContainer = {
              display: "flex",
              justifyContent: "center",
              flexFlow: "column",
              width: "430px",
              height: "550px",
              alignItems: "center",
              maxHeight: "550px",
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
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "dropzone"
          }, "Load Image file"), _dropbox));

          if (imageRadio !== null) {
            list.push( /*#__PURE__*/_react.default.createElement("div", {
              key: "radio-image-container",
              id: "radio-image-container",
              style: _radioButtonsContainer
            }, /*#__PURE__*/_react.default.createElement("h4", {
              key: "select-manufacturer"
            }, "Select Image file"), imageRadio));
          }
        }
      } else if (step === 3) {
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

        var _toggles2 = [];

        _toggles2.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "create-options"
        }, "Create options"));

        _toggles2.push(createRadios);

        _toggles2.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "load-options"
        }, "Load options"));

        _toggles2.push(_loadRadios2);

        list.push( /*#__PURE__*/_react.default.createElement(_ToggleButtonGroup.default, {
          id: "radio-createLoad-options",
          key: "radio-createLoad-options",
          type: "radio",
          name: "radio-createLoad-options" //value={modeSelection}
          //onChange={this.handleCreateOrLoadRadioChange}
          ,
          vertical: true
        }, _toggles2));

        if (settModeSelection === _constants.string_createFromFile) {
          var _text2 = /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, _constants.string_dropbox_settings_new);

          if (settFileLoaded) {
            styleDropzone.borderColor = "green";
            _text2 = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, settFilename), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, _constants.string_dropbox_settings_replace));
          } else if (errorMsg !== null) {
            _text2 = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, settFilename), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, _constants.string_dropbox_settings_replace));
          }

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
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "dropzone"
          }, "Load Setting file"), _dropbox2));
        } else if (settModeSelection === _constants.string_loadFromRepository || settModeSelection === _constants.string_loadFromHomeFolder) {
          var _radioButtonsContainer2 = {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "430px",
            height: "550px",
            alignItems: "center",
            maxHeight: "550px",
            overflow: "auto"
          };
          var settingsNames = [];
          var mic_ID = loadedMicroscope.ID;
          Object.keys(settings).forEach(function (key) {
            var sett = settings[key];
            var sett_ID = sett.InstrumentID;

            if (sett_ID === mic_ID) {
              settingsNames.push(key);
            }
          }); //let settingKeys = Object.keys(settingsNames);
          // let defaultManu = isDefined(selectedManu)
          // 	? manufacturers.indexOf(selectedManu)
          // 	: 0;

          var settingRadios = [];

          for (var _i7 = 0; _i7 < settingsNames.length; _i7++) {
            var _fullSettName = settingsNames[_i7]; // let lastIndexBeforeID = fullSettName.lastIndexOf("_") + 1;
            // let settName = fullSettName.substring(0, lastIndexBeforeID);
            // let settID = fullSettName.substring(lastIndexBeforeID);
            // let settLabel = settName + "\n" + settID;

            settingRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              id: "rmo-radio-" + _i7,
              key: "rmo-radio-" + _i7,
              value: _fullSettName,
              variant: "outline-primary",
              style: buttonStyleWide
            }, /*#__PURE__*/_react.default.createElement("div", {
              style: {
                fontSize: "0.8em",
                wordBreak: "break-word",
                whiteSpace: "break-spaces"
              }
            }, _fullSettName)));
          }

          if (settingRadios.length === 0) {
            settingRadios.push( /*#__PURE__*/_react.default.createElement("p", {
              style: {
                wordBreak: "break-word",
                whiteSpace: "break-spaces"
              },
              key: "no-setting"
            }, "No Setting matching selected\\nMicroscope ID have been found"));
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
              value: settFilename,
              onChange: function onChange(e) {
                _this3.onClickSettingSelection(e);
              },
              vertical: true
            }, settingRadios)
          });

          list.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "radio-setting-container",
            id: "radio-setting-container",
            style: _radioButtonsContainer2
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "select-setting"
          }, "Select Settings file"), settingRadio));
        }
      }

      var continue_tooltip = _constants.createSettings_mode_continue_tooltip;
      var buttons = [];
      var backDisabled = false;

      if (step === 1) {
        backDisabled = true;
      }

      var backImg = url.resolve(this.props.imagesPathSVG, _constants.string_back_img);
      var backImgPath = backImg + (backImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: backImgPath,
          alt: backImg,
          style: styleImageIcon
        }), "Back"))
      }));
      var forwardImg = url.resolve(this.props.imagesPathSVG, _constants.string_next_img);
      var forwardImgPath = forwardImg + (forwardImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
            alignItems: "center" //gap: "10px",

          }
        }, continueLabel, /*#__PURE__*/_react.default.createElement("img", {
          src: forwardImgPath,
          alt: forwardImg,
          style: styleImageIcon
        })))
      }));
      var logoImg = url.resolve(this.props.imagesPathPNG, _constants.string_logo_img_no_bk);
      var logoPath = logoImg + (logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var homeImg = url.resolve(this.props.imagesPathSVG, _constants.string_home_img);
      var homeImgPath = homeImg + (homeImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var buttText = "Home";

      var homeButton = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-0",
        position: "top",
        title: _constants.home_tooltip.title,
        content: _constants.home_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-0",
          onClick: function onClick() {
            return _this3.props.onClickHome(buttText);
          },
          style: styleButton,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: homeImgPath,
          alt: homeImg,
          style: styleImageIconHome
        }), buttText))
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        style: wrapperContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: mainContainer
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
      }, homeButton, /*#__PURE__*/_react.default.createElement("div", {
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