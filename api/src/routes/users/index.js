/**
 *  users.js
 *  @version: 1.0.0
 *  @author: Sergio, Lucero
 *  @description: Rutas y métodos para /users
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const token = require('../../auth/token');
const database = require('../../database/users');

const route = new koaRouter({ 
    prefix: '/users' 
});


route.post('/login', koaBody(), async (context) => {
    try {
        let data = context.request.body;
        data = { ...data, password: token.getToken(data.password) };
        context.body = await database.usuariosLogin_Post(data);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});

route.post("/token", koaBody(), async (context) => {
	try {
		const data = context.request.body;
		const result = token.getDecode(data.user);
		context.body = { data: result };
	} catch (error) {
		console.log(error.message);
		context.body = { error: true, message: "Error de token" };
	}
});

route.get('/', koaBody(), async (context) => {
    try {
        context.body = await database.usersAll_Get();
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});


route.get('/:id', koaBody(), async (context) => {
    try {
        const id = parseString(context.params.id);
        context.body = await database.usersId_Get(id);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});

route.post('/add', koaBody(), async (context) => {
    try {
        let data = context.request.body;
        data = { ...data, password: token.getToken(data.password) };
        context.body = await database.usersAdd_Post(data);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});

route.delete('/delete/:id', koaBody(), async (context) => {
    try {
        const id= parseInt(context.params.id);
        context.body = await database.userId_Delete(id);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});


module.exports = route;