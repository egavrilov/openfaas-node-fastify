"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionContext = exports.FunctionEvent = void 0;
class FunctionEvent {
    constructor(req) {
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "method", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "query", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.body = req.body;
        this.headers = req.headers;
        this.method = req.method;
        this.query = req.query;
        this.path = req.url;
    }
}
exports.FunctionEvent = FunctionEvent;
class FunctionContext {
    constructor() {
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headerValues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "result", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.statusCode = 200;
        this.headerValues = {};
        this.result = null;
        this.error = null;
    }
    status(value) {
        this.statusCode = value;
        return this;
    }
    headers(value) {
        this.headerValues = value;
        return this;
    }
    succeed(result) {
        this.result = result;
        return this;
    }
    fail(error) {
        this.error = error;
        return this;
    }
}
exports.FunctionContext = FunctionContext;
