
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import userSaga from './private/user/saga';
import usersSaga from './private/users/saga';
import signInSaga from './public/log-in/saga';

export default function * () {
    yield fork(signInSaga);
    yield fork(userSaga);
    yield fork(usersSaga);
}

