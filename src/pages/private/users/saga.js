
// outsource dependencies
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { TYPE } from './reducer';
import { selector as usersSelector } from './reducer';
import ApiService from '../../../services/api-service';

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
        const items = yield call(ApiService.getUsers);
        const { content, totalElements } = items.data;
        yield put({ type: TYPE.META, payload: { items: content, totalElements } })
    } catch ({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message }});
    }
}

function * filterItemsSaga({ payload }) {
    yield put({ type: TYPE.META, payload: { disabled: true } });
    yield delay(1000 * 0.5);
    try {
        yield put({ type: TYPE.META, payload });
        const { name, roles, page, sort, size, sortASC } = yield select(usersSelector);

        const items = yield call(
            ApiService.filterUsers,
            { name, roles },
            { page, sort: `${sort},${sortASC ? 'ASC' : 'DESC'}`, size }
        );
        const { content, totalElements } = items.data;
        yield put({ type: TYPE.META, payload: { items: content, totalElements } });
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
    yield put({ type: TYPE.META, payload: { disabled: false } });
}

function * deleteItemSaga({ payload: { id } }) {
    yield put({ type: TYPE.META, payload: { disabled: true } });
    try {
        yield call(ApiService.deleteUser, id);
        yield put({ type: TYPE.FILTER_ITEMS });
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
    yield put({ type: TYPE.META, payload: { disabled: false } });
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
    yield takeEvery(TYPE.FILTER_ITEMS, filterItemsSaga);
    yield takeEvery(TYPE.DELETE_ITEM, deleteItemSaga);
}
