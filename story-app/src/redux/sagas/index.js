import { all, fork } from 'redux-saga/effects';

import category from './category'
import story from './story'
import storyDetail from './storyDetail'
import chapter from './chapter'
import comment from './comment'
import rating from './rating'
import auth from './auth'
import chapterDetail from './chapterDetail'
import tag from './tag'
import author from './author'

export default function* rootSaga() {
    yield all([
        fork(category),
        fork(story),
        fork(storyDetail),
        fork(chapter),
        fork(comment),
        fork(rating),
        fork(auth),
        fork(chapterDetail),
        fork(tag),
        fork(author),
    ]);
}