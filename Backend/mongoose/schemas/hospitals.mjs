import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    city: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    district: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
    },
    polyclinics: [{
        name: {
            type: mongoose.Schema.Types.String,
        },
        doctors: [{
            name: {
                type: mongoose.Schema.Types.String,
            },
            appointmentTime: {
                type: mongoose.Schema.Types.Array,
            },
        }],
    }],
}, { versionKey: false, timestamps: true });

export const Hospital = mongoose.model("Hospitals", HospitalSchema);