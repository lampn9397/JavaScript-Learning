import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import useReducer from './user';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    user: useReducer,
});

export default createRootReducer;