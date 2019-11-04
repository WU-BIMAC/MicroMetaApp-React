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

import html2canvas from "html2canvas";

const path = require("path");
const validate = require("jsonschema").validate;
const uuidv4 = require("uuid/v4");

const createFromScratch = "Create from scratch";
const createFromFile = "Load from file";
const loadFromRepository = "Load from repository";

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
			loadingOption: null,
			micName: null,
			elementData: null,
			settingData: null,
			loadingMode: 0,
			isMicroscopeValidated: false,
			isSettingValidated: false,
			areComponentsValidated: false,
			areSettingComponentsValidated: false,
			isViewOnly: props.isViewOnly || false,
			isPreset: false
		};

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
		this.handleLoadSettings = this.handleLoadSettings.bind(this);
		this.handleCompleteLoadMicroscopes = this.handleCompleteLoadMicroscopes.bind(
			this
		);
		this.handleCompleteLoadSettings = this.handleCompleteLoadSettings.bind(
			this
		);

		this.updateElementData = this.updateElementData.bind(this);
		this.updateSettingData = this.updateSettingData.bind(this);
		this.onMicroscopeDataSave = this.onMicroscopeDataSave.bind(this);
		this.onSettingDataSave = this.onSettingDataSave.bind(this);

		this.handleActiveTierSelection = this.handleActiveTierSelection.bind(this);
		this.setCreateNewMicroscope = this.setCreateNewMicroscope.bind(this);
		this.setLoadMicroscope = this.setLoadMicroscope.bind(this);

		this.uploadMicroscopeFromDropzone = this.uploadMicroscopeFromDropzone.bind(
			this
		);
		this.handleLoadingOptionSelection = this.handleLoadingOptionSelection.bind(
			this
		);
		this.selectMicroscopeFromRepository = this.selectMicroscopeFromRepository.bind(
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
		this.setMicroscopeScale = this.setMicroscopeScale.bind(this);

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

	handleMicroscopePreset() {
		let microscope = this.state.microscope;
		let tier = microscope.Tier;
		let vTier = microscope.ValidationTier;

		this.setState(
			{
				activeTier: tier,
				validationTier: vTier,
				isCreatingNewMicroscope: true,
				loadingOption: createFromFile,
				loadingMode: 1
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
			loadingOption: createFromScratch,
			loadingMode: 0
		});
		//this.handleLoadingOptionSelection(createFromScratch);
	}

	setLoadMicroscope() {
		this.setState({
			isCreatingNewMicroscope: false,
			loadingOption: createFromFile,
			loadingMode: 1
		});
		//this.handleLoadingOptionSelection(createFromFile);
	}

	handleLoadingOptionSelection(item) {
		let loadingMode = 0;
		if (item === createFromFile) {
			loadingMode = 1;
		} else if (item === loadFromRepository) loadingMode = 2;
		this.setState({ loadingOption: item, loadingMode: loadingMode });
	}

	selectMicroscopeFromRepository(item) {
		this.setState({ micName: item });
	}

	uploadMicroscopeFromDropzone(microscope) {
		this.setState({ microscope: microscope });
	}

	setMicroscopeScale(scale) {
		this.state.microscope.scale = scale;
	}

	createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier) {
		let singleSchema = Object.assign({}, singleSchemaOriginal);
		singleSchema.properties = Object.assign(
			{},
			singleSchemaOriginal.properties
		);

		if (singleSchema.required !== undefined)
			if (singleSchemaOriginal.type === "array") {
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

		if (singleSchemaOriginal.type === "array") {
			required = singleSchema.items.required;
			properties = singleSchema.items.properties;
		}

		if (properties === null || properties === undefined) {
			console.log(singleSchema);
			return singleSchema;
		}

		Object.keys(properties).forEach(propKey => {
			let property = properties[propKey];
			if (
				property.type === "object" ||
				(property.type === "array" &&
					(property.items.properties !== null &&
						property.items.properties !== undefined))
			) {
				properties[propKey] = this.createAdaptedSchema(
					property,
					activeTier,
					validationTier
				);
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

	createAdaptedSchemas(validationTier) {
		let activeTier = this.state.activeTier;
		let schema = this.state.schema;
		let componentsSchema = [];
		let settingsSchema = [];
		let childrenSchema = [];
		let experimentalSchema = [];
		let microscopeSchema = {};
		let imageSchema = {};
		let microscope = this.state.microscope;
		let setting = this.state.setting;
		let componentsCounter = 0;
		let settingsCounter = 0;
		let experimentalCounter = 0;
		let childrenCounter = 0;
		Object.keys(schema).forEach(schemaIndex => {
			let singleSchemaOriginal = schema[schemaIndex];
			let singleSchema = this.createAdaptedSchema(
				singleSchemaOriginal,
				activeTier,
				validationTier
			);

			if (singleSchema.title === "Microscope") {
				microscopeSchema = Object.assign(microscopeSchema, singleSchema);
			} else if (singleSchema.title === "Image") {
				imageSchema = Object.assign(imageSchema, singleSchema);
			} else if (singleSchema.category === "ChildElement") {
				childrenSchema[childrenCounter] = singleSchema;
				childrenCounter++;
			} else if (
				singleSchema.domain === "ImageAcquisitionSettings" ||
				singleSchema.domain === "Experimental"
			) {
				settingsSchema[settingsCounter] = singleSchema;
				settingsCounter++;
			} else if (singleSchema.domain === "MicrosocpeSpecifications") {
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
			adaptedComponentsSchema: componentsSchema,
			adaptedImageSchema: imageSchema,
			adaptedSettingsSchema: settingsSchema,
			adaptedExperimentalSchema: experimentalSchema,
			adaptedChildrenSchema: childrenSchema,
			validationTier: validationTier,
			isMicroscopeValidated: validated
		});
		return [
			microscopeSchema,
			componentsSchema,
			imageSchema,
			settingsSchema,
			childrenSchema
		];
	}

	createNewMicroscopeFromScratch() {
		let uuid = uuidv4();
		let activeTier = this.state.activeTier;
		let adaptedSchemas = this.createAdaptedSchemas(activeTier);
		let microscopeSchema = adaptedSchemas[0];
		let microscope = {
			//todo this means the microscope schema needs to be at 0 all the time
			//need to find better solution
			Name: `New ${microscopeSchema.title}`,
			Schema_ID: microscopeSchema.ID,
			ID: uuid,
			Tier: activeTier,
			ValidationTier: activeTier,
			Version: microscopeSchema.version
		};
		this.setState({ microscope, elementData: {} });
	}

	createOrUseMicroscopeFromDroppedFile() {
		let uuid = uuidv4();
		let modifiedMic = this.state.microscope;
		let activeTier = this.state.activeTier;
		if (activeTier !== this.state.microscope.Tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.Tier = activeTier;
		}
		if (modifiedMic.ValidationTier > activeTier) {
			modifiedMic.ValidationTier = activeTier;
		}
		let adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier);
		let microscopeSchema = adaptedSchemas[0];
		let componentsSchema = adaptedSchemas[1];
		let imageSchema = adaptedSchemas[2];
		let components = this.state.microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach(schemaIndex => {
				let compSchema = componentsSchema[schemaIndex];
				let schema_ID = compSchema.ID;
				Object.keys(components).forEach(objIndex => {
					let obj = components[objIndex];
					if (schema_ID !== obj.Schema_ID) return;
					let id = compSchema.title + "_" + obj.ID;
					newElementData[id] = obj;
				});
			});
		}
		let validation = validate(modifiedMic, microscopeSchema);
		let validated = validation.valid;
		if (this.state.isCreatingNewMicroscope) {
			this.setState({
				microscope: modifiedMic,
				setting: null,
				elementData: newElementData,
				settingData: null,
				validationTier: modifiedMic.ValidationTier,
				isMicroscopeValidated: validated
			});
		} else {
			let setting = {
				Name: `New ${imageSchema.title}`,
				Schema_ID: imageSchema.ID,
				ID: uuid,
				Tier: activeTier,
				ValidationTier: activeTier,
				Version: imageSchema.version
			};
			this.setState({
				microscope: modifiedMic,
				setting: setting,
				elementData: newElementData,
				settingData: {},
				validationTier: modifiedMic.ValidationTier,
				isMicroscopeValidated: validated
			});
		}
	}

	createOrUseMicroscopeFromSelectedFile() {
		let uuid = uuidv4();
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
		let adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier);
		let microscopeSchema = adaptedSchemas[0];
		let componentsSchema = adaptedSchemas[1];
		let imageSchema = adaptedSchemas[2];
		let components = microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach(schemaIndex => {
				let compSchema = componentsSchema[schemaIndex];
				let schema_ID = compSchema.ID;
				Object.keys(components).forEach(objIndex => {
					let obj = components[objIndex];
					if (schema_ID !== obj.Schema_ID) return;
					let id = compSchema.title + "_" + obj.ID;
					newElementData[id] = obj;
				});
			});
		}
		let validation = validate(modifiedMic, microscopeSchema);
		let validated = validation.valid;
		if (this.state.isCreatingNewMicroscope) {
			this.setState({
				microscope: modifiedMic,
				setting: null,
				elementData: newElementData,
				settingData: null,
				validationTier: modifiedMic.ValidationTier,
				isMicroscopeValidated: validated
			});
		} else {
			let setting = {
				//todo this means the microscope schema needs to be at 0 all the time
				//need to find better solution
				Name: `New ${imageSchema.title}`,
				Schema_ID: imageSchema.ID,
				ID: uuid,
				Tier: activeTier,
				ValidationTier: activeTier,
				Version: imageSchema.version
			};
			this.setState({
				microscope: modifiedMic,
				setting: setting,
				elementData: newElementData,
				settingData: {},
				validationTier: modifiedMic.ValidationTier,
				isMicroscopeValidated: validated
			});
		}
	}

	createOrUseMicroscope() {
		if (this.state.loadingOption === createFromScratch) {
			this.createNewMicroscopeFromScratch();
		} else if (this.state.loadingOption === createFromFile) {
			this.createOrUseMicroscopeFromDroppedFile();
		} else {
			this.createOrUseMicroscopeFromSelectedFile();
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
			loadingOption: null,
			micName: null,
			schema: null,
			elementData: null,
			settingData: null,
			loadingMode: 0
		});
	}

	updateElementData(elementData, areComponentsValidated) {
		//console.log(elementData);
		this.setState({
			elementData: elementData,
			areComponentsValidated: areComponentsValidated
		});
	}

	updateSettingData(settingData, areSettingComponentsValidated) {
		this.setState({
			settingData: settingData,
			areSettingComponentsValidated: areSettingComponentsValidated
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
				isMicroscopeValidated: false
			});
			validated = false;
		}
		if (!this.state.areComponentsValidated) {
			this.setState({
				areComponentsValidated: false
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
		let node = ReactDOM.findDOMNode(this.canvasRef.current);
		html2canvas(node, {
			allowTaint: true,
			foreignObjectRendering: true,
			logging: true,
			letterRendering: 1,
			useCORS: true
		}).then(canvas => {
			//var myImage = canvas.toDataURL("image/png");
			//window.open(myImage);
			//document.body.appendChild(canvas);
			if (item.startsWith("Save microscope")) {
				console.log(microscope);
				this.props.onSaveMicroscope(
					microscope,
					this.handleCompleteSaveMicroscope
					//canvas
				);

				// this.toDataUrl(
				// 	canvas,
				// 	this.props.onSaveMicroscope,
				// 	"image/png",
				// 	microscope,
				// 	this.handleCompleteSaveMicroscope
				// );
			} else if (item.startsWith("Export microscope")) {
				this.handleExportMicroscope(microscope);
			} else if (item.startsWith("Export image")) {
				this.handleExportMicroscopeImage(microscope, canvas);
				// this.toDataUrl(
				// 	canvas,
				// 	this.handleExportMicroscopeImage,
				// 	"image/png",
				// 	microscope
				// );
			}
			//document.body.removeChild(canvas);
		});
	}

	handleSaveSetting(item) {
		let validated = true;
		if (!this.state.isSettingValidated) {
			this.setState({
				isSettingValidated: false
			});
			validated = false;
		}
		if (!this.state.areSettingComponentsValidated) {
			this.setState({
				areSettingComponentsValidated: false
			});
			validated = false;
		}
		if (!validated) {
			//TODO throw warning instead of stopping validation
			//return;
		}
		let settingData = this.state.settingData;
		let components = [];
		Object.keys(settingData).forEach((item, index) => {
			components[index] = settingData[item];
		});
		let comps = { components };
		let setting = Object.assign(this.state.setting, comps);
		let node = ReactDOM.findDOMNode(this.canvasRef.current);
		html2canvas(node, {
			allowTaint: true,
			foreignObjectRendering: true,
			logging: true,
			letterRendering: 1,
			useCORS: true
		}).then(canvas => {
			if (item.startsWith("Save setting")) {
				this.props.onSaveSetting(setting, this.handleCompleteSaveSetting);
			} else if (item.startsWith("Export setting")) {
				this.handleExportSetting(setting);
			} else if (item.startsWith("Export image")) {
				//TODO
			}
		});
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
		let newMicroscope = Object.assign(oldMicroscope, data);
		this.setState({ microscope: newMicroscope, isMicroscopeValidated: true });
		//this.isMicroscopeValidated = true;
	}

	onSettingDataSave(id, data) {
		let oldSetting = this.state.setting;
		let newSetting = Object.assign(oldSetting, data);
		this.setState({ setting: newSetting, isSettingValidated: true });
		//this.isMicroscopeValidated = true;
	}

	render() {
		let { imagesPath, width, height } = this.props;
		let schema = this.state.schema;
		let microscope = this.state.microscope;
		let microscopes = this.state.microscopes;
		let elementData = this.state.elementData;
		let setting = this.state.setting;
		let settings = this.state.settings;
		let settingData = this.state.settingData;

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
						onClickLoadSchema={this.handleLoadSchema}
						onClickLoadMicroscopes={this.handleLoadMicroscopes}
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
			(microscope !== null && elementData === null)
		) {
			const buttonStyle = {
				width: "400px",
				height: "50px",
				padding: "5px",
				margin: "5px"
			};
			const windowExternalContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "100%",
				height: "100%",
				alignItems: "center"
			};
			const windowInternalContainer = {
				display: "flex",
				justifyContent: "center",
				flexFlow: "column",
				width: "100%",
				height: "100%",
				alignItems: "center"
			};
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<div style={windowExternalContainer}>
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
			this.state.isCreatingNewMicroscope &&
			(microscope === null || elementData === null)
		) {
			let loadingOptions = [createFromScratch, createFromFile];
			let microscopeNames = {};
			if (microscopes) {
				Object.keys(microscopes).forEach(key => {
					let mic = microscopes[key];
					if (mic.Manufacturer !== null && mic.Manufacturer !== undefined) {
						let catNames = microscopeNames[mic.Manufacturer];
						if (catNames !== null && catNames !== undefined) catNames.push(key);
						else catNames = [key];
						microscopeNames[mic.Manufacturer] = catNames;
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
				loadingOptions.push(loadFromRepository);
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						loadingOptions={loadingOptions}
						microscopes={microscopeNames}
						onFileDrop={this.uploadMicroscopeFromDropzone}
						loadingOption={this.state.loadingOption}
						loadingMode={this.state.loadingMode}
						onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
						onClickMicroscopeSelection={this.selectMicroscopeFromRepository}
						onClickConfirm={this.createOrUseMicroscope}
						onClickBack={this.onClickBack}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		//should be settingData instead of elementData
		if (
			!this.state.isCreatingNewMicroscope &&
			(setting === null || settingData === null)
		) {
			console.log("SETTINGS LOADER");
			let loadingOptions = [createFromFile];
			let microscopeNames = {};
			if (microscopes) {
				Object.keys(microscopes).forEach(key => {
					let mic = microscopes[key];
					if (mic.Manufacturer !== null && mic.Manufacturer !== undefined) {
						let catNames = microscopeNames[mic.Manufacturer];
						if (catNames !== null && catNames !== undefined) catNames.push(key);
						else catNames = [key];
						microscopeNames[mic.Manufacturer] = catNames;
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
				loadingOptions.push(loadFromRepository);
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						loadingOptions={loadingOptions}
						microscopes={microscopeNames}
						onFileDrop={this.uploadMicroscopeFromDropzone}
						loadingOption={this.state.loadingOption}
						loadingMode={this.state.loadingMode}
						onClickLoadingOptionSelection={this.handleLoadingOptionSelection}
						onClickMicroscopeSelection={this.selectMicroscopeFromRepository}
						onClickConfirm={this.createOrUseMicroscope}
						onClickBack={this.onClickBack}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		const style = {
			display: "flex",
			flexFlow: "row",
			height: height
		};

		//TODO should be passing these to canvas and toolbar instead of
		// using percentage size inside the component
		let canvasDims = {
			width: canvasWidth,
			height: canvasHeight
		};

		let settingsMainViewDims = {
			width: settingsWidth,
			height: canvasHeight
		};

		let toolbarDims = {
			width: toolbarWidth,
			height: toolbarHeight
		};

		let headerFooterDims = {
			width: headerFooterWidth,
			height: headerFooterHeight
		};

		let microscopeSchema = this.state.adaptedMicroscopeSchema;
		let componentsSchema = this.state.adaptedComponentsSchema;
		let imageSchema = this.state.adaptedImageSchema;
		let settingsSchema = this.state.adaptedSettingsSchema;
		let experimentalSchema = this.state.adaptedExperimentalSchema;
		let childrenSchema = this.state.adaptedChildrenSchema;

		if (!this.state.isCreatingNewMicroscope) {
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<Header dimensions={headerFooterDims} />
					<SettingsMainView
						microscope={microscope}
						microscopeComponents={elementData}
						activeTier={this.state.activeTier}
						ref={this.settingsMainViewRef}
						componentSchemas={settingsSchema}
						inputData={settingData}
						updateElementData={this.updateSettingData}
						overlaysContainer={this.overlaysContainerRef.current}
						areComponentsValidated={this.state.areComponentsValidated}
						dimensions={settingsMainViewDims}
					/>
					<Footer
						activeTier={this.state.activeTier}
						validationTier={this.state.validationTier}
						schema={imageSchema}
						onFormConfirm={this.onSettingDataSave}
						onClickSave={this.handleSaveSetting}
						onClickBack={this.onClickBack}
						hasSaveOption={this.props.onSaveSetting ? true : false}
						onClickChangeValidation={this.createAdaptedSchemas}
						overlaysContainer={this.overlaysContainerRef.current}
						inputData={setting}
						isSchemaValidated={this.state.isSettingsValidated}
						dimensions={headerFooterDims}
						element={"setting"}
					/>
				</MicroscopyMetadataToolContainer>
			);
		} else {
			if (this.state.isViewOnly) {
				canvasDims = {
					width: width,
					height: canvasHeight + headerFooterHeight
				};
				return (
					<MicroscopyMetadataToolContainer
						width={width}
						height={height}
						forwardedRef={this.overlaysContainerRef}
					>
						<Header dimensions={headerFooterDims} />
						<div style={style}>
							<Canvas
								microscope={microscope}
								activeTier={this.state.activeTier}
								ref={this.canvasRef}
								imagesPath={imagesPath}
								componentSchemas={componentsSchema}
								inputData={elementData}
								//backgroundImage={`${imagesPath}${microscopeSchema.image}`}
								backgroundImage={path.join(imagesPath, microscopeSchema.image)}
								updateElementData={this.updateElementData}
								overlaysContainer={this.overlaysContainerRef.current}
								areComponentsValidated={this.state.areComponentsValidated}
								dimensions={canvasDims}
								setScale={this.setMicroscopeScale}
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
						<Header dimensions={headerFooterDims} />
						<div style={style}>
							<Canvas
								microscope={microscope}
								activeTier={this.state.activeTier}
								ref={this.canvasRef}
								imagesPath={imagesPath}
								componentSchemas={componentsSchema}
								inputData={elementData}
								//backgroundImage={`${imagesPath}${microscopeSchema.image}`}
								backgroundImage={path.join(imagesPath, microscopeSchema.image)}
								updateElementData={this.updateElementData}
								overlaysContainer={this.overlaysContainerRef.current}
								areComponentsValidated={this.state.areComponentsValidated}
								dimensions={canvasDims}
								setScale={this.setMicroscopeScale}
							/>
							<Toolbar
								activeTier={this.state.activeTier}
								ref={this.toolbarRef}
								imagesPath={imagesPath}
								componentSchemas={componentsSchema}
								dimensions={toolbarDims}
							/>
						</div>
						<Footer
							activeTier={this.state.activeTier}
							validationTier={this.state.validationTier}
							schema={microscopeSchema}
							onFormConfirm={this.onMicroscopeDataSave}
							onClickSave={this.handleSaveMicroscope}
							onClickBack={this.onClickBack}
							hasSaveOption={this.props.onSaveMicroscope ? true : false}
							onClickChangeValidation={this.createAdaptedSchemas}
							overlaysContainer={this.overlaysContainerRef.current}
							inputData={microscope}
							isSchemaValidated={this.state.isMicroscopeValidated}
							dimensions={headerFooterDims}
							element={"microscope"}
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
	microscope: PropTypes.object
};

MicroscopyMetadataTool.defaultProps = {
	height: 600,
	width: 600,
	schema: null,
	microscope: null,
	setting: null,
	microscopes: null,
	settings: null,
	imagesPath: "./assets/",
	tiers: ["1", "2", "3", "4", "5"],
	onLoadSchema: function(complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			complete(null);
		});
	},
	onLoadMicroscopes: function(complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			complete(null);
		});
	},
	onSaveMicroscope: function(microscope, complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			console.log(microscope);
			complete(microscope.Name);
		});
	}
};
