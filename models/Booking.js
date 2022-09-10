import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    jugadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    fechaCreacion: {
      type: Date,
      default: Date.now(),
    },
    horario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Horario",
      unique: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
