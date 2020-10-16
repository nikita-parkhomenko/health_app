
// outsource dependencies
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

// local dependencies
import rootSaga from './root-saga';
import pages from '../pages/reducers';

const rootReducer = combineReducers({
    form,
    ...pages,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

sagaMiddleware.run(rootSaga);

export default store;
