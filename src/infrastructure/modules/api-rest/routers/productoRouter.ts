import { Router } from "express";
import { ProductoController } from "../../../../application/ProductoController";

export const productosRoutes = () => {
    const router = Router();
    const productoCtrl = new ProductoController();
    
    router.post("/productos", (req, res) => {
        const payload = req.body;
        productoCtrl.gregar(payload).then((result) =>{
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        }).catch((error) =>{
            res.status(500).send(error);
        })     
    });

    // Agregamos una ruta GET para probar
    router.put("/productos", (req, res) => {
        const payload = req.body;
        productoCtrl.actualizar(payload).then((result) =>{
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        }).catch((error) =>{
            res.status(500).send(error);
        });
    });

    router.put("/productos/cantidad", (req, res) => {
        // Actualizar la cantidad un producto
        const body = req.body;
        productoCtrl
          .actualizarCantidad(body)
          .then((result) => {
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      });

      router.get("/productos", async (_, res) => {
        try {
          const result = await productoCtrl.obtener();
          res.send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      });

    router.get("/productos/:id", async(req, res) => {
        try {
            const idStr = req.params.id
            const id = parseInt(idStr)
            if (Number.isNaN(id)) {
                res.status(400).send({ok: false, message: "no se envio el id"});
                return
            }
            const result = await productoCtrl.obtenerId(id);
            if (result !== null) {
                res.send({ok: true, info: result});
            }else{
                res.status(400).send({ok: false, message: "no se encontro producto"})
            } 
        } catch (error) {
            res.status(500).send(error);
        }
    });

    router.delete("/productos/:id", async(req, res) => {
        try {
            const idStr = req.params.id
            const id = parseInt(idStr)
            if (Number.isNaN(id)) {
                res.status(400).send({ok: false, message: "no se envio el id"});
                return;
            }
            const result = await productoCtrl.eliminar(id);
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }    
    });

    return router;
};