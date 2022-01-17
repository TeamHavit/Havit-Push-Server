import mongoose from "mongoose";

export interface ISchedule {
    _id: mongoose.Schema.Types.ObjectId;
    sendAt: Date;
}

export interface IScheduleDeleteDTO {
    _id: mongoose.Schema.Types.ObjectId;
}