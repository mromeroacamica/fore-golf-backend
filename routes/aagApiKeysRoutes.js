import express from "express";
import {
  nuevoAagApiKey,
  obtenerAagApiKeyByClub,
  eliminarAagApiKey,
  editarAagApiKey,
} from "../controller/aagApiKeysController.js";

import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

//Autenticacion , registro y Confirmacion de usuarios
router
  .route("/")
  .post(checkAuth, nuevoAagApiKey)
  .get(checkAuth, obtenerAagApiKeyByClub);

router
  .route("/:id")
  .delete(checkAuth, eliminarAagApiKey)
  .put(checkAuth, editarAagApiKey);

export default router;
