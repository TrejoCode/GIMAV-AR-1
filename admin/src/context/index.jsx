/**
 *  context.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Manejador principal del estado global de la aplicación.
*/

import React, { Component, createContext } from 'react';
import { login, logout, loadUser } from './users';

// Instancia del Context, métodos: Provider y Consumer

const Context = createContext();

class Provider extends Component {
    state = {
        login: login.bind(this),
        logout: logout.bind(this),
        loadUser: loadUser.bind(this),
        userx: 100
    };

    render() {
        return(
            <Context.Provider value = { this.state }>
                { this.props.children }
            </Context.Provider> 
        );
    }
    
}

/**
 * @function: Consumer
 * @description: HOC conector entre el estado global y un componente consumidor.
 * @param: Component => Componente Web
*/

const Consumer = Component => {
    return props => {
        return (
            <Context.Consumer>
                { context =>  <Component { ...props } context = { context } /> }
            </Context.Consumer>
        );
    };
}

export { Provider, Consumer };