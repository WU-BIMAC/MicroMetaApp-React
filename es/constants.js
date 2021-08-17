"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select_lightSource = exports.edit_channel_settings = exports.edit_channel = exports.edit_plane = exports.remove_channel = exports.add_channel = exports.remove_plane = exports.add_plane = exports.add_multi_planes = exports.edit_mic_table_settings = exports.edit_sample_pos_settings = exports.edit_obj_settings = exports.edit_mic_settings = exports.edit_img_env_settings = exports.edit_channels = exports.edit_planes = exports.hardware_explorer_tooltip = exports.export_setting_tooltip = exports.save_setting_tooltip = exports.export_microscope_tooltip = exports.save_microscope_tooltip = exports.export_component_tooltip = exports.save_component_tooltip = exports.validation_setting_tooltip = exports.validation_microscope_tooltip = exports.edit_setting_tooltip = exports.edit_microscope_tooltip = exports.back_tooltip = exports.import_tooltip = exports.loadImage_mode_continue_tooltip = exports.createSettings_mode_continue_tooltip = exports.create_mode_continue_settings_tooltip = exports.create_mode_continue_tooltip = exports.loadImage_from_repo_names_tooltip = exports.createSettings_from_repo_names_tooltip = exports.create_from_repo_names_tooltip = exports.create_from_repo_manufacturer_tooltip = exports.loadImage_from_file_tooltip = exports.createSettings_from_file_tooltip = exports.create_from_file_tooltip = exports.loadImage_mode_selector_tooltip = exports.createSettings_mode_selector_tooltip = exports.create_mode_selector_settings_tooltip = exports.create_mode_selector_tooltip = exports.manage_settings_tooltip = exports.manage_instrument_tooltip = exports.tier_selector_tooltip = exports.string_bandpass_warning = exports.menu_order = exports.channelPath_Additional_8 = exports.channelPath_Additional_7 = exports.channelPath_Additional_3_4_5_6 = exports.channelPath_Additional_2 = exports.channelPath_Additional_1 = exports.channelPath_Emission = exports.channelPath_Dichroic = exports.channelPath_Excitation = exports.channelPath_LightSource = exports.channelPath_Detector = exports.channelPath_RelayLens = exports.channelPath_CouplingLens = exports.channelPath_LightSourceCoupling = exports.channelPath_Objective = exports.matchSettings = exports.current_stands = exports.number_canvas_element_offset_default = exports.number_canvas_element_icons_height = exports.number_canvas_element_min_height = exports.number_canvas_element_min_width = exports.number_logo_height = exports.number_logo_width = exports.string_typeDimensionsGeneral = exports.string_validationTier = exports.string_noImageLoad = exports.string_loadFromHomeFolder = exports.string_loadFromRepository = exports.string_createFromFile = exports.string_createFromScratch = exports.string_microscope_img = exports.string_import_img = exports.string_export_img = exports.string_save_img = exports.string_back_img = exports.string_logo_img_micro_bk = exports.string_logo_img_cell_bk = exports.string_logo_img_no_bk = exports.string_json_ext = exports.string_maxNumberOf_identifier = exports.string_minNumberOf_identifier = exports.string_currentNumberOf_identifier = exports.string_linkedFields = exports.string_toolbar = exports.string_canvas = exports.string_array = exports.string_object = exports.string_enumNames = exports.string_enum = exports.string_default = exports.string_not_assigned = exports.string_na = void 0;
exports.select_additional_right = exports.select_additional_left = exports.select_emission = exports.select_dichroic = exports.select_excitation = exports.select_detector = exports.select_relayLens = exports.select_lightSourceCoupling = exports.select_couplingLens = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string_na = "na";
exports.string_na = string_na;
var string_not_assigned = "Not assigned";
exports.string_not_assigned = string_not_assigned;
var string_default = "default";
exports.string_default = string_default;
var string_enum = "enum";
exports.string_enum = string_enum;
var string_enumNames = "enumNames";
exports.string_enumNames = string_enumNames;
var string_object = "object";
exports.string_object = string_object;
var string_array = "array";
exports.string_array = string_array;
var string_canvas = "canvas";
exports.string_canvas = string_canvas;
var string_toolbar = "toolbar";
exports.string_toolbar = string_toolbar;
var string_linkedFields = "LinkedFields";
exports.string_linkedFields = string_linkedFields;
var string_currentNumberOf_identifier = "Current_Number_Of_";
exports.string_currentNumberOf_identifier = string_currentNumberOf_identifier;
var string_minNumberOf_identifier = "Min_Number_Of_";
exports.string_minNumberOf_identifier = string_minNumberOf_identifier;
var string_maxNumberOf_identifier = "Max_Number_Of_";
exports.string_maxNumberOf_identifier = string_maxNumberOf_identifier;
var string_json_ext = ".json";
exports.string_json_ext = string_json_ext;
var string_logo_img_no_bk = "MicroMetaApp_noBkg_noOutline.png";
exports.string_logo_img_no_bk = string_logo_img_no_bk;
var string_logo_img_cell_bk = "MicroMetaApp_cellBkg.png";
exports.string_logo_img_cell_bk = string_logo_img_cell_bk;
var string_logo_img_micro_bk = "MicroMetaApp_TESMBkg_2.png";
exports.string_logo_img_micro_bk = string_logo_img_micro_bk;
var string_back_img = "arrow-circle-left-solid.svg";
exports.string_back_img = string_back_img;
var string_save_img = "save-solid.svg";
exports.string_save_img = string_save_img;
var string_export_img = "file-export-solid.svg";
exports.string_export_img = string_export_img;
var string_import_img = "file-import-solid.svg";
exports.string_import_img = string_import_img;
var string_microscope_img = "microscope-solid.svg";
exports.string_microscope_img = string_microscope_img;
var string_createFromScratch = "Create # from scratch";
exports.string_createFromScratch = string_createFromScratch;
var string_createFromFile = "Import from file";
exports.string_createFromFile = string_createFromFile;
var string_loadFromRepository = "Load from repository";
exports.string_loadFromRepository = string_loadFromRepository;
var string_loadFromHomeFolder = "Load from the local home folder";
exports.string_loadFromHomeFolder = string_loadFromHomeFolder;
var string_noImageLoad = "Skip load Image";
exports.string_noImageLoad = string_noImageLoad;
var string_validationTier = "Validate @ tier: ";
exports.string_validationTier = string_validationTier;
var string_typeDimensionsGeneral = "General";
exports.string_typeDimensionsGeneral = string_typeDimensionsGeneral;
var number_logo_width = 800;
exports.number_logo_width = number_logo_width;
var number_logo_height = 280; // export const number_canvas_width = 3201;
// export const number_canvas_height = 989;

