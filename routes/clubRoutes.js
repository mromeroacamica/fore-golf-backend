import express from "express";
import {
  obtenerClubs,
  nuevoClub,
  obtenerClubById,
  editarClub,
  eliminarClub,
} from "../controller/clubController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, obtenerClubs).post(checkAuth, nuevoClub);

router
  .route("/:id")
  .get(checkAuth, obtenerClubById)
  .put(checkAuth, editarClub)
  .delete(checkAuth, eliminarClub);

// router.get("/tareas/:id", checkAuth, obtenerTareas);
// router.post("/colaborador", checkAuth, buscarColaborador);
// router.post("/agregar-colaborador/:id", checkAuth, agregarColaboradores);
// router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
