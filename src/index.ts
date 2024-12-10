import express from "express";
import { routes } from "./infrastructure/modules/api-rest/routers/indexRouter";
import middleware404 from "./infrastructure/modules/api-rest/middleware/middleware";
import { AppDataSource } from "./infrastructure/repositorios/DataSourceOrm";
const createServer = async () => {
    try {
        const app = express(); //instancia del servidor
        await AppDataSource.initialize()
        console.log("inicializado datasource");
        
        //middleware= para parsear el json de la solicitud
        app.use(express.json());
    
        app.get("/api", (req, res) => {
            res.send({ message: "Bienvenido a la API"
            });
        });
    
        //Importarcion de rutas
        app.use('/api/v1', routes());
        app.use(middleware404);
        const PORT = process.env.PORT || 3000;
    
    
        app.listen(PORT, () =>{
            console.log(`servidor api-rest ejecutano: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`error al iniciar el servidor ${error}`);
        
    }
};
console.log(process.env);

createServer();