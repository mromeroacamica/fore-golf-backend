import mongoose from "mongoose";
import bcrypt from "bcrypt";

const clubSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    apiKey_AAG: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApiKey",
    },
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Logo",
    },
  },
  {
    timestamps: true,
  },
);

const Club = mongoose.model("Club", clubSchema);
export default Club;
