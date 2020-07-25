"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mysql_1 = __importDefault(require("mysql"));
var nanoid_1 = require("nanoid");
var yup = __importStar(require("yup"));
var config_1 = __importDefault(require("./config"));
var app = express_1.default();
var schema = yup.object().shape({
    handle: yup
        .string()
        .trim()
        .matches(/^[\w\-]+$/i)
        .nullable(),
    url: yup.string().trim().url().required(),
});
// GET request
// Used to redirect to real url
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var app, port, dbConnection, checkExistence;
        var _this = this;
        return __generator(this, function (_a) {
            app = express_1.default();
            app.use(express_1.default.static("public"));
            app.use(express_1.default.json());
            port = process.env.PORT || config_1.default.port;
            dbConnection = mysql_1.default.createConnection({
                host: config_1.default.databaseURL,
                user: config_1.default.dbConfig.user,
                password: config_1.default.dbConfig.password,
                database: config_1.default.dbConfig.database,
            });
            dbConnection.connect(function (err) {
                if (err)
                    throw new Error(err.toString());
                console.log("Connected to db");
            });
            checkExistence = function (h) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dbConnection.query("SELECT COUNT(handle) from url_shortner.urls WHERE handle='" + h + "';", function (err, results, fields) {
                                if (err) {
                                    return true;
                                }
                                return results[0]['COUNT(handle)'] === 0;
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            // TODO split this into multiple files
            // POST request
            // Generate new short url
            app.post("/generate", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var _a, handle, url, checkQuery, creationQuery;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = req.body, handle = _a.handle, url = _a.url;
                            if (!handle || handle === '') {
                                handle = nanoid_1.nanoid(5);
                            }
                            return [4 /*yield*/, schema.validate({ handle: handle, url: url })];
                        case 1:
                            _b.sent();
                            checkQuery = "SELECT COUNT(handle) from url_shortner.urls WHERE handle='" + handle + "';";
                            creationQuery = "INSERT INTO url_shortner.urls (url, handle) VALUES (\"" + url + "\", \"" + handle + "\");";
                            dbConnection.query(checkQuery, function (err, results, fields) {
                                if (err) {
                                    next(err);
                                }
                                if (results[0]['COUNT(handle)'] === 0) {
                                    dbConnection.query(creationQuery, function (err, results, fields) {
                                        if (err) {
                                            next(err);
                                        }
                                        else {
                                            res.status(201).json({ message: 'success' });
                                        }
                                    });
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            app.use(function (error, req, res, next) {
                if (error.status) {
                    res.status(error.status);
                }
                else {
                    res.status(500);
                }
                res.json({
                    message: error.message,
                    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
                });
            });
            app.listen(port, function () {
                console.log("Server is listening to port " + port);
            });
            app.get("/:handle", function (req, res, next) {
                var getQuery = "SELECT url FROM url_shortner.urls WHERE handle=\"" + req.params.handle + "\"";
                dbConnection.query(getQuery, function (err, results, fields) {
                    if (err) {
                        next(err);
                    }
                    else {
                        if (results && results.length > 0 && results[0].hasOwnProperty('url')) {
                            res.redirect(results[0].url);
                        }
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
startServer();
