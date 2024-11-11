import mysql from "mysql2/promise"
import config  from "config";



/**
 * crear conexion base de datos
 * @returns la cnexion base de datos
 */
const configOpcion ={
    host: config.get<string>("HOST") || "",
    port: config.get<number>("DB_PORT"),
    user: config.get<string>("USER"),
    password: config.get<string>("PASSWORD"),
    database: config.get<string>("DATABASE"),
    
}
export const getPoolConnection = () => {
    const connection = mysql.createPool(configOpcion);
    return connection;
  };