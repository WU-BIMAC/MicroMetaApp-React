"use strict";

var _interopRequireDefault = require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _react = _interopRequireDefault(require("react"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/dataLoader.js";

var DataLoader = function (_React$PureComponent) {
  (0, _inherits2.default)(DataLoader, _React$PureComponent);

  function DataLoader(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DataLoader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DataLoader).call(this, props));
    _this.state = {
      isLoadingSchema: false,
      isLoadingMicroscopes: false,
      isSchemaLoaded: false,
      isMicroscopesLoaded: false
    };
    _this.simulateClickLoadSchema = _this.simulateClickLoadSchema.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickLoadSchema = _this.onClickLoadSchema.bind((0, _assertThisInitialized2.default)(_this));
    _this.simulateClickLoadMicroscopes = _this.simulateClickLoadMicroscopes.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClickLoadMicroscopes = _this.onClickLoadMicroscopes.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(DataLoader, [{
    key: "onClickLoadSchema",
    value: function onClickLoadSchema() {
      var _this2 = this;

      this.setState({
        isLoadingSchema: true
      }, function () {
        _this2.props.onClickLoadSchema().then(function () {
          _this2.setState({
            isLoadingSchema: false,
            isSchemaLoaded: true
          });
        });
      });
    }
  }, {
    key: "onClickLoadMicroscopes",
    value: function onClickLoadMicroscopes() {
      var _this3 = this;

      this.setState({
        isLoadingMicroscopes: true
      }, function () {
        _this3.props.onClickLoadMicroscopes().then(function () {
          _this3.setState({
            isLoadingMicroscopes: false,
            isMicroscopesLoaded: true
          });
        });
      });
    }
  }, {
    key: "simulateClickLoadSchema",
    value: function simulateClickLoadSchema(loadSchemaButtonRef) {
      if (loadSchemaButtonRef === null) return;
      loadSchemaButtonRef.click();
    }
  }, {
    key: "simulateClickLoadMicroscopes",
    value: function simulateClickLoadMicroscopes(loadMicroscopesButtonRef) {
      if (loadMicroscopesButtonRef === null) return;
      loadMicroscopesButtonRef.click();
    }
  }, {
    key: "render",
    value: function render() {
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
      var isLoadingSchema = this.state.isLoadingSchema;
      var isLoadingMicroscopes = this.state.isLoadingMicroscopes;
      var isSchemaLoaded = this.state.isSchemaLoaded;
      var isMicroscopesLoaded = this.state.isMicroscopesLoaded;
      return _react.default.createElement("div", {
        style: windowExternalContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, _react.default.createElement("div", {
        style: windowInternalContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      }, _react.default.createElement(_Button.default, {
        ref: this.simulateClickLoadSchema,
        disabled: isLoadingSchema || isSchemaLoaded,
        onClick: !isLoadingSchema && !isSchemaLoaded ? this.onClickLoadSchema : null,
        style: buttonStyle,
        size: "lg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, isLoadingSchema ? "Loading schema" : isSchemaLoaded ? "Schema loaded" : "Load schema"), _react.default.createElement(_Button.default, {
        ref: this.simulateClickLoadMicroscopes,
        disabled: isLoadingMicroscopes || isMicroscopesLoaded,
        onClick: !isLoadingMicroscopes && !isMicroscopesLoaded ? this.onClickLoadMicroscopes : null,
        style: buttonStyle,
        size: "lg",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, isLoadingMicroscopes ? "Loading microscopes" : isMicroscopesLoaded ? "Microscopes loaded" : "Load microscopes")));
    }
  }]);
  return DataLoader;
}(_react.default.PureComponent);

exports.default = DataLoader;