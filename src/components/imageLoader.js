import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

const url = require("url");

import {
	string_json_ext,
	number_logo_width,
	number_logo_height,
	loadImage_mode_selector_tooltip,
	loadImage_from_file_tooltip,
	loadImage_from_repo_names_tooltip,
	loadImage_mode_continue_tooltip,
	back_tooltip,
	string_back_img,
} from "../constants";

export default class ImageLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fileLoaded: false,
			fileLoading: false,
			//selectedManu: null,
			selectedSettings: null,
			//settingsNames: null,
			imageMap: null,
		};

		this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
		this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
		this.dropzoneDrop = this.dropzoneDrop.bind(this);
		this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
		this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);

		this.handleLoadMetadataComplete = this.handleLoadMetadataComplete.bind(
			this
		);
		this.handleImageSelection = this.handleImageSelection.bind(this);

		// this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
		// this.onFileReaderError = this.onFileReaderError.bind(this);
		// this.onFileReaderLoad = this.onFileReaderLoad.bind(this);

		//this.onClickSettingsSelection = this.onClickSettingsSelection.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		return null;
	}

	handleImageSelection(item) {
		let imageMap = this.state.imageMap;
		let image = imageMap[item];
		console.log("image");
		console.log(image);
		this.props.handleLoadMetadataComplete(image);
	}

	handleLoadMetadataComplete(imageMetadata) {
		if (imageMetadata.Error != null && imageMetadata.Error !== undefined) {
			window.alert("Error " + imageMetadata.Error);
		} else if (
			imageMetadata.Images !== null &&
			imageMetadata.Images !== undefined
		) {
			let images = imageMetadata.Images;
			let firstImage = null;
			let imageMap = {};
			for (let index in images) {
				let image = images[index];
				if (firstImage === null) firstImage = image;
				let name = image.Name;
				imageMap[name] = image;
			}
			console.log("image");
			console.log(firstImage);
			this.props.handleLoadMetadataComplete(firstImage);
			this.setState({ imageMap: imageMap, fileLoaded: true });
		} else {
			let image = imageMetadata.Image;
			console.log("image");
			console.log(image);
			this.props.handleLoadMetadataComplete(image);
			this.setState({ fileLoaded: true });
		}
	}

	dropzoneDrop() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDropRejected() {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	processFile() {
		//let binaryStr = e.target.result;
		//let microscope = JSON.parse(binaryStr);
		//
	}

	dropzoneDropAccepted(acceptedFiles) {
		// const reader = new FileReader();
		// reader.onabort = this.onFileReaderAbort;
		// reader.onerror = this.onFileReaderError;
		// reader.onload = this.onFileReaderLoad;

		acceptedFiles.forEach((file) => {
			console.log(file);
			this.props.onLoadMetadata(file.path, this.handleLoadMetadataComplete);
		});

		this.setState({ fileLoading: false });
	}

	dropzoneDialogOpen() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDialogCancel() {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	render() {
		const buttonStyle = {
			width: "200px",
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

		let width = 410;
		let margin = 5;

		//let inputData = this.props.settings;

		let dropzoneStyle = {
			borderStyle: "dashed",
			borderWidth: "thin",
			width: `${width}px`,
		};
		let styleImageContainer = {
			width: `${number_logo_width}px`,
			height: `${number_logo_height}px`,
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let styleImageBk = {
			width: "20px",
			height: "20px",
			marginLeft: "10px",
			marginRight: "10px",
		};
		let imageMap = this.state.imageMap;

		let loadingMode = this.props.loadingMode;
		let fileLoading = this.state.fileLoading;
		let fileLoaded = this.state.fileLoaded;

		let isDropzoneActive = false;
		if (loadingMode === 1) isDropzoneActive = true;

		let list = [];
		list.push(
			<DropdownMenu
				key={"dropdown-loadingOption"}
				title={""}
				handleMenuItemClick={this.props.onClickLoadingOptionSelection}
				defaultValue={this.props.loadingOptions.indexOf(
					this.props.loadingOption
				)}
				inputData={this.props.loadingOptions}
				width={width}
				margin={margin}
				tooltip={loadImage_mode_selector_tooltip}
			/>
		);
		if (loadingMode === 1) {
			list.push(
				<PopoverTooltip
					key={"dropzone-tooltip"}
					position={loadImage_from_file_tooltip.position}
					title={loadImage_from_file_tooltip.title}
					content={loadImage_from_file_tooltip.content}
					element={
						<Dropzone
							key={"dropzone"}
							onFileDialogCancel={this.dropzoneDialogCancel}
							onDrop={this.dropzoneDrop}
							onDropAccepted={this.dropzoneDropAccepted}
							onDropRejected={this.dropzoneDropRejected}
							multiple={false}
						>
							{({ getRootProps, getInputProps }) => (
								<section style={dropzoneStyle}>
									<div {...getRootProps()}>
										<input
											{...getInputProps({ onClick: this.dropzoneDialogOpen })}
										/>
										<p>Select an existing Image file you want to work on.</p>
									</div>
								</section>
							)}
						</Dropzone>
					}
				/>
			);
		}
		if (imageMap !== null) {
			list.push(
				<DropdownMenu
					key={"dropdown-names"}
					title={""}
					handleMenuItemClick={this.handleImageSelection}
					inputData={Object.keys(imageMap)}
					//defaultValue={defaultMic}
					width={width}
					margin={margin}
					tooltip={loadImage_from_repo_names_tooltip}
				/>
			);
		}

		let backImgPath_tmp = url.resolve(this.props.imagesPath, string_back_img);
		let backImgPath =
			backImgPath_tmp +
			(backImgPath_tmp.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");

		list.push(
			<div key="buttons">
				<PopoverTooltip
					position={back_tooltip.position}
					title={back_tooltip.title}
					content={back_tooltip.content}
					element={
						<Button
							onClick={this.props.onClickBack}
							style={buttonStyle}
							size="lg"
							variant="outline-dark"
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									//gap: "10px",
								}}
							>
								<img
									src={backImgPath}
									alt={backImgPath_tmp}
									style={styleImageBk}
									onLoad={this.onImgLoad}
								/>
								Back
							</div>
						</Button>
					}
				/>
				<PopoverTooltip
					position={loadImage_mode_continue_tooltip.position}
					title={loadImage_mode_continue_tooltip.title}
					content={loadImage_mode_continue_tooltip.content}
					element={
						<Button
							onClick={
								(isDropzoneActive && fileLoaded && !fileLoading) ||
								!isDropzoneActive
									? this.props.onClickConfirm
									: null
							}
							style={buttonStyle}
							size="lg"
							disabled={isDropzoneActive && (!fileLoaded || fileLoading)}
						>
							{isDropzoneActive && !fileLoaded && !fileLoading
								? "Waiting for file"
								: isDropzoneActive && fileLoading
								? "Loading file"
								: "Continue"}
						</Button>
					}
				/>
			</div>
		);

		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<div style={styleImageContainer}>
						<img
							src={this.props.logoImg}
							alt={this.props.logoImg}
							style={styleImage}
							onLoad={this.onImgLoad}
						/>
					</div>
					<div style={{ textAlign: "center", fontWeight: "bold" }}>
						Manage Settings Step 2/3: Load Image File
					</div>
					{list}
				</div>
			</div>
		);
	}
}
