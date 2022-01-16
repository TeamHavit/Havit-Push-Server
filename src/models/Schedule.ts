import mongoose from "mongoose";
import { ISchedule } from "../interfaces/ISchedule";

const ScheduleSchema = new mongoose.Schema({
    sendAt: {
        type: Date,
        required: true
    }
});

export default mongoose.model<ISchedule & mongoose.Document>("Schedule", ScheduleSchema);