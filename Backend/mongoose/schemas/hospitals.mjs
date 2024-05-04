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
                default: ["9.00 - 9.25", "9.30 - 9.55", "10.00 - 10.25", "10.30 - 10.55", "11.00 - 11.25", "11.30 - 11.55", "13.30 - 13.55", "14.00 - 14.25", "14.30 - 14.55", "15.00 - 15.25", "15.30 - 15.55", "16.00 - 16.25"],
            },
            appointmentActive: {
                type: mongoose.Schema.Types.Array,
                default: [false, false, false, false, false, false, false, false, false, false, false, false],
            },
            reportStartingDay: {
                type: mongoose.Schema.Types.Date,
            },
            reportEndingDay: {
                type: mongoose.Schema.Types.Date,
            },
            reportDay: {
                type: mongoose.Schema.Types.Number,
                default: 0,
            },
        }],
    }],
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

export const Hospital = mongoose.model("Hospitals", HospitalSchema);