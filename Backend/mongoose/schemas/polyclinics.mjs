import mongoose from "mongoose";

const PolyclinicSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

export const Polyclinic = mongoose.model("Polyclinics", PolyclinicSchema);