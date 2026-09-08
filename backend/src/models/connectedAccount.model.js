import mongoose, { Schema } from "mongoose";

const connectedAccountSchema = new mongoose.Schema(
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
        providerUserId: {
            type: String,
            required: true,
        },
        accessToken: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

// prevents user from connecting to music provider twice
connectedAccountSchema.index(
    { user: 1, provider: 1 },
    { unique: true }
);

export const ConnectedAccount = mongoose.model(
    "ConnectedAccount",
    connectedAccountSchema
);