
// outsource dependencies
import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects'

// local dependencies
import TYPE from "./actions";
import { getToken } from '../../api/api';

function * initializeSaga() {
    yield put({ type: TYPE.META, payload: { initialized: true }})
}

function * fetchTokenSaga({payload: {user}}) {
    try {
        const token = yield call(getToken, user)
        const { accessToken, refreshToken } = token.data;
        console.log(accessToken, refreshToken);
    } catch(error) {

    }
}

export default function * () {
    console.log(TYPE.INITIALIZE);
    yield takeEvery(TYPE.FETCH_TOKEN, fetchTokenSaga);
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
}
