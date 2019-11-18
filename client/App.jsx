import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login_Home from '../imports/ui/layouts/login/Login_Home'
import Figo_Home from '../imports/ui/layouts/figo/Figo_Home'
import Admin_Home from '../imports/ui/layouts/admin/Admin_Home'


const App = () => {
    return (
        <div className="bg">
            <BrowserRouter>
                <Switch>
                    <Route path='/login' render={() => <Login_Home />} />
                    <Route path='/figo' render={() => (Meteor.userId() && localStorage.getItem('rmain_user_role') == 'User') ? (<Figo_Home />) : (<Redirect to='/login' />)} />
                    <Route path='/admin' render={() => (Meteor.userId() && localStorage.getItem('rmain_user_role') == 'Admin') ? (<Admin_Home />) : (<Redirect to='/login' />)} />
                    <Route render={() => <Login_Home />} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}


export default App 