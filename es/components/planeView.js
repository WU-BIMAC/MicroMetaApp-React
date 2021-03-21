"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _uuid = require("uuid");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var validate = require("jsonschema").validate;

var multiplePlanesSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  ID: "MultiplePlanesSchema.json",
  type: "object",
  title: "Add Multiple Planes",
  description: "Insert the required values to add multiple planes at once.",
  tier: 1,
  subCategoriesOrder: {
    General: "This interface allows you to add multiple image Planes to this Image. For example, in case the Image has 10 Z-sections, 3 channels, and 1 time-points, the interface should be used to add three batches (one per Channel) of 10 Planes each."
  },
  properties: {
    NumberOfPlanes: {
      type: "integer",
      description: "Insert the number of Planes to be inserted as part of this batch.",
      tier: 1,
      category: "General"
    },
    "Z-Increment": {
      type: "boolean",
      description: "Select this if you want the different Planes in this batch to have increasing Z-dimension numbers.",
      tier: 1,
      category: "General"
    },
    "T-Increment": {
      type: "boolean",
      description: "Select this if you want the different Planes in this batch to have increasing timepoint-dimension numbers.",
      tier: 1,
      category: "General"
    },
    "C-Increment": {
      type: "boolean",
      description: "Select this if you want the different Planes in this batch to have increasing channel-dimension numbers.",
      tier: 1,
      category: "General"
    },
    "TimeStamp-Increment": {
      type: "number",
      description: "Insert the TimeStamp increment to be set between image Planes in this batch.",
      tier: 1,
      category: "General"
    }
  },
  required: ["NumberOfPlanes", "Z-Increment", "T-Increment", "C-Increment", "TimeStamp-Increment"]
};

