import React from "react";

export const bool_isDebug = true;
export const bool_isSettings = true;
export const bool_hasAdvanced = false;
export const bool_hasExperimental = false;

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
export const string_noImageLoad = "Skip load Image";

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

export const matchSettings = {};

export const channelPath_Objective = ["Objective"];

export const channelPath_LightSourceCoupling = ["LightSourceCoupling"];

export const channelPath_CouplingLens = ["CouplingLens"];

export const channelPath_RelayLens = ["RelayLens"];

export const channelPath_Detector = ["Detector"];

export const channelPath_LightSource = [
	"Fluorescence_LightSource",
	"Transmitted_LightSource",
];

export const channelPath_Excitation = [
	"ExcitationFilter",
	"AcoustoOpticalLTuneableFilter", //Advanced/
	"LiquidCrystalTuneableFilter", //Advanced/
	"DiffractionGrating", //Advanced/
];
export const channelPath_Dichroic = [
	"StandardDichroic",
	"AcoustoOpticalLBeamSplitter", //Advanced/
	"AcoustoOpticalLTuneableFilter", //Advanced/
	"LiquidCrystalTuneableFilter", //Advanced/
	"DiffractionGrating", //Advanced/
];

export const channelPath_Emission = [
	"EmissionFilter",
	"AcoustoOpticalLTuneableFilter", //Advanced/
	"LiquidCrystalTuneableFilter", //Advanced/
	"DiffractionGrating", //Advanced/
];

export const channelPath_Additional_1 = [
	"Shutter",
	"IrisDiaphragm",

	"ExcitationFilter",
	"NeutralDensityFilter",
	"AdditionalFilter",
	"GenericDichroic",
	"BeamSplitter",
	"ReflectingMirror",
	"GenericLens",
	"BeamExpander",
	"BeamExpanderLens",
	"BeamCollimator",
	"BeamCollimatorLens",
	"PolarizationOptics",
	"Prism",

	"DiffractionGrating", //Advanced/
	"MaskingPlate", //Advanced/
];

export const channelPath_Additional_2 = [
	"ExcitationFilter",
	"NeutralDensityFilter",
	"AdditionalFilter",
	"GenericDichroic",
	"BeamSplitter",
	"ReflectingMirror",
	"GenericLens",
	"CondenserLens",
	"TubeLens",
	"BeamExpanderLens",
	"BeamCollimatorLens",
	"DarkfieldStop",
	"HoffmanSlitPlate",
	"IrisDiaphragm",
	"PhaseRing",
	"VarelRing",
	"Shutter",
	"BeamExpander",
	"BeamCollimator",
	"Condenser",
	"MicroscopeTube",
	"PolarizationOptics",
	"Prism",

	"SpinningDisk", //Advanced/
	"RasterScanner", //Advanced/
	"DiffractionGrating", //Advanced/
	"MaskingPlate", //Advanced/
	"Pinhole", //Advanced
];

export const channelPath_Additional_3_4_5_6 = [
	"Shutter",
	"DarkfieldStop",
	"IrisDiaphragm",
	"ExcitationFilter",
	"EmissionFilter",
	"NeutralDensityFilter",
	"AdditionalFilter",
	"StandardDichroic",
	"GenericDichroic",
	"GenericDichroic",
	"BeamSplitter",
	"GenericLens",
	"PolarizationOptics",
	"Prism",

	"DiffractionGrating", //Advanced/
	"MaskingPlate", //Advanced/
	"Pinhole", //Advanced
	"AcoustoOpticallTuneableFilter", //Advanced/
	"LiquidCrystalTuneableFilter", //Advanced/
	"AcoustoOpticalLBeamSplitter", //Advanced/
];

export const channelPath_Additional_7 = [
	"Shutter",
	"IrisDiaphragm",
	"EmissionFilter",
	"NeutralDensityFilter",
	"AdditionalFilter",
	"GenericDichroic",
	"BeamSplitter",
	"ReflectingMirror",
	"GenericLens",
	"CondenserLens",
	"MagnificationChanger",
	"MicroscopeTube",
	"BeamExpanderLens",
	"BeamCollimatorLens",
	"BeamExpander",
	"BeamCollimator",
	"PolarizationOptics",
	"Prism",

	"DiffractionGrating", //Advanced/
	"MaskingPlate", //Advanced/
	"Pinhole", //Advanced
];

