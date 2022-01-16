import Reminder from "../models/Reminder";
import { IReminder } from "../interfaces/IReminder";

const createReminder = async (data: IReminder) => {
    const { time, userId, contentId, ogTitle, ogImage } = data;
    const scheduleTime = time;
    try {
        const reminder = await Reminder.create({
            time: new Date(scheduleTime),
            userId,
            contentId,
            ogTitle,
            ogImage
        });
        return reminder;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createReminder
}