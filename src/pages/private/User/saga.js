// outsource dependencies
import { takeEvery, put, call, delay } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';

function * initializeSaga() {
    yield delay(1000);
    try {
        yield put({type: TYPE.META, payload: {initialized: true}});
    } catch ({message}) {
        yield put({type: TYPE.META, payload: {errorMessage: message}});
    }
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
}
