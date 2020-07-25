"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlGetAllAction = void 0;
const typeorm_1 = require("typeorm");
const Url_1 = require("../entity/Url");
function urlGetAllAction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlRepo = typeorm_1.getManager().getRepository(Url_1.Url);
        const urls = yield urlRepo.find();
        res.send(urls);
    });
}
exports.urlGetAllAction = urlGetAllAction;
//# sourceMappingURL=UrlGetAllAction.js.map