
// outsource dependencies
import { takeEvery, put, delay, call } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { users } from '../../../routes';
import { push } from 'connected-react-router'
import ApiService from '../../../services/api-service';

function * initializeSaga() {
    yield delay(1000);
    yield put({ type: TYPE.META, payload: { initialized: true }});
}

function * createUserSaga(action) {
    yield put({ type: TYPE.META, payload: { disabled: true } });
    try {
        const { roles, suffix, ...rest } = action.payload;
        const user = {
            ...rest,
            roles: roles.map(role => ({ id: role.id, name: role.value })),
            suffix: suffix.value,
        }
        const resp = yield call(ApiService.createUser, user);
        yield delay(1000);
        if (resp.status === 200) {
            yield put(push(users.path));
        }
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
    yield put({ type: TYPE.META, payload: { disabled: false } });
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
    yield takeEvery(TYPE.CREATE_USER, createUserSaga)
}
