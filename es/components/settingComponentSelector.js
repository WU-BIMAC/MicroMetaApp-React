"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactArcher = require("react-archer");

var _modalWindow = _interopRequireDefault(require("./modalWindow"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _multiTabFormWithHeaderV = _interopRequireDefault(require("./multiTabFormWithHeaderV3"));

var _url = require("url");

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

var url = require("url");

var validate = require("jsonschema").validate;

var SettingComponentSelector = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(SettingComponentSelector, _React$PureComponent);

  var _super = _createSuper(SettingComponentSelector);

  function SettingComponentSelector(props) {
    var _this;

    _classCallCheck(this, SettingComponentSelector);

    _this = _super.call(this, props);
    _this.state = {
      editing: false,
      selectedComp: null,
      selectedSchema: null,
      currentComp: null,
      settingData: props.inputData || null
    };
    if (_this.state.settingData !== null && _this.state.settingData !== undefined) Object.keys(_this.props.componentData).forEach(function (compIndex) {
      var comp = _this.props.componentData[compIndex];

      if (comp.ID === _this.state.settingData.Component_ID) {
        _this.state.currentComp = comp;
      }
    });
    _this.handleSelectComp = _this.handleSelectComp.bind(_assertThisInitialized(_this));
    _this.handleDeleteComp = _this.handleDeleteComp.bind(_assertThisInitialized(_this));
    _this.handleEditSettings = _this.handleEditSettings.bind(_assertThisInitialized(_this));
    _this.onAddConfirm = _this.onAddConfirm.bind(_assertThisInitialized(_this));
    _this.onElementDataCancel = _this.onElementDataCancel.bind(_assertThisInitialized(_this));
    _this.onElementDataSave = _this.onElementDataSave.bind(_assertThisInitialized(_this));
    _this.onConfirm = _this.onConfirm.bind(_assertThisInitialized(_this));
    _this.onCancel = _this.onCancel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SettingComponentSelector, [{
    key: "handleSelectComp",
    value: function handleSelectComp(comp) {
      var selectedComp = comp;
      var componentSchema = this.props.componentSchemas;
      var compSchemas = {};

      for (var i in componentSchema) {
        var schema = componentSchema[i];
        compSchemas[schema.ID] = schema;
      }

      var selectedSchema = compSchemas[selectedComp.Schema_ID];
      this.setState({
        selectedComp: selectedComp,
        selectedSchema: selectedSchema
      });
    }
  }, {
    key: "handleDeleteComp",
    value: function handleDeleteComp() {
      // let i = index - 1;
      // if (selectedSlot.includes("AdditionalSlot_")) {
      // 	let tmpSlots = this.props.tmpSlots;
      // 	if (i !== 0) {
      // 		tmpSlots.splice(i, 1);
      // 	} else {
      // 		tmpSlots = [];
      // 	}
      // 	this.setState({ tmpSlots: tmpSlots });
      // } else {
      // 	let slots = Object.assign({}, this.props.slots);
      // 	delete props[selectedSlot];
      // 	this.setState({ slots: slots });
      // }
      this.setState({
        settingData: null,
        selectedComp: null,
        selectedSchema: null
      });
    }
  }, {
    key: "handleEditSettings",
    value: function handleEditSettings(comp, schema) {
      this.setState({
        selectedComp: comp,
        selectedSchema: schema,
        //selectedSlot: slot,
        editing: true
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      var settingData = this.state.settingData; //let slots = this.state.slots;

      this.setState({
        editing: false,
        selectedSlot: null,
        selectedComp: null,
        currentComp: null,
        settingData: {}
      });
      this.props.onConfirm(this.props.id, settingData);
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.setState({
        editing: false,
        selectedSlot: null,
        selectedComp: null,
        currentComp: null,
        settingData: {}
      });
      this.props.onCancel();
    }
  }, {
    key: "onElementDataSave",
    value: function onElementDataSave(id, data) {
      // let selectedComp = this.state.selectedComp;
      // let selectedSlot = this.state.selectedSlot;
      // let category = this.state.category;
      //let slots = this.state.slots;
      var settingData = Object.assign(this.state.settingData, data);
      this.setState({
        editing: false,
        settingData: settingData
      });
    }
  }, {
    key: "onElementDataCancel",
    value: function onElementDataCancel() {
      // let selectedSlot = this.state.selectedSlot;
      // if (selectedSlot.includes("AdditionalSlot_")) {
      // 	//if (this.state.editingSettings) {
      // 	this.setState({ editingSettings: false });
      // } else {
      // 	this.setState({ editing: false, editingSettings: false });
      // }
      this.setState({
        editing: false
      });
    }
  }, {
    key: "onAddConfirm",
    value: function onAddConfirm() {
      var selectedComp = this.state.selectedComp;
      var selectedSchema = this.state.selectedSchema; //let selectedSlot = this.props.selectedSlot;

      var category = this.props.category;
      var settingsSchema = this.props.settingSchemas;
      var settingData = Object.assign({}, this.state.settingData);
      var settingsSchemas = {};

      for (var i in settingsSchema) {
        var schema = settingsSchema[i];
        settingsSchemas[schema.ID] = schema;
      }

      console.log("category");
      console.log(category);

      if (this.state.currentComp) {
        return;
      }

      if (selectedComp === null || selectedComp === undefined) {
        this.setState({
          selectedComp: null,
          selectedSchema: null
        });
        return;
      }

      var settingsName = selectedSchema.modelSettings + _constants.string_json_ext;
      var currentSchema = settingsSchemas[settingsName];
      var uuid = (0, _uuid.v4)();
      var settingCompData = null;

      if (selectedSchema.modelSettings === "NA") {
        settingCompData = {
          Name: "".concat(selectedSchema.title),
          ID: uuid,
          Component_ID: selectedComp.ID
        };
      } else {
        settingCompData = {
          Name: "".concat(currentSchema.title),
          ID: uuid,
          Component_ID: selectedComp.ID,
          Tier: currentSchema.tier,
          Schema_ID: currentSchema.ID,
          Version: currentSchema.version
        };
      }

      settingData = settingCompData;
      this.setState({
        //tmpSlots: tmpSlots,
        settingData: settingData,
        currentComp: selectedComp,
        selectedComp: null,
        selectedSchema: null
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var buttonContainerRow = {
        display: "flex",
        flexDirection: "row",
        flexWap: "wrap",
        justifyContent: "center",
        padding: "5px"
      };
      var button2 = {
        width: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var regularImageStyle = {
        height: "80px",
        width: "80px",
        margin: "auto"
      };
      var modalGridContainer = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center"
      };
      var modalGridPanel = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        height: "90%",
        alignItems: "left"
      };
      var modalGrid = {
        display: "flex",
        flexDirection: "column",
        //flexWrap: "wrap",
        justifyContent: "flex-start",
        overflow: "auto",
        width: "20%",
        height: "100%",
        maxHeight: "100%" //alignItems: "center",

      };
      var modalTopListContainer = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        overflow: "auto",
        height: "20%",
        maxHeight: "20%",
        alignItems: "center"
      };
      var modalTopList = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center"
      };
      var multiTab = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "auto",
        maxHeight: "100%",
        minWidth: "70%",
        justifyContent: "flex-start",
        width: "70%",
        alignItems: "left",
        marginLeft: "10px"
      };
      var buttonStyle = {
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "white",
        padding: "0px",
        margin: "5px",
        border: "5px solid blue",
        fontSize: "14px",
        color: "inherit",
        cursor: "pointer"
      };
      var fontSize = _constants.number_canvas_element_icons_height + 2;
      var grabberCloserSize = _constants.number_canvas_element_icons_height;
      var styleCloser = {
        lineHeight: "".concat(grabberCloserSize, "px"),
        padding: "0px",
        border: "none",
        fontSize: "".concat(fontSize, "px"),
        backgroundColor: "transparent",
        cursor: "pointer",
        color: "grey",
        textAlign: "right",
        verticalAlign: "middle",
        position: "relative",
        left: "5px",
        top: "5px"
      };
      var componentSchema = this.props.componentSchemas;
      var compSchemas = {};

      for (var i in componentSchema) {
        var schema = componentSchema[i];
        compSchemas[schema.ID] = schema;
      }

      var settingsSchema = this.props.settingSchemas;
      var settingsSchemas = {};

      for (var _i in settingsSchema) {
        var _schema = settingsSchema[_i];
        settingsSchemas[_schema.ID] = _schema;
      }

      var experimentalsSchema = this.props.experimentalSchemas;
      var expSchemas = {};

      for (var _i2 in experimentalsSchema) {
        var _schema2 = experimentalsSchema[_i2];
        expSchemas[_schema2.ID] = _schema2;
      }

      var selectedComp = this.state.selectedComp;
      var selectedSchema = this.state.selectedSchema;
      var selectedID = null;

      if (selectedComp !== null && (selectedSchema === null || selectedSchema === undefined)) {
        selectedID = selectedComp.Schema_ID;
        selectedSchema = compSchemas[selectedID];
      }

      if (this.state.editing) {
        var settingData = this.state.settingData;
        var settingsName = selectedSchema.modelSettings + _constants.string_json_ext;
        var id = settingData.ID;
        var settings = settingsSchemas[settingsName];
        return /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schema: settings,
          inputData: settingData,
          id: id,
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
        var itemList = [];
        Object.keys(this.props.componentData).forEach(function (compIndex) {
          var comp = _this2.props.componentData[compIndex];
          var schema_id = comp.Schema_ID;
          var compSchema = compSchemas[schema_id];
          if (compSchema === null) return;
          var compSchemaCategory = compSchema.category;
          var category = _this2.props.category;

          if (category.includes(schema_id.replace(_constants.string_json_ext, "")) || category.includes(compSchemaCategory) || category.includes(compSchemaCategory.substring(0, compSchemaCategory.indexOf(".")))) {
            // if (selectedComp === null || selectedComp === undefined) {
            // 	selectedComp = comp;
            // }
            // if (selectedSchema === null || selectedSchema === undefined)
            // 	selectedSchema = compSchema;
            var compImage = url.resolve(_this2.props.imagesPath, compSchema.image);

            var compItemImage = /*#__PURE__*/_react.default.createElement("img", {
              src: compImage + (compImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
              alt: comp.Name,
              style: regularImageStyle
            });

            var buttonStyleModified = null;

            if (comp === selectedComp) {
              buttonStyleModified = Object.assign({}, buttonStyle, {
                border: "5px solid cyan"
              });
            } else {
              buttonStyleModified = buttonStyle;
            }

            var compButton = /*#__PURE__*/_react.default.createElement("button", {
              key: "button-" + comp.Name,
              style: buttonStyleModified,
              onClick: function onClick() {
                return _this2.handleSelectComp(comp);
              }
            }, compItemImage, comp.Name);

            itemList.push(compButton);
          }
        });
        var topItems = null;
        var confirmCallback = null; //let item = this.state.currentComp;
        // if (item !== null && item !== undefined) {
        //let items = [];
        // let slots = this.state.slots;
        // let selectedSlot = this.state.selectedSlot;
        // if (slots[selectedSlot] !== undefined && slots[selectedSlot] !== null)
        // 	items = slots[selectedSlot];

        var comp = this.state.currentComp;
        var butt = null;

        if (comp !== null && comp !== undefined) {
          var schema_id = comp.Schema_ID;
          var compSchema = compSchemas[schema_id];
          if (compSchema === null) return;
          var compImage = url.resolve(this.props.imagesPath, compSchema.image);

          var compItemImage = /*#__PURE__*/_react.default.createElement("img", {
            src: compImage + (compImage.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : ""),
            alt: comp.Name,
            style: regularImageStyle
          });

          var buttonStyleModified = null;

          if (comp === selectedComp) {
            buttonStyleModified = Object.assign({}, buttonStyle, {
              border: "5px solid cyan",
              margin: "5px"
            });
          } else {
            buttonStyleModified = Object.assign({}, buttonStyle, {
              margin: "5px"
            });
          }

          butt = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
            type: "button",
            onClick: this.handleDeleteComp,
            style: styleCloser
          }, "x"), /*#__PURE__*/_react.default.createElement("button", {
            key: "button-" + comp.Name,
            style: buttonStyleModified,
            onClick: function onClick() {
              return _this2.handleEditSettings(comp, compSchema);
            }
          }, compItemImage, comp.Name));
        }

        topItems = /*#__PURE__*/_react.default.createElement("div", {
          style: modalTopListContainer
        }, /*#__PURE__*/_react.default.createElement("h5", null, "Current component in this slot"), /*#__PURE__*/_react.default.createElement("div", {
          style: modalTopList
        }, butt));
        Object.assign(modalGridPanel, {
          height: "60%"
        });
        confirmCallback = this.onAddConfirm; //}

        var multiTabPanel = null;
        if (selectedComp !== null && selectedComp !== undefined) multiTabPanel = /*#__PURE__*/_react.default.createElement(_multiTabFormWithHeaderV.default, {
          schema: selectedSchema,
          inputData: selectedComp,
          id: selectedComp.ID,
          onConfirm: confirmCallback,
          onCancel: null,
          overlaysContainer: this.props.overlaysContainer,
          currentChildrenComponentIdentifier: _constants.string_currentNumberOf_identifier,
          minChildrenComponentIdentifier: _constants.string_minNumberOf_identifier,
          maxChildrenComponentIdentifier: _constants.string_maxNumberOf_identifier,
          elementByType: this.props.elementByType,
          notModal: true,
          editable: false
        }); // console.log("itemList");
        // console.log(itemList);
        // console.log("multiTabPanel");
        // console.log(multiTabPanel);

        return /*#__PURE__*/_react.default.createElement(_modalWindow.default, {
          overlaysContainer: this.props.overlaysContainer
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: modalGridContainer
        }, topItems, /*#__PURE__*/_react.default.createElement("div", {
          style: modalGridPanel
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: modalGrid
        }, itemList), /*#__PURE__*/_react.default.createElement("div", {
          style: multiTab
        }, multiTabPanel)), /*#__PURE__*/_react.default.createElement("div", {
          style: buttonContainerRow
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onConfirm //this.onAddAdditionalConfirm

        }, "Confirm"), /*#__PURE__*/_react.default.createElement(_Button.default, {
          style: button2,
          size: "lg",
          onClick: this.onCancel //this.onAddAdditionalCancel

        }, "Cancel"))));
      }
    }
  }]);

  return SettingComponentSelector;
}(_react.default.PureComponent);

exports.default = SettingComponentSelector;