/**
 *  users.js
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Manejador de ejecuciones del Context para Usuarios.
*/

// HTTP Cliente
import Request from '../utils/http';
const request = new Request();

/**
 * @function: login
 * @param: data: Object
 * @description: Función para asignar Token de usuario al estado global
*/
export function login(data) {
    window.localStorage.setItem("GIMAV_AR_Admin", JSON.stringify(data));
    this.setState({ user: data });
    setTimeout(() => {
        window.location = "/tablero";
    }, 1000);
};


/**
 * @function: logout
 * @param: data: Object
 * @description: Función para remover Token de usuario del estado global y del local storage
*/
export function logout() {
    window.localStorage.removeItem("GIMAV_AR_Admin");
    setTimeout(() => {
        window.location = "/login";
    }, 1000);
};


/**
 * @function: loadUser
 * @description: Función para resolver el Token de usuario y asignarlo al estado global.
*/
export async function loadUser() {
    let token = window.localStorage.getItem("GIMAV_AR_Admin");
    let payload = null;
    if (token) { 
        payload = JSON.parse(token);
        const { result, error } = await request.post('/users/token', payload);
        if ( result && !result.error ) {
            payload = JSON.parse(result.data);
        } else {
            console.log(error.message);
        }
        return payload;
    }
};