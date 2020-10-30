
// outsource dependencies
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';

// local dependencies
import Users from './private/users/users';
import Header from '../components/header';
import LogIn from './public/log-in/log-in';
import { logIn, users, createUser } from '../routes';
import { selector as appSelector } from '../app-reducer';
import CreateUser from './private/create-user/create-user'


export default memo(() => {
    const { initialized } = useSelector(appSelector);

        return (<div className="App">
            <>
                { initialized && <Header/>}
                <Switch>
                    <Route path={users.path} component={Users}/>
                    <Route path={createUser.path} component={CreateUser} />
                    <Route path={logIn.path} component={LogIn}/>
                    <Redirect to={logIn.path}/>
                </Switch>
            </>
        </div>)
    }
)
