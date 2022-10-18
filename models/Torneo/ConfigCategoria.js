import mongoose from "mongoose";

const configCategoriaTorneoSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    Category: {
      type: Number,
      required: true,
      default: 0,
    },
    EndHandicap: {
      type: Number,
      required: true,
      default: 0,
    },
    Field: {
      type: Number,
      required: true,
      default: 0,
    },
    TeeOut: {
      type: Number,
      required: true,
      default: 0,
    },
    BatchesCount: {
      type: Number,
      default: 1,
    },
    BatchesHoles: {
      type: Number,
      default: 18,
    },
    GameMode: {
      type: Number,
      default: 1,
    },
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

const ConfigCategoriaTorneo = mongoose.model(
  "ConfigCategoriaTorneo",
  configCategoriaTorneoSchema,
);
export default ConfigCategoriaTorneo;
