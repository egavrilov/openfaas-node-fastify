/// <reference types="node" />
import { FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage } from "http";
export declare class FunctionEvent {
    body: unknown;
    headers: import("http").IncomingHttpHeaders;
    method: string;
    query: unknown;
    path: string;
    constructor(req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>);
}
export declare class FunctionContext {
    statusCode: number;
    headerValues: {};
    result: any;
    error: any;
    constructor();
    status(value: number): this;
    headers(value: {}): this;
    succeed(result: any): this;
    fail(error: any): this;
}
