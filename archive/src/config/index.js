"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// Set the NODE_EVN to 'developement';
process.env.NODE_ENV = process.env.NODE_ENV || "developement";
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("⚠ Couldn't find .env file");
}
exports.default = {
    port: process.env.PORT || 8000,
    databaseURL: process.env.DB_URI,
    dbConfig: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
};
//# sourceMappingURL=index.js.map