import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
    city: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    district: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

HospitalSchema.index({ city: 1, district: 1 });

export const Hospital = mongoose.model("Hospitals", HospitalSchema);