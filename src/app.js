import PropTypes from "prop-types";
import React from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";
import DataLoader from "./components/dataLoader";
import MicroscopePreLoader from "./components/microscopePreLoader";
import MicroscopeLoader from "./components/microscopeLoader";

const validate = require("jsonschema").validate;
const uuidv4 = require("uuid/v4");

const createFromScratch = "Create from scratch";
const createFromFile = "Create from file";

export default class MicroscopyMetadataTool extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			microscope: props.microscope || null,
			schema: props.schema || null,
			microscopes: props.microscopes || null,
			adaptedMicroscopeSchema: null,
			adaptedComponentsSchema: null,
			adaptedChildrenSchema: null,
			mounted: false,
			activeTier: 1,
			validationTier: 1,
			isCreatingNewMicroscope: null,
			micName: null,
			elementData: null,
			isDropzoneActive: false,
			isMicroscopeValidated: false,
			areComponentsValidated: false
		};

		//this.isMicroscopeValidated = false;
		this.toolbarRef = React.createRef();
		this.canvasRef = React.createRef();
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

		this.updateElementData = this.updateElementData.bind(this);
		this.onMicroscopeDataSave = this.onMicroscopeDataSave.bind(this);

		this.handleActiveTierSelection = this.handleActiveTierSelection.bind(this);
		this.setCreateNewMicroscope = this.setCreateNewMicroscope.bind(this);
		this.setLoadMicroscope = this.setLoadMicroscope.bind(this);

		this.uploadMicroscopeFromDropzone = this.uploadMicroscopeFromDropzone.bind(
			this
		);
		this.handleMicroscopeSelection = this.handleMicroscopeSelection.bind(this);
		this.createNewMicroscope = this.createNewMicroscope.bind(this);
		this.createNewMicroscopeFromScratch = this.createNewMicroscopeFromScratch.bind(
			this
		);
		this.createNewMicroscopeFromDroppedFile = this.createNewMicroscopeFromDroppedFile.bind(
			this
		);
		this.createNewMicroscopeFromSelectedFile = this.createNewMicroscopeFromSelectedFile.bind(
			this
		);
		this.setMicroscopeScale = this.setMicroscopeScale.bind(this);
		this.cancel = this.cancel.bind(this);

		this.createAdaptedSchemas = this.createAdaptedSchemas.bind(this);
		this.createAdaptedSchema = this.createAdaptedSchema.bind(this);

		this.handleExportMicroscope = this.handleExportMicroscope.bind(this);
		this.handleSaveMicroscope = this.handleSaveMicroscope.bind(this);
		this.handleCompleteSaveMicroscope = this.handleCompleteSaveMicroscope.bind(
			this
		);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.schema !== state.schema && props.schema !== null) {
			return { schema: props.schema };
		}
		if (props.microscope !== state.microscope && props.microscope !== null) {
			return { microscope: props.microscope };
		}
		if (props.microscopes !== state.microscopes && props.microscopes !== null) {
			return { microscopes: props.microscopes };
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

	handleCompleteLoadMicroscopes(newMicroscopes) {
		this.setState({ microscopes: newMicroscopes });
	}

	handleLoadSchema(e) {
		return new Promise(() =>
			setTimeout(this.props.onLoadSchema(this.handleCompleteLoadSchema), 10000)
		);
	}

	handleCompleteLoadSchema(newSchema) {
		this.setState({ schema: newSchema });
	}

	handleActiveTierSelection(item) {
		let tier = Number(item);
		this.setState({ activeTier: tier, validationTier: tier });
	}

	setCreateNewMicroscope() {
		this.setState({
			isCreatingNewMicroscope: true,
			micName: createFromScratch
		});
	}

	setLoadMicroscope() {
		this.setState({ isCreatingNewMicroscope: false });
	}

	handleMicroscopeSelection(item) {
		let isDropzoneActive = false;
		if (item === createFromFile) {
			isDropzoneActive = true;
		}
		this.setState({ micName: item, isDropzoneActive: isDropzoneActive });
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

		Object.keys(properties).forEach(propKey => {
			let property = properties[propKey];
			if (property.type === "object" || property.type === "array") {
				properties[propKey] = this.createAdaptedSchema(
					property,
					activeTier,
					validationTier
				);
				//return;
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
		let childrenSchema = [];
		let microscopeSchema = {};
		let microscope = this.state.microscope;
		let compCounter = 0;
		let childrenCounter = 0;
		Object.keys(schema).forEach(schemaIndex => {
			let singleSchemaOriginal = schema[schemaIndex];
			let singleSchema = this.createAdaptedSchema(
				singleSchemaOriginal,
				activeTier,
				validationTier
			);

			//console.log(singleSchema);

			if (singleSchema.title === "Microscope") {
				microscopeSchema = Object.assign(microscopeSchema, singleSchema);
			} else if (singleSchema.category === "ChildrenElement") {
				childrenSchema[childrenCounter] = singleSchema;
				childrenCounter++;
			} else {
				componentsSchema[compCounter] = singleSchema;
				compCounter++;
			}
		});

		let validated = false;
		if (microscope !== null) {
			microscope.validationTier = validationTier;
			let validation = validate(microscope, microscopeSchema);
			validated = validation.valid;
		}

		this.setState({
			adaptedMicroscopeSchema: microscopeSchema,
			adaptedComponentsSchema: componentsSchema,
			adaptedChildrenSchema: childrenSchema,
			validationTier: validationTier,
			isMicroscopeValidated: validated
		});
		return [microscopeSchema, componentsSchema, childrenSchema];
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
			tier: activeTier,
			validationTier: activeTier
		};
		this.setState({ microscope, elementData: {} });
	}

	createNewMicroscopeFromDroppedFile() {
		let modifiedMic = this.state.microscope;
		let activeTier = this.state.activeTier;
		if (activeTier !== this.state.microscope.tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.tier = activeTier;
		}
		if (modifiedMic.validationTier > activeTier) {
			modifiedMic.validationTier = activeTier;
		}
		let adaptedSchemas = this.createAdaptedSchemas(modifiedMic.validationTier);
		let microscopeSchema = adaptedSchemas[0];
		let componentsSchema = adaptedSchemas[1];
		let components = this.state.microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach(schemaIndex => {
				let compSchema = componentsSchema[schemaIndex];
				let schema_ID = compSchema.ID;
				Object.keys(components).forEach(objIndex => {
					let obj = components[objIndex];
					if (schema_ID !== obj.schema_ID) return;
					let id = compSchema.title + "_" + obj.ID;
					newElementData[id] = obj;
				});
			});
		}
		let validation = validate(modifiedMic, microscopeSchema);
		let validated = validation.valid;
		this.setState({
			microscope: modifiedMic,
			elementData: newElementData,
			validationTier: modifiedMic.validationTier,
			isMicroscopeValidated: validated
		});
	}

	createNewMicroscopeFromSelectedFile() {
		let microscope = this.state.microscopes[this.state.micName];
		let modifiedMic = microscope;
		let activeTier = this.state.activeTier;
		if (activeTier !== microscope.tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.tier = activeTier;
		}

		if (modifiedMic.validationTier > activeTier) {
			modifiedMic.validationTier = activeTier;
		}
		let adaptedSchemas = this.createAdaptedSchemas(modifiedMic.validationTier);
		let microscopeSchema = adaptedSchemas[0];
		let componentsSchema = adaptedSchemas[1];
		let components = microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach(schemaIndex => {
				let compSchema = componentsSchema[schemaIndex];
				let schema_ID = compSchema.ID;
				Object.keys(components).forEach(objIndex => {
					let obj = components[objIndex];
					if (schema_ID !== obj.schema_ID) return;
					let id = compSchema.title + "_" + obj.ID;
					newElementData[id] = obj;
				});
			});
		}
		let validation = validate(modifiedMic, microscopeSchema);
		let validated = validation.valid;
		this.setState({
			microscope: modifiedMic,
			elementData: newElementData,
			validationTier: modifiedMic.validationTier,
			isMicroscopeValidated: validated
		});
	}

	createNewMicroscope() {
		if (this.state.micName === createFromScratch) {
			this.createNewMicroscopeFromScratch();
		} else if (this.state.micName === createFromFile) {
			this.createNewMicroscopeFromDroppedFile();
		} else {
			this.createNewMicroscopeFromSelectedFile();
		}
	}

	cancel() {
		this.setState({
			microscope: null,
			isCreatingNewMicroscope: null,
			micName: null,
			elementData: null,
			isDropzoneActive: false
		});
	}

	updateElementData(elementData, areComponentsValidated) {
		this.setState({
			elementData: elementData,
			areComponentsValidated: areComponentsValidated
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
			// console.log(
			// 	"should re-render: mic-" +
			// 		this.state.isMicroscopeValidated +
			// 		" comps-" +
			// 		this.state.areComponentsValidated
			// );
			//return;
		}
		let elementData = this.state.elementData;
		let components = [];
		Object.keys(elementData).forEach((item, index) => {
			components[index] = elementData[item];
		});
		let comps = { components };
		let microscope = Object.assign(this.state.microscope, comps);
		if (item.startsWith("Save")) {
			this.props.onSaveMicroscope(
				this.handleCompleteSaveMicroscope,
				microscope
			);
		} else {
			this.handleExportMicroscope(microscope);
		}
	}

	handleCompleteSaveMicroscope(micName) {
		//console.log(micName + " saved");
		//WARN Microscope save
		window.alert(micName + " saved");
	}

	onMicroscopeDataSave(id, data) {
		let oldMicroscope = this.state.microscope;
		let newMicroscope = Object.assign(oldMicroscope, data);
		this.setState({ microscope: newMicroscope, isMicroscopeValidated: true });
		//this.isMicroscopeValidated = true;
	}

	render() {
		let { imagesPath, width, height } = this.props;
		let schema = this.state.schema;
		let microscope = this.state.microscope;
		let microscopes = this.state.microscopes;
		let elementData = this.state.elementData;

		// Alex: Idea for scaling
		width = Math.max(600, width);
		height = Math.max(600, height);

		//TODO with this strategy i can create multiple views
		//1st view: selection tier / new mic / use mic (+ import mic here maybe?)
		//2nd view: canvas with toolbar (+ possibile schema replacement?
		//	or the scheme selection can be done in the previous view)
		//	(+ export mic on file for the moment)
		//3rd view: settings (+ export settings on file for the moment)

		if (schema === null && microscopes === null && microscope === null) {
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
			this.state.isCreatingNewMicroscope &&
			(microscope === null || elementData === null)
		) {
			let defaultArray = [createFromScratch, createFromFile];
			let microscopeNames = [];
			if (microscopes) {
				Object.keys(microscopes).forEach(key => {
					microscopeNames.push(key);
				});
			}
			microscopeNames = defaultArray.concat(microscopeNames);
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						microscopes={microscopeNames}
						onFileDrop={this.uploadMicroscopeFromDropzone}
						isDropzoneActive={this.state.isDropzoneActive}
						onClickMicroscopeSelection={this.handleMicroscopeSelection}
						onClickCreateNewMicroscope={this.createNewMicroscope}
						onClickCancel={this.cancel}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		if (
			!this.state.isCreatingNewMicroscope &&
			(microscope === null || elementData === null)
		) {
			let microscopes = null;
			return (
				<MicroscopyMetadataToolContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						microscopes={microscopes}
						onFileDrop={this.uploadMicroscopeFromDropzone}
						onClickMicroscopeSelection={this.handleMicroscopeSelection}
						onClickCreateNewMicroscope={this.createNewMicroscope}
						onClickCancel={this.cancel}
					/>
				</MicroscopyMetadataToolContainer>
			);
		}

		const style = {
			display: "flex",
			flexFlow: "row",
			height: height - 60 - 60
		};

		//TODO should be passing these to canvas and toolbar instead of
		// using percentage size inside the component
		let canvasWidth = Math.ceil(width * 0.75);
		let canvasHeight = height - 60 - 60;
		let canvasDims = {
			width: canvasWidth,
			height: canvasHeight
		};

		let toolbarWidth = Math.floor(width * 0.25);
		let toolbarHeight = height - 60 - 60;
		let toolbarDims = {
			width: toolbarWidth,
			height: toolbarHeight
		};

		let headerFooterDims = {
			width: width,
			height: 60
		};

		let microscopeSchema = this.state.adaptedMicroscopeSchema;
		let componentsSchema = this.state.adaptedComponentsSchema;
		let childrenSchema = this.state.adaptedChildrenSchema;

		// console.log("microscope");
		// console.log(microscopeSchema);
		// console.log("components");
		// console.log(componentsSchema);
		// console.log("children");
		// console.log(childrenSchema);

		return (
			<MicroscopyMetadataToolContainer
				width={width}
				height={height}
				forwardedRef={this.overlaysContainerRef}
			>
				<Header dimensions={headerFooterDims} />
				<div style={style}>
					<Canvas
						activeTier={this.state.activeTier}
						ref={this.canvasRef}
						imagesPath={`${imagesPath}`}
						componentSchemas={componentsSchema}
						inputData={this.state.elementData}
						backgroundImage={`${imagesPath}${microscopeSchema.image}`}
						updateElementData={this.updateElementData}
						overlaysContainer={this.overlaysContainerRef.current}
						areComponentsValidated={this.state.areComponentsValidated}
						height={canvasHeight}
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
					microscopeSchema={microscopeSchema}
					onConfirm={this.onMicroscopeDataSave}
					onClickSave={this.handleSaveMicroscope}
					hasSaveOption={this.props.onSaveMicroscope ? true : false}
					onClickChangeValidation={this.createAdaptedSchemas}
					overlaysContainer={this.overlaysContainerRef.current}
					inputData={microscope}
					isMicroscopeValidated={this.state.isMicroscopeValidated}
					dimensions={headerFooterDims}
				/>
			</MicroscopyMetadataToolContainer>
		);
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
	microscope: PropTypes.arrayOf(PropTypes.object)
};

MicroscopyMetadataTool.defaultProps = {
	height: 600,
	width: 600,
	schema: null,
	microscope: null,
	microscopes: null,
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
	onSaveMicroscope: function(complete, microscope) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			console.log(microscope);
			complete(microscope.name);
		});
	}
};
