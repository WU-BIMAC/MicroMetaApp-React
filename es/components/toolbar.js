"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactCollapsible = _interopRequireDefault(require("react-collapsible"));

var _reactDragDropContainer = require("react-drag-drop-container");

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _imageElement = _interopRequireDefault(require("./imageElement"));

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

var Toolbar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Toolbar, _React$PureComponent);

  function Toolbar(props) {
    var _this;

    _classCallCheck(this, Toolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Toolbar).call(this, props));
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
    return _this;
  } // static getDerivedStateFromProps(props, state) {
  // 	if (props.componentSchemas !== null) {
  // 		let elementList = [];
  // 		for (let i = 0; i < props.componentSchemas.length; i++) {
  // 			let obj = props.componentSchemas[i];
  // 			if (props.activeTier < obj.tier) return;
  // 			let category = obj.category;
  // 			let element = {
  // 				id: `${obj.title}-${i}`,
  // 				schema: obj
  // 			};
  // 			if (elementList[category] === undefined) {
  // 				elementList[category] = [];
  // 			}
  // 			elementList[category].push(element);
  // 		}
  // 		return { elementList: elementList };
  // 	}
  // 	return null;
  // }


  _createClass(Toolbar, [{
    key: "updateMinMaxDimensions",
    value: function updateMinMaxDimensions(id, width, height) {
      var newImagesDimension = Object.assign({}, this.state.imagesDimension); // if (newImagesDimension[id] !== undefined) {
      // 	if (
      // 		newImagesDimension[id].width >= width ||
      // 		newImagesDimension[id].height >= height
      // 	)
      // 		return;
      // }

      if (newImagesDimension[id] == null || newImagesDimension[id] == undefined) {
        newImagesDimension[id] = {
          width: width,
          height: height
        };
        this.setState({
          imagesDimension: newImagesDimension
        });
      } //this.imagesDimension = newImagesDimension;

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
        return imageElements.push(_react["default"].createElement(_imageElement["default"], {
          key: "ImageElement-".concat(item.ID),
          id: item.ID //image={`${this.props.imagesPath}${item.schema.image}`}
          ,
          image: path.join(_this2.props.imagesPath, item.schema.image),
          name: item.schema.title,
          updateMinMaxDimensions: _this2.updateMinMaxDimensions,
          style: stylesImages[item.ID]
        }));
      });
      var categoryItems = [];
      elementList[key].map(function (item, index) {
        return categoryItems.push(_react["default"].createElement("div", {
          key: "div" + item.ID,
          style: stylesContainer[item.ID]
        }, _react["default"].createElement(_reactDragDropContainer.DragDropContainer, {
          targetKey: "canvas",
          key: "draggable" + item.ID,
          dragClone: true,
          dragData: {
            source: "toolbar",
            ID: item.ID,
            schema_ID: item.schema.ID
          }
        }, imageElements[index])));
      });
      return _react["default"].createElement("div", {
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
          toolbar.push(_react["default"].createElement(_reactCollapsible["default"], {
            key: "Collapsible-".concat(key),
            trigger: _react["default"].createElement(_Button["default"], {
              key: "Trigger".concat(key),
              size: "lg",
              style: style
            }, _react["default"].createElement("div", null, simpleKey), _react["default"].createElement("div", {
              style: styleTransitionClose
            }, "\u25C1")),
            triggerWhenOpen: _react["default"].createElement(_Button["default"], {
              key: "Trigger".concat(key),
              size: "lg",
              style: style
            }, _react["default"].createElement("div", null, simpleKey), _react["default"].createElement("div", {
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
        overflow: "auto",
        //			OverflowEvent: "hidden",
        textAlign: "center",
        verticalAlign: "middle"
      };
      var toolbar = this.createCategories();
      this.cachedToolbar = toolbar;
      return _react["default"].createElement("div", {
        style: style
      }, toolbar);
    }
  }]);

  return Toolbar;
}(_react["default"].PureComponent);

exports["default"] = Toolbar;