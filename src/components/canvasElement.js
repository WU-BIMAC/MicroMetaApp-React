import React from "react";

import { Resizable } from "react-resizable";
import { ResizableBox } from "react-resizable";

import ImageElement from "./imageElement";
import MultiTabFormWithHeaderV3 from "./multiTabFormWithHeaderV3";
import ComponentsLoadingModal from "./componentsLoadingModal";
import ModalWindow from "./modalWindow";

const url = require("url");

import { string_copy_img } from "../constants";

export default class CanvasElement extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			editForm: null,
			//filteredComponentsForForm: null,
			isModalOpen: false,
      		modalContent: null,
			selectedLoadComponent: null,
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleDummy = this.handleDummy.bind(this);

		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
		this.handleLoadComponent = this.handleLoadComponent.bind(this);

		this.handleResize = this.handleResize.bind(this);

		this.updateMinMaxDimensions = this.updateMinMaxDimensions.bind(this);

		this.counter = 0;
		this.handleOpenMultiTabForm = this.handleOpenMultiTabForm.bind(this);
	}

	handleOpenMultiTabForm = () => {
		const { components, schema } = this.props;
		const categoryKey = schema.category;
	
		// Safety check
		if (!components || !categoryKey) {
			console.warn("Missing components or categoryKey:", components, categoryKey);
			return [];
		}
	
		const filteredComponents = Object.values(components[categoryKey] || {}).map(
			(entry) => entry.component
		);
	
		console.log("filteredComponents in canvasElement", filteredComponents);
	
		return filteredComponents;
	};
	
	handleCloseModal = () => {
		this.setState({ isModalOpen: false });
	};

	handleClick() {
		if (this.props.isDebug) console.log("inside of canvasElement in the function handleClick this is this.props.schema", this.props.schema);
		if (this.props.isDebug) console.log("inside of canvasElement in the function handleClick this is this.props.inputData", this.props.inputData);
		if (!this.props.isViewOnly) {
			this.props.setEditingOnCanvas(true);
			const filteredComponents = this.handleOpenMultiTabForm();
			let editForm = (
				<MultiTabFormWithHeaderV3
					selectedLoadComponent={this.state.selectedLoadComponent}
					filteredComponents={filteredComponents}
					imagesPath={this.props.imagesPath}
					validationUpdate={this.props.validationUpdate}
					title={"Edit " + this.props.formTitle}
					schema={this.props.schema}
					inputData={this.props.inputData}
					id={this.props.id}
					validationTier={this.props.validationTier}
					onConfirm={this.handleConfirm}
					onCancel={this.handleCancel}
					onDummy={this.handleDummy}
					onSave={this.handleSave}
					onLoad={this.handleLoad}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={
						this.props.currentChildrenComponentIdentifier
					}
					minChildrenComponentIdentifier={
						this.props.minChildrenComponentIdentifier
					}
					maxChildrenComponentIdentifier={
						this.props.maxChildrenComponentIdentifier
					}
					elementByType={this.props.elementByType}
					editable={true}
					isDebug={this.props.isDebug}
				/>
			);
			this.setState({ editing: true, editForm: editForm });
		}
	}

	handleConfirm(id, data, linkedFields, isOnError) {
		console.log("inside of handleConfirm");
		this.setState({ editing: false, editForm: null });
		this.props.setEditingOnCanvas(false);
		this.props.handleConfirm(id, data, linkedFields, isOnError);
	}

	handleCancel() {
		if(this.props.isDebug) console.log("inside of function handleCancel in canvasElement.js");
		this.props.setEditingOnCanvas(false);
		this.setState({ editing: false, editForm: null });
	}

	handleDummy() {
		if(this.props.isDebug) console.log("inside of function handleDummy in canvasElement.js");
		this.props.setEditingOnCanvas(true);
		this.setState({ editing: true});
	}

	handleSave(id, consolidatedData, linkedFields) {
		if(this.props.isDebug) console.log("inside of function handleSave in canvasElement.js");
		this.props.setEditingOnCanvas(false);
		this.props.handleConfirm(id, consolidatedData, linkedFields);
		this.props.onClickSave(id, consolidatedData, linkedFields);
	}

	handleLoadComponent = (selectedComponent) => {
		// Implement the logic to load the selected component here
		// For example, update the state to trigger a re-render
		// or call another function to fetch data based on the component
	  
		console.log("Loading component:", selectedComponent);
		// Close modal or update state as needed
		this.setState({ 
			selectedLoadComponent: selectedComponent,
			isModalOpen: false
		 });

		 if (!this.props.isViewOnly) {
			this.props.setEditingOnCanvas(true);
			const filteredComponents = this.handleOpenMultiTabForm();
			let editForm = (
				<MultiTabFormWithHeaderV3
					key={this.state.selectedLoadComponent?.Name || 'default-key'}
					selectedLoadComponent={selectedComponent}
					filteredComponents={filteredComponents}
					imagesPath={this.props.imagesPath}
					validationUpdate={this.props.validationUpdate}
					title={"Edit " + this.props.formTitle}
					schema={this.props.schema}
					inputData={this.props.inputData}
					id={this.props.id}
					validationTier={this.props.validationTier}
					onConfirm={this.handleConfirm}
					onCancel={this.handleCancel}
					onDummy={this.handleDummy}
					onSave={this.handleSave}
					onLoad={this.handleLoad}
					overlaysContainer={this.props.overlaysContainer}
					currentChildrenComponentIdentifier={
						this.props.currentChildrenComponentIdentifier
					}
					minChildrenComponentIdentifier={
						this.props.minChildrenComponentIdentifier
					}
					maxChildrenComponentIdentifier={
						this.props.maxChildrenComponentIdentifier
					}
					elementByType={this.props.elementByType}
					editable={true}
					isDebug={this.props.isDebug}
				/>
			);
			this.setState({ editing: true, editForm: editForm });
		}

	}

	handleLoad() {
		if(this.props.isDebug) console.log("inside of function handleLoad in canvasElement.js");

		const filteredComponents = this.handleOpenMultiTabForm();
		this.setState({
			modalContent: filteredComponents,
			isModalOpen: true
		});
		
	}

	handleResize(e, data) {
		let width = data.size.width;
		let height = data.size.height;
		let id = this.props.id;
		this.props.updateDimensions(id, width, height, true);
	}

	updateMinMaxDimensions(id, originalImgWidth, originalImgHeight) {
		// if (
		// 	this.state.originalWidth == originalImgWidth &&
		// 	this.state.originalHeight == originalImgHeight
		// )
		// 	return;
		// let scalingFactor = this.state.scalingFactor;
		// let scaledOriginalImgWidth = originalImgWidth * scalingFactor;
		// let scaledOriginalImgHeight = originalImgHeight * scalingFactor;
		// let minWidth = scaledOriginalImgWidth / 2;
		// let minHeight = scaledOriginalImgHeight / 2;
		// let maxWidth = scaledOriginalImgWidth * 2;
		// let maxHeight = scaledOriginalImgHeight * 2;
		// this.setState({
		// 	originalWidth: scaledOriginalImgWidth,
		// 	originalHeight: scaledOriginalImgHeight,
		// 	minWidth: minWidth,
		// 	minHeight: minHeight,
		// 	maxWidth: maxWidth,
		// 	maxHeight: maxHeight,
		// });
		// this.props.updateDimensions(
		// 	id,
		// 	scaledOriginalImgWidth,
		// 	scaledOriginalImgHeight,
		// 	false
		// );
	}

	render() {
		let style = {
			textAlign: "center",
			height: "100%",
			width: "100%",
			display: "flex",
			justifyContent: "center",
			backgroundColor: "transparent",
			padding: "0px",
			margin: "0px",
			border: "0px",
			font: "14px",
			color: "inherit",
			cursor: "pointer",
		};
		let resizableStyle = { border: "none" };
		let play = false;
		// if (!this.props.validated) {
		// 	resizableStyle = Object.assign(resizableStyle, {
		// 		border: "5px ridge red"
		// 	});
		// 	if (!this.props.dragged) {
		// 		play = true;
		// 	}
		// } else {
		// 	resizableStyle = Object.assign(resizableStyle, { border: "none" });
		// }
		let width = this.props.width;
		let height = this.props.height;

		let styleImage = {
			width: width,
			height: height,
		};

		let minWidth = this.props.minWidth;
		let minHeight = this.props.minHeight;
		let maxWidth = this.props.maxWidth;
		let maxHeight = this.props.maxHeight;
		let editForm = null;
		if (this.state.editing) {
			editForm = this.state.editForm;
		}

		return (
			<div>
				<ResizableBox
					width={width}
					height={height}
					minConstraints={[minWidth, minHeight]}
					maxConstraints={[maxWidth, maxHeight]}
					lockAspectRatio={true}
					onResizeStart={this.handleResizeStart}
					onResize={this.handleResize}
					onResizeStop={this.handleResizeStop}
					style={resizableStyle}
				>
					<button style={style} onClick={this.handleClick}>
						<ImageElement
							updateMinMaxDimensions={this.updateMinMaxDimensions}
							id={this.props.id}
							rotate={this.props.rotate}
							image={this.props.image}
							name={this.props.schema.title}
							style={styleImage}
						/>
					</button>
				</ResizableBox>
				{this.state.isModalOpen && (
					<ComponentsLoadingModal 
						overlaysContainer={document.body}
						components={this.state.modalContent}
						onClose={this.handleCloseModal}
						onLoadComponent={this.handleLoadComponent}
				  	/>
				// 	<ModalWindow overlaysContainer={document.body} style={{ position: 'fixed', zIndex: 1001 }}>
				// 	<div className="loading-modal-content">
				// 	<h2 style={{marginTop: 0}}>Component Details</h2>
				// 	<button 
				// 		onClick={this.handleCloseModal}
				// 		style={{marginBottom: 15}}
				// 	>
				// 		Close
				// 	</button>
				// 	<div style={{ // List container
				// 		borderTop: '1px solid #eee',
				// 		paddingTop: 15
				// 	}}>
				// 		{this.state.modalContent?.map((comp, index) => (
				// 		<div 
				// 			key={index}
				// 			style={{ // Card styles
				// 			margin: '10px 0',
				// 			padding: 15,
				// 			border: '1px solid #eee',
				// 			borderRadius: 4
				// 			}}
				// 		>
				// 			<h3 style={{margin: 0}}>
				// 			{comp.Name || 'Unnamed Component'}
				// 			</h3>
				// 			<pre style={{
				// 			whiteSpace: 'pre-wrap',
				// 			wordBreak: 'break-word',
				// 			margin: '10px 0 0 0'
				// 			}}>
				// 			{JSON.stringify(comp, null, 2)}
				// 			</pre>
				// 		</div>
				// 		))}
				// 	  </div>
				// 	</div>
				//   </ModalWindow>
				)}
				{editForm}
			
			</div>
		);
	}
}

CanvasElement.defaultProps = {
	maxWidth: 200,
	maxHeight: 200,
	text: "Something",
	handleClick: function (e) {
		console.log("Clicked!", e.clientX, e.clientY);
	},
};

export class CanvasElementDeleteButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (!this.props.isViewOnly) this.props.handleDelete(this.props.index);
	}

	render() {
		return (
			<button
				type="button"
				onClick={this.handleClick}
				style={this.props.myStyle}
			>
				x
			</button>
		);
	}
}

export class CanvasElementCopyButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (!this.props.isViewOnly) this.props.handleCopy(this.props.index);
	}

	render() {
		let styleImage = {
			width: "12.5px",
			height: "12.5px",
		};
		let copyImg = url.resolve(this.props.imagesPath, string_copy_img);
		let copyPath =
			copyImg +
			(copyImg.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
		return (
			<button
				type="button"
				onClick={this.handleClick}
				style={this.props.myStyle}
			>
				<img src={copyPath} alt={copyImg} style={styleImage} />
			</button>
		);
	}
}
