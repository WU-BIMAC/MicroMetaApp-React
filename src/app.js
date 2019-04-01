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
			mounted: false,
			activeTier: 1,
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
		this.cancel = this.cancel.bind(this);

		this.createAdaptedSchemas = this.createAdaptedSchemas.bind(this);

		this.exportJsonDataToFile = this.exportJsonDataToFile.bind(this);
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
		this.setState({ activeTier: Number(item) });
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

	createAdaptedSchemas() {
		let activeTier = this.state.activeTier;
		let schema = this.state.schema;
		let componentSchemas = [];
		let microscopeSchema = {};
		let counter = 0;
		Object.keys(schema).forEach(schemaIndex => {
			let singleSchema = schema[schemaIndex];
			//for (let i = 0; i < schema.length; i++) {
			//let obj = schema[i];
			let fieldsToRemove = [];
			Object.keys(singleSchema.properties).forEach(propKey => {
				if (singleSchema.properties[propKey].tier > activeTier) {
					fieldsToRemove.push(propKey);
				}
			});
			for (let y = 0; y < fieldsToRemove.length; y++) {
				let key = fieldsToRemove[y];
				if (singleSchema.properties[key] === undefined) continue;
				delete singleSchema.properties[key];
				if (singleSchema.required === undefined) continue;
				let requiredIndex = singleSchema.required.indexOf(key);
				singleSchema.required.splice(requiredIndex, 1);
			}

			if (singleSchema.title === "Microscope") {
				microscopeSchema = Object.assign(microscopeSchema, singleSchema);
			} else {
				componentSchemas[counter] = singleSchema;
				counter++;
			}
		});
		return [microscopeSchema, componentSchemas];
	}

	createNewMicroscopeFromScratch(activeTier, microscopeSchema) {
		let uuid = uuidv4();
		let microscope = {
			//todo this means the microscope schema needs to be at 0 all the time
			//need to find better solution
			name: `New ${microscopeSchema.title}`,
			schema_id: microscopeSchema.id,
			id: uuid,
			tier: activeTier
		};
		this.setState({ microscope, elementData: {} });
	}

	createNewMicroscopeFromDroppedFile(
		activeTier,
		microscopeSchema,
		componentsSchema
	) {
		let modifiedMic = this.state.microscope;
		if (activeTier !== this.state.microscope.tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.tier = activeTier;
		}
		let components = this.state.microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach(schemaIndex => {
				let schema = componentsSchema[schemaIndex];
				let schema_id = schema.id;
				Object.keys(components).forEach(objIndex => {
					let obj = components[objIndex];
					if (schema_id !== obj.schema_id) return;
					let id = schema.title + "_" + obj.id;
					newElementData[id] = obj;
				});
			});
		}
		let validation = validate(modifiedMic, microscopeSchema);
		let validated = validation.valid;
		this.setState({
			microscope: modifiedMic,
			elementData: newElementData,
			isMicroscopeValidated: validated
		});
	}

	createNewMicroscopeFromSelectedFile(
		activeTier,
		microscopeSchema,
		componentsSchema
	) {
		let microscope = this.state.microscopes[this.state.micName];
		let modifiedMic = microscope;
		if (activeTier !== microscope.tier) {
			//TODO warning tier is different ask if continue?
			modifiedMic.tier = activeTier;
		}
		let components = microscope.components;
		let newElementData = {};
		if (components !== undefined) {
			Object.keys(componentsSchema).forEach(schemaIndex => {
				let schema = componentsSchema[schemaIndex];
				let schema_id = schema.id;
				Object.keys(components).forEach(objIndex => {
					let obj = components[objIndex];
					if (schema_id !== obj.schema_id) return;
					let id = schema.title + "_" + obj.id;
					newElementData[id] = obj;
				});
			});
		}
		let validation = validate(modifiedMic, microscopeSchema);
		let validated = validation.valid;
		this.setState({
			microscope: modifiedMic,
			elementData: newElementData,
			isMicroscopeValidated: validated
		});
	}

	createNewMicroscope() {
		let adaptedSchemas = this.createAdaptedSchemas();
		let microscopeSchema = adaptedSchemas[0];
		let componentsSchema = adaptedSchemas[1];
		let activeTier = this.state.activeTier;
		if (this.state.micName === createFromScratch) {
			this.createNewMicroscopeFromScratch(activeTier, microscopeSchema);
		} else if (this.state.micName === createFromFile) {
			this.createNewMicroscopeFromDroppedFile(
				activeTier,
				microscopeSchema,
				componentsSchema
			);
		} else {
			this.createNewMicroscopeFromSelectedFile(
				activeTier,
				microscopeSchema,
				componentsSchema
			);
		}

		this.setState({
			adaptedMicroscopeSchema: microscopeSchema,
			adaptedComponentsSchema: componentsSchema
		});
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

	exportJsonDataToFile() {
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
			console.log(
				"should re-render: mic-" +
					this.state.isMicroscopeValidated +
					" comps-" +
					this.state.areComponentsValidated
			);
			return;
		}

		let elementData = this.state.elementData;
		let components = [];
		Object.keys(elementData).forEach((item, index) => {
			components[index] = elementData[item];
		});
		let comps = { components };
		let microscope = Object.assign(this.state.microscope, comps);
		console.log(microscope);
		let micName = microscope.name;
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
		height = Math.max(600, height);
		width = Math.max(600, width);

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

		let microscopeSchema = this.state.adaptedMicroscopeSchema;
		let componentsSchema = this.state.adaptedComponentsSchema;

		return (
			<MicroscopyMetadataToolContainer
				width={width}
				height={height}
				forwardedRef={this.overlaysContainerRef}
			>
				<Header />
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
						parentWidth={width}
						parentHeight={height}
					/>
					<Toolbar
						activeTier={this.state.activeTier}
						ref={this.toolbarRef}
						imagesPath={imagesPath}
						componentSchemas={componentsSchema}
					/>
				</div>
				<Footer
					activeTier={this.state.activeTier}
					microscopeSchema={microscopeSchema}
					onConfirm={this.onMicroscopeDataSave}
					onClickExport={this.exportJsonDataToFile}
					overlaysContainer={this.overlaysContainerRef.current}
					inputData={microscope}
					isMicroscopeValidated={this.state.isMicroscopeValidated}
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
	width: 800,
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
	}
};
