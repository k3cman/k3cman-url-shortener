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
const express_1 = require("express");
const mysql_1 = require("mysql");
const nanoid_1 = require("nanoid");
const yup = require("yup");
const config_1 = require("./config");
const app = express_1.default();
const schema = yup.object().shape({
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
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        app.use(express_1.default.static("client/build"));
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            // Request methods you wish to allow
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            // Request headers you wish to allow
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
            // Pass to next layer of middleware
            next();
        });
        app.use(express_1.default.json());
        const port = process.env.PORT || config_1.default.port;
        const dbConnection = mysql_1.default.createConnection({
            host: config_1.default.databaseURL,
            user: config_1.default.dbConfig.user,
            password: config_1.default.dbConfig.password,
            database: config_1.default.dbConfig.database,
        });
        dbConnection.connect((err) => {
            if (err)
                throw new Error(err.toString());
            console.log("Connected to db");
        });
        const checkExistence = (h) => __awaiter(this, void 0, void 0, function* () {
            yield dbConnection.query(`SELECT COUNT(handle) from url_shortner.urls WHERE handle='${h}';`, (err, results, fields) => {
                if (err) {
                    return true;
                }
                return results[0]["COUNT(handle)"] === 0;
            });
        });
        // TODO split this into multiple files
        // POST request
        // Generate new short url
        app.post("/generate", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { handle, url } = req.body;
            if (!handle || handle === "") {
                handle = nanoid_1.nanoid(5);
            }
            yield schema.validate({ handle, url });
            const checkQuery = `SELECT COUNT(handle) from url_shortner.urls WHERE handle='${handle}';`;
            const creationQuery = `INSERT INTO url_shortner.urls (url, handle) VALUES ("${url}", "${handle}");`;
            dbConnection.query(checkQuery, (err, results, fields) => {
                if (err) {
                    next(err);
                }
                if (results[0]["COUNT(handle)"] === 0) {
                    dbConnection.query(creationQuery, (err, results, fields) => {
                        if (err) {
                            next(err);
                        }
                        else {
                            res.status(201).json({ message: "success" });
                        }
                    });
                }
            });
        }));
        app.use((error, req, res, next) => {
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
        app.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
        });
        app.get("/:handle", (req, res, next) => {
            const getQuery = `SELECT url FROM url_shortner.urls WHERE handle="${req.params.handle}"`;
            dbConnection.query(getQuery, (err, results, fields) => {
                if (err) {
                    next(err);
                }
                else {
                    if (results && results.length > 0 && results[0].hasOwnProperty("url")) {
                        res.redirect(results[0].url);
                    }
                }
            });
        });
    });
}
startServer();
//# sourceMappingURL=app.js.map