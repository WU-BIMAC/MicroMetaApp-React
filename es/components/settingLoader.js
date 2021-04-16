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
import { validateAcquisitionSettings } from "../genericUtilities";
import { string_json_ext, number_logo_width, number_logo_height, createSettings_mode_selector_tooltip, createSettings_from_file_tooltip, createSettings_from_repo_names_tooltip, createSettings_mode_continue_tooltip, back_tooltip } from "../constants";

var SettingLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(SettingLoader, _React$PureComponent);

  var _super = _createSuper(SettingLoader);

  function SettingLoader(props) {
    var _this;

    _classCallCheck(this, SettingLoader);

    _this = _super.call(this, props);
    _this.state = {
      fileLoaded: false,
      fileLoading: false,
      //selectedManu: null,
      selectedSettings: null //settingsNames: null,

    };
    _this.dropzoneDropAccepted = _this.dropzoneDropAccepted.bind(_assertThisInitialized(_this));
    _this.dropzoneDropRejected = _this.dropzoneDropRejected.bind(_assertThisInitialized(_this));
    _this.dropzoneDrop = _this.dropzoneDrop.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogOpen = _this.dropzoneDialogOpen.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogCancel = _this.dropzoneDialogCancel.bind(_assertThisInitialized(_this));
    _this.onFileReaderAbort = _this.onFileReaderAbort.bind(_assertThisInitialized(_this));
    _this.onFileReaderError = _this.onFileReaderError.bind(_assertThisInitialized(_this));
    _this.onFileReaderLoad = _this.onFileReaderLoad.bind(_assertThisInitialized(_this));
    _this.onClickSettingsSelection = _this.onClickSettingsSelection.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SettingLoader, [{
    key: "onClickSettingsSelection",
    value: function onClickSettingsSelection(item) {
      if (item !== null && item !== undefined) {
        this.setState({
          selectedSettings: item
        });
        this.props.onClickSettingsSelection(item);
      }
    }
  }, {
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
      var errorMsg = null;

      try {
        var settings = JSON.parse(binaryStr);

        if (validateAcquisitionSettings(settings, this.props.schema)) {
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
      var inputData = this.props.settings;
      var dropzoneStyle = {
        borderStyle: "dashed",
        borderWidth: "thin",
        width: "".concat(width, "px")
      };
      var styleImageContainer = {
        width: "".concat(number_logo_width, "px"),
        height: "".concat(number_logo_height, "px")
      };
      var loadingMode = this.props.loadingMode;
      var fileLoading = this.state.fileLoading;
      var fileLoaded = this.state.fileLoaded;
      var isDropzoneActive = false;
      if (loadingMode === 1) isDropzoneActive = true;
      var list = [];
      list.push( /*#__PURE__*/React.createElement(DropdownMenu, {
        key: "dropdown-loadingOption",
        title: "",
        handleMenuItemClick: this.props.onClickLoadingOptionSelection,
        defaultValue: this.props.loadingOptions.indexOf(this.props.loadingOption),
        inputData: this.props.loadingOptions,
        width: width,
        margin: margin,
        tooltip: createSettings_mode_selector_tooltip
      }));

      if (loadingMode === 1) {
        list.push( /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "dropzone-tooltip",
          position: createSettings_from_file_tooltip.position,
          title: createSettings_from_file_tooltip.title,
          content: createSettings_from_file_tooltip.content,
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
            })), /*#__PURE__*/React.createElement("p", null, "Select an existing Settings file you want to work on.")));
          })
        }));
      }

      if (loadingMode === 2) {
        var selectedSettings = this.state.selectedSettings;
        var defaultMic = selectedSettings !== null && selectedSettings !== undefined ? inputData.indexOf(selectedSettings) : 0; //console.log(inputData);

        list.push( /*#__PURE__*/React.createElement(DropdownMenu, {
          key: "dropdown-names",
          title: "",
          handleMenuItemClick: this.onClickSettingsSelection,
          inputData: inputData,
          defaultValue: defaultMic,
          width: width,
          margin: margin,
          tooltip: createSettings_from_repo_names_tooltip
        }));
      }

      list.push( /*#__PURE__*/React.createElement("div", {
        key: "buttons"
      }, /*#__PURE__*/React.createElement(PopoverTooltip, {
        position: createSettings_mode_continue_tooltip.position,
        title: createSettings_mode_continue_tooltip.title,
        content: createSettings_mode_continue_tooltip.content,
        element: /*#__PURE__*/React.createElement(Button, {
          onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
          style: buttonStyle,
          size: "lg",
          disabled: isDropzoneActive && (!fileLoaded || fileLoading)
        }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Continue")
      }), /*#__PURE__*/React.createElement(PopoverTooltip, {
        position: back_tooltip.position,
        title: back_tooltip.title,
        content: back_tooltip.content,
        element: /*#__PURE__*/React.createElement(Button, {
          onClick: this.props.onClickBack,
          style: buttonStyle,
          size: "lg"
        }, "Back")
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
      })), list));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.loadingMode === 2) {
        if (props.settings !== null && props.settings !== undefined) {
          if (state.selectedSettings === null || state.selectedSettings === undefined) {
            var selectedSettings = props.settings[0];
            props.onClickSettingsSelection(selectedSettings);
          }

          return null;
        }
      }

      return null;
    }
  }]);

  return SettingLoader;
}(React.PureComponent);

export { SettingLoader as default };