import mongoose from "mongoose";
import { ISchedule } from "../interfaces/ISchedule";

const ScheduleSchema = new mongoose.Schema({
    sendAt: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
});

ScheduleSchema.index({ sendAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ISchedule & mongoose.Document>("Schedule", ScheduleSchema);