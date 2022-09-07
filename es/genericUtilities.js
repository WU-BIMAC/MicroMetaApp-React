"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefined = isDefined;
exports.replaceLast = replaceLast;
exports.validateAcquisitionSettingsFile = validateAcquisitionSettingsFile;
exports.validateMicroscope = validateMicroscope;
exports.validateMicroscopeFile = validateMicroscopeFile;
exports.verifyAppVersion = verifyAppVersion;
exports.verifyModelVersion = verifyModelVersion;

var _react = _interopRequireDefault(require("react"));

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = require("jsonschema").validate;

function isDefined(object) {
  if (object !== null && object !== undefined) return true;
  return false;
}

function replaceLast(str, pattern, replacement) {
  var match = typeof pattern === "string" ? pattern : (str.match(new RegExp(pattern.source, "g")) || []).slice(-1)[0];
  if (!match) return str;
  var last = str.lastIndexOf(match);
  return last !== -1 ? "".concat(str.slice(0, last)).concat(replacement).concat(str.slice(last + match.length)) : str;
}

function verifyModelVersion(microscope, currentModelVersion) {
  var oldModelVersion = microscope.ModelVersion;
  var oldMainVersion = null;
  var oldSubVersion = null;
  var oldPatchVersion = null;
  var hasModelVersion = true;

  if (isDefined(oldModelVersion)) {
    var oldModelVersionSplit = oldModelVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

    oldMainVersion = Number(oldModelVersionSplit[0]);
    oldSubVersion = Number(oldModelVersionSplit[1]);
    oldPatchVersion = Number(oldModelVersionSplit[2]);
  } else {
    hasModelVersion = false;
  }

  var modelVersionSplit = currentModelVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

  var modelMainVersion = Number(modelVersionSplit[0]);
  var modelSubVersion = Number(modelVersionSplit[1]);
  var modelPatchVersion = Number(modelVersionSplit[2]);

  if (!hasModelVersion || oldMainVersion > modelMainVersion || oldSubVersion > modelSubVersion || oldPatchVersion > modelPatchVersion) {
    return false;
  }

  return true;
}

function verifyAppVersion(microscope) {
  var oldAppVersion = microscope.AppVersion;
  var oldMainVersion = null;
  var oldSubVersion = null;
  var oldPatchVersion = null;
  var oldBetaVersion = null;
  var hasAppVersion = true;

  if (isDefined(oldAppVersion)) {
    var oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

    oldMainVersion = Number(oldAppVersionSplit[0]);
    oldSubVersion = Number(oldAppVersionSplit[1]);
    oldPatchVersion = Number(oldAppVersionSplit[2]);
    oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", "")); //let appVersionSplit = appVersion.split(/[\.,]+/);
    // console.log("oldAppVersionSplit");
    // console.log(oldAppVersionSplit);
  } else {
    hasAppVersion = false;
  }

  var appVersionSplit = _package.version.split(/[\.-]+/); //oldVersion.replaceAll(".", "");


  var appMainVersion = Number(appVersionSplit[0]);
  var appSubVersion = Number(appVersionSplit[1]);
  var appPatchVersion = Number(appVersionSplit[2]);
  var appBetaVersion = Number(appVersionSplit[3].replace("b", "")); //let appVersionSplit = appVersion.split(/[\.,]+/);
  // console.log("appVersionSplit");
  // console.log(appVersionSplit);

  if (!hasAppVersion || oldMainVersion < appMainVersion || oldSubVersion < appSubVersion || oldPatchVersion < appPatchVersion || oldBetaVersion < appBetaVersion) {
    return false;
  }

  return true;
}

function validateAcquisitionSettingsFile(settings, schemas) {
  var imageSchema = null;
  var pixelsSchema = null;

  for (var i = 0; i < schemas.length; i++) {
    var schema = schemas[i];

    if (schema.title === "Image") {
      imageSchema = schema;
    } else if (schema.title === "Pixels") {
      pixelsSchema = schema;
    }
  }

  var imageValidation = validate(settings, imageSchema);
  var imageValidated = imageValidation.valid;
  var pixelsValidation = validate(settings.Pixels, pixelsSchema);
  var pixelsValidated = pixelsValidation.valid;
  var validated = imageValidated && pixelsValidated;
  return validated;
}

function validateMicroscopeFile(microscope, schemas, checkForMicroscopeStand) {
  var micStandSchemaName = null;
  var microscopeSchema = null;

  for (var i = 0; i < schemas.length; i++) {
    var schema = schemas[i];

    if (schema.title === "Instrument") {
      microscopeSchema = schema;
    }
  }

  var microscopeValidation = validate(microscope, microscopeSchema);
  var microscopeValidated = microscopeValidation.valid;
  var hasModelAppVersion = false;

  if (isDefined(microscope.ModelVersion) && isDefined(microscope.AppVersion)) {
    hasModelAppVersion = true;
  }

  var validated = hasModelAppVersion && microscopeValidated;

  if (checkForMicroscopeStand) {
    var hasMicroscopeStand = false;

    if (isDefined(microscope.MicroscopeStand)) {
      if (isDefined(microscope.MicroscopeStand.Name) && isDefined(microscope.MicroscopeStand.Schema_ID) && isDefined(microscope.MicroscopeStand.ID) && isDefined(microscope.MicroscopeStand.Tier) && isDefined(microscope.MicroscopeStand.ModelVersion)) {
        hasMicroscopeStand = true;
      }
    }

    validated = hasMicroscopeStand && hasModelAppVersion && microscopeValidated;
  }

  return validated;
}

function validateMicroscope(microscope, schemas, checkForMicroscopeStand, checkForModelVersion, checkForAppVersion) {
  var isValidMicroscopeFile = validate(microscope, schemas, checkForMicroscopeStand);

  if (!isValidMicroscopeFile) {
    return {
      isValid: false,
      errorMsg: "The Microscope file you are trying to load does not contain a proper MicroMetaApp Microscope"
    };
  }

  if (checkForModelVersion) {
    var modelVersion = null;
    Object.keys(schemas).forEach(function (schemaIndex) {
      var singleSchema = schemas[schemaIndex];

      if (singleSchema.title === "Instrument") {
        modelVersion = singleSchema.modelVersion;
      }
    });
    var isValidModelNumber = verifyModelVersion(microscope, modelVersion);

    if (!isValidModelNumber) {
      return {
        isValid: false,
        errorMsg: "The Microscope file you are trying to use was saved with a more recent model version. You have to open it using a matching version of Micro-Meta App."
      };
    }
  }

  if (checkForAppVersion) {
    var isValidAppNumber = verifyAppVersion(microscope);

    if (!isValidAppNumber) {
      return {
        isValid: false,
        errorMsg: "The Microscope file you are trying to use was saved with a previous version of Micro-Meta App. To avoid errors, before proceeding please go back to the Manage Instrument section of the App and save this file again."
      };
    }
  }

  return {
    isValid: true
  };
}