import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    tokenID: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    tokenType: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LocalUser",
        required: true,
    },
    userEMail: {
        type: mongoose.Schema.Types.String,
        ref: "LocalUser",
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: () => new Date(Date.now() + (1000 * 60 * 60 * 3)),
        expires: 60 * 60 * 2,
    },
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

export const Token = mongoose.model("Tokens", TokenSchema);