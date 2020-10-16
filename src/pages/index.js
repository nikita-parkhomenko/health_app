import {Switch, Redirect, Route} from "react-router-dom";
import LogIn from "./sign-in/log-in";
import React, {memo} from "react";


export default memo(() => {
    return <div className="App">
        <Switch>
            <Route path="/log-in" component={LogIn} /> {/*TODO const*/}
            <Redirect to="/log-in" />
        </Switch>
    </div>
})
