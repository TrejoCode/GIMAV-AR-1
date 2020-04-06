/**
 *  @name: http.jsx
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Cliente HTTP para todas las peticiones Web basada en superagent: GET, POST, DELETE, PUT, PATCH
 *  @param: {string} url: "/EndPoint"
 *  @param: {Object} data: Payload
*/

import request from "superagent";

// Web API URL
const baseUrl = 'https://gimav-api.herokuapp.com';

class Request {

    get(url, data) {
        const result = request
            .get(baseUrl + url)
            .query(data)
            .set('gimav_ar_api_key', '99b912ca0eaa23961269f00d570158431a27886d0601f74530c1988151bc4046')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                const { status } = error;
                if (status >= 400) {
                    return { error: { message: error.message, statusCode: status } };
                }
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    post(url, data) {
        const result = request
            .post(baseUrl + url)
            .send(data)
            .set('gimav_ar_api_key', '99b912ca0eaa23961269f00d570158431a27886d0601f74530c1988151bc4046')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    delete(url, data) {
        const result = request
            .delete(baseUrl + url)
            .send(data)
            .set('gimav_ar_api_key', '99b912ca0eaa23961269f00d570158431a27886d0601f74530c1988151bc4046')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    put(url, data) {
        const result = request
            .put(baseUrl + url)
            .send(data)
            .set('gimav_ar_api_key', '99b912ca0eaa23961269f00d570158431a27886d0601f74530c1988151bc4046')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

    patch(url, data) {
        const result = request
            .patch(baseUrl + url)
            .send(data)
            .set('gimav_ar_api_key', '99b912ca0eaa23961269f00d570158431a27886d0601f74530c1988151bc4046')
            .then(response => {
                const { error } = response.body;
                if (error) {
                    return { error: { message: error.message } };
                } else {
                    return { result: response.body, statusCode: response.status };
                }
            })
            .catch(error => {
                return { error: { message: error.message, statusCode: 503 } };
            });
        return result;
    }

}

export default Request;
