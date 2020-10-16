import { fork } from "redux-saga/effects";
import signInSaga from './sign-in/saga';

export default function * () {
    yield fork(signInSaga)
}
