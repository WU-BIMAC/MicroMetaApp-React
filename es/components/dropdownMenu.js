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

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/dropdownMenu.js";

var DropdownMenu = function (_React$PureComponent) {
  (0, _inherits2.default)(DropdownMenu, _React$PureComponent);

  function DropdownMenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DropdownMenu);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DropdownMenu).call(this, props));
    _this.state = {
      inputData: props.inputData,
      title: props.title,
      currentTitle: "".concat(props.title, " ").concat(props.inputData[_this.props.defaultValue || 0])
    };
    _this.handleMenuItemClick = _this.handleMenuItemClick.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(DropdownMenu, [{
    key: "handleMenuItemClick",
    value: function handleMenuItemClick(e) {
      var item = e.target.id;
      var currentTitle = "".concat(this.state.title, " ").concat(item);
      this.props.handleMenuItemClick(item);
      this.setState({
        currentTitle: currentTitle
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputData = this.state.inputData;
      var width = this.props.width || 250;
      var margin = this.props.margin || 0;
      var direction = "down" || this.props.direction;
      var dropdownItems = inputData.map(function (item) {
        return _react.default.createElement(_Dropdown.default.Item, {
          key: item,
          onClick: _this2.handleMenuItemClick,
          id: item,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          },
          __self: this
        }, item);
      });
      var dropdownStyle = {
        width: "".concat(width, "px"),
        height: "50px",
        margin: "".concat(margin, "px")
      };
      var dropdownMenuStyle = {
        overflow: "auto",
        maxHeight: "100px",
        maxWidth: "".concat(width, "px"),
        width: "".concat(width, "px")
      };
      return _react.default.createElement(_Dropdown.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      }, _react.default.createElement(_Dropdown.default.Toggle, {
        id: "dropdown-basic-button",
        style: dropdownStyle,
        size: "lg",
        drop: direction,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }, this.state.currentTitle), _react.default.createElement(_Dropdown.default.Menu, {
        style: dropdownMenuStyle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, dropdownItems));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var oldInputData = state.inputData;
      var newInputData = props.inputData;

      if (newInputData !== null && newInputData !== undefined) {
        if (oldInputData === null || oldInputData === undefined || oldInputData !== newInputData) {
          var newCurrent = "".concat(props.title, " ").concat(newInputData[props.defaultValue || 0]);
          return {
            inputData: newInputData,
            currentTitle: newCurrent
          };
        }
      }

      return null;
    }
  }]);
  return DropdownMenu;
}(_react.default.PureComponent);

exports.default = DropdownMenu;
DropdownMenu.defaultProps = {
  inputData: ["1"],
  title: "Dropdown Menu"
};