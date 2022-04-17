import jwt from 'jsonwebtoken';

import { jwtOptions } from '../../app';
import { defaultResponse } from '../constants';

export const createResponse = (response = defaultResponse) => {
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
