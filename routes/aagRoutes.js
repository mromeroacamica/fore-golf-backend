import express from "express";
import { getEnrolledsByMatricula } from "../controller/aagController.js";

import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

//Autenticacion , registro y Confirmacion de usuarios
router.route("/enrolleds/:id").get(checkAuth, getEnrolledsByMatricula);
// router.post("/login", autenticar);
// router.get("/confirmar/:token", confirmar);
// router.post("/olvide-password", olvidePassword);
// router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// router.get("/perfil", checkAuth, perfil);
// router.put("/editar/:id", checkAuth, editarUsuario);

export default router;
