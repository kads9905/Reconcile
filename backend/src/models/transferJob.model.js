import mongoose, { Schema } from "mongoose";

const transferJobSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sourcePlaylist: {
      type: Schema.Types.ObjectId,
      ref: "Playlist",
      required: true,
    },

    destinationPlaylist: {
      type: Schema.Types.ObjectId,
      ref: "Playlist",
      default: null,
    },

    sourceProvider: {
      type: String,
      enum: ["spotify", "youtube"],
      required: true,
    },

    destinationProvider: {
      type: String,
      enum: ["spotify", "youtube"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export const TransferJob = mongoose.model(
  "TransferJob",
  transferJobSchema
);