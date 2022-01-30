import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import routes from '../helpers/routes';

export default function PublicRoute(props) {
	
    // const isLogged = localStorage.getItem("isLogged")

    // if(isLogged) return <Redirect to={routes.projects}/>


	return (
    <Route {...props} />
    )
}
