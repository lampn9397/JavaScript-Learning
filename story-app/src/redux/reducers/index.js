import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import categoryReducer from './category'
import storyReducer from './story'
import storyDetailReducer from './storyDetail'
import chapterReducer from './chapter'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    category: categoryReducer,
    story: storyReducer,
    storyDetail: storyDetailReducer,
    chapter: chapterReducer,
});

export default createRootReducer;