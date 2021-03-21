import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import React from "react";
import Button from "react-bootstrap/Button";

import Header from "./components/header";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";
import SettingsMainView from "./components/settingsMainView";
import DataLoader from "./components/dataLoader";
import MicroscopePreLoader from "./components/microscopePreLoader";
import MicroscopeLoader from "./components/microscopeLoader";
import SettingLoader from "./components/settingLoader";
import ImageLoader from "./components/imageLoader";

import { v4 as uuidv4 } from "uuid";

import html2canvas from "html2canvas";

const url = require("url");
const validate = require("jsonschema").validate;

import {
	bool_isDebug,
	current_stands,
	string_object,
	string_array,
	string_json_ext,
	string_logo_img_no_bk,
	string_logo_img_cell_bk,
	string_logo_img_micro_bk,
	string_createFromScratch,
	string_createFromFile,
	string_loadFromRepository,
	string_noImageLoad,
} from "./constants";
import { isUndefined } from "util";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export default class MicroscopyMetadataTool extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			microscope: props.microscope || null,
			setting: props.setting || null,
			schema: props.schema || null,
			microscopes: props.microscopes || null,
			settings: props.settings || null,
			adaptedMicroscopeSchema: null,
			adaptedComponentsSchema: null,
			adaptedImageSchema: null,
			adaptedSettingsSchema: null,
			adaptedChildrenSchema: null,
			adaptedExperimentalSchema: null,
			mounted: false,
			activeTier: 1,
			validationTier: 1,
			isCreatingNewMicroscope: null,
			isLoadingMicroscope: null,
			isLoadingSettings: null,
			isLoadingImage: null,
			loadingOption: null,
			micName: null,
			settingName: null,
			elementData: null,
			settingData: null,
			linkedFields: null,
			loadingMode: 0,
			isMicroscopeValidated: false,
			isSettingValidated: false,
			areComponentsValidated: false,
			areSettingComponentsValidated: false,
			isViewOnly: props.isViewOnly || false,
			isPreset: false,
			standTypes: {},
			standType: null,
			imageMetadata: null,
		};

		for (let i = 0; i < current_stands.length; i++) {
			let stand = current_stands[i];
			let name = stand.name;
			let modifiedCreateString = string_createFromScratch.replace("#", name);
			this.state.standTypes[modifiedCreateString] = name;
		}

		if (this.state.microscope !== null && this.state.microscope !== undefined)
			this.state.isPreset = true;

		//this.isMicroscopeValidated = false;
		this.toolbarRef = React.createRef();
		this.canvasRef = React.createRef();
		this.settingsMainViewRef = React.createRef();
		/**
		 * This ref does not have 'current' until App has been mounted.
		 * Because App is a PureComponent which doesn't get updated unless
		 * state or props change, we need to have at least one state or prop change
		 * occur before `this.overlaysContainerRef.current` is passed down correctly
		 * to child Components (and not be null or undefined). This is currently done via
		 * schema being null initially and then updated via 'Load Schema' button, but since
		 * this prop is optional, we implement the componentDidMount func below.
		 */
		this.overlaysContainerRef = React.createRef();

		this.handleLoadSchema = this.handleLoadSchema.bind(this);
		this.handleCompleteLoadSchema = this.handleCompleteLoadSchema.bind(this);
		this.handleLoadMicroscopes = this.handleLoadMicroscopes.bind(this);
		this.handleCompleteLoadMicroscopes = this.handleCompleteLoadMicroscopes.bind(
			this
		);
		this.handleLoadSettings = this.handleLoadSettings.bind(this);
		this.handleCompleteLoadSettings = this.handleCompleteLoadSettings.bind(
			this
		);
		this.handleLoadDimensions = this.handleLoadDimensions.bind(this);
		this.handleCompleteLoadDimensions = this.handleCompleteLoadDimensions.bind(
			this
		);

		this.updateElementData = this.updateElementData.bind(this);
		this.updateLinkedFields = this.updateLinkedFields.bind(this);

		this.updateSettingData = this.updateSettingData.bind(this);
		this.onMicroscopeDataSave = this.onMicroscopeDataSave.bind(this);
		this.onSettingDataSave = this.onSettingDataSave.bind(this);

		this.handleActiveTierSelection = this.handleActiveTierSelection.bind(this);
		this.setCreateNewMicroscope = this.setCreateNewMicroscope.bind(this);
		this.setLoadMicroscope = this.setLoadMicroscope.bind(this);

		this.uploadMicroscopeFromDropzone = this.uploadMicroscopeFromDropzone.bind(
			this
		);
		this.uploadSettingFromDropzone = this.uploadSettingFromDropzone.bind(this);
		this.handleLoadMetadataComplete = this.handleLoadMetadataComplete.bind(
			this
		);

		this.handleLoadingOptionSelection = this.handleLoadingOptionSelection.bind(
			this
		);
		this.selectMicroscopeFromRepository = this.selectMicroscopeFromRepository.bind(
			this
		);
		this.selectSettingFromRepository = this.selectSettingFromRepository.bind(
			this
		);

		this.applyPreviousVersionModification = this.applyPreviousVersionModification.bind(
			this
		);

		this.createOrUseMicroscope = this.createOrUseMicroscope.bind(this);
		this.createNewMicroscopeFromScratch = this.createNewMicroscopeFromScratch.bind(
			this
		);
		this.createOrUseMicroscopeFromDroppedFile = this.createOrUseMicroscopeFromDroppedFile.bind(
			this
		);
		this.createOrUseMicroscopeFromSelectedFile = this.createOrUseMicroscopeFromSelectedFile.bind(
			this
		);
		//this.setMicroscopeScale = this.setMicroscopeScale.bind(this);

		this.createOrUseSetting = this.createOrUseSetting.bind(this);
		this.createNewSettingFromScratch = this.createNewSettingFromScratch.bind(
			this
		);
		this.createOrUseSettingFromDroppedFile = this.createOrUseSettingFromDroppedFile.bind(
			this
		);
		this.createOrUseSettingFromSelectedFile = this.createOrUseSettingFromSelectedFile.bind(
			this
		);

		this.createOrUseMetadata = this.createOrUseMetadata.bind(this);

		this.onClickBack = this.onClickBack.bind(this);

		this.createAdaptedSchemas = this.createAdaptedSchemas.bind(this);
		this.createAdaptedSchema = this.createAdaptedSchema.bind(this);

		this.handleExportMicroscope = this.handleExportMicroscope.bind(this);
		this.handleExportSetting = this.handleExportSetting.bind(this);
		this.handleExportMicroscopeImage = this.handleExportMicroscopeImage.bind(
			this
		);
		this.handleSaveMicroscope = this.handleSaveMicroscope.bind(this);
		this.handleSaveSetting = this.handleSaveSetting.bind(this);
		this.handleCompleteSaveMicroscope = this.handleCompleteSaveMicroscope.bind(
			this
		);
		this.handleCompleteSaveSetting = this.handleCompleteSaveSetting.bind(this);

		this.handleMicroscopePreset = this.handleMicroscopePreset.bind(this);
		//this.toDataUrl = this.toDataUrl.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.schema !== state.schema && props.schema !== null) {
			return { schema: props.schema };
		}
		if (props.microscope !== state.microscope && props.microscope !== null) {
			return { microscope: props.microscope };
		}
		if (props.setting !== state.setting && props.setting !== null) {
			return { setting: props.setting };
		}
		if (props.microscopes !== state.microscopes && props.microscopes !== null) {
			return { microscopes: props.microscopes };
		}
		if (props.settings !== state.settings && props.settings !== null) {
			return { settings: props.settings };
		}
		return null;
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	componentWillUnmount() {
		this.setState({ mounted: false });
	}

	handleLoadDimensions(e) {
		return new Promise(() =>
			setTimeout(
				this.props.onLoadDimensions(this.handleCompleteLoadDimensions),
				10000
			)
		);
	}

	handleLoadMicroscopes(e) {
		return new Promise(() =>
			setTimeout(
				this.props.onLoadMicroscopes(this.handleCompleteLoadMicroscopes),
				10000
			)
		);
	}

	handleLoadSettings(e) {
		return new Promise(() =>
			setTimeout(
				this.props.onLoadSettings(this.handleCompleteLoadSettings),
				10000
			)
		);
	}

	handleCompleteLoadDimensions(newDimensions) {
		//console.log(newDimensions);
		this.setState({ dimensions: newDimensions });
	}

	handleCompleteLoadMicroscopes(newMicroscopes) {
		this.setState({ microscopes: newMicroscopes });
	}

	handleCompleteLoadSettings(newSettings) {
		this.setState({ settings: newSettings });
	}

	handleLoadSchema(e) {
		return new Promise(() =>
			setTimeout(this.props.onLoadSchema(this.handleCompleteLoadSchema), 10000)
		);
	}

	handleCompleteLoadSchema(newSchema) {
		if (this.state.isPreset) {
			this.setState({ schema: newSchema }, () => {
				this.handleMicroscopePreset();
			});
		} else {
			this.setState({ schema: newSchema });
		}
	}

	//HAVE TO DO THE SAME FOR SETTINGS?
	handleMicroscopePreset() {
		let microscope = this.state.microscope;
		let tier = microscope.Tier;
		let vTier = microscope.ValidationTier;

		this.setState(
			{
				activeTier: tier,
				validationTier: vTier,
				isCreatingNewMicroscope: true,
				loadingOption: string_createFromFile,
				loadingMode: 1,
			},
			() => {
				this.createOrUseMicroscopeFromDroppedFile();
			}
		);
	}

	handleActiveTierSelection(item) {
		let tier = Number(item);
		this.setState({ activeTier: tier, validationTier: tier });
	}

	setCreateNewMicroscope() {
		this.setState({
			isCreatingNewMicroscope: true,
			isLoadingMicroscope: false,
			isLoadingSettings: false,
			isLoadingImage: false,
			loadingOption: Object.keys(this.state.standTypes)[0],
			loadingMode: 0,
		});
		//this.handleLoadingOptionSelection(createFromScratch);
	}

	setLoadMicroscope() {
		this.setState({
			isCreatingNewMicroscope: false,
			isLoadingMicroscope: true,
			isLoadingSettings: true,
			isLoadingImage: true,
			loadingOption: string_createFromFile,
			loadingMode: 1,
		});
		//this.handleLoadingOptionSelection(createFromFile);
	}

	handleLoadingOptionSelection(item) {
		let loadingMode = 0;
		if (item === string_createFromFile) {
			loadingMode = 1;
		} else if (item === string_loadFromRepository) loadingMode = 2;
		this.setState({ loadingOption: item, loadingMode: loadingMode });
	}

	selectMicroscopeFromRepository(item) {
		this.setState({ micName: item });
	}

	selectSettingFromRepository(item) {
		this.setState({ settingName: item });
	}

	uploadMicroscopeFromDropzone(microscope) {
		this.setState({ microscope: microscope });
	}

	uploadSettingFromDropzone(setting) {
		this.setState({ setting: setting });
	}

	handleLoadMetadataComplete(imageMetadata) {
		this.setState({ imageMetadata: imageMetadata });
	}

	// setMicroscopeScale(scale) {
	// 	this.state.microscope.scale = scale;
	// }

	createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier) {
		let singleSchema = Object.assign({}, singleSchemaOriginal);
		singleSchema.properties = Object.assign(
			{},
			singleSchemaOriginal.properties
		);

		if (singleSchema.required !== undefined)
			if (singleSchemaOriginal.type === string_array) {
				singleSchema.items.required = singleSchemaOriginal.items.required.slice(
					0
				);
			} else {
				singleSchema.required = singleSchemaOriginal.required.slice(0);
			}

		let fieldsToRemove = [];
		let fieldsToSetNotRequired = [];

		let required = singleSchema.required;
		let properties = singleSchema.properties;

		if (singleSchemaOriginal.type === string_array) {
			required = singleSchema.items.required;
			properties = singleSchema.items.properties;
		}

		if (properties === null || properties === undefined) {
			//console.log(singleSchema);
			return singleSchema;
		}

		Object.keys(properties).forEach((propKey) => {
			let property = properties[propKey];
			if (
				property.type === string_object ||
				(property.type === string_array &&
					property.items.properties !== null &&
					property.items.properties !== undefined)
			) {
				let newProp = this.createAdaptedSchema(
					property,
					activeTier,
					validationTier
				);
				properties[propKey] = newProp;
			}
			if (property.tier > activeTier) {
				fieldsToRemove.push(propKey);
			}
			if (property.tier > validationTier && !fieldsToRemove.includes(propKey)) {
				fieldsToSetNotRequired.push(propKey);
			}
		});
		for (let y = 0; y < fieldsToRemove.length; y++) {
			let key = fieldsToRemove[y];
			let propertyToRemove = properties[key];
			if (propertyToRemove === undefined) continue;
			delete properties[key];
			if (required === undefined) continue;
			let requiredIndex = required.indexOf(key);
			if (requiredIndex !== -1) required.splice(requiredIndex, 1);
		}
		for (let y = 0; y < fieldsToSetNotRequired.length; y++) {
			let key = fieldsToSetNotRequired[y];
			let propertyToRemove = properties[key];
			if (propertyToRemove === undefined) continue;
			if (required === undefined) continue;
			let requiredIndex = required.indexOf(key);
			if (requiredIndex !== -1) required.splice(requiredIndex, 1);
		}
		return singleSchema;
	}

	createAdaptedSchemas(validationTier, standType) {
		let activeTier = this.state.activeTier;
		let schema = this.state.schema;
		let componentsSchema = [];
		let settingsSchema = [];
		let childrenSchema = [];
		let experimentalSchema = [];
		let microscopeSchema = {};
		let microscopeStandSchema = {};
		let imageSchema = {};
		let microscope = this.state.microscope;
		let setting = this.state.setting;
		let componentsCounter = 0;
		let settingsCounter = 0;
		let experimentalCounter = 0;
		let childrenCounter = 0;
		let currentStandType = standType;
		if (currentStandType === null || currentStandType === undefined)
			currentStandType = this.state.standType;
		Object.keys(schema).forEach((schemaIndex) => {
			let singleSchemaOriginal = schema[schemaIndex];
			let singleSchema = this.createAdaptedSchema(
				singleSchemaOriginal,
				activeTier,
				validationTier
			);
			if (singleSchema.title === "Instrument") {
				microscopeSchema = Object.assign(microscopeSchema, singleSchema);
			} else if (singleSchema.title === currentStandType) {
				microscopeStandSchema = Object.assign(
					microscopeStandSchema,
					singleSchema
				);
			} else if (singleSchema.title === "Image") {
				imageSchema = Object.assign(imageSchema, singleSchema);
			} else if (singleSchema.category === "ChildElement") {
				childrenSchema[childrenCounter] = singleSchema;
				childrenCounter++;
			} else if (singleSchema.domain === "ImageAcquisitionSettings") {
				settingsSchema[settingsCounter] = singleSchema;
				settingsCounter++;
			} else if (
				singleSchema.domain === "MicroscopeHardwareSpecifications" ||
				singleSchema.domain === "MicroscopeSpecifications"
			) {
				componentsSchema[componentsCounter] = singleSchema;
				componentsCounter++;
			} else if (singleSchema.domain === "Experimental") {
				experimentalSchema[experimentalCounter] = singleSchema;
				experimentalCounter++;
			}
		});

		let validated = false;
		if (microscope !== null && microscope !== undefined) {
			microscope.ValidationTier = validationTier;
			let validation = validate(microscope, microscopeSchema);
			validated = validation.valid;
		}

		if (setting !== null && setting !== undefined) {
			setting.ValidationTier = validationTier;
			let validation = validate(setting, imageSchema);
			validated = validation.valid;
		}

		this.setState({
			adaptedMicroscopeSchema: microscopeSchema,
			adaptedMicroscopeStandSchema: microscopeStandSchema,
			adaptedComponentsSchema: componentsSchema,
			adaptedImageSchema: imageSchema,
			adaptedSettingsSchema: settingsSchema,
			adaptedExperimentalSchema: experimentalSchema,
			adaptedChildrenSchema: childrenSchema,
			validationTier: validationTier,
			isMicroscopeValidated: validated,
		});
		return [
			microscopeSchema,
			microscopeStandSchema,
			componentsSchema,
			imageSchema,
			settingsSchema,
			childrenSchema,
		];
	}

	static checkScalingFactorAndRescaleIfNeeded(
		modifiedMic,
		elementData,
		scalingFactor
	) {
		let micScalingFactor = 1;
		if (modifiedMic.ScalingFactor !== undefined)
			micScalingFactor = modifiedMic.ScalingFactor;
		if (micScalingFactor === scalingFactor) return;

		let reverseScale = 1 / micScalingFactor;
		let newScalingFactor = reverseScale * scalingFactor;

		modifiedMic.ScalingFactor = scalingFactor;
		//console.log("SC: " + newScalingFactor);
		for (let key in elementData) {
			let element = elementData[key];
			// console.log("ID: " + key);
			// console.log(
			// 	" W: " +
			// 		element.Width +
			// 		" H: " +
			// 		element.Height +
			// 		" X: " +
			// 		element.PositionX +
			// 		" Y: " +
			// 		element.PositionY
			// );
			element.Width *= newScalingFactor;
			element.Height *= newScalingFactor;
			element.PositionX *= newScalingFactor;
			element.PositionY *= newScalingFactor;
			// console.log(
			// 	" W: " +
			// 		element.Width +
			// 		" H: " +
			// 		element.Height +
			// 		" X: " +
			// 		element.PositionX +
			// 		" Y: " +
			// 		element.PositionY
			// );
		}
	}

	// static readTextFile(file) {
	// 	let rawFile = new XMLHttpRequest();
	// 	let rawData = null;
	// 	rawFile.open("GET", file, false);
	// 	rawFile.onreadystatechange = () => {
	// 		if (rawFile.readyState === 4) {
	// 			if (rawFile.status === 200 || rawFile.status == 0) {
	// 				rawData = rawFile.responseText;
	// 			}
	// 		}
	// 	};
	// 	rawFile.send(null);
	// 	return rawData;
	// }

	applyPreviousVersionModification(originalMicroscope) {
		let schema = this.state.schema;
		let oldVersion = originalMicroscope.Version;
		let oldVersionString = oldVersion.split(".").join(""); //oldVersion.replaceAll(".", "");
		let oldVersionNumber = Number(oldVersionString);
		let microscopeSchema = {};
		let microscopeStandSchema = {};
		//In theory these should never be needed because settings shouldn't be re-edited
		//let imageSchema = {};
		//let settingsSchema = {};
		let componentsSchema = {};
		let experimentalSchema = {};
		Object.keys(schema).forEach((schemaIndex) => {
			let singleSchemaOriginal = schema[schemaIndex];
			if (singleSchemaOriginal.title === "Instrument") {
				microscopeSchema = Object.assign(
					microscopeSchema,
					singleSchemaOriginal
				);
			} else if (singleSchemaOriginal.title === "InvertedMicroscopeStand") {
				microscopeStandSchema = Object.assign(
					microscopeStandSchema,
					singleSchemaOriginal
				);
			} /* else if (singleSchemaOriginal.title === "Image") {
				imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
			}  else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
				let schemaID = singleSchemaOriginal.ID;
				settingsSchema[schemaID] = singleSchemaOriginal;
			}*/ else if (
				singleSchemaOriginal.domain === "MicroscopeHardwareSpecifications" ||
				singleSchemaOriginal.domain === "MicroscopeSpecifications"
			) {
				let schemaID = singleSchemaOriginal.ID;
				componentsSchema[schemaID] = singleSchemaOriginal;
			} else if (singleSchemaOriginal.domain === "Experimental") {
				let schemaID = singleSchemaOriginal.ID;
				experimentalSchema[schemaID] = singleSchemaOriginal;
			}
		});
		if (originalMicroscope.Version !== microscopeSchema.version) {
			originalMicroscope.Version = microscopeSchema.version;
		}
		if (
			originalMicroscope.MicroscopeStand !== undefined &&
			originalMicroscope.MicroscopeStand !== null &&
			originalMicroscope.MicroscopeStand.Version !==
				microscopeStandSchema.version
		) {
			originalMicroscope.MicroscopeStand.Version =
				microscopeStandSchema.version;
		}
		//FIXME me update experimental here?
		for (let i = 0; i < originalMicroscope.components.length; i++) {
			let comp = originalMicroscope.components[i];
			let compSchemaID = comp.Schema_ID;
			let compSchema = componentsSchema[compSchemaID];
			if (
				compSchema !== undefined &&
				compSchema !== null &&
				comp.Version !== compSchema.version
			) {
				comp.Version = compSchema.version;
			} else if (compSchema === undefined || compSchema === null) {
				//Adjustment case for renamed Schemas
				console.log(compSchemaID + " not found - OLD NAME");
				let newCompSchemaID = null;
				if (compSchemaID === "AutoFocus.json")
					newCompSchemaID = "FocusStabilizationDevice.json";
				else if (compSchemaID === "Direct.json")
					newCompSchemaID = "FreeBeam.json";
				else if (compSchemaID === "FilterSet.json")
					newCompSchemaID = "FilterCube.json";
				else if (compSchemaID === "Optovar.json")
					newCompSchemaID = "MagnificationChanger.json";
				else if (compSchemaID === "SampleHolder.json")
					newCompSchemaID = "StageInsert.json";
				else if (compSchemaID === "ObjectiveTurretFocus.json")
					newCompSchemaID = "TurretObjectiveFocusing.json";
				else if (compSchemaID === "PiezoElectricObjectiveFocus.json")
					newCompSchemaID = "IndividualObjectiveFocusing.json";
				let compSchema = componentsSchema[newCompSchemaID];
				if (compSchema === undefined || compSchema === null) {
					console.log(newCompSchemaID + " not found - NEW NAME");
				} else {
					comp.Schema_ID = newCompSchemaID;
				}
			}
		}

		if (oldVersionNumber < 2000) {
			//Need to add stand and move fields from microscope to stand
			//Manufacturer, Model, SerialNumber -> CatalogNumber, LotNumber, EyePieceFieldNumber
			let activeTier = this.state.activeTier;
			let uuid2 = uuidv4();
			console.log("OLD MICROSCOPE");
			console.log(originalMicroscope);
			let newMicroscope = Object.assign({}, originalMicroscope);
			delete newMicroscope.Manufacturer;
			delete newMicroscope.Model;
			delete newMicroscope.SerialNumber;
			delete newMicroscope.LotNumber;
			delete newMicroscope.SpecsFile;
			delete newMicroscope.EyePieceFieldNumber;
			delete newMicroscope.Type;
			newMicroscope.MicroscopeStand = {
				Name: `New ${microscopeStandSchema.title}`,
				Schema_ID: microscopeStandSchema.ID,
				ID: uuid2,
				Tier: microscopeStandSchema.tier,
				ValidationTier: activeTier,
				Version: microscopeStandSchema.version,
				Manufacturer: originalMicroscope.Manufacturer,
				Model: originalMicroscope.Model,
				CatalogNumber: originalMicroscope.SerialNumber,
				LotNumber: originalMicroscope.LotNumber,
				EyePieceFieldNumber: originalMicroscope.EyePieceFieldNumber,
				SpecsFile: originalMicroscope.SpecsFile,
			};
			newMicroscope.Schema_ID = "Instrument.json";
			console.log("newMicroscope");
			console.log(newMicroscope);
			return newMicroscope;
		}
		return originalMicroscope;
	}

	createNewMicroscopeFromScratch(standType) {
		let typeDimensions = this.state.dimensions[standType];
		let uuid = uuidv4();
		let activeTier = this.state.activeTier;
		let adaptedSchemas = this.createAdaptedSchemas(activeTier, standType);
		let microscopeSchema = adaptedSchemas[0];
		let microscopeStandSchema = adaptedSchemas[1];
		let microscope = {
			//todo this means the microscope schema needs to be at 0 all the time
			//need to find better solution
			Name: `New ${microscopeSchema.title}`,
			Schema_ID: microscopeSchema.ID,
			ID: uuid,
			Tier: activeTier,
			ValidationTier: activeTier,
			Version: microscopeSchema.version,
		};
		let uuid2 = uuidv4();
		microscope.MicroscopeStand = {
			Name: `New ${microscopeStandSchema.title}`,
			Schema_ID: microscopeStandSchema.ID,
			ID: uuid2,
			Tier: microscopeStandSchema.tier,
			ValidationTier: activeTier,
			Version: microscopeStandSchema.version,
		};
		this.setState({
			microscope: microscope,
			elementData: {},
			validationTier: microscope.ValidationTier,
			typeDimensions: typeDimensions,
			standType: standType,
		});
	}

	createOrUseMicroscopeFromDroppedFile() {
		let modifiedMic = this.state.microscope;
		let activeTier = this.state.activeTier;
		if (activeTier !== this.state.microscope.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.Tier = activeTier;
		}
		if (modifiedMic.ValidationTier > activeTier) {
			modifiedMic.ValidationTier = activeTier;
		}
		modifiedMic = this.applyPreviousVersionModification(modifiedMic);
		let standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
		let adaptedSchemas = this.createAdaptedSchemas(
			modifiedMic.ValidationTier,
			standType
		);
		let typeDimensions = this.state.dimensions[standType];
		let microscopeSchema = adaptedSchemas[0];
		let microscopeStandSchema = adaptedSchemas[1];
		let componentsSchema = adaptedSchemas[2];
		let settingsSchema = adaptedSchemas[4];

		let components = this.state.microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach((schemaIndex) => {
				let compSchema = componentsSchema[schemaIndex];
				let schema_ID = compSchema.ID;
				Object.keys(components).forEach((objIndex) => {
					let obj = components[objIndex];
					if (schema_ID !== obj.Schema_ID) return;
					let id = compSchema.title + "_" + obj.ID;
					newElementData[id] = obj;
				});
			});
		}
		let linkedFields = Object.assign({}, modifiedMic.linkedFields);
		let validationMicroscope = validate(modifiedMic, microscopeSchema);
		let validatedMicroscope = validationMicroscope.valid;
		let validationStand = validate(
			modifiedMic.MicroscopeStand,
			microscopeStandSchema
		);
		let validatedStand = validationStand.valid;
		let validated = validatedMicroscope && validatedStand;
		MicroscopyMetadataTool.checkScalingFactorAndRescaleIfNeeded(
			modifiedMic,
			newElementData,
			this.props.scalingFactor
		);
		this.setState({
			microscope: modifiedMic,
			setting: null,
			elementData: newElementData,
			settingData: null,
			linkedFields: linkedFields,
			validationTier: modifiedMic.ValidationTier,
			isMicroscopeValidated: validated,
			typeDimensions: typeDimensions,
			standType: standType,
		});
	}

	createOrUseMicroscopeFromSelectedFile() {
		let microscope = this.state.microscopes[this.state.micName];
		let modifiedMic = microscope;
		let activeTier = this.state.activeTier;
		if (activeTier !== microscope.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.Tier = activeTier;
		}

		if (modifiedMic.ValidationTier > activeTier) {
			modifiedMic.ValidationTier = activeTier;
		}
		modifiedMic = this.applyPreviousVersionModification(modifiedMic);
		let standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
		let adaptedSchemas = this.createAdaptedSchemas(
			modifiedMic.ValidationTier,
			standType
		);
		let typeDimensions = this.state.dimensions[standType];
		let microscopeSchema = adaptedSchemas[0];
		let microscopeStandSchema = adaptedSchemas[1];
		let componentsSchema = adaptedSchemas[2];
		let settingsSchema = adaptedSchemas[4];

		let components = microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach((schemaIndex) => {
				let compSchema = componentsSchema[schemaIndex];
				let schema_ID = compSchema.ID;
				Object.keys(components).forEach((objIndex) => {
					let obj = components[objIndex];
					if (schema_ID !== obj.Schema_ID) return;
					let id = compSchema.title + "_" + obj.ID;
					newElementData[id] = obj;
				});
			});
		}
		let linkedFields = Object.assign({}, modifiedMic.linkedFields);
		let validationMicroscope = validate(modifiedMic, microscopeSchema);
		let validatedMicroscope = validationMicroscope.valid;
		let validationStand = validate(
			modifiedMic.MicroscopeStand,
			microscopeStandSchema
		);
		let validatedStand = validationStand.valid;
		let validated = validatedMicroscope && validatedStand;
		MicroscopyMetadataTool.checkScalingFactorAndRescaleIfNeeded(
			modifiedMic,
			newElementData,
			this.props.scalingFactor
		);
		this.setState({
			microscope: modifiedMic,
			setting: null,
			elementData: newElementData,
			settingData: null,
			linkedFields: linkedFields,
			validationTier: modifiedMic.ValidationTier,
			isMicroscopeValidated: validated,
			typeDimensions: typeDimensions,
			standType: standType,
		});
	}

	createOrUseMicroscope() {
		let isCreateNewScratch = false;
		let standType = null;
		for (let typeString in this.state.standTypes) {
			if (this.state.loadingOption === typeString) {
				isCreateNewScratch = true;
				let type = this.state.standTypes[typeString];
				for (let i = 0; i < current_stands.length; i++) {
					let stand = current_stands[i];
					if (stand.name === type) {
						standType = stand.json;
						break;
					}
				}
				if (standType !== null) break;
			}
		}
		if (isCreateNewScratch) {
			this.createNewMicroscopeFromScratch(standType);
		} else if (this.state.loadingOption === string_createFromFile) {
			this.createOrUseMicroscopeFromDroppedFile();
		} else {
			this.createOrUseMicroscopeFromSelectedFile();
		}
	}

	createNewSettingFromScratch() {
		let imageMetadata = this.state.imageMetadata;
		let microscope = this.state.microscope;
		let standType = microscope.MicroscopeStand.Schema_ID.replace(".json", "");
		let typeDimensions = this.state.dimensions[standType];
		let uuid = uuidv4();
		let uuid2 = uuidv4();
		let activeTier = this.state.activeTier;
		let adaptedSchemas = this.createAdaptedSchemas(activeTier, standType);
		let imageSchema = adaptedSchemas[3];
		let settingsSchema = adaptedSchemas[4];

		//console.log(settingsSchema);
		let pixelsSchema = null;
		for (let i in settingsSchema) {
			let localSchema = settingsSchema[i];
			if (localSchema.ID === "Pixels.json") {
				pixelsSchema = localSchema;
			}
		}

		let setting = {
			//todo this means the microscope schema needs to be at 0 all the time
			//need to find better solution
			Name: `New ${imageSchema.title}`,
			Schema_ID: imageSchema.ID,
			ID: uuid,
			Tier: activeTier,
			ValidationTier: activeTier,
			Version: imageSchema.version,
			InstrumentName: microscope.Name,
			InstrumentID: microscope.ID,
		};
		let pixels = {
			Name: `New ${pixelsSchema.title}`,
			Schema_ID: pixelsSchema.ID,
			ID: uuid2,
			Tier: activeTier,
			ValidationTier: activeTier,
			Version: pixelsSchema.version,
		};
		setting.Pixels = pixels;

		let mergedSettings = null;
		if (imageMetadata !== null && imageMetadata !== undefined) {
			mergedSettings = Object.assign({}, setting, imageMetadata);
		} else {
			mergedSettings = setting;
		}

		let newSettingData = {};
		let imgEnv = mergedSettings.ImagingEnvironment;
		if (imgEnv !== null && imgEnv !== undefined)
			newSettingData.ImagingEnvironment = imgEnv;
		let micStandSet = mergedSettings.MicroscopeStandSettings;
		if (micStandSet !== null && micStandSet !== undefined)
			newSettingData.MicroscopeStandSettings = micStandSet;
		let micTableSet = mergedSettings.MicroscopeTableSettings;
		if (micTableSet !== null && micTableSet !== undefined)
			newSettingData.MicroscopeTableSettings = micTableSet;
		let objSet = mergedSettings.ObjectiveSettings;
		if (objSet !== null && objSet !== undefined)
			newSettingData.ObjectiveSettings = objSet;
		let samPosSet = mergedSettings.SamplePositioningSettings;
		if (samPosSet !== null && samPosSet !== undefined)
			newSettingData.SamplePositioningSettings = samPosSet;
		let channels = mergedSettings.Channels;
		if (channels !== null && channels !== undefined)
			newSettingData.Channels = channels;
		let planes = mergedSettings.Planes;
		if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
		let exp = mergedSettings.Experiment;
		if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
		let tirf = mergedSettings.TIRFSettings;
		if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf;

		this.setState({
			setting: mergedSettings,
			settingData: newSettingData,
			validationTier: setting.ValidationTier,
			typeDimensions: typeDimensions,
			standType: standType,
			isLoadingSettings: false,
		});
	}

	createOrUseSettingFromDroppedFile() {
		let imageMetadata = this.state.imageMetadata;
		let modifiedSetting = this.state.setting;
		let activeTier = this.state.activeTier;
		if (activeTier !== this.state.microscope.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedSetting.Tier = activeTier;
		}
		if (modifiedSetting.ValidationTier > activeTier) {
			modifiedSetting.ValidationTier = activeTier;
		}
		//modifiedSetting = this.applyPreviousVersionModification(modifiedSetting);
		let adaptedSchemas = this.createAdaptedSchemas(
			modifiedSetting.ValidationTier,
			this.state.standType
		);
		let imageSchema = adaptedSchemas[3];
		let settingsSchema = adaptedSchemas[4];

		let pixelsSchema = null;
		for (let i in settingsSchema) {
			let localSchema = settingsSchema[i];
			if (localSchema.ID === "Pixels.json") {
				pixelsSchema = localSchema;
			}
		}

		let mergedSettings = null;
		if (imageMetadata !== null && imageMetadata !== undefined) {
			mergedSettings = Object.assign({}, imageMetadata, modifiedSetting);
		} else {
			mergedSettings = modifiedSetting;
		}

		let newSettingData = {};
		let imgEnv = mergedSettings.ImagingEnvironment;
		if (imgEnv !== null && imgEnv !== undefined)
			newSettingData.ImagingEnvironment = imgEnv;
		let micStandSet = mergedSettings.MicroscopeStandSettings;
		if (micStandSet !== null && micStandSet !== undefined)
			newSettingData.MicroscopeStandSettings = micStandSet;
		let micTableSet = mergedSettings.MicroscopeTableSettings;
		if (micTableSet !== null && micTableSet !== undefined)
			newSettingData.MicroscopeTableSettings = micTableSet;
		let objSet = mergedSettings.ObjectiveSettings;
		if (objSet !== null && objSet !== undefined)
			newSettingData.ObjectiveSettings = objSet;
		let samPosSet = mergedSettings.SamplePositioningSettings;
		if (samPosSet !== null && samPosSet !== undefined)
			newSettingData.SamplePositioningSettings = samPosSet;
		let channels = mergedSettings.Channels;
		if (channels !== null && channels !== undefined)
			newSettingData.Channels = channels;
		let planes = mergedSettings.Planes;
		if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
		let exp = mergedSettings.Experiment;
		if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
		let tirf = mergedSettings.TIRFSettings;
		if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf;

		// console.log("settingData");
		// console.log(newSettingData);

		//let linkedFields = Object.assign({}, modifiedSetting.linkedFields);
		let validationSetting = validate(mergedSettings, imageSchema);
		let validatedSetting = validationSetting.valid;
		let validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
		let validatedPixels = validationPixels.valid;
		let validated = validatedSetting && validatedPixels;
		this.setState({
			setting: mergedSettings,
			settingData: newSettingData,
			validationTier: mergedSettings.ValidationTier,
			isSettingValidated: validated,
			isLoadingSettings: false,
		});
	}

	createOrUseSettingFromSelectedFile() {
		let imageMetadata = this.state.imageMetadata;
		let microscope = this.state.microscope;
		if (bool_isDebug) {
			console.log("settings");
			console.log(this.state.settings);
			console.log("settingName");
			console.log(this.state.settingName);
		}
		let setting = this.state.settings[this.state.settingName];
		let modifiedSetting = setting;
		let activeTier = this.state.activeTier;
		if (activeTier !== microscope.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedSetting.Tier = activeTier;
		}

		if (modifiedSetting.ValidationTier > activeTier) {
			modifiedSetting.ValidationTier = activeTier;
		}
		//modifiedSetting = this.applyPreviousVersionModification(modifiedSetting);
		let adaptedSchemas = this.createAdaptedSchemas(
			modifiedSetting.ValidationTier,
			this.state.standType
		);
		let imageSchema = adaptedSchemas[3];
		let settingsSchema = adaptedSchemas[4];

		console.log(settingsSchema);
		let pixelsSchema = null;
		for (let i in settingsSchema) {
			let localSchema = settingsSchema[i];
			if (localSchema.ID === "Pixels.json") {
				pixelsSchema = localSchema;
			}
		}

		let mergedSettings = null;
		if (imageMetadata !== null && imageMetadata !== undefined) {
			mergedSettings = Object.assign({}, imageMetadata, modifiedSetting);
		} else {
			mergedSettings = modifiedSetting;
		}

		let newSettingData = {};
		let imgEnv = mergedSettings.ImagingEnvironment;
		if (imgEnv !== null && imgEnv !== undefined)
			newSettingData.ImagingEnvironment = imgEnv;
		let micStandSet = mergedSettings.MicroscopeStandSettings;
		if (micStandSet !== null && micStandSet !== undefined)
			newSettingData.MicroscopeStandSettings = micStandSet;
		let micTableSet = mergedSettings.MicroscopeTableSettings;
		if (micTableSet !== null && micTableSet !== undefined)
			newSettingData.MicroscopeTableSettings = micTableSet;
		let objSet = mergedSettings.ObjectiveSettings;
		if (objSet !== null && objSet !== undefined)
			newSettingData.ObjectiveSettings = objSet;
		let samPosSet = mergedSettings.SamplePositioningSettings;
		if (samPosSet !== null && samPosSet !== undefined)
			newSettingData.SamplePositioningSettings = samPosSet;
		let channels = mergedSettings.Channels;
		if (channels !== null && channels !== undefined)
			newSettingData.Channels = channels;
		let planes = mergedSettings.Planes;
		if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
		let exp = mergedSettings.Experiment;
		if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
		let tirf = mergedSettings.TIRFSettings;
		if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf;

		//let linkedFields = Object.assign({}, modifiedMic.linkedFields);
		let validationSetting = validate(mergedSettings, imageSchema);
		let validatedSetting = validationSetting.valid;
		let validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
		let validatedPixels = validationPixels.valid;
		let validated = validatedSetting && validatedPixels;
		this.setState({
			setting: mergedSettings,
			settingData: newSettingData,
			validationTier: mergedSettings.ValidationTier,
			isSettingValidated: validated,
			isLoadingSettings: false,
		});
	}

	createOrUseSetting() {
		let modifiedCreateString = string_createFromScratch.replace("# ", "");
		if (this.state.loadingOption === modifiedCreateString) {
			this.createNewSettingFromScratch();
		} else if (this.state.loadingOption === string_createFromFile) {
			this.createOrUseSettingFromDroppedFile();
		} else {
			this.createOrUseSettingFromSelectedFile();
		}
	}

	createOrUseMetadata() {
		if (this.state.loadingOption === string_createFromFile) {
			this.setState({
				isLoadingImage: false,
			});
		} else {
			this.setState({
				isLoadingImage: false,
				imageMetadata: null,
			});
		}
	}

	onClickBack() {
		let presetMicroscope = null;
		if (this.state.isPreset) {
			presetMicroscope = this.state.microscope;
		}
		this.setState({
			activeTier: 1,
			validationTier: 1,
			microscope: presetMicroscope,
			microscopes: null,
			setting: null,
			isCreatingNewMicroscope: null,
			isLoadingMicroscope: null,
			isLoadingImage: null,
			loadingOption: null,
			micName: null,
			schema: null,
			elementData: null,
			settingData: null,
			loadingMode: 0,
			imageMetadata: null,
		});
	}

	updateElementData(elementData, areComponentsValidated) {
		//console.log(elementData);
		this.setState({
			elementData: elementData,
			areComponentsValidated: areComponentsValidated,
		});
	}

	updateLinkedFields(linkedFields) {
		this.setState({
			linkedFields: linkedFields,
		});
	}

	updateSettingData(settingData, areSettingComponentsValidated) {
		let oldSettingData = this.state.settingData;
		let newSettingData = Object.assign(oldSettingData, settingData);
		this.setState({
			settingData: newSettingData,
			areSettingComponentsValidated: areSettingComponentsValidated,
		});
	}

	handleExportMicroscope(microscope) {
		let micName = microscope.Name;
		micName = micName.replace(/\s+/g, "_").toLowerCase();
		let filename = `${micName}.json`;
		let contentType = "application/json;charset=utf-8;";
		var a = document.createElement("a");
		a.download = filename;
		a.href =
			"data:" +
			contentType +
			"," +
			encodeURIComponent(JSON.stringify(microscope));
		a.target = "_blank";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	handleExportSetting(setting) {
		let settingName = setting.Name;
		settingName = settingName.replace(/\s+/g, "_").toLowerCase();
		let filename = `${settingName}.json`;
		let contentType = "application/json;charset=utf-8;";
		var a = document.createElement("a");
		a.download = filename;
		a.href =
			"data:" + contentType + "," + encodeURIComponent(JSON.stringify(setting));
		a.target = "_blank";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	handleExportMicroscopeImage(microscope, img /*, dataUrl*/) {
		//console.log("im here");
		let filename2 = `${microscope.Name}.png`;
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.download = filename2;
		// a.href = img
		// 	.toDataURL("image/png")
		// 	.replace("image/png", "image/octet-stream");
		//let dataUrl = toDataUrl()
		//console.log(img);
		a.href = img.toDataURL();
		//a.href = dataUrl;
		a.target = "_blank";
		a.click();
		document.body.removeChild(a);
	}

	// toDataUrl(src, callback, outputFormat, microscope, completeCallback) {
	// 	var img = new Image();
	// 	img.crossOrigin = "Anonymous";
	// 	img.onload = function() {
	// 		var canvas = document.createElement("CANVAS");
	// 		var ctx = canvas.getContext("2d");
	// 		var dataURL;
	// 		canvas.height = this.height;
	// 		canvas.width = this.width;
	// 		ctx.drawImage(this, 0, 0);
	// 		dataURL = canvas.toDataURL(outputFormat);
	// 		callback(microscope, dataURL, completeCallback);
	// 	};
	// 	img.src = src.toDataURL();
	// 	console.log("dataurl1:");
	// 	console.log(img.src);
	// 	if (img.complete || img.complete === undefined) {
	// 		img.src = "data:image/gif;base64,";
	// 		//R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="//
	// 		img.src += src.toDataURL();
	// 	}
	// 	console.log("dataurl2:");
	// 	console.log(img.src);
	// }

	handleSaveMicroscope(item) {
		let validated = true;
		if (!this.state.isMicroscopeValidated) {
			this.setState({
				isMicroscopeValidated: false,
			});
			validated = false;
		}
		if (!this.state.areComponentsValidated) {
			this.setState({
				areComponentsValidated: false,
			});
			validated = false;
		}
		if (!validated) {
			//TODO throw warning instead of stopping validation
			//return;
		}

		let elementData = this.state.elementData;
		let components = [];
		Object.keys(elementData).forEach((item, index) => {
			components[index] = elementData[item];
		});
		let comps = { components };

		let microscope = Object.assign(this.state.microscope, comps);
		microscope.linkedFields = this.state.linkedFields;

		// let node = ReactDOM.findDOMNode(this.canvasRef.current);
		// html2canvas(node, {
		// 	allowTaint: true,
		// 	foreignObjectRendering: true,
		// 	logging: true,
		// 	letterRendering: 1,
		// 	useCORS: true,
		// }).then((canvas) => {
		// 	//var myImage = canvas.toDataURL("image/png");
		// 	//window.open(myImage);
		// 	//document.body.appendChild(canvas);
		// 	if (item.startsWith("Save microscope")) {
		// 		console.log(microscope);
		// 		this.props.onSaveMicroscope(
		// 			microscope,
		// 			this.handleCompleteSaveMicroscope
		// 			//canvas
		// 		);

		// 		// this.toDataUrl(
		// 		// 	canvas,
		// 		// 	this.props.onSaveMicroscope,
		// 		// 	"image/png",
		// 		// 	microscope,
		// 		// 	this.handleCompleteSaveMicroscope
		// 		// );
		// 	} else if (item.startsWith("Export microscope")) {
		// 		this.handleExportMicroscope(microscope);
		// 	} else if (item.startsWith("Export image")) {
		// 		this.handleExportMicroscopeImage(microscope, canvas);
		// 		// this.toDataUrl(
		// 		// 	canvas,
		// 		// 	this.handleExportMicroscopeImage,
		// 		// 	"image/png",
		// 		// 	microscope
		// 		// );
		// 	}
		// 	//document.body.removeChild(canvas);
		// });

		if (item.startsWith("Save microscope")) {
			console.log(microscope);
			this.props.onSaveMicroscope(
				microscope,
				this.handleCompleteSaveMicroscope
			);
		} else if (item.startsWith("Export microscope")) {
			this.handleExportMicroscope(microscope);
		}
	}

	handleSaveSetting(item) {
		let validated = true;
		if (!this.state.isSettingValidated) {
			this.setState({
				isSettingValidated: false,
			});
			validated = false;
		}
		if (!this.state.areSettingComponentsValidated) {
			this.setState({
				areSettingComponentsValidated: false,
			});
			validated = false;
		}
		if (!validated) {
			//TODO throw warning instead of stopping validation
			//return;
		}
		let settingData = this.state.settingData;
		// let components = [];
		// Object.keys(settingData).forEach((item, index) => {
		// 	components[index] = settingData[item];
		// });
		//let comps = { components };
		let setting = Object.assign(this.state.setting, settingData);

		console.log("setting");
		console.log(setting);
		// let node = ReactDOM.findDOMNode(this.canvasRef.current);
		// html2canvas(node, {
		// 	allowTaint: true,
		// 	foreignObjectRendering: true,
		// 	logging: true,
		// 	letterRendering: 1,
		// 	useCORS: true,
		// }).then((canvas) => {
		// 	if (item.startsWith("Save setting")) {
		// 		this.props.onSaveSetting(setting, this.handleCompleteSaveSetting);
		// 	} else if (item.startsWith("Export setting")) {
		// 		this.handleExportSetting(setting);
		// 	} else if (item.startsWith("Export image")) {
		// 		//TODO
		// 	}
		// });
		if (item.startsWith("Save image setting")) {
			this.props.onSaveSetting(setting, this.handleCompleteSaveSetting);
		} else if (item.startsWith("Export image setting")) {
			this.handleExportSetting(setting);
		}
	}

	handleCompleteSaveMicroscope(micName) {
		//console.log(micName + " saved");
		//WARN Microscope save
		window.alert(micName + " saved");
	}

	handleCompleteSaveSetting(settingName) {
		//console.log(micName + " saved");
		//WARN Microscope save
		window.alert(settingName + " saved");
	}

	onMicroscopeDataSave(id, data) {
		let oldMicroscope = this.state.microscope;
		let oldStand = oldMicroscope.MicroscopeStand;
		let newStand = Object.assign(oldStand, data[this.state.standType]);
		delete data[this.state.standType];
		let newMicroscope = Object.assign(oldMicroscope, data);
		newMicroscope.MicroscopeStand = newStand;

		this.setState({ microscope: newMicroscope, isMicroscopeValidated: true });
		//this.isMicroscopeValidated = true;
	}

	onSettingDataSave(id, data) {
		let oldSetting = this.state.setting;
		let oldPixels = oldSetting.Pixels;
		let newPixels = Object.assign(oldPixels, data.Pixels);
		let newSetting = Object.assign(oldSetting, data);
		newSetting.Pixels = newPixels;
		this.setState({ setting: newSetting, isSettingsValidated: true });
		//this.isMicroscopeValidated = true;
	}

	render() {
		let { imagesPathPNG, imagesPathSVG, width, height } = this.props;
		let typeDimensions = this.state.typeDimensions;
		let schema = this.state.schema;
		let microscope = this.state.microscope;
		let microscopes = this.state.microscopes;
		let elementData = this.state.elementData;
		let setting = this.state.setting;
		let settings = this.state.settings;
		let settingData = this.state.settingData;
		let experimental = this.state.experimental;
		let experimentalData = this.state.experimentalData;
		let linkedFields = this.state.linkedFields;

		let scalingFactor = this.props.scalingFactor;

		width = Math.max(1100, width);
		height = Math.max(600, height - 60 * 2);

		//let canvasWidth = Math.ceil(width * 0.75);
		let canvasWidth = width - 300;
		//let canvasHeight = height - 60 - 60;
		let canvasHeight = height;

		//let toolbarWidth = Math.floor(width * 0.25);
		let toolbarWidth = 300;
		//let toolbarHeight = height - 60 - 60;
		let toolbarHeight = height;

		let settingsWidth = width;

		//let footerWidth = width;
		let headerFooterWidth = width;
		let headerFooterHeight = 60;

		if (schema === null && microscopes === null /*&& microscope === null*/) {
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<DataLoader
						logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
						onClickLoadSchema={this.handleLoadSchema}
						onClickLoadDimensions={this.handleLoadDimensions}
						onClickLoadMicroscopes={this.handleLoadMicroscopes}
						onClickLoadSettings={this.handleLoadSettings}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		if (microscope === null && this.state.isCreatingNewMicroscope === null) {
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopePreLoader
						logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
						tiers={this.props.tiers}
						onClickTierSelection={this.handleActiveTierSelection}
						onClickCreateNewMicroscope={this.setCreateNewMicroscope}
						onClickLoadMicroscope={this.setLoadMicroscope}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		if (
			this.state.isCreatingNewMicroscope === null &&
			microscope !== null &&
			elementData === null
		) {
			const buttonStyle = {
				width: "400px",
				height: "50px",
				padding: "5px",
				margin: "5px",
			};
			const windowExternalContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "100%",
				height: "100%",
				alignItems: "center",
			};
			const windowInternalContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "100%",
				height: "100%",
				alignItems: "center",
			};
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<div style={windowExternalContainer}>
						<div>
							logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
						</div>
						<div style={windowInternalContainer}>
							<Button style={buttonStyle} size="lg">
								{"Loading " + microscope.Name}
							</Button>
						</div>
					</div>
				</MicroscopyMetadataToolContainer>
			);
		}

		if (
			(this.state.isCreatingNewMicroscope || this.state.isLoadingMicroscope) &&
			(microscope === null || elementData === null)
		) {
			let loadingOptions = [];
			//CREATE MULTIPLE ENTRIES FOR DIFFERENT MICROSCOPE
			if (!this.state.isLoadingMicroscope) {
				for (let i = 0; i < current_stands.length; i++) {
					let stand = current_stands[i];
					let name = stand.name;
					let modifiedCreateString = string_createFromScratch.replace(
						"#",
						name
					);
					loadingOptions.push(modifiedCreateString);
				}
			}
			//let loadingOptions = [string_createFromScratch, string_createFromFile];
			loadingOptions.push(string_createFromFile);
			let microscopeNames = {};
			if (microscopes) {
				Object.keys(microscopes).forEach((key) => {
					let mic = microscopes[key];
					if (
						mic.MicroscopeStand !== null &&
						mic.MicroscopeStand !== undefined &&
						mic.MicroscopeStand.Manufacturer !== null &&
						mic.MicroscopeStand.Manufacturer !== undefined
					) {
						let catNames = microscopeNames[mic.MicroscopeStand.Manufacturer];
						if (catNames !== null && catNames !== undefined) catNames.push(key);
						else catNames = [key];
						microscopeNames[mic.MicroscopeStand.Manufacturer] = catNames;
					} else {
						let catNames = microscopeNames["Others"];
						if (catNames !== null && catNames !== undefined) catNames.push(key);
						else catNames = [key];
						microscopeNames["Others"] = catNames;
					}
				});
			}
			if (
				microscopeNames !== null &&
				microscopeNames !== undefined &&
				Object.keys(microscopeNames).length > 0
			)
				loadingOptions.push(string_loadFromRepository);
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
						loadingOptions={loadingOptions}
						microscopes={microscopeNames}
						onFileDrop={this.uploadMicroscopeFromDropzone}
						loadingOption={this.state.loadingOption}
						loadingMode={this.state.loadingMode}
						onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
						onClickMicroscopeSelection={this.selectMicroscopeFromRepository}
						onClickConfirm={this.createOrUseMicroscope}
						onClickBack={this.onClickBack}
						isSettings={this.state.isLoadingMicroscope}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		if (
			!this.state.isCreatingNewMicroscope &&
			this.state.isLoadingImage &&
			this.props.onLoadMetadata !== null &&
			this.props.onLoadMetadata !== undefined
		) {
			console.log("IMAGE LOADER");
			//let modifiedCreateString = string_createFromScratch.replace("# ", "");
			let loadingOptions = [string_noImageLoad, string_createFromFile];
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<ImageLoader
						logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
						loadingOptions={loadingOptions}
						onLoadMetadata={this.props.onLoadMetadata}
						handleLoadMetadataComplete={this.handleLoadMetadataComplete}
						loadingOption={this.state.loadingOption}
						loadingMode={this.state.loadingMode}
						onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
						onClickConfirm={this.createOrUseMetadata}
						onClickBack={this.onClickBack}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		//should be settingData instead of elementData
		if (!this.state.isCreatingNewMicroscope && this.state.isLoadingSettings) {
			console.log("SETTINGS LOADER");
			let modifiedCreateString = string_createFromScratch.replace("# ", "");
			let loadingOptions = [modifiedCreateString, string_createFromFile];
			let settingsNames = [];
			if (settings) {
				let mic_ID = microscope.ID;
				Object.keys(settings).forEach((key) => {
					let sett = settings[key];
					let sett_ID = sett.InstrumentID;
					if (sett_ID === mic_ID) {
						settingsNames.push(key);
					}
				});
			}
			if (
				settingsNames !== null &&
				settingsNames !== undefined &&
				Object.keys(settingsNames).length > 0
			)
				loadingOptions.push(string_loadFromRepository);
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<SettingLoader
						logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
						loadingOptions={loadingOptions}
						settings={settingsNames}
						onFileDrop={this.uploadSettingFromDropzone}
						loadingOption={this.state.loadingOption}
						loadingMode={this.state.loadingMode}
						onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
						onClickSettingsSelection={this.selectSettingFromRepository}
						onClickConfirm={this.createOrUseSetting}
						onClickBack={this.onClickBack}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		const style = {
			display: "flex",
			flexFlow: "row",
			height: height,
		};

		//TODO should be passing these to canvas and toolbar instead of
		// using percentage size inside the component
		let canvasDims = {
			width: canvasWidth,
			height: canvasHeight,
		};

		let settingsMainViewDims = {
			width: settingsWidth,
			height: canvasHeight,
		};

		let toolbarDims = {
			width: toolbarWidth,
			height: toolbarHeight,
		};

		let headerFooterDims = {
			width: headerFooterWidth,
			height: headerFooterHeight,
		};

		let headerOffset = headerFooterHeight;

		let microscopeSchema = this.state.adaptedMicroscopeSchema;
		let microscopeStandSchema = this.state.adaptedMicroscopeStandSchema;
		let componentsSchema = this.state.adaptedComponentsSchema;
		let imageSchema = this.state.adaptedImageSchema;
		let settingsSchema = this.state.adaptedSettingsSchema;
		let experimentalSchema = this.state.adaptedExperimentalSchema;
		let childrenSchema = this.state.adaptedChildrenSchema;

		let pixelsSchema = null;
		for (let i in settingsSchema) {
			let localSchema = settingsSchema[i];
			if (localSchema.ID === "Pixels.json") {
				pixelsSchema = localSchema;
			}
		}

		let footerMicroscopeSchemas = [microscopeSchema, microscopeStandSchema];
		let footerMicroscopeInput = [microscope, microscope.MicroscopeStand];

		let comps = {};
		for (let i in componentsSchema) {
			let localSchema = componentsSchema[i];
			comps[localSchema.ID] = localSchema;
		}

		// console.log("elementData");
		// console.log(elementData);
		// console.log("componentsSchema");
		// console.log(componentsSchema);
		let elementByType = {};
		Object.keys(elementData).forEach(function (key) {
			let element = elementData[key];
			// console.log("element");
			// console.log(element);
			let schemaID = element.Schema_ID.replace(string_json_ext, "");
			let itemSchema = comps[element.Schema_ID];
			// if (itemSchema === null || itemSchema === undefined)
			// 	console.log(element);
			let schemaCategory = itemSchema.category;
			if (
				elementByType[schemaID] === undefined ||
				elementByType[schemaID] === null
			) {
				elementByType[schemaID] = {};
			}
			if (
				elementByType[schemaCategory] === undefined ||
				elementByType[schemaCategory] === null
			) {
				elementByType[schemaCategory] = {};
			}
			elementByType[schemaID][element.ID] = element.Name;
			elementByType[schemaCategory][element.ID] = element.Name;
		});

		if (!this.state.isCreatingNewMicroscope) {
			let footerSettingsSchemas = [imageSchema, pixelsSchema];
			let footerSettingsInput = [setting, setting.Pixels];
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<Header
						dimensions={headerFooterDims}
						logoImg={url.resolve(imagesPathPNG, string_logo_img_no_bk)}
					/>
					<SettingsMainView
						microscope={microscope}
						microscopeComponents={elementData}
						activeTier={this.state.activeTier}
						ref={this.settingsMainViewRef}
						imagesPath={imagesPathSVG}
						settingSchemas={settingsSchema}
						experimentalSchemas={experimentalSchema}
						componentSchemas={componentsSchema}
						setting={setting}
						settingData={settingData}
						experimentalData={experimentalData}
						componentData={elementData}
						linkedFields={linkedFields}
						updateSettingData={this.updateSettingData}
						updateLinkedFields={this.updateLinkedFields}
						overlaysContainer={this.overlaysContainerRef.current}
						areComponentsValidated={this.state.areComponentsValidated}
						dimensions={settingsMainViewDims}
						containerOffsetTop={this.props.containerOffsetTop}
						containerOffsetLeft={this.props.containerOffsetLeft}
						headerOffset={headerOffset}
					/>
					<Footer
						activeTier={this.state.activeTier}
						validationTier={this.state.validationTier}
						componentSchemas={componentsSchema}
						schema={footerSettingsSchemas}
						onFormConfirm={this.onSettingDataSave}
						onClickSave={this.handleSaveSetting}
						onClickBack={this.onClickBack}
						hasSaveOption={this.props.onSaveSetting ? true : false}
						onClickChangeValidation={this.createAdaptedSchemas}
						overlaysContainer={this.overlaysContainerRef.current}
						inputData={footerSettingsInput}
						isSchemaValidated={this.state.isSettingsValidated}
						dimensions={headerFooterDims}
						element={"image settings"}
						formTitle={setting.Name}
						imagesPath={imagesPathSVG}
						elementByType={elementByType}
					/>
				</MicroscopyMetadataToolContainer>
			);
		} else {
			if (this.state.isViewOnly) {
				canvasDims = {
					width: width,
					height: canvasHeight + headerFooterHeight,
				};
				return (
					<MicroscopyMetadataToolContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<Header
							dimensions={headerFooterDims}
							logoImg={url.resolve(imagesPathPNG, string_logo_img_no_bk)}
						/>
						<div style={style}>
							<Canvas
								microscope={microscope}
								stand={microscope.MicroscopeStand}
								activeTier={this.state.activeTier}
								ref={this.canvasRef}
								imagesPath={imagesPathSVG}
								componentSchemas={componentsSchema}
								childrenSchemas={childrenSchema}
								inputData={elementData}
								linkedFields={linkedFields}
								//backgroundImage={`${imagesPath}${microscopeSchema.image}`}
								backgroundImage={url.resolve(
									imagesPathSVG,
									microscopeStandSchema.image
								)}
								updateElementData={this.updateElementData}
								updateLinkedFields={this.updateLinkedFields}
								overlaysContainer={this.overlaysContainerRef.current}
								areComponentsValidated={this.state.areComponentsValidated}
								canvasElementsDimensions={typeDimensions}
								dimensions={canvasDims}
								scalingFactor={scalingFactor}
								containerOffsetTop={this.props.containerOffsetTop}
								containerOffsetLeft={this.props.containerOffsetLeft}
								headerOffset={headerOffset}
								//setScale={this.setMicroscopeScale}
								isViewOnly={this.state.isViewOnly}
							/>
						</div>
					</MicroscopyMetadataToolContainer>
				);
			} else {
				return (
					<MicroscopyMetadataToolContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<Header
							dimensions={headerFooterDims}
							logoImg={url.resolve(imagesPathPNG, string_logo_img_no_bk)}
						/>
						<div style={style}>
							<Canvas
								microscope={microscope}
								stand={microscope.MicroscopeStand}
								activeTier={this.state.activeTier}
								ref={this.canvasRef}
								imagesPath={imagesPathSVG}
								componentSchemas={componentsSchema}
								childrenSchemas={childrenSchema}
								inputData={elementData}
								linkedFields={linkedFields}
								//backgroundImage={`${imagesPath}${microscopeSchema.image}`}
								backgroundImage={url.resolve(
									imagesPathSVG,
									microscopeStandSchema.image
								)}
								updateElementData={this.updateElementData}
								updateLinkedFields={this.updateLinkedFields}
								overlaysContainer={this.overlaysContainerRef.current}
								areComponentsValidated={this.state.areComponentsValidated}
								canvasElementsDimensions={typeDimensions}
								dimensions={canvasDims}
								scalingFactor={scalingFactor}
								containerOffsetTop={this.props.containerOffsetTop}
								containerOffsetLeft={this.props.containerOffsetLeft}
								headerOffset={headerOffset}
								//setScale={this.setMicroscopeScale}
							/>
							<Toolbar
								activeTier={this.state.activeTier}
								ref={this.toolbarRef}
								imagesPath={imagesPathSVG}
								componentSchemas={componentsSchema}
								dimensions={toolbarDims}
								scalingFactor={scalingFactor}
							/>
						</div>
						<Footer
							activeTier={this.state.activeTier}
							validationTier={this.state.validationTier}
							componentSchemas={componentsSchema}
							schema={footerMicroscopeSchemas}
							onFormConfirm={this.onMicroscopeDataSave}
							onClickSave={this.handleSaveMicroscope}
							onClickBack={this.onClickBack}
							hasSaveOption={this.props.onSaveMicroscope ? true : false}
							onClickChangeValidation={this.createAdaptedSchemas}
							overlaysContainer={this.overlaysContainerRef.current}
							inputData={footerMicroscopeInput}
							isSchemaValidated={this.state.isMicroscopeValidated}
							dimensions={headerFooterDims}
							element={"microscope"}
							formTitle={microscope.Name}
							imagesPath={imagesPathSVG}
							elementByType={elementByType}
						/>
					</MicroscopyMetadataToolContainer>
				);
			}
		}
	}
}

class MicroscopyMetadataToolContainer extends React.PureComponent {
	render() {
		var { height, width, forwardedRef } = this.props;
		var style = { height, width, boxSizing: "border-box" };
		// border-box allows element to account for padding and border
		// when calculating/using `height` and `width` style properties.
		return (
			<div id="microscopy-app-container" style={style}>
				{this.props.children}
				<div id="microscopy-app-overlays-container" ref={forwardedRef} />
			</div>
		);
	}
}

MicroscopyMetadataTool.propTypes = {
	//TODO need to be added here and in all subclasses
	height: PropTypes.number,
	width: PropTypes.number,
	schema: PropTypes.arrayOf(PropTypes.object),
	microscopes: PropTypes.object,
	microscope: PropTypes.object,
};

MicroscopyMetadataTool.defaultProps = {
	height: 600,
	width: 600,
	schema: null,
	microscope: null,
	setting: null,
	microscopes: null,
	settings: null,
	//REMEMBER last / is needed for url.resolve to properly handle paths
	imagesPathPNG: "./assets/png/",
	imagesPathSVG: "./assets/svg/",
	dimensionsPath: "./assets/dimension/",
	tiers: ["1", "2", "3"],
	containerOffsetTop: 0,
	containerOffsetLeft: 0,
	scalingFactor: 1,
	onLoadDimensions: function (complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null);
		});
	},
	onLoadSchema: function (complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null);
		});
	},
	onLoadMicroscopes: function (complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null);
		});
	},
	onLoadSettings: function (complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null);
		});
	},
	onSaveMicroscope: function (microscope, complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(microscope.Name);
		});
	},
	onSaveSetting: function (setting, complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(setting.Name);
		});
	},
};
