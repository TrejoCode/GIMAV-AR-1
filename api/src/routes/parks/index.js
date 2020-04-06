/**
 *  parks.js
 *  @version: 1.0.0
 *  @author: Sergio, Lucero
 *  @description: Rutas y métodos para /parks
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const database = require('../../database/parks');

const route = new koaRouter({ 
    prefix: '/parks' 
});


route.get('/', koaBody(), async (context) => {
    try {
        context.body = await database.parksAll_Get();

    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});

route.get('/:id', koaBody(), async (context) => {
    try {
        const id = parseInt(context.params.id);
        context.body = await database.parksId_Get(id);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});

route.post('/add', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.parksAdd_Post(data);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});



module.exports=route;