"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_from_file_tooltip = exports.loadImage_mode_selector_tooltip = exports.loadImage_skip_tooltip = exports.loadImage_loadFromRepo_tooltip = exports.loadImage_load_tooltip = exports.createSettings_mode_selector_tooltip = exports.setting_loader_load_from_repo = exports.setting_loader_load_from_homeFolder = exports.setting_loader_load_from_file = exports.setting_loader_scratch = exports.create_mode_selector_settings_tooltip = exports.create_mode_selector_tooltip = exports.microscope_loader_load_from_repo = exports.microscope_loader_load_from_homeFolder = exports.microscope_loader_load_from_file = exports.microscope_loader_scratch_upright = exports.microscope_loader_scratch_inverted = exports.manage_settings_tooltip = exports.manage_instrument_tooltip = exports.tier_selector_tooltip = exports.help_tooltip = exports.settings_settings_step_tooltip = exports.settings_image_step_tooltip = exports.settings_hardware_step_tooltip = exports.hardware_hardware_step_tooltip = exports.string_bandpass_warning = exports.menu_order = exports.channelPath_Additional_8 = exports.channelPath_Additional_7 = exports.channelPath_Additional_3_4_5_6 = exports.channelPath_Additional_2 = exports.channelPath_Additional_1 = exports.channelPath_Emission = exports.channelPath_Dichroic = exports.channelPath_Excitation = exports.channelPath_LightSource = exports.channelPath_Detector = exports.channelPath_RelayLens = exports.channelPath_CouplingLens = exports.channelPath_LightSourceCoupling = exports.channelPath_Objective = exports.matchSettings = exports.current_stands = exports.number_max_name_length = exports.number_canvas_element_offset_default = exports.number_canvas_element_icons_height = exports.number_canvas_element_min_height = exports.number_canvas_element_min_width = exports.number_small_logo_height = exports.number_small_logo_width = exports.number_logo_height = exports.number_logo_width = exports.string_dropbox_settings_replace = exports.string_dropbox_settings_new = exports.string_dropbox_image_replace = exports.string_dropbox_image_new = exports.string_dropbox_hardware_replace = exports.string_dropbox_hardware_new = exports.string_typeDimensionsGeneral = exports.string_validationTier = exports.string_noImageLoad = exports.string_loadFromHomeFolder = exports.string_loadFromRepository = exports.string_createFromFile = exports.string_createFromScratch = exports.string_settings_tier_3_img = exports.string_settings_tier_2_img = exports.string_settings_tier_1_img = exports.string_hardware_tier_3_img = exports.string_hardware_tier_2_img = exports.string_hardware_tier_1_img = exports.string_help_img = exports.string_manage_settings_circle_img = exports.string_manage_hardware_circle_img = exports.string_microscope_img = exports.string_import_img = exports.string_export_img = exports.string_save_img = exports.string_next_img = exports.string_back_img = exports.string_home_circle_img = exports.string_home_img = exports.string_add_img = exports.string_logo_img_micro_bk = exports.string_logo_img_cell_bk = exports.string_logo_img_no_bk = exports.string_json_ext = exports.string_maxNumberOf_identifier = exports.string_minNumberOf_identifier = exports.string_currentNumberOf_identifier = exports.string_linkedFields = exports.string_toolbar = exports.string_canvas = exports.string_array = exports.string_object = exports.string_enumNames = exports.string_enum = exports.string_default = exports.string_not_assigned = exports.string_na = void 0;
exports.select_additional_right = exports.select_additional_left = exports.select_emission = exports.select_dichroic = exports.select_excitation = exports.select_detector = exports.select_relayLens = exports.select_lightSourceCoupling = exports.select_couplingLens = exports.select_lightSource = exports.edit_channel_settings = exports.edit_channel = exports.edit_plane = exports.remove_channel = exports.add_channel = exports.remove_plane = exports.add_plane = exports.add_multi_planes = exports.edit_mic_table_settings = exports.edit_sample_pos_settings = exports.edit_obj_settings = exports.edit_mic_settings = exports.edit_img_env_settings = exports.edit_channels = exports.edit_planes = exports.hardware_explorer_tooltip = exports.export_setting_tooltip = exports.save_setting_tooltip = exports.export_microscope_tooltip = exports.save_microscope_tooltip = exports.export_component_tooltip = exports.save_component_tooltip = exports.validation_setting_tooltip = exports.validation_microscope_tooltip = exports.edit_setting_tooltip = exports.edit_microscope_tooltip = exports.home_tooltip = exports.back_tooltip = exports.next_tooltip = exports.import_tooltip = exports.loadImage_mode_continue_tooltip = exports.createSettings_mode_continue_tooltip = exports.create_mode_continue_settings_tooltip = exports.create_mode_continue_tooltip = exports.loadImage_from_repo_image_tooltip = exports.loadImage_from_names_tooltip = exports.createSettings_from_repo_names_tooltip = exports.create_from_repo_names_tooltip = exports.create_from_repo_manufacturer_tooltip = exports.loadImage_from_file_tooltip = exports.createSettings_from_file_tooltip = void 0;

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
var string_logo_img_no_bk = "MicroMetaApp_noBkg_noOutline_3.png"; //"MicroMetaApp_noBkg_noOutline.png";

