
// outsource dependencies
import { fork } from "redux-saga/effects";

// local dependencies
import signInSaga from './public/log-in/saga';
import userSaga from './private/User/saga';

export default function * () {
    yield fork(signInSaga);
    yield fork(userSaga);
}

