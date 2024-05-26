import mongoose from "mongoose";

const ReportsSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    startDay: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    endDay: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

ReportsSchema.index({ endDay: 1 }, { expireAfterSeconds: 0 });

export const Report = mongoose.model("Reports", ReportsSchema);