import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";

import DropdownMenu from "./DropdownMenu";

export default class MicroscopeLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fileLoaded: false,
			fileLoading: false,
			selectedManu: null,
			micNames: null
		};

		this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
		this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
		this.dropzoneDrop = this.dropzoneDrop.bind(this);
		this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
		this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);

		this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
		this.onFileReaderError = this.onFileReaderError.bind(this);
		this.onFileReaderLoad = this.onFileReaderLoad.bind(this);

		this.onClickManufacturerSelection = this.onClickManufacturerSelection.bind(
			this
		);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.loadingMode === 2) {
			if (props.microscopes !== null && props.microscopes !== undefined) {
				if (state.selectedManu === null) {
					let selectedManu = Object.keys(props.microscopes)[0];
					let micNames = props.microscopes[selectedManu];
					props.onClickMicroscopeSelection(micNames[0]);
					return { selectedManu: selectedManu, micNames: micNames };
				}
			}
		}
		return null;
	}

	onFileReaderAbort(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderError(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderLoad(e) {
		let binaryStr = e.target.result;
		let microscope = JSON.parse(binaryStr);
		this.props.onFileDrop(microscope);
		this.setState({ fileLoaded: true });
	}

	dropzoneDrop() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDropRejected() {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	dropzoneDropAccepted(acceptedFiles) {
		const reader = new FileReader();
		reader.onabort = this.onFileReaderAbort;
		reader.onerror = this.onFileReaderError;
		reader.onload = this.onFileReaderLoad;

		acceptedFiles.forEach(file => reader.readAsBinaryString(file));

		this.setState({ fileLoading: false });
	}

	dropzoneDialogOpen() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDialogCancel() {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	onClickManufacturerSelection(item) {
		let micNames = this.props.microscopes[item];
		this.setState({ selectedManu: item, micNames: micNames });
		this.props.onClickMicroscopeSelection(this.props.microscopes[item][0]);
	}

	render() {
		const buttonStyle = {
			width: "200px",
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

		let width = 410;
		let margin = 5;

		let inputData = this.props.microscopes;

		let dropzoneStyle = {
			borderStyle: "dashed",
			borderWidth: "thin",
			width: `${width}px`
		};

		let loadingMode = this.props.loadingMode;
		let fileLoading = this.state.fileLoading;
		let fileLoaded = this.state.fileLoaded;

		let selectedManu = this.state.selectedManu;

		let isDropzoneActive = false;
		if (loadingMode === 1) isDropzoneActive = true;

		let list = [];
		list.push(
			<DropdownMenu
				key={"dropdown-loadingOption"}
				title={""}
				handleMenuItemClick={this.props.onClickLoadingOptionSelection}
				inputData={this.props.loadingOptions}
				width={width}
				margin={margin}
			/>
		);
		if (loadingMode === 1) {
			list.push(
				<Dropzone
					key={"dropzone"}
					onFileDialogCancel={this.dropzoneDialogCancel}
					onDrop={this.dropzoneDrop}
					onDropAccepted={this.dropzoneDropAccepted}
					onDropRejected={this.dropzoneDropRejected}
					accept={".json"}
					multiple={false}
				>
					{({ getRootProps, getInputProps }) => (
						<section style={dropzoneStyle}>
							<div {...getRootProps()}>
								<input
									{...getInputProps({ onClick: this.dropzoneDialogOpen })}
								/>
								<p>Drag 'n' drop some files here, or click to select files</p>
							</div>
						</section>
					)}
				</Dropzone>
			);
		}

		if (loadingMode === 2) {
			list.push(
				<DropdownMenu
					key={"dropdown-manufacturers"}
					title={""}
					handleMenuItemClick={this.onClickManufacturerSelection}
					inputData={Object.keys(inputData)}
					width={width}
					margin={margin}
				/>
			);

			if (selectedManu !== null && selectedManu !== undefined) {
				console.log(this.state.micNames);
				// console.log("selectedManu");
				// console.log(selectedManu);
				//let names = inputData[selectedManu];
				// console.log("names");
				// console.log(names);
				list.push(
					<DropdownMenu
						key={"dropdown-names"}
						title={""}
						handleMenuItemClick={this.props.onClickMicroscopeSelection}
						inputData={this.state.micNames}
						width={width}
						margin={margin}
					/>
				);
			}
		}
		list.push(
			<div key="buttons">
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
							: "Confirm"}
				</Button>
				<Button onClick={this.props.onClickBack} style={buttonStyle} size="lg">
					Back
				</Button>
			</div>
		);

		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>{list}</div>
			</div>
		);
	}
}
