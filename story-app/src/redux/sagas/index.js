import { all, fork } from 'redux-saga/effects';

import category from './category'

export default function* rootSaga() {
    yield all([
        fork(category),
    ]);
}