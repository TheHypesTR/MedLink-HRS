import mongoose from "mongoose";

const localUserSchema = new mongoose.Schema({
    TCno: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.String,
        default: "User",
    },
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

export const LocalUser = mongoose.model("LocalUsers", localUserSchema);