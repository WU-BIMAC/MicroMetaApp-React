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
			fileLoading: false
		};

		this.handleParseBinaryString = this.handleParseBinaryString.bind(this);

		this.readDroppedFiles = this.readDroppedFiles.bind(this);

		this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
		this.onFileReaderError = this.onFileReaderError.bind(this);
		this.onFileReaderLoad = this.onFileReaderLoad.bind(this);
	}

	onFileReaderAbort(e) {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	onFileReaderError(e) {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	handleParseBinaryString(binaryString) {
		return new Promise(() => {
			setTimeout(
				this.setState({ fileLoading: true }, function() {
					let microscope = JSON.parse(binaryString);
					this.props.onFileDrop(microscope);
				}),
				10000
			);
		});
	}

	onFileReaderLoad(e) {
		let binaryStr = e.target.result;
		// let microscope = JSON.parse(binaryStr);
		//this.props.onFileDrop(microscope);
		//this.setState({ fileLoaded: true });
		this.handleParseBinaryString(binaryStr, this.props.onFileDrop).then(
			this.setState({ fileLoading: false, fileLoaded: true })
		);
	}

	readDroppedFiles(acceptedFiles) {
		const reader = new FileReader();
		reader.onabort = this.onFileReaderAbort;
		reader.onerror = this.onFileReaderError;
		reader.onload = this.onFileReaderLoad;

		acceptedFiles.forEach(file => reader.readAsBinaryString(file));
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

		let inputData = this.props.microscopes;
		let dropzoneStyle = {
			borderStyle: "dashed",
			borderWidth: "thin",
			width: "410px"
		};

		let isDropzoneActive = this.props.isDropzoneActive;
		let fileLoading = this.state.fileLoading;
		let fileLoaded = this.state.fileLoaded;

		if (!isDropzoneActive) {
			dropzoneStyle = Object.assign(dropzoneStyle, { display: "none" });
		}

		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<DropdownMenu
						title={""}
						handleMenuItemClick={this.props.onClickMicroscopeSelection}
						inputData={inputData}
					/>
					<Dropzone
						onDrop={acceptedFiles => this.readDroppedFiles(acceptedFiles)}
						multiple={false}
					>
						{({ getRootProps, getInputProps }) => (
							<section style={dropzoneStyle}>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<p>Drag 'n' drop some files here, or click to select files</p>
								</div>
							</section>
						)}
					</Dropzone>
					<div>
						<Button
							onClick={
								(isDropzoneActive && fileLoaded && !fileLoading) ||
								!isDropzoneActive
									? this.props.onClickCreateNewMicroscope
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
						<Button
							onClick={this.props.onClickCancel}
							style={buttonStyle}
							size="lg"
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
