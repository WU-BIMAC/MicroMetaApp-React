"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hardware_explorer_tooltip = exports.save_microscope_tooltip = exports.validation_tooltip = exports.edit_microscope_tooltip = exports.back_tooltip = exports.create_mode_continue_tooltip = exports.create_from_repo_names_tooltip = exports.create_from_repo_manufacturer_tooltip = exports.create_from_file_tooltip = exports.create_mode_selector_tooltip = exports.manage_settings_tooltip = exports.manage_instrument_tooltip = exports.tier_selector_tooltip = exports.string_bandpass_warning = exports.menu_order = exports.number_min_element_width = exports.number_canvas_height = exports.number_canvas_width = exports.number_logo_height = exports.number_logo_width = exports.string_validationTier = exports.string_loadFromRepository = exports.string_createFromFile = exports.string_createFromScratch = exports.string_logo_img_micro_bk = exports.string_logo_img_cell_bk = exports.string_logo_img_no_bk = exports.string_json_ext = exports.string_maxNumberOf_identifier = exports.string_minNumberOf_identifier = exports.string_currentNumberOf_identifier = exports.string_linkedFields = exports.string_toolbar = exports.string_canvas = exports.string_array = exports.string_object = exports.string_enumNames = exports.string_enum = exports.string_default = exports.string_not_assigned = exports.string_na = exports.bool_isSettings = exports.bool_isDebug = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bool_isDebug = false;
exports.bool_isDebug = bool_isDebug;
const bool_isSettings = true;
exports.bool_isSettings = bool_isSettings;
const string_na = "na";
exports.string_na = string_na;
const string_not_assigned = "Not assigned";
exports.string_not_assigned = string_not_assigned;
const string_default = "default";
exports.string_default = string_default;
const string_enum = "enum";
exports.string_enum = string_enum;
const string_enumNames = "enumNames";
exports.string_enumNames = string_enumNames;
const string_object = "object";
exports.string_object = string_object;
const string_array = "array";
exports.string_array = string_array;
const string_canvas = "canvas";
exports.string_canvas = string_canvas;
const string_toolbar = "toolbar";
exports.string_toolbar = string_toolbar;
const string_linkedFields = "LinkedFields";
exports.string_linkedFields = string_linkedFields;
const string_currentNumberOf_identifier = "Number_Of_";
exports.string_currentNumberOf_identifier = string_currentNumberOf_identifier;
const string_minNumberOf_identifier = "Min_Number_Of_";
exports.string_minNumberOf_identifier = string_minNumberOf_identifier;
const string_maxNumberOf_identifier = "Max_Number_Of_";
exports.string_maxNumberOf_identifier = string_maxNumberOf_identifier;
const string_json_ext = ".json";
exports.string_json_ext = string_json_ext;
const string_logo_img_no_bk = "MicroMetaApp_noBkg_3.png";
exports.string_logo_img_no_bk = string_logo_img_no_bk;
const string_logo_img_cell_bk = "MicroMetaApp_cellBkg.png";
exports.string_logo_img_cell_bk = string_logo_img_cell_bk;
const string_logo_img_micro_bk = "MicroMetaApp_TESMBkg_2.png";
exports.string_logo_img_micro_bk = string_logo_img_micro_bk;
const string_createFromScratch = "Create from scratch";
exports.string_createFromScratch = string_createFromScratch;
const string_createFromFile = "Load from file";
exports.string_createFromFile = string_createFromFile;
const string_loadFromRepository = "Load from repository";
exports.string_loadFromRepository = string_loadFromRepository;
const string_validationTier = "Validate @ tier: ";
exports.string_validationTier = string_validationTier;
const number_logo_width = 800;
exports.number_logo_width = number_logo_width;
const number_logo_height = 280;
exports.number_logo_height = number_logo_height;
const number_canvas_width = 3201;
exports.number_canvas_width = number_canvas_width;
const number_canvas_height = 969;
exports.number_canvas_height = number_canvas_height;
const number_min_element_width = 25;
exports.number_min_element_width = number_min_element_width;
const menu_order = ["MicroscopyBasics", "Transmitted_LightSource", "Fluorescence_LightSource", "LightSourceCoupling", "Magnification", "Stage", "Focusing", "FilterHolder", // currently absentee
"LightPath", //in the future Excitation - Emission
"AdditionalOptics", "Mirror", // in the future MirroringDevice
"Detector", "Detector.PointDetector", // currently absentee
"Detector.Camera", "Calibration"];
exports.menu_order = menu_order;
const string_bandpass_warning = "If you modify the number of band-pass, the information not saved are going to be lost!";
exports.string_bandpass_warning = string_bandpass_warning;
const tier_selector_tooltip = {
  title: "Tier Selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the Tier level you want to utilize to document Instrument Hardware Specifications and Image Acquisition Settings. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "top"
};
exports.tier_selector_tooltip = tier_selector_tooltip;
const manage_instrument_tooltip = {
  title: "Manage Instrument Hardware",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to create, load from a template, or edit a Microscope file describing the hardware components of the Instrument you want to document"),
  position: "left"
};
exports.manage_instrument_tooltip = manage_instrument_tooltip;
const manage_settings_tooltip = {
  title: "Manage Acquisition Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select an existing Microscope file and enter, load from file, or edit the acquisition settings associated with the specific Image dataset you want to document"),
  position: "right"
};
exports.manage_settings_tooltip = manage_settings_tooltip;
const create_mode_selector_tooltip = {
  title: "Create mode selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the modality you want to use for Instrument hardware management. 'Create from scratch' allows you to create a brand new Microscope file from scratch.'Load from file' allows you to import into Micro- Meta App a previously available Microscope file (i.e., an example file, a template file, or an existing Microscope file shared by a colleague) to edit.'Load from repository' allows you to load a previously available file from the active Micro-Meta App repository."),
  position: "top"
};
exports.create_mode_selector_tooltip = create_mode_selector_tooltip;
const create_from_file_tooltip = {
  title: "Create from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Microscope file you want to work on."),
  position: "top"
};
exports.create_from_file_tooltip = create_from_file_tooltip;
const create_from_repo_manufacturer_tooltip = {
  title: "Create from repository",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Manufacturer of the Microscope you want to load."),
  position: "top"
};
exports.create_from_repo_manufacturer_tooltip = create_from_repo_manufacturer_tooltip;
const create_from_repo_names_tooltip = {
  title: "Create from repository",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Microscope you want to load."),
  position: "top"
};
exports.create_from_repo_names_tooltip = create_from_repo_names_tooltip;
const create_mode_continue_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Create a microscope using the mode selected above."),
  position: "left"
};
exports.create_mode_continue_tooltip = create_mode_continue_tooltip;
const back_tooltip = {
  title: "Back",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Return to the initial window."),
  position: "right"
};
exports.back_tooltip = back_tooltip;
const edit_microscope_tooltip = {
  title: "Edit microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter general information about this Instrument."),
  position: "top"
};
exports.edit_microscope_tooltip = edit_microscope_tooltip;
const validation_tooltip = {
  title: "Validation Tier selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the Tier level you want to use to validate this Microscope file. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/_react.default.createElement("a", {
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "top"
};
exports.validation_tooltip = validation_tooltip;
const save_microscope_tooltip = {
  title: "Save microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose whether you want to save this Microscope file to the active Micro-Meta App repository or if you want to export it to your local file system."),
  position: "top"
};
exports.save_microscope_tooltip = save_microscope_tooltip;
const hardware_explorer_tooltip = {
  title: "Hardware component selection",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Use this menu to select hardware components to include in this Microscope file. Please follow these steps: 1 - Open an individual menu. 2 - Drag-and-drop the desired element into the main canvas. 3 - Click on the desired element to enter the information you want to document. 4 - Click on Confirm to save the information you have entered."),
  position: "bottom"
};
exports.hardware_explorer_tooltip = hardware_explorer_tooltip;