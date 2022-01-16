import mongoose from "mongoose";

export interface IReminder {
    userId: mongoose.Schema.Types.ObjectId;
    ogTitle: String;
    ogImage: String;
    time: Date;
}