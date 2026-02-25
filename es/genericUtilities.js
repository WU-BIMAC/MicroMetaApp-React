"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefined = isDefined;
exports.replaceLast = replaceLast;
exports.retrieveErrorMsg = retrieveErrorMsg;
exports.validateAcquisitionSettingsFile = validateAcquisitionSettingsFile;
exports.validateMicroscope = validateMicroscope;
exports.validateMicroscopeFile = validateMicroscopeFile;
exports.verifyMajorAppVersion = verifyMajorAppVersion;
exports.verifyMajorModelVersion = verifyMajorModelVersion;
var _react = _interopRequireDefault(require("react"));
var _package = require("../package.json");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validate = require("jsonschema").validate;
function isDefined(object) {
  if (object !== null && object !== undefined) return true;
  return false;
}
function replaceLast(str, pattern, replacement) {
  const match = typeof pattern === "string" ? pattern : (str.match(new RegExp(pattern.source, "g")) || []).slice(-1)[0];
  if (!match) return str;
  const last = str.lastIndexOf(match);
  return last !== -1 ? "".concat(str.slice(0, last)).concat(replacement).concat(str.slice(last + match.length)) : str;
}

//Check only major model version, minor and patches should not break stuff
//Return codes -2 < 2.0.0, -1 older model, 0 model does not exists, 1 current model, 2 newer model
function verifyMajorModelVersion(microscope, currentModelVersion) {
  let oldModelVersion = microscope.ModelVersion;
  let oldMainVersion = null;
  // let oldSubVersion = null;
  // let oldPatchVersion = null;
  //let hasModelVersion = true;
  if (!isDefined(oldModelVersion)) {
    return 0;
    // oldSubVersion = Number(oldModelVersionSplit[1]);
    // oldPatchVersion = Number(oldModelVersionSplit[2]);
  } // else {
  // 	hasModelVersion = false;
  // }
  let oldModelVersionSplit = oldModelVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
  oldMainVersion = Number(oldModelVersionSplit[0]);
  let modelVersionSplit = currentModelVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
  let modelMainVersion = Number(modelVersionSplit[0]);
  // let modelSubVersion = Number(modelVersionSplit[1]);
  // let modelPatchVersion = Number(modelVersionSplit[2]);
  if (oldMainVersion < 2) return -2;else if (
  //!hasModelVersion ||
  oldMainVersion < modelMainVersion //||
  // (oldMainVersion === modelMainVersion && oldSubVersion < modelSubVersion) ||
  // (oldMainVersion === modelMainVersion &&
  // 	oldSubVersion === modelSubVersion &&
  // 	oldPatchVersion < modelPatchVersion)
  ) {
    return -1;
  } else if (oldMainVersion > modelMainVersion) return 2;
  return 1;
}

