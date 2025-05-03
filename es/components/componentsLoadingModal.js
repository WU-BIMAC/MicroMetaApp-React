"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactTabs = require("react-tabs");

require("react-tabs/style/react-tabs.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ComponentsLoadingModal = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ComponentsLoadingModal, _React$PureComponent);

  var _super = _createSuper(ComponentsLoadingModal);

  function ComponentsLoadingModal(props) {
    var _this;

    _classCallCheck(this, ComponentsLoadingModal);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleComponentClick", function (component) {
      _this.setState({
        selectedComponent: component
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function () {
      var selectedComponent = _this.state.selectedComponent;
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          onLoadComponent = _this$props.onLoadComponent; // Access onLoadComponent

      if (selectedComponent) {
        onLoadComponent(selectedComponent); // Call the function to load the component

        onClose(); // Close the modal after loading
      } else {
        alert("Please select a component to load.");
      }
    });

    _this.state = {
      selectedComponent: null
    };
    return _this;
  }

  _createClass(ComponentsLoadingModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          components = _this$props2.components,
          onClose = _this$props2.onClose,
          schema = _this$props2.schema,
          inputData = _this$props2.inputData;
      var selectedComponent = this.state.selectedComponent;

      var mergedData = _objectSpread(_objectSpread({}, inputData), selectedComponent);

      var categoryMap = {};
      var arrayCategories = {};
      console.log("     **** schema in componentsLoadingModal:", schema);
      console.log("     **** selectedComponent in componentsLoadingModal:", selectedComponent);
      console.log("     ** mergedData in componentsLoadingModal", mergedData);
      var allKeys = Object.keys((schema === null || schema === void 0 ? void 0 : schema.properties) || {}).filter(function (key) {
        return key !== "ID";
      }); // allKeys.forEach((key) => {
      //     const prop = schema.properties[key];
      //     const category = prop.category || "General";
      //     if (!categoryMap[category]) categoryMap[category] = [];
      //     categoryMap[category].push(key);
      // });
      // allKeys.forEach(key => {
      //     const prop = schema.properties[key];
      //     if (!prop) return;
      //     const category = prop.category || 'General';
      //     console.log("prop", prop);
      //     console.log("mergedData[key]", mergedData[key]);
      //     // Check if property is an array
      //     if (prop.type === 'array') {
      //         console.log(
      //             `[ARRAY DETECTED] key: ${key}`,
      //             "\n  prop:", prop,
      //             "\n  mergedData[key]:", mergedData[key]
      //         );
      //         arrayCategories[key] = {
      //             itemSchema: prop.items,
      //             elements: mergedData[key]
      //         };
      //     } else {
      //         if (!categoryMap[category]) categoryMap[category] = [];
      //         categoryMap[category].push(key);
      //     }
      // });
      // allKeys.forEach(key => {
      //     const prop = schema.properties[key];
      //     if (!prop) return;
      //     const category = prop.category || 'General';
      //     // Check if property is an array
      //     if (prop.type === 'array') {
      //         // If mergedData[key] is not an array, make it an array (wrap if defined, or set to empty array)
      //         if (!Array.isArray(mergedData[key])) {
      //             if (mergedData[key] !== undefined && mergedData[key] !== null) {
      //                 mergedData[key] = [mergedData[key]];
      //                 console.log(`[ARRAY WRAP] key: ${key} was not array, wrapped:`, mergedData[key]);
      //             } else {
      //                 mergedData[key] = [];
      //                 console.log(`[ARRAY INIT] key: ${key} was undefined/null, set to empty array`);
      //             }
      //         }
      //         console.log(
      //             `[ARRAY DETECTED] key: ${key}`,
      //             "\n  prop:", prop,
      //             "\n  mergedData[key]:", mergedData[key]
      //         );
      //         arrayCategories[key] = {
      //             itemSchema: prop.items,
      //             elements: mergedData[key]
      //         };
      //     } else {
      //         if (!categoryMap[category]) categoryMap[category] = [];
      //         categoryMap[category].push(key);
      //     }
      // });

      allKeys.forEach(function (key) {
        var prop = schema.properties[key];
        if (!prop) return;
        var category = prop.category || "General";
        if (!prop) return; // Only include array tabs if the selected component has this array property

        if (selectedComponent != null && prop && prop.type === "array" && mergedData[key] !== undefined) {
          var elements = mergedData[key]; // If elements is an array with a single element that is itself an array, flatten it

          if (Array.isArray(elements) && elements.length === 1 && Array.isArray(elements[0])) {
            elements = elements[0];
          } // If elements is not an array, wrap it


          if (!Array.isArray(elements)) {
            elements = [elements];
          }

          arrayCategories[key] = {
            itemSchema: prop.items,
            elements: elements
          };
        } else {
          if (!categoryMap[category]) categoryMap[category] = [];
          categoryMap[category].push(key);
        }
      });
      console.log("arrayCategories for current mergedData:", arrayCategories); // Get tab order from schema or use alphabetical

      var tabOrder = Array.isArray(schema === null || schema === void 0 ? void 0 : schema.subCategoriesOrder) ? schema.subCategoriesOrder : Object.keys(categoryMap).sort();
      return /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement("div", {
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
          height: '75%' // Column layout

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
      }, Object.entries(components).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            manufacturer = _ref2[0],
            models = _ref2[1];

        return /*#__PURE__*/_react.default.createElement("li", {
          key: manufacturer
        }, /*#__PURE__*/_react.default.createElement("strong", null, manufacturer), /*#__PURE__*/_react.default.createElement("ul", {
          style: {
            listStyleType: 'none',
            paddingLeft: 15
          }
        }, Object.entries(models).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              model = _ref4[0],
              entries = _ref4[1];

          return /*#__PURE__*/_react.default.createElement("li", {
            key: model
          }, /*#__PURE__*/_react.default.createElement("em", null, model), /*#__PURE__*/_react.default.createElement("ul", {
            style: {
              listStyleType: 'none',
              paddingLeft: 15
            }
          }, Object.entries(entries).map(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                entryKey = _ref6[0],
                entryObj = _ref6[1];

            var comp = entryObj.component;
            var isSelected = selectedComponent === comp;
            return /*#__PURE__*/_react.default.createElement("li", {
              key: entryKey,
              style: {
                padding: '3px 0',
                cursor: 'pointer',
                fontWeight: isSelected ? 'bold' : 'normal',
                color: isSelected ? '#007BFF' : 'black'
              },
              onClick: function onClick() {
                return _this2.handleComponentClick(comp);
              }
            }, comp.Name || entryKey);
          })));
        })));
      }))), /*#__PURE__*/_react.default.createElement(_reactTabs.Tabs, {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/_react.default.createElement(_reactTabs.TabList, null, tabOrder.map(function (category) {
        return /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
          key: category
        }, category);
      }), Object.entries(arrayCategories).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            fieldName = _ref8[0],
            _ref8$ = _ref8[1],
            itemSchema = _ref8$.itemSchema,
            elements = _ref8$.elements;

        return elements.map(function (_, index) {
          return /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, {
            key: "".concat(fieldName, "_").concat(index)
          }, "".concat(fieldName, "_").concat(index));
        });
      })), tabOrder.map(function (category) {
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
        }, /*#__PURE__*/_react.default.createElement("tbody", null, (_categoryMap$category = categoryMap[category]) === null || _categoryMap$category === void 0 ? void 0 : _categoryMap$category.map(function (key) {
          var _mergedData$key;

          var prop = schema.properties[key];
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
      }), Object.entries(arrayCategories).map(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            fieldName = _ref10[0],
            _ref10$ = _ref10[1],
            itemSchema = _ref10$.itemSchema,
            elements = _ref10$.elements;

        return elements.map(function (element, index) {
          return /*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, {
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
          }, /*#__PURE__*/_react.default.createElement("tbody", null, Object.keys(element).map(function (key) {
            console.log("Rendering array tab", {
              fieldName: fieldName,
              element: element,
              itemSchema: itemSchema
            });
            var prop = (itemSchema.properties || {})[key] || {};
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
          }, "Select a component to view its details."));
        });
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
          // Smaller height
          fontSize: "16px",
          // Smaller font size
          fontWeight: 500,
          backgroundColor: "#FFFFFF",
          color: "#030303",
          border: "1px solid #ddd",
          // Less harsh border
          paddingRight: "16px",
          // Adjust padding
          paddingLeft: "16px",
          boxShadow: "none",
          // Remove shadow
          borderRadius: "4px",
          // Soften border-radius
          cursor: "pointer",
          marginRight: "8px"
        }
      }, "Close"), /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.handleSubmit,
        disabled: !selectedComponent,
        style: {
          height: "36px",
          // Smaller height
          fontSize: "16px",
          // Smaller font size
          fontWeight: 500,
          backgroundColor: "#4099AB",
          color: "#FFFFFF",
          border: "1px solid #7ab8c4",
          // Less harsh border
          paddingRight: "18px",
          // Adjust padding
          paddingLeft: "18px",
          borderRadius: "4px",
          // Soften border-radius
          boxShadow: "none",
          // Remove shadow
          opacity: selectedComponent ? 1 : 0.6
        }
      }, "Submit"))))), this.props.overlaysContainer);
    }
  }]);

  return ComponentsLoadingModal;
}(_react.default.PureComponent);

exports.default = ComponentsLoadingModal;