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

export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			microscope: props.microscope || null,
			schema: props.schema || null,
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
		this.handleCompleteOpenNewSchema = this.handleCompleteOpenNewSchema.bind(
			this
		);
		this.handleOpenNewSchema = this.handleOpenNewSchema.bind(this);

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
		return null;
	}

	componentDidMount() {
		/**
		 * We may not have access to window/document until Component has been mounted,
		 * esp. if server-side rendering is utilized. One common approach is to set state
		 * mounted=true and then only do things which require access to window (e.g. binding browser window
		 * resize event listener (if required for some reason)) or accessing window properties.
		 * This method is very similar to constructor in purpose.
		 */
		this.setState({ mounted: true });
	}

	handleOpenNewSchema(e) {
		return new Promise(() =>
			setTimeout(
				this.setState({ loading: true }, function() {
					this.props.onLoadSchema(this.handleCompleteOpenNewSchema);
				}),
				10000
			)
		);
	}

	handleCompleteOpenNewSchema(newSchema) {
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
		console.log(schema);
		let componentSchemas = [];
		let microscopeSchema = {};
		let counter = 0;
		for (let i = 0; i < schema.length; i++) {
			let obj = schema[i];
			let fieldsToRemove = [];
			if (i === 0) console.log(obj);
			Object.keys(obj.properties).forEach(propKey => {
				if (obj.properties[propKey].tier > activeTier) {
					fieldsToRemove.push(propKey);
				}
			});
			if (i === 0) console.log(fieldsToRemove);
			for (let y = 0; y < fieldsToRemove.length; y++) {
				let key = fieldsToRemove[y];
				if (obj.properties[key] === undefined) continue;
				delete obj.properties[key];
				if (obj.required === undefined) continue;
				let requiredIndex = obj.required.indexOf(key);
				if (i === 0) console.log(requiredIndex);
				obj.required.splice(requiredIndex, 1);
				if (i === 0) console.log(obj.required);
			}

			if (obj.title === "Microscope") {
				microscopeSchema = Object.assign(microscopeSchema, obj);
			} else {
				componentSchemas[counter] = obj;
				counter++;
			}
		}

		return [microscopeSchema, componentSchemas];
	}

	createNewMicroscope() {
		let adaptedSchemas = this.createAdaptedSchemas();
		let microscopeSchema = adaptedSchemas[0];
		let componentsSchema = adaptedSchemas[1];
		let activeTier = this.state.activeTier;
		console.log("HERE");
		if (this.state.micName === createFromScratch) {
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
		} else if (this.state.micName === createFromFile) {
			let modifiedMic = this.state.microscope;
			if (activeTier !== this.state.microscope.tier) {
				//TODO warning tier is different ask if continue?
				modifiedMic.tier = activeTier;
			}
			let newElementData = {};
			if (this.state.microscope.components !== undefined)
				Object.keys(this.state.microscope.components).forEach(item => {
					newElementData[item] = this.state.microscope.components[item];
				});
			let validation = validate(modifiedMic, microscopeSchema);
			let validated = validation.valid;
			console.log(validation);
			this.setState({
				microscope: modifiedMic,
				elementData: newElementData,
				isMicroscopeValidated: validated
			});
			//Validate schemas using jsonschema????
		} else {
			//Load microscope from file
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
				isMicroscopeValidated: true
			});
			this.setState({
				isMicroscopeValidated: false
			});
			validated = false;
		}
		if (!this.state.areComponentsValidated) {
			this.setState({
				areComponentsValidated: true
			});
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
		let {
			imagesPath,
			micTemplatesPath,
			micSavedPath,
			width,
			height
		} = this.props;
		let schema = this.state.schema;
		let microscope = this.state.microscope;
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

		if (schema === null) {
			return (
				<AppContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<DataLoader onClick={this.handleOpenNewSchema} />
				</AppContainer>
			);
		}

		if (this.state.isCreatingNewMicroscope === null) {
			return (
				<AppContainer
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
				</AppContainer>
			);
		}

		if (
			this.state.isCreatingNewMicroscope &&
			(microscope === null || elementData === null)
		) {
			return (
				<AppContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						microscopes={this.props.microscopes}
						micTemplatesPath={micTemplatesPath}
						micSavedPath={micSavedPath}
						onFileDrop={this.uploadMicroscopeFromDropzone}
						isDropzoneActive={this.state.isDropzoneActive}
						onClickMicroscopeSelection={this.handleMicroscopeSelection}
						onClickCreateNewMicroscope={this.createNewMicroscope}
						onClickCancel={this.cancel}
					/>
				</AppContainer>
			);
		}

		if (
			!this.state.isCreatingNewMicroscope &&
			(microscope === null || elementData === null)
		) {
			return (
				<AppContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						microscopes={this.props.microscopes}
						micTemplatesPath={micTemplatesPath}
						micSavedPath={micSavedPath}
						onFileDrop={this.uploadMicroscopeFromDropzone}
						onClickMicroscopeSelection={this.handleMicroscopeSelection}
						onClickCreateNewMicroscope={this.createNewMicroscope}
						onClickCancel={this.cancel}
					/>
				</AppContainer>
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
			<AppContainer
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
			</AppContainer>
		);
	}
}

class AppContainer extends React.PureComponent {
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

App.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	schema: PropTypes.arrayOf(PropTypes.object),
	microscope: PropTypes.arrayOf(PropTypes.object)
};

App.defaultProps = {
	height: 600,
	width: 800,
	schema: null,
	microscope: null,
	imagesPath: "./assets/",
	micTemplatesPath: "./microscopeTemplates",
	micSavedPath: "./microscopeSaved",
	tiers: ["1", "2", "3", "4", "5"],
	validationBeforeSave: true,
	microscopes: [createFromScratch, createFromFile],
	onLoadSchema: function(complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			complete();
		});
	}
};
