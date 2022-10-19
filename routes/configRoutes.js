import express from "express";
import {
  eliminarTeeSalida,
  editarTeeSalida,
  nuevoTeeSalida,
  obtenerTeeSalidas,
  obtenerConfigBooking,
  nuevoConfigBooking,
  editarConfigBooking,
  eliminarConfigBooking,
  nuevaCategoriaTorneo,
  obtenerCategorias,
} from "../controller/configController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/tee-salida", checkAuth, nuevoTeeSalida);
router.get("/tee-salida", checkAuth, obtenerTeeSalidas);
router.get("/config-booking", checkAuth, obtenerConfigBooking);
router.post("/config-booking", checkAuth, nuevoConfigBooking);

router
  .route("/tee-salida/:id")
  .put(checkAuth, editarTeeSalida)
  .delete(checkAuth, eliminarTeeSalida);
router
  .route("/config-booking/:id")
  .put(checkAuth, editarConfigBooking)
  .delete(checkAuth, eliminarConfigBooking);

router
  .route("/category")
  .post(checkAuth, nuevaCategoriaTorneo)
  .get(checkAuth, obtenerCategorias);
router
  .route("/category/:id")
  .put(checkAuth, eliminarConfigBooking)
  .get(checkAuth, eliminarConfigBooking);

export default router;
