import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import categoryReducer from './category'
import storyReducer from './story'
import storyDetailReducer from './storyDetail'
import chapterReducer from './chapter'
import commentReducer from './comment'
import ratingReducer from './rating'
import authReducer from './auth'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    category: categoryReducer,
    story: storyReducer,
    storyDetail: storyDetailReducer,
    chapter: chapterReducer,
    comment: commentReducer,
    rating: ratingReducer,
    auth: authReducer,
});

export default createRootReducer;