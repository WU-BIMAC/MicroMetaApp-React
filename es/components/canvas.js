"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _canvasElement = _interopRequireWildcard(require("./canvasElement"));

var _genericUtilities = require("../genericUtilities");

var _url = require("url");

var _uuid = require("uuid");

var _constants = require("../constants");

var _propTypes = require("prop-types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
      elementData: {},
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
      originalDimensions: {},
      previousProps: {}
    };
    _this.setEditingOnCanvas = _this.setEditingOnCanvas.bind(_assertThisInitialized(_this));
    _this.addComponentsIndexesIfMissing = _this.addComponentsIndexesIfMissing.bind(_assertThisInitialized(_this));
    _this.dragged = _this.dragged.bind(_assertThisInitialized(_this));
    _this.dropped = _this.dropped.bind(_assertThisInitialized(_this));
    _this.isDragging = _this.isDragging.bind(_assertThisInitialized(_this));
    _this.isNotDragging = _this.isNotDragging.bind(_assertThisInitialized(_this));
    _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
    _this.onCopy = _this.onCopy.bind(_assertThisInitialized(_this));
    _this.handleMouseIn = _this.handleMouseIn.bind(_assertThisInitialized(_this));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_this));
    _this.onCanvasElementDataSave = _this.onCanvasElementDataSave.bind(_assertThisInitialized(_this));
    _this.getElementData = _this.getElementData.bind(_assertThisInitialized(_this));
    _this.updatedDimensions = _this.updatedDimensions.bind(_assertThisInitialized(_this));
    _this.areAllElementsValidated = _this.areAllElementsValidated.bind(_assertThisInitialized(_this)); //this.onImgLoad = this.onImgLoad.bind(this);

    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.clearOccupiedSpotOnElements = _this.clearOccupiedSpotOnElements.bind(_assertThisInitialized(_this)); //this.props.updateElementData(this.state.elementData, true);

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
      var id = null;
      var occupiedSpot = null;

      if (sourceElement.source === _constants.string_toolbar) {
        schema_ID = sourceElement.schema_ID;
      } else {
        schema_ID = newElementList[sourceElement.index].schema_ID;
        occupiedSpot = newElementList[sourceElement.index].occupiedSpot;
        id = newElementList[sourceElement.index].id;
      } // console.log("occupiedSpot in drag");
      // console.log(occupiedSpot);


      var x = e.x;
      var y = e.y - this.state.headerOffset;
      var schema = componentsSchema[schema_ID];
      var spotsMap = {};
      var schemaCategory = schema.category;

      if (elementDimensions[schemaCategory] !== undefined && elementDimensions[schemaCategory] !== null && schema.title !== "MultiLaserEngine") {
        var ns_ID = schemaCategory;
        var spots = elementDimensions[ns_ID];
        spotsMap[ns_ID] = spots;
      }

      var schemaFullName = schema.category + "." + schema.title;

      if (elementDimensions[schemaFullName] !== undefined && elementDimensions[schemaFullName] !== null) {
        var _ns_ID = schemaFullName; //schema_ID.replace(".json", "");

        var _spots = elementDimensions[_ns_ID];
        spotsMap[_ns_ID] = _spots; // if (schema.title === "MultiLaserEngine") {
        // 	console.log("ns_ID");
        // 	console.log(ns_ID);
        // 	console.log("spots");
        // 	console.log(spots);
        // }
      }

      var showcasedSpot = null;

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


      var draggingID = null;
      var ns_IDs = Object.keys(spotsMap);
      if (ns_IDs !== null && ns_IDs !== undefined && ns_IDs.length > 0) draggingID = ns_IDs;
      this.setState({
        draggingID: draggingID,
        showcasedSpot: showcasedSpot,
        occupiedSpots: occupiedSpots
      });
    }
  }, {
    key: "isNotDragging",
    value: function isNotDragging(e) {
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
      var l1_x = x;
      var l1_y = y;
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
          newElementDataList[item.ID].occupiedSpot = null;
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
      var rotate = null;
      var x = e.x;
      var y = e.y - this.state.headerOffset;
      var schema_ID = null;

      if (sourceElement.source === _constants.string_toolbar) {
        schema_ID = sourceElement.schema_ID;
      } else {
        schema_ID = newElementList[sourceElement.index].schema_ID;
      }

      var schema = componentsSchema[schema_ID];
      var spotsMap = {};
      var schemaCategory = schema.category;

      if (elementDimensions[schemaCategory] !== undefined && elementDimensions[schemaCategory] !== null && schema.title !== "MultiLaserEngine") {
        var ns_ID = schemaCategory;
        var spots = elementDimensions[ns_ID];
        spotsMap[ns_ID] = spots;
      }

      var schemaFullName = schema.category + "." + schema.title;

      if (elementDimensions[schemaFullName] !== undefined && elementDimensions[schemaFullName] !== null) {
        var _ns_ID2 = schemaFullName; //schema_ID.replace(".json", "");

        var _spots2 = elementDimensions[_ns_ID2];
        spotsMap[_ns_ID2] = _spots2; // if (schema.title === "MultiLaserEngine") {
        // 	console.log("ns_ID");
        // 	console.log(ns_ID);
        // 	console.log("spots");
        // 	console.log(spots);
        // }
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
      var defaultOffset = _constants.number_canvas_element_icons_height
      /** scalingFactor*/
      + _constants.number_canvas_element_offset_default;

      var _loop = function _loop(_index) {
        var ns_ID = Object.keys(spotsMap)[_index];

        var spots = spotsMap[ns_ID];

        if (spots !== undefined && spots !== null) {
          var _loop2 = function _loop2(key) {
            if (key === _constants.string_typeDimensionsGeneral) {
              var keyMarkedSpots = spots[key];

              if (Array.isArray(keyMarkedSpots)) {
                for (var i = 0; i < keyMarkedSpots.length; i++) {
                  var tmpID = ns_ID + "_" + i;
                  var spot = keyMarkedSpots[i];
                  var spotW = spot.w * scalingFactor;
                  var spotH = spot.h * scalingFactor;
                  width = spotW;
                  height = spotH;
                  rotate = spot.r;
                  if (occupiedSpots.includes(tmpID)) continue;

                  if (spot.x !== -1 && spot.y !== -1) {
                    var xOff = spot.x * scalingFactor; // + containerOffsetX; // + (offsetX - containerOffsetX);

                    var yOff = spot.y * scalingFactor; // + containerOffsetY; // + (offsetY - containerOffsetY);

                    var x1 = xOff - spotW / 2;
                    var x2 = xOff + spotW / 2;
                    var y1 = yOff - spotH / 2;
                    var y2 = yOff + spotH / 2;

                    if (x > x1 && x < x2 && y > y1 && y < y2) {
                      x = x1;
                      y = y1;
                      occupiedSpot = tmpID;
                      break;
                    }
                  }
                }
              } else {
                var _tmpID = ns_ID + "_" + 1;

                var _spot = keyMarkedSpots;

                var _spotW = _spot.w * scalingFactor;

                var _spotH = _spot.h * scalingFactor;

                width = _spotW;
                height = _spotH;
                rotate = _spot.r;

                if (!occupiedSpots.includes(_tmpID)) {
                  if (_spot.x !== -1 && _spot.y !== -1) {
                    var _xOff = _spot.x * scalingFactor; // + containerOffsetX; // + (offsetX - containerOffsetX);


                    var _yOff = _spot.y * scalingFactor; // + containerOffsetY; // + (offsetY - containerOffsetY);


                    var _x = _xOff - _spotW / 2;

                    var _x2 = _xOff + _spotW / 2;

                    var _y = _yOff - _spotH / 2;

                    var _y2 = _yOff + _spotH / 2;

                    if (x > _x && x < _x2 && y > _y && y < _y2) {
                      x = _x;
                      y = _y;
                      occupiedSpot = _tmpID;
                    }
                  }
                }
              }
            } else {
              var _keyMarkedSpots = spots[key];

              if (Array.isArray(_keyMarkedSpots)) {
                var _loop3 = function _loop3(_i) {
                  var spot = _keyMarkedSpots[_i];
                  var spotW = spot.w * scalingFactor;
                  var spotH = spot.h * scalingFactor;
                  width = spotW;
                  height = spotH;
                  rotate = spot.r;
                  newElementList.map(function (item, index) {
                    var itemSchemaID = item.schema_ID;
                    var itemSchema = componentsSchema[itemSchemaID];
                    var item_ns_ID_1 = itemSchema.category;
                    var item_ns_ID_2 = itemSchema.category + "." + itemSchema.title; //itemSchemaID.replace(".json", "");

                    var tmpID = item.ID + "_" + ns_ID + "_" + _i;
                    if (item_ns_ID_1 !== key && item_ns_ID_2 !== key) return null;
                    if (occupiedSpots.includes(tmpID)) return null;
                    var xOff = item.x + item.width / 2 + spot.x * scalingFactor; // + containerOffsetX;

                    var yOff = item.y + item.height / 2 + defaultOffset + spot.y * scalingFactor; // + containerOffsetY;

                    var x1 = xOff - spotW / 2;
                    var x2 = xOff + spotW / 2;
                    var y1 = yOff - spotH / 2;
                    var y2 = yOff + spotH / 2;

                    if (x > x1 && x < x2 && y > y1 && y < y2) {
                      x = x1;
                      y = y1;
                      occupiedSpot = tmpID;
                      return null;
                    }
                  });
                };

                for (var _i = 0; _i < _keyMarkedSpots.length; _i++) {
                  _loop3(_i);
                }
              } else {
                var _spot2 = _keyMarkedSpots;

                var _spotW2 = _spot2.w * scalingFactor;

                var _spotH2 = _spot2.h * scalingFactor;

                width = _spotW2;
                height = _spotH2;
                rotate = _spot2.r;
                newElementList.map(function (item, index) {
                  var itemSchemaID = item.schema_ID;
                  var itemSchema = componentsSchema[itemSchemaID];
                  var item_ns_ID_1 = itemSchema.category;
                  var item_ns_ID_2 = itemSchema.category + "." + itemSchema.title; //itemSchemaID.replace(".json", "");

                  var tmpID = item.ID + "_" + ns_ID + "_" + 1;
                  if (item_ns_ID_1 !== key && item_ns_ID_2 !== key) return null;
                  if (occupiedSpots.includes(tmpID)) return null;
                  var xOff = item.x + item.width / 2 + _spot2.x * scalingFactor; // + containerOffsetX;

                  var yOff = item.y + item.height / 2 + defaultOffset + _spot2.y * scalingFactor; // + containerOffsetY;

                  var x1 = xOff - _spotW2 / 2;
                  var x2 = xOff + _spotW2 / 2;
                  var y1 = yOff - _spotH2 / 2;
                  var y2 = yOff + _spotH2 / 2;

                  if (x > x1 && x < x2 && y > y1 && y < y2) {
                    x = x1;
                    y = y1;
                    occupiedSpot = tmpID;
                  }
                });
              }
            }

            if (occupiedSpot !== null) return "break";
          };

          for (var key in spots) {
            var _ret = _loop2(key);

            if (_ret === "break") break;
          }
        }
      };

      for (var _index in Object.keys(spotsMap)) {
        _loop(_index);
      } //console.log("DROPPED: w-" + width + "||h-" + height);
      //console.log("DROPPED: r-" + rotate);


      var minElementWidth = _constants.number_canvas_element_min_width * scalingFactor;
      var minElementHeight = _constants.number_canvas_element_min_height * scalingFactor;
      var adjustedWidth = 0;

      if (width < minElementWidth) {
        adjustedWidth = (minElementWidth - width) / 2;
        x -= adjustedWidth;
        width = minElementWidth;
      }

      var adjustedHeight = 0;

      if (height < minElementHeight) {
        adjustedHeight = (minElementHeight - height) / 2;
        y -= adjustedHeight;
        height = minElementHeight;
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

      y -= _constants.number_canvas_element_offset_default; // if (sourceElement.source !== string_toolbar) {
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
          rotate: rotate,
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
          ModelVersion: schema.modelVersion,
          Extension: schema.extension,
          Domain: schema.domain,
          Category: schema.category,
          PositionX: x,
          PositionY: y,
          PositionZ: 0,
          Width: width,
          Height: height,
          OffsetX: offsetX,
          OffsetY: offsetY,
          OccupiedSpot: occupiedSpot
        };
        if (rotate !== null) newElementData.Rotate = rotate;
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
      var _this2 = this;

      Object.keys(schema.properties).forEach(function (key) {
        var isChildren = false;

        for (var childrenSchemaKey in Object.keys(_this2.props.childrenSchemas)) {
          var childrenSchema = _this2.props.childrenSchemas[childrenSchemaKey];

          if (key === childrenSchema.title) {
            isChildren = true;
            break;
          }
        }

        if (!isChildren) return;
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

        console.log(newElementData);
      });
    }
  }, {
    key: "onCopy",
    value: function onCopy(index) {
      var elementList = this.state.elementList;
      var id = elementList[index].ID;
      this.props.onCopy(id);
    }
  }, {
    key: "onDelete",
    value: function onDelete(index) {
      var elementList = this.state.elementList.slice();
      var elementData = Object.assign({}, this.state.elementData);
      if (elementList.length === 0) return;
      if (elementData.length === 0) return;
      var id = elementList[index].ID;
      var name = elementList[index].name;
      var schemaID = elementList[index].schema_ID;
      var elementDimensions = this.props.canvasElementsDimensions;
      var componentsSchema = this.state.componentsSchema;
      var occupiedSpots = this.state.occupiedSpots.slice();
      var schema = componentsSchema[schemaID];
      var occupiedSpot = elementList[index].occupiedSpot; //let spotsMap = {};
      // let schemaCategory = schema.category;
      // if (
      // 	elementDimensions[schemaCategory] !== undefined &&
      // 	elementDimensions[schemaCategory] !== null &&
      // 	schema.title !== "MultiLaserEngine" &&
      // 	schema.title !== "Laser"
      // ) {
      // 	let ns_ID = schemaCategory;
      // 	let spots = elementDimensions[ns_ID];
      // 	spotsMap[ns_ID] = spots;
      // }
      // let schemaFullName = schema.category + "." + schema.title;
      // if (
      // 	elementDimensions[schemaFullName] !== undefined &&
      // 	elementDimensions[schemaFullName] !== null
      // ) {
      // 	let ns_ID = schemaFullName; //schema_ID.replace(".json", "");
      // 	let spots = elementDimensions[ns_ID];
      // 	spotsMap[ns_ID] = spots;
      // 	// if (schema.title === "MultiLaserEngine") {
      // 	// 	console.log("ns_ID");
      // 	// 	console.log(ns_ID);
      // 	// 	console.log("spots");
      // 	// 	console.log(spots);
      // 	// }
      // }

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
      console.log("deletedID");
      console.log(deletedID);
      var linkedFields = this.state.linkedFields;

      if (Object.keys(linkedFields).includes(id)) {
        delete linkedFields[id];
      }

      for (var key in linkedFields) {
        var links = linkedFields[key];
        var done = false;

        for (var field in links) {
          var linkList = links[field].value;

          if (Array.isArray(linkList)) {
            if (linkList.includes(deletedID)) {
              var _index2 = linkList.indexOf(deletedID);

              if (elementData[key] !== undefined) {
                elementData[key][field][_index2] = _constants.string_na;
                linkedFields[key][field].value[_index2] = _constants.string_na;
                done = true;
                break;
              }
            }
          } else {
            if (linkList === deletedID) {
              if (elementData[key] !== undefined) {
                elementData[key][field] = _constants.string_na;
                linkedFields[key][field] = _constants.string_na;
                done = true;
                break;
              }
            }
          }
        }

        if (done) {
          break;
        }
      }

      elementList.splice(index, 1);

      if (elementData[id] !== undefined) {
        delete elementData[id];
      }

      this.setState({
        elementList: elementList,
        elementData: elementData,
        occupiedSpots: occupiedSpots,
        linkedFields: linkedFields
      });
      var validated = this.areAllElementsValidated();
      this.props.updateElementData(elementData, validated);
      this.props.updateLinkedFields(linkedFields);
    }
  }, {
    key: "createList",
    value: function createList() {
      var _this3 = this;

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

      var minElementWidth = _constants.number_canvas_element_min_width * scalingFactor;
      var minElementHeight = _constants.number_canvas_element_min_height * scalingFactor; //	console.log("minElementWidth - " + minElementWidth);

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

      var hoverSize = 125; //* scalingFactor;

      var hoverFontSize = 120 * scalingFactor;
      var styleNameHover = {
        //background: "white",
        overflow: "unset",
        fontSize: "".concat(hoverFontSize, "%"),
        textAlign: "left",
        lineHeight: "".concat(hoverSize, "%"),
        color: "#0275d8" //wordBreak: "break-word",
        //whiteSpace: "break-spaces",
        //width: "200%",

      };
      var styleNameRegular = {
        display: "none"
      };
      var stylesContainer = {};
      var stylesImages = {};
      elementList.map(function (item) {
        var x = item.x;
        var y = item.y;
        var style = {
          position: "absolute",
          left: x,
          top: y
        };
        var containerWidth = item.width;
        var containerHeight = item.height; // if (containerWidth == -1) containerWidth = 100;
        // if (containerHeight == -1) containerHeight = 100;

        var scaledContainerWidth = containerWidth;
        var scaledContainerHeight = containerHeight; // if (!item.validated) {
        // 	scaledContainerWidth += 10;
        // 	scaledContainerHeight += 10;
        // }

        if (scaledContainerWidth <= minElementWidth) scaledContainerWidth = minElementWidth;
        if (scaledContainerHeight <= minElementHeight) scaledContainerHeight = minElementHeight;
        scaledContainerHeight += _constants.number_canvas_element_icons_height
        /* * scalingFactor */
        + _constants.number_canvas_element_offset_default; // console.log("SCW - " + scaledContainerWidth);
        // console.log("SCH - " + scaledContainerHeight);

        stylesContainer[item.ID] = Object.assign({
          width: "".concat(scaledContainerWidth, "px"),
          height: "".concat(scaledContainerHeight, "px")
        }, style);
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
        var itemSchema = componentsSchema[element.Schema_ID];
        var schemaCategory = itemSchema.category;

        if (elementByType[schemaID] === undefined || elementByType[schemaID] === null) {
          elementByType[schemaID] = {};
        }

        if (elementByType[schemaCategory] === undefined || elementByType[schemaCategory] === null) {
          elementByType[schemaCategory] = {};
        }

        elementByType[schemaID][element.ID] = element.Name;
        elementByType[schemaCategory][element.ID] = element.Name;
      });

      var _loop4 = function _loop4(_k) {
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
            validated = /*#__PURE__*/_react.default.createElement("div", {
              style: styleValidated
            }, "\u25CF");
          } else {
            var styleNotValidated = Object.assign({}, styleGrabber, {
              color: "red"
            });
            validated = /*#__PURE__*/_react.default.createElement("div", {
              style: styleNotValidated
            }, "\u25CF");
          }

          droppableElement.push( /*#__PURE__*/_react.default.createElement("div", {
            style: stylesContainer[item.ID],
            key: "draggableWrapper" + index,
            onMouseEnter: function onMouseEnter() {
              return _this3.handleMouseIn(item.ID);
            },
            onMouseLeave: _this3.handleMouseOut
          }, /*#__PURE__*/_react.default.createElement(_reactDragDropContainer.DragDropContainer, {
            targetKey: _constants.string_canvas,
            key: "draggable" + index,
            dragClone: false,
            dragData: {
              source: _constants.string_canvas,
              index: index
            },
            onDragStart: _this3.dragged,
            dragHandleClassName: "grabber"
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleActionElementNameContainer
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: styleActionContainer
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "grabber",
            style: styleGrabber
          }, "\u2237"), /*#__PURE__*/_react.default.createElement(_canvasElement.CanvasElementCopyButton, {
            index: index,
            handleCopy: _this3.onCopy,
            myStyle: styleCloser,
            isViewOnly: _this3.props.isViewOnly,
            imagesPath: _this3.props.imagesPath
          }), validated, /*#__PURE__*/_react.default.createElement(_canvasElement.CanvasElementDeleteButton, {
            index: index,
            handleDelete: _this3.onDelete,
            myStyle: styleCloser,
            isViewOnly: _this3.props.isViewOnly
          })), /*#__PURE__*/_react.default.createElement("div", {
            style: styleElementNameContainer
          }, /*#__PURE__*/_react.default.createElement(_canvasElement.default, {
            activeTier: _this3.props.activeTier,
            id: item.ID,
            rotate: item.rotate,
            image: url.resolve(_this3.props.imagesPath, schema.image),
            schema: schema,
            handleConfirm: _this3.onCanvasElementDataSave,
            updateDimensions: _this3.updatedDimensions,
            overlaysContainer: _this3.props.overlaysContainer,
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
            isViewOnly: _this3.props.isViewOnly,
            setEditingOnCanvas: _this3.setEditingOnCanvas,
            formTitle: item.name,
            isDebug: _this3.props.isDebug
          }), /*#__PURE__*/_react.default.createElement("div", {
            style: styleName
          }, item.name))))));
        });
      };

      for (var _k = 0; _k <= highestZ; _k++) {
        _loop4(_k);
      }

      return droppableElement;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          backgroundImage = _this$props.backgroundImage,
          _this$props$microscop = _this$props.microscope,
          microscope = _this$props$microscop === void 0 ? null : _this$props$microscop,
          _this$props$scalingFa = _this$props.scalingFactor,
          scalingFactor = _this$props$scalingFa === void 0 ? 1 : _this$props$scalingFa;
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var linkedFields = this.state.linkedFields;
      var occupiedSpots = this.state.occupiedSpots;
      var elementList = this.state.elementList; // if (bool_isDebug) {
      // 	console.log("LinkedFields");
      // 	console.log(linkedFields);
      // }
      // console.log("elementData");
      // console.log(this.state.elementData);

      var elementDimensions = this.props.canvasElementsDimensions;
      var stand = this.props.stand;
      var standSchemaID = stand.Schema_ID;

      var standImageDimensions = elementDimensions[standSchemaID.replace(".json", "")][_constants.string_typeDimensionsGeneral];

      var canvasWidth = standImageDimensions.w;
      var canvasHeight = standImageDimensions.h;
      var styleContainer = {
        borderBottom: "2px solid",
        borderTop: "2px solid",
        borderRight: "2px solid",
        color: "black",
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      };
      var innerWidth = width - 2;
      var innerHeight = height - 4;
      var dropTargetStyle = {
        width: "".concat(innerWidth, "px"),
        height: "".concat(innerHeight, "px")
      };
      var canvasContainerStyle = {
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "auto"
      };
      var scaledCanvasWidth = canvasWidth * scalingFactor;
      var scaledCanvasHeight = canvasHeight * scalingFactor;
      var canvasInnerContainerStyle = {
        width: "".concat(scaledCanvasWidth, "px"),
        height: "".concat(scaledCanvasHeight, "px"),
        position: "absolute",
        left: 0,
        top: 0
      };
      var imageStyle = {
        width: "100%",
        height: "100%",
        margin: "auto"
      };
      var infoStyle = {
        position: "absolute",
        left: "10px",
        top: "10px"
      };
      var micInfo = [];

      if (microscope !== null && microscope !== undefined) {
        if (microscope.Name !== undefined && microscope.Name !== null) {
          micInfo.push("Microscope Name: ".concat(microscope.Name));
          micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
            key: "newline-1"
          }));
        }

        if (microscope.MicroscopeStand !== undefined && microscope.MicroscopeStand !== null) {
          var _stand = microscope.MicroscopeStand;

          if (_stand.Name !== null && _stand.Name !== undefined) {
            micInfo.push("MicroscopeStand Name: ".concat(_stand.Name));
            micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
              key: "newline-2"
            }));
          }

          if (_stand.Manufacturer !== null && _stand.Manufacturer !== undefined) {
            micInfo.push("MicroscopeStand Manufacturer: ".concat(_stand.Manufacturer));
            micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
              key: "newline-3"
            }));
          }

          if (_stand.Model !== null && _stand.Model !== undefined) {
            micInfo.push("MicroscopeStand Model: ".concat(_stand.Model));
            micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
              key: "newline-4"
            }));
          }

          if (_stand.Type !== null && _stand.Type !== undefined) {
            micInfo.push("MicroscopeStand Type: ".concat(_stand.Type));
            micInfo.push( /*#__PURE__*/_react.default.createElement("br", {
              key: "newline-5"
            }));
          }
        }
      }

      var showcasedSpots = [];

      if (this.state.draggingID !== null) {
        (function () {
          var componentsSchema = _this4.state.componentsSchema;
          var draggingIDs = _this4.state.draggingID;
          var offsetX = _this4.state.offsetX;
          var offsetY = _this4.state.offsetY;
          var containerOffsetX = _this4.props.containerOffsetLeft;
          var containerOffsetY = _this4.props.containerOffsetTop;
          var xOff = offsetX - containerOffsetX;
          var yOff = offsetY - containerOffsetY;
          var defaultOffset = _constants.number_canvas_element_icons_height
          /* * scalingFactor*/
          + _constants.number_canvas_element_offset_default; // console.log("draggingIDs");
          // console.log(draggingIDs);

          var _loop5 = function _loop5(index) {
            var draggingID = draggingIDs[index];
            var markedSpots = elementDimensions[draggingID]; // console.log("draggingID");
            // console.log(draggingID);
            // console.log("occupiedSpots");
            // console.log(occupiedSpots);

            if (markedSpots !== undefined && markedSpots !== null) {
              var _loop6 = function _loop6(key) {
                if (key === _constants.string_typeDimensionsGeneral) {
                  var keyMarkedSpots = markedSpots[key];

                  if (Array.isArray(keyMarkedSpots)) {
                    for (var i = 0; i < keyMarkedSpots.length; i++) {
                      var tmpID = draggingID + "_" + i;
                      if (occupiedSpots.includes(tmpID)) continue;
                      var spot = keyMarkedSpots[i];

                      var _xOff2 = spot.x * scalingFactor; // + containerOffsetX; // + xOff;


                      var _yOff2 = spot.y * scalingFactor; // + containerOffsetY; // + yOff;


                      var x1 = _xOff2 - spot.w * scalingFactor / 2;
                      var y1 = _yOff2 - spot.h * scalingFactor / 2;
                      var spotStyleTmp = {
                        position: "absolute",
                        left: x1,
                        top: y1,
                        width: spot.w * scalingFactor,
                        height: spot.h * scalingFactor
                      };

                      if (_this4.state.showcasedSpot === spot) {
                        spotStyleTmp.border = "10px ridge cornflowerBlue";
                      } else {
                        spotStyleTmp.border = "2px ridge cornflowerBlue";
                      }

                      var spotStyle = spotStyleTmp;
                      showcasedSpots.push( /*#__PURE__*/_react.default.createElement("div", {
                        key: tmpID,
                        style: spotStyle
                      }));
                    }
                  } else {
                    var _tmpID2 = draggingID + "_" + 1;

                    if (!occupiedSpots.includes(_tmpID2)) {
                      var _spot3 = keyMarkedSpots;

                      var _xOff3 = _spot3.x * scalingFactor; // + containerOffsetX; // + xOff;


                      var _yOff3 = _spot3.y * scalingFactor; // + containerOffsetY; // + yOff;


                      var _x3 = _xOff3 - _spot3.w * scalingFactor / 2;

                      var _y3 = _yOff3 - _spot3.h * scalingFactor / 2;

                      var _spotStyleTmp = {
                        position: "absolute",
                        left: _x3,
                        top: _y3,
                        width: _spot3.w * scalingFactor,
                        height: _spot3.h * scalingFactor
                      };

                      if (_this4.state.showcasedSpot === _spot3) {
                        _spotStyleTmp.border = "10px ridge cornflowerBlue";
                      } else {
                        _spotStyleTmp.border = "2px ridge cornflowerBlue";
                      }

                      var _spotStyle = _spotStyleTmp;
                      showcasedSpots.push( /*#__PURE__*/_react.default.createElement("div", {
                        key: _tmpID2,
                        style: _spotStyle
                      }));
                    }
                  }
                } else {
                  elementList.map(function (item, index) {
                    var itemSchemaID = item.schema_ID;
                    var itemSchema = componentsSchema[itemSchemaID];
                    var item_ns_ID_1 = itemSchema.category;
                    var item_ns_ID_2 = itemSchema.category + "." + itemSchema.title; //itemSchemaID.replace(".json", "");

                    if (item_ns_ID_1 !== key && item_ns_ID_2 !== key) return null;
                    var keyMarkedSpots = markedSpots[key];

                    if (Array.isArray(keyMarkedSpots)) {
                      for (var _i2 = 0; _i2 < keyMarkedSpots.length; _i2++) {
                        var _tmpID3 = item.ID + "_" + draggingID + "_" + _i2;

                        if (occupiedSpots.includes(_tmpID3)) continue;
                        var _spot4 = keyMarkedSpots[_i2];

                        var _xOff4 = item.x + item.width / 2 + _spot4.x * scalingFactor; // + containerOffsetX; // + xOff;


                        var _yOff4 = item.y + item.height / 2 + defaultOffset + _spot4.y * scalingFactor; // +containerOffsetY;


                        var _x4 = _xOff4 - _spot4.w * scalingFactor / 2;

                        var _y4 = _yOff4 - _spot4.h * scalingFactor / 2;

                        var _spotStyleTmp2 = {
                          position: "absolute",
                          left: _x4,
                          top: _y4,
                          width: _spot4.w * scalingFactor,
                          height: _spot4.h * scalingFactor
                        };

                        if (_this4.state.showcasedSpot === _spot4) {
                          _spotStyleTmp2.border = "10px ridge cornflowerBlue";
                        } else {
                          _spotStyleTmp2.border = "2px ridge cornflowerBlue";
                        }

                        var _spotStyle2 = _spotStyleTmp2;
                        showcasedSpots.push( /*#__PURE__*/_react.default.createElement("div", {
                          key: _tmpID3,
                          style: _spotStyle2
                        }));
                      }
                    } else {
                      var _tmpID4 = item.ID + "_" + draggingID + "_" + 1;

                      if (occupiedSpots.includes(_tmpID4)) return;
                      var _spot5 = keyMarkedSpots;

                      var _xOff5 = item.x + item.width / 2 + _spot5.x * scalingFactor; // + containerOffsetX; // + xOff;


                      var _yOff5 = item.y + item.height / 2 + defaultOffset + _spot5.y * scalingFactor; // +containerOffsetY;


                      var _x5 = _xOff5 - _spot5.w * scalingFactor / 2;

                      var _y5 = _yOff5 - _spot5.h * scalingFactor / 2;

                      var _spotStyleTmp3 = {
                        position: "absolute",
                        left: _x5,
                        top: _y5,
                        width: _spot5.w * scalingFactor,
                        height: _spot5.h * scalingFactor
                      };

                      if (_this4.state.showcasedSpot === _spot5) {
                        _spotStyleTmp3.border = "10px ridge cornflowerBlue";
                      } else {
                        _spotStyleTmp3.border = "2px ridge cornflowerBlue";
                      }

                      var _spotStyle3 = _spotStyleTmp3;
                      showcasedSpots.push( /*#__PURE__*/_react.default.createElement("div", {
                        key: _tmpID4,
                        style: _spotStyle3
                      }));
                    }
                  });
                }
              };

              for (var key in markedSpots) {
                _loop6(key);
              }
            }
          };

          for (var index in draggingIDs) {
            _loop5(index);
          }
        })();
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        style: styleContainer
      }, /*#__PURE__*/_react.default.createElement(_reactDragDropContainer.DropTarget, {
        style: dropTargetStyle,
        onHit: this.dropped,
        onDragEnter: this.isDragging,
        onDragLeave: this.isNotDragging,
        targetKey: _constants.string_canvas
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: canvasContainerStyle,
        onScroll: this.handleScroll
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: canvasInnerContainerStyle
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: backgroundImage + (backgroundImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
        alt: backgroundImage,
        style: imageStyle //onLoad={this.onImgLoad}

      })), /*#__PURE__*/_react.default.createElement("div", {
        style: infoStyle
      }, /*#__PURE__*/_react.default.createElement("p", null, micInfo)), this.createList(), showcasedSpots)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      //console.log("canvas-getDerivedStateFromProps-1");
      var returnValue = {};
      var stringProps1 = JSON.stringify(props.componentSchemas);
      var stringProps2 = JSON.stringify(props.inputData);
      var stringProps = {
        componentSchemas: stringProps1,
        inputData: stringProps2
      };
      var prevCompSchemas = state.previousProps.componentSchemas;
      var prevInputData = state.previousProps.inputData;

      if ((0, _genericUtilities.isDefined)(prevCompSchemas) && prevCompSchemas === stringProps1 && (0, _genericUtilities.isDefined)(prevInputData) && prevInputData === stringProps2) {
        return returnValue;
      }

      if (props.isDebug) console.log("canvas-getDerivedStateFromProps-2");
      returnValue.previousProps = stringProps; // console.log("props.inputData");
      // console.log(props.inputData);
      // console.log("state.elementData");
      // console.log(state.elementData);

      if ((0, _genericUtilities.isDefined)(props.componentSchemas)) {
        var componentsSchema = {};
        Object.keys(props.componentSchemas).forEach(function (schemaIndex) {
          var schema = props.componentSchemas[schemaIndex];
          var schema_id = schema.ID;
          componentsSchema[schema_id] = schema;
        });

        if (JSON.stringify(componentsSchema) !== JSON.stringify(state.componentsSchema)) {
          var elementList = state.elementList;

          for (var i = 0; i < elementList.length; i++) {
            var element = elementList[i];
            var schema_id = element.schema_ID;
            var schema = componentsSchema[schema_id];
            var object = element.obj; // 	console.log("schema");
            // console.log(schema);
            // console.log("object");
            // console.log(object);

            var validation = validate(object, schema);
            var validated = validation.valid;
            element.validated = validated;
          }

          if (props.isDebug) console.log("getDerivedStateFromProps - componentSchemas");
          returnValue.componentsSchema = componentsSchema;
        }
      }

      if ((0, _genericUtilities.isDefined)(props.inputData) && JSON.stringify(props.inputData) !== JSON.stringify(state.elementData)) {
        console.log(JSON.stringify(props.inputData));
        console.log(JSON.stringify(state.elementData));
        var _componentsSchema = {};
        var _elementList = [];
        var occupiedSpots = [];
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

            if (object.Rotate !== null && object.Rotate !== undefined) {
              newElement.rotate = object.Rotate;
            } else {
              newElement.rotate = null;
            }

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

            if (occupiedSpot !== undefined && occupiedSpot !== null) occupiedSpots.push(occupiedSpot);

            _elementList.push(newElement);
          });
          _componentsSchema[schema_id] = schema;
        });
        if (props.isDebug) console.log("getDerivedStateFromProps - inputData");
        returnValue.occupiedSpots = occupiedSpots;
        returnValue.componentsSchema = _componentsSchema;
        returnValue.elementList = _elementList;
        returnValue.elementData = Object.assign({}, props.inputData);
      }

      return returnValue;
    }
  }]);

  return Canvas;
}(_react.default.PureComponent);

exports.default = Canvas;