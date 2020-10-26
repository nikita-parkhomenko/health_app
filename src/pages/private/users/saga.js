
// outsource dependencies
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import ApiService from '../../../services/api-service';
import { selector as usersSelector } from './reducer';

function * initializeSaga() {
    yield delay(1000);
    try {
        yield call(getUsersSaga);
    } catch ({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message }});
    }
    yield put({ type: TYPE.META, payload: { initialized: true }});
}

function * getUsersSaga() {
    try {
        const usersResponse = yield call(ApiService.getUsers);
        const { content, totalPages } = usersResponse.data;
        yield put({ type: TYPE.META, payload: { users: content, totalPages } })
    } catch ({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message }});
    }
}

function * filterUsersSaga({ payload }) {
    yield put({ type: TYPE.META, payload: { disabled: true } });
    yield delay(1000 / 2);
    try {
        yield put({ type: TYPE.META, payload });
        let { name, page, sort, size, sortASC } = yield select(usersSelector);
        sort = `${sort},${sortASC ? 'ASC' : 'DESC'}`;

        const users = yield call(
            ApiService.filterUsers,
            { name },
            { page, sort, size }
        );
        const { content, totalPages } = users.data;
        yield put({ type: TYPE.META, payload: { users: content, totalPages } });
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
    yield put({ type: TYPE.META, payload: { disabled: false } });
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
    yield takeEvery(TYPE.FILTER_USERS, filterUsersSaga);
}
