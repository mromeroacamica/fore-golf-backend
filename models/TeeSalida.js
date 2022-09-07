import mongoose from "mongoose";

const teeSalidaSchema = mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      required: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    horarios: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const TeeSalida = mongoose.model("TeeSalida", teeSalidaSchema);
export default TeeSalida;
