import mongoose from "mongoose";

const configBookingSchema = mongoose.Schema(
  {
    dayOfWeek: {
      type: Number,
      required: true,
      default: 6,
    },
    prioridadSocio: {
      type: Boolean,
      required: true,
      default: true,
    },
    prioridadSocioHastaDia: {
      type: Number,
      default: 4,
    },
    handicapNecesario: {
      type: Boolean,
      required: true,
      default: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ConfigBooking = mongoose.model("ConfigBooking", configBookingSchema);
export default ConfigBooking;
