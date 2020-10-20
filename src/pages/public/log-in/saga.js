
// outsource dependencies
import { takeEvery, put, delay } from 'redux-saga/effects';

// local dependencies
import {TYPE} from "./reducer";
import {TYPE as APP_TYPE} from '../../../app-reducer';

function * initializeSaga() {
    yield delay(1000 * 2);
    yield put({type: TYPE.META, payload: {initialized: true, disabled: false}})
}

function * callAppSaga({payload: {user}}) {
    yield put({type: TYPE.META, payload: {disabled: true}});
    yield delay(1000);
    yield put({type: APP_TYPE.GET_USER, payload: {user}});
    yield put({type: TYPE.META, payload: {disabled: false}})
}

export default function * () {
    yield takeEvery(TYPE.FETCH_TOKEN, callAppSaga);
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
}
