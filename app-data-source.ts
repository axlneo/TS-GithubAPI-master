import {DataSource} from "typeorm";
import {User} from "./entities/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "user",
    password: "P@55w0rd",
    database: "ts-db",
    entities: [User],
    synchronize: true,
    logging: false,
})
