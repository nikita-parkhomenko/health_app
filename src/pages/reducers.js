import userReducer from './private/User/reducer';
import logInReducer from './public/log-in/reducer';

export default {
    logIn: logInReducer,
    user: userReducer,
}
