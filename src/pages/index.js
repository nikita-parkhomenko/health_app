
// outsource dependencies
import React, { memo } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// local dependencies
import User from './private/user/user';
import Users from './private/users/users';
import LogIn from './public/log-in/log-in';
import { logIn, user, users } from '../routes';


export default memo(() => <div className="App">
        <Switch>
            <Route path={logIn.path} component={LogIn} />
            <Route path={user.path} component={User} />
            <Route path={users.path} component={Users} />
            <Redirect to={logIn.path} />
        </Switch>
    </div>
)