"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const UrlGetAllAction_1 = require("./controller/UrlGetAllAction");
const RedirectByHandleAction_1 = require("./controller/RedirectByHandleAction");
exports.AppRoutes = [
    {
        path: "/all",
        method: "get",
        action: UrlGetAllAction_1.urlGetAllAction,
    },
    {
        path: "/url/:handle",
        method: "get",
        action: RedirectByHandleAction_1.redirectByHandleAction,
    },
];
//# sourceMappingURL=routes.js.map