import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import React from "react";
import Button from "react-bootstrap/Button";

import Header from "./components/header";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";
import SettingsMainView from "./components/settingsMainView";
//import DataLoader from "./components/dataLoader";
import DataLoaderV2 from "./components/dataLoaderV2";
import ModeSelector from "./components/modeSelector";
import TierSelector from "./components/tierSelector";
//import MicroscopePreLoader from "./components/microscopePreLoader";
import MicroscopeLoader from "./components/microscopeLoader";
import MicroscopeLoaderNew from "./components/microscopeLoaderNew";
import SettingLoader from "./components/settingLoader";
import ImageLoader from "./components/imageLoader";
import SettingLoaderNew from "./components/settingLoaderNew";
import ModalWindow from "./components/modalWindow";

import { version as appVersion } from "../package.json";
import { v4 as uuidv4 } from "uuid";
import {
	isDefined,
	verifyAppVersion,
	verifyModelVersion,
	validateMicroscope,
} from "./genericUtilities";

const _ = require("lodash");
const url = require("url");
const validate = require("jsonschema").validate;

import {
	number_logo_width,
	number_logo_height,
	current_stands,
	string_object,
	string_array,
	string_json_ext,
	string_logo_img_no_bk,
	string_logo_img_cell_bk,
	string_logo_img_micro_bk,
	string_help_img,
	string_createFromScratch,
	string_createFromFile,
	string_loadFromRepository,
	string_loadFromHomeFolder,
	string_noImageLoad,
	number_canvas_element_icons_height,
	number_canvas_element_offset_default,
} from "./constants";

