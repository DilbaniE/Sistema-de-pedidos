import { Router } from "express";
import { CategoriaController } from "../../../../application/CategoriaController";


export const  categoriaRoutes = () => {
    const router = Router();
    const categoriaCtrl = new CategoriaController();
    
    router.post("/categorias", (req, res) => {
        const payload = req.body;
        // Resolver la promesa con then-catch del controlador
        categoriaCtrl
          .agregar(payload)
          .then((result) => {
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      });
    
      router.put("/categorias/:id", (req, res) => {
        const { id } = req.params;
        const payload = { id, ...req.body };
    
        categoriaCtrl
          .actualizar(payload)
          .then((result) => {
            const status = result.ok === true ? 200 : 400;
            res.status(status).send(result);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      });
    
    
      // ASYNC - AWAIT
      router.get("/categorias", async (_, res) => {
        try {
          const result = await categoriaCtrl.obtener();
          res.send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      });
    
      // parametro dinamico /:id
      router.get("/categorias/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const result = await categoriaCtrl.obtenerPorId(id);
          const status = result.ok === true ? 200 : 404;
          res.status(status).send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      });
    
      router.delete("/categorias/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const result = await categoriaCtrl.eliminar(id);
          const status = result.ok === true ? 200 : 400;
          res.status(status).send(result);
        } catch (error) {
          res.status(500).send(error);
        }
      });
    
      return router;
};