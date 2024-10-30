import  Express from "express";
import {productosRoutes} from "./productoRouter"
import { categoriaRoutes } from "./categoriasRoutes";
export const routes = () => {
    const router =Express.Router();
    router.use(productosRoutes());
    router.use(categoriaRoutes());
    return router;
};  