exports.string_logo_img_no_bk = string_logo_img_no_bk;
var string_logo_img_cell_bk = "MicroMetaApp_cellBkg.png";
exports.string_logo_img_cell_bk = string_logo_img_cell_bk;
var string_logo_img_micro_bk = "MicroMetaApp_TESMBkg_4.png"; //"MicroMetaApp_TESMBkg_2.png";

exports.string_logo_img_micro_bk = string_logo_img_micro_bk;
var string_add_img = "add-button.svg";
exports.string_add_img = string_add_img;
var string_home_img = "home.svg";
exports.string_home_img = string_home_img;
var string_home_circle_img = "home-circle.svg";
exports.string_home_circle_img = string_home_circle_img;
var string_back_img = "arrow-back.svg";
exports.string_back_img = string_back_img;
var string_next_img = "arrow-forward.svg";
exports.string_next_img = string_next_img;
var string_save_img = "save-solid.svg";
exports.string_save_img = string_save_img;
var string_export_img = "file-export-solid.svg";
exports.string_export_img = string_export_img;
var string_import_img = "file-import-solid.svg";
exports.string_import_img = string_import_img;
var string_microscope_img = "microscope-solid.svg";
exports.string_microscope_img = string_microscope_img;
var string_manage_hardware_circle_img = "hardware-large-circle.svg";
exports.string_manage_hardware_circle_img = string_manage_hardware_circle_img;
var string_manage_settings_circle_img = "settings-large-circle.svg";
exports.string_manage_settings_circle_img = string_manage_settings_circle_img;
var string_help_img = "question-mark-small.svg";
exports.string_help_img = string_help_img;
var string_hardware_tier_1_img = "hardware-tier-1.svg";
exports.string_hardware_tier_1_img = string_hardware_tier_1_img;
var string_hardware_tier_2_img = "hardware-tier-2.svg";
exports.string_hardware_tier_2_img = string_hardware_tier_2_img;
var string_hardware_tier_3_img = "hardware-tier-3.svg";
exports.string_hardware_tier_3_img = string_hardware_tier_3_img;
var string_settings_tier_1_img = "settings-tier-1.svg";
exports.string_settings_tier_1_img = string_settings_tier_1_img;
var string_settings_tier_2_img = "settings-tier-2.svg";
exports.string_settings_tier_2_img = string_settings_tier_2_img;
var string_settings_tier_3_img = "settings-tier-3.svg";
exports.string_settings_tier_3_img = string_settings_tier_3_img;
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
var string_dropbox_hardware_new = "Click and select, or drag a file here to load an existing Microscope file you want to work with.";
exports.string_dropbox_hardware_new = string_dropbox_hardware_new;
var string_dropbox_hardware_replace = "Click and select, or drag a file here to replace the currently selected Microscope file.";
exports.string_dropbox_hardware_replace = string_dropbox_hardware_replace;
var string_dropbox_image_new = "Click and select, or drag a file here to load an existing Image data file you want to work with.";
exports.string_dropbox_image_new = string_dropbox_image_new;
var string_dropbox_image_replace = "Click and select, or drag a file here to replace the currently selected Image data file.";
exports.string_dropbox_image_replace = string_dropbox_image_replace;
var string_dropbox_settings_new = "Click and select, or drag a file here to load an existing Settings file you want to work with.";
exports.string_dropbox_settings_new = string_dropbox_settings_new;
var string_dropbox_settings_replace = "Click and select, or drag a file here to replace the currently selected Settings file.";
exports.string_dropbox_settings_replace = string_dropbox_settings_replace;
var number_logo_width = 800;
exports.number_logo_width = number_logo_width;
var number_logo_height = 280;
exports.number_logo_height = number_logo_height;
var number_small_logo_width = 430;
exports.number_small_logo_width = number_small_logo_width;
var number_small_logo_height = 60; // export const number_canvas_width = 3201;
// export const number_canvas_height = 989;

