import express from "express";
import {
  eliminarDay,
  editarDay,
  obtenerDaysByClubId,
  nuevoDia,
  obtenerDays,
  getHorarios,
  nuevoYear,
  obtenerDaysForBooking,
} from "../controller/dayController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, obtenerDays);
router.route("/booking/:id").get(checkAuth, obtenerDaysForBooking);

router
  .route("/:id")
  .get(checkAuth, obtenerDaysByClubId)
  .put(checkAuth, editarDay)
  .delete(checkAuth, eliminarDay)
  .post(checkAuth, nuevoDia);
router.route("/year/:id/:year").post(checkAuth, nuevoYear);
router.route("/:id/horarios").get(checkAuth, getHorarios);

export default router;
