import { IDatabase } from "./entity/user.db";

export default function () : IDatabase {
  NODE_ENV: process.env.NODE_ENV || "local";
  switch (process.env.NODE_ENV) {
    case "dev":
      return {
        port: parseInt(process.env.PORT)  || 3306,
          type: "mysql",
          host: "localhost",
          username: "root",
          password: "root",
          database: "mydb",
          synchronize: false,

      };
      case "local":
        return {
            port: parseInt(process.env.PORT) || 3306,
            type: "mysql",
            host: "localhost",
            username: "root",
            password: "root123",
            database: "localuser",
            synchronize: false,

        };
    default:
        return {
            port: parseInt(process.env.PORT) || 3306,
            type: "mysql",
            host: "localhost",
            username: "root",
            password: "root",
            database: "mydb",
            synchronize: false,
        };
  }
}
