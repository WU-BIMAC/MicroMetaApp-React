import React from "react";

export function isDefined(object) {
	if (object !== null && object !== undefined) return true;
	return false;
}

const validate = require("jsonschema").validate;

export function validateAcquisitionSettings(settings, schemas) {
	let imageSchema = null;
	let pixelsSchema = null;
	for (let i = 0; i < Object.keys(schemas); i++) {
		let key = Object.keys(schemas)[i];
		let schema = schemas[key];
		if (schema.title === "Image") {
			imageSchema = schema;
		} else if (schema.title === "Pixels") {
			pixelsSchema = schema;
		}
	}
	let imageValidation = validate(settings, imageSchema);
	let imageValidated = imageValidation.valid;

	let pixelsValidation = validate(settings.Pixels, pixelsSchema);
	let pixelsValidated = pixelsValidation.valid;
	let validated = imageValidated && pixelsValidated;

	return validated;
}

export function validateMicroscope(
	microscope,
	schemas,
	checkForMicroscopeStand
) {
	let micStandSchemaName = null;
	if (checkForMicroscopeStand) {
		if (isDefined(microscope.MicroscopeStand))
			micStandSchemaName = microscope.MicroscopeStand.Schema_ID.replace(
				".json",
				""
			);
	}

	let microscopeSchema = null;
	let microscopeStandSchema = null;
	for (let i = 0; i < Object.keys(schemas); i++) {
		let key = Object.keys(schemas)[i];
		let schema = schemas[key];
		if (schema.title === "Instrument") {
			microscopeSchema = schema;
		} else if (
			isDefined(micStandSchemaName) &&
			schema.title === micStandSchemaName
		) {
			microscopeStandSchema = schema;
		}
	}

	let microscopeValidation = validate(microscope, microscopeSchema);
	let microscopeValidated = microscopeValidation.valid;

	let validated = microscopeValidated;
	if (checkForMicroscopeStand) {
		let microscopeStandValidation = validate(
			microscope.MicroscopeStand,
			microscopeStandSchema
		);
		let microscopeStandValidated = microscopeStandValidation.valid;
		validated = microscopeStandValidated && microscopeValidated;
	}

	return validated;
}
