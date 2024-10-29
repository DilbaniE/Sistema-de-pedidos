import { Router } from "express";
import { ProductoController } from "../../../../application/ProductoController";

export const routes = () => {
    const router = Router();
    const productoCtrl = new ProductoController();
    
    router.post("/productos", (req, res) => {
        res.send("Post productos");
    });

    // Agregamos una ruta GET para probar
    router.put("/productos", (req, res) => {
        res.send("put productos");
    });

    router.get("/productos", (req, res) => {
        productoCtrl.obtener().then((result) =>{
            res.send(result);
        }).catch((error) =>{
            res.send({
                message: "Ha ocurrido un error al consultar producto"
            })
        })
    });

    router.get("/productos/:id", (req, res) => {
        const id = req.params.id
        res.send(`Get id productos ${id}`);
    });

    router.delete("/productos/:id", (req, res) => {
        const id = req.params.id
        res.send(`delete id productos ${id}`);
    });

    return router;
};