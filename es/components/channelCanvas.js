function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { DragDropContainer } from "react-drag-drop-container";
import CanvasElement from "./canvasElement";
import { CanvasElementDeleteButton } from "./canvasElement";
import { pathToFileURL } from "url";

var url = require("url");

var validate = require("jsonschema").validate;

var uuidv4 = require("uuid/v4");

import { bool_isDebug, string_na, string_object, string_array, string_toolbar, string_canvas, string_json_ext, string_currentNumberOf_identifier, string_minNumberOf_identifier, string_maxNumberOf_identifier, number_canvas_width, number_canvas_height } from "../constants";
import { bool } from "prop-types";

var ChannelsCanvas = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ChannelsCanvas, _React$PureComponent);

  var _super = _createSuper(ChannelsCanvas);

  function ChannelsCanvas(props) {
    var _this;

    _classCallCheck(this, ChannelsCanvas);

    _this = _super.call(this, props);
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
      headerOffset: props.headerOffset || 0,
      isEditing: false,
      hover: null
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
    _this.handleMouseIn = _this.handleMouseIn.bind(_assertThisInitialized(_this));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_this));
    _this.onCanvasElementDataSave = _this.onCanvasElementDataSave.bind(_assertThisInitialized(_this));
    _this.getElementData = _this.getElementData.bind(_assertThisInitialized(_this));
    _this.updatedDimensions = _this.updatedDimensions.bind(_assertThisInitialized(_this));
    _this.areAllElementsValidated = _this.areAllElementsValidated.bind(_assertThisInitialized(_this));
    _this.onImgLoad = _this.onImgLoad.bind(_assertThisInitialized(_this));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));

    _this.props.updateElementData(_this.state.elementData, true);

    return _this;
  }

  _createClass(ChannelsCanvas, [{
    key: "setEditingOnCanvas",
    value: function setEditingOnCanvas(isEditing) {
      this.setState({
        isEditing: isEditing
      });
    }
  }, {
    key: "handleMouseIn",
    value: function handleMouseIn(itemID) {
      this.setState({
        hover: itemID
      });
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut() {
      this.setState({
        hover: null
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
      if (element === null || obj === undefined) return;

      if (element.width !== -1 && element.height !== -1 && !isResize) {
        return;
      }

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
      var ID = draggedItem.ID;
      var x = draggedItem.x;
      var y = draggedItem.y;
      var r1_x = x + draggedItem.width;
      var r1_y = y + draggedItem.height;
      var oldZ = draggedItem.z;

      for (var k = 0; k < this.state.elementList.length; k++) {
        var item = this.state.elementList[k];
        if (ID === item.ID) continue;
        var l2_x = item.x;
        var l2_y = item.y;
        var r2_x = l2_x + item.width;
        var r2_y = l2_y + item.height;

        if (x > r2_x || r1_x < l2_x) {
          continue;
        }

        if (y > r2_y || r1_y < l2_y) {
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
  }, {
    key: "dropped",
    value: function dropped(e) {
      var sourceElement = e.dragData;
      var newElementList = this.state.elementList.slice();
      var newElementDataList = Object.assign({}, this.state.elementData);
      var newElement = null;
      var x = e.x;
      var y = e.y - this.state.headerOffset;
      var offsetX = this.state.offsetX;
      var offsetY = this.state.offsetY;
      var containerOffsetX = this.props.containerOffsetLeft;
      var containerOffsetY = this.props.containerOffsetTop;
      x += offsetX - containerOffsetX;
      y += offsetY - containerOffsetY;

      if (sourceElement.source !== string_toolbar) {
        x -= 5;
        y -= 15;
      }

      var width = 100;
      var height = 100;
      var componentsSchema = this.state.componentsSchema;
      var index = null;
      var ID = null;

      if (sourceElement.source === string_toolbar) {
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
          x: x,
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
        var item = this.state.elementList[sourceElement.index];
        var _schema_ID = newElementList[sourceElement.index].schema_ID;
        var _schema = componentsSchema[_schema_ID];
        newElementList[sourceElement.index].x = x;
        newElementList[sourceElement.index].y = y;
        newElementList[sourceElement.index].dragged = false;
        newElementList[sourceElement.index].offsetX = offsetX;
        newElementList[sourceElement.index].offsetY = offsetY;
        newElementDataList[item.ID].PositionX = x;
        newElementDataList[item.ID].PositionY = y;
        newElementDataList[item.ID].OffsetX = offsetX;
        newElementDataList[item.ID].OffsetY = offsetY;
        this.addComponentsIndexesIfMissing(_schema, newElementDataList[item.ID]);
        width = item.width;
        height = item.height;
        index = sourceElement.index;
        ID = item.ID;
      }

      var newZ = 0;
      var l1_x = x;
      var l1_y = y;
      var r1_x = x + width;
      var r1_y = y + height;

      for (var k = 0; k < this.state.elementList.length; k++) {
        var _item = this.state.elementList[k];
        if (ID === _item.ID) continue;
        var l2_x = _item.x;
        var l2_y = _item.y;
        var r2_x = l2_x + _item.width;
        var r2_y = l2_y + _item.height;

        if (l1_x > r2_x || r1_x < l2_x) {
          continue;
        }

        if (l1_y > r2_y || r1_y < l2_y) {
          continue;
        }

        if (_item.z + 1 > newZ) newZ = _item.z + 1;
      }

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
        var currentNumber = string_currentNumberOf_identifier + key;
        var minNumber = string_minNumberOf_identifier + key;
        var maxNumber = string_maxNumberOf_identifier + key;

        if (newElementData[currentNumber] !== undefined) {
          return;
        }

        if (schema.properties[key].type === string_array) {
          if (schema.required.indexOf(key) != -1) {
            newElementData[currentNumber] = 1;
            newElementData[minNumber] = 1;
            newElementData[maxNumber] = -1;
          } else {
            newElementData[currentNumber] = 0;
            newElementData[minNumber] = 0;
            newElementData[maxNumber] = -1;
          }
        } else if (schema.properties[key].type === string_object) {
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
      var deletedSchema = schemaID.replace(string_json_ext, "");
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
            if (elementData[key] !== undefined) {
              elementData[key][field] = string_na;
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

      var scalingFactor = this.props.scalingFactor;
      var hover = this.state.hover;
      var elementList = this.state.elementList;
      var elementData = this.state.elementData;
      var highestZ = 0;

      for (var k = 0; k < this.state.elementList.length; k++) {
        var item = elementList[k];
        var z = item.z;
        if (z > highestZ) highestZ = z;
      }

      var styleGrabber = {
        lineHeight: "12px",
        fontSize: "12px",
        fontWeight: "bold",
        color: "grey",
        textAlign: "left",
        verticalAlign: "top"
      };
      var styleCloser = {
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

      var styleActionContainer = {
        display: "flex",
        flexDirection: "column",
        width: "10px"
      };
      var styleActionElementNameContainer = {
        display: "flex",
        flexDirection: "row"
      };
      var styleElementNameContainer = {
        display: "flex",
        flexDirection: "column"
      }; //paddingLeft: "5px",

      var styleNameHover = {
        overflow: "unset",
        fontSize: "80%",
        textAlign: "left",
        lineHeight: "125%",
        color: "gray"
      };
      var styleNameRegular = {
        display: "none"
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
        var scaledContainerWidth = containerWidth * scalingFactor;
        var scaledContainerHeight = containerHeight * scalingFactor;

        if (!item.validated) {
          scaledContainerWidth += 10;
          scaledContainerHeight += 10;
        }

        stylesContainer[item.ID] = Object.assign({
          width: "".concat(scaledContainerWidth + 10, "px"),
          height: "".concat(scaledContainerHeight + 7, "px")
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
        var schemaID = element.Schema_ID.replace(string_json_ext, "");

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
          var styleName = null;

          if (item.ID === hover) {
            styleName = Object.assign(styleNameHover, {
              width: "".concat(stylesImages[item.ID].width, "px")
            });
          } else {
            styleName = styleNameRegular;
          }

          droppableElement.push( /*#__PURE__*/React.createElement("div", {
            style: stylesContainer[item.ID],
            key: "draggableWrapper" + index,
            onMouseEnter: function onMouseEnter() {
              return _this2.handleMouseIn(item.ID);
            },
            onMouseLeave: _this2.handleMouseOut
          }, /*#__PURE__*/React.createElement(DragDropContainer, {
            targetKey: string_canvas,
            key: "draggable" + index,
            dragClone: false,
            dragData: {
              source: string_canvas,
              index: index
            },
            onDragStart: _this2.dragged,
            dragHandleClassName: "grabber"
          }, /*#__PURE__*/React.createElement("div", {
            style: styleActionElementNameContainer
          }, /*#__PURE__*/React.createElement("div", {
            style: styleActionContainer
          }, /*#__PURE__*/React.createElement("div", {
            className: "grabber",
            style: styleGrabber
          }, "\u2237"), /*#__PURE__*/React.createElement(CanvasElementDeleteButton, {
            index: index,
            handleDelete: _this2.onDelete,
            myStyle: styleCloser,
            isViewOnly: _this2.props.isViewOnly
          })), /*#__PURE__*/React.createElement("div", {
            style: styleElementNameContainer
          }, /*#__PURE__*/React.createElement(CanvasElement, {
            activeTier: _this2.props.activeTier,
            id: item.ID,
            image: url.resolve(_this2.props.imagesPath, schema.image),
            schema: schema,
            handleConfirm: _this2.onCanvasElementDataSave,
            updateDimensions: _this2.updatedDimensions,
            overlaysContainer: _this2.props.overlaysContainer,
            inputData: elementData[item.ID],
            width: stylesImages[item.ID].width,
            height: stylesImages[item.ID].height,
            validated: item.validated,
            dragged: item.dragged,
            currentChildrenComponentIdentifier: string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: string_maxNumberOf_identifier,
            elementByType: elementByType,
            isViewOnly: _this2.props.isViewOnly,
            setEditingOnCanvas: _this2.setEditingOnCanvas,
            scalingFactor: scalingFactor
          }), /*#__PURE__*/React.createElement("div", {
            style: styleName
          }, item.name))))));
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
      var _this$props = this.props,
          backgroundImage = _this$props.backgroundImage,
          _this$props$dimension = _this$props.dimensions;
      _this$props$dimension = _this$props$dimension === void 0 ? {} : _this$props$dimension;
      var width = _this$props$dimension.width,
          height = _this$props$dimension.height,
          _this$props$microscop = _this$props.microscope,
          microscope = _this$props$microscop === void 0 ? null : _this$props$microscop,
          _this$props$scalingFa = _this$props.scalingFactor,
          scalingFactor = _this$props$scalingFa === void 0 ? 1 : _this$props$scalingFa;
      this.state.linkedFields; // if (bool_isDebug) {
      // 	console.log("LinkedFields");
      // 	console.log(linkedFields);
      // }

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
      var canvasInnerContainerStyle = {
        width: "".concat(number_canvas_width * scalingFactor, "px"),
        height: "".concat(number_canvas_height * scalingFactor, "px"),
        position: "absolute",
        left: 0,
        top: 0
      };
      var micInfo = [];

      if (microscope !== null && microscope !== undefined) {
        if (microscope.Name) {
          micInfo.push("Name: ".concat(microscope.Name));
          micInfo.push( /*#__PURE__*/React.createElement("br", {
            key: "newline-1"
          }));
        }

        if (microscope.Manufacturer !== null && microscope.Manufacturer !== undefined) {
          micInfo.push("Manufacturer: ".concat(microscope.Manufacturer));
          micInfo.push( /*#__PURE__*/React.createElement("br", {
            key: "newline-2"
          }));
        }

        if (microscope.Model !== null && microscope.Model !== undefined) {
          micInfo.push("Model: ".concat(microscope.Model));
          micInfo.push( /*#__PURE__*/React.createElement("br", {
            key: "newline-3"
          }));
        }
      }

      return /*#__PURE__*/React.createElement("div", {
        style: styleContainer
      }, /*#__PURE__*/React.createElement(DropTarget, {
        style: dropTargetStyle,
        onHit: this.dropped,
        targetKey: string_canvas
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "auto"
        },
        onScroll: this.handleScroll
      }, /*#__PURE__*/React.createElement("div", {
        style: canvasInnerContainerStyle
      }, /*#__PURE__*/React.createElement("img", {
        src: backgroundImage + (backgroundImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: backgroundImage,
        style: {
          width: "100%",
          height: "100%",
          margin: "auto"
        },
        onLoad: this.onImgLoad
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0
        }
      }, /*#__PURE__*/React.createElement("p", null, micInfo)), this.createList())));
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

  return ChannelsCanvas;
}(React.PureComponent);

export { ChannelsCanvas as default };