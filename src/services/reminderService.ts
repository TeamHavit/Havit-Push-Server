import Reminder from '../models/Reminder';
import {
  IReminder,
  IReminderDeleteDTO,
  IReminderUpdateDTO,
  ReminderTitleUpdateDto,
} from '../interfaces/IReminder';
import mongoose, { isValidObjectId } from 'mongoose';

const createReminder = async (data: IReminder) => {
  const { time, userId, contentId, ogTitle, ogImage, url, isSeen } = data;
  const scheduleTime = time;
  try {
    const reminder = await Reminder.create({
      time: new Date(scheduleTime),
      userId,
      contentId,
      ogTitle,
      ogImage,
      url,
      isSeen,
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
    const updatedReminder = await Reminder.findOneAndUpdate(
      { contentId },
      { time: new Date(scheduleTime) },
      { new: true },
    );
    return updatedReminder;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateReminderTitle = async (
  data: ReminderTitleUpdateDto,
): Promise<IReminder | null> => {
  try {
    const reminder = await Reminder.findOne({ contentId: data.contentId });
    if (!reminder) return null;

    const updatedReminder = await Reminder.findOneAndUpdate(
      { contentId: data.contentId },
      { ogTitle: data.ogTitle },
      { new: true },
    );

    return updatedReminder;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
  updateReminderTitle,
  deleteReminder,
};
