import mongoose from "mongoose";

const daySchema = mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
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
  },
  {
    timestamps: true,
  },
);

const Day = mongoose.model("Day", daySchema);
export default Day;
