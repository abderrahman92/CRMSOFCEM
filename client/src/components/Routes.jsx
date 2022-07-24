import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Action from '../pages/Action'
import Ajouter from '../pages/Ajouter'
import AuthService from "../services/auth.service";
import Interlocuteur from '../pages/Interlocuteur'
import CustomerInfo from '../pages/CustomerInfo'
import CustomerModify from '../pages/societeMod'
const Routes = () => {
    const user = AuthService.getCurrentUser();
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            {user? <Route path='/Action/:id' component={Action}/>: null }
            <Route path='/Societes' component={Customers}/>
            <Route path='/Societe/:id' component={CustomerInfo}/>
            <Route path='/modifier/:id' component={CustomerModify}/>
            <Route path='/Interlocuteur/:id' component={Interlocuteur}/>
            <Route path='/ajouter' component={Ajouter}/>
            <Route path='/register' component={Register}/>
            <Route path='/Login' component={Login}/>
            <Route path='/Interlocuteur' component={Interlocuteur}/>
        </Switch>
    )
}

export default Routes
