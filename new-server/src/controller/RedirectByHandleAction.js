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
exports.redirectByHandleAction = void 0;
const typeorm_1 = require("typeorm");
const Url_1 = require("../entity/Url");
function redirectByHandleAction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.params.handle);
        const urlRepo = typeorm_1.getManager().getRepository(Url_1.Url);
        const post = yield urlRepo.find({ handle: typeorm_1.Equal(req.params.handle) });
        console.log(post);
        //   if (!post) {
        //     response.status(404);
        //     response.end();
        //     return;
        //   }
        res.redirect(post[0].url);
    });
}
exports.redirectByHandleAction = redirectByHandleAction;
//# sourceMappingURL=RedirectByHandleAction.js.map