/**
 *  ars.js
 *  @version: 1.0.0
 *  @author: Sergio, Lucero
 *  @description: Rutas y métodos para /ar
*/

// Dependencias
const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const database = require('../../database/ar');

const route = new koaRouter({ 
    prefix: '/ars' 
});


route.get('/', koaBody(), async (context) => {
    try {
        context.body = await database.arsAll_Get();

    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});

route.get('/:id', koaBody(), async (context) => {
    try {
        const id = parseInt(context.params.id);
        context.body = await database.arsId_Get(id);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});


route.post('/add', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.arsAdd_Post(data);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});

route.delete('/:id', koaBody(), async (context) => {
    try {
        const id= parseInt(context.params.id);
        context.body = await database.arId_Delete(id);
    } catch (error) {
        console.log(error.message);

        context.body = { error: true, message: error };
    }
});


route.post('/update', koaBody(), async (context) => {
    try {
        const data = context.request.body;
        context.body = await database.ar_update(data);
    } catch (error) {
        console.log(error.message);
        context.body = { error: true, message: error };
    }
});


module.exports=route;