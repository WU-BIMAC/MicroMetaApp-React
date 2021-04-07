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
import ReactDOM from "react-dom"; //import "rc-tabs/assets/index.css";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import ModalWindow from "./modalWindow";
import PopoverTooltip from "./popoverTooltip";
import { v4 as uuidv4 } from "uuid";

var validate = require("jsonschema").validate;

import { bool_isDebug, string_object, string_array, string_currentNumberOf_identifier, string_minNumberOf_identifier, string_maxNumberOf_identifier, add_multi_planes, edit_plane, add_plane, remove_plane } from "../constants";
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

    if (_this.props.imageMetadata !== null && _this.props.imageMetadata !== undefined && _this.props.imageMetadata.Planes !== null && _this.props.imageMetadata.Planes !== undefined) {
      var newPlanes = [];

      var planes = _this.props.imageMetadata.Planes.slice();

      if (_this.state.planes.length === planes.length || _this.state.planes.length === 0) {
        for (var i = 0; i < planes.length; i++) {
          var schema = _this.props.schema;
          var oldPlane = planes[i];
          var newPlane = {
            //Name: `${schema.title} ${planes.length}`,
            ID: uuidv4(),
            Tier: schema.tier,
            Schema_ID: schema.ID,
            ModelVersion: schema.modelVersion,
            Extension: schema.extension,
            Domain: schema.domain,
            Category: schema.category
          };
          newPlane = PlaneView.addIdentifiersToNewObject(newPlane, schema);
          var mergedPlane = Object.assign({}, newPlane, oldPlane);

          if (_this.state.planes[i] !== null && _this.state.planes[i] !== undefined) {
            newPlanes[i] = Object.assign({}, mergedPlane, _this.state.planes[i]);
          } else {
            newPlanes[i] = mergedPlane;
          }
        }

        _this.state.planes = newPlanes;
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
      var uuid = uuidv4();
      var schema = this.props.schema;
      var planes = this.state.planes.slice();
      var newElementData = {
        //Name: `${schema.title} ${planes.length}`,
        ID: uuid,
        Tier: schema.tier,
        Schema_ID: schema.ID,
        ModelVersion: schema.modelVersion,
        Extension: schema.extension,
        Domain: schema.domain,
        Category: schema.category
      };
      newElementData = PlaneView.addIdentifiersToNewObject(newElementData, schema);
      planes.push(newElementData);
      this.setState({
        planes: planes
      });
      if (bool_isDebug) console.log("added plane");
    }
  }, {
    key: "onRemoveElement",
    value: function onRemoveElement() {
      var index = this.state.selectedIndex;
      var planes = this.state.planes.slice();

      if (index !== -1) {
        planes.splice(index, 1);
      } else {
        planes.pop();
      }

      this.setState({
        planes: planes
      });
      if (bool_isDebug) console.log("removed plane");
    }
  }, {
    key: "onEditElement",
    value: function onEditElement() {
      this.setState({
        editing: true
      });
      if (bool_isDebug) console.log("edit plane");
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

        var _loop = function (i) {
          var schema = _this2.props.schema;
          var newElementData = Object.assign({}, data);
          var timeStamp = Number(data.Timestamp);
          var theZ = Number(data.TheZ);
          var theC = Number(data.TheC);
          var theT = Number(data.TheT);
          newElementData.ID = (0, _uuid.v4)();
          newElementData.Schema_ID = schema.ID;
          newElementData.Tier = schema.tier;
          newElementData.ModelVersion = schema.modelVersion;
          newElementData.Extension = schema.extension;
          newElementData.Domain = schema.domain;
          newElementData.Category = schema.category;

          if (tIncrement) {
            newElementData.TheZ = theZ;
            newElementData.TheT = theT + i;
            newElementData.TheC = theC;
          } else if (zIncrement) {
            newElementData.TheZ = theZ + i;
            newElementData.TheT = theT;
            newElementData.TheC = theC;
          } else if (cIncrement) {
            newElementData.TheZ = theZ;
            newElementData.TheT = theT;
            newElementData.TheC = theC + i;
          }

          newElementData.Timestamp = timeStamp + timeStampIncrement * i;
          Object.keys(schema.properties).forEach(function (key) {
            if (schema.properties[key].type === string_array) {
              var currentNumber = string_currentNumberOf_identifier + key;
              var minNumber = string_minNumberOf_identifier + key;
              var maxNumber = string_maxNumberOf_identifier + key;

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
                newElementData[string_currentNumberOf_identifier + key] = 0;
                newElementData[string_minNumberOf_identifier + key] = 0;
                newElementData[string_maxNumberOf_identifier + key] = 1;
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
        addingMultiplePlanes2: false,
        editing: false,
        addingMultiplePlanesSetup: null
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
      var isValid = /*#__PURE__*/React.createElement("div", {
        style: styleValidated
      }, "\u25CF");
      var isInvalid = /*#__PURE__*/React.createElement("div", {
        style: styleNotValidated
      }, "\u25CF");
      var index = this.state.selectedIndex;
      var planes = this.state.planes;

      if (this.state.addingMultiplePlanes) {
        return /*#__PURE__*/React.createElement(MultiTabFormWithHeaderV3, {
          schema: multiplePlanesSchema,
          inputData: {
            ID: "multiplePlanesSchema"
          },
          id: "multiplePlanesSchema",
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          editable: true
        });
      } else if (this.state.addingMultiplePlanes2) {
        var schema = this.props.schema; //let obj = planes[index];

        return /*#__PURE__*/React.createElement(MultiTabFormWithHeaderV3, {
          schema: schema,
          inputData: {
            ID: "Not assigned",
            Tier: schema.tier,
            Schema_ID: schema.ID,
            ModelVersion: schema.modelVersion,
            Extension: schema.extension,
            Domain: schema.domain,
            Category: schema.category
          },
          id: "Not assigned",
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          editable: true
        });
      } else if (this.state.editing) {
        var _schema = this.props.schema;
        var obj = planes[index];
        return /*#__PURE__*/React.createElement(MultiTabFormWithHeaderV3, {
          schema: _schema,
          inputData: obj,
          id: _schema.title + "_" + obj.ID,
          onConfirm: this.onElementDataSave,
          onCancel: this.onElementDataCancel,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: string_maxNumberOf_identifier,
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
          list.push( /*#__PURE__*/React.createElement(ListGroup.Item, {
            action: true,
            variant: variant,
            onClick: this.onSelectElement,
            key: "Plane-" + i,
            "data-id": i
          }, /*#__PURE__*/React.createElement("div", {
            style: nameStyle
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              width: "24px"
            }
          }, valid), /*#__PURE__*/React.createElement("div", null, planeName))));
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

        return /*#__PURE__*/React.createElement(ModalWindow, {
          overlaysContainer: this.props.overlaysContainer
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, this.props.schema.title + "s")), /*#__PURE__*/React.createElement("div", {
          style: planeListStyle
        }, /*#__PURE__*/React.createElement(ListGroup, null, list)), /*#__PURE__*/React.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "TooltipButton-Add",
          position: add_plane.position,
          title: add_plane.title,
          content: add_plane.content,
          element: /*#__PURE__*/React.createElement(Button, {
            style: button1,
            size: "lg",
            onClick: this.onAddElement
          }, "+")
        }), /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "TooltipButton-AddMulti",
          position: add_multi_planes.position,
          title: add_multi_planes.title,
          content: add_multi_planes.content,
          element: /*#__PURE__*/React.createElement(Button, {
            style: button2,
            size: "lg",
            onClick: this.onAddMultiplePlanes //disabled={index === -1}

          }, "Add multiple planes")
        }), /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "TooltipButton-Edit",
          position: edit_plane.position,
          title: edit_plane.title,
          content: edit_plane.content,
          element: /*#__PURE__*/React.createElement(Button, {
            style: button2,
            size: "lg",
            onClick: this.onEditElement,
            disabled: index === -1
          }, "Edit selected")
        }), /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "TooltipButton-Remove",
          position: remove_plane.position,
          title: remove_plane.title,
          content: remove_plane.content,
          element: /*#__PURE__*/React.createElement(Button, {
            style: button1,
            size: "lg",
            onClick: this.onRemoveElement
          }, "-")
        })), /*#__PURE__*/React.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/React.createElement(Button, {
          style: button2,
          size: "lg",
          onClick: this.onConfirm
        }, "Confirm"), /*#__PURE__*/React.createElement(Button, {
          style: button2,
          size: "lg",
          onClick: this.onCancel
        }, "Cancel")));
      }
    }
  }], [{
    key: "addIdentifiersToNewObject",
    value: function addIdentifiersToNewObject(object, schema) {
      var newObject = Object.assign({}, object);
      Object.keys(schema.properties).forEach(function (key) {
        if (schema.properties[key].type === string_array) {
          var currentNumber = string_currentNumberOf_identifier + key;
          var minNumber = string_minNumberOf_identifier + key;
          var maxNumber = string_maxNumberOf_identifier + key;

          if (schema.required.indexOf(key) != -1) {
            newObject[currentNumber] = 1;
            newObject[minNumber] = 1;
            newObject[maxNumber] = -1;
          } else {
            newObject[currentNumber] = 0;
            newObject[minNumber] = 0;
            newObject[maxNumber] = -1;
          }
        } else if (schema.properties[key].type === string_object) {
          if (schema.required.indexOf(key) === -1) {
            newObject[string_currentNumberOf_identifier + key] = 0;
            newObject[string_minNumberOf_identifier + key] = 0;
            newObject[string_maxNumberOf_identifier + key] = 1;
          }
        }
      });
      return newObject;
    }
  }]);

  return PlaneView;
}(React.PureComponent);

export { PlaneView as default };