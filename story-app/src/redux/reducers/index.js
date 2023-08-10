import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import categoryReducer from './category'
import storyReducer from './story'
import storyDetailReducer from './storyDetail'
import chapterReducer from './chapter'
import commentReducer from './comment'
import ratingReducer from './rating'
import authReducer from './auth'
import chapterDetailReducer from './chapterDetail'
import readingConfigReducer from './readingConfig'
import tagReducer from './tag'
import authorReducer from './author'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    category: categoryReducer,
    story: storyReducer,
    storyDetail: storyDetailReducer,
    chapter: chapterReducer,
    comment: commentReducer,
    rating: ratingReducer,
    auth: authReducer,
    chapterDetail: chapterDetailReducer,
    readingConfig: readingConfigReducer,
    tag: tagReducer,
    author: authorReducer,
});

export default createRootReducer;