exports.number_small_logo_height = number_small_logo_height;
var number_canvas_element_min_width = 25;
exports.number_canvas_element_min_width = number_canvas_element_min_width;
var number_canvas_element_min_height = 25;
exports.number_canvas_element_min_height = number_canvas_element_min_height;
var number_canvas_element_icons_height = 12.5;
exports.number_canvas_element_icons_height = number_canvas_element_icons_height;
var number_canvas_element_offset_default = 6.67;
exports.number_canvas_element_offset_default = number_canvas_element_offset_default;
var number_max_name_length = 55;
exports.number_max_name_length = number_max_name_length;
var current_stands = [{
  name: "Inverted",
  json: "InvertedMicroscopeStand"
}, {
  name: "Upright",
  json: "UprightMicroscopeStand"
}];
exports.current_stands = current_stands;
var matchSettings = {};
exports.matchSettings = matchSettings;
var channelPath_Objective = ["Objective"];
exports.channelPath_Objective = channelPath_Objective;
var channelPath_LightSourceCoupling = ["LightSourceCoupling"];
exports.channelPath_LightSourceCoupling = channelPath_LightSourceCoupling;
var channelPath_CouplingLens = ["CouplingLens"];
exports.channelPath_CouplingLens = channelPath_CouplingLens;
var channelPath_RelayLens = ["RelayLens"];
exports.channelPath_RelayLens = channelPath_RelayLens;
var channelPath_Detector = ["Detector"];
exports.channelPath_Detector = channelPath_Detector;
var channelPath_LightSource = ["Fluorescence_LightSource", "Transmitted_LightSource"];
exports.channelPath_LightSource = channelPath_LightSource;
var channelPath_Excitation = ["ExcitationFilter", "AcoustoOpticalLTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"DiffractionGrating" //Advanced/
];
exports.channelPath_Excitation = channelPath_Excitation;
var channelPath_Dichroic = ["StandardDichroic", "AcoustoOpticalLBeamSplitter", //Advanced/
"AcoustoOpticalLTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"DiffractionGrating" //Advanced/
];
exports.channelPath_Dichroic = channelPath_Dichroic;
var channelPath_Emission = ["EmissionFilter", "AcoustoOpticalLTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"DiffractionGrating" //Advanced/
];
exports.channelPath_Emission = channelPath_Emission;
var channelPath_Additional_1 = ["Shutter", "IrisDiaphragm", "ExcitationFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "BeamExpander", "BeamExpanderLens", "BeamCollimator", "BeamCollimatorLens", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate" //Advanced/
];
exports.channelPath_Additional_1 = channelPath_Additional_1;
var channelPath_Additional_2 = ["ExcitationFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "CondenserLens", "TubeLens", "BeamExpanderLens", "BeamCollimatorLens", "DarkfieldStop", "HoffmanSlitPlate", "IrisDiaphragm", "PhaseRing", "VarelRing", "Shutter", "BeamExpander", "BeamCollimator", "Condenser", "MicroscopeTube", "PolarizationOptics", "Prism", "SpinningDisk", //Advanced/
"RasterScanner", //Advanced/
"DiffractionGrating", //Advanced/
"MaskingPlate", //Advanced/
"Pinhole" //Advanced
];
exports.channelPath_Additional_2 = channelPath_Additional_2;
var channelPath_Additional_3_4_5_6 = ["Shutter", "DarkfieldStop", "IrisDiaphragm", "ExcitationFilter", "EmissionFilter", "NeutralDensityFilter", "AdditionalFilter", "StandardDichroic", "GenericDichroic", "GenericDichroic", "BeamSplitter", "GenericLens", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate", //Advanced/
"Pinhole", //Advanced
"AcoustoOpticallTuneableFilter", //Advanced/
"LiquidCrystalTuneableFilter", //Advanced/
"AcoustoOpticalLBeamSplitter" //Advanced/
];
exports.channelPath_Additional_3_4_5_6 = channelPath_Additional_3_4_5_6;
var channelPath_Additional_7 = ["Shutter", "IrisDiaphragm", "EmissionFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "CondenserLens", "MagnificationChanger", "MicroscopeTube", "BeamExpanderLens", "BeamCollimatorLens", "BeamExpander", "BeamCollimator", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate", //Advanced/
"Pinhole" //Advanced
];
exports.channelPath_Additional_7 = channelPath_Additional_7;
var channelPath_Additional_8 = ["Shutter", "IrisDiaphragm", "EmissionFilter", "NeutralDensityFilter", "AdditionalFilter", "GenericDichroic", "BeamSplitter", "ReflectingMirror", "GenericLens", "BeamExpander", "BeamExpanderLens", "BeamCollimator", "BeamCollimatorLens", "PolarizationOptics", "Prism", "DiffractionGrating", //Advanced/
"MaskingPlate" //Advanced/
];
exports.channelPath_Additional_8 = channelPath_Additional_8;
var menu_order = ["MicroscopyAccessories", "Software", "Transmitted_LightSource", "Fluorescence_LightSource", "Magnification", "LightSourceCoupling", "FluorescenceLightPath", "Stage", "Focusing", "OpticalAssembly", "OpticsHolder", "Aperture", "Filter", "MirroringDevice", "Lens", "AdditionalOptics", "Detector", "Detector.Camera", "Detector.PointDetector", "CalibrationTools"];
exports.menu_order = menu_order;
var string_bandpass_warning = "PLEASE NOTE: If the number of WavelengthRange modules or sub-components (e.g., LEDModule) is changed, all values entered but not yet confirmed will be lost.";
exports.string_bandpass_warning = string_bandpass_warning;
var hardware_hardware_step_tooltip = {
  title: "Microscope file selection options",
  content: /*#__PURE__*/_react.default.createElement("p", null, "In this Step, you can select the source of your Microscope file. Options include: creating a brand new file from scratch, importing a file from outside the App, or loading a file that is already present in your local home folder."),
  position: "bottom"
};
exports.hardware_hardware_step_tooltip = hardware_hardware_step_tooltip;
var settings_hardware_step_tooltip = {
  title: "Microscope file selection options",
  content: /*#__PURE__*/_react.default.createElement("p", null, "In this Step, you can select the source of your Microscope file. Options include: importing a file from outside the App, or loading a file that is already present in your local home folder."),
  position: "bottom"
};
exports.settings_hardware_step_tooltip = settings_hardware_step_tooltip;
var settings_image_step_tooltip = {
  title: "Image file selection options",
  content: /*#__PURE__*/_react.default.createElement("p", null, "In this Step, you can choose whether you want to load an existing image data file to document. You can also proceed without loading any images and skip this step."),
  position: "bottom"
};
exports.settings_image_step_tooltip = settings_image_step_tooltip;
var settings_settings_step_tooltip = {
  title: "Settings file selection options",
  content: /*#__PURE__*/_react.default.createElement("p", null, "In this Step, you can select the source of your Settings file. Options include: creating a brand new file from scratch, importing a file from outside the App, or loading a file that is already present in your local home folder."),
  position: "bottom"
};
exports.settings_settings_step_tooltip = settings_settings_step_tooltip;
var help_tooltip = {
  title: "Help",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to access the Micro-Meta App documentations page and video tutorials."),
  position: "bottom"
};
exports.help_tooltip = help_tooltip;
var tier_selector_tooltip = {
  title: "Tier Selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the Tier level you want to utilize to document Instrument Hardware Specifications and Image Acquisition Settings. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/_react.default.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "bottom"
};
exports.tier_selector_tooltip = tier_selector_tooltip;
var manage_instrument_tooltip = {
  title: "Manage Instrument Hardware",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to create, load from a template or edit a Microscope file containing a description of the hardware components of microscopes you want to document."),
  position: "left"
};
exports.manage_instrument_tooltip = manage_instrument_tooltip;
var manage_settings_tooltip = {
  title: "Manage Acquisition Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to load from file or edit a Settings file containing a description of the acquisition settings that were used for image datasets you want to document."),
  position: "right"
};
exports.manage_settings_tooltip = manage_settings_tooltip;
var microscope_loader_scratch_inverted = {
  title: "Create Inverted Microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to create a brand new Inverted Microscope file from scratch."),
  position: "bottom"
};
exports.microscope_loader_scratch_inverted = microscope_loader_scratch_inverted;
var microscope_loader_scratch_upright = {
  title: "Create Upright Microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to create a brand new Upright Microscope file from scratch."),
  position: "bottom"
};
exports.microscope_loader_scratch_upright = microscope_loader_scratch_upright;
var microscope_loader_load_from_file = {
  title: "Import from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "\"Click here to import into Micro-Meta App a previously available Microscope file to edit (e.g., an example file, a template file, or an existing Microscope file shared with you by a colleague)."),
  position: "bottom"
};
exports.microscope_loader_load_from_file = microscope_loader_load_from_file;
var microscope_loader_load_from_homeFolder = {
  title: "Load from local home folder",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to load an existing Microscope file from the active Micro-Meta App home folder."),
  position: "bottom"
};
exports.microscope_loader_load_from_homeFolder = microscope_loader_load_from_homeFolder;
var microscope_loader_load_from_repo = {
  title: "Load from repository",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to load an existing Microscope file from the active repository."),
  position: "bottom"
};
exports.microscope_loader_load_from_repo = microscope_loader_load_from_repo;
var create_mode_selector_tooltip = {
  title: "Create mode selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the modality you want to use for Instrument hardware management. 'Create from scratch' allows you to create a brand new Microscope file from scratch. 'Import from file' allows you to import into Micro-Meta App a previously available Microscope file (i.e., an example file, a template file, or an existing Microscope file shared by a colleague) to edit. 'Load from repository' or 'Load from the local home folder' allows you to load a previously available file, respectively, from the active Micro-Meta App repository or the local home folder."),
  position: "bottom"
};
exports.create_mode_selector_tooltip = create_mode_selector_tooltip;
var create_mode_selector_settings_tooltip = {
  title: "Open Microscope file selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the source of the Microscope file you want to use and that describes the Instrument that was used for the acquisition of the image(s) you want to annotate."),
  position: "bottom"
};
exports.create_mode_selector_settings_tooltip = create_mode_selector_settings_tooltip;
var setting_loader_scratch = {
  title: "Create Setting",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to create a brand new Settings file from scratch."),
  position: "bottom"
};
exports.setting_loader_scratch = setting_loader_scratch;
var setting_loader_load_from_file = {
  title: "Import from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to import into Micro-Meta App a previously available Settings file to edit (e.g., an example file, a template file, or an existing Settings file shared with you by a colleague)."),
  position: "bottom"
};
exports.setting_loader_load_from_file = setting_loader_load_from_file;
var setting_loader_load_from_homeFolder = {
  title: "Load from local home folder",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to load an existing Settings file from the active Micro-Meta App home folder."),
  position: "bottom"
};
exports.setting_loader_load_from_homeFolder = setting_loader_load_from_homeFolder;
var setting_loader_load_from_repo = {
  title: "Load from repository",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to load an existing Settings file from the active repository."),
  position: "bottom"
};
exports.setting_loader_load_from_repo = setting_loader_load_from_repo;
var createSettings_mode_selector_tooltip = {
  title: "Load Settings file selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the modality you want to use for Settings management. 'Create from scratch' allows you to create a brand new Settings file from scratch. 'Import from file' allows you to import into Micro-Meta App a previously available Settings file (i.e., an example file, a template file, or an existing Settings file shared by a colleague) to edit. 'Load from repository' or 'Load from the local home folder' allows you to load a previously available file, respectively, from the active Micro-Meta App repository or the local home folder."),
  position: "bottom"
};
exports.createSettings_mode_selector_tooltip = createSettings_mode_selector_tooltip;
var loadImage_load_tooltip = {
  title: "Load image ",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to import into Micro-Meta App the Image data file you wish to work with."),
  position: "bottom"
};
exports.loadImage_load_tooltip = loadImage_load_tooltip;
var loadImage_loadFromRepo_tooltip = {
  title: "Load image ",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to select the Image data file you wish to work with from the repository."),
  position: "bottom"
};
exports.loadImage_loadFromRepo_tooltip = loadImage_loadFromRepo_tooltip;
var loadImage_skip_tooltip = {
  title: "Skip load image ",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click here to continue without an Image data file."),
  position: "bottom"
};
exports.loadImage_skip_tooltip = loadImage_skip_tooltip;
var loadImage_mode_selector_tooltip = {
  title: "Open Image file selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the source of the Image file you wish to work with or select 'Skip load image' to continue without an Image."),
  position: "bottom"
};
exports.loadImage_mode_selector_tooltip = loadImage_mode_selector_tooltip;
var create_from_file_tooltip = {
  title: "Create from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Microscope file you want to work on."),
  position: "bottom"
};
exports.create_from_file_tooltip = create_from_file_tooltip;
var createSettings_from_file_tooltip = {
  title: "Import from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Settings file you want to work on."),
  position: "bottom"
};
exports.createSettings_from_file_tooltip = createSettings_from_file_tooltip;
var loadImage_from_file_tooltip = {
  title: "Import from file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select an existing Image file you want to work on."),
  position: "bottom"
};
exports.loadImage_from_file_tooltip = loadImage_from_file_tooltip;
var create_from_repo_manufacturer_tooltip = {
  title: "Select Manufacturer",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Manufacturer for the Microscope you want to document."),
  position: "bottom"
};
exports.create_from_repo_manufacturer_tooltip = create_from_repo_manufacturer_tooltip;
var create_from_repo_names_tooltip = {
  title: "Select Microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Microscope you want to document."),
  position: "bottom"
};
exports.create_from_repo_names_tooltip = create_from_repo_names_tooltip;
var createSettings_from_repo_names_tooltip = {
  title: "Select Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Settings file you want to load."),
  position: "bottom"
};
exports.createSettings_from_repo_names_tooltip = createSettings_from_repo_names_tooltip;
var loadImage_from_names_tooltip = {
  title: "Load from multi file",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Image entry you want to load."),
  position: "bottom"
};
exports.loadImage_from_names_tooltip = loadImage_from_names_tooltip;
var loadImage_from_repo_image_tooltip = {
  title: "Select Image",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Select the Image you want to load."),
  position: "bottom"
};
exports.loadImage_from_repo_image_tooltip = loadImage_from_repo_image_tooltip;
var create_mode_continue_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Create a microscope using the mode selected above."),
  position: "right"
};
exports.create_mode_continue_tooltip = create_mode_continue_tooltip;
var create_mode_continue_settings_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the image(s) you want to annotate and, if available, an existing Settings file."),
  position: "right"
};
exports.create_mode_continue_settings_tooltip = create_mode_continue_settings_tooltip;
var createSettings_mode_continue_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to create a new Settings file or edit an existing one using the modality chosen above."),
  position: "right"
};
exports.createSettings_mode_continue_tooltip = createSettings_mode_continue_tooltip;
var loadImage_mode_continue_tooltip = {
  title: "Continue",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to create a new Settings file or load metadata from an Image using the modality chosen above."),
  position: "right"
};
exports.loadImage_mode_continue_tooltip = loadImage_mode_continue_tooltip;
var import_tooltip = {
  title: "Import microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Import a new microscope file to overwrite the one currently open."),
  position: "top"
};
exports.import_tooltip = import_tooltip;
var next_tooltip = {
  title: "Next",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Move to the next window."),
  position: "right"
};
exports.next_tooltip = next_tooltip;
var back_tooltip = {
  title: "Back",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Return to the previous window."),
  position: "left"
};
exports.back_tooltip = back_tooltip;
var home_tooltip = {
  title: "Home",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Return to the initial window."),
  position: "top"
};
exports.home_tooltip = home_tooltip;
var edit_microscope_tooltip = {
  title: "Edit microscope",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter general information about this Instrument."),
  position: "bottom"
};
exports.edit_microscope_tooltip = edit_microscope_tooltip;
var edit_setting_tooltip = {
  title: "Edit Image Acquisition Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter general information about the acquisition settings utilized for this image."),
  position: "bottom"
};
exports.edit_setting_tooltip = edit_setting_tooltip;
var validation_microscope_tooltip = {
  title: "Validation Tier selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the Tier level you want to use to validate this Microscope file. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/_react.default.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "bottom"
};
exports.validation_microscope_tooltip = validation_microscope_tooltip;
var validation_setting_tooltip = {
  title: "Validation Tier selector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Choose the Tier level you want to use to validate this Settings file. For more details about Tier definition please refer to the following", " ", /*#__PURE__*/_react.default.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
  }, "link"), "."),
  position: "bottom"
};
exports.validation_setting_tooltip = validation_setting_tooltip;
var save_component_tooltip = {
  title: "Save component",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Save the JSON file for this Component to the active Micro-Meta App pository or to the local home folder. You have one of two options: 1) 've' allows to save the Component JSON file in its current status. 2) 've as new' allows to save the Component JSON file with a new Unique ID."),
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
  content: /*#__PURE__*/_react.default.createElement("p", null, "Use this menu to select hardware components to include in this Microscope file. Please follow these steps: 1 - Open an individual menu. 2 - Drag-and-drop the desired element into the main canvas. 3 - Click on the desired element to enter the information you want to document. 4 - Click on Confirm to save the information you have entered."),
  position: "left"
};
exports.hardware_explorer_tooltip = hardware_explorer_tooltip;
var edit_planes = {
  title: "Edit Planes",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter or edit general information about the Image Planes."),
  position: "bottom"
};
exports.edit_planes = edit_planes;
var edit_channels = {
  title: "Edit Channels",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter or edit general information about the image Channels and about the light path associated with each of them."),
  position: "bottom"
};
exports.edit_channels = edit_channels;
var edit_img_env_settings = {
  title: "Edit Imaging Environment",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Imaging Environmental Control Device that was used, and enter or edit information about the environment in which the biological sample was maintained during the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
exports.edit_img_env_settings = edit_img_env_settings;
var edit_mic_settings = {
  title: "Edit Microscope Stand Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter or edit information about the Settings that were applied to the Microscope Stand during the acquisition of this Image."),
  position: "bottom"
};
exports.edit_mic_settings = edit_mic_settings;
var edit_obj_settings = {
  title: "Edit Objective Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Objective and edit the settings that were used for the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
exports.edit_obj_settings = edit_obj_settings;
var edit_sample_pos_settings = {
  title: "Edit Sample Positioning Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select one or more Sample Positioning devices, and enter or edit the settings that were applied to them during the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
exports.edit_sample_pos_settings = edit_sample_pos_settings;
var edit_mic_table_settings = {
  title: "Edit Microscope Table Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Microscope Table, and enter or edit the settings that were applied to the Microscope Table for the acquisition of this Image. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "bottom"
};
exports.edit_mic_table_settings = edit_mic_table_settings;
var add_multi_planes = {
  title: "Add multiple Planes",
  content: /*#__PURE__*/_react.default.createElement("p", null, "In case information about the Image Planes have not been imported automatically with BioFormats, click this button to easily add multiple related Planes to this Image."),
  position: "bottom"
};
exports.add_multi_planes = add_multi_planes;
var add_plane = {
  title: "Add Plane",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to add a single Image Plane"),
  position: "bottom"
};
exports.add_plane = add_plane;
var remove_plane = {
  title: "Remove Plane",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to remove the selected Image Plane"),
  position: "bottom"
};
exports.remove_plane = remove_plane;
var add_channel = {
  title: "Add Channel",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to add a single Image Channel"),
  position: "bottom"
};
exports.add_channel = add_channel;
var remove_channel = {
  title: "Remove Channel",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to remove the selected Image Channel"),
  position: "bottom"
};
exports.remove_channel = remove_channel;
var edit_plane = {
  title: "Edit Plane",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to edit or enter general information about the selected Image Planes."),
  position: "bottom"
};
exports.edit_plane = edit_plane;
var edit_channel = {
  title: "Edit Channel",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter or edit general information about the image Channels and about the light path associated with each of them."),
  position: "bottom"
};
exports.edit_channel = edit_channel;
var edit_channel_settings = {
  title: "Edit Channel Settings",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to enter or edit general information about this image Channel."),
  position: "top"
};
exports.edit_channel_settings = edit_channel_settings;
var select_lightSource = {
  title: "Select Light Source",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Light Source that was used for the acquisition of this Channel. After confirming the selection, click on the selected Light Source one more time to enter or edit the settings that were applied to it during acquisition. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
exports.select_lightSource = select_lightSource;
var select_couplingLens = {
  title: "Select Coupling Lens",
  content: /*#__PURE__*/_react.default.createElement("p", null, "If applicable, click this button to select the Coupling Lens that was used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
exports.select_couplingLens = select_couplingLens;
var select_lightSourceCoupling = {
  title: "Select Light Source Coupling",
  content: /*#__PURE__*/_react.default.createElement("p", null, "If applicable, click this button to select the Light Source Coupling device that was used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
exports.select_lightSourceCoupling = select_lightSourceCoupling;
var select_relayLens = {
  title: "Select Relay Lens",
  content: /*#__PURE__*/_react.default.createElement("p", null, "If applicable, click this button to select the Relay Lens that was used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
exports.select_relayLens = select_relayLens;
var select_detector = {
  title: "Select Detector",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Detector that was used for the acquisition of this Channel. After confirming the selection, click on the selected Detector one more time to enter or edit the settings that were applied to it during acquisition. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
exports.select_detector = select_detector;
var select_excitation = {
  title: "Select Excitation Wavelength",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Excitation Filter used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
exports.select_excitation = select_excitation;
var select_dichroic = {
  title: "Select Dichroic",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Dichroic (or Beamsplitter) that was used for the acquisition of this Channel. After confirming the selection, click on the selected Dichroic or (Beamsplitter) one more time to enter or edit the settings that were applied to it during acquisition. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "top"
};
exports.select_dichroic = select_dichroic;
var select_emission = {
  title: "Select Emission Wavelength",
  content: /*#__PURE__*/_react.default.createElement("p", null, "Click this button to select the Emission Filter used for the acquisition of this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
exports.select_emission = select_emission;
var select_additional_left = {
  title: "Add additional element(s)",
  content: /*#__PURE__*/_react.default.createElement("p", null, "If applicable, click this button to select one or more additional optical element or device that was used in this position to build the light path for this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "left"
};
exports.select_additional_left = select_additional_left;
var select_additional_right = {
  title: "Add additional element(s)",
  content: /*#__PURE__*/_react.default.createElement("p", null, "If applicable, click this button to select one or more additional optical element or device that was used in this position to build the light path for this Channel. NOTE: Any hardware components that are not validated at the current validation Tier, will not be available to add from the available items list. Please either change validation Tier or go back to Manage Instrument to make sure any Hardware Component you wish to manage here is validated at the desired Tier level."),
  position: "right"
};
exports.select_additional_right = select_additional_right;