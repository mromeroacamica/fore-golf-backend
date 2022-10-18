import express from "express";
import {
  getEnrolledsByMatricula,
  getClubFields,
} from "../controller/aagController.js";

import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

//Autenticacion , registro y Confirmacion de usuarios
router.route("/enrolleds/:id").get(checkAuth, getEnrolledsByMatricula);
router.route("/fields").get(checkAuth, getClubFields);

export default router;
