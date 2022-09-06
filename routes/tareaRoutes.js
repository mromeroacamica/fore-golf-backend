import express from "express";
import {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
  obtenerTareas,
} from "../controller/tareaController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, agregarTarea);
router.get("/", checkAuth, obtenerTareas);

router
  .route("/:id")
  .get(checkAuth, obtenerTarea)
  .put(checkAuth, actualizarTarea)
  .delete(checkAuth, eliminarTarea);
router.post("/estado/:id", checkAuth, cambiarEstado);

export default router;
