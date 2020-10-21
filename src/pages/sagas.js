
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import userSaga from './private/User/saga';
import signInSaga from './public/log-in/saga';

export default function * () {
    yield fork(signInSaga);
    yield fork(userSaga);
}

