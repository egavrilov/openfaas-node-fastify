"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const handler_1 = require("./function/handler");
const normalise_1 = require("./normalise");
const port = process.env.http_port || 3000;
const app = (0, fastify_1.default)({
    logger: process.env.ENABLE_LOGGING !== 'false',
});
app.all('/*', async (request, reply) => {
    const fnEvent = new normalise_1.FunctionEvent(request);
    const fnContext = new normalise_1.FunctionContext();
    try {
        const functionResult = await (0, handler_1.default)(fnEvent, fnContext);
        reply.headers(functionResult.headerValues).status(functionResult.statusCode);
        return functionResult.result;
    }
    catch (err) {
        reply.code(500);
        return err;
    }
});
app.listen(port, (err, address) => {
    if (err)
        throw err;
    app.log.info(`Server listening on ${address}`);
});
