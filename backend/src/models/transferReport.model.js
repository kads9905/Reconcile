import mongoose, { Schema } from "mongoose";

const transferReportSchema = new Schema(
  {
    transferJob: {
      type: Schema.Types.ObjectId,
      ref: "TransferJob",
      required: true,
      unique: true,
    },

    transferred: {
      type: Number,
      default: 0,
    },

    skipped: {
      type: Number,
      default: 0,
    },

    matchedWithConfidence: [
      {
        title: String,
        artist: String,
        confidence: Number,
      },
    ],

    failedTracks: [
      {
        title: String,
        artist: String,
        reason: String,
      },
    ],
  },
  { timestamps: true }
);

export const TransferReport = mongoose.model(
  "TransferReport",
  transferReportSchema
);