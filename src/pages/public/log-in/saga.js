
// outsource dependencies
import { push } from 'connected-react-router';
import { takeEvery, put, delay, call } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { getUserSaga } from '../../../app-saga';
import ApiService from '../../../services/api-service';
import { instance } from '../../../services/axios-instance';

function * initializeSaga() {
    yield delay(1000 * 2);
    yield put({ type: TYPE.META, payload: { initialized: true, disabled: false }})
}

function * logInSaga({ payload }) {
    try {
        yield put({ type: TYPE.META, payload: { disabled: true }});
        yield delay(1000);

        const user = {
            client: 'admin_application',
            ...payload
        }
        const token = yield call(ApiService.getToken, user);
        const { accessToken, refreshToken } = token.data;
        yield call(ApiService.saveTokenToStorage, { accessToken, refreshToken });
        // save new access token to axios instance headers
        instance.defaults.headers['Authorization'] = 'Bearer ' + accessToken;

        yield call(getUserSaga);
        yield put(push('/user'));
    } catch({ message }) {
        yield put({ type:TYPE.META, payload: { errorMessage: message }});
    }
    yield put({ type: TYPE.META, payload: { disabled: false }});

}

export default function * () {
    yield takeEvery(TYPE.LOG_IN, logInSaga);
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
}
