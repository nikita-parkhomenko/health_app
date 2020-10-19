// outsource dependencies
import { push } from 'connected-react-router';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import {TYPE} from "./app-reducer";
import {TYPE as LOGIN_TYPE} from './pages/public/log-in/reducer';
import ApiService  from './services/api-service';

function * getUserSaga({payload: {user}}) {
    try {
        yield put({type:TYPE.META, payload: {initialized: true}});
        const token = yield call(ApiService.getToken, user);
        const {accessToken, refreshToken} = token.data;
        yield call(ApiService.saveTokenToStorage, {accessToken, refreshToken});
        const userData = yield call(ApiService.getUser);
        if (userData.status === 200) {
            yield put({type: TYPE.META, payload: {user: userData.data}})
            yield put(push('/user'));
        }
    } catch ({message}) {
        yield put({type: LOGIN_TYPE.META, payload: {errorMessage: message}});
    }
}

export default function * () {
    yield takeEvery(TYPE.GET_USER, getUserSaga);
}
