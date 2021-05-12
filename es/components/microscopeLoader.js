function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";
import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";
import { validateMicroscope } from "../genericUtilities";
import { string_json_ext, number_logo_width, number_logo_height, create_mode_selector_tooltip, create_mode_selector_settings_tooltip, create_from_file_tooltip, create_from_repo_manufacturer_tooltip, create_from_repo_names_tooltip, create_mode_continue_tooltip, create_mode_continue_settings_tooltip, back_tooltip } from "../constants";

var url = require("url");

var MicroscopeLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroscopeLoader, _React$PureComponent);

  var _super = _createSuper(MicroscopeLoader);

  function MicroscopeLoader(props) {
    var _this;

    _classCallCheck(this, MicroscopeLoader);

    _this = _super.call(this, props);
    _this.state = {
      fileLoaded: false,
      fileLoading: false,
      selectedManu: null,
      selectedMic: null,
      micNames: null
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
    return _this;
  }

  _createClass(MicroscopeLoader, [{
    key: "onFileReaderAbort",
    value: function onFileReaderAbort() {
      this.setState({
        fileLoaded: false
      });
    }
  }, {
    key: "onFileReaderError",
    value: function onFileReaderError() {
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

        if (validateMicroscope(microscope, this.props.schema, true)) {
          this.props.onFileDrop(microscope);
          this.setState({
            fileLoaded: true
          });
        } else {
          errorMsg = "The file you are trying to load does not contain a proper MicroMetaApp Microscope";
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
      var fileRejectedNames = "";
      rejectedFiles.forEach(function (rejected) {
        fileRejectedNames += rejected.file.name + "\n";
      });
      window.alert("The following file you tried to load is not a json file:\n" + fileRejectedNames);
      this.setState({
        fileLoading: false,
        fileLoaded: false
      });
    }
  }, {
    key: "dropzoneDropAccepted",
    value: function dropzoneDropAccepted(acceptedFiles) {
      var reader = new FileReader();
      reader.onabort = this.onFileReaderAbort;
      reader.onerror = this.onFileReaderError;
      reader.onload = this.onFileReaderLoad;
      acceptedFiles.forEach(function (file) {
        return reader.readAsText(file);
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
        fileLoaded: false
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
      var micNames = this.props.microscopes[item];
      this.setState({
        selectedManu: item,
        micNames: micNames
      });
      this.props.onClickMicroscopeSelection(this.props.microscopes[item][0]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var buttonStyle = {
        width: "200px",
        height: "50px",
        padding: "5px",
        margin: "5px"
      };
      var width = 410;
      var margin = 5;
      var inputData = this.props.microscopes;
      var dropzoneStyle = {
        borderStyle: "dashed",
        borderWidth: "thin",
        width: "".concat(width, "px")
      };
      var styleImageContainer = {
        width: "".concat(number_logo_width, "px"),
        height: "".concat(number_logo_height, "px")
      };
      var styleImageBk = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var loadingMode = this.props.loadingMode;
      var fileLoading = this.state.fileLoading;
      var fileLoaded = this.state.fileLoaded;
      var selectedManu = this.state.selectedManu;
      var isDropzoneActive = false;
      if (loadingMode === 1) isDropzoneActive = true;
      var create_mode_tooltip = null;
      var titleText = null;

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

      var list = [];
      list.push( /*#__PURE__*/React.createElement(DropdownMenu, {
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
        list.push( /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "dropzone-tooltip",
          position: create_from_file_tooltip.position,
          title: create_from_file_tooltip.title,
          content: create_from_file_tooltip.content,
          element: /*#__PURE__*/React.createElement(Dropzone, {
            key: "dropzone",
            onFileDialogCancel: this.dropzoneDialogCancel,
            onDrop: this.dropzoneDrop,
            onDropAccepted: this.dropzoneDropAccepted,
            onDropRejected: this.dropzoneDropRejected,
            accept: string_json_ext,
            multiple: false
          }, function (_ref) {
            var getRootProps = _ref.getRootProps,
                getInputProps = _ref.getInputProps;
            return /*#__PURE__*/React.createElement("section", {
              style: dropzoneStyle
            }, /*#__PURE__*/React.createElement("div", getRootProps(), /*#__PURE__*/React.createElement("input", getInputProps({
              onClick: _this2.dropzoneDialogOpen
            })), /*#__PURE__*/React.createElement("p", null, "Select an existing Microscope file you want to work on.")));
          })
        }));
      }

      if (loadingMode === 2) {
        var manufacturers = Object.keys(inputData);
        var defaultManu = selectedManu !== null && selectedManu !== undefined ? manufacturers.indexOf(selectedManu) : 0;
        list.push( /*#__PURE__*/React.createElement(DropdownMenu, {
          key: "dropdown-manufacturers",
          title: "",
          handleMenuItemClick: this.onClickManufacturerSelection,
          inputData: manufacturers,
          defaultValue: defaultManu,
          width: width,
          margin: margin,
          tooltip: create_from_repo_manufacturer_tooltip
        }));

        if (selectedManu !== null && selectedManu !== undefined) {
          var selectedMic = this.state.selectedMic;
          var defaultMic = selectedMic !== null && selectedMic !== undefined ? inputData[selectedManu].indexOf(selectedMic) : 0; //console.log(this.state.micNames);

          list.push( /*#__PURE__*/React.createElement(DropdownMenu, {
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

      var continue_tooltip = null;

      if (this.props.isSettings) {
        continue_tooltip = create_mode_continue_settings_tooltip;
      } else {
        continue_tooltip = create_mode_continue_tooltip;
      }

      var backImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_back_img);
      var backImgPath = backImgPath_tmp + (backImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      list.push( /*#__PURE__*/_react.default.createElement("div", {
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
            alignItems: "center" //gap: "10px",

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
        element: /*#__PURE__*/React.createElement(Button, {
          onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
          style: buttonStyle,
          size: "lg",
          disabled: isDropzoneActive && (!fileLoaded || fileLoading)
        }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Continue")
      })));
      var logoPath = this.props.logoImg + (this.props.logoImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/React.createElement("img", {
        src: logoPath,
        alt: this.props.logoImg,
        style: {
          width: "100%",
          height: "100%",
          margin: "auto"
        },
        onLoad: this.onImgLoad
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          textAlign: "center",
          fontWeight: "bold"
        }
      }, titleText), list));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.loadingMode === 2) {
        if (props.microscopes !== null && props.microscopes !== undefined) {
          if (state.selectedManu === null) {
            var selectedManu = Object.keys(props.microscopes)[0];
            var micNames = props.microscopes[selectedManu];
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
  }]);

  return MicroscopeLoader;
}(React.PureComponent);

export { MicroscopeLoader as default };