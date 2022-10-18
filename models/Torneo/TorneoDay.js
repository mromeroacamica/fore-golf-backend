import mongoose from "mongoose";

const torneoDaySchema = mongoose.Schema(
  {
    torneos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Torneo",
      },
    ],
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    publicar: { type: Boolean, default: false },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  },
);

const TorneoDay = mongoose.model("TorneoDay", torneoDaySchema);
export default TorneoDay;
