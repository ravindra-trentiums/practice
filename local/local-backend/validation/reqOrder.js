const paymentConstants = require('../../../constants/payments');

module.exports = {
  validateOrderReq: validateOrderReq
};

function validateOrderReq(body) {
  var validated = {};
  var refused = false;
  var errors = {};
  var missingParams = '';

  if (typeof body === 'object' && body !== null && Object.keys(body).length) {
    if (body.userID == null) {
      missingParams = addToMissingParams(missingParams, 'userID');
    }

    if (body.learningModeID == null) {
      missingParams = missingParams + ', learningModeID';
    }

    if (body.courseBatchID == null) {
      missingParams = missingParams + ', courseBatchID';
    }

    if (body.currencyType == null) {
      body.currencyType = paymentConstants.CURRENCY_TYPE_INR;
    } else {
      body.currencyType = parseInt(body.currencyType);
    }

    if (body.paymentType == null) {
      missingParams = addToMissingParams(missingParams, 'paymentType');
    }

    if (body.isInstallment == null) {
      body.isInstallment = false;
    } else {
      body.isInstallment = parseInt(body.isInstallment);
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
    errors: errors
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
