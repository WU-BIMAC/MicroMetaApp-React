import React from "react";

export const bool_isDebug = false;
export const bool_isSettings = false;
export const bool_isAdvanced = false;

export const string_na = "na";
export const string_not_assigned = "Not assigned";
export const string_default = "default";
export const string_enum = "enum";
export const string_enumNames = "enumNames";
export const string_object = "object";
export const string_array = "array";

export const string_canvas = "canvas";
export const string_toolbar = "toolbar";

export const string_linkedFields = "LinkedFields";

export const string_currentNumberOf_identifier = "Current_Number_Of_";
export const string_minNumberOf_identifier = "Min_Number_Of_";
export const string_maxNumberOf_identifier = "Max_Number_Of_";

export const string_json_ext = ".json";

export const string_logo_img_no_bk = "MicroMetaApp_noBkg_3.png";
export const string_logo_img_cell_bk = "MicroMetaApp_cellBkg.png";
export const string_logo_img_micro_bk = "MicroMetaApp_TESMBkg_2.png";

export const string_createFromScratch = "Create # from scratch";
export const string_createFromFile = "Load from file";
export const string_loadFromRepository = "Load from repository";

export const string_validationTier = "Validate @ tier: ";

export const string_typeDimensionsGeneral = "General";

export const number_logo_width = 800;
export const number_logo_height = 280;

// export const number_canvas_width = 3201;
// export const number_canvas_height = 989;

export const number_canvas_element_min_width = 25;
export const number_canvas_element_icons_height = 12.5;
export const number_canvas_element_offset_default = 6.67;

export const current_stands = [
	{
		name: "Inverted",
		json: "InvertedMicroscopeStand",
	},
	{
		name: "Upright",
		json: "UprightMicroscopeStand",
	},
];

export const channelPath_Excitation = [
	"ExcitationFilter",
	"AcoustoOpticalLTuneableFilter", //Advanced/
	"LiquidCrystalTuneableFilter", //Advanced/
];
export const channelPath_Dichroic = [
	"DiffractionGrating", //Advanced/
	"AcoustoOpticalLBeamSplitter", //Advanced/
	"AcoustoOpticalLTuneableFilter", //Advanced/
	"LiquidCrystalTuneableFilter", //Advanced/
];

export const channelPath_Emission = [
	"EmissionFilter",
	"AcoustoOpticalLTuneableFilter", //Advanced/
	"LiquidCrystalTuneableFilter", //Advanced/
	"DiffractionGrating", //Advanced/
];

export const channelPath_Additional_1_7_8 = [
	"FilterGroup",
	"LensGroup",
	"MirrorGroup",
	"Shutter",
	"DiffractionGrating", //Advanced/
	"MaskingPlate", //Advanced/
	"Pinhole", //Advanced/
	"BeamExpander",
	"Collimator",
	"PolarizationOptics",
	"Prism",
	"Mirror", //TO BE REMOVED
	"AdditionalOptics", //TO BE REMOVED
	"EmissionFilter", //TO BE REMOVED
	"ExcitationFilter", //TO BE REMOVED
	"StandardDichroic", //TO BE REMOVED
];
export const channelPath_Additional_2_3_4_5_6 = [
	"FilterGroup",
	"LensGroup",
	"MirrorGroup",
	"OpticalApertureGroup",
	"OpticalAssemblyGroup",
	"PolarizationOptics",
	"Prism",
	"Mirror", //TO BE REMOVED
	"AdditionalOptics", //TO BE REMOVED
	"EmissionFilter", //TO BE REMOVED
	"ExcitationFilter", //TO BE REMOVED
	"StandardDichroic", //TO BE REMOVED
];

export const menu_order = [
	"MicroscopyEssentials",
	"Software",
	"Transmitted_LightSource",
	"Fluorescence_LightSource",
	"Magnification",
	"LightSourceCoupling",
	"FluorescenceLightPath",
	"Stage",
	"Focusing",
	"OpticalAssembly",
	"OpticsHolder",
	"Aperture",
	"Filter",
	"MirroringDevice",
	"Lens",
	"AdditionalOptics",
	"Detector",
	"Detector.Camera",
	"Detector.PointDetector",
	"Calibration",
];

export const string_bandpass_warning =
	"If you modify the number of band-pass, the information not saved are going to be lost!";

export const tier_selector_tooltip = {
	title: "Tier Selector",
	content: (
		<p>
			Choose the Tier level you want to utilize to document Instrument Hardware
			Specifications and Image Acquisition Settings. For more details about Tier
			definition please refer to the following{" "}
			<a href="https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf">link</a>.
		</p>
	),
	position: "top",
};

export const manage_instrument_tooltip = {
	title: "Manage Instrument Hardware",
	content: (
		<p>
			Click this button to create, load from a template, or edit a Microscope
			file describing the hardware components of the Instrument you want to
			document
		</p>
	),
	position: "left",
};

export const manage_settings_tooltip = {
	title: "Manage Acquisition Settings",
	content: (
		<p>
			Click this button to select an existing Microscope file and enter, load
			from file, or edit the acquisition settings associated with the specific
			Image dataset you want to document
		</p>
	),
	position: "right",
};

export const create_mode_selector_tooltip = {
	title: "Create mode selector",
	content: (
		<p>
			Choose the modality you want to use for Instrument hardware management.
			'Create from scratch' allows you to create a brand new Microscope file
			from scratch.'Load from file' allows you to import into Micro- Meta App a
			previously available Microscope file (i.e., an example file, a template
			file, or an existing Microscope file shared by a colleague) to edit.'Load
			from repository' allows you to load a previously available file from the
			active Micro-Meta App repository.
		</p>
	),
	position: "top",
};

export const create_from_file_tooltip = {
	title: "Create from file",
	content: <p>Select an existing Microscope file you want to work on.</p>,
	position: "top",
};

export const create_from_repo_manufacturer_tooltip = {
	title: "Create from repository",
	content: <p>Select the Manufacturer of the Microscope you want to load.</p>,
	position: "top",
};

export const create_from_repo_names_tooltip = {
	title: "Create from repository",
	content: <p>Select the Microscope you want to load.</p>,
	position: "top",
};

export const create_mode_continue_tooltip = {
	title: "Continue",
	content: <p>Create a microscope using the mode selected above.</p>,
	position: "left",
};

export const back_tooltip = {
	title: "Back",
	content: <p>Return to the initial window.</p>,
	position: "right",
};

export const edit_microscope_tooltip = {
	title: "Edit microscope",
	content: (
		<p>Click this button to enter general information about this Instrument.</p>
	),
	position: "top",
};

export const validation_tooltip = {
	title: "Validation Tier selector",
	content: (
		<p>
			Choose the Tier level you want to use to validate this Microscope file.
			For more details about Tier definition please refer to the following{" "}
			<a href="https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf">link</a>.
		</p>
	),
	position: "top",
};

export const save_microscope_tooltip = {
	title: "Save microscope",
	content: (
		<p>
			Choose whether you want to save this Microscope file to the active
			Micro-Meta App repository or if you want to export it to your local file
			system.
		</p>
	),
	position: "top",
};

export const hardware_explorer_tooltip = {
	title: "Hardware component selection",
	content: (
		<p>
			Use this menu to select hardware components to include in this Microscope
			file. Please follow these steps: 1 - Open an individual menu. 2 -
			Drag-and-drop the desired element into the main canvas. 3 - Click on the
			desired element to enter the information you want to document. 4 - Click
			on Confirm to save the information you have entered.
		</p>
	),
	position: "bottom",
};