export default class MicroMetaAppReact extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			allComponents: [],
			microscope: props.microscope || null,
			setting: props.setting || null,
			originalMicroscope: Object.assign({}, props.microscope) || null,
			originalSetting: Object.assign({}, props.setting) || null,
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
			tierList: null,
			isTierSelected: false,
			activeTier: 1,
			validationTier: 1,
			isCreatingNewMicroscope: props.isCreatingNewMicroscope || null,
			isLoadingMicroscope: props.isLoadingMicroscope || null,
			isLoadingSettings: props.isLoadingSettings || null,
			isLoadingImage: props.isLoadingImage || null,
			micName: null,
			settingName: null,
			elementData: null,
			settingData: null,
			linkedFields: null,
			isMicroscopeValidated: false,
			isSettingValidated: false,
			areComponentsValidated: false,
			areSettingComponentsValidated: false,
			isViewOnly: props.isViewOnly || false,
			standTypes: {},
			standType: null,
			imageMetadata: null,
			isToolbarHidden: props.isToolbarHidden || false,
			is4DNPortal: props.is4DNPortal || false,
			hasImport: props.hasImport || false,
			microscopePresetHandled: false,
			isDataLoaded: false,
			tmpCopyElementFromData: null,
			modelVersion: null,
		};

		for (let i = 0; i < current_stands.length; i++) {
			let stand = current_stands[i];
			let name = stand.name;
			let modifiedCreateString = string_createFromScratch.replace("#", name);
			this.state.standTypes[modifiedCreateString] = name;
		}

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

		this.handleMicPreset = this.handleMicPreset.bind(this);

		this.handleLoadSchema = this.handleLoadSchema.bind(this);
		this.handleCompleteLoadSchema = this.handleCompleteLoadSchema.bind(this);
		this.handleLoadMicroscopes = this.handleLoadMicroscopes.bind(this);
		this.handleCompleteLoadMicroscopes =
			this.handleCompleteLoadMicroscopes.bind(this);
		this.handleLoadSettings = this.handleLoadSettings.bind(this);
		this.handleCompleteLoadSettings =
			this.handleCompleteLoadSettings.bind(this);
		this.handleLoadDimensions = this.handleLoadDimensions.bind(this);
		this.handleCompleteLoadDimensions =
			this.handleCompleteLoadDimensions.bind(this);
		this.handleLoadTierList = this.handleLoadTierList.bind(this);
		this.handleCompleteLoadTierList =
			this.handleCompleteLoadTierList.bind(this);

		this.updateElementData = this.updateElementData.bind(this);
		this.updateLinkedFields = this.updateLinkedFields.bind(this);

		this.updateSettingData = this.updateSettingData.bind(this);
		this.onMicroscopeDataSave = this.onMicroscopeDataSave.bind(this);
		this.onSettingDataSave = this.onSettingDataSave.bind(this);

		this.handleActiveTierSelection = this.handleActiveTierSelection.bind(this);
		this.setCreateNewMicroscope = this.setCreateNewMicroscope.bind(this);
		this.setLoadMicroscope = this.setLoadMicroscope.bind(this);

		// this.handleConfirmComponent = this.handleConfirmComponent.bind(this);
		this.clearAllComponents = this.clearAllComponents.bind(this);

		// this.uploadMicroscopeFromDropzone =
		// 	this.uploadMicroscopeFromDropzone.bind(this);
		//this.uploadSettingFromDropzone = this.uploadSettingFromDropzone.bind(this);
		// this.handleLoadMetadataComplete =
		// 	this.handleLoadMetadataComplete.bind(this);

		// this.handleLoadingOptionSelection =
		// 	this.handleLoadingOptionSelection.bind(this);
		// this.selectMicroscopeFromRepository =
		// 	this.selectMicroscopeFromRepository.bind(this);
		// this.selectSettingFromRepository =
		// 	this.selectSettingFromRepository.bind(this);

		this.applyPreviousVersionModificationToMicroscope =
			this.applyPreviousVersionModificationToMicroscope.bind(this);
		this.applyPreviousModelVersionModificationToMicroscope =
			this.applyPreviousModelVersionModificationToMicroscope.bind(this);
		this.applyPreviousAppVersionModificationToMicroscope =
			this.applyPreviousAppVersionModificationToMicroscope.bind(this);
		this.applyPreviousVersionModificationToSetting =
			this.applyPreviousVersionModificationToSetting.bind(this);
		this.applyPreviousModelVersionModificationToSetting =
			this.applyPreviousModelVersionModificationToSetting.bind(this);
		this.applyPreviousAppVersionModificationToSetting =
			this.applyPreviousAppVersionModificationToSetting.bind(this);

		this.createOrUseMicroscope = this.createOrUseMicroscope.bind(this);
		this.createNewMicroscopeFromScratch =
			this.createNewMicroscopeFromScratch.bind(this);
		this.createOrUseMicroscopeFromDroppedFile =
			this.createOrUseMicroscopeFromDroppedFile.bind(this);
		this.createOrUseMicroscopeFromSelectedFile =
			this.createOrUseMicroscopeFromSelectedFile.bind(this);
		//this.setMicroscopeScale = this.setMicroscopeScale.bind(this);

		this.createOrUseSetting = this.createOrUseSetting.bind(this);
		this.createNewSettingFromScratch =
			this.createNewSettingFromScratch.bind(this);
		this.createOrUseSettingFromDroppedFile =
			this.createOrUseSettingFromDroppedFile.bind(this);
		this.createOrUseSettingFromSelectedFile =
			this.createOrUseSettingFromSelectedFile.bind(this);

		//this.createOrUseMetadata = this.createOrUseMetadata.bind(this);

		this.onClickHome = this.onClickHome.bind(this);
		this.onClickParentHome = this.onClickParentHome.bind(this);

		this.createAdaptedSchemas = this.createAdaptedSchemas.bind(this);
		this.createAdaptedSchema = this.createAdaptedSchema.bind(this);

		this.handleExportMicroscope = this.handleExportMicroscope.bind(this);
		this.handleExportSetting = this.handleExportSetting.bind(this);
		this.handleExportMicroscopeImage =
			this.handleExportMicroscopeImage.bind(this);

		this.handleSaveComponent = this.handleSaveComponent.bind(this);

		this.handleSaveMicroscope = this.handleSaveMicroscope.bind(this);
		this.handleSaveSetting = this.handleSaveSetting.bind(this);

		this.handleCompleteSave = this.handleCompleteSave.bind(this);
		this.handleCompleteSaveAllComponents = this.handleCompleteSaveAllComponents.bind(this);
		this.handleCompleteExport = this.handleCompleteExport.bind(this);

		this.handleMicroscopePreset = this.handleMicroscopePreset.bind(this);

		this.onHideToolbar = this.onHideToolbar.bind(this);
		//this.toDataUrl = this.toDataUrl.bind(this);

		this.onSpecialImporterBack = this.onSpecialImporterBack.bind(this);
		this.onSpecialImporterConfirm = this.onSpecialImporterConfirm.bind(this);
		this.simulateClickLoadMicroscopeFromPortal =
			this.simulateClickLoadMicroscopeFromPortal.bind(this);
		this.simulateClickHardwareModeFromPortal =
			this.simulateClickHardwareModeFromPortal.bind(this);
		this.loadMicroscopeFromPortal = this.loadMicroscopeFromPortal.bind(this);

		this.setDataLoaded = this.setDataLoaded.bind(this);

		this.onCopy = this.onCopy.bind(this);
		this.onPaste = this.onPaste.bind(this);

		// Set up API
		const { public: api /*, destroy: apiDestroy, publish: apiPublish*/ } =
			createApi(this);
		this.api = api;
	}

	static getDerivedStateFromProps(props, state) {
		// if (props.schema !== state.schema && isDefined(props.schema)) {
		// 	return { schema: props.schema };
		// }
		// if (
		// 	props.microscope !== state.microscope &&
		// 	props.microscope !== state.oldMicroscope &&
		// 	isDefined(props.microscope)
		// ) {
		// 	return { microscope: props.microscope };
		// }
		// if (
		// 	props.setting !== state.setting &&
		// 	props.setting !== state.oldSetting &&
		// 	isDefined(props.setting)
		// ) {
		// 	return { setting: props.setting };
		// }
		// if (
		// 	props.imageMetadata !== state.imageMetadata &&
		// 	props.imageMetadata !== state.oldImageMetadata &&
		// 	isDefined(props.imageMetadata)
		// ) {
		// 	return { imageMetadata: props.imageMetadata };
		// }
		// if (
		// 	props.microscopes !== state.microscopes &&
		// 	isDefined(props.microscopes)
		// ) {
		// 	return { microscopes: props.microscopes };
		// }
		// if (props.settings !== state.settings && isDefined(props.settings)) {
		// 	return { settings: props.settings };
		// }
		return null;
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	componentWillUnmount() {
		this.setState({ mounted: false });
	}

	onPaste() {
		let elementData = Object.assign({}, this.state.elementData);
		let newElementData = Object.assign({}, this.state.tmpCopyElementFromData);
		let schemaTitle = newElementData["_TMPCOPYDATA"];
		delete newElementData["_TMPCOPYDATA"];
		let uuid = uuidv4();
		newElementData.Name = `Copy of ${newElementData.Name}`;
		newElementData.ID = uuid;
		newElementData.PositionX = newElementData.PositionX + 20;
		newElementData.PositionY = newElementData.PositionY + 20;
		newElementData.PositionZ = newElementData.PositionZ + 1;
		newElementData.OccupiedSpot = null;
		let id = schemaTitle + "_" + uuid;
		elementData[id] = newElementData;
		this.setState({ elementData: elementData });
	}

	onCopy(elementID) {
		let elementData = this.state.elementData;
		let elementFromData = elementData[elementID];
		let newElementData = Object.assign({}, elementFromData);
		let index = elementID.indexOf("_");
		newElementData["_TMPCOPYDATA"] = elementID.substring(0, index);
		this.setState({ tmpCopyElementFromData: newElementData });
	}

	setDataLoaded() {
		this.setState({ isDataLoaded: true });
	}

	handleLoadDimensions(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.props.onLoadDimensions(this.handleCompleteLoadDimensions, resolve);
			}, 1000)
		);
	}

	handleLoadMicroscopes(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.props.onLoadMicroscopes(
					this.handleCompleteLoadMicroscopes,
					resolve
				);
			}, 1000)
		);
	}

	handleLoadSettings(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.props.onLoadSettings(this.handleCompleteLoadSettings, resolve);
			}, 1000)
		);
	}

	handleLoadTierList(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.props.onLoadTierList(this.handleCompleteLoadTierList, resolve);
			}, 1000)
		);
	}

	handleCompleteLoadDimensions(newDimensions, resolve) {
		this.setState({ dimensions: newDimensions }, resolve());
	}

	handleCompleteLoadMicroscopes(newMicroscopes, resolve) {
		this.setState({ microscopes: newMicroscopes }, resolve());
	}

	handleCompleteLoadSettings(newSettings, resolve) {
		this.setState({ settings: newSettings }, resolve());
	}

	handleCompleteLoadTierList(newTierList, resolve) {
		this.setState({ tierList: newTierList }, resolve());
	}

	handleLoadSchema(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.props.onLoadSchema(this.handleCompleteLoadSchema, resolve);
			}, 1000)
		);
	}

	handleCompleteLoadSchema(newSchema, resolve) {
		let modelVersion = null;
		Object.keys(newSchema).forEach((schemaIndex) => {
			let singleSchema = newSchema[schemaIndex];
			if (singleSchema.title === "Instrument") {
				modelVersion = singleSchema.modelVersion;
			}
		});
		this.setState({ schema: newSchema, modelVersion: modelVersion }, resolve());
	}

	simulateClickLoadMicroscopeFromPortal(loadMicroscopeFromPortalButtonRef) {
		if (loadMicroscopeFromPortalButtonRef === null) return;
		loadMicroscopeFromPortalButtonRef.click();
	}
	simulateClickHardwareModeFromPortal(selectHardwareModeFromPortalButtonRef) {
		if (selectHardwareModeFromPortalButtonRef === null) return;
		selectHardwareModeFromPortalButtonRef.click();
	}

	//Same for settings when its time

	loadMicroscopeFromPortal() {
		if (this.state.is4DNPortal && this.state.isCreatingNewMicroscope) {
			this.handleMicroscopePreset();
		}
	}

	onHideToolbar() {
		let isToolbarHidden = this.state.isToolbarHidden;
		this.setState({ isToolbarHidden: !isToolbarHidden });
	}

	handleMicPreset(e) {
		return new Promise((resolve, reject) =>
			setTimeout(() => {
				this.handleMicroscopePreset(resolve);
			}, 1000)
		);
	}

	//HAVE TO DO THE SAME FOR SETTINGS?
	handleMicroscopePreset(resolve) {
		let microscope = this.state.microscope;
		if (this.props.isDebug) {
			console.log("handleMicroscopePreset");
		}
		let tier = microscope.Tier;
		let vTier = microscope.ValidationTier;

		this.setState(
			{
				activeTier: tier,
				validationTier: vTier,
			},
			() => {
				this.createOrUseMicroscopeFromDroppedFile();
				this.setState({ microscopePresetHandled: true }, () => {
					if (isDefined(resolve)) {
						resolve();
					}
				});
			}
		);
	}

	handleActiveTierSelection(item, name) {
		let tier = Number(item) + 1;
		this.setState({
			isTierSelected: true,
			activeTier: tier,
			validationTier: tier,
			tierName: name,
		});
	}

	setCreateNewMicroscope() {
		this.setState(
			{
				isCreatingNewMicroscope: true,
				isLoadingMicroscope: false,
				isLoadingSettings: false,
				isLoadingImage: false,
			},
			() => {
				if (isDefined(this.props.onModeSelection))
					this.props.onModeSelection(1);
			}
		);
		//this.handleLoadingOptionSelection(createFromScratch);
	}

	setLoadMicroscope() {
		this.setState(
			{
				isCreatingNewMicroscope: false,
				isLoadingMicroscope: true,
				isLoadingSettings: true,
				isLoadingImage: true,
			},
			() => {
				if (isDefined(this.props.onModeSelection))
					this.props.onModeSelection(2);
			}
		);
		//this.handleLoadingOptionSelection(createFromFile);
	}

	// handleLoadingOptionSelection(item) {
	// 	let loadingMode = 0;
	// 	if (item === string_createFromFile) {
	// 		loadingMode = 1;
	// 	} else if (
	// 		item === string_loadFromRepository ||
	// 		item === string_loadFromHomeFolder
	// 	) {
	// 		loadingMode = 2;
	// 	}
	// 	this.setState({ loadingOption: item, loadingMode: loadingMode });
	// }

	// selectMicroscopeFromRepository(item) {
	// 	this.setState({ micName: item });
	// }

	// selectSettingFromRepository(item) {
	// 	this.setState({ settingName: item });
	// }

	// uploadMicroscopeFromDropzone(microscope) {
	// 	this.setState({ microscope: microscope });
	// }

	// uploadSettingFromDropzone(setting) {
	// 	this.setState({ setting: setting });
	// }

	// handleLoadMetadataComplete(imageMetadata) {
	// 	this.setState({ imageMetadata: imageMetadata });
	// }

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
				singleSchema.items.required =
					singleSchemaOriginal.items.required.slice(0);
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
			console.log("#1 call to validate");
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
		//console.log("checkScalingFactorAndRescaleIfNeeded");
		let micScalingFactor = 1;
		if (isDefined(modifiedMic.ScalingFactor)) {
			micScalingFactor = modifiedMic.ScalingFactor;
		} else {
			modifiedMic.ScalingFactor = micScalingFactor;
		}
		if (micScalingFactor === scalingFactor) {
			return;
		}

		let reverseScale = 1 / micScalingFactor;
		let newScalingFactor = reverseScale * scalingFactor;

		console.log(
			"rescale from " +
				micScalingFactor +
				" to " +
				scalingFactor +
				" newScalingFactor: " +
				newScalingFactor
		);

		modifiedMic.ScalingFactor = scalingFactor;
		//console.log("SC: " + newScalingFactor);
		for (let key in elementData) {
			let offY = 0;
			let offX = 0;
			let element = elementData[key];
			if (isDefined(element.OccupiedSpot)) {
				offY -= number_canvas_element_icons_height * (1 - newScalingFactor);
			} else {
				offY -= 5 * scalingFactor;
				offX -= 5 * scalingFactor;
			}

			offY -= number_canvas_element_offset_default * (1 - newScalingFactor);

			element.Width *= newScalingFactor;
			element.Height *= newScalingFactor;
			element.PositionX = element.PositionX * newScalingFactor + offX;
			element.PositionY = element.PositionY * newScalingFactor + offY;
		}
	}

	static applyPreviousAppVersionModificationToObj(
		originalObj,
		isUpdateModelVersion,
		isAddModelVersion,
		isAddExtDomCat,
		fieldsToDelete,
		fieldsToNameChange,
		objSchemas,
		objSchemas2
	) {
		let objSchemaID = originalObj.Schema_ID;
		if (objSchemaID === null || objSchemaID === undefined) {
			//NO SCHEMA CASE IN SETTINGS
			return originalObj;
		}
		let obj = Object.assign({}, originalObj);
		let objSchema = objSchemas[objSchemaID];
		if (objSchema === undefined || objSchema === null) {
			objSchema = objSchemas2[objSchemaID];
		}
		if (objSchema !== undefined && objSchema !== null) {
			if (isAddModelVersion || isUpdateModelVersion) {
				if (
					isAddModelVersion &&
					obj.Version !== null &&
					obj.Version !== undefined
				) {
					obj.ModelVersion = obj.Version;
					delete obj.Version;
				} else {
					obj.ModelVersion = objSchema.modelVersion;
				}
			}
			if (isAddExtDomCat) {
				obj.Extension = objSchema.extension;
				obj.Domain = objSchema.domain;
				obj.Category = objSchema.category;
			}
			for (let i = 0; i < fieldsToDelete.length; i++) {
				let toDelete = fieldsToDelete[i];
				let key = toDelete.key;
				let field = toDelete.field;
				if (objSchema.title !== key && objSchema.category !== key) continue;
				delete obj[field];
			}
			for (let i = 0; i < fieldsToNameChange.length; i++) {
				let toNameChange = fieldsToNameChange[i];
				let key = toNameChange.key;
				let field = toNameChange.field;
				let newField = toNameChange.newField;
				if (objSchema.title !== key && objSchema.category !== key) continue;
				let fieldValue = obj[field];
				if (fieldValue !== null && fieldValue !== undefined) {
					obj[newField] = fieldValue;
					delete obj[field];
				}
			}

			if (obj.LightPath !== null && obj.LightPath !== undefined) {
				let newLightPath =
					MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						obj.LightPath,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
				obj.LightPath = newLightPath;
			}
			if (
				obj.ComponentSettings !== null &&
				obj.ComponentSettings !== undefined
			) {
				let compSettings = obj.ComponentSettings;
				if (
					compSettings.LightSource !== null &&
					compSettings.LightSource !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.LightSource,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.LightSource = sett;
				}
				if (
					compSettings.CouplingLens !== null &&
					compSettings.CouplingLens !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.CouplingLens,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.CouplingLens = sett;
				}
				if (
					compSettings.LightSourceCoupling !== null &&
					compSettings.LightSourceCoupling !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.LightSourceCoupling,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.LightSourceCoupling = sett;
				}
				if (
					compSettings.ExcitationFilter !== null &&
					compSettings.ExcitationFilter !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.ExcitationFilter,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.ExcitationFilter = sett;
				}
				if (
					compSettings.Dichroic !== null &&
					compSettings.Dichroic !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.Dichroic,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.Dichroic = sett;
				}
				if (
					compSettings.EmissionFilter !== null &&
					compSettings.EmissionFilter !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.EmissionFilter,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.EmissionFilter = sett;
				}
				if (
					compSettings.RelayLens !== null &&
					compSettings.RelayLens !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.RelayLens,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.RelayLens = sett;
				}
				if (
					compSettings.Detector !== null &&
					compSettings.Detector !== undefined
				) {
					let sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						compSettings.Detector,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
					compSettings.Detector = sett;
				}
				if (
					compSettings.AdditionalSlot_1 !== null &&
					compSettings.AdditionalSlot_1 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_1,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_1 = setts;
				}
				if (
					compSettings.AdditionalSlot_2 !== null &&
					compSettings.AdditionalSlot_2 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_2,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_2 = setts;
				}
				if (
					compSettings.AdditionalSlot_3 !== null &&
					compSettings.AdditionalSlot_3 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_3,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_3 = setts;
				}
				if (
					compSettings.AdditionalSlot_4 !== null &&
					compSettings.AdditionalSlot_4 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_4,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_4 = setts;
				}
				if (
					compSettings.AdditionalSlot_5 !== null &&
					compSettings.AdditionalSlot_5 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_5,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_5 = setts;
				}
				if (
					compSettings.AdditionalSlot_6 !== null &&
					compSettings.AdditionalSlot_6 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_6,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_6 = setts;
				}
				if (
					compSettings.AdditionalSlot_7 !== null &&
					compSettings.AdditionalSlot_7 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_7,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_7 = setts;
				}
				if (
					compSettings.AdditionalSlot_8 !== null &&
					compSettings.AdditionalSlot_8 !== undefined
				) {
					let setts =
						MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
							compSettings.AdditionalSlot_8,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							objSchemas,
							objSchemas2
						);
					compSettings.AdditionalSlot_8 = setts;
				}
			}
			if (obj.Fluorophore !== null && obj.Fluorophore !== undefined) {
				let newFluorophore =
					MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						obj.Fluorophore,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
				obj.Fluorophore = newFluorophore;
			}
			if (obj.ImmersionLiquid !== null && obj.ImmersionLiquid !== undefined) {
				let newImmersionLiquid =
					MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						obj.ImmersionLiquid,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						objSchemas,
						objSchemas2
					);
				obj.ImmersionLiquid = newImmersionLiquid;
			}
		} else {
			console.log(
				"Error: applyPreviousAppVersionModificationToObj : schema not found for " +
					objSchemaID
			);
		}
		return obj;
	}

	static applyPreviousAppVersionModificationToArray(
		originalArray,
		isUpdateModelVersion,
		isAddModelVersion,
		isAddExtDomCat,
		fieldsToDelete,
		fieldsToNameChange,
		objSchemas,
		objSchemas2
	) {
		let newArray = [];
		for (let i = 0; i < originalArray.length; i++) {
			let obj = originalArray[i];
			let newObj = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
				obj,
				isUpdateModelVersion,
				isAddModelVersion,
				isAddExtDomCat,
				fieldsToDelete,
				fieldsToNameChange,
				objSchemas,
				objSchemas2
			);
			newArray[i] = newObj;
		}
		return newArray;
	}

	applyPreviousVersionModificationToSetting(originalSetting) {
		let modifiedSetting = Object.assign({}, originalSetting);
		modifiedSetting =
			this.applyPreviousAppVersionModificationToSetting(modifiedSetting);
		modifiedSetting =
			this.applyPreviousModelVersionModificationToSetting(modifiedSetting);
		return modifiedSetting;
	}

	applyPreviousAppVersionModificationToSetting(originalSetting) {
		let schema = this.state.schema;
		let oldMainVersion = 0;
		let oldSubVersion = 0.44;
		let oldPatchVersion = 0;
		let oldBetaVersion = 1;
		let oldAppVersion = originalSetting.AppVersion;

		if (oldAppVersion === appVersion) return originalSetting;

		if (oldAppVersion !== undefined && oldAppVersion !== null) {
			let oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
			oldMainVersion = Number(oldAppVersionSplit[0]);
			oldSubVersion = Number(oldAppVersionSplit[1]);
			oldPatchVersion = Number(oldAppVersionSplit[2]);
			oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", ""));
		}
		let imageSchema = {};
		let pixelsSchema = {};
		let settingsSchema = {};
		let experimentalSchema = {};
		Object.keys(schema).forEach((schemaIndex) => {
			let singleSchemaOriginal = schema[schemaIndex];
			if (singleSchemaOriginal.title === "Image") {
				imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
			} else if (singleSchemaOriginal.title === "Pixels") {
				pixelsSchema = Object.assign(pixelsSchema, singleSchemaOriginal);
			} else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
				let schemaID = singleSchemaOriginal.ID;
				settingsSchema[schemaID] = singleSchemaOriginal;
			} else if (singleSchemaOriginal.domain === "Experimental") {
				let schemaID = singleSchemaOriginal.ID;
				experimentalSchema[schemaID] = singleSchemaOriginal;
			}
		});
		if (
			originalSetting.AppVersion === null ||
			originalSetting.AppVersion === undefined ||
			originalSetting.AppVersion !== appVersion
		) {
			originalSetting.AppVersion = appVersion;
		}

		let hasModification = false;
		let isUpdateModelVersion = false;
		let isAddModelVersion = false;
		let isAddExtDomCat = false;
		let fieldsToDelete = [];
		let fieldsToNameChange = [];
		if (oldMainVersion === 0 && oldSubVersion < 45) {
			isAddModelVersion = true;
			isAddExtDomCat = true;
			hasModification = true;
		}
		if (oldMainVersion === 0 && oldSubVersion < 46) {
			// isAddModelVersion = false;
			// isAddExtDomCat = false;
			fieldsToDelete = [
				{ key: "Channel", field: "ImagingMethod" },
				{ key: "GenericDetectorSettings", field: "Zoom" },
				{ key: "PointDetectorSettings", field: "Zoom" },
				{ key: "CameraSettings", field: "Zoom" },
				{ key: "LightSourceSettings", field: "Wavelenght" },
			];
			fieldsToNameChange = [
				{
					key: "Channel",
					field: "ImagingMethodTermAccession",
					newField: "IlluminationTypeTermAccession",
				},
				{
					key: "GenericDetectorSettings",
					field: "DigitizerBitDepth",
					newField: "EffectiveBitDepth",
				},
				{
					key: "PointDetectorSettings",
					field: "DigitizerBitDepth",
					newField: "EffectiveBitDepth",
				},
				{
					key: "CameraSettings",
					field: "DigitizerBitDepth",
					newField: "EffectiveBitDepth",
				},
			];
			hasModification = true;
		}

		if (!hasModification) {
			return originalSetting;
		}

		let newSetting = Object.assign({}, originalSetting);
		if (isAddModelVersion) {
			if (newSetting.Version !== null && newSetting.Version !== undefined) {
				newSetting.ModelVersion = newSetting.Version;
				delete newSetting.Version;
			} else {
				newSetting.ModelVersion = imageSchema.modelVersion;
			}
		}
		let originalPixels = originalSetting.Pixels;
		if (originalPixels !== null && originalPixels !== undefined) {
			if (isAddModelVersion) {
				let newPixels = Object.assign({}, originalPixels);
				if (newPixels.Version !== null && newPixels.Version !== undefined) {
					newPixels.ModelVersion = newPixels.Version;
					delete newPixels.Version;
				} else {
					newPixels.ModelVersion = pixelsSchema.modelVersion;
				}
				newSetting.Pixels = newPixels;
			}
		}
		if (
			originalSetting.Planes !== null &&
			originalSetting.Planes !== undefined
		) {
			let newPlanes =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.Planes,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.Planes = newPlanes;
		}
		if (
			originalSetting.Channels !== null &&
			originalSetting.Channels !== undefined
		) {
			let newChannels =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.Channels,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.Channels = newChannels;
		}
		if (
			originalSetting.TIRFSettings !== null &&
			originalSetting.TIRFSettings !== undefined
		) {
			let newTIRFSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.TIRFSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.TIRFSettings = newTIRFSettings;
		}
		if (
			originalSetting.ImagingEnvironment !== null &&
			originalSetting.ImagingEnvironment !== undefined
		) {
			let newImagingEnvironment =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.ImagingEnvironment,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.ImagingEnvironment = newImagingEnvironment;
		}
		if (
			originalSetting.SamplePositioningSettings !== null &&
			originalSetting.SamplePositioningSettings !== undefined
		) {
			let newSamplePositioningSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.SamplePositioningSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.SamplePositioningSettings = newSamplePositioningSettings;
		}
		if (
			originalSetting.MicroscopeTableSettings !== null &&
			originalSetting.MicroscopeTableSettings !== undefined
		) {
			let newMicroscopeTableSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.MicroscopeTableSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.MicroscopeTableSettings = newMicroscopeTableSettings;
		}
		if (
			originalSetting.ObjectiveSettings !== null &&
			originalSetting.ObjectiveSettings !== undefined
		) {
			let originalObjSett = originalSetting.ObjectiveSettings;
			let objSchema = settingsSchema[originalObjSett.Schema_ID];
			let newObjectiveSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
					originalObjSett,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.ObjectiveSettings = newObjectiveSettings;
		}
		if (
			originalSetting.MicroscopeStandSettings !== null &&
			originalSetting.MicroscopeStandSettings !== undefined
		) {
			let newMicroscopeStandSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
					originalSetting.MicroscopeStandSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.MicroscopeStandSettings = newMicroscopeStandSettings;
		}
		return newSetting;
	}

	applyPreviousModelVersionModificationToSetting(originalSetting) {
		let schema = this.state.schema;
		let imageSchema = {};
		let pixelsSchema = {};
		let settingsSchema = {};
		let experimentalSchema = {};
		Object.keys(schema).forEach((schemaIndex) => {
			let singleSchemaOriginal = schema[schemaIndex];
			if (singleSchemaOriginal.title === "Image") {
				imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
			} else if (singleSchemaOriginal.title === "Pixels") {
				pixelsSchema = Object.assign(pixelsSchema, singleSchemaOriginal);
			} else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
				let schemaID = singleSchemaOriginal.ID;
				settingsSchema[schemaID] = singleSchemaOriginal;
			} else if (singleSchemaOriginal.domain === "Experimental") {
				let schemaID = singleSchemaOriginal.ID;
				experimentalSchema[schemaID] = singleSchemaOriginal;
			}
		});
		let hasModification = false;
		let isUpdateModelVersion = true;
		let isAddModelVersion = false;
		let isAddExtDomCat = false;
		let fieldsToDelete = [];
		let fieldsToNameChange = [];

		let newSetting = Object.assign({}, originalSetting);
		if (isUpdateModelVersion) {
			newSetting.ModelVersion = imageSchema.modelVersion;
		}
		let originalPixels = originalSetting.Pixels;
		if (originalPixels !== null && originalPixels !== undefined) {
			if (isUpdateModelVersion) {
				let newPixels = Object.assign({}, originalPixels);
				newPixels.ModelVersion = pixelsSchema.modelVersion;
				newSetting.Pixels = newPixels;
			}
		}
		if (
			originalSetting.Planes !== null &&
			originalSetting.Planes !== undefined
		) {
			let newPlanes =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.Planes,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.Planes = newPlanes;
		}
		if (
			originalSetting.Channels !== null &&
			originalSetting.Channels !== undefined
		) {
			let newChannels =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.Channels,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.Channels = newChannels;
		}
		if (
			originalSetting.TIRFSettings !== null &&
			originalSetting.TIRFSettings !== undefined
		) {
			let newTIRFSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.TIRFSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.TIRFSettings = newTIRFSettings;
		}
		if (
			originalSetting.ImagingEnvironment !== null &&
			originalSetting.ImagingEnvironment !== undefined
		) {
			let newImagingEnvironment =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.ImagingEnvironment,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.ImagingEnvironment = newImagingEnvironment;
		}
		if (
			originalSetting.SamplePositioningSettings !== null &&
			originalSetting.SamplePositioningSettings !== undefined
		) {
			let newSamplePositioningSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.SamplePositioningSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.SamplePositioningSettings = newSamplePositioningSettings;
		}
		if (
			originalSetting.MicroscopeTableSettings !== null &&
			originalSetting.MicroscopeTableSettings !== undefined
		) {
			let newMicroscopeTableSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalSetting.MicroscopeTableSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.MicroscopeTableSettings = newMicroscopeTableSettings;
		}
		if (
			originalSetting.ObjectiveSettings !== null &&
			originalSetting.ObjectiveSettings !== undefined
		) {
			let originalObjSett = originalSetting.ObjectiveSettings;
			let objSchema = settingsSchema[originalObjSett.Schema_ID];
			let newObjectiveSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
					originalObjSett,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.ObjectiveSettings = newObjectiveSettings;
		}
		if (
			originalSetting.MicroscopeStandSettings !== null &&
			originalSetting.MicroscopeStandSettings !== undefined
		) {
			let newMicroscopeStandSettings =
				MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
					originalSetting.MicroscopeStandSettings,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					settingsSchema,
					experimentalSchema
				);
			newSetting.MicroscopeStandSettings = newMicroscopeStandSettings;
		}
		return newSetting;
	}

	applyPreviousVersionModificationToMicroscope(originalMicroscope) {
		if (this.state.isLoadingMicroscope) return originalMicroscope;
		let modifiedMic = Object.assign({}, originalMicroscope);
		let originalMicVersion = modifiedMic.ModelVersion;
		modifiedMic =
			this.applyPreviousAppVersionModificationToMicroscope(modifiedMic);
		modifiedMic =
			this.applyPreviousModelVersionModificationToMicroscope(modifiedMic);
		return modifiedMic;
	}

	applyPreviousAppVersionModificationToMicroscope(originalMicroscope) {
		let schema = this.state.schema;
		let oldMainVersion = 0;
		let oldSubVersion = 0.44;
		let oldPatchVersion = 0;
		let oldBetaVersion = 1;
		let oldAppVersion = originalMicroscope.AppVersion;

		if (oldAppVersion === appVersion) return originalMicroscope;

		if (oldAppVersion !== undefined && oldAppVersion !== null) {
			let oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
			oldMainVersion = Number(oldAppVersionSplit[0]);
			oldSubVersion = Number(oldAppVersionSplit[1]);
			oldPatchVersion = Number(oldAppVersionSplit[2]);
			oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", ""));
		}
		let microscopeSchema = {};
		let microscopeStandSchema = {};
		let componentsSchema = {};
		let experimentalSchema = {};
		let standType = "InvertedMicroscopeStand";
		let originalMicroscopeStand = originalMicroscope.MicroscopeStand;
		if (
			originalMicroscopeStand !== null &&
			originalMicroscopeStand !== undefined
		) {
			standType = originalMicroscopeStand.Schema_ID.replace(".json", "");
		}
		Object.keys(schema).forEach((schemaIndex) => {
			let singleSchemaOriginal = schema[schemaIndex];
			if (singleSchemaOriginal.title === "Instrument") {
				microscopeSchema = Object.assign(
					microscopeSchema,
					singleSchemaOriginal
				);
			} else if (singleSchemaOriginal.title === standType) {
				microscopeStandSchema = Object.assign(
					microscopeStandSchema,
					singleSchemaOriginal
				);
			} else if (
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
		if (
			originalMicroscope.AppVersion === undefined ||
			originalMicroscope.AppVersion === null ||
			originalMicroscope.AppVersion !== appVersion
		) {
			originalMicroscope.AppVersion = appVersion;
		}

		let hasModification = false;
		let isUpdateModelVersion = false;
		let isAddModelVersion = false;
		let isAddExtDomCat = false;
		let fieldsToDelete = [];
		let fieldsToNameChange = [];
		if (oldMainVersion === 0 && oldSubVersion < 45) {
			isAddModelVersion = true;
			isAddExtDomCat = true;
			hasModification = true;
		}
		if (oldMainVersion === 0 && oldSubVersion < 46) {
			// isAddModelVersion = false;
			// isAddExtDomCat = false;
			fieldsToDelete = [
				{ key: "Lens", field: "ObjectDistance" },
				{ key: "Objective", field: "ObjectDistance" },
				{ key: "StandardDichroic", field: "FilterHolderPosition" },
				{ key: "GenericDichroic", field: "FilterHolderPosition" },
				{ key: "SamplePositioning.Stage", field: "RepetabilityUnit" },
				{ key: "SamplePositioning.Stage", field: "Repetability" },
				{ key: "SamplePositioning.Stage", field: "SettingTime" },
				{ key: "SamplePositioning.Focusing", field: "RepetabilityUnit" },
				{ key: "SamplePositioning.Focusing", field: "Repetability" },
				{ key: "SamplePositioning.Focusing", field: "SettingTime" },
			];
			fieldsToNameChange = [
				{
					key: "Fluorescence_LightSource",
					field: "PowerMode",
					newField: "IlluminationPowerReportingStatistic",
				},
				{
					key: "Transmitted_LightSource",
					field: "PowerMode",
					newField: "IlluminationPowerReportingStatistic",
				},
				{ key: "Lens", field: "Type", newField: "Shape" },
				{
					key: "SamplePositioning.Stage",
					field: "ZRepetability",
					newField: "ZRepeatability",
				},
				{
					key: "SamplePositioning.Stage",
					field: "ZRepetabilityUnit",
					newField: "ZRepeatabilityUnit",
				},
				{
					key: "SamplePositioning.Stage",
					field: "XYRepetability",
					newField: "XYRepeatability",
				},
				{
					key: "SamplePositioning.Stage",
					field: "XYRepetabilityUnit",
					newField: "XYRepeatabilityUnit",
				},
				{
					key: "SamplePositioning.Focusing",
					field: "ZRepetability",
					newField: "ZRepeatability",
				},
				{
					key: "SamplePositioning.Focusing",
					field: "ZRepetabilityUnit",
					newField: "ZRepeatabilityUnit",
				},
			];
			hasModification = true;
		}

		if (!hasModification) {
			return originalMicroscope;
		}

		let newMicroscope = Object.assign({}, originalMicroscope);

		if (isAddModelVersion) {
			if (
				newMicroscope.Version !== null &&
				newMicroscope.Version !== undefined
			) {
				newMicroscope.ModelVersion = newMicroscope.Version;
				delete newMicroscope.Version;
			} else {
				newMicroscope.ModelVersion = microscopeSchema.modelVersion;
			}
		}
		if (
			originalMicroscopeStand !== null &&
			originalMicroscopeStand !== undefined
		) {
			let newMicroscopeStand = Object.assign({}, originalMicroscopeStand);
			if (isAddModelVersion) {
				if (
					newMicroscopeStand.Version !== null &&
					newMicroscopeStand.Version !== undefined
				) {
					newMicroscopeStand.ModelVersion = newMicroscopeStand.Version;
					delete newMicroscopeStand.Version;
				} else {
					newMicroscopeStand.ModelVersion = microscopeStandSchema.modelVersion;
				}
			}
			newMicroscope.MicroscopeStand = newMicroscopeStand;
		}
		if (
			originalMicroscope.components !== null &&
			originalMicroscope.components !== undefined
		) {
			let newComponents =
				MicroMetaAppReact.applyPreviousAppVersionModificationToArray(
					originalMicroscope.components,
					isUpdateModelVersion,
					isAddModelVersion,
					isAddExtDomCat,
					fieldsToDelete,
					fieldsToNameChange,
					componentsSchema,
					experimentalSchema
				);
			newMicroscope.components = newComponents;
		}

		return newMicroscope;
	}

	applyPreviousModelVersionModificationToMicroscope(originalMicroscope) {
		let schema = this.state.schema;
		let microscopeSchema = {};
		let microscopeStandSchema = {};
		//In theory these should never be needed because settings shouldn't be re-edited
		//let imageSchema = {};
		//let settingsSchema = {};
		let componentsSchema = {};
		let experimentalSchema = {};
		let standType = "InvertedMicroscopeStand";
		let originalMicroscopeStand = originalMicroscope.MicroscopeStand;
		if (
			originalMicroscopeStand !== null &&
			originalMicroscopeStand !== undefined
		) {
			standType = originalMicroscopeStand.Schema_ID.replace(".json", "");
		}
		Object.keys(schema).forEach((schemaIndex) => {
			let singleSchemaOriginal = schema[schemaIndex];
			if (singleSchemaOriginal.title === "Instrument") {
				microscopeSchema = Object.assign(
					microscopeSchema,
					singleSchemaOriginal
				);
			} else if (singleSchemaOriginal.title === standType) {
				microscopeStandSchema = Object.assign(
					microscopeStandSchema,
					singleSchemaOriginal
				);
			} else if (
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

		let oldMicModelVersion = originalMicroscope.ModelVersion;
		let oldMicModelVersionString = oldMicModelVersion.split(".").join(""); //oldVersion.replaceAll(".", "");
		let oldMicModelVersionNumber = Number(oldMicModelVersionString);

		let newMicroscope = Object.assign({}, originalMicroscope);

		if (originalMicroscope.ModelVersion !== microscopeSchema.modelVersion) {
			newMicroscope.ModelVersion = microscopeSchema.modelVersion;
		}
		if (
			originalMicroscopeStand !== undefined &&
			originalMicroscopeStand !== null &&
			originalMicroscopeStand.ModelVersion !==
				microscopeStandSchema.modelVersion
		) {
			newMicroscope.MicroscopeStand.ModelVersion =
				microscopeStandSchema.modelVersion;
		}

		// console.log("oldMicModelVersionNumber");
		// console.log(oldMicModelVersionNumber);

		if (oldMicModelVersionNumber < 2000) {
			console.log("PRE 2.00 MICROSCOPE");
			console.log(originalMicroscope);
			//FIXME me update experimental here?
			//Need to add stand and move fields from microscope to stand
			//Manufacturer, Model, SerialNumber -> CatalogNumber, LotNumber, EyePieceFieldNumber
			let activeTier = this.state.activeTier;
			let uuid2 = uuidv4();
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
				ModelVersion: microscopeStandSchema.modelVersion,
				Manufacturer: originalMicroscope.Manufacturer,
				Model: originalMicroscope.Model,
				CatalogNumber: originalMicroscope.SerialNumber,
				LotNumber: originalMicroscope.LotNumber,
				EyePieceFieldNumber: originalMicroscope.EyePieceFieldNumber,
				SpecsFile: originalMicroscope.SpecsFile,
			};
			newMicroscope.Schema_ID = "Instrument.json";
			console.log("UPDATED MICROSCOPE");
			console.log(newMicroscope);
		}

		let hasModification = false;
		let isUpdateModelVersion = true;
		let isAddModelVersion = false;
		let isAddExtDomCat = false;
		let fieldsToDelete = [];
		let fieldsToNameChange = [];

		if (
			originalMicroscope.components !== null &&
			originalMicroscope.components !== undefined
		) {
			let newComponents = [];
			for (let i = 0; i < originalMicroscope.components.length; i++) {
				let comp = Object.assign({}, originalMicroscope.components[i]);
				let compSchemaID = comp.Schema_ID;
				let compSchema = componentsSchema[compSchemaID];
				if (
					compSchema !== undefined &&
					compSchema !== null &&
					comp.ModelVersion !== compSchema.modelVersion
				) {
					comp = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
						comp,
						isUpdateModelVersion,
						isAddModelVersion,
						isAddExtDomCat,
						fieldsToDelete,
						fieldsToNameChange,
						componentsSchema,
						experimentalSchema
					);
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
						comp = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(
							comp,
							isUpdateModelVersion,
							isAddModelVersion,
							isAddExtDomCat,
							fieldsToDelete,
							fieldsToNameChange,
							componentsSchema,
							experimentalSchema
						);
					}
				}
				newComponents[i] = comp;
			}
			newMicroscope.components = newComponents;
		}

		return newMicroscope;
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
			ModelVersion: microscopeSchema.modelVersion,
			AppVersion: appVersion,
			Extension: microscopeSchema.extension,
			Domain: microscopeSchema.domain,
			Category: microscopeSchema.category,
			ScalingFactor: this.props.scalingFactor,
		};
		let uuid2 = uuidv4();
		microscope.MicroscopeStand = {
			Name: `New ${microscopeStandSchema.title}`,
			Schema_ID: microscopeStandSchema.ID,
			ID: uuid2,
			Tier: microscopeStandSchema.tier,
			ModelVersion: microscopeStandSchema.modelVersion,
			Extension: microscopeStandSchema.extension,
			Domain: microscopeStandSchema.domain,
			Category: microscopeStandSchema.category,
		};
		this.setState({
			microscope: microscope,
			elementData: {},
			validationTier: microscope.ValidationTier,
			typeDimensions: typeDimensions,
			standType: standType,
		});
	}

	createOrUseMicroscopeFromDroppedFile(resolve) {
		//console.log("createOrUseMicroscopeFromDroppedFile - 1");
		let modifiedMic = this.state.microscope;
		let activeTier = this.state.activeTier;
		if (activeTier !== modifiedMic.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.Tier = activeTier;
		}
		if (modifiedMic.ValidationTier > activeTier) {
			modifiedMic.ValidationTier = activeTier;
		}
		modifiedMic =
			this.applyPreviousVersionModificationToMicroscope(modifiedMic);
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

		let components = modifiedMic.components;
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
		console.log("#2 call to validate");
		let validationMicroscope = validate(modifiedMic, microscopeSchema);
		let validatedMicroscope = validationMicroscope.valid;
		console.log("#3 call to validate");
		let validationStand = validate(
			modifiedMic.MicroscopeStand,
			microscopeStandSchema
		);
		let validatedStand = validationStand.valid;
		let validated = validatedMicroscope && validatedStand;
		MicroMetaAppReact.checkScalingFactorAndRescaleIfNeeded(
			modifiedMic,
			newElementData,
			this.props.scalingFactor
		);
		//console.log("createOrUseMicroscopeFromDroppedFile - 2");
		this.setState(
			{
				microscope: modifiedMic,
				setting: null,
				elementData: newElementData,
				settingData: null,
				linkedFields: linkedFields,
				validationTier: modifiedMic.ValidationTier,
				isMicroscopeValidated: validated,
				typeDimensions: typeDimensions,
				standType: standType,
				isSpecialImporterActive: false,
			},
			() => {
				if (isDefined(resolve)) {
					//console.log("createOrUseMicroscopeFromDroppedFile - callback");
					resolve();
				}
			}
		);
	}

	createOrUseMicroscopeFromSelectedFile(resolve) {
		let modifiedMic = this.state.microscopes[this.state.micName].microscope;
		let activeTier = this.state.activeTier;
		if (activeTier !== modifiedMic.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.Tier = activeTier;
		}

		if (modifiedMic.ValidationTier > activeTier) {
			modifiedMic.ValidationTier = activeTier;
		}
		modifiedMic =
			this.applyPreviousVersionModificationToMicroscope(modifiedMic);
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

		let components = modifiedMic.components;
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
		console.log("#4 call to validate");
		let validationMicroscope = validate(modifiedMic, microscopeSchema);
		let validatedMicroscope = validationMicroscope.valid;
		console.log("#5 call to validate");
		let validationStand = validate(
			modifiedMic.MicroscopeStand,
			microscopeStandSchema
		);
		let validatedStand = validationStand.valid;
		let validated = validatedMicroscope && validatedStand;
		MicroMetaAppReact.checkScalingFactorAndRescaleIfNeeded(
			modifiedMic,
			newElementData,
			this.props.scalingFactor
		);
		this.setState(
			{
				microscope: modifiedMic,
				setting: null,
				elementData: newElementData,
				settingData: null,
				linkedFields: linkedFields,
				validationTier: modifiedMic.ValidationTier,
				isMicroscopeValidated: validated,
				typeDimensions: typeDimensions,
				standType: standType,
			},
			() => {
				if (isDefined(resolve)) {
					resolve();
				}
			}
		);
	}

	createOrUseMicroscope(loadingOption, filename, newMicroscope, resolve) {
		let isCreateNewScratch = false;
		let standType = null;
		for (let typeString in this.state.standTypes) {
			if (loadingOption === typeString) {
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
		let isLoadingMicroscope = this.state.isLoadingMicroscope;
		let microscope = newMicroscope;
		let microscopes = this.state.microscopes;
		if (
			!isCreateNewScratch &&
			loadingOption !== string_createFromFile &&
			isDefined(microscopes)
		) {
			microscope = this.state.microscopes[filename].microscope;
			if (isDefined(this.props.onLoadMicroscope)) {
				let id = this.state.microscopes[filename].id;
				if (isDefined(id)) {
					this.props.onLoadMicroscope(id);
				} else {
					this.props.onLoadMicroscope(-1);
				}
			}
		} else if (isDefined(this.onLoadMicroscope)) {
			this.props.onLoadMicroscope(-1);
		}
		if (isDefined(microscope)) {
			if (isLoadingMicroscope) {
				if (!verifyAppVersion(microscope)) {
					window.alert(
						"The Microscope file you are trying to use was saved with a previous version of Micro-Meta App. To avoid errors, before proceeding please go back to the Manage Instrument section of the App and save this file again."
					);
					return;
				}
			} else {
				if (!verifyModelVersion(microscope, this.state.modelVersion)) {
					window.alert(
						"The Microscope file you are trying to use was saved with a more recent model version. You have to open it using a matching version of Micro-Meta App."
					);
					return;
				}
			}
		}
		this.setState(
			{
				micName: filename,
				microscope: microscope,
				originalMicroscope: Object.assign({}, microscope),
			},
			() => {
				if (isCreateNewScratch) {
					this.createNewMicroscopeFromScratch(standType);
				} else if (loadingOption === string_createFromFile) {
					this.createOrUseMicroscopeFromDroppedFile(resolve);
				} else {
					this.createOrUseMicroscopeFromSelectedFile(resolve);
				}
			}
		);
	}

	createNewSettingFromScratch(resolve) {
		let imageMetadata = this.state.imageMetadata;
		let microscope = this.state.microscope;
		let standType = microscope.MicroscopeStand.Schema_ID.replace(".json", "");
		let typeDimensions = this.state.dimensions[standType];
		let uuid = uuidv4();
		let uuid2 = uuidv4();
		let uuid3 = uuidv4();
		let activeTier = this.state.activeTier;
		let adaptedSchemas = this.createAdaptedSchemas(activeTier, standType);
		let imageSchema = adaptedSchemas[3];
		let settingsSchema = adaptedSchemas[4];

		//console.log(settingsSchema);
		let pixelsSchema = null;
		let planeSchema = null;
		let channelSchema = null;
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
			ModelVersion: imageSchema.modelVersion,
			AppVersion: appVersion,
			InstrumentName: microscope.Name,
			InstrumentID: microscope.ID,
			Extension: imageSchema.extension,
			Domain: imageSchema.domain,
			Category: imageSchema.category,
		};
		let pixels = {
			Name: `New ${pixelsSchema.title}`,
			Schema_ID: pixelsSchema.ID,
			ID: uuid2,
			Tier: activeTier,
			ModelVersion: pixelsSchema.modelVersion,
			Extension: pixelsSchema.extension,
			Domain: pixelsSchema.domain,
			Category: pixelsSchema.category,
		};

		let mergedSettings = null;
		if (imageMetadata !== null && imageMetadata !== undefined) {
			let newImageMetadata = Object.assign({}, imageMetadata);
			delete newImageMetadata.ImagingEnvironment;
			delete newImageMetadata.MicroscopeStandSettings;
			delete newImageMetadata.MicroscopeStandSettings;
			delete newImageMetadata.MicroscopeTableSettings;
			delete newImageMetadata.ObjectiveSettings;
			delete newImageMetadata.SamplePositioningSettings;
			delete newImageMetadata.Channels;
			delete newImageMetadata.Planes;
			delete newImageMetadata.Experiment;
			delete newImageMetadata.TIRFSettings;

			mergedSettings = Object.assign({}, setting, newImageMetadata);
			let mergedPixels = Object.assign({}, pixels, newImageMetadata.Pixels);
			mergedSettings.Pixels = mergedPixels;
		} else {
			mergedSettings = setting;
			mergedSettings.Pixels = pixels;
		}

		let newSettingData = {};
		// let imgEnv = mergedSettings.ImagingEnvironment;
		// if (imgEnv !== null && imgEnv !== undefined)
		// 	newSettingData.ImagingEnvironment = imgEnv;
		// let micStandSet = mergedSettings.MicroscopeStandSettings;
		// if (micStandSet !== null && micStandSet !== undefined)
		// 	newSettingData.MicroscopeStandSettings = micStandSet;
		// let micTableSet = mergedSettings.MicroscopeTableSettings;
		// if (micTableSet !== null && micTableSet !== undefined)
		// 	newSettingData.MicroscopeTableSettings = micTableSet;
		// let objSet = mergedSettings.ObjectiveSettings;
		// if (objSet !== null && objSet !== undefined)
		// 	newSettingData.ObjectiveSettings = objSet;
		// let samPosSet = mergedSettings.SamplePositioningSettings;
		// if (samPosSet !== null && samPosSet !== undefined)
		// 	newSettingData.SamplePositioningSettings = samPosSet;
		// let channels = mergedSettings.Channels;
		// if (channels !== null && channels !== undefined)
		// 	newSettingData.Channels = channels;
		// let planes = mergedSettings.Planes;
		// if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
		// let exp = mergedSettings.Experiment;
		// if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
		// let tirf = mergedSettings.TIRFSettings;
		// if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf;

		let validationSetting = validate(mergedSettings, imageSchema);
		let validatedSetting = validationSetting.valid;
		let validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
		let validatedPixels = validationPixels.valid;
		let validated = validatedSetting && validatedPixels;
		this.setState(
			{
				setting: mergedSettings,
				settingData: newSettingData,
				validationTier: setting.ValidationTier,
				typeDimensions: typeDimensions,
				standType: standType,
				isSettingValidated: validated,
				isLoadingSettings: false,
			},
			() => {
				if (isDefined(resolve)) resolve();
			}
		);
	}

	createOrUseSettingFromDroppedFile(resolve) {
		let imageMetadata = this.state.imageMetadata;
		let microscope = this.state.microscope;
		let modifiedSetting = this.state.setting;
		let activeTier = this.state.activeTier;
		if (activeTier !== this.state.microscope.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedSetting.Tier = activeTier;
		}
		if (modifiedSetting.ValidationTier > activeTier) {
			modifiedSetting.ValidationTier = activeTier;
		}
		modifiedSetting.InstrumentID = microscope.ID;
		modifiedSetting.InstrumentName = microscope.Name;

		modifiedSetting =
			this.applyPreviousVersionModificationToSetting(modifiedSetting);
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
			let newImageMetadata = Object.assign({}, imageMetadata);
			delete newImageMetadata.ImagingEnvironment;
			delete newImageMetadata.MicroscopeStandSettings;
			delete newImageMetadata.MicroscopeStandSettings;
			delete newImageMetadata.MicroscopeTableSettings;
			delete newImageMetadata.ObjectiveSettings;
			delete newImageMetadata.SamplePositioningSettings;
			delete newImageMetadata.Channels;
			delete newImageMetadata.Planes;
			delete newImageMetadata.Experiment;
			delete newImageMetadata.TIRFSettings;

			mergedSettings = Object.assign({}, newImageMetadata, modifiedSetting);
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
		this.setState(
			{
				setting: mergedSettings,
				settingData: newSettingData,
				validationTier: mergedSettings.ValidationTier,
				isSettingValidated: validated,
				isLoadingSettings: false,
			},
			() => {
				if (isDefined(resolve)) resolve();
			}
		);
	}

	createOrUseSettingFromSelectedFile(resolve) {
		let imageMetadata = this.state.imageMetadata;
		let microscope = this.state.microscope;
		if (this.props.isDebug) {
			console.log("settings");
			console.log(this.state.settings);
			console.log("settingName");
			console.log(this.state.settingName);
		}
		let setting = this.state.settings[this.state.settingName].setting;
		let modifiedSetting = setting;
		let activeTier = this.state.activeTier;
		if (activeTier !== microscope.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedSetting.Tier = activeTier;
		}
		if (modifiedSetting.ValidationTier > activeTier) {
			modifiedSetting.ValidationTier = activeTier;
		}
		modifiedSetting.InstrumentID = microscope.ID;
		modifiedSetting.InstrumentName = microscope.Name;

		modifiedSetting =
			this.applyPreviousVersionModificationToSetting(modifiedSetting);
		let adaptedSchemas = this.createAdaptedSchemas(
			modifiedSetting.ValidationTier,
			this.state.standType
		);
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

		let mergedSettings = null;
		if (imageMetadata !== null && imageMetadata !== undefined) {
			let newImageMetadata = Object.assign({}, imageMetadata);
			delete newImageMetadata.ImagingEnvironment;
			delete newImageMetadata.MicroscopeStandSettings;
			delete newImageMetadata.MicroscopeStandSettings;
			delete newImageMetadata.MicroscopeTableSettings;
			delete newImageMetadata.ObjectiveSettings;
			delete newImageMetadata.SamplePositioningSettings;
			delete newImageMetadata.Channels;
			delete newImageMetadata.Planes;
			delete newImageMetadata.Experiment;
			delete newImageMetadata.TIRFSettings;

			mergedSettings = Object.assign({}, newImageMetadata, modifiedSetting);
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
		this.setState(
			{
				setting: mergedSettings,
				settingData: newSettingData,
				validationTier: mergedSettings.ValidationTier,
				isSettingValidated: validated,
				isLoadingSettings: false,
			},
			() => {
				if (isDefined(resolve)) resolve();
			}
		);
	}

	createOrUseSetting(
		micLoadingOption,
		imgLoadingOption,
		settLoadingOption,
		micFilename,
		newMicroscope,
		settFilename,
		newSetting,
		newMetadata
	) {
		let promiseMicroscope = new Promise((resolve, reject) => {
			this.createOrUseMicroscope(
				micLoadingOption,
				micFilename,
				newMicroscope,
				resolve
			);
		});

		promiseMicroscope.then(() => {
			//console.log("SetSettingState1");
			let imageMetadata = null;
			if (imgLoadingOption !== string_noImageLoad) imageMetadata = newMetadata;
			if (isDefined(imageMetadata)) {
				this.setState({ imageMetadata: imageMetadata });
			}

			//console.log("SetSettingState2");

			let modifiedCreateString = string_createFromScratch.replace("# ", "");
			let setting = newSetting;
			let microscope = this.state.microscope;
			if (
				settLoadingOption !== modifiedCreateString &&
				settLoadingOption !== string_createFromFile
			) {
				setting = this.state.settings[settFilename].setting;
				if (isDefined(this.props.onLoadSetting)) {
					let id = this.state.settings[settFilename].id;
					if (isDefined(id)) {
						this.props.onLoadSetting(id);
					} else {
						this.props.onLoadSetting(-1);
					}
				}
			} else if (isDefined(this.props.onLoadSetting)) {
				this.props.onLoadSetting(-1);
			}

			//console.log("SetSettingState3");
			if (isDefined(setting)) {
				let micID = microscope.ID;
				let micName = microscope.Name;
				let instrumentID = setting.InstrumentID;
				let instrumentName = setting.InstrumentName;
				if (micID !== instrumentID || micName !== instrumentName) {
					if (
						!window.confirm(
							"The unique ID & Name of the Microscope file you have selected do not match those that has been saved in the Settings file you are trying to load. If you continue the Microscope ID and Name stored in the Settings file will be overwritten. Are you sure?"
						)
					) {
						return;
					}
				}
			}
			//console.log("SetSettingState4");
			let promiseSetting = new Promise((resolve, reject) => {
				this.setState(
					{
						settingName: settFilename,
						setting: setting,
						originalSetting: Object.assign({}, setting),
					},
					() => {
						//console.log("SetSettingState-callback");
						if (settLoadingOption === modifiedCreateString) {
							this.createNewSettingFromScratch(resolve);
						} else if (settLoadingOption === string_createFromFile) {
							//console.log("Calling - createOrUseSettingFromDroppedFile");
							this.createOrUseSettingFromDroppedFile(resolve);
						} else {
							this.createOrUseSettingFromSelectedFile(resolve);
						}
					}
				);
			});
			promiseSetting.then(() => {
				this.setState({ isLoadingImage: false });
			});
		});
	}

	// createOrUseMetadata() {
	// 	if (this.state.loadingOption === string_createFromFile) {
	// 		this.setState({
	// 			isLoadingImage: false,
	// 			loadingOption: string_createFromFile,
	// 			loadingMode: 1,
	// 		});
	// 	} else {
	// 		this.setState({
	// 			isLoadingImage: false,
	// 			imageMetadata: null,
	// 			loadingOption: string_createFromFile,
	// 			loadingMode: 1,
	// 		});
	// 	}
	// }

	onSpecialImporterConfirm(loadingOption, filename, newMicroscope) {
		let promiseMicroscope = new Promise((resolve, reject) => {
			this.createOrUseMicroscope(
				loadingOption,
				loadingOption,
				newMicroscope,
				resolve
			);
		});
		promiseMicroscope.then(() => {
			this.setState({
				isSpecialImporterActive: false,
			});
		});
	}

	onSpecialImporterBack() {
		this.setState({
			isSpecialImporterActive: false,
			microscope: this.state.oldMicroscope,
			setting: this.state.oldElementData,
			elementData: this.state.oldElementData,
			settingData: this.state.oldSettingData,
			imageMetadata: this.state.oldImageMetadata,
		});
	}

	onClickHome(item) {
		let isCreatingNewMicroscope = null;
		let isLoadingMicroscope = null;
		let isLoadingImage = null;
		let isLoadingSettings = null;
		let schema = null;
		let isDataLoaded = false;
		if (this.state.is4DNPortal) {
			if (item === "Import") {
				isCreatingNewMicroscope = this.state.isCreatingNewMicroscope;
				isLoadingMicroscope = this.state.isLoadingMicroscope;
				isLoadingImage = this.state.isLoadingImage;
				isLoadingSettings = this.state.isLoadingSettings;
				schema = this.state.schema;
				isDataLoaded = true;
			}
		}
		let oldMicroscope = this.state.microscope;
		let oldElementData = this.state.elementData;
		let oldSetting = this.state.setting;
		let oldSettingData = this.state.settingData;
		let oldImageMetadata = this.state.imageMetadata;
		let oldMicName = this.state.micName;

		//activeTier: 1,
		//validationTier: 1,

		if (this.state.is4DNPortal) {
			if (
				item === "Back to list" &&
				isDefined(this.props.onReturnToMicroscopeList)
			) {
				console.log("Back to list click");
				let originalMicroscope = this.state.originalMicroscope;
				if (!_.isEqual(oldMicroscope, originalMicroscope)) {
					console.log(oldMicroscope);
					console.log(originalMicroscope);
					console.log("Back to list click 2");
					if (
						!window.confirm(
							"You have unsaved changes. Are you sure you want to leave this page?"
						)
					) {
						return;
					}
				}
			}
		}

		console.log("Back to list click 3");
		this.setState(
			{
				microscope: null,
				microscopes: null,
				setting: null,
				settings: null,
				isTierSelected: false,
				isCreatingNewMicroscope: isCreatingNewMicroscope,
				isLoadingMicroscope: isLoadingMicroscope,
				isLoadingImage: isLoadingImage,
				isLoadingSettings: isLoadingSettings,
				micName: null,
				schema: schema,
				elementData: null,
				settingData: null,
				imageMetadata: null,
				isDataLoaded: isDataLoaded,
			},
			() => {
				if (this.state.is4DNPortal) {
					if (
						item === "Back to list" &&
						isDefined(this.props.onReturnToMicroscopeList)
					) {
						this.props.onReturnToMicroscopeList();
					} else if (
						item === "Import" /*&& isDefined(this.props.onImportFromFile*/
					) {
						//this.props.onImportFromFile(this.uploadMicroscopeFromDropzone);
						this.setState({
							isSpecialImporterActive: true,
							oldMicroscope: oldMicroscope,
							oldElementData: oldElementData,
							oldSetting: oldSetting,
							oldSettingData: oldSettingData,
							oldImageMetadata: oldImageMetadata,
						});
					}
				} else if (this.props.isMMEOpen) {
					this.setState({
						microscope: this.props.microscope || null,
					});
				}
				if (isDefined(this.props.onModeSelection)) {
					this.props.onModeSelection(-1);
				}
			}
		);
	}

	onClickParentHome() {
		let isCreatingNewMicroscope = null;
		let isLoadingMicroscope = null;
		let isLoadingImage = null;
		let isLoadingSettings = null;
		let schema = null;
		let isDataLoaded = false;

		let oldMicroscope = this.state.microscope;
		let oldElementData = this.state.elementData;
		let oldSetting = this.state.setting;
		let oldSettingData = this.state.settingData;
		let oldImageMetadata = this.state.imageMetadata;
		let oldMicName = this.state.micName;

		console.log("Back to parent");
		this.setState(
			{
				microscope: null,
				microscopes: null,
				setting: null,
				settings: null,
				isTierSelected: false,
				isCreatingNewMicroscope: isCreatingNewMicroscope,
				isLoadingMicroscope: isLoadingMicroscope,
				isLoadingImage: isLoadingImage,
				isLoadingSettings: isLoadingSettings,
				micName: null,
				schema: schema,
				elementData: null,
				settingData: null,
				imageMetadata: null,
				isDataLoaded: isDataLoaded,
			},
			() => this.props.onClickHome()
		);
	}

	updateElementData(elementData, areComponentsValidated) {
		//console.log(elementData)
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

	handleExportMicroscope(microscope, complete) {
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
		// complete(micName);
	}

	handleExportSetting(setting, complete) {
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
		// 	complete(settingName);
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

	handleSaveComponent(id, consolidatedData, linkedFields) {
		if (this.props.isDebug) {
			console.log("inside handleSaveComponent function");
			console.log("component's id is ", id);
			console.log("this component's linkedFields is: ", linkedFields);
			console.log("this component's consolidatedData is: ", consolidatedData);
			console.log("this is elementData: ", this.state.elementData);
		}

		this.props.onSaveComponent(id, consolidatedData, linkedFields, this.handleCompleteSave, this.state.validationTier);
	}

	handleSaveMicroscope(item) {
		let validated = true;
		if (!this.state.isMicroscopeValidated) {
			validated = false;
		}
		if (!this.state.areComponentsValidated) {
			validated = false;
		}
		if (!validated) {
			console.log("the microscope or at least one component is not valid");
			//TODO throw warning instead of stopping validation
			//return;
		}

		let elementData = this.state.elementData;
		// console.log("!!!! elementData is ", elementData);

		let components = [];
		Object.keys(elementData).forEach((item, index) => {
			components[index] = elementData[item];
		});

		let comps = { components };

		let microscope = Object.assign({}, this.state.microscope, comps);
		microscope.linkedFields = this.state.linkedFields;

		let lowerCaseItem = item.toLowerCase();
		if (lowerCaseItem.includes("save all")){
			// this.props.saveAllComponents(this.state.allComponents, this.handleCompleteSaveAllComponents, this.clearAllComponents, this.state.validationTier);
			this.props.saveAllComponents(elementData, this.handleCompleteSaveAllComponents, this.state.validationTier);
			return;
		}
		else if (lowerCaseItem.includes("as new")) {
			microscope.ID = uuidv4();
			// if (
			// 	microscope.MicroscopeStand !== null &&
			// 	microscope.MicroscopeStand !== undefined
			// ) {
			// 	microscope.MicroscopeStand.ID = uuidv4();
			// }
		}
		
		this.setState({ microscope: microscope });

		if (this.props.isDebug) {
			console.log("save microscope");
			console.log(microscope);
		}
		if (lowerCaseItem.includes("save")) {
			this.props.onSaveMicroscope(microscope, this.handleCompleteSave);
		} else if (lowerCaseItem.includes("export")) {
			this.handleExportMicroscope(microscope, this.handleCompleteExport);
		}
		this.setState({ originalMicroscope: microscope });
	}

	handleSaveSetting(item) {
		let validated = true;
		if (!this.state.isSettingValidated) {
			validated = false;
		}
		if (!this.state.areSettingComponentsValidated) {
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
		let setting = Object.assign({}, this.state.setting, settingData);

		let lowerCaseItem = item.toLowerCase();
		if (lowerCaseItem.includes("as new")) {
			setting.ID = uuidv4();
			if (setting.Pixels !== null && setting.Pixels !== undefined) {
				setting.Pixels.ID = uuidv4();
			}
		}

		this.setState({ setting: setting });

		if (this.props.isDebug) {
			console.log("setting");
			console.log(setting);
		}

		if (lowerCaseItem.includes("save")) {
			this.props.onSaveSetting(setting, this.handleCompleteSave);
		} else if (lowerCaseItem.includes("export")) {
			this.handleExportSetting(setting, this.handleCompleteExport);
		}
		this.setState({ originalSetting: setting });
	}

	// handleConfirmComponent(id, data, linkedFields) {
	// 	this.setState(function (prevState) {
	// 		// Find the index of the component with the given ID in allComponents
	// 		const existingComponentIndex = prevState.allComponents.findIndex(function (component) {
	// 		  return component.id === id;
	// 		});
		
	// 		if (existingComponentIndex === -1) {
	// 		  // If the component doesn't exist, add it to allComponents
	// 		  const newComponents = prevState.allComponents.concat({
	// 			id: id, // Add the component's ID
	// 			consolidatedData: data, // Add the component's data
	// 			linkedFields: linkedFields, // Add the linkedFields
	// 		  });
		
	// 		  console.log("Updated allComponents state:", newComponents);
	// 		  return {
	// 			allComponents: newComponents,
	// 		  };
	// 		} else {
	// 		  // If the component exists, update its data and linkedFields
	// 		  const updatedComponents = prevState.allComponents.slice(); // Create a shallow copy of the array
	// 		  updatedComponents[existingComponentIndex] = {
	// 			id: id, // Retain the component's ID
	// 			consolidatedData: data, // Update the component's data
	// 			linkedFields: linkedFields, // Update the linkedFields
	// 		  };
		
	// 		  console.log("Updated allComponents state:", updatedComponents);
	// 		  return {
	// 			allComponents: updatedComponents,
	// 		  };
	// 		}
	// 	});
	// }

	clearAllComponents() {
		console.log("Clearing allComponents...");
    	this.setState({ allComponents: [] });
	}

	handleCompleteSave(name) {
		//console.log(micName + " saved");
		//WARN Microscope save
		window.alert(name + " saved");
	}

	handleCompleteSaveAllComponents() {
		window.alert("All components saved");
	}

	handleCompleteExport(name) {
		//console.log(micName + " saved");
		//WARN Microscope save
		window.alert(name + " exported");
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
		this.setState({ setting: newSetting, isSettingValidated: true });
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
		let imageMetadata = this.state.imageMetadata;

		let experimental = this.state.experimental;
		let experimentalData = this.state.experimentalData;
		let linkedFields = this.state.linkedFields;

		let scalingFactor = this.props.scalingFactor;

		let headerFooterHeight = 80;
		let headerFooterMargin = 2;

		width = Math.max(800, width);
		height = Math.max(600, height);

		let toolbarWidth = 300;
		if (this.state.isToolbarHidden) {
			toolbarWidth = 50;
		}

		let canvasWidth = width - toolbarWidth;
		let canvasHeight = height - (headerFooterHeight + headerFooterMargin) * 2;
		let toolbarHeight = canvasHeight;

		let settingsWidth = width;

		let headerFooterWidth = width;

		let waitForDataLoad = false;
		if (isDefined(this.props.waitForDataLoad)) {
			waitForDataLoad = this.props.waitForDataLoad;
		}

		if (
			(this.state.isCreatingNewMicroscope == null &&
				this.state.isLoadingMicroscope == null) ||
			waitForDataLoad
		) {
			if (!this.state.is4DNPortal && !this.props.isMMEOpen) {
				return (
					<MicroMetaAppReactContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<ModeSelector
							imagesPathPNG={imagesPathPNG}
							imagesPathSVG={imagesPathSVG}
							// onClickLoadSchema={this.handleLoadSchema}
							// onClickLoadDimensions={this.handleLoadDimensions}
							// onClickLoadMicroscopes={this.handleLoadMicroscopes}
							// onClickLoadSettings={this.handleLoadSettings}
							// onClickLoadTierList={this.handleLoadTierList}
							// onClickHandleMicPreset={this.handleMicPreset}
							onClickCreateNewMicroscope={this.setCreateNewMicroscope}
							onClickLoadMicroscope={this.setLoadMicroscope}
							// is4DNPortal={this.state.is4DNPortal}
							hasSettings={this.props.hasSettings}
							isDebug={this.props.isDebug}
						/>
					</MicroMetaAppReactContainer>
				);
			} else {
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
				let logoImg = url.resolve(imagesPathPNG, string_logo_img_micro_bk);
				let logoPath =
					logoImg +
					(logoImg.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "");
				let styleImageContainer = {
					width: `${number_logo_width}px`,
					height: `${number_logo_height}px`,
				};
				let styleImage = {
					width: "100%",
					height: "100%",
					margin: "auto",
				};
				return (
					<MicroMetaAppReactContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<div style={windowExternalContainer}>
							<div style={windowInternalContainer}>
								<div style={styleImageContainer}>
									<img src={logoPath} alt={logoImg} style={styleImage} />
								</div>
								<Button
									ref={this.simulateClickLoadMicroscopeFromPortal}
									style={buttonStyle}
									size="lg"
									onClick={this.setCreateNewMicroscope}
								>
									{"Manage instrument"}
								</Button>
							</div>
						</div>
					</MicroMetaAppReactContainer>
				);
			}
		}

		if (
			//(this.state.is4DNPortal && !this.state.microscopePresetHandled) ||
			!this.state.isDataLoaded
		) {
			return (
				<MicroMetaAppReactContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<DataLoaderV2
						imagesPathPNG={imagesPathPNG}
						onClickLoadSchema={this.handleLoadSchema}
						onClickLoadDimensions={this.handleLoadDimensions}
						onClickLoadMicroscopes={this.handleLoadMicroscopes}
						onClickLoadSettings={this.handleLoadSettings}
						onClickLoadTierList={this.handleLoadTierList}
						onClickHandleMicPreset={this.handleMicPreset}
						onDataLoaded={this.setDataLoaded}
						is4DNPortal={this.state.is4DNPortal}
						isMMEOpen={this.props.isMMEOpen}
						isDebug={this.props.isDebug}
					/>
				</MicroMetaAppReactContainer>
			);
		}

		// if (microscope === null && this.state.isCreatingNewMicroscope === null) {
		// 	return (
		// 		<MicroMetaAppReactContainer
		// 			width={width}
		// 			height={height}
		// 			forwardedRef={this.overlaysContainerRef}
		// 		>
		// 			<MicroscopePreLoader
		// 				logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
		// 				tiers={this.props.tiers}
		// 				onClickTierSelection={this.handleActiveTierSelection}
		// 				onClickCreateNewMicroscope={this.setCreateNewMicroscope}
		// 				onClickLoadMicroscope={this.setLoadMicroscope}
		// 				hasSettings={this.props.hasSettings}
		// 				isDebug={this.props.isDebug}
		// 			/>
		// 		</MicroMetaAppReactContainer>
		// 	);
		// }

		if (
			!this.state.is4DNPortal &&
			!this.props.isMMEOpen &&
			!this.state.isTierSelected
		) {
			return (
				<MicroMetaAppReactContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<TierSelector
						imagesPathPNG={imagesPathPNG}
						imagesPathSVG={imagesPathSVG}
						tierList={this.state.tierList}
						onClickTierSelection={this.handleActiveTierSelection}
						onClickHome={this.onClickHome}
						isDebug={this.props.isDebug}
						isHardware={this.state.isCreatingNewMicroscope}
					/>
				</MicroMetaAppReactContainer>
			);
		}

		//let overlayImporter = null;
		if (
			this.state.is4DNPortal &&
			(microscope === null ||
				elementData === null ||
				this.state.isSpecialImporterActive)
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
			if (microscope === null || this.state.isSpecialImporterActive) {
				if (this.props.isDebug)
					console.log("4DN Microscope special importer view");
				let creatingOptions = [];
				let loadingOptions = [];
				loadingOptions.push(string_createFromFile);
				return (
					<MicroMetaAppReactContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<MicroscopeLoaderNew
							imagesPathPNG={imagesPathPNG}
							imagesPathSVG={imagesPathSVG}
							title={
								"Import as a Tier " + this.state.activeTier + " Microscope"
							}
							creatingOptions={creatingOptions}
							loadingOptions={loadingOptions}
							modeSelection={string_createFromFile}
							//microscopes={microscopeNames}
							//onFileDrop={this.uploadMicroscopeFromDropzone}
							//onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
							//onClickMicroscopeSelection={this.selectMicroscopeFromRepository}
							onClickConfirm={this.onSpecialImporterConfirm}
							onClickHome={this.onSpecialImporterBack}
							isSettings={this.state.isLoadingMicroscope}
							schema={schema}
							isDebug={this.props.isDebug}
							isImporter={true}
						/>
					</MicroMetaAppReactContainer>
				);
			} else if (microscope !== null && elementData === null) {
				if (this.props.isDebug) {
					console.log("4DN Microscope preset view");
					console.log(microscope);
				}
				let logoImg = url.resolve(imagesPathPNG, string_logo_img_micro_bk);
				let logoPath =
					logoImg +
					(logoImg.indexOf("githubusercontent.com") > -1
						? "?sanitize=true"
						: "");
				let styleImageContainer = {
					width: `${number_logo_width}px`,
					height: `${number_logo_height}px`,
				};
				let styleImage = {
					width: "100%",
					height: "100%",
					margin: "auto",
				};
				return (
					<MicroMetaAppReactContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<div style={windowExternalContainer}>
							<div style={windowInternalContainer}>
								<div style={styleImageContainer}>
									<img src={logoPath} alt={logoImg} style={styleImage} />
								</div>
								<Button
									ref={this.simulateClickLoadMicroscopeFromPortal}
									style={buttonStyle}
									size="lg"
									onClick={this.loadMicroscopeFromPortal}
								>
									{"Loading " + microscope.Name}
								</Button>
							</div>
						</div>
					</MicroMetaAppReactContainer>
				);
			}
		}

		if (
			this.state
				.isCreatingNewMicroscope /*|| this.state.isLoadingMicroscope*/ &&
			(microscope === null || elementData === null)
		) {
			let creatingOptions = [];
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
					creatingOptions.push(modifiedCreateString);
				}
			}
			//let loadingOptions = [string_createFromScratch, string_createFromFile];
			loadingOptions.push(string_createFromFile);
			let microscopeNames = {};
			if (microscopes) {
				Object.keys(microscopes).forEach((key) => {
					let mic = microscopes[key].microscope;
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
			) {
				if (this.props.isElectron) {
					loadingOptions.push(string_loadFromHomeFolder);
				} else {
					loadingOptions.push(string_loadFromRepository);
				}
			}
			return (
				<MicroMetaAppReactContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoaderNew
						imagesPathPNG={imagesPathPNG}
						imagesPathSVG={imagesPathSVG}
						title={this.state.tierName}
						creatingOptions={creatingOptions}
						loadingOptions={loadingOptions}
						microscopes={microscopeNames}
						//onFileDrop={this.uploadMicroscopeFromDropzone}
						modeSelection={this.state.loadingOption}
						//loadingMode={this.state.loadingMode}
						//onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
						//onClickMicroscopeSelection={this.selectMicroscopeFromRepository}
						onClickConfirm={this.createOrUseMicroscope}
						onClickHome={this.onClickHome}
						//isSettings={this.state.isLoadingMicroscope}
						schema={this.state.schema}
						isDebug={this.props.isDebug}
					/>
				</MicroMetaAppReactContainer>
			);
		}

		// if (
		// 	!this.state.isCreatingNewMicroscope &&
		// 	this.state.isLoadingImage &&
		// 	this.props.onLoadMetadata !== null &&
		// 	this.props.onLoadMetadata !== undefined
		// ) {
		// 	//console.log("IMAGE LOADER");
		// 	//let modifiedCreateString = string_createFromScratch.replace("# ", "");
		// 	let loadingOptions = [string_noImageLoad, string_createFromFile];
		// 	return (
		// 		<MicroMetaAppReactContainer
		// 			width={width}
		// 			height={height}
		// 			forwardedRef={this.overlaysContainerRef}
		// 		>
		// 			<ImageLoader
		// 				logoImg={url.resolve(imagesPathPNG, string_logo_img_micro_bk)}
		// 				loadingOptions={loadingOptions}
		// 				onLoadMetadata={this.props.onLoadMetadata}
		// 				handleLoadMetadataComplete={this.handleLoadMetadataComplete}
		// 				//loadingOption={this.state.loadingOption}
		// 				//loadingMode={this.state.loadingMode}
		// 				//onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
		// 				onClickConfirm={this.createOrUseMetadata}
		// 				onClickHome={this.onClickHome}
		// 				isDebug={this.props.isDebug}
		// 				imagesPath={imagesPathSVG}
		// 			/>
		// 		</MicroMetaAppReactContainer>
		// 	);
		// }

		//should be settingData instead of elementData
		if (
			!this.state.isCreatingNewMicroscope &&
			this.state.isLoadingImage &&
			this.state.isLoadingSettings
		) {
			//console.log("SETTINGS LOADER");
			let imgLoadingOptions = [string_noImageLoad];
			if (this.props.isElectron) {
				imgLoadingOptions.push(string_createFromFile);
			}
			if (isDefined(this.props.imageName)) {
				imgLoadingOptions.push(string_loadFromRepository);
			}
			let micLoadingOptions = [];
			micLoadingOptions.push(string_createFromFile);
			let microscopeNames = {};
			if (isDefined(microscopes)) {
				Object.keys(microscopes).forEach((key) => {
					let mic = microscopes[key].microscope;
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
			) {
				if (this.props.isElectron) {
					micLoadingOptions.push(string_loadFromHomeFolder);
				} else {
					micLoadingOptions.push(string_loadFromRepository);
				}
			}

			let modifiedCreateString = string_createFromScratch.replace("# ", "");
			let settCreatingOptions = [modifiedCreateString];
			let settLoadingOptions = [string_createFromFile];
			let settingsNames = {};
			if (isDefined(settings)) {
				settingsNames = settings;
			}
			if (
				settingsNames !== null &&
				settingsNames !== undefined &&
				Object.keys(settingsNames).length > 0
			) {
				if (this.props.isElectron) {
					settLoadingOptions.push(string_loadFromHomeFolder);
				} else {
					settLoadingOptions.push(string_loadFromRepository);
				}
			}
			//let hasMetadataLoader = false;
			//if (isDefined(this.props.onLoadMetadata)) hasMetadataLoader = true;
			return (
				<MicroMetaAppReactContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<SettingLoaderNew
						title={this.state.tierName}
						imagesPathPNG={imagesPathPNG}
						imagesPathSVG={imagesPathSVG}
						microscopeLoadingOptions={micLoadingOptions}
						imageLoadingOptions={imgLoadingOptions}
						settingCreatingOptions={settCreatingOptions}
						settingLoadingOptions={settLoadingOptions}
						microscopeNames={microscopeNames}
						microscopes={microscopes}
						settings={settingsNames}
						//onFileDrop={this.uploadSettingFromDropzone}
						micloadingOption={this.state.loadingOption}
						imgloadingOption={this.state.loadingOption}
						settloadingOption={this.state.loadingOption}
						//loadingMode={this.state.loadingMode}
						//onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
						//onClickSettingsSelection={this.selectSettingFromRepository}
						//handleLoadMetadataComplete={this.handleLoadMetadataComplete}
						//onClickConfirm={this.createOrUseMetadata}
						onClickConfirm={this.createOrUseSetting}
						onClickHome={this.onClickHome}
						schema={this.state.schema}
						isDebug={this.props.isDebug}
						//hasMetadataLoader={hasMetadataLoader}
						onLoadMetadata={this.props.onLoadMetadata}
						imageName={this.props.imageName}
					/>
				</MicroMetaAppReactContainer>
			);
		}

		//FIXME why do I need this?
		let canvasContainerStyle = {
			display: "flex",
			flexFlow: "row",
			height: canvasHeight,
			//width: "100%"
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
			if (this.props.isDebug) console.log("IN APP.JS REACT 0");
			let footerSettingsSchemas = [imageSchema, pixelsSchema];
			let footerSettingsInput = [setting, setting.Pixels];
			//{overlayImporter}
			return (
				<MicroMetaAppReactContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<Header
						dimensions={headerFooterDims}
						imagesPathPNG={imagesPathPNG}
						imagesPathSVG={imagesPathSVG}
						isDebug={this.props.isDebug}
						isSchemaValidated={this.state.isSettingValidated}
						onFormConfirm={this.onSettingDataSave}
						onClickChangeValidation={this.createAdaptedSchemas}
						element={"image settings"}
						formTitle={setting.Name}
						activeTier={this.state.activeTier}
						validationTier={this.state.validationTier}
						componentSchemas={componentsSchema}
						schema={footerSettingsSchemas}
						inputData={footerSettingsInput}
						elementByType={elementByType}
						is4DNPortal={this.state.is4DNPortal}
						overlaysContainer={this.overlaysContainerRef.current}
						appVersion={appVersion}
						modelVersion={this.state.modelVersion}
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
						imageMetadata={imageMetadata}
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
						isDebug={this.props.isDebug}
						hasAdvanced={this.props.hasAdvanced}
						hasExperimental={this.props.hasExperimental}
					/>
					<Footer
						onClickSave={this.handleSaveSetting}
						onClickHome={this.onClickHome}
						onClickParentHome={
							isDefined(this.props.onClickHome) ? this.onClickParentHome : null
						}
						hasSaveOption={this.props.onSaveSetting ? true : false}
						overlaysContainer={this.overlaysContainerRef.current}
						dimensions={headerFooterDims}
						element={"image settings"}
						imagesPath={imagesPathSVG}
						is4DNPortal={this.state.is4DNPortal}
						hasImport={this.state.hasImport}
						isDebug={this.props.isDebug}
					/>
				</MicroMetaAppReactContainer>
			);
		} else {
			if (this.state.isViewOnly) {
				if (this.props.isDebug) console.log("IN APP.JS REACT 1");
				canvasDims.height =
					canvasHeight + headerFooterHeight + headerFooterMargin;
				canvasContainerStyle.height =
					canvasHeight + headerFooterHeight + headerFooterMargin;
				return (
					<MicroMetaAppReactContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<Header
							dimensions={headerFooterDims}
							imagesPathPNG={imagesPathPNG}
							imagesPathSVG={imagesPathSVG}
							isDebug={this.props.isDebug}
							isViewOnly={this.state.isViewOnly}
							appVersion={appVersion}
							modelVersion={this.state.modelVersion}
						/>
						<div style={canvasContainerStyle}>
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
								onCopy={this.onCopy}
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
								isDebug={this.props.isDebug}
							/>
						</div>
					</MicroMetaAppReactContainer>
				);
			} else {
				if (this.props.isDebug) console.log("IN APP.JS REACT 2");
				//{overlayImporter}
				let isPasteEnabled = isDefined(this.state.tmpCopyElementFromData)
					? true
					: false;
				return (
					<MicroMetaAppReactContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<Header
							dimensions={headerFooterDims}
							imagesPathPNG={imagesPathPNG}
							imagesPathSVG={imagesPathSVG}
							isDebug={this.props.isDebug}
							isSchemaValidated={this.state.isMicroscopeValidated}
							onFormConfirm={this.onMicroscopeDataSave}
							onClickChangeValidation={this.createAdaptedSchemas}
							element={"microscope"}
							formTitle={microscope.Name}
							activeTier={this.state.activeTier}
							validationTier={this.state.validationTier}
							componentSchemas={componentsSchema}
							schema={footerMicroscopeSchemas}
							inputData={footerMicroscopeInput}
							elementByType={elementByType}
							is4DNPortal={this.state.is4DNPortal}
							overlaysContainer={this.overlaysContainerRef.current}
							isPasteEnabled={isPasteEnabled}
							onPaste={this.onPaste}
							appVersion={appVersion}
							modelVersion={this.state.modelVersion}
						/>
						<div style={canvasContainerStyle}>
							<Canvas
								validationTier={this.state.validationTier}
								// saveAllComponents={this.props.saveAllComponents}
								onClickSave={this.handleSaveComponent}
								// getComponent={this.handleConfirmComponent}
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
								onCopy={this.onCopy}
								overlaysContainer={this.overlaysContainerRef.current}
								areComponentsValidated={this.state.areComponentsValidated}
								canvasElementsDimensions={typeDimensions}
								dimensions={canvasDims}
								scalingFactor={scalingFactor}
								containerOffsetTop={this.props.containerOffsetTop}
								containerOffsetLeft={this.props.containerOffsetLeft}
								headerOffset={headerOffset}
								//setScale={this.setMicroscopeScale}
								isDebug={this.props.isDebug}
							/>
							<Toolbar
								activeTier={this.state.activeTier}
								ref={this.toolbarRef}
								imagesPath={imagesPathSVG}
								componentSchemas={componentsSchema}
								dimensions={toolbarDims}
								scalingFactor={scalingFactor}
								onHideToolbar={this.onHideToolbar}
								isToolbarHidden={this.state.isToolbarHidden}
								isDebug={this.props.isDebug}
							/>
						</div>
						<Footer
							onClickSave={this.handleSaveMicroscope}
							onClickHome={this.onClickHome}
							onClickParentHome={
								isDefined(this.props.onClickHome)
									? this.onClickParentHome
									: null
							}
							hasSaveOption={this.props.onSaveMicroscope ? true : false}
							overlaysContainer={this.overlaysContainerRef.current}
							dimensions={headerFooterDims}
							imagesPath={imagesPathSVG}
							is4DNPortal={this.state.is4DNPortal}
							hasImport={this.state.hasImport}
							isDebug={this.props.isDebug}
							element={"microscope"}
							subElements={"components"}
						/>
					</MicroMetaAppReactContainer>
				);
			}
		}
	}
}

class MicroMetaAppReactContainer extends React.PureComponent {
	render() {
		// const wrapperContainer = {
		// 	display: "flex",
		// 	justifyContent: "center",
		// 	flexFlow: "column",
		// 	width: "100%",
		// 	height: "100%",
		// 	alignItems: "center",
		// };
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

MicroMetaAppReact.propTypes = {
	//TODO need to be added here and in all subclasses
	height: PropTypes.number,
	width: PropTypes.number,
	schema: PropTypes.arrayOf(PropTypes.object),
	microscopes: PropTypes.object,
	microscope: PropTypes.object,
};

MicroMetaAppReact.defaultProps = {
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
	//tiers: ["1", "2", "3"],
	containerOffsetTop: 0,
	containerOffsetLeft: 0,
	scalingFactor: 1,
	isDebug: false,
	isElectron: false,
	hasSettings: false,
	hasAdvancedModel: false,
	hasExperimentalModel: false,

	onLoadMicroscope: null,
	onLoadSetting: null,
	onModeSelection: null,
	imageName: null,

	onLoadDimensions: function (complete, resolve) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null, resolve);
		}, 1000);
	},
	onLoadSchema: function (complete, resolve) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null, resolve);
		}, 1000);
	},
	onLoadMicroscopes: function (complete, resolve) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null, resolve);
		}, 1000);
	},
	onLoadSettings: function (complete, resolve) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(null, resolve);
		}),
			1000;
	},
	onSaveMicroscope: function (microscope, complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(microscope.Name);
		}, 1000);
	},
	onSaveComponent: function (id, consolidatedData, linkedFields, complete, validationTier) {
		console.log("default props for onSaveComponent called");
		// setTimeout(function () {
		// 	complete(consolidatedData.Name);
		// }, 1000);
	},
	saveAllComponents: function (allComponents, complete, validationTier) {
		console.log("In default props saveAllComponents of React");
		setTimeout(function () {
			complete();
		}, 1000);
	},
	onSaveSetting: function (setting, complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function () {
			complete(setting.Name);
		}, 1000);
	},
};

const createApi = function api(context) {
	const self = context;

	return {
		public: {
			// saveMicroscope(){
			// 	self.handleSaveMicroscope("Save microscope");
			// },
			exportMicroscopeConfString() {
				let elementData = self.state.elementData;
				let components = [];
				Object.keys(elementData).forEach((item, index) => {
					components[index] = elementData[item];
				});
				let comps = { components };
				let microscope = Object.assign(self.state.microscope, comps);
				microscope.linkedFields = self.state.linkedFields;

				return JSON.stringify(microscope, null, 2);
			},

			updateMicroscopeDescription(description) {
				const newMicroscope = Object.assign(self.state.microscope, {
					Description: description || "",
				});
				this.setState({ microscope: newMicroscope });
			},

			validateMicroscope(
				microscope,
				schemas,
				checkForMicroscopeStand,
				checkForModelVersion,
				checkForAppVersion
			) {
				return validateMicroscope(
					microscope,
					schemas,
					checkForMicroscopeStand,
					checkForModelVersion,
					checkForAppVersion
				);
			},

			// TODO add verifyModelVersion //
		},
	};
};

export const AppVersion = appVersion;
