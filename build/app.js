"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
// POST request
// Generate new short url
app.post("/generate", function (req, res) {
    var _a = req.body, handle = _a.handle, url = _a.url;
    res.json({
        handle: handle,
        url: url,
    });
});
// GET request
// Used to redirect to real url
app.get("/:handle", function (req, res) {
    res.redirect("http://kecman.dev");
});
// Initialize the server
var port = process.env.PORT || 1234;
app.listen(port, function () {
    console.log("Server is listening to port " + port);
});
