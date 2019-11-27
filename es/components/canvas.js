"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _canvasElement = _interopRequireWildcard(require("./canvasElement"));

var _url = require("url");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var path = require("path");

var validate = require("jsonschema").validate;

var uuidv4 = require("uuid/v4");

var currentNumberOf_identifier = "Number_Of_";
var minNumberOf_identifier = "Min_Number_Of_";
var maxNumberOf_identifier = "Max_Number_Of_";

var Canvas =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Canvas, _React$PureComponent);

  function Canvas(props) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Canvas).call(this, props));
    _this.state = {
      elementList: [],
      elementData: Object.assign({}, _this.props.inputData),
      componentsSchema: {},
      linkedFields: props.linkedFields || {},
      imgHeight: null,
      imgWidth: null,
      backgroundScale: null,
      offsetY: 0,
      offsetX: 0,
      scale: null,
      isEditing: false
    };
    Object.keys(props.componentSchemas).forEach(function (schemaIndex) {
      var schema = props.componentSchemas[schemaIndex];
      var schema_id = schema.ID; //Validate schemas using jsonschema????

      Object.keys(props.inputData).forEach(function (objIndex) {
        var object = props.inputData[objIndex];
        if (props.activeTier < object.tier) return;
        if (schema_id !== object.Schema_ID) return;
        var validation = validate(object, schema); //if (schema_id === "CCD.json") console.log(validation);

        var validated = validation.valid;
        var positionZ = object.PositionZ === undefined ? 0 : object.PositionZ;
        var newElement = {
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

        _this.state.elementList.push(newElement);
      });
      _this.state.componentsSchema[schema_id] = schema;
    });
    _this.setEditingOnCanvas = _this.setEditingOnCanvas.bind(_assertThisInitialized(_this));
    _this.addComponentsIndexesIfMissing = _this.addComponentsIndexesIfMissing.bind(_assertThisInitialized(_this));
    _this.dragged = _this.dragged.bind(_assertThisInitialized(_this));
    _this.dropped = _this.dropped.bind(_assertThisInitialized(_this));
    _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
    _this.onCanvasElementDataSave = _this.onCanvasElementDataSave.bind(_assertThisInitialized(_this));
    _this.getElementData = _this.getElementData.bind(_assertThisInitialized(_this));
    _this.updatedDimensions = _this.updatedDimensions.bind(_assertThisInitialized(_this));
    _this.areAllElementsValidated = _this.areAllElementsValidated.bind(_assertThisInitialized(_this));
    _this.onImgLoad = _this.onImgLoad.bind(_assertThisInitialized(_this));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));

    _this.props.updateElementData(_this.state.elementData, true);

    return _this;
  }

  _createClass(Canvas, [{
    key: "setEditingOnCanvas",
    value: function setEditingOnCanvas(isEditing) {
      this.setState({
        isEditing: isEditing
      });
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(e) {
      if (this.state.isEditing) {
        return;
      }

      var element = e.target;
      var offsetY = element.scrollTop;
      var offsetX = element.scrollLeft;
      this.setState({
        offsetX: offsetX,
        offsetY: offsetY
      });
    }
  }, {
    key: "updatedDimensions",
    value: function updatedDimensions(id, width, height, isResize) {
      var element = null;
      this.state.elementList.forEach(function (item) {
        if (item.ID === id) element = item;
      });
      var newElementDataList = Object.assign({}, this.state.elementData);
      var obj = newElementDataList[id];
      if (element === null || obj === undefined) return; //console.log("updated element in canvas " + isResize);

      if (element.width !== -1 && element.height !== -1 && !isResize) {
        return;
      } // if (!isResize) {
      // 	if (element.width >= width && element.height >= height) {
      // 		return;
      // 	}
      // }
      //console.log("new dimensions " + width + " x " + height);


      element.width = width;
      element.height = height;
      obj.Width = width;
      obj.Height = height;
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(newElementDataList, validated);
    }
  }, {
    key: "onImgLoad",
    value: function onImgLoad(_ref) {
      var img = _ref.target;
      var oldHeight = this.state.imgHeight;
      var oldWidth = this.state.imgWidth;
      if (oldWidth !== null && oldHeight !== null) return;
      var newHeight = img.height;
      var newWidth = img.width;
      this.setState({
        imgHeight: newHeight,
        imgWidth: newWidth
      });
    }
  }, {
    key: "areAllElementsValidated",
    value: function areAllElementsValidated() {
      var elementList = this.state.elementList;

      for (var i = 0; i < elementList.length; i++) {
        if (!elementList[i].validated) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "onCanvasElementDataSave",
    value: function onCanvasElementDataSave(id, data, dataLinkedFields) {
      var linkedFields = this.state.linkedFields;

      if (dataLinkedFields !== undefined && Object.keys(dataLinkedFields).length > 0) {
        //console.log(dataLinkedFields);
        linkedFields[id] = dataLinkedFields;
      }

      var elementList = this.state.elementList;

      for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].ID === id) {
          elementList[i].validated = true;
          elementList[i].name = data.Name;
          break;
        }
      }

      var currentElementData = Object.assign({}, this.state.elementData);
      currentElementData[id] = Object.assign(currentElementData[id], data);
      this.setState({
        elementData: currentElementData,
        linkedFields: linkedFields
      });
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(currentElementData, validated);
      this.props.updateLinkedFields(linkedFields);
    }
  }, {
    key: "getElementData",
    value: function getElementData() {
      return Object.assign({}, this.state.elementData);
    }
  }, {
    key: "dragged",
    value: function dragged(e) {
      var newElementList = this.state.elementList.slice();
      newElementList[e.index].dragged = true;
      var draggedItem = newElementList[e.index];
      //this rectangle
      var ID = draggedItem.ID;
      var x = draggedItem.x;
      var y = draggedItem.y;
      var r1_x = x + draggedItem.width;
      var r1_y = y + draggedItem.height;
      var oldZ = draggedItem.z;

      for (var k = 0; k < this.state.elementList.length; k++) {
        //rectangles to test against
        var item = this.state.elementList[k];
        if (ID === item.ID) continue;
        var l2_x = item.x;
        var l2_y = item.y;
        var r2_x = l2_x + item.width;
        var r2_y = l2_y + item.height; //console.log("L1 " + l1_x + "-" + l1_y + " R1 " + r1_x + "-" + r1_y);
        //console.log("L2 " + l2_x + "-" + l2_y + " R2 " + r2_x + "-" + r2_y);

        if (x > r2_x || r1_x < l2_x) {
          //console.log("Rect1 is right or left of Rect2");
          continue;
        }

        if (y > r2_y || r1_y < l2_y) {
          //console.log("Rect1 is below or above of Rect2");
          continue;
        }

        if (item.z > oldZ) {
          item.z = item.z - 1;
        } // console.log(
        // 	"DRAGGING ID: " + ID + " COMP ID : " + item.ID + " newZ " + item.z
        // );

      }

      this.setState({
        elementList: newElementList
      });
    }
  }, {
    key: "dropped",
    value: function dropped(e) {
      var sourceElement = e.dragData;
      var newElementList = this.state.elementList.slice();
      var newElementDataList = Object.assign({}, this.state.elementData);
      var newElement = null;
      var x = e.x;
      var y = e.y - 60;
      var offsetX = this.state.offsetX;
      var offsetY = this.state.offsetY; //console.log("SCROLL OFFSETS " + offsetX + "-" + offsetY);

      x += offsetX;
      y += offsetY; // if (e.y - 60 < 0) y = 60;
      // else y = e.y - 60;
      // if (x < 0) x = 0;
      // else if (x > width) x = width;

      if (sourceElement.source !== "toolbar") {
        x -= 7;
        y -= 7;
      }

      var width = 100;
      var height = 100;
      var componentsSchema = this.state.componentsSchema;
      var index = null;
      var ID = null;

      if (sourceElement.source === "toolbar") {
        var uuid = uuidv4();
        var schema_ID = sourceElement.schema_ID;
        var schema = componentsSchema[schema_ID];
        newElement = {
          //Schema is old version needs to be updated constantly
          //AKA needs to put schemas in canvas and retrieve them
          //on the fly
          ID: schema.title + "_" + uuid,
          schema_ID: schema.ID,
          validated: false,
          dragged: false,
          //x: percentX,
          x: x,
          //y: percentY,
          y: y,
          z: 0,
          width: -1,
          height: -1,
          offsetX: offsetX,
          offsetY: offsetY
        };
        newElementList.push(newElement);
        var newElementData = {
          Name: "New ".concat(schema.title),
          ID: uuid,
          Tier: schema.tier,
          Schema_ID: schema.ID,
          Version: schema.version,
          //PositionX: percentX,
          PositionX: x,
          //PositionY: percentY,
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
        var item = this.state.elementList[sourceElement.index];
        var _schema_ID = newElementList[sourceElement.index].schema_ID;
        var _schema = componentsSchema[_schema_ID]; // newElementList[sourceElement.index].x = percentX;

        newElementList[sourceElement.index].x = x; // newElementList[sourceElement.index].y = percentY;

        newElementList[sourceElement.index].y = y;
        newElementList[sourceElement.index].dragged = false;
        newElementList[sourceElement.index].offsetX = offsetX;
        newElementList[sourceElement.index].offsetY = offsetY; //newElementDataList[item.ID].PositionX = percentX;

        newElementDataList[item.ID].PositionX = x; //newElementDataList[item.ID].PositionY = percentY;

        newElementDataList[item.ID].PositionY = y;
        newElementDataList[item.ID].OffsetX = offsetX;
        newElementDataList[item.ID].OffsetY = offsetY;
        this.addComponentsIndexesIfMissing(_schema, newElementDataList[item.ID]);
        width = item.width;
        height = item.height;
        index = sourceElement.index;
        ID = item.ID;
      }

      var newZ = 0; //this rectangle

      var l1_x = x;
      var l1_y = y;
      var r1_x = x + width;
      var r1_y = y + height;

      for (var k = 0; k < this.state.elementList.length; k++) {
        //rectangles to test against
        var _item = this.state.elementList[k];
        if (ID === _item.ID) continue;
        var l2_x = _item.x;
        var l2_y = _item.y;
        var r2_x = l2_x + _item.width;
        var r2_y = l2_y + _item.height; //console.log("L1 " + l1_x + "-" + l1_y + " R1 " + r1_x + "-" + r1_y);
        //console.log("L2 " + l2_x + "-" + l2_y + " R2 " + r2_x + "-" + r2_y);

        if (l1_x > r2_x || r1_x < l2_x) {
          //console.log("Rect1 is right or left of Rect2");
          continue;
        }

        if (l1_y > r2_y || r1_y < l2_y) {
          //console.log("Rect1 is below or above of Rect2");
          continue;
        }

        if (_item.z + 1 > newZ) newZ = _item.z + 1;
      } //console.log("NEW Z : " + newZ);


      newElementList[index].z = newZ;
      newElementDataList[ID].PositionZ = newZ;
      this.setState({
        elementList: newElementList,
        elementData: newElementDataList
      });
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(newElementDataList, validated);
    }
  }, {
    key: "addComponentsIndexesIfMissing",
    value: function addComponentsIndexesIfMissing(schema, newElementData) {
      Object.keys(schema.properties).forEach(function (key) {
        var currentNumber = currentNumberOf_identifier + key;
        var minNumber = minNumberOf_identifier + key;
        var maxNumber = maxNumberOf_identifier + key;

        if (newElementData[currentNumber] !== undefined) {
          return;
        }

        if (schema.properties[key].type === "array") {
          if (schema.required.indexOf(key) != -1) {
            newElementData[currentNumber] = 1;
            newElementData[minNumber] = 1;
            newElementData[maxNumber] = -1;
          } else {
            newElementData[currentNumber] = 0;
            newElementData[minNumber] = 0;
            newElementData[maxNumber] = -1;
          }
        } else if (schema.properties[key].type === "object") {
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
  }, {
    key: "onDelete",
    value: function onDelete(index) {
      var elementList = this.state.elementList.slice();
      var elementData = Object.assign({}, this.state.elementData);
      if (elementList.length === 0) return;
      if (elementData.length === 0) return;
      var id = elementList[index].ID;
      elementList[index].name;
      var schemaID = elementList[index].schema_ID;
      var deletedSchema = schemaID.replace(".json", "");
      var deletedID = id.replace(deletedSchema, "");
      deletedID = deletedID.replace("_", "");
      var linkedFields = this.state.linkedFields;

      for (var key in linkedFields) {
        var links = linkedFields[key];
        var done = false;
        var fieldToDelete = null;

        for (var field in links) {
          var link = links[field];

          if (link.value === deletedID) {
            //console.log("should modify: " + key + " field: " + field);
            if (elementData[key] !== undefined) {
              elementData[key][field] = "Not assigned";
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
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(elementData, validated);
    }
  }, {
    key: "createList",
    value: function createList() {
      var _this2 = this;

      var elementList = this.state.elementList;
      var elementData = this.state.elementData;
      var highestZ = 0;

      for (var k = 0; k < this.state.elementList.length; k++) {
        var item = elementList[k];
        var z = item.z;
        if (z > highestZ) highestZ = z;
      } //console.log("HighestZ: " + highestZ);


      var styleGrabber = {
        paddingLeft: "8px",
        fontSize: "14px",
        fontWeight: "bold"
      };
      var styleCloser = {
        paddingRight: "8px",
        border: "none",
        font: "14px",
        fontWeight: "bold",
        backgroundColor: "transparent",
        cursor: "pointer"
      };
      var styleContainer = {
        display: "flex",
        justifyContent: "space-between",
        height: "20px"
      };
      var stylesContainer = {};
      var stylesImages = {};
      elementList.map(function (item) {
        var x = item.x;
        var y = item.y;
        var containerWidth = item.width;
        var containerHeight = item.height;
        if (containerWidth == -1) containerWidth = 100;
        if (containerHeight == -1) containerHeight = 100;

        if (!item.validated) {
          containerWidth += 10;
          containerHeight += 10;
        }

        stylesContainer[item.ID] = Object.assign({
          width: "".concat(containerWidth, "px"),
          height: "".concat(containerHeight + 30, "px")
        }, {
          position: "absolute",
          left: x,
          top: y
        });
        stylesImages[item.ID] = {
          width: item.width,
          height: item.height
        };
      });
      var droppableElement = [];
      var componentsSchema = this.state.componentsSchema;
      var elementByType = {};
      Object.keys(elementData).forEach(function (key) {
        var element = elementData[key];
        var schemaID = element.Schema_ID.replace(".json", "");

        if (elementByType[schemaID] === undefined) {
          elementByType[schemaID] = {};
        }

        elementByType[schemaID][element.Name] = element.ID;
      });

      var _loop = function (_k) {
        elementList.map(function (item, index) {
          if (item.z != _k) return;
          var schema_id = item.schema_ID;
          var schema = componentsSchema[schema_id];
          droppableElement.push(_react["default"].createElement("div", {
            style: stylesContainer[item.ID],
            key: "draggableWrapper" + index
          }, _react["default"].createElement(_reactDragDropContainer.DragDropContainer, {
            targetKey: "canvas",
            key: "draggable" + index,
            dragClone: false,
            dragData: {
              source: "canvas",
              index: index
            },
            onDragStart: _this2.dragged,
            dragHandleClassName: "grabber"
          }, _react["default"].createElement("div", {
            style: styleContainer
          }, _react["default"].createElement("div", {
            className: "grabber",
            style: styleGrabber
          }, "\u2237"), _react["default"].createElement(_canvasElement.CanvasElementDeleteButton, {
            index: index,
            onDelete: _this2.onDelete,
            myStyle: styleCloser,
            isViewOnly: _this2.props.isViewOnly
          })), _react["default"].createElement(_canvasElement["default"], {
            activeTier: _this2.props.activeTier,
            id: item.ID //image={`${this.props.imagesPath}${schema.image}`}
            ,
            image: path.join(_this2.props.imagesPath, schema.image),
            schema: schema,
            onConfirm: _this2.onCanvasElementDataSave,
            updateDimensions: _this2.updatedDimensions,
            overlaysContainer: _this2.props.overlaysContainer,
            inputData: elementData[item.ID],
            width: stylesImages[item.ID].width,
            height: stylesImages[item.ID].height,
            validated: item.validated,
            dragged: item.dragged,
            currentChildrenComponentIdentifier: currentNumberOf_identifier,
            minChildrenComponentIdentifier: minNumberOf_identifier,
            maxChildrenComponentIdentifier: maxNumberOf_identifier,
            elementByType: elementByType,
            isViewOnly: _this2.props.isViewOnly,
            setEditingOnCanvas: _this2.setEditingOnCanvas
          }), _react["default"].createElement("div", {
            className: "styleName",
            style: {
              width: stylesImages[item.ID].width,
              textAlign: "center",
              fontSize: "75%",
              paddingLeft: "10px",
              overflow: "hidden"
            }
          }, item.name))));
        });
      };

      for (var _k = 0; _k <= highestZ; _k++) {
        _loop(_k);
      }

      return droppableElement;
    }
  }, {
    key: "render",
    value: function render() {
      console.log("LinkedFields");
      console.log(this.state.linkedFields);
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var styleContainer = {
        borderBottom: "2px solid",
        borderTop: "2px solid",
        borderRight: "2px solid",
        color: "black",
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      };
      var dropTargetStyle = {
        width: "".concat(width - 2, "px"),
        height: "".concat(height - 4, "px")
      };
      var imageStyle = null;
      imageStyle = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var micInfo = [];

      if (this.props.microscope !== null && this.props.microscope !== undefined) {
        if (this.props.microscope.Name) {
          micInfo.push("Name: ".concat(this.props.microscope.Name));
          micInfo.push(_react["default"].createElement("br", {
            key: "newline-1"
          }));
        }

        if (this.props.microscope.Manufacturer !== null && this.props.microscope.Manufacturer !== undefined) {
          micInfo.push("Manufacturer: ".concat(this.props.microscope.Manufacturer));
          micInfo.push(_react["default"].createElement("br", {
            key: "newline-2"
          }));
        }

        if (this.props.microscope.Model !== null && this.props.microscope.Model !== undefined) {
          micInfo.push("Model: ".concat(this.props.microscope.Model));
          micInfo.push(_react["default"].createElement("br", {
            key: "newline-3"
          }));
        }
      }

      return (//TODO i could use the img container with absolute position and put stuff on top of it
        //<img src={imageFilePath} alt={imageFilePath} style={style.image} />
        //TODO this should be in a scrollable pane
        //<div ref={this.ref} style={styleFullWindow}>
        _react["default"].createElement("div", {
          style: styleContainer
        }, _react["default"].createElement(_reactDragDropContainer.DropTarget, {
          style: dropTargetStyle,
          onHit: this.dropped,
          targetKey: "canvas"
        }, _react["default"].createElement("div", {
          style: {
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "auto"
          },
          onScroll: this.handleScroll
        }, _react["default"].createElement("div", {
          style: {
            width: "2377px",
            height: "969px",
            position: "absolute",
            left: 0,
            top: 0
          }
        }, _react["default"].createElement("img", {
          src: this.props.backgroundImage,
          alt: this.props.backgroundImage,
          style: imageStyle,
          onLoad: this.onImgLoad
        })), _react["default"].createElement("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0
          }
        }, _react["default"].createElement("p", null, micInfo)), this.createList())))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.componentsSchema !== null) {
        var componentsSchema = {};
        Object.keys(props.componentSchemas).forEach(function (schemaIndex) {
          var schema = props.componentSchemas[schemaIndex];
          var schema_id = schema.ID;
          componentsSchema[schema_id] = schema;
        });
        var elementList = state.elementList;

        for (var i = 0; i < elementList.length; i++) {
          var element = elementList[i];
          var schema_id = element.schema_ID;
          var schema = componentsSchema[schema_id];
          var object = element.obj;
          var validation = validate(object, schema);
          var validated = validation.valid;
          element.validated = validated;
        }

        return {
          componentsSchema: componentsSchema
        };
      }

      return null;
    }
  }]);

  return Canvas;
}(_react["default"].PureComponent);

exports["default"] = Canvas;