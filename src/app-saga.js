
// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './app-reducer';
import ApiService  from './services/api-service';

export function * getUserSaga() {
    try {
        yield put({ type:TYPE.META, payload: { initialized: true }});
        const userData = yield call(ApiService.getUser);
        if (userData.status === 200) {
            yield put({ type: TYPE.META, payload: { user: userData.data }})
        }
    } catch ({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message }});
    }
}

export default function * () {
    yield takeEvery(TYPE.GET_USER, getUserSaga);
}
