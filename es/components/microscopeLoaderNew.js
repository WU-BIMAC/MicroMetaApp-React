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
    _this.handleCreateOrLoadRadioChange = _this.handleCreateOrLoadRadioChange.bind(_assertThisInitialized(_this));
    _this.handleStepRadioChange = _this.handleStepRadioChange.bind(_assertThisInitialized(_this));
    _this.onClickConfirm = _this.onClickConfirm.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MicroscopeLoader, [{
    key: "onFileReaderAbort",
    value: function onFileReaderAbort(e) {
      this.setState({
        fileLoaded: false
      });
    }
  }, {
    key: "onFileReaderError",
    value: function onFileReaderError(e) {
      this.setState({
        fileLoaded: false
      });
    }
  }, {
    key: "onFileReaderLoad",
    value: function onFileReaderLoad(e) {
      var binaryStr = e.target.result;
      var microscope = null;
      var errorMsg = null;

      try {
        microscope = JSON.parse(binaryStr);

        if ((0, _genericUtilities.validateMicroscope)(microscope, this.props.schema, true)) {
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
      }
    }
  }, {
    key: "dropzoneDrop",
    value: function dropzoneDrop() {
      this.setState({
        fileLoading: true,
        fileLoaded: false
      });
    }
  }, {
    key: "dropzoneDropRejected",
    value: function dropzoneDropRejected(rejectedFiles) {
      var _this2 = this;

      // let fileRejectedNames = "";
      rejectedFiles.forEach(function (rejected) {
        _this2.setState({
          filename: rejected.file.name
        });
      });
      var errorMsg = "The file you tried to load is not a json file";
      this.setState({
        fileLoading: false,
        fileLoaded: false,
        errorMsg: errorMsg
      });
    }
  }, {
    key: "dropzoneDropAccepted",
    value: function dropzoneDropAccepted(acceptedFiles) {
      var _this3 = this;

      var reader = new FileReader();
      reader.onabort = this.onFileReaderAbort;
      reader.onerror = this.onFileReaderError;
      reader.onload = this.onFileReaderLoad;
      acceptedFiles.forEach(function (file) {
        _this3.setState({
          filename: file.name
        });

        reader.readAsText(file);
      });
      this.setState({
        fileLoading: false
      });
    }
  }, {
    key: "dropzoneDialogOpen",
    value: function dropzoneDialogOpen() {
      this.setState({
        fileLoading: true,
        fileLoaded: false,
        errorMsg: null,
        filename: null,
        loadedMicroscope: null
      });
    }
  }, {
    key: "dropzoneDialogCancel",
    value: function dropzoneDialogCancel() {
      this.setState({
        fileLoading: false,
        fileLoaded: false
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
        filename: item
      });
    }
  }, {
    key: "handleCreateOrLoadRadioChange",
    value: function handleCreateOrLoadRadioChange(item) {
      console.log("handleCreateOrLoadRadioChange - " + item);

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
  }, {
    key: "handleStepRadioChange",
    value: function handleStepRadioChange(item) {
      //console.log("handleStepRadioChange " + item);
      this.setState({
        step: item
      });
    }
  }, {
    key: "onClickConfirm",
    value: function onClickConfirm() {
      var modeSelection = this.state.modeSelection;
      var filename = null;
      var microscope = null;

      if (modeSelection === _constants.string_loadFromRepository || modeSelection === _constants.string_loadFromHomeFolder) {
        filename = this.state.filename;
      } else if (modeSelection === _constants.string_createFromFile) {
        microscope = this.state.loadedMicroscope;
      }

      this.props.onClickConfirm(modeSelection, filename, microscope);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var buttonStyleWideNoMarginSelected = {
        width: "500px",
        height: "100px"
      };
      var buttonStyleWideNoMargin = {
        width: "250px",
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
        height: "50px",
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
      var windowMainContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "750px",
        alignItems: "center"
      };
      var windowStepContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "100px",
        alignItems: "center",
        alignContent: "stretch"
      };
      var windowButtonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "550px",
        alignItems: "center"
      };
      var windowLogoContainer = {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var windowBottomButtonsContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        width: "100%",
        height: "50px",
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
        alignItems: "flex-start",
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
      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleImageBk = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var step = this.state.step;
      var inputData = this.props.microscopes;
      var errorMsg = this.state.errorMsg;
      var fileLoading = this.state.fileLoading;
      var fileLoaded = this.state.fileLoaded;
      var filename = this.state.filename;
      var loadedMicroscope = this.state.loadedMicroscope;
      var selectedManu = this.state.selectedManu;
      var selectedMic = this.state.selectedMic;
      var loadingOptions = this.props.loadingOptions;
      var creatingOptions = this.props.creatingOptions;
      var modeSelection = this.state.modeSelection; // let isDropzoneActive = false;
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

      var styleText_1 = {
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
        textAlign: "left"
      };
      var styleText_2 = {
        fontSize: "0.8em",
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
        textAlign: "left"
      };
      var styleText_3 = {
        fontSize: "0.5em",
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
        textAlign: "left"
      };
      var step1Disabled = false; //let step2Disabled = false;

      var variant_1 = "outline-primary"; //let variant_2 = "outline-primary";
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

      var step1SubText = "";

      if (modeSelection !== null) {
        step1SubText = modeSelection;
      }

      if (filename !== null) {
        step1SubText += "\n" + filename;
      }

      var step1Text = /*#__PURE__*/_react.default.createElement("div", {
        style: buttonsInnerTextContainer
      }, /*#__PURE__*/_react.default.createElement("h5", {
        style: styleText_1
      }, "1 - Microscope information"), /*#__PURE__*/_react.default.createElement("p", {
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
        }, "1 - Microscope information"), /*#__PURE__*/_react.default.createElement("p", {
          style: styleText_2
        }, step1SubText));
      } // else {
      // 	step2Text = (
      // 		<div style={buttonsInnerTextContainer}>
      // 			<h4 style={styleText_1}>2 - Select Microscope</h4>
      // 			<p style={styleText_2}>{filename !== null ? filename : ""}</p>
      // 		</div>
      // 	);
      // }


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
        disabled: step1Disabled,
        variant: variant_1,
        style: step === 1 ? buttonStyleWideNoMarginSelected : buttonStyleWideNoMargin
      }, step1Text));

      var list = [];
      var createRadios = [];

      var _loop = function _loop(i) {
        var creatingOption = creatingOptions[i];
        var tooltip = _constants.microscope_loader_scratch_inverted;

        if (creatingOption.includes("Upright")) {
          tooltip = _constants.microscope_loader_scratch_upright;
        }

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
              return _this4.handleCreateOrLoadRadioChange(creatingOption);
            },
            checked: creatingOption === modeSelection,
            style: buttonStyleWide,
            size: "lg",
            variant: "outline-primary"
          }, creatingOption)
        }));
      };

      for (var i = 0; i < creatingOptions.length; i++) {
        _loop(i);
      }

      if (step === 1) {
        var loadRadios = [];

        var _loop2 = function _loop2(_i) {
          var loadingOption = loadingOptions[_i];
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
                return _this4.handleCreateOrLoadRadioChange(loadingOption);
              },
              checked: loadingOption === modeSelection,
              style: buttonStyleWide,
              size: "lg",
              variant: "outline-primary"
            }, loadingOption)
          }));
        };

        for (var _i = 0; _i < loadingOptions.length; _i++) {
          _loop2(_i);
        }

        var toggles = [];
        toggles.push( /*#__PURE__*/_react.default.createElement("h4", {
          key: "create-options"
        }, "Create options"));
        toggles.push(createRadios);
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
        }, toggles)); //TODO upload zone

        if (modeSelection === _constants.string_createFromFile) {
          var text = /*#__PURE__*/_react.default.createElement("p", {
            style: styleCenterText
          }, "Click or drag a file here to load an existing Microscope file you want to work on.");

          if (fileLoaded) {
            styleDropzone.borderColor = "green";
            text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, filename), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, "Click or drag a file here to replace the currently loaded file"));
          } else if (errorMsg !== null) {
            text = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, filename), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, errorMsg), /*#__PURE__*/_react.default.createElement("p", {
              style: styleCenterText
            }, "Click or drag a file here to replace the currently loaded file"));
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
                onClick: _this4.dropzoneDialogOpen
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
        } else if (modeSelection === _constants.string_loadFromRepository || modeSelection === _constants.string_loadFromHomeFolder) {
          //windowButtonsContainer.flexFlow = "row";
          var windowRadioButtonsContainer = {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "430px",
            height: "550px",
            alignItems: "flex-start",
            maxHeight: "550px",
            overflow: "auto"
          };
          var manufacturers = Object.keys(inputData); // let defaultManu = isDefined(selectedManu)
          // 	? manufacturers.indexOf(selectedManu)
          // 	: 0;

          var manufacturerRadios = [];

          for (var _i2 = 0; _i2 < manufacturers.length; _i2++) {
            manufacturerRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
              id: "rmo-radio-" + _i2,
              key: "rmo-radio-" + _i2,
              value: manufacturers[_i2],
              variant: "outline-primary",
              style: buttonStyleWide
            }, manufacturers[_i2]));
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
                _this4.onClickManufacturerSelection(e);
              },
              vertical: true
            }, manufacturerRadios)
          });

          list.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "radio-manufactorer-container",
            id: "radio-manufactorer-container",
            style: windowRadioButtonsContainer
          }, /*#__PURE__*/_react.default.createElement("h4", {
            key: "select-manufacturer"
          }, "Select Manufacturer"), manufacturerRadio));

          if ((0, _genericUtilities.isDefined)(selectedManu)) {
            // let defaultMic = isDefined(selectedMic)
            // 	? inputData[selectedManu].indexOf(selectedMic)
            // 	: 0;
            var microscopes = inputData[selectedManu];
            var microscopeRadios = [];

            for (var _i3 = 0; _i3 < microscopes.length; _i3++) {
              microscopeRadios.push( /*#__PURE__*/_react.default.createElement(_ToggleButton.default, {
                id: "rmico-radio-" + _i3,
                key: "rmico-radio-" + _i3,
                value: microscopes[_i3],
                variant: "outline-primary",
                style: buttonStyleWide
              }, /*#__PURE__*/_react.default.createElement("div", {
                style: {
                  fontSize: "0.8em"
                }
              }, microscopes[_i3])));
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
                value: filename,
                onChange: function onChange(e) {
                  _this4.onClickMicroscopeSelection(e);
                },
                vertical: true
              }, microscopeRadios)
            });

            list.push( /*#__PURE__*/_react.default.createElement("div", {
              key: "radio-microscope-options",
              id: "radio-microscope-options",
              style: windowRadioButtonsContainer
            }, /*#__PURE__*/_react.default.createElement("h4", {
              key: "select-microscope"
            }, "Select Microscope"), microscopeRadio));
          }
        }
      }

      var continue_tooltip = _constants.create_mode_continue_tooltip;
      var buttons = []; // buttons.push(
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

      var disabled = false;
      if (modeSelection === _constants.string_createFromFile && (!fileLoaded || loadedMicroscope === null)) disabled = true;else if (modeSelection === _constants.string_loadFromRepository || modeSelection === _constants.string_loadFromHomeFolder && filename === null) disabled = true;
      buttons.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "button-continue",
        position: continue_tooltip.position,
        title: continue_tooltip.title,
        content: continue_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: !disabled ? this.onClickConfirm : null,
          style: buttonStyle,
          size: "lg",
          disabled: disabled
        }, "Continue")
      }));
      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var backImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_back_img);
      var backImgPath = backImgPath_tmp + (backImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      var backText = "Home";

      var homeButton = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        key: "TooltipButtonLeft-0",
        position: "top",
        title: _constants.back_tooltip.title,
        content: _constants.back_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          key: "ButtonLeft-0",
          onClick: function onClick() {
            return _this4.props.onClickHome(backText);
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
          src: backImgPath,
          alt: backImgPath_tmp,
          style: styleImageBk
        }), backText))
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        style: windowExternalContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: windowMainContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: titleContainer
      }, /*#__PURE__*/_react.default.createElement("h1", null, this.props.title)), /*#__PURE__*/_react.default.createElement("div", {
        style: windowStepContainer
      }, stepRadios), /*#__PURE__*/_react.default.createElement("div", {
        style: windowButtonsContainer
      }, list), /*#__PURE__*/_react.default.createElement("div", {
        style: windowBottomButtonsContainer
      }, buttons)), /*#__PURE__*/_react.default.createElement("div", {
        style: windowLogoContainer
      }, homeButton, /*#__PURE__*/_react.default.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: styleImage
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return null;
    }
  }]);

  return MicroscopeLoader;
}(_react.default.PureComponent);

exports.default = MicroscopeLoader;