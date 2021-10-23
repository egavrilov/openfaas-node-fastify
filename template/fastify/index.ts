import fastify from 'fastify';
import handler from './function/handler';
import { FunctionEvent, FunctionContext } from './normalise';

const port = process.env.http_port || 3000
const app = fastify({
  logger: process.env.ENABLE_LOGGING !== 'false',
});

app.all('/*', async (request, reply) => {
  const fnEvent = new FunctionEvent(request)
  const fnContext = new FunctionContext()

  try {
    const functionResult = await handler(fnEvent, fnContext)

    reply.headers(functionResult.headerValues).status(functionResult.statusCode)
    return functionResult.result
  } catch (err) {
    reply.code(500);
    return err;
  }
});

app.listen(port, (err, address) => {
  if (err) throw err

  app.log.info(`Server listening on ${address}`)
});
