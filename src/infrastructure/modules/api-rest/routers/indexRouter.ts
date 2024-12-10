import  Express from "express";
import {productosRoutes} from "./productoRouter"
import { categoriaRoutes } from "./categoriasRoutes";
import { clientesRoutes } from "./ClienteRoutes";
export const routes = () => {
    const router =Express.Router();
    router.use(productosRoutes());
    router.use(categoriaRoutes());
    router.use(clientesRoutes());
    return router;
};  