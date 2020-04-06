/**
 *  @name: token.js
 *  @version: 1.0.0
 *  @author: Sergio
 *  @description: Funciones de cifrado
 * 	@process: 2
*/

const crypto = require('crypto');

/**
 *  @name: getToken
 *  @version: 1.0.0
 *  @description: Obtener una cádena cifrada
*/
function getToken(data) {
    var cipher = crypto.createCipher('aes-256-cbc', 'G1m4V!4r#!Adm1n2o19#');
    var encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

/**
 *  @name: getDecode
 *  @version: 1.0.0
 *  @description: Obtener una cádena descifrada
*/
function getDecode(token) {
    var decipher = crypto.createDecipher('aes-256-cbc', 'G1m4V!4r#!Adm1n2o19#');
    var decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { getToken, getDecode }