import dotenv from "dotenv";

// Set the NODE_EVN to 'developement';
process.env.NODE_ENV = process.env.NODE_ENV || "developement";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠ Couldn't find .env file");
}

export default {
  port: process.env.PORT || 8000,
  databaseURL: process.env.DB_URI,
  dbConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
