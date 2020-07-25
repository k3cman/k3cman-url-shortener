import { redirectByHandleAction } from "./controller/RedirectByHandleAction";
import { urlGetAllAction } from "./controller/UrlGetAllAction";

export const AppRoutes = [
  {
    path: "/all",
    method: "get",
    action: urlGetAllAction,
  },
  {
    path: "/url/:handle",
    method: "get",
    action: redirectByHandleAction,
  },
];
