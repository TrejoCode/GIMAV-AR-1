/**
 *  @name: index.js
 *  @author: Sergio lucero
 *  @description: Incorporación de todas las rutas de la aplicación
*/

// Importar todas las rutas
const auth = require("../auth");
const users = require("./users");
const qrs = require("./qr");
const ars = require("./ar");
const parks = require("./parks");

module.exports = {
    routes: [
        auth.routes(),
        users.routes(),
        qrs.routes(),
        ars.routes(),
        parks.routes()    
    ]
};
