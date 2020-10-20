
// outsource dependencies
import {Switch, Redirect, Route} from "react-router-dom";
import LogIn from "./public/log-in/log-in";
import User from './private/User/user';
import React, {memo} from "react";

// local dependencies
import {logIn, user} from '../routes';


export default memo(() => {
    return <div className="App">
        <Switch>
            <Route path={logIn.path} component={LogIn} />
            <Route path={user.path} component={User} />
            <Redirect to={logIn.path} />
        </Switch>
    </div>
})
