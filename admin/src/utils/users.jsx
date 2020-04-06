/**
 * @function: loadUser
 * @description: Función para obtener el usuario actual
*/

import Request from '../utils/http';

export const loadUser = async () => {
    const request = new Request();
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