export var number_canvas_element_min_width = 25;
export var number_canvas_element_min_height = 25;
export var number_canvas_element_icons_height = 12.5;
export var number_canvas_element_offset_default = 6.67;
export var current_stands = [{
  name: "Inverted",
  json: "InvertedMicroscopeStand"
}, {
  name: "Upright",
  json: "UprightMicroscopeStand"
}];
export var matchSettings = {};
export var channelPath_Objective = ["Objective"];
export var channelPath_LightSourceCoupling = ["LightSourceCoupling"];
export var channelPath_CouplingLens = ["CouplingLens"];
export var channelPath_RelayLens = ["RelayLens"];
export var channelPath_Detector = ["Detector"];
export var channelPath_LightSource = ["Fluorescence_LightSource", "Transmitted_LightSource"];
export var channelPath_Excitation = ["ExcitationFilter", "AcoustoOpticalLTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"DiffractionGrating" //Advanced/
];
export var channelPath_Dichroic = ["StandardDichroic", "AcoustoOpticalLBeamSplitter", //Advanced/
"AcoustoOpticalLTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"DiffractionGrating" //Advanced/
];
export var channelPath_Emission = ["EmissionFilter", "AcoustoOpticalLTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"DiffractionGrating" //Advanced/
];
export var channelPath_Additional_1 = ["Shutter", "IrisDiaphragm", "ExcitationFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "BeamExpander", "BeamExpanderLens", "BeamCollimator", "BeamCollimatorLens", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate" //Advanced/
];
export var channelPath_Additional_2 = ["ExcitationFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "CondenserLens", "TubeLens", "BeamExpanderLens", "BeamCollimatorLens", "DarkfieldStop", "HoffmanSlitPlate", "IrisDiaphragm", "PhaseRing", "VarelRing", "Shutter", "BeamExpander", "BeamCollimator", "Condenser", "MicroscopeTube", "PolarizationOptics", "Prism", "SpinningDisk", //Advanced/
"RasterScanner", //Advanced/
"DiffractionGrating", //Advanced/
"MaskingPlate", //Advanced/
"Pinhole" //Advanced
];
export var channelPath_Additional_3_4_5_6 = ["Shutter", "DarkfieldStop", "IrisDiaphragm", "ExcitationFilter", "EmissionFilter", "NeutralDensityFilter", "AdditionalFilter", "StandardDichroic", "GenericDichroic", "GenericDichroic", "BeamSplitter", "GenericLens", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate", //Advanced/
"Pinhole", //Advanced
"AcoustoOpticallTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"AcoustoOpticalLBeamSplitter" //Advanced/
];
export var channelPath_Additional_7 = ["Shutter", "IrisDiaphragm", "EmissionFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "CondenserLens", "MagnificationChanger", "MicroscopeTube", "BeamExpanderLens", "BeamCollimatorLens", "BeamExpander", "BeamCollimator", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate", //Advanced/
"Pinhole" //Advanced
];
export var channelPath_Additional_8 = ["Shutter", "IrisDiaphragm", "EmissionFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "BeamExpander", "BeamExpanderLens", "BeamCollimator", "BeamCollimatorLens", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate" //Advanced/
];
export var menu_order = ["MicroscopyAccessories", "Software", "Transmitted_LightSource", "Fluorescence_LightSource", "Magnification", "LightSourceCoupling", "FluorescenceLightPath", "Stage", "Focusing", "OpticalAssembly", "OpticsHolder", "Aperture", "Filter", "MirroringDevice", "Lens", "AdditionalOptics", "Detector", "Detector.Camera", "Detector.PointDetector", "Calibration"];
export var string_bandpass_warning = "PLEASE NOTE: If the number of WavelengthRange modules or sub-components (e.g., LEDModule) is changed, all values entered but not yet confirmed will be lost.";
export var tier_selector_tooltip = {
  title: "Tier Selector",
  content: /*#__PURE__*/React.createElement("p", null, "Choose the Tier level you want to utilize to document Instrument Hardware Specifications and Image Acquisition Settings. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "top"
};
export var manage_instrument_tooltip = {
  title: "Manage Instrument Hardware",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to create, load from a template, or edit a Microscope file describing the hardware components of the Instrument you want to document"),
  position: "left"
};
export var manage_settings_tooltip = {
  title: "Manage Acquisition Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select an existing Microscope file and enter, load from file, or edit the acquisition settings associated with the specific Image dataset you want to document"),
  position: "right"
};
export var create_mode_selector_tooltip = {
  title: "Create mode selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the modality you want to use for Instrument hardware management. 'Create from scratch' allows you to create a brand new Microscope file from scratch. 'Import from file' allows you to import into Micro-Meta App a previously available Microscope file (i.e., an example file, a template file, or an existing Microscope file shared by a colleague) to edit. 'Load from repository' or 'Load from the local home folder' allows you to load a previously available file, respectively, from the active Micro-Meta App repository or the local home folder."),
  position: "top"
};
export var create_mode_selector_settings_tooltip = {
  title: "Open Microscope file selector",
  content: /*#__PURE__*/React.createElement("p", null, "Choose the source of the Microscope file you want to use and that describes the Instrument that was used for the acquisition of the image(s) you want to annotate."),
  position: "top"
};
export var createSettings_mode_selector_tooltip = {
  title: "Load Settings file selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the modality you want to use for Settings management. 'Create from scratch' allows you to create a brand new Settings file from scratch. 'Import from file' allows you to import into Micro-Meta App a previously available Settings file (i.e., an example file, a template file, or an existing Settings file shared by a colleague) to edit. 'Load from repository' or 'Load from the local home folder' allows you to load a previously available file, respectively, from the active Micro-Meta App repository or the local home folder."),
  position: "top"
};
export var loadImage_mode_selector_tooltip = {
  title: "Open Image file selector",
  content: /*#__PURE__*/React.createElement("p", null, "Choose the source of the Image file you wish to work with or select 'Skip load image' to continue without an Image."),
  position: "top"
};
export var create_from_file_tooltip = {
  title: "Create from file",
  content: /*#__PURE__*/React.createElement("p", null, "Select an existing Microscope file you want to work on."),
  position: "top"
};
exports.create_from_file_tooltip = create_from_file_tooltip;
var createSettings_from_file_tooltip = {
  title: "Import from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Settings file you want to work on."),
  position: "top"
};
exports.createSettings_from_file_tooltip = createSettings_from_file_tooltip;
var loadImage_from_file_tooltip = {
  title: "Import from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Image file you want to work on."),
  position: "top"
};
exports.loadImage_from_file_tooltip = loadImage_from_file_tooltip;
var create_from_repo_manufacturer_tooltip = {
  title: "Select Manufacturer",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Manufacturer of the Microscope you want to load."),
  position: "top"
};
exports.create_from_repo_manufacturer_tooltip = create_from_repo_manufacturer_tooltip;
var create_from_repo_names_tooltip = {
  title: "Select Microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Microscope you want to load."),
  position: "top"
};
exports.create_from_repo_names_tooltip = create_from_repo_names_tooltip;
var createSettings_from_repo_names_tooltip = {
  title: "Select Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Settings file you want to load."),
  position: "top"
};
export var loadImage_from_repo_names_tooltip = {
  title: "Load from multi file",
  content: /*#__PURE__*/React.createElement("p", null, "Select the Image entry you want to load."),
  position: "top"
};
export var create_mode_continue_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/React.createElement("p", null, "Create a microscope using the mode selected above."),
  position: "right"
};
export var create_mode_continue_settings_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the image(s) you want to annotate and, if available, an existing Settings file."),
  position: "right"
};
export var createSettings_mode_continue_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to create a new Settings file or edit an existing one using the modality chosen above."),
  position: "right"
};
export var loadImage_mode_continue_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to create a new Settings file or load metadata from an Image using the modality chosen above."),
  position: "right"
};
export var import_tooltip = {
  title: "Import microscope",
  content: /*#__PURE__*/React.createElement("p", null, "Import a new microscope file to overwrite the one currently open."),
  position: "top"
};
export var back_tooltip = {
  title: "Back",
  content: /*#__PURE__*/React.createElement("p", null, "Return to the initial window."),
  position: "left"
};
export var edit_microscope_tooltip = {
  title: "Edit microscope",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to enter general information about this Instrument."),
  position: "bottom"
};
export var edit_setting_tooltip = {
  title: "Edit Image Acquisition Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to enter general information about the acquisition settings utilized for this image."),
  position: "bottom"
};
export var validation_microscope_tooltip = {
  title: "Validation Tier selector",
  content: /*#__PURE__*/React.createElement("p", null, "Choose the Tier level you want to use to validate this Microscope file. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "bottom"
};
export var validation_setting_tooltip = {
  title: "Validation Tier selector",
  content: /*#__PURE__*/React.createElement("p", null, "Choose the Tier level you want to use to validate this Settings file. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "bottom"
};
export var save_component_tooltip = {
  title: "Save component",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Save the JSON file for this Component to the active Micro-Meta App repository or to the local home folder. You have one of two options: 1) 'Save' allows to save the Component JSON file in its current status. 2) 'Save as new' allows to save the Component JSON file with a new Unique ID."),
  position: "top"
};
exports.save_component_tooltip = save_component_tooltip;
var export_component_tooltip = {
  title: "Export component",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Export the current Component JSON file from Micro-Meta App to the file system. You have one of two options: 1) 'Export' allows to export the Component JSON file in its current status. 2) 'Export as new' allows to export the Component JSON file with a new Unique ID."),
  position: "top"
};
exports.export_component_tooltip = export_component_tooltip;
var save_microscope_tooltip = {
  title: "Save microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Save the JSON file for this Microscope to the active Micro-Meta App repository or to the local home folder. You have one of two options: 1) 'Save' allows to save the Microscope JSON file in its current status. 2) 'Save as new' allows to save the Microscope JSON file with a new Unique ID."),
  position: "top"
};
exports.save_microscope_tooltip = save_microscope_tooltip;
var export_microscope_tooltip = {
  title: "Export microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Export the current Microscope JSON file from Micro-Meta App to the file system. You have one of two options: 1) 'Export' allows to export the Microscope JSON file in its current status. 2) 'Export as new' allows to export the Microscope JSON file with a new Unique ID."),
  position: "top"
};
exports.export_microscope_tooltip = export_microscope_tooltip;
var save_setting_tooltip = {
  title: "Save settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Save the JSON file for this Settings to the active Micro-Meta App repository or to the local home folder. You have one of two options: 1) 'Save' allows to save the Settings JSON file in its current status. 2) 'Save as new' allows to save the Settings JSON file with a new Unique ID."),
  position: "top"
};
exports.save_setting_tooltip = save_setting_tooltip;
var export_setting_tooltip = {
  title: "Export settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Export the current Settings JSON file from Micro-Meta App to the file system. You have one of two options: 1) 'Export' allows to export the Settings JSON file in its current status. 2) 'Export as new' allows to export the Settings JSON file with a new Unique ID."),
  position: "top"
};
exports.export_setting_tooltip = export_setting_tooltip;
var hardware_explorer_tooltip = {
  title: "Hardware component selection",
  content: /*#__PURE__*/React.createElement("p", null, "Use this menu to select hardware components to include in this Microscope file. Please follow these steps: 1 - Open an individual menu. 2 - Drag-and-drop the desired element into the main canvas. 3 - Click on the desired element to enter the information you want to document. 4 - Click on Confirm to save the information you have entered."),
  position: "left"
};
export var edit_planes = {
  title: "Edit Planes",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to enter or edit general information about the Image Planes."),
  position: "bottom"
};
export var edit_channels = {
  title: "Edit Channels",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to enter or edit general information about the image Channels and about the light path associated with each of them."),
  position: "bottom"
};
export var edit_img_env_settings = {
  title: "Edit Imaging Environment",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Imaging Environmental Control Device that was used, and enter or edit information about the environment in which the biological sample was maintained during the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
export var edit_mic_settings = {
  title: "Edit Microscope Stand Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to enter or edit information about the Settings that were applied to the Microscope Stand during the acquisition of this Image."),
  position: "bottom"
};
export var edit_obj_settings = {
  title: "Edit Objective Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Objective and edit the settings that were used for the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
export var edit_sample_pos_settings = {
  title: "Edit Sample Positioning Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select one or more Sample Positioning devices, and enter or edit the settings that were applied to them during the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
export var edit_mic_table_settings = {
  title: "Edit Microscope Table Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Microscope Table, and enter or edit the settings that were applied to the Microscope Table for the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
export var add_multi_planes = {
  title: "Add multiple Planes",
  content: /*#__PURE__*/React.createElement("p", null, "In case information about the Image Planes have not been imported automatically with BioFormats, click this button to easily add multiple related Planes to this Image."),
  position: "bottom"
};
export var add_plane = {
  title: "Add Plane",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to add a single Image Plane"),
  position: "bottom"
};
export var remove_plane = {
  title: "Remove Plane",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to remove the selected Image Plane"),
  position: "bottom"
};
export var add_channel = {
  title: "Add Channel",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to add a single Image Channel"),
  position: "bottom"
};
export var remove_channel = {
  title: "Remove Channel",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to remove the selected Image Channel"),
  position: "bottom"
};
export var edit_plane = {
  title: "Edit Plane",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to edit or enter general information about the selected Image Planes."),
  position: "bottom"
};
export var edit_channel = {
  title: "Edit Channel",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to enter or edit general information about the image Channels and about the light path associated with each of them."),
  position: "bottom"
};
export var edit_channel_settings = {
  title: "Edit Channel Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to enter or edit general information about this image Channel."),
  position: "top"
};
export var select_lightSource = {
  title: "Select Light Source",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Light Source that was used for the acquisition of this Channel. After confirming the selection, click on the selected Light Source one more time to enter or edit the settings that were applied to it during acquisition. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
export var select_couplingLens = {
  title: "Select Coupling Lens",
  content: /*#__PURE__*/React.createElement("p", null, "If applicable, click this button to select the Coupling Lens that was used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
export var select_lightSourceCoupling = {
  title: "Select Light Source Coupling",
  content: /*#__PURE__*/React.createElement("p", null, "If applicable, click this button to select the Light Source Coupling device that was used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
export var select_relayLens = {
  title: "Select Relay Lens",
  content: /*#__PURE__*/React.createElement("p", null, "If applicable, click this button to select the Relay Lens that was used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
export var select_detector = {
  title: "Select Detector",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Detector that was used for the acquisition of this Channel. After confirming the selection, click on the selected Detector one more time to enter or edit the settings that were applied to it during acquisition. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
export var select_excitation = {
  title: "Select Excitation Wavelength",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Excitation Filter used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
export var select_dichroic = {
  title: "Select Dichroic",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Dichroic (or Beamsplitter) that was used for the acquisition of this Channel. After confirming the selection, click on the selected Dichroic or (Beamsplitter) one more time to enter or edit the settings that were applied to it during acquisition. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "top"
};
export var select_emission = {
  title: "Select Emission Wavelength",
  content: /*#__PURE__*/React.createElement("p", null, "Click this button to select the Emission Filter used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
export var select_additional_left = {
  title: "Add additional element(s)",
  content: /*#__PURE__*/React.createElement("p", null, "If applicable, click this button to select one or more additional optical element or device that was used in this position to build the light path for this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
export var select_additional_right = {
  title: "Add additional element(s)",
  content: /*#__PURE__*/React.createElement("p", null, "If applicable, click this button to select one or more additional optical element or device that was used in this position to build the light path for this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};