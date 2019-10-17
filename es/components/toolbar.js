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

var _reactCollapsible = _interopRequireDefault(require("react-collapsible"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _imageElement = _interopRequireDefault(require("./imageElement"));

var _jsxFileName = "/Users/alex/ext-projects/4DNMicroscopyMetadataToolReact/src/components/toolbar.js";

var path = require("path");

var Toolbar = function (_React$PureComponent) {
  (0, _inherits2.default)(Toolbar, _React$PureComponent);

  function Toolbar(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Toolbar);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Toolbar).call(this, props));
    _this.state = {
      elementList: {},
      imagesDimension: {}
    };

    for (var i = 0; i < props.componentSchemas.length; i++) {
      var obj = props.componentSchemas[i];
      if (props.activeTier < obj.tier) continue;
      var category = obj.category;
      var element = {
        ID: "".concat(obj.title, "-").concat(i),
        schema: obj
      };

      if (_this.state.elementList[category] === undefined) {
        _this.state.elementList[category] = [];
      }

      _this.state.elementList[category].push(element);
    }

    _this.updatedDimensions = _this.updatedDimensions.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Toolbar, [{
    key: "updatedDimensions",
    value: function updatedDimensions(id, width, height) {
      var newImagesDimension = Object.assign({}, this.state.imagesDimension);

      if (newImagesDimension[id] !== undefined) {
        if (newImagesDimension[id].width >= width || newImagesDimension[id].height >= height) return;
      }

      newImagesDimension[id] = {
        width: width,
        height: height
      };
      this.setState({
        imagesDimension: newImagesDimension
      });
    }
  }, {
    key: "createCategoryItems",
    value: function createCategoryItems(key) {
      var _this2 = this;

      var elementList = this.state.elementList;
      var imageElements = [];
      var imagesDimension = this.state.imagesDimension;
      var stylesContainer = {};
      var stylesImages = {};
      elementList[key].map(function (item) {
        var width = imagesDimension[item.ID] === undefined ? 100 : imagesDimension[item.ID].width;
        var height = imagesDimension[item.ID] === undefined ? 100 : imagesDimension[item.ID].height;
        stylesContainer[item.ID] = {
          width: "".concat(width + 20, "px"),
          height: "".concat(height + 20, "px"),
          padding: "10px"
        };
        stylesImages[item.ID] = {
          width: "".concat(width, "px"),
          height: "".concat(height, "px")
        };
      });
      elementList[key].map(function (item) {
        return imageElements.push(_react.default.createElement(_imageElement.default, {
          key: "ImageElement-".concat(item.ID),
          id: item.ID,
          image: path.join(_this2.props.imagesPath, item.schema.image),
          name: item.schema.title,
          updateDimensions: _this2.updatedDimensions,
          style: stylesImages[item.ID],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          },
          __self: this
        }));
      });
      var categoryItems = [];
      elementList[key].map(function (item, index) {
        return categoryItems.push(_react.default.createElement("div", {
          key: "div" + item.ID,
          style: stylesContainer[item.ID],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          },
          __self: this
        }, _react.default.createElement(_reactDragDropContainer.DragDropContainer, {
          targetKey: "canvas",
          key: "draggable" + item.ID,
          dragClone: true,
          dragData: {
            source: "toolbar",
            ID: item.ID,
            schema_ID: item.schema.ID
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 111
          },
          __self: this
        }, imageElements[index])));
      });
      var styleContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        margin: "5px"
      };
      return _react.default.createElement("div", {
        style: styleContainer,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, categoryItems);
    }
  }, {
    key: "createCategories",
    value: function createCategories() {
      var _this3 = this;

      var style = {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
      };
      var styleTransitionClose = {
        transition: "transform 300ms",
        transform: "rotateZ(0deg)"
      };
      var styleTransitionOpen = {
        transition: "transform 300ms",
        transform: "rotateZ(-90deg)"
      };
      var elementList = this.state.elementList;
      var toolbar = [];
      var names = [];
      Object.keys(elementList).forEach(function (key) {
        var index = key.lastIndexOf(".");
        var simpleKey;
        if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
        names.push(simpleKey);
      });
      names.sort();
      names.forEach(function (name) {
        Object.keys(elementList).forEach(function (key) {
          var index = key.lastIndexOf(".");
          var simpleKey;
          if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
          if (simpleKey !== name) return;
          toolbar.push(_react.default.createElement(_reactCollapsible.default, {
            key: "Collapsible-".concat(key),
            trigger: _react.default.createElement(_Button.default, {
              key: "Trigger".concat(key),
              size: "lg",
              style: style,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 175
              },
              __self: this
            }, _react.default.createElement("div", {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 176
              },
              __self: this
            }, simpleKey), _react.default.createElement("div", {
              style: styleTransitionClose,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 177
              },
              __self: this
            }, "\u25C1")),
            triggerWhenOpen: _react.default.createElement(_Button.default, {
              key: "Trigger".concat(key),
              size: "lg",
              style: style,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 181
              },
              __self: this
            }, _react.default.createElement("div", {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 182
              },
              __self: this
            }, simpleKey), _react.default.createElement("div", {
              style: styleTransitionOpen,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 183
              },
              __self: this
            }, "\u25C1")),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 172
            },
            __self: this
          }, _this3.createCategoryItems(key)));
        });
      });
      return toolbar;
    }
  }, {
    key: "render",
    value: function render() {
      var imagesDimension = this.state.imagesDimension;
      var elementList = this.state.elementList;
      if (imagesDimension.length !== 0 && imagesDimension.length !== elementList.length) return;
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var style = {
        boxSizing: "border-box",
        backgroundColor: "LightGray",
        borderBottom: "2px solid",
        borderTop: "2px solid",
        width: "".concat(width, "px"),
        height: "".concat(height, "px"),
        overflow: "auto",
        textAlign: "center",
        verticalAlign: "middle"
      };
      var toolbar = this.createCategories();
      return _react.default.createElement("div", {
        style: style,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        },
        __self: this
      }, toolbar);
    }
  }]);
  return Toolbar;
}(_react.default.PureComponent);

exports.default = Toolbar;