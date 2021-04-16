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
import Collapsible from "react-collapsible";
import { DragDropContainer } from "react-drag-drop-container";
import Button from "react-bootstrap/Button";
import PopoverTooltip from "./popoverTooltip";
import ImageElement from "./imageElement";

var url = require("url");

import { string_toolbar, string_canvas, hardware_explorer_tooltip, menu_order } from "../constants";

var Toolbar = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Toolbar, _React$PureComponent);

  var _super = _createSuper(Toolbar);

  function Toolbar(props) {
    var _this;

    _classCallCheck(this, Toolbar);

    _this = _super.call(this, props);
    _this.state = {
      elementList: {},
      imagesDimension: {}
    };
    var counter = 0;

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

      counter++;
    }

    _this.state.numberOfElement = counter;
    _this.cachedToolbar = null;
    _this.updateMinMaxDimensions = _this.updateMinMaxDimensions.bind(_assertThisInitialized(_this));
    _this.onHideToolbar = _this.onHideToolbar.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Toolbar, [{
    key: "updateMinMaxDimensions",
    value: function updateMinMaxDimensions() {// let newImagesDimension = Object.assign({}, this.state.imagesDimension);
      // if (newImagesDimension[id] == null || newImagesDimension[id] == undefined) {
      // 	let scalingFactor = this.props.scalingFactor;
      // 	let scaledWidth = width * scalingFactor;
      // 	let scaledHeight = height * scalingFactor;
      // 	newImagesDimension[id] = { width: scaledWidth, height: scaledHeight };
      // 	this.setState({ imagesDimension: newImagesDimension });
      // }
    }
  }, {
    key: "onHideToolbar",
    value: function onHideToolbar() {
      this.cachedToolbar = null;
      this.props.onHideToolbar();
    }
  }, {
    key: "createCategoryItems",
    value: function createCategoryItems(key) {
      var _this2 = this;

      var elementList = this.state.elementList;
      var imageElements = [];
      this.state.imagesDimension;
      var stylesContainer = {};
      var stylesImages = {};
      elementList[key].map(function (item) {
        var scalingFactor = _this2.props.scalingFactor;
        var width = 100 * scalingFactor;
        var height = 100 * scalingFactor; // let width =
        // 	imagesDimension[item.ID] === undefined
        // 		? 100
        // 		: imagesDimension[item.ID].width;
        // let height =
        // 	imagesDimension[item.ID] === undefined
        // 		? 100
        // 		: imagesDimension[item.ID].height;

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
        return imageElements.push( /*#__PURE__*/React.createElement(ImageElement, {
          key: "ImageElement-".concat(item.ID),
          id: item.ID,
          image: url.resolve(_this2.props.imagesPath, item.schema.image),
          name: item.schema.title,
          updateMinMaxDimensions: _this2.updateMinMaxDimensions,
          style: stylesImages[item.ID]
        }));
      });
      var categoryItems = [];
      elementList[key].map(function (item, index) {
        return categoryItems.push( /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "TooltipImageElement-".concat(item.ID),
          position: "bottom",
          title: item.schema.title,
          content: /*#__PURE__*/React.createElement("p", null, "Drag this component and drop it in the canvas to add a new", " ", item.schema.title),
          element: /*#__PURE__*/React.createElement("div", {
            key: "div" + item.ID,
            style: stylesContainer[item.ID]
          }, /*#__PURE__*/React.createElement(DragDropContainer, {
            targetKey: string_canvas,
            key: "draggable" + item.ID,
            dragClone: true,
            dragData: {
              source: string_toolbar,
              ID: item.ID,
              schema_ID: item.schema.ID
            }
          }, imageElements[index]))
        }));
      });
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "5px"
        }
      }, categoryItems);
    } // 	<Button className="collapse-btn" key={`Trigger${key}`} size="lg">
    // 	{key}
    // </Button>

  }, {
    key: "createCategories",
    value: function createCategories() {
      var _this3 = this;

      var style = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }; //pointerEvents: "none"

      var explorerStyle = null;

      if (this.props.isToolbarHidden) {
        explorerStyle = Object.assign({}, style, {
          flexDirection: "column",
          justifyContent: "start",
          height: "100%" //transform: "rotateZ(90deg)",

        });
      } else {
        explorerStyle = Object.assign({}, style, {});
      }

      var styleTransitionClose = {
        transition: "transform 300ms",
        transform: "rotateZ(0deg)"
      };
      var styleTransitionOpen = {
        transition: "transform 300ms",
        transform: "rotateZ(-90deg)"
      };
      var elementList = this.state.elementList;
      this.state.isHidden;
      var toolbar = [];
      var names = [];
      var explorerButton = null;
      var explorerContainerStyle = {
        width: "100%"
      };
      var hardwareExplorerText = "Hardware explorer";

      if (this.props.isToolbarHidden) {
        var styleTransitionCloseExplorer = Object.assign({}, styleTransitionClose, {
          transform: "rotateZ(0deg)"
        });
        var hardwareExplorerHideButtonClose = /*#__PURE__*/React.createElement("div", {
          style: styleTransitionCloseExplorer
        }, "\u25C1");
        explorerContainerStyle = Object.assign({}, explorerContainerStyle, {
          height: "100%"
        });
        hardwareExplorerText = hardwareExplorerText.replace(" ", "");
        hardwareExplorerText = hardwareExplorerText.split("").join("\n");
        hardwareExplorerText = hardwareExplorerText.replace("e\ne", "e\n \n \ne");
        explorerButton = /*#__PURE__*/React.createElement(Button, {
          key: "HardwareExplorer",
          variant: "secondary",
          size: "lg",
          style: explorerStyle,
          onClick: this.onHideToolbar
        }, /*#__PURE__*/React.createElement("div", null, hardwareExplorerHideButtonClose));
      } else {
        var styleTransitionOpenExplorer = Object.assign({}, styleTransitionOpen, {
          transform: "rotateZ(180deg)"
        });
        var hardwareExplorerHideButtonOpen = /*#__PURE__*/React.createElement("div", {
          style: styleTransitionOpenExplorer
        }, "\u25C1");
        explorerButton = /*#__PURE__*/React.createElement(Button, {
          key: "HardwareExplorer",
          variant: "secondary",
          size: "lg",
          style: explorerStyle,
          onClick: this.onHideToolbar
        }, /*#__PURE__*/React.createElement("div", null, hardwareExplorerText), /*#__PURE__*/React.createElement("div", null, hardwareExplorerHideButtonOpen));
      }

      var hardware_explorer = /*#__PURE__*/React.createElement(PopoverTooltip, {
        key: "HardwareExplorerTooltip",
        position: hardware_explorer_tooltip.position,
        title: hardware_explorer_tooltip.title,
        content: hardware_explorer_tooltip.content,
        element: /*#__PURE__*/React.createElement("div", {
          style: explorerContainerStyle
        }, explorerButton)
      });
      toolbar.push(hardware_explorer);
      if (this.props.isToolbarHidden) return toolbar;
      menu_order.forEach(function (key) {
        var index = key.lastIndexOf(".");
        var simpleKey;
        if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
        names.push(simpleKey);
      }); // Object.keys(elementList).forEach((key) => {
      // 	let index = key.lastIndexOf(".");
      // 	let simpleKey;
      // 	if (index !== -1) simpleKey = key.substring(index + 1);
      // 	else simpleKey = key;
      //
      // });
      //names.sort();

      names.forEach(function (name) {
        Object.keys(elementList).forEach(function (key) {
          var index = key.lastIndexOf(".");
          var simpleKey;
          if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
          if (simpleKey !== name) return;
          toolbar.push( /*#__PURE__*/React.createElement(Collapsible, {
            key: "Collapsible-".concat(key),
            trigger: /*#__PURE__*/React.createElement(Button, {
              key: "Trigger".concat(key),
              size: "lg",
              style: style
            }, /*#__PURE__*/React.createElement("div", null, simpleKey), /*#__PURE__*/React.createElement("div", {
              style: styleTransitionClose
            }, "\u25C1")),
            triggerWhenOpen: /*#__PURE__*/React.createElement(Button, {
              key: "Trigger".concat(key),
              size: "lg",
              style: style
            }, /*#__PURE__*/React.createElement("div", null, simpleKey), /*#__PURE__*/React.createElement("div", {
              style: styleTransitionOpen
            }, "\u25C1"))
          }, _this3.createCategoryItems(key)));
        });
      });
      return toolbar;
    }
  }, {
    key: "render",
    value: function render() {
      var imagesDimension = this.state.imagesDimension;

      if (Object.keys(imagesDimension).length !== 0 && this.state.numberOfElement !== Object.keys(imagesDimension).length && this.cachedToolbar !== null) {
        return this.cachedToolbar;
      }

      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height; //console.log("t w: " + width + " h: " + height);

      var style = {
        boxSizing: "border-box",
        backgroundColor: "LightGray",
        borderBottom: "2px solid",
        borderTop: "2px solid",
        width: "".concat(width, "px"),
        height: "".concat(height, "px"),
        overflow: "auto"
      };

      if (!this.props.isToolbarHidden) {
        style = Object.assign({}, style, {
          textAlign: "center",
          verticalAlign: "middle"
        });
      }

      var toolbar = this.createCategories();
      this.cachedToolbar = toolbar;
      return /*#__PURE__*/React.createElement("div", {
        style: style
      }, toolbar);
    }
  }]);

  return Toolbar;
}(React.PureComponent);

export { Toolbar as default };