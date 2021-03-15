module.exports = {
    validateCommentReq: validateCommentReq,
  };
  
  function validateCommentReq(body) {
    var validated = {};
    var refused = false;
    var errors = {};
    var missingParams = '';
  
    if (typeof body === 'object' && body !== null && Object.keys(body).length) {
      if (body.email == null) {
        missingParams = addToMissingParams(missingParams, 'email');
      }
      if (body.blogID == null) {
        missingParams = missingParams + ', blogID';
      }
      if (body.comment == null) {
        missingParams = missingParams + ', comment';
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
  