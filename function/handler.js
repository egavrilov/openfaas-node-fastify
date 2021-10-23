"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler = (event, context) => {
    return context
        .succeed({ "hello": "world", ...event })
        .status(200);
};
exports.default = handler;
