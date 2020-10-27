
// outsource dependencies
import { takeEvery, put, delay } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';

function * initializeSaga() {
    yield delay(1000);
    yield put({ type: TYPE.META, payload: { initialized: true }});
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
}
