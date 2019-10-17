"use strict";

var _interopRequireDefault = require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _jsxFileName = "/Users/kontost1/CODE/DivisionByZeroProjects/git/4DNMicroscopyMetadataToolReact/src/components/microscopeLoader.js";

var MicroscopeLoader = function (_React$PureComponent) {
  (0, _inherits2.default)(MicroscopeLoader, _React$PureComponent);

  function MicroscopeLoader(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MicroscopeLoader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MicroscopeLoader).call(this, props));
    _this.state = {
      fileLoaded: false,
      fileLoading: false,
      selectedManu: null,
      micNames: null
    };
    _this.dropzoneDropAccepted = _this.dropzoneDropAccepted.bind((0, _assertThisInitialized2.default)(_this));
    _this.dropzoneDropRejected = _this.dropzoneDropRejected.bind((0, _assertThisInitialized2.default)(_this));
    _this.dropzoneDrop = _this.dropzoneDrop.bind((0, _assertThisInitialized2.default)(_this));
    _this.dropzoneDialogOpen = _this.dropzoneDialogOpen.bind((0, _assertThisInitialized2.default)(_this));
    _this.dropzoneDialogCancel = _this.dropzoneDialogCancel.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFileReaderAbort = _this.onFileReaderAbort.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFileReaderError = _this.onFileReaderError.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFileReaderLoad = _this.onFileReaderLoad.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickManufacturerSelection = _this.onClickManufacturerSelection.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(MicroscopeLoader, [{
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
      var microscope = JSON.parse(binaryStr);
      this.props.onFileDrop(microscope);
      this.setState({
        fileLoaded: true
      });
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
    value: function dropzoneDropRejected() {
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
        return reader.readAsBinaryString(file);
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
      var windowExternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var windowInternalContainer = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var width = 410;
      var margin = 5;
      var inputData = this.props.microscopes;
      var dropzoneStyle = {
        borderStyle: "dashed",
        borderWidth: "thin",
        width: "".concat(width, "px")
      };
      var loadingMode = this.props.loadingMode;
      var fileLoading = this.state.fileLoading;
      var fileLoaded = this.state.fileLoaded;
      var selectedManu = this.state.selectedManu;
      var isDropzoneActive = false;
      if (loadingMode === 1) isDropzoneActive = true;
      var list = [];
      list.push(_react.default.createElement(_DropdownMenu.default, {
        key: "dropdown-loadingOption",
        title: "",
        handleMenuItemClick: this.props.onClickLoadingOptionSelection,
        defaultValue: this.props.loadingOptions.indexOf(this.props.loadingOption),
        inputData: this.props.loadingOptions,
        width: width,
        margin: margin,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      }));

      if (loadingMode === 1) {
        list.push(_react.default.createElement(_reactDropzone.default, {
          key: "dropzone",
          onFileDialogCancel: this.dropzoneDialogCancel,
          onDrop: this.dropzoneDrop,
          onDropAccepted: this.dropzoneDropAccepted,
          onDropRejected: this.dropzoneDropRejected,
          accept: ".json",
          multiple: false,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 155
          },
          __self: this
        }, function (_ref) {
          var getRootProps = _ref.getRootProps,
              getInputProps = _ref.getInputProps;
          return _react.default.createElement("section", {
            style: dropzoneStyle,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 165
            },
            __self: this
          }, _react.default.createElement("div", Object.assign({}, getRootProps(), {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 166
            },
            __self: this
          }), _react.default.createElement("input", Object.assign({}, getInputProps({
            onClick: _this2.dropzoneDialogOpen
          }), {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 167
            },
            __self: this
          })), _react.default.createElement("p", {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 170
            },
            __self: this
          }, "Drag 'n' drop some files here, or click to select files")));
        }));
      }

      if (loadingMode === 2) {
        list.push(_react.default.createElement(_DropdownMenu.default, {
          key: "dropdown-manufacturers",
          title: "",
          handleMenuItemClick: this.onClickManufacturerSelection,
          inputData: Object.keys(inputData),
          width: width,
          margin: margin,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 180
          },
          __self: this
        }));

        if (selectedManu !== null && selectedManu !== undefined) {
          console.log(this.state.micNames);
          list.push(_react.default.createElement(_DropdownMenu.default, {
            key: "dropdown-names",
            title: "",
            handleMenuItemClick: this.props.onClickMicroscopeSelection,
            inputData: this.state.micNames,
            width: width,
            margin: margin,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 198
            },
            __self: this
          }));
        }
      }

      list.push(_react.default.createElement("div", {
        key: "buttons",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 210
        },
        __self: this
      }, _react.default.createElement(_Button.default, {
        onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
        style: buttonStyle,
        size: "lg",
        disabled: isDropzoneActive && (!fileLoaded || fileLoading),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 211
        },
        __self: this
      }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Confirm"), _react.default.createElement(_Button.default, {
        onClick: this.props.onClickBack,
        style: buttonStyle,
        size: "lg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 228
        },
        __self: this
      }, "Back")));
      return _react.default.createElement("div", {
        style: windowExternalContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      }, _react.default.createElement("div", {
        style: windowInternalContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236
        },
        __self: this
      }, list));
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
}(_react.default.PureComponent);

exports.default = MicroscopeLoader;