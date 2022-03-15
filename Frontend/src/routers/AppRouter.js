import React from 'react'
import {Switch, Route} from 'react-router-dom'
import AccountPage from '../pages/AccountPage'
import UsersPage from '../pages/admin/UsersPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProjectsPage from '../pages/ProjectsPage'
import RegisterPage from '../pages/RegisterPage'
import roles from '../helpers/roles'
import routes from '../helpers/routes'
import InscriptionPage from '../pages/InscriptionPage'
import AvancesPage from '../pages/AvancesPage'


export default function AppRouter(){
    return (
              <Switch>
              <Route exact path= {routes.home} component={HomePage}/>
              <Route exact path={routes.login} component={LoginPage}/>
              <Route exact path={routes.register} component={RegisterPage}/>
            

              <Route exact path={routes.account} component={AccountPage} />
              <Route exact path={routes.avances} component={AvancesPage} />
              <Route exact path={routes.projects} component={ProjectsPage} />
              <Route exact path={routes.InscriptionPage} component={InscriptionPage}/>
              <Route hasRole={roles.admin} exact path={routes.users.admin}  component={UsersPage} />
              <Route path ="*" component={NotFoundPage}/>
             </Switch>
    )
}