export const channelPath_Additional_8 = [
	"Shutter",
	"IrisDiaphragm",
	"EmissionFilter",
	"NeutralDensityFilter",
	"AdditionalFilter",
	"GenericDichroic",
	"BeamSplitter",
	"ReflectingMirror",
	"GenericLens",
	"BeamExpander",
	"BeamExpanderLens",
	"BeamCollimator",
	"BeamCollimatorLens",
	"PolarizationOptics",
	"Prism",

	"DiffractionGrating", //Advanced/
	"MaskingPlate", //Advanced/
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
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
			>
				link
			</a>
			.
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
			from scratch. 'Load from file' allows you to import into Micro-Meta App a
			previously available Microscope file (i.e., an example file, a template
			file, or an existing Microscope file shared by a colleague) to edit. 'Load
			from repository' allows you to load a previously available file from the
			active Micro-Meta App repository.
		</p>
	),
	position: "top",
};

export const create_mode_selector_settings_tooltip = {
	title: "Open Microscope file selector",
	content: (
		<p>
			Choose the source of the Microscope file you want to use and that
			describes the Instrument that was used for the acquisition of the image(s)
			you want to annotate.
		</p>
	),
	position: "top",
};

export const createSettings_mode_selector_tooltip = {
	title: "Load Settings file selector",
	content: (
		<p>
			Choose the modality you want to use for Settings management. 'Create from
			scratch' allows you to create a brand new Settings file from scratch.
			'Load from file' allows you to import into Micro-Meta App a previously
			available Settings file (i.e., an example file, a template file, or an
			existing Settings file shared by a colleague) to edit. 'Load from
			repository' allows you to load a previously available file from the active
			Micro-Meta App repository.
		</p>
	),
	position: "top",
};

export const loadImage_mode_selector_tooltip = {
	title: "Open Image file selector",
	content: (
		<p>
			Choose the source of the Image file you wish to work with or select 'Skip
			load image' to continue without an Image.
		</p>
	),
	position: "top",
};

export const create_from_file_tooltip = {
	title: "Create from file",
	content: <p>Select an existing Microscope file you want to work on.</p>,
	position: "top",
};

export const createSettings_from_file_tooltip = {
	title: "Load from file",
	content: <p>Select an existing Settings file you want to work on.</p>,
	position: "top",
};

