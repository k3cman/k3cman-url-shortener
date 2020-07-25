"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const RedirectByHandleAction_1 = require("./controller/RedirectByHandleAction");
const UrlGetAllAction_1 = require("./controller/UrlGetAllAction");
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
//# sourceMappingURL=Routes.js.map