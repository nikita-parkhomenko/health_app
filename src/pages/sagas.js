
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import userSaga from './private/user/saga';
import usersSaga from './private/users/saga';
import signInSaga from './public/log-in/saga';
import createUserSaga from './private/create-user/saga';

export default function * () {
    yield fork(signInSaga);
    yield fork(userSaga);
    yield fork(usersSaga);
    yield fork(createUserSaga);
}

