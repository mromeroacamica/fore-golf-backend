import express from "express";
import {
  deleteBooking,
  editBooking,
  getBookingById,
  newBooking,
  getBookings,
} from "../controller/bookingController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(checkAuth, getBookings);

router
  .route("/:id")
  .get(checkAuth, getBookingById)
  .put(checkAuth, editBooking)
  .delete(checkAuth, deleteBooking)
  .post(checkAuth, newBooking);

export default router;
