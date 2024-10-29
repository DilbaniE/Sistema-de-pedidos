import express from "express";
import { routes } from "./infrastructure/modules/api-rest/routers/indexRouter";
import middleware404 from "./infrastructure/modules/api-rest/middleware/middleware";
const createServer = () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get("/api", (req, res) => {
        console.log("Nueva solicitud del endpoint");
        res.send({
            message: "Bienvenido a la API"
        });
    });

    //Importarcion de rutas
    app.use('/api/v1', routes());
    app.use(middleware404);
    app.listen(PORT, () =>{
        console.log(`servidor api-rest ejecutano: http://localhost:${PORT}`);
    });
};

createServer();