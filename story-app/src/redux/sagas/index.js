import { all, fork } from 'redux-saga/effects';

import category from './category'
import story from './story'
import storyDetail from './storyDetail'
import chapter from './chapter'

export default function* rootSaga() {
    yield all([
        fork(category),
        fork(story),
        fork(storyDetail),
        fork(chapter),
    ]);
}