var PlaneView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PlaneView, _React$PureComponent);

  var _super = _createSuper(PlaneView);

  function PlaneView(props) {
    var _this;

    _classCallCheck(this, PlaneView);

    _this = _super.call(this, props);
    _this.state = {
      planes: _this.props.inputData || [],
      editing: false,
      selectedIndex: -1,
      addingMultiplePlanes: false,
      addingMultiplePlanes2: false,
      addingMultiplePlanesSetup: null
    };
    console.log("IM HERE");

    if (_this.props.imageMetadata !== null) {
      var planes = _this.props.imageMetadata.Planes;

      for (var i = 0; planes.length; i++) {
        console.log("IM HERE" + i);
        var schema = _this.props.schema;
        var oldPlane = planes[i];
        var newPlane = {
          //Name: `${schema.title} ${planes.length}`,
          ID: (0, _uuid.v4)(),
          Tier: schema.tier,
          Schema_ID: schema.ID,
          Version: schema.version
        };
        _this.state.planes[i] = Object.assign({}, newPlane, oldPlane);
      }
    }

    _this.onAddElement = _this.onAddElement.bind(_assertThisInitialized(_this));
    _this.onEditElement = _this.onEditElement.bind(_assertThisInitialized(_this));
    _this.onRemoveElement = _this.onRemoveElement.bind(_assertThisInitialized(_this));
    _this.onSelectElement = _this.onSelectElement.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    _this.onAddMultiplePlanes = _this.onAddMultiplePlanes.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PlaneView, [{
    key: "onAddElement",
    value: function onAddElement() {
      var uuid = (0, _uuid.v4)();
      var schema = this.props.schema;
      var planes = this.state.planes.slice();
      var newElementData = {
        //Name: `${schema.title} ${planes.length}`,
        ID: uuid,
        Tier: schema.tier,
        Schema_ID: schema.ID,
        Version: schema.version
      };
      Object.keys(schema.properties).forEach(function (key) {
        if (schema.properties[key].type === _constants.string_array) {
          var currentNumber = _constants.string_currentNumberOf_identifier + key;
          var minNumber = _constants.string_minNumberOf_identifier + key;
          var maxNumber = _constants.string_maxNumberOf_identifier + key;

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
          var _currentNumber = _constants.string_currentNumberOf_identifier + key;

          var _minNumber = _constants.string_minNumberOf_identifier + key;

          var _maxNumber = _constants.string_maxNumberOf_identifier + key;

          if (schema.required.indexOf(key) === -1) {
            newElementData[_currentNumber] = 0;
            newElementData[_minNumber] = 0;
            newElementData[_maxNumber] = 1;
          }
        }
      });
      planes.push(newElementData);
      this.setState({
        planes: planes
      });
      if (_constants.bool_isDebug) console.log("added plane");
    }
  }, {
    key: "onRemoveElement",
    value: function onRemoveElement() {
      var index = this.state.selectedIndex;
      var planes = this.state.planes.slice();

      if (index !== -1) {
        var removed = planes.splice(index, 1);
      } else {
        var _removed = planes.pop();
      }

      this.setState({
        planes: planes
      });
      if (_constants.bool_isDebug) console.log("removed plane");
    }
  }, {
    key: "onEditElement",
    value: function onEditElement() {
      this.setState({
        editing: true
      });
      if (_constants.bool_isDebug) console.log("edit plane");
    }
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      var _this2 = this;

      if (this.state.addingMultiplePlanes) {
        this.setState({
          addingMultiplePlanes: false,
          addingMultiplePlanes2: true,
          addingMultiplePlanesSetup: data
        });
      } else if (this.state.addingMultiplePlanes2) {
        var addingMultiplePlanesSetup = this.state.addingMultiplePlanesSetup;
        var planes = this.state.planes.slice();
        var numberOfPlanes = addingMultiplePlanesSetup.NumberOfPlanes;
        var tIncrement = addingMultiplePlanesSetup["T-Increment"];
        var zIncrement = addingMultiplePlanesSetup["Z-Increment"];
        var cIncrement = addingMultiplePlanesSetup["C-Increment"];
        var timeStampIncrement = addingMultiplePlanesSetup["TimeStamp-Increment"];

        var _loop = function _loop(i) {
          var schema = _this2.props.schema;
          var newElementData = Object.assign({}, data);
          var timeStamp = Number(data.Timestamp);
          var theZ = Number(data.TheZ);
          var theC = Number(data.TheC);
          var theT = Number(data.TheT);
          newElementData.ID = (0, _uuid.v4)();

          if (tIncrement) {
            newElementData.TheZ = String(theZ);
            newElementData.TheT = String(theT + i);
            newElementData.TheC = String(theC);
          } else if (zIncrement) {
            newElementData.TheZ = String(theZ + i);
            newElementData.TheT = String(theT);
            newElementData.TheC = String(theC);
          } else if (cIncrement) {
            newElementData.TheZ = String(theZ);
            newElementData.TheT = String(theT);
            newElementData.TheC = String(theC + i);
          }

          newElementData.Timestamp = timeStamp + timeStampIncrement * i;
          Object.keys(schema.properties).forEach(function (key) {
            if (schema.properties[key].type === _constants.string_array) {
              var currentNumber = _constants.string_currentNumberOf_identifier + key;
              var minNumber = _constants.string_minNumberOf_identifier + key;
              var maxNumber = _constants.string_maxNumberOf_identifier + key;

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
              var _currentNumber2 = _constants.string_currentNumberOf_identifier + key;

              var _minNumber2 = _constants.string_minNumberOf_identifier + key;

              var _maxNumber2 = _constants.string_maxNumberOf_identifier + key;

              if (schema.required.indexOf(key) === -1) {
                newElementData[_currentNumber2] = 0;
                newElementData[_minNumber2] = 0;
                newElementData[_maxNumber2] = 1;
              }
            }
          });
          planes.push(newElementData);
        };

        for (var i = 0; i < numberOfPlanes; i++) {
          _loop(i);
        }

        this.setState({
          planes: planes,
          addingMultiplePlanes2: false
        });
      } else {
        var _planes = this.state.planes.slice();

        var found = false;

        for (var _i = 0; _i < _planes.length; _i++) {
          var name_id = this.props.schema.title + "_" + _planes[_i].ID;

          if (id === name_id) {
            _planes[_i] = data;
            found = true;
            break;
          }
        }

        if (!found) {
          //todo should never happen
          console.log("issue with " + id);
        }

        this.setState({
          planes: _planes,
          editing: false
        });
      }
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      this.setState({
        addingMultiplePlanes: false,
        editing: false
      });
    }
  }, {
    key: "onSelectElement",
    value: function onSelectElement(e) {
      var index = e.currentTarget.dataset.id;
      this.setState({
        selectedIndex: index
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      var planes = this.state.planes;
      var id = this.props.id; // console.log("channels");
      // console.log(channels);

      this.setState({
        editing: false
      });
      this.props.onConfirm(id, planes);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.props.onCancel();
    }
  }, {
    key: "onAddMultiplePlanes",
    value: function onAddMultiplePlanes() {
      this.setState({
        addingMultiplePlanes: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var styleValidation = {
        position: "absolute",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center"
      };
      var styleValidated = Object.assign({}, styleValidation, {
        color: "green"
      });
      var styleNotValidated = Object.assign({}, styleValidation, {
        color: "red"
      });

      var isValid = /*#__PURE__*/_react.default.createElement("div", {
        style: styleValidated
      }, "\u25CF");

      var isInvalid = /*#__PURE__*/_react.default.createElement("div", {
        style: styleNotValidated
      }, "\u25CF");

      var index = this.state.selectedIndex;
      var planes = this.state.planes;

      if (this.state.addingMultiplePlanes) {
        return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schema: multiplePlanesSchema,
          inputData: {
            ID: "multiplePlanesSchema"
          },
          id: "multiplePlanesSchema",
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          editable: true
        });
      } else if (this.state.addingMultiplePlanes2) {
        var schema = this.props.schema; //let obj = planes[index];

        return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schema: schema,
          inputData: {
            ID: "Not assigned",
            Tier: schema.tier,
            Schema_ID: schema.ID,
            Version: schema.version
          },
          id: "Not assigned",
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          editable: true
        });
      } else if (this.state.editing) {
        var _schema = this.props.schema;
        var obj = planes[index];
        return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schema: _schema,
          inputData: obj,
          id: _schema.title + "_" + obj.ID,
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          editable: true
        });
      } else {
        var buttonContainerRow = {
          display: "flex",
          flexDirection: "row",
          flexWap: "wrap",
          justifyContent: "center",
          padding: "5px"
        };
        var button1 = {
          width: "50px",
          height: "50px",
          marginLeft: "5px",
          marginRight: "5px"
        };
        var button2 = {
          width: "250px",
          height: "50px",
          marginLeft: "5px",
          marginRight: "5px"
        };
        var nameStyle = {
          display: "flex",
          flexDirection: "row"
        };
        var list = [];

        for (var i = 0; i < planes.length; i++) {
          var plane = planes[i];
          var variant = "dark";

          if (i % 2 === 0) {
            variant = "light";
          }

          var validation = validate(plane, this.props.schema);
          var validated = validation.valid;
          var valid = null;

          if (validated) {
            valid = isValid;
          } else {
            valid = isInvalid;
          }

          var planeName = "Plane " + i;
          list.push( /*#__PURE__*/_react.default.createElement(_ListGroup.default.Item, {
            action: true,
            variant: variant,
            onClick: this.onSelectElement,
            key: "Plane-" + i,
            "data-id": i
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: nameStyle
          }, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              width: "24px"
            }
          }, valid), /*#__PURE__*/_react.default.createElement("div", null, planeName))));
        }

        var planeListStyle = {
          overflow: "auto",
          maxHeight: "0%",
          height: "0%"
        };

        if (planes.length > 0) {
          planeListStyle.maxHeight = "80%";
          planeListStyle.height = "80%";
        }

        return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer
        }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, this.props.schema.title + "s")), /*#__PURE__*/_react.default.createElement("div", {
          style: planeListStyle
        }, /*#__PURE__*/_react.default.createElement(_ListGroup.default, null, list)), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-Add",
          position: _constants.add_plane.position,
          title: _constants.add_plane.title,
          content: _constants.add_plane.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: button1,
            size: "lg",
            onClick: this.onAddElement
          }, "+")
        }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-AddMulti",
          position: _constants.add_multi_planes.position,
          title: _constants.add_multi_planes.title,
          content: _constants.add_multi_planes.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: button2,
            size: "lg",
            onClick: this.onAddMultiplePlanes //disabled={index === -1}

          }, "Add multiple planes")
        }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-Edit",
          position: _constants.edit_plane.position,
          title: _constants.edit_plane.title,
          content: _constants.edit_plane.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: button2,
            size: "lg",
            onClick: this.onEditElement,
            disabled: index === -1
          }, "Edit selected")
        }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
          key: "TooltipButton-Remove",
          position: _constants.remove_plane.position,
          title: _constants.remove_plane.title,
          content: _constants.remove_plane.content,
          element: /*#__PURE__*/_react.default.createElement(_Button.default, {
            style: button1,
            size: "lg",
            onClick: this.onRemoveElement
          }, "-")
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onConfirm
        }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onCancel
        }, "Cancel")));
      }
    }
  }]);

  return PlaneView;
}(_react.default.PureComponent);

exports.default = PlaneView;