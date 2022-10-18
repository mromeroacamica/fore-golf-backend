import mongoose from "mongoose";

const torneoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    configCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConfigCategoriaTorneo",
    },
    publicar: {
      type: Boolean,
      default: false,
    },
    scoreCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScoreCard",
      },
    ],
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  },
);

const Torneo = mongoose.model("Torneo", torneoSchema);
export default Torneo;
