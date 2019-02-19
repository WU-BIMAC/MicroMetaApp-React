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

		this.handleCompleteOpenNewSchema = this.handleCompleteOpenNewSchema.bind(
			this
		);
		this.handleOpenNewSchema = this.handleOpenNewSchema.bind(this);

		this.state = {
			schema: props.schema || null
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.schema !== state.schema && props.schema !== null) {
			return { schema: props.schema };
		}
		return null;
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
		const style = {
			display: "-webkit-box", // OLD - iOS 6-, Safari 3.1-6
			display: "-moz-box", // OLD - Firefox 19- (doesn't work very well)
			display: "-ms-flexbox", // TWEENER - IE 10
			display: "-webkit-flex", // NEW - Chrome
			display: "flex" // NEW, Spec - Opera 12.1, Firefox 20+
		};

		//TODO with this strategy i can create multiple views
		//1st view: selection tier / new mic / use mic (+ import mic here maybe?)
		//2nd view: canvas with toolbar (+ possibile schema replacement?
		//	or the scheme selection can be done in the previous view)
		//	(+ export mic on file for the moment)
		//3rd view: settings (+ export settings on file for the moment)

		if (this.state.schema === null) {
			return (
				<div>
					<button onClick={this.handleOpenNewSchema}>Open new schema</button>
				</div>
			);
		}

		return (
			<div>
				<Header />
				<div style={style}>
					<Canvas ref={this.canvasRef} />
					<Toolbar ref={this.toolbarRef} schema={this.state.schema} />
				</div>
				<Footer />
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
	schema: null
};
