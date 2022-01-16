import User from "../models/User";
import { IUser } from "../interfaces/IUser";

const createUser = async (data: IUser) => {
    const { fcmToken } = data;
    try {
        const user = await User.create({
            fcmToken
        });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createUser
}