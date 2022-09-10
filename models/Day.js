import mongoose from "mongoose";

const daySchema = mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    clubOpen: {
      type: Boolean,
      default: true,
    },
    day: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    dayOfWeek: {
      type: String,
    },
    jugadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Day = mongoose.model("Day", daySchema);
export default Day;
