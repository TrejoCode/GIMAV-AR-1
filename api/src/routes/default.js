/**
 *  @name: default.js
 *  @author: Sergio
 *  @description: Rutas y métodos para /
*/

const koaRouter = require("koa-router");
const router = new koaRouter();

router.get("/", async function (context) {
    context.body = "GIMAV AR Web API";
});

module.exports = router;
