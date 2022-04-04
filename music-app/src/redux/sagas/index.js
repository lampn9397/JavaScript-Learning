import { all, fork } from 'redux-saga/effects';

import homeMusicsSaga from './homeMusic'
import songRankSaga from './songRank'

export default function* rootSaga() {
    yield all([
        fork(homeMusicsSaga),
        fork(songRankSaga)
    ]);
}
