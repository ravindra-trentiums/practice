import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from "./components/login";
import SignUp from "./components/signup";
function route() {
    return (
        <div className="outer">
            <div className="inner">
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path="/sign-in" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                </Switch>
            </div>
        </div>
    )
}

export default route
