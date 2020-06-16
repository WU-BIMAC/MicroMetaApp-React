"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonToolbar = _interopRequireDefault(require("react-bootstrap/ButtonToolbar"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataLoader extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingSchema: false,
      isLoadingMicroscopes: false,
      isLoadingDimensions: false,
      isSchemaLoaded: false,
      isMicroscopesLoaded: false,
      isDimensionsLoaded: false
    };
    this.simulateClickLoadSchema = this.simulateClickLoadSchema.bind(this);
    this.onClickLoadSchema = this.onClickLoadSchema.bind(this);
    this.simulateClickLoadMicroscopes = this.simulateClickLoadMicroscopes.bind(this);
    this.onClickLoadMicroscopes = this.onClickLoadMicroscopes.bind(this);
    this.simulateClickLoadDimensions = this.simulateClickLoadDimensions.bind(this);
    this.onClickLoadDimensions = this.onClickLoadDimensions.bind(this);
  }

  onClickLoadDimensions() {
    this.setState({
      isLoadingDimensions: true
    }, () => {
      this.props.onClickLoadDimensions().then(() => {
        this.setState({
          isLoadingDimensions: false,
          isDimensionsLoaded: true
        });
      });
    });
  }

  onClickLoadSchema() {
    this.setState({
      isLoadingSchema: true
    }, () => {
      this.props.onClickLoadSchema().then(() => {
        this.setState({
          isLoadingSchema: false,
          isSchemaLoaded: true
        });
      });
    });
  }

  onClickLoadMicroscopes() {
    this.setState({
      isLoadingMicroscopes: true
    }, () => {
      this.props.onClickLoadMicroscopes().then(() => {
        this.setState({
          isLoadingMicroscopes: false,
          isMicroscopesLoaded: true
        });
      });
    });
  }

  simulateClickLoadDimensions(loadDimensionsButtonRef) {
    if (loadDimensionsButtonRef === null) return;
    loadDimensionsButtonRef.click();
  }

  simulateClickLoadSchema(loadSchemaButtonRef) {
    if (loadSchemaButtonRef === null) return;
    loadSchemaButtonRef.click();
  }

  simulateClickLoadMicroscopes(loadMicroscopesButtonRef) {
    if (loadMicroscopesButtonRef === null) return;
    loadMicroscopesButtonRef.click();
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
    let styleImageContainer = {
      width: "".concat(_constants.number_logo_width, "px"),
      height: "".concat(_constants.number_logo_height, "px")
    };
    let styleImage = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    let isLoadingSchema = this.state.isLoadingSchema;
    let isLoadingMicroscopes = this.state.isLoadingMicroscopes;
    let isSchemaLoaded = this.state.isSchemaLoaded;
    let isMicroscopesLoaded = this.state.isMicroscopesLoaded;
    let isLoadingDimensions = this.state.isLoadingDimensions;
    let isDimensionsLoaded = this.state.isDimensionsLoaded;
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
    })), /*#__PURE__*/_react.default.createElement(_Button.default, {
      ref: this.simulateClickLoadSchema,
      disabled: isLoadingSchema || isSchemaLoaded,
      onClick: !isLoadingSchema && !isSchemaLoaded ? this.onClickLoadSchema : null,
      style: buttonStyle,
      size: "lg"
    }, isLoadingSchema ? "Loading schema" : isSchemaLoaded ? "Schema loaded" : "Load schema"), /*#__PURE__*/_react.default.createElement(_Button.default, {
      ref: this.simulateClickLoadDimensions,
      disabled: isLoadingDimensions || isDimensionsLoaded,
      onClick: !isLoadingDimensions && !isDimensionsLoaded ? this.onClickLoadDimensions : null,
      style: buttonStyle,
      size: "lg"
    }, isLoadingDimensions ? "Loading dimensions" : isDimensionsLoaded ? "Dimensions loaded" : "Load dimensions"), /*#__PURE__*/_react.default.createElement(_Button.default, {
      ref: this.simulateClickLoadMicroscopes,
      disabled: isLoadingMicroscopes || isMicroscopesLoaded,
      onClick: !isLoadingMicroscopes && !isMicroscopesLoaded ? this.onClickLoadMicroscopes : null,
      style: buttonStyle,
      size: "lg"
    }, isLoadingMicroscopes ? "Loading microscopes" : isMicroscopesLoaded ? "Microscopes loaded" : "Load microscopes")));
  }

}

exports.default = DataLoader;