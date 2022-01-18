import Reminder from "../models/Reminder";
import { IReminder, IReminderDeleteDTO, IReminderUpdateDTO } from "../interfaces/IReminder";
import mongoose from "mongoose";

const createReminder = async (data: IReminder) => {
    const { time, userId, contentId, ogTitle, ogImage, url } = data;
    const scheduleTime = time;
    try {
        const reminder = await Reminder.create({
            time: new Date(scheduleTime),
            userId,
            contentId,
            ogTitle,
            ogImage,
            url,
        });
        return reminder;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateReminder = async (data: IReminderUpdateDTO) => {
    const { contentId, time } = data;
    const scheduleTime = time;
    try {
        const updatedReminder = await Reminder.findOneAndUpdate({ contentId }, { time: new Date(scheduleTime) }, { new: true });
        return updatedReminder;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 

const deleteReminder = async (data: IReminderDeleteDTO) => {
    const { contentId } = data;
    try {
       const deletedReminder = await Reminder.findOneAndRemove({ contentId });
       return deletedReminder;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createReminder,
    updateReminder,
    deleteReminder
}