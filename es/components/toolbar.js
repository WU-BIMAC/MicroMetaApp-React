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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    this.onHideToolbar = this.onHideToolbar.bind(this);
  }
  updateMinMaxDimensions(id, width, height) {
    // let newImagesDimension = Object.assign({}, this.state.imagesDimension);
    // if (newImagesDimension[id] == null || newImagesDimension[id] == undefined) {
    // 	let scalingFactor = this.props.scalingFactor;
    // 	let scaledWidth = width * scalingFactor;
    // 	let scaledHeight = height * scalingFactor;
    // 	newImagesDimension[id] = { width: scaledWidth, height: scaledHeight };
    // 	this.setState({ imagesDimension: newImagesDimension });
    // }
  }
  onHideToolbar() {
    this.cachedToolbar = null;
    this.props.onHideToolbar();
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
      let height = 100 * scalingFactor;
      // let width =
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
    elementList[key].map(item => imageElements.push(/*#__PURE__*/_react.default.createElement(_imageElement.default, {
      key: "ImageElement-".concat(item.ID),
      id: item.ID,
      image: url.resolve(this.props.imagesPath, item.schema.image),
      name: item.schema.title,
      updateMinMaxDimensions: this.updateMinMaxDimensions,
      style: stylesImages[item.ID]
    })));
    let categoryItems = [];
    elementList[key].map((item, index) => categoryItems.push(/*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
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
  }
  createCategories() {
    const style = {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "50px",
      alignItems: "center"
    };
    //pointerEvents: "none"
    let explorerStyle = null;
    if (this.props.isToolbarHidden) {
      explorerStyle = Object.assign({}, style, {
        flexDirection: "column",
        justifyContent: "start",
        height: "100%"
        //transform: "rotateZ(90deg)",
      });
    } else {
      explorerStyle = Object.assign({}, style, {
        height: "75px"
      });
    }
    const styleTransitionClose = {
      transition: "transform 300ms",
      transform: "rotateZ(180deg)",
      marginLeft: "10px",
      marginRight: "10px"
    };
    const styleTransitionOpen = {
      transition: "transform 300ms",
      transform: "rotateZ(0deg)",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let elementList = this.state.elementList;
    let isHidden = this.state.isHidden;
    let toolbar = [];
    let names = [];
    let explorerButton = null;
    let explorerContainerStyle = {
      width: "100%"
    };
    let hardwareExplorerText = "Hardware explorer";
    let styleImageBk = {
      width: "40px",
      height: "40px",
      marginLeft: "10px",
      marginRight: "10px"
    };
    let microscopeImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_microscope_img);
    let microscopeImgPath = microscopeImgPath_tmp + (microscopeImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
    if (this.props.isToolbarHidden) {
      const styleTransitionCloseExplorer = Object.assign({}, styleTransitionClose, {
        transform: "rotateZ(270deg)",
        marginLeft: "0px",
        marginRight: "0px"
      });
      let hardwareExplorerHideButtonClose = /*#__PURE__*/_react.default.createElement("div", {
        style: styleTransitionCloseExplorer
      }, "\u25B2");
      explorerContainerStyle = Object.assign({}, explorerContainerStyle, {
        height: "100%"
      });
      hardwareExplorerText = hardwareExplorerText.replace(" ", "");
      hardwareExplorerText = hardwareExplorerText.split("").join("\n");
      hardwareExplorerText = hardwareExplorerText.replace("e\ne", "e\n \n \ne");
      explorerButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "HardwareExplorer",
        variant: "dark",
        size: "lg",
        style: explorerStyle,
        onClick: this.onHideToolbar
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          //gap: "10px",
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: microscopeImgPath,
        alt: microscopeImgPath_tmp,
        style: styleImageBk,
        onLoad: this.onImgLoad
      })), hardwareExplorerHideButtonClose);
    } else {
      const styleTransitionOpenExplorer = Object.assign({}, styleTransitionOpen, {
        transform: "rotateZ(90deg)"
      });
      let hardwareExplorerHideButtonOpen = /*#__PURE__*/_react.default.createElement("div", {
        style: styleTransitionOpenExplorer
      }, "\u25B2");
      explorerButton = /*#__PURE__*/_react.default.createElement(_Button.default, {
        key: "HardwareExplorer",
        variant: "dark",
        size: "lg",
        style: explorerStyle,
        onClick: this.onHideToolbar
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          //gap: "10px",
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: microscopeImgPath,
        alt: microscopeImgPath_tmp,
        style: styleImageBk,
        onLoad: this.onImgLoad
      }), hardwareExplorerText), hardwareExplorerHideButtonOpen);
    }
    const hardware_explorer = /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
      key: "HardwareExplorerTooltip",
      position: _constants.hardware_explorer_tooltip.position,
      title: _constants.hardware_explorer_tooltip.title,
      content: _constants.hardware_explorer_tooltip.content,
      element: /*#__PURE__*/_react.default.createElement("div", {
        style: explorerContainerStyle
      }, explorerButton)
    });
    toolbar.push(hardware_explorer);
    if (this.props.isToolbarHidden) return toolbar;
    _constants.menu_order.forEach(key => {
      let index = key.lastIndexOf(".");
      let simpleKey;
      if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
      names.push(simpleKey);
    });
    // Object.keys(elementList).forEach((key) => {
    // 	let index = key.lastIndexOf(".");
    // 	let simpleKey;
    // 	if (index !== -1) simpleKey = key.substring(index + 1);
    // 	else simpleKey = key;
    //
    // });
    //names.sort();
    names.forEach(name => {
      Object.keys(elementList).forEach(key => {
        let index = key.lastIndexOf(".");
        let simpleKey;
        if (index !== -1) simpleKey = key.substring(index + 1);else simpleKey = key;
        if (simpleKey !== name) return;
        toolbar.push(/*#__PURE__*/_react.default.createElement(_reactCollapsible.default, {
          key: "Collapsible-".concat(key),
          trigger: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Trigger".concat(key),
            size: "lg",
            style: style
          }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
            style: styleTransitionClose
          }, "\u25B2")),
          triggerWhenOpen: /*#__PURE__*/_react.default.createElement(_Button.default, {
            key: "Trigger".concat(key),
            size: "lg",
            style: style
          }, /*#__PURE__*/_react.default.createElement("div", null, simpleKey), /*#__PURE__*/_react.default.createElement("div", {
            style: styleTransitionOpen
          }, "\u25B2"))
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
    let height = this.props.dimensions.height;
    //console.log("t w: " + width + " h: " + height);
    let style = {
      boxSizing: "border-box",
      backgroundColor: "LightGray",
      borderBottom: "2px solid",
      borderTop: "2px solid",
      width: "".concat(width, "px"),
      height: "".concat(height, "px"),
      overflowY: "auto",
      overflowX: "hidden"
    };
    if (!this.props.isToolbarHidden) {
      style = Object.assign({}, style, {
        textAlign: "center",
        verticalAlign: "middle"
      });
    }
    let toolbar = this.createCategories();
    this.cachedToolbar = toolbar;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style
    }, toolbar);
  }
}
exports.default = Toolbar;