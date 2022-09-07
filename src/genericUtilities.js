import React from "react";

import { version as appVersion } from "../package.json";

const validate = require("jsonschema").validate;

export function isDefined(object) {
	if (object !== null && object !== undefined) return true;
	return false;
}

export function replaceLast(str, pattern, replacement) {
	const match =
		typeof pattern === "string"
			? pattern
			: (str.match(new RegExp(pattern.source, "g")) || []).slice(-1)[0];
	if (!match) return str;
	const last = str.lastIndexOf(match);
	return last !== -1
		? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}`
		: str;
}

export function verifyModelVersion(microscope, currentModelVersion) {
	let oldModelVersion = microscope.ModelVersion;
	let oldMainVersion = null;
	let oldSubVersion = null;
	let oldPatchVersion = null;
	let hasModelVersion = true;
	if (isDefined(oldModelVersion)) {
		let oldModelVersionSplit = oldModelVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
		oldMainVersion = Number(oldModelVersionSplit[0]);
		oldSubVersion = Number(oldModelVersionSplit[1]);
		oldPatchVersion = Number(oldModelVersionSplit[2]);
	} else {
		hasModelVersion = false;
	}
	let modelVersionSplit = currentModelVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
	let modelMainVersion = Number(modelVersionSplit[0]);
	let modelSubVersion = Number(modelVersionSplit[1]);
	let modelPatchVersion = Number(modelVersionSplit[2]);
	if (
		!hasModelVersion ||
		oldMainVersion > modelMainVersion ||
		oldSubVersion > modelSubVersion ||
		oldPatchVersion > modelPatchVersion
	) {
		return false;
	}
	return true;
}

export function verifyAppVersion(microscope) {
	let oldAppVersion = microscope.AppVersion;
	let oldMainVersion = null;
	let oldSubVersion = null;
	let oldPatchVersion = null;
	let oldBetaVersion = null;
	let hasAppVersion = true;
	if (isDefined(oldAppVersion)) {
		let oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
		oldMainVersion = Number(oldAppVersionSplit[0]);
		oldSubVersion = Number(oldAppVersionSplit[1]);
		oldPatchVersion = Number(oldAppVersionSplit[2]);
		oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", ""));
		//let appVersionSplit = appVersion.split(/[\.,]+/);
		// console.log("oldAppVersionSplit");
		// console.log(oldAppVersionSplit);
	} else {
		hasAppVersion = false;
	}
	let appVersionSplit = appVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
	let appMainVersion = Number(appVersionSplit[0]);
	let appSubVersion = Number(appVersionSplit[1]);
	let appPatchVersion = Number(appVersionSplit[2]);
	let appBetaVersion = Number(appVersionSplit[3].replace("b", ""));
	//let appVersionSplit = appVersion.split(/[\.,]+/);
	// console.log("appVersionSplit");
	// console.log(appVersionSplit);
	if (
		!hasAppVersion ||
		oldMainVersion < appMainVersion ||
		oldSubVersion < appSubVersion ||
		oldPatchVersion < appPatchVersion ||
		oldBetaVersion < appBetaVersion
	) {
		return false;
	}
	return true;
}

export function validateAcquisitionSettingsFile(settings, schemas) {
	let imageSchema = null;
	let pixelsSchema = null;
	for (let i = 0; i < schemas.length; i++) {
		let schema = schemas[i];
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

export function validateMicroscopeFile(
	microscope,
	schemas,
	checkForMicroscopeStand
) {
	let micStandSchemaName = null;
	let microscopeSchema = null;
	for (let i = 0; i < schemas.length; i++) {
		let schema = schemas[i];
		if (schema.title === "Instrument") {
			microscopeSchema = schema;
		}
	}

	let microscopeValidation = validate(microscope, microscopeSchema);
	let microscopeValidated = microscopeValidation.valid;

	let hasModelAppVersion = false;
	if (isDefined(microscope.ModelVersion) && isDefined(microscope.AppVersion)) {
		hasModelAppVersion = true;
	}

	let validated = hasModelAppVersion && microscopeValidated;
	if (checkForMicroscopeStand) {
		let hasMicroscopeStand = false;
		if (isDefined(microscope.MicroscopeStand)) {
			if (
				isDefined(microscope.MicroscopeStand.Name) &&
				isDefined(microscope.MicroscopeStand.Schema_ID) &&
				isDefined(microscope.MicroscopeStand.ID) &&
				isDefined(microscope.MicroscopeStand.Tier) &&
				isDefined(microscope.MicroscopeStand.ModelVersion)
			) {
				hasMicroscopeStand = true;
			}
		}

		validated = hasMicroscopeStand && hasModelAppVersion && microscopeValidated;
	}

	return validated;
}

export function validateMicroscope(
	microscope,
	schemas,
	checkForMicroscopeStand,
	checkForModelVersion,
	checkForAppVersion
) {
	let isValidMicroscopeFile = validate(
		microscope,
		schemas,
		checkForMicroscopeStand
	);

	if (!isValidMicroscopeFile) {
		return {
			isValid: false,
			errorMsg:
				"The Microscope file you are trying to load does not contain a proper MicroMetaApp Microscope",
		};
	}

	if (checkForModelVersion) {
		let modelVersion = null;
		Object.keys(schemas).forEach((schemaIndex) => {
			let singleSchema = schemas[schemaIndex];
			if (singleSchema.title === "Instrument") {
				modelVersion = singleSchema.modelVersion;
			}
		});
		let isValidModelNumber = verifyModelVersion(microscope, modelVersion);
		if (!isValidModelNumber) {
			return {
				isValid: false,
				errorMsg:
					"The Microscope file you are trying to use was saved with a more recent model version. You have to open it using a matching version of Micro-Meta App.",
			};
		}
	}

	if (checkForAppVersion) {
		let isValidAppNumber = verifyAppVersion(microscope);
		if (!isValidAppNumber) {
			return {
				isValid: false,
				errorMsg:
					"The Microscope file you are trying to use was saved with a previous version of Micro-Meta App. To avoid errors, before proceeding please go back to the Manage Instrument section of the App and save this file again.",
			};
		}
	}

	return {
		isValid: true,
	};
}
