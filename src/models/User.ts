import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
    fcmToken: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);