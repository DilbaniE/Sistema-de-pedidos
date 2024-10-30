import { Router } from "express";
import { CategoriaController } from "../../../../application/CategoriaController";


export const  categoriaRoutes = () => {
    const router = Router();
    const categoriaCtrl = new CategoriaController();
    
    router.post("/categoria", (req, res) => {
        res.send("Post categoria");
    });

    // Agregamos una ruta GET para probar
    router.put("/categoria", (req, res) => {
        res.send("put categoria");
    });

    router.get("/categoria", (req, res) => {
        categoriaCtrl.obtener().then((result) =>{
            res.send(result);
        }).catch((error) =>{
            res.send({
                message: "Ha ocurrido un error al consultar categoria"
            })
        })
    });

    router.get("/categoria/:id", (req, res) => {
        const id = req.params.id
        res.send(`Get id categoria ${id}`);
    });

    router.delete("/categoria/:id", (req, res) => {
        const id = req.params.id
        res.send(`delete id categoria ${id}`);
    });

    return router;
};