export const loadImage_from_file_tooltip = {
	title: "Load from file",
	content: <p>Select an existing Image file you want to work on.</p>,
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

export const createSettings_from_repo_names_tooltip = {
	title: "Load from repository",
	content: <p>Select the Settings file you want to load.</p>,
	position: "top",
};

export const loadImage_from_repo_names_tooltip = {
	title: "Load from multi file",
	content: <p>Select the Image entry you want to load.</p>,
	position: "top",
};

export const create_mode_continue_tooltip = {
	title: "Continue",
	content: <p>Create a microscope using the mode selected above.</p>,
	position: "left",
};

export const create_mode_continue_settings_tooltip = {
	title: "Continue",
	content: (
		<p>
			Click this button to select the image(s) you want to annotate and, if
			available, an existing Settings file.
		</p>
	),
	position: "left",
};

export const createSettings_mode_continue_tooltip = {
	title: "Continue",
	content: (
		<p>
			Click this button to create a new Settings file or edit an existing one
			using the modality chosen above.
		</p>
	),
	position: "left",
};

export const loadImage_mode_continue_tooltip = {
	title: "Continue",
	content: (
		<p>
			Click this button to create a new Settings file or load metadata from an
			Image using the modality chosen above.
		</p>
	),
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

export const edit_setting_tooltip = {
	title: "Edit Image Acquisition Settings",
	content: (
		<p>
			Click this button to enter general information about the acquisition
			settings utilized for this image.
		</p>
	),
	position: "top",
};

export const validation_microscope_tooltip = {
	title: "Validation Tier selector",
	content: (
		<p>
			Choose the Tier level you want to use to validate this Microscope file.
			For more details about Tier definition please refer to the following{" "}
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
			>
				link
			</a>
			.
		</p>
	),
	position: "top",
};

export const validation_setting_tooltip = {
	title: "Validation Tier selector",
	content: (
		<p>
			Choose the Tier level you want to use to validate this Settings file. For
			more details about Tier definition please refer to the following{" "}
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://arxiv.org/ftp/arxiv/papers/1910/1910.11370.pdf"
			>
				link
			</a>
			.
		</p>
	),
	position: "top",
};

export const save_component_tooltip = {
	title: "Save component",
	content: (
		<p>
			Choose whether you want to save this Component file to the active
			Micro-Meta App repository or if you want to export it to your local file
			system.
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

export const save_setting_tooltip = {
	title: "Save settings",
	content: (
		<p>
			Choose whether you want to save this Settings file to the active
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

export const edit_planes = {
	title: "Edit Planes",
	content: (
		<p>
			Click this button to enter or edit general information about the Image
			Planes.
		</p>
	),
	position: "bottom",
};

export const edit_channels = {
	title: "Edit Channels",
	content: (
		<p>
			Click this button to enter or edit general information about the image
			Channels and about the light path associated with each of them.
		</p>
	),
	position: "bottom",
};

export const edit_img_env_settings = {
	title: "Edit Imaging Environment",
	content: (
		<p>
			Click this button to select the Imaging Environmental Control Device that
			was used, and enter or edit information about the environment in which the
			biological sample was maintained during the acquisition of this Image.
			NOTE: Any hardware components that are not validated at the current
			validation Tier, will not be available to add from the available items
			list. Please either change validation Tier or go back to Manage Instrument
			to make sure any Hardware Component you wish to manage here is validated
			at the desired Tier level.
		</p>
	),
	position: "bottom",
};

export const edit_mic_settings = {
	title: "Edit Microscope Stand Settings",
	content: (
		<p>
			Click this button to enter or edit information about the Settings that
			were applied to the Microscope Stand during the acquisition of this Image.
		</p>
	),
	position: "bottom",
};

export const edit_obj_settings = {
	title: "Edit Objective Settings",
	content: (
		<p>
			Click this button to select the Objective and edit the settings that were
			used for the acquisition of this Image. NOTE: Any hardware components that
			are not validated at the current validation Tier, will not be available to
			add from the available items list. Please either change validation Tier or
			go back to Manage Instrument to make sure any Hardware Component you wish
			to manage here is validated at the desired Tier level.
		</p>
	),
	position: "bottom",
};

export const edit_sample_pos_settings = {
	title: "Edit Sample Positioning Settings",
	content: (
		<p>
			Click this button to select one or more Sample Positioning devices, and
			enter or edit the settings that were applied to them during the
			acquisition of this Image. NOTE: Any hardware components that are not
			validated at the current validation Tier, will not be available to add
			from the available items list. Please either change validation Tier or go
			back to Manage Instrument to make sure any Hardware Component you wish to
			manage here is validated at the desired Tier level.
		</p>
	),
	position: "bottom",
};

export const edit_mic_table_settings = {
	title: "Edit Microscope Table Settings",
	content: (
		<p>
			Click this button to select the Microscope Table, and enter or edit the
			settings that were applied to the Microscope Table for the acquisition of
			this Image. NOTE: Any hardware components that are not validated at the
			current validation Tier, will not be available to add from the available
			items list. Please either change validation Tier or go back to Manage
			Instrument to make sure any Hardware Component you wish to manage here is
			validated at the desired Tier level.
		</p>
	),
	position: "bottom",
};

export const add_multi_planes = {
	title: "Add multiple Planes",
	content: (
		<p>
			In case information about the Image Planes have not been imported
			automatically with BioFormats, click this button to easily add multiple
			related Planes to this Image.
		</p>
	),
	position: "bottom",
};

export const add_plane = {
	title: "Add Plane",
	content: <p>Click this button to add a single Image Plane</p>,
	position: "bottom",
};

export const remove_plane = {
	title: "Remove Plane",
	content: <p>Click this button to remove the selected Image Plane</p>,
	position: "bottom",
};

export const add_channel = {
	title: "Add Channel",
	content: <p>Click this button to add a single Image Channel</p>,
	position: "bottom",
};

export const remove_channel = {
	title: "Remove Channel",
	content: <p>Click this button to remove the selected Image Channel</p>,
	position: "bottom",
};

export const edit_plane = {
	title: "Edit Plane",
	content: (
		<p>
			Click this button to edit or enter general information about the selected
			Image Planes.
		</p>
	),
	position: "bottom",
};

export const edit_channel = {
	title: "Edit Channel",
	content: (
		<p>
			Click this button to enter or edit general information about the image
			Channels and about the light path associated with each of them.
		</p>
	),
	position: "bottom",
};

export const edit_channel_settings = {
	title: "Edit Channel Settings",
	content: (
		<p>
			Click this button to enter or edit general information about this image
			Channel.
		</p>
	),
	position: "top",
};

export const select_lightSource = {
	title: "Select Light Source",
	content: (
		<p>
			Click this button to select the Light Source that was used for the
			acquisition of this Channel. After confirming the selection, click on the
			selected Light Source one more time to enter or edit the settings that
			were applied to it during acquisition. NOTE: Any hardware components that
			are not validated at the current validation Tier, will not be available to
			add from the available items list. Please either change validation Tier or
			go back to Manage Instrument to make sure any Hardware Component you wish
			to manage here is validated at the desired Tier level.
		</p>
	),
	position: "right",
};

export const select_couplingLens = {
	title: "Select Coupling Lens",
	content: (
		<p>
			If applicable, click this button to select the Coupling Lens that was used
			for the acquisition of this Channel. NOTE: Any hardware components that
			are not validated at the current validation Tier, will not be available to
			add from the available items list. Please either change validation Tier or
			go back to Manage Instrument to make sure any Hardware Component you wish
			to manage here is validated at the desired Tier level.
		</p>
	),
	position: "right",
};

export const select_lightSourceCoupling = {
	title: "Select Light Source Coupling",
	content: (
		<p>
			If applicable, click this button to select the Light Source Coupling
			device that was used for the acquisition of this Channel. NOTE: Any
			hardware components that are not validated at the current validation Tier,
			will not be available to add from the available items list. Please either
			change validation Tier or go back to Manage Instrument to make sure any
			Hardware Component you wish to manage here is validated at the desired
			Tier level.
		</p>
	),
	position: "right",
};

export const select_relayLens = {
	title: "Select Relay Lens",
	content: (
		<p>
			If applicable, click this button to select the Relay Lens that was used
			for the acquisition of this Channel. NOTE: Any hardware components that
			are not validated at the current validation Tier, will not be available to
			add from the available items list. Please either change validation Tier or
			go back to Manage Instrument to make sure any Hardware Component you wish
			to manage here is validated at the desired Tier level.
		</p>
	),
	position: "left",
};

export const select_detector = {
	title: "Select Detector",
	content: (
		<p>
			Click this button to select the Detector that was used for the acquisition
			of this Channel. After confirming the selection, click on the selected
			Detector one more time to enter or edit the settings that were applied to
			it during acquisition. NOTE: Any hardware components that are not
			validated at the current validation Tier, will not be available to add
			from the available items list. Please either change validation Tier or go
			back to Manage Instrument to make sure any Hardware Component you wish to
			manage here is validated at the desired Tier level.
		</p>
	),
	position: "left",
};

export const select_excitation = {
	title: "Select Excitation Wavelength",
	content: (
		<p>
			Click this button to select the Excitation Filter used for the acquisition
			of this Channel. NOTE: Any hardware components that are not validated at
			the current validation Tier, will not be available to add from the
			available items list. Please either change validation Tier or go back to
			Manage Instrument to make sure any Hardware Component you wish to manage
			here is validated at the desired Tier level.
		</p>
	),
	position: "right",
};

export const select_dichroic = {
	title: "Select Dichroic",
	content: (
		<p>
			Click this button to select the Dichroic (or Beamsplitter) that was used
			for the acquisition of this Channel. After confirming the selection, click
			on the selected Dichroic or (Beamsplitter) one more time to enter or edit
			the settings that were applied to it during acquisition. NOTE: Any
			hardware components that are not validated at the current validation Tier,
			will not be available to add from the available items list. Please either
			change validation Tier or go back to Manage Instrument to make sure any
			Hardware Component you wish to manage here is validated at the desired
			Tier level.
		</p>
	),
	position: "top",
};

export const select_emission = {
	title: "Select Emission Wavelength",
	content: (
		<p>
			Click this button to select the Emission Filter used for the acquisition
			of this Channel. NOTE: Any hardware components that are not validated at
			the current validation Tier, will not be available to add from the
			available items list. Please either change validation Tier or go back to
			Manage Instrument to make sure any Hardware Component you wish to manage
			here is validated at the desired Tier level.
		</p>
	),
	position: "left",
};

export const select_additional_left = {
	title: "Add additional element(s)",
	content: (
		<p>
			If applicable, click this button to select one or more additional optical
			element or device that was used in this position to build the light path
			for this Channel. NOTE: Any hardware components that are not validated at
			the current validation Tier, will not be available to add from the
			available items list. Please either change validation Tier or go back to
			Manage Instrument to make sure any Hardware Component you wish to manage
			here is validated at the desired Tier level.
		</p>
	),
	position: "left",
};

export const select_additional_right = {
	title: "Add additional element(s)",
	content: (
		<p>
			If applicable, click this button to select one or more additional optical
			element or device that was used in this position to build the light path
			for this Channel. NOTE: Any hardware components that are not validated at
			the current validation Tier, will not be available to add from the
			available items list. Please either change validation Tier or go back to
			Manage Instrument to make sure any Hardware Component you wish to manage
			here is validated at the desired Tier level.
		</p>
	),
	position: "right",
};
