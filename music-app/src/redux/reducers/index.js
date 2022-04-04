import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import homeMusicReducer from './homeMusic'
import musicRankReducer from './songRank'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    musics: homeMusicReducer,
    musicRank: musicRankReducer,
});

export default createRootReducer;