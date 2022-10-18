import mongoose from "mongoose";

const scoreCardSchema = mongoose.Schema(
  {
    jugador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    BatchNumber: {
      type: Number,
      default: 1,
    },
    IniHole: {
      type: Number,
      default: 1,
    },
    State: {
      type: Boolean,
      default: true,
    },
    ScoreGrossHole01: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole02: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole03: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole04: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole05: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole06: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole07: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole08: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole09: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole10: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole11: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole12: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole13: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole14: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole15: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole16: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole17: {
      type: Number,
      default: 0,
    },
    ScoreGrossHole18: {
      type: Number,
      default: 0,
    },
    ScoreGrossTotal: {
      type: Number,
      default: 0,
    },
    ScoreGrossIda: {
      type: Number,
      default: 0,
    },
    ScoreGrossVuelta: {
      type: Number,
      default: 0,
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

const ScoreCard = mongoose.model("ScoreCard", scoreCardSchema);
export default ScoreCard;
