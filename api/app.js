const Koa = require('koa');
const Router = require('koa-router');
const UserController = require('./controllers/UserController.js');
const bodyParser = require('koa-bodyparser');
const database = require('../db.js');
const cors = require('@koa/cors');

const koa = new Koa();
var router = new Router();

koa.use(bodyParser());
koa.use(cors());

const PORT = process.env.PORT || 3001;
database.sync();

router.get('/', async (ctx) => {
    ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`;
});

router.get('/list', async (ctx) => {
        let result = await UserController.list();

        ctx.body = result;
});

router.get('/user/:id', async (ctx) => {
    let result = await UserController.get(ctx.params.id);

    ctx.body = result;
});

router.post('/user', async (ctx) => {
    let result = await UserController.create(ctx.request.body);

    ctx.body = result;
});

router.put('/user/:id', async (ctx) => {
    let result = await UserController.update(ctx.request.body, ctx.params.id);

    ctx.body = result;
});

router.delete('/user/:id', async (ctx) => {
    let result = await UserController.delete(ctx.params.id);

    ctx.body = result;
});

koa
    .use(router.routes())
    .use(router.allowedMethods());

const server = koa.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));

module.exports = server;