import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    tokenID: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    userID: {
        ref: "LocalUser",
        type: mongoose.Schema.Types.String,
        required: true,
    },
    userEMail: {
        ref: "LocalUser",
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: () => new Date(Date.now() + (1000 * 60 * 60 * 3)),
        expires: 60 * 60 * 2,
    }
}, { versionKey: false });

export const Token = mongoose.model("Tokens", TokenSchema);