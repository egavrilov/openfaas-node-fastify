import { FunctionEvent, FunctionContext } from "../normalise";

const handler = (event: FunctionEvent, context: FunctionContext) => {

  return context
    .succeed({ "hello": "world", ...event})
    .status(200);
}


export default handler;
