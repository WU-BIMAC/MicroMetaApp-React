"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactCollapsible = _interopRequireDefault(require("react-collapsible"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _imageElement = _interopRequireDefault(require("./imageElement"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = require("url");

class Toolbar extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      elementList: {},
      imagesDimension: {}
    };
    let counter = 0;

    for (let i = 0; i < props.componentSchemas.length; i++) {
      let obj = props.componentSchemas[i];
      if (props.activeTier < obj.tier) continue;
      let category = obj.category;
      let element = {
        ID: "".concat(obj.title, "-").concat(i),
        schema: obj
      };

      if (this.state.elementList[category] === undefined) {
        this.state.elementList[category] = [];
      }

      this.state.elementList[category].push(element);
      counter++;
    }

    this.state.numberOfElement = counter;
    this.cachedToolbar = null;
    this.updateMinMaxDimensions = this.updateMinMaxDimensions.bind(this);
  }

  updateMinMaxDimensions(id, width, height) {// let newImagesDimension = Object.assign({}, this.state.imagesDimension);
    // if (newImagesDimension[id] == null || newImagesDimension[id] == undefined) {
    // 	let scalingFactor = this.props.scalingFactor;
    // 	let scaledWidth = width * scalingFactor;
    // 	let scaledHeight = height * scalingFactor;
    // 	newImagesDimension[id] = { width: scaledWidth, height: scaledHeight };
    // 	this.setState({ imagesDimension: newImagesDimension });
    // }
  }

  createCategoryItems(key) {
    let elementList = this.state.elementList;
    let imageElements = [];
    let imagesDimension = this.state.imagesDimension;
    let stylesContainer = {};
    let stylesImages = {};
    elementList[key].map(item => {
      let scalingFactor = this.props.scalingFactor;
      let width = 100 * scalingFactor;
      let height = 100 * scalingFactor; // let width =
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
    elementList[key].map(item => imageElements.push( /*#__PURE__*/_react.default.createElement(_imageElement.default, {
      key: "ImageElement-".concat(item.ID),
      id: item.ID,
      image: url.resolve(this.props.imagesPath, item.schema.image),
      name: item.schema.title,
      updateMinMaxDimensions: this.updateMinMaxDimensions,
      style: stylesImages[item.ID]
    })));
    let categoryItems = [];
    elementList[key].map((item, index) => categoryItems.push( /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "TooltipImageElement-".concat(item.ID),
      position: "bottom",
      title: item.schema.title,
      content: /*#__PURE__*/_react.default.createElement("p", null, "Drag this component and drop it in the canvas to add a new", " ", item.schema.title),
      element: /*#__PURE__*/_react.default.createElement("div", {
        key: "div" + item.ID,
        style: stylesContainer[item.ID]
      }, /*#__PURE__*/_react.default.createElement(_reactDragDropContainer.DragDropContainer, {
        targetKey: _constants.string_canvas,
        key: "draggable" + item.ID,
        dragClone: true,
        dragData: {
          source: _constants.string_toolbar,
          ID: item.ID,
          schema_ID: item.schema.ID
        }
      }, imageElements[index]))
    })));
    const styleContainer = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      margin: "5px"
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      style: styleContainer
    }, categoryItems);
  } // 	<Button className="collapse-btn" key={`Trigger${key}`} size="lg">
  // 	{key}
  // </Button>


  createCategories() {
    const style = {
      width: "100%",
      display: "flex",
      justifyContent: "space-between"
    };
    const explorerStyle = Object.assign(style, {
      pointerEvents: "none"
    });
    const styleTransitionClose = {
      transition: "transform 300ms",
      transform: "rotateZ(0deg)"
    };
    const styleTransitionOpen = {
      transition: "transform 300ms",
      transform: "rotateZ(-90deg)"
    };
    let elementList = this.state.elementList;
    let toolbar = [];
    let names = [];

    const hardware_explorer = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "HardwareExplorerTooltip",
      position: _constants.hardware_explorer_tooltip.position,
      title: _constants.hardware_explorer_tooltip.title,
      content: _constants.hardware_explorer_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: "100%"
        }
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "HardwareExplorer",
        variant: "secondary",
        size: "lg",
        style: explorerStyle,
        disabled: true
      }, "Hardware explorer"))
    });

    toolbar.push(hardware_explorer);
    Object.keys(elementList).forEach(key => {
      let index = key.lastIndexOf(".");
      let simpleKey;
      if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
      names.push(simpleKey);
    });
    names.sort();
    names.forEach(name => {
      Object.keys(elementList).forEach(key => {
        let index = key.lastIndexOf(".");
        let simpleKey;
        if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
        if (simpleKey !== name) return;
        toolbar.push( /*#__PURE__*/_react.default.createElement(_reactCollapsible.default, {
          key: "Collapsible-".concat(key),
          trigger: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Trigger".concat(key),
            size: "lg",
            style: style
          }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
            style: styleTransitionClose
          }, "\u25C1")),
          triggerWhenOpen: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Trigger".concat(key),
            size: "lg",
            style: style
          }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
            style: styleTransitionOpen
          }, "\u25C1"))
        }, this.createCategoryItems(key)));
      });
    });
    return toolbar;
  }

  render() {
    let imagesDimension = this.state.imagesDimension;

    if (Object.keys(imagesDimension).length !== 0 && this.state.numberOfElement !== Object.keys(imagesDimension).length && this.cachedToolbar !== null) {
      return this.cachedToolbar;
    }

    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height; //console.log("t w: " + width + " h: " + height);

    let style = {
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
    let toolbar = this.createCategories();
    this.cachedToolbar = toolbar;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, toolbar);
  }

}

exports.default = Toolbar;