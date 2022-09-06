import express from "express";
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaboradores,
  eliminarColaborador,
  obtenerTareas,
  buscarColaborador,
} from "../controller/proyectoController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.get("/tareas/:id", checkAuth, obtenerTareas);
router.post("/colaborador", checkAuth, buscarColaborador);
router.post("/agregar-colaborador/:id", checkAuth, agregarColaboradores);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
