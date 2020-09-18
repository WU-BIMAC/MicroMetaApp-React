"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _canvasElement = _interopRequireWildcard(require("./canvasElement"));

var _url = require("url");

var _uuid = require("uuid");

var _constants = require("../constants");

var _propTypes = require("prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var url = require("url");

var validate = require("jsonschema").validate;

var Canvas = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Canvas, _React$PureComponent);

  var _super = _createSuper(Canvas);

  function Canvas(props) {
    var _this;

    _classCallCheck(this, Canvas);

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
      hover: null,
      draggingID: null,
      showcasedSpot: null,
      occupiedSpots: [],
      originalDimensions: {}
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
          height: object.Height,
          occupiedSpot: object.OccupiedSpot
        };
        var occupiedSpot = object.OccupiedSpot;

        if (occupiedSpot !== undefined) {
          newElement = Object.assign(newElement, {
            occupiedSpot: occupiedSpot
          });
        } else {
          newElement = Object.assign(newElement, {
            occupiedSpot: null
          });
        }

        if (occupiedSpot !== undefined && occupiedSpot !== null) _this.state.occupiedSpots.push(occupiedSpot);

        _this.state.elementList.push(newElement);
      });
      _this.state.componentsSchema[schema_id] = schema;
    });
    _this.setEditingOnCanvas = _this.setEditingOnCanvas.bind(_assertThisInitialized(_this));
    _this.addComponentsIndexesIfMissing = _this.addComponentsIndexesIfMissing.bind(_assertThisInitialized(_this));
    _this.dragged = _this.dragged.bind(_assertThisInitialized(_this));
    _this.dropped = _this.dropped.bind(_assertThisInitialized(_this));
    _this.isDragging = _this.isDragging.bind(_assertThisInitialized(_this));
    _this.isNotDragging = _this.isNotDragging.bind(_assertThisInitialized(_this));
    _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
    _this.handleMouseIn = _this.handleMouseIn.bind(_assertThisInitialized(_this));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_this));
    _this.onCanvasElementDataSave = _this.onCanvasElementDataSave.bind(_assertThisInitialized(_this));
    _this.getElementData = _this.getElementData.bind(_assertThisInitialized(_this));
    _this.updatedDimensions = _this.updatedDimensions.bind(_assertThisInitialized(_this));
    _this.areAllElementsValidated = _this.areAllElementsValidated.bind(_assertThisInitialized(_this)); //this.onImgLoad = this.onImgLoad.bind(this);

    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.clearOccupiedSpotOnElements = _this.clearOccupiedSpotOnElements.bind(_assertThisInitialized(_this));

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
    } // onImgLoad({ target: img }) {
    // 	let oldHeight = this.state.imgHeight;
    // 	let oldWidth = this.state.imgWidth;
    // 	if (oldWidth !== null && oldHeight !== null) return;
    // 	let newHeight = img.height;
    // 	let newWidth = img.width;
    // 	this.setState({
    // 		imgHeight: newHeight,
    // 		imgWidth: newWidth,
    // 	});
    // }

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
    key: "clearOccupiedSpotOnElements",
    value: function clearOccupiedSpotOnElements(occupiedSpotsToClear) {
      var newElementList = this.state.elementList.slice();
      var newElementDataList = Object.assign({}, this.state.elementData);
      newElementList.map(function (item, index) {
        if (occupiedSpotsToClear.includes(item.occupiedSpot)) {
          newElementList[index].occupiedSpot = null;
          newElementDataList[item.ID] = null;
        }
      });
      this.setState({
        elementList: newElementList,
        elementData: newElementDataList
      });
    }
  }, {
    key: "isDragging",
    value: function isDragging(e) {
      var occupiedSpots = this.state.occupiedSpots.slice(); // console.log("occupiedSpots");
      // console.log(occupiedSpots);

      var elementDimensions = this.props.canvasElementsDimensions;
      var componentsSchema = this.state.componentsSchema;
      var newElementList = this.state.elementList;
      var sourceElement = e.dragData;
      var schema_ID = null;
      var occupiedSpot = null;

      if (sourceElement.source === _constants.string_toolbar) {
        schema_ID = sourceElement.schema_ID;
      } else {
        schema_ID = newElementList[sourceElement.index].schema_ID;
        occupiedSpot = newElementList[sourceElement.index].occupiedSpot;
        newElementList[sourceElement.index].id;
      } // console.log("occupiedSpot in drag");
      // console.log(occupiedSpot);


      e.x;
      e.y - this.state.headerOffset;
      var schema = componentsSchema[schema_ID];
      var ns_ID = null;

      if (elementDimensions[schema.category] !== undefined && elementDimensions[schema.category] !== null) {
        ns_ID = schema.category;
        elementDimensions[ns_ID]; // console.log("Found category NSID: " + ns_ID);
        // console.log(spots);
      } else {
        ns_ID = schema.category + "_" + schema_ID.replace(".json", "");
        elementDimensions[ns_ID]; // console.log("Found full name NSID: " + ns_ID);
        // console.log(spots);
      }

      if (occupiedSpot !== undefined && occupiedSpot !== null) {
        var indexOf = occupiedSpots.indexOf(occupiedSpot); // console.log("indexOf in drag");
        // console.log(indexOf);

        if (indexOf !== -1) {
          occupiedSpots.splice(indexOf, 1); // console.log("occupiedSpots");
          // console.log(occupiedSpots);
        }
      } //console.log("X: " + x + "||" + "Y: " + y);
      // for (let i = 0; i < spots.length; i++) {
      // 	let spot = spots[i];
      // 	let x1 = spot.x - spot.w / 2;
      // 	let x2 = spot.x + spot.w / 2;
      // 	let y1 = spot.y - spot.h / 2;
      // 	let y2 = spot.y + spot.h / 2;
      // 	console.log("X1: " + x1 + "||" + "Y1: " + y1);
      // 	console.log("X2: " + x2 + "||" + "Y2: " + y2);
      // 	if (x > x1 && x < x2 && y > y1 && y < y2) {
      // 		console.log("IMHERE");
      // 		showcasedSpot = spot;
      // 		break;
      // 	}
      // }
      //console.log("ns_ID");
      //console.log(ns_ID);


      this.setState({
        draggingID: ns_ID,
        showcasedSpot: null,
        occupiedSpots: occupiedSpots
      });
    }
  }, {
    key: "isNotDragging",
    value: function isNotDragging() {
      this.setState({
        draggingID: null,
        showcasedSpot: null
      });
    }
  }, {
    key: "dragged",
    value: function dragged(e) {
      var newElementList = this.state.elementList.slice();
      var newElementDataList = Object.assign({}, this.state.elementData);
      var occupiedSpots = this.state.occupiedSpots.slice();
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

      var occupiedSpotsToClear = [];
      var length = occupiedSpots.length;

      for (var i = 0; i < length; i++) {
        var tmpSpot = occupiedSpots[i];

        if (tmpSpot.includes(ID)) {
          occupiedSpotsToClear.push(tmpSpot);
          occupiedSpots.splice(i, 1);
          length--;
        }
      }

      newElementList.map(function (item, index) {
        if (occupiedSpotsToClear.includes(item.occupiedSpot)) {
          newElementList[index].occupiedSpot = null;
          newElementDataList[item.ID] = null;
        }
      });
      this.setState({
        elementList: newElementList,
        elementData: newElementDataList,
        occupiedSpots: occupiedSpots
      });
    }
  }, {
    key: "dropped",
    value: function dropped(e) {
      var scalingFactor = this.props.scalingFactor;
      var componentsSchema = this.state.componentsSchema;
      var elementDimensions = this.props.canvasElementsDimensions;
      var sourceElement = e.dragData;
      var newElementList = this.state.elementList.slice();
      var newElementDataList = Object.assign({}, this.state.elementData);
      var originalDimensions = Object.assign({}, this.state.originalDimensions);
      var newElement = null;
      var occupiedSpots = this.state.occupiedSpots.slice();
      var x = e.x;
      var y = e.y - this.state.headerOffset;
      var schema_ID = null;

      if (sourceElement.source === _constants.string_toolbar) {
        schema_ID = sourceElement.schema_ID;
      } else {
        schema_ID = newElementList[sourceElement.index].schema_ID;
      }

      var schema = componentsSchema[schema_ID];
      var spots = null;
      var ns_ID = null;

      if (elementDimensions[schema.category] !== undefined && elementDimensions[schema.category] !== null) {
        ns_ID = schema.category;
        spots = elementDimensions[ns_ID];
      } else {
        ns_ID = schema.category + "_" + schema_ID.replace(".json", "");
        spots = elementDimensions[ns_ID];
      }

      var offsetX = this.state.offsetX;
      var offsetY = this.state.offsetY;
      var containerOffsetX = this.props.containerOffsetLeft;
      var containerOffsetY = this.props.containerOffsetTop;
      x += offsetX - containerOffsetX;
      y += offsetY - containerOffsetY; //console.logconsole.log("X: " + x + " - " + "Y: " + y);

      var occupiedSpot = null;
      var width = 100;
      var height = 100;

      if (spots !== undefined && spots !== null) {
        if (ns_ID === "LightPath_ExcitationFilter" || ns_ID === "LightPath_EmissionFilter" || ns_ID === "LightPath_StandardDichroic") {
          var spot = spots;
          var spotW = spot.w * scalingFactor;
          var spotH = spot.h * scalingFactor;
          width = spotW;
          height = spotH;
          newElementList.map(function (item) {
            if (item.schema_ID === "FilterSet.json") {
              var tmpID = item.ID + "_" + ns_ID;
              if (occupiedSpots.includes(tmpID)) return;
              var xOff = item.x + item.width / 2 + spot.x * scalingFactor; // + containerOffsetX;

              var yOff = item.y + item.height / 2 + (_constants.number_canvas_element_icons_height
              /** scalingFactor*/
              + _constants.number_canvas_element_offset_default) + spot.y * scalingFactor; // + containerOffsetY;

              var x1 = xOff - spotW / 2;
              var y1 = yOff - spotH / 2;

              if (x > x1 && x < xOff + spotW / 2 && y > y1 && y < yOff + spotH / 2) {
                x = x1;
                y = y1;
                occupiedSpot = tmpID;
              }
            }
          });
        } else if (Array.isArray(spots)) {
          for (var i = 0; i < spots.length; i++) {
            var tmpID = ns_ID + "_" + i;
            var _spot = spots[i];

            var _spotW = _spot.w * scalingFactor;

            var _spotH = _spot.h * scalingFactor;

            width = _spotW;
            height = _spotH;
            if (occupiedSpots.includes(tmpID)) continue;

            if (_spot.x !== -1 && _spot.y !== -1) {
              var xOff = _spot.x * scalingFactor; // + containerOffsetX; // + (offsetX - containerOffsetX);

              var yOff = _spot.y * scalingFactor; // + containerOffsetY; // + (offsetY - containerOffsetY);

              var x1 = xOff - _spotW / 2;
              var y1 = yOff - _spotH / 2;

              if (x > x1 && x < xOff + _spotW / 2 && y > y1 && y < yOff + _spotH / 2) {
                x = x1;
                y = y1;
                occupiedSpot = tmpID;
                break;
              }
            }
          }
        } else {
          var _tmpID = ns_ID + "_" + 1;

          var _spot2 = spots;

          var _spotW2 = _spot2.w * scalingFactor;

          var _spotH2 = _spot2.h * scalingFactor;

          width = _spotW2;
          height = _spotH2;

          if (!occupiedSpots.includes(_tmpID)) {
            if (_spot2.x !== -1 && _spot2.y !== -1) {
              var _xOff = _spot2.x * scalingFactor; // + containerOffsetX; // + (offsetX - containerOffsetX);


              var _yOff = _spot2.y * scalingFactor; // + containerOffsetY; // + (offsetY - containerOffsetY);


              var _x = _xOff - _spotW2 / 2;

              var _y = _yOff - _spotH2 / 2;

              if (x > _x && x < _xOff + _spotW2 / 2 && y > _y && y < _yOff + _spotH2 / 2) {
                x = _x;
                y = _y;
                occupiedSpot = _tmpID;
              }
            }
          }
        }
      } //console.log("DROPPED: w-" + width + "||h-" + height);


      var minElementWidth = _constants.number_canvas_element_min_width * scalingFactor;
      var adjustedWidth = 0;

      if (width < minElementWidth) {
        adjustedWidth = (minElementWidth - width) / 2;
        x -= adjustedWidth;
        width = minElementWidth;
      }

      if (originalDimensions[schema_ID] === undefined) {
        originalDimensions[schema_ID] = {
          w: width,
          h: height
        };
      }

      if (occupiedSpot !== null) {
        occupiedSpots.push(occupiedSpot);
        y -= _constants.number_canvas_element_icons_height; // * scalingFactor;
      } else {
        y -= 5 * scalingFactor;
        x -= 5 * scalingFactor;
      }

      y -= 6.67; // if (sourceElement.source !== string_toolbar) {
      // 	x -= 5;
      // 	y -= 15;
      // }

      var index = null;
      var ID = null; // console.log("occupiedSpot in drop to be set");
      // console.log(occupiedSpot);

      if (sourceElement.source === _constants.string_toolbar) {
        var uuid = (0, _uuid.v4)();
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
          width: width,
          height: height,
          offsetX: offsetX,
          offsetY: offsetY,
          occupiedSpot: occupiedSpot
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
          Width: width,
          Height: height,
          OffsetX: offsetX,
          OffsetY: offsetY,
          OccupiedSpot: occupiedSpot
        };
        newElement.name = newElementData.Name;
        this.addComponentsIndexesIfMissing(schema, newElementData);
        newElement.obj = newElementData;
        newElementDataList[newElement.ID] = newElementData;
        index = newElementList.length - 1;
        ID = newElement.ID;
      } else {
        var item = this.state.elementList[sourceElement.index];

        if (item.occupiedSpot !== occupiedSpot) {
          var previousOccupiedSpot = item.occupiedSpot; // console.log("previousOccupiedSpot in drop");
          // console.log(previousOccupiedSpot);

          var indexOf = occupiedSpots.indexOf(previousOccupiedSpot);

          if (indexOf !== -1) {
            // console.log("indexOf in drop");
            // console.log(indexOf);
            occupiedSpots.splice(indexOf, 1);
          }
        }

        newElementList[sourceElement.index].x = x;
        newElementList[sourceElement.index].y = y;
        newElementList[sourceElement.index].dragged = false;
        newElementList[sourceElement.index].offsetX = offsetX;
        newElementList[sourceElement.index].offsetY = offsetY;
        newElementList[sourceElement.index].occupiedSpot = occupiedSpot;
        newElementDataList[item.ID].PositionX = x;
        newElementDataList[item.ID].PositionY = y;
        newElementDataList[item.ID].OffsetX = offsetX;
        newElementDataList[item.ID].OffsetY = offsetY;
        newElementDataList[item.ID].OccupiedSpot = occupiedSpot;

        if (occupiedSpot !== null) {
          newElementList[sourceElement.index].width = width;
          newElementList[sourceElement.index].height = height;
          newElementDataList[item.ID].Width = width;
          newElementDataList[item.ID].Height = height;
        }

        this.addComponentsIndexesIfMissing(schema, newElementDataList[item.ID]);
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
      newElementDataList[ID].PositionZ = newZ; // console.log("occupiedSpots");
      // console.log(occupiedSpots);

      this.setState({
        elementList: newElementList,
        elementData: newElementDataList,
        draggingID: null,
        showcasedSpot: null,
        occupiedSpots: occupiedSpots,
        originalDimensions: originalDimensions
      });
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(newElementDataList, validated);
    }
  }, {
    key: "addComponentsIndexesIfMissing",
    value: function addComponentsIndexesIfMissing(schema, newElementData) {
      Object.keys(schema.properties).forEach(function (key) {
        var currentNumber = _constants.string_currentNumberOf_identifier + key;
        var minNumber = _constants.string_minNumberOf_identifier + key;
        var maxNumber = _constants.string_maxNumberOf_identifier + key;

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
      var elementDimensions = this.props.canvasElementsDimensions;
      var componentsSchema = this.state.componentsSchema;
      var occupiedSpots = this.state.occupiedSpots.slice();
      var schema = componentsSchema[schemaID];
      var occupiedSpot = elementList[index].occupiedSpot;

      if (elementDimensions[schema.category] !== undefined && elementDimensions[schema.category] !== null) {
        schema.category; //console.log("Found category NSID: " + ns_ID);
        //console.log(spots);
      } else {
        schema.category + "_" + schemaID.replace(".json", ""); //console.log("Found full name NSID: " + ns_ID);
        //console.log(spots);
      }

      if (occupiedSpot !== undefined && occupiedSpot !== null) {
        var indexOf = occupiedSpots.indexOf(occupiedSpot); // console.log("indexOf in drag");
        // console.log(indexOf);

        if (indexOf !== -1) {
          occupiedSpots.splice(indexOf, 1); // console.log("occupiedSpots");
          // console.log(occupiedSpots);
        }
      }

      var occupiedSpotsToClear = [];
      var length = occupiedSpots.length;

      for (var i = 0; i < length; i++) {
        var tmpSpot = occupiedSpots[i];

        if (tmpSpot.includes(id)) {
          occupiedSpotsToClear.push(tmpSpot);
          occupiedSpots.splice(i, 1);
          length--;
        }
      }

      elementList.map(function (item, index) {
        if (occupiedSpotsToClear.includes(item.occupiedSpot)) {
          elementList[index].occupiedSpot = null;
          elementData[item.ID].OccupiedSpot = null;
        }
      }); // console.log("elementList");
      // console.log(elementList);
      // console.log("elementData");
      // console.log(elementData);

      var deletedSchema = schemaID.replace(_constants.string_json_ext, "");
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
        elementData: elementData,
        occupiedSpots: occupiedSpots
      });
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(elementData, validated);
    }
  }, {
    key: "createList",
    value: function createList() {
      var _this2 = this;

      var scalingFactor = this.props.scalingFactor;
      var originalDimensions = this.state.originalDimensions;
      var hover = this.state.hover;
      var elementList = this.state.elementList;
      var elementData = this.state.elementData;
      var highestZ = 0;

      for (var k = 0; k < this.state.elementList.length; k++) {
        var item = elementList[k];
        var z = item.z;
        if (z > highestZ) highestZ = z;
      } // let imageValidationSize = 16 * scalingFactor;
      // const imageValidation = {
      // 	height: `${imageValidationSize}px`,
      // 	width: `${imageValidationSize}px`,
      // 	margin: "auto",
      // 	verticalAlign: "middle",
      // };


      var fontSize = (_constants.number_canvas_element_icons_height + 2) * scalingFactor;
      var grabberCloserSize = _constants.number_canvas_element_icons_height * scalingFactor; //console.log("fontSize - " + fontSize);
      //console.log("grabberCloserSize - " + grabberCloserSize);

      var styleGrabber = {
        lineHeight: "".concat(grabberCloserSize, "px"),
        fontSize: "".concat(fontSize, "px"),
        fontWeight: "bold",
        color: "grey",
        textAlign: "center",
        verticalAlign: "middle"
      };
      var styleCloser = {
        lineHeight: "".concat(grabberCloserSize, "px"),
        padding: "0px",
        border: "none",
        fontSize: "".concat(fontSize, "px"),
        backgroundColor: "transparent",
        cursor: "pointer",
        color: "grey",
        textAlign: "center",
        verticalAlign: "middle"
      }; //justifyContent: "space-between"

      var minElementWidth = _constants.number_canvas_element_min_width * scalingFactor; //	console.log("minElementWidth - " + minElementWidth);

      var styleActionContainer = {
        display: "flex",
        flexDirection: "row",
        width: "".concat(minElementWidth, "px"),
        height: "".concat(grabberCloserSize, "px")
      };
      var styleActionElementNameContainer = {
        display: "flex",
        flexDirection: "column"
      };
      var styleElementNameContainer = {
        display: "flex",
        flexDirection: "column"
      }; //paddingLeft: "5px",

      var styleNameHover = {
        overflow: "unset",
        fontSize: "".concat(80 * scalingFactor, "%"),
        textAlign: "left",
        lineHeight: "".concat(125, "%"),
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
        var containerHeight = item.height; // if (containerWidth == -1) containerWidth = 100;
        // if (containerHeight == -1) containerHeight = 100;

        var scaledContainerWidth = containerWidth;
        var scaledContainerHeight = containerHeight; // if (!item.validated) {
        // 	scaledContainerWidth += 10;
        // 	scaledContainerHeight += 10;
        // }

        if (scaledContainerWidth <= minElementWidth) scaledContainerWidth = minElementWidth;
        scaledContainerHeight += _constants.number_canvas_element_icons_height
        /* * scalingFactor */
        + _constants.number_canvas_element_offset_default; // console.log("SCW - " + scaledContainerWidth);
        // console.log("SCH - " + scaledContainerHeight);

        stylesContainer[item.ID] = Object.assign({
          width: "".concat(scaledContainerWidth, "px"),
          height: "".concat(scaledContainerHeight, "px")
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
      var elementByType = {}; // console.log("elementData");
      // console.log(elementData);

      Object.keys(elementData).forEach(function (key) {
        var element = elementData[key]; // console.log("element");
        // console.log(element);

        var schemaID = element.Schema_ID.replace(_constants.string_json_ext, "");

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

          var minWidth = null;
          var maxWidth = null;
          var minHeight = null;
          var maxHeight = null;

          if (originalDimensions[schema_id] !== undefined) {
            var originalDim = originalDimensions[schema_id];
            minWidth = originalDim.w * scalingFactor / 2;
            maxWidth = originalDim.w * scalingFactor * 2;
            minHeight = originalDim.h * scalingFactor / 2;
            maxHeight = originalDim.h * scalingFactor * 2;
          }

          var validated;

          if (item.validated) {
            var styleValidated = Object.assign({}, styleGrabber, {
              color: "green"
            });
            validated = /*#__PURE__*/_react["default"].createElement("div", {
              style: styleValidated
            }, "\u25CF"); // let image = url.resolve(this.props.imagesPath, "green_thumb_up.svg");
            // validated = (
            // 	<img
            // 		src={
            // 			image +
            // 			(image.indexOf("githubusercontent.com") > -1
            // 				? "?sanitize=true"
            // 				: "")
            // 		}
            // 		alt={"validated"}
            // 		style={imageValidation}
            // 	/>
            // );
          } else {
            var styleNotValidated = Object.assign({}, styleGrabber, {
              color: "red"
            });
            validated = /*#__PURE__*/_react["default"].createElement("div", {
              style: styleNotValidated
            }, "\u25CF"); // let image = url.resolve(this.props.imagesPath, "red_thumb_down.svg");
            // validated = (
            // 	<img
            // 		src={
            // 			image +
            // 			(image.indexOf("githubusercontent.com") > -1
            // 				? "?sanitize=true"
            // 				: "")
            // 		}
            // 		alt={"not validated"}
            // 		style={imageValidation}
            // 	/>
            // );
          }

          droppableElement.push( /*#__PURE__*/_react["default"].createElement("div", {
            style: stylesContainer[item.ID],
            key: "draggableWrapper" + index,
            onMouseEnter: function onMouseEnter() {
              return _this2.handleMouseIn(item.ID);
            },
            onMouseLeave: _this2.handleMouseOut
          }, /*#__PURE__*/_react["default"].createElement(_reactDragDropContainer.DragDropContainer, {
            targetKey: _constants.string_canvas,
            key: "draggable" + index,
            dragClone: false,
            dragData: {
              source: _constants.string_canvas,
              index: index
            },
            onDragStart: _this2.dragged,
            dragHandleClassName: "grabber"
          }, /*#__PURE__*/_react["default"].createElement("div", {
            style: styleActionElementNameContainer
          }, /*#__PURE__*/_react["default"].createElement("div", {
            style: styleActionContainer
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "grabber",
            style: styleGrabber
          }, "\u2237"), validated, /*#__PURE__*/_react["default"].createElement(_canvasElement.CanvasElementDeleteButton, {
            index: index,
            handleDelete: _this2.onDelete,
            myStyle: styleCloser,
            isViewOnly: _this2.props.isViewOnly
          })), /*#__PURE__*/_react["default"].createElement("div", {
            style: styleElementNameContainer
          }, /*#__PURE__*/_react["default"].createElement(_canvasElement["default"], {
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
            minWidth: minWidth,
            maxWidth: maxWidth,
            minHeight: minHeight,
            maxHeight: maxHeight //validated={item.validated}
            ,
            dragged: item.dragged,
            currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
            minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
            maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
            elementByType: elementByType,
            isViewOnly: _this2.props.isViewOnly,
            setEditingOnCanvas: _this2.setEditingOnCanvas
          }), /*#__PURE__*/_react["default"].createElement("div", {
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
      var _this3 = this;

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
      this.state.linkedFields;
      var occupiedSpots = this.state.occupiedSpots;
      var elementList = this.state.elementList; // if (bool_isDebug) {
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
        width: "".concat(_constants.number_canvas_width * scalingFactor, "px"),
        height: "".concat(_constants.number_canvas_height * scalingFactor, "px"),
        position: "absolute",
        left: 0,
        top: 0
      };
      var micInfo = [];

      if (microscope !== null && microscope !== undefined) {
        if (microscope.Name) {
          micInfo.push("Name: ".concat(microscope.Name));
          micInfo.push( /*#__PURE__*/_react["default"].createElement("br", {
            key: "newline-1"
          }));
        }

        if (microscope.Manufacturer !== null && microscope.Manufacturer !== undefined) {
          micInfo.push("Manufacturer: ".concat(microscope.Manufacturer));
          micInfo.push( /*#__PURE__*/_react["default"].createElement("br", {
            key: "newline-2"
          }));
        }

        if (microscope.Model !== null && microscope.Model !== undefined) {
          micInfo.push("Model: ".concat(microscope.Model));
          micInfo.push( /*#__PURE__*/_react["default"].createElement("br", {
            key: "newline-3"
          }));
        }
      }

      var showcasedSpots = [];

      if (this.state.draggingID != null) {
        var elementDimensions = this.props.canvasElementsDimensions;
        var draggingID = this.state.draggingID;
        var markedSpots = elementDimensions[draggingID];
        var offsetX = this.state.offsetX;
        var offsetY = this.state.offsetY;
        var containerOffsetX = this.props.containerOffsetLeft;
        var containerOffsetY = this.props.containerOffsetTop;

        //console.log("occupiedSpots");
        //console.log(occupiedSpots);
        if (markedSpots !== undefined && markedSpots !== null) {
          if (draggingID === "LightPath_ExcitationFilter" || draggingID === "LightPath_EmissionFilter" || draggingID === "LightPath_StandardDichroic") {
            elementList.map(function (item) {
              if (item.schema_ID === "FilterSet.json") {
                var tmpID = item.ID + "_" + draggingID;
                if (occupiedSpots.includes(tmpID)) return;
                var spot = markedSpots;

                var _xOff2 = item.x + item.width / 2 + spot.x * scalingFactor; // + containerOffsetX; // + xOff;


                var _yOff2 = item.y + item.height / 2 + (_constants.number_canvas_element_icons_height
                /* * scalingFactor*/
                + _constants.number_canvas_element_offset_default) + spot.y * scalingFactor; // +containerOffsetY;


                var x1 = _xOff2 - spot.w * scalingFactor / 2;
                var y1 = _yOff2 - spot.h * scalingFactor / 2;
                var spotStyleTmp = {
                  position: "absolute",
                  left: x1,
                  top: y1,
                  width: spot.w * scalingFactor,
                  height: spot.h * scalingFactor
                };

                if (_this3.state.showcasedSpot === spot) {
                  spotStyleTmp.border = "10px ridge cornflowerBlue";
                } else {
                  spotStyleTmp.border = "2px ridge cornflowerBlue";
                }

                showcasedSpots.push( /*#__PURE__*/_react["default"].createElement("div", {
                  key: tmpID,
                  style: spotStyleTmp
                }));
              }
            });
          } else if (Array.isArray(markedSpots)) {
            for (var i = 0; i < markedSpots.length; i++) {
              var tmpID = draggingID + "_" + i;
              if (occupiedSpots.includes(tmpID)) continue;
              var spot = markedSpots[i];

              var _xOff3 = spot.x * scalingFactor; // + containerOffsetX; // + xOff;


              var _yOff3 = spot.y * scalingFactor; // + containerOffsetY; // + yOff;


              var x1 = _xOff3 - spot.w * scalingFactor / 2;
              var y1 = _yOff3 - spot.h * scalingFactor / 2;
              var spotStyleTmp = {
                position: "absolute",
                left: x1,
                top: y1,
                width: spot.w * scalingFactor,
                height: spot.h * scalingFactor
              };

              if (this.state.showcasedSpot === spot) {
                spotStyleTmp.border = "10px ridge cornflowerBlue";
              } else {
                spotStyleTmp.border = "2px ridge cornflowerBlue";
              }

              showcasedSpots.push( /*#__PURE__*/_react["default"].createElement("div", {
                key: tmpID,
                style: spotStyleTmp
              }));
            }
          } else {
            var _tmpID2 = draggingID + "_" + 1;

            if (!occupiedSpots.includes(_tmpID2)) {
              var _spot3 = markedSpots;

              var _xOff4 = _spot3.x * scalingFactor; // + containerOffsetX; // + xOff;


              var _yOff4 = _spot3.y * scalingFactor; // + containerOffsetY; // + yOff;


              var _x3 = _xOff4 - _spot3.w * scalingFactor / 2;

              var _y3 = _yOff4 - _spot3.h * scalingFactor / 2;

              var _spotStyleTmp = {
                position: "absolute",
                left: _x3,
                top: _y3,
                width: _spot3.w * scalingFactor,
                height: _spot3.h * scalingFactor
              };

              if (this.state.showcasedSpot === _spot3) {
                _spotStyleTmp.border = "10px ridge cornflowerBlue";
              } else {
                _spotStyleTmp.border = "2px ridge cornflowerBlue";
              }

              showcasedSpots.push( /*#__PURE__*/_react["default"].createElement("div", {
                key: _tmpID2,
                style: _spotStyleTmp
              }));
            }
          }
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: styleContainer
      }, /*#__PURE__*/_react["default"].createElement(_reactDragDropContainer.DropTarget, {
        style: dropTargetStyle,
        onHit: this.dropped,
        onDragEnter: this.isDragging,
        onDragLeave: this.isNotDragging,
        targetKey: _constants.string_canvas
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "auto"
        },
        onScroll: this.handleScroll
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: canvasInnerContainerStyle
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: backgroundImage + (backgroundImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: backgroundImage,
        style: {
          width: "100%",
          height: "100%",
          margin: "auto"
        } //onLoad={this.onImgLoad}

      })), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: "absolute",
          left: "10px",
          top: "10px"
        }
      }, /*#__PURE__*/_react["default"].createElement("p", null, micInfo)), this.createList(), showcasedSpots)));
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