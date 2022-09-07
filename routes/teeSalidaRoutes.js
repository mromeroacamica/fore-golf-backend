import express from "express";
import {
  eliminarTeeSalida,
  editarTeeSalida,
  nuevoTeeSalida,
  obtenerTeeSalidas,
} from "../controller/teeSalidaController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, nuevoTeeSalida);
router.get("/", checkAuth, obtenerTeeSalidas);

router
  .route("/:id")
  .put(checkAuth, editarTeeSalida)
  .delete(checkAuth, eliminarTeeSalida);

export default router;
