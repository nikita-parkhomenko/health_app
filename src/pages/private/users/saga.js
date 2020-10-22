
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

function * sortUsersSaga({ payload: { sortBy } }) {
    try {
        if (sortBy === 'Name') {
            const { sortNamesASC } = yield select(usersSelector);
            const sortedUsers = yield call(ApiService.sortUsers, { sortBy, sortField: sortNamesASC });
            yield put({
                type: TYPE.META,
                payload: { users: sortedUsers.data.content, sortNamesASC: !sortNamesASC }
            });
        }
        if (sortBy === 'Id') {
            const { sortIdASC } = yield select(usersSelector);
            const sortedUsers = yield call(ApiService.sortUsers, { sortBy, sortField: sortIdASC });
            console.log(sortedUsers);
            yield put({
                type: TYPE.META,
                payload: { users: sortedUsers.data.content, sortIdASC: !sortIdASC }
            });
        }
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
}

function * searchUsersSaga(action) {
    const { searchUser } = action.payload;
    yield put({ type: TYPE.META, payload: { disabled: true } });
    yield delay(1000);
    try {
        const searchedUsers = yield call(ApiService.findUser, searchUser);
        yield put({ type: TYPE.META, payload: { users: searchedUsers.data.content } });
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
    yield put({ type: TYPE.META, payload: { disabled: false } });
}

function * nextPageSaga(action) {
    const { pageNumber } = action.payload;
    try {
        const users = yield call(ApiService.getPage, pageNumber);
        yield put({ type: TYPE.META, payload: { users: users.data.content, currentPage: pageNumber } });
    } catch({ message }) {
        yield put({ type: TYPE.META, payload: { errorMessage: message } });
    }
}

export default function * () {
    yield takeEvery(TYPE.INITIALIZE, initializeSaga);
    yield takeEvery(TYPE.SORT_USERS, sortUsersSaga);
    yield takeEvery(TYPE.SEARCH_USERS, searchUsersSaga);
    yield takeEvery(TYPE.NEXT_PAGE, nextPageSaga);
}
