import mysql from "mysql";
import config from "../config";

export const loaders = {
  db: async () => {
    const dbConnection = mysql.createConnection({
      host: config.databaseURL,
      user: config.dbConfig.user,
      password: config.dbConfig.password,
      database: config.dbConfig.database,
    });

    dbConnection.connect((err) => {
      if (err) throw new Error(err.toString());
      console.log("Connected to db");
    });
  },
};
