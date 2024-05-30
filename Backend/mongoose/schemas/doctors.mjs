import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    polyclinicID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Polyclinic",
        required: true,
    },
    polyclinic: {
        type: mongoose.Schema.Types.String,
        ref: "Polyclinic",
        required: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    speciality: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.String,
        default: "./src/assets/default-card.jpg",
    },
    rating: {
        type: mongoose.Schema.Types.Number,
        default: 0,
    },
    rateCount: {
        type: mongoose.Schema.Types.Number,
        default: 0,
    },
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

export const Doctor = mongoose.model("Doctors", DoctorSchema);