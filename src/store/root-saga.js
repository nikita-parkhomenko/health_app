
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import pages from '../pages/sagas';

export default function * rootSaga() {
    yield fork(pages);
}
