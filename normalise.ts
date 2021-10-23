import { FastifyRequest } from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
import { Server, IncomingMessage } from "http"

export class FunctionEvent {
  body: unknown;
  headers: import("http").IncomingHttpHeaders;
  method: string;
  query: unknown;
  path: string;

  constructor(req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>) {
    this.body = req.body
    this.headers = req.headers
    this.method = req.method
    this.query = req.query
    this.path = req.url
  }
}

export class FunctionContext {
  statusCode: number;
  headerValues: {};
  result: any;
  error: any;

  constructor() {
    this.statusCode = 200
    this.headerValues = {}
    this.result = null
    this.error = null
  }

  status(value: number) {
    this.statusCode = value
    return this
  }

  headers(value: {}) {
    this.headerValues = value
    return this
  }

  succeed(result: any) {
    this.result = result
    return this
  }

  fail(error: any) {
    this.error = error
    return this
  }
}
