import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ActionDetails from '../pages/ActionUser'
import Action from '../pages/Action'
import Ajouter from '../pages/Ajouter'
import AuthService from "../services/auth.service";
import Interlocuteur from '../pages/Interlocuteur'
import InterlocuteurDetails from '../pages/InterlocuteurDetails'
import CustomerInfo from '../pages/CustomerInfo'
import CustomerModify from '../pages/societeMod'
import ActionMod from '../pages/ActionMod'
import InterlocuteurMod from '../pages/InterlocuteurMod'
import { Redirect } from 'react-router-dom';
import PageError from '../pages/Error-page';

const CRMRoutes = () => {
    const user = AuthService.getCurrentUser();
    return (
        <Switch>

            {user ?
                <>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/Action/:id' component={Action} />
                    <Route path='/Action' component={ActionDetails}  />
                    <Route path='/Societes' component={Customers} />
                    <Route path='/Societe/:id' component={CustomerInfo} />
                    <Route path='/modifier/:id' component={CustomerModify} />
                    <Route path='/Interlocuteur/:id' component={Interlocuteur} />
                    <Route path='/ajouter' component={Ajouter} />
                    <Route path='/register' component={Register} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Inter/modifier/:id' component={InterlocuteurMod} />
                    <Route path='/Actions/modifier/:id' component={ActionMod} />
                    <Route path='/Interl' component={InterlocuteurDetails} />
                </>
              

                :
                <div>
                    
                    <Route path='*' exact component={PageError} />
                    <Route path='/Login' component={Login} />
                </div>

            }


        </Switch>
    )
}

export default CRMRoutes
