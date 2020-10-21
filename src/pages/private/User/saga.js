// outsource dependencies
import { takeEvery, put, call, delay } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { getUserSaga } from '../../../app-saga';

function * initializeSaga() {
    yield delay(1000);
    try {
        yield put({ type: TYPE.META, payload: { initialized: true }});
    } catch ({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message }});
    }
}

function * refreshUserSaga () {
    yield put({ type: TYPE.META, payload: { initialized: false, disabled: true }});
    yield delay(1000);
    try {
        yield call(getUserSaga);
    } catch ({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } })
    }
    yield put({ type: TYPE.META, payload: { initialized: true, disabled: false }});
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
    yield takeEvery(TYPE.REFRESH_USER, refreshUserSaga);
}
