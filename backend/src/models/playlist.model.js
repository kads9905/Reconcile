import mongoose, { Schema, trusted } from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        provider: {
            type: String,
            enum: ["spotify", "youtube"],
            required: true,
        },
        providerPlaylistId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        coverImage: {
            type: String,
            default: "",
        },
        trackCount: {
            type: Number,
            default: 0,
        },
        snapshotVersion: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: trusted
    }
);

playlistSchema.index(
    { user: 1, provider: 1, providerPlaylistId: 1 },
    { unique: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);