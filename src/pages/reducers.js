
// local dependencies
import usersReducer from './private/users/reducer';
import logInReducer from './public/log-in/reducer';
import createUserReducer from './private/create-user/reducer';

export default {
    users: usersReducer,
    logIn: logInReducer,
    createUser: createUserReducer,
}
