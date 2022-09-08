import mongoose from "mongoose";

const horarioSchema = mongoose.Schema(
  {
    day: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Day",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    teeSalida: {
      type: String,
      required: true,
      trim: true,
    },
    cuposDisponibles: {
      type: Number,
      required: true,
      trim: true,
      default: 4,
    },
  },
  {
    timestamps: true,
  },
);

const Horario = mongoose.model("Horario", horarioSchema);
export default Horario;
