"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _canvasElement = _interopRequireWildcard(require("./canvasElement"));

var _url = require("url");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

require("../../public/styleOverrides.css");

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
      imgHeight: null,
      imgWidth: null,
      backgroundScale: null,
      offsetY: 0,
      offsetX: 0,
      scale: null
    };
    Object.keys(props.componentSchemas).forEach(function (schemaIndex) {
      var schema = props.componentSchemas[schemaIndex];
      var schema_id = schema.ID; //Validate schemas using jsonschema????

      Object.keys(props.inputData).forEach(function (objIndex) {
        var object = props.inputData[objIndex];
        if (props.activeTier < object.tier) return;
        if (schema_id !== object.Schema_ID) return;
        var validation = validate(object, schema);
        var validated = validation.valid;
        var newElement = {
          ID: schema.title + "_" + object.ID,
          schema_ID: schema_id,
          name: object.Name,
          validated: validated,
          dragged: false,
          obj: object,
          x: object.PositionX,
          y: object.PositionY,
          width: object.Width,
          height: object.Height
        };

        _this.state.elementList.push(newElement);
      });
      _this.state.componentsSchema[schema_id] = schema;
    });
    _this.dragged = _this.dragged.bind(_assertThisInitialized(_this));
    _this.dropped = _this.dropped.bind(_assertThisInitialized(_this));
    _this.onDelete = _this.onDelete.bind(_assertThisInitialized(_this));
    _this.onCanvasElementDataSave = _this.onCanvasElementDataSave.bind(_assertThisInitialized(_this));
    _this.getElementData = _this.getElementData.bind(_assertThisInitialized(_this));
    _this.updatedDimensions = _this.updatedDimensions.bind(_assertThisInitialized(_this));
    _this.areAllElementsValidated = _this.areAllElementsValidated.bind(_assertThisInitialized(_this));
    _this.onImgLoad = _this.onImgLoad.bind(_assertThisInitialized(_this));
    console.log("update element data in constructor");

    _this.props.updateElementData(_this.state.elementData, true);

    return _this;
  }

  _createClass(Canvas, [{
    key: "updatedDimensions",
    value: function updatedDimensions(id, width, height, isResize) {
      var element = null;
      this.state.elementList.forEach(function (item) {
        if (item.ID === id) element = item;
      });
      var newElementDataList = Object.assign({}, this.state.elementData);
      var obj = newElementDataList[id];
      console.log("updatedDimensions");
      if (element === null || obj === undefined) return;

      if (!isResize) {
        if (element.width >= width && element.height >= height) {
          return;
        }
      }

      console.log("set new size " + width + " x " + height);
      element.width = width;
      element.height = height;
      obj.Width = width;
      obj.Height = height;
      var validated = this.areAllElementsValidated();
      console.log("update element data in updatedDimensions");
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
    value: function onCanvasElementDataSave(id, data) {
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
        elementData: currentElementData
      });
      var validated = this.areAllElementsValidated();
      console.log("update element data in onCanvasElementDataSave");
      this.props.updateElementData(currentElementData, validated);
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

      if (sourceElement.source !== "toolbar") {
        x -= 7;
        y -= 7;
      }

      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var percentX = 100 * x / width - this.state.offsetX;
      var percentY = 100 * y / height - this.state.offsetY;
      var componentsSchema = this.state.componentsSchema;

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
          x: percentX,
          y: percentY,
          width: 100,
          height: 100
        };
        newElementList.push(newElement);
        var newElementData = {
          Name: "New ".concat(schema.title),
          ID: uuid,
          Tier: schema.tier,
          Schema_ID: schema.ID,
          Version: schema.version,
          PositionX: percentX,
          PositionY: percentY,
          Width: 100,
          Height: 100
        };
        newElement.name = newElementData.Name;
        Object.keys(schema.properties).forEach(function (key) {
          if (schema.properties[key].type === "array") {
            var currentNumber = currentNumberOf_identifier + key;
            var minNumber = minNumberOf_identifier + key;
            var maxNumber = maxNumberOf_identifier + key;

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
            var _currentNumber = currentNumberOf_identifier + key;

            var _minNumber = minNumberOf_identifier + key;

            var _maxNumber = maxNumberOf_identifier + key;

            if (schema.required.indexOf(key) === -1) {
              newElementData[_currentNumber] = 0;
              newElementData[_minNumber] = 0;
              newElementData[_maxNumber] = 1;
            }
          }
        });
        newElement.obj = newElementData;
        newElementDataList[newElement.ID] = newElementData;
      } else {
        var item = this.state.elementList[sourceElement.index];
        newElementList[sourceElement.index].x = percentX;
        newElementList[sourceElement.index].y = percentY;
        newElementList[sourceElement.index].dragged = false;
        newElementDataList[item.ID].PositionX = percentX;
        newElementDataList[item.ID].PositionY = percentY;
      }

      this.setState({
        elementList: newElementList,
        elementData: newElementDataList
      });
      var validated = this.areAllElementsValidated();
      console.log("update element data in dropped");
      this.props.updateElementData(newElementDataList, validated);
    }
  }, {
    key: "onDelete",
    value: function onDelete(index) {
      var elementList = this.state.elementList.slice();
      var elementData = Object.assign({}, this.state.elementData);
      if (elementList.length === 0) return;
      if (elementData.length === 0) return;
      var id = elementList[index].ID;
      elementList.splice(index, 1);

      if (elementData[id] !== undefined) {
        delete elementData[id];
      }

      this.setState({
        elementList: elementList,
        elementData: elementData
      });
      var validated = this.areAllElementsValidated();
      console.log("update element data in onDelete");
      this.props.updateElementData(elementData, validated);
    }
  }, {
    key: "createList",
    value: function createList() {
      var _this2 = this;

      var elementList = this.state.elementList;
      var elementData = this.state.elementData;
      var offsetX = this.state.offsetX;
      var offsetY = this.state.offsetY;
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
      }; //fontSizeAdjust: 0.58,

      var styleName = {
        textAlign: "center",
        fontSize: "75%",
        backgroundColor: "transparent"
      };
      var styleContainer = {
        display: "flex",
        justifyContent: "space-between",
        height: "20px"
      };
      var stylesContainer = {};
      var stylesImages = {};
      elementList.map(function (item) {
        //console.log("####");
        //console.log("old x: " + item.x + " y: " + item.y);
        var x = item.x + offsetX;
        var y = item.y + offsetY; //console.log("new x: " + x + " y: " + y);

        var style = {
          position: "absolute",
          left: "".concat(x, "%"),
          top: "".concat(y, "%")
        };
        var containerWidth = item.width;
        var containerHeight = item.height;

        if (!item.validated) {
          containerWidth += 10;
          containerHeight += 10;
        }

        stylesContainer[item.ID] = Object.assign({
          width: "".concat(containerWidth, "px"),
          height: "".concat(containerHeight + 30, "px")
        }, style);
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
      elementList.map(function (item, index) {
        var schema_id = item.schema_ID;
        var schema = componentsSchema[schema_id];
        droppableElement.push(_react.default.createElement("div", {
          style: stylesContainer[item.ID],
          key: "draggableWrapper" + index
        }, _react.default.createElement(_reactDragDropContainer.DragDropContainer, {
          targetKey: "canvas",
          key: "draggable" + index,
          dragClone: false,
          dragData: {
            source: "canvas",
            index: index
          },
          onDragStart: _this2.dragged,
          dragHandleClassName: "grabber"
        }, _react.default.createElement("div", {
          style: styleContainer
        }, _react.default.createElement("div", {
          className: "grabber",
          style: styleGrabber
        }, "\u2237"), _react.default.createElement(_canvasElement.CanvasElementDeleteButton, {
          index: index,
          onDelete: _this2.onDelete,
          myStyle: styleCloser
        })), _react.default.createElement(_canvasElement.default, {
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
          elementByType: elementByType
        }), _react.default.createElement("div", {
          style: styleName
        }, item.name))));
      });
      return droppableElement;
    }
  }, {
    key: "render",
    value: function render() {
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height;
      var styleContainer = {
        borderBottom: "2px solid",
        borderTop: "2px solid",
        borderRight: "2px solid",
        color: "black",
        width: "".concat(width, "px"),
        height: "".concat(height, "px") // backgroundImage: `url(${this.props.backgroundImage})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "50%",
        // backgroundSize: "contain"

      };
      var innerWidth = width - 2;
      var innerHeight = height - 4;
      var dropTargetStyle = {
        width: "".concat(innerWidth, "px"),
        height: "".concat(innerHeight, "px")
      };
      var canvasInnerContainerStyle = {
        width: "".concat(innerWidth, "px"),
        height: "".concat(innerHeight, "px"),
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "middle",
        overflow: "auto"
      };
      var imageStyle = null;
      imageStyle = {
        width: "auto",
        height: "100%"
      };
      var infoStyle = {
        position: "absolute",
        left: 0,
        top: 0
      }; // if (height > width) {
      // 	imageStyle = {
      // 		width: "100%",
      // 		height: "auto"
      // 	};
      // } else {
      // 	imageStyle = {
      // 		width: "auto",
      // 		height: "100%"
      // 	};
      // }
      // let image = `url(${this.props.backgroundImage})`;
      // console.log(image);

      var micInfo = [];

      if (this.props.microscope !== null && this.props.microscope !== undefined) {
        if (this.props.microscope.Name) {
          micInfo.push("Name: ".concat(this.props.microscope.Name));
          micInfo.push(_react.default.createElement("br", {
            key: "newline-1"
          }));
        }

        if (this.props.microscope.Manufacturer !== null && this.props.microscope.Manufacturer !== undefined) {
          micInfo.push("Manufacturer: ".concat(this.props.microscope.Manufacturer));
          micInfo.push(_react.default.createElement("br", {
            key: "newline-2"
          }));
        }

        if (this.props.microscope.Model !== null && this.props.microscope.Model !== undefined) {
          micInfo.push("Model: ".concat(this.props.microscope.Model));
          micInfo.push(_react.default.createElement("br", {
            key: "newline-3"
          }));
        }
      }

      return (//TODO i could use the img container with absolute position and put stuff on top of it
        //<img src={imageFilePath} alt={imageFilePath} style={style.image} />
        //TODO this should be in a scrollable pane
        //<div ref={this.ref} style={styleFullWindow}>
        _react.default.createElement("div", {
          style: styleContainer
        }, _react.default.createElement(_reactDragDropContainer.DropTarget, {
          style: dropTargetStyle,
          onHit: this.dropped,
          targetKey: "canvas"
        }, _react.default.createElement("div", {
          style: canvasInnerContainerStyle
        }, _react.default.createElement("img", {
          src: this.props.backgroundImage,
          alt: this.props.backgroundImage,
          style: imageStyle,
          onLoad: this.onImgLoad
        }), _react.default.createElement("div", {
          style: infoStyle
        }, _react.default.createElement("p", null, micInfo)), this.createList())))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.dimensions !== null) {
        var height = props.dimensions.height - 4;
        var width = props.dimensions.width - 2;
        var imgHeight = state.imgHeight;
        var imgWidth = state.imgWidth;
        if (imgHeight === null || imgWidth === null) return null; //console.log("####");
        //console.log("h: " + height + " w: " + width);
        //console.log("ih: " + imgHeight + " iw: " + imgWidth);

        var yOrientation = true;

        if (height > width) {
          yOrientation = false;
        }

        var yOrientationImg = true;

        if (imgHeight > imgWidth) {
          yOrientationImg = false;
        }

        if (yOrientation && yOrientationImg || !yOrientation && !yOrientationImg) {
          //console.log("case 1");
          var backgroundScale = height * 100 / (imgHeight * 100);
          var currentWidth = backgroundScale * imgWidth;
          var offsetX = (width - currentWidth) / 2; // console.log(
          // 	"scale: " + backgroundScale + " Off: " + offsetX + " w: " + width
          // );

          var offsetXPercent = offsetX * 100 / width;
          if (offsetXPercent !== state.offsetX) return {
            offsetX: offsetXPercent,
            backgroundScale: backgroundScale
          };
        } else {
          //console.log("case 2");
          var _backgroundScale = width * 100 / (imgWidth * 100);

          var currentHeight = _backgroundScale * imgHeight;
          var offsetY = (height - currentHeight) / 2; // console.log(
          // 	"scale: " + backgroundScale + " Off: " + offsetY + " h: " + height
          // );

          var offsetYPercent = offsetY * 100 / height;
          if (offsetYPercent != state.offsetY) return {
            offsetY: offsetYPercent,
            backgroundScale: _backgroundScale
          };
        }
      }

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

      var scale = 1;

      if (state.scale === null && state.backgroundScale !== null || state.scale !== null && state.backgroundScale !== null && state.scale !== state.backgroundScale) {
        scale = state.backgroundScale;
      }

      if (props.scale !== null) {
        scale *= props.scale;
      }

      if (scale !== state.scale) return {
        scale: scale
      };
      return null;
    }
  }]);

  return Canvas;
}(_react.default.PureComponent);

exports.default = Canvas;