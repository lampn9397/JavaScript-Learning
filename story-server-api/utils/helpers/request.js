const { defaultResponse } = require('../constants');

module.exports.createResponse = (response = defaultResponse) => {
  const responseModel = {
    ...defaultResponse,
    ...response,
  };

  // Remove `results` field if `ok` = false
  if (!responseModel.ok) {
    responseModel.results = undefined;
  }

  return responseModel;
};
