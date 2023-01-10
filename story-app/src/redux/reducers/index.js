import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import categoryReducer from './category'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    category: categoryReducer,
});

export default createRootReducer;