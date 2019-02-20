/* eslint-disable no-dupe-keys */
import PropTypes from "prop-types";
import React from "react";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Toolbar } from "./components/toolbar";
import { Canvas } from "./components/canvas";

export default class App extends React.PureComponent {
	constructor(props) {
		super(props);
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

		this.state = {
			schema: props.schema || null,
			mounted: false
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.schema !== state.schema && props.schema !== null) {
			return { schema: props.schema };
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

	render() {
		var { imagesPath, width, height } = this.props;
		var schema = this.state.schema;
		//const style = {
		//  This is setting/overriding the same key of style obj I think (?)
		//  unless a CSS-in-JS library handles this (idk) (this would work in a stylesheet)
		//	display: "-webkit-box", // OLD - iOS 6-, Safari 3.1-6
		//	display: "-moz-box", // OLD - Firefox 19- (doesn't work very well)
		//	display: "-ms-flexbox", // TWEENER - IE 10
		//	display: "-webkit-flex", // NEW - Chrome
		//	display: "flex" // NEW, Spec - Opera 12.1, Firefox 20+
		//};

		const style = {
			display: "flex",
			height: height - 60 - 40 // 60px header 40px footer
		};

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
					<button onClick={this.handleOpenNewSchema}>Open new schema</button>
				</AppContainer>
			);
		}

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
						overlaysContainer={this.overlaysContainerRef.current}
					/>
					<Toolbar ref={this.toolbarRef} schema={schema} />
				</div>
				<Footer />
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
	schema: PropTypes.arrayOf(PropTypes.object)
};

App.defaultProps = {
	height: 600,
	width: 800,
	schema: null,
	imagesPath: "./assets/",
	onLoadSchema: function(complete) {
		// Do some stuff... show pane for people to browse/select schema.. etc.
		setTimeout(function() {
			complete();
		});
	}
};
