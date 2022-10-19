import express from "express";
import {
  crearTorneoDay,
  obtenerTorneoDays,
} from "../../controller/Torneo/torneoController.js";

import checkAuth from "../../middleware/checkAuth.js";
const router = express.Router();

//Autenticacion , registro y Confirmacion de usuarios
router
  .route("/")
  .post(checkAuth, crearTorneoDay)
  .get(checkAuth, obtenerTorneoDays);
router
  .route("/torneo")
  .post(checkAuth, crearTorneoDay)
  .get(checkAuth, obtenerTorneoDays);
router
  .route("/torneo/:id")
  .post(checkAuth, crearTorneoDay)
  .get(checkAuth, obtenerTorneoDays);

router
  .route("/category")
  .post(checkAuth, crearTorneoDay)
  .get(checkAuth, obtenerTorneoDays);
router
  .route("/category/:id")
  .put(checkAuth, crearTorneoDay)
  .get(checkAuth, obtenerTorneoDays);

// router
//   .route("/:id")
//   .delete(checkAuth, eliminarAagApiKey)
//   .put(checkAuth, editarAagApiKey);

export default router;
