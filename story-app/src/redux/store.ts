import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers'

export const history = createBrowserHistory();

export const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    createRootReducer(history),
    applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
    )
);

export type RootState = ReturnType<typeof store.getState>;

export default store;