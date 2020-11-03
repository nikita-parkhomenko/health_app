
// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './app-reducer';
import ApiService  from './services/api-service';
import { instance } from './services/axios-instance';

function * initializeSaga() {
    try {
        const tokens = yield call(ApiService.getTokenFromStorage);
        if (tokens) {
            const { accessToken } = tokens;
            instance.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
            yield call(getUserSaga);
        }
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
}

export function * getUserSaga() {
    try {
        const userData = yield call(ApiService.getUser);
        if (userData.status === 200) {
            yield put({ type: TYPE.META, payload: { user: userData.data }})
        }
    } catch ({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message }});
    }
    yield put({ type: TYPE.META, payload: { initialized: true } });
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
    yield takeEvery(TYPE.GET_USER, getUserSaga);
}
