/**
 *  @name: routes.jsx
 *  @version: 1.0.1
 *  @author: Sergio, Lucero
 *  @description: Manejo de todas las rutas de la aplicación
 * 	@process: 3
*/

import React from "react";
import { Provider } from '../context';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Páginas
import PageLogin from '../pages/login';
import PageParks from '../pages/parks';
import PageParksAdd from '../pages/parksAdd';
import PageQR from '../pages/qrs';
import PageQRAdd from '../pages/qrAdd';
import PageAR from '../pages/ars';
import PageUsers from '../pages/users';
import PageUsersAdd from '../pages/usersAdd';

// Función para declarar rutas privadas
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest }
        render = {
            props => {
                const auth = window.localStorage.getItem("GIMAV_AR_Admin");
                if (auth) {
                    return <Component { ...props } />;
                } else {
                    return (
                        <Redirect to = { { pathname: "/login", state: { from: props.location } } } />
                    );
                }
            }
        }
    />
);

const Routes = () => (
    <Provider>
        <BrowserRouter>
            <div className="flex main">
                <div className="column full">
                    <Switch>
                        <Route path = "/" exact component = { PageLogin } />
                        <Route path = "/login" exact component = { PageLogin } />
                        <PrivateRoute path = "/parques" exact component = { PageParks } />
                        <PrivateRoute path = "/parques/nuevo" exact component = { PageParksAdd } />
                        <PrivateRoute path = "/qr" exact component = { PageQR } />
                        <PrivateRoute path = "/qr/nuevo" exact component = { PageQRAdd } />
                        <PrivateRoute path = "/ar" exact component = { PageAR } />
                        <PrivateRoute path = "/usuarios" exact component = { PageUsers } />
                        <PrivateRoute path = "/usuarios/nuevo" exact component = { PageUsersAdd } />
                        <Route component = { PageLogin } />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
);

export default Routes;