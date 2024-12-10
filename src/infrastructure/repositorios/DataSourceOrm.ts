import { DataSource } from "typeorm";
import config from "config";
import { ClienteEntity } from "../entities/ClienteEntity";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.get('HOST'),     
    port: config.get('DB_PORT'),    
    username: config.get('USER'),  
    password: config.get('PASSWORD'), 
    database: config.get('DATABASE'), 
    entities: [ClienteEntity],
})