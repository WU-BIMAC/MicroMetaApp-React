import React from "react";
import { version as appVersion } from "../package.json";

var validate = require("jsonschema").validate;

export function isDefined(object) {
  if (object !== null && object !== undefined) return true;
  return false;
}
export function verifyAppVersion(microscope) {
  var oldAppVersion = microscope.AppVersion;
  var oldMainVersion = null;
  var oldSubVersion = null;
  var oldPatchVersion = null;
  var oldBetaVersion = null;
  var hasAppVersion = true;

  if (oldAppVersion !== undefined && oldAppVersion !== null) {
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

  var appVersionSplit = appVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

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
export function validateAcquisitionSettings(settings, schemas) {
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
  return imageValidated && pixelsValidated;
}
export function validateMicroscope(microscope, schemas, checkForMicroscopeStand) {
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