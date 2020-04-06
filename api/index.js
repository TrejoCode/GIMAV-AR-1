/**
 * @name: index.js
 * @author: Sergio, Lucero
 * @description: Punto de entrada
 * @process: 1
*/


const http = require("http");
const koa = require("koa");
const app = new koa();
const cors = require("koa2-cors");
const key = require('./src/auth/variables');

// Cross - Origin Resource Sharing(CORS)
// https://es.wikipedia.org/wiki/Intercambio_de_recursos_de_origen_cruzado
app.use(
    cors({
        origin: () => {
            if (process.env.NODE_ENV !== "production") {
                return "*";
            }
            return "*";
        }
    })
);


/**
 * 	@name: validateToken
 * 	@description: Validar si el Web Token es válido para el uso de la aplicación
*/

app.use(async (context, next) => {

    function validateToken() {

        const { getDecode } = require('./src/auth/token');  
    
        try {
            const path = context.path;
            if (path.indexOf('auth') > 0) {
                return true;
            }
            let auth = getDecode(context.headers.gimav_ar_api_key);
            if (auth) {
                if (auth === process.env.IDAPP) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } catch(error) {
            console.error(error.message);
            return false;
        }
    
    }

    if (validateToken()) {
        await next();
    } else {
        context.status = 403;
        context.body = "Invalid Web API Token";
    }

    const responseTime = context.response.get("X-Response-Time");
    console.log(`${context.method} ${context.url} - ${responseTime} - Resonse Status: ${context.status} 🔚` );

});

/**
 * 	Calculo del Header "X-Response-Time"
 * 	Computar y asignar el Header "X-Response-Time" el calculo en 'ms' de peticiones
*/

app.use(async (context, next) => {
    const startTime = Date.now();
    await next();
    const ms = Date.now() - startTime;
    context.set("X-Response-Time", `${ms}ms`);
});


// Cargar el router

const { routes } = require("./src/routes");
routes.map(route => {
    app.use(route);
});


// 	Variables de entorno / 	HOST: String, PORT: Int

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 8081;

const server = http.createServer(app.callback());

/**
 * 	Ejecución del servidor.
 * 	Activa el evento "Listener" este método es llamado cuando un evento ocurre.
*/

server.listen(PORT, () => {
    console.log("Application in execution:", `${HOST}:${PORT} 🔥`);
});
