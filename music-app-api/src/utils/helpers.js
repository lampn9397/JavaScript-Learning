import { defaultResponse } from './constants';


export const createResponse = (response = defaultResponse) => ({
  ...defaultResponse,
  ...response,
});