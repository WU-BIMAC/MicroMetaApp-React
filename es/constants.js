import React from "react";
export var string_na = "na";
export var string_not_assigned = "Not assigned";
export var string_default = "default";
export var string_enum = "enum";
export var string_enumNames = "enumNames";
export var string_object = "object";
export var string_array = "array";
export var string_canvas = "canvas";
export var string_toolbar = "toolbar";
export var string_linkedFields = "LinkedFields";
export var string_currentNumberOf_identifier = "Current_Number_Of_";
export var string_minNumberOf_identifier = "Min_Number_Of_";
export var string_maxNumberOf_identifier = "Max_Number_Of_";
export var string_json_ext = ".json";
export var string_logo_img_no_bk = "MicroMetaApp_noBkg_noOutline.png";
export var string_logo_img_cell_bk = "MicroMetaApp_cellBkg.png";
export var string_logo_img_micro_bk = "MicroMetaApp_TESMBkg_2.png";
export var string_back_img = "arrow-circle-left-solid.svg";
export var string_save_img = "save-solid.svg";
export var string_export_img = "file-export-solid.svg";
export var string_import_img = "file-import-solid.svg";
export var string_microscope_img = "microscope-solid.svg";
export var string_createFromScratch = "Create # from scratch";
export var string_createFromFile = "Import from file";
export var string_loadFromRepository = "Load from repository";
export var string_loadFromHomeFolder = "Load from the local home folder";
export var string_noImageLoad = "Skip load Image";
export var string_validationTier = "Validate @ tier: ";
export var string_typeDimensionsGeneral = "General";
export var number_logo_width = 800;
export var number_logo_height = 280; // export const number_canvas_width = 3201;
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
  content: /*#__PURE__*/React.createElement("p", null, "Choose the modality you want to use for Instrument hardware management. 'Create from scratch' allows you to create a brand new Microscope file from scratch. 'Import from file' allows you to import into Micro-Meta App a previously available Microscope file (i.e., an example file, a template file, or an existing Microscope file shared by a colleague) to edit. 'Load from repository' or 'Load from the local home folder' allows you to load a previously available file, respectively, from the active Micro-Meta App repository or the local home folder."),
  position: "top"
};
export var create_mode_selector_settings_tooltip = {
  title: "Open Microscope file selector",
  content: /*#__PURE__*/React.createElement("p", null, "Choose the source of the Microscope file you want to use and that describes the Instrument that was used for the acquisition of the image(s) you want to annotate."),
  position: "top"
};
export var createSettings_mode_selector_tooltip = {
  title: "Load Settings file selector",
  content: /*#__PURE__*/React.createElement("p", null, "Choose the modality you want to use for Settings management. 'Create from scratch' allows you to create a brand new Settings file from scratch. 'Import from file' allows you to import into Micro-Meta App a previously available Settings file (i.e., an example file, a template file, or an existing Settings file shared by a colleague) to edit. 'Load from repository' or 'Load from the local home folder' allows you to load a previously available file, respectively, from the active Micro-Meta App repository or the local home folder."),
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
export var createSettings_from_file_tooltip = {
  title: "Import from file",
  content: /*#__PURE__*/React.createElement("p", null, "Select an existing Settings file you want to work on."),
  position: "top"
};
export var loadImage_from_file_tooltip = {
  title: "Import from file",
  content: /*#__PURE__*/React.createElement("p", null, "Select an existing Image file you want to work on."),
  position: "top"
};
export var create_from_repo_manufacturer_tooltip = {
  title: "Select Manufacturer",
  content: /*#__PURE__*/React.createElement("p", null, "Select the Manufacturer of the Microscope you want to load."),
  position: "top"
};
export var create_from_repo_names_tooltip = {
  title: "Select Microscope",
  content: /*#__PURE__*/React.createElement("p", null, "Select the Microscope you want to load."),
  position: "top"
};
export var createSettings_from_repo_names_tooltip = {
  title: "Select Settings",
  content: /*#__PURE__*/React.createElement("p", null, "Select the Settings file you want to load."),
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
  content: /*#__PURE__*/React.createElement("p", null, "Save the JSON file for this Component to the active Micro-Meta App repository or to the local home folder. You have one of two options: 1) 'Save' allows to save the Component JSON file in its current status. 2) 'Save as new' allows to save the Component JSON file with a new Unique ID."),
  position: "top"
};
export var export_component_tooltip = {
  title: "Export component",
  content: /*#__PURE__*/React.createElement("p", null, "Export the current Component JSON file from Micro-Meta App to the file system. You have one of two options: 1) 'Export' allows to export the Component JSON file in its current status. 2) 'Export as new' allows to export the Component JSON file with a new Unique ID."),
  position: "top"
};
export var save_microscope_tooltip = {
  title: "Save microscope",
  content: /*#__PURE__*/React.createElement("p", null, "Save the JSON file for this Microscope to the active Micro-Meta App repository or to the local home folder. You have one of two options: 1) 'Save' allows to save the Microscope JSON file in its current status. 2) 'Save as new' allows to save the Microscope JSON file with a new Unique ID."),
  position: "top"
};
export var export_microscope_tooltip = {
  title: "Export microscope",
  content: /*#__PURE__*/React.createElement("p", null, "Export the current Microscope JSON file from Micro-Meta App to the file system. You have one of two options: 1) 'Export' allows to export the Microscope JSON file in its current status. 2) 'Export as new' allows to export the Microscope JSON file with a new Unique ID."),
  position: "top"
};
export var save_setting_tooltip = {
  title: "Save settings",
  content: /*#__PURE__*/React.createElement("p", null, "Save the JSON file for this Settings to the active Micro-Meta App repository or to the local home folder. You have one of two options: 1) 'Save' allows to save the Settings JSON file in its current status. 2) 'Save as new' allows to save the Settings JSON file with a new Unique ID."),
  position: "top"
};
export var export_setting_tooltip = {
  title: "Export settings",
  content: /*#__PURE__*/React.createElement("p", null, "Export the current Settings JSON file from Micro-Meta App to the file system. You have one of two options: 1) 'Export' allows to export the Settings JSON file in its current status. 2) 'Export as new' allows to export the Settings JSON file with a new Unique ID."),
  position: "top"
};
export var hardware_explorer_tooltip = {
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