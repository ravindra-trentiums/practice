module.exports = {
 validatePageCreateReq,
 validatePageUpdateReq,
 validatePageGetReq,
 validatePageGetPublicReq,
};

function validatePageCreateReq(body) {
  var validated = {};
  var refused = false;
  var errors = {};
  var missingParams = '';

  if (typeof body === 'object' && body !== null && Object.keys(body).length) {
    if (body.name == null) {
      missingParams = addToMissingParams(missingParams, 'name');
    }

    if (body.slug == null) {
      missingParams = addToMissingParams(missingParams, 'slug');
    }

    if (missingParams.trim().length > 0) {
      errors.request = `Invalid request. Body is missing arguments ${missingParams}.`;
    }

    refused = errors.request != null;

  } else {
    errors = undefined;
    refused = true;
  }

  return {
    validated: validated,
    refused: refused,
    errors: errors,
  };
}

function validatePageUpdateReq(body) {
  var validated = {};
  var refused = false;
  var errors = {};
  var missingParams = '';

  if (typeof body === 'object' && body !== null && Object.keys(body).length) {
    if (body.pageID == null) {
      missingParams = addToMissingParams(missingParams, 'pageID');
    }

    if (missingParams.trim().length > 0) {
      errors.request = `Invalid request. Body is missing arguments ${missingParams}.`;
    }

    refused = errors.request != null;

  } else {
    errors = undefined;
    refused = true;
  }

  return {
    validated: validated,
    refused: refused,
    errors: errors,
  };
}

function validatePageGetReq(body) {
  var validated = {};
  var refused = false;
  var errors = {};
  var missingParams = '';

  if (typeof body === 'object' && body !== null && Object.keys(body).length) {
    if (body.pageID == null) {
      missingParams = addToMissingParams(missingParams, 'pageID');
    }

    if (missingParams.trim().length > 0) {
      errors.request = `Invalid request. Body is missing arguments ${missingParams}.`;
    }

    refused = errors.request != null;

  } else {
    errors = undefined;
    refused = true;
  }

  return {
    validated: validated,
    refused: refused,
    errors: errors,
  };
}

function validatePageGetPublicReq(body) {
  var validated = {};
  var refused = false;
  var errors = {};
  var missingParams = '';

  if (typeof body === 'object' && body !== null && Object.keys(body).length) {
    if (body.slug == null) {
      missingParams = addToMissingParams(missingParams, 'slug');
    }

    if (missingParams.trim().length > 0) {
      errors.request = `Invalid request. Body is missing arguments ${missingParams}.`;
    }

    refused = errors.request != null;

  } else {
    errors = undefined;
    refused = true;
  }

  return {
    validated: validated,
    refused: refused,
    errors: errors,
  };
}

function addToMissingParams(missingParams, param) {
  if (missingParams.trim().length > 0) {
    missingParams = missingParams + `, ${param}`;
  } else {
    missingParams = param;
  }

  return missingParams;
}
