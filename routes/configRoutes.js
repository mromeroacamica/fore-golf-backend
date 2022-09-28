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
} from "../controller/teeSalidaController.js";
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

export default router;
