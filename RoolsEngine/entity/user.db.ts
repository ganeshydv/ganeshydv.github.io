``
import { createConnection, DataSource,  } from "typeorm";
import { User } from "./user.entity";
import { Badge } from "./badge.entity";

export interface IDatabase {
    database: string;
    username: string;
    password: string;
    type: "postgerss" | "mysql" | "mssql";
    host: string;
    port: number;
    ssl?: boolean;
    synchronize: boolean;
}

export class UserDB{
    private static dbConfig: IDatabase;
    private static connection: DataSource;

    public static configureDatabase(db: IDatabase) {
        UserDB.dbConfig = db;
    }

    public static async getConnection(): Promise<DataSource>{
        if(!UserDB.connection){
            try {
                UserDB.connection = new DataSource({
                    database: UserDB.dbConfig.database,
                    username: UserDB.dbConfig.username,
                    password: UserDB.dbConfig.password,
                    name: UserDB.dbConfig.database,
                    type: "mysql", 
                    host: UserDB.dbConfig.host,
                    port: UserDB.dbConfig.port,
                    // ssl: UserDB.dbConfig.ssl,
                    entities: [
                        User,
                        Badge
                    ],
                    synchronize:true
                })
                await UserDB.connection.initialize();
                
            } catch (error) {
                console.log("DB connection error", error);
                
            }

            
        }
        return UserDB.connection;
    }

}