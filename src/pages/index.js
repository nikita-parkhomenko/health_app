
// outsource dependencies
import React, { memo } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// local dependencies
import User from './private/User/user';
import { logIn, user } from '../routes';
import LogIn from './public/log-in/log-in';


export default memo(() => <div className="App">
        <Switch>
            <Route path={logIn.path} component={LogIn} />
            <Route path={user.path} component={User} />
            <Redirect to={logIn.path} />
        </Switch>
    </div>
)
