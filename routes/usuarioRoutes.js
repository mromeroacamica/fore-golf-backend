import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
} from "../controller/usuarioController.js";
const router = express.Router();

//Autenticacion , registro y Confirmacion de usuarios
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", olvidePassword);

export default router;
