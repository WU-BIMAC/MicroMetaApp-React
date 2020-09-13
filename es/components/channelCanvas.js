"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _canvasElement = _interopRequireWildcard(require("./canvasElement"));

var _url = require("url");

var _constants = require("../constants");

var _propTypes = require("prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = require("url");

const validate = require("jsonschema").validate;

const uuidv4 = require("uuid/v4");

class ChannelsCanvas extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      elementList: [],
      elementData: Object.assign({}, this.props.inputData),
      componentsSchema: {},
      linkedFields: props.linkedFields || {},
      imgHeight: null,
      imgWidth: null,
      backgroundScale: null,
      offsetY: 0,
      offsetX: 0,
      headerOffset: props.headerOffset || 0,
      isEditing: false,
      hover: null
    };
    Object.keys(props.componentSchemas).forEach(schemaIndex => {
      let schema = props.componentSchemas[schemaIndex];
      let schema_id = schema.ID; //Validate schemas using jsonschema????

      Object.keys(props.inputData).forEach(objIndex => {
        let object = props.inputData[objIndex];
        if (props.activeTier < object.tier) return;
        if (schema_id !== object.Schema_ID) return;
        let validation = validate(object, schema); //if (schema_id === "CCD.json") console.log(validation);

        let validated = validation.valid;
        let positionZ = object.PositionZ === undefined ? 0 : object.PositionZ;
        let newElement = {
          ID: schema.title + "_" + object.ID,
          schema_ID: schema_id,
          name: object.Name,
          validated: validated,
          dragged: false,
          obj: object,
          x: object.PositionX,
          y: object.PositionY,
          z: positionZ,
          width: object.Width,
          height: object.Height
        };
        this.state.elementList.push(newElement);
      });
      this.state.componentsSchema[schema_id] = schema;
    });
    this.setEditingOnCanvas = this.setEditingOnCanvas.bind(this);
    this.addComponentsIndexesIfMissing = this.addComponentsIndexesIfMissing.bind(this);
    this.dragged = this.dragged.bind(this);
    this.dropped = this.dropped.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.onCanvasElementDataSave = this.onCanvasElementDataSave.bind(this);
    this.getElementData = this.getElementData.bind(this);
    this.updatedDimensions = this.updatedDimensions.bind(this);
    this.areAllElementsValidated = this.areAllElementsValidated.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.props.updateElementData(this.state.elementData, true);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.componentsSchema !== null) {
      let componentsSchema = {};
      Object.keys(props.componentSchemas).forEach(schemaIndex => {
        let schema = props.componentSchemas[schemaIndex];
        let schema_id = schema.ID;
        componentsSchema[schema_id] = schema;
      });
      let elementList = state.elementList;

      for (let i = 0; i < elementList.length; i++) {
        let element = elementList[i];
        let schema_id = element.schema_ID;
        let schema = componentsSchema[schema_id];
        let object = element.obj;
        let validation = validate(object, schema);
        let validated = validation.valid;
        element.validated = validated;
      }

      return {
        componentsSchema: componentsSchema
      };
    }

    return null;
  }

  setEditingOnCanvas(isEditing) {
    this.setState({
      isEditing: isEditing
    });
  }

  handleMouseIn(itemID) {
    this.setState({
      hover: itemID
    });
  }

  handleMouseOut() {
    this.setState({
      hover: null
    });
  }

  handleScroll(e) {
    if (this.state.isEditing) {
      return;
    }

    let element = e.target;
    let offsetY = element.scrollTop;
    let offsetX = element.scrollLeft;
    this.setState({
      offsetX: offsetX,
      offsetY: offsetY
    });
  }

  updatedDimensions(id, width, height, isResize) {
    let element = null;
    this.state.elementList.forEach(item => {
      if (item.ID === id) element = item;
    });
    let newElementDataList = Object.assign({}, this.state.elementData);
    let obj = newElementDataList[id];
    if (element === null || obj === undefined) return;

    if (element.width !== -1 && element.height !== -1 && !isResize) {
      return;
    }

    element.width = width;
    element.height = height;
    obj.Width = width;
    obj.Height = height;
    let validated = this.areAllElementsValidated();
    this.props.updateElementData(newElementDataList, validated);
  }

  onImgLoad({
    target: img
  }) {
    let oldHeight = this.state.imgHeight;
    let oldWidth = this.state.imgWidth;
    if (oldWidth !== null && oldHeight !== null) return;
    let newHeight = img.height;
    let newWidth = img.width;
    this.setState({
      imgHeight: newHeight,
      imgWidth: newWidth
    });
  }

  areAllElementsValidated() {
    let elementList = this.state.elementList;

    for (let i = 0; i < elementList.length; i++) {
      if (!elementList[i].validated) {
        return false;
      }
    }

    return true;
  }

  onCanvasElementDataSave(id, data, dataLinkedFields) {
    let linkedFields = this.state.linkedFields;

    if (dataLinkedFields !== undefined && Object.keys(dataLinkedFields).length > 0) {
      linkedFields[id] = dataLinkedFields;
    }

    let elementList = this.state.elementList;

    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].ID === id) {
        elementList[i].validated = true;
        elementList[i].name = data.Name;
        break;
      }
    }

    let currentElementData = Object.assign({}, this.state.elementData);
    currentElementData[id] = Object.assign(currentElementData[id], data);
    this.setState({
      elementData: currentElementData,
      linkedFields: linkedFields
    });
    let validated = this.areAllElementsValidated();
    this.props.updateElementData(currentElementData, validated);
    this.props.updateLinkedFields(linkedFields);
  }

  getElementData() {
    return Object.assign({}, this.state.elementData);
  }

  dragged(e) {
    let newElementList = this.state.elementList.slice();
    newElementList[e.index].dragged = true;
    let draggedItem = newElementList[e.index];
    let ID = draggedItem.ID;
    let x = draggedItem.x;
    let y = draggedItem.y;
    let l1_x = x;
    let l1_y = y;
    let r1_x = x + draggedItem.width;
    let r1_y = y + draggedItem.height;
    let oldZ = draggedItem.z;

    for (let k = 0; k < this.state.elementList.length; k++) {
      let item = this.state.elementList[k];
      if (ID === item.ID) continue;
      let l2_x = item.x;
      let l2_y = item.y;
      let r2_x = l2_x + item.width;
      let r2_y = l2_y + item.height;

      if (l1_x > r2_x || r1_x < l2_x) {
        continue;
      }

      if (l1_y > r2_y || r1_y < l2_y) {
        continue;
      }

      if (item.z > oldZ) {
        item.z = item.z - 1;
      }
    }

    this.setState({
      elementList: newElementList
    });
  }

  dropped(e) {
    let sourceElement = e.dragData;
    let newElementList = this.state.elementList.slice();
    let newElementDataList = Object.assign({}, this.state.elementData);
    let newElement = null;
    let x = e.x;
    let y = e.y - this.state.headerOffset;
    let offsetX = this.state.offsetX;
    let offsetY = this.state.offsetY;
    let containerOffsetX = this.props.containerOffsetLeft;
    let containerOffsetY = this.props.containerOffsetTop;
    x += offsetX - containerOffsetX;
    y += offsetY - containerOffsetY;

    if (sourceElement.source !== _constants.string_toolbar) {
      x -= 5;
      y -= 15;
    }

    let width = 100;
    let height = 100;
    let componentsSchema = this.state.componentsSchema;
    let index = null;
    let ID = null;

    if (sourceElement.source === _constants.string_toolbar) {
      let uuid = uuidv4();
      let schema_ID = sourceElement.schema_ID;
      let schema = componentsSchema[schema_ID];
      newElement = {
        //Schema is old version needs to be updated constantly
        //AKA needs to put schemas in canvas and retrieve them
        //on the fly
        ID: schema.title + "_" + uuid,
        schema_ID: schema.ID,
        validated: false,
        dragged: false,
        x: x,
        y: y,
        z: 0,
        width: -1,
        height: -1,
        offsetX: offsetX,
        offsetY: offsetY
      };
      newElementList.push(newElement);
      let newElementData = {
        Name: "New ".concat(schema.title),
        ID: uuid,
        Tier: schema.tier,
        Schema_ID: schema.ID,
        Version: schema.version,
        PositionX: x,
        PositionY: y,
        PositionZ: 0,
        Width: -1,
        Height: -1,
        OffsetX: offsetX,
        OffsetY: offsetY
      };
      newElement.name = newElementData.Name;
      this.addComponentsIndexesIfMissing(schema, newElementData);
      newElement.obj = newElementData;
      newElementDataList[newElement.ID] = newElementData;
      index = newElementList.length - 1;
      ID = newElement.ID;
    } else {
      let item = this.state.elementList[sourceElement.index];
      let schema_ID = newElementList[sourceElement.index].schema_ID;
      let schema = componentsSchema[schema_ID];
      newElementList[sourceElement.index].x = x;
      newElementList[sourceElement.index].y = y;
      newElementList[sourceElement.index].dragged = false;
      newElementList[sourceElement.index].offsetX = offsetX;
      newElementList[sourceElement.index].offsetY = offsetY;
      newElementDataList[item.ID].PositionX = x;
      newElementDataList[item.ID].PositionY = y;
      newElementDataList[item.ID].OffsetX = offsetX;
      newElementDataList[item.ID].OffsetY = offsetY;
      this.addComponentsIndexesIfMissing(schema, newElementDataList[item.ID]);
      width = item.width;
      height = item.height;
      index = sourceElement.index;
      ID = item.ID;
    }

    let newZ = 0;
    let l1_x = x;
    let l1_y = y;
    let r1_x = x + width;
    let r1_y = y + height;

    for (let k = 0; k < this.state.elementList.length; k++) {
      let item = this.state.elementList[k];
      if (ID === item.ID) continue;
      let l2_x = item.x;
      let l2_y = item.y;
      let r2_x = l2_x + item.width;
      let r2_y = l2_y + item.height;

      if (l1_x > r2_x || r1_x < l2_x) {
        continue;
      }

      if (l1_y > r2_y || r1_y < l2_y) {
        continue;
      }

      if (item.z + 1 > newZ) newZ = item.z + 1;
    }

    newElementList[index].z = newZ;
    newElementDataList[ID].PositionZ = newZ;
    this.setState({
      elementList: newElementList,
      elementData: newElementDataList
    });
    let validated = this.areAllElementsValidated();
    this.props.updateElementData(newElementDataList, validated);
  }

  addComponentsIndexesIfMissing(schema, newElementData) {
    Object.keys(schema.properties).forEach(key => {
      let currentNumber = _constants.string_currentNumberOf_identifier + key;
      let minNumber = _constants.string_minNumberOf_identifier + key;
      let maxNumber = _constants.string_maxNumberOf_identifier + key;

      if (newElementData[currentNumber] !== undefined) {
        return;
      }

      if (schema.properties[key].type === _constants.string_array) {
        if (schema.required.indexOf(key) != -1) {
          newElementData[currentNumber] = 1;
          newElementData[minNumber] = 1;
          newElementData[maxNumber] = -1;
        } else {
          newElementData[currentNumber] = 0;
          newElementData[minNumber] = 0;
          newElementData[maxNumber] = -1;
        }
      } else if (schema.properties[key].type === _constants.string_object) {
        if (schema.required.indexOf(key) === -1) {
          newElementData[currentNumber] = 0;
          newElementData[minNumber] = 0;
          newElementData[maxNumber] = 1;
        } else {
          newElementData[currentNumber] = 1;
          newElementData[minNumber] = 1;
          newElementData[maxNumber] = 1;
        }
      }
    });
  }

  onDelete(index) {
    let elementList = this.state.elementList.slice();
    let elementData = Object.assign({}, this.state.elementData);
    if (elementList.length === 0) return;
    if (elementData.length === 0) return;
    let id = elementList[index].ID;
    let name = elementList[index].name;
    let schemaID = elementList[index].schema_ID;
    let deletedSchema = schemaID.replace(_constants.string_json_ext, "");
    let deletedID = id.replace(deletedSchema, "");
    deletedID = deletedID.replace("_", "");
    let linkedFields = this.state.linkedFields;

    for (let key in linkedFields) {
      let links = linkedFields[key];
      let done = false;
      let fieldToDelete = null;

      for (let field in links) {
        let link = links[field];

        if (link.value === deletedID) {
          if (elementData[key] !== undefined) {
            elementData[key][field] = _constants.string_na;
          }

          fieldToDelete = field;
          done = true;
          break;
        }
      }

      delete linkedFields[key][fieldToDelete];

      if (Object.keys(linkedFields[key]).length === 0) {
        delete linkedFields[key];
      }

      if (done) break;
    }

    elementList.splice(index, 1);

    if (elementData[id] !== undefined) {
      delete elementData[id];
    }

    this.setState({
      elementList: elementList,
      elementData: elementData
    });
    let validated = this.areAllElementsValidated();
    this.props.updateElementData(elementData, validated);
  }

  createList() {
    let scalingFactor = this.props.scalingFactor;
    let hover = this.state.hover;
    let elementList = this.state.elementList;
    let elementData = this.state.elementData;
    let highestZ = 0;

    for (let k = 0; k < this.state.elementList.length; k++) {
      let item = elementList[k];
      let z = item.z;
      if (z > highestZ) highestZ = z;
    }

    const styleGrabber = {
      lineHeight: "12px",
      fontSize: "12px",
      fontWeight: "bold",
      color: "grey",
      textAlign: "left",
      verticalAlign: "top"
    };
    const styleCloser = {
      lineHeight: "12px",
      padding: "0px",
      border: "none",
      font: "12px",
      backgroundColor: "transparent",
      cursor: "pointer",
      color: "grey",
      textAlign: "center",
      verticalAlign: "top"
    }; //justifyContent: "space-between"

    const styleActionContainer = {
      display: "flex",
      flexDirection: "column",
      width: "10px"
    };
    let styleActionElementNameContainer = {
      display: "flex",
      flexDirection: "row"
    };
    let styleElementNameContainer = {
      display: "flex",
      flexDirection: "column"
    }; //paddingLeft: "5px",

    let styleNameHover = {
      overflow: "unset",
      fontSize: "80%",
      textAlign: "left",
      lineHeight: "125%",
      color: "gray"
    };
    let styleNameRegular = {
      display: "none"
    };
    let stylesContainer = {};
    let stylesImages = {};
    elementList.map(item => {
      let x = item.x;
      let y = item.y;
      let style = {
        position: "absolute",
        left: x,
        top: y
      };
      let containerWidth = item.width;
      let containerHeight = item.height;
      if (containerWidth == -1) containerWidth = 100;
      if (containerHeight == -1) containerHeight = 100;
      let scaledContainerWidth = containerWidth * scalingFactor;
      let scaledContainerHeight = containerHeight * scalingFactor;

      if (!item.validated) {
        scaledContainerWidth += 10;
        scaledContainerHeight += 10;
      }

      stylesContainer[item.ID] = Object.assign({
        width: "".concat(scaledContainerWidth + 10, "px"),
        height: "".concat(scaledContainerHeight + 7, "px")
      }, style);
      stylesImages[item.ID] = {
        width: item.width,
        height: item.height
      };
    });
    let droppableElement = [];
    let componentsSchema = this.state.componentsSchema;
    let elementByType = {};
    Object.keys(elementData).forEach(function (key) {
      let element = elementData[key];
      let schemaID = element.Schema_ID.replace(_constants.string_json_ext, "");

      if (elementByType[schemaID] === undefined) {
        elementByType[schemaID] = {};
      }

      elementByType[schemaID][element.Name] = element.ID;
    });

    for (let k = 0; k <= highestZ; k++) {
      elementList.map((item, index) => {
        if (item.z != k) return;
        let schema_id = item.schema_ID;
        let schema = componentsSchema[schema_id];
        let styleName = null;

        if (item.ID === hover) {
          styleName = Object.assign(styleNameHover, {
            width: "".concat(stylesImages[item.ID].width, "px")
          });
        } else {
          styleName = styleNameRegular;
        }

        droppableElement.push( /*#__PURE__*/_react.default.createElement("div", {
          style: stylesContainer[item.ID],
          key: "draggableWrapper" + index,
          onMouseEnter: () => this.handleMouseIn(item.ID),
          onMouseLeave: this.handleMouseOut
        }, /*#__PURE__*/_react.default.createElement(_reactDragDropContainer.DragDropContainer, {
          targetKey: _constants.string_canvas,
          key: "draggable" + index,
          dragClone: false,
          dragData: {
            source: _constants.string_canvas,
            index: index
          },
          onDragStart: this.dragged,
          dragHandleClassName: "grabber"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleActionElementNameContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: styleActionContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "grabber",
          style: styleGrabber
        }, "\u2237"), /*#__PURE__*/_react.default.createElement(_canvasElement.CanvasElementDeleteButton, {
          index: index,
          handleDelete: this.onDelete,
          myStyle: styleCloser,
          isViewOnly: this.props.isViewOnly
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: styleElementNameContainer
        }, /*#__PURE__*/_react.default.createElement(_canvasElement.default, {
          activeTier: this.props.activeTier,
          id: item.ID,
          image: url.resolve(this.props.imagesPath, schema.image),
          schema: schema,
          handleConfirm: this.onCanvasElementDataSave,
          updateDimensions: this.updatedDimensions,
          overlaysContainer: this.props.overlaysContainer,
          inputData: elementData[item.ID],
          width: stylesImages[item.ID].width,
          height: stylesImages[item.ID].height,
          validated: item.validated,
          dragged: item.dragged,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: elementByType,
          isViewOnly: this.props.isViewOnly,
          setEditingOnCanvas: this.setEditingOnCanvas,
          scalingFactor: scalingFactor
        }), /*#__PURE__*/_react.default.createElement("div", {
          style: styleName
        }, item.name))))));
      });
    }

    return droppableElement;
  }

  render() {
    const _this$props = this.props,
          backgroundImage = _this$props.backgroundImage,
          _this$props$dimension = _this$props.dimensions,
          _this$props$dimension2 = _this$props$dimension === void 0 ? {} : _this$props$dimension,
          width = _this$props$dimension2.width,
          height = _this$props$dimension2.height,
          _this$props$microscop = _this$props.microscope,
          microscope = _this$props$microscop === void 0 ? null : _this$props$microscop,
          _this$props$scalingFa = _this$props.scalingFactor,
          scalingFactor = _this$props$scalingFa === void 0 ? 1 : _this$props$scalingFa;

    const linkedFields = this.state.linkedFields; // if (bool_isDebug) {
    // 	console.log("LinkedFields");
    // 	console.log(linkedFields);
    // }

    const styleContainer = {
      borderBottom: "2px solid",
      borderTop: "2px solid",
      borderRight: "2px solid",
      color: "black",
      width: "".concat(width, "px"),
      height: "".concat(height, "px")
    };
    const innerWidth = width - 2;
    const innerHeight = height - 4;
    const dropTargetStyle = {
      width: "".concat(innerWidth, "px"),
      height: "".concat(innerHeight, "px")
    };
    const canvasContainerStyle = {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "auto"
    };
    const scaledCanvasWidth = _constants.number_canvas_width * scalingFactor;
    const scaledCanvasHeight = _constants.number_canvas_height * scalingFactor;
    const canvasInnerContainerStyle = {
      width: "".concat(scaledCanvasWidth, "px"),
      height: "".concat(scaledCanvasHeight, "px"),
      position: "absolute",
      left: 0,
      top: 0
    };
    const imageStyle = {
      width: "100%",
      height: "100%",
      margin: "auto"
    };
    const infoStyle = {
      position: "absolute",
      left: 0,
      top: 0
    };
    const micInfo = [];

    if (microscope !== null && microscope !== undefined) {
      if (microscope.Name) {
        micInfo.push("Name: ".concat(microscope.Name));
        micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
          key: "newline-1"
        }));
      }

      if (microscope.Manufacturer !== null && microscope.Manufacturer !== undefined) {
        micInfo.push("Manufacturer: ".concat(microscope.Manufacturer));
        micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
          key: "newline-2"
        }));
      }

      if (microscope.Model !== null && microscope.Model !== undefined) {
        micInfo.push("Model: ".concat(microscope.Model));
        micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
          key: "newline-3"
        }));
      }
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      style: styleContainer
    }, /*#__PURE__*/_react.default.createElement(_reactDragDropContainer.DropTarget, {
      style: dropTargetStyle,
      onHit: this.dropped,
      targetKey: _constants.string_canvas
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: canvasContainerStyle,
      onScroll: this.handleScroll
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: canvasInnerContainerStyle
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: backgroundImage + (backgroundImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
      alt: backgroundImage,
      style: imageStyle,
      onLoad: this.onImgLoad
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: infoStyle
    }, /*#__PURE__*/_react.default.createElement("p", null, micInfo)), this.createList())));
  }

}

exports.default = ChannelsCanvas;