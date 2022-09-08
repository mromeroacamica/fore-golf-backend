import express from "express";
import {
  eliminarDay,
  editarDay,
  obtenerDaysByClubId,
  nuevoDia,
  obtenerDays,
} from "../controller/dayController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, obtenerDays);

router
  .route("/:id")
  .get(checkAuth, obtenerDaysByClubId)
  .put(checkAuth, editarDay)
  .delete(checkAuth, eliminarDay)
  .post(checkAuth, nuevoDia);

export default router;
