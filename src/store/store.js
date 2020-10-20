
// outsource dependencies
import {createBrowserHistory} from 'history';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { connectRouter } from 'connected-react-router'
import { routerMiddleware } from 'connected-react-router';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

// local dependencies
import rootSaga from './root-saga';
import pages from '../pages/reducers';
import appReducer from '../app-reducer';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
        ...pages,
        app: appReducer,
        router: connectRouter(history),
        form,
    }),
    compose(
        applyMiddleware(sagaMiddleware, routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

sagaMiddleware.run(rootSaga);

export default store;
