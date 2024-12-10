import { ClienteController } from "../../../../application/ClienteController";
import  Express  from "express";
export const  clientesRoutes = () => {
    const router = Express.Router();
    const categoriaCtrl = new ClienteController();
    
    router.post("/clientes", (req, res) => {
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
      
      return router;
};