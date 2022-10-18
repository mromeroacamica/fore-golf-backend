import mongoose from "mongoose";

const aagApiKeysSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      trim: true,
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

const AagApiKeys = mongoose.model("AagApiKeys", aagApiKeysSchema);
export default AagApiKeys;