//Check only major model version, minor and patches should not break stuff
//Return codes -1 older app, 0 model does not exists, 1 current app, 2 newer app
function verifyMajorAppVersion(microscope) {
  let oldAppVersion = microscope.AppVersion;
  let oldMainVersion = null;
  // let oldSubVersion = null;
  // let oldPatchVersion = null;
  // let oldBetaVersion = null;
  // let hasAppVersion = true;
  if (!isDefined(oldAppVersion)) {
    return 0;
    //let appVersionSplit = appVersion.split(/[\.,]+/);
    // console.log("oldAppVersionSplit");
    // console.log(oldAppVersionSplit);
  }
  // else {
  // 	hasAppVersion = false;
  // }
  let oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
  oldMainVersion = Number(oldAppVersionSplit[0]);
  // oldSubVersion = Number(oldAppVersionSplit[1]);
  // oldPatchVersion = Number(oldAppVersionSplit[2]);
  // oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", ""));
  let appVersionSplit = _package.version.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
  let appMainVersion = Number(appVersionSplit[0]);
  // let appSubVersion = Number(appVersionSplit[1]);
  // let appPatchVersion = Number(appVersionSplit[2]);
  // let appBetaVersion = Number(appVersionSplit[3].replace("b", ""));
  //let appVersionSplit = appVersion.split(/[\.,]+/);
  // console.log("appVersionSplit");
  // console.log(appVersionSplit);
  if (
  //!hasAppVersion ||
  oldMainVersion < appMainVersion //||
  // (oldMainVersion === appMainVersion && oldSubVersion < appSubVersion) ||
  // (oldMainVersion === appMainVersion &&
  // 	oldSubVersion === appSubVersion &&
  // 	oldPatchVersion < appPatchVersion) ||
  // (oldMainVersion === appMainVersion &&
  // 	oldSubVersion === appSubVersion &&
  // 	oldPatchVersion === appPatchVersion &&
  // 	oldBetaVersion < appBetaVersion)
  ) {
    return -1;
  } else if (oldMainVersion > appMainVersion) return 2;
  return 1;
}
function validateAcquisitionSettingsFile(settings, schemas) {
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
function validateMicroscopeFile(microscope, schemas, checkForMicroscopeStand) {
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
      if (isDefined(microscope.MicroscopeStand.Name) && isDefined(microscope.MicroscopeStand.Schema_ID) && isDefined(microscope.MicroscopeStand.ID) && isDefined(microscope.MicroscopeStand.Tier) && isDefined(microscope.MicroscopeStand.ModelVersion)) {
        hasMicroscopeStand = true;
      }
    }
    validated = hasMicroscopeStand && hasModelAppVersion && microscopeValidated;
  }
  return validated;
}
function retrieveErrorMsg(isApp, errorCode) {
  if (isApp) {
    switch (errorCode) {
      case -1:
        return "This file was created using a previous version of Micro-Meta App. Please save it using this version to avoid future issues if you want to create a Settings file.";
      case 0:
        return "This file does not contain a valid 'App Version' field and cannot be opened with this version of Micro-Meta App.";
      case 2:
        return "This file was created using a more recent version of Micro-Meta App. Please update your Micro-Meta App to the latest version you can download from here: https://github.com/WU-BIMAC/MicroMetaApp-Electron/releases/latest.";
      default:
        return null;
    }
  } else {
    switch (errorCode) {
      case -2:
        return "This file was created using a version of the Microscopy Metadata model that is no longer supported. You might be able to open it using v1.6.15 or earlier.";
      case -1:
        return;
        "This file was created using a previous version of the Microscopy Metadata model. Please contact us for possible solutions.";
      case 0:
        return;
        "This file does not contain a valid 'Model Version' field and cannot be opened with this version of Micro-Meta App.";
      case 2:
        return "This file was created using a version of the Microscopy Metadata model, which is not yet supported by this Micro-Meta App version. Please open it using a matching version of the App.";
      default:
        return null;
    }
  }
}
function validateMicroscope(microscope, schemas, checkForMicroscopeStand, checkForModelVersion, checkForAppVersion) {
  let isValidMicroscopeFile = validate(microscope, schemas, checkForMicroscopeStand);
  if (!isValidMicroscopeFile) {
    return {
      isValid: false,
      errorMsg: "This file does not appear to be a valid Microscope.JSON file. Please select a valid file."
    };
  }
  if (checkForModelVersion) {
    let modelVersion = null;
    Object.keys(schemas).forEach(schemaIndex => {
      let singleSchema = schemas[schemaIndex];
      if (singleSchema.title === "Instrument") {
        modelVersion = singleSchema.modelVersion;
      }
    });
    let isValidModelNumber = verifyMajorModelVersion(microscope, modelVersion);
    //console.log("isValidModelNumber-" + isValidModelNumber);
    let errorMsg = retrieveErrorMsg(false, isValidModelNumber);
    if (isValidModelNumber != 1) {
      return {
        isValid: false,
        errorMsg: errorMsg
      };
    }
  }
  if (checkForAppVersion) {
    let isValidAppNumber = verifyMajorAppVersion(microscope);
    //console.log("isValidAppNumber-" + isValidAppNumber);
    let errorMsg = retrieveErrorMsg(true, isValidAppNumber);
    if (isValidAppNumber == -1) {
      return {
        isValid: true,
        errorMsg: errorMsg
      };
    } else if (isValidAppNumber != 1) {
      return {
        isValid: false,
        errorMsg: errorMsg
      };
    }
  }
  return {
    isValid: true
  };
}