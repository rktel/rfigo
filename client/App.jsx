import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login_Home from '../imports/ui/layouts/login/Login_Home'
import Figo_Home from '../imports/ui/layouts/figo/Figo_Home'
import Admin_Home from '../imports/ui/layouts/admin/Admin_Home'
import Nofound from '../imports/ui/layouts/nofound/Nofound'

const App = () => {
    const [heightApp, setHeightApp] = useState(window.innerHeight)

    useEffect(() => {
        window.addEventListener('resize', () => setHeightApp(window.innerHeight))
    }, [])

    const isUserRole = () => (Meteor.userId() && localStorage.getItem('rmain_user_role') == 'User')
    const isAdminRole = () => (Meteor.userId() && localStorage.getItem('rmain_user_role') == 'Admin')

    return (
        <div className="bg">
            <BrowserRouter>
                <Switch>
                    <Route path='/login' render={() => <Login_Home heightApp={heightApp} />} />
                    <Route path='/figo' render={() => isUserRole() ? (<Figo_Home heightApp={heightApp} />) : (<Redirect to='/login' />)} />
                    <Route path='/admin' render={() => isAdminRole() ? (<Admin_Home heightApp={heightApp} />) : (<Redirect to='/login' />)} />
                    <Route render={() => <Nofound heightApp={heightApp} />} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App 