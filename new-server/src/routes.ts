import { urlGetAllAction } from "./controller/UrlGetAllAction";
import { redirectByHandleAction } from "./controller/RedirectByHandleAction";

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
