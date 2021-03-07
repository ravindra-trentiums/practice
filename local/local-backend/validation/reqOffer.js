module.exports = {
  validateOfferReq: validateOfferReq,
};

function validateOfferReq(body) {
  var validated = {};
  var refused = false;
  var errors = {};
  var missingParams = '';

  if (typeof body === 'object' && body !== null && Object.keys(body).length) {
    if (body.courseID == null) {
      missingParams = missingParams + ', courseID';
    }

    if (body.learningModeID == null) {
      missingParams = addToMissingParams(missingParams, 'learningModeID');
    }

    if (body.amountINR == null) {
      missingParams = addToMissingParams(missingParams, 'amountINR');
    }

    if (body.offerName == null) {
      missingParams = addToMissingParams(missingParams, 'offerName');
    }
    
    if (body.discountType == null) {
      missingParams = addToMissingParams(missingParams, 'discountType');
    }
    if (body.discountAmountINR == null) {
      missingParams = addToMissingParams(missingParams, 'discountAmountINR');
    }
    
    if (body.isInstallment == null) {
      missingParams = addToMissingParams(missingParams, 'isInstallment');
    }

    if (missingParams.trim().length > 0) {
      errors.request = `Invalid request. Body is missing arguments ${missingParams}.`;
    }

    if (errors.request == null) {
      for (var key in body.keys) {
        if (body.hasOwnProperty(key)) {
          switch (key) {
            case 'email':
              if (typeof body.email === 'text') {
              }
              break;
          }
        }
      }
    } else {
      refused = true;
    }
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
