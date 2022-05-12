import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user';
import chatReducer from './chat';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    conversations: chatReducer,
});

export default createRootReducer;