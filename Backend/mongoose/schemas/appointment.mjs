import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    time: {
        type: mongoose.Schema.Types.Array,
        default: ["9.00 - 9.25", "9.30 - 9.55", "10.00 - 10.25", "10.30 - 10.55", "11.00 - 11.25", "11.30 - 11.55", "13.30 - 13.55", "14.00 - 14.25", "14.30 - 14.55", "15.00 - 15.25", "15.30 - 15.55", "16.00 - 16.25"],
        set: function(times) {
            return times.map(time => {
                let [start, end] = time.split(" - ");
                start = parseFloat(start).toFixed(2);
                end = parseFloat(end).toFixed(2);
                return `${start} - ${end}`;
            });
        }
    },
    active: {
        type: mongoose.Schema.Types.Array,
        default: [false, false, false, false, false, false, false, false, false, false, false, false],
    },
}, { versionKey: false, timestamps: { currentTime: () => new Date(Date.now() + 1000 * 60 * 60 * 3) } });

AppointmentSchema.pre("save", function(next) {
    this.date.setTime(this.date.getTime() + (1000 * 60 * 60 * 3));
    this.date.setUTCHours(0, 0, 0, 0);
    next();
});

AppointmentSchema.index({ date: 1 }, { expireAfterSeconds: 86400 });

export const Appointment = mongoose.model("Appointments", AppointmentSchema);