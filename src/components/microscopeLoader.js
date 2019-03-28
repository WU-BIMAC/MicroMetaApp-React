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

		this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
		this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
		this.dropzoneDrop = this.dropzoneDrop.bind(this);
		this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
		this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);

		this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
		this.onFileReaderError = this.onFileReaderError.bind(this);
		this.onFileReaderLoad = this.onFileReaderLoad.bind(this);
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
