import PropTypes from "prop-types";
import React from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";
import MicroscopePreLoader from "./components/microscopePreLoader";
import MicroscopeLoader from "./components/microscopeLoader";

export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			microscope: props.microscope || null,
			schema: props.schema || null,
			mounted: false,
			activeTier: 1,
			isCreatingNewMicroscope: null,
			micName: null,
			elementData: {}
		};

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

		this.handleActiveTierSelection = this.handleActiveTierSelection.bind(this);
		this.setCreateNewMicroscope = this.setCreateNewMicroscope.bind(this);
		this.setLoadMicroscope = this.setLoadMicroscope.bind(this);

		this.handleMicroscopeSelection = this.handleMicroscopeSelection.bind(this);
		this.createNewMicroscope = this.createNewMicroscope.bind(this);
		this.cancel = this.cancel.bind(this);

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
		this.setState({ loading: true }, function() {
			this.props.onLoadSchema(this.handleCompleteOpenNewSchema);
		});
	}

	handleCompleteOpenNewSchema(newSchema) {
		this.setState({ schema: newSchema });
	}

	handleActiveTierSelection(item) {
		this.setState({ activeTier: item });
	}

	setCreateNewMicroscope() {
		this.setState({
			isCreatingNewMicroscope: true,
			micName: "Create from scratch"
		});
	}

	setLoadMicroscope() {
		this.setState({ isCreatingNewMicroscope: false });
	}

	handleMicroscopeSelection(item) {
		this.setState({ micName: item });
	}

	createNewMicroscope() {
		if (this.state.micName === "Create from scratch") {
			this.setState({ microscope: {}, elementData: {} });
		} else {
			//Load microscope from file
		}
	}

	cancel() {
		this.setState({
			microscope: null,
			isCreatingNewMicroscope: null,
			micName: null,
			elementData: {}
		});
	}

	updateElementData(elementData) {
		this.setState({ elementData: elementData });
	}

	exportJsonDataToFile() {
		let elementData = this.state.elementData;
		let microscope = Object.assign(this.state.microscope, elementData);
		console.log(microscope);
		let filename = "export-test.json";
		let contentType = "application/json;charset=utf-8;";
		var fakeDownloadButton = document.createElement("fakeDownloadButton");
		fakeDownloadButton.download = filename;
		fakeDownloadButton.href =
			"data:" +
			contentType +
			"," +
			encodeURIComponent(JSON.stringify(microscope));
		fakeDownloadButton.target = "_blank";
		document.body.appendChild(fakeDownloadButton);
		fakeDownloadButton.click();
		document.body.removeChild(fakeDownloadButton);
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
					<button onClick={this.handleOpenNewSchema}>Load schema</button>
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
						onClickTierSelection={this.handleActiveTierSelection}
						onClickCreateNewMicroscope={this.setCreateNewMicroscope}
						onClickLoadMicroscope={this.setLoadMicroscope}
					/>
				</AppContainer>
			);
		}

		if (this.state.isCreatingNewMicroscope && microscope === null) {
			return (
				<AppContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						micTemplatesPath={micTemplatesPath}
						micSavedPath={micSavedPath}
						onClickMicroscopeSelection={this.handleMicroscopeSelection}
						onClickCreateNewMicroscope={this.createNewMicroscope}
						onClickCancel={this.cancel}
					/>
				</AppContainer>
			);
		}

		if (!this.state.isCreatingNewMicroscope && microscope === null) {
			return (
				<AppContainer
					width={width}
					height={height}
					forwardedRef={this.overlaysContainerRef}
				>
					<MicroscopeLoader
						micTemplatesPath={micTemplatesPath}
						micSavedPath={micSavedPath}
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
			height: height - 60 - 40
		};

		return (
			<AppContainer
				width={width}
				height={height}
				forwardedRef={this.overlaysContainerRef}
			>
				<Header />
				<div style={style}>
					<Canvas
						ref={this.canvasRef}
						imagesPath={imagesPath}
						schema={schema}
						updateElementData={this.updateElementData}
						overlaysContainer={this.overlaysContainerRef.current}
					/>
					<Toolbar
						ref={this.toolbarRef}
						imagesPath={imagesPath}
						schema={schema}
					/>
				</div>
				<Footer onClickExport={this.exportJsonDataToFile} />
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
	onLoadSchema: function(complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			complete();
		});
	},
	onLoadMicroscope: function(complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			complete();
		});
	}
};
