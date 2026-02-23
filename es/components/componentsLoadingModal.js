"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactTabs = require("react-tabs");
require("react-tabs/style/react-tabs.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ComponentsLoadingModal extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleComponentClick", component => {
      this.setState({
        selectedComponent: component
      });
    });
    _defineProperty(this, "handleSubmit", () => {
      const {
        selectedComponent
      } = this.state;
      const {
        onClose,
        onLoadComponent
      } = this.props;
      if (selectedComponent) {
        onLoadComponent(selectedComponent);
        onClose();
      } else {
        alert("Please select a component to load.");
      }
    });
    _defineProperty(this, "toggleManufacturer", manufacturer => {
      this.setState(prevState => {
        const expanded = new Set(prevState.expandedManufacturers);
        if (expanded.has(manufacturer)) expanded.delete(manufacturer);else expanded.add(manufacturer);
        return {
          expandedManufacturers: expanded
        };
      });
    });
    _defineProperty(this, "toggleModel", (manufacturer, model) => {
      const key = "".concat(manufacturer, "|").concat(model);
      this.setState(prevState => {
        const expanded = new Set(prevState.expandedModels);
        if (expanded.has(key)) expanded.delete(key);else expanded.add(key);
        return {
          expandedModels: expanded
        };
      });
    });
    this.state = {
      selectedComponent: null,
      expandedManufacturers: new Set(),
      expandedModels: new Set()
    };
  }
  componentDidMount() {
    const expandedManufacturers = new Set(Object.keys(this.props.components));
    const expandedModels = new Set();
    Object.entries(this.props.components).forEach(_ref => {
      let [manufacturer, models] = _ref;
      Object.keys(models).forEach(model => {
        expandedModels.add("".concat(manufacturer, "|").concat(model));
      });
    });
    this.setState({
      expandedManufacturers,
      expandedModels
    });
  }
  trimMicroscopeName(name) {
    if (typeof name !== "string") return name;
    const underscores = [];
    for (let i = name.length - 1; i >= 0; i--) {
      if (name[i] === "_") underscores.push(i);
      if (underscores.length === 2) break;
    }
    if (underscores.length < 2) return name;
    return name.slice(underscores[1] + 1);
  }
  findTreeKeyForComponent(selectedComponent, components) {
    for (const [manufacturer, models] of Object.entries(components)) {
      for (const [model, entries] of Object.entries(models)) {
        for (const [entryKey, entryObj] of Object.entries(entries)) {
          if (entryObj.component === selectedComponent) {
            return "".concat(manufacturer, "|").concat(model, "|").concat(entryKey);
          }
        }
      }
    }
    return '';
  }
  render() {
    const {
      components,
      onClose,
      schema,
      inputData
    } = this.props;
    const {
      selectedComponent
    } = this.state;
    const filteredInputData = {};
    Object.entries(inputData || {}).forEach(_ref2 => {
      let [key, value] = _ref2;
      if (!Array.isArray(value)) {
        filteredInputData[key] = value;
      }
    });
    const mergedData = _objectSpread(_objectSpread({}, filteredInputData), selectedComponent);
    const categoryMap = {};
    const arrayCategories = {};
    const allKeys = Object.keys((schema === null || schema === void 0 ? void 0 : schema.properties) || {});
    allKeys.forEach(key => {
      const prop = schema.properties[key];
      if (!prop) return;
      const category = prop.category || "General";
      if (selectedComponent != null && prop && prop.type === "array" && mergedData[key] !== undefined) {
        let elements = mergedData[key];
        if (Array.isArray(elements) && elements.length === 1 && Array.isArray(elements[0])) {
          elements = elements[0];
        }
        if (!Array.isArray(elements) && typeof elements === "object" && elements !== null) {
          elements = Object.values(elements);
        }
        arrayCategories[key] = {
          itemSchema: prop.items,
          elements
        };
      } else {
        // Only include ID if selectedComponent has it
        if (key === "ID" && (!selectedComponent || selectedComponent.ID === undefined)) {
          return;
        }
        if (!categoryMap[category]) categoryMap[category] = [];
        categoryMap[category].push(key);
      }
    });

    // const allKeys = Object.keys(schema?.properties || {}).filter(
    //     (key) => key !== "ID"
    // );

    // allKeys.forEach(key => {
    //     const prop = schema.properties[key];
    //     if (!prop) return;
    //     const category = prop.category || "General";

    //     if (selectedComponent != null && prop && prop.type === "array" && mergedData[key] !== undefined) {
    //         let elements = mergedData[key];

    //         if (Array.isArray(elements) && elements.length === 1 && Array.isArray(elements[0])) {
    //             elements = elements[0];
    //         }

    //         if (!Array.isArray(elements) && typeof elements === "object" && elements !== null) {
    //             elements = Object.values(elements);
    //         }

    //         arrayCategories[key] = {
    //             itemSchema: prop.items,
    //             elements
    //         };
    //     } else {
    //         if (!categoryMap[category]) categoryMap[category] = [];
    //         categoryMap[category].push(key);
    //     }
    // });

    const tabOrder = Array.isArray(schema === null || schema === void 0 ? void 0 : schema.subCategoriesOrder) ? schema.subCategoriesOrder : Object.keys(categoryMap).sort();
    return /*#__PURE__*/_reactDom.default.createPortal(/*#__PURE__*/_react.default.createElement("div", {
      className: "modal-overlay",
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "modal-content",
      style: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: '75%',
        height: '75%'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '30%',
        paddingRight: 10,
        borderRight: '1px solid #ccc',
        overflowY: 'auto',
        wordBreak: 'break-word'
      }
    }, /*#__PURE__*/_react.default.createElement("h4", null, "List"), /*#__PURE__*/_react.default.createElement("ul", {
      style: {
        listStyleType: 'none',
        padding: 0
      }
    }, Object.entries(components).map(_ref3 => {
      let [manufacturer, models] = _ref3;
      const isManuExpanded = this.state.expandedManufacturers.has(manufacturer);
      return /*#__PURE__*/_react.default.createElement("li", {
        key: manufacturer,
        style: {
          marginBottom: 4
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        style: {
          cursor: 'pointer',
          userSelect: 'none',
          marginRight: 4
        },
        onClick: () => this.toggleManufacturer(manufacturer),
        title: isManuExpanded ? "Collapse" : "Expand"
      }, isManuExpanded ? '▼' : '▶'), /*#__PURE__*/_react.default.createElement("strong", {
        style: {
          wordBreak: 'break-word',
          whiteSpace: 'normal',
          overflowWrap: 'anywhere',
          // display: 'inline-block',
          maxWidth: '85%'
        }
      }, manufacturer), isManuExpanded && /*#__PURE__*/_react.default.createElement("ul", {
        style: {
          listStyleType: 'none',
          paddingLeft: 18
        }
      }, Object.entries(models).map(_ref4 => {
        let [model, entries] = _ref4;
        const modelKey = "".concat(manufacturer, "|").concat(model);
        const isModelExpanded = this.state.expandedModels.has(modelKey);
        return /*#__PURE__*/_react.default.createElement("li", {
          key: model,
          style: {
            marginBottom: 2
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            cursor: 'pointer',
            userSelect: 'none',
            marginRight: 4
          },
          onClick: () => this.toggleModel(manufacturer, model),
          title: isModelExpanded ? "Collapse" : "Expand"
        }, isModelExpanded ? '▼' : '▶'), /*#__PURE__*/_react.default.createElement("em", {
          style: {
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            // display: 'inline-block',
            maxWidth: '80%'
          }
        }, model), isModelExpanded && /*#__PURE__*/_react.default.createElement("ul", {
          style: {
            listStyleType: 'none',
            paddingLeft: 18
          }
        }, Object.entries(entries).map(_ref5 => {
          let [entryKey, entryObj] = _ref5;
          const comp = entryObj.component;
          const isSelected = selectedComponent === comp;
          return /*#__PURE__*/_react.default.createElement("li", {
            key: entryKey,
            style: {
              padding: '3px 0',
              cursor: 'pointer',
              fontWeight: isSelected ? 'bold' : 'normal',
              color: isSelected ? '#007BFF' : 'black',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              overflowWrap: 'anywhere',
              // display: 'inline-block',
              maxWidth: '95%'
            },
            onClick: () => this.handleComponentClick(comp)
          }, this.trimMicroscopeName(comp.Name) || entryKey);
        })));
      })));
    }))), /*#__PURE__*/_react.default.createElement(_reactTabs.Tabs, {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/_react.default.createElement(_reactTabs.TabList, null, tabOrder.map(category => /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
      key: category
    }, category)), Object.entries(arrayCategories).map(_ref6 => {
      let [fieldName, {
        itemSchema,
        elements
      }] = _ref6;
      return elements.map((_, index) => /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
        key: "".concat(fieldName, "_").concat(index)
      }, "".concat(fieldName, "_").concat(index)));
    })), tabOrder.map(category => {
      var _categoryMap$category;
      return /*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, {
        key: category
      }, selectedComponent ? /*#__PURE__*/_react.default.createElement("div", {
        style: {
          padding: '10px 0',
          overflowY: 'auto'
        }
      }, /*#__PURE__*/_react.default.createElement("table", {
        style: {
          width: '100%',
          borderCollapse: 'collapse'
        }
      }, /*#__PURE__*/_react.default.createElement("tbody", null, (_categoryMap$category = categoryMap[category]) === null || _categoryMap$category === void 0 ? void 0 : _categoryMap$category.map(key => {
        var _mergedData$key;
        const prop = schema.properties[key];
        return /*#__PURE__*/_react.default.createElement("tr", {
          key: key,
          style: {
            borderBottom: '1px solid #eee'
          }
        }, /*#__PURE__*/_react.default.createElement("td", {
          style: {
            padding: '8px',
            fontWeight: 500,
            width: '40%',
            verticalAlign: 'top',
            wordBreak: 'break-word'
          }
        }, prop.description ? /*#__PURE__*/_react.default.createElement("span", {
          title: prop.description
        }, key) : key), /*#__PURE__*/_react.default.createElement("td", {
          style: {
            padding: '8px',
            width: '60%',
            wordBreak: 'break-word'
          }
        }, ((_mergedData$key = mergedData[key]) === null || _mergedData$key === void 0 ? void 0 : _mergedData$key.toString()) || 'N/A'));
      })))) : /*#__PURE__*/_react.default.createElement("p", {
        style: {
          paddingLeft: '10px'
        }
      }, "Select a component to view its details."));
    }), Object.entries(arrayCategories).map(_ref7 => {
      let [fieldName, {
        itemSchema,
        elements
      }] = _ref7;
      return elements.map((element, index) => /*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, {
        key: "".concat(fieldName, "_").concat(index)
      }, selectedComponent ? /*#__PURE__*/_react.default.createElement("div", {
        style: {
          padding: '10px 0'
        }
      }, /*#__PURE__*/_react.default.createElement("table", {
        style: {
          width: '100%',
          borderCollapse: 'collapse'
        }
      }, /*#__PURE__*/_react.default.createElement("tbody", null, Object.keys(element).map(key => {
        const prop = (itemSchema.properties || {})[key] || {};
        return /*#__PURE__*/_react.default.createElement("tr", {
          key: key,
          style: {
            borderBottom: '1px solid #eee'
          }
        }, /*#__PURE__*/_react.default.createElement("td", {
          style: {
            padding: '8px',
            fontWeight: 500,
            width: '40%'
          }
        }, prop.description ? /*#__PURE__*/_react.default.createElement("span", {
          title: prop.description
        }, key) : key), /*#__PURE__*/_react.default.createElement("td", {
          style: {
            padding: '8px',
            width: '60%',
            wordBreak: 'break-word'
          }
        }, element[key] !== undefined && element[key] !== null ? element[key].toString() : 'N/A'));
      })))) : /*#__PURE__*/_react.default.createElement("p", {
        style: {
          paddingLeft: '10px'
        }
      }, "Select a component to view its details.")));
    }))), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 15
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: onClose,
      style: {
        height: "36px",
        fontSize: "16px",
        fontWeight: 500,
        backgroundColor: "#FFFFFF",
        color: "#030303",
        border: "1px solid #ddd",
        paddingRight: "16px",
        paddingLeft: "16px",
        boxShadow: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "8px"
      }
    }, "Close"), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.handleSubmit,
      disabled: !selectedComponent,
      style: {
        height: "36px",
        fontSize: "16px",
        fontWeight: 500,
        backgroundColor: "#4099AB",
        color: "#FFFFFF",
        border: "1px solid #7ab8c4",
        paddingRight: "18px",
        paddingLeft: "18px",
        borderRadius: "4px",
        boxShadow: "none",
        opacity: selectedComponent ? 1 : 0.6
      }
    }, "Submit"))))), this.props.overlaysContainer);
  }
}
exports.default = ComponentsLoadingModal;