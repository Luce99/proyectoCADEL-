import React from 'react'
import {Switch, Route} from 'react-router-dom'
import AccountPage from '../pages/AccountPage'
import UsersPage from '../pages/admin/UsersPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProjectsPage from '../pages/ProjectsPage'
import RegisterPage from '../pages/RegisterPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import roles from '../helpers/roles'
import routes from '../helpers/routes'
import InscriptionPage from '../pages/InscriptionPage'
import AvancesPage from '../pages/AvancesPage'


export default function AppRouter(){
    return (
              <Switch>
              <PublicRoute exact path= {routes.home} component={HomePage}/>
              <PublicRoute exact path={routes.login} component={LoginPage}/>
              <PublicRoute exact path={routes.register} component={RegisterPage}/>
            

              <PublicRoute exact path={routes.account} component={AccountPage} />
              <PublicRoute exact path={routes.avances} component={AvancesPage} />
              <PublicRoute exact path={routes.projects} component={ProjectsPage} />
              <PublicRoute exact path={routes.InscriptionPage} component={InscriptionPage}/>
              <PublicRoute hasRole={roles.admin} exact path={routes.users.admin}  component={UsersPage} />
              <Route path ="*" component={NotFoundPage}/>
             </Switch>
    )
}