
// local dependencies
import userReducer from './private/user/reducer';
import usersReducer from './private/users/reducer';
import logInReducer from './public/log-in/reducer';
import createUserReducer from './private/create-user/reducer';

export default {
    user: userReducer,
    users: usersReducer,
    logIn: logInReducer,
    createUser: createUserReducer,
}
